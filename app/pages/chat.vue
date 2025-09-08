<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <!-- Page Header -->
    <div class="mb-1">
      <h1 class="text-3xl font-bold text-base-content mb-2">{{ $t('main_heading') }}</h1>
      <p class="text-base-content/70">
        {{ $t('description_text') }}
      </p>
    </div>

    <!-- Chat Interface -->
    <div class="h-[calc(100vh-200px)] min-h-[600px]">
      <ChatWindow />
    </div>
  </div>
</template>

<script setup lang="ts">
  import ChatWindow from '~/components/Chat/ChatWindow.vue';

  // SEO
  useSeoMeta({
    title: $t('title'),
    description: $t('description'),
    ogTitle: $t('og_title'),
    ogDescription: $t('og_description'),
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/chat.png',
    ogUrl: 'https://classicminidiy.com/chat',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('twitter_title'),
    twitterDescription: $t('twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/chat.png',
  });
</script>

<i18n lang="json">
{
  "en": {
    "title": "CMDIY Assistant - Classic Mini DIY",
    "description": "Chat with our AI assistant for Classic Mini technical help, chassis decoding, parts information, and restoration guidance.",
    "og_title": "CMDIY Assistant - Classic Mini DIY",
    "og_description": "Get instant help with your Classic Mini projects from our AI assistant.",
    "twitter_title": "CMDIY Assistant - Classic Mini DIY",
    "twitter_description": "Get instant help with your Classic Mini projects from our AI assistant.",
    "main_heading": "CMDIY Assistant",
    "description_text": "Your Classic Mini DIY assistant - ask technical questions, find parts information, and get guidance on restoration projects. Or just chat with me about your Classic Mini!"
  }
}
</i18n>
