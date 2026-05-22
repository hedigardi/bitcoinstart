import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const allowedLangs = new Set(["en", "sv", "no", "da"]);

  const getLanguageCode = (reqUrl?: string) => {
    const parsedUrl = new URL(reqUrl || "", "http://localhost");
    const lang = (parsedUrl.searchParams.get("lang") || "en").toLowerCase();
    return allowedLangs.has(lang) ? lang : "en";
  };

  const normalizeReviews = (reviews: unknown[]) => {
    if (!Array.isArray(reviews)) {
      return [];
    }

    return reviews.map((review) => {
      const item = review as {
        authorAttribution?: { displayName?: string };
        author_name?: string;
        rating?: number;
        text?: { text?: string } | string;
        originalText?: { text?: string };
        relativePublishTimeDescription?: string;
        relative_time_description?: string;
        publishTime?: string;
        time?: number;
      };

      const normalizedText =
        typeof item.text === "string"
          ? item.text
          : item.text?.text || item.originalText?.text || "";

      return {
        author_name:
          item.authorAttribution?.displayName ||
          item.author_name ||
          "Google User",
        rating: Number(item.rating ?? 0),
        text: normalizedText,
        relative_time_description:
          item.relativePublishTimeDescription || item.relative_time_description,
        time: item.publishTime
          ? Math.floor(new Date(item.publishTime).getTime() / 1000)
          : item.time,
      };
    });
  };

  const googleReviewsProxy = {
    name: "google-reviews-proxy",
    configureServer(server: {
      middlewares: {
        use: (
          route: string,
          handler: (
            req: { method?: string },
            res: {
              statusCode: number;
              setHeader: (name: string, value: string) => void;
              end: (body: string) => void;
            },
            next: () => void,
          ) => void | Promise<void>,
        ) => void;
      };
    }) {
      const handler = async (
        req: { method?: string },
        res: {
          statusCode: number;
          setHeader: (name: string, value: string) => void;
          end: (body: string) => void;
        },
        next: () => void,
      ) => {
        if (req.method !== "GET") {
          next();
          return;
        }

        const apiKey = env.GOOGLE_PLACES_API_KEY;
        const placeId = env.GOOGLE_PLACE_ID;

        if (!apiKey || !placeId) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error:
                "Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID in environment.",
            }),
          );
          return;
        }

        try {
          const languageCode = getLanguageCode((req as { url?: string }).url);
          const params = new URLSearchParams({
            languageCode,
          });

          const response = await fetch(
            `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?${params.toString()}`,
            {
              headers: {
                "X-Goog-Api-Key": apiKey,
                "X-Goog-FieldMask": "reviews",
              },
            },
          );
          const data = (await response.json()) as {
            reviews?: unknown[];
            error?: { message?: string };
            error_message?: string;
          };

          if (!response.ok) {
            res.statusCode = 502;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error:
                  data.error?.message ||
                  data.error_message ||
                  "Google API error",
              }),
            );
            return;
          }

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              reviews: normalizeReviews(data.reviews ?? []),
            }),
          );
        } catch {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Failed to fetch Google reviews" }));
        }
      };

      server.middlewares.use("/api/google-reviews", handler);
    },
    configurePreviewServer(server: {
      middlewares: {
        use: (
          route: string,
          handler: (
            req: { method?: string },
            res: {
              statusCode: number;
              setHeader: (name: string, value: string) => void;
              end: (body: string) => void;
            },
            next: () => void,
          ) => void | Promise<void>,
        ) => void;
      };
    }) {
      const handler = async (
        req: { method?: string },
        res: {
          statusCode: number;
          setHeader: (name: string, value: string) => void;
          end: (body: string) => void;
        },
        next: () => void,
      ) => {
        if (req.method !== "GET") {
          next();
          return;
        }

        const apiKey = env.GOOGLE_PLACES_API_KEY;
        const placeId = env.GOOGLE_PLACE_ID;

        if (!apiKey || !placeId) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error:
                "Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID in environment.",
            }),
          );
          return;
        }

        try {
          const languageCode = getLanguageCode((req as { url?: string }).url);
          const params = new URLSearchParams({
            languageCode,
          });

          const response = await fetch(
            `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?${params.toString()}`,
            {
              headers: {
                "X-Goog-Api-Key": apiKey,
                "X-Goog-FieldMask": "reviews",
              },
            },
          );
          const data = (await response.json()) as {
            reviews?: unknown[];
            error?: { message?: string };
            error_message?: string;
          };

          if (!response.ok) {
            res.statusCode = 502;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error:
                  data.error?.message ||
                  data.error_message ||
                  "Google API error",
              }),
            );
            return;
          }

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              reviews: normalizeReviews(data.reviews ?? []),
            }),
          );
        } catch {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Failed to fetch Google reviews" }));
        }
      };

      server.middlewares.use("/api/google-reviews", handler);
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
      sourcemap: true,
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
            "lazy-ui-vendor": ["motion", "@formspree/react"],
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== "true",
    },
  };
});
