/** Time Racers progress + settings, persisted on the device (IndexedDB/localStorage). */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { load, save, hub } from "../platform/storage";
import { setAudioPrefs } from "../platform/audio";
import { t as tr, type Mode } from "../i18n";
import type { Lang, Msg } from "../i18n/types";
import type { Level } from "../engine/types";
import type { RacerId } from "./content/racers";
import { LEVELS, type QuestionFamily } from "./content/levels";
import type { QualityPref } from "./game/engine";
import type { RaceSummary } from "./game/RaceGame";

export interface LevelResult { stars: number; best: number; plays: number }
export interface RProgress {
  v: 1;
  racer: RacerId;
  kart: string;
  paints: Record<string, string>;
  owned: string[];
  coins: number;
  trophies: number;
  levels: Record<string, LevelResult>;
  stickers: string[];
  difficulty: Partial<Record<QuestionFamily, Level>>;
  skills: Record<string, { a: number; c: number }>;
  onboarded: boolean;
  tutorials: string[];
  settings: { lang: Lang; junior: boolean; quality: QualityPref; sound: boolean; music: boolean; voice: boolean; rotateOk: boolean };
}
const KEY = "racers";
export function defaults(lang: Lang): RProgress {
  return {
    v: 1, racer: "mo", kart: "star", paints: {}, owned: ["star", "moon", "shield"], coins: 0, trophies: 0, levels: {}, stickers: [],
    difficulty: {}, skills: {}, onboarded: false, tutorials: [],
    settings: { lang, junior: true, quality: "auto", sound: true, music: false, voice: true, rotateOk: false },
  };
}
function migrate(raw: unknown, lang: Lang): RProgress {
  const d = defaults(lang);
  if (!raw || typeof raw !== "object") return d;
  const r = raw as Partial<RProgress>;
  return { ...d, ...r, settings: { ...d.settings, ...(r.settings || {}) }, levels: { ...(r.levels || {}) }, owned: Array.from(new Set([...d.owned, ...(r.owned || [])])) };
}

/** Stars come from learning (first-try answers), not from winning. */
export function starsFor(s: RaceSummary): number {
  const acc = s.questions ? s.correctFirstTry / s.questions : 1;
  return 1 + (acc >= 0.6 ? 1 : 0) + (acc >= 0.85 ? 1 : 0);
}
export function isUnlocked(p: RProgress, levelId: string): boolean {
  const i = LEVELS.findIndex((l) => l.id === levelId);
  const lv = LEVELS[i];
  if (!lv) return false;
  if (lv.n === 1) return lv.world === "clock-town" || !!p.levels["ct-2"];
  const prev = LEVELS[i - 1];
  return !!p.levels[prev.id];
}
export function applyRace(p: RProgress, levelId: string, family: QuestionFamily, s: RaceSummary): { next: RProgress; stars: number; newSticker: string | null } {
  const stars = starsFor(s);
  const prev = p.levels[levelId];
  const skills = { ...p.skills };
  for (const [k, v] of Object.entries(s.concepts)) {
    const o = skills[k] || { a: 0, c: 0 };
    skills[k] = { a: o.a + v.a, c: o.c + v.c };
  }
  const newSticker = stars === 3 && !p.stickers.includes(levelId) ? levelId : null;
  const next: RProgress = {
    ...p,
    coins: p.coins + s.coins,
    trophies: p.trophies + (s.position === 1 ? 1 : 0),
    levels: { ...p.levels, [levelId]: { stars: Math.max(prev?.stars || 0, stars), best: Math.min(prev?.best || 9, s.position), plays: (prev?.plays || 0) + 1 } },
    stickers: newSticker ? [...p.stickers, newSticker] : p.stickers,
    difficulty: { ...p.difficulty, [family]: s.levelEnd },
    skills,
  };
  return { next, stars, newSticker };
}
export function accuracy(p: RProgress): number {
  const v = Object.values(p.skills);
  const a = v.reduce((x, s) => x + s.a, 0), c = v.reduce((x, s) => x + s.c, 0);
  return a ? c / a : 0.7;
}

interface Store {
  p: RProgress;
  update: (fn: (p: RProgress) => RProgress) => void;
  t: (m: Msg | string, mode?: Mode) => string;
  lang: Lang;
}
const Ctx = createContext<Store | null>(null);
export const useR = () => useContext(Ctx)!;

export async function loadRacers(): Promise<RProgress> {
  const lang: Lang = hub.lang() ?? (/^id|^ms/i.test(navigator.language) ? "id" : "en");
  return migrate(await load(KEY), lang);
}

export function RacersProvider({ initial, children }: { initial: RProgress; children: ReactNode }) {
  const [p, setP] = useState(initial);
  const timer = useRef<number>();
  const update = useCallback((fn: (p: RProgress) => RProgress) => setP(fn), []);
  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = window.setTimeout(() => save(KEY, p), 250);
  }, [p]);
  useEffect(() => {
    const f = () => save(KEY, p);
    window.addEventListener("pagehide", f);
    return () => window.removeEventListener("pagehide", f);
  }, [p]);
  const lang = p.settings.lang;
  useEffect(() => {
    document.documentElement.lang = lang;
    hub.setLang(lang);
    setAudioPrefs({ lang, voice: p.settings.voice, sfx: p.settings.sound, music: p.settings.music });
  }, [lang, p.settings.voice, p.settings.sound, p.settings.music]);
  const t = useCallback((m: Msg | string, mode?: Mode) => tr(m, lang, mode), [lang]);
  const v = useMemo(() => ({ p, update, t, lang }), [p, update, t, lang]);
  return <Ctx.Provider value={v}>{children}</Ctx.Provider>;
}
