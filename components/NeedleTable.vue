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
  <v-row>
    <v-col v-for="(table, name, index) in needlesTables" :key="index" cols="12">
      <v-card>
        <v-toolbar color="primary">
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
  </v-row>

  <!-- <div class="column is-12">
    <template v-for="(table, name, index) in tables" :key="index">
      <div class="column is-12">
        <div class="card">
          <div class="card-header">
            <h2 class="card-header-title">
              <span class="pl-2">{{ table.title }}</span>
            </h2>
          </div>
          <div class="card-content">
            <client-only>
              <o-table
                :data="table.items"
                :narrowed="true"
                :hoverable="true"
                :paginated="table.items.length >= 14 ? true : false"
                :per-page="10"
                icon-pack="fas"
                :mobile-cards="false"
              >
                <o-table-column field="engineSize" label="Engine Size" v-slot:default="props">
                  <span v-html="props.row.engineSize"></span>
                </o-table-column>
                <o-table-column field="needleStd" label="Needle Std" v-slot:default="props">
                  <span v-html="props.row.needleStd"></span>
                </o-table-column>
                <o-table-column field="needleRich" label="Needle Rich" v-slot:default="props">
                  <span v-html="props.row.needleRich"></span>
                </o-table-column>
                <o-table-column field="needleLean" label="Needle Lean" v-slot:default="props">
                  <span v-html="props.row.needleLea"></span>
                </o-table-column>
                <o-table-column field="springType" label="Spring Type" v-slot:default="props">
                  <span v-html="props.row.springType"></span>
                </o-table-column>
              </o-table>
            </client-only>
          </div>
        </div>
      </div>
      <div v-if="index === 2" :key="`${name}-${index}-patreon`" class="column is-12">
        <div class="card">
          <div class="card-content">
            <patreon-card size="large" />
          </div>
        </div>
      </div>
    </template>
  </div> -->
</template>

<style lang="scss" scoped>
  .card-header {
    background-color: whitesmoke;
  }
</style>
