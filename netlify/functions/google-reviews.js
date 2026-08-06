import {
  errorMessage,
  fetchGoogleReviews,
  getLanguageCode,
  jsonResponse,
  normalizeReviews,
} from "./_shared/google-reviews.js";

const CACHE_TTL_MS = 10 * 60 * 1000;

const cacheByLang = new Map();

export const handler = async (event) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const languageCode = getLanguageCode(event.queryStringParameters?.lang);

  if (!apiKey || !placeId) {
    return jsonResponse(500, {
      error: "Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID in environment.",
    });
  }

  const cached = cacheByLang.get(languageCode);
  if (cached && Date.now() - cached.cachedAt < CACHE_TTL_MS) {
    return jsonResponse(200, cached.payload);
  }

  try {
    const { ok, data } = await fetchGoogleReviews({
      apiKey,
      placeId,
      languageCode,
    });

    if (!ok) {
      return jsonResponse(502, { error: errorMessage(data) });
    }

    const payload = {
      reviews: normalizeReviews(data.reviews),
      source: "netlify-function",
    };

    cacheByLang.set(languageCode, {
      payload,
      cachedAt: Date.now(),
    });

    return jsonResponse(200, payload);
  } catch {
    return jsonResponse(500, { error: "Failed to fetch Google reviews" });
  }
};
