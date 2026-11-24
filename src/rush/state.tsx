/** ProgressionManager: Time Rush progress + settings, saved on the device. */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { load, save, hub } from "../platform/storage";
import { setAudioPrefs } from "../platform/audio";
import { t as tr, type Mode } from "../i18n";
import type { Lang, Msg } from "../i18n/types";
import type { Stats } from "./core/sim";
import { praiseStars } from "./core/sim";

export const WORLDS = ["morning", "park", "play", "sunset", "dream"] as const;
export type WorldId = (typeof WORLDS)[number];
export const PLAYABLE: WorldId[] = ["morning"];

export interface Unlock { id: string; kind: "bike" | "helmet" | "bag"; cost: number; color: string }
export const UNLOCKS: Unlock[] = [
  { id: "green", kind: "bike", cost: 0, color: "#4cbf5a" },
  { id: "blue", kind: "bike", cost: 150, color: "#4aa8f0" },
  { id: "yellow", kind: "bike", cost: 300, color: "#ffc928" },
  { id: "pink", kind: "bike", cost: 500, color: "#ff8fbf" },
  { id: "lavender", kind: "bike", cost: 750, color: "#a98ef0" },
  { id: "rainbow", kind: "bike", cost: 1000, color: "rainbow" },
  { id: "white", kind: "helmet", cost: 0, color: "#ffffff" },
  { id: "blue", kind: "helmet", cost: 200, color: "#7fcaff" },
  { id: "yellow", kind: "helmet", cost: 400, color: "#ffd23f" },
  { id: "mint", kind: "helmet", cost: 650, color: "#9be8c8" },
  { id: "yellow", kind: "bag", cost: 0, color: "#ffd23f" },
  { id: "blue", kind: "bag", cost: 250, color: "#7fcaff" },
  { id: "pink", kind: "bag", cost: 550, color: "#ff9ec4" },
];

export interface WorldResult { praise: number; best: number; plays: number }
export interface RushProgress {
  v: 1;
  stars: number; // lifetime, never spent
  worlds: Partial<Record<WorldId, WorldResult>>;
  tokens: string[];
  seen: number[]; // clock-balloon times collected
  equip: { bike: string; helmet: string; bag: string };
  seenUnlocks: string[]; // unlocks already celebrated
  onboarded: boolean;
  settings: { lang: Lang; sound: boolean; voice: boolean; music: boolean; reduced: boolean; lefty: boolean; unlockAll: boolean };
}
const KEY = "rush";
export function defaults(lang: Lang): RushProgress {
  const reduced = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  return { v: 1, stars: 0, worlds: {}, tokens: [], seen: [], equip: { bike: "green", helmet: "white", bag: "yellow" }, seenUnlocks: [], onboarded: false,
    settings: { lang, sound: true, voice: true, music: false, reduced, lefty: false, unlockAll: false } };
}
function migrate(raw: unknown, lang: Lang): RushProgress {
  const d = defaults(lang);
  if (!raw || typeof raw !== "object") return d;
  const r = raw as Partial<RushProgress>;
  return { ...d, ...r, settings: { ...d.settings, ...(r.settings || {}) }, equip: { ...d.equip, ...(r.equip || {}) }, worlds: { ...(r.worlds || {}) } };
}
export const owned = (p: RushProgress, u: Unlock) => p.stars >= u.cost;
export const ukey = (u: Unlock) => u.kind + ":" + u.id;
export function isWorldOpen(p: RushProgress, w: WorldId) {
  const i = WORLDS.indexOf(w);
  if (!PLAYABLE.includes(w)) return false;
  return i === 0 || p.settings.unlockAll || !!p.worlds[WORLDS[i - 1]];
}

/** apply a finished ride; returns newly reached unlocks for the rewards screen */
export function applyRide(p: RushProgress, w: WorldId, s: Stats): { next: RushProgress; praise: number; fresh: Unlock[] } {
  const praise = praiseStars(s);
  const prev = p.worlds[w];
  const stars = p.stars + s.stars;
  const fresh = UNLOCKS.filter((u) => u.cost > 0 && u.cost <= stars && !p.seenUnlocks.includes(ukey(u)));
  const next: RushProgress = {
    ...p,
    stars,
    worlds: { ...p.worlds, [w]: { praise: Math.max(prev?.praise || 0, praise), best: Math.max(prev?.best || 0, s.stars), plays: (prev?.plays || 0) + 1 } },
    tokens: s.token && !p.tokens.includes("squirrel") ? [...p.tokens, "squirrel"] : p.tokens,
    seen: Array.from(new Set([...p.seen, ...s.balloons])).sort((a, b) => a - b),
    seenUnlocks: [...p.seenUnlocks, ...fresh.map(ukey)],
  };
  return { next, praise, fresh };
}

interface Store {
  p: RushProgress;
  update: (fn: (p: RushProgress) => RushProgress) => void;
  t: (m: Msg | string, mode?: Mode) => string;
  lang: Lang;
}
const Ctx = createContext<Store | null>(null);
export const useRush = () => useContext(Ctx)!;

export async function loadRush(): Promise<RushProgress> {
  const lang: Lang = hub.lang() ?? (/^id|^ms/i.test(navigator.language) ? "id" : "en");
  return migrate(await load(KEY), lang);
}

export function RushProvider({ initial, children }: { initial: RushProgress; children: ReactNode }) {
  const [p, setP] = useState(initial);
  const timer = useRef<number>();
  const update = useCallback((fn: (p: RushProgress) => RushProgress) => setP(fn), []);
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
