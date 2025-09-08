<script lang="ts" setup>
  import type { Color, PrettyColor } from '../../../../data/models/colors';
  import { HERO_TYPES } from '../../../../data/models/generic';

  const { query } = useRoute();
  const { data: color, status } = await useFetch<PrettyColor | null>(`/api/colors/single`, {
    query: {
      id: query.color,
    },
    // Only fetch if we have a color ID
    server: !!query.color,
    default: () => null,
  });

  watch(color, (newColor: PrettyColor | null) => {
    if (newColor) {
      formData.code = newColor.pretty.Code || '';
      formData.ditzlerPpgCode = newColor.pretty['Ditzler PPG Code'] || '';
      formData.duluxCode = newColor.pretty['Dulux Code'] || '';
      formData.name = newColor.pretty.Name || '';
      formData.shortCode = newColor.pretty['Short Code'] || '';
      formData.years = newColor.pretty.Years || '';
      formData.imageSwatch = newColor.raw.imageSwatch || '';
    }
  });

  const issueCreated = ref(false);
  const apiError = ref(false);
  const suggestion = ref<{
    number: number;
    url: string;
  }>({
    number: 0,
    url: '',
  });

  const apiMessage = ref('');
  const processing = ref(false);

  const formData = reactive({
    code: color.value?.pretty.Code || '',
    ditzlerPpgCode: color.value?.pretty['Ditzler PPG Code'] || '',
    duluxCode: color.value?.pretty['Dulux Code'] || '',
    name: color.value?.pretty.Name || '',
    shortCode: color.value?.pretty['Short Code'] || '',
    years: color.value?.pretty.Years || '',
    imageSwatch: color.value?.raw.imageSwatch || '',
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
    ogUrl: 'https://classicminidiy.com/archive/colors/contribute',
    ogType: 'website',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/colors.png',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('seo.twitter_title'),
    twitterDescription: $t('seo.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/colors.png',
  });

  interface GitHubIssueResponse {
    number: number;
    html_url: string;
  }

  interface SubmitPayload {
    color: Color;
    newDetails: {
      code: string;
      ditzlerPpgCode: string;
      duluxCode: string;
      name: string;
      shortCode: string;
      years: string;
      imageSwatch: string;
    };
  }

  async function submit() {
    if (!color.value) {
      apiError.value = true;
      apiMessage.value = $t('form.error.color_not_loaded');
      return;
    }

    processing.value = true;
    try {
      const payload: SubmitPayload = {
        color: color.value.raw,
        newDetails: {
          code: formData.code,
          ditzlerPpgCode: formData.ditzlerPpgCode,
          duluxCode: formData.duluxCode,
          name: formData.name,
          shortCode: formData.shortCode,
          years: formData.years,
          imageSwatch: formData.imageSwatch,
        },
      };

      const { data: response } = await useFetch<GitHubIssueResponse>('/api/colors/contribute', {
        method: 'POST',
        body: payload,
      });

      if (response.value) {
        issueCreated.value = true;
        apiError.value = false;
        suggestion.value = {
          number: response.value.number,
          url: response.value.html_url,
        };
      } else {
        throw new Error('No response from server');
      }
    } catch (error) {
      issueCreated.value = false;
      apiError.value = true;
      apiMessage.value = $t('form.error.github_unavailable');
      console.error('Error submitting color contribution:', error);
    } finally {
      processing.value = false;
    }
  }
</script>

<template>
  <hero :navigation="true" :title="$t('hero_title')" :heroType="HERO_TYPES.ARCHIVE" />

  <div class="container mx-auto px-4 py-6">
    <!-- Breadcrumb -->
    <div class="mb-6">
      <breadcrumb :page="$t('breadcrumb_title')" />
    </div>

    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-4">{{ $t('main_heading') }}</h1>
      <p class="mb-6 text-base">
        {{ $t('description_text') }}
      </p>
      <div class="divider"></div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Current Data Card -->
      <div class="lg:col-span-1">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body p-0">
            <div class="card-title bg-gray-200 p-4">
              <i class="fas fa-list-timeline mr-2"></i>
              <h2 class="text-lg font-semibold">
                {{ $t('current_data.title') }}
              </h2>
            </div>

            <div v-if="status === 'pending'" class="flex justify-center p-8">
              <span class="loading loading-spinner loading-lg text-primary"></span>
            </div>

            <div v-else-if="status === 'success' && color" class="p-4">
              <div class="flex justify-center mb-4">
                <picture v-if="color.pretty.hasSwatch" class="block w-full max-w-xs">
                  <source
                    :srcset="`https://classicminidiy.s3.amazonaws.com/colors/${color.pretty.Code}.webp`"
                    type="image/webp"
                  />
                  <source
                    :srcset="`https://classicminidiy.s3.amazonaws.com/colors/${color.pretty.Code}.jpg`"
                    type="image/jpg"
                  />
                  <img
                    loading="lazy"
                    alt="Color swatch"
                    :src="`https://classicminidiy.s3.amazonaws.com/colors/${color?.pretty?.Code}.jpg`"
                    class="w-full h-auto rounded-lg shadow"
                  />
                </picture>
                <div v-else class="flex items-center justify-center py-8">
                  <div class="text-center">
                    <i class="fas fa-spinner fa-spin text-3xl text-primary mb-2"></i>
                    <p class="text-sm text-gray-600">
                      {{ $t('current_data.loading') }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <div v-if="color?.pretty">
                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{
                        $t('current_data.labels.primary_color')
                      }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty['Primary Color'] }}
                      </p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{ $t('current_data.labels.code') }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty.Code }}
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{
                        $t('current_data.labels.ditzler_ppg_code')
                      }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty['Ditzler PPG Code'] || $t('current_data.na') }}
                      </p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{
                        $t('current_data.labels.dulux_code')
                      }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty['Dulux Code'] || $t('current_data.na') }}
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{ $t('current_data.labels.name') }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty.Name || $t('current_data.na') }}
                      </p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{
                        $t('current_data.labels.short_code')
                      }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty['Short Code'] || $t('current_data.na') }}
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 gap-4">
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{
                        $t('current_data.labels.years_used')
                      }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty.Years || $t('current_data.na') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Card -->
      <div class="lg:col-span-2">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body p-0">
            <!-- Success Message -->
            <div v-if="issueCreated" class="p-6 text-center">
              <div class="mb-4">
                <i class="fas fa-check-circle text-6xl text-success"></i>
              </div>
              <h1 class="text-2xl font-bold mb-2">
                {{ $t('form.success.title') }}
              </h1>
              <h2 class="text-xl mb-6">{{ $t('form.success.subtitle') }}</h2>
              <div class="space-y-4 text-left max-w-md mx-auto">
                <div class="bg-base-200 p-4 rounded-lg">
                  <p class="font-medium">{{ $t('form.success.suggestion_number') }}{{ suggestion.number }}</p>
                  <p class="text-sm text-gray-600">
                    {{ $t('form.success.track_text') }}
                    <a :href="suggestion.url" target="_blank" class="link link-primary">
                      {{ $t('form.success.view_github') }}
                    </a>
                  </p>
                </div>
                <button @click="issueCreated = false" class="btn btn-primary w-full">
                  {{ $t('form.success.make_another') }}
                </button>
              </div>
            </div>

            <!-- Form -->
            <div v-else>
              <div class="card-title bg-primary text-primary-content p-4">
                <i class="fas fa-sparkles mr-2"></i>
                <h2 class="text-lg font-semibold">{{ $t('form.title') }}</h2>
              </div>

              <div class="p-6">
                <!-- Error Alert -->
                <div v-if="apiError" class="alert alert-warning mb-6">
                  <i class="fas fa-exclamation-triangle mr-2"></i>
                  <div>
                    <h3 class="font-bold">{{ $t('form.error.title') }}</h3>
                    <div class="text-xs">
                      {{ apiMessage || $t('form.error.default_message') }}
                    </div>
                  </div>
                </div>

                <!-- Form Fields -->
                <form @submit.prevent="submit" class="space-y-4">
                  <div class="form-control">
                    <label class="label" for="colorName">
                      <span class="label-text">{{ $t('form.fields.color_name.label') }}</span>
                    </label>
                    <div class="relative">
                      <i class="fas fa-id-card absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        id="colorName"
                        type="text"
                        v-model="formData.name"
                        :placeholder="$t('form.fields.color_name.placeholder')"
                        class="input input-bordered w-full pl-10"
                        maxlength="30"
                        required
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                      <label class="label" for="primaryCode">
                        <span class="label-text">{{ $t('form.fields.primary_code.label') }}</span>
                      </label>
                      <div class="relative">
                        <i
                          class="fas fa-brackets-curly absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                        <input
                          id="code"
                          v-model="formData.code"
                          type="text"
                          :placeholder="$t('form.fields.primary_code.placeholder')"
                          class="input input-bordered w-full"
                          :disabled="processing"
                          required
                        />
                      </div>
                    </div>

                    <div class="form-control">
                      <label class="label" for="shortCode">
                        <span class="label-text">{{ $t('form.fields.short_code.label') }}</span>
                      </label>
                      <div class="relative">
                        <i
                          class="fas fa-brackets-curly absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                        <input
                          id="shortCode"
                          v-model="formData.shortCode"
                          type="text"
                          :placeholder="$t('form.fields.short_code.placeholder')"
                          class="input input-bordered w-full"
                          :disabled="processing"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                      <label class="label" for="ditzlerPpgCode">
                        <span class="label-text">{{ $t('form.fields.ditzler_ppg_code.label') }}</span>
                      </label>
                      <div class="relative">
                        <i
                          class="fas fa-brackets-curly absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                        <input
                          id="ditzlerPpgCode"
                          v-model="formData.ditzlerPpgCode"
                          type="text"
                          :placeholder="$t('form.fields.ditzler_ppg_code.placeholder')"
                          class="input input-bordered w-full"
                          :disabled="processing"
                        />
                      </div>
                    </div>

                    <div class="form-control">
                      <label class="label" for="duluxCode">
                        <span class="label-text">{{ $t('form.fields.dulux_code.label') }}</span>
                      </label>
                      <div class="relative">
                        <i
                          class="fas fa-brackets-curly absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                        <input
                          id="duluxCode"
                          v-model="formData.duluxCode"
                          type="text"
                          :placeholder="$t('form.fields.dulux_code.placeholder')"
                          class="input input-bordered w-full"
                          :disabled="processing"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-control">
                    <label class="label" for="years">
                      <span class="label-text">{{ $t('form.fields.years_used.label') }}</span>
                    </label>
                    <div class="relative">
                      <i
                        class="fas fa-calendar-days absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      ></i>
                      <input
                        id="years"
                        v-model="formData.years"
                        type="text"
                        :placeholder="$t('form.fields.years_used.placeholder')"
                        class="input input-bordered w-full"
                        :disabled="processing"
                      />
                    </div>
                  </div>

                  <div class="form-control">
                    <label class="label" for="imageSwatch">
                      <span class="label-text">{{ $t('form.fields.image_swatch.label') }}</span>
                    </label>
                    <div class="relative">
                      <i class="fas fa-image absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        id="imageSwatch"
                        v-model="formData.imageSwatch"
                        type="text"
                        :placeholder="$t('form.fields.image_swatch.placeholder')"
                        class="input input-bordered w-full"
                        :disabled="processing"
                      />
                    </div>
                    <label class="label">
                      <span class="label-text-alt">{{ $t('form.fields.image_swatch.help') }}</span>
                    </label>
                  </div>

                  <div class="pt-4">
                    <button type="submit" class="btn btn-primary w-full" :disabled="processing">
                      <span v-if="processing" class="loading loading-spinner"></span>
                      {{ processing ? $t('form.submit.submitting') : $t('form.submit.button') }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .filler-image {
    img,
    source {
      max-width: 200px;
      max-height: 200px;
    }
  }

  .badge-soft {
    background-color: rgba(0, 0, 0, 0.2);
    color: rgba(0, 0, 0, 0.7);
  }
</style>

<i18n lang="json">
{
  "en": {
    "title": "Contribute Color - Classic Mini DIY",
    "description": "Contribute to the Classic Mini color database by submitting new or updated color information.",
    "hero_title": "Contribute to Colors",
    "breadcrumb_title": "Color Contribution",
    "main_heading": "Classic Mini Color Picker",
    "description_text": "Looking to make some suggestions to the color database? Fill out the form below to submit any changes you'd like. These will be reviewed and published within ~7 days.",
    "current_data": {
      "title": "Current Data",
      "loading": "Loading color data...",
      "labels": {
        "primary_color": "Primary Color",
        "code": "Code",
        "ditzler_ppg_code": "Ditzler PPG Code",
        "dulux_code": "Dulux Code",
        "name": "Name",
        "short_code": "Short Code",
        "years_used": "Years Used"
      },
      "na": "N/A"
    },
    "form": {
      "title": "New Data",
      "success": {
        "title": "Thank you!",
        "subtitle": "Your suggestion has been submitted",
        "suggestion_number": "Suggestion #",
        "track_text": "Track your suggestion:",
        "view_github": "View on GitHub",
        "make_another": "Make Another Suggestion"
      },
      "error": {
        "title": "Error Submitting Request",
        "default_message": "Please try again later",
        "color_not_loaded": "Color data not loaded. Please refresh the page and try again.",
        "github_unavailable": "GitHub API is currently unavailable. Please try again later."
      },
      "fields": {
        "color_name": {
          "label": "Color Name",
          "placeholder": "Enter color name"
        },
        "primary_code": {
          "label": "Primary Code",
          "placeholder": "e.g., ANA 101"
        },
        "short_code": {
          "label": "Short Code",
          "placeholder": "e.g., BRG"
        },
        "ditzler_ppg_code": {
          "label": "Ditzler/PPG Code",
          "placeholder": "e.g., 12345"
        },
        "dulux_code": {
          "label": "Dulux Code",
          "placeholder": "e.g., ABC123"
        },
        "years_used": {
          "label": "Years Used",
          "placeholder": "e.g., 1959-1967"
        },
        "image_swatch": {
          "label": "Image Swatch URL (optional)",
          "placeholder": "e.g., https://example.com/color.jpg",
          "help": "Provide a direct URL to a high-quality color swatch image"
        }
      },
      "submit": {
        "button": "Submit Suggestion",
        "submitting": "Submitting..."
      }
    },
    "seo": {
      "og_title": "Contribute Color - Classic Mini DIY",
      "og_description": "Contribute to the Classic Mini color database by submitting new or updated color information.",
      "twitter_title": "Contribute Color - Classic Mini DIY",
      "twitter_description": "Contribute to the Classic Mini color database by submitting new or updated color information."
    }
  }
}
</i18n>
