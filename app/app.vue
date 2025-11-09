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
  <div class="app-wrapper">
    <div class="app-content">
      <MainNav></MainNav>
      <NuxtLoadingIndicator />
      <main>
        <NuxtPage />
      </main>
    </div>
    <Footer></Footer>
    <VitePwaManifest />
    <Analytics />
    <SpeedInsights />
    <AppPromoPopup />
  </div>
</template>

<style lang="scss">
  .bg-color-section {
    background-color: #f0f0f0;
  }

  html,
  body {
    height: 100%;
    margin: 0;
  }

  #__nuxt {
    height: 100%;
  }

  .app-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .app-content {
    flex: 1 0 auto;
  }

  footer {
    flex-shrink: 0;
  }
</style>
