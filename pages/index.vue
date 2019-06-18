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
            <p class="is-size-5  pt-20">Woodwork, painting, electrical, plumbing, and more. My services might be varied, but they all come with the same promise of quality, dedication, and durability. Licensed and insured, I’m an experienced contractor with knowledge passed down from generations. I can offer a 1-year guarantee for all my services, along with free estimates.</p>
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
            <p>I started apprenticing for my dad, Peter Sweeney, Jr. when I was twelve, but even before that I was watching him work all the time. My grandpa established our company in 1918, back when we specialized in carpentry and woodwork. Dad picked up new trades and expanded our business. I’ve been servicing the greater Wichita area for over 15 years and am about to bring my oldest son in as an assistant.</p>
            <h3 class="fancy-font-book-oblique pt-30">MY PROMISE</h3>
            <p>I’ll only work with the best materials available and provide a 1 year guarantee on all labor. I never compromise quality for time and give my clients realistic schedules that accommodate their lives. I strive for honest customer service, so contracts are only paid in full when the finished work is to your complete satisfaction.</p>
          </div>
          <div class="column is-5">
            <style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style><div class='embed-container'><iframe src='https://www.youtube.com/embed//U9tBae3riug' frameborder='0' allowfullscreen></iframe></div>
          </div>
        </div>
      </section>
    </div>
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
