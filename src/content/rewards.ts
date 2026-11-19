/**
 * Rewards: stickers (earned by learning milestones, never by grinding),
 * world badges and unlockable home-screen environments.
 */
import { ACTIVITIES, activitiesOf } from "./activities";
import { totalStars, worldStars, type Progress } from "../engine/progress";
import { seeded } from "../engine/rng";

export interface Sticker {
  id: string;
  pose: string;
  title: string; // dict key
  how: string; // dict key, how to earn it
  bg: string; // CSS colour token name
  earned: (p: Progress) => boolean;
}

const played = (p: Progress, id: string) => (p.activities[id]?.stars || 0) > 0;
const worldDone = (p: Progress, w: string) => activitiesOf(w).every((a) => played(p, a.id));

export const STICKERS: Sticker[] = [
  { id: "first-tick", pose: "mo-wave", title: "st.first", how: "st.first.how", bg: "green", earned: (p) => Object.keys(p.activities).length > 0 },
  { id: "hand-hero", pose: "mo-point", title: "st.hands", how: "st.hands.how", bg: "yellow", earned: (p) => played(p, "hour-hand") && played(p, "minute-hand") },
  { id: "half-past", pose: "mo-giggle", title: "st.half", how: "st.half.how", bg: "orange", earned: (p) => (p.activities["half-past"]?.stars || 0) >= 2 },
  { id: "clock-master", pose: "mo-yeyy", title: "st.clockMaster", how: "st.clockMaster.how", bg: "green", earned: (p) => worldDone(p, "clock") },
  { id: "week-wizard", pose: "ais-cheer", title: "st.week", how: "st.week.how", bg: "blue", earned: (p) => (p.activities["arrange-days"]?.stars || 0) >= 2 },
  { id: "calendar-star", pose: "ais-gift", title: "st.calendar", how: "st.calendar.how", bg: "pink", earned: (p) => worldDone(p, "calendar") },
  { id: "early-bird", pose: "mo-pj", title: "st.early", how: "st.early.how", bg: "yellow", earned: (p) => played(p, "morning") },
  { id: "routine-pro", pose: "mo2-checklist", title: "st.routine", how: "st.routine.how", bg: "orange", earned: (p) => worldDone(p, "routine") },
  { id: "speedy", pose: "mo-run", title: "st.speedy", how: "st.speedy.how", bg: "lavender", earned: (p) => played(p, "one-minute") },
  { id: "time-champ", pose: "adam-win", title: "st.champ", how: "st.champ.how", bg: "blue", earned: (p) => worldDone(p, "challenge") },
  { id: "daily-3", pose: "mo-thumbs", title: "st.daily", how: "st.daily.how", bg: "green", earned: (p) => (p.bonusStars || 0) >= 3 },
  { id: "family", pose: "abi-wave", title: "st.family", how: "st.family.how", bg: "pink", earned: (p) => totalStars(p) >= 60 },
];

export function newlyEarned(p: Progress): string[] {
  return STICKERS.filter((s) => !p.stickers.includes(s.id) && s.earned(p)).map((s) => s.id);
}

export interface Environment {
  id: string;
  title: string;
  stars: number; // stars needed
  sky: [string, string];
  hill: [string, string];
}
export const ENVIRONMENTS: Environment[] = [
  { id: "meadow", title: "env.meadow", stars: 0, sky: ["#CFEFFF", "#FFF6E3"], hill: ["#8EDB7A", "#5BBE5A"] },
  { id: "sunset", title: "env.sunset", stars: 12, sky: ["#FFD6A8", "#FFE9F0"], hill: ["#F4B26B", "#E58F4E"] },
  { id: "lavender", title: "env.lavender", stars: 25, sky: ["#E2D9FF", "#FDF4FF"], hill: ["#B9A6F2", "#9583DA"] },
  { id: "night", title: "env.night", stars: 40, sky: ["#2B3A78", "#5B4E9A"], hill: ["#3E7D5A", "#2C5F45"] },
  { id: "beach", title: "env.beach", stars: 60, sky: ["#BDEBFF", "#FFF7D6"], hill: ["#FFE1A1", "#F6C978"] },
];

export const WORLD_IDS = ["clock", "calendar", "routine", "challenge"] as const;
export function badges(p: Progress): { world: string; got: number; max: number; done: number; total: number }[] {
  return WORLD_IDS.map((w) => {
    const ids = activitiesOf(w).map((a) => a.id);
    return { world: w, ...worldStars(p, ids), total: ids.length };
  });
}

/**
 * Today's mission: the same all day (seeded by date), preferring the next
 * activity not yet played, then something that needs practice.
 */
export function dailyMission(p: Progress, date: string): string {
  const unplayed = ACTIVITIES.filter((a) => !played(p, a.id));
  const weak = ACTIVITIES.filter((a) => played(p, a.id) && (p.activities[a.id]?.stars || 0) < 3);
  const rng = seeded("time-adventure|" + date);
  if (unplayed.length) {
    // the first unplayed of a world, so missions follow the learning path
    const firsts = ["clock", "calendar", "routine", "challenge"]
      .map((w) => unplayed.find((a) => a.world === w))
      .filter(Boolean) as typeof ACTIVITIES;
    return firsts[Math.floor(rng() * firsts.length)].id;
  }
  const pool = weak.length ? weak : ACTIVITIES;
  return pool[Math.floor(rng() * pool.length)].id;
}
