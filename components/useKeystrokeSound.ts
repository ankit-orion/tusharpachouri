"use client";

import { useRef, useCallback, useEffect } from "react";

// ─── Keystroke sound engine ──────────────────────────────────────────────────
// Synthesises a realistic mechanical keyboard click using Web Audio API.
// Three layered components:
//   1. A sharp transient "click" (noise burst, ~3ms) — the switch actuating
//   2. A short tonal thud (~15ms) — the keycap bottoming out on the plate
//   3. A subtle resonance tail (~40ms) — case reverberation
//
// Pitch & timing are micro-randomised per stroke so it doesn't sound robotic.
// ─────────────────────────────────────────────────────────────────────────────

interface KeystrokeSoundOptions {
  /** Base volume 0–1 (default 0.35 — professional and subtle) */
  volume?: number;
  /** Whether the spacebar should have a deeper thud (default true) */
  deepSpace?: boolean;
}

export function useKeystrokeSound(opts: KeystrokeSoundOptions = {}) {
  const { volume = 0.35, deepSpace = true } = opts;

  const ctxRef = useRef<AudioContext | null>(null);
  const noiseRef = useRef<AudioBuffer | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Lazily create + warm AudioContext on first user interaction
  const ensureCtx = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;

    const ctx = new AudioContext({ sampleRate: 44100 });
    ctxRef.current = ctx;

    // Master gain
    const master = ctx.createGain();
    master.gain.value = volume;
    master.connect(ctx.destination);
    gainNodeRef.current = master;

    // Pre-generate noise buffer (1 second of white noise, reused)
    const len = ctx.sampleRate;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noiseRef.current = buf;

    return ctx;
  }, [volume]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      ctxRef.current?.close();
      ctxRef.current = null;
    };
  }, []);

  // ── Play a single keystroke ────────────────────────────────────────────────
  const playKeystroke = useCallback(
    (keyLabel?: string) => {
      const ctx = ensureCtx();
      if (!ctx || !noiseRef.current || !gainNodeRef.current) return;

      // Resume suspended context (browser autoplay policy)
      if (ctx.state === "suspended") ctx.resume();

      const now = ctx.currentTime;
      const isSpace = keyLabel === " " && deepSpace;
      const isReturn = keyLabel?.toLowerCase() === "return";

      // Micro-randomisation for realism
      const pitchJitter = 0.9 + Math.random() * 0.2;           // ±10%
      const volumeJitter = 0.85 + Math.random() * 0.3;         // ±15%

      // ── Layer 1: Click transient (filtered noise burst) ──────────────────
      const clickSrc = ctx.createBufferSource();
      clickSrc.buffer = noiseRef.current;

      const clickFilter = ctx.createBiquadFilter();
      clickFilter.type = "bandpass";
      clickFilter.frequency.value = (isSpace ? 1800 : 3200) * pitchJitter;
      clickFilter.Q.value = isSpace ? 0.8 : 1.2;

      const clickGain = ctx.createGain();
      clickGain.gain.setValueAtTime(0, now);
      clickGain.gain.linearRampToValueAtTime(0.8 * volumeJitter, now + 0.001);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + (isSpace ? 0.012 : 0.006));

      clickSrc.connect(clickFilter);
      clickFilter.connect(clickGain);
      clickGain.connect(gainNodeRef.current);

      clickSrc.start(now);
      clickSrc.stop(now + 0.05);

      // ── Layer 2: Tonal thud (low osc) ────────────────────────────────────
      const thudOsc = ctx.createOscillator();
      thudOsc.type = "sine";
      thudOsc.frequency.value = (isSpace ? 80 : isReturn ? 120 : 150) * pitchJitter;

      const thudGain = ctx.createGain();
      thudGain.gain.setValueAtTime(0, now);
      thudGain.gain.linearRampToValueAtTime(
        (isSpace ? 0.35 : 0.18) * volumeJitter,
        now + 0.002
      );
      thudGain.gain.exponentialRampToValueAtTime(0.001, now + (isSpace ? 0.04 : 0.02));

      thudOsc.connect(thudGain);
      thudGain.connect(gainNodeRef.current);

      thudOsc.start(now);
      thudOsc.stop(now + 0.06);

      // ── Layer 3: Plate resonance (high-pass filtered noise tail) ─────────
      const resSrc = ctx.createBufferSource();
      resSrc.buffer = noiseRef.current;

      const resHP = ctx.createBiquadFilter();
      resHP.type = "highpass";
      resHP.frequency.value = (isSpace ? 600 : 1200) * pitchJitter;

      const resLP = ctx.createBiquadFilter();
      resLP.type = "lowpass";
      resLP.frequency.value = (isSpace ? 2500 : 4000) * pitchJitter;

      const resGain = ctx.createGain();
      resGain.gain.setValueAtTime(0, now + 0.003);
      resGain.gain.linearRampToValueAtTime(0.06 * volumeJitter, now + 0.006);
      resGain.gain.exponentialRampToValueAtTime(0.001, now + (isSpace ? 0.06 : 0.035));

      resSrc.connect(resHP);
      resHP.connect(resLP);
      resLP.connect(resGain);
      resGain.connect(gainNodeRef.current);

      resSrc.start(now);
      resSrc.stop(now + 0.1);
    },
    [ensureCtx, deepSpace]
  );

  // Allow external volume control
  const setVolume = useCallback(
    (v: number) => {
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = Math.max(0, Math.min(1, v));
      }
    },
    []
  );

  return { playKeystroke, setVolume };
}
