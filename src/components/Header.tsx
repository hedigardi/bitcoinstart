import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import usFlag from "flag-icons/flags/4x3/us.svg";
import noFlag from "flag-icons/flags/4x3/no.svg";
import seFlag from "flag-icons/flags/4x3/se.svg";
import dkFlag from "flag-icons/flags/4x3/dk.svg";

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation("common");

  const navLinks = [
    { name: t("nav.services"), href: "#services" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.faq"), href: "#faq" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  const languageOptions = [
    { value: "en", label: "English", flagSrc: usFlag },
    { value: "no", label: "Norsk", flagSrc: noFlag },
    { value: "sv", label: "Svenska", flagSrc: seFlag },
    { value: "da", label: "Dansk", flagSrc: dkFlag },
  ];

  const customOption = (props: any) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        className={`flex items-center px-3 h-10 cursor-pointer text-sm ${
          theme === "dark"
            ? "hover:bg-slate-700 text-slate-300"
            : "hover:bg-slate-100 text-slate-700"
        }`}
        style={{ width: "100%", lineHeight: "1.2" }}
      >
        <img
          src={data.flagSrc}
          alt=""
          className="mr-2 h-4 w-6 rounded-sm object-cover"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
        <span>{data.label}</span>
      </div>
    );
  };

  const customSingleValue = (props: any) => {
    const { data } = props;
    return (
      <div
        className={`flex items-center gap-2 h-full text-sm leading-none ${
          theme === "dark" ? "text-slate-400" : "text-slate-600"
        }`}
        style={{ minHeight: "1rem" }}
      >
        <img
          src={data.flagSrc}
          alt=""
          className="inline-flex h-4 w-6 rounded-sm object-cover"
          loading="lazy"
          decoding="async"
          aria-hidden="true"
          style={{ lineHeight: 1 }}
        />
        <span className="leading-none">{data.label}</span>
      </div>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <motion.a
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          href="#hero"
          className="min-w-0"
        >
          <picture>
            <source srcSet="/logo-optimized.webp" type="image/webp" />
            <img
              src="/logo.png"
              alt="BitcoinStart Nordics Logo"
              width={707}
              height={464}
              className="h-20 w-auto dark:brightness-110"
              referrerPolicy="no-referrer"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((item, i) => (
            <motion.a
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              href={item.href}
              className="text-sm font-semibold text-slate-600 dark:text-slate-400 transition hover:text-orange-600 dark:hover:text-orange-500"
            >
              {item.name}
            </motion.a>
          ))}

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2" />

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-orange-600 transition-all border border-slate-200 dark:border-slate-800"
            aria-label={t("aria.toggleTheme")}
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <Select
            value={languageOptions.find(
              (option) => option.value === i18n.language,
            )}
            onChange={(selectedOption) =>
              selectedOption && i18n.changeLanguage(selectedOption.value)
            }
            options={languageOptions}
            components={{
              Option: customOption,
              SingleValue: customSingleValue,
            }}
            menuPosition="absolute"
            menuPortalTarget={document.body}
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor:
                  theme === "dark" ? "rgb(15 23 42)" : "rgb(248 250 252)", // slate-900 or slate-50
                borderColor:
                  theme === "dark" ? "rgb(51 65 85)" : "rgb(226 232 240)", // slate-700 or slate-200
                borderRadius: "0.75rem",
                minHeight: "2.5rem",
                height: "2.5rem",
                padding: "0",
                boxShadow: "none",
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  borderColor:
                    theme === "dark" ? "rgb(51 65 85)" : "rgb(226 232 240)",
                },
              }),
              valueContainer: (provided) => ({
                ...provided,
                padding: "0 0.75rem",
                height: "100%",
                minHeight: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: theme === "dark" ? "rgb(148 163 184)" : "rgb(71 85 105)", // slate-400 or slate-600
                margin: "0",
                padding: "0",
                lineHeight: "1.2",
                display: "flex",
                alignItems: "center",
                height: "100%",
              }),
              input: (provided) => ({
                ...provided,
                margin: "0",
                padding: "0",
              }),
              placeholder: (provided) => ({
                ...provided,
                margin: "0",
                padding: "0",
                lineHeight: "1.2",
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor:
                  theme === "dark" ? "rgb(15 23 42)" : "rgb(248 250 252)", // slate-900 or slate-50
                borderColor:
                  theme === "dark" ? "rgb(51 65 85)" : "rgb(226 232 240)", // slate-700 or slate-200
                border: `1px solid ${theme === "dark" ? "rgb(51,65,85)" : "rgb(226,232,240)"}`,
                marginTop: "0px !important",
                marginBottom: "0px",
                padding: "0px",
                top: "100%",
                position: "absolute",
                transform: "translateY(0px)",
                boxShadow: "none",
                overflow: "hidden",
              }),
              menuList: (provided) => ({
                ...provided,
                padding: "0px",
                margin: "0px",
                borderRadius: "inherit",
                overflow: "hidden",
                minHeight: "auto",
              }),
              menuPortal: (provided) => ({
                ...provided,
                zIndex: 9999,
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected
                  ? theme === "dark"
                    ? "rgb(51 65 85)"
                    : "rgb(226 232 240)"
                  : "transparent",
                color: theme === "dark" ? "rgb(148 163 184)" : "rgb(71 85 105)", // slate-400 or slate-600
                padding: "0px 0.75rem",
                margin: "0px",
                minHeight: "2.5rem",
                display: "flex",
                alignItems: "center",
                lineHeight: "1.2",
                "&:hover": {
                  backgroundColor:
                    theme === "dark" ? "rgb(30 41 59)" : "rgb(241 245 249)", // slate-800 or slate-100
                },
              }),
            }}
            className="w-32"
            isSearchable={false}
          />

          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            href="#booking"
            className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-100 dark:shadow-none transition hover:bg-orange-600 active:scale-95"
          >
            {t("nav.bookSession")}
          </motion.a>
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
            href="#booking"
            className="rounded-lg bg-orange-600 px-3 py-2 text-sm font-bold text-white shadow-sm hover:bg-orange-700 transition-colors"
          >
            {t("nav.book")}
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-orange-600 transition-colors"
            aria-label={t("aria.toggleMenu")}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-semibold text-slate-700 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-500 transition-colors py-2"
                >
                  {item.name}
                </a>
              ))}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-2">
                <Select
                  value={languageOptions.find(
                    (option) => option.value === i18n.language,
                  )}
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      i18n.changeLanguage(selectedOption.value);
                      setIsOpen(false);
                    }
                  }}
                  options={languageOptions}
                  components={{
                    Option: customOption,
                    SingleValue: customSingleValue,
                  }}
                  menuPosition="absolute"
                  menuPortalTarget={document.body}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      backgroundColor:
                        theme === "dark" ? "rgb(15 23 42)" : "rgb(248 250 252)",
                      borderColor:
                        theme === "dark" ? "rgb(51 65 85)" : "rgb(226 232 240)",
                      borderRadius: "0.75rem",
                      minHeight: "2.5rem",
                      height: "2.5rem",
                      padding: "0",
                      boxShadow: "none",
                      display: "flex",
                      alignItems: "center",
                      "&:hover": {
                        borderColor:
                          theme === "dark"
                            ? "rgb(51 65 85)"
                            : "rgb(226 232 240)",
                      },
                    }),
                    valueContainer: (provided) => ({
                      ...provided,
                      padding: "0 0.75rem",
                      height: "100%",
                      minHeight: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color:
                        theme === "dark"
                          ? "rgb(148 163 184)"
                          : "rgb(71 85 105)",
                      margin: "0",
                      padding: "0",
                      lineHeight: "1.2",
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                    }),
                    input: (provided) => ({
                      ...provided,
                      margin: "0",
                      padding: "0",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      margin: "0",
                      padding: "0",
                      lineHeight: "1.2",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      backgroundColor:
                        theme === "dark" ? "rgb(15 23 42)" : "rgb(248 250 252)",
                      borderColor:
                        theme === "dark" ? "rgb(51 65 85)" : "rgb(226 232 240)",
                      border: `1px solid ${theme === "dark" ? "rgb(51,65,85)" : "rgb(226,232,240)"}`,
                      marginTop: "0px !important",
                      marginBottom: "0px",
                      padding: "0px",
                      top: "100%",
                      position: "absolute",
                      transform: "translateY(0px)",
                      boxShadow: "none",
                      overflow: "hidden",
                    }),
                    menuList: (provided) => ({
                      ...provided,
                      padding: "0px",
                      margin: "0px",
                      borderRadius: "inherit",
                      overflow: "hidden",
                      minHeight: "auto",
                    }),
                    menuPortal: (provided) => ({
                      ...provided,
                      zIndex: 9999,
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isSelected
                        ? theme === "dark"
                          ? "rgb(51 65 85)"
                          : "rgb(226 232 240)"
                        : "transparent",
                      color:
                        theme === "dark"
                          ? "rgb(148 163 184)"
                          : "rgb(71 85 105)",
                      padding: "0px 0.75rem",
                      margin: "0px",
                      minHeight: "2.5rem",
                      display: "flex",
                      alignItems: "center",
                      lineHeight: "1.2",
                      "&:hover": {
                        backgroundColor:
                          theme === "dark"
                            ? "rgb(30 41 59)"
                            : "rgb(241 245 249)",
                      },
                    }),
                  }}
                  isSearchable={false}
                />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
