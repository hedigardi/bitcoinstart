import { motion } from "motion/react";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Booking() {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { t } = useTranslation("booking");
  const form = t("form", { returnObjects: true }) as any;
  const description = t("description", { returnObjects: true }) as string[];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      formData.append("access_key", "dba3651f-6e2b-4722-b58c-a87b028b7491");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSucceeded(true);
        event.currentTarget.reset();
      } else {
        setSubmitError(data.message || "Submission failed. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (succeeded) {
    return (
      <section
        id="booking"
        className="border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="rounded-3xl bg-white dark:bg-slate-950 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800">
              <div className="text-green-600 dark:text-green-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-950 dark:text-white mb-2">
                {t("success.title")}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {t("success.message")}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSucceeded(false);
                  setSubmitError("");
                }}
                className="mt-6 inline-flex items-center justify-center rounded-2xl border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:border-orange-700 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
              >
                {t("success.backButton", "Back to form")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="booking"
      className="border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {t("title")}
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
              {description.slice(0, 2).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <p className="font-medium text-slate-900 dark:text-orange-400 border-l-2 border-orange-700 pl-4 py-1 bg-orange-50/50 dark:bg-orange-900/10 rounded-r-xl">
                {t("description.2")}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-white dark:bg-slate-950 p-8 shadow-xl shadow-slate-200/50 dark:shadow-none ring-1 ring-slate-200 dark:ring-slate-800"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder={form.placeholders.name}
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder={form.placeholders.email}
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="session-select" className="sr-only">
                  {form.selects.session.default}
                </label>
                <select
                  id="session-select"
                  name="session"
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-slate-600 dark:text-slate-300 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700 cursor-pointer"
                  required
                >
                  <option value="">{form.selects.session.default}</option>
                  {form.selects.session.options.map((option: string) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="experience-select" className="sr-only">
                  {form.selects.experience.default}
                </label>
                <select
                  id="experience-select"
                  name="experience"
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-slate-600 dark:text-slate-300 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700 cursor-pointer"
                  required
                >
                  <option value="">{form.selects.experience.default}</option>
                  {form.selects.experience.options.map((option: string) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <textarea
                  rows={4}
                  name="message"
                  placeholder={form.placeholders.message}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-orange-700/20 focus:border-orange-700 resize-none"
                  required
                />
              </div>
              {submitError && (
                <p className="text-red-500 text-sm">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full cursor-pointer rounded-2xl bg-orange-700 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-orange-200/60 dark:shadow-none transition-all hover:bg-orange-800 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? form.buttons.submitting : form.buttons.submit}
              </button>
            </form>
            <p className="mt-6 text-center text-xs text-slate-400">
              {form.footer}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
