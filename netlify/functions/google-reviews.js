const CACHE_TTL_MS = 10 * 60 * 1000;
const ALLOWED_LANGS = new Set(["en", "sv", "no", "da"]);

const cacheByLang = new Map();

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=300, s-maxage=600",
    },
    body: JSON.stringify(body),
  };
}

function normalizeReviews(reviews) {
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

exports.handler = async (event) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  const requestedLang = (
    event.queryStringParameters?.lang || "en"
  ).toLowerCase();
  const languageCode = ALLOWED_LANGS.has(requestedLang) ? requestedLang : "en";

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

    const data = await response.json();

    if (!response.ok) {
      return jsonResponse(502, {
        error:
          data?.error?.message || data?.error_message || "Google API error",
      });
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
