<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '~/data/models/generic';
  const { data: tables } = await useFetch('/api/parts');
  const searchValue = ref('');
  const panels = ref(['Air Filters', 'Oil Filters', 'Alternators']);

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
  <hero :navigation="true" :title="'Parts Equivalency'" :heroType="HERO_TYPES.TECH" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <breadcrumb :version="BREADCRUMB_VERSIONS.TECH" page="Parts Equivalency"></breadcrumb>
      </v-col>
      <v-col cols="12">
        <v-expansion-panels v-model="panels" variant="popout" multiple>
          <v-expansion-panel v-for="(table, name, index) in tables" :key="`${name}-${index}`" :value="table.title">
            <v-expansion-panel-title color="brand-green-3" expand-icon="fad fa-plus" collapse-icon="fad fa-plus">
              {{ table.title }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row class="pb-5">
                <v-spacer></v-spacer>
                <v-text-field
                  label="Search This Table"
                  v-model="searchValue"
                  placeholder="Crankshaft"
                  append-inner-icon="fad fa-search"
                  variant="underlined"
                  class="pr-4 pt-2"
                ></v-text-field>
              </v-row>
              <v-data-table
                :headers="tableHeaders"
                :items="table.items"
                :density="'compact'"
                :item-value="'name'"
                items-per-page="10"
                :search="searchValue"
              >
              </v-data-table>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

      <v-col cols="12" md="10" offset-md="1">
        <div class="divider">Support</div>
      </v-col>
      <v-col cols="12">
        <patreon-card size="large" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
  .card-header {
    background-color: whitesmoke;
  }
</style>
