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
        <div class="columns is-multiline pt-3">
          <div class="column is-half">
            <o-field class="pb-3" :label-position="'on-border'" label="Your Name">
              <o-input v-model="details.submittedBy" maxlength="50" icon="signature" icon-pack="fad"></o-input>
            </o-field>
          </div>
          <div class="column is-half">
            <o-field class="pb-3" :label-position="'on-border'" label="Your Email">
              <o-input
                v-model="details.submittedByEmail"
                maxlength="50"
                type="email"
                icon="at"
                icon-pack="fad"
              ></o-input>
            </o-field>
          </div>
          <div class="column is-12">
            <h2 class="is-size-4"><strong>Car Details:</strong></h2>
          </div>
          <div class="column is-half">
            <o-field class="pb-3" :label-position="'on-border'" label="Model Year">
              <o-input v-model="details.year" icon="calendar" icon-pack="fad" :placeholder="'1960'"></o-input>
            </o-field>
            <o-field class="pb-3" :label-position="'on-border'" label="Model">
              <o-input v-model="details.model" icon="car" icon-pack="fad" :placeholder="'Morris Mini'"></o-input>
            </o-field>
            <o-field class="pb-3" :label-position="'on-border'" label="Trim">
              <o-input v-model="details.trim" icon="scissors" icon-pack="fad" :placeholder="'ex. Minor'"></o-input>
            </o-field>
            <o-field class="pb-3" :label-position="'on-border'" label="Body Type">
              <o-select
                icon="cars"
                icon-pack="fad"
                placeholder="Select your style"
                v-model="details.bodyType"
                :expanded="true"
              >
                <option value="Saloon">Saloon</option>
                <option value="Pickup">Pickup</option>
                <option value="Estate">Estate</option>
                <option value="Clubman">Clubman</option>
                <option value="Contryman">Contryman</option>
                <option value="Van">Van</option>
                <option value="Hornet">Hornet</option>
              </o-select>
            </o-field>
            <o-field class="pb-3" :label-position="'on-border'" label="Build or First Registration Date">
              <VueDatePicker v-model="details.buildDate" format="MM/dd/yyyy"></VueDatePicker>
            </o-field>
          </div>
          <div class="column is-half">
            <o-field class="pb-3" :label-position="'on-border'" label="Engine Size">
              <o-input v-model="details.engineSize" icon="engine" icon-pack="fad" :placeholder="'ex. 1293'"></o-input>
            </o-field>
            <o-field class="pb-3" :label-position="'on-border'" label="Factory Color">
              <o-input
                v-model="details.color"
                icon="palette"
                icon-pack="fad"
                :placeholder="'ex. Clipper Blue'"
              ></o-input>
            </o-field>
            <o-field class="pb-3" :label-position="'on-border'" label="Body Number">
              <o-input v-model="details.bodyNum" icon="hashtag" icon-pack="fad" :placeholder="'ex. GB190fW'"></o-input>
            </o-field>
            <o-field label="Engine Number">
              <o-input
                v-model="details.engineNum"
                icon="hashtag"
                icon-pack="fad"
                :placeholder="'ex. 12H4102'"
              ></o-input>
            </o-field>
          </div>
          <div class="column is-12">
            <o-field :label-position="'on-border'" label="Special Notes">
              <o-input
                v-model="details.notes"
                maxlength="200"
                type="textarea"
                :placeholder="'ex. This car was only produced from 1959 to 1960'"
              ></o-input>
            </o-field>
          </div>
        </div>
        <div>
          <o-button class="card-footer-item" label="Submit" variant="primary" size="medium" @click="submit()" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import axios from 'axios';
  import VueDatePicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';

  export default defineComponent({
    components: {
      VueDatePicker,
    },
    data() {
      return {
        details: {
          year: '',
          model: '',
          trim: '',
          bodyType: '',
          engineSize: '',
          color: '',
          bodyNum: '',
          engineNum: '',
          buildDate: [],
          notes: '',
          submittedBy: '',
          submittedByEmail: '',
        },
        issueCreated: false,
        apiError: false,
        apiMessage: '',
        submission: { number: null, url: null },
        processing: false,
      };
    },
    methods: {
      async submit() {
        this.processing = true;
        await axios
          .post('/api/registry/submit', {
            details: this.details,
          })
          .then((response) => {
            this.issueCreated = true;
            this.apiError = false;
            this.submission = {
              number: response.data.number,
              url: response.data.html_url,
            };
          })
          .catch(() => {
            this.issueCreated = false;
            this.apiError = true;
            this.apiMessage = 'GitHub API is currently unavailable. Please try again later.';
          })
          .finally(() => {
            this.processing = false;
          });
      },
    },
  });
</script>
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
</style>
