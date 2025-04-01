<script lang="ts" setup>
  import type { IWheelsData, IWheelsDataReviewItem } from '~/data/models/wheels';

  const { data: rawWheels, status: fetchStatus, refresh } = await useFetch<IWheelsData[]>('/api/wheels/review/list');

  const wheelsToReview = ref<IWheelsDataReviewItem[]>([]);

  rawWheels?.value?.forEach(async (wheel) => {
    if (wheel.newWheel) return;
    const { data: oldWheel } = await useFetch<IWheelsData>('/api/wheels/wheel', {
      method: 'GET',
      query: {
        uuid: wheel.uuid,
      },
    });
    if (oldWheel.value) {
      wheelsToReview.value.push({
        ...wheel,
        oldWheel: oldWheel.value,
      });
    }
    return;
  });

  interface TableHeader {
    title: string;
    value?: string;
    key?: string;
    sortable?: boolean;
    align?: 'start' | 'center' | 'end';
    width?: string;
  }

  const expanded = ref<string[]>([]);
  const key = ref<string>('');
  const errorMessage = ref<string>('');
  const hasError = computed(() => !!errorMessage.value);
  const isProcessing = ref<boolean>(false);
  const selectedItem = ref<IWheelsDataReviewItem | null>(null);
  const showDeleteDialog = ref<boolean>(false);

  const isKeyValid = computed(() => key.value.length > 0);

  const tableHeaders: TableHeader[] = [
    { title: 'Wheel', value: 'oldWheel.name', sortable: true },
    { title: 'User', value: 'userName', sortable: true },
    { title: 'Email', value: 'emailAddress', sortable: true },
    { title: 'Referral', value: 'referral', sortable: true },
    { title: 'New Wheel', value: 'newWheel', sortable: true },
    { title: 'Actions', key: 'actions', sortable: false, align: 'center', width: '150px' },
  ];

  async function saveItem(item: IWheelsData) {
    if (!isKeyValid.value) {
      errorMessage.value = 'Please enter an auth key before saving';
      return;
    }

    isProcessing.value = true;

    try {
      const { data, error } = await useFetch('/api/wheels/review/save', {
        method: 'POST',
        body: { uuid: item.uuid, details: { ...item }, auth: key.value },
        headers: { 'cache-control': 'no-cache' },
      });

      if (error.value) {
        errorMessage.value = error.value?.message || 'Error saving item';
      } else {
        wheelsToReview.value = wheelsToReview?.value?.filter((i) => i.uuid !== item.uuid) || [];
      }
    } catch (err) {
      errorMessage.value = 'An unexpected error occurred';
      console.error(err);
    } finally {
      isProcessing.value = false;
    }
  }

  function confirmDelete(item: IWheelsData) {
    selectedItem.value = item;
    showDeleteDialog.value = true;
  }

  async function deleteItem() {
    if (!selectedItem.value || !isKeyValid.value) {
      errorMessage.value = 'Please enter an auth key before deleting';
      return;
    }

    isProcessing.value = true;

    try {
      const { data, error } = await useFetch('/api/wheels/review/delete', {
        method: 'POST',
        body: {
          uuid: selectedItem.value.uuid,
          details: { ...selectedItem.value },
          auth: key.value,
        },
        headers: { 'cache-control': 'no-cache' },
      });

      if (error.value) {
        errorMessage.value = error.value?.message || 'Error deleting item';
      } else {
        wheelsToReview.value = wheelsToReview?.value?.filter((i) => i.uuid !== selectedItem.value?.uuid) || [];
        showDeleteDialog.value = false;
        selectedItem.value = null;
      }
    } catch (err) {
      errorMessage.value = 'An unexpected error occurred';
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
          <v-card-title>Wheels to Add Queue</v-card-title>
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
              :items="wheelsToReview || []"
              :item-value="'uuid'"
              :items-per-page="100"
              expand-on-click
              show-expand
              :expanded="expanded"
              class="elevation-1"
            >
              <template v-slot:no-data>
                <div class="pa-4 text-center">
                  <p v-if="fetchStatus === 'pending'">Loading wheel data...</p>
                  <p v-else>No wheels in the review queue</p>
                </div>
              </template>
              <!-- <template v-slot:item.images="{ item }">
                <p v-if="!item.images || item.images?.length < 0">No Images</p>
                <v-row v-else>
                  <v-col v-for="(image, index) in item.images" :key="index" cols="12" md="4">
                    <v-img :src="image" width="100%" height="100%" />
                  </v-col>
                </v-row>
              </template> -->
              <template v-slot:item.actions="{ item }">
                <v-btn
                  class="me-2"
                  prepend-icon="fa-duotone fa-regular fa-floppy-disk"
                  size="small"
                  color="primary"
                  @click="saveItem(item)"
                  variant="text"
                  :disabled="isProcessing || !isKeyValid"
                >
                  Save
                </v-btn>
                <v-btn
                  size="small"
                  color="error"
                  prepend-icon="fa-duotone fa-regular fa-trash"
                  @click="confirmDelete(item)"
                  variant="text"
                  :disabled="isProcessing || !isKeyValid"
                >
                  Delete
                </v-btn>
              </template>
              <template v-slot:expanded-row="{ columns, item }">
                <tr>
                  <td :colspan="columns.length" class="pa-4">
                    <v-card flat>
                      <v-card-text>
                        <v-row>
                          <v-col cols="12">
                            <div class="text-subtitle-1 font-weight-bold mb-2">UUID: {{ item.uuid || '---' }}</div>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-card variant="outlined" class="mb-4">
                              <v-card-title class="text-subtitle-2">Type</v-card-title>
                              <v-card-text>
                                <div class="d-flex flex-column">
                                  <div class="text-body-1">New: {{ item.type || '---' }}</div>
                                  <div class="text-caption text-grey">Old: {{ item.oldWheel?.type || '---' }}</div>
                                </div>
                              </v-card-text>
                            </v-card>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-card variant="outlined" class="mb-4">
                              <v-card-title class="text-subtitle-2">Width</v-card-title>
                              <v-card-text>
                                <div class="d-flex flex-column">
                                  <div class="text-body-1">New: {{ item.width || '---' }}</div>
                                  <div class="text-caption text-grey">Old: {{ item.oldWheel?.width || '---' }}</div>
                                </div>
                              </v-card-text>
                            </v-card>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-card variant="outlined" class="mb-4">
                              <v-card-title class="text-subtitle-2">Size</v-card-title>
                              <v-card-text>
                                <div class="d-flex flex-column">
                                  <div class="text-body-1">New: {{ item.size || '---' }}</div>
                                  <div class="text-caption text-grey">Old: {{ item.oldWheel?.size || '---' }}</div>
                                </div>
                              </v-card-text>
                            </v-card>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-card variant="outlined" class="mb-4">
                              <v-card-title class="text-subtitle-2">Offset</v-card-title>
                              <v-card-text>
                                <div class="d-flex flex-column">
                                  <div class="text-body-1">New: {{ item.offset || '---' }}</div>
                                  <div class="text-caption text-grey">Old: {{ item.oldWheel?.offset || '---' }}</div>
                                </div>
                              </v-card-text>
                            </v-card>
                          </v-col>
                          <v-col cols="12" sm="6" md="8">
                            <v-card variant="outlined" class="mb-4">
                              <v-card-title class="text-subtitle-2">Notes</v-card-title>
                              <v-card-text>
                                <div class="d-flex flex-column">
                                  <div class="text-body-1">New: {{ item.notes || '---' }}</div>
                                  <div class="text-caption text-grey">Old: {{ item.oldWheel?.notes || '---' }}</div>
                                </div>
                              </v-card-text>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="showDeleteDialog" max-width="500px">
    <v-card>
      <v-card-title>Confirm Delete</v-card-title>
      <v-card-text>
        Are you sure you want to delete this wheel data?
        <div v-if="selectedItem" class="mt-4">
          <strong>Wheel:</strong> {{ selectedItem.oldWheel?.name || 'Unknown' }}<br />
          <strong>Submitted by:</strong> {{ selectedItem.userName || 'Unknown' }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" variant="text" @click="showDeleteDialog = false" :disabled="isProcessing">Cancel</v-btn>
        <v-btn color="error" variant="text" @click="deleteItem()" :disabled="isProcessing" :loading="isProcessing"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
