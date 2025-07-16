<script lang="js" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';

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
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" :version="BREADCRUMB_VERSIONS.TECH" page="Compression Ratio Calculator"></breadcrumb>
        <div class="grid grid-cols-11 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-3xl font-bold mb-4">Compression Ratio Calculator</h1>
            <p class="mb-4">
              When building a performance Classic Mini engine one of the most important figures to determine is the
              compression ratio. Using the Classic Mini DIY Compression Ratio Calculator below, you can determine the
              ideal compression for your new engine build.
            </p>
          </div>
          <div class="col-span-12 md:col-span-4">
            <NuxtLink :to="'/archive/engines'" :title="'Link to Engine Sizes'" class="block">
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
                            alt="Engine size table image preview"
                            class="w-full h-full object-contain"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div>
                      <h2 class="text-xl font-semibold">What are standard engine sizes?</h2>
                      <p class="mt-1">Click here to learn about common engine sizes in the classic mini.</p>
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
        <div class="divider">More</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>
