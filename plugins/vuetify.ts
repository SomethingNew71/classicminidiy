import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, fa } from 'vuetify/iconsets/fa';
const cmdiyTheme = {
  dark: false,
  colors: {
    // primary: '#859369',
    primary: '#659cc8',
    brandGreen: '#5E6647',
    brandLightGreen: '#859369',
    secondary: '#03DAC6',
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
