<template>
  <div v-if="message" class="chat chat-start group">
    <div class="chat-image avatar">
      <i class="fa-solid fa-head-side-gear w-10 h-10 text-xl"></i>
    </div>
    <div class="chat-header">
      DIY Bot
      <time class="text-xs opacity-50">{{ formatTime(message?.created_at) }}</time>
    </div>
    <div v-if="(isLoading && !message) || (message && hasVisibleContent)" class="chat-bubble chat-bubble-primary">
      <div class="flex flex-col gap-2">
        <!-- Loading state -->
        <div v-if="isLoading && !message" class="flex h-8 items-center gap-1 rounded-2xl bg-base-200 px-4 py-2">
          <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-base-content/50"></div>
          <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-base-content/50 animation-delay-500"></div>
          <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-base-content/50 animation-delay-1000"></div>
        </div>

        <!-- Message content -->
        <div
          v-else-if="message && !isToolResult && contentString.trim().length > 0"
          class="mr-auto w-fit rounded-3xl bg-primary/10 px-4 py-2"
        >
          <MarkdownText :content="contentString" />
        </div>
      </div>
    </div>
    <div class="chat-footer opacity-50">
      <div
        class="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
      >
        <button @click="copyToClipboard(contentString)" class="btn btn-sm btn-ghost">
          <i class="fa-solid fa-copy h-4 w-4" />
          Copy
        </button>
      </div>
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
