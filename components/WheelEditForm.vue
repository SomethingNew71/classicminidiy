<template>
  <form action="">
    <div v-if="processing" class="modal-card">
      <div class="modal-card-body has-text-centered pt-5">
        <i class="is-size-1 has-text-primary fa-duotone fa-arrows-rotate fa-spin fa-beat mt-5 mb-2"></i>
        <h1 class="is-size-3 pb-1">Processing</h1>
      </div>
    </div>
    <div v-if="!processing && issueCreated && suggestion && !apiError" class="modal-card">
      <div class="modal-card-body has-text-centered pt-5">
        <i class="is-size-1 has-text-success fa-duotone fa-box-check fa-beat pt-5 pb-2"></i>
        <h1 class="is-size-3 pb-1">Thank you!</h1>
        <h2 class="is-size-5 pb-4">Your suggestion has been submitted</h2>
        <ul class="pb-5">
          <li class="pb-2">
            Your suggestion number is <strong>{{ suggestion.number }}</strong>
          </li>
          <li>
            Track your suggestion here:
            <a target="_blank" :href="suggestion.url"> Suggestion {{ suggestion.number }}</a>
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
          There was a problem submitting your suggestion at this time, please try again later!
        </h2>
        <p class="pb-5">
          The github API returned: <code>{{ apiMessage }}</code>
        </p>
      </div>
    </div>
    <div v-if="!processing && !issueCreated && !suggestion && !apiError" class="modal-card">
      <header class="modal-card-head">
        <h1 class="modal-card-title">Help add More Details!</h1>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>
      <section class="modal-card-body">
        <nav class="panel">
          <p class="panel-heading">Current Details</p>
          <label class="panel-block">
            <i class="fad fa-drivers-license pr-1"></i> Name -
            {{ wheel.name || 'N/A' }}
          </label>
          <label class="panel-block">
            <i class="fad fa-expand-arrows-alt pr-1"></i> Size -
            {{ wheel.size || 'N/A' }}
          </label>
          <label class="panel-block">
            <i class="fad fa-arrow-alt-from-left pr-1"></i> Offset -
            {{ wheel.offset || 'N/A' }}
          </label>
          <label class="panel-block">
            <i class="fad fa-box-full pr-1"></i> Material -
            {{ wheel.type || 'N/A' }}
          </label>
          <label class="panel-block"> <i class="fad fa-note pr-1"></i> Notes - {{ wheel.notes || 'N/A' }} </label>
        </nav>
        <div class="columns is-multiline pt-3">
          <div class="column is-12">
            <h2>
              <strong>Contact Info:</strong>
            </h2>
          </div>
          <div class="column is-half">
            <o-field class="pb-3" :label-position="'on-border'" label="Your Name (Optional)">
              <o-input v-model="newDetails.submittedBy" maxlength="50" icon="signature" icon-pack="fad"></o-input>
            </o-field>
          </div>
          <div class="column is-half">
            <o-field class="pb-3" :label-position="'on-border'" label="Your Email (Optional)">
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
            <o-field class="pb-3" :label-position="'on-border'" label="Wheel Name">
              <o-input
                v-model="newDetails.name"
                icon="drivers-license"
                icon-pack="fad"
                :placeholder="wheel.name || 'ex. Cool Wheel'"
              ></o-input>
            </o-field>
            <o-field class="pb-3" :label-position="'on-border'" label="Wheel Offset">
              <o-input
                v-model="newDetails.offset"
                icon="arrow-alt-from-left"
                icon-pack="fad"
                :placeholder="wheel.offset || 'ex. ET24'"
              ></o-input>
            </o-field>
            <o-field class="pb-3" :label-position="'on-border'" label="Wheel Width">
              <o-input
                v-model="newDetails.size"
                icon="text-width"
                icon-pack="fad"
                :placeholder="wheel.size || 'ex. 10x5'"
              ></o-input>
            </o-field>
          </div>
          <div class="column is-half">
            <o-field class="pb-3" :label-position="'on-border'" label="Wheel Size">
              <o-input
                v-model="newDetails.majorSize"
                icon="expand-arrows-alt"
                icon-pack="fad"
                :placeholder="wheel.majorSize || 'ex. 10inch'"
              ></o-input>
            </o-field>
            <o-field class="pb-3" :label-position="'on-border'" label="Wheel Material">
              <o-input
                v-model="newDetails.type"
                icon="box-full"
                icon-pack="fad"
                :placeholder="wheel.type || 'ex. Steel'"
              ></o-input>
            </o-field>
          </div>
          <div class="column is-12">
            <o-field :label-position="'on-border'" label="Wheel Notes">
              <o-input
                v-model="newDetails.notes"
                maxlength="200"
                type="textarea"
                :placeholder="wheel.notes || 'ex. Wheel was only produced from 1959 to 1960'"
              ></o-input>
            </o-field>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <o-button label="Close" @click="$emit('close')" />
        <o-button label="Submit" type="is-primary" @click="updateWheel" />
      </footer>
    </div>
  </form>
</template>
<script>
  import axios from 'axios';

  export default defineComponent({
    props: {
      wheel: {
        type: Object,
        default() {
          return {
            imagepath: '',
            imagewebp: '',
            name: '',
            offset: '',
            notes: '',
            size: '',
            majorSize: '',
            type: '',
          };
        },
        required: true,
      },
    },
    emits: ['close'],
    data() {
      return {
        newDetails: {
          name: '',
          offset: '',
          notes: '',
          size: '',
          majorSize: '',
          type: '',
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
    methods: {
      async updateWheel() {
        this.processing = true;
        await axios
          .post('/api/wheels', {
            wheel: this.wheel,
            newDetails: this.newDetails,
          })
          .then((response) => {
            this.issueCreated = true;
            this.apiError = false;
            this.suggestion = {
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
<style lang="scss" scoped>
  .fa-drivers-license {
    color: #659cc8;
  }
  .fa-expand-arrows-alt {
    color: #ff9a00;
  }
  .fa-box-full {
    color: #522b1a;
  }
  .fa-arrow-alt-from-left {
    color: #0d6628;
  }
  .fa-note {
    color: #ffd700;
  }
</style>
