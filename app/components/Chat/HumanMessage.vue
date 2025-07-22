<template>
  <div class="mb-6 group flex justify-end">
    <!-- Message content -->
    <div v-if="contentString" class="bg-primary text-primary-content rounded-2xl px-4 py-3 max-w-[80%] ml-auto">
      <div class="whitespace-pre-wrap">
        {{ contentString }}
      </div>
    </div>

    <!-- Action buttons (shown on hover) -->
    <div class="flex items-center gap-2 mt-2 opacity-0 transition-opacity group-hover:opacity-100 justify-end">
      <button @click="copyToClipboard(contentString)" class="btn btn-xs btn-ghost text-base-content/50">
        <i class="fa-solid fa-copy h-3 w-3" />
        Copy
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { HumanMessageProps } from '../../../data/models/chat';
  import { useStreamContext } from '~/composables/useStreamProvider';

  const props = defineProps<HumanMessageProps>();
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

  const contentString = computed(() => getContentString(props.message.content));

  async function copyToClipboard(text: string) {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }
</script>
