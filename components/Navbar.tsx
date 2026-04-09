"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { label: "Home",       href: "#home" },
  { label: "Services",   href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle }           = useTheme();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[960px] z-50">
      <nav className={`w-full px-6 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-zinc-950/92 backdrop-blur-md border-b border-gray-200 dark:border-zinc-800"
          : "bg-transparent"
      }`}>
        <a href="#home" className="text-xs font-bold tracking-widest uppercase text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          IT&apos;S ME
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-xs text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors tracking-widest uppercase">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggle}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-zinc-500 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <a
            href="mailto:tusharpachouri001@gmail.com"
            className="flex items-center gap-2 border border-gray-200 dark:border-zinc-700 text-xs text-gray-600 dark:text-zinc-300 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-zinc-500 transition-colors px-4 py-2 rounded-full"
          >
            <span className="glow-dot" />
            Contact Me
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggle} className="w-8 h-8 flex items-center justify-center text-gray-500 dark:text-zinc-400" aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button className="text-gray-500 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 px-6 py-5 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className="text-sm text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
