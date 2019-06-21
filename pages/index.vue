<template>
  <div>
    <section class="hero hero-car is-large">
      <!-- Hero head: will stick at the top -->
      <div class="hero-head">
        <header class="navbar">
          <div class="container">
            <div class="navbar-brand">
              <!-- <a class="navbar-item">
                <img
                  src="https://bulma.io/images/bulma-type-white.png"
                  alt="Logo"
                />
              </a> -->
              <span class="navbar-burger burger" data-target="homepageNavbar">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id="homepageNavbar" class="navbar-menu">
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
        <div class="container has-text-left">
          <p class="subtitle is-6 has-text-white">
            YOUR FRIENDLY NEIGHBORHOOD
          </p>
          <h1 class="title special-title fancy-font-bold has-text-white">
            Classic Mini <br> DIY
          </h1>
        </div>
      </div>
    </section>
    <div class="container">
      <section class="section">
        <div class="columns is-multiline">
          <div class="column is-8">
            <h3 class="fancy-font-book-oblique">THE MINI MISSION</h3>
            <h4 class="fancy-font-bold is-size-3">Keeping the Classics on the Road</h4>
            <p class="is-size-5  pt-20">Since Classic Mini DIY was started out of my small driveway workshop in 2015 I have focused on one thing, keeping these Classic Minis on the road. To do this, I make DIY showing exactly how to complete a wide range of jobs on your Classic Mini to make working on your car more accessible for everyone.</p>
          </div>
          <div class="column is-4">
            <h3 class="fancy-font-book-oblique">SUPPORT THE MISSION</h3>
            <h4 class="fancy-font-bold is-size-3">Patreon</h4>
            <p class="is-size-5 pt-20">
              Classic Mini DIY is supported by our viewers. If you are interested in helping to keep the channel alive, consider supporting on Patreon.
            </p>
            <a class="mt-25 button is-medium patreon" href="https://patreon.com/classicminidiy" target="_blank">
              <span class="icon">
                <i class="fab fa-patreon"></i>
              </span>
              <span>Support</span>
            </a>
          </div>
          <div class="column is-10 is-offset-1 pt-50">
            <stats />
          </div>
        </div>
      </section>
    </div>
    <section class="hero hero-carb is-medium">
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title has-text-white">
            Anything from weather seals to carburetors
            <br>
            Classic Mini DIY has you covered.
          </p>
        </div>
      </div>
    </section>
    <div class="container">
      <section class="section">
        <div class="columns is-multiline">
          <div class="column is-7">
            <h3 class="fancy-font-bold is-size-3">About Me</h3>
            <h4 class="fancy-font-book-oblique pt-20">MY NAME IS COLE</h4>
            <p>I am 30 year old Web Developer working in the financial industry. My experience in the automotive industry comes from 2 years of training on heavy diesel machinery and 8 years of Classic Mini ownership. With this experience I do my best to provide the most comprehensive and technically correct infortmation I can.</p>
            <h3 class="fancy-font-book-oblique pt-30">MY PROMISE</h3>
            <p>I will provide you with all the knowledge I can to the best of my ability. I will also accept feedback in the event that I get something incorrect. I am an enthusiest and not a complete expert so from time to time I will make mistakes.</p>
          </div>
          <div class="column is-5">
            <style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed//U9tBae3riug' frameborder='0' allowfullscreen></iframe></div>
          </div>
        </div>
      </section>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Classic Mini DIY</strong> by <a href="https://youtube.com/c/classicminidiy">Cole Gentry</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import Stats from '~/components/Stats'

export default {
  components: {
    Stats
  }
}
</script>

<style lang="scss">
.special-title {
  font-size: 140px;
}
.hero-car {
  background: #2f2f2f url('/hero.jpg') no-repeat center;
  background-size: cover;
}
.hero-carb {
  background: #2f2f2f url('/carb.jpg') no-repeat center;
  background-size: cover;
}
.patreon {
  color: #F96854;
}
p {
  letter-spacing: .01em;
  line-height: 1.8em;
}
</style>
