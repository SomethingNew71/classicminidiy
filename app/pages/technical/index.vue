<script lang="ts" setup>
  import { ToolboxItems, BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';
  const { t } = useI18n();

  useHead({
    title: t('pages.technical.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: t('pages.technical.description'),
      },
      {
        key: 'keywords',
        name: 'keywords',
        content: t('pages.technical.keywords'),
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
    ogTitle: t('pages.technical.ogTitle'),
    ogDescription: t('pages.technical.ogDescription'),
    ogUrl: 'https://classicminidiy.com/technical',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: t('pages.technical.twitterTitle'),
    twitterDescription: t('pages.technical.twitterDescription'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical.png',
  });

  // Add structured data for the technical toolbox collection
  const toolboxJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t('pages.technical.structured_data.name'),
    description: t('pages.technical.structured_data.description'),
    url: 'https://classicminidiy.com/technical',
    itemListElement: ToolboxItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://classicminidiy.com${item.to}`,
      name: item.title,
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
    :titleKey="'pages.technical.hero_title'"
    textSize="text-3xl"
    :subtitleKey="'pages.technical.hero_subtitle'"
    :heroType="HERO_TYPES.TECH"
  />
  <div class="container mx-auto px-4 pb-15 pt-6">
    <div class="grid grid-cols-1 gap-4">
      <div class="col-span-1 text-center">
        <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" root></breadcrumb>
        <h2 class="fancy-font-book-oblique">{{ t('pages.technical.breadcrumb_subtitle') }}</h2>
        <h3 class="fancy-font-bold text-2xl">{{ t('pages.technical.main_heading') }}</h3>
      </div>
      <div class="col-span-1 text-center">
        <p class="text-lg py-5">
          {{ t('pages.technical.description_text') }}
        </p>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-10">
      <div v-for="tool in ToolboxItems" class="col-span-1">
        <NuxtLink :to="tool.to" class="card bg-base-100 shadow-xl text-center p-5 h-full">
          <span class="text-4xl block" v-html="tool.iconHtml"> </span>
          <div class="card-body p-2">
            <p class="text-lg">{{ tool.title }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 mt-6">
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">{{ t('pages.technical.support_section') }}</div>
      </div>
      <div class="col-span-12">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>
