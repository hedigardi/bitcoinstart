import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

type ConsentLevel = "essential" | "all";

type ConsentState = {
  level: ConsentLevel;
  analytics: boolean;
  timestamp: string;
};

const STORAGE_KEY = "bsn_cookie_consent_v1";

function readStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as ConsentState;
    if (!parsed || (parsed.level !== "essential" && parsed.level !== "all")) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function writeConsent(level: ConsentLevel, analytics: boolean) {
  if (typeof window === "undefined") {
    return;
  }

  const payload: ConsentState = {
    level,
    analytics,
    timestamp: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

export default function CookieConsent() {
  const { t } = useTranslation("common");
  const [isVisible, setIsVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [allowAnalytics, setAllowAnalytics] = useState(false);

  useEffect(() => {
    const existingConsent = readStoredConsent();
    if (!existingConsent) {
      setIsVisible(true);
      return;
    }

    setAllowAnalytics(existingConsent.analytics);
    setIsVisible(false);
  }, []);

  const privacyLink = useMemo(() => "/privacy-policy", []);

  const acceptEssentialOnly = () => {
    writeConsent("essential", false);
    setAllowAnalytics(false);
    setIsVisible(false);
  };

  const acceptAll = () => {
    writeConsent("all", true);
    setAllowAnalytics(true);
    setIsVisible(false);
  };

  const saveSettings = () => {
    writeConsent(allowAnalytics ? "all" : "essential", allowAnalytics);
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl ring-1 ring-slate-100 transition-colors dark:border-slate-700 dark:bg-slate-900 dark:ring-slate-800 sm:p-6">
        <div className="flex flex-col gap-4 sm:gap-5">
          <div>
            <h3 className="text-base font-semibold text-slate-950 dark:text-white sm:text-lg">
              {t("cookie.title")}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {t("cookie.description")}
            </p>
            <a
              href={privacyLink}
              className="mt-2 inline-block text-sm font-semibold text-orange-700 transition-colors hover:text-orange-800 dark:text-orange-700 dark:hover:text-orange-700"
            >
              {t("cookie.privacyLink")}
            </a>
          </div>

          {isSettingsOpen && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-950/60">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t("cookie.essentialTitle")}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                    {t("cookie.essentialDescription")}
                  </p>
                </div>
                <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                  {t("cookie.alwaysOn")}
                </span>
              </div>

              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t("cookie.analyticsTitle")}
                  </div>
                  <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                    {t("cookie.analyticsDescription")}
                  </p>
                </div>
                <label className="inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-orange-700"
                    checked={allowAnalytics}
                    onChange={(event) =>
                      setAllowAnalytics(event.target.checked)
                    }
                  />
                </label>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={() => setIsSettingsOpen((value) => !value)}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {isSettingsOpen
                ? t("cookie.hideSettings")
                : t("cookie.showSettings")}
            </button>
            <button
              type="button"
              onClick={acceptEssentialOnly}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {t("cookie.essentialOnly")}
            </button>
            <button
              type="button"
              onClick={isSettingsOpen ? saveSettings : acceptAll}
              className="rounded-xl bg-orange-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-800"
            >
              {isSettingsOpen
                ? t("cookie.saveSettings")
                : t("cookie.acceptAll")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
