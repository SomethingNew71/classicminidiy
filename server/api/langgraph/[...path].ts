import { Client } from '@langchain/langgraph-sdk';

export default defineEventHandler(async (event) => {
  const path = getRouterParam(event, 'path') || '';
  const pathParts = path.split('/');
  const method = event.method;
  const apiUrl = process.env.NUXT_LANGGRAPH_API_URL;
  const apiKey = process.env.NUXT_LANGSMITH_API_KEY || getHeader(event, 'x-api-key') || '';

  if (!apiUrl) {
    setResponseStatus(event, 500);
    return { error: 'LangGraph API URL not configured' };
  }

  // Initialize LangGraph client
  const client = new Client({
    apiUrl,
    apiKey: apiKey || undefined,
  });

  try {
    // Get request body for POST/PUT/PATCH requests
    let body: any = undefined;
    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      body = await readBody(event);
    }

    // Handle different LangGraph API endpoints
    if (method === 'POST' && path === 'threads') {
      // Create a new thread
      const thread = await client.threads.create();
      return thread;
    }

    if (method === 'GET' && pathParts[0] === 'threads' && pathParts.length === 1) {
      // List threads
      const threads = await client.threads.search();
      return threads;
    }

    if (method === 'GET' && pathParts[0] === 'threads' && pathParts[1] && pathParts.length === 2) {
      // Get a specific thread
      const threadId = pathParts[1];
      const thread = await client.threads.get(threadId);
      return thread;
    }

    if (method === 'DELETE' && pathParts[0] === 'threads' && pathParts[1] && pathParts.length === 2) {
      // Delete a specific thread
      const threadId = pathParts[1];
      try {
        await client.threads.delete(threadId);
        return { success: true, message: 'Thread deleted successfully' };
      } catch (error: any) {
        console.error('Failed to delete thread:', error);
        setResponseStatus(event, 500);
        return { error: 'Failed to delete thread', message: error.message };
      }
    }

    if (method === 'POST' && pathParts[0] === 'threads' && pathParts[2] === 'runs' && pathParts[3] === 'stream') {
      // Handle streaming runs
      let threadId = pathParts[1];
      const { assistant_id, input, stream_mode = 'updates', ...config } = body || {};

      if (!assistant_id) {
        setResponseStatus(event, 400);
        return { error: 'assistant_id is required' };
      }

      // Create a new thread if threadId is 'new' or invalid
      if (threadId === 'new' || !threadId) {
        try {
          const newThread = await client.threads.create();
          threadId = newThread.thread_id;
        } catch (error: any) {
          console.error('Failed to create thread:', error);
          setResponseStatus(event, 500);
          return { error: 'Failed to create thread', message: error.message };
        }
      }

      // Create a streaming response using server-sent events
      setHeader(event, 'Content-Type', 'text/event-stream');
      setHeader(event, 'Cache-Control', 'no-cache');
      setHeader(event, 'Connection', 'keep-alive');
      setHeader(event, 'Access-Control-Allow-Origin', '*');
      setHeader(event, 'Access-Control-Allow-Headers', 'Cache-Control');

      // Create a readable stream for server-sent events
      const stream = new ReadableStream({
        async start(controller) {
          try {
            // Send thread ID as first event
            const threadInfo = JSON.stringify({ event: 'thread_id', data: { thread_id: threadId } });
            controller.enqueue(`data: ${threadInfo}\n\n`);

            const streamResponse = client.runs.stream(threadId, assistant_id, {
              input,
              streamMode: stream_mode,
              ...config,
            });

            for await (const chunk of streamResponse) {
              // Send each chunk as a server-sent event
              const data = JSON.stringify(chunk);
              controller.enqueue(`data: ${data}\n\n`);
            }
          } catch (error: any) {
            console.error('Streaming error:', error);
            const errorData = JSON.stringify({ error: error.message });
            controller.enqueue(`data: ${errorData}\n\n`);
          } finally {
            controller.enqueue('data: [DONE]\n\n');
            controller.close();
          }
        },
      });

      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Cache-Control',
        },
      });
    }

    if (method === 'POST' && pathParts[0] === 'threads' && pathParts[2] === 'runs' && pathParts.length === 3) {
      // Handle non-streaming runs
      let threadId = pathParts[1];
      const { assistant_id, input, ...config } = body || {};

      if (!assistant_id) {
        setResponseStatus(event, 400);
        return { error: 'assistant_id is required' };
      }

      // Create a new thread if threadId is 'new' or invalid
      if (threadId === 'new' || !threadId) {
        try {
          const newThread = await client.threads.create();
          threadId = newThread.thread_id;
        } catch (error: any) {
          console.error('Failed to create thread:', error);
          setResponseStatus(event, 500);
          return { error: 'Failed to create thread', message: error.message };
        }
      }

      const run = await client.runs.create(threadId, assistant_id, {
        input,
        ...config,
      });

      // Wait for the run to complete and return the result
      const result = await client.runs.join(threadId, run.run_id);
      return result;
    }

    if (method === 'GET' && pathParts[0] === 'threads' && pathParts[2] === 'runs' && pathParts.length === 3) {
      // List runs for a thread - fallback to raw API call since SDK might not have this method
      const threadId = pathParts[1];
      const targetUrl = `${apiUrl}/threads/${threadId}/runs`;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (apiKey) {
        headers['x-api-key'] = apiKey;
      }
      const response = await $fetch(targetUrl, { method: 'GET', headers });
      return response;
    }

    if (
      method === 'GET' &&
      pathParts[0] === 'threads' &&
      pathParts[2] === 'runs' &&
      pathParts[3] &&
      pathParts.length === 4
    ) {
      // Get a specific run
      const threadId = pathParts[1];
      const runId = pathParts[3];
      const run = await client.runs.get(threadId, runId);
      return run;
    }

    // Handle other endpoints by falling back to raw API calls
    // This maintains compatibility with any endpoints not yet covered by the SDK
    const targetUrl = `${apiUrl}/${path}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (apiKey) {
      headers['x-api-key'] = apiKey;
    }

    // Forward other relevant headers
    const forwardHeaders = ['authorization', 'user-agent', 'accept', 'accept-encoding', 'assistant-id'];
    forwardHeaders.forEach((headerName) => {
      const headerValue = getHeader(event, headerName);
      if (headerValue) {
        headers[headerName] = headerValue;
      }
    });

    const response = await $fetch.raw(targetUrl, {
      method,
      headers,
      body,
    });

    // Forward response headers
    const responseHeaders = response.headers;
    if (responseHeaders.get('content-type')) {
      setHeader(event, 'content-type', responseHeaders.get('content-type')!);
    }
    if (responseHeaders.get('cache-control')) {
      setHeader(event, 'cache-control', responseHeaders.get('cache-control')!);
    }

    return response._data;
  } catch (error: any) {
    console.error('LangGraph API Error:', error);

    // Handle SDK errors
    if (error.response) {
      setResponseStatus(event, error.response.status || 500);
      return error.response.data || { error: 'API request failed' };
    }

    // Handle other errors
    setResponseStatus(event, 500);
    return {
      error: 'Internal server error',
      message: error.message,
    };
  }
});
