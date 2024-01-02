<script lang="ts" setup>
  const expanded = ref([]);
  const { data: tables } = await useFetch('/api/torque');
  const tableHeaders: any = ref([
    { title: '', key: 'data-table-expand', align: 'start' },
    { title: 'Fastener', key: 'name', align: 'start' },
    { title: 'Torque (lb/ft)', key: 'lbft', align: 'start' },
    { title: 'Torque (Nm)', key: 'nm', align: 'start' },
  ]);
  useHead({
    title: 'Tech - Mini Torque Specs',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Detailed torque specifications can be found online right here at Classic Mini DIY.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Tech - Mini Torque Specs',
    ogDescription:
      'Detailed torque specifications for the Classic Mini can be found online right here at Classic Mini DIY.',
    ogUrl: 'classicminidiy.com/technical/torque',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png',
    ogType: 'website',
  });
</script>

<template>
  <div>
    <hero :navigation="true" :title="'Torque Specs'" />
    <section class="section">
      <div class="columns is-multiline">
        <div class="column is-12">
          <breadcrumb page="Torque Specs"></breadcrumb>
        </div>
        <div v-for="(table, name, index) in tables" :key="`${name}-${index}`" class="column is-12">
          <div class="card">
            <div class="card-header">
              <h2 class="card-header-title">
                <i :class="table.icon"></i>
                <span class="pl-1">{{ table.title }}</span>
              </h2>
              <o-field class="mb-4 pr-2 pt-4" :position="'left'" label="">
                <o-input v-model="table.search" placeholder="Crankshaft"></o-input>
                <p class="control">
                  <o-button class="button is-primary search-button" aria-label="Search box for color">
                    <i class="fad fa-search"></i>
                  </o-button>
                </p>
              </o-field>
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
          <div v-if="index === 3" :key="`${name}-${index}-patreon`" class="column is-12">
            <div class="card">
              <div class="card-content">
                <patreon-card size="large" />
              </div>
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
