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
    title: $t('pages.technical.subPages.clearance.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: $t('pages.technical.subPages.clearance.description'),
      },
    ],
  });

  useSeoMeta({
    ogTitle: $t('pages.technical.subPages.clearance.og_title'),
    ogDescription: $t('pages.technical.subPages.clearance.og_description'),
    ogUrl: 'https://classicminidiy.com/technical/clearance',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/clearance.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('pages.technical.subPages.clearance.twitter_title'),
    twitterDescription: $t('pages.technical.subPages.clearance.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/clearance.png',
  });
</script>

<template>
  <hero :navigation="true" :title="$t('pages.technical.subPages.clearance.hero_title')" :heroType="HERO_TYPES.TECH" />

  <div class="container mx-auto px-4 py-6">
    <div class="mb-6">
      <breadcrumb
        :version="BREADCRUMB_VERSIONS.TECH"
        :page="$t('pages.technical.subPages.clearance.breadcrumb_title')"
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
                  :placeholder="$t('pages.technical.subPages.clearance.search.placeholder')"
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
                    <th>{{ $t('pages.technical.subPages.clearance.table.headers.part') }}</th>
                    <th>{{ $t('pages.technical.subPages.clearance.table.headers.clearance_thou') }}</th>
                    <th>{{ $t('pages.technical.subPages.clearance.table.headers.clearance_mm') }}</th>
                    <th>{{ $t('pages.technical.subPages.clearance.table.headers.expand') }}</th>
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
                      <td>{{ item.thou || $t('pages.technical.subPages.clearance.table.no_value') }}</td>
                      <td>{{ item.mm || $t('pages.technical.subPages.clearance.table.no_value') }}</td>
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
                          {{ $t('pages.technical.subPages.clearance.table.extra_notes_title') }}
                        </div>
                        <div class="whitespace-pre-line">
                          {{ item.notes || $t('pages.technical.subPages.clearance.table.no_notes_available') }}
                        </div>
                      </td>
                    </tr>
                  </template>
                  <tr v-if="!table.items.length">
                    <td colspan="4" class="text-center py-4">
                      {{ $t('pages.technical.subPages.clearance.table.no_items_found') }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="divider my-12">{{ $t('pages.technical.subPages.clearance.ui.support_section') }}</div>
    <div class="mb-8">
      <patreon-card size="large" />
    </div>
  </div>
</template>
