<script lang="ts" setup>
  const expanded = ref([]);
  import { useDisplay } from 'vuetify';
  const { mdAndUp } = useDisplay();
  const { data: tables } = await useFetch('/api/clearance');
  const tableHeaders: any[] = [
    { title: '', key: 'data-table-expand', align: 'start' },
    {
      title: 'Part',
      key: 'name',
      align: 'start',
    },
    {
      title: 'Clearance/Endfloat(thou)',
      key: 'thou',
      align: 'start',
    },
    {
      title: 'Clearance/Endfloat (mm)',
      key: 'mm',
      align: 'start',
    },
  ];
  useHead({
    title: 'Tech - Mini Clearances',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Detailed torque specifications can be found online right here at Classic Mini DIY.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Tech - Mini Clearances',
    ogDescription:
      'Detailed torque specifications for the Classic Mini can be found online right here at Classic Mini DIY.',
    ogUrl: 'classicminidiy.com/technical/clearance',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png',
    ogType: 'website',
  });
</script>

<template>
  <div>
    <hero :navigation="true" :title="'Common Clearances'" />
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12">
          <breadcrumb page="Common Clearances"></breadcrumb>
        </div>
        <div v-for="(table, name, index) in tables" :key="`${name}-${index}`" class="column is-12">
          <div class="card">
            <div class="card-header">
              <h2 class="card-header-title">
                <i :class="table.icon"></i>
                <span class="pl-1">{{ table.title }}</span>
              </h2>
              <v-spacer v-if="mdAndUp"></v-spacer>
              <v-text-field
                v-model="table.search"
                prepend-inner-icon="fad fa-search"
                density="compact"
                placeholder="Search for item"
                single-line
                flat
                hide-details
                class="mt-1 mr-1"
                variant="solo"
              ></v-text-field>
            </div>
            <div class="card-content">
              <v-data-table
                v-model:expanded="expanded"
                :headers="tableHeaders"
                :items="table.items"
                show-expand
                expand-on-click
                :item-value="'name'"
                items-per-page="10"
                :search="table.search"
              >
                <template v-slot:expanded-row="{ columns, item }">
                  <tr>
                    <td class="has-background-light pt-4 pb-4" colspan="4">
                      <strong>Extra Notes:</strong>
                      <br />
                      {{ item.notes || '---' }}
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </div>
          </div>
        </div>
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
