import type { Message, UseStreamContextProvider } from '../../data/models/chat';

// Injection key for stream context
const StreamContextKey: InjectionKey<UseStreamContextProvider> = Symbol('StreamContext');

// Vue composition function to replace React's context
export function useStreamProvider() {
  // Configuration state
  const assistantId = ref(process.env.NUXT_PUBLIC_LANGGRAPH_ASSISTANT_ID || 'agent');
  const threadId = ref<string | null>(null);
  const isConfigured = computed(() => !!assistantId.value);

  const setThreadId = (id: string | null) => {
    threadId.value = id;
  };

  return {
    assistantId: readonly(assistantId),
    threadId: readonly(threadId),
    isConfigured,
    setThreadId,
  };
}

// Stream session management
export function createStreamSession(
  assistantId: string,
  threadId: string | null = null,
  onThreadCreated?: (threadId: string) => void
) {
  const messages = ref<any[]>([]);
  const isLoading = ref(false);
  const currentThreadId = ref<string | null>(threadId);

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

      // Add metadata if provided in options
      if (options.metadata) {
        payload.metadata = options.metadata;
      }

      // Add config if checkpoint is provided
      if (options.checkpoint) {
        payload.config = {
          configurable: {
            checkpoint_id: options.checkpoint.id,
          },
        };
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let buffer = '';
        let dataBuffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Keep the last incomplete line in buffer

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataContent = line.slice(6);

              // Handle the [DONE] signal
              if (dataContent === '[DONE]') {
                break;
              }

              // Accumulate data content
              dataBuffer += dataContent;

              // Try to parse the accumulated data
              try {
                const data = JSON.parse(dataBuffer);
                handleStreamEvent(data, options);
                dataBuffer = ''; // Reset buffer after successful parse
              } catch (e) {
                // If parsing fails, it might be incomplete JSON, continue accumulating
                // Only log error if the buffer is getting too large (likely a real error)
                if (dataBuffer.length > 50000) {
                  console.error(
                    'Failed to parse stream data after accumulating:',
                    e,
                    'Content length:',
                    dataBuffer.length
                  );
                  dataBuffer = ''; // Reset to prevent memory issues
                }
              }
            } else if (line.trim() === '') {
              // Empty line might indicate end of a data block, try parsing accumulated data
              if (dataBuffer) {
                try {
                  const data = JSON.parse(dataBuffer);
                  handleStreamEvent(data, options);
                  dataBuffer = ''; // Reset buffer after successful parse
                } catch (e) {
                  // Still incomplete, continue accumulating
                }
              }
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

  function handleStreamEvent(event: any, options: any) {
    // Handle different event types from LangGraph streaming
    if (event.event === 'thread_id') {
      // Update the current thread ID
      const newThreadId = event.data?.thread_id;
      if (newThreadId) {
        const wasNewThread = !currentThreadId.value;
        currentThreadId.value = newThreadId;

        // Call the callback if a new thread was created
        if (wasNewThread && onThreadCreated) {
          onThreadCreated(newThreadId);
        }
      }
    } else if (event.event === 'messages/partial') {
      // Update or add message
      const messageUpdate = event.data;
      // Only process messages with valid content
      if (!hasValidContent(messageUpdate)) {
        return;
      }

      const existingIndex = messages.value.findIndex((m: any) => m.id === messageUpdate.id);

      if (existingIndex >= 0) {
        // Update existing message
        messages.value[existingIndex] = { ...messages.value[existingIndex], ...messageUpdate };
      } else {
        // Check if we should group this with the last message
        const lastMessage = messages.value[messages.value.length - 1];
        if (shouldGroupWithLastMessage(messageUpdate, lastMessage)) {
          // Merge with the last message instead of creating a new one
          const currentContent = getContentString(messageUpdate.content);
          const lastContent = getContentString(lastMessage.content);

          if (currentContent.trim()) {
            lastMessage.content = lastContent + (lastContent ? '\n\n' : '') + currentContent;

            // Merge tool calls if any
            if (messageUpdate.tool_calls && messageUpdate.tool_calls.length > 0) {
              lastMessage.tool_calls = [...(lastMessage.tool_calls || []), ...messageUpdate.tool_calls];
            }

            // Update timestamp and ID to the latest
            if (messageUpdate.created_at) {
              lastMessage.created_at = messageUpdate.created_at;
            }
            lastMessage.id = messageUpdate.id; // Use the latest message ID
          }
        } else {
          // Add as new message
          messages.value.push(messageUpdate);
        }
      }
    } else if (event.event === 'messages/complete') {
      // Finalize message
      const completedMessage = event.data;

      // Only process messages with valid content
      if (!hasValidContent(completedMessage)) {
        // Remove any existing empty message with this ID
        const existingIndex = messages.value.findIndex((m: any) => m.id === completedMessage.id);
        if (existingIndex >= 0) {
          messages.value.splice(existingIndex, 1);
        }
        return;
      }

      const existingIndex = messages.value.findIndex((m: any) => m.id === completedMessage.id);

      if (existingIndex >= 0) {
        // Update existing message
        messages.value[existingIndex] = completedMessage;
      } else {
        // Check if we should group this with the last message
        const lastMessage = messages.value[messages.value.length - 1];
        if (shouldGroupWithLastMessage(completedMessage, lastMessage)) {
          // Merge with the last message instead of creating a new one
          const currentContent = getContentString(completedMessage.content);
          const lastContent = getContentString(lastMessage.content);

          if (currentContent.trim()) {
            lastMessage.content = lastContent + (lastContent ? '\n\n' : '') + currentContent;

            // Merge tool calls if any
            if (completedMessage.tool_calls && completedMessage.tool_calls.length > 0) {
              lastMessage.tool_calls = [...(lastMessage.tool_calls || []), ...completedMessage.tool_calls];
            }

            // Update timestamp and ID to the latest
            if (completedMessage.created_at) {
              lastMessage.created_at = completedMessage.created_at;
            }
            lastMessage.id = completedMessage.id; // Use the latest message ID
          }
        } else {
          // Add as new message
          messages.value.push(completedMessage);
        }
      }
    } else if (event.event === 'values') {
      // Handle 'values' event type which might contain messages
      if (event.data && event.data.messages) {
        // Filter out empty messages and group consecutive AI messages
        const validMessages = event.data.messages.filter(hasValidContent);
        const groupedMessages = groupConsecutiveMessages(validMessages);
        messages.value = groupedMessages;
      }
    } else {
      // Log unhandled events for debugging
      console.warn('Unhandled stream event:', event.event, event);
    }
  }

  // Helper function to check if a message has valid content
  function hasValidContent(message: any): boolean {
    if (!message) return false;

    // Always include human messages
    if (message.type === 'human') return true;

    // For AI messages, check if they have meaningful content
    if (message.type === 'ai' || message.type === 'assistant') {
      const content = getContentString(message.content);
      const hasText = Boolean(content && content.trim().length > 0);
      const hasToolCalls = Boolean(message.tool_calls && message.tool_calls.length > 0);
      return hasText || hasToolCalls;
    }

    // For tool messages, check if they have content
    if (message.type === 'tool') {
      const content = getContentString(message.content);
      return Boolean(content && content.trim().length > 0);
    }

    return false;
  }

  // Helper function to extract content string from various formats
  function getContentString(content: any): string {
    if (!content) return '';
    if (typeof content === 'string') return content;
    if (Array.isArray(content)) {
      return content
        .map((item: any) => {
          if (typeof item === 'string') return item;
          if (item && typeof item === 'object' && item.text) return item.text;
          if (item && typeof item === 'object' && item.content) return item.content;
          return '';
        })
        .join(' ');
    }
    if (typeof content === 'object' && content.text) return content.text;
    if (typeof content === 'object' && content.content) return content.content;
    return String(content);
  }

  // Helper function to check if a message should be grouped with the last message
  function shouldGroupWithLastMessage(newMessage: any, lastMessage: any): boolean {
    if (!lastMessage || !newMessage) return false;

    // Only group AI messages with AI messages
    const isNewMessageAI = newMessage.type === 'ai' || newMessage.type === 'assistant';
    const isLastMessageAI = lastMessage.type === 'ai' || lastMessage.type === 'assistant';

    return isNewMessageAI && isLastMessageAI;
  }

  // Helper function to group consecutive AI messages
  function groupConsecutiveMessages(messages: any[]): any[] {
    if (!messages || messages.length === 0) return [];

    const grouped: any[] = [];
    let currentGroup: any[] = [];
    let lastType = '';

    for (const message of messages) {
      const messageType = message.type;

      // If this is the same type as the last message and it's an AI message, group them
      if (
        messageType === lastType &&
        (messageType === 'ai' || messageType === 'assistant') &&
        currentGroup.length > 0
      ) {
        // Merge content of consecutive AI messages
        const lastMessage = currentGroup[currentGroup.length - 1];
        const currentContent = getContentString(message.content);
        const lastContent = getContentString(lastMessage.content);

        if (currentContent.trim()) {
          // Append content to the last message in the group
          lastMessage.content = lastContent + (lastContent ? '\n\n' : '') + currentContent;

          // Merge tool calls if any
          if (message.tool_calls && message.tool_calls.length > 0) {
            lastMessage.tool_calls = [...(lastMessage.tool_calls || []), ...message.tool_calls];
          }

          // Update timestamp to the latest
          if (message.created_at) {
            lastMessage.created_at = message.created_at;
          }
        }
      } else {
        // Different type or first message, start a new group
        if (currentGroup.length > 0) {
          grouped.push(...currentGroup);
        }
        currentGroup = [{ ...message }];
        lastType = messageType;
      }
    }

    // Add the last group
    if (currentGroup.length > 0) {
      grouped.push(...currentGroup);
    }

    return grouped;
  }

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
