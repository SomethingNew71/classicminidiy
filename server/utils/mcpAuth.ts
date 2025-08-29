/**
 * MCP Authentication Utilities
 * Handles API key validation for MCP endpoints
 */

/**
 * Validates MCP API key from query parameters
 * @param event - H3 event object
 * @returns boolean - true if authenticated, false otherwise
 */
export function validateMcpAuth(event: any): boolean {
  const query = getQuery(event);
  const apiKey = query.api_key || query.apiKey || query.key;

  if (!apiKey || typeof apiKey !== 'string') {
    return false;
  }

  const config = useRuntimeConfig();
  const apiKeyString = config.MCP_API_KEYS as string;
  // Get valid API keys from environment variables
  const validKeys = apiKeyString.split(',') || [];

  // Also check for a single API key
  if (config.MCP_API_KEY) {
    validKeys.push(config.MCP_API_KEY as string);
  }

  // Default development key if no environment variables are set
  if (validKeys.length === 0 && config.NODE_ENV === 'development') {
    validKeys.push('dev-mcp-key-classic-mini-diy');
  }

  return validKeys.includes(apiKey);
}

/**
 * Middleware to require MCP authentication
 * Throws 401 error if not authenticated
 * @param event - H3 event object
 */
export function requireMcpAuth(event: any): void {
  if (!validateMcpAuth(event)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized - Valid MCP API key required',
      data: {
        error: 'INVALID_API_KEY',
        message: 'Please provide a valid API key as a query parameter',
        format: '?api_key=<your-api-key> or ?apiKey=<your-api-key> or ?key=<your-api-key>',
      },
    });
  }
}
