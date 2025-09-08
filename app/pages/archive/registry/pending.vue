<script lang="ts" setup>
  import { HERO_TYPES } from '../../../../data/models/generic';
  import type { RegistryItem } from '../../../../data/models/registry';
  import { RegistryItemStatus } from '../../../../data/models/registry';

  // Define table columns
  const tableHeaders = [
    { title: $t('pages.archive.subpages.registry_pending.table_headers.year'), key: 'year' },
    { title: $t('pages.archive.subpages.registry_pending.table_headers.model'), key: 'model' },
    { title: $t('pages.archive.subpages.registry_pending.table_headers.body_number'), key: 'bodyNum' },
    { title: $t('pages.archive.subpages.registry_pending.table_headers.submitted_by'), key: 'submittedBy' },
    { title: $t('pages.archive.subpages.registry_pending.table_headers.status'), key: 'status', width: '100px' },
  ];

  // Fetch pending registry items
  const { data: pendingItemsRaw, status } = await useFetch<RegistryItem[]>('/api/registry/queue/list');

  // Computed property to filter only pending items
  const pendingItems = computed(() => {
    if (!pendingItemsRaw.value) return [];
    return pendingItemsRaw.value.filter((item) => item.status === RegistryItemStatus.PENDING);
  });

  useHead({
    title: $t('pages.archive.subpages.registry_pending.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: $t('pages.archive.subpages.registry_pending.description'),
      },
    ],
  });
  useSeoMeta({
    ogTitle: $t('pages.archive.subpages.registry_pending.seo.og_title'),
    ogDescription: $t('pages.archive.subpages.registry_pending.seo.og_description'),
    ogUrl: 'classicminidiy.com/archive/registry/pending',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/registry.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('pages.archive.subpages.registry_pending.seo.twitter_title'),
    twitterDescription: $t('pages.archive.subpages.registry_pending.seo.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/registry.png',
  });
</script>

<template>
  <hero
    :navigation="true"
    :title="$t('pages.archive.subpages.registry_pending.hero_title')"
    :heroType="HERO_TYPES.ARCHIVE"
  />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" :page="$t('pages.archive.subpages.registry_pending.breadcrumb_title')">
          <template #parent>
            <nuxt-link to="/archive/registry">{{
              $t('pages.archive.subpages.registry_pending.breadcrumb_parent')
            }}</nuxt-link>
          </template>
        </breadcrumb>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-3xl font-bold">{{ $t('pages.archive.subpages.registry_pending.main_heading') }}</h1>
            <h2 class="text-xl mt-4">
              <strong>{{ pendingItems?.length || '0' }}</strong>
              {{ $t('pages.archive.subpages.registry_pending.subtitle') }}
            </h2>
            <p class="my-4">
              {{ $t('pages.archive.subpages.registry_pending.description_text') }}
            </p>
            <p class="my-4">
              {{ $t('pages.archive.subpages.registry_pending.contact_text') }}
              <a href="/contact" class="link link-primary">{{
                $t('pages.archive.subpages.registry_pending.contact_link')
              }}</a
              >.
            </p>
          </div>
          <div class="col-span-12 md:col-span-4">
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">{{ $t('pages.archive.subpages.registry_pending.status_card.title') }}</h2>
                <div class="flex items-center gap-2 mb-2">
                  <div class="badge badge-primary">
                    {{ $t('pages.archive.subpages.registry_pending.status_card.pending') }}
                  </div>
                  <span>{{ $t('pages.archive.subpages.registry_pending.status_card.pending_description') }}</span>
                </div>
                <div class="flex items-center gap-2 mb-2">
                  <div class="badge badge-success">
                    {{ $t('pages.archive.subpages.registry_pending.status_card.approved') }}
                  </div>
                  <span>{{ $t('pages.archive.subpages.registry_pending.status_card.approved_description') }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="badge badge-error">
                    {{ $t('pages.archive.subpages.registry_pending.status_card.rejected') }}
                  </div>
                  <span>{{ $t('pages.archive.subpages.registry_pending.status_card.rejected_description') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12">
        <RegistryTable
          :items="pendingItemsRaw || []"
          :loading="status === 'pending'"
          :tableHeaders="tableHeaders"
          :defaultPageSize="10"
        />
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">{{ $t('pages.archive.subpages.registry_pending.submit_divider') }}</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2 pb-15">
        <RegistrySubmission />
      </div>
    </div>
  </div>
</template>
