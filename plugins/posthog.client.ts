import posthog from "posthog-js";

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig();
  const posthogClient = posthog.init(runtimeConfig.public.posthogPublicKey, {
    api_host: runtimeConfig.public.posthogHost,
    person_profiles: "always",
    capture_pageview: false,
    capture_pageleave: false,
    loaded: (posthog) => {
      if (import.meta.env.DEV) {
        posthog.debug();
      }
    },
  });

  const router = useRouter();
  router.afterEach((to, from) => {
    nextTick(() => {
      if (from.fullPath !== to.fullPath) {
        posthog.capture("$pageleave", {
          $current_url: to.fullPath,
        });
      }

      posthog.capture("$pageview", {
        current_url: to.fullPath,
      });
    });
  });

  return {
    provide: {
      posthog: posthogClient,
    },
  };
});
