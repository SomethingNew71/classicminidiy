<template>
  <section
    class="hero"
    :class="size"
    :style="[
      {
        backgroundImage: `url(https://classicminidiy.s3.amazonaws.com/misc${background}.webp)`,
      },
    ]"
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
<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    special: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String,
      default: '/technical',
    },
    navigation: {
      type: Boolean,
      default: true,
    },
    centered: {
      type: Boolean,
      default: false,
    },
  });
</script>
<script lang="ts">
  export default defineComponent({
    data() {
      return {
        showOverlay: false,
        mobileOpen: false,
        navbarOptions: {
          elementId: 'main-navbar',
          mobileBreakpoint: 992,
          brandImage:
            'https://classicminidiy.s3.amazonaws.com/misc/black-small-logo.png',
          brandImageAltText: 'brand-image',
          showBrandImageInMobilePopup: true,
          ariaLabelMainNav: 'Primary Page Navigation',
          tooltipAnimationType: 'shift-away',
          menuOptionsRight: [
            {
              type: 'link',
              text: 'Home',
              isUsingVueRouter: true,
              path: '/',
              iconLeft: '<i class="fad fa-house"></i>',
            },
            {
              type: 'link',
              text: 'Store',
              isUsingVueRouter: false,
              path: 'https://merch.classicminidiy.com',
              iconLeft: '<i class="fad fa-store"></i>',
            },
            {
              type: 'link',
              text: 'Toolbox',
              iconLeft: '<i class="fad fa-toolbox"></i>',
              subMenuOptions: [
                {
                  type: 'link',
                  text: 'Torque Specs',
                  // subText: 'Torque Specs for your entire car',
                  isUsingVueRouter: true,
                  path: '/technical/torque',
                  iconLeft: `
                  <picture class="submenu-icon">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.webp" type="image/webp">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png" type="image/png">
                    <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png">
                  </picture>
                `,
                },
                {
                  type: 'hr',
                },
                {
                  type: 'link',
                  text: 'Electrical Diagrams',
                  // subText: 'Complete and new digitally redrawn Classic Mini Wiring diagrams',
                  isUsingVueRouter: true,
                  path: '/technical/electrical',
                  iconLeft: `
                  <picture class="submenu-icon">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.webp" type="image/webp">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.png" type="image/png">
                    <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.png">
                  </picture>
                `,
                },
                {
                  type: 'hr',
                },
                {
                  type: 'link',
                  text: 'Engine Sizes',
                  // subText: 'Torque Specs for your entire car',
                  isUsingVueRouter: true,
                  path: '/technical/enginesize',
                  iconLeft: `
                  <picture class="submenu-icon">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.webp" type="image/webp">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png" type="image/png">
                    <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png">
                  </picture>
                `,
                },
                {
                  type: 'hr',
                },
                {
                  type: 'link',
                  text: 'Carb Needle Configurator',
                  // subText: 'Ever been confused about carb needles? Use our configurator to find the right needle profile for your car.',
                  isUsingVueRouter: true,
                  path: '/technical/needles',
                  iconLeft: `
                  <picture class="submenu-icon">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.webp" type="image/webp">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.png" type="image/png">
                    <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.png">
                  </picture>
                `,
                },
                {
                  type: 'hr',
                },
                {
                  type: 'link',
                  text: 'Gearbox Calculator',
                  // subText: 'Ever been confused about carb needles? Use our configurator to find the right needle profile for your car.',
                  isUsingVueRouter: true,
                  path: '/technical/gearing',
                  iconLeft: `
                  <picture class="submenu-icon">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-level-tool-100.webp" type="image/webp">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-level-tool-100.png" type="image/png">
                    <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-level-tool-100.png">
                  </picture>
                `,
                },
                {
                  type: 'hr',
                },
                {
                  type: 'link',
                  text: 'Wheel Library',
                  // subText: 'Looking for your new wheels? Check out the Wheel Library',
                  isUsingVueRouter: true,
                  path: '/technical/wheels',
                  iconLeft: `
                  <picture class="submenu-icon">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.webp" type="image/webp">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.png" type="image/png">
                    <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.png">
                  </picture>
                `,
                },
                {
                  type: 'hr',
                },
                {
                  type: 'link',
                  text: 'Compression Ratio Calculator',
                  // subText: 'Calculate the compression ratio for your next engine build',
                  isUsingVueRouter: true,
                  path: '/technical/compression',
                  iconLeft: `
                  <picture class="submenu-icon">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.webp" type="image/webp">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png" type="image/png">
                    <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png">
                  </picture>
                `,
                },
                {
                  type: 'hr',
                },
                {
                  type: 'link',
                  text: 'Parts Equivalency',
                  // subText: 'Calculate the compression ratio for your next engine build',
                  isUsingVueRouter: true,
                  path: '/technical/parts',
                  iconLeft: `
                  <picture class="submenu-icon">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-support-100.webp" type="image/webp">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-support-100.png" type="image/png">
                    <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-support-100.png">
                  </picture>
                `,
                },
                {
                  type: 'hr',
                },
                {
                  type: 'link',
                  text: 'Color Picker',
                  // subText: 'Find the right color swatch for your car',
                  isUsingVueRouter: true,
                  path: '/technical/colors',
                  iconLeft: `
                  <picture class="submenu-icon">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-color-palette-100.webp" type="image/webp">
                    <source srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-color-palette-100.png" type="image/png">
                    <img alt="" src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-color-palette-100.png">
                  </picture>
                `,
                },
              ],
            },
            {
              type: 'button',
              class: 'fancy-font-heavy donate',
              text: 'Buy me a Coffee',
              isUsingVueRouter: false,
              path: 'https://ko-fi.com/classicminidiy',
              iconLeft: '<i class="fad fa-mug-saucer" />',
            },
          ],
        },
      };
    },
    mounted() {
      window.dispatchEvent(new Event('resize'));
    },
    methods: {
      vnbItemClicked(text: string) {
        if (text === 'Store') {
          window.open('https://merch.classicminidiy.com', '_blank');
        } else if (text === 'Buy me a Coffee') {
          window.open('https://ko-fi.com/classicminidiy', '_blank');
        }
      },
      toggleOverlay() {
        this.showOverlay = !this.showOverlay;
      },
    },
  });
</script>
<style lang="scss">
  .hero {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    nav-bar,
    nav {
      background: rgba(255, 255, 255, 1);
      padding-left: 2rem;
      padding-right: 2rem;

      .donate {
        background-color: #45a65e;
        padding: 12px 12px;
        cursor: pointer;

        @media screen and (max-width: 991px) {
          color: white;
          width: 75%;
          margin: auto;
          border-radius: 10px;
        }
      }
      .vnb__popup__top__close-button__image {
        max-height: 20px;
      }
      .vnb__popup__bottom__sub-menu-options__option__link {
        padding: 2px 10px 0px 38px;
      }
      .vnb__popup__bottom__menu-options__option__link--no-highlight {
        font-weight: 700;
        font-size: 1rem;
      }
      .vnb__sub-menu-options__option__hr {
        margin: 0;
      }
      .vnb__sub-menu-options__option__link__icon--left {
        max-width: 50px;
      }
      .vnb__sub-menu-options__option__link {
        padding: 0px 12px;
      }
      .vnb__menu-options__option__link {
        @keyframes wiggle {
          0% {
            transform: rotate(0deg);
          }
          80% {
            transform: rotate(0deg);
          }
          85% {
            transform: rotate(10deg);
          }
          95% {
            transform: rotate(-10deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        &[aria-label='Store'] {
          display: inline-block;
          animation: wiggle 1.5s infinite;
        }

        &[aria-label='Store']:hover {
          animation: none;
        }
      }
    }

    .special-title {
      font-size: 100px;
    }

    @media screen and (max-width: 992px) {
      .donate {
        display: none;
      }
      .vnb__popup__bottom__menu-options__option__link {
        padding: 5px 24px;
      }
      .vnb__popup__bottom__menu-options__option:not(:last-child) {
        margin-bottom: 5px;
      }
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
