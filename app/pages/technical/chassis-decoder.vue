<script lang="ts" setup>
  import { BREADCRUMB_VERSIONS, HERO_TYPES } from '../../../data/models/generic';
  import { chassisRanges } from '../../../data/models/decoders';

  interface ChassisPosition {
    position: number;
    value: string;
    name: string;
    matched: boolean;
  }

  interface ChassisDecoderResponse {
    success: boolean;
    yearRange: string;
    chassisNumber: string;
    decodedPositions: ChassisPosition[];
    isValid: boolean;
    errors: string[];
    pattern: string;
    rangeData: any;
  }

  const chassisNumber = ref('');
  const yearRange = ref('1959-1969');
  const isLoading = ref(false);
  const decodedResult = ref<ChassisDecoderResponse | null>(null);
  const errorMessage = ref('');

  // Template ref for smooth scrolling to results
  const decodedResultsSection = ref<HTMLElement>();

  const yearRangeOptions = ['1959-1969', '1969-1974', '1974-1980', '1980', '1980-1985', '1985-1990', '1990-on'];

  // Get example chassis number for selected year range
  const exampleChassisNumber = computed(() => {
    const selectedRange = chassisRanges.find((range) => range.title === yearRange.value);
    if (!selectedRange) return '';

    const example = selectedRange.value.PrimaryExample;
    let exampleString = '';

    // Build example from positions 1-11
    for (let i = 1; i <= 11; i++) {
      const key = i.toString() as keyof typeof example;
      if (example[key]) {
        exampleString += example[key];
      }
    }

    // Add numbers and last if they exist
    if (example.numbers) {
      exampleString += example.numbers;
    }
    if (example.last) {
      exampleString += example.last;
    }

    return exampleString;
  });

  async function decodeChassisNumber() {
    if (!chassisNumber.value.trim()) {
      errorMessage.value = $t('pages.technical.subPages.chassis_decoder.form.error_empty_chassis');
      return;
    }

    isLoading.value = true;
    errorMessage.value = '';
    decodedResult.value = null;

    try {
      const response = await $fetch<ChassisDecoderResponse>('/api/decoders/chassis', {
        method: 'PUT',
        body: {
          yearRange: yearRange.value,
          chassisNumber: chassisNumber.value,
        },
      });

      decodedResult.value = response;

      // Smooth scroll to decoded results section
      await nextTick(); // Wait for DOM to update
      if (decodedResultsSection.value) {
        decodedResultsSection.value.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } catch (error: any) {
      console.error('Error decoding chassis number:', error);
      errorMessage.value =
        error?.data?.statusMessage || $t('pages.technical.subPages.chassis_decoder.form.error_decode_failed');
    } finally {
      isLoading.value = false;
    }
  }

  function resetForm() {
    chassisNumber.value = '';
    yearRange.value = yearRangeOptions[0] || '';
    decodedResult.value = null;
    errorMessage.value = '';
  }

  function getPositionColorClass(position: number): string {
    if (position === 12) return 'position-numbers';
    if (position === 13) return 'position-last';
    return `position-${position}`;
  }

  useHead({
    title: $t('pages.technical.subPages.chassis_decoder.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: $t('pages.technical.subPages.chassis_decoder.description'),
      },
    ],
  });
  useSeoMeta({
    ogTitle: $t('pages.technical.subPages.chassis_decoder.og_title'),
    ogDescription: $t('pages.technical.subPages.chassis_decoder.og_description'),
    ogUrl: 'https://classicminidiy.com/technical/chassis-decoder',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/chassis-decoder.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('pages.technical.subPages.chassis_decoder.twitter_title'),
    twitterDescription: $t('pages.technical.subPages.chassis_decoder.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/technical/chassis-decoder.png',
  });
</script>

<template>
  <hero
    :navigation="true"
    :title="$t('pages.technical.subPages.chassis_decoder.hero_title')"
    :heroType="HERO_TYPES.TECH"
  />
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-12">
        <breadcrumb
          class="my-6"
          :version="BREADCRUMB_VERSIONS.TECH"
          :page="$t('pages.technical.subPages.chassis_decoder.breadcrumb_title')"
        ></breadcrumb>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div class="col-span-12 md:col-span-7">
            <h1 class="text-3xl font-bold mb-4">{{ $t('pages.technical.subPages.chassis_decoder.main_heading') }}</h1>
            <p class="mb-4">
              {{ $t('pages.technical.subPages.chassis_decoder.description_text') }}
            </p>
          </div>
          <div class="col-span-12 md:col-span-5">
            <NuxtLink
              :to="'/technical/engine-decoder'"
              :title="$t('pages.technical.subPages.chassis_decoder.engine_decoder_card.link_title')"
              class="block"
            >
              <div class="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
                <div class="card-body">
                  <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                      <figure class="w-16 h-16">
                        <picture>
                          <source
                            srcset="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.webp"
                            type="image/webp"
                          />
                          <img
                            src="https://classicminidiy.s3.amazonaws.com/cloud-icon/icons8-blueprint-zoom-100.png"
                            :alt="$t('pages.technical.subPages.chassis_decoder.engine_decoder_card.alt_text')"
                            class="w-full h-full object-cover rounded"
                          />
                        </picture>
                      </figure>
                    </div>
                    <div class="flex-1">
                      <h3 class="text-lg font-semibold">
                        {{ $t('pages.technical.subPages.chassis_decoder.engine_decoder_card.heading') }}
                      </h3>
                      <p class="mt-1">
                        {{ $t('pages.technical.subPages.chassis_decoder.engine_decoder_card.description') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Chassis Decoder Form -->
      <div class="col-span-12 md:col-span-8 md:col-start-3">
        <div class="card bg-base-100 shadow-lg">
          <div class="card-body text-center">
            <h3 class="text-xl font-semibold mb-4">
              {{ $t('pages.technical.subPages.chassis_decoder.form.card_title') }}
            </h3>
            <p class="mb-6">
              {{ $t('pages.technical.subPages.chassis_decoder.form.card_description') }}
            </p>

            <div class="space-y-4 max-w-md mx-auto">
              <!-- Year Range Selection -->
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text font-medium">{{
                    $t('pages.technical.subPages.chassis_decoder.form.year_range_label')
                  }}</span>
                </label>
                <select v-model="yearRange" class="select select-bordered w-full">
                  <option v-for="option in yearRangeOptions" :key="option" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>

              <!-- Chassis Number Input -->
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text font-medium">{{
                    $t('pages.technical.subPages.chassis_decoder.form.chassis_number_label')
                  }}</span>
                </label>
                <input
                  v-model="chassisNumber"
                  type="text"
                  :placeholder="$t('pages.technical.subPages.chassis_decoder.form.chassis_number_placeholder')"
                  class="input input-bordered w-full"
                  @keyup.enter="decodeChassisNumber"
                />
                <!-- Example for selected year range -->
                <div v-if="exampleChassisNumber" class="mt-2 text-sm text-gray-600">
                  <span class="font-medium"
                    >{{ $t('pages.technical.subPages.chassis_decoder.form.example_text') }} {{ yearRange }}:</span
                  >
                  <span class="font-mono ml-2 text-primary">{{ exampleChassisNumber }}</span>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3 justify-center">
                <button
                  @click="decodeChassisNumber"
                  :disabled="isLoading || !chassisNumber.trim()"
                  class="btn btn-primary"
                >
                  <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
                  {{
                    isLoading
                      ? $t('pages.technical.subPages.chassis_decoder.form.decoding_button')
                      : $t('pages.technical.subPages.chassis_decoder.form.decode_button')
                  }}
                </button>
                <button @click="resetForm" class="btn btn-ghost">
                  {{ $t('pages.technical.subPages.chassis_decoder.form.reset_button') }}
                </button>
              </div>

              <!-- Error Message -->
              <div v-if="errorMessage" class="alert alert-error">
                <span>{{ errorMessage }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Decoded Results -->
      <div v-if="decodedResult" ref="decodedResultsSection" class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <div class="flex justify-between items-center mb-6">
              <h3 class="card-title text-xl font-semibold">
                {{ $t('pages.technical.subPages.chassis_decoder.results.title') }}
              </h3>
              <div>
                <span v-if="decodedResult.isValid" class="badge badge-success">{{
                  $t('pages.technical.subPages.chassis_decoder.results.status_decoded')
                }}</span>
                <span v-else class="badge badge-error">{{
                  $t('pages.technical.subPages.chassis_decoder.results.status_invalid')
                }}</span>
              </div>
            </div>
            <!-- Summary -->
            <div class="mb-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div class="stat">
                  <div class="stat-title">
                    {{ $t('pages.technical.subPages.chassis_decoder.results.year_range_stat') }}
                  </div>
                  <div class="stat-value text-lg">{{ decodedResult.yearRange }}</div>
                </div>
                <div class="stat">
                  <div class="stat-title text-lg">
                    {{ $t('pages.technical.subPages.chassis_decoder.results.chassis_number_stat') }}
                  </div>
                  <div class="stat-value text-xl font-mono">
                    <p class="badge badge-secondary badge-lg">{{ decodedResult.chassisNumber }}</p>
                  </div>
                </div>
                <div class="stat">
                  <div class="stat-title">
                    {{ $t('pages.technical.subPages.chassis_decoder.results.expected_pattern_stat') }}
                  </div>
                  <div class="stat-value text-lg font-mono">{{ decodedResult.pattern }}</div>
                </div>
              </div>
            </div>

            <!-- Validation Errors -->
            <div v-if="decodedResult.errors.length > 0" class="mb-6">
              <h4 class="text-lg font-semibold mb-3">
                {{ $t('pages.technical.subPages.chassis_decoder.results.validation_issues_title') }}
              </h4>
              <div class="space-y-2">
                <div v-for="error in decodedResult.errors" :key="error" class="alert alert-warning">
                  <span>{{ error }}</span>
                </div>
              </div>
            </div>

            <!-- Decoded Positions -->
            <div>
              <h4 class="text-lg font-semibold mb-4">
                {{ $t('pages.technical.subPages.chassis_decoder.results.decoded_positions_title') }}
              </h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div
                  v-for="position in decodedResult.decodedPositions"
                  :key="position.position"
                  class="flex items-start space-x-3 p-3 rounded-lg"
                  :class="position.matched ? 'bg-success/10' : 'bg-error/10'"
                >
                  <span class="position text-lg mt-0.5" :class="getPositionColorClass(position.position)"> ● </span>
                  <div class="flex-1">
                    <div class="flex items-center gap-2">
                      <span class="font-medium">
                        {{ $t('pages.technical.subPages.chassis_decoder.results.position_label') }}
                        {{ position.position }}: <strong>{{ position.value }}</strong>
                      </span>
                      <span v-if="position.matched" class="badge badge-success badge-sm">✓</span>
                      <span v-else class="badge badge-error badge-sm">✗</span>
                    </div>
                    <div class="text-md font-semibold mt-1">{{ position.name }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Special Notes -->
      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="card bg-base-100 shadow-md">
          <div class="card-body">
            <h3 class="card-title text-2xl font-semibold mb-4">
              {{ $t('pages.technical.subPages.chassis_decoder.special_notes.title') }}
            </h3>
            <div class="space-y-4">
              <div>
                <h4 class="text-lg font-semibold mb-2">
                  {{ $t('pages.technical.subPages.chassis_decoder.special_notes.build_number_title') }}
                </h4>
                <p>
                  {{ $t('pages.technical.subPages.chassis_decoder.special_notes.build_number_text') }}
                </p>
              </div>
              <div>
                <h4 class="text-lg font-semibold mb-2">
                  {{ $t('pages.technical.subPages.chassis_decoder.special_notes.assembly_plant_title') }}
                </h4>
                <p>
                  {{ $t('pages.technical.subPages.chassis_decoder.special_notes.assembly_plant_text') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="text-center">
          <p>
            {{ $t('pages.technical.subPages.chassis_decoder.attribution.text') }}
            <strong>{{ $t('pages.technical.subPages.chassis_decoder.attribution.mini_mania') }}</strong>
            {{ $t('pages.technical.subPages.chassis_decoder.attribution.technical_articles') }}
            <a
              href="https://www.minimania.com/Mini_Chassis_VIN_and_Commission_Numbers__Part_I__Revised_"
              target="_blank"
              rel="noopener noreferrer"
              class="link link-primary"
            >
              {{ $t('pages.technical.subPages.chassis_decoder.attribution.link_text') }}</a
            >
          </p>
        </div>
      </div>

      <div class="col-span-12 md:col-span-10 md:col-start-2">
        <div class="divider">{{ $t('pages.technical.subPages.chassis_decoder.ui.support_section') }}</div>
      </div>

      <div class="col-span-12 md:col-span-10 md:col-start-2 pb-10">
        <patreon-card size="large" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .position {
    &.position-1 {
      color: red;
    }
    &.position-2 {
      color: green;
    }
    &.position-3 {
      color: rgb(49, 66, 140);
    }
    &.position-4 {
      color: brown;
    }
    &.position-5 {
      color: orange;
    }
    &.position-6 {
      color: tomato;
    }
    &.position-7 {
      color: royalblue;
    }
    &.position-8 {
      color: teal;
    }
    &.position-9 {
      color: peru;
    }
    &.position-10 {
      color: saddlebrown;
    }
    &.position-11 {
      color: salmon;
    }
    &.position-numbers {
      color: purple;
    }
    &.position-last {
      color: tan;
    }
  }
</style>
