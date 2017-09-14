<template>
  <v-app standalone>
    <main>
      <nuxt/>
    </main>
    <footbar/>
  </v-app>
</template>

<script>
import footbar from '../components/footbar';

export default {
  components: {
    footbar
  }
};
</script>

<style lang="scss">
// Styles applied to the entire app.
</style>
