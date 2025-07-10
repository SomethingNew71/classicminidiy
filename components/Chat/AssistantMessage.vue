<template>
  <div class="group mr-auto flex items-start gap-2">
    <div class="flex flex-col gap-2">
      <!-- Loading state -->
      <div v-if="isLoading && !message" class="flex h-8 items-center gap-1 rounded-2xl bg-base-200 px-4 py-2">
        <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-base-content/50"></div>
        <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-base-content/50 animation-delay-500"></div>
        <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-base-content/50 animation-delay-1000"></div>
      </div>

      <!-- Message content -->
      <template v-else-if="message">
        <!-- Tool result message -->
        <div v-if="isToolResult && !hideToolCalls" class="rounded-lg bg-base-200 p-3">
          <div class="text-sm font-medium text-base-content/70">Tool Result</div>
          <div class="mt-1 text-sm">{{ getContentString(message.content) }}</div>
        </div>

        <!-- Regular AI message -->
        <template v-else-if="!isToolResult">
          <!-- Message text content -->
          <div v-if="contentString.length > 0" class="mr-auto w-fit rounded-3xl bg-primary/10 px-4 py-2">
            <MarkdownText :content="contentString" />
          </div>

          <!-- Tool calls -->
          <div v-if="!hideToolCalls && (hasToolCalls || hasAnthropicToolCalls)" class="mt-2">
            <ToolCalls :tool-calls="displayToolCalls" />
          </div>

          <!-- Action buttons (shown on hover) -->
          <div
            class="mr-auto flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
          >
            <button v-if="!isLoading" @click="handleRegenerate" class="btn btn-sm btn-ghost">
              <Icon name="mdi:refresh" class="h-4 w-4" />
              Regenerate
            </button>

            <button @click="copyToClipboard(contentString)" class="btn btn-sm btn-ghost">
              <Icon name="mdi:content-copy" class="h-4 w-4" />
              Copy
            </button>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { Message, Checkpoint } from '@langchain/langgraph-sdk';
  import { useStreamContext } from '~/composables/useStreamProvider';
  import MarkdownText from './MarkdownText.vue';

  interface Props {
    message?: Message;
    isLoading: boolean;
    hideToolCalls?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    hideToolCalls: false,
  });

  const emit = defineEmits<{
    regenerate: [checkpoint: Checkpoint | null | undefined];
  }>();

  const streamContext = useStreamContext();

  // Helper function to extract content string from message
  const getContentString = (content: any): string => {
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
  };

  const contentString = computed(() => {
    return props.message ? getContentString(props.message.content) : '';
  });

  const isToolResult = computed(() => {
    return props.message?.type === 'tool';
  });

  const hasToolCalls = computed(() => {
    return (
      props.message && 'tool_calls' in props.message && props.message.tool_calls && props.message.tool_calls.length > 0
    );
  });

  const hasAnthropicToolCalls = computed(() => {
    // Parse Anthropic streamed tool calls from content
    if (!props.message || !Array.isArray(props.message.content)) {
      return false;
    }

    const toolCallContents = props.message.content.filter((c: any) => c.type === 'tool_use' && c.id);

    return toolCallContents.length > 0;
  });

  const displayToolCalls = computed(() => {
    if (hasToolCalls.value && props.message && 'tool_calls' in props.message) {
      return props.message.tool_calls;
    }

    if (hasAnthropicToolCalls.value && props.message && Array.isArray(props.message.content)) {
      // Parse Anthropic tool calls
      return props.message.content
        .filter((c: any) => c.type === 'tool_use' && c.id)
        .map((tc: any) => ({
          name: tc.name ?? '',
          id: tc.id ?? '',
          args: tc.input ? JSON.parse(tc.input) : {},
          type: 'tool_call',
        }));
    }

    return [];
  });

  const handleRegenerate = () => {
    if (!props.message) return;

    const meta = streamContext.getMessagesMetadata(props.message);
    const parentCheckpoint = meta?.firstSeenState?.parent_checkpoint;
    emit('regenerate', parentCheckpoint);
  };

  const copyToClipboard = async (text: string) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
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
