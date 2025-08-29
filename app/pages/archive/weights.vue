<script lang="ts" setup>
  import { HERO_TYPES } from '../../../data/models/generic';
  const { data: tables, status } = await useFetch('/api/weights');
  const activePanel = ref('Brakes');
  const tableHeaders = [
    { title: 'Item', key: 'item' },
    { title: 'Kg', key: 'weight' },
    { title: 'Lbs', key: 'lbs' },
  ];
  const tableSearchQueries = ref<Record<string, string>>({});

  useHead({
    title: 'Classic Mini Weights & Measurements | Classic Mini DIY',
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          'Detailed weights & measurements for the Classic Mini can be found online right here at Classic Mini DIY.',
      },
      {
        key: 'keywords',
        name: 'keywords',
        content:
          'Classic Mini weights, Mini Cooper measurements, part weights, Mini component weights, classic car specifications',
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
    ogTitle: 'Classic Mini Weights & Measurements | Classic Mini DIY',
    ogDescription:
      'Detailed weights & measurements for the Classic Mini can be found online right here at Classic Mini DIY.',
    ogUrl: 'https://classicminidiy.com/archive/weights',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/weights.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Classic Mini Weights & Measurements',
    twitterDescription: 'Detailed weights & measurements for the Classic Mini.',
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/weights.png',
  });

  function convertKgToLbs(weightInKg: number | null) {
    if (!weightInKg) return '---';
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
  <hero :navigation="true" :title="'Weights & Measurements'" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" page="Weights & Measurements"></breadcrumb>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-2xl font-bold mb-4">Mini Weights</h1>
            <p class="mb-6">
              Below you will find multiple searchable tables of weights for various parts of the Classic Mini. These
              weights were provided by an archive of the now offline miniweights.co.uk. If you see missing values or you
              would like to contribute please click the link below to email me.
            </p>
            <a href="mailto:classicminidiy@gmail.com" class="btn btn-outline mb-6" target="_blank">
              <i class="fas fa-paper-plane mr-2"></i>
              classicminidiy@gmail.com
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
                        placeholder="Search this table"
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
