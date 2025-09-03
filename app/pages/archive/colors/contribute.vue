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

  const { t } = useI18n();

  useHead({
    title: t('pages.archive.subpages.colors_contribute.title'),

    meta: [
      {
        name: 'description',
        content: t('pages.archive.subpages.colors_contribute.description'),
      },
    ],
  });

  useSeoMeta({
    ogTitle: t('pages.archive.subpages.colors_contribute.seo.og_title'),
    ogDescription: t('pages.archive.subpages.colors_contribute.seo.og_description'),
    ogUrl: 'https://classicminidiy.com/archive/colors/contribute',
    ogType: 'website',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/archive/colors.png',
    twitterCard: 'summary_large_image',
    twitterTitle: t('pages.archive.subpages.colors_contribute.seo.twitter_title'),
    twitterDescription: t('pages.archive.subpages.colors_contribute.seo.twitter_description'),
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
      apiMessage.value = t('pages.archive.subpages.colors_contribute.form.error.color_not_loaded');
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
      apiMessage.value = t('pages.archive.subpages.colors_contribute.form.error.github_unavailable');
      console.error('Error submitting color contribution:', error);
    } finally {
      processing.value = false;
    }
  }
</script>

<template>
  <hero
    :navigation="true"
    :title="t('pages.archive.subpages.colors_contribute.hero_title')"
    :heroType="HERO_TYPES.ARCHIVE"
  />

  <div class="container mx-auto px-4 py-6">
    <!-- Breadcrumb -->
    <div class="mb-6">
      <breadcrumb :page="t('pages.archive.subpages.colors_contribute.breadcrumb_title')" />
    </div>

    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-4">{{ t('pages.archive.subpages.colors_contribute.main_heading') }}</h1>
      <p class="mb-6 text-base">
        {{ t('pages.archive.subpages.colors_contribute.description_text') }}
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
                {{ t('pages.archive.subpages.colors_contribute.current_data.title') }}
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
                      {{ t('pages.archive.subpages.colors_contribute.current_data.loading') }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <div v-if="color?.pretty">
                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{
                        t('pages.archive.subpages.colors_contribute.current_data.labels.primary_color')
                      }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty['Primary Color'] }}
                      </p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{
                        t('pages.archive.subpages.colors_contribute.current_data.labels.code')
                      }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty.Code }}
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{
                        t('pages.archive.subpages.colors_contribute.current_data.labels.ditzler_ppg_code')
                      }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{
                          color.pretty['Ditzler PPG Code'] ||
                          t('pages.archive.subpages.colors_contribute.current_data.na')
                        }}
                      </p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{
                        t('pages.archive.subpages.colors_contribute.current_data.labels.dulux_code')
                      }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{
                          color.pretty['Dulux Code'] || t('pages.archive.subpages.colors_contribute.current_data.na')
                        }}
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{
                        t('pages.archive.subpages.colors_contribute.current_data.labels.name')
                      }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty.Name || t('pages.archive.subpages.colors_contribute.current_data.na') }}
                      </p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{
                        t('pages.archive.subpages.colors_contribute.current_data.labels.short_code')
                      }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{
                          color.pretty['Short Code'] || t('pages.archive.subpages.colors_contribute.current_data.na')
                        }}
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 gap-4">
                    <div>
                      <label class="text-sm font-medium text-gray-700">{{
                        t('pages.archive.subpages.colors_contribute.current_data.labels.years_used')
                      }}</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty.Years || t('pages.archive.subpages.colors_contribute.current_data.na') }}
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
                {{ t('pages.archive.subpages.colors_contribute.form.success.title') }}
              </h1>
              <h2 class="text-xl mb-6">{{ t('pages.archive.subpages.colors_contribute.form.success.subtitle') }}</h2>
              <div class="space-y-4 text-left max-w-md mx-auto">
                <div class="bg-base-200 p-4 rounded-lg">
                  <p class="font-medium">
                    {{ t('pages.archive.subpages.colors_contribute.form.success.suggestion_number')
                    }}{{ suggestion.number }}
                  </p>
                  <p class="text-sm text-gray-600">
                    {{ t('pages.archive.subpages.colors_contribute.form.success.track_text') }}
                    <a :href="suggestion.url" target="_blank" class="link link-primary">
                      {{ t('pages.archive.subpages.colors_contribute.form.success.view_github') }}
                    </a>
                  </p>
                </div>
                <button @click="issueCreated = false" class="btn btn-primary w-full">
                  {{ t('pages.archive.subpages.colors_contribute.form.success.make_another') }}
                </button>
              </div>
            </div>

            <!-- Form -->
            <div v-else>
              <div class="card-title bg-primary text-primary-content p-4">
                <i class="fas fa-sparkles mr-2"></i>
                <h2 class="text-lg font-semibold">{{ t('pages.archive.subpages.colors_contribute.form.title') }}</h2>
              </div>

              <div class="p-6">
                <!-- Error Alert -->
                <div v-if="apiError" class="alert alert-warning mb-6">
                  <i class="fas fa-exclamation-triangle mr-2"></i>
                  <div>
                    <h3 class="font-bold">{{ t('pages.archive.subpages.colors_contribute.form.error.title') }}</h3>
                    <div class="text-xs">
                      {{ apiMessage || t('pages.archive.subpages.colors_contribute.form.error.default_message') }}
                    </div>
                  </div>
                </div>

                <!-- Form Fields -->
                <form @submit.prevent="submit" class="space-y-4">
                  <div class="form-control">
                    <label class="label" for="colorName">
                      <span class="label-text">{{
                        t('pages.archive.subpages.colors_contribute.form.fields.color_name.label')
                      }}</span>
                    </label>
                    <div class="relative">
                      <i class="fas fa-id-card absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        id="colorName"
                        type="text"
                        v-model="formData.name"
                        :placeholder="t('pages.archive.subpages.colors_contribute.form.fields.color_name.placeholder')"
                        class="input input-bordered w-full pl-10"
                        maxlength="30"
                        required
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                      <label class="label" for="primaryCode">
                        <span class="label-text">{{
                          t('pages.archive.subpages.colors_contribute.form.fields.primary_code.label')
                        }}</span>
                      </label>
                      <div class="relative">
                        <i
                          class="fas fa-brackets-curly absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                        <input
                          id="code"
                          v-model="formData.code"
                          type="text"
                          :placeholder="
                            t('pages.archive.subpages.colors_contribute.form.fields.primary_code.placeholder')
                          "
                          class="input input-bordered w-full"
                          :disabled="processing"
                          required
                        />
                      </div>
                    </div>

                    <div class="form-control">
                      <label class="label" for="shortCode">
                        <span class="label-text">{{
                          t('pages.archive.subpages.colors_contribute.form.fields.short_code.label')
                        }}</span>
                      </label>
                      <div class="relative">
                        <i
                          class="fas fa-brackets-curly absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                        <input
                          id="shortCode"
                          v-model="formData.shortCode"
                          type="text"
                          :placeholder="
                            t('pages.archive.subpages.colors_contribute.form.fields.short_code.placeholder')
                          "
                          class="input input-bordered w-full"
                          :disabled="processing"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                      <label class="label" for="ditzlerPpgCode">
                        <span class="label-text">{{
                          t('pages.archive.subpages.colors_contribute.form.fields.ditzler_ppg_code.label')
                        }}</span>
                      </label>
                      <div class="relative">
                        <i
                          class="fas fa-brackets-curly absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                        <input
                          id="ditzlerPpgCode"
                          v-model="formData.ditzlerPpgCode"
                          type="text"
                          :placeholder="
                            t('pages.archive.subpages.colors_contribute.form.fields.ditzler_ppg_code.placeholder')
                          "
                          class="input input-bordered w-full"
                          :disabled="processing"
                        />
                      </div>
                    </div>

                    <div class="form-control">
                      <label class="label" for="duluxCode">
                        <span class="label-text">{{
                          t('pages.archive.subpages.colors_contribute.form.fields.dulux_code.label')
                        }}</span>
                      </label>
                      <div class="relative">
                        <i
                          class="fas fa-brackets-curly absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                        <input
                          id="duluxCode"
                          v-model="formData.duluxCode"
                          type="text"
                          :placeholder="
                            t('pages.archive.subpages.colors_contribute.form.fields.dulux_code.placeholder')
                          "
                          class="input input-bordered w-full"
                          :disabled="processing"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-control">
                    <label class="label" for="years">
                      <span class="label-text">{{
                        t('pages.archive.subpages.colors_contribute.form.fields.years_used.label')
                      }}</span>
                    </label>
                    <div class="relative">
                      <i
                        class="fas fa-calendar-days absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      ></i>
                      <input
                        id="years"
                        v-model="formData.years"
                        type="text"
                        :placeholder="t('pages.archive.subpages.colors_contribute.form.fields.years_used.placeholder')"
                        class="input input-bordered w-full"
                        :disabled="processing"
                      />
                    </div>
                  </div>

                  <div class="form-control">
                    <label class="label" for="imageSwatch">
                      <span class="label-text">{{
                        t('pages.archive.subpages.colors_contribute.form.fields.image_swatch.label')
                      }}</span>
                    </label>
                    <div class="relative">
                      <i class="fas fa-image absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        id="imageSwatch"
                        v-model="formData.imageSwatch"
                        type="text"
                        :placeholder="
                          t('pages.archive.subpages.colors_contribute.form.fields.image_swatch.placeholder')
                        "
                        class="input input-bordered w-full"
                        :disabled="processing"
                      />
                    </div>
                    <label class="label">
                      <span class="label-text-alt">{{
                        t('pages.archive.subpages.colors_contribute.form.fields.image_swatch.help')
                      }}</span>
                    </label>
                  </div>

                  <div class="pt-4">
                    <button type="submit" class="btn btn-primary w-full" :disabled="processing">
                      <span v-if="processing" class="loading loading-spinner"></span>
                      {{
                        processing
                          ? t('pages.archive.subpages.colors_contribute.form.submit.submitting')
                          : t('pages.archive.subpages.colors_contribute.form.submit.button')
                      }}
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
