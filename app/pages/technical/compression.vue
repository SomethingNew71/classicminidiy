<script lang="js" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';

  // Enhanced SEO metadata
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
        href: 'https://classicminidiy.com/technical/compression',
      },
      {
        rel: 'preconnect',
        href: 'https://classicminidiy.s3.amazonaws.com',
      },
    ],
  });

  useSeoMeta({
    ogTitle: $t('og_title'),
    ogDescription: $t('og_description'),
    ogUrl: 'https://classicminidiy.com/technical/compression',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/compression.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('twitter_title'),
    twitterDescription: $t('twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/compression.png',
  });

  // Add structured data for the calculator tool
  const calculatorJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: $t('structured_data.calculator_name'),
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web Browser',
    description: $t('structured_data.calculator_description'),
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
    name: $t('structured_data.how_to_name'),
    description: $t('structured_data.how_to_description'),
    step: [
      {
        '@type': 'HowToStep',
        name: $t('structured_data.steps.piston_dish.name'),
        text: $t('structured_data.steps.piston_dish.text'),
      },
      {
        '@type': 'HowToStep',
        name: $t('structured_data.steps.head_volume.name'),
        text: $t('structured_data.steps.head_volume.text'),
      },
      {
        '@type': 'HowToStep',
        name: $t('structured_data.steps.deck_height.name'),
        text: $t('structured_data.steps.deck_height.text'),
      },
      {
        '@type': 'HowToStep',
        name: $t('structured_data.steps.bore_stroke.name'),
        text: $t('structured_data.steps.bore_stroke.text'),
      },
      {
        '@type': 'HowToStep',
        name: $t('structured_data.steps.gasket_thickness.name'),
        text: $t('structured_data.steps.gasket_thickness.text'),
      },
      {
        '@type': 'HowToStep',
        name: $t('structured_data.steps.view_results.name'),
        text: $t('structured_data.steps.view_results.text'),
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
          :page="$t('breadcrumb_title')"
        ></breadcrumb>
        <div class="grid grid-cols-11 md:grid-cols-12 gap-6">
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
                            :alt="$t('engine_sizes_card.alt_text')"
                            class="w-full h-full object-contain"
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
        <CalculatorsCompression />
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">{{ $t('ui.more_section') }}</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Compression Ratio Calculator for Classic Mini Engines | Classic Mini DIY",
    "description": "Calculate the compression ratio for your Classic Mini engine build with our interactive calculator. Plan your engine modifications with precision using this easy-to-use tool.",
    "keywords": "compression ratio, Classic Mini engine, engine build, compression calculator, Mini Cooper engine, piston dish, head volume",
    "hero_title": "Compression Ratio Calculator",
    "breadcrumb_title": "Compression Ratio Calculator",
    "og_title": "Compression Ratio Calculator for Classic Mini Engines | Classic Mini DIY",
    "og_description": "Calculate the compression ratio for your Classic Mini engine build with our interactive calculator. Plan your engine modifications with precision.",
    "twitter_title": "Compression Ratio Calculator for Classic Mini Engines",
    "twitter_description": "Calculate the compression ratio for your Classic Mini engine build with our interactive calculator.",
    "main_heading": "Compression Ratio Calculator",
    "description_text": "When building a performance Classic Mini engine one of the most important figures to determine is the compression ratio. Using the Classic Mini DIY Compression Ratio Calculator below, you can determine the ideal compression for your new engine build.",
    "engine_sizes_card": {
      "link_title": "Link to Engine Sizes",
      "heading": "What are standard engine sizes?",
      "description": "Click here to learn about common engine sizes in the classic mini.",
      "alt_text": "Engine size table image preview"
    },
    "structured_data": {
      "calculator_name": "Classic Mini Compression Ratio Calculator",
      "calculator_description": "An interactive calculator to determine the compression ratio for Classic Mini engine builds based on various parameters like piston dish, head volume, bore, and stroke.",
      "how_to_name": "How to Calculate Compression Ratio for a Classic Mini Engine",
      "how_to_description": "Learn how to calculate the compression ratio for your Classic Mini engine build using our interactive calculator.",
      "steps": {
        "piston_dish": {
          "name": "Enter Piston Dish Value",
          "text": "Enter the piston dish value in cc."
        },
        "head_volume": {
          "name": "Enter Head Volume",
          "text": "Enter the head volume in cc."
        },
        "deck_height": {
          "name": "Enter Deck Height",
          "text": "Enter the deck height in inches."
        },
        "bore_stroke": {
          "name": "Enter Bore and Stroke",
          "text": "Enter the bore and stroke measurements in mm."
        },
        "gasket_thickness": {
          "name": "Enter Gasket Thickness",
          "text": "Select the gasket thickness or enter a custom value."
        },
        "view_results": {
          "name": "View Results",
          "text": "The calculator will automatically display the compression ratio and engine capacity."
        }
      }
    },
    "ui": {
      "more_section": "More"
    }
  }
}
</i18n>
