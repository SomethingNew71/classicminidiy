import { sessions } from '../api/auth/login.post';

export async function requireAdminAuth(event: any) {
  const sessionToken = getCookie(event, 'admin-session');

  if (!sessionToken || !sessions.has(sessionToken)) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Admin authentication required',
    });
  }

  const sessionData = sessions.get(sessionToken);

  if (!sessionData?.isAdmin) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Admin access required',
    });
  }

  return sessionData;
}

export async function isAdminAuthenticated(event: any): Promise<boolean> {
  try {
    await requireAdminAuth(event);
    return true;
  } catch {
    return false;
  }
}
