<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';
  // Track calculator loading state
  const isCalculatorLoaded = ref(false);

  useHead({
    title: $t('title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: $t('description'),
      },
      {
        key: 'keywords',
        name: 'keywords',
        content: $t('keywords'),
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
    ogTitle: $t('og_title'),
    ogDescription: $t('og_description'),
    ogUrl: 'https://classicminidiy.com/technical/needles',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/needles.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('twitter_title'),
    twitterDescription: $t('twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/needles.png',
  });

  // Add structured data for the tool
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: $t('structured_data.name'),
    description: $t('structured_data.description'),
    step: [
      {
        '@type': 'HowToStep',
        name: $t('structured_data.steps.select_needles.name'),
        text: $t('structured_data.steps.select_needles.text'),
      },
      {
        '@type': 'HowToStep',
        name: $t('structured_data.steps.add_to_comparison.name'),
        text: $t('structured_data.steps.add_to_comparison.text'),
      },
      {
        '@type': 'HowToStep',
        name: $t('structured_data.steps.view_comparison.name'),
        text: $t('structured_data.steps.view_comparison.text'),
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: $t('structured_data.tool_name'),
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
  <hero
    :navigation="true"
    :title="$t('hero_title')"
    text-size="text-3xl"
    :heroType="HERO_TYPES.TECH"
  />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 pt-6">
        <breadcrumb
          :version="BREADCRUMB_VERSIONS.TECH"
          :page="$t('breadcrumb_title')"
        ></breadcrumb>
      </div>
      <div class="col-span-12">
        <h1 class="fancy-font-bold text-2xl">{{ $t('main_heading') }}</h1>
        <p class="text-lg pt-5">
          {{ $t('description_text') }}
        </p>
      </div>
      <div class="col-span-12 border-t border-base-300 mt-5"></div>
      <div class="col-span-12">
        <ClientOnly fallback-tag="div" :fallback="$t('ui.loading_fallback')">
          <div class="min-h-96 flex items-center justify-center" v-if="!isCalculatorLoaded">
            <div class="flex flex-col items-center space-y-4">
              <span class="loading loading-spinner loading-lg text-primary"></span>
              <p class="text-base-content/70">{{ $t('ui.loading_text') }}</p>
            </div>
          </div>
          <LazyCalculatorsNeedles @vue:mounted="isCalculatorLoaded = true" />
        </ClientOnly>
      </div>
      <div class="col-span-12">
        <div class="divider">{{ $t('ui.needle_charts_section') }}</div>
      </div>
      <div class="col-span-12 text-center">
        <h2 class="fancy-font-book text-2xl">{{ $t('ui.find_needle_heading') }}</h2>
        <h3 class="fancy-font-book text-lg">
          {{ $t('ui.information_provided_by') }}
          <a
            href="https://www.7ent.com/pages/articles-tech-tips/chart-carburetor-needle.html"
            target="_blank"
            class="link link-primary"
            >{{ $t('ui.seven_mini_parts_link') }}</a
          >
        </h3>
      </div>
      <div class="col-span-12">
        <NeedleTable />
      </div>
      <div class="col-span-12">
        <div class="divider">{{ $t('ui.support_section') }}</div>
      </div>
      <div class="col-span-12">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "SU Needles Chart & Comparison Tool | Classic Mini DIY",
    "description": "Compare SU carburettor needles for your Classic Mini with our interactive chart. Find the right needle profile for your engine build with this comprehensive comparison tool.",
    "keywords": "SU needles, carburettor needles, Classic Mini, needle comparison, SU carburettor, needle profiles, Mini Cooper",
    "hero_title": "Needle Configurator",
    "breadcrumb_title": "Needle Comparison",
    "og_title": "SU Needles Chart & Comparison Tool | Classic Mini DIY",
    "og_description": "Compare SU carburettor needles for your Classic Mini with our interactive chart. Find the right needle profile for your engine build.",
    "twitter_title": "SU Needles Chart & Comparison Tool | Classic Mini DIY",
    "twitter_description": "Compare SU carburettor needles for your Classic Mini with our interactive chart.",
    "main_heading": "SU Carburettor Needles Comparison Tool",
    "description_text": "One of the most confusing things about working on your Classic Mini often is the carburettor needle used on your car. Below you will find a multi-needle comparison chart which will allow you to compare needle profiles of multiple SU needles at the same time. Choose the needles you would like to compare and click Compare which will redraw the chart with new profiles. A huge thank you to the mintylamb site for posting this information publically.",
    "structured_data": {
      "name": "How to Compare SU Carburettor Needles",
      "description": "Compare different SU carburettor needles to find the right profile for your Classic Mini engine build.",
      "steps": {
        "select_needles": {
          "name": "Select Needles",
          "text": "Start typing the name of the needles you would like to compare in the dropdown menu."
        },
        "add_to_comparison": {
          "name": "Add to Comparison",
          "text": "Click the \"Add Needle\" button to add the selected needle to the comparison chart."
        },
        "view_comparison": {
          "name": "View Comparison",
          "text": "The chart will automatically update to show the profiles of all selected needles for comparison."
        }
      },
      "tool_name": "Interactive Needle Comparison Chart"
    },
    "ui": {
      "loading_fallback": "Loading needle comparison tool...",
      "loading_text": "Loading needle comparison tool...",
      "needle_charts_section": "Needle Charts",
      "find_needle_heading": "Find the needle for your carb",
      "information_provided_by": "Information provided by",
      "seven_mini_parts_link": "Seven Mini Parts",
      "support_section": "Support"
    }
  }
}
</i18n>

<style lang="scss">
  .b-tabs .tab-content {
    padding-left: 0px;
    padding-right: 0px;
  }
</style>
