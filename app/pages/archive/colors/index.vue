<script lang="ts" setup>
  import type { Color } from '../../../../data/models/colors';
  import { HERO_TYPES } from '../../../../data/models/generic';

  const { data: colors, pending } = await useFetch<Color[]>('/api/colors/list');
  const search = ref('');
  const currentPage = ref(1);
  const itemsPerPage = 10;

  const tableHeaders = [
    { title: 'Share', key: 'share' },
    { title: 'Color Name', key: 'name' },
    { title: 'Swatch', key: 'imageSwatch' },
    { title: 'Short Code', key: 'shortCode' },
    { title: 'BMC Code', key: 'code' },
    { title: 'Ditzler/PPG Code', key: 'ditzlerPpgCode' },
    { title: 'Dulux Code', key: 'duluxCode' },
    { title: 'Years Used', key: 'years' },
    { title: 'Edit', key: 'edit' },
  ];

  const filteredColors = computed(() => {
    if (!colors.value) return [];
    if (!search.value.trim()) return colors.value;

    const searchTerm = search.value.toLowerCase().trim();
    return colors.value.filter(
      (color) =>
        (color.name?.toLowerCase() || '').includes(searchTerm) ||
        (color.shortCode?.toLowerCase() || '').includes(searchTerm) ||
        (color.code?.toLowerCase() || '').includes(searchTerm) ||
        (color.ditzlerPpgCode?.toLowerCase() || '').includes(searchTerm) ||
        (color.duluxCode?.toLowerCase() || '').includes(searchTerm)
    );
  });

  const paginatedColors = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredColors.value.slice(start, start + itemsPerPage);
  });

  const totalPages = computed(() => {
    return Math.ceil(filteredColors.value.length / itemsPerPage);
  });

  const shareColor = (color: Color) => {
    const url = `${window.location.origin}/archive/colors/${color.id}`;

    if (navigator.share) {
      navigator
        .share({
          title: `Classic Mini Color: ${color.name || 'Unnamed Color'}`,
          text: `Check out this Classic Mini color: ${color.name || 'Unnamed Color'}`,
          url,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    }
  };

  // Reset to first page when search changes
  watch(search, () => {
    currentPage.value = 1;
  });

  useHead({
    title: 'Classic Mini Color Picker',
    meta: [
      {
        name: 'description',
        content: 'Find the perfect color for your Classic Mini with our comprehensive color picker.',
      },
    ],
  });
</script>

<template>
  <hero :navigation="true" :title="'Color Picker'" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4">
    <!-- Breadcrumb -->
    <!-- Header -->
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <breadcrumb class="my-6" page="Color Swatches" />
        <h1 class="text-3xl font-bold mb-4">Classic Mini Color Picker</h1>
        <p class="mb-6 text-base">
          In an effort to make more information available, Classic Mini DIY has partnered with
          <a href="http://mini-colours.co.uk" class="link link-primary">mini-colours.co.uk</a> to provide you with a
          comprehensive list of the colors used on the Classic Mini throughout the years.
        </p>
        <div class="divider"></div>
      </div>

      <!-- Search and Table Card -->
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="card bg-base-100 shadow-xl mb-8">
          <div class="card-body p-0">
            <!-- Card Header with Search -->
            <div class="p-4 border-b border-base-300 flex flex-col md:flex-row justify-between items-center gap-4">
              <div class="flex items-center gap-2">
                <i class="fas fa-tire fa-spin text-primary text-2xl"></i>
                <h2 class="text-2xl font-semibold">Find your Color</h2>
              </div>
              <div class="relative w-full md:w-96">
                <input
                  v-model="search"
                  type="text"
                  placeholder="Search colors..."
                  class="input input-bordered w-full pl-10"
                />
                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            <!-- Help Text -->
            <div class="p-4">
              <p class="text-base">
                Use the search above to filter for any field in the table below instantly. Notice some data missing?
                Click the edit button to contribute!
              </p>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
              <table class="table w-full">
                <thead>
                  <tr>
                    <th
                      v-for="header in tableHeaders"
                      :key="header.key"
                      class="bg-base-200"
                      :class="{ 'text-center': header.key === 'edit' }"
                    >
                      {{ header.title }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Loading State -->
                  <template v-if="pending">
                    <tr v-for="i in 5" :key="'skeleton-' + i">
                      <td v-for="header in tableHeaders" :key="header.key">
                        <div class="skeleton h-4 w-3/4"></div>
                      </td>
                    </tr>
                  </template>

                  <!-- Empty State -->
                  <template v-else-if="!filteredColors.length">
                    <tr>
                      <td :colspan="tableHeaders.length" class="text-center p-8">
                        <div class="alert alert-info">
                          <i class="fas fa-info-circle mr-2"></i>
                          No colors found matching your search.
                        </div>
                      </td>
                    </tr>
                  </template>

                  <!-- Data Rows -->
                  <template v-else v-for="color in paginatedColors" :key="color.id">
                    <tr class="hover">
                      <!-- Share Button -->
                      <td>
                        <button @click="shareColor(color)" class="btn btn-ghost btn-md">
                          <i class="fas fa-share"></i>
                        </button>
                      </td>

                      <!-- Color Name -->
                      <td>
                        <NuxtLink :to="'/archive/colors/' + color.id" class="link link-primary">
                          {{ color.name || 'Unnamed Color' }}
                        </NuxtLink>
                      </td>

                      <!-- Color Swatch -->
                      <td class="">
                        <div class="inline-block">
                          <picture v-if="color.hasSwatch">
                            <source
                              :srcset="`https://classicminidiy.s3.amazonaws.com/colors/${color.code}.webp`"
                              type="image/webp"
                            />
                            <source
                              :srcset="`https://classicminidiy.s3.amazonaws.com/colors/${color.code}.jpg`"
                              type="image/jpeg"
                            />
                            <img
                              loading="lazy"
                              width="40"
                              height="40"
                              :alt="`${color.name || 'Color'} swatch`"
                              :src="`https://classicminidiy.s3.amazonaws.com/colors/${color.code}.jpg`"
                              class="w-10 h-10 object-cover rounded border border-base-300"
                            />
                          </picture>

                          <div v-else class="w-10 h-10 flex items-center justify-center">
                            <i class="fa-regular fa-square-xmark text-4xl text-gray-400"></i>
                          </div>
                        </div>
                      </td>

                      <!-- Short Code -->
                      <td>
                        <span v-if="color.shortCode && color.shortCode !== 'Unknown'" class="font-medium">
                          {{ color.shortCode }}
                        </span>
                        <span v-else class="badge badge-error badge-soft">Missing</span>
                      </td>

                      <!-- BMC Code -->
                      <td>
                        <span v-if="color.code && color.code !== 'Unknown'" class="font-medium">
                          {{ color.code }}
                        </span>
                        <span v-else class="badge badge-error badge-soft">Missing</span>
                      </td>

                      <!-- Ditzler/PPG Code -->
                      <td>
                        <span v-if="color.ditzlerPpgCode && color.ditzlerPpgCode !== 'Unknown'" class="font-medium">
                          {{ color.ditzlerPpgCode }}
                        </span>
                        <span v-else class="badge badge-error badge-soft">Missing</span>
                      </td>

                      <!-- Dulux Code -->
                      <td>
                        <span v-if="color.duluxCode && color.duluxCode !== 'Unknown'" class="font-medium">
                          {{ color.duluxCode }}
                        </span>
                        <span v-else class="badge badge-error badge-soft">Missing</span>
                      </td>

                      <!-- Years Used -->
                      <td>
                        <span v-if="color.years && color.years !== 'Unknown'" class="font-medium">
                          {{ Array.isArray(color.years) ? color.years.join(', ') : color.years }}
                        </span>
                        <span v-else class="badge badge-error badge-soft">Missing</span>
                      </td>

                      <!-- Edit Button -->
                      <td class="text-center">
                        <NuxtLink :to="'/archive/colors/contribute?color=' + color.id" class="btn btn-ghost btn-md">
                          <i class="fas fa-edit"></i>
                        </NuxtLink>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div v-if="filteredColors.length > itemsPerPage" class="flex justify-center p-4 border-t border-base-300">
              <div class="join">
                <button
                  class="join-item btn btn-md"
                  :disabled="currentPage === 1"
                  @click="currentPage = Math.max(1, currentPage - 1)"
                >
                  «
                </button>
                <button class="join-item btn btn-md">Page {{ currentPage }} of {{ totalPages }}</button>
                <button
                  class="join-item btn btn-md"
                  :disabled="currentPage >= totalPages"
                  @click="currentPage = Math.min(totalPages, currentPage + 1)"
                >
                  »
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Support Section -->
      <div class="col-span-12 md:col-span-10 md:col-start-2 text-center py-8">
        <div class="divider">Support</div>
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>
