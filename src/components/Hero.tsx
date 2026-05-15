import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation("hero");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const info = [
    { label: t("info.focus.label"), value: t("info.focus.value") },
    { label: t("info.approach.label"), value: t("info.approach.value") },
    { label: t("info.sessions.label"), value: t("info.sessions.value") },
    { label: t("info.languages.label"), value: t("info.languages.value") },
  ];

  return (
    <section
      id="hero"
      className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
        <div>
          <div className="mb-4 inline-flex rounded-full border border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 text-sm font-medium text-slate-900 dark:text-orange-700">
            {t("tag")}
          </div>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg sm:leading-8">
            {t("description")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#services"
              className="inline-flex items-center justify-center rounded-xl bg-orange-700 px-5 py-2.5 text-sm font-bold leading-none text-white shadow-lg shadow-orange-200/60 dark:shadow-none transition hover:bg-orange-800 active:scale-95"
            >
              {t("cta")}
            </a>
            <a
              href="#services"
              className="rounded-2xl border border-slate-300 dark:border-slate-700 px-6 py-3.5 text-sm font-medium text-slate-900 dark:text-white transition hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-95"
            >
              {t("learnMore")}
            </a>
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-400">
            {t("subtext")}
          </p>
        </div>

        <div className="relative space-y-5">
          {/* Welcome video */}
          <div
            className="relative overflow-hidden rounded-3xl shadow-xl ring-1 ring-slate-200 dark:ring-slate-700 aspect-[4/3]"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <video
              ref={videoRef}
              src="/assets/hero-video.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls={hovered}
              onClick={hovered ? undefined : togglePlay}
              onContextMenu={(e) => e.preventDefault()}
              className="h-full w-full object-cover cursor-pointer"
            />
            {/* Mute / unmute button — top-right, hidden when controls are visible */}

            <button
              onClick={toggleMute}
              aria-label={muted ? t("video.unmuteLabel") : t("video.muteLabel")}
              className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-black/70 active:scale-95"
            >
              {muted ? (
                <>
                  {/* Speaker with X */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-1.72 1.72-1.72-1.72Z" />
                  </svg>
                  <span>{t("video.muteLabel")}</span>
                </>
              ) : (
                <>
                  {/* Speaker with waves */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                    <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                  </svg>
                  <span>{t("video.unmuteLabel")}</span>
                </>
              )}
            </button>
          </div>
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-2">
              {info.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white dark:bg-slate-950 p-5 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800 transition hover:shadow-md"
                >
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    {item.label}
                  </div>
                  <div className="mt-2 text-base font-semibold text-slate-900 dark:text-white sm:text-lg">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 -z-10 h-64 w-64 rounded-full bg-orange-100 dark:bg-orange-900/20 blur-3xl opacity-50" />
        </div>
      </div>
    </section>
  );
}
