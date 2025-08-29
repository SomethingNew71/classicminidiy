<script setup lang="ts">
  import type { IWheelsData, IWheelsDataReviewItem } from '../../../../data/models/wheels';
  import { WheelItemStatus } from '../../../../data/models/wheels';
  import { BREADCRUMB_VERSIONS } from '../../../../data/models/generic';

  definePageMeta({
    layout: 'admin',
  });

  // State
  const errorMessage = ref('');
  const isProcessing = ref(false);
  const processingItemId = ref<string | null>(null);
  const selectedItem = ref<IWheelsDataReviewItem | null>(null);
  const showDeleteDialog = ref(false);
  const editingItems = ref(new Set<string>());
  const editedData = ref(new Map<string, Partial<IWheelsDataReviewItem>>());

  // API Data
  const {
    data: rawWheels,
    status: fetchStatus,
    refresh: refreshData,
  } = await useFetch<IWheelsData[]>('/api/wheels/review/list');

  const wheelsToReview = ref<IWheelsDataReviewItem[]>([]);

  // Load wheel data
  async function loadWheelData() {
    console.log('Raw wheels from API:', rawWheels.value);
    if (!rawWheels.value) return;

    const wheels: IWheelsDataReviewItem[] = [];

    for (const wheel of rawWheels.value) {
      console.log('Processing wheel:', { uuid: wheel.uuid, name: wheel.name, newWheel: wheel.newWheel });

      // For wheels review, we want to show all wheels regardless of newWheel status
      // The newWheel check was preventing wheels from showing up
      wheels.push({
        ...wheel,
        oldWheel: wheel, // Use the wheel data itself as oldWheel for display
      });
    }

    wheelsToReview.value = wheels;
    console.log('Final wheels to review:', wheels);
  }

  async function approveItem(item: IWheelsDataReviewItem) {
    isProcessing.value = true;
    processingItemId.value = item.uuid;
    errorMessage.value = '';

    try {
      // Use edited data if available, otherwise use original item
      const dataToSave = editedData.value.get(item.uuid) || item;
      const { error } = await useFetch('/api/wheels/review/save', {
        method: 'POST',
        body: {
          wheel: {
            new: dataToSave,
          },
        },
      });

      if (error.value) {
        throw new Error(error.value.data?.message || 'Failed to approve item');
      }

      // Clean up editing state
      editingItems.value.delete(item.uuid);
      editedData.value.delete(item.uuid);

      // Update status in place instead of removing
      if (wheelsToReview.value) {
        const index = wheelsToReview.value.findIndex((i) => i.uuid === item.uuid);
        if (index !== -1 && wheelsToReview.value[index]) {
          wheelsToReview.value[index].status = WheelItemStatus.APPROVED;
        }
      }
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Failed to approve item';
      console.error('Approve error:', error);
    } finally {
      isProcessing.value = false;
      processingItemId.value = null;
    }
  }

  function openDeleteDialog(item: IWheelsDataReviewItem) {
    selectedItem.value = item;
    showDeleteDialog.value = true;
  }

  // Inline editing functions
  function startEditing(item: IWheelsDataReviewItem) {
    editingItems.value.add(item.uuid);
    editedData.value.set(item.uuid, { ...item });
  }

  function cancelEditing(item: IWheelsDataReviewItem) {
    editingItems.value.delete(item.uuid);
    editedData.value.delete(item.uuid);
  }

  function saveEditing(item: IWheelsDataReviewItem) {
    const editedItem = editedData.value.get(item.uuid);
    if (editedItem && wheelsToReview.value) {
      const index = wheelsToReview.value.findIndex((i: IWheelsDataReviewItem) => i.uuid === item.uuid);
      if (index !== -1 && wheelsToReview.value[index]) {
        Object.assign(wheelsToReview.value[index], editedItem);
      }
    }
    editingItems.value.delete(item.uuid);
  }

  function updateEditedField(itemUuid: string, field: keyof IWheelsDataReviewItem, value: any) {
    const currentData = editedData.value.get(itemUuid) || {};
    editedData.value.set(itemUuid, { ...currentData, [field]: value });
  }

  function getDisplayValue(item: IWheelsDataReviewItem, field: keyof IWheelsDataReviewItem) {
    if (editingItems.value.has(item.uuid)) {
      const editedItem = editedData.value.get(item.uuid);
      return editedItem?.[field] ?? item[field];
    }
    return item[field];
  }

  function getStatusBadgeClass(status?: WheelItemStatus) {
    switch (status) {
      case WheelItemStatus.APPROVED:
        return 'badge-success';
      case WheelItemStatus.REJECTED:
        return 'badge-error';
      case WheelItemStatus.PENDING:
      default:
        return 'badge-warning';
    }
  }

  function getStatusText(status?: WheelItemStatus) {
    switch (status) {
      case WheelItemStatus.APPROVED:
        return 'Approved';
      case WheelItemStatus.REJECTED:
        return 'Rejected';
      case WheelItemStatus.PENDING:
      default:
        return 'Pending';
    }
  }

  async function deleteItem() {
    if (!selectedItem.value) {
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
          details: selectedItem.value,
        },
      });

      if (error.value) {
        throw new Error(error.value.data?.message || 'Failed to delete item');
      }

      // Update status to rejected instead of removing
      if (wheelsToReview.value && selectedItem.value) {
        const index = wheelsToReview.value.findIndex((i: IWheelsDataReviewItem) => i.uuid === selectedItem.value!.uuid);
        if (index !== -1 && wheelsToReview.value[index]) {
          wheelsToReview.value[index].status = WheelItemStatus.REJECTED;
        }
      }
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
    <!-- Breadcrumb Navigation -->
    <Breadcrumb page="Wheels Review" :version="BREADCRUMB_VERSIONS.ADMIN" />

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Wheels Review Queue</h1>
      <button class="btn btn-primary" @click="() => refreshData()" :disabled="fetchStatus === 'pending'">
        <i class="fas fa-sync-alt" :class="{ 'fa-spin': fetchStatus === 'pending' }"></i>
        {{ fetchStatus === 'pending' ? 'Loading...' : 'Refresh' }}
      </button>
    </div>

    <!-- Admin authentication handled by login system -->

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
            <th>Name</th>
            <th>Type</th>
            <th>Size</th>
            <th>Width</th>
            <th>Offset</th>
            <th>Submitted By</th>
            <th>Email</th>
            <th>Status</th>
            <th class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="item in wheelsToReview" :key="item.uuid">
            <tr class="hover:bg-base-200">
              <!-- Name -->
              <td>
                <div v-if="editingItems.has(item.uuid)">
                  <input
                    type="text"
                    class="input input-sm input-bordered w-full"
                    :value="getDisplayValue(item, 'name')"
                    @input="updateEditedField(item.uuid, 'name', ($event.target as HTMLInputElement).value)"
                  />
                </div>
                <div v-else>{{ item.name || '-' }}</div>
              </td>

              <!-- Type -->
              <td>
                <div v-if="editingItems.has(item.uuid)">
                  <input
                    type="text"
                    class="input input-sm input-bordered w-full"
                    :value="getDisplayValue(item, 'type')"
                    @input="updateEditedField(item.uuid, 'type', ($event.target as HTMLInputElement).value)"
                  />
                </div>
                <div v-else>{{ item.type || '-' }}</div>
              </td>

              <!-- Size -->
              <td>
                <div v-if="editingItems.has(item.uuid)">
                  <input
                    type="text"
                    class="input input-sm input-bordered w-full"
                    :value="getDisplayValue(item, 'size')"
                    @input="updateEditedField(item.uuid, 'size', ($event.target as HTMLInputElement).value)"
                  />
                </div>
                <div v-else>{{ item.size || '-' }}</div>
              </td>

              <!-- Width -->
              <td>
                <div v-if="editingItems.has(item.uuid)">
                  <input
                    type="text"
                    class="input input-sm input-bordered w-full"
                    :value="getDisplayValue(item, 'width')"
                    @input="updateEditedField(item.uuid, 'width', ($event.target as HTMLInputElement).value)"
                  />
                </div>
                <div v-else>{{ item.width || '-' }}</div>
              </td>

              <!-- Offset -->
              <td>
                <div v-if="editingItems.has(item.uuid)">
                  <input
                    type="text"
                    class="input input-sm input-bordered w-full"
                    :value="getDisplayValue(item, 'offset')"
                    @input="updateEditedField(item.uuid, 'offset', ($event.target as HTMLInputElement).value)"
                  />
                </div>
                <div v-else>{{ item.offset || '-' }}</div>
              </td>

              <!-- Submitted By -->
              <td>
                <div v-if="editingItems.has(item.uuid)">
                  <input
                    type="text"
                    class="input input-sm input-bordered w-full"
                    :value="getDisplayValue(item, 'userName')"
                    @input="updateEditedField(item.uuid, 'userName', ($event.target as HTMLInputElement).value)"
                  />
                </div>
                <div v-else>{{ item.userName || '-' }}</div>
              </td>

              <!-- Email -->
              <td>
                <div v-if="editingItems.has(item.uuid)">
                  <input
                    type="email"
                    class="input input-sm input-bordered w-full"
                    :value="getDisplayValue(item, 'emailAddress')"
                    @input="updateEditedField(item.uuid, 'emailAddress', ($event.target as HTMLInputElement).value)"
                  />
                </div>
                <div v-else>{{ item.emailAddress || '-' }}</div>
              </td>

              <!-- Status -->
              <td>
                <span class="badge" :class="getStatusBadgeClass(item.status)">
                  {{ getStatusText(item.status) }}
                </span>
              </td>

              <!-- Actions -->
              <td class="text-center">
                <div class="flex gap-1 justify-center">
                  <!-- Edit Mode Actions -->
                  <template v-if="editingItems.has(item.uuid)">
                    <button class="btn btn-xs btn-success" @click="saveEditing(item)" title="Save changes">
                      <i class="fas fa-save"></i>
                    </button>
                    <button class="btn btn-xs btn-ghost" @click="cancelEditing(item)" title="Cancel editing">
                      <i class="fas fa-times"></i>
                    </button>
                  </template>

                  <!-- View Mode Actions -->
                  <template v-else>
                    <button
                      class="btn btn-xs btn-ghost"
                      @click="startEditing(item)"
                      title="Edit item"
                      :disabled="isProcessing"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      class="btn btn-xs btn-success"
                      @click="approveItem(item)"
                      :disabled="isProcessing"
                      title="Approve item"
                    >
                      <span
                        v-if="isProcessing && processingItemId === item.uuid"
                        class="loading loading-spinner loading-xs"
                      ></span>
                      <i v-else class="fas fa-check"></i>
                    </button>
                    <button
                      class="btn btn-xs btn-error"
                      @click="openDeleteDialog(item)"
                      :disabled="isProcessing"
                      title="Reject item"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </template>
                </div>
              </td>
            </tr>

            <!-- Additional Details Row (expandable) -->
            <tr v-if="item.notes || item.referral" class="bg-base-100">
              <td colspan="9" class="py-2 px-4 border-t border-base-300">
                <div class="text-sm text-base-content/70">
                  <div v-if="item.notes" class="mb-1"><strong>Notes:</strong> {{ item.notes }}</div>
                  <div v-if="item.referral"><strong>Referral:</strong> {{ item.referral }}</div>
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
