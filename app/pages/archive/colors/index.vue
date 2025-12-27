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
          title: `${$t('share.title')} ${color.name || $t('states.unnamed_color')}`,
          text: `${$t('share.text')} ${color.name || $t('states.unnamed_color')}`,
          url,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(url);
      alert($t('states.link_copied'));
    }
  };

  // Reset to first page when search changes
  watch(search, () => {
    currentPage.value = 1;
  });

  useHead({
    title: $t('title'),
    meta: [
      {
        name: 'description',
        content: $t('description'),
      },
    ],
  });

  useSeoMeta({
    ogTitle: $t('seo.og_title'),
    ogDescription: $t('seo.og_description'),
    ogUrl: 'https://classicminidiy.com/archive/colors',
    ogType: 'website',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/colors.png',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('seo.twitter_title'),
    twitterDescription: $t('seo.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/colors.png',
  });
</script>

<template>
  <hero :navigation="true" :title="$t('hero_title')" :heroType="HERO_TYPES.ARCHIVE" />
  <div class="container mx-auto px-4">
    <!-- Breadcrumb -->
    <!-- Header -->
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb class="my-6" :page="$t('breadcrumb_title')"></breadcrumb>
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-8">
            <h1 class="text-3xl font-bold">{{ $t('main_heading') }}</h1>
            <h2 class="text-xl mt-4">
              <strong>{{ colors?.length || '0' }}</strong>
              {{ $t('subtitle') }}
            </h2>
            <p class="my-4">
              {{ $t('description_text') }}
              <a href="http://mini-colours.co.uk" class="link link-primary">{{ $t('partner_link') }}</a>
              {{ $t('description_text_2') }}
            </p>
          </div>
          <div class="col-span-12 md:col-span-4">
            <a href="#submitAnchor" class="block">
              <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div class="card-body">
                  <div class="flex items-start space-x-4">
                    <div class="shrink-0">
                      <figure class="w-16 h-16">
                        <picture>
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-palette-100.webp"
                            type="image/webp"
                          />
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-palette-100.png"
                            type="image/png"
                          />
                          <nuxt-img
                            loading="lazy"
                            src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-palette-100.png"
                            :alt="$t('submit_card.alt_text')"
                            class="w-16 h-16"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div>
                      <h2 class="card-title">{{ $t('submit_card.title') }}</h2>
                      <p>
                        {{ $t('submit_card.description') }}
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
                <h2 class="text-2xl font-semibold">{{ $t('search.card_title') }}</h2>
              </div>
              <div class="relative w-full md:w-96">
                <input
                  v-model="search"
                  type="text"
                  :placeholder="$t('search.placeholder')"
                  class="input input-bordered w-full pl-10"
                />
                <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            <!-- Help Text -->
            <div class="p-4">
              <p class="text-base">
                {{ $t('search.help_text') }}
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
                          {{ $t('states.no_colors') }}
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
                          {{ color.name || $t('states.unnamed_color') }}
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
                        <span v-else class="badge badge-error badge-soft">{{ $t('states.missing') }}</span>
                      </td>

                      <!-- BMC Code -->
                      <td>
                        <span v-if="color.code && color.code !== 'Unknown'" class="font-medium">
                          {{ color.code }}
                        </span>
                        <span v-else class="badge badge-error badge-soft">{{ $t('states.missing') }}</span>
                      </td>

                      <!-- Ditzler/PPG Code -->
                      <td>
                        <span v-if="color.ditzlerPpgCode && color.ditzlerPpgCode !== 'Unknown'" class="font-medium">
                          {{ color.ditzlerPpgCode }}
                        </span>
                        <span v-else class="badge badge-error badge-soft">{{ $t('states.missing') }}</span>
                      </td>

                      <!-- Dulux Code -->
                      <td>
                        <span v-if="color.duluxCode && color.duluxCode !== 'Unknown'" class="font-medium">
                          {{ color.duluxCode }}
                        </span>
                        <span v-else class="badge badge-error badge-soft">{{ $t('states.missing') }}</span>
                      </td>

                      <!-- Years Used -->
                      <td>
                        <span v-if="color.years && color.years !== 'Unknown'" class="font-medium">
                          {{ Array.isArray(color.years) ? color.years.join(', ') : color.years }}
                        </span>
                        <span v-else class="badge badge-error badge-soft">{{ $t('states.missing') }}</span>
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
                <button class="join-item btn btn-md">
                  {{ $t('pagination.page') }} {{ currentPage }} {{ $t('pagination.of') }} {{ totalPages }}
                </button>
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

      <!-- Submit New Color Section -->
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider" id="submitAnchor">{{ $t('submit_divider') }}</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <ColorSubmission />
      </div>

      <!-- Support Section -->
      <div class="col-span-12 md:col-span-10 md:col-start-2 text-center py-8">
        <div class="divider">{{ $t('support_divider') }}</div>
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Color Picker",
    "description": "Find the perfect color for your Classic Mini with our comprehensive color picker.",
    "hero_title": "Color Picker",
    "breadcrumb_title": "Color Swatches",
    "main_heading": "Classic Mini Color Picker",
    "subtitle": "colors in our database",
    "description_text": "In an effort to make more information available, Classic Mini DIY has partnered with",
    "description_text_2": "to provide you with a comprehensive list of the colors used on the Classic Mini throughout the years.",
    "partner_link": "mini-colours.co.uk",
    "submit_card": {
      "title": "Submit a Color",
      "description": "Help expand our color database by submitting a new color",
      "alt_text": "Submit Color Icon"
    },
    "submit_divider": "Submit a New Color",
    "search": {
      "card_title": "Find your Color",
      "placeholder": "Search colors...",
      "help_text": "Use the search above to filter for any field in the table below instantly. Notice some data missing? Click the edit button to contribute!"
    },
    "table_headers": {
      "share": "Share",
      "color_name": "Color Name",
      "swatch": "Swatch",
      "short_code": "Short Code",
      "bmc_code": "BMC Code",
      "ditzler_ppg_code": "Ditzler/PPG Code",
      "dulux_code": "Dulux Code",
      "years_used": "Years Used",
      "edit": "Edit"
    },
    "states": {
      "no_colors": "No colors found matching your search.",
      "unnamed_color": "Unnamed Color",
      "missing": "Missing",
      "link_copied": "Link copied to clipboard!"
    },
    "pagination": {
      "page": "Page",
      "of": "of"
    },
    "share": {
      "title": "Classic Mini Color:",
      "text": "Check out this Classic Mini color:"
    },
    "support_divider": "Support",
    "seo": {
      "og_title": "Classic Mini Color Picker | Classic Mini DIY",
      "og_description": "Find the perfect color for your Classic Mini with our comprehensive color picker and paint code reference.",
      "twitter_title": "Classic Mini Color Picker | Classic Mini DIY",
      "twitter_description": "Find the perfect color for your Classic Mini with our comprehensive color picker and paint code reference."
    }
  }
}
</i18n>
