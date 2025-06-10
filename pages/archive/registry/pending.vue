<script lang="ts" setup>
  import { HERO_TYPES } from '~/data/models/generic';
  import type { RegistryItem } from '~/data/models/registry';
  import { RegistryItemStatus } from '~/data/models/registry';

  // Define table columns
  const tableHeaders = [
    { title: 'Year', key: 'year' },
    { title: 'Model', key: 'model' },
    { title: 'Body Number', key: 'bodyNum' },
    { title: 'Submitted By', key: 'submittedBy' },
    { title: 'Status', key: 'status', width: '100px' },
  ];

  // Fetch pending registry items
  const { data: pendingItemsRaw, status } = await useFetch<RegistryItem[]>('/api/registry/queue/list');

  // Computed property to filter only pending items
  const pendingItems = computed(() => {
    if (!pendingItemsRaw.value) return [];
    return pendingItemsRaw.value.filter((item) => item.status === RegistryItemStatus.PENDING);
  });

  useHead({
    title: 'Pending Registry Submissions - Classic Mini DIY',
    meta: [
      {
        key: 'description',
        name: 'description',
        content: 'Track the status of your Classic Mini registry submission.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Pending Registry Submissions - Classic Mini DIY',
    ogDescription: 'Track the status of your Classic Mini registry submission.',
    ogUrl: 'classicminidiy.com/archive/registry/pending',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/misc/archive-seo.jpg',
    ogType: 'website',
  });
</script>

<template>
  <hero :navigation="true" :title="'Pending Registry Submissions'" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" page="Registry Submissions">
          <template #parent>
            <nuxt-link to="/archive/registry">Registry</nuxt-link>
          </template>
        </breadcrumb>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-3xl font-bold">Pending Registry Submissions</h1>
            <h2 class="text-xl mt-4">
              <strong>{{ pendingItems?.length || '0' }}</strong> Minis awaiting approval
            </h2>
            <p class="my-4">
              This page shows all the Mini registry submissions that are currently pending approval. Once your
              submission is approved, it will appear in the main registry. If you don't see your submission here, it may
              have already been approved or rejected.
            </p>
            <p class="my-4">
              If you have any questions about your submission, please
              <a href="/contact" class="link link-primary">contact us</a>.
            </p>
          </div>
          <div class="col-span-12 md:col-span-4">
            <div class="card bg-base-100 shadow-xl">
              <div class="card-body">
                <h2 class="card-title">Submission Status</h2>
                <div class="flex items-center gap-2 mb-2">
                  <div class="badge badge-primary">Pending</div>
                  <span>Your submission is being reviewed</span>
                </div>
                <div class="flex items-center gap-2 mb-2">
                  <div class="badge badge-success">Approved</div>
                  <span>Added to the main registry</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="badge badge-error">Rejected</div>
                  <span>Not added to the registry</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12">
        <RegistryTable
          :items="pendingItemsRaw"
          :loading="status === 'pending'"
          :tableHeaders="tableHeaders"
          :defaultPageSize="10"
        />
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">Submit a New Mini</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <RegistrySubmission />
      </div>
    </div>
  </div>
</template>
