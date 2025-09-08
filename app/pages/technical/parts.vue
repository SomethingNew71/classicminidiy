<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';

  interface PartItem {
    brand: string;
    part: string;
    info?: string;
    [key: string]: any; // For any additional properties
  }

  interface PartsTable {
    title: string;
    items: PartItem[];
  }

  const { data: tables } = await useFetch<Record<string, PartsTable>>('/api/parts');
  const searchValue = ref('');
  const activePanels = ref<Record<string, boolean>>({
    'Air Filters': true,
    'Oil Filters': true,
    Alternators: true,
  });

  const togglePanel = (panel: string) => {
    activePanels.value[panel] = !activePanels.value[panel];
  };

  const tableHeaders = [
    { title: $t('table_headers.brand'), key: 'brand' },
    { title: $t('table_headers.part_number'), key: 'part' },
    { title: $t('table_headers.usage_info'), key: 'info' },
  ];

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
    ogTitle: $t('og_title'),
    ogDescription: $t('og_description'),
    ogUrl: 'https://classicminidiy.com/technical/parts',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/parts.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('twitter_title'),
    twitterDescription: $t('twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/parts.png',
  });
</script>

<template>
  <hero :navigation="true" :title="$t('hero_title')" :heroType="HERO_TYPES.TECH" />

  <div class="container mx-auto px-4 py-6">
    <div class="mb-6">
      <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" :page="$t('breadcrumb_title')" />
    </div>

    <div class="space-y-4">
      <div v-for="(table, name, index) in tables" :key="`${name}-${index}`" class="collapse collapse-arrow bg-base-200">
        <input type="checkbox" :checked="activePanels[table.title]" @change="togglePanel(table.title)" />
        <div class="collapse-title text-xl font-medium flex items-center justify-between">
          {{ table.title }}
        </div>
        <div class="collapse-content">
          <div class="py-4">
            <div class="form-control w-full max-w-xs ml-auto mb-4">
              <div class="relative">
                <input
                  type="text"
                  v-model="searchValue"
                  :placeholder="$t('ui.search_placeholder')"
                  class="input input-bordered w-full pr-10"
                />
                <span class="absolute right-3 top-1/2 -translate-y-1/2">
                  <i class="fas fa-search text-gray-400"></i>
                </span>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="table table-zebra w-full">
                <thead>
                  <tr>
                    <th v-for="header in tableHeaders" :key="header.key">
                      {{ header.title }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, itemIndex) in table.items.filter((i) =>
                      Object.values(i).some((val) => String(val).toLowerCase().includes(searchValue.toLowerCase()))
                    )"
                    :key="itemIndex"
                  >
                    <td>{{ item.brand }}</td>
                    <td>{{ item.part }}</td>
                    <td>{{ item.info }}</td>
                  </tr>
                  <tr v-if="!table.items.length">
                    <td :colspan="tableHeaders.length" class="text-center py-4">
                      {{ $t('ui.no_items_found') }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="divider my-12">{{ $t('ui.support_section') }}</div>
    <div class="mb-8">
      <patreon-card size="large" />
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Tech - Parts Equivalency",
    "description": "A complete list of parts which can be found at local parts sellers",
    "hero_title": "Parts Equivalency",
    "breadcrumb_title": "Parts Equivalency",
    "og_title": "Tech - Parts Equivalency",
    "og_description": "A complete list of parts which can be found at local parts sellers",
    "twitter_title": "Tech - Parts Equivalency",
    "twitter_description": "A complete list of parts which can be found at local parts sellers",
    "table_headers": {
      "brand": "Brand",
      "part_number": "Part Number",
      "usage_info": "Usage Info"
    },
    "ui": {
      "search_placeholder": "Search...",
      "no_items_found": "No items found",
      "support_section": "Support"
    }
  }
}
</i18n>
