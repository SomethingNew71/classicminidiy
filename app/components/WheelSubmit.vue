<script lang="ts" setup>
  declare const URL: {
    createObjectURL(file: File): string;
    revokeObjectURL(url: string): void;
  };

  const props = defineProps({
    uuid: {
      type: String,
      default: '',
    },
    newWheel: {
      type: Boolean,
      default: false,
    },
  });

  import type { IWheelsData } from '../../data/models/wheels';
  import { humanFileSize } from '../../data/models/helper-utils';

  const { t } = useI18n();

  // Reactive state
  const wheel = ref();
  const pageLoad = ref(true);
  const pageError = ref();
  const loading = ref(false);
  const hasError = ref(false);
  const errorMessage = ref('');
  const hasSuccess = ref(false);
  const detailsValid = ref(false);
  const imagesValid = ref(false);
  const contactValid = ref(false);
  const step = ref(1);

  // Track field interactions
  const touchedFields = ref(new Set());

  // Form fields
  const name = ref('');
  const type = ref('');
  const width = ref('');
  const size = ref('');
  const offset = ref('');
  const notes = ref('');
  const userName = ref('');
  const emailAddress = ref('');
  const referral = ref('');
  const dropFiles = ref<File[]>([]);
  const fileInput = ref<HTMLInputElement | null>(null);
  const fileError = ref('');
  const termsAgreed = ref(false);

  // Available wheel sizes
  const wheelSizes = ['10', '12', '13'];

  // Form validation
  const validateEmail = (value: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(value) || 'Please enter a valid email address';
  };

  const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      dropFiles.value = Array.from(input.files);
    }
  };

  // Load existing wheel data if editing
  if (!props.newWheel) {
    await useFetch(`/api/wheels/wheel`, {
      query: {
        uuid: props.uuid || 'noWheel',
      },
      server: !!props.uuid, // Only fetch on server if wheel UUID exists
      default: () => ({}) as IWheelsData, // Provide default value when fetch is skipped
    })
      .then(({ data }) => {
        wheel.value = data.value;
        // Pre-populate form fields with existing data
        if (wheel.value) {
          name.value = wheel.value.name || '';
          type.value = wheel.value.type || '';
          width.value = wheel.value.width || '';
          size.value = wheel.value.size || '';
          offset.value = wheel.value.offset || '';
          notes.value = wheel.value.notes || '';
        }
      })
      .catch((error) => {
        pageError.value = error;
        errorMessage.value = t('components.wheel_submit.errors.load_failed');
      })
      .finally(() => {
        pageLoad.value = false;
      });
  } else {
    pageLoad.value = false;
  }

  // Reset form to initial state
  function resetForm() {
    name.value = '';
    type.value = '';
    width.value = '';
    size.value = '';
    offset.value = '';
    notes.value = '';
    userName.value = '';
    emailAddress.value = '';
    referral.value = '';
    dropFiles.value = [];
    step.value = 1;
    hasError.value = false;
    errorMessage.value = '';
    hasSuccess.value = false;
    touchedFields.value = new Set();
  }

  // Store wheel details
  async function storeWheelDetails() {
    const details: IWheelsData = {
      uuid: props.uuid,
      name: name.value,
      type: type.value,
      width: width.value,
      size: size.value,
      offset: offset.value,
      notes: notes.value,
      userName: userName.value,
      emailAddress: emailAddress.value,
      referral: referral.value,
      newWheel: props.newWheel,
    };

    return await useFetch('/api/wheels/save/details', {
      method: 'POST',
      body: details,
      headers: { 'cache-control': 'no-cache' },
    }).catch((err) => {
      console.error('Error saving wheel details:', err);
      throw new Error('Failed to save wheel details');
    });
  }

  // Store wheel images
  async function storeWheelImages(uuid: string) {
    if (!uuid || uuid === '') {
      throw new Error('No UUID provided for image upload');
    }

    const formData = new FormData();
    dropFiles.value.forEach((file, i) => {
      formData.append(`file${i}`, file);
    });

    return await useFetch('/api/wheels/save/images', {
      method: 'POST',
      body: formData,
      query: { uuid },
      headers: { 'cache-control': 'no-cache' },
    }).catch((err) => {
      console.error('Error uploading images:', err);
      throw new Error('Failed to upload images');
    });
  }

  // Check if we can move to the next step
  const canProceedToNextStep = computed(() => {
    if (step.value === 1) return detailsValid.value;
    if (step.value === 2) return imagesValid.value;
    if (step.value === 3) return contactValid.value;
    return true;
  });

  // Mark field as touched when user interacts with it and tabs out
  const markFieldAsTouched = (fieldName: string) => {
    touchedFields.value.add(fieldName);
  };

  // Check if a field has been touched
  const isFieldTouched = (fieldName: string) => {
    return touchedFields.value.has(fieldName);
  };

  // Form validation state
  const validateForm = () => {
    detailsValid.value = !!name.value.trim() && !!width.value && !!size.value;
    imagesValid.value = !props.newWheel || dropFiles.value.length > 0;
    contactValid.value = !!userName.value.trim() && validateEmail(emailAddress.value) === true;
  };

  // Submit form handler
  const submitForm = async () => {
    try {
      loading.value = true;
      if (props.newWheel) {
        await storeWheelDetails();
      } else {
        await storeWheelImages(props.uuid);
      }
      step.value++;
    } catch (error) {
      hasError.value = true;
      errorMessage.value = error instanceof Error ? error.message : 'An error occurred';
    } finally {
      loading.value = false;
    }
  };

  // Watch form fields for changes
  watch([name, width, size, userName, emailAddress, dropFiles], validateForm, { deep: true });

  // Handle next step click
  const handleNextStep = () => {
    validateForm(); // Re-validate before proceeding
    if (canProceedToNextStep.value) {
      step.value++;
    } else {
      console.error('Cannot proceed to next step. Validation failed.', {
        detailsValid: detailsValid.value,
        imagesValid: imagesValid.value,
        contactValid: contactValid.value,
      });
    }
  };

  // Initial validation on mount
  onMounted(() => {
    validateForm();
  });
</script>

<template>
  <div class="container mx-auto px-4 py-6">
    <!-- Stepper -->
    <ul class="steps w-full mb-8">
      <li :class="['step', step >= 1 ? 'step-primary' : '']">
        {{ t('components.wheel_submit.stepper.wheel_details') }}
      </li>
      <li :class="['step', step >= 2 ? 'step-primary' : '']">{{ t('components.wheel_submit.stepper.images') }}</li>
      <li :class="['step', step >= 3 ? 'step-primary' : '']">
        {{ t('components.wheel_submit.stepper.contact_info') }}
      </li>
      <li :class="['step', step >= 4 ? 'step-primary' : '']">{{ t('components.wheel_submit.stepper.review') }}</li>
      <li :class="['step', step >= 5 ? 'step-primary' : '']">{{ t('components.wheel_submit.stepper.submitted') }}</li>
    </ul>

    <!-- Step 1: Wheel Details -->
    <div v-if="step === 1">
      <div v-if="pageLoad" class="skeleton w-full h-32"></div>
      <div v-else-if="pageError" class="alert alert-error">
        <div>
          <span>{{ errorMessage || t('components.wheel_submit.errors.unable_to_load') }}</span>
          <button class="btn btn-sm btn-primary ml-4" @click="resetForm">
            {{ t('components.wheel_submit.errors.start_over') }}
          </button>
        </div>
      </div>
      <div v-else-if="wheel || newWheel" class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">
            {{
              newWheel ? t('components.wheel_submit.step1.title_new') : t('components.wheel_submit.step1.title_update')
            }}
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Wheel Name -->
            <div class="form-control">
              <label class="label" v-if="!newWheel && wheel">
                <span class="label-text">
                  {{ t('components.wheel_submit.step1.current_name') }}
                  <span class="font-semibold">{{ wheel.name || t('components.wheel_submit.step1.no_data') }}</span>
                </span>
              </label>
              <label class="label">
                <span class="label-text"
                  >{{ t('components.wheel_submit.step1.wheel_name') }}
                  <span v-if="newWheel" class="text-error">*</span></span
                >
              </label>
              <div class="relative">
                <input
                  type="text"
                  v-model="name"
                  :placeholder="t('components.wheel_submit.step1.wheel_name_placeholder')"
                  class="input input-bordered w-full pl-10"
                  :class="{ 'input-error': isFieldTouched('name') && newWheel && !name.trim() }"
                  @blur="markFieldAsTouched('name')"
                />
                <span class="absolute left-3 top-1/2 -translate-y-1/2">
                  <i class="fas fa-file-signature text-gray-400"></i>
                </span>
              </div>
              <label class="label" v-if="isFieldTouched('name') && newWheel && !name.trim()">
                <span class="label-text-alt text-error">{{
                  t('components.wheel_submit.step1.wheel_name_required')
                }}</span>
              </label>
            </div>

            <!-- Wheel Type -->
            <div class="form-control">
              <label class="label" v-if="!newWheel && wheel">
                <span class="label-text">
                  {{ t('components.wheel_submit.step1.current_type') }}
                  <span class="font-semibold">{{ wheel.type || t('components.wheel_submit.step1.no_data') }}</span>
                </span>
              </label>
              <label class="label">
                <span class="label-text">{{ t('components.wheel_submit.step1.wheel_material_type') }}</span>
              </label>
              <div class="relative">
                <input
                  type="text"
                  v-model="type"
                  :placeholder="t('components.wheel_submit.step1.wheel_material_placeholder')"
                  class="input input-bordered w-full pl-10"
                />
                <span class="absolute left-3 top-1/2 -translate-y-1/2">
                  <i class="fas fa-box-open-full text-gray-400"></i>
                </span>
              </div>
            </div>

            <!-- Wheel Width -->
            <div class="form-control">
              <label class="label" v-if="!newWheel && wheel">
                <span class="label-text">
                  {{ t('components.wheel_submit.step1.current_width') }}
                  <span class="font-semibold">{{ wheel.width || t('components.wheel_submit.step1.no_data') }}</span>
                </span>
              </label>
              <label class="label">
                <span class="label-text"
                  >{{ t('components.wheel_submit.step1.wheel_width') }}
                  <span v-if="newWheel" class="text-error">*</span></span
                >
              </label>
              <div class="relative">
                <input
                  type="number"
                  v-model="width"
                  :placeholder="t('components.wheel_submit.step1.wheel_width_placeholder')"
                  class="input input-bordered w-full pl-10"
                  :class="{ 'input-error': isFieldTouched('width') && newWheel && !width }"
                  @blur="markFieldAsTouched('width')"
                />
                <span class="absolute left-3 top-1/2 -translate-y-1/2">
                  <i class="fas fa-ruler-horizontal text-gray-400"></i>
                </span>
              </div>
              <label class="label" v-if="isFieldTouched('width') && newWheel && !width">
                <span class="label-text-alt text-error">{{ t('components.wheel_submit.step1.width_required') }}</span>
              </label>
            </div>

            <!-- Wheel Size -->
            <div class="form-control">
              <label class="label" v-if="!newWheel && wheel">
                <span class="label-text">
                  {{ t('components.wheel_submit.step1.current_size') }}
                  <span class="font-semibold">{{ wheel.size || t('components.wheel_submit.step1.no_data') }}</span>
                </span>
              </label>
              <label class="label">
                <span class="label-text"
                  >{{ t('components.wheel_submit.step1.wheel_size') }}
                  <span v-if="newWheel" class="text-error">*</span></span
                >
              </label>
              <div class="relative">
                <select
                  v-model="size"
                  class="select select-bordered w-full pl-10"
                  :class="{ 'select-error': isFieldTouched('size') && newWheel && !size }"
                  @blur="markFieldAsTouched('size')"
                >
                  <option disabled value="">{{ t('components.wheel_submit.step1.wheel_size_placeholder') }}</option>
                  <option v-for="wheelSize in wheelSizes" :key="wheelSize" :value="wheelSize">{{ wheelSize }}"</option>
                </select>
                <span class="absolute left-3 top-1/2 -translate-y-1/2">
                  <i class="fas fa-ruler text-gray-400"></i>
                </span>
              </div>
              <label class="label">
                <span class="label-text-alt">{{ t('components.wheel_submit.step1.diameter_inches') }}</span>
              </label>
              <label class="label" v-if="isFieldTouched('size') && newWheel && !size">
                <span class="label-text-alt text-error">{{
                  t('components.wheel_submit.step1.wheel_size_required')
                }}</span>
              </label>
            </div>

            <!-- Offset -->
            <div class="form-control">
              <label class="label" v-if="!newWheel && wheel">
                <span class="label-text">
                  {{ t('components.wheel_submit.step1.current_offset') }}
                  <span class="font-semibold">{{ wheel.offset || t('components.wheel_submit.step1.no_data') }}</span>
                </span>
              </label>
              <label class="label">
                <span class="label-text">{{ t('components.wheel_submit.step1.offset_info') }}</span>
              </label>
              <div class="relative">
                <input
                  type="text"
                  v-model="offset"
                  :placeholder="t('components.wheel_submit.step1.offset_placeholder')"
                  class="input input-bordered w-full pl-10"
                  maxlength="30"
                />
                <span class="absolute left-3 top-1/2 -translate-y-1/2">
                  <i class="fas fa-arrow-right-from-line text-gray-400"></i>
                </span>
              </div>
            </div>

            <!-- Notes -->
            <div class="form-control col-span-1 md:col-span-2">
              <label class="label" v-if="!newWheel && wheel">
                <span class="label-text">
                  {{ t('components.wheel_submit.step1.current_notes') }}
                  <span class="font-semibold">{{ wheel.notes || t('components.wheel_submit.step1.no_data') }}</span>
                </span>
              </label>
              <label class="label">
                <span class="label-text">{{ t('components.wheel_submit.step1.extra_notes') }}</span>
              </label>
              <div class="relative">
                <textarea
                  v-model="notes"
                  class="textarea textarea-bordered w-full pl-10"
                  :placeholder="t('components.wheel_submit.step1.notes_placeholder')"
                  rows="3"
                  maxlength="250"
                ></textarea>
                <span class="absolute left-3 top-4">
                  <i class="fas fa-notebook text-gray-400"></i>
                </span>
              </div>
              <label class="label">
                <span class="label-text-alt">{{
                  t('components.wheel_submit.step1.characters_count', { count: notes.length })
                }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2: Images -->
    <div v-else-if="step === 2" class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{{ t('components.wheel_submit.step2.title') }}</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Image Upload -->
          <div class="form-control">
            <h3 class="text-xl font-semibold mb-2">{{ t('components.wheel_submit.step2.add_images') }}</h3>
            <p class="text-sm text-gray-500 mb-4" v-if="newWheel">
              {{ t('components.wheel_submit.step2.new_wheel_notice') }}
            </p>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">
                  {{ t('components.wheel_submit.step2.upload_label') }}
                  <span v-if="newWheel" class="text-error">*</span>
                </span>
              </label>
              <input
                type="file"
                ref="fileInput"
                class="file-input file-input-bordered w-full"
                accept="image/png, image/jpeg"
                multiple
                @change="handleFileChange"
              />
              <label class="label">
                <span class="label-text-alt">{{ t('components.wheel_submit.step2.accepted_formats') }}</span>
              </label>
              <div v-if="fileError" class="text-error text-sm mt-1">
                {{ fileError }}
              </div>
            </div>

            <!-- Files to upload -->
            <div v-if="dropFiles.length > 0" class="mt-4">
              <h4 class="font-medium mb-2">
                {{ t('components.wheel_submit.step2.files_to_upload', { count: dropFiles.length }) }}
              </h4>
              <div class="overflow-x-auto">
                <table class="table table-zebra table-compact w-full">
                  <tbody>
                    <tr v-for="(file, index) in dropFiles" :key="index">
                      <td class="w-10">
                        <i class="fas fa-image text-gray-400"></i>
                      </td>
                      <td class="truncate max-w-[200px]">{{ file.name }}</td>
                      <td class="text-right">{{ humanFileSize(file.size) }}</td>
                      <td class="w-10">
                        <button class="btn btn-ghost btn-xs" @click="dropFiles.splice(index, 1)">
                          <i class="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Image Preview -->
          <div>
            <h3 class="text-xl font-semibold mb-4">
              {{
                newWheel
                  ? t('components.wheel_submit.step2.your_images')
                  : t('components.wheel_submit.step2.existing_images')
              }}
            </h3>

            <div v-if="!newWheel && wheel?.images?.length" class="grid grid-cols-2 gap-4">
              <div v-for="(image, i) in wheel.images" :key="i" class="relative aspect-square">
                <img :src="image.src" :alt="`Wheel image ${i + 1}`" class="w-full h-full object-cover rounded-lg" />
                <div
                  class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100"
                >
                  <button class="btn btn-ghost btn-sm text-white">
                    <i class="fas fa-search-plus"></i>
                  </button>
                </div>
              </div>
            </div>

            <div v-else-if="dropFiles.length > 0" class="grid grid-cols-2 gap-4">
              <div v-for="(file, i) in dropFiles" :key="i" class="relative aspect-square">
                <img
                  :src="URL.createObjectURL(file)"
                  :alt="`Preview ${i + 1}`"
                  class="w-full h-full object-cover rounded-lg"
                />
                <div
                  class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100"
                >
                  <button class="btn btn-ghost btn-sm text-white" @click="dropFiles.splice(i, 1)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>

            <div v-else class="text-center p-8 border-2 border-dashed rounded-lg">
              <i class="fas fa-images text-4xl text-gray-300 mb-2"></i>
              <p class="text-gray-500">{{ t('components.wheel_submit.step2.no_images') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Step 3: Contact Information -->
    <div v-else-if="step === 3" class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{{ t('components.wheel_submit.step3.title') }}</h2>

        <div class="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
          <div class="form-control">
            <label class="label">
              <span class="label-text"
                >{{ t('components.wheel_submit.step3.your_name') }} <span class="text-error">*</span></span
              >
            </label>
            <div class="relative">
              <input
                type="text"
                v-model="userName"
                :placeholder="t('components.wheel_submit.step3.name_placeholder')"
                class="input input-bordered w-full pl-10"
                :class="{ 'input-error': isFieldTouched('userName') && !userName.trim() }"
                @blur="markFieldAsTouched('userName')"
                required
              />
              <span class="absolute left-3 top-1/2 -translate-y-1/2">
                <i class="fas fa-user text-gray-400"></i>
              </span>
            </div>
            <label class="label" v-if="isFieldTouched('userName') && !userName.trim()">
              <span class="label-text-alt text-error">{{ t('components.wheel_submit.step3.name_required') }}</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text"
                >{{ t('components.wheel_submit.step3.email_address') }} <span class="text-error">*</span></span
              >
            </label>
            <div class="relative">
              <input
                type="email"
                v-model="emailAddress"
                :placeholder="t('components.wheel_submit.step3.email_placeholder')"
                class="input input-bordered w-full pl-10"
                :class="{
                  'input-error': isFieldTouched('emailAddress') && emailAddress && !validateEmail(emailAddress),
                }"
                @blur="markFieldAsTouched('emailAddress')"
                required
              />
              <span class="absolute left-3 top-1/2 -translate-y-1/2">
                <i class="fas fa-envelope text-gray-400"></i>
              </span>
            </div>
            <label class="label" v-if="isFieldTouched('emailAddress') && emailAddress && !validateEmail(emailAddress)">
              <span class="label-text-alt text-error">{{ t('components.wheel_submit.step3.email_invalid') }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 4: Review -->
    <div v-if="step === 4" class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{{ t('components.wheel_submit.step4.title') }}</h2>

        <div v-if="!newWheel" class="alert alert-info mb-6">
          <div>
            <i class="fas fa-info-circle"></i>
            <span>{{ t('components.wheel_submit.step4.update_notice') }}</span>
          </div>
        </div>

        <div class="space-y-6">
          <!-- Wheel Details -->
          <div class="card bg-base-200">
            <div class="card-body p-4">
              <h3 class="card-title text-lg mb-4">{{ t('components.wheel_submit.step4.wheel_details') }}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div class="text-sm font-semibold text-gray-500">{{ t('components.wheel_submit.step4.name') }}</div>
                  <div class="text-base">{{ name || t('components.wheel_submit.step4.not_provided') }}</div>
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-500">{{ t('components.wheel_submit.step4.type') }}</div>
                  <div class="text-base">{{ type || t('components.wheel_submit.step4.not_provided') }}</div>
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-500">{{ t('components.wheel_submit.step4.width') }}</div>
                  <div class="text-base">{{ width || t('components.wheel_submit.step4.not_provided') }}</div>
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-500">{{ t('components.wheel_submit.step4.size') }}</div>
                  <div class="text-base">{{ size || t('components.wheel_submit.step4.not_provided') }}</div>
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-500">{{ t('components.wheel_submit.step4.offset') }}</div>
                  <div class="text-base">{{ offset || t('components.wheel_submit.step4.not_provided') }}</div>
                </div>
                <div class="md:col-span-2">
                  <div class="text-sm font-semibold text-gray-500">{{ t('components.wheel_submit.step4.notes') }}</div>
                  <div class="text-base whitespace-pre-line">
                    {{ notes || t('components.wheel_submit.step4.no_additional_notes') }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Images -->
          <div class="card bg-base-200">
            <div class="card-body p-4">
              <h3 class="card-title text-lg mb-4">{{ t('components.wheel_submit.step4.images') }}</h3>
              <div v-if="dropFiles.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                <div v-for="(file, i) in dropFiles" :key="i" class="relative aspect-square">
                  <img
                    :src="URL.createObjectURL(file)"
                    :alt="`Preview ${i + 1}`"
                    class="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
              <div v-else class="text-center py-8 text-gray-500">
                <i class="fas fa-images text-3xl mb-2"></i>
                <p>{{ t('components.wheel_submit.step4.no_images_added') }}</p>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="card bg-base-200">
            <div class="card-body p-4">
              <h3 class="card-title text-lg mb-4">{{ t('components.wheel_submit.step4.contact_information') }}</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div class="text-sm font-semibold text-gray-500">{{ t('components.wheel_submit.step4.name') }}</div>
                  <div class="text-base">{{ userName }}</div>
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-500">{{ t('components.wheel_submit.step4.email') }}</div>
                  <div class="text-base">{{ emailAddress }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 5: Submitted -->
    <div v-else-if="step === 5" class="card bg-base-100 shadow-xl text-center">
      <div class="card-body">
        <div class="flex justify-center mb-4">
          <div class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <i class="fas fa-check text-3xl text-green-500"></i>
          </div>
        </div>
        <h2 class="card-title justify-center text-3xl">{{ t('components.wheel_submit.step5.thank_you') }}</h2>
        <p class="text-lg mb-6">{{ t('components.wheel_submit.step5.submission_received') }}</p>

        <div class="bg-base-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
          <p v-if="newWheel" class="mb-2">
            {{ t('components.wheel_submit.step5.new_wheel_message', { email: emailAddress }) }}
          </p>
          <p v-else>
            {{ t('components.wheel_submit.step5.update_message', { email: emailAddress }) }}
          </p>
        </div>

        <button class="btn btn-primary" @click="resetForm">
          <i class="fas fa-plus-circle mr-2"></i>
          {{ t('components.wheel_submit.step5.submit_another') }}
        </button>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-end gap-4 mt-8">
      <button v-if="step > 1 && step < 5" @click="step--" class="btn btn-ghost">
        <i class="fas fa-arrow-left mr-2"></i>
        {{ t('components.wheel_submit.navigation.back') }}
      </button>

      <button v-if="step < 4" @click="handleNextStep" :disabled="!canProceedToNextStep" class="btn btn-primary">
        {{ t('components.wheel_submit.navigation.next') }}
        <i class="fas fa-arrow-right ml-2"></i>
      </button>

      <button
        v-else-if="step === 4"
        @click="submitForm"
        :disabled="!canProceedToNextStep"
        :class="['btn', 'btn-primary', { loading: loading }]"
      >
        <i class="fas fa-paper-plane mr-2"></i>
        {{ t('components.wheel_submit.navigation.submit') }}
      </button>
    </div>
  </div>
</template>
