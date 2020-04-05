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
              <i class="fad fa-book"></i> THE MINI MISSION
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
              <i class="fad fa-gift"></i> SUPPORT THE MISSION
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
            <img src="~assets/img/grey-tool-animation.gif" alt="">
            <!--
            <video autoplay loop muted playsinline>
              <source src="~assets/img/grey-tool-animation.webm" type="video/webm">
              <source src="~assets/img/grey-tool-animation.mp4" type="video/mp4">
              <img src="~assets/img/grey-tool-animation.giff">
            </video>
            -->
          </div>
          <div class="column is-7">
            <h3 class="fancy-font-book-oblique">
              <i class="fad fa-handshake-alt"></i> THE COMPLETELY FREE
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
              <i class="fa fa-toolbox"></i>
              <span class="pl-5">
                Check it out
              </span>
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
              <i class="fad fa-address-card"></i> About Me
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
          <div class="column is-5 avatar-container">
            <img src="~/assets/img/avatar.png" alt="Image of my car on jack stands">
          </div>
        </div>
      </div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Classic Mini DIY</strong> by <a rel="noopener" target="_blank" href="https://youtube.com/c/classicminidiy?sub_confirmation=1">Cole Gentry</a>.
        </p>
        <p>
          <strong>YouTube API</strong> used under <strong>YouTube</strong> <a rel="noopener" target="_blank" href="https://www.youtube.com/t/terms">TOS</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import Stats from '~/components/Stats';
import Hero from '~/components/Hero';

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
      size: 'is-medium'
    };
  }
};
</script>

<style lang="scss">
.animation-section {
  background-color: #F1F1F1;
}
.avatar-container img {
  max-width: 50%;
  margin: auto;
  padding-top: 35px;
  display: block;
}
</style>
