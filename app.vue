<template>
  <v-app>
    <main-nav></main-nav>
    <NuxtLoadingIndicator />
    <NuxtPage />
    <VitePwaManifest />
  </v-app>
</template>

<script lang="ts">
  import { VApp } from 'vuetify/components/VApp';
  export default defineComponent({
    components: {
      VApp,
    },
  });
</script>
