<template>
  <div class="h-screen w-full bg-base-100">
    <ChatWindow />
  </div>
</template>

<script setup lang="ts">
  import ChatWindow from '~/components/Chat/ChatWindow.vue';

  // Set page meta
  definePageMeta({
    title: 'LangGraph Chat',
    description: 'Interactive AI chat powered by LangGraph',
  });

  // Set head tags
  useHead({
    title: 'LangGraph Chat - Classic Mini DIY',
  });
</script>
