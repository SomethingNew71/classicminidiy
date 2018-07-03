<template>
  <section class="home">
    <!-- HERO SECTION -->
    <v-jumbotron class="hero" color="grey lighten-2">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex xs12 md6 class="text-xs-center px-5">
            <img class="pt-5 text-xs-center responsive-img" src="/img/wheel-logo-black-large.png" alt="Classic Mini DIY Logo image">
            <br>
            <span class="title">The best source of Classic Mini DIY videos and guides since 2015</span>
            <br>
            <br>
            <youtubeSubButton></youtubeSubButton>
          </v-flex>
          <v-flex hidden-sm-and-down md6>
            <img src="/img/carb.png" alt="">
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <!-- TAB NAVIGATION -->
    <v-tabs icons-and-text centered dark hide-slider>
      <v-tab
        v-for="(item, index) in nav"
        :nuxt="item.to"
        :href="item.href"
        :key="index"
        :target="item.target"
        :class="item.classes"
        >
        {{item.name}}
        <v-icon size="22px" :class="item.color"> {{item.icon}} </v-icon>
      </v-tab>
    </v-tabs>
    <!-- PAGE CONTENTS BEGIN -->
    <v-container class="pt-2">
      <youtubeVideos></youtubeVideos>
      <featuredProducts></featuredProducts>
      <div class="pt-5"></div>
      <supportSection></supportSection>
      <div class="pt-5"></div>
    </v-container>
  </section>
</template>

<script>
import youtubeSubButton from '~/components/youtubeSubButton';
import youtubeVideos from '~/components/youtubeVideos';
import featuredProducts from '~/components/featuredProducts';
import supportSection from '~/components/supportSection';

export default {
  data () {
    return {
      specs: '/specs',
      history: '/historical',
      manuals: '/manuals',
      nav: {
        Videos: {
          name: 'Videos',
          color: 'red--text',
          icon: 'fab fa-youtube',
          target: '_blank',
          href: 'https://www.youtube.com/c/classicminidiy'
        },
        Merch: {
          name: 'Merch',
          color: 'blue--text lighten-1',
          icon: 'fas fa-store',
          target: '_blank',
          href: 'https://www.facebook.com/classicminidiy'
        },
        Toolset: {
          name: 'Toolbox',
          color: 'green--text',
          icon: 'fas fa-toolbox',
          href: 'toolset/',
          to: true,
          classes: 'showcase-item'
        },
        Instagram: {
          name: 'Instagram',
          color: 'orange--text darken-1',
          icon: 'fab fa-instagram',
          target: '_blank',
          href: 'https://www.instagram.com/classicminidiy59/'
        },
        Patreon: {
          name: 'Patreon',
          color: 'red--text lighten-3',
          icon: 'fab fa-patreon',
          target: '_blank',
          href: 'http://bit.ly/cmdiypatreon'
        }
      }
    };
  },
  components: {
    youtubeSubButton,
    youtubeVideos,
    featuredProducts,
    supportSection
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
    .showcase-item {
      a {
        font-size: 16px !important;
        .icon {
          font-size: 29px !important;
        }
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
