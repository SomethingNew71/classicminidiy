<template>
  <div class="container mx-auto px-4 py-8 max-w-6xl">
    <!-- Page Header -->
    <div class="mb-1">
      <h1 class="text-3xl font-bold text-base-content mb-2">CMDIY Assistant</h1>
      <p class="text-base-content/70">
        Your Classic Mini DIY assistant - ask technical questions, decode chassis numbers, find parts information, and
        get guidance on restoration projects.
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
    title: 'CMDIY Assistant - Classic Mini DIY',
    description:
      'Chat with our AI assistant for Classic Mini technical help, chassis decoding, parts information, and restoration guidance.',
    ogTitle: 'CMDIY Assistant - Classic Mini DIY',
    ogDescription: 'Get instant help with your Classic Mini projects from our AI assistant.',
  });
</script>
