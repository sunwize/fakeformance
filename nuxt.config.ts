// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/style/main.css"],
  modules: ["@nuxt/ui", "@nuxt/fonts", "@nuxt/eslint", "@nuxt/image"],

  runtimeConfig: {
    public: {
      posthogPublicKey: "phc_pholfBHDGasMeJbDfrMuS0dLgduruDApKoOq8GbvM1P",
      posthogHost: "https://us.i.posthog.com",
    },
  },
});
