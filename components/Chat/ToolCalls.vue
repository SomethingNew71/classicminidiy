<template>
  <div class="space-y-2">
    <div v-for="toolCall in toolCalls" :key="toolCall.id" class="rounded-lg border border-base-300 bg-base-100 p-3">
      <div class="mb-2 flex items-center gap-2">
        <i class="fa-solid fa-tool"></i>
        <span class="text-sm font-medium">{{ toolCall.name }}</span>
        <span class="text-xs text-base-content/60">{{ toolCall.id }}</span>
      </div>

      <div v-if="toolCall.args && Object.keys(toolCall.args).length > 0" class="mt-2">
        <details class="collapse collapse-arrow">
          <summary class="collapse-title min-h-0 p-0 text-sm font-medium text-base-content/70">Arguments</summary>
          <div class="collapse-content p-0 pt-2">
            <pre
              class="rounded bg-base-200 p-2 text-xs overflow-x-auto"
            ><code>{{ formatArgs(toolCall.args) }}</code></pre>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { ToolCallsProps } from '~/data/models/chat';

  defineProps<ToolCallsProps>();

  const formatArgs = (args: Record<string, any>): string => {
    try {
      return JSON.stringify(args, null, 2);
    } catch (error) {
      return String(args);
    }
  };
</script>
