import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, fa } from 'vuetify/iconsets/fa';
const cmdiyTheme = {
  dark: false,
  colors: {
    primary: '#859369',
    secondary: '#ED7135',
    'brand-green-1': '#5E6647',
    'brand-green-2': '#859369',
    'brand-green-3': '#99A078',
    'brand-blue-1': '#3170A2',
    error: '#b22222',
    success: '#4a7023',
    warning: '#b22222',
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    icons: {
      defaultSet: 'fa',
      aliases,
      sets: {
        fa,
      },
    },
    theme: {
      defaultTheme: 'cmdiyTheme',
      themes: {
        cmdiyTheme,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
