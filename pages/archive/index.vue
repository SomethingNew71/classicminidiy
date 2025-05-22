<script setup lang="ts">
  import { ArchiveItems, BREADCRUMB_VERSIONS, HERO_TYPES } from '~/data/models/generic';
  import { ARCHIVE_TYPES, submitArchiveFile, TRACKING_EVENTS, trackStuff } from '~/data/models/helper-utils';
  const { path } = useRoute();

  // Enhanced SEO metadata
  useHead({
    title: 'Classic Mini Archives | Historical Documents & Resources | Classic Mini DIY',
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          'Access our comprehensive Classic Mini archives with historical documents, manuals, registries, and resources. Preserved digital collection for Mini enthusiasts and restorers.',
      },
      {
        key: 'keywords',
        name: 'keywords',
        content:
          'Classic Mini archives, Mini Cooper manuals, Mini registry, historical documents, Mini restoration, vintage Mini resources, classic car archives',
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
    ogTitle: 'Classic Mini Archives | Historical Documents & Resources',
    ogDescription:
      'Access our comprehensive Classic Mini archives with historical documents, manuals, registries, and resources. Preserved digital collection for Mini enthusiasts and restorers.',
    ogUrl: 'https://classicminidiy.com/archive',
    ogType: 'website',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/misc/archive-seo.jpg',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Classic Mini Archives | Historical Documents & Resources',
    twitterDescription:
      'Access our comprehensive Classic Mini archives with historical documents, manuals, registries, and resources.',
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/misc/archive-seo.jpg',
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
    :title="'Archives'"
    textSize="text-3xl"
    subtitle="Preserving Classic Mini Heritage"
    :heroType="HERO_TYPES.ARCHIVE"
  />
  <div class="container mx-auto px-4 pt-15">
    <div class="grid grid-cols-1 gap-4">
      <div class="col-span-1 text-center">
        <breadcrumb :version="BREADCRUMB_VERSIONS.ARCHIVE" root></breadcrumb>
        <h2 class="fancy-font-book-oblique">PRESERVING CLASSIC MINI HERITAGE</h2>
        <h3 class="fancy-font-bold text-2xl">The Classic Mini Archive</h3>
      </div>
      <div class="col-span-1 text-center">
        <p class="text-lg py-5">
          Welcome to the Classic Mini Archives. Here you will find a collection of manuals, collections, guides, and
          other resources to help you with your classic mini projects. I will be expanding this archive over time to
          help fill the gaps left by sites slowly going offline.
        </p>
        <p class="text-lg pb-5">
          Its taken many hours of backwards engineering and reworking these services to make sure they don't die out. If
          you see any issues, or any areas of improvement please let me know!
        </p>
        <button class="btn btn-primary mr-3 text-lg" target="_blank" @click="submitArchiveFile(ARCHIVE_TYPES.GENERIC)">
          <i class="fa-duotone fa-paper-plane mr-2"></i>
          Add to Archive
        </button>
        <a
          class="btn btn-secondary mr-3 text-lg"
          target="_blank"
          href="https://buy.stripe.com/3cs8yWe1P1ER3Oo5kl"
          @click="trackStuff(TRACKING_EVENTS.SERVER_COST, path)"
        >
          <i class="fa-duotone fa-hand-holding-circle-dollar mr-2"></i>
          Cover Server Costs
        </a>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-10">
      <div v-for="archive in ArchiveItems" class="col-span-1">
        <NuxtLink
          :to="archive.to"
          :class="[
            'card bg-base-100 shadow-xl text-center p-5 h-full',
            { 'opacity-50 cursor-not-allowed': archive.disabled },
          ]"
          :tabindex="archive.disabled ? -1 : undefined"
          @click="archive.disabled ? $event.preventDefault() : null"
        >
          <p v-if="archive.disabled" class="text-xs text-right">Coming Soon!</p>
          <span class="text-4xl block" v-html="archive.iconHtml"> </span>
          <div class="card-body p-2">
            <p class="text-lg">{{ archive.title }}</p>
          </div>
        </NuxtLink>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4 mt-6">
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">Support</div>
      </div>
      <div class="col-span-12">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>
