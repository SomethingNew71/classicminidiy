import { H3Event } from 'h3';

// ===== RATE LIMITING =====
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
    blocked: boolean;
    suspiciousCount: number;
  };
}

// In-memory store for rate limiting
// For production, consider using Redis or another distributed cache
const ipStore: RateLimitStore = {};

// Configuration
const MAX_REQUESTS = 100; // Maximum requests allowed in the time window
const TIME_WINDOW = 60 * 1000; // Time window in milliseconds (1 minute)
const BLOCK_DURATION = 5 * 60 * 1000; // Block duration in milliseconds (5 minutes)
const SUSPICIOUS_THRESHOLD = 5; // Number of suspicious activities before additional monitoring

// Whitelist for paths that should not be rate limited
const WHITELIST_PATHS = [
  '/', // Main page
  '/favicon.ico',
  '/robots.txt',
  // Add other public paths here
];

// ===== PAYLOAD SIZE LIMITING =====
const MAX_PAYLOAD_SIZE = 1024 * 1024; // 1MB

// ===== SUSPICIOUS PATTERNS =====
const SUSPICIOUS_PATTERNS = [
  /\.\.\//g, // Directory traversal
  /<script>/gi, // Basic XSS
  /(\%27)|(\')|(\-\-)|(\%23)|(#)/gi, // Basic SQL injection
  /((\%3C)|<)((\%2F)|\/)*[a-z0-9\%]+((\%3E)|>)/gi, // XSS variations
];

export default defineEventHandler(async (event: H3Event) => {
  // Get the path
  const path = event.node.req.url || '';

  // Skip security checks for whitelisted paths
  if (WHITELIST_PATHS.some((whitelistedPath) => path.startsWith(whitelistedPath))) {
    return;
  }

  // Only apply security to API routes
  if (!path.startsWith('/api/')) {
    return;
  }

  // Get client IP
  const clientIp = getClientIp(event);
  if (!clientIp) {
    return;
  }

  // Initialize IP record if it doesn't exist
  const now = Date.now();
  if (!ipStore[clientIp]) {
    ipStore[clientIp] = {
      count: 0,
      resetTime: now + TIME_WINDOW,
      blocked: false,
      suspiciousCount: 0,
    };
  }

  const record = ipStore[clientIp];

  // Check if IP is blocked
  if (record.blocked) {
    if (now > record.resetTime) {
      // Unblock if block duration has passed
      record.blocked = false;
      record.count = 1;
      record.resetTime = now + TIME_WINDOW;
    } else {
      // Return 429 Too Many Requests
      event.node.res.statusCode = 429;
      event.node.res.setHeader('Retry-After', Math.ceil((record.resetTime - now) / 1000));
      event.node.res.end(
        JSON.stringify({
          error: 'Too many requests',
          message: 'Rate limit exceeded. Please try again later.',
        })
      );
      return false;
    }
  }

  // If the reset time has passed, reset the counter
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + TIME_WINDOW;
  } else {
    // Increment request count
    record.count++;
  }

  // Check payload size for POST, PUT, PATCH requests
  const method = event.node.req.method || '';
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    const contentLength = parseInt((event.node.req.headers['content-length'] as string) || '0');
    if (contentLength > MAX_PAYLOAD_SIZE) {
      record.suspiciousCount++;
      event.node.res.statusCode = 413;
      event.node.res.end(
        JSON.stringify({
          error: 'Payload too large',
          message: 'Request payload exceeds the maximum allowed size.',
        })
      );
      return false;
    }

    // Check for suspicious patterns in request body
    try {
      const body = await readBody(event);
      const bodyString = typeof body === 'string' ? body : JSON.stringify(body);

      for (const pattern of SUSPICIOUS_PATTERNS) {
        if (pattern.test(bodyString)) {
          record.suspiciousCount++;
          event.node.res.statusCode = 400;
          event.node.res.end(
            JSON.stringify({
              error: 'Invalid request',
              message: 'Request contains potentially malicious content.',
            })
          );
          return false;
        }
      }
    } catch (error) {
      // If we can't read the body, continue with other checks
    }
  }

  // Check for suspicious patterns in URL
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(path)) {
      record.suspiciousCount++;
      event.node.res.statusCode = 400;
      event.node.res.end(
        JSON.stringify({
          error: 'Invalid request',
          message: 'Request contains potentially malicious content.',
        })
      );
      return false;
    }
  }

  // Apply stricter rate limiting for suspicious IPs
  const rateLimit =
    record.suspiciousCount >= SUSPICIOUS_THRESHOLD
      ? Math.floor(MAX_REQUESTS / 2) // Half the normal rate limit
      : MAX_REQUESTS;

  // If the request count exceeds the limit, block the request
  if (record.count > rateLimit) {
    record.blocked = true;
    record.resetTime = now + BLOCK_DURATION;

    // Return 429 Too Many Requests
    event.node.res.statusCode = 429;
    event.node.res.setHeader('Retry-After', Math.ceil(BLOCK_DURATION / 1000));
    event.node.res.end(
      JSON.stringify({
        error: 'Too many requests',
        message: 'Rate limit exceeded. Please try again later.',
      })
    );

    return false;
  }

  // Add security headers
  setSecurityHeaders(event);
});

// Helper function to get client IP
function getClientIp(event: H3Event): string | null {
  // Try to get IP from X-Forwarded-For header (common when behind a proxy)
  const forwardedFor = event.node.req.headers['x-forwarded-for'];
  if (forwardedFor) {
    // X-Forwarded-For can contain multiple IPs, take the first one
    const ips = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor.split(',')[0].trim();
    return ips;
  }

  // Fallback to direct connection IP
  return event.node.req.socket.remoteAddress || null;
}

// Add security headers to responses
function setSecurityHeaders(event: H3Event): void {
  const headers = event.node.res.getHeaders();

  // Only set headers if they haven't been set already
  if (!headers['x-content-type-options']) {
    event.node.res.setHeader('X-Content-Type-Options', 'nosniff');
  }

  if (!headers['x-frame-options']) {
    event.node.res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  }

  if (!headers['x-xss-protection']) {
    event.node.res.setHeader('X-XSS-Protection', '1; mode=block');
  }

  if (!headers['strict-transport-security']) {
    event.node.res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
}
