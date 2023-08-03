import { createVuetify } from 'vuetify';
import { VApp } from 'vuetify/components/VApp';
import { VBtn } from 'vuetify/components/VBtn';
import { VImg } from 'vuetify/components/VImg';
import { VIcon } from 'vuetify/components/VIcon';
import { VMenu } from 'vuetify/components/VMenu';
import {
  VList,
  VListItem,
  VListItemTitle,
  VListSubheader,
} from 'vuetify/components/VList';
import { VDivider } from 'vuetify/components/VDivider';
import { VNavigationDrawer } from 'vuetify/components/VNavigationDrawer';
import { aliases, fa } from 'vuetify/iconsets/fa';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      VApp,
      VBtn,
      VImg,
      VIcon,
      VDivider,
      VMenu,
      VList,
      VListItem,
      VListItemTitle,
      VListSubheader,
      VNavigationDrawer,
    },
    icons: {
      defaultSet: 'fa',
      aliases,
      sets: {
        fa,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
