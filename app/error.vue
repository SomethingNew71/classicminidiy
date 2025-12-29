<script lang="ts" setup>
  import type { NuxtError } from '#app';

  defineProps({
    error: Object as () => NuxtError,
  });

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
  <main-nav></main-nav>
  <NuxtLoadingIndicator />
  <div class="grid grid-cols-12 gap-4">
    <div class="col-span-12 md:col-span-6 md:col-start-4">
      <UCard class="mb-72 mt-10 text-center">
        <h2 class="text-6xl font-bold mb-4">{{ $t('pages.home.error.title') }}</h2>
        <h3 class="text-5xl mb-4">{{ $t('pages.home.error.heading', { statusCode: error?.statusCode }) }}</h3>
        <p>{{ $t('pages.home.error.message') }}</p>
        <p>{{ $t('pages.home.error.url_label') }} {{ route.fullPath }}</p>
        <p>{{ error?.message }}</p>
        <div class="flex justify-center gap-2 mt-10">
          <UButton to="/archive" color="primary">{{ $t('pages.home.error.actions.archives') }}</UButton>
          <UButton to="/technical" color="secondary">{{ $t('pages.home.error.actions.toolbox') }}</UButton>
          <UButton to="/" color="secondary">{{ $t('pages.home.error.actions.home') }}</UButton>
        </div>
      </UCard>
    </div>
  </div>
  <Footer></Footer>
  <VitePwaManifest />
</template>

<style lang="scss">
  .error-page {
    margin-top: 10rem;
  }
</style>
