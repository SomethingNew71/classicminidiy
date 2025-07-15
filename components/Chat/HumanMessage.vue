<template>
  <div class="chat chat-end group">
    <div class="chat-image avatar">
      <i class="fa-solid fa-circle-user w-10 h-10 text-xl"></i>
    </div>
    <div class="chat-header">You</div>
    <!-- Message content -->
    <div v-if="contentString" class="chat-bubble">
      <div class="whitespace-pre-wrap">
        {{ contentString }}
      </div>
    </div>

    <!-- Action buttons (shown on hover) -->
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
  import type { HumanMessageProps } from '~/data/models/chat';
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
