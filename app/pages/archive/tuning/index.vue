<script setup lang="ts">
  import { HERO_TYPES } from '../../../../data/models/generic';
  import {
    ARCHIVE_TYPES,
    determineArchiveType,
    submitArchiveFile,
    TRACKING_EVENTS,
    trackStuff,
  } from '../../../../data/models/helper-utils';
  const { path } = useRoute();
  const archiveType = determineArchiveType(path);
  const { data: tuning, status } = await useAsyncData(() => queryCollection('tuning').all());

  tuning?.value?.sort((a, b) => {
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
      title: 'Tuning and Modifications',
      disabled: true,
    },
  ]);

  useHead({
    title: 'Classic Mini ECU Maps: Tuning Files for Various ECUs',
    meta: [
      {
        key: 'description',
        name: 'description',
        content: 'Currated collection of Classic Mini original Tuning and Modifications documents',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Classic Mini ECU Maps: Tuning Files for Various ECUs',
    ogDescription: 'Currated collection of Classic Mini original Tuning and Modifications documents',
    ogUrl: 'classicminidiy.com/archive/tuning',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/archive/tuning.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Classic Mini ECU Maps: Tuning Files for Various ECUs',
    twitterDescription: 'Currated collection of Classic Mini original Tuning and Modifications documents',
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/archive/tuning.png',
  });
</script>
<template>
  <hero :navigation="true" :title="'Classic Mini Archives'" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" page="Tuning and Modifications"></breadcrumb>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-2xl font-bold mb-4">Original Tuning and Modification Technical Documents</h1>
            <p class="mb-6">Free copies of original technical material about Classic Mini Tuning and Modifications</p>
            <div class="flex flex-wrap gap-3 mb-6">
              <button class="btn btn-primary" @click="submitArchiveFile(ARCHIVE_TYPES.TUNING)">
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
        </div>
      </div>

      <div class="col-span-12">
        <ArchiveLandingIterator :archiveType="archiveType" :content="tuning" :loading="status"></ArchiveLandingIterator>
      </div>

      <!-- Support section -->
      <div class="col-span-12 mt-8 mb-10">
        <div class="divider">Support</div>
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>
