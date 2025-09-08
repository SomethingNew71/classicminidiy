<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <!-- Page Header -->
    <div class="mb-1">
      <h1 class="text-3xl font-bold text-base-content mb-2">{{ $t('pages.chat.main_heading') }}</h1>
      <p class="text-base-content/70">
        {{ $t('pages.chat.description_text') }}
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
    title: $t('pages.chat.title'),
    description: $t('pages.chat.description'),
    ogTitle: $t('pages.chat.og_title'),
    ogDescription: $t('pages.chat.og_description'),
    ogImage: 'https://classicminidiy.s3.amazonaws.com/social-share/chat.png',
    ogUrl: 'https://classicminidiy.com/chat',
    twitterCard: 'summary_large_image',
    twitterTitle: $t('pages.chat.twitter_title'),
    twitterDescription: $t('pages.chat.twitter_description'),
    twitterImage: 'https://classicminidiy.s3.amazonaws.com/social-share/chat.png',
  });
</script>
