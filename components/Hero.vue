<template>
  <section
    class="hero"
    :class="size"
    :style="{ backgroundImage: `url(https://classicminidiy.s3.amazonaws.com/misc${background})` }"
  >
    <client-only>
      <nav-bar
        :options="navbarOptions"
        @vnb-item-clicked="vnbItemClicked"
        @vnb-mobile-popup-shown="toggleOverlay"
        @vnb-mobile-popup-hidden="toggleOverlay"
      />
    </client-only>
    <div v-if="showOverlay" class="nav-overlay"></div>
    <div class="hero-body">
      <div class="container" :class="{ 'has-text-centered': centered }">
        <p class="subtitle is-6 has-text-white">
          {{ subtitle }}
        </p>
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
      showOverlay: false,
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
            iconLeft: '<i class="fad fa-house"></i>'
          },
          {
            isLinkAction: true,
            type: 'link',
            text: 'Store',
            path: 'https://merch.classicminidiy.com',
            iconLeft: '<i class="fad fa-store"></i>'
          },
          {
            type: 'link',
            text: 'Toolbox',
            iconLeft: '<i class="fad fa-toolbox"></i>',
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
                text: 'Compression Ratio Calculator',
                subText: 'Calculate the compression ratio for your next engine build',
                path: '/technical/compression',
                iconLeft: '<i class="submenu-icon fad fa-compress-arrows-alt"></i>'
              },
              {
                type: 'hr'
              },
              {
                type: 'link',
                text: 'Color Picker',
                subText: 'Find the right color swatch for your car',
                path: '/technical/colors',
                iconLeft: '<i class="submenu-icon fad fa-palette"></i>'
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
                text: 'Essential Tools',
                subText: 'Find some of the most useful tools to help make tough jobs easier.',
                path: '/technical/Tools',
                iconLeft: '<i class="submenu-icon fad fa-wrench"></i>'
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
                text: 'Wheel Library',
                subText: 'Looking for your new wheels? Check out the Wheel Library',
                path: '/technical/wheels',
                iconLeft: '<i class="submenu-icon fad fa-tire"></i>'
              }
            ]
          },
          {
            isLinkAction: true,
            type: 'button',
            class: 'fancy-font-heavy youtube',
            text: 'Subscribe',
            path: 'https://www.youtube.com/c/classicminidiy?sub_confirmation=1',
            iconLeft: '<i class="fab fa-youtube" />'
          }
        ]
      }
    };
  },
  mounted () {
    window.dispatchEvent(new Event('resize'));
  },
  methods: {
    vnbItemClicked (text) {
      if (text === 'Store') {
        window.open('https://merch.classicminidiy.com', '_blank');
      } else if (text === 'Subscribe') {
        window.open('https://www.youtube.com/c/classicminidiy?sub_confirmation=1', '_blank');
      }
    },
    toggleOverlay () {
      this.showOverlay = !this.showOverlay;
    }
  }
};
</script>
<style lang="scss">
.hero {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  nav-bar, nav {
    background: rgba(255, 255, 255, 1);
    padding-left: 2rem;
    padding-right: 2rem;

    .youtube {
      background-color: #FF0000;
      padding: 12px 12px;
      cursor: pointer;

      @media screen and (max-width: 991px) {
        color: white;
        width: 75%;
        margin: auto;
        border-radius: 10px;
      }
    }
    .submenu-icon {
      font-size: 1.7rem;

      &.fa-ruler-triangle {
        color: #CD342E;
      }
      &.fa-palette {
        color: #4285F5;
      }
      &.fa-books {
        color: #522B1A;
      }
      &.fa-bolt {
        color: #FF9A00;
      }
      &.fa-chart-bar {
        color: #0D6628;
      }
      &.fa-wrench {
        color: #6953bb;
      }
      // &.fa-compress-arrows-alt {
        // color: none
      // }
    }
  }

  .special-title {
    font-size: 140px;
  }

  @media screen and (max-width: 1023px) {
    .special-title {
      font-size: 2rem;
    }
    .nav-overlay {
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(42, 42, 43, 0.8);
      z-index: 99999;
    }
  }
}
</style>
