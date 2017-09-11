<template>
  <section class="home">
    <v-layout class="hero" row wrap>
      <v-flex xs12>
        <img class="is-hidden-mobile pt-5 mt-5" src="/pages/home/logo.png" alt="Classic Mini DIY Logo image">
        <h1 class="display-3 text-xs-center">Classic Mini DIY</h1>
        <h2 class="subheading text-xs-center white--text">The best place to find information on your Classic Mini Cooper</h2>
        <div class="text-xs-center">
          <v-icon x-large class="white--text">fa-angle-down</v-icon>
        </div>
      </v-flex>
    </v-layout>
    <v-container grid-list-md>
      <v-layout row wrap class="mission pt-5 pb-4">
        <v-flex xs12 class="mission-header text-xs-center">
          <v-icon medium class="pb-2 primary--text">fa-certificate</v-icon>
          <p class="subheading grey--text lighten-2 ma-0">Keeping the classics alive</p>
          <h2 class="black--text darken-3">Our Mission</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="mb-4 pt-3 text-xs-center mission-list">
        <v-flex xs12 md4 class="mb-4">
          <v-icon large class="red--text mb-3">fa-youtube-play</v-icon>
          <h3 class="headline">Create DIY Videos</h3>
          <p>Classic Mini DIY first and foremost is about creating DIY videos for new and inexperiences Classic Mini owners to use and reference when fixing their own cars.</p>
          <v-btn class="red" tag='a' :href='youtube' dark target='_blank'>Visit us on Youtube</v-btn>
        </v-flex>
        <v-flex xs12 md4 class="center mb-4">
          <v-icon medium class="primary--text mb-3 mt-1">fa-book</v-icon>
          <h3 class="headline">Consolidate Mini Knowledge</h3>
          <p>
            As the channel expanded we started to realize that while there are many good sources of mini information out there, there is no single repository of technical and helpful knowledge for new mini owners. So with countless hours of work we have built just that.
          </p>
          <!-- <v-btn primary light router :to="specs">Specifications</v-btn>
          <v-btn primary light router :to="history">History</v-btn>
          <v-btn primary light router :to="manuals">Manuals</v-btn> -->
        </v-flex>
        <v-flex xs12 md4 class="mb-4">
          <v-icon large class="green--text mb-3">fa-tree</v-icon>
          <!-- <img src="/pages/home/grow.png" alt=""> -->
          <h3 class="headline">Keep the Mini World Growing</h3>
          <p>
            Our main mission is to keep the Classic minis out there on the road for many years to come and for countless others to find joy and excitement from these little cars built so many years ago.
          </p>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="latest-video">
        <v-flex xs12 class="mission-header text-xs-center">
          <v-icon large class="pb-2 red--text">fa-youtube-play</v-icon>
          <p class="subheading grey--text lighten-2 ma-0">Check us out on YouTube</p>
          <ytcounter></ytcounter>
          <h2 class="black--text darken-3">Latest Videos</h2>
        </v-flex>
        <v-flex xs12 offset-md3 md6 class="pt-4">
          <div class='embed-container'>
            <iframe width='1280' height='720' src='https://www.youtube.com/embed/videoseries?list=PLC6pySlMGdyTr5OXpF7w726LzHPLLfimi' frameborder='0' allowfullscreen>
            </iframe>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="sponsors pt-5 pb-5">
        <v-layout row wrap class="text-xs-center">
          <v-flex xs12 class="pb-5">
            <v-icon large class="pb-2 primary--text">fa-handshake-o</v-icon>
            <p class="subheading grey--text lighten-2 ma-0">All the wonderful people who help support this channel</p>
            <h2 class="black--text darken-3">Our Sponsors</h2>
          </v-flex>
          <v-flex xs12 offset-md1 md5 class="first mb-4 pb-4">
            <img src="/pages/home/seven-logo.png" alt="">
            <h3 class="headline pt-3">Seven Mini Parts</h3>
            <p>From almost the point of this channels creation Seven Mini Parts has been a brand and company partner. They took a chance on a small youtube channel that is now growing past my wildest dreams. If you are in the market for Mini parts please check them out!</p>
            <v-btn target='_blank' :href='sevenEnt' tag='a' class="seven-ent" dark>Checkout 7ent.com</v-btn>
          </v-flex>
          <v-flex xs12 md5>
            <img src="/pages/home/patreon-logo.png" alt="">
            <h3 class="headline pt-3">Patreon Supporters</h3>
            <p>Aside from the parts and guidance provided by Seven Mini Parts, Classic Mini DIY is completely funded by myself and my patrons.  Without your help I could not provide the quality videos you enjoy.</p>
            <v-btn class="patreon" target='_blank' :href='patreon' tag='a' dark>Support Us on Patreon</v-btn>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import ytcounter from '~/components/ytcounter';

export default {
  data () {
    return {
      patreon: 'https://www.patreon.com/classicminidiy',
      sevenEnt: 'http://www.7ENT.com/store?af=cmdiy1959',
      youtube: 'https://www.youtube.com/c/classicminidiy',
      specs: '/specs',
      history: '/historical',
      manuals: '/manuals'
    };
  },
  components: {
    ytcounter
  }
};
</script>

<style lang="scss">
.home {
  .hero {
    background-image: url('/pages/default.png') !important;
    background-size: cover;
    min-height: 92vh;

    h1 {
      color: #fff;
    }
    img {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }

  h2 {
    font-weight: 200;
  }
  a {
    text-decoration: none;
  }

  .container--fluid {
    padding-top: 0;
    padding-bottom: 0;
  }

  .mission, .latest-video {
    h2 {
      color: #fff;
    }
  }
  .mission {
    .mission-list {
      .center {
        border-left: 2px solid #EDF0F3;
        border-right: 2px solid #EDF0F3;
      }
    }
  }

  .latest-video {
    background-color: #F1F5F7;
    padding-top: 5rem;
    padding-bottom: 5rem;
    margin-left: -25px;
    margin-right: -25px;

    .embed-container {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      max-width: 100%;
    }
    .embed-container iframe,
    .embed-container object,
    .embed-container embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .sponsors {
    .seven-ent {
      background-color: #D40C16 !important;
    }
    .patreon {
      background-color: #F96854 !important;
    }
  }
}

</style>
