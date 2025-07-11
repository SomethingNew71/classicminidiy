<template>
  <div class="space-y-2">
    <!-- Thread List -->
    <div class="space-y-1">
      <div
        v-for="thread in filteredThreads"
        :key="thread.thread_id"
        class="group flex items-center justify-between rounded-lg p-2 hover:bg-base-200"
        :class="{ 'bg-primary/10': thread.thread_id === currentThreadId }"
      >
        <button
          @click="selectThread(thread.thread_id)"
          class="flex min-w-0 flex-1 flex-col items-start gap-1 text-left"
        >
          <span class="truncate text-sm font-medium">
            {{ getThreadTitle(thread) }}
          </span>
          <span class="truncate text-xs text-base-content/60">
            {{ formatDate(thread.updated_at) }}
          </span>
        </button>

        <!-- Actions -->
        <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100">
          <button
            @click="confirmDelete(thread)"
            class="btn btn-ghost btn-xs btn-square text-error"
            :title="`Delete ${getThreadTitle(thread)}`"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredThreads.length === 0" class="py-8 text-center">
        <i class="fa-solid fa-comments text-2xl"></i>
        <p class="text-xs text-base-content/40">Start a new chat to see it here</p>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="threadToDelete" class="modal modal-open">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Delete Conversation</h3>
        <p class="py-4">
          Are you sure you want to delete "{{ getThreadTitle(threadToDelete) }}"? This action cannot be undone.
        </p>
        <div class="modal-action">
          <button @click="cancelDelete" class="btn">Cancel</button>
          <button @click="deleteThread" class="btn btn-error">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Thread, ThreadHistoryProps } from '~/data/models/chat';

  const props = withDefaults(defineProps<ThreadHistoryProps>(), {
    threads: () => [],
    currentThreadId: null,
  });

  const emit = defineEmits<{
    selectThread: [threadId: string];
    deleteThread: [threadId: string];
  }>();

  const searchQuery = ref('');
  const threadToDelete = ref<Thread | null>(null);

  const getThreadTitle = (thread: Thread) => {
    // Get the first human message as the thread title
    const firstHumanMessage = thread.values.messages.find((msg) => msg.type === 'human');
    if (firstHumanMessage && firstHumanMessage.content) {
      // Truncate to first 50 characters
      return firstHumanMessage.content.length > 50
        ? firstHumanMessage.content.substring(0, 50) + '...'
        : firstHumanMessage.content;
    }
    return 'New Conversation';
  };

  const filteredThreads = computed(() => {
    if (!searchQuery.value) {
      return props.threads;
    }

    const query = searchQuery.value.toLowerCase();
    return props.threads.filter((thread) => getThreadTitle(thread).toLowerCase().includes(query));
  });

  const selectThread = (threadId: string) => {
    emit('selectThread', threadId);
  };

  const confirmDelete = (thread: Thread) => {
    threadToDelete.value = thread;
  };

  const cancelDelete = () => {
    threadToDelete.value = null;
  };

  const deleteThread = () => {
    if (threadToDelete.value) {
      emit('deleteThread', threadToDelete.value.thread_id);
      threadToDelete.value = null;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
</script>
