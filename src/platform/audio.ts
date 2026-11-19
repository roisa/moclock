/**
 * Audio: spoken instructions (speech), sound effects and background music.
 *
 *  - Speech uses the device's text-to-speech in the chosen language. Inside the
 *    play.babymo.id hub the hub's bm-voice.js wraps speechSynthesis, so any line
 *    that already has a recorded Baby Mo clip plays the recording instead.
 *    Our own clip table (window.BMT_VOICE: "lang|text" → url) works the same way.
 *  - Sound effects and music are synthesised with Web Audio: no files to
 *    download, nothing to cache, works offline.
 *  - Every call is safe to make when audio is unavailable or blocked.
 */
import type { Lang } from "../i18n/types";
import { plugin } from "./native";

type Prefs = { voice: boolean; sfx: boolean; music: boolean; lang: Lang };
const prefs: Prefs = { voice: true, sfx: true, music: false, lang: "id" };
export function setAudioPrefs(p: Partial<Prefs>) {
  Object.assign(prefs, p);
  if (p.music === false) stopMusic();
  if (p.music === true && unlocked) startMusic();
}

/* ------------------------------------------------------------------ speech */
const synth: SpeechSynthesis | null = typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null;
let voices: SpeechSynthesisVoice[] = [];
function loadVoices() {
  try {
    voices = synth?.getVoices() || [];
  } catch {
    voices = [];
  }
}
loadVoices();
synth?.addEventListener?.("voiceschanged", loadVoices);

const BCP: Record<Lang, string> = { en: "en-US", id: "id-ID" };
function bestVoice(lang: Lang): SpeechSynthesisVoice | undefined {
  const pre = lang === "id" ? ["id", "in"] : ["en"];
  const list = voices.filter((v) => pre.some((p) => v.lang.toLowerCase().replace("_", "-").startsWith(p)));
  const score = (v: SpeechSynthesisVoice) =>
    (/natural|neural|premium|enhanced|google|siri/i.test(v.name) ? 4 : 0) +
    (/female|samantha|karen|moira|tessa|damayanti|gadis|ava|allison|zira/i.test(v.name) ? 2 : 0) +
    (v.lang.replace("_", "-") === BCP[lang] ? 1 : 0) + (v.localService ? 1 : 0);
  return list.sort((a, b) => score(b) - score(a))[0];
}

let speaking = 0;
let clipAudio: HTMLAudioElement | null = null;
const clips = (): Record<string, string> => (window as unknown as { BMT_VOICE?: Record<string, string> }).BMT_VOICE || {};
const clipKey = (lang: Lang, text: string) =>
  lang + "|" + text.toLowerCase().replace(/[^\p{L}\p{N}' ]+/gu, " ").replace(/\s+/g, " ").trim();

export function stopSpeech() {
  speaking++;
  try {
    synth?.cancel();
  } catch {
    /* ignore */
  }
  if (clipAudio) {
    clipAudio.pause();
    clipAudio = null;
  }
}

/** Speak a line. Resolves when finished (or immediately if voice is off). */
export function speak(text: string, lang: Lang = prefs.lang, opts: { force?: boolean } = {}): Promise<void> {
  if (!text || (!prefs.voice && !opts.force)) return Promise.resolve();
  stopSpeech();
  const id = ++speaking;
  duck(true);
  const done = () => {
    if (id === speaking) duck(false);
  };
  const clip = clips()[clipKey(lang, text)];
  if (clip) {
    return new Promise((res) => {
      const a = new Audio(clip);
      clipAudio = a;
      a.onended = a.onerror = () => {
        done();
        res();
      };
      a.play().catch(() => {
        done();
        res();
      });
    });
  }
  if (!synth) {
    done();
    return Promise.resolve();
  }
  return new Promise((res) => {
    try {
      const u = new SpeechSynthesisUtterance(text.replace(/[⭐🌟✨🎉💚]/gu, ""));
      u.lang = BCP[lang];
      const v = bestVoice(lang);
      if (v) u.voice = v;
      u.rate = lang === "id" ? 0.95 : 0.92;
      u.pitch = 1.12;
      let settled = false;
      const fin = () => {
        if (settled) return;
        settled = true;
        done();
        res();
      };
      u.onend = fin;
      u.onerror = fin;
      // Safari sometimes never fires onend: time out generously
      setTimeout(fin, 1500 + text.length * 110);
      synth.speak(u);
    } catch {
      done();
      res();
    }
  });
}
export const hasSpeech = () => !!synth;

/* ------------------------------------------------------------- Web Audio */
let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let musicGain: GainNode | null = null;
let unlocked = false;

function ac(): AudioContext | null {
  if (ctx) return ctx;
  try {
    const C = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!C) return null;
    ctx = new C();
    master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);
    musicGain = ctx.createGain();
    musicGain.gain.value = 0.0;
    musicGain.connect(master);
  } catch {
    ctx = null;
  }
  return ctx;
}

/** Call on the first user gesture (iOS needs it for both Web Audio and speech). */
export function unlockAudio() {
  if (unlocked) return;
  unlocked = true;
  const c = ac();
  try {
    c?.resume();
    // a silent utterance unlocks speech on iOS
    if (synth) {
      const u = new SpeechSynthesisUtterance(" ");
      u.volume = 0;
      synth.speak(u);
    }
  } catch {
    /* ignore */
  }
  if (prefs.music) startMusic();
}

function tone(freq: number, at: number, dur: number, type: OscillatorType = "sine", vol = 0.25, dest?: AudioNode, glideTo?: number) {
  const c = ac();
  if (!c || !master) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, at);
  if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, at + dur);
  g.gain.setValueAtTime(0.0001, at);
  g.gain.exponentialRampToValueAtTime(vol, at + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, at + dur);
  o.connect(g).connect(dest || master);
  o.start(at);
  o.stop(at + dur + 0.05);
}

export type Sfx = "tap" | "pop" | "correct" | "gentle" | "star" | "snap" | "tick" | "whoosh" | "fanfare" | "beep" | "go";
export function sfx(name: Sfx) {
  if (!prefs.sfx) return;
  const c = ac();
  if (!c) return;
  if (c.state === "suspended") c.resume().catch(() => {});
  const t = c.currentTime + 0.01;
  switch (name) {
    case "tap": tone(660, t, 0.07, "triangle", 0.12); break;
    case "pop": tone(520, t, 0.12, "sine", 0.3, undefined, 1300); break;
    case "snap": tone(880, t, 0.06, "square", 0.06); tone(1320, t + 0.04, 0.08, "triangle", 0.12); break;
    case "tick": tone(1800, t, 0.03, "square", 0.04); break;
    case "whoosh": tone(300, t, 0.25, "sine", 0.08, undefined, 900); break;
    case "beep": tone(880, t, 0.12, "sine", 0.18); break;
    case "go": tone(1175, t, 0.3, "sine", 0.22); break;
    case "correct": [523.25, 659.25, 783.99].forEach((f, i) => tone(f, t + i * 0.08, 0.28, "triangle", 0.2)); break;
    case "gentle": tone(440, t, 0.22, "sine", 0.14); tone(392, t + 0.16, 0.3, "sine", 0.12); break;
    case "star": [1046.5, 1318.5, 1568, 2093].forEach((f, i) => tone(f, t + i * 0.06, 0.35, "sine", 0.12)); break;
    case "fanfare":
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, t + i * 0.12, 0.4, "triangle", 0.2));
      [1046.5, 1318.5].forEach((f) => tone(f, t + 0.55, 0.7, "sine", 0.15));
      break;
  }
}

/* --------------------------------------------------------- music (gentle) */
let musicTimer: number | null = null;
let nextNote = 0;
let step = 0;
// a calm music-box tune in C major pentatonic; 0 = rest
const MELODY = [523, 659, 784, 659, 587, 0, 523, 0, 659, 784, 880, 784, 659, 0, 587, 0, 523, 587, 659, 523, 440, 0, 392, 0, 440, 523, 587, 523, 523, 0, 0, 0];
const BASS = [131, 0, 0, 0, 196, 0, 0, 0, 175, 0, 0, 0, 131, 0, 0, 0];

export function startMusic() {
  const c = ac();
  if (!c || !musicGain || musicTimer != null || !prefs.music) return;
  musicGain.gain.cancelScheduledValues(c.currentTime);
  musicGain.gain.setTargetAtTime(0.5, c.currentTime, 0.8);
  nextNote = c.currentTime + 0.1;
  const beat = 0.34;
  musicTimer = window.setInterval(() => {
    if (!ctx || !musicGain) return;
    while (nextNote < ctx.currentTime + 0.5) {
      const m = MELODY[step % MELODY.length];
      const b = BASS[step % BASS.length];
      if (m) tone(m, nextNote, 0.9, "sine", 0.05, musicGain);
      if (b) tone(b, nextNote, 1.4, "triangle", 0.035, musicGain);
      nextNote += beat;
      step++;
    }
  }, 120);
}
export function stopMusic() {
  if (musicTimer != null) clearInterval(musicTimer);
  musicTimer = null;
  if (ctx && musicGain) musicGain.gain.setTargetAtTime(0, ctx.currentTime, 0.2);
}
/** Lower the music while Mo talks */
function duck(on: boolean) {
  if (!ctx || !musicGain || musicTimer == null) return;
  musicGain.gain.setTargetAtTime(on ? 0.15 : 0.5, ctx.currentTime, 0.15);
}
// pause everything when the app goes to the background
if (typeof document !== "undefined") {
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopSpeech();
      if (ctx) ctx.suspend().catch(() => {});
    } else if (ctx && unlocked) ctx.resume().catch(() => {});
  });
}

/* ---------------------------------------------------------------- haptics */
export function haptic(kind: "light" | "success" | "soft" = "light") {
  try {
    const H = plugin("Haptics");
    if (H) {
      if (kind === "success") H.notification?.({ type: "SUCCESS" });
      else H.impact?.({ style: kind === "soft" ? "LIGHT" : "MEDIUM" });
      return;
    }
    navigator.vibrate?.(kind === "success" ? [12, 40, 18] : 8);
  } catch {
    /* ignore */
  }
}
