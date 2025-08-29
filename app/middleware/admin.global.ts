export default defineNuxtRouteMiddleware(async (to) => {
  // Only apply to admin routes
  if (!to.path.startsWith('/admin')) {
    return;
  }

  // Skip middleware on server-side during initial page load
  if (process.server) {
    return;
  }

  // Check authentication
  try {
    await $fetch('/api/auth/verify', {
      credentials: 'include', // Ensure cookies are sent
    });
    // User is authenticated, allow access
    return;
  } catch (error) {
    // User is not authenticated, redirect to login
    return navigateTo('/login', { replace: true });
  }
});
