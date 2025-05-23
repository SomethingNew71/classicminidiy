<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '~/data/models/generic';
  const { data, status } = await useFetch('/api/engines');
  const tableHeaders: any[] = [
    { title: 'Size', key: 'color' },
    { title: 'Original Block', key: 'group' },
    { title: 'Engine Size', key: 'engineSize' },
    { title: 'Bore Size', key: 'boreSize' },
    { title: 'Over Bore', key: 'overBore' },
    { title: 'Stroke', key: 'stroke' },
    { title: 'Estimated Power', key: 'power' },
    { title: 'Estimated Torque', key: 'torque' },
  ];

  useHead({
    title: 'Tech - Engine Sizes and Displacements',
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          "Determining your engine size can be quite difficult without a reference. Check out the CMDIY standard bore, engine size chart to figure out how big your current engine is, or how big you'd like your next build to be!",
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Tech - Engine Sizes and Displacements',
    ogDescription:
      "Determining your engine size can be quite difficult without a reference. Check out the CMDIY standard bore, engine size chart to figure out how big your current engine is, or how big you'd like your next build to be!",
    ogUrl: 'classicminidiy.com/archive/engines',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-lightning-bolt-100.png',
    ogType: 'website',
  });
</script>

<template>
  <hero :navigation="true" :title="'Engine Sizes'" :heroType="HERO_TYPES.ARCHIVE" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <breadcrumb :version="BREADCRUMB_VERSIONS.ARCHIVE" page="Engine Sizes"></breadcrumb>

        <v-row>
          <v-col cols="12" md="8">
            <h1 class="title">Engine Displacement and Sizes</h1>
            <p>
              Determining your next engine size can be quite difficult without a reference. Check out the CMDIY standard
              bore, engine size chart to figure out how big your current engine is, or how big you'd like your next
              build to be!
            </p>
          </v-col>
          <v-col cols="12" md="4">
            <NuxtLink :to="'/technical/compression'" :title="'Link to Compression Calculator'">
              <div class="card callout-card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-64x64">
                        <picture>
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.webp"
                            type="image/webp"
                          />
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png"
                            type="image/png"
                          />
                          <nuxt-img
                            src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png"
                            alt="Image of compression calculator"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div class="media-content">
                      <h2 class="subtitle">Trying to calculate your compression ratio?</h2>
                      <p>Click here to try out our compression ratio calculator.</p>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-col cols="12">
          <i class="fas fa-circle pl-1 has-text-success"></i> Standard
          <i class="fas fa-circle pl-1 has-text-primary"></i> Standard Overbore
          <i class="fas fa-circle pl-1 has-text-danger"></i> Different Stroke
        </v-col>
        <v-col cols="12">
          <v-card>
            <v-toolbar>
              <v-icon hydrate-on-visible class="ml-4" icon="fad fa-engine"></v-icon>
              <v-toolbar-title>Engine Variations</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-data-table
                :loading="status === 'pending'"
                :items="data?.engines || []"
                density="compact"
                :headers="tableHeaders"
                fixed-header
                items-per-page="100"
              >
                <template v-slot:item.color="{ item }">
                  <p>
                    <i class="fas fa-circle pt-1" :class="item.color"></i>
                  </p>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
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
  .ref-icons {
    font-size: 0.5rem;
    vertical-align: middle;
    padding-bottom: 2px;
    &.mobile-v {
      font-size: 0.75rem;
    }
  }
</style>
