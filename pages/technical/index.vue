<template>
  <div>
    <hero :navigation="true" :title="'Technical Toolbox'" />
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <NuxtLink to="/">
                  <span class="icon is-small">
                    <i class="fad fa-home" aria-hidden="true" />
                  </span>
                  <span>Home</span>
                </NuxtLink>
              </li>
              <li class="is-active">
                <NuxtLink to="/technical">
                  <span class="icon is-small">
                    <i class="fad fa-info-circle" aria-hidden="true" />
                  </span>
                  <span>Technical Info</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
          <h2 class="fancy-font-book-oblique">KEEPING MINIS DRIVING</h2>
          <h3 class="fancy-font-bold is-size-3">Technical Information for the DIY Mechanic</h3>
        </div>
        <div class="mobile-list column is-4">
          <nav class="panel">
            <p class="panel-heading">Classic Mini Toolbox</p>
            <NuxtLink v-for="(card, index) in cards" :key="index" :to="card.to" class="panel-block is-active">
              <span class="panel-icon">
                <nuxt-img format="webp" :src="card.image" :alt="card.title + ' icon'" />
              </span>
              {{ card.title }}
            </NuxtLink>
          </nav>
        </div>
        <div class="column is-8">
          <p class="is-size-5 pt-5 pb-5">
            One of the most important parts of Classic Mini DIY is the focus on getting out and working on your own car.
            So to make this easier for you, I have collected technical information from various sources and consolidated
            it right here on classicminidiy.com.
          </p>
          <div class="card">
            <div class="card-content">
              <patreon-card size="large" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  useHead({
    title: 'Technical Toolbox',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'The classic mini online toolbox, offering detailed information from a range of topics. Anything from torque specs to SU needle comparison can be found right here.',
      },
      {
        property: 'og:title',
        content: 'Technical Toolbox',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'CMDIY - Technical Toolkit',
    ogDescription:
      'The classic mini online toolbox, offering detailed information from a range of topics. Anything from torque specs to SU needle comparison can be found right here.',
    ogUrl: 'classicminidiy.com/technical',
    ogType: 'website',
  });
</script>
<script lang="ts">
  export default defineComponent({
    data() {
      return {
        cards: [
          {
            title: 'Torque Specs',
            image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png',
            webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.webp',
            to: '/technical/torque',
          },
          {
            title: 'Engine Sizes',
            image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png',
            webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.webp',
            to: '/technical/enginesize',
          },
          {
            title: 'Gearbox Calculator',
            image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-level-tool-100.png',
            webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-level-tool-100.webp',
            to: '/technical/gearing',
          },
          {
            title: 'Color Picker',
            image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-color-palette-100.png',
            webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-color-palette-100.webp',
            to: '/technical/colors',
          },
          {
            title: 'Compression Ratio Calculator',
            image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png',
            webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.webp',
            to: '/technical/compression',
          },
          {
            title: 'Parts Equivalency',
            image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-support-100.png',
            webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-support-100.webp',
            to: '/technical/parts',
          },
          {
            title: 'Electrical Diagrams',
            image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.png',
            webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.webp',
            to: '/technical/electrical',
          },
          {
            title: 'SU Needle Comparison',
            image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.png',
            webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.webp',
            to: '/technical/needles',
          },
          {
            title: 'Wheel Library',
            image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.png',
            webp: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-fiat-500-100.webp',
            to: '/technical/wheels',
          },
        ],
      };
    },
  });
</script>

<style lang="scss" scoped>
  .panel-icon {
    height: 3.5em;
    width: 3.5em;
  }
</style>
