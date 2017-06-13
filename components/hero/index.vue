<template>
  <section class="hero is-dark is-medium is-bold is-full-width">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h1 class="title">The Best Source of Classic Mini Information</h1>
          </div>
          <div class="column">
            <img class="is-hidden-mobile" src="/hero/logo.png" alt="Classic Mini DIY Logo image">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  .hero {
    background-repeat: no-repeat;
    background-size: cover;

    .hero-body {
      padding-top: 0 !important;
      padding-bottom: 0 !important;

      h1 {
        padding-top: 9rem;

        @media only screen and (max-width:48em) {
          padding-top: 3rem;
          padding-bottom: 3rem;
        }
      }
      img {
        max-height: 360px;
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
    }
  }
</style>
