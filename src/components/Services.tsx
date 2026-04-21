import { motion } from "motion/react";
import {
  BadgeCheck,
  BookOpenText,
  Briefcase,
  CheckSquare,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation("services");
  const serviceCornerIcons = [BookOpenText, ShieldCheck, Briefcase];
  const services = t("services", { returnObjects: true }) as Array<{
    title: string;
    subheadline: string;
    description: string[];
    bestFor: string[];
    whatWeCover: string[];
    whatYouLeaveWith: string[];
    includes: string[];
    format: string;
    duration: string;
    price: string;
    cta: string;
  }>;
  const howToChoosePoints = t("howToChoose.points", {
    returnObjects: true,
  }) as string[];

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

        <div className="mt-12 space-y-8">
          {services.map((service, index) => {
            const CornerIcon = serviceCornerIcons[index] ?? BookOpenText;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative rounded-3xl bg-white dark:bg-slate-950 p-8 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800 transition-all hover:shadow-xl dark:hover:shadow-orange-900/20 hover:ring-orange-200 dark:hover:ring-orange-900/50"
              >
                <div className="pointer-events-none absolute right-8 top-8 hidden sm:block">
                  <div className="relative flex h-20 w-36 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50 text-orange-700 ring-1 ring-orange-200 dark:from-orange-950/40 dark:to-slate-900 dark:text-orange-300 dark:ring-orange-900/50">
                    <CornerIcon size={34} aria-hidden="true" />
                  </div>
                  <div className="absolute -bottom-6 -left-6 flex h-16 w-16 items-center justify-center rounded-full bg-white text-orange-700 ring-4 ring-white dark:bg-slate-900 dark:text-orange-300 dark:ring-slate-950">
                    <CornerIcon size={24} aria-hidden="true" />
                  </div>
                </div>

                <div className="sm:pr-44">
                  <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-base font-semibold leading-7 text-orange-700 dark:text-orange-400">
                    {service.subheadline}
                  </p>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {service.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-800 dark:bg-orange-950/40 dark:text-orange-300">
                      <Users size={14} aria-hidden="true" />
                      {t("bestFor")}
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      {service.bestFor.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-700" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-800 dark:bg-orange-950/40 dark:text-orange-300">
                      <BookOpenText size={14} aria-hidden="true" />
                      {t("whatWeCover")}
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      {service.whatWeCover.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-700" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-800 dark:bg-orange-950/40 dark:text-orange-300">
                      <BadgeCheck size={14} aria-hidden="true" />
                      {t("whatYouLeaveWith")}
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      {service.whatYouLeaveWith.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-700" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-800 dark:bg-orange-950/40 dark:text-orange-300">
                      <CheckSquare size={14} aria-hidden="true" />
                      {t("includes")}
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      {service.includes.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-700" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

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
                  className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 dark:bg-white px-5 py-3 text-sm font-medium text-white dark:text-slate-950 transition hover:bg-orange-800 dark:hover:bg-orange-700 dark:hover:text-white"
                >
                  {service.cta}
                </a>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 rounded-3xl bg-white dark:bg-slate-950 p-8 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800">
          <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">
            {t("howToChoose.title")}
          </h3>
          <ul className="mt-5 space-y-3 text-slate-700 dark:text-slate-300">
            {howToChoosePoints.map((point) => (
              <li key={point} className="flex gap-3">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-orange-700" />
                <span className="text-sm leading-7">{point}</span>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="mt-6 inline-flex items-center justify-center rounded-2xl bg-orange-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-800"
          >
            {t("howToChoose.cta")}
          </a>
        </div>
      </div>
    </section>
  );
}
