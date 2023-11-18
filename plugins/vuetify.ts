import { createVuetify } from 'vuetify';
import { VBtn } from 'vuetify/components/VBtn';
import { VImg } from 'vuetify/components/VImg';
import { VDataTable, VDataTableServer, VDataTableVirtual } from 'vuetify/components/VDataTable';
import { aliases, fa } from 'vuetify/iconsets/fa';
const cmdiyTheme = {
  dark: false,
  colors: {
    primary: '#659cc8',
    secondary: '#03DAC6',
    error: '#b22222',
    success: '#4a7023',
    warning: '#b22222',
  },
};

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      VBtn,
      VImg,
      VDataTable,
      VDataTableServer,
      VDataTableVirtual,
    },
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
