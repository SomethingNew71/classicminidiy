<script lang="ts" setup>
  import type { IWheelsData, IWheelsDataReviewItem } from '~/data/models/wheels';

  const { data: rawWheels, status } = await useFetch<IWheelsData[]>('/api/wheels/review/list');

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
  }

  const expanded = ref<string[]>([]);
  const key = ref<string>('');
  const hasError = ref<boolean>(false);
  const tableHeaders: TableHeader[] = [
    { title: 'Wheel', value: 'oldWheel.name' },
    { title: 'User', value: 'userName' },
    { title: 'Email', value: 'emailAddress' },
    { title: 'Referral', value: 'referral' },
    { title: 'New Wheel', value: 'newWheel' },
    { title: 'Actions', key: 'actions', sortable: false },
  ];
  async function saveItem(item: IWheelsData) {
    const { data, error, status } = await useFetch('/api/wheels/review/save', {
      method: 'POST',
      body: { uuid: item.uuid, details: { ...item }, auth: key },
      headers: { 'cache-control': 'no-cache' },
    });

    if (status.value === 'success') {
      wheelsToReview.value = wheelsToReview?.value?.filter((i) => i.uuid !== item.uuid) || [];
    } else if (error && status.value === 'error') {
      hasError.value = true;
      console.error(error);
    }
  }

  async function deleteItem(item: IWheelsData) {
    const { data, error } = await useFetch('/api/wheels/review/delete', {
      method: 'POST',
      body: { uuid: item.uuid, details: { ...item }, auth: key },
      headers: { 'cache-control': 'no-cache' },
    });

    if (status.value === 'success') {
      wheelsToReview.value = wheelsToReview?.value?.filter((i) => i.uuid !== item.uuid) || [];
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
              :items="wheelsToReview || []"
              :item-value="'uuid'"
              :items-per-page="100"
              expand-on-click
              show-expand
              :expanded="expanded"
            >
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
              <template v-slot:expanded-row="{ columns, item }">
                <tr>
                  <td class="has-background-light pt-4 pb-4"></td>
                  <td class="has-background-light pt-4 pb-4" :colspan="3">
                    <strong>UUID:</strong>
                    <br />
                    {{ item.uuid || '---' }}
                    <br />
                    <br />
                    <strong>Type:</strong>
                    <br />
                    {{ item.type || '---' }}
                    <br />
                    Old Data: {{ item.oldWheel?.type || '---' }}
                    <br />
                    <br />
                    <strong>Width:</strong>
                    <br />
                    {{ item.width || '---' }}
                    <br />
                    Old Data: {{ item.oldWheel?.width || '---' }}
                  </td>
                  <td class="has-background-light pt-4 pb-4" :colspan="3">
                    <strong>Size:</strong>
                    <br />
                    {{ item.size || '---' }}
                    <br />
                    Old Data: {{ item.oldWheel?.size || '---' }}
                    <br />
                    <br />
                    <strong>Offset:</strong>
                    <br />
                    {{ item.offset || '---' }}
                    <br />
                    Old Data: {{ item.oldWheel?.offset || '---' }}
                    <br />
                    <br />
                    <strong>Notes:</strong>
                    <br />
                    {{ item.notes || '---' }}
                    <br />
                    Old Data: {{ item.oldWheel?.notes || '---' }}
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
