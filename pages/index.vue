<template>
  <section class="home">
    <v-layout class="hero" row wrap>
      <v-flex xs12 class="pb-2">
        <img class="is-hidden-mobile pt-5 mt-5" src="/img/logo.png" alt="Classic Mini DIY Logo image">
        <h1 class="display-3 text-xs-center">Classic Mini DIY</h1>
        <h2 class="subheading text-xs-center white--text pb-4">The best place to find information on your Classic Mini Cooper</h2>
        <div class="text-xs-center">
          <v-btn tag='a' href="#get-started" color="primary" class="mb-5">Get Started</v-btn>
          <v-btn tag='a' href="https://www.youtube.com/c/classicminidiy" color="error" class="mb-5">
            <v-icon class="white--text pr-2 ">fa-youtube-play</v-icon>
            Youtube
          </v-btn>
          <br>
          <v-icon x-large class="white--text mt-2">fa-angle-down</v-icon>
        </div>
      </v-flex>
    </v-layout>
    <v-container fluid class="px-0">
      <v-layout row wrap class="mission pt-5 pb-4">
        <v-flex xs12 class="mission-header text-xs-center">
          <h2 class="display-1 white--text darken-3">Our Mission</h2>
          <p class="subheading accent--text lighten-2 ma-0">Keeping the classics alive</p>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="mb-4 pt-3 px-5 text-xs-center text-md-left mission-list">
        <v-flex xs12 md6 class="mb-4 px-3">
          <h3 class="headline pb-3 accent--text">
            Teach the Mini Community
          </h3>
          <p class="accent--text">Classic Mini DIY first and foremost is about creating DIY videos for new and inexperienced Classic Mini owners to use and reference when fixing their own cars. While we will always be making DIY videos Classic Mini DIY hopes to be the best place on the internet to find Classic Mini information.</p>
          <ytcounter></ytcounter>
        </v-flex>
        <v-flex xs12 md6 class="mb-4 px-3">
          <img class="responsive-img elevation-5" src="/img/preview.png" alt="">
          <!-- <v-carousel>
            <v-carousel-item v-for="(item,i) in items" v-bind:src="item.src" :key="i"></v-carousel-item>
          </v-carousel> -->
        </v-flex>
      </v-layout>
      <get-started-tiles></get-started-tiles>
      <v-flex xs10 offset-xs1>
        <v-divider></v-divider>
      </v-flex>
      <v-layout row wrap class="sponsors pt-5 pb-5 px-5" justify-space-around>
        <v-layout row wrap class="text-xs-center">
          <v-flex xs12 class="pb-5 mb-3">
            <h2 class="display-1 white--text darken-3">Our Sponsors</h2>
            <p class="subheading accent--text lighten-2 ma-0">All the wonderful people who help support this channel</p>
          </v-flex>
          <v-flex xs12 md5 class="first mb-4 pb-4 px-2">
            <img src="/img/seven-logo-white-small.png" alt="">
            <h3 class="headline pt-3">Seven Mini Parts</h3>
            <p>From almost the point of this channels creation, Seven Mini Parts has been a brand and company partner. They took a chance on a small youtube channel that is now growing past my wildest dreams. If you are in the market for Mini parts please check them out!</p>
            <v-btn target='_blank' :href='sevenEnt' tag='a' class="seven-ent" dark>Checkout 7ent.com</v-btn>
          </v-flex>
          <v-flex xs12 md2></v-flex>
          <v-flex xs12 md5 class="px-2">
            <img src="/img/patreon-logo.png" alt="">
            <h3 class="headline pt-3">Patreon Supporters</h3>
            <p>Aside from the parts and guidance provided by Seven Mini Parts, Classic Mini DIY is completely funded by myself and my patrons. Without your help, I could not provide the quality videos you enjoy.</p>
            <v-btn class="patreon" target='_blank' :href='patreon' tag='a' dark>Support Me on Patreon</v-btn>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-container>
  </section>
</template>

<script>
import ytcounter from '~/components/ytcounter';
import getStartedTiles from '~/components/getStartedTiles';

export default {
  data () {
    return {
      patreon: 'http://bit.ly/cmdiypatreon',
      sevenEnt: 'http://www.7ENT.com/store?af=cmdiy1959',
      youtube: 'https://www.youtube.com/c/classicminidiy',
      specs: '/specs',
      history: '/historical',
      manuals: '/manuals',
      items: [
        {
          src: '/img/preview.png'
        },
        {
          src: '/img/preview2.png'
        }
      ]
    };
  },
  components: {
    ytcounter,
    getStartedTiles
  }
};
</script>

<style lang="scss">
.home {
  h2 { font-weight: 200; }
  a { text-decoration: none; }

  .responsive-img {
    max-width: 100%;
    width: auto;
    height: auto;
    margin: auto;
    display: block;
  }

  .hero {
    background-image: url('/img/default.png') !important;
    background-size: cover;
    min-height: 55vh;

    h1 {
      color: #fff;
    }
    img {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    .youtube-red {
      .btn__content {
        background-color: #F44336;
      }
    }
  }

  #get-started {
    background-color: #414141;
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
