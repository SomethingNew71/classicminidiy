<script lang="ts" setup>
  import axios from 'axios';
  defineProps({
    admin: {
      type: Boolean,
      default: false,
    },
  });
  const form = ref(false);
  const rules = ref({
    required: (value: string) => !!value || 'This field is required to submit',
    email: (value: string) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || 'Invalid e-mail.';
    },
  });
  const details = ref({
    year: '',
    model: '',
    trim: '',
    bodyType: 'Saloon',
    engineSize: '',
    color: '',
    bodyNum: '',
    engineNum: '',
    buildDate: [],
    notes: '',
    submittedBy: '',
    submittedByEmail: '',
    uniqueId: '',
  });
  const issueCreated = ref(false);
  const apiError = ref(false);
  const apiMessage = ref('');
  const submission = ref({ number: null, url: null });
  const processing = ref(false);
  const password = ref('');

  async function submit() {
    processing.value = true;
    await axios
      .post('/api/registry/submit', { details: details.value })
      .then((response) => {
        issueCreated.value = true;
        apiError.value = false;
        submission.value = {
          number: response.data.number,
          url: response.data.url,
        };
      })
      .catch(() => {
        issueCreated.value = false;
        apiError.value = true;
        apiMessage.value = 'API is currently unavailable. Please try again later.';
      })
      .finally(() => (processing.value = false));
  }
  async function adminSubmit() {
    processing.value = true;
    await axios
      .post('/api/registry/save', {
        details: {
          uniqueId: details.value.uniqueId,
          year: Number(details.value.year),
          model: details.value.model,
          trim: details.value.trim,
          bodyType: details.value.bodyType,
          engineSize: details.value.engineSize,
          color: details.value.color,
          bodyNum: details.value.bodyNum,
          engineNum: details.value.engineNum,
          buildDate: details.value.buildDate,
          notes: details.value.notes,
          submittedBy: details.value.submittedBy,
          submittedByEmail: details.value.submittedByEmail,
        },
        password: password.value,
      })
      .then(() => resetForm())
      .catch((err) => {
        issueCreated.value = false;
        apiError.value = true;
        apiMessage.value = `DynamoDb update failed - ${err}`;
      })
      .finally(() => (processing.value = false));
  }
  function resetForm() {
    details.value.uniqueId = '';
    details.value.year = '';
    details.value.model = '';
    details.value.trim = '';
    details.value.bodyType = 'Saloon';
    details.value.engineSize = '';
    details.value.color = '';
    details.value.bodyNum = '';
    details.value.engineNum = '';
    details.value.buildDate = [];
    details.value.notes = '';
    details.value.submittedBy = '';
    details.value.submittedByEmail = '';
  }
</script>

<template>
  <div class="card">
    <header class="card-header">
      <h3 class="card-header-title">Submit Your Mini</h3>
    </header>
    <div class="card-content">
      <div v-if="processing">
        <div class="has-text-centered pt-5">
          <i class="is-size-1 has-text-primary fa-duotone fa-arrows-rotate fa-spin fa-beat mt-5 mb-2"></i>
          <h1 class="is-size-3 pb-1">Processing</h1>
        </div>
      </div>
      <div v-if="!processing && issueCreated && submission && !apiError">
        <div class="modal-card-body has-text-centered pt-5">
          <i class="is-size-1 has-text-success fa-duotone fa-box-check fa-beat pt-5 pb-2"></i>
          <h1 class="is-size-3 pb-1">Thank you!</h1>
          <h2 class="is-size-5 pb-4">
            Your registry entry has been submitted. Please allow 1-2 days for it to appear in the list.
          </h2>
          <ul class="pb-5">
            <li class="pb-2">
              Your registry submission number is <strong>{{ submission.number }}</strong>
            </li>
            <li>
              Track your submission here:
              <a target="_blank" v-if="submission.url" :href="submission.url"> Submission {{ submission.number }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div v-if="!processing && !issueCreated && apiError">
        <div class="modal-card-body has-text-centered pt-5">
          <i
            class="is-size-1 has-text-danger fa-duotone fa-triangle-exclamation fa-flash pt-5 pb-2"
            style="--fa-flash-opacity: 0.67; --fa-flash-scale: 1.075"
          ></i>
          <h1 class="is-size-3 pb-1">I'm sorry!</h1>
          <h2 class="is-size-6 pb-4">
            There was a problem submitting your submission at this time, please try again later!
          </h2>
          <p class="pb-5">
            The github API returned: <code>{{ apiMessage }}</code>
          </p>
        </div>
      </div>
      <div v-if="!processing && !issueCreated && !apiError">
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
              <v-text-field
                label="Model Year"
                v-model="details.year"
                placeholder="ex. 1960"
                :rules="[rules.required]"
                append-inner-icon="fad fa-asterisk"
                prepend-icon="fad fa-calendar"
                variant="outlined"
              ></v-text-field>
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
              <v-text-field
                label="Original Engine Size"
                v-model="details.engineSize"
                placeholder="ex. 1275"
                :rules="[rules.required]"
                append-inner-icon="fad fa-asterisk"
                prepend-icon="fad fa-engine"
                variant="outlined"
              ></v-text-field>
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
          <div v-if="!admin">
            <v-btn :disabled="!form" prepend-icon="fad fa-paper-plane" size="x-large" color="primary" @click="submit()">
              Submit
            </v-btn>
          </div>
          <div v-if="admin">
            <v-text-field
              label="Unique ID"
              v-model="details.uniqueId"
              :rules="[rules.required]"
              prepend-icon="fad fa-fingerprint"
              append-inner-icon="fad fa-asterisk"
              variant="outlined"
            ></v-text-field>
            <v-text-field
              label="Password"
              v-model="password"
              :rules="[rules.required]"
              prepend-icon="fad fa-key"
              append-inner-icon="fad fa-asterisk"
              variant="outlined"
            ></v-text-field>
            <v-btn
              :disabled="!form"
              prepend-icon="fad fa-paper-plane"
              size="x-large"
              color="primary"
              @click="adminSubmit()"
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
