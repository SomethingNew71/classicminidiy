<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';
  const { data: engineCodes } = await useFetch('/api/decoders/engine');
  const search = ref('');

  // Computed property for filtered engine codes
  const filteredEngineCodes = computed(() => {
    if (!engineCodes.value) return [];
    if (!search.value) return engineCodes.value;

    const searchTerm = search.value.toLowerCase();
    return engineCodes.value.filter((item) => {
      return (
        item.code.toLowerCase().includes(searchTerm) ||
        item.size.toLowerCase().includes(searchTerm) ||
        item.variant.toLowerCase().includes(searchTerm) ||
        item.gearbox.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      );
    });
  });

  useHead({
    title: $t('pages.technical.subPages.engine_decoder.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: $t('pages.technical.subPages.engine_decoder.description'),
      },
    ],
  });
  useSeoMeta({
    ogTitle: $t('pages.technical.subPages.engine_decoder.og_title'),
    ogDescription: $t('pages.technical.subPages.engine_decoder.og_description'),
    ogUrl: 'https://classicminidiy.com/technical/engine-decoder',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/engine-decoder.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('pages.technical.subPages.engine_decoder.twitter_title'),
    twitterDescription: $t('pages.technical.subPages.engine_decoder.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/engine-decoder.png',
  });
</script>

<template>
  <hero
    :navigation="true"
    :title="$t('pages.technical.subPages.engine_decoder.hero_title')"
    :heroType="HERO_TYPES.TECH"
  />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div class="col-span-12">
        <breadcrumb
          class="my-4"
          :version="BREADCRUMB_VERSIONS.TECH"
          :page="$t('pages.technical.subPages.engine_decoder.breadcrumb_title')"
        ></breadcrumb>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-7">
            <h1 class="text-3xl font-bold mb-4">{{ $t('pages.technical.subPages.engine_decoder.main_heading') }}</h1>
            <p class="mb-4">
              {{ $t('pages.technical.subPages.engine_decoder.description_text') }}
            </p>
            <EnginePlateModal></EnginePlateModal>
          </div>
          <div class="col-span-12 md:col-span-5">
            <NuxtLink
              :to="'/technical/chassis-decoder'"
              :title="$t('pages.technical.subPages.engine_decoder.chassis_decoder_card.link_title')"
              class="block"
            >
              <div class="card hover:shadow-lg transition-shadow">
                <div class="flex items-center p-4">
                  <div class="flex-shrink-0">
                    <picture>
                      <source
                        srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.webp"
                        type="image/webp"
                      />
                      <source
                        srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png"
                        type="image/png"
                      />
                      <nuxt-img
                        loading="lazy"
                        src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png"
                        :alt="$t('pages.technical.subPages.engine_decoder.chassis_decoder_card.alt_text')"
                        class="w-16 h-16"
                      />
                    </picture>
                  </div>
                  <div class="ml-4">
                    <h2 class="text-xl font-semibold mb-2">
                      {{ $t('pages.technical.subPages.engine_decoder.chassis_decoder_card.heading') }}
                    </h2>
                    <p class="text-gray-600">
                      {{ $t('pages.technical.subPages.engine_decoder.chassis_decoder_card.description') }}
                    </p>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="col-span-12">
        <div class="col-span-12 pb-5">
          <i class="fas fa-circle pl-1 color-850"></i>
          {{ $t('pages.technical.subPages.engine_decoder.engine_sizes_legend.850cc') }}
          <i class="fas fa-circle pl-1 color-970"></i>
          {{ $t('pages.technical.subPages.engine_decoder.engine_sizes_legend.970cc') }}
          <i class="fas fa-circle pl-1 color-997"></i>
          {{ $t('pages.technical.subPages.engine_decoder.engine_sizes_legend.997cc') }}
          <i class="fas fa-circle pl-1 color-998"></i>
          {{ $t('pages.technical.subPages.engine_decoder.engine_sizes_legend.998cc') }}
          <i class="fas fa-circle pl-1 color-1070"></i>
          {{ $t('pages.technical.subPages.engine_decoder.engine_sizes_legend.1070cc') }}
          <i class="fas fa-circle pl-1 color-1100"></i>
          {{ $t('pages.technical.subPages.engine_decoder.engine_sizes_legend.1100cc') }}
          <i class="fas fa-circle pl-1 color-1275"></i>
          {{ $t('pages.technical.subPages.engine_decoder.engine_sizes_legend.1275cc') }}
        </div>
        <div class="col-span-12 md:col-span-6">
          <div class="form-control pb-5">
            <div class="input-group w-full">
              <label class="input w-full">
                <span class="label"><i class="fad fa-search"></i></span>
                <input
                  v-model="search"
                  :placeholder="$t('pages.technical.subPages.engine_decoder.search.placeholder')"
                  type="text"
                  class="input-bordered w-full"
                />
              </label>
            </div>
          </div>
        </div>
        <div class="col-span-12">
          <div class="card">
            <div class="card-header bg-base-200">
              <div class="flex items-center">
                <div>
                  <i class="fad fa-engine text-2xl"></i>
                </div>
                <h3 class="text-xl font-semibold ml-2">
                  {{ $t('pages.technical.subPages.engine_decoder.table.title') }}
                </h3>
              </div>
            </div>

            <div class="card-body">
              <div class="overflow-x-auto">
                <table class="table table-compact w-full">
                  <thead>
                    <tr>
                      <th>{{ $t('pages.technical.subPages.engine_decoder.table.headers.color') }}</th>
                      <th>{{ $t('pages.technical.subPages.engine_decoder.table.headers.code') }}</th>
                      <th>{{ $t('pages.technical.subPages.engine_decoder.table.headers.engine_size') }}</th>
                      <th>{{ $t('pages.technical.subPages.engine_decoder.table.headers.engine_variant') }}</th>
                      <th>{{ $t('pages.technical.subPages.engine_decoder.table.headers.gearbox_details') }}</th>
                      <th>{{ $t('pages.technical.subPages.engine_decoder.table.headers.details') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in filteredEngineCodes" :key="item.code">
                      <td>
                        <i class="fas fa-circle pt-1" :class="'color-' + item.size"></i>
                      </td>
                      <td>{{ item.code }}</td>
                      <td>{{ item.size }}</td>
                      <td>{{ item.variant }}</td>
                      <td>{{ item.gearbox }}</td>
                      <td>{{ item.description }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider mb-4">{{ $t('pages.technical.subPages.engine_decoder.ui.support_section') }}</div>
      </div>
      <div class="col-span-12 md:col-span-10 md:col-start-2 pb-10">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .color-850 {
    color: #e24329;
  }
  .color-970 {
    color: #4a7023;
  }
  .color-997 {
    color: #277dc2;
  }
  .color-998 {
    color: #f5c147;
  }
  .color-1070 {
    color: #71784e;
  }
  .color-1100 {
    color: #659cc8;
  }
  .color-1275 {
    color: #c57b57;
  }

  .card {
    background-color: var(--base-100);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
  }

  .card-body {
    padding: 1rem;
  }

  .input {
    width: 100%;
    max-width: 56rem;
  }

  .divider {
    text-align: center;
    color: #64748b;
    margin: 2rem 0;
  }
</style>
