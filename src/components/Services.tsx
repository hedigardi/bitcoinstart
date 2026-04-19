import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation("services");
  const services = t("services", { returnObjects: true }) as Array<{
    title: string;
    description: string;
    bullets: string[];
    format: string;
    duration: string;
    price: string;
    cta: string;
  }>;

  return (
    <section
      id="services"
      className="border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
            {t("description")}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex h-full flex-col rounded-3xl bg-white dark:bg-slate-950 p-8 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800 transition-all hover:shadow-xl dark:hover:shadow-orange-900/20 hover:ring-orange-200 dark:hover:ring-orange-900/50"
            >
              <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">
                {service.title}
              </h3>
              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                {service.description}
              </p>

              <div className="mt-8 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                {t("whatWeCover")}
              </div>
              <ul className="mt-4 flex-1 space-y-3 text-slate-700 dark:text-slate-300">
                {service.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" />
                    <span className="text-sm">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pt-6 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">
                    {t("format")}
                  </span>
                  <span className="text-slate-900 dark:text-slate-200">
                    {service.format}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">
                    {t("duration")}
                  </span>
                  <span className="text-slate-900 dark:text-slate-200">
                    {service.duration}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-slate-500">
                    {t("price")}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {service.price}
                  </span>
                </div>
              </div>

              <a
                href="#booking"
                className="mt-8 inline-flex items-center justify-center rounded-2xl bg-slate-950 dark:bg-white px-5 py-3 text-sm font-medium text-white dark:text-slate-950 transition hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white"
              >
                {service.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
