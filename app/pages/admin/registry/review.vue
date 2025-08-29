<script setup lang="ts">
  import type { RegistryItem } from '../../../../data/models/registry';
  import { RegistryItemStatus } from '../../../../data/models/registry';

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
  const selectedItem = ref<RegistryItem | null>(null);
  const showDeleteDialog = ref(false);

  // API Data
  const {
    data: registryItems,
    status: fetchStatus,
    refresh: refreshData,
  } = await useFetch<RegistryItem[]>('/api/registry/queue/list');

  // Table Configuration
  const tableHeaders: TableHeader[] = [
    { title: 'Model', value: 'model', sortable: true },
    { title: 'Body Number', value: 'bodyNum', sortable: true },
    { title: 'Trim', value: 'trim' },
    { title: 'Name', value: 'submittedBy' },
    { title: 'Email', value: 'submittedByEmail' },
    { title: 'Year', value: 'year', align: 'center' },
    { title: 'Status', value: 'status', align: 'center' },
    { title: 'Actions', key: 'actions', align: 'center', width: '200px' },
  ];

  // Computed
  const isLoading = computed(() => fetchStatus.value === 'pending' || isProcessing.value);

  // Helper function to check if item is pending
  const isPending = (item: RegistryItem) => !item.status || item.status === RegistryItemStatus.PENDING;

  // Helper function to get status display text
  const getStatusDisplay = (item: RegistryItem) => {
    if (!item.status || item.status === RegistryItemStatus.PENDING) return 'P - Pending';
    if (item.status === RegistryItemStatus.APPROVED) return 'A - Approved';
    if (item.status === RegistryItemStatus.REJECTED) return 'R - Rejected';
    return item.status;
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

  async function approveItem(item: RegistryItem) {
    isProcessing.value = true;
    processingItemId.value = item.uniqueId;
    errorMessage.value = '';

    try {
      const { error } = await useFetch('/api/registry/queue/save', {
        method: 'POST',
        body: {
          uuid: item.uniqueId,
          details: item,
        },
      });

      if (error.value) {
        throw new Error(error.value.data?.message || 'Failed to approve item');
      }

      // Remove item from the list
      if (registryItems.value) {
        const index = registryItems.value.findIndex((i) => i.uniqueId === item.uniqueId);
        if (index !== -1) {
          registryItems.value.splice(index, 1);
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

  function confirmDelete(item: RegistryItem) {
    selectedItem.value = item;
    showDeleteDialog.value = true;
  }

  async function deleteItem() {
    if (!selectedItem.value) {
      showDeleteDialog.value = false;
      return;
    }

    isProcessing.value = true;
    processingItemId.value = selectedItem.value.uniqueId;
    errorMessage.value = '';

    try {
      const { error } = await useFetch('/api/registry/queue/reject', {
        method: 'POST',
        body: {
          uuid: selectedItem.value.uniqueId,
          details: selectedItem.value,
        },
      });

      if (error.value) {
        throw new Error(error.value.data?.message || 'Failed to delete item');
      }

      // Remove item from the list
      if (registryItems.value) {
        const index = registryItems.value.findIndex((i) => i.uniqueId === selectedItem.value?.uniqueId);
        if (index !== -1) {
          registryItems.value.splice(index, 1);
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
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Registry Queue</h1>
      <button class="btn btn-primary" @click="refresh" :disabled="isLoading">
        <span v-if="isLoading" class="loading loading-spinner"></span>
        {{ isLoading ? 'Loading...' : 'Refresh' }}
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
    <div v-else-if="!registryItems?.length" class="alert alert-info shadow-lg">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <span>No registry items in the queue.</span>
    </div>

    <!-- Registry Items Table -->
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
          <tr v-for="item in registryItems" :key="item.uniqueId">
            <td>{{ item.model || '-' }}</td>
            <td>{{ item.bodyNum || '-' }}</td>
            <td>{{ item.trim || '-' }}</td>
            <td>{{ item.submittedBy || '-' }}</td>
            <td>{{ item.submittedByEmail || '-' }}</td>
            <td class="text-center">{{ item.year || '-' }}</td>
            <td class="text-center">
              <span
                :class="{
                  'badge badge-warning': isPending(item),
                  'badge badge-success': item.status === RegistryItemStatus.APPROVED,
                  'badge badge-error': item.status === RegistryItemStatus.REJECTED,
                }"
              >
                {{ getStatusDisplay(item) }}
              </span>
            </td>
            <td class="space-x-2">
              <template v-if="isPending(item)">
                <button class="btn btn-sm btn-success" @click="approveItem(item)" :disabled="isProcessing">
                  <span
                    v-if="processingItemId === item.uniqueId && isProcessing"
                    class="loading loading-spinner loading-xs"
                  ></span>
                  Approve
                </button>
                <button class="btn btn-sm btn-error" @click="confirmDelete(item)" :disabled="isProcessing">
                  Reject
                </button>
              </template>
              <template v-else>
                <span class="text-gray-500 text-sm">No actions available</span>
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
        <p class="py-4">Are you sure you want to reject this registry item? This action cannot be undone.</p>
        <div class="modal-action">
          <button class="btn" @click="showDeleteDialog = false" :disabled="isProcessing">Cancel</button>
          <button class="btn btn-error" @click="deleteItem" :disabled="isProcessing">
            <span v-if="isProcessing" class="loading loading-spinner loading-xs"></span>
            Reject Item
          </button>
        </div>
      </div>
    </dialog>
  </div>
</template>
