<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '~/data/models/generic';
  const { data: tables, status } = await useFetch('/api/weights');
  const panels = ref(['Brakes']);
  const tableHeaders: any = ref([
    { title: 'Item', key: 'item', align: 'start' },
    { title: 'Kg', key: 'weight', align: 'start' },
    { title: 'Lbs', key: 'lbs', align: 'start' },
  ]);

  useHead({
    title: 'Tech - Weights & Measurements',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Detailed weights & measurements can be found online right here at Classic Mini DIY.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Tech - Weights & Measurements',
    ogDescription:
      'Detailed weights & measurements for the Classic Mini can be found online right here at Classic Mini DIY.',
    ogUrl: 'classicminidiy.com/weights/weights',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png',
    ogType: 'website',
  });

  function convertKgToLbs(weightInKg: number | null) {
    if (!weightInKg) return '---';
    return (weightInKg * 2.20462).toFixed(3);
  }
</script>

<template>
  <hero :navigation="true" :title="'Weights & Measurements'" :heroType="HERO_TYPES.ARCHIVE" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <breadcrumb :version="BREADCRUMB_VERSIONS.ARCHIVE" page="Weights & Measurements"></breadcrumb>
      </v-col>
      <v-col cols="12">
        <h1 class="title">Mini Weights</h1>
        <p>
          Below you will find multiple searchable tables of weights for various parts of the Classic Mini. These weights
          were provided by an archive of the now offline miniweights.co.uk. If you see missing values or you would like
          to contribute please click the link below to email me.
        </p>
        <v-btn
          prepend-icon="fa:fad fa-paper-plane"
          class="me-3 mb-3 mt-3"
          :variant="'outlined'"
          target="_blank"
          href="mailto:classicminidiy@gmail.com"
        >
          classicminidiy@gmail.com
        </v-btn>
      </v-col>

      <v-col cols="12">
        <template v-if="status === 'pending'">
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
          <v-skeleton-loader type="list-item-avatar"></v-skeleton-loader>
        </template>
        <v-expansion-panels v-if="tables && status !== 'pending'" v-model="panels" variant="popout" multiple>
          <v-expansion-panel v-for="(table, name, index) in tables" :key="`${name}-${index}`" :value="table.title">
            <v-expansion-panel-title color="brand-green-3" expand-icon="fad fa-plus" collapse-icon="fad fa-plus">
              {{ table.title }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row class="pb-5">
                <v-spacer></v-spacer>
                <v-text-field
                  label="Search This Table"
                  v-model="table.search"
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
                :search="table.search"
              >
                <template v-slot:item="{ item }">
                  <tr>
                    <td>{{ item.item }}</td>
                    <td>{{ item.weight || '---' }}</td>
                    <td>{{ convertKgToLbs(item.weight) }}</td>
                  </tr>
                </template>
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
