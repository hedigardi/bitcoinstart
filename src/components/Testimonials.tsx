import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, MessageSquareQuote } from "lucide-react";

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
const REVIEW_PREVIEW_LENGTH = 180;

function stars(rating: number): string {
  const safe = Math.max(0, Math.min(5, Math.round(rating)));
  return "★".repeat(safe) + "☆".repeat(5 - safe);
}

function formatRating(rating: number): string {
  const safe = Math.max(0, Math.min(5, rating));
  return Number.isInteger(safe) ? `${safe}` : safe.toFixed(1);
}

function maskReviewerName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "";
  }

  const firstName = parts[0];
  const lastName = parts.length > 1 ? parts[parts.length - 1] : "";
  const lastInitial = lastName ? `${lastName.charAt(0).toUpperCase()}.` : "";

  return lastInitial ? `${firstName} ${lastInitial}` : firstName;
}

function getReviewExcerpt(text: string): {
  excerpt: string;
  isTruncated: boolean;
} {
  const normalized = text.trim();
  const previewLength = REVIEW_PREVIEW_LENGTH;

  if (normalized.length <= previewLength) {
    return { excerpt: normalized, isTruncated: false };
  }

  const excerpt = normalized
    .slice(0, previewLength)
    .replace(/\s+\S*$/, "")
    .trimEnd();

  return {
    excerpt: excerpt || normalized.slice(0, previewLength).trimEnd(),
    isTruncated: true,
  };
}

export default function Testimonials() {
  const { t, i18n } = useTranslation("testimonials");
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedReviewIndex, setExpandedReviewIndex] = useState<number | null>(
    null,
  );

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
          .filter(
            (item) =>
              item?.author_name &&
              item?.text &&
              Number.isFinite(item?.rating) &&
              item.rating > 4,
          )
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

  useEffect(() => {
    setExpandedReviewIndex(null);
  }, [activeIndex, i18n.language]);

  const hasManyReviews = reviews.length > 1;

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const renderReviewCard = (
    review: GoogleReview,
    index: number,
    isActive: boolean,
  ) => {
    const isExpanded = expandedReviewIndex === index;
    const { excerpt, isTruncated } = getReviewExcerpt(review.text);

    return (
      <article
        key={`${review.author_name}-${review.time ?? index}`}
        className={`relative mx-auto w-full max-w-4xl overflow-hidden rounded-[2.5rem] border p-7 shadow-sm transition-all duration-500 sm:p-10 ${
          isActive
            ? "border-orange-100/80 bg-white/92 shadow-[0_36px_110px_-70px_rgba(234,88,12,0.45)] ring-1 ring-orange-100/70 dark:border-orange-900/40 dark:bg-slate-950/92 dark:shadow-[0_36px_110px_-70px_rgba(124,45,18,0.55)] dark:ring-orange-900/30"
            : "border-slate-200/80 bg-white/80 opacity-60 scale-[0.98] shadow-[0_18px_45px_-40px_rgba(15,23,42,0.35)] dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-[0_18px_45px_-40px_rgba(2,6,23,0.65)]"
        }`}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/80 to-transparent" />
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-100/50 blur-3xl dark:bg-orange-950/20" />
        <div className="absolute right-6 top-6 text-orange-200/80 dark:text-orange-900/40">
          <MessageSquareQuote size={72} aria-hidden="true" />
        </div>

        <div className="relative flex flex-col gap-8 sm:gap-10">
          <div className="pr-12">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-700/70 dark:text-orange-700/70">
              {t("tag")}
            </p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
              {maskReviewerName(review.author_name)}
            </h3>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <p
                className="text-sm leading-6 text-orange-700 dark:text-orange-700"
                aria-label={t("ratingAria", { rating: review.rating })}
              >
                {stars(review.rating)}
              </p>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-white/90 px-3 py-1 text-sm font-semibold text-orange-700 ring-1 ring-orange-100/80 backdrop-blur dark:border-orange-900/40 dark:bg-orange-950/30 dark:text-orange-700 dark:ring-orange-900/40">
                {formatRating(review.rating)} / 5
              </span>
            </div>
          </div>

          <blockquote className="border-l-2 border-orange-200 pl-4 sm:pl-6 dark:border-orange-900/50">
            <p className="max-w-3xl text-xl leading-9 text-slate-700 dark:text-slate-300 sm:text-2xl sm:leading-10">
              <span className="mr-1 text-2xl text-orange-700 dark:text-orange-700">
                “
              </span>
              {isExpanded || !isTruncated ? review.text : excerpt}
              {!isExpanded && isTruncated ? (
                <span className="ml-1 text-2xl text-orange-700 dark:text-orange-700">
                  …
                </span>
              ) : null}
              <span className="ml-1 text-2xl text-orange-700 dark:text-orange-700">
                ”
              </span>
            </p>

            {isTruncated ? (
              <button
                type="button"
                onClick={() =>
                  setExpandedReviewIndex(isExpanded ? null : index)
                }
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-700 transition hover:text-orange-800 dark:text-orange-700 dark:hover:text-orange-600"
              >
                <span>({isExpanded ? t("readLess") : t("readAll")})</span>
                <span aria-hidden="true" className="text-orange-300">
                  {isExpanded ? "—" : "..."}
                </span>
              </button>
            ) : null}
          </blockquote>
        </div>
      </article>
    );
  };

  return (
    <section
      id="testimonials"
      className="border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-orange-50/20 py-24 dark:border-slate-800 dark:from-slate-900/30 dark:via-slate-900 dark:to-orange-950/10"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 inline-flex rounded-full border border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 text-sm font-medium text-slate-900 dark:text-orange-700">
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
          <div className="mt-14">
            <div className="relative mx-auto max-w-5xl rounded-[2.75rem] border border-slate-200/70 bg-white/70 p-4 shadow-[0_35px_120px_-80px_rgba(15,23,42,0.45)] ring-1 ring-slate-100/80 backdrop-blur-xl transition-all hover:shadow-[0_38px_130px_-84px_rgba(234,88,12,0.42)] hover:ring-orange-200/70 dark:border-slate-800/70 dark:bg-slate-950/60 dark:ring-slate-800/80 dark:hover:shadow-[0_38px_130px_-84px_rgba(124,45,18,0.58)] dark:hover:ring-orange-900/40 sm:p-6 lg:p-8">
              <div className="relative overflow-hidden rounded-[2.25rem] bg-transparent">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-transparent to-white/0 dark:from-orange-950/15 dark:to-transparent" />
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-orange-300 via-orange-400 to-orange-200 dark:from-orange-800 dark:via-orange-700 dark:to-orange-900" />
                <div className="relative p-2 sm:p-4 lg:p-6">
                  {renderReviewCard(reviews[activeIndex], activeIndex, true)}
                </div>
              </div>
            </div>

            {hasManyReviews ? (
              <div className="mt-5 flex items-center justify-center gap-2 px-2 sm:px-4 lg:px-6">
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label={t("carousel.prev")}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:text-orange-700 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/85 dark:text-slate-200 dark:hover:border-orange-900/40 dark:hover:text-orange-700"
                >
                  <ChevronLeft size={20} strokeWidth={2.2} aria-hidden="true" />
                </button>

                <div className="mx-1 flex items-center justify-center gap-2">
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

                <button
                  type="button"
                  onClick={goNext}
                  aria-label={t("carousel.next")}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:text-orange-700 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/85 dark:text-slate-200 dark:hover:border-orange-900/40 dark:hover:text-orange-700"
                >
                  <ChevronRight
                    size={20}
                    strokeWidth={2.2}
                    aria-hidden="true"
                  />
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        {!loading && reviews.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 text-sm leading-7 text-slate-600 dark:text-slate-400">
            {error ? t("error") : t("empty")}
          </div>
        ) : null}

        <div className="mt-8 flex justify-center">
          <a
            href={businessProfileUrl || "#contact"}
            target={businessProfileUrl ? "_blank" : undefined}
            rel={businessProfileUrl ? "noopener noreferrer" : undefined}
            className="rounded-xl bg-orange-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-200/60 dark:shadow-none transition hover:bg-orange-800 active:scale-95"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
