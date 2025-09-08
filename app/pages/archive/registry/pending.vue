<script lang="ts" setup>
  import { HERO_TYPES } from '../../../../data/models/generic';
  import type { RegistryItem } from '../../../../data/models/registry';
  import { RegistryItemStatus } from '../../../../data/models/registry';

  // Define table columns
  const tableHeaders = [
    { title: $t('table_headers.year'), key: 'year' },
    { title: $t('table_headers.model'), key: 'model' },
    { title: $t('table_headers.body_number'), key: 'bodyNum' },
    { title: $t('table_headers.submitted_by'), key: 'submittedBy' },
    { title: $t('table_headers.status'), key: 'status', width: '100px' },
  ];

  // Fetch pending registry items
  const { data: pendingItemsRaw, status } = await useFetch<RegistryItem[]>('/api/registry/queue/list');

  // Computed property to filter only pending items
  const pendingItems = computed(() => {
    if (!pendingItemsRaw.value) return [];
    return pendingItemsRaw.value.filter((item) => item.status === RegistryItemStatus.PENDING);
  });

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
    ogUrl: 'classicminidiy.com/archive/registry/pending',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/registry.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('seo.twitter_title'),
    twitterDescription: $t('seo.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/registry.png',
  });
</script>

<template>
  <hero
    :navigation="true"
    :title="$t('hero_title')"
    :heroType="HERO_TYPES.ARCHIVE"
  />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" :page="$t('breadcrumb_title')">
          <template #parent>
            <nuxt-link to="/archive/registry">{{
              $t('breadcrumb_parent')
            }}</nuxt-link>
          </template>
        </breadcrumb>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-3xl font-bold">{{ $t('main_heading') }}</h1>
            <h2 class="text-xl mt-4">
              <strong>{{ pendingItems?.length || '0' }}</strong>
              {{ $t('subtitle') }}
            </h2>
            <p class="my-4">
              {{ $t('description_text') }}
            </p>
            <p class="my-4">
              {{ $t('contact_text') }}
              <a href="/contact" class="link link-primary">{{
                $t('contact_link')
              }}</a
              >.
            </p>
          </div>
          <div class="col-span-12 md:col-span-4">
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">{{ $t('status_card.title') }}</h2>
                <div class="flex items-center gap-2 mb-2">
                  <div class="badge badge-primary">
                    {{ $t('status_card.pending') }}
                  </div>
                  <span>{{ $t('status_card.pending_description') }}</span>
                </div>
                <div class="flex items-center gap-2 mb-2">
                  <div class="badge badge-success">
                    {{ $t('status_card.approved') }}
                  </div>
                  <span>{{ $t('status_card.approved_description') }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="badge badge-error">
                    {{ $t('status_card.rejected') }}
                  </div>
                  <span>{{ $t('status_card.rejected_description') }}</span>
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
        <div class="divider">{{ $t('submit_divider') }}</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2 pb-15">
        <RegistrySubmission />
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Pending Registry Submissions - Classic Mini DIY",
    "description": "Track the status of pending Classic Mini registry submissions",
    "hero_title": "Pending Registry Submissions",
    "breadcrumb_title": "Pending Submissions",
    "breadcrumb_parent": "Registry",
    "main_heading": "Pending Registry Submissions",
    "subtitle": "submissions pending review",
    "description_text": "Below you can see all pending registry submissions that are currently being reviewed. Submissions are typically processed within 7-14 days.",
    "contact_text": "If you have questions about your submission, please",
    "contact_link": "contact us",
    "table_headers": {
      "year": "Year",
      "model": "Model",
      "body_number": "Body Number",
      "submitted_by": "Submitted By",
      "status": "Status"
    },
    "status_card": {
      "title": "Submission Status Guide",
      "pending": "Pending",
      "pending_description": "Under review",
      "approved": "Approved",
      "approved_description": "Added to registry",
      "rejected": "Rejected",
      "rejected_description": "Needs correction"
    },
    "submit_divider": "Submit Your Mini",
    "seo": {
      "og_title": "Pending Registry Submissions - Classic Mini DIY",
      "og_description": "Track the status of pending Classic Mini registry submissions",
      "twitter_title": "Pending Registry Submissions - Classic Mini DIY",
      "twitter_description": "Track the status of pending Classic Mini registry submissions"
    }
  }
}
</i18n>
