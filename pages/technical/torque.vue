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
  <hero :navigation="true" :title="'Torque Specs'" />
  <v-container>
    <v-row>
      <v-col cols="12">
        <breadcrumb page="Torque Specs"></breadcrumb>
      </v-col>
      <v-col cols="12" v-for="(table, name, index) in tables" :key="`${name}-${index}`">
        <v-card>
          <v-toolbar>
            <h2 class="card-header-title">
              <i :class="table.icon"></i>
              <span class="pl-1">{{ table.title }}</span>
            </h2>
            <v-spacer></v-spacer>
            <v-text-field
              label="Search This Table"
              v-model="table.search"
              placeholder="Crankshaft"
              append-inner-icon="fad fa-search"
              variant="underlined"
              class="pr-4 pt-2"
            ></v-text-field>
          </v-toolbar>
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
        </v-card>
        <div v-if="index === 3" :key="`${name}-${index}-patreon`" class="column is-12">
          <div class="card">
            <div class="card-content">
              <patreon-card size="large" />
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
  .card-header {
    background-color: whitesmoke;
  }
</style>
