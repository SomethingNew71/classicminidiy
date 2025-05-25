<script lang="ts" setup>
  import type { AdvertsCollectionItem, ContentCollectionItem, ManualsCollectionItem } from '@nuxt/content';
  import type { PropType } from 'vue';
  import { shareArchiveItem, submitArchiveFile, type ARCHIVE_TYPES } from '~/data/models/helper-utils';

  const search = ref('');
  const currentPage = ref(1);
  const itemsPerPage = 12;

  const props = defineProps({
    archiveType: {
      type: String as PropType<ARCHIVE_TYPES>,
      default: '',
    },
    content: {
      type: Array as PropType<AdvertsCollectionItem[] | ManualsCollectionItem[] | ContentCollectionItem[] | null>,
      default: () => [],
    },
    loading: {
      type: String as PropType<'idle' | 'pending' | 'success' | 'error'>,
      default: 'idle',
    },
  });

  const filteredItems = computed(() => {
    if (!props.content) return [];

    return props.content.filter((item) => {
      const searchLower = search.value.toLowerCase();
      if (!searchLower) return true;

      return (
        item.title?.toLowerCase().includes(searchLower) ||
        item.description?.toLowerCase().includes(searchLower) ||
        item.code?.toLowerCase().includes(searchLower)
      );
    });
  });

  const paginatedItems = computed(() => {
    const startIndex = (currentPage.value - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredItems.value.slice(startIndex, endIndex);
  });

  const pageCount = computed(() => {
    return Math.ceil(filteredItems.value.length / itemsPerPage);
  });

  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  }

  function nextPage() {
    if (currentPage.value < pageCount.value) {
      currentPage.value++;
    }
  }
</script>

<template>
  <div class="w-full">
    <!-- Search Header -->
    <div class="mb-8 w-full">
      <div class="form-control w-full">
        <div class="input-group w-full">
          <span class="input-group-addon">
            <i class="fad fa-search"></i>
          </span>
          <input
            type="text"
            v-model="search"
            placeholder="Search for anything (ex. MPI, Cooper S, Carburettor HIF44)"
            class="input input-bordered w-full"
          />
        </div>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading === 'pending'" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="k in 12" :key="k" class="card card-bordered bg-base-100 shadow-sm animate-pulse">
        <div class="h-[150px] bg-base-200"></div>
        <div class="card-body">
          <div class="h-4 bg-base-200 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-base-200 rounded w-1/2 mb-4"></div>
          <div class="h-3 bg-base-200 rounded w-full"></div>
          <div class="card-actions justify-between mt-4">
            <div class="h-8 bg-base-200 rounded w-1/4"></div>
            <div class="h-8 bg-base-200 rounded w-1/4"></div>
            <div class="h-8 bg-base-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Grid -->
    <div v-else>
      <!-- Empty State -->
      <div v-if="filteredItems.length === 0" class="text-center py-8">
        <div class="card card-bordered bg-base-100 shadow-sm">
          <div class="card-body">
            <p class="text-base-content">No items meeting current filters exist</p>
          </div>
        </div>
      </div>

      <!-- Items Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="item in paginatedItems" :key="item.title" class="card card-bordered bg-base-100 shadow-sm">
          <!-- Image Section -->
          <figure v-if="item.image && item.image !== ''">
            <a v-if="item.download && item.download !== ''" :href="item.download">
              <img :src="item.image" alt="item.title" class="h-[150px] w-full object-cover" />
            </a>
            <img v-else :src="item.image" alt="item.title" class="h-[150px] w-full object-cover" />
          </figure>
          <div v-else class="flex justify-center items-center h-[150px] bg-base-200">
            <i class="fad fa-image-slash text-4xl text-base-content/50"></i>
          </div>

          <!-- File Type Icon -->
          <div class="absolute top-2 right-2">
            <i
              v-if="item.download"
              :class="[
                'fad',
                'fa-file-' + (item?.download?.split('.').pop()?.toLowerCase() || ''),
                'text-2xl',
                'text-secondary',
              ]"
            ></i>
          </div>

          <div class="card-body p-4">
            <!-- Title and Code -->
            <h2 class="card-title text-lg font-bold">{{ item.title }}</h2>
            <p class="text-sm text-base-content/70">Sort Key: {{ item.code }}</p>

            <!-- Description -->
            <p class="text-sm my-2">{{ item.description }}</p>

            <!-- Actions -->
            <div class="card-actions justify-between mt-4">
              <button class="btn btn-sm btn-outline" @click="shareArchiveItem(item.title, item.path)">
                <i class="fad fa-arrow-up-from-bracket mr-1"></i> Share
              </button>

              <button
                class="btn btn-sm btn-outline btn-info"
                @click="submitArchiveFile(archiveType, item.title, item.path, item.code, item.description)"
              >
                <i class="fad fa-plus-large mr-1"></i> Contribute
              </button>

              <a v-if="item.download && item.download !== ''" class="btn btn-sm btn-primary" :href="item.download">
                <i class="fad fa-download mr-1"></i> Download
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pageCount > 1" class="flex justify-center items-center mt-8 space-x-2">
        <button class="btn btn-circle btn-sm" :disabled="currentPage === 1" @click="prevPage">
          <i class="fad fa-arrow-left"></i>
        </button>

        <span class="text-sm">Page {{ currentPage }} of {{ pageCount }}</span>

        <button class="btn btn-circle btn-sm" :disabled="currentPage >= pageCount" @click="nextPage">
          <i class="fad fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .card-title,
  .card-body p {
    -webkit-hyphens: unset;
    hyphens: unset;
    overflow-wrap: unset;
    overflow: unset;
    white-space: unset;
    text-overflow: unset;
    word-break: unset;
    word-wrap: unset;
  }
</style>
