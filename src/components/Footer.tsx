import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation("common");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-24">
          <div className="max-w-xl">
            <a
              href="#hero"
              className="inline-block"
              aria-label="BitcoinStart Nordics - Back to home"
            >
              <picture>
                <source srcSet="/logo-optimized.webp" type="image/webp" />
                <img
                  src="/logo.png"
                  alt="BitcoinStart Nordics Logo"
                  width={707}
                  height={464}
                  className="h-12 w-auto mb-4 dark:brightness-110"
                  referrerPolicy="no-referrer"
                  decoding="async"
                  loading="lazy"
                />
              </picture>
            </a>
            <div className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400 uppercase tracking-widest">
              {t("footer.tagline")}
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-600 dark:text-slate-300">
              {t("footer.description")}
            </p>
            <div className="mt-8 space-y-4">
              <p className="text-xs leading-4 text-slate-500 dark:text-slate-400 font-medium border-l-2 border-slate-200 dark:border-slate-800 pl-4 uppercase tracking-tighter">
                {t("footer.disclaimer")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-10 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-300 uppercase tracking-widest">
                {t("footer.quickLinksTitle")}
              </h3>
              <ul className="mt-6 space-y-4">
                {["hero", "services", "about", "faq", "booking", "contact"].map(
                  (key) => (
                    <li key={key}>
                      <a
                        href={`#${key === "booking" ? "services" : key}`}
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-700 dark:hover:text-orange-200 transition-colors"
                      >
                        {t(`footer.links.${key}`)}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-300 uppercase tracking-widest">
                {t("footer.supportTitle")}
              </h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <a
                    href="mailto:contact@bitcoinstart.no"
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-700 dark:hover:text-orange-200 transition-colors"
                  >
                    {t("footer.links.emailSupport")}
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-700 dark:hover:text-orange-200 transition-colors"
                  >
                    {t("footer.links.privacy")}
                  </a>
                </li>
                <li>
                  <a
                    href="/terms-of-service"
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-700 dark:hover:text-orange-200 transition-colors"
                  >
                    {t("footer.links.terms")}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {t("footer.copyright", { year: currentYear })}
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="cursor-pointer text-slate-500 dark:text-slate-400 hover:text-orange-700 dark:hover:text-orange-200 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
