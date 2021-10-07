<template>
  <div>
    <b-button
      label="Launch component modal"
      type="is-primary"
      size="is-medium"
      @click="isComponentModalActive = true"
    />

    <b-modal
      v-model="isComponentModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-label="Example Modal"
      aria-modal
    >
      <form action="">
        <div v-if="processing" class="modal-card">
          <div class="modal-card-body has-text-centered pt-5">
            <i class="is-size-1 has-text-primary fa-duotone fa-arrows-rotate fa-spin fa-beat mt-5 mb-2"></i>
            <h1 class="is-size-3 pb-1">
              Processing
            </h1>
          </div>
        </div>
        <div v-if="!processing && !questionSent && !apiError" class="modal-card">
          <header class="modal-card-head">
            <h1 class="modal-card-title">
              Ask a Question!
            </h1>
            <button type="button" class="delete" @click="$emit('close')" />
          </header>
          <section class="modal-card-body">
            <p class="pb-5">
              Classic Mini DIY has always been about making things easier for everyone! If you have a technical question you would like to ask me, fill out the details below and I will get back to you within approx 5 days or less!
            </p>
            <b-field label="Email">
              <b-input
                type="email"
                :value="email"
                required
              >
              </b-input>
            </b-field>

            <b-field label="Name">
              <b-input
                type="text"
                :value="name"
                required
              >
              </b-input>
            </b-field>

            <b-field label="Your Question">
              <b-input
                type="textarea"
                :value="body"
                minlength="10"
                maxlength="100"
                required
              >
              </b-input>
            </b-field>

            <b-field label="Mini Information">
              <b-input
                type="textarea"
                :value="miniInfo"
                minlength="10"
                maxlength="100"
                required
              >
              </b-input>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button label="Close" @click="isComponentModalActive=false" />
            <b-button label="Login" type="is-primary" @click="onSubmit()" />
          </footer>
        </div>
        <div v-if="!processing && questionSent && !apiError" class="modal-card">
          <div class="modal-card-body has-text-centered pt-5">
            <i class="is-size-1 has-text-success fa-duotone fa-box-check fa-beat pt-5 pb-2"></i>
            <h1 class="is-size-3 pb-1">
              Thank you!
            </h1>
            <h2 class="is-size-5 pb-4">
              Your question has been submitted
            </h2>
            <p class="is-size-6">
              Please allow me a few days to get back to you.
            </p>
            <b-button label="Close" @click="isComponentModalActive=false, questionSent=false" />
          </div>
        </div>
        <div v-if="!processing && !questionSent && apiError" class="modal-card">
          <div class="modal-card-body has-text-centered pt-5">
            <i class="is-size-1 has-text-danger fa-duotone fa-triangle-exclamation fa-flash pt-5 pb-2" style="--fa-flash-opacity: 0.67; --fa-flash-scale: 1.075;"></i>
            <h1 class="is-size-3 pb-1">
              I'm sorry!
            </h1>
            <h2 class="is-size-6 pb-4">
              There was a problem submitting your question at this time, please try again later!
            </h2>
            <b-button label="Close" @click="isComponentModalActive=false" />
            <b-button label="Try Again" type="is-primary" @click="apiError=false" />
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data () {
    return {
      isComponentModalActive: false,
      email: undefined,
      name: undefined,
      body: undefined,
      miniInfo: undefined,
      questionSent: false,
      apiError: false,
      processing: false

    };
  },
  async mounted () {
    try {
      await this.$recaptcha.init();
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    async onSubmit () {
      this.processing = true;
      await this.$recaptcha.execute('login').catch((e) => {
        console.error(e);
      });
      await axios.post('https://t0k3hjzq09.execute-api.us-east-1.amazonaws.com/dev/mailjet/email', {
        formEmail: 'fasdfjhalsdkfjasd',
        // formEmail: this.email,
        formName: 'sadakljsdhhhhj',
        // formName: this.name,
        formBody: 'dasdasaasd',
        // formBody: this.body,
        formMiniInfo: 'fjaiosyatksndbafkdsjbf'
        // formMiniInfo: this.miniInfo
      }).then(() => {
        this.questionSent = true;
        this.apiError = false;
      }).catch(() => {
        this.questionSent = false;
        this.apiError = true;
      }).finally(() => {
        this.processing = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
