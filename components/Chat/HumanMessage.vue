<template>
  <div class="group ml-auto flex items-center gap-2" :class="{ 'w-full max-w-xl': isEditing }">
    <div class="flex flex-col gap-2" :class="{ 'w-full': isEditing }">
      <!-- Editing mode -->
      <div v-if="isEditing" class="w-full">
        <textarea
          v-model="editValue"
          @keydown="handleKeyDown"
          class="textarea textarea-bordered w-full resize-none focus:outline-none"
          rows="3"
          placeholder="Edit your message..."
        ></textarea>
        <div class="mt-2 flex justify-end gap-2">
          <button @click="cancelEdit" class="btn btn-sm btn-ghost">Cancel</button>
          <button @click="submitEdit" class="btn btn-sm btn-primary">Save</button>
        </div>
      </div>

      <!-- Display mode -->
      <div v-else class="flex flex-col gap-2">
        <!-- Message bubble -->
        <div
          v-if="contentString"
          class="ml-auto w-fit rounded-3xl bg-base-200 px-4 py-2 text-right whitespace-pre-wrap"
        >
          {{ contentString }}
        </div>

        <!-- Action buttons (shown on hover) -->
        <div
          class="ml-auto flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
        >
          <button @click="startEdit" class="btn btn-sm btn-ghost" :disabled="isLoading">
            <i class="fa-solid fa-pencil h-4 w-4" />
            Edit
          </button>

          <button @click="copyToClipboard(contentString)" class="btn btn-sm btn-ghost">
            <i class="fa-solid fa-content-copy h-4 w-4" />
            Copy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import type { Message, HumanMessageProps } from '~/data/models/chat';
  import { useStreamContext } from '~/composables/useStreamProvider';

  const props = defineProps<HumanMessageProps>();
  const streamContext = useStreamContext();
  const isEditing = ref(false);
  const editValue = ref('');

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

  function startEdit() {
    editValue.value = contentString.value;
    isEditing.value = true;
  }

  function cancelEdit() {
    isEditing.value = false;
    editValue.value = '';
  }

  function submitEdit() {
    if (!editValue.value.trim()) {
      cancelEdit();
      return;
    }

    const meta = streamContext.getMessagesMetadata(props.message);
    const parentCheckpoint = meta?.firstSeenState?.parent_checkpoint;

    const newMessage: Message = {
      type: 'human',
      content: editValue.value.trim(),
    };

    streamContext.submit(
      { messages: [newMessage] },
      {
        checkpoint: parentCheckpoint,
        streamMode: ['values'],
        optimisticValues: (prev: any) => {
          const values = meta?.firstSeenState?.values;
          if (!values) return prev;

          return {
            ...values,
            messages: [...(values.messages ?? []), newMessage],
          };
        },
      }
    );

    isEditing.value = false;
    editValue.value = '';
  }

  function handleKeyDown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      submitEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  }

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
