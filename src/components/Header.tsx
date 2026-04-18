import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <motion.a
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          href="#hero"
          className="min-w-0"
        >
          <img
            src="/logo.png"
            alt="BitcoinStart Nordics Logo"
            className="h-28 w-auto dark:brightness-110"
            referrerPolicy="no-referrer"
          />
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
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            href="#booking"
            className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-100 dark:shadow-none transition hover:bg-orange-600 active:scale-95"
          >
            Book a Session
          </motion.a>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <a
            href="#booking"
            className="rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-sm"
          >
            Book
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-slate-600 dark:text-slate-400 hover:text-orange-600 transition-colors"
            aria-label="Toggle Menu"
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
