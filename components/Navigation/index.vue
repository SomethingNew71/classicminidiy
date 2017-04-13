<template>
  <nav class="nav">
    <div class="nav-left">
      <a class="nav-item">
        <!-- <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo"> -->
        Classic Mini DIY
      </a>
    </div>

    <div class="nav-center">
      <a class="nav-item">
        <span class="icon">
          <i class="fa fa-github"></i>
        </span>
      </a>
      <a class="nav-item">
        <span class="icon">
          <i class="fa fa-twitter"></i>
        </span>
      </a>
    </div>

    <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
    <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
    <span class="nav-toggle">
      <span></span>
      <span></span>
      <span></span>
    </span>

    <!-- This "nav-menu" is hidden on mobile -->
    <!-- Add the modifier "is-active" to display it on mobile -->
    <div class="nav-right nav-menu">
      <a class="nav-item">
        Home
      </a>
      <a class="nav-item">
        Documentation
      </a>
      <a class="nav-item">
        Blog
      </a>

      <span class="nav-item">
        <a class="button" >
          <span class="icon">
            <i class="fa fa-twitter"></i>
          </span>
          <span>Tweet</span>
        </a>
        <a class="button is-primary">
          <span class="icon">
            <i class="fa fa-download"></i>
          </span>
          <span>Download</span>
        </a>
      </span>
    </div>
  </nav>
  <!-- <nav class="main-nav">
    <ul>
      <li>
        <nuxt-link to="/about">About</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/specs">Specs</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/manuals">Manuals</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/historical">Historical</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/contact">Contact</nuxt-link>
      </li>
    </ul>
  </nav> -->
</template>

<style lang="scss" src="./navigation.scss"></style>
