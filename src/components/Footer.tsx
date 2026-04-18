import { ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-24">
          <div className="max-w-xl">
            <a href="#hero" className="inline-block">
              <img
                src="/logo.png"
                alt="BitcoinStart Nordics Logo"
                className="h-12 w-auto mb-4 dark:brightness-110"
                referrerPolicy="no-referrer"
              />
            </a>
            <div className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-500 uppercase tracking-widest">
              Simple Bitcoin guidance. Safer first steps.
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-500 dark:text-slate-400">
              BitcoinStart Nordics helps beginners and small businesses
              understand Bitcoin in a simple, practical, and safer way. Our
              mission is to provide clarity in a technical space.
            </p>
            <div className="mt-8 space-y-4">
              <p className="text-[10px] leading-4 text-slate-400 dark:text-slate-600 font-medium border-l-2 border-slate-200 dark:border-slate-800 pl-4 uppercase tracking-tighter">
                Disclaimer: BitcoinStart Nordics provides educational and
                practical guidance only and does not offer financial, tax, or
                investment advice.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-16 gap-y-10 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-300 uppercase tracking-widest">
                Quick Links
              </h3>
              <ul className="mt-6 space-y-4">
                {["Hero", "Services", "About", "FAQ", "Booking", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-300 uppercase tracking-widest">
                Support
              </h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <a
                    href="mailto:contact@bitcoinstart.no"
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                  >
                    Email Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-slate-400 dark:text-slate-600 font-medium">
            © {currentYear} BitcoinStart Nordics. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="text-slate-400 dark:text-slate-600 hover:text-orange-500 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
