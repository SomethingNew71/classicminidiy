<script setup lang="ts">
  import type { IWheelsData, IWheelsDataReviewItem } from '~/data/models/wheels';

  interface TableHeader {
    title: string;
    value?: string;
    key?: string;
    sortable?: boolean;
    align?: 'start' | 'center' | 'end';
    width?: string;
  }

  // State
  const key = ref('');
  const errorMessage = ref('');
  const isProcessing = ref(false);
  const processingItemId = ref<string | null>(null);
  const selectedItem = ref<IWheelsDataReviewItem | null>(null);
  const showDeleteDialog = ref(false);
  const expandedItems = ref<Record<string, boolean>>({});

  // API Data
  const {
    data: rawWheels,
    status: fetchStatus,
    refresh: refreshData,
  } = await useFetch<IWheelsData[]>('/api/wheels/review/list');

  const wheelsToReview = ref<IWheelsDataReviewItem[]>([]);

  // Load wheel data
  async function loadWheelData() {
    if (!rawWheels.value) return;

    const wheels: IWheelsDataReviewItem[] = [];

    for (const wheel of rawWheels.value) {
      if (wheel.newWheel) continue;

      try {
        const { data: oldWheel } = await useFetch<IWheelsData>('/api/wheels/wheel', {
          query: {
            uuid: wheel.uuid || 'noWheel',
          },
          server: !!wheel.uuid, // Only fetch on server if wheel UUID exists
          default: () => ({}) as IWheelsData, // Provide default value when fetch is skipped
        });

        if (oldWheel.value) {
          wheels.push({
            ...wheel,
            oldWheel: oldWheel.value,
          });
        }
      } catch (error) {
        console.error('Error loading wheel data:', error);
      }
    }

    wheelsToReview.value = wheels;
  }

  // Table Configuration
  const tableHeaders: TableHeader[] = [
    { title: 'Wheel', value: 'oldWheel.name' },
    { title: 'User', value: 'userName' },
    { title: 'Email', value: 'emailAddress' },
    { title: 'Referral', value: 'referral' },
    { title: 'New Wheel', value: 'newWheel', align: 'center' },
    { title: 'Actions', key: 'actions', align: 'center', width: '200px' },
  ];

  // Computed
  const isKeyValid = computed(() => key.value.length > 0);
  const isLoading = computed(() => fetchStatus.value === 'pending' || isProcessing.value);

  // Methods
  async function refresh() {
    if (isLoading.value) return;
    try {
      await refreshData();
      await loadWheelData();
      errorMessage.value = '';
    } catch (error) {
      errorMessage.value = 'Failed to refresh data. Please try again.';
      console.error('Refresh error:', error);
    }
  }

  function toggleExpand(uuid: string) {
    expandedItems.value = {
      ...expandedItems.value,
      [uuid]: !expandedItems.value[uuid],
    };
  }

  async function approveItem(item: IWheelsData) {
    if (!isKeyValid.value) {
      errorMessage.value = 'Please enter a valid auth key';
      return;
    }

    isProcessing.value = true;
    processingItemId.value = item.uuid;
    errorMessage.value = '';

    try {
      const { error } = await useFetch('/api/wheels/review/save', {
        method: 'POST',
        body: {
          uuid: item.uuid,
          details: { ...item },
          auth: key.value,
        },
      });

      if (error.value) {
        throw new Error(error.value.data?.message || 'Failed to approve item');
      }

      // Remove item from the list
      wheelsToReview.value = wheelsToReview.value.filter((i) => i.uuid !== item.uuid);
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Failed to approve item';
      console.error('Approve error:', error);
    } finally {
      isProcessing.value = false;
      processingItemId.value = null;
    }
  }

  function confirmDelete(item: IWheelsData) {
    selectedItem.value = item;
    showDeleteDialog.value = true;
  }

  async function deleteItem() {
    if (!selectedItem.value || !isKeyValid.value) {
      showDeleteDialog.value = false;
      return;
    }

    isProcessing.value = true;
    processingItemId.value = selectedItem.value.uuid;
    errorMessage.value = '';

    try {
      const { error } = await useFetch('/api/wheels/review/delete', {
        method: 'POST',
        body: {
          uuid: selectedItem.value.uuid,
          details: { ...selectedItem.value },
          auth: key.value,
        },
      });

      if (error.value) {
        throw new Error(error.value.data?.message || 'Failed to delete item');
      }

      // Remove item from the list
      wheelsToReview.value = wheelsToReview.value.filter((i) => i.uuid !== selectedItem.value?.uuid);
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Failed to delete item';
      console.error('Delete error:', error);
    } finally {
      isProcessing.value = false;
      showDeleteDialog.value = false;
      processingItemId.value = null;
      selectedItem.value = null;
    }
  }

  // Load initial data
  onMounted(() => {
    loadWheelData();
  });
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Wheels Review Queue</h1>
      <button class="btn btn-primary" @click="refresh" :disabled="isLoading">
        <span v-if="isLoading" class="loading loading-spinner"></span>
        {{ isLoading ? 'Loading...' : 'Refresh' }}
      </button>
    </div>

    <!-- Auth Key Input -->
    <div class="mb-6">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Auth Key</span>
        </div>
        <input
          v-model="key"
          type="password"
          placeholder="Enter auth key"
          class="input input-bordered w-full max-w-xs"
          :disabled="isLoading"
        />
      </label>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="alert alert-error mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ errorMessage }}</span>
    </div>

    <!-- Loading State -->
    <div v-if="fetchStatus === 'pending'" class="flex justify-center my-8">
      <span class="loading loading-spinner loading-lg"></span>
    </div>

    <!-- Empty State -->
    <div v-else-if="!wheelsToReview?.length" class="alert alert-info shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>No wheels in the review queue.</span>
    </div>

    <!-- Wheels Table -->
    <div v-else class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th
              v-for="header in tableHeaders"
              :key="header.title"
              :class="{
                'text-center': header.align === 'center',
                'text-right': header.align === 'end',
                'w-[200px]': header.width === '200px',
              }"
            >
              {{ header.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in wheelsToReview" :key="item.uuid">
            <tr @click="toggleExpand(item.uuid)" class="cursor-pointer hover:bg-base-200">
              <td>{{ item.oldWheel?.name || '-' }}</td>
              <td>{{ item.userName || '-' }}</td>
              <td>{{ item.emailAddress || '-' }}</td>
              <td>{{ item.referral || '-' }}</td>
              <td class="text-center">
                <span v-if="item.newWheel" class="badge badge-success">New</span>
                <span v-else class="badge">Update</span>
              </td>
              <td class="space-x-2">
                <button
                  class="btn btn-sm btn-success"
                  @click.stop="approveItem(item)"
                  :disabled="!isKeyValid || isProcessing"
                >
                  <span
                    v-if="isProcessing && processingItemId === item.uuid"
                    class="loading loading-spinner loading-xs"
                  ></span>
                  Approve
                </button>
                <button
                  class="btn btn-sm btn-error"
                  @click.stop="confirmDelete(item)"
                  :disabled="!isKeyValid || isProcessing"
                >
                  Reject
                </button>
              </td>
            </tr>

            <!-- Expanded Row -->
            <tr v-if="expandedItems[item.uuid]" class="bg-base-200">
              <td :colspan="tableHeaders.length" class="p-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 class="font-bold mb-2">Wheel Details</h3>
                    <div class="grid grid-cols-2 gap-2">
                      <div><strong>UUID:</strong></div>
                      <div class="truncate" :title="item.uuid">{{ item.uuid || '-' }}</div>

                      <div v-if="item.oldWheel">
                        <div class="grid grid-cols-2 gap-2">
                          <div><strong>Name:</strong></div>
                          <div>{{ item.oldWheel.name || '-' }}</div>

                          <div><strong>Manufacturer:</strong></div>
                          <div>{{ item.oldWheel.manufacturer || '-' }}</div>

                          <div><strong>Size:</strong></div>
                          <div>{{ item.oldWheel.size || '-' }}</div>

                          <div><strong>Width:</strong></div>
                          <div>{{ item.oldWheel.width || '-' }}</div>

                          <div><strong>Offset:</strong></div>
                          <div>{{ item.oldWheel.offset || '-' }}</div>

                          <div><strong>Bolt Pattern:</strong></div>
                          <div>{{ item.oldWheel.boltPattern || '-' }}</div>

                          <div><strong>Center Bore:</strong></div>
                          <div>{{ item.oldWheel.centerBore || '-' }}</div>

                          <div><strong>Weight:</strong></div>
                          <div>{{ item.oldWheel.weight || '-' }} lbs</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="item.images?.length">
                    <h3 class="font-bold mb-2">Images</h3>
                    <div class="grid grid-cols-2 gap-2">
                      <div v-for="(image, index) in item.images" :key="index" class="aspect-square">
                        <img
                          :src="image"
                          :alt="`Wheel image ${index + 1}`"
                          class="w-full h-full object-cover rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Delete Confirmation Modal -->
    <dialog :class="['modal', { 'modal-open': showDeleteDialog }]">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Confirm Rejection</h3>
        <p class="py-4">Are you sure you want to reject this wheel submission? This action cannot be undone.</p>
        <div v-if="selectedItem" class="bg-base-200 p-4 rounded-lg mb-4">
          <p><strong>Wheel:</strong> {{ selectedItem.oldWheel?.name || 'Unknown' }}</p>
          <p><strong>Submitted by:</strong> {{ selectedItem.userName || 'Unknown' }}</p>
          <p><strong>Email:</strong> {{ selectedItem.emailAddress || 'No email provided' }}</p>
        </div>
        <div class="modal-action">
          <button class="btn" @click="showDeleteDialog = false" :disabled="isProcessing">Cancel</button>
          <button class="btn btn-error" @click="deleteItem" :disabled="isProcessing">
            <span v-if="isProcessing" class="loading loading-spinner loading-xs"></span>
            Reject Submission
          </button>
        </div>
      </div>
    </dialog>
  </div>
</template>
