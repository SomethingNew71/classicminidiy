<script lang="ts" setup>
  const { data: needlesTables, pending, error }: any = await useFetch(() => '/api/needles/suggested');
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
  <v-col v-for="(table, name, index) in needlesTables" :key="index" cols="12" md="6">
    <v-card>
      <v-toolbar color="brand-green-3">
        <v-icon class="ml-4" icon="fad fa-list-timeline"></v-icon>
        <v-toolbar-title>{{ table.title }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-data-table :loading="pending" :items="table.items" density="compact" :headers="tableHeaders" fixed-header>
          <template v-slot:item.needleStd="{ item }">
            <p class="mt-4 text-subtitle-1 text-capitalize" v-html="item.needleStd"></p>
          </template>
          <template v-slot:item.needleRich="{ item }">
            <p class="mt-4 text-subtitle-1 text-capitalize" v-html="item.needleRich"></p>
          </template>
          <template v-slot:item.needleLean="{ item }">
            <p class="mt-4 text-subtitle-1 text-capitalize" v-html="item.needleLean"></p>
          </template>
          <template v-slot:item.springType="{ item }">
            <p class="mt-4 text-subtitle-1 text-capitalize" v-html="item.springType"></p>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-col>
</template>
