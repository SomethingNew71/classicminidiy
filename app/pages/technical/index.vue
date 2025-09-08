<script lang="ts" setup>
  import { ToolboxItems, BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';

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
        href: 'https://classicminidiy.com/technical',
      },
      {
        rel: 'preconnect',
        href: 'https://classicminidiy.s3.amazonaws.com',
      },
    ],
  });

  useSeoMeta({
    ogTitle: $t('ogTitle'),
    ogDescription: $t('ogDescription'),
    ogUrl: 'https://classicminidiy.com/technical',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('twitterTitle'),
    twitterDescription: $t('twitterDescription'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical.png',
  });

  // Add structured data for the technical toolbox collection
  const toolboxJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: $t('structured_data.name'),
    description: $t('structured_data.description'),
    url: 'https://classicminidiy.com/technical',
    itemListElement: ToolboxItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://classicminidiy.com${item.to}`,
      name: $t(item.titleKey),
    })),
  };

  // Add JSON-LD structured data to head
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(toolboxJsonLd),
      },
    ],
  });
</script>

<template>
  <hero
    :navigation="true"
    :titleKey="$t('hero_title')"
    textSize="text-3xl"
    :subtitleKey="$t('hero_subtitle')"
    :heroType="HERO_TYPES.TECH"
  />
  <div class="container mx-auto px-4 pb-15 pt-6">
    <div class="grid grid-cols-1 gap-4">
      <div class="col-span-1 text-center">
        <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" root></breadcrumb>
        <h2 class="fancy-font-book-oblique">{{ $t('breadcrumb_subtitle') }}</h2>
        <h3 class="fancy-font-bold text-2xl">{{ $t('main_heading') }}</h3>
      </div>
      <div class="col-span-1 text-center">
        <p class="text-lg py-5">
          {{ $t('description_text') }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-10">
      <div v-for="tool in ToolboxItems" class="col-span-1">
        <NuxtLink :to="tool.to" class="card bg-base-100 shadow-xl text-center p-5 h-full">
          <span class="text-4xl block" v-html="tool.iconHtml"> </span>
          <div class="card-body p-2">
            <p class="text-lg">{{ $t(tool.titleKey) }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 mt-6">
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">{{ $t('support_section') }}</div>
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
    "title": "Classic Mini Technical Toolbox | DIY Calculators & Specifications",
    "description": "Classic Mini technical tools and specifications for DIY mechanics. Access calculators, torque specs, needle charts, and more to maintain and upgrade your Mini.",
    "keywords": "Classic Mini technical tools, Mini Cooper specifications, SU needle chart, compression calculator, torque specs, DIY Mini maintenance, technical reference",
    "hero_title": "Classic Mini Technical Toolbox",
    "hero_subtitle": "Keeping Minis Driving",
    "ogTitle": "Classic Mini Technical Toolbox | DIY Calculators & Specifications",
    "ogDescription": "Classic Mini technical tools and specifications for DIY mechanics. Access calculators, torque specs, needle charts, and more to maintain and upgrade your Mini.",
    "twitterTitle": "Classic Mini Technical Toolbox",
    "twitterDescription": "DIY technical tools and specifications for Classic Mini maintenance and upgrades.",
    "structured_data": {
      "name": "Classic Mini Technical Toolbox",
      "description": "Collection of technical tools, calculators, and specifications for Classic Mini maintenance and upgrades."
    },
    "page_subtitle": "KEEPING MINIS DRIVING",
    "page_title": "The Technical Toolbox",
    "welcome_text": "One of the most important parts of Classic Mini DIY is the focus on getting out and working on your own car. So to make this easier for you, I have collected technical information from various sources and consolidated it right here on classicminidiy.com. These tools and calculators will help you maintain, upgrade, and troubleshoot your Classic Mini with confidence. From compression ratios to needle charts, everything you need is at your fingertips.",
    "support_section": "Support",
    "breadcrumb_subtitle": "KEEPING MINIS DRIVING",
    "main_heading": "The Technical Toolbox",
    "description_text": "One of the most important parts of Classic Mini DIY is the focus on getting out and working on your own car. So to make this easier for you, I have collected technical information from various sources and consolidated it right here on classicminidiy.com. These tools and calculators will help you maintain, upgrade, and troubleshoot your Classic Mini with confidence. From compression ratios to needle charts, everything you need is at your fingertips."
  }
}
</i18n>
