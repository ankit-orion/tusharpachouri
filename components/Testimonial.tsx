export default function Testimonial() {
  return (
    <section className="py-20 px-6 bg-white dark:bg-zinc-900/30">
      <div className="w-full">
        <p className="text-gray-400 dark:text-zinc-600 text-[10px] font-bold tracking-widest uppercase text-center mb-8">
          Client Feedback
        </p>

        <div className="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-10 md:p-12 relative overflow-hidden">
          <span className="text-8xl text-gray-200 dark:text-zinc-800 font-serif leading-none absolute top-4 left-7 select-none pointer-events-none">
            &ldquo;
          </span>

          <blockquote className="relative text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white leading-snug mb-8">
            I just wanted to share a quick note and let you know that you guys do a really{" "}
            <span className="text-gray-400 dark:text-zinc-400">good job.</span>
          </blockquote>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-zinc-700">
              R
            </div>
            <div>
              <p className="text-gray-900 dark:text-white text-xs font-semibold">Rohan Singh</p>
              <p className="text-gray-400 dark:text-zinc-600 text-[10px]">Senior Manager, FinTech</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
