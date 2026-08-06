/**
 * Shared logic for fetching Google Places reviews.
 *
 * Used by the Netlify function (production) and the Vite dev/preview proxy so
 * the request handling, response normalization and language mapping only live
 * in one place.
 */

export const ALLOWED_LANGS = new Set(["en", "sv", "no", "da"]);

export function getLanguageCode(requestedLang) {
  const lang = (requestedLang || "").toLowerCase();
  return ALLOWED_LANGS.has(lang) ? lang : "en";
}

export function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300, s-maxage=600",
    },
    body: JSON.stringify(body),
  };
}

export function normalizeReviews(reviews) {
  if (!Array.isArray(reviews)) {
    return [];
  }

  return reviews.map((review) => ({
    author_name:
      review?.authorAttribution?.displayName ||
      review?.author_name ||
      "Google User",
    rating: Number(review?.rating ?? 0),
    text:
      review?.text?.text || review?.originalText?.text || review?.text || "",
    relative_time_description:
      review?.relativePublishTimeDescription ||
      review?.relative_time_description,
    time: review?.publishTime
      ? Math.floor(new Date(review.publishTime).getTime() / 1000)
      : review?.time,
  }));
}

export function errorMessage(data) {
  return data?.error?.message || data?.error_message || "Google API error";
}

export async function fetchGoogleReviews({ apiKey, placeId, languageCode }) {
  const params = new URLSearchParams({ languageCode });

  const response = await fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?${params.toString()}`,
    {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "reviews",
      },
    },
  );

  const data = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}

/**
 * Express-style middleware handler used to proxy /api/google-reviews in the
 * Vite dev and preview servers.
 */
export function createGoogleReviewsHandler({ apiKey, placeId }) {
  return async function googleReviewsHandler(req, res, next) {
    if (req.method !== "GET") {
      next();
      return;
    }

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
      const url = new URL(req.url || "", "http://localhost");
      const languageCode = getLanguageCode(url.searchParams.get("lang"));
      const { ok, data } = await fetchGoogleReviews({
        apiKey,
        placeId,
        languageCode,
      });

      if (!ok) {
        res.statusCode = 502;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: errorMessage(data) }));
        return;
      }

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({ reviews: normalizeReviews(data.reviews ?? []) }),
      );
    } catch {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Failed to fetch Google reviews" }));
    }
  };
}
