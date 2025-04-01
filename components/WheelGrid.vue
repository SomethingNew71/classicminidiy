<script lang="ts" setup>
  import type { IWheelsData } from '~/data/models/wheels';

  // State management with proper typing
  const search = ref('');
  const size = ref('list');
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
  <v-data-iterator :loading="status === 'pending'" :items="filteredWheels" :items-per-page="12" :search="search">
    <template v-slot:header>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon hydrate-on-visible icon="fad fa-tire fa-spin" class="me-1 py-2"></v-icon> &nbsp; Find Wheels
        <v-spacer></v-spacer>
      </v-card-title>
      <v-card-text class="pb-10">
        <v-row>
          <v-col cols="12" md="6">
            <v-btn-toggle v-model="size" mandatory rounded="10" color="primary" group elevation="2">
              <v-btn value="list" :active="size === 'list'"> All </v-btn>
              <v-btn value="ten" :active="size === 'ten'"> 10 </v-btn>
              <v-btn value="twelve" :active="size === 'twelve'"> 12 </v-btn>
              <v-btn value="thirteen" :active="size === 'thirteen'"> 13 </v-btn>
            </v-btn-toggle>
          </v-col>
          <v-col cols="12" md="6" class="d-flex justify-end">
            <v-btn
              :disabled="!filtersActive"
              :variant="'flat'"
              @click="clearFilters"
              class="text-caption"
              color="primary"
              >Clear Filters</v-btn
            >
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="search"
              prepend-inner-icon="fad fa-search"
              placeholder="Search for anything (ex. Momos, 10in, ET20)"
              hide-details
              variant="solo-filled"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="selectedOffsets" :items="allOffsets" label="Offsets" multiple>
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item.title }}</span>
                </v-chip>
                <span v-if="index === 2" class="text-grey text-caption align-self-center">
                  (+{{ selectedOffsets.length - 2 }} others)
                </span>
              </template>
            </v-select>
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="selectedMaterials" :items="allMaterials" label="Material" multiple>
              <template v-slot:selection="{ item, index }">
                <v-chip v-if="index < 2">
                  <span>{{ item.title }}</span>
                </v-chip>
                <span v-if="index === 2" class="text-grey text-caption align-self-center">
                  (+{{ selectedMaterials.length - 2 }} others)
                </span>
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-card-text>
    </template>

    <template v-slot:default="{ items }">
      <v-row class="d-flex justify-center px-2">
        <template v-if="error">
          <v-col cols="12" class="text-center">
            <v-alert type="error" title="Error loading wheels" :text="error.message" />
          </v-col>
        </template>
        <v-col v-else v-for="{ raw: wheel } in items" :key="wheel.uuid" cols="12" sm="4" md="3">
          <v-card class="wheel-container" flat nuxt-link :to="`/archive/wheels/${wheel.uuid}`">
            <template v-if="wheel.images">
              <v-img
                :alt="`${wheel.name} wheel`"
                :lazy-src="getWheelImageUrl(wheel)"
                class="mx-auto rounded-xl align-end wheel-image"
                gradient="to bottom, rgba(0,0,0,0), rgba(0,0,0,0.7)"
                aspect-ratio="1"
                cover
                :src="getWheelImageUrl(wheel)"
              >
                <span class="float-right wheel-chip pr-2">
                  <v-chip v-if="wheel.size === '10'" color="green" class="" variant="flat"> {{ wheel.size }}in </v-chip>
                  <v-chip v-if="wheel.size === '12'" color="orange" variant="flat"> {{ wheel.size }}in </v-chip>
                  <v-chip v-if="wheel.size === '13'" color="blue" variant="flat"> {{ wheel.size }}in </v-chip>
                </span>
                <h2 class="text-h6 px-4 mb-4 text-white text-bold">
                  {{ wheel.name }}
                </h2>
              </v-img>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
      <v-col v-if="filteredWheels.length === 0" cols="12" class="text-center">
        <v-card flat>
          <v-card-text class="text-body">No wheels meeting current filters exist</v-card-text>
        </v-card>
      </v-col>
      <div class="d-flex align-center justify-center pa-4">
        <v-btn
          :disabled="page === 1"
          density="comfortable"
          icon="fad fa-arrow-left"
          variant="tonal"
          rounded
          @click="prevPage"
        ></v-btn>
        <div class="mx-2 text-caption">Page {{ page }} of {{ pageCount }}</div>
        <v-btn
          :disabled="page >= pageCount"
          density="comfortable"
          icon="fad fa-arrow-right"
          variant="tonal"
          rounded
          @click="nextPage"
        ></v-btn>
      </div>
    </template>

    <template v-slot:loader>
      <v-row>
        <v-col v-for="index in 12" :key="`skeleton-${index}`" cols="12" sm="3">
          <v-skeleton-loader class="border" type="image, article"></v-skeleton-loader>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
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
