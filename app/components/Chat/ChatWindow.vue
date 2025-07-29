<template>
  <!-- Chat Interface -->
  <div class="flex flex-col h-full bg-base-100">
    <!-- Experimental Disclaimer (always visible) -->
    <div class="bg-warning/10 border-b border-warning/20 px-4 py-2">
      <div class="flex items-start gap-3">
        <i class="fa-solid fa-triangle-exclamation text-warning text-sm mt-0.5 flex-shrink-0"></i>
        <div class="text-sm text-base-content/80">
          <strong class="text-warning">Experimental Feature:</strong> This AI assistant is in beta and should not be
          used as your only source of technical information. Always verify critical information with official
          documentation, qualified mechanics, or experienced Classic Mini enthusiasts.
        </div>
      </div>
    </div>
    <!-- Welcome Banner (shown when chat is empty) -->
    <div v-if="isChatEmpty && !isLoading" class="flex-1 flex items-center justify-center px-4">
      <div class="max-w-2xl mx-auto text-center space-y-6">
        <!-- Welcome Message -->
        <div class="card bg-primary/10 border border-primary/20">
          <div class="card-body p-6">
            <div class="flex flex-col items-center gap-4">
              <i class="fa-solid fa-comments text-primary text-4xl"></i>
              <div>
                <h3 class="font-semibold text-xl mb-3 text-primary">Welcome to CMDIY Assistant!</h3>
                <p class="text-base text-base-content/80 leading-relaxed">
                  I'm your Classic Mini DIY assistant, here to help you with technical questions, decode chassis
                  numbers, find parts information, navigate the archives, and provide guidance on Classic Mini
                  restoration and maintenance. Ask me anything about your Classic Mini project!
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Centered Input Area (when chat is empty) -->
        <div class="w-full max-w-2xl">
          <form @submit.prevent="handleSubmit" class="relative">
            <div class="flex items-end gap-3 bg-base-200 rounded-2xl p-3 shadow-sm border border-base-300">
              <textarea
                ref="inputRef"
                v-model="input"
                @keydown="handleInputKeyDown"
                placeholder="Type your message..."
                class="flex-1 bg-transparent resize-none outline-none min-h-[1.5rem] max-h-32 placeholder-base-content/50"
                rows="1"
              ></textarea>

              <button
                v-if="isLoading"
                @click="stopGeneration"
                type="button"
                class="btn btn-circle btn-sm btn-error flex-shrink-0"
              >
                <i class="fa-solid fa-stop"></i>
              </button>

              <button
                v-else
                type="submit"
                class="btn btn-circle btn-sm btn-primary flex-shrink-0"
                :disabled="!input.trim()"
              >
                <i class="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </form>

          <!-- Report Issue Link Below Centered Input -->
          <div class="flex justify-center mt-3">
            <a
              href="mailto:support@classicminidiy.com?subject=Chat Issue Report"
              class="text-sm text-base-content/60 hover:text-base-content/80 flex items-center gap-2 transition-colors"
            >
              <i class="fa-solid fa-envelope text-xs"></i>
              Report Issue
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Content (shown when messages exist) -->
    <div v-else class="flex flex-1 overflow-hidden relative">
      <!-- Main Chat Area -->
      <div class="flex flex-1 flex-col">
        <!-- Messages Area -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto px-4 py-6" @scroll="handleScroll">
          <div class="space-y-4 break-words max-w-none">
            <!-- Messages -->
            <template v-for="message in messages" :key="message.id">
              <div class="break-words overflow-wrap-anywhere">
                <HumanMessage v-if="message.type === 'human'" :message="message" :is-loading="isLoading" />
                <AssistantMessage v-else-if="message.type === 'ai'" :message="message" :is-loading="isLoading" />
              </div>
            </template>

            <div v-if="isLoading" class="flex h-8 items-center gap-1 rounded-2xl bg-base-200 px-4 py-2">
              <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-base-content/50"></div>
              <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-base-content/50 animation-delay-500"></div>
              <div class="h-1.5 w-1.5 animate-pulse rounded-full bg-base-content/50 animation-delay-1000"></div>
            </div>
            <!-- Useful Links from Tavily Search Results (Mobile Only) -->
            <UsefulLinks v-if="!isLoading && usefulLinks.length > 0" :links="usefulLinks" class="md:hidden" />
          </div>
        </div>

        <!-- Floating Scroll to Bottom Button -->
        <button
          v-if="showScrollButton"
          @click="scrollToBottom"
          class="absolute bottom-24 right-6 lg:right-80 btn btn-circle btn-sm bg-base-200 border border-base-300 shadow-lg hover:shadow-xl transition-all duration-200 z-10"
          title="Scroll to bottom"
        >
          <i class="fa-solid fa-chevron-down text-sm"></i>
        </button>
      </div>

      <!-- Right Sidebar for Useful Links (Desktop/Tablet Only) -->
      <div class="hidden md:flex md:flex-col md:w-80 md:border-l md:border-base-300 md:bg-base-50">
        <div class="flex-1 overflow-y-auto p-4">
          <!-- Useful Links Sidebar -->
          <div v-if="!isLoading && usefulLinks.length > 0" class="sticky top-0">
            <UsefulLinksSidebar :links="usefulLinks" />
          </div>
          <!-- Placeholder when no links -->
          <div v-else class="text-center text-base-content/50 mt-8">
            <i class="fa-solid fa-link text-2xl mb-2 block"></i>
            <p class="text-sm">Useful links will appear here when available</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Input Area (when messages exist) -->
    <div v-if="!isChatEmpty || isLoading" class="p-4 bg-base-100">
      <form @submit.prevent="handleSubmit" class="relative">
        <div class="flex items-end gap-3 bg-base-200 rounded-2xl p-3 shadow-sm border border-base-300">
          <textarea
            ref="inputRef"
            v-model="input"
            @keydown="handleInputKeyDown"
            placeholder="Type your message..."
            class="flex-1 bg-transparent resize-none outline-none min-h-[1.5rem] max-h-32 placeholder-base-content/50"
            rows="1"
          ></textarea>

          <button
            v-if="isLoading"
            @click="stopGeneration"
            type="button"
            class="btn btn-circle btn-sm btn-error flex-shrink-0"
          >
            <i class="fa-solid fa-stop"></i>
          </button>

          <button
            v-else
            type="submit"
            class="btn btn-circle btn-sm btn-primary flex-shrink-0"
            :disabled="!input.trim()"
          >
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </form>

      <!-- Report Issue Link Below Chat -->
      <div class="flex justify-center mt-3">
        <a
          href="mailto:support@classicminidiy.com?subject=Chat Issue Report"
          class="text-sm text-base-content/60 hover:text-base-content/80 flex items-center gap-2 transition-colors"
        >
          <i class="fa-solid fa-envelope text-xs"></i>
          Report Issue
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStreamProvider, createStreamSession, provideStreamContext } from '~/composables/useStreamProvider';
  import HumanMessage from './HumanMessage.vue';
  import AssistantMessage from './AssistantMessage.vue';
  import UsefulLinks from './UsefulLinks.vue';
  import UsefulLinksSidebar from './UsefulLinksSidebar.vue';

  const { assistantId, threadId, isConfigured, isThreadLoaded, setThreadId, updateThreadUsage, getThreadData } =
    useStreamProvider();

  // Reactive state
  const route = useRoute();
  const input = ref('');
  const inputRef = ref<HTMLTextAreaElement>();
  const messagesContainer = ref<HTMLDivElement>();
  const showScrollButton = ref(false);

  // Check if chat is empty (no messages and no persisted thread)
  const isChatEmpty = computed(() => {
    // If we have messages in the current context, chat is not empty
    if (streamContext?.messages.value && streamContext.messages.value.length > 0) {
      return false;
    }

    // If we have a persisted thread with messages, chat is not empty
    if (threadId.value && isThreadLoaded.value) {
      const threadData = getThreadData();
      if (threadData && threadData.messageCount > 0) {
        return false;
      }
    }

    // Otherwise, chat is empty
    return true;
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

  // Create stream session when configuration is ready
  watch(
    [isConfigured, assistantId, isThreadLoaded],
    () => {
      if (isConfigured.value && isThreadLoaded.value && !streamContext) {
        streamContext = createStreamSession(
          assistantId.value,
          threadId.value,
          // Callback when new thread is created
          (newThreadId: string) => {
            setThreadId(newThreadId);
          }
        );
        provideStreamContext(streamContext);
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

    // Update thread usage after submitting a message
    updateThreadUsage();
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
  // Auto-resize textarea on input
  watch(input, () => {
    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.style.height = 'auto';
        inputRef.value.style.height = inputRef.value.scrollHeight + 'px';
      }
    });
  });

  // Scroll to bottom function
  function scrollToBottom() {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  }

  // Handle scroll event to show/hide scroll button
  function handleScroll() {
    if (messagesContainer.value) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainer.value;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      showScrollButton.value = !isNearBottom;
    }
  }

  // Auto-scroll to bottom when new messages arrive
  watch(
    messages,
    () => {
      nextTick(() => {
        if (messagesContainer.value && !showScrollButton.value) {
          scrollToBottom();
        }
      });
    },
    { deep: true }
  );

  // Handle pre-populated message from query parameter
  const hasAutoSubmitted = ref(false);

  // Watch for stream context to be ready, then auto-submit if needed
  watch(
    () => streamContext?.messages,
    () => {
      const queryMessage = route.query.message;
      if (
        !hasAutoSubmitted.value &&
        queryMessage &&
        typeof queryMessage === 'string' &&
        queryMessage.trim() &&
        streamContext &&
        isConfigured.value
      ) {
        hasAutoSubmitted.value = true;
        input.value = queryMessage.trim();

        // Wait a bit more to ensure everything is fully initialized
        nextTick(() => {
          setTimeout(() => {
            if (streamContext && input.value.trim()) {
              console.log('Auto-submitting message from homepage:', input.value);
              handleSubmit();
            }
          }, 100);
        });
      }
    },
    { immediate: true }
  );

  onMounted(() => {
    nextTick(() => {
      // Just focus and scroll, auto-submission is handled by the watcher above
      if (inputRef.value) {
        inputRef.value.focus();
      }
      // Initial scroll to bottom
      scrollToBottom();
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
