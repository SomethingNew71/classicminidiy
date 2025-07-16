<script lang="ts" setup>
  import { HERO_TYPES } from '~/data/models/generic';
  import { shareWheelItem } from '~/data/models/helper-utils';
  import type { IWheelsData } from '~/data/models/wheels';

  const route = useRoute();
  const wheelId = ref(route.params.wheel);
  const {
    data: wheel,
    pending,
    error,
  } = useFetch<IWheelsData>('/api/wheels/wheel', {
    query: {
      uuid: wheelId.value[0] || 'noWheel',
    },
    server: !!wheelId.value?.[0], // Only fetch on server if wheel UUID exists
    default: () => ({}) as IWheelsData, // Provide default value when fetch is skipped
  });

  const copied = ref<boolean>(false);
  const shareImage = computed(() => {
    if (!wheel.value?.images?.length) return 'no-image';
    return wheel.value.images[0].src;
  });

  async function copyUrl() {
    const url = `https://classicminidiy.com/archive/wheels/${wheel.value?.uuid}`;
    try {
      await navigator.clipboard.writeText(url);
      copied.value = true;
      setTimeout(() => (copied.value = false), 1000);
    } catch ($e) {
      copied.value = false;
    }
  }

  // Update head and meta tags when wheel data is loaded
  watchEffect(() => {
    if (wheel.value) {
      const title = `Mini Wheels - ${wheel.value.name} | ${wheel.value.size} x ${wheel.value.width}`;
      const description = 'Check out the Classic Mini wheel I am looking at right now.';

      useHead({
        title,
        meta: [
          {
            key: 'description',
            name: 'description',
            content: description,
          },
        ],
      });

      useSeoMeta({
        ogTitle: title,
        ogDescription: description,
        ogUrl: `classicminidiy.com/archive/wheels/${wheel.value.uuid}`,
        ogImage: shareImage.value,
        ogType: 'website',
      });
    }
  });
</script>
<template>
  <hero :navigation="true" :title="'Wheel Details'" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4 py-4">
    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center items-center min-h-[50vh]">
      <div class="text-center">
        <span class="loading loading-spinner loading-lg text-primary"></span>
        <p class="mt-4">Loading wheel details...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="alert alert-error my-8">
      <i class="fas fa-exclamation-triangle mr-2"></i>
      <span>Failed to load wheel details. Please try again later.</span>
      <NuxtLink to="/archive/wheels" class="btn btn-sm btn-ghost ml-4">
        <i class="fas fa-arrow-left mr-2"></i> Back to Wheels
      </NuxtLink>
    </div>

    <!-- Content -->
    <div v-else>
      <div class="grid grid-cols-12 gap-4 items-center">
        <div class="col-span-12 md:col-span-8">
          <breadcrumb
            class="mt-6"
            :page="wheel?.name || 'Wheel Details'"
            subpage="Wheels"
            subpage-href="/archive/wheels"
          ></breadcrumb>
        </div>
      </div>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12">
          <div class="card bg-base-100 shadow-xl">
            <div v-if="wheel" class="card-body p-6">
              <div class="flex flex-col md:flex-row gap-8">
                <div class="flex-1">
                  <h1 class="text-3xl font-bold mb-4">{{ wheel.name }}</h1>
                  <p v-if="wheel.notes" class="text-gray-600 text-lg">{{ wheel.notes }}</p>
                </div>

                <div class="w-full md:w-1/3 flex justify-center">
                  <div class="w-full max-w-sm">
                    <div
                      v-if="wheel.images && wheel.images.length > 1"
                      class="carousel w-full rounded-lg overflow-hidden"
                    >
                      <div
                        v-for="(image, index) in wheel.images"
                        :key="index"
                        :id="`slide${index}`"
                        class="carousel-item relative w-full aspect-[4/3]"
                      >
                        <img :src="image.src" class="w-full h-full object-cover" />
                        <div class="absolute flex justify-between transform -translate-y-1/2 left-2 right-2 top-1/2">
                          <a
                            :href="`#slide${index === 0 ? wheel.images.length - 1 : index - 1}`"
                            class="btn btn-circle btn-sm bg-white/80 hover:bg-white text-gray-800 border-0 shadow-md"
                          >
                            <i class="fas fa-chevron-left"></i>
                          </a>
                          <a
                            :href="`#slide${index === wheel.images.length - 1 ? 0 : index + 1}`"
                            class="btn btn-circle btn-sm bg-white/80 hover:bg-white text-gray-800 border-0 shadow-md"
                          >
                            <i class="fas fa-chevron-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <img
                      v-else-if="wheel.images && wheel.images[0]"
                      :alt="`Image of the ${wheel.name} wheels`"
                      class="w-full h-auto rounded-lg shadow-md"
                      :src="wheel.images[0].src"
                    />
                    <div v-else class="w-full aspect-square flex items-center justify-center bg-gray-100 rounded-lg">
                      <i class="fas fa-image text-6xl text-gray-300"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="divider my-2"></div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4">
                <div class="flex flex-col items-center text-center">
                  <div class="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <i class="fad fa-arrow-right-to-line text-xl text-primary"></i>
                  </div>
                  <h3 class="font-semibold text-gray-600 mb-1">Offset</h3>
                  <p v-if="wheel.offset" class="text-lg font-medium">{{ wheel.offset }}</p>
                  <p v-else class="text-error text-sm">Not specified</p>
                </div>
                <div class="flex flex-col items-center text-center">
                  <div class="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-2">
                    <i class="fad fa-arrows-to-line text-xl text-secondary"></i>
                  </div>
                  <h3 class="font-semibold text-gray-600 mb-1">Diameter</h3>
                  <p v-if="wheel.size" class="text-lg font-medium">{{ wheel.size }}</p>
                  <p v-else class="text-error text-sm">Not specified</p>
                </div>
                <div class="flex flex-col items-center text-center">
                  <div class="w-12 h-12 rounded-full bg-info/10 flex items-center justify-center mb-2">
                    <i class="fad fa-arrows-left-right-to-line text-xl text-info"></i>
                  </div>
                  <h3 class="font-semibold text-gray-600 mb-1">Width</h3>
                  <p v-if="wheel.width" class="text-lg font-medium">{{ wheel.width }}</p>
                  <p v-else class="text-error text-sm">Not specified</p>
                </div>
              </div>
              <div class="divider my-2"></div>
              <div class="flex flex-wrap justify-center gap-3 pt-2">
                <button v-if="copied" class="btn btn-lg btn-primary/10 gap-2" disabled>
                  <i class="fad fa-check text-success"></i>
                  <span>Copied!</span>
                </button>
                <button v-else class="btn btn-lg btn-primary gap-2" @click="copyUrl">
                  <i class="fad fa-link"></i>
                  <span>Copy Link</span>
                </button>
                <button
                  v-if="wheel.name && wheel.uuid"
                  class="btn btn-lg btn-secondary gap-2"
                  @click="shareWheelItem(wheel.name, wheel.uuid)"
                >
                  <i class="fad fa-share"></i>
                  <span>Share</span>
                </button>
                <NuxtLink
                  v-if="wheel.uuid"
                  :to="`/archive/wheels/submit?uuid=${wheel.uuid}`"
                  class="btn btn-lg btn-outlined gap-2"
                >
                  <i class="fad fa-edit"></i>
                  <span>Contribute</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  @media (max-width: 600px) {
    .top-section {
      text-align: center;
    }
  }

  .wheel-image {
    margin-left: auto;

    @media (max-width: 600px) {
      margin-left: unset;
      margin: auto;
    }
  }
</style>
