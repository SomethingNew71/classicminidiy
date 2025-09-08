<script lang="ts" setup>
  import { HERO_TYPES } from '../../../data/models/generic';

  const { data, status } = await useFetch('/api/engines');
  const tableHeaders: any[] = [
    { title: $t('table_headers.size'), key: 'color' },
    { title: $t('table_headers.original_block'), key: 'group' },
    { title: $t('table_headers.engine_size'), key: 'engineSize' },
    { title: $t('table_headers.bore_size'), key: 'boreSize' },
    { title: $t('table_headers.over_bore'), key: 'overBore' },
    { title: $t('table_headers.stroke'), key: 'stroke' },
    { title: $t('table_headers.estimated_power'), key: 'power' },
    { title: $t('table_headers.estimated_torque'), key: 'torque' },
  ];

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
  });
  useSeoMeta({
    ogTitle: $t('seo.og_title'),
    ogDescription: $t('seo.og_description'),
    ogUrl: 'https://classicminidiy.com/archive/engines',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/engines.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('seo.twitter_title'),
    twitterDescription: $t('seo.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/engines.png',
  });

  // Add structured data for the engine codes reference
  const engineCodesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: $t('structured_data.headline'),
    description: $t('structured_data.description'),
    image: 'https://classicminidiy.s3.amazonaws.com/misc/archive-seo.jpg',
    author: {
      '@type': 'Person',
      name: $t('structured_data.author_name'),
    },
    publisher: {
      '@type': 'Organization',
      name: $t('structured_data.publisher_name'),
      logo: {
        '@type': 'ImageObject',
        url: 'https://classicminidiy.s3.amazonaws.com/misc/logo.png',
      },
    },
    url: 'https://classicminidiy.com/archive/engines',
    mainEntity: {
      '@type': 'Dataset',
      name: $t('structured_data.dataset_name'),
      description: $t('structured_data.dataset_description'),
    },
  };

  // Add JSON-LD structured data to head
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(engineCodesJsonLd),
      },
    ],
  });
</script>

<template>
  <hero :navigation="true" :title="$t('hero_title')" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" :page="$t('breadcrumb_title')"></breadcrumb>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-2xl font-bold mb-4">{{ $t('main_heading') }}</h1>
            <p class="mb-6">
              {{ $t('description_text') }}
            </p>
          </div>
          <div class="col-span-12 md:col-span-4">
            <NuxtLink
              :to="'/technical/compression'"
              :title="$t('compression_card.link_title')"
            >
              <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div class="card-body p-4">
                  <div class="flex items-start">
                    <div class="mr-4">
                      <figure class="w-16 h-16">
                        <picture>
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.webp"
                            type="image/webp"
                          />
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png"
                            type="image/png"
                          />
                          <nuxt-img
                            src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png"
                            :alt="$t('compression_card.alt_text')"
                            class="w-full h-full object-contain"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div>
                      <h2 class="text-lg font-semibold">
                        {{ $t('compression_card.title') }}
                      </h2>
                      <p>{{ $t('compression_card.description') }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="mb-5">
          <i class="fas fa-circle text-primary mr-2"></i> {{ $t('legend.standard') }}
          <i class="fas fa-circle text-info mx-2"></i>
          {{ $t('legend.standard_overbore') }}
          <i class="fas fa-circle text-error mx-2"></i>
          {{ $t('legend.different_stroke') }}
        </div>
        <div class="card bg-base-100 shadow-xl">
          <div class="card-title p-4 bg-base-200 flex items-center">
            <i class="fad fa-engine mr-2"></i>
            <span>{{ $t('table_title') }}</span>
          </div>
          <div class="card-body p-4">
            <div class="overflow-x-auto" v-if="data?.engines">
              <table class="table table-zebra w-full table-compact" :class="{ 'opacity-60': status === 'pending' }">
                <thead>
                  <tr>
                    <th v-for="header in tableHeaders" :key="header.key">{{ header.title }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in data.engines" :key="index" class="hover">
                    <td>
                      <i class="fas fa-circle" :class="item.color"></i>
                    </td>
                    <td>{{ item.group }}</td>
                    <td>{{ item.engineSize }}</td>
                    <td>{{ item.boreSize }}</td>
                    <td>{{ item.overBore }}</td>
                    <td>{{ item.stroke }}</td>
                    <td>{{ item.power }}</td>
                    <td>{{ item.torque }}</td>
                  </tr>
                </tbody>
              </table>
              <div v-if="status === 'pending'" class="flex justify-center items-center py-4">
                <span class="loading loading-spinner loading-md"></span>
                <span class="ml-2">{{ $t('loading_text') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">{{ $t('support_divider') }}</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2 pb-10">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .ref-icons {
    font-size: 0.5rem;
    vertical-align: middle;
    padding-bottom: 2px;
    &.mobile-v {
      font-size: 0.75rem;
    }
  }

  /* Additional DaisyUI specific styles */
  .table-compact {
    font-size: 0.875rem;
  }
</style>

<i18n lang="json">
{
  "en": {
    "title": "Archive - Engines | Classic Mini DIY",
    "description": "A comprehensive database of Classic Mini engine specifications and data.",
    "keywords": "Classic Mini engines, Mini Cooper engine specs, engine data, classic car engines, Mini engine specifications",
    "hero_title": "Engines",
    "breadcrumb_title": "Engines",
    "main_heading": "Engine Specifications",
    "description_text": "Explore our comprehensive database of Classic Mini engine specifications. Find detailed information about bore sizes, stroke lengths, power outputs, and more for various Classic Mini engines.",
    "table_headers": {
      "size": "Size",
      "original_block": "Original Block",
      "engine_size": "Engine Size",
      "bore_size": "Bore Size",
      "over_bore": "Over Bore",
      "stroke": "Stroke",
      "estimated_power": "Est. Power",
      "estimated_torque": "Est. Torque"
    },
    "compression_card": {
      "link_title": "Calculate compression ratio for your Classic Mini engine",
      "alt_text": "Calculator icon",
      "title": "Compression Calculator",
      "description": "Calculate the compression ratio for your Classic Mini engine."
    },
    "legend": {
      "standard": "Standard bore and stroke",
      "standard_overbore": "Standard stroke, overbore",
      "different_stroke": "Different stroke"
    },
    "table_title": "Engine Specifications",
    "loading_text": "Loading engine data...",
    "support_divider": "Support",
    "seo": {
      "og_title": "Archive - Engines | Classic Mini DIY",
      "og_description": "A comprehensive database of Classic Mini engine specifications and data.",
      "twitter_title": "Classic Mini Engine Specifications",
      "twitter_description": "A comprehensive database of Classic Mini engine specifications and data."
    },
    "structured_data": {
      "headline": "Classic Mini Engine Specifications",
      "description": "A comprehensive database of Classic Mini engine specifications and data.",
      "author_name": "Classic Mini DIY",
      "publisher_name": "Classic Mini DIY",
      "dataset_name": "Classic Mini Engine Specifications",
      "dataset_description": "Comprehensive database of Classic Mini engine specifications and technical data"
    }
  }
}
</i18n>
