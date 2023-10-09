<template>
  <div>
    <hero :navigation="true" :title="'Common Clearances'" />
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
                    <i class="fad fa-ruler" aria-hidden="true" />
                  </span>
                  <span>Common Clearances</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
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

<script lang="ts" setup>
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

<script lang="ts">
  export default defineComponent({
    data() {
      return {
        expanded: [],
      };
    },
  });
</script>

<style lang="scss" scoped>
  .card-header {
    background-color: whitesmoke;
  }
</style>
