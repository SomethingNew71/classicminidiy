<script lang="ts" setup>
  import { ToolboxItems, BREADCRUMB_VERSIONS, HERO_TYPES } from '~/data/models/generic';
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
  <hero :navigation="true" :title="'Technical Toolbox'" :heroType="HERO_TYPES.TECH" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" root></breadcrumb>
        <h2 class="fancy-font-book-oblique">KEEPING MINIS DRIVING</h2>
        <h3 class="fancy-font-bold is-size-3">Technical Information for the DIY Mechanic</h3>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-toolbar color="brand-green-2">
            <v-toolbar-title>Toolbox</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list lines="one">
            <v-list-item v-for="item in ToolboxItems" :key="item.title" :title="item.title" :to="item.to">
              <template v-slot:prepend>
                <v-avatar size="large">
                  <span class="is-size-3" v-html="item.iconHtml"> </span>
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <p class="is-size-5 pt-5 pb-5">
          One of the most important parts of Classic Mini DIY is the focus on getting out and working on your own car.
          So to make this easier for you, I have collected technical information from various sources and consolidated
          it right here on classicminidiy.com.
        </p>
        <v-col cols="12" md="10" offset-md="1">
          <div class="divider">Support</div>
        </v-col>
        <v-col cols="12">
          <patreon-card size="large" />
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>
