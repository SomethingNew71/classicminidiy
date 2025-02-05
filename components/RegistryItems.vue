<script setup lang="ts">
  import type { RegistryItem } from '~/data/models/registry';

  const { data: registryItems, status } = await useFetch<RegistryItem[]>('/api/registry/queue/list');

  interface TableHeader {
    title: string;
    value?: string;
    key?: string;
    sortable?: boolean;
  }

  const tableHeaders: TableHeader[] = [
    { title: 'Model', value: 'model' },
    { title: 'Body Number', value: 'bodyNum' },
    { title: 'Trim', value: 'trim' },
    { title: 'Name', value: 'submittedBy' },
    { title: 'Email', value: 'submittedByEmail' },
    { title: 'Engine ', value: 'engineNum' },
    { title: 'Notes', value: 'notes' },
    { title: 'Year', value: 'year' },
    { title: 'UUID', value: 'uniqueId' },
    // { title: 'Build Date', value: 'buildDate' },
    { title: 'Body', value: 'bodyType' },
    { title: 'Displacement', value: 'engineSize' },
    { title: 'Color', value: 'color' },
    { title: 'Actions', key: 'actions', sortable: false },
  ];

  async function saveItem(item: RegistryItem) {
    try {
      const res = await useFetch('/api/registry/queue/save', {
        method: 'POST',
        body: { uuid: item.uniqueId, details: { ...item } },
        headers: { 'cache-control': 'no-cache' },
      });
      if (res) {
        registryItems.value = registryItems?.value?.filter((i) => i.uniqueId !== item.uniqueId) || [];
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteItem(item: RegistryItem) {
    try {
      const res = await useFetch('/api/registry/queue/delete', {
        method: 'POST',
        body: { uuid: item.uniqueId, details: { ...item } },
        headers: { 'cache-control': 'no-cache' },
      });
      if (res) {
        registryItems.value = registryItems?.value?.filter((i) => i.uniqueId !== item.uniqueId) || [];
      }
    } catch (err) {
      console.error(err);
    }
  }
</script>
<template>
  <div class="container mt-10 mb-10">
    <div class="columns is-multiline pt-3 mt-10">
      <div class="column is-12">
        <v-card>
          <v-card-title>Registry Queue</v-card-title>
          <v-card-text>
            <v-data-table
              :loading="status === 'pending'"
              :headers="tableHeaders"
              :items="registryItems || []"
              :item-value="'uniqueId'"
              :items-per-page="100"
            >
              <template v-slot:item.actions="{ item }">
                <v-btn
                  class="me-2"
                  prepend-icon="fa-duotone fa-regular fa-floppy-disk"
                  size="small"
                  color="primary"
                  @click="saveItem(item)"
                  variant="text"
                >
                  Save
                </v-btn>
                <v-btn
                  size="small"
                  color="red"
                  prepend-icon="fa-duotone fa-regular fa-trash"
                  @click="deleteItem(item)"
                  variant="text"
                >
                  Delete
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>
