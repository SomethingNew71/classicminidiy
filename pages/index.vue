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
              Find all the Classic Mini information you need to help you work on your old vehicle. All information gathered by verfied sources and historcal records.
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <h2 class="card-header-title">Learn</h2>
            </header>
            <div class="card-content">
              All the resources you need to learn how to fix and repair your mini yourself. No matter your expeirence you will find a place to start learning here.
            </div>
          </div>
        </div>
        <div class="column is-one-third">
          <div class="card">
            <header class="card-header">
              <h2 class="card-header-title">Discuss</h2>
            </header>
            <div class="card-content">
              Getting stuck on a problem sucks, thats why Classic Mini DIY has a special "Discus" site setup to get help from fellow mini owners.
              <br/>
              <a href="link.to.discus">Classic Mini DIY Forum</a>
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
