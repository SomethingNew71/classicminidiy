<template>
  <section
    class="hero"
    :class="size"
    :style="{ backgroundImage: 'url(' + require('assets/img' + background) + ')' }"
  >
    <!-- Hero head: will stick at the top -->
    <div v-if="navigation" class="hero-head">
      <nav-bar :options="navbarOptions" />
    </div>
    <div class="hero-body">
      <div class="container" :class="{ 'has-text-centered': centered }">
        <p class="subtitle is-6 has-text-white">{{ subtitle }}</p>
        <!-- eslint-disable-next-line -->
        <h1
          class="title fancy-font-bold has-text-white"
          :class="{ 'special-title': special }"
          v-html="title"
        />
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    special: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: ''
    },
    navigation: {
      type: Boolean,
      default: true
    },
    centered: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mobileOpen: false,
      navbarOptions: {
        elementId: 'main-navbar',
        isUsingVueRouter: true,
        mobileBreakpoint: 992,
        brandImagePath: './',
        brandImage: require('../assets/img/black-small-logo.png'),
        brandImageAltText: 'brand-image',
        showBrandImageInMobilePopup: true,
        ariaLabelMainNav: 'Primary Page Navigation',
        tooltipAnimationType: 'shift-away',
        menuOptionsRight: [
          {
            type: 'link',
            text: 'Home',
            path: '/',
            iconLeft: '<i class="fa fa-house"></i>'
          },
          {
            type: 'link',
            text: 'Store',
            path: 'https://merch.classicminidiy.com',
            iconLeft: '<i class="fa fa-store"></i>'
          },
          {
            type: 'link',
            text: 'Toolbox',
            iconLeft: '<i class="fa fa-toolbox"></i>',
            subMenuOptions: [
              {
                type: 'link',
                text: 'Torque Specs',
                subText: 'Torque Specs for your entire car',
                path: '/technical/torque',
                iconLeft: '<i class="submenu-icon fad fa-ruler-triangle"></i>'
              },
              {
                type: 'hr'
              },
              {
                type: 'link',
                text: 'Manuals',
                subText: 'Find some of the best manuals to help you learn to work on your classic mini cooper.',
                path: '/technical/Manuals',
                iconLeft: '<i class="submenu-icon fad fa-books"></i>'
              },
              {
                type: 'hr'
              },
              {
                type: 'link',
                text: 'Electrical Diagrams',
                subText: 'Complete and new digitally redrawn Classic Mini Wiring diagrams',
                path: '/technical/electrical',
                iconLeft: '<i class="submenu-icon fad fa-bolt"></i>'
              },
              {
                type: 'hr'
              },
              {
                type: 'link',
                text: 'Carb Needle Configurator',
                subText: 'Ever been confused about carb needles? Use our configurator to find the right needle profile for your car.',
                path: '/technical/needles',
                iconLeft: '<i class="submenu-icon fad fa-chart-bar"></i>'
              },
              {
                type: 'hr'
              },
              {
                type: 'link',
                text: 'Wheel Dictionary',
                subText: 'Looking for the right set of wheels for your Classic Mini? Use our Wheel Dictionary to find the right set for you.',
                path: '/technical/wheels',
                iconLeft: '<i class="submenu-icon fad fa-tire"></i>'
              }
            ]
          },
          {
            type: 'button',
            class: 'fancy-font-heavy youtube',
            text: 'Subscribe Now',
            path: 'https://www.youtube.com/c/classicminidiy?sub_confirmation=1',
            iconLeft: '<i class="fab fa-youtube" />'
          }
        ]
      }
    };
  }
};
</script>
<style lang="scss">
.hero {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .vnb {
    background: rgba(255, 255, 255, 1);
    .youtube {
      background-color: #FF0000;
      padding: 12px 12px;
    }
    .submenu-icon {
      font-size: 1.7rem;
    }
  }

  .special-title {
    font-size: 140px;
  }

  @media screen and (max-width: 1023px) {
    .special-title {
      font-size: 2rem;
    }
  }
}
</style>
