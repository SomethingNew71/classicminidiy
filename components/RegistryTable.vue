<script setup lang="ts">
  import { ref, computed } from 'vue';
  import type { RegistryItem } from '~/data/models/registry';
  import { RegistryItemStatus } from '~/data/models/registry';

  interface Props {
    items: RegistryItem[] | null;
    loading?: boolean;
    tableHeaders?: { title: string; key: string; width?: string }[];
    defaultPageSize?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    loading: false,
    tableHeaders: () => [
      { title: 'Year', key: 'year' },
      { title: 'Model', key: 'model' },
      { title: 'Trim', key: 'trim' },
      { title: 'Color', key: 'color' },
    ],
    defaultPageSize: 10,
  });

  // State
  const searchValue = ref('');
  const expanded = ref<string[]>([]);
  const currentPage = ref(1);
  const pageSize = ref(props.defaultPageSize);

  // Helper function to get status priority for sorting
  const getStatusPriority = (status: string | undefined) => {
    if (!status) return 4; // No status - lowest priority
    switch (status) {
      case RegistryItemStatus.PENDING:
        return 1; // Highest priority
      case RegistryItemStatus.APPROVED:
        return 2;
      case RegistryItemStatus.REJECTED:
        return 3;
      default:
        return 4;
    }
  };

  // Filter items based on search and sort by status priority
  const filteredItems = computed(() => {
    if (!props.items) return null;

    // First filter by search term if provided
    let result = props.items;
    if (searchValue.value) {
      const search = searchValue.value.toLowerCase();
      result = result.filter((item) => {
        return Object.values(item).some((val) => val && typeof val === 'string' && val.toLowerCase().includes(search));
      });
    }

    // Then sort by status priority
    return [...result].sort((a, b) => {
      const priorityA = getStatusPriority(a.status);
      const priorityB = getStatusPriority(b.status);
      return priorityA - priorityB;
    });
  });

  // Calculate total pages
  const totalPages = computed(() => {
    if (!filteredItems.value) return 1;
    return Math.ceil(filteredItems.value.length / pageSize.value);
  });

  // Get paginated items
  const paginatedItems = computed(() => {
    if (!filteredItems.value) return [];
    const startIndex = (currentPage.value - 1) * pageSize.value;
    return filteredItems.value.slice(startIndex, startIndex + pageSize.value);
  });

  // Toggle expanded row
  const toggleExpanded = (id: string) => {
    const index = expanded.value.indexOf(id);
    if (index === -1) {
      expanded.value.push(id);
    } else {
      expanded.value.splice(index, 1);
    }
  };

  // Change page
  const changePage = (page: number) => {
    currentPage.value = page;
    // Reset expanded rows when changing pages
    expanded.value = [];
  };

  // Define type for pagination items
  type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end';

  // Helper function to convert status code to readable text
  const getStatusText = (status: string) => {
    switch (status) {
      case RegistryItemStatus.PENDING:
        return 'Pending';
      case RegistryItemStatus.APPROVED:
        return 'Approved';
      case RegistryItemStatus.REJECTED:
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  // Get pagination array
  const paginationArray = computed<PaginationItem[]>(() => {
    const pages: PaginationItem[] = [];
    const maxVisiblePages = 5;

    if (totalPages.value <= maxVisiblePages) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages.value; i++) {
        pages.push(i);
      }
    } else {
      // Show a subset of pages with ellipsis
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let startPage = Math.max(currentPage.value - halfVisible, 1);
      let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages.value);

      // Adjust if we're near the end
      if (endPage === totalPages.value) {
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
      }

      // Add first page and ellipsis if needed
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push('ellipsis-start');
      }

      // Add visible page numbers
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis and last page if needed
      if (endPage < totalPages.value) {
        if (endPage < totalPages.value - 1) pages.push('ellipsis-end');
        pages.push(totalPages.value);
      }
    }

    return pages;
  });
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <div class="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        <div class="form-control w-full max-w-md">
          <div class="input-group">
            <input
              type="text"
              v-model="searchValue"
              placeholder="Search for any detail"
              class="input input-bordered w-full"
            />
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div v-if="items?.length" class="badge badge-primary badge-lg">{{ items?.length }} Total Minis</div>
          <div class="form-control">
            <select v-model="pageSize" class="select select-bordered select-sm">
              <option :value="10">10 per page</option>
              <option :value="25">25 per page</option>
              <option :value="50">50 per page</option>
              <option :value="100">100 per page</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center py-8">
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <thead>
            <tr>
              <th class="w-10"></th>
              <th v-for="header in tableHeaders" :key="header.key" :class="header.width ? `w-[${header.width}]` : ''">
                {{ header.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="paginatedItems.length">
              <template v-for="(item, index) in paginatedItems" :key="item.uniqueId">
                <tr class="hover:bg-base-200 cursor-pointer" @click="toggleExpanded(item.uniqueId)">
                  <td>
                    <button class="btn btn-ghost btn-xs">
                      <i
                        :class="
                          expanded.includes(item.uniqueId) ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right'
                        "
                      ></i>
                    </button>
                  </td>
                  <td v-for="header in tableHeaders" :key="header.key">
                    <template v-if="header.key === 'status' && item.status">
                      <div
                        class="badge"
                        :class="{
                          'badge-primary': item.status === RegistryItemStatus.PENDING,
                          'badge-success': item.status === RegistryItemStatus.APPROVED,
                          'badge-error': item.status === RegistryItemStatus.REJECTED,
                        }"
                      >
                        {{ getStatusText(item.status) }}
                      </div>
                    </template>
                    <template v-else>{{ item[header.key] || '-' }}</template>
                  </td>
                </tr>
                <tr v-if="expanded.includes(item.uniqueId)" class="bg-base-200">
                  <td></td>
                  <td colspan="2" class="p-4">
                    <div class="grid grid-cols-1 gap-2">
                      <div>
                        <strong>Build Date:</strong>
                        <div>{{ item.buildDate || '---' }}</div>
                      </div>
                      <div>
                        <strong>Body #:</strong>
                        <div>{{ item.bodyNum || '---' }}</div>
                      </div>
                      <div>
                        <strong>Engine #:</strong>
                        <div>{{ item.engineNum || '---' }}</div>
                      </div>
                    </div>
                  </td>
                  <td colspan="2" class="p-4">
                    <div class="grid grid-cols-1 gap-2">
                      <div>
                        <strong>Submitted by:</strong>
                        <div>{{ item.submittedBy || '---' }}</div>
                      </div>
                      <div>
                        <strong>Notes:</strong>
                        <div>{{ item.notes || '---' }}</div>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </template>
            <tr v-else>
              <td colspan="5" class="text-center py-8">No items found</td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="flex justify-center mt-6" v-if="totalPages > 1">
          <div class="join">
            <!-- Previous button -->
            <button
              class="join-item btn"
              :class="{ 'btn-disabled': currentPage === 1 }"
              @click="currentPage > 1 && changePage(currentPage - 1)"
            >
              <i class="fa-solid fa-chevron-left"></i>
            </button>

            <!-- Page numbers -->
            <template v-for="(page, index) in paginationArray" :key="index">
              <button v-if="page === 'ellipsis-start' || page === 'ellipsis-end'" class="join-item btn btn-disabled">
                ...
              </button>
              <button
                v-else
                class="join-item btn"
                :class="{ 'btn-active': currentPage === page }"
                @click="changePage(page as number)"
              >
                {{ page }}
              </button>
            </template>

            <!-- Next button -->
            <button
              class="join-item btn"
              :class="{ 'btn-disabled': currentPage === totalPages }"
              @click="currentPage < totalPages && changePage(currentPage + 1)"
            >
              <i class="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  // DaisyUI specific styles
  .table-container {
    overflow-x: auto;
    width: 100%;
  }

  // Ensure proper spacing in expanded rows
  .expanded-content {
    padding: 1rem;
    background-color: hsl(var(--b2));
  }
</style>
