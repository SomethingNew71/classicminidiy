<script lang="ts" setup>
  import type { IWheelsData } from '~/data/models/wheels';

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

  // Derived state with memoization
  const allOffsets = computed(() => {
    if (!wheels.value?.length) return [];

    // Use Set for deduplication and performance
    const offsetSet = new Set<string>();
    wheels.value.forEach((wheel) => {
      const trimmedOffset = wheel.offset?.trim() || '';
      if (trimmedOffset) offsetSet.add(trimmedOffset);
    });

    return Array.from(offsetSet).sort();
  });

  const allMaterials = computed(() => {
    if (!wheels.value?.length) return [];

    // Use Set for deduplication and performance
    const materialSet = new Set<string>();
    wheels.value.forEach((wheel) => {
      const trimmedType = wheel.type?.trim() || '';
      if (trimmedType) materialSet.add(trimmedType);
    });

    return Array.from(materialSet).sort();
  });

  // Efficient filtering with memoization
  const filteredWheels = computed(() => {
    if (!wheels.value?.length) return [];

    // Convert search to lowercase once for performance
    const searchLower = search.value.toLowerCase();
    const hasOffsetFilter = selectedOffsets.value.length > 0;
    const hasMaterialFilter = selectedMaterials.value.length > 0;

    return wheels.value.filter((wheel) => {
      // Only perform string operations when necessary
      const searchMatch = !searchLower || wheel.name.toLowerCase().includes(searchLower);

      // Only check filter matches when filters are active
      const offsetMatch = !hasOffsetFilter || selectedOffsets.value.includes(wheel.offset?.trim() || '');
      const materialMatch = !hasMaterialFilter || selectedMaterials.value.includes(wheel.type?.trim() || '');

      return searchMatch && offsetMatch && materialMatch;
    });
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
  <div class="card bg-base-100 shadow-lg" :class="{ loading: status === 'pending' }">
    <!-- Header section -->
    <div class="card-body pb-0">
      <div class="flex items-center justify-between mb-4">
        <h2 class="card-title"><i class="fad fa-tire fa-spin mr-2"></i> Find Wheels</h2>
      </div>

      <div class="mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="col-span-1 md:col-span-1">
            <div class="btn-group w-full">
              <button
                class="btn flex-1"
                :class="{ 'btn-primary': size === 'list', 'btn-outline': size !== 'list' }"
                @click="size = 'list'"
              >
                All
              </button>
              <button
                class="btn flex-1"
                :class="{ 'btn-primary': size === 'ten', 'btn-outline': size !== 'ten' }"
                @click="size = 'ten'"
              >
                10
              </button>
              <button
                class="btn flex-1"
                :class="{ 'btn-primary': size === 'twelve', 'btn-outline': size !== 'twelve' }"
                @click="size = 'twelve'"
              >
                12
              </button>
              <button
                class="btn flex-1"
                :class="{ 'btn-primary': size === 'thirteen', 'btn-outline': size !== 'thirteen' }"
                @click="size = 'thirteen'"
              >
                13
              </button>
            </div>
          </div>
        </div>

        <div class="form-control mb-4">
          <div class="input-group w-full">
            <span><i class="fad fa-search"></i></span>
            <input
              v-model="search"
              type="text"
              placeholder="Search for anything (ex. Momos, 10in, ET20)"
              class="input input-bordered w-full"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Offsets</span>
              </label>
              <select class="select select-bordered w-full" multiple v-model="selectedOffsets">
                <option v-for="offset in allOffsets" :key="offset" :value="offset">{{ offset }}</option>
              </select>
              <div v-if="selectedOffsets.length > 0" class="flex flex-wrap gap-2 mt-2">
                <div
                  v-for="(offset, index) in selectedOffsets.slice(0, 2)"
                  :key="index"
                  class="badge badge-primary badge-outline"
                >
                  {{ offset }}
                </div>
                <div v-if="selectedOffsets.length > 2" class="badge badge-ghost">
                  +{{ selectedOffsets.length - 2 }} others
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Material</span>
              </label>
              <select class="select select-bordered w-full" multiple v-model="selectedMaterials">
                <option v-for="material in allMaterials" :key="material" :value="material">{{ material }}</option>
              </select>
              <div v-if="selectedMaterials.length > 0" class="flex flex-wrap gap-2 mt-2">
                <div
                  v-for="(material, index) in selectedMaterials.slice(0, 2)"
                  :key="index"
                  class="badge badge-secondary badge-outline"
                >
                  {{ material }}
                </div>
                <div v-if="selectedMaterials.length > 2" class="badge badge-ghost">
                  +{{ selectedMaterials.length - 2 }} others
                </div>
              </div>
            </div>
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

      <!-- Wheels grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <NuxtLink
          v-for="wheel in filteredWheels.slice((page - 1) * 12, page * 12)"
          :key="wheel.uuid"
          :to="`/archive/wheels/${wheel.uuid}`"
          class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow"
        >
          <figure class="relative">
            <img :src="getWheelImageUrl(wheel)" :alt="`${wheel.name} wheel`" class="h-48 w-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
            <div class="absolute top-2 right-2">
              <div v-if="wheel.size === '10'" class="badge badge-success">{{ wheel.size }}in</div>
              <div v-if="wheel.size === '12'" class="badge badge-warning">{{ wheel.size }}in</div>
              <div v-if="wheel.size === '13'" class="badge badge-info">{{ wheel.size }}in</div>
            </div>
            <div class="absolute bottom-0 left-0 p-4 text-white">
              <h2 class="font-bold text-lg">{{ wheel.name }}</h2>
            </div>
          </figure>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-if="filteredWheels.length === 0 && !error" class="text-center py-8">
        <div class="card bg-base-200">
          <div class="card-body">
            <p>No wheels meeting current filters exist</p>
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

    <!-- Loading state -->
    <div v-if="status === 'pending'" class="p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div v-for="index in 12" :key="`skeleton-${index}`" class="skeleton h-48 w-full"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .wheel-chip {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 0.5rem;
    margin-right: 0.3rem;
  }
</style>
