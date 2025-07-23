<script lang="ts" setup>
  import { ToolboxItems, BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';
  useHead({
    title: 'Classic Mini Technical Toolbox | DIY Calculators & Specifications',
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          'Classic Mini technical tools and specifications for DIY mechanics. Access calculators, torque specs, needle charts, and more to maintain and upgrade your Mini.',
      },
      {
        key: 'keywords',
        name: 'keywords',
        content:
          'Classic Mini technical tools, Mini Cooper specifications, SU needle chart, compression calculator, torque specs, DIY Mini maintenance, technical reference',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://classicminidiy.com/technical',
      },
      {
        rel: 'preconnect',
        href: 'https://classicminidiy.s3.amazonaws.com',
      },
    ],
  });

  useSeoMeta({
    ogTitle: 'Classic Mini Technical Toolbox | DIY Calculators & Specifications',
    ogDescription:
      'Classic Mini technical tools and specifications for DIY mechanics. Access calculators, torque specs, needle charts, and more to maintain and upgrade your Mini.',
    ogUrl: 'https://classicminidiy.com/technical',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/misc/technical-seo.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Classic Mini Technical Toolbox',
    twitterDescription: 'DIY technical tools and specifications for Classic Mini maintenance and upgrades.',
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/misc/technical-seo.jpg',
  });

  // Add structured data for the technical toolbox collection
  const toolboxJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Classic Mini Technical Toolbox',
    description:
      'Collection of technical tools, calculators, and specifications for Classic Mini maintenance and upgrades.',
    url: 'https://classicminidiy.com/technical',
    itemListElement: ToolboxItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://classicminidiy.com${item.to}`,
      name: item.title,
    })),
  };

  // Add JSON-LD structured data to head
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(toolboxJsonLd),
      },
    ],
  });
</script>

<template>
  <hero
    :navigation="true"
    :title="'Technical Toolbox'"
    textSize="text-3xl"
    subtitle="Keeping Minis Driving"
    :heroType="HERO_TYPES.TECH"
  />
  <div class="container mx-auto px-4 pb-15 pt-6">
    <div class="grid grid-cols-1 gap-4">
      <div class="col-span-1 text-center">
        <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" root></breadcrumb>
        <h2 class="fancy-font-book-oblique">KEEPING MINIS DRIVING</h2>
        <h3 class="fancy-font-bold text-2xl">The Technical Toolbox</h3>
      </div>
      <div class="col-span-1 text-center">
        <p class="text-lg py-5">
          One of the most important parts of Classic Mini DIY is the focus on getting out and working on your own car.
          So to make this easier for you, I have collected technical information from various sources and consolidated
          it right here on classicminidiy.com. These tools and calculators will help you maintain, upgrade, and
          troubleshoot your Classic Mini with confidence. From compression ratios to needle charts, everything you need
          is at your fingertips.
        </p>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-10">
      <div v-for="tool in ToolboxItems" class="col-span-1">
        <NuxtLink :to="tool.to" class="card bg-base-100 shadow-xl text-center p-5 h-full">
          <span class="text-4xl block" v-html="tool.iconHtml"> </span>
          <div class="card-body p-2">
            <p class="text-lg">{{ tool.title }}</p>
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
