<script lang="ts" setup>
  import { VDataTable } from 'vuetify/components';
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
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12">
          <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
              <li>
                <NuxtLink to="/">
                  <span class="icon is-small">
                    <i class="fad fa-home" aria-hidden="true" />
                  </span>
                  <span>Home</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/technical">
                  <span class="icon is-small">
                    <i class="fad fa-info-circle" aria-hidden="true" />
                  </span>
                  <span>Technical Info</span>
                </NuxtLink>
              </li>
              <li class="is-active">
                <NuxtLink to="">
                  <span class="icon is-small">
                    <i class="fad fa-puzzle" aria-hidden="true" />
                  </span>
                  <span>Parts Equivalency</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
        <template v-for="(table, name, index) in tables" :key="`${name}-${index}`">
          <div class="column is-12">
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
          </div>
        </template>
        <div class="column is-12">
          <div class="card">
            <div class="card-content">
              <patreon-card size="large" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
  .card-header {
    background-color: whitesmoke;
  }
</style>
