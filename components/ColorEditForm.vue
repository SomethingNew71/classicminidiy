<template>
  <form action="">
    <div v-if="processing" class="modal-card">
      <div class="modal-card-body has-text-centered pt-5">
        <i
          class="is-size-1 has-text-primary fa-duotone fa-arrows-rotate fa-spin fa-beat mt-5 mb-2"
        ></i>
        <h1 class="is-size-3 pb-1">Processing</h1>
      </div>
    </div>
    <div
      v-if="!processing && issueCreated && suggestion && !apiError"
      class="modal-card"
    >
      <div class="modal-card-body has-text-centered pt-5">
        <i
          class="is-size-1 has-text-success fa-duotone fa-box-check fa-beat pt-5 pb-2"
        ></i>
        <h1 class="is-size-3 pb-1">Thank you!</h1>
        <h2 class="is-size-5 pb-4">Your suggestion has been submitted</h2>
        <ul class="pb-5">
          <li class="pb-2">
            Your suggestion number is <strong>{{ suggestion.number }}</strong>
          </li>
          <li>
            Track your suggestion here:
            <a target="_blank" :href="suggestion.url">
              Suggestion {{ suggestion.number }}</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div v-if="!processing && !issueCreated && apiError" class="modal-card">
      <div class="modal-card-body has-text-centered pt-5">
        <i
          class="is-size-1 has-text-danger fa-duotone fa-triangle-exclamation fa-flash pt-5 pb-2"
          style="--fa-flash-opacity: 0.67; --fa-flash-scale: 1.075"
        ></i>
        <h1 class="is-size-3 pb-1">I'm sorry!</h1>
        <h2 class="is-size-6 pb-4">
          There was a problem submitting your suggestion at this time, please
          try again later!
        </h2>
        <p class="pb-5">
          The github API returned: <code>{{ apiMessage }}</code>
        </p>
      </div>
    </div>
    <div
      v-if="!processing && !issueCreated && !suggestion && !apiError"
      class="modal-card"
    >
      <header class="modal-card-head">
        <h1 class="modal-card-title">Help add More Details!</h1>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <nav class="panel">
          <p class="panel-heading">Current Details</p>
          <label class="panel-block">
            <i class="fad fa-drivers-license pr-3"></i> Name -
            {{ color.name || 'N/A' }}
          </label>
          <label class="panel-block">
            <i class="fad fa-palette pr-3"></i> Primary Color -
            {{ color.primaryColor || 'N/A' }}
          </label>
          <label class="panel-block">
            <i class="fad fa-brackets-curly bmc pr-3"></i> BMC Code -
            {{ color.code || 'N/A' }}
          </label>
          <label class="panel-block">
            <i class="fad fa-brackets-curly ppg pr-3"></i> PPG/Ditzler Code -
            {{ color.ditzlerPpgCode || 'N/A' }}
          </label>
          <label class="panel-block">
            <i class="fad fa-brackets-curly dulux pr-3"></i> Dulux Code -
            {{ color.duluxCode || 'N/A' }}
          </label>
          <label class="panel-block">
            <i class="fad fa-code pr-3"></i> Short Code -
            {{ color.shortCode || 'N/A' }}
          </label>
          <label class="panel-block">
            <i class="fad fa-calendar pr-3"></i> Years Used -
            {{ color.years || 'N/A' }}
          </label>
          <label class="panel-block">
            <i class="fad fa-note pr-3"></i> Notes - {{ color.notes || 'N/A' }}
          </label>
        </nav>
        <div class="columns is-multiline pt-3">
          <div class="column is-12">
            <h2>
              <strong>Contact Info:</strong>
            </h2>
          </div>
          <div class="column is-half">
            <o-field
              class="pb-3"
              :label-position="'on-border'"
              label="Your Name (Optional)"
            >
              <o-input
                v-model="newDetails.submittedBy"
                maxlength="50"
                icon="signature"
                icon-pack="fad"
              ></o-input>
            </o-field>
          </div>
          <div class="column is-half">
            <o-field
              class="pb-3"
              :label-position="'on-border'"
              label="Your Email (Optional)"
            >
              <o-input
                v-model="newDetails.submittedByEmail"
                maxlength="50"
                type="email"
                icon="at"
                icon-pack="fad"
              ></o-input>
            </o-field>
          </div>
          <div class="column is-12">
            <h2>
              <strong>Suggested Changes:</strong>
            </h2>
          </div>
          <div class="column is-half">
            <o-field
              class="pb-3"
              :label-position="'on-border'"
              label="Color Name"
            >
              <o-input
                v-model="newDetails.name"
                icon="drivers-license"
                icon-pack="fad"
                :placeholder="color.name || 'ex. Cool Wheel'"
              ></o-input>
            </o-field>
            <o-field
              class="pb-3"
              :label-position="'on-border'"
              label="Primary Color"
            >
              <o-input
                v-model="newDetails.primaryColor"
                icon="palette"
                icon-pack="fad"
                :placeholder="color.primaryColor || 'Blue'"
              ></o-input>
            </o-field>
            <o-field
              class="pb-3"
              :label-position="'on-border'"
              label="PPG/Ditzler Color Code"
            >
              <o-input
                v-model="newDetails.ditzlerPpgCode"
                icon="brackets-curly"
                icon-pack="fad"
                :placeholder="color.ditzlerPpgCode || '123124'"
              ></o-input>
            </o-field>
            <o-field
              class="pb-3"
              :label-position="'on-border'"
              label="Years Used"
            >
              <o-input
                v-model="newDetails.years"
                icon="calendar"
                icon-pack="fad"
                :placeholder="color.years || '1967 - 1970'"
              ></o-input>
            </o-field>
          </div>
          <div class="column is-half">
            <o-field
              class="pb-3"
              :label-position="'on-border'"
              label="BMC Color Code"
            >
              <o-input
                v-model="newDetails.code"
                icon="brackets-curly"
                icon-pack="fad"
                :placeholder="color.code || 'BMC12345'"
              ></o-input>
            </o-field>
            <o-field
              class="pb-3"
              :label-position="'on-border'"
              label="Short Code"
            >
              <o-input
                v-model="newDetails.shortCode"
                icon="code"
                icon-pack="fad"
                :placeholder="color.shortCode || 'MET'"
              ></o-input>
            </o-field>
            <o-field
              class="pb-3"
              :label-position="'on-border'"
              label="Dulux Color Code"
            >
              <o-input
                v-model="newDetails.duluxCode"
                icon="brackets-curly"
                icon-pack="fad"
                :placeholder="color.duluxCode || '123145'"
              ></o-input>
            </o-field>
          </div>
          <div class="column is-12">
            <o-field :label-position="'on-border'" label="Additional Notes">
              <o-input
                v-model="newDetails.notes"
                maxlength="200"
                type="textarea"
                :placeholder="
                  color.notes ||
                  'ex. References, special information, or anything else you would like to add '
                "
              ></o-input>
            </o-field>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <o-button label="Close" @click="$emit('close')" />
        <o-button label="Submit" type="is-primary" @click="updateColor" />
      </footer>
    </div>
  </form>
</template>
<script>
  import { debounce } from 'debounce';
  import axios from 'axios';

  export default defineComponent({
    props: {
      color: {
        type: Object,
        default() {
          return {
            primaryColor: '',
            code: '',
            imageSwatch: '',
            ditzlerPpgCode: '',
            duluxCode: '',
            name: '',
            shortCode: '',
            years: '',
          };
        },
        required: true,
      },
    },
    emits: ['close'],
    data() {
      return {
        newDetails: {
          primaryColor: '',
          code: '',
          imageSwatch: '',
          ditzlerPpgCode: '',
          duluxCode: '',
          name: '',
          shortCode: '',
          years: '',
          notes: '',
          submittedBy: '',
          submittedByEmail: '',
        },
        issueCreated: false,
        apiError: false,
        apiMessage: undefined,
        suggestion: undefined,
        processing: false,
      };
    },
    created() {
      this.updateColor = debounce(this.updateColor, 500);
    },
    methods: {
      async updateColor() {
        this.processing = true;
        await useFetch('/api/colors', {
          method: 'POST',
          body: {
            color: this.color,
            newDetails: this.newDetails,
          },
        })
          .then((response) => {
            console.log('GOT A RESPONSE', response.data);
            this.issueCreated = true;
            this.apiError = false;
            this.suggestion = {
              number: response.data._rawValue.number,
              url: response.data._rawValue.url,
            };
          })
          .catch(() => {
            this.issueCreated = false;
            this.apiError = true;
            this.apiMessage =
              'GitHub API is currently unavailable. Please try again later.';
          })
          .finally(() => {
            this.processing = false;
          });
      },
    },
  });
</script>
<style lang="scss" scoped>
  .fa-drivers-license {
    color: #659cc8;
  }
  .fa-brackets-curly {
    &.bmc {
      color: #e55f33;
    }
    &.ppg {
      color: #3170a2;
    }
    &.dulux {
      color: #192560;
    }
  }
  .fa-calendar {
    color: #ff9a00;
  }
  .fa-palette {
    color: #522b1a;
  }
  .fa-code {
    color: #0d6628;
  }
  .fa-note {
    color: #ffd700;
  }
</style>
