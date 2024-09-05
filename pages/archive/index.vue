<script setup lang="ts">
  import type { ArchiveCard } from '~/data/models/archive';

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
  const archivePages = ref<ArchiveCard[]>([
    {
      title: 'BMC Archive',
      description: 'A huge archive of BMC related information',
      image: '/img/archive/mk1.jpg',
      link: '/archive/bmc',
      disabled: true,
    },
    {
      title: 'Tuning & Accessories',
      description:
        "The most comprehensive archive of companies involved in improving the Mini & other cars of the 60's",
      image: '/img/archive/mk1.jpg',
      link: '/archive/tuning',
      disabled: true,
    },
    {
      title: 'Workshop Manuals',
      description: 'Free copies of the unabridged MK1 Cooper & S Part Lists & associated Workshop manuals',
      image: 'https://mk1-performance-conversions.co.uk/wpimages/wp8d58a3d7_06.png',
      link: '/archive/manuals',
      disabled: false,
    },
    {
      title: 'Classic Mini Registry',
      description: "A free online register for all Classic Mini's of all model years and styles.",
      image: '/img/archive/mk1.jpg',
      link: '/archive/registry',
      disabled: true,
    },
  ]);
</script>

<template>
  <div>
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
                <NuxtLink to="">
                  <span class="icon is-small">
                    <i class="fad fa-book" aria-hidden="true"></i>
                  </span>
                  <span>Archives</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <v-row>
            <v-col cols="3">
              <v-img src="/img/archive/mk1.jpg"></v-img>
            </v-col>
            <v-col cols="9">
              <h1 class="title">The Classic Mini Archives</h1>
              <h2 class="subtitle">mk1-performance-conversions.co.uk</h2>
              <p>
                Welcome to the Classic Mini Archives. Here you will find a collection of articles, guides, and other
                resources to help you with your classic mini restoration project. These resources are provided by the
                now retired
                <strong>mk1-performance-conversions.co.uk</strong> site. Our goal migrating this data here is to make
                sure its free and available to all classic mini enthusiasts for many more years to come.
              </p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <template v-for="archive in archivePages">
          <v-col cols="12" md="3">
            <v-card :disabled="archive.disabled">
              <v-img height="100" :src="archive.image"></v-img>
              <v-card-title> {{ archive.title }} </v-card-title>
              <v-card-subtitle> {{ archive.description }} </v-card-subtitle>
              <v-card-actions>
                <v-btn width="100%" color="primary" text="Explore" :variant="'tonal'" :to="archive.link"></v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>
  </div>
</template>
