<script lang="ts" setup>
  import { VApp } from 'vuetify/components/VApp';
  import { VFooter } from 'vuetify/components/VFooter';
  import { VBtn } from 'vuetify/components/VBtn';
  import { VDivider } from 'vuetify/components/VDivider';
  import { VSpacer } from 'vuetify/components/VGrid';
  import { SocialItems } from '~/data/models/generic';
  import type { NuxtError } from '#app';

  const props = defineProps({
    error: Object as () => NuxtError,
  });

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
  <v-app class="bg-color-section">
    <main-nav></main-nav>
    <NuxtLoadingIndicator />
    <v-container class="error-page">
      <v-row>
        <v-col cols="12" md="6" offset-md="3">
          <v-card class="mx-auto">
            <v-card-item title="Uh Oh!">
              <template v-slot:subtitle>
                <v-icon class="me-1 pb-1" color="error" icon="fad fa-circle-exclamation" size="20"></v-icon>

                An error occured when loading this page
              </template>
            </v-card-item>

            <v-card-text class="py-0">
              <v-row align="center" no-gutters>
                <v-col class="text-h2" cols="6"> {{ error.statusCode }}</v-col>

                <v-col class="text-right" cols="6">
                  <v-icon color="yellow-darken-3" icon="fad fa-triangle-exclamation" size="88"></v-icon>
                </v-col>
              </v-row>
            </v-card-text>

            <div class="d-flex pt-3 justify-space-between">
              <v-list-item density="compact" prepend-icon="fad fa-brackets-curly">
                <v-list-item-subtitle>URL: {{ error.url }}</v-list-item-subtitle>
              </v-list-item>

              <v-list-item density="compact" prepend-icon="fad fa-messages">
                <v-list-item-subtitle>{{ error.message }}</v-list-item-subtitle>
              </v-list-item>
            </div>

            <v-divider></v-divider>

            <v-card-actions class="justify-end">
              <v-btn color="orange-darken-1" variant="flat" :text="'Archives'" to="/archive"></v-btn>
              <v-btn color="blue-grey-lighten-1" variant="flat" :text="'Toolbox'" to="/technical"></v-btn>
              <v-btn color="primary" variant="flat" :text="'Go back home'" to="/"></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
  .error-page {
    margin-top: 10rem;
  }
</style>
