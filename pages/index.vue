<template>
  <section>
    <hero/>
    <section class="section">
      <div class="columns">
        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <h2 class="card-header-title">Research</h2>
            </header>
            <div class="card-content">
              Consulting services...
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <h2 class="card-header-title">Learn</h2>
            </header>
            <div class="card-content">
              Development services...
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <h2 class="card-header-title">Discuss</h2>
            </header>
            <div class="card-content">
              Training fart...
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Hero from '~components/Hero';

export default {
  components: {
    Hero
  }
};
</script>

<style lang="scss" src="./home.scss"></style>
