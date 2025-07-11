<template>
  <div class="chat chat-end group" :class="{ 'w-full max-w-xl': isEditing }">
    <div class="chat-image avatar">
      <i class="fa-solid fa-circle-user w-10 h-10 text-xl"></i>
    </div>
    <div class="chat-header">
      You
      <time class="text-xs opacity-50">{{ formatTime(message?.created_at) }}</time>
    </div>
    <div v-if="isEditing || contentString" class="chat-bubble" :class="{ 'w-full': isEditing }">
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
      <div v-else>
        <!-- Message content -->
        <div v-if="contentString" class="whitespace-pre-wrap">
          {{ contentString }}
        </div>
      </div>
    </div>

    <!-- Action buttons (shown on hover) -->
    <div class="chat-footer opacity-50">
      <div
        class="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
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

  const formatTime = (timestamp: string | undefined) => {
    if (!timestamp) return '';
    try {
      return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };
</script>
