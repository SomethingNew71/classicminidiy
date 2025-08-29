export default defineNuxtRouteMiddleware(async (to) => {
  // Only apply to admin routes
  if (!to.path.startsWith('/admin')) {
    return;
  }

  // Check authentication
  try {
    await $fetch('/api/auth/verify');
    // User is authenticated, allow access
    return;
  } catch (error) {
    // User is not authenticated, redirect to login
    return navigateTo('/login', { replace: true });
  }
});
