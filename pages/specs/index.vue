<template>
  <section class="specs">
    <v-layout class="hero" row>
      <v-flex xs12 md6>
        <h1 class="display-1 py-5 my-5 pl-3">Specifications</h1>
      </v-flex>
    </v-layout>
    <bodies/>
  </section>
</template>

<style lang="scss" src="./specs.scss"></style>
<script>
import bodies from '~components/bodies';

export default {
  components: {
    bodies
  },
  methods: {}
};
</script>
