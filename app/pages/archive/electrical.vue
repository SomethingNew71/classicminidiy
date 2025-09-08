<script lang="ts" setup>
  import { HERO_TYPES } from '../../../data/models/generic';

  const { data: diagrams, status } = await useFetch('/api/diagrams');
  const activePanel = ref('Negative Ground');

  useHead({
    title: $t('pages.archive.subpages.electrical.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: $t('pages.archive.subpages.electrical.description'),
      },
      {
        key: 'keywords',
        name: 'keywords',
        content: $t('pages.archive.subpages.electrical.keywords'),
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://classicminidiy.com/archive/electrical',
      },
      {
        rel: 'preconnect',
        href: 'https://classicminidiy.s3.amazonaws.com',
      },
    ],
  });

  useSeoMeta({
    ogTitle: $t('pages.archive.subpages.electrical.seo.og_title'),
    ogDescription: $t('pages.archive.subpages.electrical.seo.og_description'),
    ogUrl: 'https://classicminidiy.com/archive/electrical',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/electrical.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('pages.archive.subpages.electrical.seo.twitter_title'),
    twitterDescription: $t('pages.archive.subpages.electrical.seo.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/electrical.png',
  });

  // Add structured data for the electrical diagrams reference
  const electricalDiagramsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: $t('pages.archive.subpages.electrical.structured_data.headline'),
    description: $t('pages.archive.subpages.electrical.structured_data.description'),
    image: 'https://classicminidiy.s3.amazonaws.com/misc/archive-seo.jpg',
    author: {
      '@type': 'Person',
      name: $t('pages.archive.subpages.electrical.structured_data.author_name'),
    },
    publisher: {
      '@type': 'Organization',
      name: $t('pages.archive.subpages.electrical.structured_data.publisher_name'),
      logo: {
        '@type': 'ImageObject',
        url: 'https://classicminidiy.s3.amazonaws.com/misc/logo.png',
      },
    },
    url: 'https://classicminidiy.com/archive/electrical',
    mainEntity: {
      '@type': 'Dataset',
      name: $t('pages.archive.subpages.electrical.structured_data.dataset_name'),
      description: $t('pages.archive.subpages.electrical.structured_data.dataset_description'),
    },
  };

  // Add JSON-LD structured data to head
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(electricalDiagramsJsonLd),
      },
    ],
  });
</script>

<template>
  <hero :navigation="true" :title="$t('pages.archive.subpages.electrical.hero_title')" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" :page="$t('pages.archive.subpages.electrical.breadcrumb_title')"></breadcrumb>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-2xl font-bold mb-4">{{ $t('pages.archive.subpages.electrical.main_heading') }}</h1>
            <p class="mb-6">
              {{ $t('pages.archive.subpages.electrical.description_text') }}
            </p>
          </div>
        </div>
      </div>

      <div class="col-span-12">
        <!-- Loading state -->
        <div v-if="status === 'pending'" class="space-y-4">
          <div class="skeleton h-12 w-full"></div>
          <div class="skeleton h-12 w-full"></div>
          <div class="skeleton h-12 w-full"></div>
        </div>

        <!-- Content when loaded -->
        <div v-if="diagrams && status !== 'pending'" class="space-y-6">
          <div
            v-for="(diagram, name, index) in diagrams"
            :key="`${name}-${index}`"
            class="collapse collapse-plus bg-base-200 border border-base-300 mb-2"
          >
            <!-- Accordion header -->
            <input
              type="radio"
              :name="'electrical-accordion'"
              :checked="diagram.title === activePanel"
              @change="activePanel = diagram.title"
            />
            <div class="collapse-title font-semibold text-xl bg-primary text-primary-content">
              {{ diagram.title }}
            </div>

            <!-- Accordion content -->
            <div class="collapse-content p-0">
              <ul class="menu bg-base-100 w-full">
                <li
                  v-for="(item, index) in diagram.items"
                  :key="`${index}-${item.name}`"
                  class="border-b border-base-200 last:border-b-0"
                >
                  <a :href="item.link" target="_blank" class="flex justify-between py-4">
                    <div>
                      <div class="text-lg">{{ item.name }}</div>
                      <div class="text-lg opacity-70 flex items-center mt-1">
                        <i class="fa-solid fa-calendar mr-2"></i>
                        <span v-if="item.from || item.to"
                          >{{ item.from || $t('pages.archive.subpages.electrical.date_range.unknown_placeholder')
                          }}{{ $t('pages.archive.subpages.electrical.date_range.separator')
                          }}{{
                            item.to || $t('pages.archive.subpages.electrical.date_range.unknown_placeholder')
                          }}</span
                        >
                        <span v-else>{{ $t('pages.archive.subpages.electrical.date_range.unknown') }}</span>
                      </div>
                    </div>
                    <button
                      class="btn btn-ghost btn-lg"
                      :aria-label="$t('pages.archive.subpages.electrical.download_button_aria')"
                    >
                      <i class="fa-solid fa-download"></i>
                    </button>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Support section -->
      <div class="col-span-12 mt-8 mb-10">
        <div class="divider">{{ $t('pages.archive.subpages.electrical.support_divider') }}</div>
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .divider {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.125rem;
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 1rem;

    &:before,
    &:after {
      flex-grow: 1;
      background-color: hsl(var(--b3));
      height: 1px;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      content: '';
    }
  }

  .skeleton {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    background-color: hsl(var(--b3));
    border-radius: 0.25rem;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>
