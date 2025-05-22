<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '~/data/models/generic';
  const expanded = ref([]);
  const { data: tables, status } = await useFetch('/api/torque');
  const tableHeaders: any = ref([
    { title: 'Fastener', key: 'name', align: 'start' },
    { title: 'Torque (lb/ft)', key: 'lbft', align: 'start' },
    { title: 'Torque (Nm)', key: 'nm', align: 'start' },
    { title: 'Notes', key: 'data-table-expand', align: 'end' },
  ]);
  const panels = ref(['Engine']);

  useHead({
    title: 'Classic Mini Torque Specifications Chart | Classic Mini DIY',
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          'Complete torque specifications for Classic Mini fasteners. Reference chart for engine, suspension, drivetrain, and body fasteners with values in lb/ft and Nm.',
      },
      {
        key: 'keywords',
        name: 'keywords',
        content:
          'Classic Mini torque specs, Mini Cooper fasteners, torque specifications, engine torque values, suspension torque, Mini maintenance, classic car specifications',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://classicminidiy.com/technical/torque',
      },
      {
        rel: 'preconnect',
        href: 'https://classicminidiy.s3.amazonaws.com',
      },
    ],
  });

  useSeoMeta({
    ogTitle: 'Classic Mini Torque Specifications Chart | Classic Mini DIY',
    ogDescription:
      'Complete torque specifications for Classic Mini fasteners. Reference chart for engine, suspension, drivetrain, and body fasteners with values in lb/ft and Nm.',
    ogUrl: 'https://classicminidiy.com/technical/torque',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Classic Mini Torque Specifications Chart',
    twitterDescription: 'Complete torque specifications for Classic Mini fasteners with values in lb/ft and Nm.',
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png',
  });

  // Add structured data for the torque specifications reference
  const torqueSpecsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: 'Classic Mini Torque Specifications Chart',
    description:
      'Complete torque specifications for Classic Mini fasteners. Reference chart for engine, suspension, drivetrain, and body fasteners with values in lb/ft and Nm.',
    image: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png',
    author: {
      '@type': 'Person',
      name: 'Classic Mini DIY',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Classic Mini DIY',
      logo: {
        '@type': 'ImageObject',
        url: 'https://classicminidiy.s3.amazonaws.com/misc/logo.png',
      },
    },
    url: 'https://classicminidiy.com/technical/torque',
    mainEntity: {
      '@type': 'Dataset',
      name: 'Classic Mini Torque Specifications',
      description: 'Comprehensive dataset of torque specifications for Classic Mini fasteners',
      variableMeasured: ['Fastener Name', 'Torque in lb/ft', 'Torque in Nm', 'Additional Notes'],
    },
  };

  // Add JSON-LD structured data to head
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(torqueSpecsJsonLd),
      },
    ],
  });
</script>

<template>
  <hero :navigation="true" :title="'Torque Specs'" :textSize="'text-3xl'" :heroType="HERO_TYPES.TECH" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" page="Torque Specs"></breadcrumb>
      </v-col>
      <v-col cols="12">
        <template v-if="status === 'pending'">
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
        </template>
        <v-expansion-panels v-if="tables && status !== 'pending'" v-model="panels" variant="popout" multiple>
          <v-expansion-panel v-for="(table, name, index) in tables" :key="`${name}-${index}`" :value="table.title">
            <v-expansion-panel-title color="brand-green-3" expand-icon="fad fa-plus" collapse-icon="fad fa-plus">
              {{ table.title }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row class="pb-5">
                <v-spacer></v-spacer>
                <v-text-field
                  label="Search This Table"
                  v-model="table.search"
                  append-inner-icon="fad fa-search"
                  variant="underlined"
                  class="pr-4 pt-2"
                ></v-text-field>
              </v-row>
              <v-data-table
                v-model:expanded="expanded"
                :headers="tableHeaders"
                :items="table.items"
                show-expand
                expand-on-click
                :density="'compact'"
                :item-value="'name'"
                items-per-page="10"
                :search="table.search"
              >
                <template v-slot:item.data-table-expand="{ item }">
                  <v-icon hydrate-on-visible v-if="item.notes" icon="fad fa-plus" :size="'small'"></v-icon>
                </template>
                <template v-slot:expanded-row="{ columns, item }">
                  <tr>
                    <td class="has-background-light pt-4 pb-4" colspan="4">
                      <strong>Extra Notes:</strong>
                      <br />
                      {{ item.notes || '---' }}
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12" md="10" offset-md="1">
        <div class="divider">Support</div>
      </v-col>
      <v-col cols="12">
        <patreon-card size="large" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
  .card-header {
    background-color: whitesmoke;
  }
</style>
