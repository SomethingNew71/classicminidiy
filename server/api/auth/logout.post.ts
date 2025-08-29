import { sessions } from './login.post';

export default defineEventHandler(async (event) => {
  const sessionToken = getCookie(event, 'admin-session');

  if (sessionToken) {
    // Remove session from storage
    sessions.delete(sessionToken);

    // Clear cookie
    deleteCookie(event, 'admin-session', {
      path: '/',
    });
  }

  return {
    success: true,
    message: 'Logged out successfully',
  };
});
