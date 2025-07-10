<template>
  <div class="flex h-full w-full">
    <!-- Chat History Sidebar -->
    <div v-if="chatHistoryOpen" class="flex w-80 flex-col border-r border-base-300 bg-base-100">
      <div class="border-b border-base-300 p-4">
        <h2 class="text-lg font-semibold">Chat History</h2>
      </div>
      <div class="flex-1 overflow-y-auto p-4">
        <ThreadHistory
          :threads="threads"
          :current-thread-id="threadId"
          @select-thread="setThreadId"
          @delete-thread="deleteThread"
        />
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="flex flex-1 flex-col">
      <!-- Configuration Panel -->
      <div v-if="!isConfigured" class="flex h-full items-center justify-center">
        <ConfigurationPanel @configure="handleConfiguration" />
      </div>

      <!-- Chat Interface -->
      <template v-else>
        <!-- Header -->
        <div class="border-b border-base-300 bg-base-100 p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <button @click="toggleChatHistory" class="btn btn-ghost btn-sm">
                <i class="fa-solid fa-list-timeline"></i>
              </button>
              <h1 class="text-xl font-semibold">LangGraph Chat</h1>
            </div>

            <div class="flex items-center gap-2">
              <!-- Hide Tool Calls Toggle -->
              <div class="form-control">
                <label class="label cursor-pointer gap-2">
                  <span class="label-text text-sm">Hide Tool Calls</span>
                  <input v-model="hideToolCalls" type="checkbox" class="toggle toggle-sm" />
                </label>
              </div>

              <!-- New Thread Button -->
              <button @click="startNewThread" class="btn btn-primary btn-sm" :disabled="isLoading">
                <!-- <Icon name="mdi:plus" class="h-4 w-4" /> -->
                New Chat
              </button>
            </div>
          </div>
        </div>

        <!-- Messages Area -->
        <div class="flex flex-1 overflow-hidden">
          <!-- Chat Messages -->
          <div class="flex flex-1 flex-col">
            <div class="flex-1 overflow-y-auto p-4">
              <div class="mx-auto max-w-4xl space-y-4">
                <!-- Messages -->
                <template v-for="message in messages" :key="message.id">
                  <HumanMessage v-if="message.type === 'human'" :message="message" :is-loading="isLoading" />
                  <AssistantMessage
                    v-else-if="message.type === 'ai' || message.type === 'tool'"
                    :message="message"
                    :is-loading="isLoading"
                    :hide-tool-calls="hideToolCalls"
                    @regenerate="handleRegenerate"
                  />
                </template>

                <!-- Loading Message -->
                <AssistantMessage v-if="isLoading" :is-loading="true" :hide-tool-calls="hideToolCalls" />
              </div>
            </div>

            <!-- Input Area -->
            <div class="border-t border-base-300 bg-base-100 p-4">
              <form @submit.prevent="handleSubmit" class="mx-auto max-w-4xl">
                <div class="flex gap-2">
                  <textarea
                    ref="inputRef"
                    v-model="input"
                    @keydown="handleInputKeyDown"
                    class="textarea textarea-bordered flex-1 resize-none"
                    rows="1"
                    placeholder="Type your message..."
                    :disabled="isLoading"
                  ></textarea>

                  <button v-if="isLoading" @click="stopGeneration" type="button" class="btn btn-error">
                    <!-- <Icon name="mdi:stop" class="h-4 w-4" /> -->
                    Stop
                  </button>

                  <button v-else type="submit" class="btn btn-primary" :disabled="!input.trim()">
                    <!-- <Icon name="mdi:send" class="h-4 w-4" /> -->
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Artifact Panel -->
          <div v-if="artifactOpen" class="flex w-96 flex-col border-l border-base-300 bg-base-100">
            <div class="border-b border-base-300 p-4">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold">Artifact</h3>
                <button @click="closeArtifact" class="btn btn-ghost btn-sm btn-square">
                  <!-- <Icon name="mdi:close" class="h-4 w-4" /> -->
                  Close
                </button>
              </div>
            </div>
            <div class="flex-1 overflow-y-auto p-4">
              <ArtifactContent />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStreamProvider, createStreamSession, provideStreamContext } from '~/composables/useStreamProvider';
  import HumanMessage from './HumanMessage.vue';
  import AssistantMessage from './AssistantMessage.vue';
  import ThreadHistory from './ThreadHistory.vue';
  import ConfigurationPanel from './ConfigurationPanel.vue';
  import ArtifactContent from './ArtifactContent.vue';
  // import Icon from '@nuxt/icon';

  const { apiUrl, assistantId, apiKey, threadId, isConfigured, setApiKey, setApiUrl, setAssistantId, setThreadId } =
    useStreamProvider();

  // UI State
  const input = ref('');
  const hideToolCalls = ref(false);
  const chatHistoryOpen = ref(false);
  const artifactOpen = ref(false);
  const threads = ref<any[]>([]);
  const inputRef = ref<HTMLTextAreaElement>();

  // Stream context
  let streamContext: ReturnType<typeof createStreamSession> | null = null;

  // Methods
  const loadThreads = async () => {
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
  };

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
          (newThreadId: string) => {
            console.log('New thread created:', newThreadId);
            loadThreads(); // Refresh thread list
          }
        );
        provideStreamContext(streamContext);
        // Load existing threads
        loadThreads();
      }
    },
    { immediate: true }
  );

  // Computed properties
  const messages = computed(() => {
    return streamContext?.messages.value || [];
  });

  const isLoading = computed(() => {
    return streamContext?.isLoading.value || false;
  });

  const handleConfiguration = (config: { apiUrl: string; assistantId: string; apiKey?: string }) => {
    setApiUrl(config.apiUrl);
    setAssistantId(config.assistantId);
    if (config.apiKey) {
      setApiKey(config.apiKey);
    }
  };

  const handleSubmit = async () => {
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
  };

  const handleInputKeyDown = (e: KeyboardEvent) => {
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
  };

  const handleRegenerate = (checkpoint: any) => {
    if (!streamContext) return;

    // Implement regeneration logic
    streamContext.submit({ messages: [] }, { checkpoint, streamMode: ['values'] });
  };

  const stopGeneration = () => {
    if (streamContext) {
      streamContext.stop();
    }
  };

  const startNewThread = () => {
    setThreadId(null);
    input.value = '';
  };

  const toggleChatHistory = () => {
    chatHistoryOpen.value = !chatHistoryOpen.value;
  };

  const closeArtifact = () => {
    artifactOpen.value = false;
  };

  const deleteThread = async (threadIdToDelete: string) => {
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
  };

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
