import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SUPPORTED_LANGS = new Set(["en", "no", "sv", "da"]);

function normalizeLanguage(language: string): string {
  const base = language.split("-")[0].toLowerCase();
  return SUPPORTED_LANGS.has(base) ? base : "en";
}

function upsertMetaByName(name: string, content: string) {
  let meta = document.querySelector(
    `meta[name="${name}"]`,
  ) as HTMLMetaElement | null;

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string) {
  let meta = document.querySelector(
    `meta[property="${property}"]`,
  ) as HTMLMetaElement | null;

  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }

  meta.setAttribute("content", content);
}

function updateOrganizationSchema(description: string) {
  const script = document.querySelector(
    'script[type="application/ld+json"]',
  ) as HTMLScriptElement | null;

  if (!script?.textContent) {
    return;
  }

  try {
    const parsed = JSON.parse(script.textContent);

    if (
      parsed &&
      typeof parsed === "object" &&
      parsed["@type"] === "Organization"
    ) {
      parsed.description = description;
      script.textContent = JSON.stringify(parsed);
    }
  } catch {
    // Keep existing schema untouched if it cannot be parsed.
  }
}

export default function SeoHead() {
  const { t, i18n } = useTranslation("seo");
  const activeLanguage = normalizeLanguage(
    i18n.resolvedLanguage || i18n.language || "en",
  );

  useEffect(() => {
    const title = t("title", { lng: activeLanguage });
    const description = t("description", { lng: activeLanguage });
    const keywords = t("keywords", { lng: activeLanguage });
    const ogLocale = t("ogLocale", { lng: activeLanguage });
    const siteName = t("siteName", { lng: activeLanguage });
    const twitterDescription = t("twitterDescription", {
      lng: activeLanguage,
      defaultValue: description,
    });

    document.documentElement.lang = activeLanguage;
    document.title = title;

    upsertMetaByName("description", description);
    upsertMetaByName("keywords", keywords);
    upsertMetaByName("twitter:title", title);
    upsertMetaByName("twitter:description", twitterDescription);

    upsertMetaByProperty("og:title", title);
    upsertMetaByProperty("og:description", description);
    upsertMetaByProperty("og:locale", ogLocale);
    upsertMetaByProperty("og:site_name", siteName);

    updateOrganizationSchema(description);
  }, [activeLanguage, i18n, t]);

  return null;
}
