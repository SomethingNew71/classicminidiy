<script lang="ts" setup>
  import { HERO_TYPES } from '../../../../data/models/generic';
  import type { RegistryItem } from '../../../../data/models/registry';

  // Define table columns
  const tableHeaders = [
    { title: $t('table_headers.year'), key: 'year' },
    { title: $t('table_headers.model'), key: 'model' },
    { title: $t('table_headers.trim'), key: 'trim' },
    { title: $t('table_headers.color'), key: 'color' },
  ];

  const { data: registryItems, status } = await useFetch<RegistryItem[]>('/api/registry/list');

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
    ogUrl: 'https://classicminidiy.com/archive/registry',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/registry.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('seo.twitter_title'),
    twitterDescription: $t('seo.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/registry.png',
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
            <h1 class="text-3xl font-bold">{{ $t('main_heading') }}</h1>
            <h2 class="text-xl mt-4">
              <strong>{{ registryItems?.length || $t('subtitle_count') }}</strong>
              {{ $t('subtitle') }}
            </h2>
            <p class="my-4">
              {{ $t('description_text') }}
            </p>
            <p class="font-bold mt-4 mb-5">{{ $t('submission_status_text') }}</p>
            <NuxtLink to="/archive/registry/pending" class="btn btn-primary">
              <i class="fa-duotone fa-clipboard-question mr-2"></i>
              {{ $t('track_submission_button') }}
            </NuxtLink>
          </div>
          <div class="col-span-12 md:col-span-4">
            <a href="#submitAnchor" class="block">
              <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div class="card-body">
                  <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                      <figure class="w-16 h-16">
                        <picture>
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-book-reading-100.webp"
                            type="image/webp"
                          />
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-book-reading-100.png"
                            type="image/png"
                          />
                          <nuxt-img
                            loading="lazy"
                            src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-book-reading-100.png"
                            :alt="$t('submit_card.alt_text')"
                            class="w-16 h-16"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div>
                      <h2 class="card-title">{{ $t('submit_card.title') }}</h2>
                      <p>
                        {{ $t('submit_card.description') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="col-span-12">
        <RegistryTable
          :items="registryItems || []"
          :loading="status === 'pending'"
          :tableHeaders="tableHeaders"
          :defaultPageSize="10"
        />
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider" id="submitAnchor">{{ $t('submit_divider') }}</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <RegistrySubmission></RegistrySubmission>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">{{ $t('support_divider') }}</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Classic Mini Registry - Classic Mini DIY",
    "description": "Browse and contribute to the Classic Mini registry database",
    "hero_title": "Classic Mini Registry",
    "breadcrumb_title": "Registry",
    "main_heading": "Classic Mini Registry",
    "subtitle_count": "0",
    "subtitle": "Classic Minis registered",
    "description_text": "The Classic Mini Registry is a community-driven database of Classic Mini vehicles. Help us build the most comprehensive registry by submitting your Mini's details.",
    "submission_status_text": "Want to track your submission status?",
    "track_submission_button": "Track Submission",
    "table_headers": {
      "year": "Year",
      "model": "Model",
      "trim": "Trim",
      "color": "Color"
    },
    "submit_card": {
      "title": "Submit Your Mini",
      "description": "Add your Classic Mini to our registry",
      "alt_text": "Submit Mini Icon"
    },
    "submit_divider": "Submit Your Mini",
    "support_divider": "Support",
    "seo": {
      "og_title": "Classic Mini Registry - Classic Mini DIY",
      "og_description": "Browse and contribute to the Classic Mini registry database",
      "twitter_title": "Classic Mini Registry - Classic Mini DIY",
      "twitter_description": "Browse and contribute to the Classic Mini registry database"
    }
  }
}
</i18n>
