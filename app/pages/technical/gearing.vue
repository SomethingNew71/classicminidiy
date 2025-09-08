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
    ],
  });
  useSeoMeta({
    ogTitle: $t('og_title'),
    ogDescription: $t('og_description'),
    ogUrl: 'https://classicminidiy.com/technical/gearing',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/gearing.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('twitter_title'),
    twitterDescription: $t('twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/gearing.png',
  });
</script>

<template>
  <hero :navigation="true" :title="$t('hero_title')" :heroType="HERO_TYPES.TECH" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb
          class="my-6"
          :version="BREADCRUMB_VERSIONS.TECH"
          :page="$t('breadcrumb_title')"
        ></breadcrumb>
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-3xl font-bold mb-4">{{ $t('main_heading') }}</h1>
            <p class="mb-4">
              {{ $t('description_text') }}
            </p>
          </div>
          <div class="col-span-12 md:col-span-4">
            <NuxtLink
              :to="'/archive/engines'"
              :title="$t('engine_sizes_card.link_title')"
              class="block"
            >
              <div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                <div class="card-body">
                  <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                      <figure class="w-16 h-16">
                        <picture>
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.webp"
                            type="image/webp"
                          />
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png"
                            type="image/png"
                          />
                          <nuxt-img
                            loading="lazy"
                            src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-dashboard-100.png"
                            class="w-full h-full object-contain"
                            :alt="$t('engine_sizes_card.alt_text')"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div>
                      <h2 class="text-xl font-semibold">
                        {{ $t('engine_sizes_card.heading') }}
                      </h2>
                      <p class="mt-1">{{ $t('engine_sizes_card.description') }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <ClientOnly fallback-tag="div" :fallback="$t('ui.loading_fallback')">
          <div class="min-h-96 flex items-center justify-center" v-if="!isCalculatorLoaded">
            <div class="flex flex-col items-center space-y-4">
              <span class="loading loading-spinner loading-lg text-primary"></span>
              <p class="text-base-content/70">{{ $t('ui.loading_text') }}</p>
            </div>
          </div>
          <LazyCalculatorsGearbox @vue:mounted="isCalculatorLoaded = true" />
        </ClientOnly>
      </div>
      <div class="col-span-12 md:col-span-4 md:col-start-5">
        <div class="divider">{{ $t('ui.more_section') }}</div>
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
    "title": "Tech - Gearing Calculator",
    "description": "Planning your next gearbox build? Use our brand new gearbox gearing calculator to generate information for your Classic Mini's gearbox refurb or upgrade.",
    "hero_title": "Gearbox Calculator",
    "breadcrumb_title": "Gearbox Calculator",
    "og_title": "Tech - Gearing Calculator",
    "og_description": "Planning your next gearbox build? Use our brand new gearbox gearing calculator to generate information for your Classic Mini's gearbox refurb or upgrade.",
    "twitter_title": "Tech - Gearing Calculator",
    "twitter_description": "Planning your next gearbox build? Use our brand new gearbox gearing calculator to generate information for your Classic Mini's gearbox refurb or upgrade.",
    "main_heading": "Gearbox Calculator",
    "description_text": "When building or rebuilding a gearbox, updaing your gear ratios, or changing out your speedometer sometimes you need to update some things. Using the Classic Mini DIY Gear Calculator below, you can determine the correct gearing for your for your new engine build and find the right speedo gear to use as well.",
    "engine_sizes_card": {
      "link_title": "Link to Engine Sizes",
      "heading": "What are standard engine sizes?",
      "description": "Click here to learn about common engine sizes in the classic mini.",
      "alt_text": "Engine size table image preview"
    },
    "ui": {
      "loading_fallback": "Loading gearbox calculator...",
      "loading_text": "Loading gearbox calculator...",
      "more_section": "More"
    }
  }
}
</i18n>
