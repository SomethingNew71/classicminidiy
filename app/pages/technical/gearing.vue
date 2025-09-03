<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';
  // Track calculator loading state
  const isCalculatorLoaded = ref(false);
  const { t } = useI18n();

  useHead({
    title: t('pages.technical.subPages.gearing.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: t('pages.technical.subPages.gearing.description'),
      },
    ],
  });
  useSeoMeta({
    ogTitle: t('pages.technical.subPages.gearing.og_title'),
    ogDescription: t('pages.technical.subPages.gearing.og_description'),
    ogUrl: 'https://classicminidiy.com/technical/gearing',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/gearing.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: t('pages.technical.subPages.gearing.twitter_title'),
    twitterDescription: t('pages.technical.subPages.gearing.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/gearing.png',
  });
</script>

<template>
  <hero :navigation="true" :title="$t('pages.technical.subPages.gearing.hero_title')" :heroType="HERO_TYPES.TECH" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb
          class="my-6"
          :version="BREADCRUMB_VERSIONS.TECH"
          :page="$t('pages.technical.subPages.gearing.breadcrumb_title')"
        ></breadcrumb>
        <div class="grid grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-3xl font-bold mb-4">{{ $t('pages.technical.subPages.gearing.main_heading') }}</h1>
            <p class="mb-4">
              {{ $t('pages.technical.subPages.gearing.description_text') }}
            </p>
          </div>
          <div class="col-span-12 md:col-span-4">
            <NuxtLink
              :to="'/archive/engines'"
              :title="$t('pages.technical.subPages.gearing.engine_sizes_card.link_title')"
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
                            :alt="$t('pages.technical.subPages.gearing.engine_sizes_card.alt_text')"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div>
                      <h2 class="text-xl font-semibold">
                        {{ $t('pages.technical.subPages.gearing.engine_sizes_card.heading') }}
                      </h2>
                      <p class="mt-1">{{ $t('pages.technical.subPages.gearing.engine_sizes_card.description') }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <ClientOnly fallback-tag="div" :fallback="$t('pages.technical.subPages.gearing.ui.loading_fallback')">
          <div class="min-h-96 flex items-center justify-center" v-if="!isCalculatorLoaded">
            <div class="flex flex-col items-center space-y-4">
              <span class="loading loading-spinner loading-lg text-primary"></span>
              <p class="text-base-content/70">{{ $t('pages.technical.subPages.gearing.ui.loading_text') }}</p>
            </div>
          </div>
          <LazyCalculatorsGearbox @vue:mounted="isCalculatorLoaded = true" />
        </ClientOnly>
      </div>
      <div class="col-span-12 md:col-span-4 md:col-start-5">
        <div class="divider">{{ $t('pages.technical.subPages.gearing.ui.more_section') }}</div>
      </div>
      <div class="col-span-12">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>
