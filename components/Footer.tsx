import { GitFork, Link2, Mail, Phone, MapPin } from "lucide-react";

const links = [
  { label: "Dribbble",  href: "#" },
  { label: "LinkedIn",  href: "https://linkedin.com/in/tushar-pachouri" },
  { label: "GitHub",    href: "https://github.com/TusharPachouri" },
  { label: "Instagram", href: "#" },
  { label: "Behance",   href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 py-10 px-6">
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="text-center md:text-left">
            <p className="text-sm font-bold text-gray-900 dark:text-white">Tushar Pachouri</p>
            <div className="flex items-center justify-center md:justify-start gap-1 text-gray-400 dark:text-zinc-600 text-[10px] mt-1">
              <MapPin size={10} /> Mathura, Uttar Pradesh
            </div>
          </div>

          <ul className="flex flex-wrap justify-center gap-5">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer"
                  className="text-[10px] text-gray-400 dark:text-zinc-600 hover:text-gray-900 dark:hover:text-white transition-colors tracking-wide">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            {[
              { href: "https://github.com/TusharPachouri",       icon: <GitFork size={14} />, label: "GitHub" },
              { href: "https://linkedin.com/in/tushar-pachouri", icon: <Link2 size={14} />,   label: "LinkedIn" },
              { href: "mailto:tusharpachouri001@gmail.com",       icon: <Mail size={14} />,    label: "Email" },
              { href: "tel:+918218504473",                        icon: <Phone size={14} />,   label: "Phone" },
            ].map((s) => (
              <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-gray-400 dark:text-zinc-600 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-zinc-800 mt-7 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-gray-400 dark:text-zinc-700">
          <p>© {new Date().getFullYear()} Tushar Pachouri. All rights reserved.</p>
          <p>Personal Portfolio 2024</p>
        </div>
      </div>
    </footer>
  );
}
