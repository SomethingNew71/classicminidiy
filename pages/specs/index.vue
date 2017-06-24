<template>
  <section>
    <div class="container specs">
      <div class="columns header">
        <div class="column is-9">
          <h1 class="title">
            Specifications
          </h1>
        </div>
      </div>
      <div class="columns">
        <bodies/>
      </div>
    </div>
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
