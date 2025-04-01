<script lang="ts" setup>
  import type { RegistryItem } from '~/data/models/registry';

  const {
    data: registryItems,
    status: fetchStatus,
    refresh,
  } = await useFetch<RegistryItem[]>('/api/registry/queue/list');

  interface TableHeader {
    title: string;
    value?: string;
    key?: string;
    sortable?: boolean;
    align?: "start" | "center" | "end";
    width?: string;
  }

  const key = ref<string>('');
  const errorMessage = ref<string>('');
  const hasError = computed(() => !!errorMessage.value);
  const isProcessing = ref<boolean>(false);
  const selectedItem = ref<RegistryItem | null>(null);
  const showDeleteDialog = ref<boolean>(false);

  const tableHeaders: TableHeader[] = [
    { title: 'Model', value: 'model', sortable: true },
    { title: 'Body Number', value: 'bodyNum', sortable: true },
    { title: 'Trim', value: 'trim', sortable: true },
    { title: 'Name', value: 'submittedBy', sortable: true },
    { title: 'Email', value: 'submittedByEmail', sortable: true },
    { title: 'Engine', value: 'engineNum', sortable: true },
    { title: 'Notes', value: 'notes', width: '150px' },
    { title: 'Year', value: 'year', sortable: true, align: 'center' },
    { title: 'UUID', value: 'uniqueId', width: '280px' },
    // { title: 'Build Date', value: 'buildDate' },
    { title: 'Body', value: 'bodyType', sortable: true },
    { title: 'Displacement', value: 'engineSize', sortable: true },
    { title: 'Color', value: 'color', sortable: true },
    { title: 'Actions', key: 'actions', sortable: false, align: 'center' },
  ];

  const isKeyValid = computed(() => key.value.length > 0);

  async function saveItem(item: RegistryItem) {
    if (!isKeyValid.value) {
      errorMessage.value = 'Please enter an auth key before saving';
      return;
    }

    try {
      isProcessing.value = true;
      errorMessage.value = '';

      const { data, error, status } = await useFetch('/api/registry/queue/save', {
        method: 'POST',
        body: { uuid: item.uniqueId, details: { ...item }, auth: key.value },
        headers: { 'cache-control': 'no-cache' },
      });

      if (status.value === 'success') {
        registryItems.value = registryItems?.value?.filter((i) => i.uniqueId !== item.uniqueId) || [];
      } else if (error.value) {
        errorMessage.value = error.value?.message || 'Error saving item';
        console.error(error.value);
      }
    } catch (err) {
      errorMessage.value = 'Unexpected error occurred while saving';
      console.error(err);
    } finally {
      isProcessing.value = false;
    }
  }

  function confirmDelete(item: RegistryItem) {
    if (!isKeyValid.value) {
      errorMessage.value = 'Please enter an auth key before deleting';
      return;
    }

    selectedItem.value = item;
    showDeleteDialog.value = true;
  }

  async function deleteItem() {
    if (!selectedItem.value) return;

    try {
      isProcessing.value = true;
      errorMessage.value = '';

      const { data, error, status } = await useFetch('/api/registry/queue/delete', {
        method: 'POST',
        body: {
          uuid: selectedItem.value.uniqueId,
          details: { ...selectedItem.value },
          auth: key.value,
        },
        headers: { 'cache-control': 'no-cache' },
      });

      if (status.value === 'success') {
        registryItems.value = registryItems?.value?.filter((i) => i.uniqueId !== selectedItem.value?.uniqueId) || [];
        showDeleteDialog.value = false;
        selectedItem.value = null;
      } else if (error.value) {
        errorMessage.value = error.value?.message || 'Error deleting item';
        console.error(error.value);
      }
    } catch (err) {
      errorMessage.value = 'Unexpected error occurred while deleting';
      console.error(err);
    } finally {
      isProcessing.value = false;
    }
  }
</script>
<template>
  <v-container class="mt-10 mb-10">
    <v-row class="mt-10 pt-10">
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            <span>Registry Queue</span>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="text"
              prepend-icon="fa-duotone fa-regular fa-rotate"
              @click="refresh"
              :loading="fetchStatus === 'pending'"
              :disabled="isProcessing"
              size="small"
            >
              Refresh
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="key"
              label="Auth Key"
              outlined
              dense
              placeholder="Enter Auth Key"
              prepend-icon="fa-duotone fa-regular fa-key"
              :error-messages="!isKeyValid && key !== '' ? 'Auth key is required' : ''"
              hide-details="auto"
              class="mb-4"
              autocomplete="off"
            />
            <v-alert
              v-if="hasError"
              title="Error"
              type="error"
              variant="outlined"
              closable
              @click:close="errorMessage = ''"
              class="mb-4"
            >
              {{ errorMessage }}
            </v-alert>
            <v-data-table
              :loading="fetchStatus === 'pending' || isProcessing"
              :headers="tableHeaders"
              :items="registryItems || []"
              :item-value="'uniqueId'"
              :items-per-page="100"
              class="elevation-1"
            >
              <template v-slot:no-data>
                <div class="pa-4 text-center">
                  <p v-if="fetchStatus === 'pending'">Loading registry items...</p>
                  <p v-else>No registry items in the queue</p>
                </div>
              </template>
              <template v-slot:item.notes="{ item }">
                <div class="text-truncate" :title="item.notes" style="max-width: 150px">
                  {{ item.notes }}
                </div>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn
                  class="me-2"
                  prepend-icon="fa-duotone fa-regular fa-floppy-disk"
                  size="small"
                  color="primary"
                  @click="saveItem(item)"
                  variant="text"
                  :disabled="!isKeyValid || isProcessing"
                  :loading="isProcessing && selectedItem?.uniqueId === item.uniqueId"
                >
                  Save
                </v-btn>
                <v-btn
                  size="small"
                  color="error"
                  prepend-icon="fa-duotone fa-regular fa-trash"
                  @click="confirmDelete(item)"
                  variant="text"
                  :disabled="!isKeyValid || isProcessing"
                >
                  Delete
                </v-btn>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="showDeleteDialog" max-width="500px">
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete this registry item?
          <div class="mt-2 pa-2 bg-grey-lighten-4 rounded">
            <strong>{{ selectedItem?.model }}</strong> - {{ selectedItem?.year }} - Submitted by:
            {{ selectedItem?.submittedBy }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" variant="text" @click="showDeleteDialog = false" :disabled="isProcessing"
            >Cancel</v-btn
          >
          <v-btn color="error" variant="text" @click="deleteItem()" :loading="isProcessing">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
