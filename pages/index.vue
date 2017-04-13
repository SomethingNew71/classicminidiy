<template>
  <section>
    <hero/>
    <section class="section">
      <div class="columns">
        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <h2 class="card-header-title">Consulting</h2>
            </header>
            <div class="card-content">
              Consulting services...
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <h2 class="card-header-title">Development</h2>
            </header>
            <div class="card-content">
              Development services...
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <h2 class="card-header-title">Training</h2>
            </header>
            <div class="card-content">
              Training services...
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
