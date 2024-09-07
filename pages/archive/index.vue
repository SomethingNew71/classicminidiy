<script setup lang="ts">
  import type { ArchiveCard } from '~/data/models/archive';
  import { ArchiveItems, BREADCRUMB_VERSIONS } from '~/data/models/generic';

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
  });
</script>

<template>
  <hero :navigation="true" :title="'Archives'" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <breadcrumb :version="BREADCRUMB_VERSIONS.ARCHIVE" root></breadcrumb>
        <h2 class="fancy-font-book-oblique">KEEPING MINIS DRIVING</h2>
        <h3 class="fancy-font-bold is-size-3">Technical Information for the DIY Mechanic</h3>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-toolbar color="brand-green-2">
            <v-toolbar-title>Archives</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list lines="two">
            <v-list-item v-for="item in ArchiveItems" :key="item.title" :title="item.title" :to="item.to">
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
          Welcome to the Classic Mini Archives. Here you will find a collection of manuals, collections, guides, and
          other resources to help you with your classic mini projects. I will be expanding this archive over time to
          help fill the gaps left by sites slowly going offline.
        </p>
        <p class="is-size-5 pb-5">
          Its taken many hours of backwards engineering and reworking these services to make sure they don't die out. If
          you see any issues, or any areas of improvement please let me know!
        </p>
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
