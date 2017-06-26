<template>
  <v-app dark>
    <navigation/>
    <main>
      <nuxt/>
    </main>
    <pagefoot/> 
  </v-app>
</template>

<script>
import navigation from '../components/navigation';
import pagefoot from '../components/pagefoot';

export default {
  components: {
    navigation,
    pagefoot
  }
};
</script>

<style lang="scss" src="../assets/styles/app.scss"></style>
