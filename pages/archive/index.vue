<script setup lang="ts">
  import { ArchiveItems, BREADCRUMB_VERSIONS, HERO_TYPES } from '~/data/models/generic';
  import { ARCHIVE_TYPES, submitArchiveFile, TRACKING_EVENTS, trackStuff } from '~/data/models/helper-utils';
  const { path } = await useRoute();

  useHead({
    title: 'Classic Mini Archives',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          'Complete data protected repository of Classic Mini related documents, registries, libraries and more. Secured across multiple cloud locations to provide a permanent home for historical info for the Classic Mini',
      },
      {
        property: 'og:title',
        content: 'CMDIY - Classic Mini Archive',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'CMDIY - Classic Mini Archive',
    ogDescription:
      'Complete data protected repository of Classic Mini related documents, registries, libraries and more. Secured across multiple cloud locations to provide a permanent home for historical info for the Classic Mini',
    ogUrl: 'classicminidiy.com/archive',
    ogType: 'website',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/misc/archive-seo.jpg',
  });
</script>

<template>
  <hero :navigation="true" :title="'Archives'" :heroType="HERO_TYPES.ARCHIVE" />
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center">
        <breadcrumb :version="BREADCRUMB_VERSIONS.ARCHIVE" root></breadcrumb>
        <h2 class="fancy-font-book-oblique">PRESERVING CLASSIC MINI HERITAGE</h2>
        <h3 class="fancy-font-bold is-size-3">The Classic Mini Archive</h3>
      </v-col>
      <v-col cols="12" class="text-center">
        <p class="is-size-5 pt-5 pb-5">
          Welcome to the Classic Mini Archives. Here you will find a collection of manuals, collections, guides, and
          other resources to help you with your classic mini projects. I will be expanding this archive over time to
          help fill the gaps left by sites slowly going offline.
        </p>
        <p class="is-size-5 pb-5">
          Its taken many hours of backwards engineering and reworking these services to make sure they don't die out. If
          you see any issues, or any areas of improvement please let me know!
        </p>
        <v-btn
          prepend-icon="fa:fad fa-paper-plane"
          class="me-3"
          :variant="'elevated'"
          :size="'large'"
          color="primary"
          target="_blank"
          @click="submitArchiveFile(ARCHIVE_TYPES.GENERIC)"
        >
          Add to Archive
        </v-btn>
        <v-btn
          prepend-icon="fa:fad fa-hand-holding-circle-dollar"
          class="me-3"
          :size="'large'"
          target="_blank"
          color="secondary"
          href="https://buy.stripe.com/3cs8yWe1P1ER3Oo5kl"
          @click="trackStuff(TRACKING_EVENTS.SERVER_COST, path)"
        >
          Cover Server Costs
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="archive in ArchiveItems" cols="6" md="3" align="stretch">
        <v-card class="has-text-centered pa-5" :to="archive.to" :disabled="archive.disabled">
          <p v-if="archive.disabled" class="is-size-7 text-right">Coming Soon!</p>
          <span class="is-size-1 d-block" v-html="archive.iconHtml"> </span>
          <v-card-text class="is-size-5">{{ archive.title }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="10" offset-md="1">
        <div class="divider">Support</div>
      </v-col>
      <v-col cols="12">
        <patreon-card size="large" />
      </v-col>
    </v-row>
  </v-container>
</template>
