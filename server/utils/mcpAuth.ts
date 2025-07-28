/**
 * MCP Authentication Utilities
 * Handles API key validation for MCP endpoints
 */

/**
 * Validates MCP API key from request headers
 * @param event - H3 event object
 * @returns boolean - true if authenticated, false otherwise
 */
export function validateMcpAuth(event: any): boolean {
  const authHeader = getHeader(event, 'authorization') || getHeader(event, 'Authorization');

  if (!authHeader) {
    return false;
  }

  // Extract Bearer token
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

  // Get valid API keys from environment variables
  const validKeys = process.env.MCP_API_KEYS?.split(',') || [];

  // Also check for a single API key
  if (process.env.MCP_API_KEY) {
    validKeys.push(process.env.MCP_API_KEY);
  }

  // Default development key if no environment variables are set
  if (validKeys.length === 0 && process.env.NODE_ENV === 'development') {
    validKeys.push('dev-mcp-key-classic-mini-diy');
  }

  return validKeys.includes(token);
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
        message: 'Please provide a valid API key in the Authorization header',
        format: 'Authorization: Bearer <your-api-key>',
      },
    });
  }
}

/**
 * Generate a secure API key for MCP access
 * @returns string - Generated API key
 */
export function generateMcpApiKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'mcp_';

  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}
