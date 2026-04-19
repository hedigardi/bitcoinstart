import { motion } from "motion/react";
import { useForm, ValidationError } from "@formspree/react";

export default function Booking() {
  const [state, handleSubmit] = useForm("xrerklov");

  if (state.succeeded) {
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
                Thank you!
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Your booking request has been sent. We'll get back to you within
                24 hours.
              </p>
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
              Book a Session
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
              <p>
                Whether you are completely new to Bitcoin or already exploring
                it and want more clarity, BitcoinStart Nordics offers practical
                sessions designed to help you move forward with more confidence.
              </p>
              <p>
                We focus on simple explanations, calmer guidance, and safer
                onboarding for beginners and small businesses across the
                Nordics.
              </p>
              <p className="font-medium text-slate-900 dark:text-orange-400 border-l-2 border-orange-500 pl-4 py-1 bg-orange-50/50 dark:bg-orange-900/10 rounded-r-xl">
                Tell us a little about what you want help with, and we will make
                sure the session fits your needs.
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
                    placeholder="Name"
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    required
                  />
                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                    required
                  />
                  <ValidationError
                    prefix="Email"
                    field="email"
                    errors={state.errors}
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div>
                <select
                  name="session"
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-slate-600 dark:text-slate-300 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer"
                  required
                >
                  <option value="">Which session are you interested in?</option>
                  <option value="Bitcoin Intro Session">
                    Bitcoin Intro Session
                  </option>
                  <option value="Wallet & Security Setup">
                    Wallet & Security Setup
                  </option>
                  <option value="Bitcoin for Small Business">
                    Bitcoin for Small Business
                  </option>
                </select>
                <ValidationError
                  prefix="Session"
                  field="session"
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <select
                  name="experience"
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-slate-600 dark:text-slate-300 outline-none transition-all focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer"
                  required
                >
                  <option value="">Your current experience level?</option>
                  <option value="Complete beginner">Complete beginner</option>
                  <option value="I have started a little">
                    I have started a little
                  </option>
                  <option value="I already own some Bitcoin">
                    I already own some Bitcoin
                  </option>
                  <option value="Business-related inquiry">
                    Business-related inquiry
                  </option>
                </select>
                <ValidationError
                  prefix="Experience"
                  field="experience"
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  name="message"
                  placeholder="What would you like help with most?"
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 resize-none"
                  required
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <button
                type="submit"
                disabled={state.submitting}
                className="w-full rounded-2xl bg-orange-500 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-orange-200 dark:shadow-none transition-all hover:bg-orange-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.submitting ? "Sending..." : "Send Booking Request"}
              </button>
            </form>
            <p className="mt-6 text-center text-xs text-slate-400">
              We'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
