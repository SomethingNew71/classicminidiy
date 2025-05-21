<script lang="ts" setup>
  import { Analytics } from '@vercel/analytics/nuxt';
  import { SpeedInsights } from '@vercel/speed-insights/nuxt';

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
  <MainNav></MainNav>
  <NuxtLoadingIndicator />
  <NuxtPage />
  <Footer></Footer>
  <VitePwaManifest />
  <Analytics />
  <SpeedInsights />
</template>

<style lang="scss">
  .bg-color-section {
    background-color: #f0f0f0;
  }
</style>
