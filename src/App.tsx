/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { useTranslation } from "react-i18next";

const Services = lazy(() => import("./components/Services"));
const About = lazy(() => import("./components/About"));
const FAQ = lazy(() => import("./components/FAQ"));
const Booking = lazy(() => import("./components/Booking"));
const FreeGuide = lazy(() => import("./components/FreeGuide"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

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
              <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                {t("quickHelpTitle")}
              </h2>
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
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-2xl bg-slate-50 dark:bg-slate-900 p-4 ring-1 ring-slate-100 dark:ring-slate-800 transition hover:bg-white dark:hover:bg-slate-800 hover:shadow-md dark:hover:shadow-slate-900/50 active:scale-[0.98]"
                >
                  <div className="h-2 w-2 flex-shrink-0 rounded-full bg-orange-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="h-20 w-full" aria-hidden="true" />}>
          <Services />
          <About />
          <FreeGuide />
          <FAQ />
          <Booking />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-16 w-full" aria-hidden="true" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
