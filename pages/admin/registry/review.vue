<script lang="ts" setup>
  import type { RegistryItem } from '~/data/models/registry';

  const { data: registryItems, status } = await useFetch<RegistryItem[]>('/api/registry/queue/list');

  interface TableHeader {
    title: string;
    value?: string;
    key?: string;
    sortable?: boolean;
  }

  const key = ref<string>('');
  const hasError = ref<boolean>(false);

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
    const { data, error, status } = await useFetch('/api/registry/queue/save', {
      method: 'POST',
      body: { uuid: item.uniqueId, details: { ...item }, auth: key },
      headers: { 'cache-control': 'no-cache' },
    });

    if (status.value === 'success') {
      registryItems.value = registryItems?.value?.filter((i) => i.uniqueId !== item.uniqueId) || [];
    } else if (error && status.value === 'error') {
      hasError.value = true;
      console.error(error);
    }
  }

  async function deleteItem(item: RegistryItem) {
    const { data, error } = await useFetch('/api/registry/queue/delete', {
      method: 'POST',
      body: { uuid: item.uniqueId, details: { ...item }, auth: key },
      headers: { 'cache-control': 'no-cache' },
    });

    if (status.value === 'success') {
      registryItems.value = registryItems?.value?.filter((i) => i.uniqueId !== item.uniqueId) || [];
    } else if (error && status.value === 'error') {
      hasError.value = true;
      console.error(error);
    }
  }
</script>
<template>
  <v-container class="mt-10 mb-10">
    <v-row class="mt-10 pt-10">
      <v-col cols="12">
        <v-card>
          <v-card-title>Registry Queue</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="key"
              label="Auth Key"
              outlined
              dense
              placeholder="Enter Auth Key"
              prepend-icon="fa-duotone fa-regular fa-key"
            />
            <v-alert
              v-model="hasError"
              title="Error"
              type="error"
              variant="outlined"
              :closable="true"
              text="Error saving or deleting item."
            >
            </v-alert>
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
      </v-col>
    </v-row>
  </v-container>
</template>
