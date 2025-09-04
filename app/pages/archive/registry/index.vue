<script lang="ts" setup>
  import { HERO_TYPES } from '../../../../data/models/generic';
  import type { RegistryItem } from '../../../../data/models/registry';
  const { t } = useI18n();

  // Define table columns
  const tableHeaders = [
    { title: t('pages.archive.subpages.registry.table_headers.year'), key: 'year' },
    { title: t('pages.archive.subpages.registry.table_headers.model'), key: 'model' },
    { title: t('pages.archive.subpages.registry.table_headers.trim'), key: 'trim' },
    { title: t('pages.archive.subpages.registry.table_headers.color'), key: 'color' },
  ];

  const { data: registryItems, status } = await useFetch<RegistryItem[]>('/api/registry/list');

  useHead({
    title: t('pages.archive.subpages.registry.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: t('pages.archive.subpages.registry.description'),
      },
    ],
  });
  useSeoMeta({
    ogTitle: t('pages.archive.subpages.registry.seo.og_title'),
    ogDescription: t('pages.archive.subpages.registry.seo.og_description'),
    ogUrl: 'https://classicminidiy.com/archive/registry',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/registry.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: t('pages.archive.subpages.registry.seo.twitter_title'),
    twitterDescription: t('pages.archive.subpages.registry.seo.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/registry.png',
  });
</script>

<template>
  <hero :navigation="true" :title="t('pages.archive.subpages.registry.hero_title')" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" :page="t('pages.archive.subpages.registry.breadcrumb_title')"></breadcrumb>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-3xl font-bold">{{ t('pages.archive.subpages.registry.main_heading') }}</h1>
            <h2 class="text-xl mt-4">
              <strong>{{ registryItems?.length || t('pages.archive.subpages.registry.subtitle_count') }}</strong>
              {{ t('pages.archive.subpages.registry.subtitle') }}
            </h2>
            <p class="my-4">
              {{ t('pages.archive.subpages.registry.description_text') }}
            </p>
            <p class="font-bold mt-4 mb-5">{{ t('pages.archive.subpages.registry.submission_status_text') }}</p>
            <NuxtLink to="/archive/registry/pending" class="btn btn-primary">
              <i class="fa-duotone fa-clipboard-question mr-2"></i>
              {{ t('pages.archive.subpages.registry.track_submission_button') }}
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
                            :alt="t('pages.archive.subpages.registry.submit_card.alt_text')"
                            class="w-16 h-16"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div>
                      <h2 class="card-title">{{ t('pages.archive.subpages.registry.submit_card.title') }}</h2>
                      <p>
                        {{ t('pages.archive.subpages.registry.submit_card.description') }}
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
        <div class="divider" id="submitAnchor">{{ t('pages.archive.subpages.registry.submit_divider') }}</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <RegistrySubmission></RegistrySubmission>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">{{ t('pages.archive.subpages.registry.support_divider') }}</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>
