"use client";

import { useState, useEffect, useRef } from "react";
import {
  IconBrightnessDown,
  IconBrightness,
  IconLayout2,
  IconSearch,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipBack,
  IconPlayerPlay,
  IconPlayerSkipForward,
  IconVolumeOff,
  IconVolume,
  IconVolume2,
  IconWorld,
  IconArrowUp,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";

// ─── theme constants ──────────────────────────────────────────────────────────
const LIGHT = {
  face: "#f5f5f7",
  sh:   "inset 0 1.5px 0 rgba(255,255,255,0.92), 0 1.5px 0 rgba(0,0,0,0.22), 0 2px 5px rgba(0,0,0,0.08)",
  shP:  "inset 0 0.5px 0 rgba(255,255,255,0.55), 0 0px 0 rgba(0,0,0,0), 0 0px 2px rgba(0,0,0,0.04)",
  text: { primary: "#374151", muted: "#6b7280", faint: "#9ca3af" },
  touchId: { bg: "radial-gradient(circle at 38% 38%, #e2e2e6, #c8c8cc)", face: "#ebebef" },
  body: "linear-gradient(160deg, #dadadf 0%, #cacace 100%)",
  bodyShadow: "0 2px 8px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.55)",
  activeGlow: "0 0 6px 2px rgba(0, 0, 0, 0.12), inset 0 0.5px 0 rgba(255,255,255,0.55)",
  activeFace: "#e4e4e6",
};
const DARK = {
  face: "#3f3f45",
  sh:   "inset 0 1.5px 0 rgba(255,255,255,0.12), 0 1.5px 0 rgba(0,0,0,0.5), 0 2px 5px rgba(0,0,0,0.3)",
  shP:  "inset 0 0.5px 0 rgba(255,255,255,0.06), 0 0px 0 rgba(0,0,0,0)",
  text: { primary: "#e4e4e7", muted: "#a1a1aa", faint: "#71717a" },
  touchId: { bg: "radial-gradient(circle at 38% 38%, #5a5a60, #3a3a40)", face: "#4a4a50" },
  body: "linear-gradient(160deg, #3a3a3f 0%, #2c2c31 100%)",
  bodyShadow: "0 2px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
  activeGlow: "0 0 8px 3px rgba(255, 255, 255, 0.15), inset 0 0.5px 0 rgba(255,255,255,0.12)",
  activeFace: "#58585e",
};

// ─── Key ──────────────────────────────────────────────────────────────────────
interface KeyProps {
  children?: React.ReactNode;
  grow?: number;
  fnRow?: boolean;
  radius?: string;
  className?: string;
  isDark?: boolean;
  keyId?: string;          // identifier to match against activeKey
  isPressed?: boolean;     // externally driven press state
}

function Key({ children, grow = 1, fnRow = false, radius, className = "", isDark = false, keyId, isPressed = false }: KeyProps) {
  const [p, setP] = useState(false);
  const pressed = p || isPressed;
  const t = isDark ? DARK : LIGHT;

  const bg = isPressed ? (isDark ? DARK.activeFace : LIGHT.activeFace) : t.face;
  const shadow = isPressed
    ? (isDark ? DARK.activeGlow : LIGHT.activeGlow)
    : pressed
    ? t.shP
    : t.sh;

  return (
    <button
      className={`flex items-center justify-center select-none overflow-hidden ${className}`}
      data-key-id={keyId}
      style={{
        flex: `${grow} 1 0%`,
        height: fnRow ? "22px" : "33px",
        borderRadius: radius ?? "5px",
        background: bg,
        boxShadow: shadow,
        transform: pressed ? "scale(0.96)" : "scale(1)",
        transition: "transform 55ms ease, box-shadow 55ms ease, background 55ms ease",
      }}
      onPointerDown={() => setP(true)}
      onPointerUp={() => setP(false)}
      onPointerLeave={() => setP(false)}
    >
      {children}
    </button>
  );
}

function HalfKey({ children, isDark = false, isPressed = false }: { children: React.ReactNode; isDark?: boolean; isPressed?: boolean }) {
  const [p, setP] = useState(false);
  const pressed = p || isPressed;
  const t = isDark ? DARK : LIGHT;
  return (
    <button
      className="rounded-[4px] flex-1 flex items-center justify-center select-none"
      style={{
        background: isPressed ? (isDark ? DARK.activeFace : LIGHT.activeFace) : t.face,
        boxShadow: isPressed ? (isDark ? DARK.activeGlow : LIGHT.activeGlow) : pressed ? t.shP : t.sh,
        transform: pressed ? "scale(0.96)" : "scale(1)",
        transition: "transform 55ms ease, box-shadow 55ms ease, background 55ms ease",
      }}
      onPointerDown={() => setP(true)}
      onPointerUp={() => setP(false)}
      onPointerLeave={() => setP(false)}
    >
      {children}
    </button>
  );
}

// ─── content helpers ──────────────────────────────────────────────────────────
function FnKey({ icon: Icon, label, isDark }: { icon: React.ElementType; label: string; isDark: boolean }) {
  const c = isDark ? DARK.text : LIGHT.text;
  return (
    <div className="flex flex-col items-center justify-between h-full w-full py-[3px] pointer-events-none">
      <Icon size={11} strokeWidth={1.6} style={{ color: c.muted }} />
      <span className="text-[8px] font-medium leading-none" style={{ color: c.faint }}>{label}</span>
    </div>
  );
}

function NumKey({ main, sym, isDark }: { main: string; sym: string; isDark: boolean }) {
  const c = isDark ? DARK.text : LIGHT.text;
  return (
    <div className="flex flex-col items-start justify-between h-full w-full px-[6px] py-[5px] pointer-events-none">
      <span className="text-[9px] font-medium leading-none" style={{ color: c.faint }}>{sym}</span>
      <span className="text-[11px] font-semibold leading-none" style={{ color: c.primary }}>{main}</span>
    </div>
  );
}

function Letter({ l, isDark }: { l: string; isDark: boolean }) {
  const c = isDark ? DARK.text : LIGHT.text;
  return (
    <span className="text-[12px] font-[500] pointer-events-none" style={{ color: c.primary }}>{l}</span>
  );
}

function ModLabel({ top, bottom, isDark }: { top?: string; bottom: string; isDark: boolean }) {
  const c = isDark ? DARK.text : LIGHT.text;
  return (
    <div className="flex flex-col items-start justify-end h-full w-full px-[7px] pb-[5px] gap-[1px] pointer-events-none">
      {top && <span className="text-[10px] leading-none" style={{ color: c.muted }}>{top}</span>}
      <span className="text-[8.5px] font-medium leading-none" style={{ color: c.faint }}>{bottom}</span>
    </div>
  );
}

// ─── natural dimensions ───────────────────────────────────────────────────────
const NW = 600;
const NH = 218;

// ─── keyboard ────────────────────────────────────────────────────────────────
interface MacKeyboardProps {
  activeKey?: string | null;  // e.g. "A", "B", " " for space, "," etc.
}

export default function MacKeyboard({ activeKey = null }: MacKeyboardProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale]   = useState(1);
  const [isDark, setIsDark] = useState(true);

  // Watch for .dark class changes on <html>
  useEffect(() => {
    const html = document.documentElement;
    const sync = () => setIsDark(html.classList.contains("dark"));
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  // Responsive scaling
  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setScale(Math.min(1, w / NW));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const t = isDark ? DARK : LIGHT;
  const c = t.text;

  // Helper: is this key the currently active one?
  const isActive = (keyLabel: string) => {
    if (!activeKey) return false;
    return activeKey.toUpperCase() === keyLabel.toUpperCase();
  };

  const isSpaceActive = activeKey === " ";

  return (
    <div ref={outerRef} className="w-full relative" style={{ height: NH * scale }}>
      <div
        style={{
          position: "absolute",
          width: NW,
          left: "50%",
          top: 0,
          transformOrigin: "top center",
          transform: `translateX(-50%) scale(${scale})`,
        }}
      >
        <div
          className="flex flex-col gap-[3px]"
          style={{
            width: NW,
            background: t.body,
            borderRadius: "12px",
            padding: "7px",
            boxShadow: t.bodyShadow,
          }}
        >
          {/* ── Row 1 – Fn ──────────────────────────────────────────────────── */}
          <div className="flex gap-[4px]">
            {/* ESC — top-left corner */}
            <Key grow={1.5} fnRow radius="12px 5px 5px 5px" isDark={isDark} keyId="esc" isPressed={isActive("esc")}>
              <span className="text-[10px] font-medium pointer-events-none" style={{ color: c.muted }}>esc</span>
            </Key>

            <div className="w-[7px] shrink-0" />

            <Key grow={1} fnRow isDark={isDark} keyId="F1"><FnKey icon={IconBrightnessDown}    label="F1"  isDark={isDark} /></Key>
            <Key grow={1} fnRow isDark={isDark} keyId="F2"><FnKey icon={IconBrightness}        label="F2"  isDark={isDark} /></Key>
            <Key grow={1} fnRow isDark={isDark} keyId="F3"><FnKey icon={IconLayout2}           label="F3"  isDark={isDark} /></Key>

            <div className="w-[7px] shrink-0" />

            <Key grow={1} fnRow isDark={isDark} keyId="F4"><FnKey icon={IconSearch}            label="F4"  isDark={isDark} /></Key>
            <Key grow={1} fnRow isDark={isDark} keyId="F5"><FnKey icon={IconMicrophone}        label="F5"  isDark={isDark} /></Key>
            <Key grow={1} fnRow isDark={isDark} keyId="F6"><FnKey icon={IconMoon}              label="F6"  isDark={isDark} /></Key>

            <div className="w-[7px] shrink-0" />

            <Key grow={1} fnRow isDark={isDark} keyId="F7"><FnKey icon={IconPlayerSkipBack}    label="F7"  isDark={isDark} /></Key>
            <Key grow={1} fnRow isDark={isDark} keyId="F8"><FnKey icon={IconPlayerPlay}        label="F8"  isDark={isDark} /></Key>
            <Key grow={1} fnRow isDark={isDark} keyId="F9"><FnKey icon={IconPlayerSkipForward} label="F9"  isDark={isDark} /></Key>

            <div className="w-[7px] shrink-0" />

            <Key grow={1} fnRow isDark={isDark} keyId="F10"><FnKey icon={IconVolumeOff}         label="F10" isDark={isDark} /></Key>
            <Key grow={1} fnRow isDark={isDark} keyId="F11"><FnKey icon={IconVolume}            label="F11" isDark={isDark} /></Key>
            <Key grow={1} fnRow isDark={isDark} keyId="F12"><FnKey icon={IconVolume2}           label="F12" isDark={isDark} /></Key>

            <div className="w-[7px] shrink-0" />

            {/* Touch ID — top-right corner */}
            <div
              className="flex items-center justify-center shrink-0"
              style={{
                flex: "1.5 1 0%",
                height: "26px",
                borderRadius: "5px 12px 5px 5px",
                background: t.touchId.face,
                boxShadow: t.sh,
              }}
            >
              <div
                className="w-[17px] h-[17px] rounded-full"
                style={{
                  background: t.touchId.bg,
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.18)",
                }}
              />
            </div>
          </div>

          {/* ── Row 2 – Numbers ─────────────────────────────────────────────── */}
          <div className="flex gap-[4px]">
            <Key grow={1} isDark={isDark} keyId="`" isPressed={isActive("`")}><NumKey main="`" sym="~"  isDark={isDark} /></Key>
            <Key grow={1} isDark={isDark} keyId="1" isPressed={isActive("1")}><NumKey main="1" sym="!"  isDark={isDark} /></Key>
            <Key grow={1} isDark={isDark} keyId="2" isPressed={isActive("2")}><NumKey main="2" sym="@"  isDark={isDark} /></Key>
            <Key grow={1} isDark={isDark} keyId="3" isPressed={isActive("3")}><NumKey main="3" sym="#"  isDark={isDark} /></Key>
            <Key grow={1} isDark={isDark} keyId="4" isPressed={isActive("4")}><NumKey main="4" sym="$"  isDark={isDark} /></Key>
            <Key grow={1} isDark={isDark} keyId="5" isPressed={isActive("5")}><NumKey main="5" sym="%"  isDark={isDark} /></Key>
            <Key grow={1} isDark={isDark} keyId="6" isPressed={isActive("6")}><NumKey main="6" sym="^"  isDark={isDark} /></Key>
            <Key grow={1} isDark={isDark} keyId="7" isPressed={isActive("7")}><NumKey main="7" sym="&"  isDark={isDark} /></Key>
            <Key grow={1} isDark={isDark} keyId="8" isPressed={isActive("8")}><NumKey main="8" sym="*"  isDark={isDark} /></Key>
            <Key grow={1} isDark={isDark} keyId="9" isPressed={isActive("9")}><NumKey main="9" sym="("  isDark={isDark} /></Key>
            <Key grow={1} isDark={isDark} keyId="0" isPressed={isActive("0")}><NumKey main="0" sym=")"  isDark={isDark} /></Key>
            <Key grow={1} isDark={isDark} keyId="—" isPressed={isActive("—")}><NumKey main="—" sym="-"  isDark={isDark} /></Key>
            <Key grow={1} isDark={isDark} keyId="+" isPressed={isActive("+")}><NumKey main="+" sym="="  isDark={isDark} /></Key>
            <Key grow={1.5} isDark={isDark} keyId="delete" isPressed={isActive("delete")}>
              <span className="text-[10px] font-medium pointer-events-none" style={{ color: c.muted }}>delete</span>
            </Key>
          </div>

          {/* ── Row 3 – QWERTY ──────────────────────────────────────────────── */}
          <div className="flex gap-[4px]">
            <Key grow={1.5} isDark={isDark} keyId="tab" isPressed={isActive("tab")}>
              <span className="text-[10px] font-medium pointer-events-none" style={{ color: c.muted }}>tab</span>
            </Key>
            {"QWERTYUIOP".split("").map((l) => (
              <Key key={l} grow={1} isDark={isDark} keyId={l} isPressed={isActive(l)}><Letter l={l} isDark={isDark} /></Key>
            ))}
            <Key grow={1} isDark={isDark} keyId="[" isPressed={isActive("[")}><NumKey main="[" sym="{" isDark={isDark} /></Key>
            <Key grow={1} isDark={isDark} keyId="]" isPressed={isActive("]")}><NumKey main="]" sym="}" isDark={isDark} /></Key>
            <Key grow={1} isDark={isDark} keyId="\\" isPressed={isActive("\\")}><NumKey main="\\" sym="|" isDark={isDark} /></Key>
          </div>

          {/* ── Row 4 – ASDF ────────────────────────────────────────────────── */}
          <div className="flex gap-[4px]">
            <Key grow={1.75} isDark={isDark} keyId="capslock" isPressed={isActive("capslock")}>
              <div className="flex flex-col items-start justify-end h-full w-full px-[7px] pb-[5px] pointer-events-none">
                <span className="text-[8.5px] font-medium leading-none" style={{ color: c.faint }}>caps lock</span>
              </div>
            </Key>
            {"ASDFGHJKL".split("").map((l) => (
              <Key key={l} grow={1} isDark={isDark} keyId={l} isPressed={isActive(l)}><Letter l={l} isDark={isDark} /></Key>
            ))}
            <Key grow={1} isDark={isDark} keyId=";" isPressed={isActive(";")}><NumKey main=";" sym=":"   isDark={isDark} /></Key>
            <Key grow={1} isDark={isDark} keyId="'" isPressed={isActive("'")}><NumKey main="'" sym={'"'} isDark={isDark} /></Key>
            <Key grow={2.25} isDark={isDark} keyId="return" isPressed={isActive("return")}>
              <span className="text-[10px] font-medium pointer-events-none" style={{ color: c.muted }}>return</span>
            </Key>
          </div>

          {/* ── Row 5 – ZXCV ────────────────────────────────────────────────── */}
          <div className="flex gap-[4px]">
            <Key grow={2.25} isDark={isDark} keyId="shift" isPressed={isActive("shift")}>
              <span className="text-[10px] font-medium pointer-events-none" style={{ color: c.muted }}>shift</span>
            </Key>
            {"ZXCVBNM".split("").map((l) => (
              <Key key={l} grow={1} isDark={isDark} keyId={l} isPressed={isActive(l)}><Letter l={l} isDark={isDark} /></Key>
            ))}
            <Key grow={1} isDark={isDark} keyId="," isPressed={isActive(",")}><NumKey main="," sym="<" isDark={isDark} /></Key>
            <Key grow={1} isDark={isDark} keyId="." isPressed={isActive(".")}><NumKey main="." sym=">" isDark={isDark} /></Key>
            <Key grow={1} isDark={isDark} keyId="/" isPressed={isActive("/")}><NumKey main="/" sym="?" isDark={isDark} /></Key>
            <Key grow={2.75} isDark={isDark} keyId="rshift" isPressed={isActive("shift")}>
              <span className="text-[10px] font-medium pointer-events-none" style={{ color: c.muted }}>shift</span>
            </Key>
          </div>

          {/* ── Row 6 – Bottom ──────────────────────────────────────────────── */}
          <div className="flex gap-[4px]">
            {/* fn — bottom-left corner */}
            <Key grow={1} radius="5px 5px 5px 12px" isDark={isDark} keyId="fn">
              <div className="flex flex-col items-center justify-center gap-[2px] pointer-events-none">
                <IconWorld size={11} strokeWidth={1.6} style={{ color: c.muted }} />
                <span className="text-[8px] font-medium leading-none" style={{ color: c.faint }}>fn</span>
              </div>
            </Key>

            <Key grow={1.25} isDark={isDark} keyId="control"><ModLabel top="^" bottom="control" isDark={isDark} /></Key>
            <Key grow={1.25} isDark={isDark} keyId="option"><ModLabel top="⌥" bottom="option"  isDark={isDark} /></Key>
            <Key grow={1.5}  isDark={isDark} keyId="command"><ModLabel top="⌘" bottom="command" isDark={isDark} /></Key>

            {/* spacebar */}
            <Key grow={6} isDark={isDark} keyId=" " isPressed={isSpaceActive} />

            {/* right command */}
            <Key grow={1.5} isDark={isDark} keyId="rcommand">
              <div className="flex flex-col items-end justify-end h-full w-full px-[7px] pb-[5px] pointer-events-none">
                <span className="text-[10px] leading-none" style={{ color: c.muted }}>⌘</span>
                <span className="text-[8.5px] font-medium leading-none" style={{ color: c.faint }}>command</span>
              </div>
            </Key>

            {/* right option */}
            <Key grow={1.25} isDark={isDark} keyId="roption">
              <div className="flex flex-col items-end justify-end h-full w-full px-[7px] pb-[5px] pointer-events-none">
                <span className="text-[10px] leading-none" style={{ color: c.muted }}>⌥</span>
                <span className="text-[8.5px] font-medium leading-none" style={{ color: c.faint }}>option</span>
              </div>
            </Key>

            {/* Arrow cluster */}
            <div className="flex gap-[4px]" style={{ flex: "3 1 0%" }}>
              {/* ← */}
              <Key grow={1} isDark={isDark} keyId="arrowleft">
                <IconArrowLeft size={11} strokeWidth={2} style={{ color: c.muted }} className="pointer-events-none" />
              </Key>

              {/* ↑ / ↓ stacked */}
              <div className="flex flex-col gap-[4px]" style={{ flex: "1 1 0%", height: "38px" }}>
                <HalfKey isDark={isDark}>
                  <IconArrowUp size={10} strokeWidth={2} style={{ color: c.muted }} className="pointer-events-none" />
                </HalfKey>
                <HalfKey isDark={isDark}>
                  <IconArrowDown size={10} strokeWidth={2} style={{ color: c.muted }} className="pointer-events-none" />
                </HalfKey>
              </div>

              {/* → — bottom-right corner */}
              <Key grow={1} radius="5px 5px 12px 5px" isDark={isDark} keyId="arrowright">
                <IconArrowRight size={11} strokeWidth={2} style={{ color: c.muted }} className="pointer-events-none" />
              </Key>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
