/**
 * Progress model + pure reducers. Persistence lives in platform/storage.ts;
 * this file only knows the shape and the rules (stars, levels, rewards).
 */
import type { Level, Skill, WorldId } from "./types";
import type { SessionResult } from "./session";
import type { Lang } from "../i18n/types";

export interface ActivityProgress {
  stars: number; // best 0..3
  plays: number;
  level: Level; // difficulty to start at next time
  last?: string; // YYYY-MM-DD
}
export interface SkillStat {
  a: number; // attempts
  c: number; // first-try correct
}
export interface Settings {
  lang: Lang;
  voice: boolean;
  sfx: boolean;
  music: boolean;
  theme: "auto" | "light" | "dark";
  bigText: boolean;
}
export interface LogEntry {
  id: string;
  date: string;
  stars: number;
  c: number;
  n: number;
  ms: number;
}
export interface Progress {
  v: 1;
  activities: Record<string, ActivityProgress>;
  skills: Partial<Record<Skill, SkillStat>>;
  stickers: string[];
  newStickers: string[];
  env: string;
  daily: { date: string; id: string; done: boolean };
  bonusStars: number;
  log: LogEntry[];
  settings: Settings;
  tutorialsSeen: string[];
}

export function defaultProgress(lang: Lang = "id"): Progress {
  return {
    v: 1,
    activities: {},
    skills: {},
    stickers: [],
    newStickers: [],
    env: "meadow",
    daily: { date: "", id: "", done: false },
    bonusStars: 0,
    log: [],
    settings: { lang, voice: true, sfx: true, music: false, theme: "auto", bigText: false },
    tutorialsSeen: [],
  };
}

/** Repair anything missing / corrupt from older or hand-edited saves. */
export function migrate(raw: unknown, lang: Lang = "id"): Progress {
  const d = defaultProgress(lang);
  if (!raw || typeof raw !== "object") return d;
  const r = raw as Partial<Progress>;
  return {
    ...d,
    ...r,
    v: 1,
    activities: { ...(r.activities || {}) },
    skills: { ...(r.skills || {}) },
    stickers: Array.isArray(r.stickers) ? r.stickers : [],
    newStickers: Array.isArray(r.newStickers) ? r.newStickers : [],
    log: Array.isArray(r.log) ? r.log.slice(-100) : [],
    settings: { ...d.settings, ...(r.settings || {}) },
    daily: { ...d.daily, ...(r.daily || {}) },
    tutorialsSeen: Array.isArray(r.tutorialsSeen) ? r.tutorialsSeen : [],
  };
}

export const todayStr = (d = new Date()) =>
  d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");

export function totalStars(p: Progress): number {
  return Object.values(p.activities).reduce((s, a) => s + (a.stars || 0), 0) + (p.bonusStars || 0);
}

/** Apply a finished session. Returns the new state (immutable). */
export function applyResult(p: Progress, r: SessionResult, date = todayStr()): Progress {
  const prev = p.activities[r.activityId] || { stars: 0, plays: 0, level: 1 as Level };
  const skills = { ...p.skills };
  for (const a of r.attempts) {
    const s = skills[a.skill] || { a: 0, c: 0 };
    skills[a.skill] = { a: s.a + 1, c: s.c + (a.correctFirstTry ? 1 : 0) };
  }
  const next: Progress = {
    ...p,
    activities: {
      ...p.activities,
      [r.activityId]: { stars: Math.max(prev.stars, r.stars), plays: prev.plays + 1, level: r.levelEnd, last: date },
    },
    skills,
    log: [...p.log, { id: r.activityId, date, stars: r.stars, c: r.correctFirstTry, n: r.total, ms: r.ms }].slice(-100),
  };
  if (p.daily.date === date && p.daily.id === r.activityId && !p.daily.done) {
    next.daily = { ...p.daily, done: true };
    next.bonusStars = (p.bonusStars || 0) + 1;
  }
  return next;
}

/* ------------------------------ learner level ------------------------------ */
export const LEVEL_AT = [0, 4, 10, 18, 28, 40, 54, 70, 84];
export function learnerLevel(stars: number): { level: number; from: number; to: number } {
  let i = 0;
  while (i + 1 < LEVEL_AT.length && stars >= LEVEL_AT[i + 1]) i++;
  const to = LEVEL_AT[i + 1] ?? LEVEL_AT[i];
  return { level: i + 1, from: LEVEL_AT[i], to };
}

/* --------------------------- strengths / practice --------------------------- */
export function skillReport(p: Progress): { strong: Skill[]; practice: Skill[] } {
  const strong: Skill[] = [], practice: Skill[] = [];
  for (const [k, s] of Object.entries(p.skills) as [Skill, SkillStat][]) {
    if (!s || s.a < 3) continue;
    const r = s.c / s.a;
    if (r >= 0.8) strong.push(k);
    else if (r < 0.6) practice.push(k);
  }
  return { strong, practice };
}

export function worldStars(p: Progress, ids: string[]): { got: number; max: number; done: number } {
  let got = 0, done = 0;
  for (const id of ids) {
    const s = p.activities[id]?.stars || 0;
    got += s;
    if (s > 0) done++;
  }
  return { got, max: ids.length * 3, done };
}

export type { WorldId };
