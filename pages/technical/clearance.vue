<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '~/data/models/generic';

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
    title: 'Tech - Mini Clearances',
    meta: [
      {
        key: 'description',
        name: 'description',
        content: 'Detailed clearance specifications can be found online right here at Classic Mini DIY.',
      },
    ],
  });

  useSeoMeta({
    ogTitle: 'Tech - Mini Clearances',
    ogDescription:
      'Detailed clearance specifications for the Classic Mini can be found online right here at Classic Mini DIY.',
    ogUrl: 'classicminidiy.com/technical/clearance',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png',
    ogType: 'website',
  });
</script>

<template>
  <hero :navigation="true" :title="'Common Clearances'" :heroType="HERO_TYPES.TECH" />

  <div class="container mx-auto px-4 py-6">
    <div class="mb-6">
      <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" page="Common Clearances" />
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
                  placeholder="Search..."
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
                    <th>Part</th>
                    <th>Clearance/Endfloat (thou)</th>
                    <th>Clearance/Endfloat (mm)</th>
                    <th></th>
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
                      <td>{{ item.thou || '---' }}</td>
                      <td>{{ item.mm || '---' }}</td>
                      <td class="text-right">
                        <i
                          class="fas transition-transform duration-200"
                          :class="expandedRows[`${name}-${itemIndex}`] ? 'fa-chevron-up' : 'fa-chevron-down'"
                        ></i>
                      </td>
                    </tr>
                    <tr v-if="expandedRows[`${name}-${itemIndex}`]" class="bg-base-200">
                      <td colspan="4" class="p-4">
                        <div class="font-semibold mb-2">Extra Notes:</div>
                        <div class="whitespace-pre-line">{{ item.notes || 'No additional notes available.' }}</div>
                      </td>
                    </tr>
                  </template>
                  <tr v-if="!table.items.length">
                    <td colspan="4" class="text-center py-4">No items found</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="divider my-12">Support</div>
    <div class="mb-8">
      <patreon-card size="large" />
    </div>
  </div>
</template>
