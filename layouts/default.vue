<template>
  <v-app dark>
    <navigation/>
    <v-toolbar fixed light>
      <v-toolbar-side-icon light @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <nuxt/>
      </v-container>
    </main>
    <template>
      <v-footer class="pa-3">
        <v-spacer></v-spacer>
        <div>Classic Mini DIY © - {{ new Date().getFullYear() }}</div>
      </v-footer>
    </template>
  </v-app>
<!--
    <pagefoot/> -->
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
