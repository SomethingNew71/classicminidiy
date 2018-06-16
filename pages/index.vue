<template>
  <section class="home">
    <!-- HERO SECTION -->
    <v-jumbotron class="hero" color="grey lighten-2">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex xs12 md6 class="text-xs-center py-3 px-5">
            <img class="pt-5 text-xs-center" src="/img/wheel-logo-black.png" alt="Classic Mini DIY Logo image">
            <br>
            <span class="headline">The best source of Classic Mini DIY videos and guides</span>
            <!-- <v-btn large color="primary" class="mx-0">See more</v-btn> -->
          </v-flex>
          <v-flex hidden-sm-and-down md6>
            <img src="/img/carb.png" alt="">
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <!-- TAB NAVIGATION -->
    <v-tabs icons-and-text centered dark>
      <v-tabs-slider color="grey" class="darken-3"></v-tabs-slider>
      <v-tab href="https://www.youtube.com/c/classicminidiy" :target="'_blank'">
        Videos
        <span class="icon red--text"><i class="fab fa-youtube"></i></span>
      </v-tab>
      <v-tab nuxt to="toolset/torque">
        Toolset
        <span class="icon green--text"><i class="far fa-wrench"></i></span>
      </v-tab>
      <!-- <v-tab href="" :target="'_blank'">
        Guides
        <span class="icon green--text"><i class="far fa-book-open"></i></span>
      </v-tab> -->
      <v-tab href="https://merch.classicminidiy.com/" :target="'_blank'">
        Merch
        <span class="icon primary--text"><i class="far fa-store"></i></span>
      </v-tab>
      <v-tab href="https://www.instagram.com/classicminidiy59" :target="'_blank'">
        Instagram
        <span class="icon orange--text darken-1"><i class="fab fa-instagram"></i></span>
      </v-tab>
      <v-tab href="http://bit.ly/cmdiypatreon" :target="'_blank'">
        Patreon
        <span class="icon red--text lighten-3"><i class="fab fa-patreon"></i></span>
      </v-tab>
    </v-tabs>
    <!-- PAGE CONTENTS BEGIN -->
    <v-container class="pt-2">
      <v-layout>
        <v-flex xs12 sm10 offset-sm1 md8 offset-md2 class="py-5 text-xs-center">
          <h3 class="display-1 pb-3">
            Welcome to Classic Mini DIY
          </h3>
          <p class="">
            Classic Mini DIY started back in 2015 and since then has been creating DIY videos teaching all ages how to work on their Classic Mini Coopers. Classic Mini DIY is first and foremost is about creating DIY videos for new and inexperienced Classic Mini owners to use and reference when fixing their own cars. While we will always be making DIY videos Classic Mini DIY hopes to be the best place on the internet to find Classic Mini information.
          </p>
          <p>Above you can find links to all the resources Classic Mini DIY has to offer. If your interested in supporting the channel head to the links and products below for more information.</p>
        </v-flex>
      </v-layout>
      <featuredProducts></featuredProducts>
      <v-layout justify-center class="py-5">
        <v-flex xs12 md10 class="pa-5 red lighten-2 text-xs-center">
          <h3 class="white--text display-2">
            Help Support the Channel
          </h3>
          <p class="white--text subheading">
            Check out the classic mini DIY parts sponsor for all your parts needs in North America.
          </p>
          <v-btn color="red--text lighten-2" href="http://bit.ly/cmdiypatreon" :target="'_blank'" large><span class="icon pr-3 py-2 headline red--text lighten-2"><i class="fab fa-patreon"></i></span> Patreon</v-btn>
        </v-flex>
      </v-layout>
      <youtubeVideos></youtubeVideos>
      <div class="pt-5"></div>
      <v-layout justify-center>
        <v-flex xs12 md10 class="pa-5 seven-card">
          <v-layout wrap>
            <v-flex xs12 md8 class="pr-3 text-xs-center text-md-left">
              <h3 class="white--text display-2">
                Seven Mini Parts
              </h3>
              <p class="white--text subheading">
                Check out the classic mini DIY parts sponsor for all your parts needs in North America.
              </p>
            </v-flex>
            <v-flex xs12 md3 class="text-xs-center">
              <v-btn color="red white--text">Seven Mini</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <div class="pt-5"></div>
    </v-container>
  </section>
</template>

<script>
import youtubeVideos from '~/components/youtubeVideos';
import getStarted from '~/components/getStarted';
import featuredProducts from '~/components/featuredProducts';

export default {
  data () {
    return {
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
    youtubeVideos,
    getStarted,
    featuredProducts
  }
};
</script>

<style lang="scss">
.home {
  .seven-card {
    background-image: url('/img/seven-card.jpg') !important;
    background-size: cover;
  }

  .tabs__item:not(.tabs__item--active) {
   opacity: 1;
  }

  .responsive-img {
    max-width: 100%;
    width: auto;
    height: auto;
    margin: auto;
    display: block;
  }

  .hero {
    img {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .sponsors {
    .seven-ent, .patreon, .merch {
      margin: auto;
    }
    .seven-ent {
      background-color: #D40C16 !important;
    }
    .patreon {
      background-color: #F96854 !important;
    }
    .merch {
      background-color: #25B7D4 !important;
    }
  }
}

</style>
