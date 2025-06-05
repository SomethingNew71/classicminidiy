<script lang="ts" setup>
  import { HERO_TYPES } from '~/data/models/generic';
  import { shareColorItem } from '~/data/models/helper-utils';
  import type { PrettyColor } from '~/data/models/colors';

  const { params } = useRoute();
  const { data: color, status } = await useFetch<PrettyColor>(`/api/colors/single`, {
    query: { id: params.color },
  });

  const copied = ref(false);
  const shareImage = ref('');

  watch(color, (newColor) => {
    if (newColor?.raw.hasSwatch) {
      shareImage.value = `https://classicminidiy.s3.amazonaws.com/colors/${newColor.raw.code}.jpg`;
    } else {
      shareImage.value = 'https://classicminidiy.s3.amazonaws.com/misc/noSwatch.jpeg';
    }
  });

  async function copyUrl() {
    const url = `https://classicminidiy.com/archive/colors/${color?.value?.raw.id}`;
    try {
      await navigator.clipboard.writeText(url);
      copied.value = true;
      setTimeout(() => (copied.value = false), 1000);
    } catch ($e) {
      copied.value = false;
    }
  }

  useHead({
    title: `Mini Color - ${color.value?.pretty.Name} | ${color.value?.pretty.Code}`,
    meta: [
      {
        key: 'description',
        name: 'description',
        content: 'Check out the Classic Mini color I am looking at right now.',
      },
    ],
    link: [
      {
        rel: 'preload',
        href: shareImage.value,
        as: 'image',
      },
    ],
  });

  useSeoMeta({
    ogTitle: `Mini Color - ${color.value?.pretty.Name} | ${color.value?.pretty.Code}`,
    ogDescription: 'Check out the Classic Mini color I am looking at right now.',
    ogUrl: `classicminidiy.com/archive/colors/${color?.value?.raw.id}`,
    ogImage: shareImage.value,
    ogType: 'website',
  });
</script>

<template>
  <div class="min-h-screen bg-base-200">
    <!-- Hero Section -->
    <div class="bg-primary text-primary-content py-8">
      <div class="container mx-auto px-4">
        <div class="flex items-center gap-2 mb-4">
          <i class="fas fa-palette text-3xl"></i>
          <h1 class="text-3xl font-bold">Color Swatch</h1>
        </div>
        <div class="text-sm breadcrumbs">
          <ul>
            <li><NuxtLink to="/">Home</NuxtLink></li>
            <li><NuxtLink to="/archive/colors">Colors</NuxtLink></li>
            <li v-if="color">{{ color.pretty.Name }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
      <div class="card bg-base-100 shadow-xl">
        <div v-if="status === 'pending'" class="flex justify-center p-8">
          <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <div v-else-if="color" class="card-body">
          <!-- Color Header -->
          <div class="flex flex-col md:flex-row gap-6 items-center">
            <!-- Color Info -->
            <div class="flex-1 text-center md:text-left">
              <h2 class="card-title text-3xl font-bold mb-2">{{ color.pretty.Name }}</h2>
              <div class="badge badge-lg badge-primary mb-4">
                <i class="fas fa-palette mr-1"></i>
                {{ color.pretty['Primary Color'] }}
              </div>
              <h3 class="text-5xl font-bold text-primary mb-6">{{ color.pretty.Code }}</h3>
            </div>

            <!-- Color Swatch -->
            <div class="w-full md:w-1/3 lg:w-1/4">
              <figure class="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                <img
                  v-if="color.raw.hasSwatch"
                  :src="`https://classicminidiy.s3.amazonaws.com/colors/${color.raw.code}.jpg`"
                  :alt="`${color.pretty.Name} color swatch`"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full bg-gradient-to-br from-base-200 to-base-300 flex items-center justify-center"
                >
                  <i class="fas fa-paint-roller text-6xl opacity-30"></i>
                </div>
              </figure>
            </div>
          </div>

          <!-- Color Details -->
          <div class="divider">Details</div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="stats bg-base-200">
              <div class="stat">
                <div class="stat-figure text-primary">
                  <i class="fas fa-calendar-days text-2xl"></i>
                </div>
                <div class="stat-title">Years</div>
                <div class="stat-value text-lg" :class="{ 'text-error': !color.pretty.Years }">
                  {{ color.pretty.Years || 'Missing' }}
                </div>
              </div>
            </div>

            <div class="stats bg-base-200">
              <div class="stat">
                <div class="stat-figure text-primary">
                  <i class="fas fa-code text-2xl"></i>
                </div>
                <div class="stat-title">Short Code</div>
                <div class="stat-value text-lg" :class="{ 'text-error': !color.pretty['Short Code'] }">
                  {{ color.pretty['Short Code'] || 'Missing' }}
                </div>
              </div>
            </div>

            <div class="stats bg-base-200">
              <div class="stat">
                <div class="stat-figure text-primary">
                  <i class="fas fa-barcode text-2xl"></i>
                </div>
                <div class="stat-title">Ditzler PPG Code</div>
                <div class="stat-value text-lg" :class="{ 'text-error': !color.pretty['Ditzler PPG Code'] }">
                  {{ color.pretty['Ditzler PPG Code'] || 'Missing' }}
                </div>
              </div>
            </div>

            <div class="stats bg-base-200">
              <div class="stat">
                <div class="stat-figure text-primary">
                  <i class="fas fa-barcode text-2xl"></i>
                </div>
                <div class="stat-title">Dulux Code</div>
                <div class="stat-value text-lg" :class="{ 'text-error': !color.pretty['Dulux Code'] }">
                  {{ color.pretty['Dulux Code'] || 'Missing' }}
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="divider">Share</div>
          <div class="flex flex-wrap gap-4 justify-center">
            <button @click="copyUrl()" class="btn btn-primary" :class="{ 'btn-success': copied }">
              <i class="fas fa-link mr-2"></i>
              {{ copied ? 'Copied!' : 'Copy Link' }}
            </button>

            <a
              :href="`mailto:?subject=Mini Color Swatch - ${color.pretty.Name} | ${color.pretty.Code}&body=Color%20Name%20-%20${color.pretty.Name}%20%0ABMC%20Code%20-%20${color.pretty.Code}%20%0ADulux%20Code%20-%20${color.pretty['Dulux Code']}%20%0ADitzler%20Code%20-%20${color.pretty['Ditzler PPG Code']}%20`"
              class="btn btn-secondary"
            >
              <i class="fas fa-envelope mr-2"></i>
              Email
            </a>

            <button @click="shareColorItem(color.pretty.Name, color.pretty.ID)" class="btn btn-accent">
              <i class="fas fa-share-nodes mr-2"></i>
              Share
            </button>

            <NuxtLink :to="`/archive/colors/contribute?color=${color.raw.id}`" class="btn btn-outline">
              <i class="fas fa-edit mr-2"></i>
              Contribute Updates
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .card {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
  }

  .card:hover {
    --tw-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
    --tw-shadow-colored: 0 25px 50px -12px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }

  .stat-value {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .btn {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 200ms;
  }

  figure {
    transition: transform 0.3s ease;
  }

  figure:hover {
    transform: translateY(-4px);
  }
</style>
