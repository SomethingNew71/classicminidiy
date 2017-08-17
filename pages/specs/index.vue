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

<style lang="scss">
.specs {
  .hero {
    background-image: url('/backgrounds/specs/specs.jpg') !important;
    background-size: cover;
    min-height: 15rem;

    h1 {
      color: #fff;
    }
    img {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .tabs__bar {
    background-color: #424242;
  }

  // .tab-section {
  //   .saloon, .estate, .elf, .moke,
  //   .van, .countryman, .clubman, .pickup {
  //     display: none;
  //
  //     &.is-active {
  //       display: inherit;
  //
  //       > .column.is-5 {
  //         padding-top: 0;
  //       }
  //     }
  //   }
  // }
}
</style>

<script>
import bodies from '~/components/bodies';

export default {
  components: {
    bodies
  },
  methods: {}
};
</script>
