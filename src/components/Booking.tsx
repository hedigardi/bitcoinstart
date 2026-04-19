import { motion } from "motion/react";
import { useEffect } from "react";

export default function Booking() {
  useEffect(() => {
    // Load Tally embed script
    const script = document.createElement("script");
    script.src = "https://tally.so/widgets/embed.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector(
        'script[src="https://tally.so/widgets/embed.js"]',
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);
  <section
    id="booking"
    className="border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300"
  >
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Book a Session
          </h2>
          <div className="mt-6 space-y-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            <p>
              Whether you are completely new to Bitcoin or already exploring it
              and want more clarity, BitcoinStart Nordics offers practical
              sessions designed to help you move forward with more confidence.
            </p>
            <p>
              We focus on simple explanations, calmer guidance, and safer
              onboarding for beginners and small businesses across the Nordics.
            </p>
            <p className="font-medium text-slate-900 dark:text-orange-400 border-l-2 border-orange-500 pl-4 py-1 bg-orange-50/50 dark:bg-orange-900/10 rounded-r-xl">
              Tell us a little about what you want help with, and we will make
              sure the session fits your needs.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-white dark:bg-slate-950 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800"
        >
          {/* Tally Form Embed */}
          <iframe
            data-tally-src="https://tally.so/r/xXN9EG?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="600"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="BitcoinStart Nordics Booking Form"
            className="rounded-2xl"
          ></iframe>
          <script async src="https://tally.so/widgets/embed.js"></script>
        </motion.div>
      </div>
    </div>
  </section>;
}
