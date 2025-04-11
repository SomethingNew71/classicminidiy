import { H3Event } from 'h3';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store for rate limiting
// For production, consider using Redis or another distributed cache
const ipStore: RateLimitStore = {};

// Configuration
const MAX_REQUESTS = 100; // Maximum requests allowed in the time window
const TIME_WINDOW = 60 * 1000; // Time window in milliseconds (1 minute)
const BLOCK_DURATION = 5 * 60 * 1000; // Block duration in milliseconds (5 minutes)

// Whitelist for paths that should not be rate limited
const WHITELIST_PATHS = [
  '/', // Main page
  '/favicon.ico',
  '/robots.txt',
  // Add other public paths here
];

export default defineEventHandler((event: H3Event) => {
  // Skip rate limiting for whitelisted paths
  const path = event.node.req.url || '';
  if (WHITELIST_PATHS.some((whitelistedPath) => path.startsWith(whitelistedPath))) {
    return;
  }

  // Only rate limit API routes
  if (!path.startsWith('/api/')) {
    return;
  }

  // Get client IP
  const clientIp = getClientIp(event);
  if (!clientIp) {
    return;
  }

  const now = Date.now();

  // Check if IP is in the store
  if (!ipStore[clientIp]) {
    // First request from this IP
    ipStore[clientIp] = {
      count: 1,
      resetTime: now + TIME_WINDOW,
    };
    return;
  }

  const record = ipStore[clientIp];

  // If the reset time has passed, reset the counter
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + TIME_WINDOW;
    return;
  }

  // Increment request count
  record.count++;

  // If the request count exceeds the limit, block the request
  if (record.count > MAX_REQUESTS) {
    // Set a new reset time for the block duration
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

    // Stop further processing
    return false;
  }
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
