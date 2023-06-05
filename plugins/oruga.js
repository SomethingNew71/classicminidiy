import Oruga from '@oruga-ui/oruga-next';
import { bulmaConfig } from '@oruga-ui/theme-bulma';
import { defineNuxtPlugin } from '#app';
import '@oruga-ui/oruga-next/dist/oruga.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Oruga, bulmaConfig);
});
