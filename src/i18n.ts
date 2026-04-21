import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

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
    lng: "no",
    fallbackLng: "no",
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
    },
  });

export default i18n;
