import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";

interface LegalPageProps {
  type: "privacy" | "terms";
}

export default function LegalPage({ type }: LegalPageProps) {
  const { t } = useTranslation("common");

  const contentKey =
    type === "privacy" ? "footer.privacyContent" : "footer.termsContent";
  const titleKey =
    type === "privacy" ? "footer.links.privacy" : "footer.links.terms";

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-orange-700 dark:hover:text-orange-200 transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          {t("footer.links.backToHome", "Back to home")}
        </a>

        <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {t(titleKey)}
        </h1>

        <div className="mt-8 prose dark:prose-invert max-w-none">
          <pre className="whitespace-pre-line text-sm leading-7 text-slate-700 dark:text-slate-300 font-sans">
            {t(contentKey)}
          </pre>
        </div>
      </div>
    </div>
  );
}
