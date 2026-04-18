import { motion } from "motion/react";

export default function Hero() {
  return (
    <section id="hero" className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden transition-colors duration-300">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex rounded-full border border-orange-200 dark:border-orange-900/50 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 text-sm font-medium text-orange-700 dark:text-orange-400">
            Based in Norway. Serving clients across the Nordics.
          </div>
          <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-7xl">
            Bitcoin made simple for beginners and small businesses across the Nordics
          </h1>
          <p className="mt-6 max-w-2xl text-base sm:text-lg leading-7 sm:leading-8 text-slate-600 dark:text-slate-400">
            We help people understand Bitcoin in a simple, practical, and safer way. No hype. No noise. Just clear guidance, better understanding, and practical onboarding.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#booking"
              className="rounded-2xl bg-orange-500 px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-orange-200 dark:shadow-none transition hover:bg-orange-600 active:scale-95"
            >
              Book an Intro Session
            </a>
            <a
              href="#about"
              className="rounded-2xl border border-slate-300 dark:border-slate-700 px-6 py-3.5 text-sm font-medium text-slate-900 dark:text-white transition hover:bg-slate-50 dark:hover:bg-slate-900 active:scale-95"
            >
              Learn More
            </a>
          </div>
          <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Beginner-friendly in English and Swedish
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-8 shadow-sm">
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { label: "Focus", value: "Clear Bitcoin education" },
                { label: "Approach", value: "Practical and no-hype" },
                { label: "Sessions", value: "Online across the Nordics" },
                { label: "Languages", value: "English and Swedish" }
              ].map((item, i) => (
                <div key={i} className="rounded-2xl bg-white dark:bg-slate-950 p-5 shadow-sm ring-1 ring-slate-100 dark:ring-slate-800 transition hover:shadow-md">
                  <div className="text-sm font-medium text-slate-500 dark:text-slate-500">{item.label}</div>
                  <div className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 -z-10 h-64 w-64 rounded-full bg-orange-100 dark:bg-orange-900/20 blur-3xl opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}
