<script lang="ts" setup>
  import type { IWheelsData } from '../../data/models/wheels';
  import Fuse from 'fuse.js';

  // State management with proper typing
  const search = ref('');
  const size = ref('list');
  const page = ref(1);
  const selectedOffsets = ref<string[]>([]);
  const selectedMaterials = ref<string[]>([]);

  // Fetch wheels data with error handling
  const {
    data: wheels,
    status,
    error,
  } = await useFetch<IWheelsData[]>(() => `/api/wheels/${size.value}`, {
    watch: [size], // Automatically refetch when size changes
    default: () => [], // Provide default value to prevent null reference errors
  });

  // Create a Fuse instance for fuzzy searching with memoization
  const fuseInstance = computed(() => {
    if (!wheels.value?.length) return null;

    // Configure Fuse.js options
    const options = {
      keys: ['name', 'size', 'width', 'offset', 'type'],
      threshold: 0.4, // Lower threshold means more strict matching
      ignoreLocation: true,
      shouldSort: true,
    };

    return new Fuse(wheels.value, options);
  });

  // Efficient filtering with memoization using Fuse.js
  const filteredWheels = computed(() => {
    if (!wheels.value?.length) return [];
    const hasOffsetFilter = selectedOffsets.value.length > 0;
    const hasMaterialFilter = selectedMaterials.value.length > 0;
    // First apply material and offset filters
    let results = wheels.value.filter((wheel) => {
      // Only check filter matches when filters are active
      const offsetMatch = !hasOffsetFilter || selectedOffsets.value.includes(wheel.offset?.trim() || '');
      const materialMatch = !hasMaterialFilter || selectedMaterials.value.includes(wheel.type?.trim() || '');
      return offsetMatch && materialMatch;
    });

    // Then apply Fuse.js search if search term exists
    if (search.value && fuseInstance.value) {
      results = fuseInstance.value.search(search.value).map((result) => result.item);
    }

    return results;
  });

  // Computed property for active filters state
  const filtersActive = computed(
    () => selectedOffsets.value.length > 0 || selectedMaterials.value.length > 0 || search.value !== ''
  );

  // Helper function to clear all filters
  function clearFilters() {
    search.value = '';
    selectedOffsets.value = [];
    selectedMaterials.value = [];
  }

  // Default fallback image URL for reuse
  const DEFAULT_WHEEL_IMAGE = 'https://classicminidiy.s3.us-east-1.amazonaws.com/wheels/missing-wheel-image.png';

  // Helper function to get proper image URL with fallback
  function getWheelImageUrl(wheel: IWheelsData): string {
    if (
      !wheel.images?.[0]?.src ||
      wheel.images[0].src === 'https://classicminidiy.s3.amazonaws.com/cloud-icon/missing.svg'
    ) {
      return DEFAULT_WHEEL_IMAGE;
    }
    return wheel.images[0].src;
  }
</script>

<template>
  <div class="card bg-base-100 shadow-lg">
    <!-- Header section -->
    <div class="card-body pb-0">
      <div class="flex items-center justify-between mb-4">
        <h2 class="card-title"><i class="fad fa-tire fa-spin mr-2"></i> Find Wheels</h2>
        <div v-if="filtersActive" class="tooltip tooltip-left" data-tip="Clear Filters">
          <button class="btn btn-ghost btn-sm" @click="clearFilters">
            <i class="fas fa-filter-circle-xmark"></i>
            Clear Filters
          </button>
        </div>
      </div>

      <div class="mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="col-span-1 md:col-span-1 mb-4">
            <form class="filter">
              <input
                type="radio"
                name="wheel-size"
                class="btn filter-reset"
                :class="{ 'btn-primary': size === 'list' }"
                @change="size = 'list'"
                :checked="size === 'list'"
                aria-label="All Sizes"
              />
              <input
                type="radio"
                name="wheel-size"
                class="btn"
                :class="{ 'btn-primary': size === 'ten' }"
                @change="size = 'ten'"
                :checked="size === 'ten'"
                aria-label='10" Wheels'
              />
              <input
                type="radio"
                name="wheel-size"
                class="btn"
                :class="{ 'btn-primary': size === 'twelve' }"
                @change="size = 'twelve'"
                :checked="size === 'twelve'"
                aria-label='12" Wheels'
              />
              <input
                type="radio"
                name="wheel-size"
                class="btn"
                :class="{ 'btn-primary': size === 'thirteen' }"
                @change="size = 'thirteen'"
                :checked="size === 'thirteen'"
                aria-label='13" Wheels'
              />
            </form>
          </div>
        </div>

        <div class="form-control">
          <div class="input-group w-full">
            <label class="input w-full">
              <span class="label"><i class="fad fa-search"></i></span>
              <input v-model="search" type="text" placeholder="Search for anything (ex. Momos, 10in, ET20)" />
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Content section -->
    <div class="p-4">
      <!-- Error state -->
      <div v-if="error" class="alert alert-error">
        <i class="fas fa-exclamation-circle"></i>
        <span>{{ error.message || 'Error loading wheels' }}</span>
      </div>

      <!-- Loading state -->
      <div v-else-if="status === 'pending'" class="flex justify-center p-8">
        <span class="loading loading-spinner loading-lg"></span>
      </div>

      <!-- No results -->
      <div v-else-if="filteredWheels.length === 0" class="text-center p-8">
        <i class="fas fa-tire text-6xl text-gray-400 mb-4"></i>
        <h3 class="text-xl font-semibold mb-2">No wheels found</h3>
        <p class="text-gray-500">Try adjusting your search or filters</p>
      </div>

      <!-- Grid of wheels -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="wheel in filteredWheels.slice((page - 1) * 12, page * 12)"
          :key="wheel.uuid"
          class="card card-compact bg-base-100 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <figure class="relative pt-[100%] bg-gray-100">
            <img
              :src="getWheelImageUrl(wheel)"
              :alt="wheel.name"
              class="absolute inset-0 w-full h-full object-contain p-4"
              loading="lazy"
            />
          </figure>
          <div class="card-body">
            <h3 class="card-title text-lg">{{ wheel.name }}</h3>
            <div class="grid grid-cols-2 gap-2 text-sm">
              <div>
                <div class="text-gray-500">Size</div>
                <div class="font-medium">{{ wheel.size || 'N/A' }}</div>
              </div>
              <div>
                <div class="text-gray-500">Width</div>
                <div class="font-medium">{{ wheel.width || 'N/A' }}</div>
              </div>
              <div>
                <div class="text-gray-500">Offset</div>
                <div class="font-medium">{{ wheel.offset || 'N/A' }}</div>
              </div>
              <div>
                <div class="text-gray-500">Material</div>
                <div class="font-medium">{{ wheel.type || 'N/A' }}</div>
              </div>
            </div>
            <div class="card-actions justify-end mt-2">
              <NuxtLink :to="`/archive/wheels/${wheel.uuid}`" class="btn btn-sm btn-secondary"> View Details </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination footer -->
    <div class="flex items-center justify-center p-4">
      <div class="join">
        <button class="join-item btn" :class="{ 'btn-disabled': page === 1 }" @click="page > 1 && page--">
          <i class="fad fa-arrow-left"></i>
        </button>
        <button class="join-item btn btn-ghost">Page {{ page }} of {{ Math.ceil(filteredWheels.length / 12) }}</button>
        <button
          class="join-item btn"
          :class="{ 'btn-disabled': page >= Math.ceil(filteredWheels.length / 12) }"
          @click="page < Math.ceil(filteredWheels.length / 12) && page++"
        >
          <i class="fad fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .wheel-chip {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 1;
    backdrop-filter: blur(4px);
    background-color: rgba(255, 255, 255, 0.8);
  }

  /* Custom styling for multi-select dropdowns */
  select[multiple] {
    min-height: 6rem;
  }

  /* Loading state for the card */
  .loading {
    position: relative;
    pointer-events: none;
  }

  .loading::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.7);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loading::before {
    content: '';
    width: 2rem;
    height: 2rem;
    border: 3px solid #3b82f6;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    z-index: 11;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
