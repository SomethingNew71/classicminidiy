<script lang="ts" setup>
  const { data: tables } = await useFetch('/api/parts');
  const searchValue = ref('');
  const tableHeaders: any[] = [
    { title: 'Brand', key: 'brand', align: 'start' },
    { title: 'Part Number', key: 'part', align: 'start' },
    { title: 'Usage Info', key: 'info', align: 'start' },
  ];

  useHead({
    title: 'Tech - Parts Equivalency',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'A complete list of parts which can be found at local parts sellers',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Tech - Parts Equivalency',
    ogDescription: 'A complete list of parts which can be found at local parts sellers',
    ogUrl: 'classicminidiy.com/technical/parts',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-support-100.png',
    ogType: 'website',
  });
</script>

<template>
  <div>
    <hero :navigation="true" :title="'Parts Equivalency'" />
    <v-container>
      <v-row>
        <v-col cols="12">
          <breadcrumb page="Parts Equivalency"></breadcrumb>
        </v-col>
        <template v-for="(table, name, index) in tables" :key="`${name}-${index}`">
          <v-col cols="12">
            <div class="card" animation="slide">
              <div class="card-header">
                <h2 class="card-header-title">
                  <i :class="table.icon"></i>
                  <span class="pl-1">{{ table.title }}</span>
                </h2>
              </div>
              <div class="card-content">
                <v-data-table
                  density="compact"
                  :headers="tableHeaders"
                  :items="table.items"
                  :search="searchValue"
                  items-per-page="50"
                >
                </v-data-table>
              </div>
            </div>
          </v-col>
        </template>
        <v-col cols="12">
          <div class="card">
            <div class="card-content">
              <patreon-card size="large" />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
  .card-header {
    background-color: whitesmoke;
  }
</style>
