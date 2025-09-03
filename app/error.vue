<script lang="ts" setup>
  import type { NuxtError } from '#app';

  const { t } = useI18n();

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
      <div class="card mb-72 pt-10">
        <div class="card-body items-center text-center">
          <h2 class="card-title text-6xl">{{ t('pages.home.error.title') }}</h2>
          <h3 class="text-5xl">{{ t('pages.home.error.heading', { statusCode: error?.statusCode }) }}</h3>
          <p>{{ t('pages.home.error.message') }}</p>
          <p>{{ t('pages.home.error.url_label') }} {{ route.fullPath }}</p>
          <p>{{ error?.message }}</p>
          <div class="card-actions justify-end mt-10">
            <nuxt-link class="btn btn-primary" to="/archive">{{ t('pages.home.error.actions.archives') }}</nuxt-link>
            <nuxt-link class="btn btn-secondary" to="/technical">{{ t('pages.home.error.actions.toolbox') }}</nuxt-link>
            <nuxt-link class="btn btn-secondary" to="/">{{ t('pages.home.error.actions.home') }}</nuxt-link>
          </div>
        </div>
      </div>
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
