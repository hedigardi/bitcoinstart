import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import { createGoogleReviewsHandler } from "./netlify/functions/_shared/google-reviews.js";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  // Shared by the dev and preview servers so /api/google-reviews behaves
  // identically in both (logic lives in netlify/functions/_shared).
  const googleReviewsHandler = createGoogleReviewsHandler({
    apiKey: env.GOOGLE_PLACES_API_KEY,
    placeId: env.GOOGLE_PLACE_ID,
  });

  const googleReviewsProxy = {
    name: "google-reviews-proxy",
    configureServer(server: any) {
      server.middlewares.use("/api/google-reviews", googleReviewsHandler);
    },
    configurePreviewServer(server: any) {
      server.middlewares.use("/api/google-reviews", googleReviewsHandler);
    },
  };

  return {
    plugins: [react(), tailwindcss(), googleReviewsProxy],
    define: {
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": [
              "react",
              "react-dom",
              "react-i18next",
              "i18next",
              "i18next-http-backend",
              "i18next-browser-languagedetector",
            ],
            "ui-vendor": ["lucide-react"],
            "lazy-ui-vendor": ["motion"],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== "true",
    },
  };
});
