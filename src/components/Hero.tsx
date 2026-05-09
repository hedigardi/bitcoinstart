import { useTranslation } from "react-i18next";
import ImagePlaceholder from "./ImagePlaceholder";

export default function Hero() {
  const { t } = useTranslation("hero");

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
          <div className="mb-4 inline-flex rounded-full border border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 text-sm font-medium text-orange-700 dark:text-orange-400">
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
              className="rounded-2xl bg-orange-700 px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-orange-200/60 dark:shadow-none transition hover:bg-orange-800 active:scale-95"
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
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t("subtext")}
          </p>
        </div>

        <div className="relative space-y-5">
          <ImagePlaceholder
            className="aspect-[4/3]"
            title="Nordic beginner guidance scene"
            hint="Use a calm, bright photo of a person getting 1:1 guidance at a desk with a laptop and phone wallet app visible."
            src="/nordic-beginner-guidance-scene.png"
            alt="1:1 Bitcoin guidance session for Nordic beginners"
          />
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
