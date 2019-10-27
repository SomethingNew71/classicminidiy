<template>
  <section
    class="hero"
    :class="$attrs.size"
    :style="{ backgroundImage: 'url(' + $attrs.background + ')' }"
  >
    <!-- Hero head: will stick at the top -->
    <div v-if="$attrs.navigation" class="hero-head">
      <header class="navbar">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item">
              <!-- eslint-disable-next-line -->
              <img
                src="/small-logo.png"
                alt="Logo"
              />
            </a>
            <span class="navbar-burger burger" :class="{'is-active': mobileOpen}" data-target="homepageNavbar" @click="mobileOpen = !mobileOpen">
              <span />
              <span />
              <span />
            </span>
          </div>
          <div id="homepageNavbar" class="navbar-menu" :class="{'is-active': mobileOpen}">
            <div class="navbar-end">
              <nuxt-link class="fancy-font-heavy has-text-white navbar-item" to="/">
                Home
              </nuxt-link>
              <nuxt-link class="fancy-font-heavy has-text-white navbar-item" to="/technical">
                Technical Info
              </nuxt-link>
              <a class="fancy-font-heavy has-text-white navbar-item" rel="noopener" target="_blank" href="https://merch.classicminidiy.com">
                Store
              </a>
              <span class="fancy-font-heavy navbar-item">
                <a class="button is-inverted is-danger" rel="noopener" target="_blank" href="https://www.youtube.com/c/classicminidiy?sub_confirmation=1">
                  <span class="icon">
                    <i class="fab fa-youtube" />
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
        <!-- eslint-disable-next-line -->
        <h1 class="title fancy-font-bold has-text-white" :class="{'special-title': $attrs.special}" v-html="$attrs.title" />
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      mobileOpen: false
    };
  }
};
</script>
<style lang="scss">
.hero {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .navbar-burger {
    color: #fff;
  }

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
