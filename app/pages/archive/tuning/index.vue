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
      title: $t('breadcrumb.home'),
      disabled: false,
      href: '/',
    },
    {
      title: $t('breadcrumb.archive'),
      disabled: false,
      href: '/archive',
    },
    {
      title: $t('breadcrumb.tuning'),
      disabled: true,
    },
  ]);

  useHead({
    title: $t('title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: $t('description'),
      },
    ],
  });
  useSeoMeta({
    ogTitle: $t('seo.og_title'),
    ogDescription: $t('seo.og_description'),
    ogUrl: 'classicminidiy.com/archive/tuning',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/archive/tuning.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('seo.twitter_title'),
    twitterDescription: $t('seo.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/archive/tuning.png',
  });
</script>
<template>
  <hero :navigation="true" :title="$t('hero_title')" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" :page="$t('breadcrumb_title')"></breadcrumb>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-2xl font-bold mb-4">{{ $t('main_heading') }}</h1>
            <p class="mb-6">{{ $t('description_text') }}</p>
            <div class="flex flex-wrap gap-3 mb-6">
              <button class="btn btn-primary" @click="submitArchiveFile(ARCHIVE_TYPES.TUNING)">
                <i class="fad fa-paper-plane mr-2"></i>
                {{ $t('actions.add_to_archive') }}
              </button>
              <a
                class="btn btn-secondary"
                href="https://buy.stripe.com/3cs8yWe1P1ER3Oo5kl"
                target="_blank"
                @click="trackStuff(TRACKING_EVENTS.SERVER_COST, path)"
              >
                <i class="fad fa-hand-holding-circle-dollar mr-2"></i>
                {{ $t('actions.cover_server_costs') }}
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
        <div class="divider">{{ $t('support_divider') }}</div>
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Classic Mini Archive - Tuning",
    "description": "Curated collection of Classic Mini tuning guides and resources",
    "hero_title": "Classic Mini Archives",
    "breadcrumb_title": "Tuning",
    "breadcrumb": {
      "home": "Home",
      "archive": "Archive",
      "tuning": "Tuning"
    },
    "main_heading": "Tuning Guides & Resources",
    "description_text": "Free copies of tuning guides and performance resources. This is an effort to archive and compile all the various historical tuning documents and guides made for the classic mini. If you have any missing tuning resources, please consider contributing!",
    "actions": {
      "add_to_archive": "Add to Archive",
      "cover_server_costs": "Cover Server Costs"
    },
    "support_divider": "Support",
    "seo": {
      "og_title": "Classic Mini Archive - Tuning",
      "og_description": "Curated collection of Classic Mini tuning guides and resources",
      "twitter_title": "Classic Mini Archive - Tuning",
      "twitter_description": "Curated collection of Classic Mini tuning guides and resources"
    }
  }
}
</i18n>
