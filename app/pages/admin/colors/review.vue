<script setup lang="ts">
  import { nextTick } from 'vue';
  import type { ColorQueueItem } from '../../../../data/models/colors';
  import { ColorItemStatus } from '../../../../data/models/colors';
  import { BREADCRUMB_VERSIONS } from '../../../../data/models/generic';

  definePageMeta({
    layout: 'admin',
  });

  interface TableHeader {
    title: string;
    value?: string;
    key?: string;
    sortable?: boolean;
    align?: 'start' | 'center' | 'end';
    width?: string;
  }

  // State
  const errorMessage = ref('');
  const isProcessing = ref(false);
  const processingItemId = ref<string | null>(null);
  const selectedItem = ref<ColorQueueItem | null>(null);
  const showDeleteDialog = ref(false);

  // Editing state
  const editingItems = ref<Set<string>>(new Set());
  const editedData = ref<Map<string, ColorQueueItem>>(new Map());

  // API Data
  const {
    data: colorItems,
    status: fetchStatus,
    refresh: refreshData,
  } = await useFetch<ColorQueueItem[]>('/api/colors/queue/list');

  // Table Configuration
  const tableHeaders: TableHeader[] = [
    { title: 'Name', value: 'name', sortable: true },
    { title: 'Code', value: 'code', sortable: true },
    { title: 'Short Code', value: 'shortCode' },
    { title: 'PPG Code', value: 'ditzlerPpgCode' },
    { title: 'Dulux Code', value: 'duluxCode' },
    { title: 'Years', value: 'years' },
    { title: 'Submitted By', value: 'submittedBy' },
    { title: 'Email', value: 'submittedByEmail' },
    { title: 'Status', value: 'status', align: 'center' },
    { title: 'Actions', key: 'actions', align: 'center', width: '200px' },
  ];

  // Computed
  const isLoading = computed(() => fetchStatus.value === 'pending' || isProcessing.value);

  // Helper function to check if item is pending
  const isPending = (item: ColorQueueItem) => !item.status || item.status === ColorItemStatus.PENDING;

  // Helper function to get status display text
  const getStatusDisplay = (item: ColorQueueItem) => {
    if (!item.status || item.status === ColorItemStatus.PENDING) return 'P - Pending';
    if (item.status === ColorItemStatus.APPROVED) return 'A - Approved';
    if (item.status === ColorItemStatus.REJECTED) return 'R - Rejected';
    return item.status;
  };

  // Helper function to get status badge class
  const getStatusBadgeClass = (item: ColorQueueItem) => {
    if (!item.status || item.status === ColorItemStatus.PENDING) return 'badge-warning';
    if (item.status === ColorItemStatus.APPROVED) return 'badge-success';
    if (item.status === ColorItemStatus.REJECTED) return 'badge-error';
    return 'badge-ghost';
  };

  // Editing functions
  const startEditing = (item: ColorQueueItem) => {
    editingItems.value.add(item.id);
    editedData.value.set(item.id, { ...item });
  };

  const cancelEditing = (item: ColorQueueItem) => {
    editingItems.value.delete(item.id);
    editedData.value.delete(item.id);
  };

  const saveEditing = (item: ColorQueueItem) => {
    const editedItem = editedData.value.get(item.id);
    if (editedItem && colorItems.value) {
      const index = colorItems.value.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        colorItems.value[index] = { ...editedItem };
      }
    }
    editingItems.value.delete(item.id);
    editedData.value.delete(item.id);
  };

  const isEditing = (item: ColorQueueItem) => editingItems.value.has(item.id);

  const getEditedValue = (item: ColorQueueItem, field: keyof ColorQueueItem) => {
    const editedItem = editedData.value.get(item.id);
    return editedItem ? editedItem[field] : item[field];
  };

  const updateEditedValue = (item: ColorQueueItem, field: keyof ColorQueueItem, value: any) => {
    const editedItem = editedData.value.get(item.id);
    if (editedItem) {
      (editedItem as any)[field] = value;
    }
  };

  // Methods
  async function refresh() {
    if (isLoading.value) return;
    try {
      await refreshData();
      errorMessage.value = '';
    } catch (error) {
      errorMessage.value = 'Failed to refresh data. Please try again.';
      console.error('Refresh error:', error);
    }
  }

  async function approveItem(item: ColorQueueItem) {
    isProcessing.value = true;
    processingItemId.value = item.id;
    errorMessage.value = '';

    try {
      // Use edited data if available, otherwise use original item
      const dataToSave = editedData.value.get(item.id) || item;

      const { error } = await useFetch('/api/colors/queue/save', {
        method: 'POST',
        body: {
          uuid: item.id,
          details: dataToSave,
        },
      });

      if (error.value) {
        throw new Error(error.value.data?.message || 'Failed to approve item');
      }

      // Clean up editing state
      editingItems.value.delete(item.id);
      editedData.value.delete(item.id);

      // Update item status to approved
      if (colorItems.value) {
        const index = colorItems.value.findIndex((i) => i.id === item.id);
        if (index !== -1 && colorItems.value[index]) {
          colorItems.value[index].status = ColorItemStatus.APPROVED;
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

  function confirmDelete(item: ColorQueueItem) {
    selectedItem.value = item;
    showDeleteDialog.value = true;
  }

  async function closeDeleteDialog() {
    showDeleteDialog.value = false;
    await nextTick();
    selectedItem.value = null;
  }

  async function deleteItem() {
    if (!selectedItem.value) {
      showDeleteDialog.value = false;
      return;
    }

    const itemToReject = selectedItem.value;
    isProcessing.value = true;
    processingItemId.value = itemToReject.id;
    errorMessage.value = '';

    try {
      await $fetch('/api/colors/queue/reject', {
        method: 'POST',
        body: {
          uuid: itemToReject.id,
          details: itemToReject,
        },
      });

      // Update item status to rejected
      if (colorItems.value) {
        const index = colorItems.value.findIndex((i) => i.id === itemToReject.id);
        if (index !== -1 && colorItems.value[index]) {
          colorItems.value[index].status = ColorItemStatus.REJECTED;
        }
      }

      // Close dialog after successful rejection
      showDeleteDialog.value = false;
      await nextTick();
      selectedItem.value = null;
    } catch (error: any) {
      errorMessage.value = error?.data?.message || error?.message || 'Failed to reject item';
      console.error('Reject error:', error);
    } finally {
      isProcessing.value = false;
      processingItemId.value = null;
    }
  }
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb Navigation -->
    <div class="mb-6">
      <Breadcrumb page="Colors Review" :version="BREADCRUMB_VERSIONS.ADMIN" />
    </div>

    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Colors Queue</h1>
      <button class="btn btn-primary" @click="refresh" :disabled="isLoading">
        <span v-if="isLoading" class="fa-solid fa-refresh fa-spin"></span>
        <i v-else class="fa-solid fa-refresh mr-2"></i>
        {{ isLoading ? 'Loading...' : 'Refresh' }}
      </button>
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
    <div v-else-if="!colorItems?.length" class="alert alert-info shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>No color submissions in the queue.</span>
    </div>

    <!-- Color Items Table -->
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
          <tr v-for="item in colorItems" :key="item.id">
            <!-- Name -->
            <td>
              <input
                v-if="isEditing(item)"
                type="text"
                class="input input-sm input-bordered w-full"
                :value="getEditedValue(item, 'name')"
                @input="updateEditedValue(item, 'name', ($event.target as HTMLInputElement).value)"
              />
              <span v-else>{{ item.name || '-' }}</span>
            </td>

            <!-- Code -->
            <td>
              <input
                v-if="isEditing(item)"
                type="text"
                class="input input-sm input-bordered w-full"
                :value="getEditedValue(item, 'code')"
                @input="updateEditedValue(item, 'code', ($event.target as HTMLInputElement).value)"
              />
              <span v-else>{{ item.code || '-' }}</span>
            </td>

            <!-- Short Code -->
            <td>
              <input
                v-if="isEditing(item)"
                type="text"
                class="input input-sm input-bordered w-full"
                :value="getEditedValue(item, 'shortCode')"
                @input="updateEditedValue(item, 'shortCode', ($event.target as HTMLInputElement).value)"
              />
              <span v-else>{{ item.shortCode || '-' }}</span>
            </td>

            <!-- PPG Code -->
            <td>
              <input
                v-if="isEditing(item)"
                type="text"
                class="input input-sm input-bordered w-full"
                :value="getEditedValue(item, 'ditzlerPpgCode')"
                @input="updateEditedValue(item, 'ditzlerPpgCode', ($event.target as HTMLInputElement).value)"
              />
              <span v-else>{{ item.ditzlerPpgCode || '-' }}</span>
            </td>

            <!-- Dulux Code -->
            <td>
              <input
                v-if="isEditing(item)"
                type="text"
                class="input input-sm input-bordered w-full"
                :value="getEditedValue(item, 'duluxCode')"
                @input="updateEditedValue(item, 'duluxCode', ($event.target as HTMLInputElement).value)"
              />
              <span v-else>{{ item.duluxCode || '-' }}</span>
            </td>

            <!-- Years -->
            <td>
              <input
                v-if="isEditing(item)"
                type="text"
                class="input input-sm input-bordered w-full"
                :value="getEditedValue(item, 'years')"
                @input="updateEditedValue(item, 'years', ($event.target as HTMLInputElement).value)"
              />
              <span v-else>{{ item.years || '-' }}</span>
            </td>

            <!-- Submitted By -->
            <td>
              <span>{{ item.submittedBy || '-' }}</span>
            </td>

            <!-- Email -->
            <td>
              <span>{{ item.submittedByEmail || '-' }}</span>
            </td>

            <!-- Status -->
            <td class="text-center">
              <span class="badge" :class="getStatusBadgeClass(item)">
                {{ getStatusDisplay(item) }}
              </span>
            </td>

            <!-- Actions -->
            <td class="space-x-1">
              <template v-if="isPending(item)">
                <template v-if="isEditing(item)">
                  <!-- Edit mode buttons -->
                  <button class="btn btn-xs btn-success" @click="saveEditing(item)" :disabled="isProcessing">
                    <i class="fa-solid fa-check"></i>
                  </button>
                  <button class="btn btn-xs btn-ghost" @click="cancelEditing(item)" :disabled="isProcessing">
                    <i class="fa-solid fa-times"></i>
                  </button>
                  <button class="btn btn-xs btn-primary" @click="approveItem(item)" :disabled="isProcessing">
                    <span
                      v-if="processingItemId === item.id && isProcessing"
                      class="loading loading-spinner loading-xs"
                    ></span>
                    <i v-else class="fa-solid fa-check-double"></i>
                  </button>
                </template>
                <template v-else>
                  <!-- View mode buttons -->
                  <button class="btn btn-xs btn-info" @click="startEditing(item)" :disabled="isProcessing">
                    <i class="fa-solid fa-edit"></i>
                  </button>
                  <button class="btn btn-xs btn-success" @click="approveItem(item)" :disabled="isProcessing">
                    <span
                      v-if="processingItemId === item.id && isProcessing"
                      class="loading loading-spinner loading-xs"
                    ></span>
                    <i v-else class="fa-solid fa-check"></i>
                  </button>
                  <button class="btn btn-xs btn-error" @click="confirmDelete(item)" :disabled="isProcessing">
                    <i class="fa-solid fa-times"></i>
                  </button>
                </template>
              </template>
              <template v-else>
                <span class="text-gray-500 text-xs">No actions available</span>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Delete Confirmation Modal -->
    <dialog :class="['modal', { 'modal-open': showDeleteDialog }]">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Confirm Rejection</h3>
        <p class="py-4">Are you sure you want to reject this color submission? This action cannot be undone.</p>
        <div v-show="selectedItem" class="bg-base-200 p-4 rounded-lg mb-4">
          <p><strong>Color:</strong> {{ selectedItem?.name }} ({{ selectedItem?.code }})</p>
          <p><strong>Submitted by:</strong> {{ selectedItem?.submittedBy || 'Unknown' }}</p>
          <p><strong>Email:</strong> {{ selectedItem?.submittedByEmail || 'No email provided' }}</p>
        </div>
        <div class="modal-action">
          <button class="btn" @click="closeDeleteDialog" :disabled="isProcessing">Cancel</button>
          <button class="btn btn-error" @click="deleteItem" :disabled="isProcessing">
            <span v-if="isProcessing" class="loading loading-spinner loading-xs"></span>
            Reject Submission
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="closeDeleteDialog" :disabled="isProcessing">close</button>
      </form>
    </dialog>
  </div>
</template>
