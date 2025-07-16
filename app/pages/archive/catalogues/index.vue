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
  const { data: catalogues, status } = await useAsyncData(() => queryCollection('catalogues').all());

  catalogues?.value?.sort((a, b) => {
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
      title: 'Vendor Catalogues',
      disabled: true,
    },
  ]);

  useHead({
    title: 'Classic Mini Archive - Vendor Catalogues',
    meta: [
      {
        key: 'description',
        name: 'description',
        content: 'Currated collection of Classic Mini original Vendor Catalogues',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Classic Mini Archive - Vendor Catalogues',
    ogDescription: 'Currated collection of Classic Mini original Vendor Catalogues',
    ogUrl: 'classicminidiy.com/archive/catalogues',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/misc/archive-seo.jpg',
    ogType: 'website',
  });
</script>
<template>
  <hero :navigation="true" :title="'Classic Mini Archives'" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" page="Vendor Catalogues"></breadcrumb>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-2xl font-bold mb-4">Original Vendor Catalogues</h1>
            <p class="mb-6">Free copies of original vendor catalogues for Classic Mini</p>
            <div class="flex flex-wrap gap-3 mb-6">
              <button class="btn btn-primary" @click="submitArchiveFile(ARCHIVE_TYPES.CATALOGUES)">
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
        <ArchiveLandingIterator
          :archiveType="archiveType"
          :content="catalogues"
          :loading="status"
        ></ArchiveLandingIterator>
      </div>

      <!-- Support section -->
      <div class="col-span-12 mt-8 mb-10">
        <div class="divider">Support</div>
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>
