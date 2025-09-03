<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';
  // Track calculator loading state
  const isCalculatorLoaded = ref(false);
  const { t } = useI18n();

  useHead({
    title: t('pages.technical.subPages.needles.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: t('pages.technical.subPages.needles.description'),
      },
      {
        key: 'keywords',
        name: 'keywords',
        content: t('pages.technical.subPages.needles.keywords'),
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
    ogTitle: t('pages.technical.subPages.needles.og_title'),
    ogDescription: t('pages.technical.subPages.needles.og_description'),
    ogUrl: 'https://classicminidiy.com/technical/needles',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/needles.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: t('pages.technical.subPages.needles.twitter_title'),
    twitterDescription: t('pages.technical.subPages.needles.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/needles.png',
  });

  // Add structured data for the tool
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: t('pages.technical.subPages.needles.structured_data.name'),
    description: t('pages.technical.subPages.needles.structured_data.description'),
    step: [
      {
        '@type': 'HowToStep',
        name: t('pages.technical.subPages.needles.structured_data.steps.select_needles.name'),
        text: t('pages.technical.subPages.needles.structured_data.steps.select_needles.text'),
      },
      {
        '@type': 'HowToStep',
        name: t('pages.technical.subPages.needles.structured_data.steps.add_to_comparison.name'),
        text: t('pages.technical.subPages.needles.structured_data.steps.add_to_comparison.text'),
      },
      {
        '@type': 'HowToStep',
        name: t('pages.technical.subPages.needles.structured_data.steps.view_comparison.name'),
        text: t('pages.technical.subPages.needles.structured_data.steps.view_comparison.text'),
      },
    ],
    tool: [
      {
        '@type': 'HowToTool',
        name: t('pages.technical.subPages.needles.structured_data.tool_name'),
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
  <hero :navigation="true" :title="$t('pages.technical.subPages.needles.hero_title')" text-size="text-3xl" :heroType="HERO_TYPES.TECH" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 pt-6">
        <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" :page="$t('pages.technical.subPages.needles.breadcrumb_title')"></breadcrumb>
      </div>
      <div class="col-span-12">
        <h1 class="fancy-font-bold text-2xl">{{ $t('pages.technical.subPages.needles.main_heading') }}</h1>
        <p class="text-lg pt-5">
          {{ $t('pages.technical.subPages.needles.description_text') }}
        </p>
      </div>
      <div class="col-span-12 border-t border-base-300 mt-5"></div>
      <div class="col-span-12">
        <ClientOnly fallback-tag="div" :fallback="$t('pages.technical.subPages.needles.ui.loading_fallback')">
          <div class="min-h-96 flex items-center justify-center" v-if="!isCalculatorLoaded">
            <div class="flex flex-col items-center space-y-4">
              <span class="loading loading-spinner loading-lg text-primary"></span>
              <p class="text-base-content/70">{{ $t('pages.technical.subPages.needles.ui.loading_text') }}</p>
            </div>
          </div>
          <LazyCalculatorsNeedles @vue:mounted="isCalculatorLoaded = true" />
        </ClientOnly>
      </div>
      <div class="col-span-12">
        <div class="divider">{{ $t('pages.technical.subPages.needles.ui.needle_charts_section') }}</div>
      </div>
      <div class="col-span-12 text-center">
        <h2 class="fancy-font-book text-2xl">{{ $t('pages.technical.subPages.needles.ui.find_needle_heading') }}</h2>
        <h3 class="fancy-font-book text-lg">
          {{ $t('pages.technical.subPages.needles.ui.information_provided_by') }}
          <a
            href="https://www.7ent.com/pages/articles-tech-tips/chart-carburetor-needle.html"
            target="_blank"
            class="link link-primary"
            >{{ $t('pages.technical.subPages.needles.ui.seven_mini_parts_link') }}</a
          >
        </h3>
      </div>
      <div class="col-span-12">
        <NeedleTable />
      </div>
      <div class="col-span-12">
        <div class="divider">{{ $t('pages.technical.subPages.needles.ui.support_section') }}</div>
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
