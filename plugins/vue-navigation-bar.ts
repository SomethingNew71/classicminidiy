// @ts-ignore
import VueNavigationBar from 'vue-navigation-bar';
import { defineNuxtPlugin } from '#app';
import 'vue-navigation-bar/dist/vue-navigation-bar.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('NavBar', VueNavigationBar);
});
