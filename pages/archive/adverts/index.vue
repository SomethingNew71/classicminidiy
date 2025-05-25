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
        key: 'description',
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
  <div class="container mx-auto px-4 py-4">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <div class="breadcrumbs text-base py-2">
          <ul>
            <li v-for="(crumb, index) in crumbs" :key="index">
              <NuxtLink v-if="!crumb.disabled" :to="crumb.href">
                <i v-if="index === 0" class="fad fa-home mr-1"></i>
                {{ crumb.title }}
              </NuxtLink>
              <span v-else>{{ crumb.title }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-span-12 md:col-span-9">
        <h1 class="text-2xl font-bold mb-2">Original Advertisments</h1>
        <p>Free copies of the unabridged Advertisments.</p>
        <div class="my-3 flex flex-wrap gap-3">
          <button class="btn btn-primary" @click="submitArchiveFile(ARCHIVE_TYPES.ADVERT)" target="_blank">
            <i class="fad fa-paper-plane mr-2"></i>
            Add to Archive
          </button>
          <a
            class="btn btn-secondary"
            href="https://buy.stripe.com/3cs8yWe1P1ER3Oo5kl"
            target="_blank"
            @click="trackStuff(TRACKING_EVENTS.SERVER_COST, path)"
          >
            <i class="fad fa-hand-holding-circle-dollar mr-2"></i>
            Cover Server Costs
          </a>
        </div>
      </div>

      <div class="col-span-12">
        <ArchiveLandingIterator
          :archiveType="archiveType"
          :content="adverts"
          :loading="status"
        ></ArchiveLandingIterator>
      </div>
    </div>
  </div>
</template>
