<template>
  <div>
    <hero
      :title="title"
      :subtitle="subtitle"
      :size="size"
      :special="true"
      :background="background"
      :navigation="true"
    />
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-8">
            <h3 class="fancy-font-book-oblique">
              THE MINI MISSION
            </h3>
            <h4 class="fancy-font-bold is-size-3">
              Keeping the Classics on the Road
            </h4>
            <p class="is-size-5  pt-20">
              Since Classic Mini DIY was started out of my small driveway workshop in 2015 I have focused on one thing, keeping these Classic Minis on the road. To do this, I make DIY showing exactly how to complete a wide range of jobs on your Classic Mini to make working on your car more accessible for everyone.
            </p>
          </div>
          <div class="column is-4">
            <h3 class="fancy-font-book-oblique">
              SUPPORT THE MISSION
            </h3>
            <h4 class="fancy-font-bold is-size-3">
              Patreon
            </h4>
            <p class="is-size-5 pt-20">
              Classic Mini DIY is supported by our viewers. If you are interested in helping to keep the channel alive, consider supporting on Patreon.
            </p>
            <a class="mt-25 button is-medium is-patreon" rel="noopener" href="https://patreon.com/classicminidiy" target="_blank">
              <span class="icon">
                <i class="fab fa-patreon" />
              </span>
              <span>Support</span>
            </a>
          </div>
          <div class="column is-10 is-offset-1 pt-50">
            <stats />
          </div>
        </div>
      </div>
    </section>
    <section class="section animation-section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-5">
            <img src="/grey-tool-animation.gif" alt="">
          </div>
          <div class="column is-7">
            <h3 class="fancy-font-book-oblique">
              THE COMPLETELY FREE
            </h3>
            <h3 class="fancy-font-bold is-size-3">
              Classic Mini Toolbox
            </h3>
            <h4 class="fancy-font-book-oblique pt-20">
              THE TOOLKIT FOR THE DIY MECHANIC
            </h4>
            <p>
              One of the largest reasons for starting this channel, was about making infromation related to working your Mini Cooper more accessible. In service to this goal I have created the Classic Mini Toolbox. Combining information from all over the web to bring you one location to find anything you need.
            </p>
            <a class="mt-25 button is-medium is-primary" href="/technical">
              <span>Check it out</span>
            </a>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-7">
            <h3 class="fancy-font-bold is-size-3">
              About Me
            </h3>
            <h4 class="fancy-font-book-oblique pt-20">
              MY NAME IS COLE
            </h4>
            <p>
              I am a 30-year-old Web Developer working in the financial industry. My experience in the automotive industry comes from 2 years of training on heavy diesel machinery and 8 years of Classic Mini ownership. With this experience, I do my best to provide the most comprehensive and technically correct information I can.
            </p>
            <h3 class="fancy-font-book-oblique pt-30">
              MY PROMISE
            </h3>
            <p>
              I will provide you with all the knowledge I can to the best of my ability. I will also accept feedback in the event that I get something incorrect. I am an enthusiast and not a complete expert so from time to time I will make mistakes.
            </p>
          </div>
          <div class="column is-5">
            <style>.embed-container { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; } .embed-container iframe, .embed-container object, .embed-container embed { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }</style>
            <div class="embed-container">
              <iframe title="Youtube Welcome Video" src="https://www.youtube.com/embed//U9tBae3riug" frameborder="0" allowfullscreen />
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Classic Mini DIY</strong> by <a rel="noopener" href="https://youtube.com/c/classicminidiy?sub_confirmation=1">Cole Gentry</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import Stats from '~/components/Stats'
import Hero from '~/components/Hero'

export default {
  components: {
    Hero,
    Stats
  },
  data () {
    return {
      title: 'Classic Mini <br> DIY',
      subtitle: 'YOUR FRIENDLY NEIGHBORHOOD',
      background: '/hero.jpg',
      size: 'is-large'
    }
  }
}
</script>

<style lang="scss">
.hero-carb {
  background: #2f2f2f url('/carb.jpg') no-repeat center;
  background-size: cover;
}
.animation-section {
  background-color: #F1F1F1;
}
</style>
