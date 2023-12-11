<script lang="ts" setup>
  import { useDisplay } from 'vuetify';
  const { smAndDown, mdAndUp, mdAndDown } = useDisplay();
  const search = ref('');
  const expanded = ref();
  const tableHeaders: any[] = [
    { title: 'Notes', key: 'data-table-expand', align: 'start', sortable: false },
    {
      title: 'Images',
      key: 'images',
      align: 'start',
      sortable: false,
    },
    {
      title: 'Name',
      key: 'name',
      align: 'center',
    },
    {
      title: 'Size(in)',
      key: 'size',
      align: 'center',
    },
    {
      title: 'Width(in)',
      key: 'width',
      align: 'center',
      sortable: true,
      sort: 'descending',
    },
    {
      title: 'Offset',
      key: 'offset',
      align: 'center',
    },
    {
      title: 'Material',
      key: 'type',
      align: 'center',
    },
    {
      title: 'Edit',
      key: 'edit',
      align: 'center',
      sortable: false,
    },
  ];

  let { data: wheels, pending, error }: any = await useFetch(() => '/api/wheels/list');
</script>

<template>
  <v-card elevation="5">
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="fad fa-tire fa-spin" class="me-1 py-2"></v-icon> &nbsp; Find Wheels
      <v-spacer></v-spacer>
      <v-text-field
        v-if="mdAndUp"
        v-model="search"
        prepend-inner-icon="fad fa-search"
        density="compact"
        placeholder="Search for anything"
        single-line
        flat
        hide-details
        variant="solo-filled"
      ></v-text-field>
    </v-card-title>
    <v-card-text v-if="smAndDown">
      <v-text-field
        v-model="search"
        prepend-inner-icon="fad fa-search"
        density="compact"
        placeholder="Search for anything"
        single-line
        flat
        hide-details
        variant="solo-filled"
      ></v-text-field>
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          Use the search above to filter for any field in the table below instantly. Notice some data missing? Click the
          edit button to contribute!
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider></v-divider>
    <v-data-table
      :loading="pending"
      v-model:search="search"
      :items="wheels"
      :headers="tableHeaders"
      :item-value="'uuid'"
      v-model:expanded="expanded"
      fixed-header
      show-expand
    >
      <template v-slot:item.images="{ item }">
        <v-card class="my-5" elevation="2" rounded>
          <WheelImages :images="item.images"></WheelImages>
        </v-card>
      </template>
      <template v-slot:item.name="{ item }">
        <p class="mt-4 text-subtitle-1 text-capitalize">
          <strong>{{ item.name ? item.name : 'Unknown' }}</strong>
        </p>
      </template>
      <template v-slot:item.size="{ item }">
        <v-chip v-if="item.size === '10'" color="green" class="mt-4"> {{ item.size }}in </v-chip>
        <v-chip v-if="item.size === '12'" color="orange" class="mt-4"> {{ item.size }}in </v-chip>
        <v-chip v-if="item.size === '13'" color="brown" class="mt-4"> {{ item.size }}in </v-chip>
      </template>
      <template v-slot:item.width="{ item }">
        <p v-if="item.width" class="mt-4 text-subtitle-1 text-capitalize">
          {{ item.width }}
        </p>
        <v-chip v-else color="red-darken-2" class="mt-4"> Missing</v-chip>
      </template>
      <template v-slot:item.offset="{ item }">
        <p v-if="item.offset" class="mt-4 text-subtitle-1 text-capitalize">
          {{ item.offset }}
        </p>
        <v-chip v-else color="red-darken-2" class="mt-4"> Missing</v-chip>
      </template>
      <template v-slot:item.type="{ item }">
        <p
          v-if="item.type && item.type !== 'other' && item.type !== 'Unknown'"
          class="mt-4 text-subtitle-1 text-capitalize"
        >
          {{ item.type }}
        </p>
        <v-chip v-else color="red-darken-2" class="mt-4"> Missing</v-chip>
      </template>
      <template v-slot:item.edit="{ item }">
        <v-btn
          class="text-center"
          variant="plain"
          size="large"
          icon="fa-duotone fa-edit"
          :to="`/technical/wheels/submit?uuid=${item.uuid}`"
        >
        </v-btn>
      </template>
      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td class="has-background-light pt-4 pb-4" colspan="8">
            <strong>Extra Notes:</strong>
            <br />
            <div v-html="item.notes || '---'"></div>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>
