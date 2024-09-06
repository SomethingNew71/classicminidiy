export default defineNuxtRouteMiddleware((to: any, from: any) => {
  if (to.path.includes('technical/colors')) {
    return navigateTo('/archive/colors');
  }
  if (to.path.includes('technical/manuals')) {
    return navigateTo('/archive/manuals');
  }
  if (to.path.includes('technical/wheels')) {
    return navigateTo('/archive/wheels');
  }
  if (to.path.includes('technical/electrical')) {
    return navigateTo('/archive/electrical');
  }
  if (to.path.includes('registry') && !to.path.includes('archive')) {
    return navigateTo('/archive/registry');
  }
});
