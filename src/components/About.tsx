import { motion } from "motion/react";
import { valuePoints, audience } from "../data";

export default function About() {
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
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Why BitcoinStart Nordics</h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
              <p>
                There is a lot of information about Bitcoin, but not much calm, practical guidance for people who are just getting started.
              </p>
              <p>
                BitcoinStart Nordics combines technical understanding with many years of real-world support experience.
              </p>
              <p>
                That matters, because most people do not need more complexity. They need clarity, patience, and someone who can explain things in a way that makes sense.
              </p>
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
                <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="bg-slate-50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Who this is for</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
              BitcoinStart Nordics is designed for people who are interested in Bitcoin but want a calmer, clearer, and more practical starting point.
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
                <h3 className="text-xl font-semibold text-slate-950 dark:text-white">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">{item.text}</p>
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
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">The Foundation</h2>
          <div className="mt-6 space-y-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
            <p>
              BitcoinStart Nordics was created by a founder with a background in blockchain and fullstack studies, combined with 10+ years of experience in support across different industries.
            </p>
            <p>
              That combination is the foundation of the service.
            </p>
            <p>
              Bitcoin can feel overwhelming in the beginning. Many explanations are either too technical or too focused on excitement instead of understanding.
            </p>
            <p>
              We make it simpler, calmer, and more practical for real people and small businesses across the Nordic region.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
