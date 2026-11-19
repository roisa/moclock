/**
 * Picture cards used across the routine, duration and "what happens first" games.
 * Each card = a real Baby Mo family pose + a label key (dict "card.<id>").
 * time   = typical minutes since midnight (Mo's day)
 * window = the part of Mo's day the activity covers, for the Day Explorer
 * sec    = roughly how long it takes, for "which takes longer?"
 */
import type { DayPart } from "../engine/time";
import type { PoseId } from "../engine/types";

export interface Card {
  id: string;
  pose: PoseId;
  time?: number;
  window?: [number, number];
  part?: DayPart;
  sec?: number;
  /** render-2 art: show upper body only (CLAUDE.md rule 2) */
  crop?: "upper";
}

const H = (h: number, m = 0) => h * 60 + m;

export const CARDS: Record<string, Card> = {
  wake:      { id: "wake", pose: "mo-pj", time: H(6), window: [H(5, 30), H(6, 10)], part: "morning", sec: 60 },
  pray:      { id: "pray", pose: "mo-pray", time: H(5), part: "morning", sec: 600 },
  brush:     { id: "brush", pose: "mo-brush", time: H(6, 15), window: [H(6, 10), H(6, 30)], part: "morning", sec: 120 },
  breakfast: { id: "breakfast", pose: "mo2-meal", crop: "upper", time: H(6, 30), window: [H(6, 30), H(7)], part: "morning", sec: 900 },
  shoes:     { id: "shoes", pose: "mo2-tie-shoe", crop: "upper", time: H(6, 50), part: "morning", sec: 60 },
  school:    { id: "school", pose: "mo2-school", crop: "upper", time: H(7), window: [H(7), H(12)], part: "morning", sec: 600 },
  learn:     { id: "learn", pose: "mo2-read", crop: "upper", time: H(9), part: "morning", sec: 1200 },
  lunch:     { id: "lunch", pose: "mo-dinner", time: H(12, 30), window: [H(12), H(13)], part: "afternoon", sec: 900 },
  nap:       { id: "nap", pose: "ais-sleep", time: H(13, 30), window: [H(13), H(15)], part: "afternoon", sec: 3600 },
  snack:     { id: "snack", pose: "ais-snack", time: H(15, 30), window: [H(15), H(16)], part: "afternoon", sec: 300 },
  play:      { id: "play", pose: "mo-jump", time: H(16), window: [H(16), H(17, 30)], part: "afternoon", sec: 1800 },
  tennis:    { id: "tennis", pose: "adam-swing", time: H(16), part: "afternoon", sec: 3600 },
  garden:    { id: "garden", pose: "ais-water", time: H(16, 30), part: "afternoon", sec: 600 },
  dinner:    { id: "dinner", pose: "mo-dinner", time: H(18, 30), window: [H(18), H(19)], part: "evening", sec: 1200 },
  pyjamas:   { id: "pyjamas", pose: "mo-pj-top", time: H(19, 30), window: [H(19), H(20)], part: "night", sec: 120 },
  sleep:     { id: "sleep", pose: "mo-sleepy", time: H(20), window: [H(20), H(24) + H(5, 30)], part: "night", sec: 36000 },
  // duration-only cards
  blink:     { id: "blink", pose: "mo-wonder", sec: 1 },
  clap:      { id: "clap", pose: "mo-yes", sec: 3 },
  jump:      { id: "jump", pose: "mo-yeyy", sec: 5 },
  hug:       { id: "hug", pose: "umi-welcome", sec: 5 },
  walk:      { id: "walk", pose: "mo-walk", sec: 600 },
  grow:      { id: "grow", pose: "ais-sprout", sec: 7 * 24 * 3600 },
  // garden story (what happens first)
  seed:      { id: "seed", pose: "ais-seed" },
  water:     { id: "water", pose: "ais-water" },
  sprout:    { id: "sprout", pose: "ais-sprout" },
  harvest:   { id: "harvest", pose: "ais-pick" },
  // Kak Adam's tennis story
  ready:     { id: "ready", pose: "adam-ball" },
  hit:       { id: "hit", pose: "adam-swing" },
  win:       { id: "win", pose: "adam-win" },
  // Ais's night
  yawn:      { id: "yawn", pose: "ais-yawn" },
  aisSleep:  { id: "aisSleep", pose: "ais-sleep" },
  aisWake:   { id: "aisWake", pose: "ais-wake" },
  // countdown events
  birthday:  { id: "birthday", pose: "ais-gift" },
  grandma:   { id: "grandma", pose: "umi-welcome" },
  trip:      { id: "trip", pose: "mo2-school", crop: "upper" },
  match:     { id: "match", pose: "adam-ball" },
};

/** Mo's day, in order: the backbone of the routine games. */
export const DAY_ORDER = ["wake", "brush", "breakfast", "school", "lunch", "play", "dinner", "pyjamas", "sleep"];
export const MORNING_ORDER = ["wake", "brush", "breakfast", "shoes", "school"];

/** Stories with one clear order (used by "what happens first?"). */
export const STORIES: string[][] = [
  ["seed", "water", "sprout", "harvest"],
  ["wake", "brush", "breakfast", "school"],
  ["ready", "hit", "win"],
  ["dinner", "pyjamas", "sleep"],
  ["yawn", "aisSleep", "aisWake"],
];

/** Things that are clearly day or night, and their part of the day */
export const SORTABLE = ["wake", "pray", "brush", "breakfast", "school", "lunch", "snack", "play", "garden", "dinner", "pyjamas", "sleep"];

export const DURATION_CARDS = ["blink", "clap", "jump", "hug", "brush", "shoes", "breakfast", "walk", "dinner", "tennis", "sleep", "grow"];

export const EVENTS = ["birthday", "grandma", "trip", "match"];
