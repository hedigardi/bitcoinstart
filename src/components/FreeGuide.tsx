import { motion } from "motion/react";

export default function FreeGuide() {
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
              Free Guide
            </div>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
              5 Beginner Mistakes to Avoid in Bitcoin
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
              Curious about Bitcoin but not sure where to start? Download our
              short and practical guide for beginners who want a clearer and
              safer introduction.
            </p>
            <ul className="mt-8 space-y-4 text-slate-700 dark:text-slate-400">
              {[
                "Avoiding common beginner mistakes",
                "Separating Bitcoin from noise and hype",
                "Understanding safer first steps",
                "Building confidence before taking action",
              ].map((item) => (
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
              Download the free guide
            </h3>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              Get your copy of the PDF guide instantly.
            </p>
            <div className="mt-8">
              <a
                href="/bitcoin-beginner-guide.pdf"
                download="5-Beginner-Mistakes-to-Avoid-in-Bitcoin.pdf"
                className="w-full rounded-2xl bg-orange-600 px-5 py-4 text-sm font-bold text-white transition hover:bg-orange-700 shadow-lg shadow-orange-900/10 dark:shadow-none active:scale-[0.98] inline-block text-center"
              >
                Download Guide
              </a>
            </div>
            <p className="mt-4 text-center text-xs text-slate-400 dark:text-slate-500">
              By signing up, you agree to our privacy policy.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
