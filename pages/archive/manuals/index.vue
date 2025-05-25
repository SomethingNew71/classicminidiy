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
        key: 'description',
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
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 gap-4">
      <div class="col-span-1">
        <div class="breadcrumbs text-base my-4">
          <ul>
            <li>
              <NuxtLink to="/" class="flex items-center">
                <i class="fas fa-home mr-1"></i>
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/archive">Archive</NuxtLink>
            </li>
            <li class="text-base-content/70">Workshop Manuals</li>
          </ul>
        </div>
      </div>
      <div class="col-span-1 md:col-span-9 lg:col-span-9">
        <h1 class="text-2xl font-bold mb-2">Parts Lists & Workshop Manuals</h1>
        <p class="mb-4">
          Free copies of the unabridged workshop manuals. Including early manuals as well as later workshop manuals used
          on the final production cars.
        </p>
        <button class="btn btn-primary mr-3 mb-3 mt-3" @click="submitArchiveFile(ARCHIVE_TYPES.MANUAL)">
          <i class="fad fa-paper-plane mr-2"></i>
          Add to Archive
        </button>
        <a
          class="btn btn-secondary mr-3 mb-3 mt-3"
          href="https://buy.stripe.com/3cs8yWe1P1ER3Oo5kl"
          target="_blank"
          @click="trackStuff(TRACKING_EVENTS.SERVER_COST, path)"
        >
          <i class="fad fa-hand-holding-circle-dollar mr-2"></i>
          Cover Server Costs
        </a>
      </div>
      <div class="col-span-12 md:col-span-9 lg:col-span-9">
        <ArchiveLandingIterator
          :archiveType="archiveType"
          :content="manuals"
          :loading="status"
        ></ArchiveLandingIterator>
      </div>
    </div>
  </div>
</template>
