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
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" page="Needle Comparison"></breadcrumb>
      </div>
      <div class="col-span-12">
        <h1 class="fancy-font-bold text-2xl">SU Carburettor Needles Comparison Tool</h1>
        <p class="text-lg pt-5">
          One of the most confusing things about working on your Classic Mini often is the carburettor needle used on
          your car. Below you will find a multi-needle comparison chart which will allow you to compare needle profiles
          of multiple SU needles at the same time. Choose the needles you would like to compare and click Compare which
          will redraw the chart with new profiles. A huge thank you to the mintylamb site for posting this information
          publically.
        </p>
      </div>
      <div class="col-span-12 border-t border-base-300 mt-5"></div>
      <div class="col-span-12">
        <CalculatorsNeedles />
      </div>
      <div class="col-span-12">
        <div class="divider">Needle Charts</div>
      </div>
      <div class="col-span-12 text-center">
        <h2 class="fancy-font-book text-2xl">Find the needle for your carb</h2>
        <h3 class="fancy-font-book text-lg">
          Information provided by
          <a
            href="https://www.7ent.com/pages/articles-tech-tips/chart-carburetor-needle.html"
            target="_blank"
            class="link link-primary"
            >Seven Mini Parts</a
          >
        </h3>
      </div>
      <div class="col-span-12">
        <NeedleTable />
      </div>
      <div class="col-span-12">
        <div class="divider">Support</div>
      </div>
      <div class="col-span-12">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .b-tabs .tab-content {
    padding-left: 0px;
    padding-right: 0px;
  }
</style>
