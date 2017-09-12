<template>
  <v-app standalone>
    <navigation/>
    <main>
      <nuxt/>
    </main>
    <footbar/>
  </v-app>
</template>

<script>
import navigation from '../components/navigation';
import footbar from '../components/footbar';

export default {
  components: {
    navigation,
    footbar
  }
};
</script>

<style lang="scss">
// Styles applied to the entire app.
main {
  padding-top: 3rem;
}

// Helpers for some minor bugs in Vuetify right now
.icon--medium {
  font-size: 2rem !important;
}
.icon--large {
  font-size: 2.5rem !important;
}

.icon--x-large {
  font-size: 3rem !important;
}
</style>
