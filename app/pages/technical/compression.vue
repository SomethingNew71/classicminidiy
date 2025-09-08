<script lang="js" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';

  // Enhanced SEO metadata
  useHead({
    title: $t('pages.technical.subPages.compression.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: $t('pages.technical.subPages.compression.description'),
      },
      {
        key: 'keywords',
        name: 'keywords',
        content: $t('pages.technical.subPages.compression.keywords'),
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://classicminidiy.com/technical/compression',
      },
      {
        rel: 'preconnect',
        href: 'https://classicminidiy.s3.amazonaws.com',
      },
    ],
  });

  useSeoMeta({
    ogTitle: $t('pages.technical.subPages.compression.og_title'),
    ogDescription: $t('pages.technical.subPages.compression.og_description'),
    ogUrl: 'https://classicminidiy.com/technical/compression',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/compression.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('pages.technical.subPages.compression.twitter_title'),
    twitterDescription: $t('pages.technical.subPages.compression.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/compression.png',
  });

  // Add structured data for the calculator tool
  const calculatorJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: $t('pages.technical.subPages.compression.structured_data.calculator_name'),
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web Browser',
    description: $t('pages.technical.subPages.compression.structured_data.calculator_description'),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  // Add HowTo structured data
  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: $t('pages.technical.subPages.compression.structured_data.how_to_name'),
    description: $t('pages.technical.subPages.compression.structured_data.how_to_description'),
    step: [
      {
        '@type': 'HowToStep',
        name: $t('pages.technical.subPages.compression.structured_data.steps.piston_dish.name'),
        text: $t('pages.technical.subPages.compression.structured_data.steps.piston_dish.text'),
      },
      {
        '@type': 'HowToStep',
        name: $t('pages.technical.subPages.compression.structured_data.steps.head_volume.name'),
        text: $t('pages.technical.subPages.compression.structured_data.steps.head_volume.text'),
      },
      {
        '@type': 'HowToStep',
        name: $t('pages.technical.subPages.compression.structured_data.steps.deck_height.name'),
        text: $t('pages.technical.subPages.compression.structured_data.steps.deck_height.text'),
      },
      {
        '@type': 'HowToStep',
        name: $t('pages.technical.subPages.compression.structured_data.steps.bore_stroke.name'),
        text: $t('pages.technical.subPages.compression.structured_data.steps.bore_stroke.text'),
      },
      {
        '@type': 'HowToStep',
        name: $t('pages.technical.subPages.compression.structured_data.steps.gasket_thickness.name'),
        text: $t('pages.technical.subPages.compression.structured_data.steps.gasket_thickness.text'),
      },
      {
        '@type': 'HowToStep',
        name: $t('pages.technical.subPages.compression.structured_data.steps.view_results.name'),
        text: $t('pages.technical.subPages.compression.structured_data.steps.view_results.text'),
      },
    ],
  };

  // Add JSON-LD structured data to head
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(calculatorJsonLd),
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(howToJsonLd),
      },
    ],
  });
</script>

<template>
  <hero :navigation="true" :heroType="HERO_TYPES.TECH" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb
          class="my-6"
          :version="BREADCRUMB_VERSIONS.TECH"
          :page="$t('pages.technical.subPages.compression.breadcrumb_title')"
        ></breadcrumb>
        <div class="grid grid-cols-11 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-3xl font-bold mb-4">{{ $t('pages.technical.subPages.compression.main_heading') }}</h1>
            <p class="mb-4">
              {{ $t('pages.technical.subPages.compression.description_text') }}
            </p>
          </div>
          <div class="col-span-12 md:col-span-4">
            <NuxtLink
              :to="'/archive/engines'"
              :title="$t('pages.technical.subPages.compression.engine_sizes_card.link_title')"
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
                            :alt="$t('pages.technical.subPages.compression.engine_sizes_card.alt_text')"
                            class="w-full h-full object-contain"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div>
                      <h2 class="text-xl font-semibold">
                        {{ $t('pages.technical.subPages.compression.engine_sizes_card.heading') }}
                      </h2>
                      <p class="mt-1">{{ $t('pages.technical.subPages.compression.engine_sizes_card.description') }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <CalculatorsCompression />
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">{{ $t('pages.technical.subPages.compression.ui.more_section') }}</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>
