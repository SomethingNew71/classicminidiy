<script lang="ts" setup>
  import { HERO_TYPES } from '../../../data/models/generic';

  const { data: tables, status } = await useFetch('/api/weights');
  const activePanel = ref('Brakes');
  const tableHeaders = [
    { title: $t('table_headers.item'), key: 'item' },
    { title: $t('table_headers.kg'), key: 'weight' },
    { title: $t('table_headers.lbs'), key: 'lbs' },
  ];
  const tableSearchQueries = ref<Record<string, string>>({});

  useHead({
    title: $t('title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: $t('description'),
      },
      {
        key: 'keywords',
        name: 'keywords',
        content: $t('keywords'),
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://classicminidiy.com/archive/weights',
      },
      {
        rel: 'preconnect',
        href: 'https://classicminidiy.s3.amazonaws.com',
      },
    ],
  });

  useSeoMeta({
    ogTitle: $t('seo.og_title'),
    ogDescription: $t('seo.og_description'),
    ogUrl: 'https://classicminidiy.com/archive/weights',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/weights.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('seo.twitter_title'),
    twitterDescription: $t('seo.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/weights.png',
  });

  function convertKgToLbs(weightInKg: number | null) {
    if (!weightInKg) return $t('no_weight');
    return (weightInKg * 2.20462).toFixed(3);
  }

  // Filter function for table items
  const filterItems = (items: any[], tableName: string) => {
    const query = tableSearchQueries.value[tableName];
    if (!query) return items;
    const queryLower = query.toLowerCase();
    return items.filter((item: any) => item.item.toLowerCase().includes(queryLower));
  };
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
            <p class="mb-6">
              {{ $t('description_text') }}
            </p>
            <a href="mailto:classicminidiy@gmail.com" class="btn btn-outline mb-6" target="_blank">
              <i class="fas fa-paper-plane mr-2"></i>
              {{ $t('email_button') }}
            </a>
          </div>
        </div>
      </div>

      <div class="col-span-12">
        <!-- Loading state -->
        <div v-if="status === 'pending'" class="space-y-4">
          <div class="skeleton h-12 w-full"></div>
          <div class="skeleton h-12 w-full"></div>
          <div class="skeleton h-12 w-full"></div>
        </div>

        <!-- Content when loaded -->
        <div v-if="tables && status !== 'pending'" class="space-y-6">
          <div
            v-for="(table, name, index) in tables"
            :key="`${name}-${index}`"
            class="collapse collapse-plus bg-base-200 border border-base-300 mb-2"
          >
            <!-- Accordion header -->
            <input
              type="radio"
              :name="'weights-accordion'"
              :checked="table.title === activePanel"
              @change="activePanel = table.title"
            />
            <div class="collapse-title font-semibold text-xl bg-primary text-primary-content">
              {{ table.title }}
            </div>

            <!-- Accordion content -->
            <div class="collapse-content">
              <!-- Search field -->
              <div class="flex justify-end mb-4 mt-4">
                <div class="form-control w-full max-w-xs">
                  <div class="input-group w-full">
                    <label class="input w-full">
                      <span class="label"><i class="fad fa-search"></i></span>
                      <input
                        v-model="tableSearchQueries[name]"
                        type="text"
                        :placeholder="$t('search_placeholder')"
                        class="input-bordered w-full"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="table table-zebra w-full table-md">
                  <!-- Table header -->
                  <thead>
                    <tr>
                      <th v-for="header in tableHeaders" :key="header.key">{{ header.title }}</th>
                    </tr>
                  </thead>

                  <!-- Table body -->
                  <tbody>
                    <template v-for="(item, itemIndex) in filterItems(table.items, name)" :key="itemIndex">
                      <tr class="hover">
                        <td>{{ item.item }}</td>
                        <td>{{ item.weight || '---' }}</td>
                        <td>{{ convertKgToLbs(item.weight) }}</td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Support section -->
      <div class="col-span-12 pb-15">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .divider {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.125rem;
    font-weight: bold;
    margin-top: 1rem;
    margin-bottom: 1rem;

    &:before,
    &:after {
      flex-grow: 1;
      background-color: hsl(var(--b3));
      height: 1px;
      margin-left: 0.5rem;
      margin-right: 0.5rem;
      content: '';
    }
  }

  .skeleton {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    background-color: hsl(var(--b3));
    border-radius: 0.25rem;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
</style>

<i18n lang="json">
{
  "en": {
    "title": "Classic Mini Weights & Measurements | Classic Mini DIY",
    "description": "Detailed weights & measurements for the Classic Mini can be found online right here at Classic Mini DIY.",
    "keywords": "Classic Mini weights, Mini Cooper measurements, part weights, Mini component weights, classic car specifications",
    "hero_title": "Weights & Measurements",
    "breadcrumb_title": "Weights & Measurements",
    "main_heading": "Mini Weights",
    "description_text": "Below you will find multiple searchable tables of weights for various parts of the Classic Mini. These weights were provided by an archive of the now offline miniweights.co.uk. If you see missing values or you would like to contribute please click the link below to email me.",
    "email_button": "classicminidiy{'@'}gmail.com",
    "search_placeholder": "Search this table",
    "table_headers": {
      "item": "Item",
      "kg": "Kg",
      "lbs": "Lbs"
    },
    "no_weight": "---",
    "seo": {
      "og_title": "Classic Mini Weights & Measurements | Classic Mini DIY",
      "og_description": "Detailed weights & measurements for the Classic Mini can be found online right here at Classic Mini DIY.",
      "twitter_title": "Classic Mini Weights & Measurements",
      "twitter_description": "Detailed weights & measurements for the Classic Mini."
    }
  }
}
</i18n>
