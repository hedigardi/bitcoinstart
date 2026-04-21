import { ArrowUp, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation("common");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openModal = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent("");
    setModalTitle("");
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-24">
          <div className="max-w-xl">
            <a href="#hero" className="inline-block">
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
                        href={`#${key}`}
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
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
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
                  >
                    {t("footer.links.emailSupport")}
                  </a>
                </li>
                <li>
                  <button
                    onClick={() =>
                      openModal(
                        t("footer.links.privacy"),
                        t("footer.privacyContent"),
                      )
                    }
                    className="cursor-pointer text-sm text-slate-600 dark:text-slate-400 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
                  >
                    {t("footer.links.privacy")}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      openModal(
                        t("footer.links.terms"),
                        t("footer.termsContent"),
                      )
                    }
                    className="cursor-pointer text-sm text-slate-600 dark:text-slate-400 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
                  >
                    {t("footer.links.terms")}
                  </button>
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
              className="cursor-pointer text-slate-500 dark:text-slate-400 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-slate-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                {modalTitle}
              </h2>
              <button
                onClick={closeModal}
                className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 prose dark:prose-invert max-w-none">
              <pre className="whitespace-pre-line text-sm leading-6 text-slate-700 dark:text-slate-300">
                {modalContent}
              </pre>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
