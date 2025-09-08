<script setup lang="ts">
  import { HERO_TYPES } from '../../data/models/generic';
  import { determineArchiveType, shareArchiveItem, submitArchiveFile } from '../../data/models/helper-utils';

  const { path, fullPath } = useRoute();
  const crumbs = ref([
    {
      title: $t('breadcrumb_archive'),
      disabled: false,
      href: '/archive',
    },
  ]);

  // Add error handling for data fetching
  const {
    data: currentPostData,
    status,
    error,
  } = await useAsyncData(path, async () => {
    const result = await queryCollection('content').path(path).first();
    return result || null;
  });

  // Provide default values and handle potential undefined values
  const archiveType = determineArchiveType(path) || 'unknown';
  const fileType = currentPostData.value?.download?.split('.')?.pop() || 'unknown';

  // Function to handle image loading errors
  const handleImageError = (event: Event) => {
    const imgElement = event.target as HTMLImageElement;
    if (imgElement) {
      imgElement.src = 'https://classicminidiy.s3.amazonaws.com/misc/placeholder.png';
      imgElement.classList.add('error');
    }
  };

  // Only add to breadcrumbs if we have valid data
  if (currentPostData.value?.title) {
    crumbs.value.push({
      title: currentPostData.value.title,
      disabled: true,
      href: '',
    });
  }

  await useHead({
    title: `${currentPostData.value?.title} ${$t('seo.title_suffix')}`,
    meta: [
      {
        key: 'description',
        name: 'description',
        content:
          currentPostData.value?.description || $t('seo.description_fallback', { title: currentPostData.value?.title }),
      },
      {
        key: 'keywords',
        name: 'keywords',
        content: $t('seo.keywords_template', {
          title: currentPostData.value?.title,
          fileType: fileType || 'resource',
          archiveType,
        }),
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: `https://classicminidiy.com${fullPath}`,
      },
      {
        rel: 'preconnect',
        href: 'https://classicminidiy.s3.amazonaws.com',
      },
    ],
  });

  await useSeoMeta({
    ogTitle: `${currentPostData.value?.title} ${$t('seo.og_title_suffix')}`,
    ogDescription:
      currentPostData.value?.description || $t('seo.description_fallback', { title: currentPostData.value?.title }),
    ogUrl: `https://classicminidiy.com${fullPath}`,
    ogImage: currentPostData.value?.image,
    ogType: 'article',
    author: currentPostData.value?.author,
    twitterCard: 'summary_large_image',
    twitterTitle: `${currentPostData.value?.title} ${$t('seo.twitter_title_suffix')}`,
    twitterDescription:
      currentPostData.value?.description || $t('seo.description_fallback', { title: currentPostData.value?.title }),
    twitterImage: currentPostData.value?.image,
  });

  // Add structured data for the archive item
  const archiveItemJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DigitalDocument',
    name: currentPostData.value?.title,
    description: currentPostData.value?.description,
    url: `https://classicminidiy.com${fullPath}`,
    image: currentPostData.value?.image,
    encodingFormat: fileType, // Using plain string value, not computed
    author: {
      '@type': 'Person',
      name: currentPostData.value?.author || $t('structured_data.author_fallback'),
    },
    publisher: {
      '@type': 'Organization',
      name: $t('structured_data.publisher_name'),
      logo: {
        '@type': 'ImageObject',
        url: 'https://classicminidiy.s3.amazonaws.com/misc/logo.png',
      },
    },
    isPartOf: {
      '@type': 'CollectionPage',
      name: $t('structured_data.collection_name'),
      url: 'https://classicminidiy.com/archive',
    },
  };

  // Add JSON-LD structured data to head
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(archiveItemJsonLd),
      },
    ],
  });
</script>

<template>
  <hero
    :navigation="true"
    :title="$t('hero_title')"
    textSize="text-3xl"
    :subtitle="currentPostData?.title"
    :heroType="HERO_TYPES.ARCHIVE"
  />
  <div class="container mx-auto px-4">
    <div class="mt-5">
      <div class="w-full">
        <div class="breadcrumbs text-sm">
          <ul>
            <li v-for="(crumb, index) in crumbs" :key="index">
              <template v-if="!crumb.disabled">
                <a :href="crumb.href">
                  <i v-if="index === 0" class="fa-duotone fa-book mr-2"></i>
                  {{ crumb.title }}
                </a>
              </template>
              <template v-else>
                <span>
                  {{ crumb.title }}
                </span>
              </template>
            </li>
          </ul>
        </div>
      </div>
      <!-- Loading state with skeleton loader -->
      <div v-if="status === 'pending'" class="mx-auto max-w-xs border p-4 rounded-lg">
        <div class="skeleton h-32 w-full"></div>
        <div class="skeleton h-4 w-28 mt-4"></div>
        <div class="skeleton h-4 w-full mt-2"></div>
        <div class="skeleton h-4 w-full mt-2"></div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="alert alert-error shadow-lg max-w-2xl mx-auto">
        <div>
          <i class="fa-duotone fa-circle-exclamation"></i>
          <span>{{ $t('loading_error') }}</span>
        </div>
      </div>
      <!-- Content state - only show if we have data and no errors -->
      <div v-if="currentPostData && status !== 'pending' && !error" class="flex justify-center">
        <div class="card bg-base-100 shadow-xl w-full max-w-4xl">
          <figure class="px-10 pt-10 pb-6">
            <!-- No image case -->
            <i
              v-if="!currentPostData.image || currentPostData.image === ''"
              class="fa-duotone fa-image-slash text-6xl"
              :aria-label="$t('no_image_alt')"
            ></i>
            <!-- Image with download link -->
            <a
              v-else-if="currentPostData.download && currentPostData.download !== ''"
              :href="currentPostData.download"
              :aria-label="$t('download_aria_label', { title: currentPostData.title || 'file' })"
              class="block"
            >
              <img
                :src="currentPostData.image"
                class="rounded-xl max-h-[200px] object-contain"
                :alt="
                  $t('preview_image_alt', {
                    title: currentPostData.title || $t('fallback_title'),
                  })
                "
                loading="lazy"
                @error="(e) => handleImageError(e)"
              />
            </a>
            <!-- Image without download link -->
            <img
              v-else
              :src="currentPostData.image"
              class="rounded-xl max-h-[200px] object-contain"
              :alt="
                $t('archive_item_alt', {
                  title: currentPostData.title || $t('fallback_title'),
                })
              "
              loading="lazy"
              @error="(e) => handleImageError(e)"
            />
          </figure>
          <div class="card-body items-center text-center">
            <!-- Title with fallback -->
            <h2 class="card-title text-2xl font-bold capitalize">
              {{ currentPostData.title?.toLowerCase() || $t('fallback_title') }}
            </h2>

            <div class="flex flex-wrap items-center justify-center gap-4 my-2">
              <!-- Code/reference number if available -->
              <div v-if="currentPostData.code" class="flex items-center">
                <i class="fa-duotone fa-list-timeline text-primary mr-2"></i>
                <span class="font-medium">{{ currentPostData.code }}</span>
              </div>

              <!-- File type if available -->
              <div v-if="currentPostData.download" class="flex items-center">
                <i class="fa-duotone fa-file text-secondary mr-2"></i>
                <span class="font-medium"
                  >{{ $t('file_type_label') }} {{ currentPostData.download?.split('.')?.pop() || 'unknown' }}</span
                >
              </div>
            </div>

            <!-- Description with fallback -->
            <p class="my-4">{{ currentPostData.description || $t('no_description') }}</p>

            <div class="card-actions justify-center mt-4">
              <ClientOnly>
                <button
                  class="btn btn-outline btn-info m-1 normal-case"
                  @click="shareArchiveItem(currentPostData.title, currentPostData.path)"
                >
                  <i class="fa-duotone fa-solid fa-arrow-up-from-bracket mr-2"></i>
                  {{ $t('share_button') }}
                </button>
                <button
                  class="btn btn-secondary m-1 normal-case"
                  @click="
                    submitArchiveFile(
                      archiveType,
                      currentPostData.title,
                      currentPostData.path,
                      currentPostData.code,
                      currentPostData.description
                    )
                  "
                >
                  <i class="fa-duotone fa-solid fa-plus-large mr-2"></i>
                  {{ $t('contribute_button') }}
                </button>
                <button
                  v-if="
                    (!currentPostData.download || currentPostData.download === '') &&
                    !currentPostData.path?.includes('companies')
                  "
                  class="btn btn-disabled m-1 normal-case"
                  disabled
                >
                  <i class="fa-duotone fa-solid fa-question mr-2"></i>
                  {{ $t('missing_file_button') }}
                </button>
                <a
                  v-else-if="!currentPostData.path?.includes('companies')"
                  class="btn btn-primary m-1 normal-case"
                  :href="currentPostData.download"
                >
                  <i class="fa-duotone fa-solid fa-download mr-2"></i>
                  {{ $t('download_button') }}
                </a>
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "breadcrumb_archive": "Archive",
    "hero_title": "Classic Mini Archives",
    "loading_error": "Error loading content. Please try again later.",
    "no_image_alt": "No image available",
    "download_aria_label": "Download {title}",
    "preview_image_alt": "{title} preview image",
    "archive_item_alt": "{title} image",
    "fallback_title": "Archive Item",
    "file_type_label": "Type:",
    "no_description": "No description available.",
    "share_button": "Share",
    "contribute_button": "Contribute",
    "missing_file_button": "Missing File",
    "download_button": "Download",
    "seo": {
      "title_suffix": "- Classic Mini Archive - Classic Mini DIY",
      "description_fallback": "Archive resource for {title} in the Classic Mini DIY collection.",
      "keywords_template": "Classic Mini, {title}, archive, Mini Cooper, {fileType}, {archiveType}",
      "og_title_suffix": "- Classic Mini Archive",
      "twitter_title_suffix": "- Classic Mini Archive"
    },
    "structured_data": {
      "author_fallback": "Classic Mini DIY",
      "publisher_name": "Classic Mini DIY",
      "collection_name": "Classic Mini Archives"
    }
  }
}
</i18n>

<style lang="scss">
  .companies-content {
    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      padding-bottom: 1rem;
    }
    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      padding-bottom: 1rem;
    }
    p {
      padding-bottom: 1.5rem;
    }
  }

  .post {
    .divider {
      height: 1px;
      background-color: hsl(var(--b3, var(--b2)) / var(--tw-bg-opacity, 1)); /* Equivalent to @apply bg-base-300 */
    }
  }

  /* Fallback for image loading errors */
  img {
    &.error {
      opacity: 0.5;
    }
  }
</style>
