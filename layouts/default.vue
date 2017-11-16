<template>
  <v-app dark>
    <v-content>
      <nuxt/>
    </v-content>
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
.page-enter-active, .page-leave-active {
  transition: opacity .5s;
}
.page-enter, .page-leave-to {
  opacity: 0;
}
</style>
