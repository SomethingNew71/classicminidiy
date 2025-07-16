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
    required: (value: string) => !!value || 'This field is required to submit',
    email: (value: string) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || 'Invalid e-mail.';
    },
  });
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
      apiMessage.value = 'API is currently unavailable. Please try again later.';
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
      <h2 class="card-title">Submit Your Mini</h2>
      <div v-if="!processing && issueCreated && submission && !apiError">
        <div class="text-center py-5">
          <i class="text-4xl text-success fa-duotone fa-box-check fa-beat py-5"></i>
          <h1 class="text-2xl font-bold mb-1">Thank you!</h1>
          <h2 class="text-lg mb-4">
            Your registry entry has been submitted. Please allow 1-2 days for it to appear in the list.
          </h2>
          <ul class="mb-5">
            <li class="mb-2">
              Your registry submission details is <strong>{{ submission.number }}</strong>
            </li>
            <li>
              Track your submission here:
              <a class="link link-primary" target="_blank" v-if="submission.url" :href="submission.url">
                Submission {{ submission.number }}</a
              >
            </li>
          </ul>
          <button class="btn btn-primary" @click="submitAnotherMini()">
            <i class="fa-duotone fa-solid fa-plus-large mr-2"></i>
            Submit Another Mini
          </button>
        </div>
      </div>
      <div v-if="!issueCreated">
        <form @submit.prevent="submit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3">
            <div class="col-span-1 md:col-span-2">
              <h2 class="text-xl font-bold">Personal Info:</h2>
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Your Name <span class="text-error">*</span></span>
                <span class="label-text-alt"><i class="fad fa-user"></i></span>
              </label>
              <input
                type="text"
                placeholder="ex. John Smith"
                v-model="details.submittedBy"
                class="input input-bordered w-full"
                :class="{ 'input-error': details.submittedBy === '' && touchedFields.submittedBy }"
                required
                @blur="touchedFields.submittedBy = true"
              />
              <label v-if="details.submittedBy === '' && touchedFields.submittedBy" class="label">
                <span class="label-text-alt text-error">This field is required to submit</span>
              </label>
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text">Your Email <span class="text-error">*</span></span>
                <span class="label-text-alt"><i class="fad fa-at"></i></span>
              </label>
              <input
                type="email"
                placeholder="ex. john@example.com"
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
                  {{ details.submittedByEmail === '' ? 'This field is required to submit' : 'Invalid e-mail.' }}
                </span>
              </label>
            </div>
            <div class="col-span-1 md:col-span-2">
              <h2 class="text-xl font-bold">Car Details:</h2>
            </div>
            <div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Model Year <span class="text-error">*</span></span>
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
                  <span class="label-text-alt text-error">This field is required to submit</span>
                </label>
              </div>

              <div class="form-control w-full mt-2">
                <label class="label">
                  <span class="label-text">Model <span class="text-error">*</span></span>
                  <span class="label-text-alt"><i class="fad fa-car"></i></span>
                </label>
                <input
                  type="text"
                  placeholder="ex. Morris Mini"
                  v-model="details.model"
                  class="input input-bordered w-full"
                  :class="{ 'input-error': details.model === '' && touchedFields.model }"
                  required
                  @blur="touchedFields.model = true"
                />
                <label v-if="details.model === '' && touchedFields.model" class="label">
                  <span class="label-text-alt text-error">This field is required to submit</span>
                </label>
              </div>

              <div class="form-control w-full mt-2">
                <label class="label">
                  <span class="label-text">Trim <span class="text-error">*</span></span>
                  <span class="label-text-alt"><i class="fad fa-scissors"></i></span>
                </label>
                <input
                  type="text"
                  placeholder="ex. Mini 50"
                  v-model="details.trim"
                  class="input input-bordered w-full"
                  :class="{ 'input-error': details.trim === '' && touchedFields.trim }"
                  required
                  @blur="touchedFields.trim = true"
                />
                <label v-if="details.trim === '' && touchedFields.trim" class="label">
                  <span class="label-text-alt text-error">This field is required to submit</span>
                </label>
              </div>

              <div class="form-control w-full mt-2">
                <label class="label">
                  <span class="label-text">Body Type <span class="text-error">*</span></span>
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
                  <option
                    v-for="type in ['Saloon', 'Pickup', 'Estate', 'Cabriolet', 'Clubman', 'Van', 'Hornet']"
                    :key="type"
                    :value="type"
                  >
                    {{ type }}
                  </option>
                </select>
                <label v-if="details.bodyType === '' && touchedFields.bodyType" class="label">
                  <span class="label-text-alt text-error">This field is required to submit</span>
                </label>
              </div>
            </div>
            <div>
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Original Engine Size <span class="text-error">*</span></span>
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
                  <span class="label-text-alt text-error">This field is required to submit</span>
                </label>
              </div>

              <div class="form-control w-full mt-2">
                <label class="label">
                  <span class="label-text">Factory Color</span>
                  <span class="label-text-alt"><i class="fad fa-palette"></i></span>
                </label>
                <input
                  type="text"
                  placeholder="ex. Clipper Blue"
                  v-model="details.color"
                  class="input input-bordered w-full"
                />
              </div>

              <div class="form-control w-full mt-2">
                <label class="label">
                  <span class="label-text">Body Shell Number</span>
                  <span class="label-text-alt"><i class="fad fa-hashtag"></i></span>
                </label>
                <input
                  type="text"
                  placeholder="ex. GB190fW"
                  v-model="details.bodyNum"
                  class="input input-bordered w-full"
                />
              </div>

              <div class="form-control w-full mt-2">
                <label class="label">
                  <span class="label-text">Engine Plate Number</span>
                  <span class="label-text-alt"><i class="fad fa-hashtag"></i></span>
                </label>
                <input
                  type="text"
                  placeholder="ex. 12H4102"
                  v-model="details.engineNum"
                  class="input input-bordered w-full"
                />
              </div>
            </div>
            <div class="col-span-1 md:col-span-2">
              <div class="form-control w-full">
                <fieldset class="fieldset">
                  <legend class="fieldset-legend">
                    Special or Additional Notes <span class="label-text-alt"><i class="fad fa-note"></i></span>
                  </legend>
                  <textarea
                    class="textarea h-24 w-full"
                    placeholder="ex. This car was only produced from 1959 to 1960"
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
                <h3 class="font-bold">I'm Sorry!</h3>
                <div class="text-sm">
                  There was a problem submitting your submission at this time, please try again later!
                  <p class="mt-2">Please check your entries and try again</p>
                </div>
              </div>
              <button class="btn btn-sm" @click="apiError = false">Dismiss</button>
            </div>
            <button
              class="btn btn-primary btn-lg"
              :class="{ 'btn-disabled': !validateForm() }"
              :disabled="processing"
              @click="debouncedSubmit()"
            >
              <i class="fad fa-paper-plane mr-2" v-if="!processing"></i>
              <span class="loading loading-spinner" v-if="processing"></span>
              Submit
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
