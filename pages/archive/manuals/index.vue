<script setup lang="ts">
  import { HERO_TYPES } from '~/data/models/generic';
  import { ARCHIVE_TYPES, determineArchiveType, shareArchiveItem, submitArchiveFile } from '~/data/models/helper-utils';
  const { path } = await useRoute();
  const archiveType = determineArchiveType(path);
  const { data: manuals, status } = await useAsyncData(() => queryCollection('manuals').all());

  manuals?.value?.sort((a, b) => {
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
      title: 'Workshop Manuals',
      disabled: true,
    },
  ]);

  useHead({
    title: 'Classic Mini Archive - Workshop Manuals',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Currated collection of Classic Mini workshop manuals, parts lists and more.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Classic Mini Archive - Workshop Manuals',
    ogDescription: 'Currated collection of Classic Mini workshop manuals, parts lists and more.',
    ogUrl: 'classicminidiy.com/archive/manuals',
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
        <h1 class="title">Parts Lists & Workshop Manuals</h1>
        <p>
          Free copies of the unabridged workshop manuals. Including early manuals as well as later workshop manuals used
          on the final production cars.
        </p>
      </v-col>
      <v-col cols="12">
        <ArchiveLandingIterator
          :archiveType="archiveType"
          :content="manuals"
          :loading="status"
        ></ArchiveLandingIterator>
      </v-col>
    </v-row>
  </v-container>
</template>
