<template>
  <!-- Floating Chat Widget -->
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Chat Trigger Button -->
    <button
      v-if="!isExpanded"
      @click="toggleChat"
      class="btn btn-primary btn-circle btn-xl shadow-xl hover:shadow-xl transition-all duration-200 relative"
      :class="{ wiggle: shouldWiggle }"
    >
      <i class="fa-solid fa-comments text-xl"></i>

      <!-- Unread count badge -->
      <span v-if="unreadCount > 0" class="absolute -top-2 -right-2 badge badge-error badge-sm">{{ unreadCount }}</span>

      <!-- New notification indicator (small dot) -->
      <span
        v-else-if="!hasEverBeenOpened"
        class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
        style="box-shadow: 0 0 6px rgba(239, 68, 68, 0.6)"
      ></span>
    </button>

    <!-- Expanded Chat Window -->
    <div
      v-if="isExpanded"
      class="bg-base-100 shadow-2xl border border-base-300 flex flex-col transition-all duration-300 transform"
      :class="[
        isFullscreen ? 'fixed inset-0 w-full h-full rounded-none z-[60]' : 'rounded-lg w-96 lg:w-[50vw]',
        isMinimized ? 'h-12' : isFullscreen ? 'h-full' : 'h-[600px]',
      ]"
    >
      <!-- Chat Header -->
      <div
        class="flex items-center justify-between p-3 bg-base-200"
        :class="isMinimized ? 'rounded-lg border-0' : 'border-b border-base-300 rounded-t-lg'"
      >
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-comments text-primary"></i>
          <span class="font-semibold text-base">DIY Helper</span>
        </div>
        <div class="flex items-center gap-1">
          <button
            @click="toggleFullscreen"
            class="btn btn-ghost btn-xs"
            :title="isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'"
          >
            <i :class="isFullscreen ? 'fa-solid fa-compress' : 'fa-solid fa-expand'"></i>
          </button>
          <button @click="toggleMinimize" class="btn btn-ghost btn-xs" :title="isMinimized ? 'Expand' : 'Minimize'">
            <i :class="isMinimized ? 'fa-solid fa-window-maximize' : 'fa-solid fa-minus'"></i>
          </button>
          <button @click="toggleChat" class="btn btn-ghost btn-xs" title="Close">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
      </div>

      <!-- Chat Content (hidden when minimized) -->
      <div v-if="!isMinimized" class="flex flex-1 overflow-hidden chat-content">
        <div class="flex flex-1 flex-col">
          <!-- Messages Area -->
          <div class="flex-1 overflow-y-auto p-3">
            <div class="space-y-3 break-words">
              <!-- Welcome Message & Starter Questions (shown when chat is empty) -->
              <div v-if="isChatEmpty && !isLoading" class="space-y-4">
                <!-- Welcome Message -->
                <div class="card bg-primary/10 border border-primary/20">
                  <div class="card-body p-4">
                    <div class="flex items-start gap-3">
                      <div class="flex-1">
                        <h3 class="font-semibold text-base mb-2 text-primary">Welcome to CMDIY Helper Bot!</h3>
                        <p class="text-sm text-base-content/80 leading-relaxed">
                          I'm your Classic Mini DIY assistant, here to help you with technical questions, decode chassis
                          numbers, find parts information, navigate the archives, and provide guidance on Classic Mini
                          restoration and maintenance. Ask me anything about your Classic Mini project!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Starter Questions -->
                <div v-if="starterQuestions.length > 0" class="space-y-3">
                  <div class="text-center">
                    <div class="text-sm text-base-content/70 mb-3">
                      <i class="fa-solid fa-lightbulb text-primary mr-1"></i>
                      Here are some questions to get you started:
                    </div>
                  </div>
                  <div class="grid gap-2">
                    <button
                      v-for="(question, index) in starterQuestions"
                      :key="index"
                      @click="handleStarterQuestion(question)"
                      class="btn btn-outline btn-sm text-left justify-start h-auto py-3 px-4 whitespace-normal text-wrap"
                      :disabled="isLoading"
                    >
                      <i class="fa-solid fa-comment-dots text-primary mr-2 flex-shrink-0"></i>
                      <span class="text-sm leading-relaxed">{{ question }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Messages -->
              <template v-for="message in messages" :key="message.id">
                <div class="break-words overflow-wrap-anywhere">
                  <!-- {{ message }} -->
                  <HumanMessage v-if="message.type === 'human'" :message="message" :is-loading="isLoading" />
                  <AssistantMessage v-else-if="message.type === 'ai'" :message="message" :is-loading="isLoading" />
                </div>
              </template>

              <div v-if="isLoading" class="flex h-8 items-center gap-1 rounded-2xl bg-base-200 px-4 py-2">
                <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-base-content/50"></div>
                <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-base-content/50 animation-delay-500"></div>
                <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-base-content/50 animation-delay-1000"></div>
              </div>
              <!-- Useful Links from Tavily Search Results -->
              <UsefulLinks v-if="!isLoading && usefulLinks.length > 0" :links="usefulLinks" />
            </div>
          </div>

          <!-- Input Area -->
          <div class="border-t border-base-300 p-3">
            <form @submit.prevent="handleSubmit" class="flex gap-2">
              <textarea
                ref="inputRef"
                v-model="input"
                @keydown="handleInputKeyDown"
                class="textarea textarea-bordered textarea-md flex-1 resize-none text-base"
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStreamProvider, createStreamSession, provideStreamContext } from '~/composables/useStreamProvider';
  import HumanMessage from './HumanMessage.vue';
  import AssistantMessage from './AssistantMessage.vue';
  import UsefulLinks from './UsefulLinks.vue';
  import { getStarterQuestions } from '../../../data/models/pages';

  const { assistantId, threadId, isConfigured } = useStreamProvider();

  // Reactive state
  const route = useRoute();
  const input = ref('');
  const threads = ref<any[]>([]);
  const inputRef = ref<HTMLTextAreaElement>();

  // Floating chat widget state
  const isExpanded = ref(false);
  const isMinimized = ref(false);
  const isFullscreen = ref(false);
  const unreadCount = ref(0);
  const shouldWiggle = ref(false);
  const hasEverBeenOpened = ref(false);

  // Get starter questions for the current page
  const starterQuestions = computed(() => {
    return getStarterQuestions(route.path) || [];
  });

  // Check if chat is empty (no messages)
  const isChatEmpty = computed(() => {
    return !streamContext?.messages.value || streamContext.messages.value.length === 0;
  });

  // Extract useful links from Tavily search results in the current conversation
  const usefulLinks = computed(() => {
    if (!streamContext?.messages.value) return [];

    const links: Array<{ url: string; title: string; content: string; score: number }> = [];

    // Look through all messages for Tavily search results
    for (const message of streamContext.messages.value) {
      if (message.type === 'tool' && message.name === 'tavily_search') {
        try {
          const content = typeof message.content === 'string' ? message.content : JSON.stringify(message.content);
          const searchData = JSON.parse(content);

          if (searchData.results && Array.isArray(searchData.results)) {
            for (const result of searchData.results) {
              if (result.url && result.title && result.content && typeof result.score === 'number') {
                links.push({
                  url: result.url,
                  title: result.title,
                  content: result.content,
                  score: result.score,
                });
              }
            }
          }
        } catch (error) {
          // Ignore parsing errors
        }
      }
    }

    // Sort by score (highest first) and limit to top 5
    return links.sort((a, b) => b.score - a.score).slice(0, 5);
  });

  // Determine if we should show the loading bubble
  const shouldShowLoadingBubble = computed(() => {
    if (!streamContext?.messages.value) return true; // Show if no messages yet

    const messages = streamContext.messages.value;
    if (messages.length === 0) return true; // Show if empty

    // Don't show loading bubble if the last message is already an AI message being streamed
    const lastMessage = messages[messages.length - 1];
    return lastMessage.type !== 'ai' && lastMessage.type !== 'assistant';
  });

  // Stream context
  let streamContext: ReturnType<typeof createStreamSession> | null = null;

  // Methods
  async function loadThreads() {
    if (!isConfigured.value) return;

    try {
      const response = await $fetch('/api/langgraph/threads', {
        method: 'GET',
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
    [isConfigured, assistantId, threadId],
    () => {
      if (isConfigured.value) {
        streamContext = createStreamSession(
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

    // Submit message with metadata
    const metadata = {
      pageSlug: route.path,
    };

    streamContext.submit(
      { messages: [{ type: 'human', content: message }] },
      {
        streamMode: ['values'],
        metadata,
      }
    );
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

  function stopGeneration() {
    if (streamContext) {
      streamContext.stop();
    }
  }

  // Handle starter question click
  function handleStarterQuestion(question: string) {
    input.value = question;
    handleSubmit();
  }

  // Floating chat widget methods
  function toggleChat() {
    isExpanded.value = !isExpanded.value;
    if (isExpanded.value) {
      isMinimized.value = false;
      unreadCount.value = 0; // Clear unread count when opening
      hasEverBeenOpened.value = true; // Mark as opened
      shouldWiggle.value = false; // Stop wiggle animation
    }
  }

  function toggleMinimize() {
    isMinimized.value = !isMinimized.value;
  }

  function toggleFullscreen() {
    isFullscreen.value = !isFullscreen.value;
    // Exit minimize mode when going fullscreen
    if (isFullscreen.value) {
      isMinimized.value = false;
    }
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

  // Handle keyboard shortcuts
  function handleKeyDown(e: KeyboardEvent) {
    // Exit fullscreen on Escape key
    if (e.key === 'Escape' && isFullscreen.value) {
      e.preventDefault();
      isFullscreen.value = false;
    }
  }

  // Focus input on mount
  onMounted(() => {
    // Add global keyboard event listener
    document.addEventListener('keydown', handleKeyDown);

    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.focus();
      }
    });

    // Start wiggle animation after 10 seconds if chat hasn't been opened
    setTimeout(() => {
      if (!isExpanded.value) {
        shouldWiggle.value = true;
        // Stop wiggling after 3 seconds
        setTimeout(() => {
          shouldWiggle.value = false;
        }, 3000);
      }
    }, 10000);
  });

  // Cleanup event listener on unmount
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
  });
</script>

<style scoped>
  /* Wiggle animation for chat button */
  @keyframes wiggle {
    0%,
    7% {
      transform: rotateZ(0);
    }
    15% {
      transform: rotateZ(-15deg);
    }
    20% {
      transform: rotateZ(10deg);
    }
    25% {
      transform: rotateZ(-10deg);
    }
    30% {
      transform: rotateZ(6deg);
    }
    35% {
      transform: rotateZ(-4deg);
    }
    40%,
    100% {
      transform: rotateZ(0);
    }
  }

  .wiggle {
    animation: wiggle 2s ease-in-out infinite;
  }

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
