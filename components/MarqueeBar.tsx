const items = [
  "WEB DESIGN", "·", "APP DEVELOPMENT", "·",
  "WEB FLOW", "·", "FULL STACK", "·",
  "API DESIGN", "·", "MICROSERVICES", "·",
  "CLOUD & DEVOPS", "·", "UI/UX", "·",
];

export default function MarqueeBar() {
  return (
    <div className="bg-gray-900 dark:bg-white text-white dark:text-black py-2.5 overflow-hidden border-y border-gray-800 dark:border-zinc-200">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className={`text-[10px] font-bold tracking-widest uppercase px-3 ${item === "·" ? "text-gray-500 dark:text-zinc-400" : ""}`}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
