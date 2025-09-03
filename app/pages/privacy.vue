<script setup lang="ts">
  import { HERO_TYPES } from '../../data/models/generic';

  const { t } = useI18n();

  useHead({
    title: t('pages.privacy.title'),
    meta: [
      {
        key: 'description',
        name: 'description',
        content: t('pages.privacy.description'),
      },
      {
        key: 'keywords',
        name: 'keywords',
        content: 'privacy policy, Classic Mini DIY, data protection, YouTube API, terms of service, data collection',
      },
      {
        key: 'robots',
        content: 'noindex',
      },
    ],
    link: [
      {
        rel: 'canonical',
        href: 'https://classicminidiy.com/privacy',
      },
    ],
  });

  useSeoMeta({
    ogTitle: t('pages.privacy.title'),
    ogDescription: t('pages.privacy.description'),
    ogUrl: 'https://classicminidiy.com/privacy',
    ogType: 'website',
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/root.png',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Privacy Policy | Classic Mini DIY',
    twitterDescription:
      'Classic Mini DIY privacy policy regarding data collection, storage, and use of YouTube API Services.',
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/root.png',
  });

  // Add structured data for the privacy policy page
  const privacyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    description: 'Classic Mini DIY privacy policy regarding data collection, storage, and use of YouTube API Services.',
    publisher: {
      '@type': 'Organization',
      name: 'Classic Mini DIY',
      logo: {
        '@type': 'ImageObject',
        url: 'https://classicminidiy.s3.amazonaws.com/misc/logo.png',
      },
    },
    url: 'https://classicminidiy.com/privacy',
  };

  // Add JSON-LD structured data to head
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(privacyJsonLd),
      },
    ],
  });
</script>

<template>
  <hero
    :titleKey="'pages.privacy.hero_title'"
    :subtitleKey="'pages.privacy.hero_subtitle'"
    :textSize="'3xl'"
    :special="true"
    :heroType="HERO_TYPES.HOME"
    :background="'/backdrop2'"
    :navigation="true"
  />
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <h1 class="text-3xl font-medium">{{ t('pages.privacy.heading') }}</h1>

        <ol class="list-decimal pl-5 pt-5">
          <li>
            <h3 class="text-xl font-medium mb-2">{{ t('pages.privacy.acceptance_title') }}</h3>
            <p class="py-2 mb-4">
              {{ t('pages.privacy.acceptance_content') }}
              <a
                class="link link-primary mr-3"
                href="https://www.youtube.com/t/terms"
                target="_blank"
                rel="noopener noreferrer"
                >{{ t('pages.privacy.youtube_privacy_link') }}</a
              >.
            </p>
          </li>
          <li>
            <h3 class="text-xl font-medium mb-2">{{ t('pages.privacy.accessibility_title') }}</h3>
            <p class="py-2 mb-4">
              {{ t('pages.privacy.accessibility_content') }}
              <a
                class="link link-primary"
                href="http://www.google.com/policies/privacy"
                target="_blank"
                rel="noopener noreferrer"
                >{{ t('pages.privacy.google_privacy_link') }}</a
              >.
            </p>
          </li>
          <li>
            <h3 class="text-xl font-medium mb-2">{{ t('pages.privacy.youtube_api_title') }}</h3>
            <p class="py-2 mb-4">
              {{ t('pages.privacy.youtube_api_content') }}
            </p>
          </li>
          <li>
            <h3 class="text-xl font-medium mb-2">{{ t('pages.privacy.data_collection_title') }}</h3>
            <p class="py-2 mb-4">
              {{ t('pages.privacy.data_collection_content') }}
            </p>
          </li>
          <li>
            <h3 class="text-xl font-medium mb-2">{{ t('pages.privacy.data_processing_title') }}</h3>
            <p class="py-2 mb-4">
              {{ t('pages.privacy.data_processing_content') }}
            </p>
          </li>
          <li>
            <h3 class="text-xl font-medium mb-2">{{ t('pages.privacy.data_methods_title') }}</h3>
            <p class="py-2 mb-4">
              {{ t('pages.privacy.data_methods_content') }}
            </p>
          </li>
          <li>
            <h3 class="text-xl font-medium mb-2">{{ t('pages.privacy.contact_title') }}</h3>
            <p class="py-2 mb-4">
              {{ t('pages.privacy.contact_content') }}
              <a class="link link-primary" href="mailto:classicminidiy@gmail.com" target="_blank"
                >classicminidiy@gmail.com</a
              >.
            </p>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
