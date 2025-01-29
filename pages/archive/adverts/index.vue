<script setup lang="ts">
  import { HERO_TYPES } from '~/data/models/generic';
  import { determineArchiveType } from '~/data/models/helper-utils';
  const { path } = await useRoute();
  const archiveType = determineArchiveType(path);
  const { data: adverts, status } = await useAsyncData(() => queryCollection('adverts').all());

  adverts?.value?.sort((a, b) => {
    const k1 = a.download === null ? 0 : 1;
    const k2 = b.download === null ? 0 : 2;
    return k2 - k1;
  });

  const crumbs = ref([
    {
      title: 'Home',
      disabled: false,
      href: '/',
    },
    {
      title: 'Archive',
      disabled: false,
      href: '/archive',
    },
    {
      title: 'Advertisments',
      disabled: true,
    },
  ]);

  useHead({
    title: 'Classic Mini Archive - Advertisments',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Currated collection of Classic Mini original Advertisments',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Classic Mini Archive - Advertisments',
    ogDescription: 'Currated collection of Classic Mini original Advertisments',
    ogUrl: 'classicminidiy.com/archive/adverts',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/misc/archive-seo.jpg',
    ogType: 'website',
  });
</script>
<template>
  <hero :navigation="true" :title="'Classic Mini Archives'" :heroType="HERO_TYPES.ARCHIVE" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-breadcrumbs :items="crumbs" divider="/">
          <template v-slot:prepend> <v-icon size="small" icon="fad fa-home"></v-icon> </template
        ></v-breadcrumbs>
      </v-col>
      <v-col cols="9">
        <h1 class="title">Original Advertisments</h1>
        <p>Free copies of the unabridged Advertisments.</p>
      </v-col>

      <v-col cols="12">
        <ArchiveLandingIterator
          :archiveType="archiveType"
          :content="adverts"
          :loading="status"
        ></ArchiveLandingIterator>
      </v-col>
    </v-row>
  </v-container>
</template>
