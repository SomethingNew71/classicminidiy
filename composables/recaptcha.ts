export const useRecaptchaToken = async () => {
  const { $useRecaptcha } = useNuxtApp();
  const token = await $useRecaptcha('login');
  return token;
};
