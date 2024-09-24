<script lang="ts" setup>
  import { SpeedInsights } from '@vercel/speed-insights/nuxt';
  import { BREADCRUMB_VERSIONS } from '~/data/models/generic';
  useHead({
    title: 'Tech - SU Needles Chart',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Finding the right needle for your Classic Mini Cooper can be tough. Use this online comparison chart to find the right profile for your engine build.',
      },
      {
        property: 'og:title',
        content: 'Tech - SU Needles Chart',
      },
      {
        property: 'og:image',
        content: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.png',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Tech - SU Needles Chart',
    ogDescription:
      "Finding the right needle for your Classic Mini Cooper's carburettor can be tough. Use this online comparison chart to find the right profile for your engine build.",
    ogUrl: 'classicminidiy.com/technical/needles',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-increase-100.png',
    ogType: 'website',
  });
</script>

<template>
  <hero :navigation="true" :title="'Needle Configurator'" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" page="Needle Comparison"></breadcrumb>
      </v-col>
      <v-col cols="12">
        <h4 class="fancy-font-bold is-size-3">SU Carburettor Needles</h4>
        <p class="is-size-5 pt-5">
          One of the most confusing things about working on your Classic Mini often is the carburettor needle used on
          your car. Below you will find a multi-needle comparison chart which will allow you to compare needle profiles
          of multiple SU needles at the same time. Choose the needles you would like to compare and click Compare which
          will redraw the chart with new profiles. A huge thank you to the mintylamb site for posting this information
          publically.
        </p>
      </v-col>
      <v-col cols="12" class="hr mt-5"></v-col>
      <v-col cols="12">
        <NeedleConfigurator />
      </v-col>
      <v-col cols="12" md="10" offset-md="1">
        <div class="divider">Needle Charts</div>
      </v-col>
      <v-col cols="12" class="has-text-centered">
        <h4 class="fancy-font-book is-size-3">Find the needle for your carb</h4>
        <h5 class="fancy-font-book is-size-5">
          Information provided by
          <a href="https://www.7ent.com/pages/articles-tech-tips/chart-carburetor-needle.html" target="_blank"
            >Seven Mini Parts</a
          >
        </h5>
      </v-col>
      <NeedleTable />
      <v-col cols="12" md="10" offset-md="1">
        <div class="divider">Support</div>
      </v-col>
      <v-col cols="12">
        <patreon-card size="large" />
      </v-col>
    </v-row>
  </v-container>
  <SpeedInsights />
</template>

<style lang="scss">
  .b-tabs .tab-content {
    padding-left: 0px;
    padding-right: 0px;
  }
  .hr {
    border-top: 1px solid whitesmoke;
  }
</style>
