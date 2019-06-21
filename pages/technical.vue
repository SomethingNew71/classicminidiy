<template>
  <div>
        <section class="hero hero-technical is-medium">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <header class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <span class="navbar-burger burger" data-target="navbarMenuHeroC">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="navbarMenuHeroC" class="navbar-menu">
              <div class="navbar-end">
                <nuxt-link class="fancy-font-heavy has-text-white navbar-item" to="/">Home</nuxt-link>
                <nuxt-link class="fancy-font-heavy has-text-white navbar-item" to="/technical">Technical Info</nuxt-link>
                <a class="fancy-font-heavy has-text-white navbar-item" target="_blank" href="https://merch.classicminidiy.com">Store</a>
                <span class="fancy-font-heavy navbar-item">
                  <a class="button is-inverted is-danger" target='_blank' href='https://www.youtube.com/c/classicminidiy?sub_confirmation=1'>
                    <span class="icon">
                      <i class="fab fa-youtube"></i>
                    </span>
                    <span>Subscribe</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </header>
      </div>
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="subtitle is-6 has-text-white">
            YOUR DIGITAL MINI TOOLBOX
          </p>
          <h1 class="title fancy-font-bold has-text-white">
            Technical Information
          </h1>
        </div>
      </div>
    </section>
    <div class="container">
      <section class="section">
        <div class="columns">
          <div class="column">
            <nuxt-child />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>
<style lang="scss">
.hero-technical {
  background: #2f2f2f url('/technical.jpg') no-repeat center;
  background-size: cover;
}
</style>
