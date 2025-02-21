<script lang="ts" setup>
  import { useDisplay } from 'vuetify';
  import { ArchiveItems, ToolboxItems } from '~/data/models/generic';
  const { lgAndUp } = useDisplay();
  const showDrawer = ref(false);
  const showArchive = ref(false);
  const showToolbox = ref(false);
  const showHome = ref(false);

  function toggleDrawer() {
    if (showArchive.value || showToolbox.value || showHome.value) {
      showArchive.value = false;
      showToolbox.value = false;
      showHome.value = false;
    }
    showDrawer.value = !showDrawer.value;
    showHome.value = !showHome.value;
  }
  function toggleSecondaryDrawer(drawer: 'home' | 'archive' | 'toolbox') {
    showArchive.value = false;
    showToolbox.value = false;
    showHome.value = false;
    switch (drawer) {
      case 'home':
        showHome.value = true;
        break;
      case 'archive':
        showArchive.value = true;
        break;
      case 'toolbox':
        showToolbox.value = true;
        break;
    }
  }
</script>

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
      <v-btn class="is-hidden-desktop" icon="fa:fad fa-bars" @click="toggleDrawer()" />
      <div class="is-hidden-touch">
        <v-btn
          prepend-icon="fa:fad fa-pencil"
          size="small"
          variant="text"
          target="_blank"
          href="https://classicminidiy.substack.com/"
        >
          Blog
        </v-btn>
        <v-btn prepend-icon="fa:fad fa-computer-classic" size="small" variant="text" to="/maps"> ECU Maps </v-btn>
        <v-btn
          prepend-icon="fa:fad fa-store"
          size="small"
          variant="text"
          target="_blank"
          href="https://merch.classicminidiy.com"
        >
          Store
        </v-btn>
        <v-btn size="small" prepend-icon="fa:fad fa-books" variant="text" to="/archive"> Archive </v-btn>
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
          class="donate me-3"
          variant="outlined"
          target="_blank"
          href="https://patreon.com/classicminidiy"
        >
          Join CMDIY
        </v-btn>
      </div>
    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="showDrawer" theme="light" permanent rail width="150">
    <v-list density="compact" nav>
      <v-list-item prepend-icon="fa:fad fa-house" title="Home" size="small" @click="toggleSecondaryDrawer('home')" />
      <v-list-item
        prepend-icon="fa:fad fa-books"
        title="Archive"
        size="small"
        color="secondary"
        @click="toggleSecondaryDrawer('archive')"
      />
      <v-list-item
        prepend-icon="fa:fad fa-toolbox"
        title="Tools"
        color="primary"
        size="small"
        @click="toggleSecondaryDrawer('toolbox')"
      />
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer v-model="showDrawer" v-if="showArchive">
    <v-list>
      <v-list-subheader class="font-weight-bold"> Mini Archives </v-list-subheader>
      <v-list-item
        density="compact"
        v-for="(item, i) in ArchiveItems"
        :key="i"
        :value="item"
        :to="item.path"
        :disabled="item.disabled"
        class="mobile-menu pl-6"
      >
        <template v-slot:prepend>
          <div v-html="item.iconHtml" class="pr-2 is-size-5"></div>
        </template>
        <v-list-item-title class="is-size-7" v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-navigation-drawer v-model="showDrawer" v-if="showToolbox">
    <v-list>
      <v-list-subheader class="font-weight-bold"> Free Online Toolbox </v-list-subheader>
      <v-list-item
        density="compact"
        v-for="(item, i) in ToolboxItems"
        :key="i"
        :value="item"
        :to="item.path"
        class="mobile-menu pl-6"
      >
        <template v-slot:prepend>
          <div v-html="item.iconHtml" class="pr-2 is-size-5"></div>
        </template>
        <v-list-item-title class="is-size-7" v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-navigation-drawer v-model="showDrawer" v-if="showHome">
    <v-list-item> <v-btn prepend-icon="fa:fad fa-house" size="small" variant="text" to="/"> Home </v-btn></v-list-item>
    <v-list-item>
      <v-btn
        prepend-icon="fa:fad fa-pencil"
        size="small"
        variant="text"
        target="_blank"
        href="https://classicminidiy.substack.com/"
      >
        Blog
      </v-btn></v-list-item
    >
    <v-list-item>
      <v-btn
        prepend-icon="fa:fad fa-store"
        size="small"
        variant="text"
        target="_blank"
        href="https://merch.classicminidiy.com"
      >
        Store
      </v-btn></v-list-item
    >
    <v-list-item>
      <v-btn prepend-icon="fa:fad fa-computer-classic" size="small" variant="text" to="/maps">
        ECU Maps
      </v-btn></v-list-item
    >
  </v-navigation-drawer>
</template>

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
