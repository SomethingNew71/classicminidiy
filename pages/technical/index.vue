<template>
  <section class="section">
    <div class="columns is-multiline">
      <div class="column is-12">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <nuxt-link to="/">
                <span class="icon is-small">
                  <i class="fad fa-home" aria-hidden="true" />
                </span>
                <span>Home</span>
              </nuxt-link>
            </li>
            <li class="is-active">
              <nuxt-link to="/technical">
                <span class="icon is-small">
                  <i class="fad fa-info-circle" aria-hidden="true" />
                </span>
                <span>Technical Info</span>
              </nuxt-link>
            </li>
          </ul>
        </nav>
        <h3 class="fancy-font-book-oblique">
          KEEPING MINIS DRIVING
        </h3>
        <h4 class="fancy-font-bold is-size-3">
          Technical Information for the DIY Mechanic
        </h4>
      </div>
      <div class="mobile-list column is-4">
        <nav class="panel">
          <p class="panel-heading">
            Classic Mini Toolbox
          </p>
          <nuxt-link
            v-for="(card, index) in cards"
            :key="index"
            :to="card.to"
            class="panel-block is-active"
          >
            <span class="panel-icon">
              <b-image :src="card.webp" :webp-fallback="card.image" />
            </span>
            {{ card.title }}
          </nuxt-link>
        </nav>
      </div>
      <div class="column is-8">
        <p class="is-size-5 pt-5 pb-5">
          One of the most important parts of Classic Mini DIY is the focus on getting out and working on your own car. So to make this easier for you, I have collected technical information from various sources and consolidated it right here on classicminidiy.com.
        </p>
        <div class="card">
          <div v-if="adsEnabled" class="card-content">
            <adsbygoogle ad-slot="7951209261" />
          </div>
          <div v-else class="card-content">
            <ad-backfill />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import AdBackfill from '~/components/AdBackfill';

export default {
  components: {
    AdBackfill
  },
  data () {
    return {
      cards: [
        {
          title: 'Torque Specs',
          image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png',
          webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.webp',
          to: '/technical/torque'
        },
        {
          title: 'Engine Sizes',
          image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png',
          webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.webp',
          to: '/technical/enginesize'
        },
        {
          title: 'Color Picker',
          image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-color-palette-100.png',
          webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-color-palette-100.webp',
          to: '/technical/colors'
        },
        {
          title: 'Manuals',
          image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-book-reading-100.png',
          webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-book-reading-100.webp',
          to: '/technical/manuals'
        },
        {
          title: 'Compression Ratio Calculator',
          image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png',
          webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.webp',
          to: '/technical/compression'
        },
        {
          title: 'Recommended Tools',
          image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-toolbox-100.png',
          webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-toolbox-100.webp',
          to: '/technical/tools'
        },
        {
          title: 'Electrical Diagrams',
          image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.png',
          webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.webp',
          to: '/technical/electrical'
        },
        {
          title: 'SU Needle Comparison',
          image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.png',
          webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.webp',
          to: '/technical/needles'
        },
        {
          title: 'Wheel Library',
          image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.png',
          webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.webp',
          to: '/technical/wheels'
        }
      ]
    };
  },
  head () {
    return {
      title: 'Technical Toolbox',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'The classic mini online toolbox, offering detailed information from a range of topics. Anything from torque specs to SU needle comparison can be found right here.'
        },
        {
          property: 'og:title',
          content: 'Technical Toolbox'
        }
      ]
    };
  },
  computed: {
    adsEnabled () {
      return this.$store.state.data.adsEnabled;
    }
  }
};
</script>

<style lang="scss" scoped>
.panel-icon {
  height: 3.5em;
  width: 3.5em;
}
</style>
