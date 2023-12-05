<script lang="ts" setup>
  import { VApp } from 'vuetify/components/VApp';
</script>

<template>
  <v-app>
    <main-nav></main-nav>
    <NuxtLoadingIndicator />
    <NuxtPage />
    <VitePwaManifest />
  </v-app>
</template>
