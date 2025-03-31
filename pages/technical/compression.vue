<script lang="js" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '~/data/models/generic';

  // Enhanced SEO metadata
  useHead({
    title: 'Compression Ratio Calculator for Classic Mini Engines | Classic Mini DIY',
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          'Calculate the compression ratio for your Classic Mini engine build with our interactive calculator. Plan your engine modifications with precision using this easy-to-use tool.',
      },
      {
        key: 'keywords',
        name: 'keywords',
        content:
          'compression ratio, Classic Mini engine, engine build, compression calculator, Mini Cooper engine, piston dish, head volume',
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
    ogTitle: 'Compression Ratio Calculator for Classic Mini Engines | Classic Mini DIY',
    ogDescription:
      'Calculate the compression ratio for your Classic Mini engine build with our interactive calculator. Plan your engine modifications with precision.',
    ogUrl: 'https://classicminidiy.com/technical/compression',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Compression Ratio Calculator for Classic Mini Engines',
    twitterDescription:
      'Calculate the compression ratio for your Classic Mini engine build with our interactive calculator.',
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png',
  });

  // Add structured data for the calculator tool
  const calculatorJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Classic Mini Compression Ratio Calculator',
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web Browser',
    description:
      'An interactive calculator to determine the compression ratio for Classic Mini engine builds based on various parameters like piston dish, head volume, bore, and stroke.',
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
    name: 'How to Calculate Compression Ratio for a Classic Mini Engine',
    description:
      'Learn how to calculate the compression ratio for your Classic Mini engine build using our interactive calculator.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Enter Piston Dish Value',
        text: 'Enter the piston dish value in cc.',
      },
      {
        '@type': 'HowToStep',
        name: 'Enter Head Volume',
        text: 'Enter the head volume in cc.',
      },
      {
        '@type': 'HowToStep',
        name: 'Enter Deck Height',
        text: 'Enter the deck height in inches.',
      },
      {
        '@type': 'HowToStep',
        name: 'Enter Bore and Stroke',
        text: 'Enter the bore and stroke measurements in mm.',
      },
      {
        '@type': 'HowToStep',
        name: 'Enter Gasket Thickness',
        text: 'Select the gasket thickness or enter a custom value.',
      },
      {
        '@type': 'HowToStep',
        name: 'View Results',
        text: 'The calculator will automatically display the compression ratio and engine capacity.',
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
  <v-container>
    <v-row>
      <v-col cols="12">
        <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" page="Compression Ratio Calculator"></breadcrumb>
        <v-row>
          <v-col cols="12" md="8">
            <h1 class="title">Compression Ratio Calculator</h1>
            <p class="pb-4">
              When building a performance Classic Mini engine one of the most important figures to determine is the
              compression ratio. Using the Classic Mini DIY Compression Ratio Calculator below, you can determine the
              ideal compression for your new engine build.
            </p>
          </v-col>
          <v-col cols="12" md="4">
            <NuxtLink :to="'/archive/engines'" :title="'Link to Engine Sizes'">
              <div class="card callout-card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-64x64">
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
                            alt="Engine size table image preview"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div class="media-content">
                      <h2 class="subtitle">What are standard engine sizes?</h2>
                      <p>Click here to learn about common engine sizes in the classic mini.</p>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <CalculatorsCompression />
      </v-col>
      <v-col cols="12" md="10" offset-md="1">
        <div class="divider">More</div>
      </v-col>
      <v-col cols="12">
        <patreon-card size="large" />
      </v-col>
    </v-row>
  </v-container>
</template>
