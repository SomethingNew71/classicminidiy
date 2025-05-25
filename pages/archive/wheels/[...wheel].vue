<script lang="ts" setup>
  import { HERO_TYPES } from '~/data/models/generic';
  import { shareWheelItem } from '~/data/models/helper-utils';
  import type { IWheelsData } from '~/data/models/wheels';
  const { params } = await useRoute();
  const wheelId = ref(params.wheel);
  let { data: wheel, status } = await useFetch<IWheelsData>(`/api/wheels/wheel`, {
    query: {
      uuid: wheelId.value[0],
    },
  });
  const copied = ref<boolean>(false);
  let shareImage: string;
  if (wheel.value?.images && wheel.value?.images?.length > 0) {
    shareImage = wheel.value.images[0].src;
  } else {
    shareImage = 'no-image';
  }

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

  useHead({
    title: `Mini Wheels - ${wheel.value?.name} | ${wheel.value?.size} x ${wheel.value?.width}`,
    meta: [
      {
        key: 'description',
        name: 'description',
        content: 'Check out the Clasic Mini wheel I am looking at right now.',
      },
    ],
  });
  useSeoMeta({
    ogTitle: `Mini Wheels - ${wheel.value?.name} | ${wheel.value?.size} x ${wheel.value?.width}`,
    ogDescription: 'Check out the Clasic Mini wheel I am looking at right now.',
    ogUrl: `classicminidiy.com/archive/wheels/${wheel.value?.uuid}`,
    ogImage: shareImage,
    ogType: 'website',
  });
</script>
<template>
  <hero :navigation="true" :title="'Color Swatch'" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4 py-4">
    <div class="grid grid-cols-12 gap-4 items-center">
      <div class="col-span-12 md:col-span-8">
        <breadcrumb :page="wheel?.name" subpage="Wheels" subpage-href="/archive/wheels"></breadcrumb>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <div class="card bg-base-100 shadow-xl" :class="{'loading': status === 'pending'}">
          <template v-if="wheel">
            <div class="card-body">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="top-section">
                  <h1 class="text-2xl font-bold">{{ wheel.name }}</h1>
                  <h2 class="text-lg pt-4">{{ wheel.notes }}</h2>
                </div>

                <div class="pt-2">
                  <div v-if="wheel.images && wheel.images.length > 1" class="carousel w-full h-[300px]">
                    <div v-for="(image, index) in wheel.images" :key="index" :id="`slide${index}`" class="carousel-item relative w-full rounded-lg">
                      <img :src="image.src" class="w-full object-cover rounded-lg" />
                      <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a :href="`#slide${index === 0 ? wheel.images.length - 1 : index - 1}`" class="btn btn-circle">❮</a> 
                        <a :href="`#slide${index === wheel.images.length - 1 ? 0 : index + 1}`" class="btn btn-circle">❯</a>
                      </div>
                    </div>
                  </div>
                  <img
                    v-else-if="wheel.images"
                    :alt="`Image of the ${wheel.name} wheels`"
                    class="wheel-image rounded-lg max-h-[300px] max-w-[300px] object-cover"
                    :src="wheel.images[0].src"
                  />
                </div>
              </div>
            </div>

            <div class="divider mx-4"></div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
              <div class="flex items-start">
                <i class="fad fa-arrow-right-to-line text-xl mr-2 mt-1"></i>
                <div>
                  <h3 class="font-bold">Offset</h3>
                  <p v-if="wheel.offset">{{ wheel.offset }}</p>
                  <p v-else class="text-error">Missing</p>
                </div>
              </div>
              <div class="divider divider-horizontal hidden sm:flex"></div>
              <div class="flex items-start">
                <i class="fad fa-arrows-to-line text-xl mr-2 mt-1"></i>
                <div>
                  <h3 class="font-bold">Diameter</h3>
                  <p v-if="wheel.size">{{ wheel.size }}</p>
                  <p v-else class="text-error">Missing</p>
                </div>
              </div>
              <div class="divider divider-horizontal hidden sm:flex"></div>
              <div class="flex items-start">
                <i class="fad fa-arrows-left-right-to-line text-xl mr-2 mt-1"></i>
                <div>
                  <h3 class="font-bold">Width</h3>
                  <p v-if="wheel.width">{{ wheel.width }}</p>
                  <p v-else class="text-error">Missing</p>
                </div>
              </div>
            </div>
            <div class="divider mx-4"></div>
            <div class="card-actions justify-center gap-4 p-4">
              <button v-if="copied" class="btn btn-disabled" disabled>
                <i class="fad fa-link mr-2"></i> Copied
              </button>
              <button v-else class="btn btn-primary" @click="copyUrl()">
                <i class="fad fa-link mr-2"></i> Copy Link
              </button>
              <button class="btn btn-secondary" @click="shareWheelItem(wheel.name, wheel.uuid)">
                <i class="fad fa-solid fa-arrow-up-from-bracket mr-2"></i> Share
              </button>
              <NuxtLink :to="`/archive/wheels/submit?uuid=${wheel.uuid}`" class="btn btn-accent">
                <i class="fad fa-edit mr-2"></i> Contribute
              </NuxtLink>
            </div>
          </template>
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
