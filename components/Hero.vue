<template>
  <section
    class="hero"
    :class="$attrs.size"
    v-bind:style="{ backgroundImage: 'url(' + $attrs.background + ')' }"
    >
    <!-- Hero head: will stick at the top -->
    <div class="hero-head" v-if="$attrs.navigation">
      <header class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item">
              <img
                src="/small-logo.png"
                alt="Logo"
              />
            </a>
            <span @click="mobileOpen = !mobileOpen" :class="{'is-active': mobileOpen}" class="navbar-burger burger" data-target="homepageNavbar">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="homepageNavbar" class="navbar-menu" :class="{'is-active': mobileOpen}">
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
      <div class="container" :class="{'has-text-centered': $attrs.centered}">
        <p class="subtitle is-6 has-text-white">
          {{ $attrs.subtitle }}
        </p>
        <h1 class="title fancy-font-bold has-text-white" :class="{'special-title': $attrs.special}" v-html="$attrs.title"></h1>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      mobileOpen: false
    }
  }
}
</script>
<style lang="scss">
.hero {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .special-title {
    font-size: 140px;
  }

  @media screen and (max-width: 1023px) {
  .navbar-menu  {
    background-color: transparent;
  }
  .special-title {
    font-size: 2rem;
  }
}
}
</style>
