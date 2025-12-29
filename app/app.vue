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
  <UApp>
    <div class="app-wrapper bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <div class="app-content">
        <MainNav></MainNav>
        <UToaster />
        <NuxtLoadingIndicator />
        <main class="bg-neutral-50 dark:bg-neutral-900">
          <NuxtPage />
        </main>
      </div>
      <Footer></Footer>
      <VitePwaManifest />
      <Analytics />
      <SpeedInsights />
      <AppPromoPopup />
    </div>
  </UApp>
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
