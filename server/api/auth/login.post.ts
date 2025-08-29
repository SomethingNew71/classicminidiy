export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  // Get admin credentials from environment variables
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Validate credentials
  if (username === adminUsername && password === adminPassword) {
    // Set secure session cookie
    const sessionToken = generateSessionToken();

    // Store session (in production, use Redis or database)
    await setSession(sessionToken, {
      username,
      isAdmin: true,
      loginTime: new Date().toISOString(),
    });

    // Set HTTP-only cookie
    setCookie(event, 'admin-session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
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

// Simple session storage (use Redis/database in production)
const sessions = new Map<string, any>();

function generateSessionToken(): string {
  return Buffer.from(crypto.randomUUID() + Date.now()).toString('base64');
}

async function setSession(token: string, data: any) {
  sessions.set(token, data);
  // Auto-cleanup after 24 hours
  setTimeout(() => sessions.delete(token), 24 * 60 * 60 * 1000);
}

export { sessions };
