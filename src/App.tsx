/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import FAQ from "./components/FAQ";
import Booking from "./components/Booking";
import FreeGuide from "./components/FreeGuide";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";

export default function App() {
  const { t } = useTranslation("data");
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 scroll-smooth selection:bg-orange-100 dark:selection:bg-orange-950 selection:text-orange-900 dark:selection:text-orange-100">
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero />

        {/* Quick Help Summary Section */}
        <section className="bg-white dark:bg-slate-950 py-16 border-b border-slate-100 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl"
              >
                {t("quickHelpTitle")}
              </motion.h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                {t("quickHelpDescription")}
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
              {[
                t("whatWeHelpWith.0"),
                t("whatWeHelpWith.1"),
                t("whatWeHelpWith.2"),
                t("whatWeHelpWith.3"),
                t("whatWeHelpWith.4"),
                t("whatWeHelpWith.5"),
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 rounded-2xl bg-slate-50 dark:bg-slate-900 p-4 ring-1 ring-slate-100 dark:ring-slate-800 transition hover:bg-white dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-slate-900/50 active:scale-[0.98]"
                >
                  <div className="h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Services />
        <About />
        <FreeGuide />
        <FAQ />
        <Booking />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
