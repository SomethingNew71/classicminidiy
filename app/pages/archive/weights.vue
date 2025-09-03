<script lang="ts" setup>
  import { HERO_TYPES } from '../../../data/models/generic';
  const { t } = useI18n();
  const { data: tables, status } = await useFetch('/api/weights');
  const activePanel = ref('Brakes');
  const tableHeaders = [
    { title: t('pages.archive.subpages.weights.table_headers.item'), key: 'item' },
    { title: t('pages.archive.subpages.weights.table_headers.kg'), key: 'weight' },
    { title: t('pages.archive.subpages.weights.table_headers.lbs'), key: 'lbs' },
  ];
  const tableSearchQueries = ref<Record<string, string>>({});

  useHead({
    title: t('pages.archive.subpages.weights.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: t('pages.archive.subpages.weights.description'),
      },
      {
        key: 'keywords',
        name: 'keywords',
        content: t('pages.archive.subpages.weights.keywords'),
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
    ogTitle: t('pages.archive.subpages.weights.seo.og_title'),
    ogDescription: t('pages.archive.subpages.weights.seo.og_description'),
    ogUrl: 'https://classicminidiy.com/archive/weights',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/weights.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: t('pages.archive.subpages.weights.seo.twitter_title'),
    twitterDescription: t('pages.archive.subpages.weights.seo.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/weights.png',
  });

  function convertKgToLbs(weightInKg: number | null) {
    if (!weightInKg) return t('pages.archive.subpages.weights.no_weight');
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
  <hero :navigation="true" :title="t('pages.archive.subpages.weights.hero_title')" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" :page="t('pages.archive.subpages.weights.breadcrumb_title')"></breadcrumb>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-2xl font-bold mb-4">{{ t('pages.archive.subpages.weights.main_heading') }}</h1>
            <p class="mb-6">
              {{ t('pages.archive.subpages.weights.description_text') }}
            </p>
            <a href="mailto:classicminidiy@gmail.com" class="btn btn-outline mb-6" target="_blank">
              <i class="fas fa-paper-plane mr-2"></i>
              {{ t('pages.archive.subpages.weights.email_button') }}
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
                        :placeholder="t('pages.archive.subpages.weights.search_placeholder')"
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
