import type { Ref } from 'vue';

// Core Message Interface
export interface Message {
  id?: string;
  type: string;
  content: any;
  tool_calls?: ToolCall[];
  [key: string]: any; // Allow additional properties from LangGraph
}

// Thread Management
export interface Thread {
  thread_id: string;
  created_at: string;
  updated_at: string;
  metadata: {
    graph_id: string;
    assistant_id: string;
  };
  status: string;
  config: any;
  values: {
    messages: any[];
  };
  interrupts: any;
}

// Tool Calls
export interface ToolCall {
  id: string;
  name: string;
  args?: Record<string, any>;
  type: string;
}

// Artifacts
export interface Artifact {
  id: string;
  title?: string;
  description?: string;
  type: string;
  language?: string;
  content: string;
  createdAt?: string;
}

// Configuration
export interface Configuration {
  apiUrl: string;
  assistantId: string;
  apiKey?: string;
}

// Stream Provider Context
export interface UseStreamContextProvider {
  messages: Ref<Message[]>;
  isLoading: Ref<boolean>;
  error: Ref<string | null>;
  submit: (input: any, options?: any) => Promise<void>;
  stop: () => void;
  threadId: Ref<string | null>;
  getMessagesMetadata: (message: Message) => any;
}

export interface ThreadHistoryProps {
  threads: Thread[];
  currentThreadId?: string | null;
}

export interface AssistantMessageProps {
  message?: Message;
  isLoading: boolean;
}

export interface HumanMessageProps {
  message: Message;
  isLoading: boolean;
}

export interface MarkdownTextProps {
  content: string;
}
