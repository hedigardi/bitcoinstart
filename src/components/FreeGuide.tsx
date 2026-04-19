import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function FreeGuide() {
  const { t, i18n } = useTranslation("freeguide");
  const features = t("features", { returnObjects: true }) as string[];

  const currentLang = (i18n.resolvedLanguage || i18n.language || "no")
    .toLowerCase()
    .split("-")[0];

  const pdfByLanguage: Record<string, string> = {
    en: "bitcoin-beginner-guide_EN.pdf",
    no: "bitcoin-beginner-guide_NO.pdf",
    sv: "bitcoin-beginner-guide_SE.pdf",
    da: "bitcoin-beginner-guide_DK.pdf",
  };

  const selectedPdf = pdfByLanguage[currentLang] || pdfByLanguage.no;

  return (
    <section className="border-y border-slate-200 dark:border-slate-800 bg-orange-50 dark:bg-orange-950/20 relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-0 right-0 -z-10 h-full w-1/3 bg-white/40 dark:bg-orange-900/10 blur-3xl rounded-full translate-x-1/2" />

      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex rounded-full bg-orange-200 dark:bg-orange-900/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-800 dark:text-orange-300">
              {t("badge")}
            </div>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              {t("title")}
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
              {t("description")}
            </p>
            <ul className="mt-8 space-y-4 text-slate-700 dark:text-slate-400">
              {features.map((item) => (
                <li key={item} className="flex gap-4 items-center">
                  <div className="h-6 w-6 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-white dark:bg-slate-950 p-8 shadow-xl shadow-orange-900/5 dark:shadow-none ring-1 ring-orange-100 dark:ring-orange-900/40"
          >
            <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
              {t("download.title")}
            </h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              {t("download.description")}
            </p>
            <div className="mt-8">
              <a
                href={`/${selectedPdf}`}
                download={selectedPdf}
                className="w-full rounded-2xl bg-orange-600 px-5 py-4 text-sm font-bold text-white transition hover:bg-orange-700 shadow-lg shadow-orange-900/10 dark:shadow-none active:scale-[0.98] inline-block text-center"
              >
                {t("download.button")}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
