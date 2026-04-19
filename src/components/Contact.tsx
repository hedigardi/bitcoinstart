import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation("contact");
  const description = t("description", { returnObjects: true }) as string[];
  const details = t("details", { returnObjects: true }) as any;
  const tags = t("tags", { returnObjects: true }) as string[];

  return (
    <section
      id="contact"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-8 transition-colors duration-300"
    >
      <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {t("title")}
          </h2>
          <div className="mt-6 space-y-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            {description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            {tags.map((tag) => (
              <div
                key={tag}
                className="rounded-2xl bg-orange-50 dark:bg-orange-900/20 px-4 py-2 text-sm font-medium text-orange-700 dark:text-orange-400 ring-1 ring-orange-200 dark:ring-orange-900/50"
              >
                {tag}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 lg:p-12 shadow-sm bg-white dark:bg-slate-950 ring-1 ring-slate-100 dark:ring-white/5"
        >
          <div className="space-y-8">
            <div className="group cursor-default">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-orange-500 transition-colors">
                {details.email.label}
              </div>
              <a
                href={`mailto:${details.email.value}`}
                className="mt-2 inline-block text-xl font-semibold text-slate-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
              >
                {details.email.value}
              </a>
            </div>

            <div className="group cursor-default">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-orange-500 transition-colors">
                {details.location.label}
              </div>
              <div className="mt-2 space-y-1">
                <div className="text-lg font-semibold text-slate-900 dark:text-white">
                  {details.location.primary}
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  {details.location.secondary}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
            <a
              href={`mailto:${details.email.value}`}
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 dark:bg-white px-6 py-3.5 text-sm font-bold text-white dark:text-slate-950 transition hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white shadow-lg shadow-slate-950/10 active:scale-95"
            >
              {t("button")}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
