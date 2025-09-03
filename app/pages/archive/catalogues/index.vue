<script setup lang="ts">
  import { HERO_TYPES } from '../../../../data/models/generic';
  import {
    ARCHIVE_TYPES,
    determineArchiveType,
    submitArchiveFile,
    TRACKING_EVENTS,
    trackStuff,
  } from '../../../../data/models/helper-utils';
  const { t } = useI18n();
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
      title: t('pages.archive.subpages.catalogues.breadcrumb.home'),
      disabled: false,
      href: '/',
    },
    {
      title: t('pages.archive.subpages.catalogues.breadcrumb.archive'),
      disabled: false,
      href: '/archive',
    },
    {
      title: t('pages.archive.subpages.catalogues.breadcrumb.catalogues'),
      disabled: true,
    },
  ]);

  useHead({
    title: t('pages.archive.subpages.catalogues.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: t('pages.archive.subpages.catalogues.description'),
      },
    ],
  });
  useSeoMeta({
    ogTitle: t('pages.archive.subpages.catalogues.seo.og_title'),
    ogDescription: t('pages.archive.subpages.catalogues.seo.og_description'),
    ogUrl: 'classicminidiy.com/archive/catalogues',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/archive/catalogues.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: t('pages.archive.subpages.catalogues.seo.twitter_title'),
    twitterDescription: t('pages.archive.subpages.catalogues.seo.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/archive/catalogues.png',
  });
</script>
<template>
  <hero :navigation="true" :title="t('pages.archive.subpages.catalogues.hero_title')" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" :page="t('pages.archive.subpages.catalogues.breadcrumb_title')"></breadcrumb>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-2xl font-bold mb-4">{{ t('pages.archive.subpages.catalogues.main_heading') }}</h1>
            <p class="mb-6">{{ t('pages.archive.subpages.catalogues.description_text') }}</p>
            <div class="flex flex-wrap gap-3 mb-6">
              <button class="btn btn-primary" @click="submitArchiveFile(ARCHIVE_TYPES.CATALOGUES)">
                <i class="fad fa-paper-plane mr-2"></i>
                {{ t('pages.archive.subpages.catalogues.actions.add_to_archive') }}
              </button>
              <a
                class="btn btn-secondary"
                href="https://buy.stripe.com/3cs8yWe1P1ER3Oo5kl"
                target="_blank"
                @click="trackStuff(TRACKING_EVENTS.SERVER_COST, path)"
              >
                <i class="fad fa-hand-holding-circle-dollar mr-2"></i>
                {{ t('pages.archive.subpages.catalogues.actions.cover_server_costs') }}
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
        <div class="divider">{{ t('pages.archive.subpages.catalogues.support_divider') }}</div>
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>
