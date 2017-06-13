<template>
  <nav class="nav">
    <div class="nav-left">
      <nuxt-link class="nav-item" to="/">
        <img src="/navigation/mini.png" alt="Bulma logo"> Classic Mini DIY
      </nuxt-link>
    </div>

    <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
    <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
    <span
      v-on:click="toggleNav"
      v-bind:class="{ 'is-active': isActive }"
      class="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
    </span>

    <!-- This "nav-menu" is hidden on mobile -->
    <!-- Add the modifier "is-active" to display it on mobile -->
    <div
      v-bind:class="{ 'is-active': isActive }"
      class="nav-right nav-menu">
      <nuxt-link
        class="nav-item"
        to="/">
        Home
      </nuxt-link>
      <nuxt-link
        class="nav-item"
        to="/specs">
        Specs
      </nuxt-link>
      <nuxt-link
        class="nav-item"
        to="/manuals">
        Manuals
      </nuxt-link>
      <nuxt-link
        class="nav-item"
        to="/historical">
        Historical
      </nuxt-link>
      <!-- <nuxt-link class="nav-item" href="">Contact</nuxt-link> -->
      <span class="nav-item">
        <a class="button is-primary" href="https://www.youtube.com/c/classicminidiy" target="_blank">
          <span class="icon">
            <i class="fa fa-youtube"></i>
          </span>
          <span>Youtube</span>
        </a>
      </span>
    </div>
  </nav>
</template>

<style lang="scss" src="./navigation.scss"></style>

<script>
export default {
  data: function () {
    return {
      isActive: false
    };
  },
  methods: {
    toggleNav: function () {
      this.isActive = !this.isActive;
    }
  }
};
</script>
