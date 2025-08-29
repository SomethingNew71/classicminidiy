import { sessions } from './login.post';

export default defineEventHandler(async (event) => {
  try {
    const sessionToken = getCookie(event, 'admin-session');
    const cookieHeader = getHeader(event, 'cookie') || '';
    const allHeaders = getHeaders(event);

    console.log('Verify endpoint - sessionToken:', sessionToken);
    console.log('Verify endpoint - cookie header:', cookieHeader);
    console.log('Verify endpoint - all headers:', allHeaders);
    console.log('Verify endpoint - available sessions:', Array.from(sessions.keys()));

    if (!sessionToken) {
      console.log('No session token found');
      throw createError({
        statusCode: 401,
        statusMessage: 'No session token',
      });
    }

    if (!sessions.has(sessionToken)) {
      console.log('Session token not found in sessions map');
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
    console.log('Verify error:', error);
    throw createError({
      statusCode: 401,
      statusMessage: 'Authentication failed',
    });
  }
});
