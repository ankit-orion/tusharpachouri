const categories = [
  { label: "Languages",    items: ["JavaScript", "TypeScript", "C++", "Python", "Java", "HTML/CSS"] },
  { label: "Frameworks",   items: ["Node.js", "NestJS", "Next.js", "Express.js", "React", "Spring Boot"] },
  { label: "Databases",    items: ["MongoDB", "PostgreSQL", "MySQL", "Oracle"] },
  { label: "Tools & Cloud",items: ["Git", "AWS", "Vercel", "Jenkins", "Postman", "Docker"] },
];

export default function TechStack() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-zinc-900/30">
      <div className="w-full">
        <div className="text-center mb-10">
          <p className="text-gray-400 dark:text-zinc-600 text-[10px] font-bold tracking-widest uppercase mb-3">Tools I Use</p>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">TECH STACK</h2>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div key={cat.label} className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5">
              <h3 className="text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-zinc-600 mb-3 pb-2.5 border-b border-gray-200 dark:border-zinc-800">
                {cat.label}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.items.map((item) => (
                  <span key={item} className="text-[10px] bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-full px-2.5 py-1 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-zinc-500 transition-colors cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
