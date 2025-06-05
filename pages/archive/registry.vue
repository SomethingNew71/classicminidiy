<script lang="ts" setup>
  const searchValue = ref('');
  const expanded = ref<string[]>([]);
  const currentPage = ref(1);
  const pageSize = ref(10);
  import { HERO_TYPES } from '~/data/models/generic';
  import type { RegistryItem } from '~/data/models/registry';

  // Define table columns
  const tableHeaders = [
    { title: 'Year', key: 'year' },
    { title: 'Model', key: 'model' },
    { title: 'Trim', key: 'trim' },
    { title: 'Color', key: 'color' },
  ];

  const { data: registryItems, status } = await useFetch<RegistryItem[]>('/api/registry/list');

  // Toggle expanded row
  const toggleExpanded = (id: string) => {
    const index = expanded.value.indexOf(id);
    if (index === -1) {
      expanded.value.push(id);
    } else {
      expanded.value.splice(index, 1);
    }
  };

  // Filter items based on search
  const filteredItems = computed(() => {
    if (!searchValue.value || !registryItems.value) return registryItems.value;

    const search = searchValue.value.toLowerCase();
    return registryItems.value.filter((item) => {
      return Object.values(item).some((val) => val && typeof val === 'string' && val.toLowerCase().includes(search));
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

  // Change page
  const changePage = (page: number) => {
    currentPage.value = page;
    // Reset expanded rows when changing pages
    expanded.value = [];
  };

  // Define type for pagination items
  type PaginationItem = number | 'ellipsis-start' | 'ellipsis-end';

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

  useHead({
    title: 'Archive - The Classic Mini Register',
    meta: [
      {
        key: 'description',
        name: 'description',
        content: 'Complete compendium of all known minis, as submitted by their owners.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: 'Archive - The Classic Mini Register',
    ogDescription: 'Complete compendium of all known minis, as submitted by their owners.',
    ogUrl: 'classicminidiy.com/archive/register',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/misc/archive-seo.jpg',
    ogType: 'website',
  });
</script>

<template>
  <hero :navigation="true" :title="'Mini Registry'" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" page="Mini Registry"></breadcrumb>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-3xl font-bold">The Classic Mini Registry</h1>
            <h2 class="text-xl mt-4">
              <strong>{{ registryItems?.length || 'Tons of' }}</strong> Minis added, and growing every day!
            </h2>
            <p class="my-4">
              After watching many of the long standing Classic Mini Registry's start to go offline, or no longer get
              maintained. I decided it was time to stand something up I know will be here and maintained for many years
              to come. Classic Mini DIY is proud to now provide a <strong>free</strong> online register for all Classic
              Mini's of all model years and styles.
            </p>
            <p class="font-bold mt-4 mb-5">Looking for the status of your submission?</p>
            <a
              class="btn btn-primary"
              target="_blank"
              href="https://github.com/SomethingNew71/classicminidiy/issues?q=is%3Aissue%20"
            >
              <i class="fa-duotone fa-clipboard-question mr-2"></i>
              Track your Submission
            </a>
          </div>
          <div class="col-span-12 md:col-span-4">
            <a href="#submitAnchor" class="block">
              <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div class="card-body">
                  <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                      <figure class="w-16 h-16">
                        <picture>
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-book-reading-100.webp"
                            type="image/webp"
                          />
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-book-reading-100.png"
                            type="image/png"
                          />
                          <nuxt-img
                            loading="lazy"
                            src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-book-reading-100.png"
                            alt="Image of compression calculator"
                            class="w-16 h-16"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div>
                      <h2 class="card-title">Submit Your Mini Today</h2>
                      <p>
                        Click here to fill out our short form to submit your mini to our registry of all classic minis
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="col-span-12">
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
                <div v-if="registryItems?.length" class="badge badge-primary badge-lg">
                  {{ registryItems?.length }} Total Minis
                </div>
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
            <div v-if="status === 'pending'" class="flex justify-center items-center py-8">
              <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>

            <!-- Table -->
            <div v-else class="overflow-x-auto">
              <table class="table table-zebra w-full">
                <thead>
                  <tr>
                    <th class="w-10"></th>
                    <th v-for="header in tableHeaders" :key="header.key">{{ header.title }}</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(item, index) in paginatedItems" :key="item.uniqueId">
                    <tr class="hover:bg-base-200 cursor-pointer" @click="toggleExpanded(item.uniqueId)">
                      <td>
                        <button class="btn btn-ghost btn-xs">
                          <i
                            :class="
                              expanded.includes(item.uniqueId)
                                ? 'fa-solid fa-chevron-down'
                                : 'fa-solid fa-chevron-right'
                            "
                          ></i>
                        </button>
                      </td>
                      <td v-for="header in tableHeaders" :key="header.key">{{ item[header.key] }}</td>
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
                    <button
                      v-if="page === 'ellipsis-start' || page === 'ellipsis-end'"
                      class="join-item btn btn-disabled"
                    >
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
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider" id="submitAnchor">Add your Mini to the Registry - Its free!</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <RegistrySubmission></RegistrySubmission>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">Other ways to support</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
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
