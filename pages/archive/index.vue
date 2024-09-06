<script setup lang="ts">
  import type { ArchiveCard } from '~/data/models/archive';
  import { ArchiveItems } from '~/data/models/generic';

  useHead({
    title: 'Classic Mini Archives',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
      {
        property: 'og:title',
        content: 'CMDIY - Classic Mini Archives',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'CMDIY - Classic Mini Archives',
    ogDescription: '',
    ogUrl: 'classicminidiy.com/archive',
    ogType: 'website',
  });
</script>

<template>
  <hero :navigation="true" :title="'Archives'" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <nav class="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <NuxtLink to="/">
                <span class="icon is-small">
                  <i class="fad fa-home" aria-hidden="true" />
                </span>
                <span>Home</span>
              </NuxtLink>
            </li>
            <li class="is-active">
              <NuxtLink to="/technical">
                <span class="icon is-small">
                  <i class="fad fa-info-circle" aria-hidden="true" />
                </span>
                <span>Classic Mini Archive</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
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
          Welcome to the Classic Mini Archives. Here you will find a collection of articles, guides, and other resources
          to help you with your classic mini restoration project. These resources are provided by the now retired
          <strong>mk1-performance-conversions.co.uk</strong> site. Our goal migrating this data here is to make sure its
          free and available to all classic mini enthusiasts for many more years to come.
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
