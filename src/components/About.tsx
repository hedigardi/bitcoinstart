import { motion } from "motion/react";
import { Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next";
import ImagePlaceholder from "./ImagePlaceholder";

export default function About() {
  const { t } = useTranslation("about");
  const valuePoints = t("valuePoints", { returnObjects: true }) as Array<{
    title: string;
    text: string;
  }>;
  const audience = t("audience", { returnObjects: true }) as Array<{
    title: string;
    text: string;
  }>;
  const whyParagraphs = t("whyParagraphs", { returnObjects: true }) as string[];
  const foundationParagraphs = t("foundationParagraphs", {
    returnObjects: true,
  }) as string[];

  return (
    <div id="about">
      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {t("whyTitle")}
            </h2>
            <ImagePlaceholder
              className="mt-6 aspect-[4/3]"
              title="Trust and guidance portrait"
              hint="Use a professional but warm portrait-style image that communicates safety, clarity, and personal coaching."
              src="/trust-and-guidance-portrait.png"
              alt="Trust and guidance portrait"
            />
            <div className="mt-6 max-w-xl space-y-4 text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg sm:leading-8">
              {whyParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-6">
              <a
                href="https://www.linkedin.com/in/hedigardi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-700 dark:hover:text-orange-200 transition-colors"
                aria-label="Connect with Hedi on LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>

          <div className="grid gap-5">
            {valuePoints.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm transition hover:border-orange-200 dark:hover:border-orange-900"
              >
                <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {t("audienceTitle")}
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
              {t("audienceDescription")}
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {audience.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-6 shadow-sm ring-1 ring-slate-100/50 dark:ring-white/5"
              >
                <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 shadow-sm lg:p-12 relative overflow-hidden bg-white dark:bg-slate-950"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 dark:bg-orange-900/20 rounded-full blur-2xl -mr-16 -mt-16" />
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {t("foundationTitle")}
          </h2>
          <ImagePlaceholder
            className="mt-6 aspect-[16/9]"
            title="Founder journey visual"
            hint="Use a symbolic image showing long-term commitment, such as a map, notebook timeline, or focused work setup."
            src="/founder-journey-visual.png"
            alt="Founder journey visual"
          />
          <div className="mt-6 space-y-4 text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg sm:leading-8">
            {foundationParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
