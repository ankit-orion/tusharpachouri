const stats = [
  { value: "300+", label: "Problems Solved",   sub: "LeetCode / Competitive" },
  { value: "100+", label: "Bugs Resolved",     sub: "Across dev/test cycles" },
  { value: "5+",   label: "Projects Shipped",  sub: "Production ready" },
  { value: "25%",  label: "QA Loop Reduction", sub: "At TCS team" },
];

export default function Stats() {
  return (
    <section className="py-16 px-6 border-y border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-950">
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-gray-600 dark:text-zinc-300 text-xs font-semibold mt-2">{s.label}</p>
              <p className="text-gray-400 dark:text-zinc-600 text-[10px] mt-1">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
