const experiences = [
  {
    number: "01",
    company: "Tata Consultancy Services (TCS)",
    role: "Product Engineer",
    location: "India",
    duration: "Aug 2024 – Present",
    highlights: [
      "Developed and optimized RESTful APIs within a microservices architecture using Node.js and MongoDB.",
      "Implemented secure JWT & bcrypt.js authentication and authorization across multiple services.",
      "Integrated third-party APIs with robust error handling and logging for system observability.",
      "Optimized state management using React Context and Redux, reducing redundant logic.",
      "Identified and resolved 100+ bugs across dev/test cycles, reducing QA feedback loops by 25%.",
    ],
  },
  {
    number: "02",
    company: "Lovely Professional University",
    role: "B.Tech Computer Science",
    location: "Phagwara, Punjab",
    duration: "Aug 2020 – Jun 2024",
    highlights: [
      "Bachelor of Technology in Computer Science.",
      "Smart India Hackathon 2022 — Team selected for the National Round.",
      "Solved 300+ problems on competitive programming platforms.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 bg-white dark:bg-zinc-900/30">
      <div className="w-full">
        <div className="text-center mb-12">
          <p className="text-gray-400 dark:text-zinc-600 text-[10px] font-bold tracking-widest uppercase mb-3">My Journey</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">EXPERIENCE</h2>
          <p className="text-gray-400 dark:text-zinc-500 text-xs mt-3 max-w-sm mx-auto leading-relaxed">
            From hackathons to production microservices.
          </p>
        </div>

        <div className="space-y-2">
          {experiences.map((exp) => (
            <details key={exp.number} className="group bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none hover:bg-gray-100 dark:hover:bg-zinc-800/40 transition-colors">
                <div className="flex items-center gap-5">
                  <span className="text-gray-300 dark:text-zinc-700 text-xs font-mono">{exp.number}</span>
                  <div>
                    <h3 className="text-gray-900 dark:text-white font-semibold text-sm">{exp.company}</h3>
                    <p className="text-gray-500 dark:text-zinc-500 text-xs mt-0.5">{exp.role} · {exp.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:block text-[10px] text-gray-400 dark:text-zinc-600 border border-gray-200 dark:border-zinc-800 rounded-full px-3 py-1">{exp.duration}</span>
                  <span className="text-gray-400 dark:text-zinc-600 group-open:rotate-45 transition-transform duration-200 text-lg leading-none select-none">+</span>
                </div>
              </summary>
              <div className="px-6 pb-5 pt-3 border-t border-gray-200 dark:border-zinc-800">
                <ul className="space-y-2">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2.5 text-xs text-gray-600 dark:text-zinc-400">
                      <span className="text-gray-400 dark:text-zinc-600 mt-0.5 shrink-0">→</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
