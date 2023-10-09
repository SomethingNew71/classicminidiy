import { createVuetify } from 'vuetify';
import { VApp } from 'vuetify/components/VApp';
import { VBtn } from 'vuetify/components/VBtn';
import { VImg } from 'vuetify/components/VImg';
import { VIcon } from 'vuetify/components/VIcon';
import { VMenu } from 'vuetify/components/VMenu';
import { VList, VListItem, VListItemTitle, VListSubheader } from 'vuetify/components/VList';
import { VDataTable, VDataTableServer, VDataTableVirtual } from 'vuetify/labs/VDataTable';
import {
  VExpansionPanel,
  VExpansionPanelText,
  VExpansionPanelTitle,
  VExpansionPanels,
} from 'vuetify/components/VExpansionPanel';
import { VDatePicker } from 'vuetify/labs/VDatePicker';
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
      VDataTable,
      VDataTableServer,
      VDataTableVirtual,
      VDatePicker,
      VExpansionPanel,
      VExpansionPanelText,
      VExpansionPanelTitle,
      VExpansionPanels,
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
