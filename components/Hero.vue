<template>
  <section
    class="hero"
    :class="$attrs.size"
    :style="{ backgroundImage: 'url(' + $attrs.background + ')' }"
  >
    <!-- Hero head: will stick at the top -->
    <div v-if="$attrs.navigation" class="hero-head">
      <b-navbar>
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <img src="/small-logo.png" alt="Logo" />
          </b-navbar-item>
        </template>
        <template slot="end">
          <b-navbar-item tag="div">
            <nuxt-link
              class="fancy-font-heavy has-text-white navbar-item"
              to="/"
            >
              Home
            </nuxt-link>
          </b-navbar-item>
          <b-navbar-item
            href="https://merch.classicminidiy.com"
            target="_blank"
            class="fancy-font-heavy has-text-white "
          >
            Store
          </b-navbar-item>
          <b-navbar-dropdown class="fancy-font-heavy has-text-white dropdown-handle" label="Technical Info">
            <b-navbar-item tag="div">
              <nuxt-link
                class="fancy-font-heavy navbar-item"
                to="/technical"
              >
                <img src="/icons/Coding-Html.svg" /> All Tools
              </nuxt-link>
            </b-navbar-item>
            <b-navbar-item v-for="dropdown in dropdowns" :key="dropdown.title" tag="div">
              <nuxt-link
                class="fancy-font-heavy navbar-item"
                :to="dropdown.to"
              >
                <img :src="dropdown.image"> {{ dropdown.title }}
              </nuxt-link>
            </b-navbar-item>
          </b-navbar-dropdown>
          <b-navbar-item tag="div">
            <span class="fancy-font-heavy navbar-item">
              <a
                class="button is-inverted is-danger"
                rel="noopener"
                target="_blank"
                href="https://www.youtube.com/c/classicminidiy?sub_confirmation=1"
              >
                <span class="icon">
                  <i class="fab fa-youtube" />
                </span>
                <span>Subscribe</span>
              </a>
            </span>
          </b-navbar-item>
        </template>
      </b-navbar>
    </div>
    <div class="hero-body">
      <div class="container" :class="{ 'has-text-centered': $attrs.centered }">
        <p class="subtitle is-6 has-text-white">
          {{ $attrs.subtitle }}
        </p>
        <!-- eslint-disable-next-line -->
        <h1
          class="title fancy-font-bold has-text-white"
          :class="{ 'special-title': $attrs.special }"
          v-html="$attrs.title"
        />
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data () {
    return {
      mobileOpen: false,
      dropdowns: [
        {
          title: 'Torque Specs',
          image: '/icons/Settings-5.svg',
          to: '/technical/torque'
        },
        {
          title: 'Manuals',
          image: '/icons/Checklist.svg',
          to: '/technical/manuals'
        },
        {
          title: 'Electrical Diagrams',
          image: '/icons/Battery-Charging.svg',
          to: '/technical/electrical'
        },
        {
          title: 'SU Needle Comparison',
          image: '/icons/Graph-Magnifier.svg',
          to: '/technical/needles'
        },
        {
          title: 'Wheel Dictionary',
          image: '/icons/Bus.svg',
          to: '/technical/wheels'
        }
      ]
    };
  }
};
</script>
<style lang="scss">
.hero {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  .navbar-burger, .dropdown-handle > a {
    color: #fff;
  }

  .dropdown-handle {
    > a:hover {
      color: #2f2f2f;
    }
    > a:active {
      color: #2f2f2f;
    }
    > a:focus {
      color: #2f2f2f;
    }
  }
  .navbar-menu.is-active {
    .navbar-dropdown {
      .navbar-item {
        color: #fff;
      }
      .navbar-item:hover {
        color: #2f2f2f;
      }
    }
  }

  .navbar-dropdown {
    .navbar-item {
      color: #2f2f2f;

      img {
        display: inline;
        position: relative;
        left: -10px;
      }
    }
  }

  .special-title {
    font-size: 140px;
  }

  @media screen and (max-width: 1023px) {
    .navbar-menu {
      background-color: transparent;
    }
    .special-title {
      font-size: 2rem;
    }
  }
}
</style>
