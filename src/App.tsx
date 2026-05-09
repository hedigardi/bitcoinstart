/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, lazy, Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SeoHead from "./components/SeoHead";
import LegalPage from "./components/LegalPage";
import CookieConsent from "./components/CookieConsent";
import ImagePlaceholder from "./components/ImagePlaceholder";
import { useTranslation } from "react-i18next";

const Services = lazy(() => import("./components/Services"));
const About = lazy(() => import("./components/About"));
const FAQ = lazy(() => import("./components/FAQ"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

export default function App() {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";

  const { t } = useTranslation("data");
  const painPoints = t("painPoints", { returnObjects: true }) as string[];
  const benefits = t("benefits", {
    returnObjects: true,
  }) as Array<{ title: string; text: string }>;
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
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

  if (pathname === "/privacy-policy") {
    return <LegalPage type="privacy" />;
  }
  if (pathname === "/terms-of-service") {
    return <LegalPage type="terms" />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 scroll-smooth selection:bg-orange-100 dark:selection:bg-orange-950 selection:text-orange-900 dark:selection:text-orange-100">
      <SeoHead />
      <Header theme={theme} toggleTheme={toggleTheme} />

      <main>
        <Hero />

        {/* Problem + Solution Section */}
        <section className="bg-white dark:bg-slate-950 py-16 border-b border-slate-100 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
                  {t("quickHelpTitle")}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
                  {t("quickHelpDescription")}
                </p>
                <ImagePlaceholder
                  className="mt-7 aspect-[16/9]"
                  title="Common beginner Bitcoin pain points"
                  hint="Use an editorial style image with sticky notes, notebook, and phone screen to represent confusion turning into structure."
                  src="/common-beginner-bitcoin-pain-points.png"
                  alt="Common beginner Bitcoin pain points"
                />
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {painPoints.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl bg-slate-50 dark:bg-slate-900 p-4 ring-1 ring-slate-100 dark:ring-slate-800"
                    >
                      <div className="mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-orange-700" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-8 text-base font-medium text-slate-900 dark:text-white">
                  {t("problemClosing")}
                </p>
              </div>

              <div className="rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-8 shadow-sm">
                <ImagePlaceholder
                  className="mb-6 aspect-[3/2]"
                  title="Clear learning path visual"
                  hint="Use a simple roadmap style image or desk setup showing step-by-step progress from basics to secure setup."
                  src="/clear-learning-path-visual.png"
                  alt="Clear learning path for Bitcoin beginners"
                />
                <h3 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  {t("solutionTitle")}
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
                  {t("solutionDescription")}
                </p>
                <div className="mt-8 space-y-4">
                  {benefits.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl bg-white dark:bg-slate-950 p-5 ring-1 ring-slate-100 dark:ring-slate-800"
                    >
                      <div className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Suspense fallback={<div className="h-20 w-full" aria-hidden="true" />}>
          <Services />
          <About />
          <FAQ />
          <Contact />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-16 w-full" aria-hidden="true" />}>
        <Footer />
      </Suspense>

      <CookieConsent />
    </div>
  );
}
