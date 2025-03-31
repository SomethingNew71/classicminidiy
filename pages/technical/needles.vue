<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '~/data/models/generic';
  useHead({
    title: 'SU Needles Chart & Comparison Tool | Classic Mini DIY',
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          'Compare SU carburettor needles for your Classic Mini with our interactive chart. Find the right needle profile for your engine build with this comprehensive comparison tool.',
      },
      {
        key: 'keywords',
        name: 'keywords',
        content:
          'SU needles, carburettor needles, Classic Mini, needle comparison, SU carburettor, needle profiles, Mini Cooper',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://classicminidiy.com/technical/needles',
      },
      {
        rel: 'preconnect',
        href: 'https://classicminidiy.s3.amazonaws.com',
      },
    ],
  });

  useSeoMeta({
    ogTitle: 'SU Needles Chart & Comparison Tool | Classic Mini DIY',
    ogDescription:
      'Compare SU carburettor needles for your Classic Mini with our interactive chart. Find the right needle profile for your engine build.',
    ogUrl: 'https://classicminidiy.com/technical/needles',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'SU Needles Chart & Comparison Tool | Classic Mini DIY',
    twitterDescription: 'Compare SU carburettor needles for your Classic Mini with our interactive chart.',
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.png',
  });

  // Add structured data for the tool
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Compare SU Carburettor Needles',
    description:
      'Compare different SU carburettor needles to find the right profile for your Classic Mini engine build.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Select Needles',
        text: 'Start typing the name of the needles you would like to compare in the dropdown menu.',
      },
      {
        '@type': 'HowToStep',
        name: 'Add to Comparison',
        text: 'Click the "Add Needle" button to add the selected needle to the comparison chart.',
      },
      {
        '@type': 'HowToStep',
        name: 'View Comparison',
        text: 'The chart will automatically update to show the profiles of all selected needles for comparison.',
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: 'Interactive Needle Comparison Chart',
      },
    ],
  };

  // Add JSON-LD structured data to head
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(howToJsonLd),
      },
    ],
  });
</script>

<template>
  <hero :navigation="true" :title="'Needle Configurator'" :heroType="HERO_TYPES.TECH" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" page="Needle Comparison"></breadcrumb>
      </v-col>
      <v-col cols="12">
        <h1 class="fancy-font-bold is-size-3">SU Carburettor Needles Comparison Tool</h1>
        <p class="is-size-5 pt-5">
          One of the most confusing things about working on your Classic Mini often is the carburettor needle used on
          your car. Below you will find a multi-needle comparison chart which will allow you to compare needle profiles
          of multiple SU needles at the same time. Choose the needles you would like to compare and click Compare which
          will redraw the chart with new profiles. A huge thank you to the mintylamb site for posting this information
          publically.
        </p>
      </v-col>
      <v-col cols="12" class="hr mt-5"></v-col>
      <v-col cols="12">
        <CalculatorsNeedles />
      </v-col>
      <v-col cols="12" md="10" offset-md="1">
        <div class="divider">Needle Charts</div>
      </v-col>
      <v-col cols="12" class="has-text-centered">
        <h2 class="fancy-font-book is-size-3">Find the needle for your carb</h2>
        <h3 class="fancy-font-book is-size-5">
          Information provided by
          <a href="https://www.7ent.com/pages/articles-tech-tips/chart-carburetor-needle.html" target="_blank"
            >Seven Mini Parts</a
          >
        </h3>
      </v-col>
      <NeedleTable />
      <v-col cols="12" md="10" offset-md="1">
        <div class="divider">Support</div>
      </v-col>
      <v-col cols="12">
        <patreon-card size="large" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss">
  .b-tabs .tab-content {
    padding-left: 0px;
    padding-right: 0px;
  }
  .hr {
    border-top: 1px solid whitesmoke;
  }
</style>
