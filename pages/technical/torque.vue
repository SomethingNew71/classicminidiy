<script lang="ts" setup>
  const expanded = ref([]);
  const { data: tables } = await useFetch('/api/torque');
  const tableHeaders: any = ref([
    { title: 'Fastener', key: 'name', align: 'start' },
    { title: 'Torque (lb/ft)', key: 'lbft', align: 'start' },
    { title: 'Torque (Nm)', key: 'nm', align: 'start' },
    { title: '', key: 'data-table-expand', align: 'start' },
  ]);
  const panels = ref(['Engine']);

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
                  v-model="table.search"
                  append-inner-icon="fad fa-search"
                  variant="underlined"
                  class="pr-4 pt-2"
                ></v-text-field>
              </v-row>
              <v-data-table
                v-model:expanded="expanded"
                :headers="tableHeaders"
                :items="table.items"
                show-expand
                expand-on-click
                :density="'compact'"
                :item-value="'name'"
                items-per-page="10"
                :search="table.search"
              >
                <template v-slot:item.data-table-expand="{ item }">
                  <v-icon v-if="item.notes" icon="fad fa-plus" :size="'small'"></v-icon>
                </template>
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
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-item>
            <patreon-card size="large" />
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
  .card-header {
    background-color: whitesmoke;
  }
</style>
