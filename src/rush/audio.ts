/**
 * AudioManager: SFX + sparing voice lines (one line at a time, cooldown).
 * Islamic phrases use the recorded Baby Mo voice clips from the app-ayah games
 * (public/rush/voice/<lang>/<name>.mp3, same Algenib voice); everything else is
 * text-to-speech. A missing clip falls back to text-to-speech of its words.
 */
import { sfx, speak, haptic, type Sfx } from "../platform/audio";
import { t } from "../i18n";
import type { Lang, Msg } from "../i18n/types";

export type Clip = "bism" | "bismillah" | "shuffle" | "masya1" | "masya2" | "subhan" | "barak" | "akbar" | "win"
  | "pray-fajr" | "pray-dhuhr" | "pray-asr" | "pray-maghrib" | "pray-isha" | "taqabbal"
  | "d-leave_home" | "d-vehicle" | "d-eating";
/** Arabic du'a recordings from babymo-app (doa-voice/, Baby Mo's Algenib voice) — the same file for both languages */
const ARABIC: Partial<Record<Clip, true>> = { "d-leave_home": true, "d-vehicle": true, "d-eating": true };
/** what each clip says (fallback + speech bubble) */
export const CLIP_TEXT: Record<Clip, Record<Lang, string>> = {
  bism: { en: "Bismillah!", id: "Bismillah!" },
  bismillah: { en: "Bismillah! Let's go!", id: "Bismillah! Ayo mulai!" },
  shuffle: { en: "Tawakkaltu 'alallah.", id: "Tawakkaltu 'alallah." },
  masya1: { en: "Masha Allah! Great!", id: "Masya Allah! Hebat!" },
  masya2: { en: "Masha Allah! Well done!", id: "Masya Allah! Bagus sekali!" },
  subhan: { en: "Subhanallah! Amazing!", id: "Subhanallah! Keren!" },
  barak: { en: "Barakallahu fiikum! Awesome!", id: "Barakallahu fiikum! Luar biasa!" },
  akbar: { en: "Allahu Akbar! Unstoppable!", id: "Allahu Akbar! Mantap!" },
  win: { en: "Alhamdulillah! Well done!", id: "Alhamdulillah! Berhasil!" },
  "pray-fajr": { en: "It is time to pray Fajr.", id: "Waktunya sholat Subuh." },
  "pray-dhuhr": { en: "It is time to pray Dhuhr.", id: "Waktunya sholat Dzuhur." },
  "pray-asr": { en: "It is time to pray Asr.", id: "Waktunya sholat Ashar." },
  "pray-maghrib": { en: "It is time to pray Maghrib.", id: "Waktunya sholat Maghrib." },
  "pray-isha": { en: "It is time to pray Isha.", id: "Waktunya sholat Isya." },
  taqabbal: { en: "Taqabbalallahu minna wa minkum.", id: "Taqabbalallahu minna wa minkum." },
  "d-leave_home": { en: "Bismillahi tawakkaltu 'alallah, la haula wa la quwwata illa billah.", id: "Bismillahi tawakkaltu 'alallah, la haula wa la quwwata illa billah." },
  "d-eating": { en: "Bismillah.", id: "Bismillah." },
  "d-vehicle": { en: "Subhanalladzi sakhkhara lana hadza wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun.", id: "Subhanalladzi sakhkhara lana hadza wa ma kunna lahu muqrinin, wa inna ila rabbina lamunqalibun." },
};

let lastVoice = -1e9;
let voiceOn = true;
let playing: HTMLAudioElement | null = null;
const now = () => performance.now() / 1000;

function playClip(name: Clip, lang: Lang): Promise<void> {
  return new Promise((resolve) => {
    try {
      const a = new Audio(`rush/voice/${ARABIC[name] ? "ar" : lang}/${name}.mp3`);
      playing = a;
      a.onended = () => resolve();
      a.onerror = () => speak(CLIP_TEXT[name][lang], lang).then(resolve, resolve);
      a.play().catch(() => speak(CLIP_TEXT[name][lang], lang).then(resolve, resolve));
    } catch {
      resolve();
    }
  });
}

export const audio = {
  sfx(n: Sfx) { sfx(n); },
  haptic(k: "light" | "success" | "soft" = "light") { haptic(k); },
  setVoice(on: boolean) { voiceOn = on; if (!on) playing?.pause(); },
  /** speak unless another line was said less than `gap` seconds ago (important lines pass `force`) */
  say(m: Msg | string, lang: Lang, opts: { gap?: number; force?: boolean } = {}) {
    if (!opts.force && now() - lastVoice < (opts.gap ?? 8)) return false;
    lastVoice = now();
    speak(t(m, lang, "say"), lang).catch(() => {});
    return true;
  },
  /** recorded clips, played one after another (e.g. "Bismillah" then "Tawakkaltu 'alallah"); `done` fires when they finish */
  clips(names: Clip[], lang: Lang, opts: { gap?: number; force?: boolean; done?: () => void } = {}) {
    if (!opts.force && now() - lastVoice < (opts.gap ?? 8)) return false;
    lastVoice = now() + names.length * 1.2;
    if (!voiceOn) { opts.done?.(); return true; }
    playing?.pause();
    names.reduce((p, n) => p.then(() => playClip(n, lang)), Promise.resolve()).then(() => opts.done?.());
    return true;
  },
  stop() { playing?.pause(); },
  reset() { lastVoice = -1e9; },
};
