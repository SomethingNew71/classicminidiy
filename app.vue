<script lang="ts" setup>
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
    <Footer></Footer>
    <v-spacer></v-spacer>
    <VitePwaManifest />
  </v-app>
</template>

<style lang="scss">
  .bg-color-section {
    background-color: #f0f0f0;
  }
</style>
