<script lang="ts" setup>
  import { HERO_TYPES } from '../../../data/models/generic';

  const { data, status } = await useFetch('/api/engines');
  const tableHeaders: any[] = [
    { title: $t('pages.archive.subpages.engines.table_headers.size'), key: 'color' },
    { title: $t('pages.archive.subpages.engines.table_headers.original_block'), key: 'group' },
    { title: $t('pages.archive.subpages.engines.table_headers.engine_size'), key: 'engineSize' },
    { title: $t('pages.archive.subpages.engines.table_headers.bore_size'), key: 'boreSize' },
    { title: $t('pages.archive.subpages.engines.table_headers.over_bore'), key: 'overBore' },
    { title: $t('pages.archive.subpages.engines.table_headers.stroke'), key: 'stroke' },
    { title: $t('pages.archive.subpages.engines.table_headers.estimated_power'), key: 'power' },
    { title: $t('pages.archive.subpages.engines.table_headers.estimated_torque'), key: 'torque' },
  ];

  useHead({
    title: $t('pages.archive.subpages.engines.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: $t('pages.archive.subpages.engines.description'),
      },
    ],
  });
  useSeoMeta({
    ogTitle: $t('pages.archive.subpages.engines.seo.og_title'),
    ogDescription: $t('pages.archive.subpages.engines.seo.og_description'),
    ogUrl: 'classicminidiy.com/archive/engines',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/engines.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('pages.archive.subpages.engines.seo.twitter_title'),
    twitterDescription: $t('pages.archive.subpages.engines.seo.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/engines.png',
  });
</script>

<template>
  <hero :navigation="true" :title="$t('pages.archive.subpages.engines.hero_title')" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" :page="$t('pages.archive.subpages.engines.breadcrumb_title')"></breadcrumb>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-2xl font-bold mb-4">{{ $t('pages.archive.subpages.engines.main_heading') }}</h1>
            <p class="mb-6">
              {{ $t('pages.archive.subpages.engines.description_text') }}
            </p>
          </div>
          <div class="col-span-12 md:col-span-4">
            <NuxtLink
              :to="'/technical/compression'"
              :title="$t('pages.archive.subpages.engines.compression_card.link_title')"
            >
              <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div class="card-body p-4">
                  <div class="flex items-start">
                    <div class="mr-4">
                      <figure class="w-16 h-16">
                        <picture>
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.webp"
                            type="image/webp"
                          />
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png"
                            type="image/png"
                          />
                          <nuxt-img
                            src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-calculator-100.png"
                            :alt="$t('pages.archive.subpages.engines.compression_card.alt_text')"
                            class="w-full h-full object-contain"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div>
                      <h2 class="text-lg font-semibold">
                        {{ $t('pages.archive.subpages.engines.compression_card.title') }}
                      </h2>
                      <p>{{ $t('pages.archive.subpages.engines.compression_card.description') }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="mb-5">
          <i class="fas fa-circle text-primary mr-2"></i> {{ $t('pages.archive.subpages.engines.legend.standard') }}
          <i class="fas fa-circle text-info mx-2"></i>
          {{ $t('pages.archive.subpages.engines.legend.standard_overbore') }}
          <i class="fas fa-circle text-error mx-2"></i>
          {{ $t('pages.archive.subpages.engines.legend.different_stroke') }}
        </div>
        <div class="card bg-base-100 shadow-xl">
          <div class="card-title p-4 bg-base-200 flex items-center">
            <i class="fad fa-engine mr-2"></i>
            <span>{{ $t('pages.archive.subpages.engines.table_title') }}</span>
          </div>
          <div class="card-body p-4">
            <div class="overflow-x-auto" v-if="data?.engines">
              <table class="table table-zebra w-full table-compact" :class="{ 'opacity-60': status === 'pending' }">
                <thead>
                  <tr>
                    <th v-for="header in tableHeaders" :key="header.key">{{ header.title }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in data.engines" :key="index" class="hover">
                    <td>
                      <i class="fas fa-circle" :class="item.color"></i>
                    </td>
                    <td>{{ item.group }}</td>
                    <td>{{ item.engineSize }}</td>
                    <td>{{ item.boreSize }}</td>
                    <td>{{ item.overBore }}</td>
                    <td>{{ item.stroke }}</td>
                    <td>{{ item.power }}</td>
                    <td>{{ item.torque }}</td>
                  </tr>
                </tbody>
              </table>
              <div v-if="status === 'pending'" class="flex justify-center items-center py-4">
                <span class="loading loading-spinner loading-md"></span>
                <span class="ml-2">{{ $t('pages.archive.subpages.engines.loading_text') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">{{ $t('pages.archive.subpages.engines.more_divider') }}</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2 pb-10">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .ref-icons {
    font-size: 0.5rem;
    vertical-align: middle;
    padding-bottom: 2px;
    &.mobile-v {
      font-size: 0.75rem;
    }
  }

  /* Additional DaisyUI specific styles */
  .table-compact {
    font-size: 0.875rem;
  }
</style>
