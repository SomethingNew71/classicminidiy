import { Client } from '@langchain/langgraph-sdk';

export function createLangGraphClient() {
  const apiUrl = process.env.NUXT_LANGGRAPH_API_URL;
  const apiKey = process.env.NUXT_LANGSMITH_API_KEY;
  return new Client({ apiUrl, apiKey });
}

export function getApiKey(event: any) {
  return process.env.NUXT_LANGSMITH_API_KEY || getHeader(event, 'x-api-key') || '';
}

export function getApiUrl() {
  return process.env.NUXT_LANGGRAPH_API_URL;
}

export function forwardHeaders(event: any, headers: Record<string, string>) {
  const forwardHeaders = ['authorization', 'user-agent', 'accept', 'accept-encoding', 'assistant-id'];
  forwardHeaders.forEach((headerName) => {
    const headerValue = getHeader(event, headerName);
    if (headerValue) {
      headers[headerName] = headerValue;
    }
  });
}

export async function createThreadIfNeeded(client: Client, threadId: string) {
  if (threadId === 'new' || !threadId) {
    try {
      const newThread = await client.threads.create();
      return newThread.thread_id;
    } catch (error: any) {
      console.error('Failed to create thread:', error);
      throw error;
    }
  }
  return threadId;
}
