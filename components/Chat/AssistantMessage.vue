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

          <!-- Enhanced display for Tavily search results -->
          <div v-if="isTavilySearchResult" class="mt-3">
            <div class="text-sm font-medium mb-2">Search Results:</div>
            <div class="space-y-3">
              <div
                v-for="(result, index) in tavilyResults"
                :key="index"
                class="border border-base-300 rounded-lg p-3 bg-base-100"
              >
                <div class="flex items-start justify-between gap-2 mb-2">
                  <a
                    :href="result.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm font-medium text-primary hover:text-primary-focus underline flex-1"
                  >
                    {{ result.title }}
                  </a>
                  <span class="text-xs text-base-content/50 bg-base-200 px-2 py-1 rounded">
                    Score: {{ (result.score * 100).toFixed(1) }}%
                  </span>
                </div>
                <p class="text-sm text-base-content/80 mb-2">{{ result.content }}</p>
                <div class="text-xs text-base-content/60 break-all">
                  <i class="fa-solid fa-link mr-1"></i>
                  {{ result.url }}
                </div>
              </div>
            </div>
          </div>

          <!-- Default tool result display -->
          <div v-else class="mt-1 text-sm">{{ getContentString(message.content) }}</div>
        </div>

        <!-- Regular AI message -->
        <template v-else-if="!isToolResult">
          <!-- Enhanced display for Tavily search results in AI messages -->
          <div v-if="isTavilySearchResult" class="rounded-lg bg-base-200 p-3">
            <div class="text-sm font-medium text-base-content/70">Search Results</div>
            <div class="mt-3">
              <div class="space-y-3">
                <div
                  v-for="(result, index) in tavilyResults"
                  :key="index"
                  class="border border-base-300 rounded-lg p-3 bg-base-100"
                >
                  <div class="flex items-start justify-between gap-2 mb-2">
                    <a
                      :href="result.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-sm font-medium text-primary hover:text-primary-focus underline flex-1"
                    >
                      {{ result.title }}
                    </a>
                    <span class="text-xs text-base-content/50 bg-base-200 px-2 py-1 rounded">
                      {{ Math.round(result.score * 100) }}%
                    </span>
                  </div>
                  <p class="text-sm text-base-content/80 mb-2">{{ result.content }}</p>
                  <div class="flex items-center gap-1 text-xs text-base-content/50">
                    <i class="fa-solid fa-link"></i>
                    <span>{{ result.url }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Message text content -->
          <div v-else-if="contentString.length > 0" class="mr-auto w-fit rounded-3xl bg-primary/10 px-4 py-2">
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
              <i class="fa-solid fa-refresh h-4 w-4" />
              Regenerate
            </button>

            <button @click="copyToClipboard(contentString)" class="btn btn-sm btn-ghost">
              <i class="fa-solid fa-copy h-4 w-4" />
              Copy
            </button>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { AssistantMessageProps } from '~/data/models/chat';
  import type { Checkpoint } from '@langchain/langgraph-sdk';
  import { useStreamContext } from '~/composables/useStreamProvider';
  import MarkdownText from './MarkdownText.vue';

  interface Props extends AssistantMessageProps {}

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

  const isToolResult = computed(() => props.message?.type === 'tool');

  const hasToolCalls = computed(
    () =>
      props.message && 'tool_calls' in props.message && props.message.tool_calls && props.message.tool_calls.length > 0
  );

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

  // Check if this is a Tavily search result
  const isTavilySearchResult = computed(() => {
    if (!props.message) return false;

    // Check both tool result messages and regular AI messages that might contain Tavily results
    const shouldCheck = isToolResult.value || props.message.type === 'ai' || props.message.type === 'assistant';
    if (!shouldCheck) return false;

    try {
      const content = getContentString(props.message.content);
      let parsed;
      try {
        parsed = JSON.parse(content);
      } catch {
        if (content.includes('"url"') && content.includes('"title"') && content.includes('"score"')) {
          console.error('Content looks like Tavily but failed JSON parse');
        }
        return false;
      }

      // Check if it's an array of objects with url, title, content, and score properties
      const isTavily =
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        parsed.every(
          (item: any) =>
            typeof item === 'object' && 'url' in item && 'title' in item && 'content' in item && 'score' in item
        );

      return isTavily;
    } catch (error) {
      console.error('Error checking Tavily:', error);
      return false;
    }
  });

  // Parse Tavily search results
  const tavilyResults = computed(() => {
    if (!isTavilySearchResult.value || !props.message) return [];

    try {
      const content = getContentString(props.message.content);
      return JSON.parse(content);
    } catch {
      return [];
    }
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
