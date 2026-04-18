import { motion } from "motion/react";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24 lg:px-8 transition-colors duration-300">
      <div className="grid gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Get in touch</h2>
          <div className="mt-6 space-y-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            <p>
              If you are unsure which session is right for you, or if you want to ask a question before getting started, feel free to get in touch.
            </p>
            <p>We are happy to help you find the right next step.</p>
          </div>
          
          <div className="mt-8 flex gap-4">
             <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/20 px-4 py-2 text-sm font-medium text-orange-700 dark:text-orange-400 ring-1 ring-orange-200 dark:ring-orange-900/50">
               Support-first mindset
             </div>
             <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-400 ring-1 ring-slate-200 dark:ring-slate-800">
               Nordic region
             </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2.5rem] border border-slate-200 dark:border-slate-800 p-8 lg:p-12 shadow-sm bg-white dark:bg-slate-950 ring-1 ring-slate-100 dark:ring-white/5"
        >
          <div className="space-y-8">
            <div className="group cursor-default">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-orange-500 transition-colors">Email</div>
              <a 
                href="mailto:hello@bitcoinstartnordics.com" 
                className="mt-2 inline-block text-xl font-semibold text-slate-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
              >
                hello@bitcoinstartnordics.com
              </a>
            </div>
            
            <div className="group cursor-default">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 group-hover:text-orange-500 transition-colors">Location & Scope</div>
              <div className="mt-2 space-y-1">
                <div className="text-lg font-semibold text-slate-900 dark:text-white">Based in Norway</div>
                <div className="text-slate-600 dark:text-slate-400">Available online across the Nordics</div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
            <a
              href="mailto:hello@bitcoinstartnordics.com"
              className="inline-flex items-center justify-center rounded-2xl bg-slate-950 dark:bg-white px-6 py-3.5 text-sm font-bold text-white dark:text-slate-950 transition hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white shadow-lg shadow-slate-950/10 active:scale-95"
            >
              Email Us Directly
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
