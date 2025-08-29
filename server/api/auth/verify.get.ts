import { sessions } from './login.post';

export default defineEventHandler(async (event) => {
  try {
    const sessionToken = getCookie(event, 'admin-session');

    if (!sessionToken) {
      throw createError({
        statusCode: 401,
        statusMessage: 'No session token',
      });
    }

    if (!sessions.has(sessionToken)) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid session',
      });
    }

    const sessionData = sessions.get(sessionToken);

    if (!sessionData?.isAdmin) {
      throw createError({
        statusCode: 403,
        statusMessage: 'Not admin',
      });
    }

    return {
      authenticated: true,
      user: {
        username: sessionData.username,
        isAdmin: sessionData.isAdmin,
        loginTime: sessionData.loginTime,
      },
    };
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication failed',
    });
  }
});
