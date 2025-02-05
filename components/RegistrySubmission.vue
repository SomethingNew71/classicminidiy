<script lang="ts" setup>
  import axios from 'axios';
  import type { RegistryItem, RegistryQueueSubmissionResponse } from '~/data/models/registry';
  const form = ref(false);
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

  async function submit() {
    processing.value = true;
    try {
      const response = await axios.post<RegistryQueueSubmissionResponse>('/api/registry/queue/submit', {
        details: details.value,
      });
      issueCreated.value = true;
      submission.value.number = response.data.issueNumber;
      submission.value.url = response.data.issueUrl;
      if (response.data.issueNumber) {
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
  }

  function submitAnotherMini() {
    issueCreated.value = false;
    apiError.value = false;
    submission.value = { number: null, url: null };
  }
</script>

<template>
  <div class="card">
    <header class="card-header">
      <h3 class="card-header-title">Submit Your Mini</h3>
    </header>
    <div class="card-content">
      <div v-if="!processing && issueCreated && submission && !apiError">
        <div class="modal-card-body has-text-centered pt-5">
          <i class="is-size-1 has-text-success fa-duotone fa-box-check fa-beat pt-5 pb-2"></i>
          <h1 class="is-size-3 pb-1">Thank you!</h1>
          <h2 class="is-size-5 pb-4">
            Your registry entry has been submitted. Please allow 1-2 days for it to appear in the list.
          </h2>
          <ul class="pb-5">
            <li class="pb-2">
              Your registry submission details. is <strong>{{ submission.number }}</strong>
            </li>
            <li>
              Track your submission here:
              <a target="_blank" v-if="submission.url" :href="submission.url"> Submission {{ submission.number }}</a>
            </li>
          </ul>
          <v-btn color="primary" prepend-icon="fa-duotone fa-solid fa-plus-large" @click="submitAnotherMini()">
            Submit Another Mini</v-btn
          >
        </div>
      </div>
      <div v-if="!issueCreated">
        <v-form v-model="form" @submit.prevent="submit">
          <div class="columns is-multiline pt-3">
            <div class="column is-12">
              <h2 class="is-size-4"><strong>Personal Info:</strong></h2>
            </div>
            <div class="column is-half">
              <v-text-field
                label="Your Name"
                v-model="details.submittedBy"
                placeholder="Cole G"
                :rules="[rules.required]"
                append-inner-icon="fad fa-asterisk"
                prepend-icon="fad fa-signature"
                variant="outlined"
              ></v-text-field>
            </div>
            <div class="column is-half">
              <v-text-field
                label="Email Address (to prevent spam)"
                v-model="details.submittedByEmail"
                placeholder="minis@arecool.com"
                :rules="[rules.required, rules.email]"
                append-inner-icon="fad fa-asterisk"
                prepend-icon="fad fa-at"
                variant="outlined"
              ></v-text-field>
            </div>
            <div class="column is-12">
              <h2 class="is-size-4"><strong>Car Details:</strong></h2>
            </div>
            <div class="column is-half">
              <v-number-input
                :reverse="false"
                controlVariant="split"
                label="Model Year"
                :max="2000"
                :min="1959"
                :hideInput="false"
                :inset="false"
                v-model="details.year"
                :rules="[rules.required]"
                prepend-icon="fad fa-calendar"
                variant="outlined"
              ></v-number-input>
              <v-text-field
                label="Model"
                v-model="details.model"
                placeholder="ex. Morris Mini"
                :rules="[rules.required]"
                append-inner-icon="fad fa-asterisk"
                prepend-icon="fad fa-car"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                label="Trim"
                v-model="details.trim"
                placeholder="ex. Mini 50"
                :rules="[rules.required]"
                append-inner-icon="fad fa-asterisk"
                prepend-icon="fad fa-scissors"
                variant="outlined"
              ></v-text-field>
              <v-select
                label="Body Type"
                v-model="details.bodyType"
                prepend-icon="fad fa-cars"
                :rules="[rules.required]"
                :items="['Saloon', 'Pickup', 'Estate', 'Cabriolet', 'Clubman', 'Van', 'Hornet']"
                variant="outlined"
              ></v-select>
            </div>
            <div class="column is-half">
              <v-select
                label="Original Engine Size"
                v-model="details.engineSize"
                :items="[850, 997, 998, 1100, 1275]"
                placeholder="ex. 1275"
                :rules="[rules.required]"
                append-inner-icon="fad fa-asterisk"
                prepend-icon="fad fa-engine"
                variant="outlined"
              >
              </v-select>
              <v-text-field
                label="Factory Color"
                v-model="details.color"
                placeholder="ex. Clipper Blue"
                prepend-icon="fad fa-palette"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                label="Body Shell Number"
                v-model="details.bodyNum"
                placeholder="ex. GB190fW"
                prepend-icon="fad fa-hashtag"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                label="Engine Plate Number"
                v-model="details.engineNum"
                placeholder="ex. 12H4102"
                prepend-icon="fad fa-hashtag"
                variant="outlined"
              ></v-text-field>
            </div>
            <div class="column is-12">
              <v-textarea
                label="Special or Additional Notes"
                variant="outlined"
                prepend-icon="fad fa-note"
                v-model="details.notes"
                clearable
                :placeholder="'ex. This car was only produced from 1959 to 1960'"
              ></v-textarea>
            </div>
          </div>
          <div>
            <v-alert v-model="apiError" title="I'm Sorry!" type="error" variant="outlined" :closable="true">
              <h2 class="is-size-6 pb-4">
                There was a problem submitting your submission at this time, please try again later!
              </h2>
              <p class="pb-5">Please check your entries and try again</p>
            </v-alert>
            <v-btn
              :disabled="!form"
              :loading="processing"
              prepend-icon="fad fa-paper-plane"
              size="x-large"
              color="primary"
              @click="debouncedSubmit()"
            >
              Submit
            </v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .v-picker-title {
    display: none !important;
  }
  .v-picker__header {
    padding-top: 1rem;
    .v-date-picker-header {
      .v-date-picker-header__content {
        font-size: 1rem;
      }
    }
  }
  .fad.fa-asterisk {
    font-size: 1rem !important;
  }
</style>
