import { motion } from "motion/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getCalApi } from "@calcom/embed-react";
import { Clock } from "lucide-react";

const CAL_ORIGIN = "https://www.cal.eu";

const SESSIONS = [
  { calLink: "bitcoinstart/60min", namespace: "intro-session" },
  { calLink: "bitcoinstart/90min", namespace: "wallet-session" },
] as const;

export default function Booking() {
  const { t: ts } = useTranslation("services");
  const services = ts("services", { returnObjects: true }) as Array<{
    title: string;
    description: string[];
    duration: string;
    price: string;
    cta: string;
  }>;

  useEffect(() => {
    (async () => {
      for (const session of SESSIONS) {
        const cal = await getCalApi({
          namespace: session.namespace,
          embedJsUrl: `${CAL_ORIGIN}/embed/embed.js`,
        });
        cal("ui", {
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      }
    })();
  }, []);

  return (
    <section
      id="booking"
      className="border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300"
    >
      <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <div className="flex flex-col gap-5">
          {services.map((service, i) => {
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-3xl bg-white dark:bg-slate-950 p-7 shadow-xl shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800 flex flex-col gap-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-bold text-slate-950 dark:text-white leading-snug">
                    {service.title}
                  </h3>
                  <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 px-3 py-1 text-xs font-semibold text-orange-700 dark:text-orange-400 ring-1 ring-orange-200 dark:ring-orange-800">
                    <Clock size={11} />
                    {service.duration}
                  </span>
                </div>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {service.description[0]}
                </p>
                <div className="flex items-center justify-between gap-4 pt-1">
                  <span className="text-base font-bold text-slate-900 dark:text-white">
                    {service.price}
                  </span>
                  <button
                    data-cal-namespace={SESSIONS[i].namespace}
                    data-cal-link={SESSIONS[i].calLink}
                    data-cal-origin={CAL_ORIGIN}
                    data-cal-config='{"layout":"month_view"}'
                    className="cursor-pointer rounded-2xl bg-orange-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-200/60 dark:shadow-none transition-all hover:bg-orange-800 active:scale-[0.98]"
                  >
                    {service.cta}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
