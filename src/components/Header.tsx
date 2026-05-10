import { useState } from "react";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import euFlag from "flag-icons/flags/4x3/eu.svg";
import noFlag from "flag-icons/flags/4x3/no.svg";
import seFlag from "flag-icons/flags/4x3/se.svg";
import dkFlag from "flag-icons/flags/4x3/dk.svg";

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { t, i18n } = useTranslation("common");
  const normalizedLanguage = i18n.language?.split("-")[0] ?? "no";

  const navLinks = [
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.faq"), href: "#faq" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const languageOptions = [
    { value: "en", label: "English", flagSrc: euFlag },
    { value: "no", label: "Norsk", flagSrc: noFlag },
    { value: "sv", label: "Svenska", flagSrc: seFlag },
    { value: "da", label: "Dansk", flagSrc: dkFlag },
  ];
  const selectedLanguage =
    languageOptions.find((option) => option.value === normalizedLanguage) ??
    languageOptions[1];

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setIsLangOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a
          href="#hero"
          className="min-w-0"
          aria-label="BitcoinStart Nordics - Back to home"
        >
          <picture>
            <source
              srcSet="/logo-optimized-160.webp 160w, /logo-optimized-240.webp 240w, /logo-optimized.webp 420w"
              sizes="(max-width: 768px) 122px, 160px"
              type="image/webp"
            />
            <img
              src="/logo.png"
              alt="BitcoinStart Nordics Logo"
              width={160}
              height={105}
              className="h-20 w-auto dark:brightness-110"
              referrerPolicy="no-referrer"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-slate-600 dark:text-slate-400 transition hover:text-orange-700 dark:hover:text-orange-400"
            >
              {item.name}
            </a>
          ))}

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

          <button
            onClick={toggleTheme}
            aria-expanded="false"
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-orange-700 dark:hover:text-orange-400 transition-all border border-slate-200 dark:border-slate-800"
            aria-label={t("aria.toggleTheme")}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div className="relative">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isLangOpen}
              aria-label="Select language"
              onClick={() => setIsLangOpen((open) => !open)}
              className="flex h-10 w-36 items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm text-slate-700 transition hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              <span className="flex items-center gap-2">
                <img
                  src={selectedLanguage.flagSrc}
                  alt=""
                  className="h-4 w-6 rounded-sm object-cover"
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                />
                {selectedLanguage.label}
              </span>
              <ChevronDown size={16} className="text-slate-500" />
            </button>
            {isLangOpen && (
              <ul
                role="listbox"
                className="absolute right-0 z-50 mt-2 w-36 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-lg dark:border-slate-700 dark:bg-slate-900"
              >
                {languageOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      onClick={() => changeLanguage(option.value)}
                      className={`flex h-10 w-full items-center gap-2 px-3 text-left text-sm transition ${
                        normalizedLanguage === option.value
                          ? "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-200"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                      }`}
                    >
                      <img
                        src={option.flagSrc}
                        alt=""
                        className="h-4 w-6 rounded-sm object-cover"
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                      />
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a
            href="#services"
            className="rounded-xl bg-orange-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-200/60 dark:shadow-none transition hover:bg-orange-800 active:scale-95"
          >
            {t("nav.bookSession")}
          </a>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
            aria-label={t("aria.toggleTheme")}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <a
            href="#services"
            className="rounded-lg bg-orange-700 px-3 py-2 text-sm font-bold text-white shadow-sm hover:bg-orange-800 transition-colors"
          >
            {t("nav.book")}
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
            aria-label={t("aria.toggleMenu")}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-semibold text-slate-700 dark:text-slate-300 hover:text-orange-700 dark:hover:text-orange-400 transition-colors py-2"
              >
                {item.name}
              </a>
            ))}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-2">
              <p className="mb-3 text-sm font-semibold text-slate-600 dark:text-slate-400">
                Language
              </p>
              <div className="grid grid-cols-2 gap-2">
                {languageOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      changeLanguage(option.value);
                      setIsOpen(false);
                    }}
                    className={`flex h-10 items-center gap-2 rounded-lg border px-3 text-sm ${
                      normalizedLanguage === option.value
                        ? "border-slate-300 bg-slate-100 text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                        : "border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                    }`}
                    aria-label={`Switch language to ${option.label}`}
                  >
                    <img
                      src={option.flagSrc}
                      alt=""
                      className="h-4 w-6 rounded-sm object-cover"
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
