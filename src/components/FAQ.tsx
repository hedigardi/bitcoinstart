import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t } = useTranslation("faq");
  const faqs = t("faqs", { returnObjects: true }) as Array<{
    q: string;
    a: string;
  }>;

  return (
    <section id="faq" className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {t("title")}
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-400">
          {t("description")}
        </p>
      </div>
      <div className="space-y-4">
        {faqs.map((item, i) => (
          <motion.details
            key={item.q}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition-all hover:border-orange-200 dark:hover:border-orange-900 open:ring-1 open:ring-orange-100 dark:open:ring-orange-900/30 bg-white dark:bg-slate-950"
          >
            <summary className="cursor-pointer list-none text-left text-lg font-semibold text-slate-950 dark:text-white marker:hidden">
              <div className="flex items-center justify-between gap-4">
                <span>{item.q}</span>
                <span className="text-2xl text-slate-300 dark:text-slate-700 transition-transform group-open:rotate-45">
                  +
                </span>
              </div>
            </summary>
            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400 border-t border-slate-50 dark:border-slate-900 pt-4">
              {item.a}
            </p>
          </motion.details>
        ))}
      </div>
    </section>
  );
}
