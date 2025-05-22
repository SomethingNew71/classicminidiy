<script lang="ts" setup>
  import type { SuggestedNeedles } from '~/data/models/needles';

  const { data: needlesTables, status } = await useFetch<SuggestedNeedles[]>(() => '/api/needles/suggested');
  const tableHeaders: any[] = [
    {
      title: 'Engine Size',
      key: 'engineSize',
      align: 'start',
    },
    {
      title: 'Needle Std',
      key: 'needleStd',
    },
    {
      title: 'Needle Rich',
      key: 'needleRich',
    },
    {
      title: 'Needle Lean',
      key: 'needleLean',
    },
    {
      title: 'Spring Type',
      key: 'springType',
    },
  ];
</script>

<template>
  <div class="grid grid-cols-12 gap-6">
    <div v-for="(table, name) in needlesTables" :key="name" class="col-span-6">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body p-0">
          <!-- Card header -->
          <div class="bg-primary text-primary-content p-4 flex items-center rounded-t-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h2 class="card-title">{{ table.title }}</h2>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto p-4">
            <div v-if="status === 'pending'" class="flex justify-center items-center py-8">
              <span class="loading loading-spinner loading-lg"></span>
            </div>
            <table v-else class="table table-zebra table-sm w-full">
              <thead>
                <tr>
                  <th v-for="header in tableHeaders" :key="header.key">{{ header.title }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in table.items" :key="index">
                  <td class="capitalize">{{ item.engineSize }}</td>
                  <td class="capitalize">{{ item.needleStd }}</td>
                  <td class="capitalize">{{ item.needleRich }}</td>
                  <td class="capitalize">{{ item.needleLean }}</td>
                  <td class="capitalize">{{ item.springType }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
