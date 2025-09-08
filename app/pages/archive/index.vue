<script setup lang="ts">
  import { ArchiveItems, BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';
  import { ARCHIVE_TYPES, submitArchiveFile, TRACKING_EVENTS, trackStuff } from '../../../data/models/helper-utils';
  const { path } = useRoute();

  // Enhanced SEO metadata
  useHead({
    title: $t('pages.archive.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: $t('pages.archive.description'),
      },
      {
        key: 'keywords',
        name: 'keywords',
        content: $t('pages.archive.keywords'),
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://classicminidiy.com/archive',
      },
      {
        rel: 'preconnect',
        href: 'https://classicminidiy.s3.amazonaws.com',
      },
    ],
  });

  useSeoMeta({
    ogTitle: $t('pages.archive.ogTitle'),
    ogDescription: $t('pages.archive.ogDescription'),
    ogUrl: 'https://classicminidiy.com/archive',
    ogType: 'website',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive.png',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('pages.archive.twitterTitle'),
    twitterDescription: $t('pages.archive.twitterDescription'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive.png',
  });

  // Add structured data for the archive collection
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Classic Mini Archives',
    description:
      'A comprehensive digital archive of Classic Mini documents, manuals, registries, and historical resources preserved for enthusiasts and restorers.',
    url: 'https://classicminidiy.com/archive',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: ArchiveItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://classicminidiy.com${item.to}`,
        name: item.title,
      })),
    },
  };

  // Add JSON-LD structured data to head
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(collectionJsonLd),
      },
    ],
  });
</script>

<template>
  <hero
    :navigation="true"
    :titleKey="'pages.archive.hero_title'"
    textSize="text-3xl"
    :subtitleKey="'pages.archive.hero_subtitle'"
    :heroType="HERO_TYPES.ARCHIVE"
  />
  <div class="container mx-auto px-4 pb-15 pt-6">
    <div class="grid grid-cols-1 gap-4">
      <div class="col-span-1 text-center">
        <breadcrumb :version="BREADCRUMB_VERSIONS.ARCHIVE" root></breadcrumb>
        <h2 class="fancy-font-book-oblique">{{ $t('pages.archive.breadcrumb_subtitle') }}</h2>
        <h3 class="fancy-font-bold text-2xl">{{ $t('pages.archive.main_heading') }}</h3>
      </div>
      <div class="col-span-1 text-center">
        <p class="text-lg py-5">
          {{ $t('pages.archive.description_text') }}
        </p>
        <p class="text-lg pb-5">
          {{ $t('pages.archive.maintenance_description') }}
        </p>
        <button class="btn btn-primary mr-3 text-lg" target="_blank" @click="submitArchiveFile(ARCHIVE_TYPES.GENERIC)">
          <i class="fa-duotone fa-paper-plane mr-2"></i>
          {{ $t('pages.archive.add_to_archive') }}
        </button>
        <a
          class="btn btn-secondary mr-3 text-lg"
          target="_blank"
          href="https://buy.stripe.com/3cs8yWe1P1ER3Oo5kl"
          @click="trackStuff(TRACKING_EVENTS.SERVER_COST, path)"
        >
          <i class="fa-duotone fa-hand-holding-circle-dollar mr-2"></i>
          {{ $t('pages.archive.cover_server_costs') }}
        </a>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-10">
      <div v-for="archive in ArchiveItems" class="col-span-1">
        <template v-if="archive.disabled">
          <div class="card bg-base-100 shadow-xl text-center p-5 h-full opacity-50 cursor-not-allowed">
            <p class="text-xs text-right">{{ $t('pages.archive.coming_soon') }}</p>
            <span class="text-4xl block" v-html="archive.iconHtml"> </span>
            <div class="card-body p-2">
              <p class="text-lg">{{ archive.title }}</p>
            </div>
          </div>
        </template>

        <NuxtLink v-else :to="archive.to" class="card bg-base-100 shadow-xl text-center p-5 h-full">
          <span class="text-4xl block" v-html="archive.iconHtml"> </span>
          <div class="card-body p-2">
            <p class="text-lg">{{ archive.title }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 mt-6">
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">{{ $t('pages.archive.support_section') }}</div>
      </div>
      <div class="col-span-12">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>
