import { ref, computed, provide, inject, onMounted, watch, type InjectionKey, type Ref } from 'vue';
import { Client } from '@langchain/langgraph-sdk';

// Basic type definitions to replace LangGraph SDK types
interface Message {
  id?: string;
  type: string;
  content: any;
}

// Injection key for stream context
const StreamContextKey: InjectionKey<UseStreamContextProvider> = Symbol('StreamContext');
interface UseStreamContextProvider {
  messages: Ref<Message[]>;
  isLoading: Ref<boolean>;
  submit: (input: any, options?: any) => Promise<void>;
  stop: () => void;
  threadId: Ref<string | null>;
  getMessagesMetadata: (message: Message) => any;
}

// Vue composition function to replace React's context
export function useStreamProvider() {
  // Configuration state
  const apiUrl = ref(process.env.NUXT_PUBLIC_LANGGRAPH_API_URL || 'http://localhost:2024');
  const assistantId = ref(process.env.NUXT_PUBLIC_LANGGRAPH_ASSISTANT_ID || 'agent');
  const apiKey = ref('');
  const threadId = ref<string | null>(null);

  // Load API key from localStorage on client-side
  onMounted(() => {
    if (process.client) {
      const storedKey = localStorage.getItem('langsmith-api-key');
      if (storedKey) {
        apiKey.value = storedKey;
      }
    }
  });

  // Watch for API key changes and persist to localStorage
  watch(apiKey, (newKey) => {
    if (process.client && newKey) {
      localStorage.setItem('langsmith-api-key', newKey);
    }
  });

  // Configuration state
  const isConfigured = computed(() => {
    return !!(apiUrl.value && assistantId.value);
  });

  // Setters that persist to localStorage
  const setApiKey = (key: string) => {
    apiKey.value = key;
    if (process.client) {
      if (key) {
        localStorage.setItem('langsmith-api-key', key);
      } else {
        localStorage.removeItem('langsmith-api-key');
      }
    }
  };

  const setApiUrl = (url: string) => {
    apiUrl.value = url;
  };

  const setAssistantId = (id: string) => {
    assistantId.value = id;
  };

  const setThreadId = (id: string | null) => {
    threadId.value = id;
  };

  return {
    apiUrl: readonly(apiUrl),
    assistantId: readonly(assistantId),
    apiKey: readonly(apiKey),
    threadId: readonly(threadId),
    isConfigured,
    setApiKey,
    setApiUrl,
    setAssistantId,
    setThreadId,
  };
}

// Stream session management
export function createStreamSession(apiUrl: string, apiKey: string, assistantId: string, threadId: string | null) {
  const messages = ref<any[]>([]);
  const isLoading = ref(false);
  const currentThreadId = ref(threadId);

  // Transform API URL for our Nuxt proxy
  const proxyApiUrl = '/api/langgraph';

  const submit = async (input: any, options: any = {}) => {
    isLoading.value = true;

    try {
      // Use the correct LangGraph API endpoint structure
      // Based on LangGraph SDK: client.runs.stream(thread_id, assistant_id, options)
      // The URL should include both thread_id and assistant_id
      const threadIdForUrl = currentThreadId.value || 'new';
      const endpoint = `${proxyApiUrl}/threads/${threadIdForUrl}/runs/stream`;

      // Prepare the request payload to match LangGraph SDK format
      // The SDK expects: client.runs.stream(thread_id, assistant_id, options)
      const payload: any = {
        assistant_id: assistantId,
        input: input,
        stream_mode: options.streamMode || ['values'],
      };

      // Add config if checkpoint is provided
      if (options.checkpoint) {
        payload.config = {
          configurable: {
            checkpoint_id: options.checkpoint.id,
          },
        };
      }

      console.log('LangGraph API Request:', {
        endpoint,
        assistantId,
        payload,
        options,
      });

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(apiKey && { 'x-api-key': apiKey }),
        },
        body: JSON.stringify(payload),
      });

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter((line) => line.trim());

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataContent = line.slice(6);

            // Handle the [DONE] signal
            if (dataContent === '[DONE]') {
              console.log('Stream completed');
              break;
            }

            try {
              const data = JSON.parse(dataContent);
              handleStreamEvent(data, options);
            } catch (e) {
              console.error('Failed to parse stream data:', e, 'Content:', dataContent);
            }
          }
        }
      }
    } catch (error) {
      console.error('Stream submission failed:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const handleStreamEvent = (event: any, options: any) => {
    // Handle different event types from LangGraph streaming
    if (event.event === 'thread_id') {
      // Update the current thread ID
      const threadId = event.data?.thread_id;
      if (threadId) {
        currentThreadId.value = threadId;
        console.log('Thread ID updated:', threadId);
      }
    } else if (event.event === 'messages/partial') {
      // Update or add message
      const messageUpdate = event.data;
      const existingIndex = messages.value.findIndex((m: any) => m.id === messageUpdate.id);

      if (existingIndex >= 0) {
        messages.value[existingIndex] = { ...messages.value[existingIndex], ...messageUpdate };
      } else {
        messages.value.push(messageUpdate);
      }
    } else if (event.event === 'messages/complete') {
      // Finalize message
      const completedMessage = event.data;
      const existingIndex = messages.value.findIndex((m: any) => m.id === completedMessage.id);

      if (existingIndex >= 0) {
        messages.value[existingIndex] = completedMessage;
      }
    }
  };

  const getMessagesMetadata = (message: Message) => {
    // Placeholder implementation for message metadata
    return {
      firstSeenState: {
        parent_checkpoint: null,
        values: { messages: messages.value },
      },
    };
  };

  const stop = () => {
    isLoading.value = false;
    // TODO: Implement actual stream cancellation
  };

  return {
    messages,
    isLoading,
    submit,
    stop,
    threadId: currentThreadId,
    getMessagesMetadata,
  };
}

// Provide the stream context
export function provideStreamContext(context: UseStreamContextProvider) {
  provide(StreamContextKey, context);
}

// Use the stream context
export function useStreamContext(): UseStreamContextProvider {
  const context = inject(StreamContextKey);
  if (!context) {
    throw new Error('useStreamContext must be used within a StreamProvider');
  }
  return context;
}
