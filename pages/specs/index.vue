<template>
  <section>
    <div class="container specs">
      <div class="columns header">
        <div class="column is-9">
          <h1 class="title">
            Specifications
          </h1>
        </div>
        <!-- <div class="column">
          <div class="tabs is-toggle">
            <ul>
              <li class="is-active">
                <a>
                  <span class="icon is-small"><i class="fa fa-thumbs-down"></i></span>
                  <span>Imperial</span>
                </a>
              </li>
              <li>
                <a>
                  <span class="icon is-small"><i class="fa fa-thumbs-up"></i></span>
                  <span>Metric</span>
                </a>
              </li>
            </ul>
          </div>
        </div> -->
      </div>
      <div class="columns">
        <bodies/>
      </div>
      <div class="columns">
        <engines/>
      </div>
    </div>
  </section>
</template>

<style lang="scss" src="./specs.scss"></style>
<script>
import bodies from '~components/bodies';
import engines from '~components/engines';

export default {
  components: {
    bodies,
    engines
  },
  methods: {}
};
</script>
