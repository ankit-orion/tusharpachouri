"use client";

import { useState } from "react";
import { ArrowRight, Send } from "lucide-react";

const topics = ["Full Stack App", "Website Design", "API Development", "Cloud & DevOps", "App Design", "Consulting"];

export default function Contact() {
  const [selected, setSelected] = useState<string[]>([]);
  const [form, setForm]         = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent]         = useState(false);

  const toggle = (t: string) =>
    setSelected((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const inputClass = "w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-zinc-600 focus:outline-none focus:border-gray-400 dark:focus:border-zinc-500 transition-colors";

  return (
    <section id="contact" className="py-20 px-6 bg-gray-50 dark:bg-zinc-950">
      <div className="w-full">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-3">
            Say <span className="text-gray-400 dark:text-zinc-400">Hi</span> and tell me about{" "}
            <ArrowRight className="inline-block" size={32} />
            <br />your idea
          </h2>
          <p className="text-gray-400 dark:text-zinc-600 text-xs">Have a nice project? Reach out and let&apos;s chat.</p>
        </div>

        <div className="max-w-xl mx-auto">
          {sent ? (
            <div className="text-center py-14 border border-gray-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900">
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</p>
              <p className="text-gray-500 dark:text-zinc-500 text-xs">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 dark:text-zinc-500 mb-1.5 uppercase tracking-wider">Name *</label>
                  <input required type="text" placeholder="Hello..." value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-400 dark:text-zinc-500 mb-1.5 uppercase tracking-wider">Email *</label>
                  <input required type="email" placeholder="Where can I reply..." value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 dark:text-zinc-500 mb-1.5 uppercase tracking-wider">Company name</label>
                <input type="text" placeholder="Your company or website" value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputClass} />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 dark:text-zinc-500 mb-2 uppercase tracking-wider">What&apos;s in mind?</label>
                <div className="flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <button key={t} type="button" onClick={() => toggle(t)}
                      className={`text-[10px] px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${
                        selected.includes(t)
                          ? "bg-gray-900 dark:bg-white text-white dark:text-black border-gray-900 dark:border-white font-bold"
                          : "border-gray-200 dark:border-zinc-700 text-gray-500 dark:text-zinc-500 hover:border-gray-400 dark:hover:border-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300"
                      }`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-gray-400 dark:text-zinc-500 mb-1.5 uppercase tracking-wider">Message</label>
                <textarea rows={4} placeholder="Tell me about your project..." value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`} />
              </div>

              <button type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black font-bold py-3.5 rounded-full hover:bg-gray-700 dark:hover:bg-zinc-200 transition-colors text-xs cursor-pointer">
                Submit your message <Send size={13} />
              </button>

              <p className="text-center text-[10px] text-gray-400 dark:text-zinc-700">I&apos;ll get back to you within 24 hours</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
