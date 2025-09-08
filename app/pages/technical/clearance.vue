<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';

  interface ClearanceItem {
    name: string;
    thou: string;
    mm: string;
    notes?: string;
    [key: string]: any;
  }

  interface ClearanceTable {
    title: string;
    items: ClearanceItem[];
    search?: string;
  }

  const { data: tables } = await useFetch<Record<string, ClearanceTable>>('/api/clearance');
  const searchValue = ref('');
  const expandedRows = ref<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    expandedRows.value[id] = !expandedRows.value[id];
  };

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
    ogUrl: 'https://classicminidiy.com/technical/clearance',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/clearance.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('twitter_title'),
    twitterDescription: $t('twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/clearance.png',
  });
</script>

<template>
  <hero :navigation="true" :title="$t('hero_title')" :heroType="HERO_TYPES.TECH" />

  <div class="container mx-auto px-4 py-6">
    <div class="mb-6">
      <breadcrumb
        :version="BREADCRUMB_VERSIONS.TECH"
        :page="$t('breadcrumb_title')"
      />
    </div>

    <div class="space-y-4">
      <div v-for="(table, name, index) in tables" :key="`${name}-${index}`" class="collapse collapse-arrow bg-base-200">
        <input type="checkbox" checked />
        <div class="collapse-title text-xl font-medium">
          {{ table.title }}
        </div>
        <div class="collapse-content">
          <div class="py-4">
            <div class="form-control w-full max-w-xs ml-auto mb-4">
              <div class="relative">
                <input
                  type="text"
                  v-model="searchValue"
                  :placeholder="$t('search.placeholder')"
                  class="input input-bordered w-full pr-10"
                />
                <span class="absolute right-3 top-1/2 -translate-y-1/2">
                  <i class="fas fa-search text-gray-400"></i>
                </span>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="table w-full">
                <thead>
                  <tr>
                    <th>{{ $t('table.headers.part') }}</th>
                    <th>{{ $t('table.headers.clearance_thou') }}</th>
                    <th>{{ $t('table.headers.clearance_mm') }}</th>
                    <th>{{ $t('table.headers.expand') }}</th>
                  </tr>
                </thead>
                <tbody>
                  <template
                    v-for="(item, itemIndex) in table.items.filter((i) =>
                      Object.values(i).some((val) => String(val).toLowerCase().includes(searchValue.toLowerCase()))
                    )"
                    :key="itemIndex"
                  >
                    <tr class="hover cursor-pointer" @click="toggleRow(`${name}-${itemIndex}`)">
                      <td>{{ item.name }}</td>
                      <td>{{ item.thou || $t('table.no_value') }}</td>
                      <td>{{ item.mm || $t('table.no_value') }}</td>
                      <td class="text-right">
                        <i
                          class="fas transition-transform duration-200"
                          :class="expandedRows[`${name}-${itemIndex}`] ? 'fa-chevron-up' : 'fa-chevron-down'"
                        ></i>
                      </td>
                    </tr>
                    <tr v-if="expandedRows[`${name}-${itemIndex}`]" class="bg-base-200">
                      <td colspan="4" class="p-4">
                        <div class="font-semibold mb-2">
                          {{ $t('table.extra_notes_title') }}
                        </div>
                        <div class="whitespace-pre-line">
                          {{ item.notes || $t('table.no_notes_available') }}
                        </div>
                      </td>
                    </tr>
                  </template>
                  <tr v-if="!table.items.length">
                    <td colspan="4" class="text-center py-4">
                      {{ $t('table.no_items_found') }}
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
    "title": "Tech - Mini Clearances",
    "description": "Detailed clearance specifications can be found online right here at Classic Mini DIY.",
    "hero_title": "Common Clearances",
    "breadcrumb_title": "Common Clearances",
    "og_title": "Tech - Mini Clearances",
    "og_description": "Detailed clearance specifications for the Classic Mini can be found online right here at Classic Mini DIY.",
    "twitter_title": "Tech - Mini Clearances",
    "twitter_description": "Detailed clearance specifications for the Classic Mini can be found online right here at Classic Mini DIY.",
    "table": {
      "headers": {
        "part": "Part",
        "clearance_thou": "Clearance/Endfloat (thou)",
        "clearance_mm": "Clearance/Endfloat (mm)",
        "expand": ""
      },
      "no_value": "---",
      "no_items_found": "No items found",
      "extra_notes_title": "Extra Notes:",
      "no_notes_available": "No additional notes available."
    },
    "search": {
      "placeholder": "Search..."
    },
    "ui": {
      "support_section": "Support"
    }
  }
}
</i18n>
