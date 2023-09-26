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
      <v-btn v-if="smAndDown" icon="fa:fad fa-bars" @click="showDrawer = !showDrawer" />
      <template v-if="mdAndUp">
        <v-btn prepend-icon="fa:fad fa-house" size="small" variant="text" to="/"> Home </v-btn>
        <v-btn prepend-icon="fa:fad fa-pencil" size="small" variant="text" to="/blog"> Blog </v-btn>
        <v-btn prepend-icon="fa:fad fa-book-circle-arrow-up" size="small" variant="text" to="/registry">
          Registry
        </v-btn>
        <v-btn prepend-icon="fa:fad fa-store" size="small" variant="text" href="https://merch.classicminidiy.com">
          Store
        </v-btn>

        <v-menu transition="scale-transition" close-delay="100" location="bottom end" open-delay="10" open-on-hover>
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
            <v-list-item v-for="(item, i) in ToolboxItems" :key="i" :value="item" :to="item.path">
              <template v-slot:prepend>
                <span v-html="item.iconHtml" class="pr-2 is-size-4"></span>
              </template>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-divider class="ml-2 mr-4 my-auto border-opacity-75" :thickness="2" vertical style="height: 16px" />
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
  <v-navigation-drawer v-if="smAndDown" v-model="showDrawer">
    <v-list density="compact" class="desktop-menu">
      <v-list-item density="compact">
        <v-btn prepend-icon="fa:fad fa-house" size="x-small" variant="text" to="/"> Home </v-btn></v-list-item
      >
      <v-list-item density="compact">
        <v-btn prepend-icon="fa:fad fa-pencil" size="x-small" variant="text" to="/blog"> Blog </v-btn></v-list-item
      >
      <v-list-item density="compact">
        <v-btn prepend-icon="fa:fad fa-store" size="x-small" variant="text" href="https://merch.classicminidiy.com">
          Store
        </v-btn></v-list-item
      >
      <v-list-item density="compact">
        <v-btn prepend-icon="fa:fad book-circle-arrow-up" size="x-small" variant="text" to="/registry">
          Registry
        </v-btn></v-list-item
      >
      <v-list-subheader> Free Online Toolbox </v-list-subheader>
      <v-list-item
        density="compact"
        v-for="(item, i) in ToolboxItems"
        :key="i"
        :value="item"
        :to="item.path"
        class="mobile-menu"
      >
        <template v-slot:prepend>
          <div v-html="item.iconHtml" class="pr-2 is-size-5"></div>
        </template>
        <v-list-item-title class="is-size-7" v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  import { useDisplay } from 'vuetify';
  import { ToolboxItems } from '~/data/models/generic';
  const { smAndDown, mdAndUp, lgAndUp } = useDisplay();
  let showDrawer: boolean = false;
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
  });
</script>

<style lang="scss">
  .donate {
    background-color: #f96854;
    color: #fff;
  }
  .mobile-menu {
    .v-list-item__prepend {
      width: 35px;
    }
  }
</style>
