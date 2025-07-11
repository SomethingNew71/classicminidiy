<template>
  <!-- Floating Chat Widget -->
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Chat Trigger Button -->
    <button
      v-if="!isExpanded"
      @click="toggleChat"
      class="btn btn-primary btn-circle btn-xl shadow-lg hover:shadow-xl transition-all duration-200"
      :class="{ 'animate-pulse': hasUnreadMessages }"
    >
      <i class="fa-solid fa-comments text-xl"></i>
      <span v-if="unreadCount > 0" class="absolute -top-2 -right-2 badge badge-error badge-sm">{{ unreadCount }}</span>
    </button>

    <!-- Expanded Chat Window -->
    <div
      v-if="isExpanded"
      class="bg-base-100 rounded-lg shadow-2xl border border-base-300 w-96 flex flex-col transition-all duration-300 transform"
      :class="isMinimized ? 'h-12' : 'h-[600px]'"
    >
      <!-- Chat Header -->
      <div
        class="flex items-center justify-between p-3 bg-base-200"
        :class="isMinimized ? 'rounded-lg border-0' : 'border-b border-base-300 rounded-t-lg'"
      >
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-comments text-primary"></i>
          <span class="font-semibold text-sm">DIY Helper</span>
        </div>
        <div class="flex items-center gap-1">
          <button @click="toggleMinimize" class="btn btn-ghost btn-xs">
            <i :class="isMinimized ? 'fa-solid fa-expand' : 'fa-solid fa-minus'"></i>
          </button>
          <button @click="toggleChat" class="btn btn-ghost btn-xs">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
      </div>

      <!-- Chat Content (hidden when minimized) -->
      <div v-if="!isMinimized" class="flex flex-1 overflow-hidden chat-content">
        <div class="flex flex-1 flex-col">
          <!-- Chat Controls -->
          <div v-if="isAdmin" class="border-b border-base-300 p-2">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <button @click="toggleChatHistory" class="btn btn-ghost btn-xs">
                  <i class="fa-solid fa-list-timeline"></i>
                </button>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer gap-1 py-0">
                  <span class="label-text text-xs">Hide Tools</span>
                  <input v-model="hideToolCalls" type="checkbox" class="toggle toggle-xs" />
                </label>
              </div>
            </div>
          </div>

          <!-- Messages Area -->
          <div class="flex-1 overflow-y-auto p-3">
            <div class="space-y-3 break-words">
              <!-- Messagess -->
              <template v-for="message in messages" :key="message.id">
                <div class="break-words overflow-wrap-anywhere">
                  <HumanMessage v-if="message.type === 'human'" :message="message" :is-loading="isLoading" />
                  <AssistantMessage
                    v-else-if="message.type === 'ai' || message.type === 'tool'"
                    :message="message"
                    :is-loading="isLoading"
                    :hide-tool-calls="hideToolCalls"
                    @regenerate="handleRegenerate"
                  />
                </div>
              </template>

              <!-- Loading Message -->
              <div class="break-words overflow-wrap-anywhere">
                <AssistantMessage v-if="isLoading" :is-loading="true" :hide-tool-calls="hideToolCalls" />
              </div>
            </div>
          </div>

          <!-- Input Area -->
          <div class="border-t border-base-300 p-3">
            <form @submit.prevent="handleSubmit" class="flex gap-2">
              <textarea
                ref="inputRef"
                v-model="input"
                @keydown="handleInputKeyDown"
                class="textarea textarea-bordered textarea-sm flex-1 resize-none text-sm"
                rows="1"
                placeholder="Type your message..."
                :disabled="isLoading"
              ></textarea>

              <button v-if="isLoading" @click="stopGeneration" type="button" class="btn btn-error btn-sm">
                <i class="fa-solid fa-stop"></i>
              </button>

              <button v-else type="submit" class="btn btn-primary btn-sm" :disabled="!input.trim()">
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>

        <!-- Chat History Sidebar (overlay) -->
        <div v-if="chatHistoryOpen" class="absolute inset-0 bg-base-100 rounded-lg flex flex-col z-10">
          <div class="border-b border-base-300 p-3 bg-base-200 rounded-t-lg">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-sm">Chat History</h3>
              <button @click="toggleChatHistory" class="btn btn-ghost btn-xs">
                <i class="fa-solid fa-times"></i>
              </button>
            </div>
          </div>
          <div class="flex-1 overflow-y-auto p-3">
            <ThreadHistory
              :threads="threads"
              :current-thread-id="threadId"
              @select-thread="handleThreadSelection"
              @delete-thread="deleteThread"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStreamProvider, createStreamSession, provideStreamContext } from '~/composables/useStreamProvider';
  import HumanMessage from './HumanMessage.vue';
  import AssistantMessage from './AssistantMessage.vue';
  import ThreadHistory from './ThreadHistory.vue';

  const { apiUrl, assistantId, apiKey, threadId, isConfigured, setApiKey, setApiUrl, setAssistantId, setThreadId } =
    useStreamProvider();

  // Reactive state
  const route = useRoute();
  const isAdmin = ref(route.query.admin === 'true');
  const input = ref('');
  const hideToolCalls = ref(true);
  const chatHistoryOpen = ref(false);
  const artifactOpen = ref(false);
  const threads = ref<any[]>([]);
  const inputRef = ref<HTMLTextAreaElement>();

  // Floating chat widget state
  const isExpanded = ref(false);
  const isMinimized = ref(false);
  const unreadCount = ref(0);
  const hasUnreadMessages = computed(() => unreadCount.value > 0);

  // Stream context
  let streamContext: ReturnType<typeof createStreamSession> | null = null;

  // Methods
  async function loadThreads() {
    if (!isConfigured.value) return;

    try {
      const response = await $fetch('/api/langgraph/threads', {
        method: 'GET',
        headers: {
          'x-api-key': apiKey.value || '',
        },
      });

      if (Array.isArray(response)) {
        threads.value = response;
      } else if (response && Array.isArray(response.threads)) {
        threads.value = response.threads;
      } else {
        console.warn('Unexpected threads response format:', response);
        threads.value = [];
      }
    } catch (error) {
      console.error('Failed to load threads:', error);
      threads.value = [];
    }
  }

  // Create stream session when configuration is ready
  watch(
    [isConfigured, apiUrl, apiKey, assistantId, threadId],
    () => {
      if (isConfigured.value) {
        streamContext = createStreamSession(
          apiUrl.value,
          apiKey.value,
          assistantId.value,
          threadId.value,
          // Callback when new thread is created
          (newThreadId: string) => loadThreads()
        );
        provideStreamContext(streamContext);
        // Load existing threads
        loadThreads();
      }
    },
    { immediate: true }
  );

  // Computed properties
  const messages = computed(() => streamContext?.messages.value || []);
  const isLoading = computed(() => streamContext?.isLoading.value || false);

  function handleConfiguration(config: { apiUrl: string; assistantId: string; apiKey?: string }) {
    setApiUrl(config.apiUrl);
    setAssistantId(config.assistantId);
    if (config.apiKey) {
      setApiKey(config.apiKey);
    }
  }

  async function handleSubmit() {
    if (!input.value.trim() || !streamContext) return;

    const message = input.value.trim();
    input.value = '';

    // Auto-resize textarea
    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.style.height = 'auto';
      }
    });

    // Submit message
    streamContext.submit({ messages: [{ type: 'human', content: message }] }, { streamMode: ['values'] });
  }

  function handleInputKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      handleSubmit();
    }

    // Auto-resize textarea
    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.style.height = 'auto';
        inputRef.value.style.height = inputRef.value.scrollHeight + 'px';
      }
    });
  }

  function handleRegenerate(checkpoint: any) {
    if (!streamContext) return;

    // Implement regeneration logic
    streamContext.submit({ messages: [] }, { checkpoint, streamMode: ['values'] });
  }

  function stopGeneration() {
    if (streamContext) {
      streamContext.stop();
    }
  }

  function startNewThread() {
    setThreadId(null);
    input.value = '';
    // Clear messages when starting new thread
    if (streamContext) {
      streamContext.messages.value = [];
    }
  }

  async function loadThreadMessages(threadIdToLoad: string) {
    if (!isConfigured.value || !threadIdToLoad) return;

    try {
      // Fetch thread data from API
      const threadData = await $fetch(`/api/langgraph/threads/${threadIdToLoad}`, {
        headers: {
          'x-api-key': apiKey.value || '',
        },
      });

      // Update thread ID first
      setThreadId(threadIdToLoad);

      // Check different possible message locations in the response
      let messages = null;
      if (threadData.values?.messages) {
        messages = threadData.values.messages;
      } else if (threadData.messages) {
        messages = threadData.messages;
      } else if (Array.isArray(threadData)) {
        messages = threadData;
      }

      // Update stream context messages if we have them
      if (streamContext && messages) {
        // Clear existing messages first
        streamContext.messages.value.splice(0);

        // Add new messages one by one to ensure reactivity
        messages.forEach((message: any) => {
          streamContext!.messages.value.push(message);
        });

        // Also update the current thread ID in stream context
        if (streamContext.threadId) {
          streamContext.threadId.value = threadIdToLoad;
        }
      }

      // Close chat history overlay
      chatHistoryOpen.value = false;
    } catch (error) {
      console.error('Failed to load thread messages:', error);
    }
  }

  function handleThreadSelection(threadIdToSelect: string) {
    loadThreadMessages(threadIdToSelect);
  }

  function toggleChatHistory() {
    chatHistoryOpen.value = !chatHistoryOpen.value;
  }

  async function deleteThread(threadIdToDelete: string) {
    if (!isConfigured.value) return;

    try {
      // Call API to delete the thread
      await $fetch(`/api/langgraph/threads/${threadIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'x-api-key': apiKey.value || '',
        },
      });

      // Remove from local state
      threads.value = threads.value.filter((t) => t.thread_id !== threadIdToDelete);

      // If we deleted the current thread, start a new one
      if (threadId.value === threadIdToDelete) {
        startNewThread();
      }
    } catch (error) {
      console.error('Failed to delete thread:', error);
      // Still remove from local state even if API call fails
      threads.value = threads.value.filter((t) => t.thread_id !== threadIdToDelete);
    }
  }

  // Floating chat widget methods
  function toggleChat() {
    isExpanded.value = !isExpanded.value;
    if (isExpanded.value) {
      isMinimized.value = false;
      unreadCount.value = 0; // Clear unread count when opening
    }
  }

  function toggleMinimize() {
    isMinimized.value = !isMinimized.value;
  }

  // Track unread messages
  watch(
    messages,
    (newMessages, oldMessages) => {
      if (!isExpanded.value || isMinimized.value) {
        const newMessageCount = newMessages.length - (oldMessages?.length || 0);
        if (newMessageCount > 0) {
          // Only count AI messages as unread
          const newAiMessages = newMessages.slice(-newMessageCount).filter((m) => m.type === 'ai');
          unreadCount.value += newAiMessages.length;
        }
      }
    },
    { deep: true }
  );

  // Auto-resize textarea on input
  watch(input, () => {
    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.style.height = 'auto';
        inputRef.value.style.height = inputRef.value.scrollHeight + 'px';
      }
    });
  });

  // Focus input on mount
  onMounted(() => {
    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.focus();
      }
    });
  });
</script>

<style scoped>
  /* Ensure text wrapping in chat messages */
  .break-words {
    word-wrap: break-word;
    overflow-wrap: break-word;
    word-break: break-word;
    hyphens: auto;
  }

  .overflow-wrap-anywhere {
    overflow-wrap: anywhere;
  }

  /* Ensure chat window content doesn't overflow */
  .chat-content {
    max-width: 100%;
    overflow-x: hidden;
  }

  /* Force text content to wrap within containers */
  .chat-content * {
    max-width: 100%;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
</style>
