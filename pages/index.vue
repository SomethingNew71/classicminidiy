<template>
  <section class="home">
    <!-- HERO SECTION -->
    <v-jumbotron class="hero" color="grey lighten-2">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex xs12 md6 class="text-xs-center px-5">
            <img class="pt-5 text-xs-center responsive-img" src="/img/wheel-logo-black-large.png" alt="Classic Mini DIY Logo image">
            <br>
            <span class="headline">The best source of Classic Mini DIY videos and guides since 2015</span>
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
      <youtubeVideos></youtubeVideos>
      <featuredProducts></featuredProducts>
      <div class="pt-5"></div>
      <v-layout justify-space-around wrap>
        <v-flex xs12 md6 class="pa-2 text-xs-center">
          <div class="red lighten-2 pa-4">
            <h3 class="white--text display-1">
              Help Support the Channel
            </h3>
            <p class="white--text subheading pt-3">
              Check out the classic mini DIY parts sponsor for all your parts needs in North America.
            </p>
            <v-btn color="red--text lighten-2" href="http://bit.ly/cmdiypatreon" :target="'_blank'" large>
              <span class="icon pr-3 py-2 headline red--text lighten-2"><i class="fab fa-patreon"></i></span> Patreon
            </v-btn>
          </div>
        </v-flex>
        <v-flex xs12 md6 class="pa-2">
          <div class="pa-4 seven-card text-xs-center">
            <h3 class="white--text display-1">
              Seven Mini Parts
            </h3>
            <p class="white--text subheading pt-3">
              Check out the classic mini DIY parts sponsor for all your parts needs in North America.
            </p>
            <v-btn color="red white--text" href="http://www.7ent.com/?af=cmdiy1959" :target="'_blank'" large>
              <span class="icon pr-3 py-2 headline lighten-2"><i class="fa fa-car"></i></span> Seven Mini
            </v-btn>
          </div>
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
  @media only screen and (min-width: 0px) {
    .tabs {
      .tabs__item {
        font-size: 11px;
      }
    }
  }
  @media only screen and (min-width: 500px) {
    .tabs {
      .tabs__item {
        font-size: 14px;
      }
    }
  }
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
}

</style>
