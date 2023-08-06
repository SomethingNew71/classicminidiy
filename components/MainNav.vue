<template>
  <v-app-bar scroll-behavior="elevate">
    <template #prepend>
      <NuxtLink :to="'/'" class="d-inline-block ms-4 me-2">
        <v-img
          alt="Classic Mini DIY Logo"
          src="https://classicminidiy.s3.amazonaws.com/misc/Small-Black.png"
          :width="lgAndUp ? 115 : 75"
          class="shrink"
          :transition="false"
        />
      </NuxtLink>
    </template>

    <template #append>
      <v-btn
        v-if="mdAndDown"
        icon="fa:fad fa-bars"
        @click="showDrawer = !showDrawer"
      />
      <template v-if="mdAndUp">
        <v-btn
          prepend-icon="fa:fad fa-house"
          size="small"
          variant="text"
          to="/"
        >
          Home
        </v-btn>
        <v-btn
          prepend-icon="fa:fad fa-pencil"
          size="small"
          variant="text"
          to="/blog"
        >
          Blog
        </v-btn>
        <v-btn
          prepend-icon="fa:fad fa-store"
          size="small"
          variant="text"
          href="https://merch.classicminidiy.com"
        >
          Store
        </v-btn>

        <v-menu
          transition="scale-transition"
          close-delay="100"
          location="bottom end"
          open-delay="10"
          open-on-hover
        >
          <template v-slot:activator="{ props }">
            <v-btn
              size="small"
              prepend-icon="fa:fad fa-toolbox"
              variant="text"
              append-icon="fa:fas fa-chevron-down"
              v-bind="props"
            >
              Toolbox
            </v-btn>
          </template>

          <v-list density="compact">
            <v-list-item
              v-for="(item, i) in toolboxItems"
              :key="i"
              :value="item"
              :to="item.path"
            >
              <template v-slot:prepend>
                <div v-html="item.iconLeft" class="pr-2"></div>
              </template>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-divider
          class="ml-2 mr-4 my-auto border-opacity-75"
          :thickness="2"
          vertical
          style="height: 16px"
        />
        <v-btn
          prepend-icon="fa:fab fa-patreon"
          size="small"
          class="donate"
          variant="outlined"
          href="https://patreon.com/classicminidiy"
        >
          Join CMDIY
        </v-btn>
      </template>
    </template>
  </v-app-bar>

  <!-- MOBILE VERSION OF NAVIGATION -->
  <v-navigation-drawer v-if="mdAndDown" v-model="showDrawer"
    ><v-list density="compact">
      <v-list-item density="compact">
        <v-btn
          prepend-icon="fa:fad fa-house"
          size="x-small"
          variant="text"
          to="/"
        >
          Home
        </v-btn></v-list-item
      >
      <v-list-item density="compact">
        <v-btn
          prepend-icon="fa:fad fa-pencil"
          size="x-small"
          variant="text"
          to="/blog"
        >
          Blog
        </v-btn></v-list-item
      >
      <v-list-item density="compact">
        <v-btn
          prepend-icon="fa:fad fa-store"
          size="x-small"
          variant="text"
          href="https://merch.classicminidiy.com"
        >
          Store
        </v-btn></v-list-item
      >
      <v-list-subheader> Free Online Toolbox </v-list-subheader>
      <v-list-item
        density="compact"
        v-for="(item, i) in toolboxItems"
        :key="i"
        :value="item"
        :to="item.path"
      >
        <template v-slot:prepend>
          <div v-html="item.iconLeft" class="pr-2"></div>
        </template>
        <v-list-item-title
          class="is-size-7"
          v-text="item.title"
        ></v-list-item-title>
      </v-list-item> </v-list
  ></v-navigation-drawer>
</template>

<script lang="ts" setup>
  import { useDisplay } from 'vuetify';
  const { mdAndUp, lgAndUp, mdAndDown } = useDisplay();
  const toolboxItems = [
    {
      title: 'Torque Specs',
      path: '/technical/torque',
      iconLeft: `
        <picture class="submenu-icon">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.webp" type="image/webp">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png" type="image/png">
          <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png">
        </picture>
      `,
    },
    {
      title: 'Electrical Diagrams',
      path: '/technical/electrical',
      iconLeft: `
        <picture class="submenu-icon">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.webp" type="image/webp">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.png" type="image/png">
          <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.png">
        </picture>
      `,
    },
    {
      title: 'Engine Sizes',
      path: '/technical/enginesize',
      iconLeft: `
        <picture class="submenu-icon">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.webp" type="image/webp">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png" type="image/png">
          <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png">
        </picture>
      `,
    },
    {
      title: 'Carb Needle Configurator',
      path: '/technical/needles',
      iconLeft: `
        <picture class="submenu-icon">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.webp" type="image/webp">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.png" type="image/png">
          <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.png">
        </picture>
      `,
    },
    {
      title: 'Gearbox Calculator',
      path: '/technical/gearing',
      iconLeft: `
        <picture class="submenu-icon">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-level-tool-100.webp" type="image/webp">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-level-tool-100.png" type="image/png">
          <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-level-tool-100.png">
        </picture>
      `,
    },
    {
      title: 'Wheel Library',
      path: '/technical/wheels',
      iconLeft: `
        <picture class="submenu-icon">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.webp" type="image/webp">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.png" type="image/png">
          <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.png">
        </picture>
      `,
    },
    {
      title: 'Compression Ratio Calculator',
      path: '/technical/compression',
      iconLeft: `
        <picture class="submenu-icon">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.webp" type="image/webp">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png" type="image/png">
          <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png">
        </picture>
      `,
    },
    {
      title: 'Parts Equivalency',
      path: '/technical/parts',
      iconLeft: `
        <picture class="submenu-icon">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-support-100.webp" type="image/webp">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-support-100.png" type="image/png">
          <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-support-100.png">
        </picture>
      `,
    },
    {
      title: 'Color Picker',
      path: '/technical/colors',
      iconLeft: `
        <picture class="submenu-icon">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-color-palette-100.webp" type="image/webp">
          <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-color-palette-100.png" type="image/png">
          <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-color-palette-100.png">
        </picture>
      `,
    },
  ];
</script>

<script lang="ts">
  import {
    VAppBar,
    VBtn,
    VIcon,
    VDivider,
    VMenu,
    VList,
    VListItem,
    VListItemTitle,
    VNavigationDrawer,
    VListSubheader,
  } from 'vuetify/components';
  export default defineComponent({
    components: {
      VAppBar,
      VBtn,
      VIcon,
      VDivider,
      VMenu,
      VList,
      VListItem,
      VListItemTitle,
      VNavigationDrawer,
      VListSubheader,
    },
    data() {
      return {
        showDrawer: false,
      };
    },
  });
</script>

<style>
  .donate {
    background-color: #f96854;
    color: #fff;
  }

  .submenu-icon img {
    height: 35px;
  }
</style>
