export const usePosthog = () => {
  const { $posthog } = useNuxtApp();
  return $posthog;
};
