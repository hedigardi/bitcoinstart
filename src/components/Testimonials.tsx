import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  time?: number;
}

interface ReviewsResponse {
  reviews?: GoogleReview[];
  result?: {
    reviews?: GoogleReview[];
  };
}

const MAX_REVIEWS = 6;

function stars(rating: number): string {
  const safe = Math.max(0, Math.min(5, Math.round(rating)));
  return "★".repeat(safe) + "☆".repeat(5 - safe);
}

function formatRating(rating: number): string {
  const safe = Math.max(0, Math.min(5, rating));
  return Number.isInteger(safe) ? `${safe}` : safe.toFixed(1);
}

export default function Testimonials() {
  const { t, i18n } = useTranslation("testimonials");
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const businessProfileUrl = import.meta.env
    .VITE_GOOGLE_BUSINESS_PROFILE_URL as string | undefined;

  useEffect(() => {
    let cancelled = false;
    const lang = (i18n.language || "en").split("-")[0];

    setLoading(true);
    setError(false);

    async function fetchReviews() {
      try {
        const response = await fetch(
          `/api/google-reviews?lang=${encodeURIComponent(lang)}`,
        );
        const data = (await response.json()) as ReviewsResponse;

        if (!response.ok) {
          throw new Error("Unable to fetch reviews");
        }

        const payload = Array.isArray(data.reviews)
          ? data.reviews
          : Array.isArray(data.result?.reviews)
            ? data.result.reviews
            : [];

        const normalized = payload
          .filter((item) => item?.author_name && item?.text)
          .sort((a, b) => (b.time ?? 0) - (a.time ?? 0))
          .slice(0, MAX_REVIEWS);

        if (!cancelled) {
          setReviews(normalized);
          setError(false);
        }
      } catch {
        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchReviews();

    return () => {
      cancelled = true;
    };
  }, [i18n.language]);

  useEffect(() => {
    setActiveIndex(0);
  }, [reviews.length, i18n.language]);

  const hasManyReviews = reviews.length > 1;

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section
      id="testimonials"
      className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 py-16"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="inline-flex rounded-full border border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 text-sm font-medium text-slate-900 dark:text-orange-200">
            {t("tag")}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
            {t("description")}
          </p>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm"
              >
                <div className="h-4 w-28 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-4 h-3 w-20 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-5 h-3 w-full animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-2 h-3 w-10/12 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
              </div>
            ))}
          </div>
        ) : null}

        {!loading && reviews.length > 0 ? (
          <div className="mt-10">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {reviews.map((review, index) => (
                  <article
                    key={`${review.author_name}-${review.time ?? index}`}
                    className="w-full shrink-0 p-6 sm:p-8"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                        {review.author_name}
                      </h3>
                      <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
                        {formatRating(review.rating)} / 5
                      </span>
                    </div>

                    <p
                      className="mt-2 text-sm leading-6 text-orange-700 dark:text-orange-300"
                      aria-label={t("ratingAria", { rating: review.rating })}
                    >
                      {stars(review.rating)}
                    </p>

                    <p className="mt-4 text-sm leading-7 text-slate-700 dark:text-slate-300 sm:text-base">
                      "{review.text}"
                    </p>

                    <p className="mt-5 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {review.relative_time_description ??
                        (review.time
                          ? new Date(review.time * 1000).toLocaleDateString(
                              i18n.language,
                            )
                          : t("recently"))}
                    </p>
                  </article>
                ))}
              </div>

              {hasManyReviews ? (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label={t("carousel.prev")}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white backdrop-blur-sm transition hover:bg-black/70"
                  >
                    &lt;
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label={t("carousel.next")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 px-3 py-2 text-white backdrop-blur-sm transition hover:bg-black/70"
                  >
                    &gt;
                  </button>
                </>
              ) : null}
            </div>

            {hasManyReviews ? (
              <div className="mt-4 flex items-center justify-center gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={t("carousel.goTo", { index: index + 1 })}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeIndex
                        ? "w-8 bg-orange-700"
                        : "w-2.5 bg-slate-300 dark:bg-slate-700"
                    }`}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {!loading && reviews.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
            {error ? t("error") : t("empty")}
          </div>
        ) : null}

        <div className="mt-8">
          <a
            href={businessProfileUrl || "#contact"}
            target={businessProfileUrl ? "_blank" : undefined}
            rel={businessProfileUrl ? "noopener noreferrer" : undefined}
            className="inline-flex items-center justify-center rounded-xl bg-orange-700 px-5 py-2.5 text-sm font-bold leading-none text-white shadow-lg shadow-orange-200/60 dark:shadow-none transition hover:bg-orange-800 active:scale-95"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
