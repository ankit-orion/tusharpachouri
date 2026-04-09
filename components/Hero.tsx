"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Download, ArrowRight, GitFork, Link2, Mail, Phone, Volume2, VolumeX } from "lucide-react";
import MacKeyboard from "@/components/MacKeyboard";
import { useKeystrokeSound } from "@/components/useKeystrokeSound";

// ─── Typing sequence ────────────────────────────────────────────────────────
// Each segment is typed in order. "pause" inserts a brief delay.
interface Segment {
  id: string;
  text: string;
}

const SEGMENTS: Segment[] = [
  { id: "greeting", text: "Hiiii, I'm" },
  { id: "firstName", text: "Tushar" },
  { id: "lastName", text: "Pachouri" },
  { id: "desc", text: "A software engineer from Mathura, Uttar Pradesh. I spend my time building scalable applications, solving complex problems, and understanding how systems work, both in code and beyond it. Passionate about system reliability, performance optimization, and crafting secure workflows that bridge complex engineering and human intuition." },
];

// Map a character to the keyboard key label that should light up
function charToKey(ch: string): string {
  if (ch === " ") return " ";          // spacebar
  if (ch === "\n") return "return";
  if (ch === ",") return ",";
  if (ch === ".") return ".";
  if (ch === "'") return "'";
  if (ch === "\u2019") return "'";     // curly apostrophe
  if (ch === "-") return "—";
  if (ch === "—") return "—";          // em-dash
  if (ch === "@") return "2";          // @ is on Shift+2
  return ch.toUpperCase();
}

const CHAR_DELAY = 38;   // ms between keystrokes
const SEGMENT_PAUSE = 400; // ms pause between segments

export default function Hero() {
  // typed[segId] = how many chars are currently visible
  const [typed, setTyped] = useState<Record<string, number>>({});
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [animDone, setAnimDone] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const startedRef = useRef(false);
  const mutedRef = useRef(false);

  // Keystroke sound engine
  const { playKeystroke, setVolume } = useKeystrokeSound({ volume: 0.3 });

  // Keep ref in sync so the animation closure always reads current mute state
  useEffect(() => {
    mutedRef.current = isMuted;
    setVolume(isMuted ? 0 : 0.3);
  }, [isMuted, setVolume]);

  // Play sound wrapper (reads mute from ref to avoid stale closure)
  const playSoundForKey = useCallback(
    (key: string) => {
      if (!mutedRef.current) {
        playKeystroke(key);
      }
    },
    [playKeystroke]
  );

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function schedule(fn: () => void, ms: number) {
      if (cancelled) return;
      const id = setTimeout(fn, ms);
      timers.push(id);
    }

    let segIdx = 0;
    let charIdx = 0;

    function typeNext() {
      if (cancelled) return;
      if (segIdx >= SEGMENTS.length) {
        setActiveKey(null);
        setAnimDone(true);
        return;
      }

      if (charIdx === 0) {
        setActiveKey(null);
        schedule(typeChar, segIdx === 0 ? 600 : SEGMENT_PAUSE);
        return;
      }

      typeChar();
    }

    function typeChar() {
      if (cancelled) return;
      const seg = SEGMENTS[segIdx];
      if (charIdx >= seg.text.length) {
        segIdx++;
        charIdx = 0;
        typeNext();
        return;
      }

      const ch = seg.text[charIdx];
      const key = charToKey(ch);

      setActiveKey(key);
      playSoundForKey(key);
      setTyped((prev) => ({ ...prev, [seg.id]: charIdx + 1 }));
      charIdx++;

      // Release key after a short hold, then schedule next character
      schedule(() => {
        if (cancelled) return;
        setActiveKey(null);
        schedule(typeNext, CHAR_DELAY * 0.3);
      }, CHAR_DELAY * 0.7);
    }

    typeNext();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  // Helpers to get visible text per segment
  const vis = (id: string) => {
    const seg = SEGMENTS.find((s) => s.id === id);
    if (!seg) return "";
    const count = typed[id] ?? 0;
    return seg.text.slice(0, count);
  };

  const isDone = (id: string) => {
    const seg = SEGMENTS.find((s) => s.id === id);
    if (!seg) return false;
    return (typed[id] ?? 0) >= seg.text.length;
  };

  const hasStarted = (id: string) => (typed[id] ?? 0) > 0;

  // Blinking cursor
  const Cursor = ({ show }: { show: boolean }) =>
    show ? (
      <span className="inline-block w-[2px] h-[1em] bg-gray-900 dark:bg-white ml-[1px] align-middle animate-blink" />
    ) : null;

  // Actually, let's find the last segment that has started but cursor goes to the one being typed
  const getCurrentCursorSegment = () => {
    if (animDone) return null;
    for (let i = SEGMENTS.length - 1; i >= 0; i--) {
      const count = typed[SEGMENTS[i].id] ?? 0;
      if (count > 0 && count < SEGMENTS[i].text.length) return SEGMENTS[i].id;
      if (count > 0 && count >= SEGMENTS[i].text.length) {
        // This one finished, cursor might be waiting for next
        if (i + 1 < SEGMENTS.length) {
          const nextCount = typed[SEGMENTS[i + 1].id] ?? 0;
          if (nextCount === 0) return SEGMENTS[i].id; // cursor stays here momentarily
        }
        return null;
      }
    }
    return SEGMENTS[0]?.id ?? null;
  };

  const cursorSeg = getCurrentCursorSegment();

  return (
    <section id="home" className="relative flex flex-col overflow-hidden">
      <div className="relative w-full px-6 pt-28 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2.5 border border-gray-200 dark:border-zinc-700 rounded-full px-4 py-1.5 text-xs text-gray-500 dark:text-zinc-400">
              <span className="glow-dot" />
              Available for new opportunities
            </div>

            {/* Greeting + Name — fixed size via ghost text */}
            <div>
              <p className="text-gray-400 dark:text-zinc-500 text-xs font-semibold tracking-widest uppercase mb-3 relative">
                {/* Ghost: reserves space */}
                <span className="invisible" aria-hidden="true">Hiiii, I&apos;m</span>
                {/* Visible typed text */}
                <span className="absolute inset-0">
                  {vis("greeting")}
                  <Cursor show={cursorSeg === "greeting"} />
                </span>
              </p>
              <div className="relative">
                {/* Ghost h1 — establishes height */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight invisible" aria-hidden="true">
                  <span className="block">Tushar</span>
                  <span className="block">Pachouri</span>
                </h1>
                {/* Typed overlay */}
                <div className="absolute inset-0 text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  {hasStarted("firstName") && (
                    <span className="text-gray-900 dark:text-white block">
                      {vis("firstName")}
                      <Cursor show={cursorSeg === "firstName"} />
                    </span>
                  )}
                  {hasStarted("lastName") && (
                    <span className="text-gray-400 dark:text-zinc-500 block">
                      {vis("lastName")}
                      <Cursor show={cursorSeg === "lastName"} />
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Description — fixed size */}
            <div className="relative max-w-lg">
              {/* Ghost */}
              <p className="invisible text-sm leading-relaxed" aria-hidden="true">
                A software engineer from Mathura, Uttar Pradesh. I spend my time building scalable applications, solving complex problems, and understanding how systems work, both in code and beyond it. Passionate about system reliability, performance optimization, and crafting secure workflows that bridge complex engineering and human intuition.
              </p>
              {/* Typed overlay */}
              <p className="absolute inset-0 text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
                {vis("desc")}
                <Cursor show={cursorSeg === "desc"} />
              </p>
            </div>

            {/* Buttons — fade in after typing completes */}
            <div
              className={`flex flex-wrap gap-3 pt-2 transition-all duration-700 ${
                animDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <a
                href="#contact"
                className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-bold px-6 py-2.5 rounded-full hover:bg-gray-700 dark:hover:bg-zinc-200 transition-colors"
              >
                Let&apos;s Talk <ArrowRight size={13} />
              </a>
              <a
                href="#"
                className="flex items-center gap-2 border border-gray-200 dark:border-zinc-700 text-xs font-medium px-6 py-2.5 rounded-full text-gray-600 dark:text-zinc-300 hover:border-gray-400 dark:hover:border-zinc-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Download CV <Download size={13} />
              </a>
            </div>

            {/* Social icons — also fade in */}
            <div
              className={`flex items-center gap-5 pt-1 transition-all duration-700 delay-200 ${
                animDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {[
                { href: "https://github.com/TusharPachouri", icon: <GitFork size={16} />, label: "GitHub" },
                { href: "https://linkedin.com/in/tushar-pachouri", icon: <Link2 size={16} />, label: "LinkedIn" },
                { href: "mailto:tusharpachouri001@gmail.com", icon: <Mail size={16} />, label: "Email" },
                { href: "tel:+918218504473", icon: <Phone size={16} />, label: "Phone" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-gray-400 dark:text-zinc-600 hover:text-gray-900 dark:hover:text-white transition-colors"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Avatar */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="relative w-64 h-64 rounded-full bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-zinc-800 mx-auto flex items-center justify-center text-2xl font-bold text-gray-700 dark:text-white border border-gray-300 dark:border-zinc-600">
                    TP
                  </div>
                  <p className="text-gray-400 dark:text-zinc-500 text-xs">Mathura, UP</p>
                </div>
              </div>
              <div className="absolute -bottom-3 -left-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs shadow-lg">
                <p className="text-gray-400 dark:text-zinc-500 mb-0.5">Current Role</p>
                <p className="text-gray-900 dark:text-white font-semibold">TCS · Product Engineer</p>
              </div>
              <div className="absolute -top-3 -right-6 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-xl px-3 py-2 text-xs text-center shadow-lg">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">300+</p>
                <p className="text-gray-400 dark:text-zinc-500">Problems Solved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Keyboard */}
        <div className="mt-14 mb-2 relative">
          {/* Sound toggle */}
          <button
            onClick={() => setIsMuted((m) => !m)}
            className="absolute -top-8 right-2 z-20 flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full border transition-all duration-200
              border-gray-200 dark:border-zinc-700
              text-gray-400 dark:text-zinc-500
              hover:text-gray-600 dark:hover:text-zinc-300
              hover:border-gray-400 dark:hover:border-zinc-500
              bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm"
            aria-label={isMuted ? "Unmute keystroke sounds" : "Mute keystroke sounds"}
          >
            {isMuted ? (
              <><VolumeX size={12} /> <span>Sound Off</span></>
            ) : (
              <><Volume2 size={12} /> <span>Sound On</span></>
            )}
          </button>
          <MacKeyboard activeKey={activeKey} />
        </div>
      </div>
    </section>
  );
}
