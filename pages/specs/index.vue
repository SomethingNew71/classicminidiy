<template>
  <section class="specs">
    <v-container>
      <v-layout class="hero" row wrap>
        <v-flex xs12>
          <h1 class="display-1">Specifications</h1>
          <p class="accent--text">Find spec infromation on just about any mini variant out there</p>
        </v-flex>
        <v-flex xs12>
          <v-stepper v-model="e1" dark class="mt-3">
            <v-stepper-header>
              <v-stepper-step step="1" :complete="e1 > 1">Choose Generation</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="2" :complete="e1 > 2">Choose Body Type</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">Choose Engine Size</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-card color="secondary" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click.native="e1 = 2">Continue</v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-card color="secondary" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click.native="e1 = 3">Continue</v-btn>
                <v-btn flat dark @click.native="e1 = 1">Back</v-btn>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-card color="secondary" class="mb-5" height="200px"></v-card>
                <v-btn color="primary" @click.native="e1 = 1">Continue</v-btn>
                <v-btn flat dark @click.native="e1 = 2">Back</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-flex>
      </v-layout>
    </v-container>
  </section>
</template>

<style lang="scss">

</style>

<script>
export default {
  data () {
    return {
      e1: 0
    };
  }
};
</script>
