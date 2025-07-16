<script lang="ts" setup>
  import { HERO_TYPES } from '../../../../data/models/generic';
  import type { RegistryItem } from '../../../../data/models/registry';

  // Define table columns
  const tableHeaders = [
    { title: 'Year', key: 'year' },
    { title: 'Model', key: 'model' },
    { title: 'Trim', key: 'trim' },
    { title: 'Color', key: 'color' },
  ];

  const { data: registryItems, status } = await useFetch<RegistryItem[]>('/api/registry/list');

  useHead({
    title: 'Archive - The Classic Mini Register',
    meta: [
      {
        key: 'description',
        name: 'description',
        content: 'Complete compendium of all known minis, as submitted by their owners.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Archive - The Classic Mini Register',
    ogDescription: 'Complete compendium of all known minis, as submitted by their owners.',
    ogUrl: 'classicminidiy.com/archive/register',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/misc/archive-seo.jpg',
    ogType: 'website',
  });
</script>

<template>
  <hero :navigation="true" :title="'Mini Registry'" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" page="Mini Registry"></breadcrumb>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-3xl font-bold">The Classic Mini Registry</h1>
            <h2 class="text-xl mt-4">
              <strong>{{ registryItems?.length || 'Tons of' }}</strong> Minis added, and growing every day!
            </h2>
            <p class="my-4">
              After watching many of the long standing Classic Mini Registry's start to go offline, or no longer get
              maintained. I decided it was time to stand something up I know will be here and maintained for many years
              to come. Classic Mini DIY is proud to now provide a <strong>free</strong> online register for all Classic
              Mini's of all model years and styles.
            </p>
            <p class="font-bold mt-4 mb-5">Looking for the status of your submission?</p>
            <btn class="btn btn-primary">
              <NuxtLink to="/archive/registry/pending">
                <i class="fa-duotone fa-clipboard-question mr-2"></i>
                Track your Submission
              </NuxtLink>
            </btn>
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
                            alt="Image of compression calculator"
                            class="w-16 h-16"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div>
                      <h2 class="card-title">Submit Your Mini Today</h2>
                      <p>
                        Click here to fill out our short form to submit your mini to our registry of all classic minis
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
        <div class="divider" id="submitAnchor">Add your Mini to the Registry - Its free!</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <RegistrySubmission></RegistrySubmission>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">Other ways to support</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>
