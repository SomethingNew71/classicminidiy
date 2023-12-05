import { VueReCaptcha, useReCaptcha } from 'vue-recaptcha-v3';

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();

  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey: config.app.recaptchaSite,
    loaderOptions: { autoHideBadge: true },
  });

  const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();
  await recaptchaLoaded();
  nuxtApp.provide('useRecaptcha', executeRecaptcha);
});
