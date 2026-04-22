import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

const COUNTRY_TO_LANG: Record<string, string> = {
  NO: "no",
  SE: "sv",
  DK: "da",
};

const savedLanguage =
  typeof window !== "undefined"
    ? window.localStorage.getItem("i18nextLng")
    : null;

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: [
      "common",
      "hero",
      "services",
      "about",
      "faq",
      "booking",
      "freeguide",
      "contact",
      "data",
    ],
    defaultNS: "common",
    fallbackNS: "common",
    // Use saved language for returning visitors; show English while IP is being detected for new visitors
    lng: savedLanguage || "en",
    supportedLngs: ["no", "en", "sv", "da"],
    nonExplicitSupportedLngs: true,
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },
  });

// For first-time visitors only: detect country via IP and switch to the matching language.
// Returning visitors already have a saved preference and skip this entirely.
if (!savedLanguage && typeof window !== "undefined") {
  fetch("https://ipapi.co/json/")
    .then((res) => res.json())
    .then((data: { country_code?: string }) => {
      const lang = COUNTRY_TO_LANG[data.country_code ?? ""] ?? "en";
      i18n.changeLanguage(lang);
    })
    .catch(() => {
      // Silently fall back to English if the geolocation request fails.
      i18n.changeLanguage("en");
    });
}

export default i18n;
