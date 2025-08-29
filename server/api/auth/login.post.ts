// Simple session storage
const sessions = new Map<string, any>();

function generateSessionToken(): string {
  return Buffer.from(crypto.randomUUID() + Date.now()).toString('base64');
}

function setSession(token: string, data: any) {
  sessions.set(token, data);
  // Auto-cleanup after 24 hours
  setTimeout(() => sessions.delete(token), 24 * 60 * 60 * 1000);
}

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  // Get admin credentials from environment variables
  const config = useRuntimeConfig();
  const adminUsername = config.ADMIN_USERNAME;
  const adminPassword = config.ADMIN_PASSWORD;

  // Validate credentials
  if (username === adminUsername && password === adminPassword) {
    // Generate session token
    const sessionToken = generateSessionToken();

    // Store session data
    setSession(sessionToken, {
      username,
      isAdmin: true,
      loginTime: new Date().toISOString(),
    });

    // Use setCookie with explicit options
    setCookie(event, 'admin-session', sessionToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
      domain: undefined, // Let browser set domain automatically
    });

    return {
      success: true,
      message: 'Login successful',
    };
  }

  throw createError({
    statusCode: 401,
    statusMessage: 'Invalid credentials',
  });
});

export { sessions };
