<template>
  <section class="home">
    <v-layout class="hero" row wrap>
      <v-flex xs12>
        <img class="is-hidden-mobile pt-5 mt-5" src="/backgrounds/home/logo.png" alt="Classic Mini DIY Logo image">
        <h1 class="display-3 text-xs-center">Classic Mini DIY</h1>
        <h2 class="subheading text-xs-center white--text">The best place to find information on your Classic Mini Cooper</h2>
      </v-flex>
      <v-flex xs12>
      </v-flex>
    </v-layout>
    <v-container fluid>
      <v-layout row wrap class="mission pt-5 pb-5">
        <v-flex xs12 class="mission-header text-xs-center">
          <v-icon medium class="pb-2 primary--text" fa>certificate</v-icon>
          <p class="subheading grey--text lighten-2 ma-0">Keeping the classics alive</p>
          <h2 class="black--text darken-3">Our Mission</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="mb-4 pt-3 text-xs-center mission-list">
        <v-flex xs12 md4>
          <v-btn floating medium class="white mb-4">
            <v-icon fa class="red--text">youtube-play</v-icon>
          </v-btn>
          <h3 class="headline">Create DIY Videos</h3>
          <p>Classic Mini DIY first and foremost is about creating DIY videos for new and inexperiences Classic Mini owners to use and reference when fixing their own cars.</p>
          <a target='_blank' :href='youtube'>
            <v-btn class="red" light>Visit us on Youtube</v-btn>
          </a>
        </v-flex>
        <v-flex xs12 md4 class="center">
          <v-btn floating medium class="white mb-4">
            <v-icon fa class="primary--text">book</v-icon>
          </v-btn>
          <h3 class="headline">Consolidate Mini Knowledge</h3>
          <p>
            As the channel expanded we started to realize that while there are many good sources of mini information out there, there is no single repository of technical and helpful knowledge for new mini owners. So with countless hours of work we have built just that.
          </p>
          <!-- <v-btn primary light router :to="specs">Specifications</v-btn>
          <v-btn primary light router :to="history">History</v-btn>
          <v-btn primary light router :to="manuals">Manuals</v-btn> -->
        </v-flex>
        <v-flex xs12 md4>
          <v-btn floating medium class="white mb-4">
            <v-icon fa class="green--text">tree</v-icon>
          </v-btn>
          <!-- <img src="/pages/home/grow.png" alt=""> -->
          <h3 class="headline">Keep the Mini World Growing</h3>
          <p>
            Our main mission is to keep the Classic minis out there on the road for many years to come and for countless others to find joy and excitement from these little cars built so many years ago.
          </p>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="latest-video">
        <v-flex xs12 class="mission-header text-xs-center">
          <v-icon large class="pb-2 red--text" fa>youtube-play</v-icon>
          <p class="subheading grey--text lighten-2 ma-0">Check us out on YouTube</p>
          <h2 class="black--text darken-3">Latest Videos</h2>
        </v-flex>
        <v-flex xs12 offset-md3 md6>
          <div class='embed-container'>
            <iframe width='1280' height='720' src='https://www.youtube.com/embed/videoseries?list=PLC6pySlMGdyTr5OXpF7w726LzHPLLfimi' frameborder='0' allowfullscreen>
            </iframe>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="sponsors pt-5 pb-5">
        <v-layout row wrap class="text-xs-center">
          <v-flex xs12 class="pb-5">
            <v-icon large class="pb-2 primary--text" fa>handshake-o</v-icon>
            <p class="subheading grey--text lighten-2 ma-0">All the wonderful people who help support this channel</p>
            <h2 class="black--text darken-3">Our Sponsors</h2>
          </v-flex>
          <v-flex xs12 offset-md1 md5 class="first">
            <img src="/pages/home/seven-logo.png" alt="">
            <h3 class="headline pt-3">Seven Mini Parts</h3>
            <p>From almost the point of this channels creation Seven Mini Parts has been a brand and company partner. They took a chance on a small youtube channel that is now growing past my wildest dreams. If you are in the market for Mini parts please check them out!</p>
            <a target='_blank' :href='sevenEnt'>
              <v-btn class="seven-ent" light>Checkout 7ent.com</v-btn>
            </a>
          </v-flex>
          <v-flex xs12 md5>
            <img src="/pages/home/patreon-logo.png" alt="">
            <h3 class="headline pt-3">Patreon Supporters</h3>
            <p>Aside from the parts and guidance provided by Seven Mini Parts, Classic Mini DIY is completely funded by myself and my patrons.  Without your help I could not provide the quality videos you enjoy.</p>
            <a target='_blank' :href='patreon'>
              <v-btn class="patreon" light>Support Us on Patreon</v-btn>
            </a>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
// import footer from '~components/footer';

export default {
  data () {
    return {
      patreon: 'https://www.patreon.com/classicminidiy',
      sevenEnt: 'https://www.7ent.com',
      youtube: 'https://www.youtube.com/c/classicminidiy',
      specs: '/specs',
      history: '/historical',
      manuals: '/manuals'
    };
  },
  components: {
    // footer
  }
};
</script>

<style lang="scss" src="./home.scss"></style>
