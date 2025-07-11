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

  import type { IWheelsData } from '~/data/models/wheels';
  import { humanFileSize } from '~/data/models/helper-utils';

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
        uuid: props.uuid,
      },
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
        errorMessage.value = 'Failed to load wheel data. Please try again.';
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
      <li :class="['step', step >= 1 ? 'step-primary' : '']">Wheel Details</li>
      <li :class="['step', step >= 2 ? 'step-primary' : '']">Images</li>
      <li :class="['step', step >= 3 ? 'step-primary' : '']">Contact Info</li>
      <li :class="['step', step >= 4 ? 'step-primary' : '']">Review</li>
      <li :class="['step', step >= 5 ? 'step-primary' : '']">Submitted</li>
    </ul>

    <!-- Step 1: Wheel Details -->
    <div v-if="step === 1">
      <div v-if="pageLoad" class="skeleton w-full h-32"></div>
      <div v-else-if="pageError" class="alert alert-error">
        <div>
          <span>{{ errorMessage || 'Unable to load wheel data' }}</span>
          <button class="btn btn-sm btn-primary ml-4" @click="resetForm">Start Over</button>
        </div>
      </div>
      <div v-else-if="wheel || newWheel" class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">{{ newWheel ? 'Submit New Wheel' : 'Suggest Updates' }}</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Wheel Name -->
            <div class="form-control">
              <label class="label" v-if="!newWheel && wheel">
                <span class="label-text">
                  Current Name:
                  <span class="font-semibold">{{ wheel.name || 'No data' }}</span>
                </span>
              </label>
              <label class="label">
                <span class="label-text">Wheel Name <span v-if="newWheel" class="text-error">*</span></span>
              </label>
              <div class="relative">
                <input
                  type="text"
                  v-model="name"
                  placeholder="Enter wheel name"
                  class="input input-bordered w-full pl-10"
                  :class="{ 'input-error': isFieldTouched('name') && newWheel && !name.trim() }"
                  @blur="markFieldAsTouched('name')"
                />
                <span class="absolute left-3 top-1/2 -translate-y-1/2">
                  <i class="fas fa-file-signature text-gray-400"></i>
                </span>
              </div>
              <label class="label" v-if="isFieldTouched('name') && newWheel && !name.trim()">
                <span class="label-text-alt text-error">Wheel name is required</span>
              </label>
            </div>

            <!-- Wheel Type -->
            <div class="form-control">
              <label class="label" v-if="!newWheel && wheel">
                <span class="label-text">
                  Current Type:
                  <span class="font-semibold">{{ wheel.type || 'No data' }}</span>
                </span>
              </label>
              <label class="label">
                <span class="label-text">Wheel Material Type</span>
              </label>
              <div class="relative">
                <input
                  type="text"
                  v-model="type"
                  placeholder="e.g., Alloy, Steel, etc."
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
                  Current Width:
                  <span class="font-semibold">{{ wheel.width || 'No data' }}</span>
                </span>
              </label>
              <label class="label">
                <span class="label-text">Wheel Width <span v-if="newWheel" class="text-error">*</span></span>
              </label>
              <div class="relative">
                <input
                  type="number"
                  v-model="width"
                  placeholder="Enter width"
                  class="input input-bordered w-full pl-10"
                  :class="{ 'input-error': isFieldTouched('width') && newWheel && !width }"
                  @blur="markFieldAsTouched('width')"
                />
                <span class="absolute left-3 top-1/2 -translate-y-1/2">
                  <i class="fas fa-ruler-horizontal text-gray-400"></i>
                </span>
              </div>
              <label class="label" v-if="isFieldTouched('width') && newWheel && !width">
                <span class="label-text-alt text-error">Width is required</span>
              </label>
            </div>

            <!-- Wheel Size -->
            <div class="form-control">
              <label class="label" v-if="!newWheel && wheel">
                <span class="label-text">
                  Current Size:
                  <span class="font-semibold">{{ wheel.size || 'No data' }}</span>
                </span>
              </label>
              <label class="label">
                <span class="label-text">Wheel Size <span v-if="newWheel" class="text-error">*</span></span>
              </label>
              <div class="relative">
                <select
                  v-model="size"
                  class="select select-bordered w-full pl-10"
                  :class="{ 'select-error': isFieldTouched('size') && newWheel && !size }"
                  @blur="markFieldAsTouched('size')"
                >
                  <option disabled value="">Select wheel size</option>
                  <option v-for="wheelSize in wheelSizes" :key="wheelSize" :value="wheelSize">{{ wheelSize }}"</option>
                </select>
                <span class="absolute left-3 top-1/2 -translate-y-1/2">
                  <i class="fas fa-ruler text-gray-400"></i>
                </span>
              </div>
              <label class="label">
                <span class="label-text-alt">Diameter in inches</span>
              </label>
              <label class="label" v-if="isFieldTouched('size') && newWheel && !size">
                <span class="label-text-alt text-error">Wheel size is required</span>
              </label>
            </div>

            <!-- Offset -->
            <div class="form-control">
              <label class="label" v-if="!newWheel && wheel">
                <span class="label-text">
                  Current Offset:
                  <span class="font-semibold">{{ wheel.offset || 'No data' }}</span>
                </span>
              </label>
              <label class="label">
                <span class="label-text">Offset Information</span>
              </label>
              <div class="relative">
                <input
                  type="text"
                  v-model="offset"
                  placeholder="e.g., ET25"
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
                  Current Notes:
                  <span class="font-semibold">{{ wheel.notes || 'No data' }}</span>
                </span>
              </label>
              <label class="label">
                <span class="label-text">Extra Notes</span>
              </label>
              <div class="relative">
                <textarea
                  v-model="notes"
                  class="textarea textarea-bordered w-full pl-10"
                  placeholder="Any additional information about these wheels..."
                  rows="3"
                  maxlength="250"
                ></textarea>
                <span class="absolute left-3 top-4">
                  <i class="fas fa-notebook text-gray-400"></i>
                </span>
              </div>
              <label class="label">
                <span class="label-text-alt">{{ notes.length }}/250 characters</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2: Images -->
    <div v-else-if="step === 2" class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Wheel Images</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Image Upload -->
          <div class="form-control">
            <h3 class="text-xl font-semibold mb-2">Add your own images</h3>
            <p class="text-sm text-gray-500 mb-4" v-if="newWheel">
              To submit a new wheel, you must include at least one image for the registry
            </p>

            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">
                  Upload up to 5 images
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
                <span class="label-text-alt"> Accepted formats: JPG, PNG (Max 3MB each) </span>
              </label>
              <div v-if="fileError" class="text-error text-sm mt-1">
                {{ fileError }}
              </div>
            </div>

            <!-- Files to upload -->
            <div v-if="dropFiles.length > 0" class="mt-4">
              <h4 class="font-medium mb-2">Files to upload ({{ dropFiles.length }})</h4>
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
              {{ newWheel ? 'Your Images' : 'Existing Images' }}
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
              <p class="text-gray-500">No images uploaded yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Step 3: Contact Information -->
    <div v-else-if="step === 3" class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Contact Information</h2>

        <div class="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Your Name <span class="text-error">*</span></span>
            </label>
            <div class="relative">
              <input
                type="text"
                v-model="userName"
                placeholder="Enter your name"
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
              <span class="label-text-alt text-error">Your name is required</span>
            </label>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text">Email Address <span class="text-error">*</span></span>
            </label>
            <div class="relative">
              <input
                type="email"
                v-model="emailAddress"
                placeholder="your@email.com"
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
              <span class="label-text-alt text-error">Please enter a valid email address</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 4: Review -->
    <div v-if="step === 4" class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Review Your Submission</h2>

        <div v-if="!newWheel" class="alert alert-info mb-6">
          <div>
            <i class="fas fa-info-circle"></i>
            <span
              >You are suggesting updates to an existing wheel. Your changes will be reviewed before being
              published.</span
            >
          </div>
        </div>

        <div class="space-y-6">
          <!-- Wheel Details -->
          <div class="card bg-base-200">
            <div class="card-body p-4">
              <h3 class="card-title text-lg mb-4">Wheel Details</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div class="text-sm font-semibold text-gray-500">Name</div>
                  <div class="text-base">{{ name || 'Not provided' }}</div>
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-500">Type</div>
                  <div class="text-base">{{ type || 'Not provided' }}</div>
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-500">Width</div>
                  <div class="text-base">{{ width || 'Not provided' }}</div>
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-500">Size</div>
                  <div class="text-base">{{ size || 'Not provided' }}</div>
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-500">Offset</div>
                  <div class="text-base">{{ offset || 'Not provided' }}</div>
                </div>
                <div class="md:col-span-2">
                  <div class="text-sm font-semibold text-gray-500">Notes</div>
                  <div class="text-base whitespace-pre-line">{{ notes || 'No additional notes' }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Images -->
          <div class="card bg-base-200">
            <div class="card-body p-4">
              <h3 class="card-title text-lg mb-4">Images</h3>
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
                <p>No images added</p>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="card bg-base-200">
            <div class="card-body p-4">
              <h3 class="card-title text-lg mb-4">Contact Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div class="text-sm font-semibold text-gray-500">Name</div>
                  <div class="text-base">{{ userName }}</div>
                </div>
                <div>
                  <div class="text-sm font-semibold text-gray-500">Email</div>
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
        <h2 class="card-title justify-center text-3xl">Thank You!</h2>
        <p class="text-lg mb-6">Your submission has been received.</p>

        <div class="bg-base-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
          <p v-if="newWheel" class="mb-2">
            Your wheel has been submitted for review. We'll notify you at
            <span class="font-semibold">{{ emailAddress }}</span> once it's been approved and added to the registry.
          </p>
          <p v-else>
            Your suggested updates have been submitted for review. We'll notify you at
            <span class="font-semibold">{{ emailAddress }}</span> once they've been processed.
          </p>
        </div>

        <button class="btn btn-primary" @click="resetForm">
          <i class="fas fa-plus-circle mr-2"></i>
          Submit Another Wheel
        </button>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex justify-end gap-4 mt-8">
      <button v-if="step > 1 && step < 5" @click="step--" class="btn btn-ghost">
        <i class="fas fa-arrow-left mr-2"></i>
        Back
      </button>

      <button v-if="step < 4" @click="handleNextStep" :disabled="!canProceedToNextStep" class="btn btn-primary">
        Next
        <i class="fas fa-arrow-right ml-2"></i>
      </button>

      <button
        v-else-if="step === 4"
        @click="submitForm"
        :disabled="!canProceedToNextStep"
        :class="['btn', 'btn-primary', { loading: loading }]"
      >
        <i class="fas fa-paper-plane mr-2"></i>
        Submit
      </button>
    </div>
  </div>
</template>
