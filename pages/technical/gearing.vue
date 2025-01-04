<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS } from '~/data/models/generic';
  useHead({
    title: 'Tech - Gearing Calculator',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          "Planning your next gearbox build? Use our brand new gearbox gearing calculator to generate information for your Classic Mini's gearbox refurb or upgrade.",
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Tech - Gearing Calculator',
    ogDescription:
      "Planning your next gearbox build? Use our brand new gearbox gearing calculator to generate information for your Classic Mini's gearbox refurb or upgrade.",
    ogUrl: 'classicminidiy.com/technical/gearing',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-level-tool-100.png',
    ogType: 'website',
  });
</script>

<template>
  <hero :navigation="true" :title="'Gearbox Calculator'" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" page="Gearbox Calculator"></breadcrumb>
        <v-row>
          <v-col cols="12" md="8">
            <h1 class="title">Gearbox Calculator</h1>
            <p class="pb-4">
              When building or rebuilding a gearbox, updaing your gear ratios, or changing out your speedometer
              sometimes you need to update some things. Using the Classic Mini DIY Gear Calculator below, you can
              determine the correct gearing for your for your new engine build and find the right speedo gear to use as
              well.
            </p>
          </v-col>
          <v-col cols="12" md="4">
            <NuxtLink :to="'/technical/engines'" :title="'Link to Engine Sizes'">
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
        <GearboxCalculator />
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
