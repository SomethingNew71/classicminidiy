<script lang="ts" setup>
  import type { RegistryItem, RegistryQueueSubmissionResponse } from '../../data/models/registry';
  interface TouchedFields {
    submittedBy: boolean;
    submittedByEmail: boolean;
    year: boolean;
    model: boolean;
    trim: boolean;
    bodyType: boolean;
    engineSize: boolean;
    [key: string]: boolean;
  }

  const touchedFields = ref<TouchedFields>({
    submittedBy: false,
    submittedByEmail: false,
    year: false,
    model: false,
    trim: false,
    bodyType: false,
    engineSize: false,
  });
  const validationRules = () => ({
    required: (value: string) => !!value || t('components.registry_submission.validation.required'),
    email: (value: string) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || t('components.registry_submission.validation.invalid_email');
    },
  });
  const { t } = useI18n();
  const rules = ref(validationRules());

  const initialDetails: RegistryItem = {
    year: 1959,
    model: '',
    trim: '',
    bodyType: 'Saloon',
    engineSize: 850,
    color: '',
    bodyNum: '',
    engineNum: '',
    buildDate: [],
    notes: '',
    submittedBy: '',
    submittedByEmail: '',
    uniqueId: '',
  };

  const details = ref({ ...initialDetails });
  const issueCreated = ref(false);
  const apiError = ref(false);
  const apiMessage = ref('');
  const submission = ref<{
    number: number | null;
    url: string | null;
  }>({ number: null, url: null });
  const processing = ref(false);

  function validateForm() {
    const requiredFields = [
      details.value.submittedBy,
      details.value.submittedByEmail && rules.value.email(details.value.submittedByEmail),
      details.value.year,
      details.value.model,
      details.value.trim,
      details.value.bodyType,
      details.value.engineSize,
    ];

    return requiredFields.every((field) => !!field);
  }

  async function submit() {
    // Mark all fields as touched when submitting
    Object.keys(touchedFields.value).forEach((key: string) => {
      touchedFields.value[key] = true;
    });

    if (!validateForm()) {
      return;
    }

    processing.value = true;
    try {
      const { data } = await useFetch<RegistryQueueSubmissionResponse>('/api/registry/queue/submit', {
        method: 'POST',
        body: { details: details.value },
      });
      issueCreated.value = true;
      if (data.value?.uuid) {
        resetForm();
      }
    } catch (error) {
      issueCreated.value = false;
      apiError.value = true;
      console.error(error);
      apiMessage.value = t('components.registry_submission.error.api_unavailable');
    } finally {
      processing.value = false;
    }
  }

  function debounce<T extends (...args: any[]) => void>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return function (...args: Parameters<T>) {
      clearTimeout(timeout);
      // @ts-ignore
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const debouncedSubmit = debounce(submit, 300);

  function resetForm() {
    details.value = { ...initialDetails };
    // Reset touched state when form is reset
    Object.keys(touchedFields.value).forEach((key: string) => {
      touchedFields.value[key] = false;
    });
  }

  function submitAnotherMini() {
    issueCreated.value = false;
    apiError.value = false;
    submission.value = { number: null, url: null };
  }
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">{{ t('components.registry_submission.title') }}</h2>
      <div v-if="!processing && issueCreated && submission && !apiError">
        <div class="text-center py-5">
          <i class="text-4xl text-success fa-duotone fa-box-check fa-beat py-5"></i>
          <h1 class="text-2xl font-bold mb-1">{{ t('components.registry_submission.success.thank_you') }}</h1>
          <h2 class="text-lg mb-4">
            {{ t('components.registry_submission.success.submitted_message') }}
          </h2>
          <ul class="mb-5">
            <li class="mb-2">
              {{ t('components.registry_submission.success.submission_details') }}
              <strong>{{ submission.number }}</strong>
            </li>
            <li>
              {{ t('components.registry_submission.success.track_submission') }}
              <a class="link link-primary" target="_blank" v-if="submission.url" :href="submission.url">
                {{ t('components.registry_submission.success.submission_link') }} {{ submission.number }}</a
              >
            </li>
          </ul>
          <button class="btn btn-primary" @click="submitAnotherMini()">
            <i class="fa-duotone fa-solid fa-plus-large mr-2"></i>
            {{ t('components.registry_submission.success.submit_another') }}
          </button>
        </div>
      </div>
      <div v-if="!issueCreated">
        <form @submit.prevent="submit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
            <div class="col-span-1 md:col-span-2">
              <h2 class="text-xl font-bold">{{ t('components.registry_submission.sections.personal_info') }}</h2>
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text"
                  >{{ t('components.registry_submission.form_labels.your_name') }}
                  <span class="text-error">*</span></span
                >
                <span class="label-text-alt"><i class="fad fa-user"></i></span>
              </label>
              <input
                type="text"
                :placeholder="t('components.registry_submission.placeholders.name')"
                v-model="details.submittedBy"
                class="input input-bordered w-full"
                :class="{ 'input-error': details.submittedBy === '' && touchedFields.submittedBy }"
                required
                @blur="touchedFields.submittedBy = true"
              />
              <label v-if="details.submittedBy === '' && touchedFields.submittedBy" class="label">
                <span class="label-text-alt text-error">{{
                  t('components.registry_submission.validation.required')
                }}</span>
              </label>
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text"
                  >{{ t('components.registry_submission.form_labels.your_email') }}
                  <span class="text-error">*</span></span
                >
                <span class="label-text-alt"><i class="fad fa-at"></i></span>
              </label>
              <input
                type="email"
                :placeholder="t('components.registry_submission.placeholders.email')"
                v-model="details.submittedByEmail"
                class="input input-bordered w-full"
                :class="{
                  'input-error':
                    (details.submittedByEmail === '' || !rules.email(details.submittedByEmail)) &&
                    touchedFields.submittedByEmail,
                }"
                required
                @blur="touchedFields.submittedByEmail = true"
              />
              <label
                v-if="
                  (details.submittedByEmail === '' || !rules.email(details.submittedByEmail)) &&
                  touchedFields.submittedByEmail
                "
                class="label"
              >
                <span class="label-text-alt text-error">
                  {{
                    details.submittedByEmail === ''
                      ? t('components.registry_submission.validation.required')
                      : t('components.registry_submission.validation.invalid_email')
                  }}
                </span>
              </label>
            </div>
            <div class="col-span-1 md:col-span-2">
              <h2 class="text-xl font-bold">{{ t('components.registry_submission.sections.car_details') }}</h2>
            </div>
            <div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text"
                    >{{ t('components.registry_submission.form_labels.model_year') }}
                    <span class="text-error">*</span></span
                  >
                  <span class="label-text-alt"><i class="fad fa-calendar"></i></span>
                </label>
                <input
                  type="number"
                  min="1959"
                  max="2000"
                  v-model.number="details.year"
                  class="input input-bordered w-full"
                  :class="{ 'input-error': !details.year && touchedFields.year }"
                  required
                  @blur="touchedFields.year = true"
                />
                <label v-if="!details.year && touchedFields.year" class="label">
                  <span class="label-text-alt text-error">{{
                    t('components.registry_submission.validation.required')
                  }}</span>
                </label>
              </div>

              <div class="form-control w-full mt-2">
                <label class="label">
                  <span class="label-text"
                    >{{ t('components.registry_submission.form_labels.model') }} <span class="text-error">*</span></span
                  >
                  <span class="label-text-alt"><i class="fad fa-car"></i></span>
                </label>
                <input
                  type="text"
                  :placeholder="t('components.registry_submission.placeholders.model')"
                  v-model="details.model"
                  class="input input-bordered w-full"
                  :class="{ 'input-error': details.model === '' && touchedFields.model }"
                  required
                  @blur="touchedFields.model = true"
                />
                <label v-if="details.model === '' && touchedFields.model" class="label">
                  <span class="label-text-alt text-error">{{
                    t('components.registry_submission.validation.required')
                  }}</span>
                </label>
              </div>

              <div class="form-control w-full mt-2">
                <label class="label">
                  <span class="label-text"
                    >{{ t('components.registry_submission.form_labels.trim') }} <span class="text-error">*</span></span
                  >
                  <span class="label-text-alt"><i class="fad fa-scissors"></i></span>
                </label>
                <input
                  type="text"
                  :placeholder="t('components.registry_submission.placeholders.trim')"
                  v-model="details.trim"
                  class="input input-bordered w-full"
                  :class="{ 'input-error': details.trim === '' && touchedFields.trim }"
                  required
                  @blur="touchedFields.trim = true"
                />
                <label v-if="details.trim === '' && touchedFields.trim" class="label">
                  <span class="label-text-alt text-error">{{
                    t('components.registry_submission.validation.required')
                  }}</span>
                </label>
              </div>

              <div class="form-control w-full mt-2">
                <label class="label">
                  <span class="label-text"
                    >{{ t('components.registry_submission.form_labels.body_type') }}
                    <span class="text-error">*</span></span
                  >
                  <span class="label-text-alt"><i class="fad fa-cars"></i></span>
                </label>
                <select
                  v-model="details.bodyType"
                  class="select select-bordered w-full"
                  :class="{ 'select-error': details.bodyType === '' && touchedFields.bodyType }"
                  required
                  @blur="touchedFields.bodyType = true"
                  @change="touchedFields.bodyType = true"
                >
                  <option value="Saloon">{{ t('components.registry_submission.body_types.saloon') }}</option>
                  <option value="Pickup">{{ t('components.registry_submission.body_types.pickup') }}</option>
                  <option value="Estate">{{ t('components.registry_submission.body_types.estate') }}</option>
                  <option value="Cabriolet">{{ t('components.registry_submission.body_types.cabriolet') }}</option>
                  <option value="Clubman">{{ t('components.registry_submission.body_types.clubman') }}</option>
                  <option value="Van">{{ t('components.registry_submission.body_types.van') }}</option>
                  <option value="Hornet">{{ t('components.registry_submission.body_types.hornet') }}</option>
                </select>
                <label v-if="details.bodyType === '' && touchedFields.bodyType" class="label">
                  <span class="label-text-alt text-error">{{
                    t('components.registry_submission.validation.required')
                  }}</span>
                </label>
              </div>
            </div>
            <div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text"
                    >{{ t('components.registry_submission.form_labels.original_engine_size') }}
                    <span class="text-error">*</span></span
                  >
                  <span class="label-text-alt"><i class="fad fa-engine"></i></span>
                </label>
                <select
                  v-model.number="details.engineSize"
                  class="select select-bordered w-full"
                  :class="{ 'select-error': !details.engineSize && touchedFields.engineSize }"
                  required
                  @blur="touchedFields.engineSize = true"
                  @change="touchedFields.engineSize = true"
                >
                  <option v-for="size in [850, 997, 998, 1100, 1275]" :key="size" :value="size">
                    {{ size }}
                  </option>
                </select>
                <label v-if="!details.engineSize && touchedFields.engineSize" class="label">
                  <span class="label-text-alt text-error">{{
                    t('components.registry_submission.validation.required')
                  }}</span>
                </label>
              </div>

              <div class="form-control w-full mt-2">
                <label class="label">
                  <span class="label-text">{{ t('components.registry_submission.form_labels.factory_color') }}</span>
                  <span class="label-text-alt"><i class="fad fa-palette"></i></span>
                </label>
                <input
                  type="text"
                  :placeholder="t('components.registry_submission.placeholders.color')"
                  v-model="details.color"
                  class="input input-bordered w-full"
                />
              </div>

              <div class="form-control w-full mt-2">
                <label class="label">
                  <span class="label-text">{{
                    t('components.registry_submission.form_labels.body_shell_number')
                  }}</span>
                  <span class="label-text-alt"><i class="fad fa-hashtag"></i></span>
                </label>
                <input
                  type="text"
                  :placeholder="t('components.registry_submission.placeholders.body_number')"
                  v-model="details.bodyNum"
                  class="input input-bordered w-full"
                />
              </div>

              <div class="form-control w-full mt-2">
                <label class="label">
                  <span class="label-text">{{
                    t('components.registry_submission.form_labels.engine_plate_number')
                  }}</span>
                  <span class="label-text-alt"><i class="fad fa-hashtag"></i></span>
                </label>
                <input
                  type="text"
                  :placeholder="t('components.registry_submission.placeholders.engine_number')"
                  v-model="details.engineNum"
                  class="input input-bordered w-full"
                />
              </div>
            </div>
            <div class="col-span-1 md:col-span-2">
              <div class="form-control w-full">
                <fieldset class="fieldset">
                  <legend class="fieldset-legend">
                    {{ t('components.registry_submission.form_labels.special_notes') }}
                    <span class="label-text-alt"><i class="fad fa-note"></i></span>
                  </legend>
                  <textarea
                    class="textarea h-24 w-full"
                    :placeholder="t('components.registry_submission.placeholders.notes')"
                    v-model="details.notes"
                  ></textarea>
                </fieldset>
              </div>
            </div>
          </div>
          <div class="mt-6">
            <div v-if="apiError" class="alert alert-error mb-4">
              <i class="fa-duotone fa-circle-exclamation"></i>
              <div>
                <h3 class="font-bold">{{ t('components.registry_submission.error.title') }}</h3>
                <div class="text-sm">
                  {{ t('components.registry_submission.error.message') }}
                  <p class="mt-2">{{ t('components.registry_submission.error.check_entries') }}</p>
                </div>
              </div>
              <button class="btn btn-sm" @click="apiError = false">
                {{ t('components.registry_submission.error.dismiss') }}
              </button>
            </div>
            <button
              class="btn btn-primary btn-lg"
              :class="{ 'btn-disabled': !validateForm() }"
              :disabled="processing"
              @click="debouncedSubmit()"
            >
              <i class="fad fa-paper-plane mr-2" v-if="!processing"></i>
              <span class="loading loading-spinner" v-if="processing"></span>
              {{ t('components.registry_submission.submit_button') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .fad.fa-asterisk {
    font-size: 1rem !important;
  }
</style>
