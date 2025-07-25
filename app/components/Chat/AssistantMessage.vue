<template>
  <div v-if="message" class="mb-6 group">
    <!-- Loading state -->
    <div v-if="isLoading && !message" class="flex items-center gap-2 text-base-content/70 mb-2">
      <div class="flex items-center gap-1">
        <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-base-content/50"></div>
        <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-base-content/50 animation-delay-500"></div>
        <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-base-content/50 animation-delay-1000"></div>
      </div>
    </div>

    <!-- Message content -->
    <div v-else-if="message && !isToolResult && contentString.trim().length > 0" class="">
      <MarkdownText :content="contentString" />
    </div>

    <!-- Copy button (appears on hover) -->
    <div class="flex items-center gap-2 mt-2 opacity-0 transition-opacity group-hover:opacity-100">
      <button @click="copyToClipboard(contentString)" class="btn btn-xs btn-ghost text-base-content/50">
        <i class="fa-solid fa-copy h-3 w-3" />
        Copy
      </button>
      <time v-if="message?.created_at" class="text-xs text-base-content/50">{{ formatTime(message?.created_at) }}</time>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { AssistantMessageProps } from '../../../data/models/chat';
  import { useStreamContext } from '~/composables/useStreamProvider';
  import MarkdownText from './MarkdownText.vue';
  const props = defineProps<AssistantMessageProps>();

  useStreamContext();

  // Helper function to extract content string from message
  function getContentString(content: any): string {
    if (typeof content === 'string') {
      return content;
    }
    if (Array.isArray(content)) {
      return content
        .filter((item) => item.type === 'text')
        .map((item) => item.text)
        .join('\n');
    }
    return '';
  }

  const contentString = computed(() => {
    return props.message ? getContentString(props.message.content) : '';
  });

  const isToolResult = computed(() => props.message?.type === 'tool');

  // Computed property to determine if there's actually visible content
  const hasVisibleContent = computed(() => {
    if (!props.message) return false;
    const hasContent = contentString.value.trim().length > 0;
    // For regular AI messages, check for text content
    if (hasContent) {
      return true;
    }

    return false;
  });

  const copyToClipboard = async (text: string) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const formatTime = (timestamp: string | undefined) => {
    if (!timestamp) return '';
    try {
      return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };
</script>

<style scoped>
  .animation-delay-500 {
    animation-delay: 0.5s;
  }

  .animation-delay-1000 {
    animation-delay: 1s;
  }
</style>
