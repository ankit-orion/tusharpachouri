import { Code2, Globe, Cpu, ArrowRight } from "lucide-react";

const services = [
  {
    icon: <Code2 size={24} />,
    title: "Full-Stack Development",
    description: "End-to-end web applications using React, Next.js, Node.js, and NestJS. From database design to polished UI.",
    tags: ["React", "Next.js", "Node.js"],
  },
  {
    icon: <Globe size={24} />,
    title: "API & Microservices",
    description: "Production-ready RESTful APIs and microservices with JWT auth, error handling, and robust logging.",
    tags: ["REST API", "NestJS", "MongoDB"],
  },
  {
    icon: <Cpu size={24} />,
    title: "Cloud & DevOps",
    description: "CI/CD pipelines, deployment on AWS and Vercel, automated workflows. Ship faster with confidence.",
    tags: ["AWS", "Vercel", "CI/CD"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 px-6 bg-gray-50 dark:bg-zinc-950">
      <div className="w-full">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-gray-400 dark:text-zinc-600 text-[10px] font-bold tracking-widest uppercase mb-3">What I Do</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              WHAT I&apos;M<br />
              <span className="text-gray-300 dark:text-zinc-700">OFFERING</span>
            </h2>
          </div>
          <a href="#contact" className="hidden sm:flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-bold px-5 py-2.5 rounded-full hover:bg-gray-700 dark:hover:bg-zinc-200 transition-colors">
            All Services <ArrowRight size={13} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {services.map((svc, i) => (
            <div key={i} className="card-hover bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 group hover:border-gray-300 dark:hover:border-zinc-600 transition-colors">
              <div className="text-gray-400 dark:text-zinc-600 group-hover:text-gray-900 dark:group-hover:text-white transition-colors mb-4">{svc.icon}</div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{svc.title}</h3>
              <p className="text-gray-500 dark:text-zinc-500 text-xs leading-relaxed mb-4">{svc.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {svc.tags.map((tag) => (
                  <span key={tag} className="text-[10px] border border-gray-200 dark:border-zinc-700 rounded-full px-2.5 py-1 text-gray-500 dark:text-zinc-500">{tag}</span>
                ))}
              </div>
              <div className="mt-5 text-[10px] text-gray-300 dark:text-zinc-700 group-hover:text-gray-600 dark:group-hover:text-zinc-400 transition-colors flex items-center gap-1 cursor-pointer">
                Read More <ArrowRight size={10} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
