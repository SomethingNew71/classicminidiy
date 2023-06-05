import VueGtag from 'vue-gtag';
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    config: {
      id: 'G-FBH0E64HM1',
    },
  });
});
