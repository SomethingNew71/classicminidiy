<script lang="ts" setup>
  import { VApp } from 'vuetify/components/VApp';
  import { VFooter } from 'vuetify/components/VFooter';
  import { VBtn } from 'vuetify/components/VBtn';
  import { VDivider } from 'vuetify/components/VDivider';
  import { VSpacer } from 'vuetify/components/VGrid';
  import { SocialItems } from '~/data/models/generic';

  const socials = ref(SocialItems);
  const route = useRoute();
  const isHomepage = ref(route.path === '/');
  watch(
    () => route.path,
    () => {
      isHomepage.value = route.path === '/';
    }
  );
</script>

<template>
  <v-app>
    <main-nav></main-nav>
    <NuxtLoadingIndicator />
    <NuxtPage />
    <div class="spacer layer1 mt-10"></div>
    <v-footer class="text-center d-flex flex-column pt-10 bg-color-section">
      <div class="pb-2">
        <v-btn
          v-for="(social, i) in socials"
          :key="i"
          :href="social.href"
          class="mx-4"
          :icon="social.icon"
          variant="text"
        ></v-btn>
      </div>

      <div class="pt-0">
        <h2 class="subtitle">
          <strong class="has-text-primary-00">Classic Mini DIY</strong> by
          <a rel="noopener" target="_blank" href="https://youtube.com/c/classicminidiy?sub_confirmation=1">
            Cole Gentry </a
          >.
        </h2>
        <p class="pb-5">
          Classic Mini DIY toolbox is a passion project aligned with the Classic Mini DIY youtube channel. This is a
          completely free resource built to keep the Classic Mini technical knowledgebase alive for years to come.
          Regularly updated and crowd sourced data made to help Classic Mini owners all over the world.
        </p>
      </div>

      <v-divider></v-divider>

      <div>{{ new Date().getFullYear() }} — <strong>Classic Mini DIY LLC</strong></div>
    </v-footer>
    <v-spacer></v-spacer>
    <VitePwaManifest />
  </v-app>
</template>

<style lang="scss">
  .bg-color-section {
    background-color: #f0f0f0;
  }
</style>
