import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    tag: "FULL STACK",
    title: "Braj Cricket Academy",
    description: "Full-stack web application for a cricket academy to manage player registrations, schedules, and academy info with role-based access control.",
    tech: ["Next.js", "TypeScript", "NextAuth.js", "Tailwind CSS"],
    github: "https://github.com/TusharPachouri",
  },
  {
    tag: "WEB APP",
    title: "Portfolio Website",
    description: "High-performance portfolio with Next.js and TypeScript, featuring an interactive Three.js 3D experience and full SEO optimization.",
    tech: ["Next.js", "TypeScript", "Three.js", "Tailwind CSS"],
    github: "https://github.com/TusharPachouri",
  },
  {
    tag: "PLATFORM",
    title: "NebulaBlogs",
    description: "Full-stack blogging and video platform with AI-generated content using Gemini AI, JWT authentication, and Cloudinary media streaming.",
    tech: ["React", "Node.js", "MongoDB", "Gemini AI", "Cloudinary"],
    github: "https://github.com/TusharPachouri",
  },
  {
    tag: "BACKEND",
    title: "E-Commerce API",
    description: "Secure backend with buyer/seller role management, product listings, and order processing APIs with robust error handling.",
    tech: ["Node.js", "Express.js", "MongoDB", "JWT"],
    github: "https://github.com/TusharPachouri",
  },
  {
    tag: "BACKEND",
    title: "Restaurant Order Management",
    description: "RESTful APIs for order creation, updates, and deletion using Go and Gin framework, optimised for performance.",
    tech: ["Go", "Gin", "MongoDB"],
    github: "https://github.com/TusharPachouri",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 bg-gray-50 dark:bg-zinc-950">
      <div className="w-full">
        <div className="text-center mb-12">
          <p className="text-gray-400 dark:text-zinc-600 text-[10px] font-bold tracking-widest uppercase mb-3">My Work</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">CASE STUDY</h2>
          <p className="text-gray-500 dark:text-zinc-500 text-xs mt-3 max-w-sm mx-auto">A selection of projects built with real production requirements.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((proj, i) => (
            <div key={i} className="card-hover bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 group hover:border-gray-300 dark:hover:border-zinc-600 transition-colors">
              <span className="inline-block text-[10px] font-bold tracking-widest border border-gray-200 dark:border-zinc-700 rounded-full px-2.5 py-1 text-gray-400 dark:text-zinc-500 mb-3">{proj.tag}</span>
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">{proj.title}</h3>
              <p className="text-gray-500 dark:text-zinc-500 text-xs leading-relaxed mb-4">{proj.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {proj.tech.map((t) => (
                  <span key={t} className="text-[10px] bg-gray-100 dark:bg-zinc-800 rounded px-2 py-0.5 text-gray-500 dark:text-zinc-400 border border-gray-200 dark:border-zinc-700">{t}</span>
                ))}
              </div>
              <a href={proj.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-gray-400 dark:text-zinc-600 hover:text-gray-900 dark:hover:text-white transition-colors">
                See Details <ArrowUpRight size={12} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
