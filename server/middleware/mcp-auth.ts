/**
 * MCP Server Authentication Middleware
 * Protects MCP endpoints with Bearer token authentication
 *
 * API keys must be provided via:
 * - Authorization header: "Bearer <api-key>"
 */

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);

  // Only protect MCP routes
  if (!url.pathname.startsWith('/mcp')) {
    return;
  }

  const config = useRuntimeConfig();

  // Get API key from Authorization header (Bearer token only)
  const authHeader = getHeader(event, 'authorization');
  let providedKey: string | null = null;

  // Extract API key from Authorization header (Bearer token)
  // Case-insensitive check for "Bearer" prefix and trim whitespace
  if (authHeader) {
    const trimmedHeader = authHeader.trim();
    if (trimmedHeader.toLowerCase().startsWith('bearer ')) {
      providedKey = trimmedHeader.substring(7).trim();
    }
  }

  // If no API key provided, reject the request
  if (!providedKey) {
    console.error(`[MCP Auth] No valid Bearer token found. Header: ${authHeader ? 'present' : 'missing'}`);
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
      message: 'Bearer token required. Provide via Authorization header: "Bearer <api-key>"',
    });
  }

  // Get valid API keys from environment
  const validKeys: string[] = [];

  // Check for comma-separated API keys
  if (config.MCP_API_KEYS && typeof config.MCP_API_KEYS === 'string' && config.MCP_API_KEYS.length > 0) {
    const keys = config.MCP_API_KEYS.split(',')
      .map((k) => k.trim())
      .filter((k) => k.length > 0);
    validKeys.push(...keys);
  }

  // Check for single API key
  if (config.MCP_API_KEY && typeof config.MCP_API_KEY === 'string' && config.MCP_API_KEY.length > 0) {
    validKeys.push(config.MCP_API_KEY);
  }

  // In development, allow default dev key (always include it in dev mode)
  if (config.NODE_ENV === 'development' || process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
    validKeys.push('dev-mcp-key-classic-mini-diy');
  }

  // Validate the provided API key
  if (!validKeys.includes(providedKey)) {
    console.error(
      `[MCP Auth] Invalid API key. Provided key does not match any valid keys. Valid keys count: ${validKeys.length}`
    );
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden',
      message: 'Invalid API key provided.',
    });
  }

  // API key is valid, allow the request to proceed
  console.log(`[MCP Auth] ✓ Authenticated request to ${url.pathname}`);
});
