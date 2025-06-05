<script lang="ts" setup>
  import type { Color, PrettyColor } from '~/data/models/colors';
  import { HERO_TYPES } from '~/data/models/generic';

  const { query } = useRoute();
  const { data: color, status } = await useFetch<PrettyColor | null>(`/api/colors/single`, {
    query: {
      id: query.color,
    },
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
    title: 'Contribute Color - Classic Mini DIY',
    meta: [
      {
        name: 'description',
        content: 'Contribute to the Classic Mini color database by submitting new or updated color information.',
      },
    ],
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
      apiMessage.value = 'Color data not loaded. Please refresh the page and try again.';
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
      apiMessage.value = 'GitHub API is currently unavailable. Please try again later.';
      console.error('Error submitting color contribution:', error);
    } finally {
      processing.value = false;
    }
  }
</script>

<template>
  <hero :navigation="true" :title="'Contribute to Colors'" :heroType="HERO_TYPES.ARCHIVE" />

  <div class="container mx-auto px-4 py-6">
    <!-- Breadcrumb -->
    <div class="mb-6">
      <breadcrumb page="Color Contribution" />
    </div>

    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-4">Classic Mini Color Picker</h1>
      <p class="mb-6 text-base">
        Looking to make some suggestions to the color database? Fill out the form below to submit any changes you'd
        like. These will be reviewed and published within ~7 days.
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
              <h2 class="text-lg font-semibold">Current Data</h2>
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
                    <p class="text-sm text-gray-600">Loading color data...</p>
                  </div>
                </div>
              </div>

              <div class="space-y-2">
                <div v-if="color?.pretty">
                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label class="text-sm font-medium text-gray-700">Primary Color</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty['Primary Color'] }}
                      </p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-700">Code</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty.Code }}
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label class="text-sm font-medium text-gray-700">Ditzler PPG Code</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty['Ditzler PPG Code'] || 'N/A' }}
                      </p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-700">Dulux Code</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty['Dulux Code'] || 'N/A' }}
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label class="text-sm font-medium text-gray-700">Name</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty.Name || 'N/A' }}
                      </p>
                    </div>
                    <div>
                      <label class="text-sm font-medium text-gray-700">Short Code</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty['Short Code'] || 'N/A' }}
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-1 gap-4">
                    <div>
                      <label class="text-sm font-medium text-gray-700">Years Used</label>
                      <p class="mt-1 text-sm text-gray-900">
                        {{ color.pretty.Years || 'N/A' }}
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
              <h1 class="text-2xl font-bold mb-2">Thank you!</h1>
              <h2 class="text-xl mb-6">Your suggestion has been submitted</h2>
              <div class="space-y-4 text-left max-w-md mx-auto">
                <div class="bg-base-200 p-4 rounded-lg">
                  <p class="font-medium">Suggestion #{{ suggestion.number }}</p>
                  <p class="text-sm text-gray-600">
                    Track your suggestion:
                    <a :href="suggestion.url" target="_blank" class="link link-primary"> View on GitHub </a>
                  </p>
                </div>
                <button @click="issueCreated = false" class="btn btn-primary w-full">Make Another Suggestion</button>
              </div>
            </div>

            <!-- Form -->
            <div v-else>
              <div class="card-title bg-primary text-primary-content p-4">
                <i class="fas fa-sparkles mr-2"></i>
                <h2 class="text-lg font-semibold">New Data</h2>
              </div>

              <div class="p-6">
                <!-- Error Alert -->
                <div v-if="apiError" class="alert alert-warning mb-6">
                  <i class="fas fa-exclamation-triangle mr-2"></i>
                  <div>
                    <h3 class="font-bold">Error Submitting Request</h3>
                    <div class="text-xs">{{ apiMessage || 'Please try again later' }}</div>
                  </div>
                </div>

                <!-- Form Fields -->
                <form @submit.prevent="submit" class="space-y-4">
                  <div class="form-control">
                    <label class="label" for="colorName">
                      <span class="label-text">Color Name</span>
                    </label>
                    <div class="relative">
                      <i class="fas fa-id-card absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        id="colorName"
                        type="text"
                        v-model="formData.name"
                        placeholder="Enter color name"
                        class="input input-bordered w-full pl-10"
                        maxlength="30"
                        required
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                      <label class="label" for="primaryCode">
                        <span class="label-text">Primary Code</span>
                      </label>
                      <div class="relative">
                        <i
                          class="fas fa-brackets-curly absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                        <input
                          id="code"
                          v-model="formData.code"
                          type="text"
                          placeholder="e.g., ANA 101"
                          class="input input-bordered w-full"
                          :disabled="processing"
                          required
                        />
                      </div>
                    </div>

                    <div class="form-control">
                      <label class="label" for="shortCode">
                        <span class="label-text">Short Code</span>
                      </label>
                      <div class="relative">
                        <i
                          class="fas fa-brackets-curly absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                        <input
                          id="shortCode"
                          v-model="formData.shortCode"
                          type="text"
                          placeholder="e.g., BRG"
                          class="input input-bordered w-full"
                          :disabled="processing"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control">
                      <label class="label" for="ditzlerPpgCode">
                        <span class="label-text">Ditzler/PPG Code</span>
                      </label>
                      <div class="relative">
                        <i
                          class="fas fa-brackets-curly absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                        <input
                          id="ditzlerPpgCode"
                          v-model="formData.ditzlerPpgCode"
                          type="text"
                          placeholder="e.g., 12345"
                          class="input input-bordered w-full"
                          :disabled="processing"
                        />
                      </div>
                    </div>

                    <div class="form-control">
                      <label class="label" for="duluxCode">
                        <span class="label-text">Dulux Code</span>
                      </label>
                      <div class="relative">
                        <i
                          class="fas fa-brackets-curly absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        ></i>
                        <input
                          id="duluxCode"
                          v-model="formData.duluxCode"
                          type="text"
                          placeholder="e.g., ABC123"
                          class="input input-bordered w-full"
                          :disabled="processing"
                        />
                      </div>
                    </div>
                  </div>

                  <div class="form-control">
                    <label class="label" for="years">
                      <span class="label-text">Years Used</span>
                    </label>
                    <div class="relative">
                      <i
                        class="fas fa-calendar-days absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      ></i>
                      <input
                        id="years"
                        v-model="formData.years"
                        type="text"
                        placeholder="e.g., 1959-1967"
                        class="input input-bordered w-full"
                        :disabled="processing"
                      />
                    </div>
                  </div>

                  <div class="form-control">
                    <label class="label" for="imageSwatch">
                      <span class="label-text">Image Swatch URL (optional)</span>
                    </label>
                    <div class="relative">
                      <i class="fas fa-image absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        id="imageSwatch"
                        v-model="formData.imageSwatch"
                        type="text"
                        placeholder="e.g., https://example.com/color.jpg"
                        class="input input-bordered w-full"
                        :disabled="processing"
                      />
                    </div>
                    <label class="label">
                      <span class="label-text-alt">Provide a direct URL to a high-quality color swatch image</span>
                    </label>
                  </div>

                  <div class="pt-4">
                    <button type="submit" class="btn btn-primary w-full" :disabled="processing">
                      <span v-if="processing" class="loading loading-spinner"></span>
                      {{ processing ? 'Submitting...' : 'Submit Suggestion' }}
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
