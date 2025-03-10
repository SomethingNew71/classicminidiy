<script setup lang="ts">
  import { HERO_TYPES } from '~/data/models/generic';
  import {
    ARCHIVE_TYPES,
    determineArchiveType,
    submitArchiveFile,
    TRACKING_EVENTS,
    trackStuff,
  } from '~/data/models/helper-utils';
  const { path } = await useRoute();
  const archiveType = determineArchiveType(path);
  const { data: carbs, status } = await useAsyncData(() => queryCollection('carbs').all());

  carbs?.value?.sort((a, b) => {
    const k1 = a.image === null ? 0 : 1;
    const k2 = b.image === null ? 0 : 2;
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
          <template v-slot:prepend> <v-icon hydrate-on-visible size="small" icon="fad fa-home"></v-icon> </template
        ></v-breadcrumbs>
      </v-col>
      <v-col cols="9">
        <h1 class="title">Original Carburettor Technical Documents</h1>
        <p>Free copies of original technical material about Classic Mini Carburettors</p>
        <v-btn
          prepend-icon="fa:fad fa-paper-plane"
          class="me-3 mb-3 mt-3"
          :variant="'elevated'"
          :size="'large'"
          color="primary"
          target="_blank"
          @click="submitArchiveFile(ARCHIVE_TYPES.CARBS)"
        >
          Add to Archive
        </v-btn>
        <v-btn
          prepend-icon="fa:fad fa-hand-holding-circle-dollar"
          class="me-3 mb-3 mt-3"
          :size="'large'"
          target="_blank"
          color="secondary"
          href="https://buy.stripe.com/3cs8yWe1P1ER3Oo5kl"
          @click="trackStuff(TRACKING_EVENTS.SERVER_COST, path)"
        >
          Cover Server Costs
        </v-btn>
      </v-col>

      <v-col cols="12">
        <ArchiveLandingIterator :archiveType="archiveType" :content="carbs" :loading="status"></ArchiveLandingIterator>
      </v-col>
    </v-row>
  </v-container>
</template>
