import type { Msg } from "../i18n/types";
import type { Rng } from "./rng";
import type { DayPart } from "./time";

export type WorldId = "clock" | "calendar" | "routine" | "challenge";
export type Level = 1 | 2 | 3;

export type Skill =
  | "clock-parts" | "clock-numbers" | "hour-hand" | "minute-hand" | "set-time"
  | "read-oclock" | "read-half" | "read-quarter" | "read-five" | "analog-digital"
  | "days-order" | "weekend" | "yesterday-tomorrow" | "dates" | "months" | "countdown"
  | "routine-order" | "routine-time" | "day-parts"
  | "duration-feel" | "duration-compare" | "first-next" | "elapsed";

/** Pose ids are the keys of src/characters/asset-meta.json */
export type PoseId = string;

/** Anything a question can show: rendered by ui/Visual.tsx */
export type Visual =
  | { v: "clock"; t: number; digital?: boolean }
  | { v: "digital"; t: number }
  | { v: "time-words"; t: number }
  | { v: "day"; d: number; tag?: "today" }
  | { v: "month"; m: number }
  | { v: "number"; n: number; unit?: "hours" | "minutes" | "days" }
  | { v: "duration"; min: number }
  | { v: "card"; id: string }
  | { v: "part"; part: DayPart }
  | { v: "week"; today: number; ask?: "tomorrow" | "yesterday" | "after-tomorrow" | "before-yesterday" }
  | { v: "months-row"; missing: number[] }
  | { v: "two-clocks"; a: number; b: number; aCard?: string; bCard?: string; arc?: boolean }
  | { v: "story"; card: string; t?: number };

export interface Option {
  id: string;
  visual: Visual;
}

export type ClockPart = "numbers" | "hour" | "minute" | "center";

interface QBase {
  skill: Skill;
  prompt: Msg;
  /** gentle explanation shown + spoken after a mistake */
  hint: Msg;
  /** pose Mo uses while asking (defaults per type) */
  pose?: PoseId;
}

export type Question =
  | (QBase & { type: "choice"; stimulus?: Visual; options: Option[]; answer: string; reveal?: Msg })
  | (QBase & {
      type: "set-clock"; start: number; target: number; check: "full" | "minute" | "hour";
      step: number; lock?: "hour" | "minute"; showDigital: boolean; stimulus?: Visual;
    })
  | (QBase & { type: "sequence"; items: Option[]; shuffled: string[] })
  | (QBase & { type: "sort"; bins: Option[]; items: (Option & { bin: string })[] })
  | (QBase & { type: "clock-tap"; part: ClockPart; t: number; explain: Msg })
  | (QBase & { type: "clock-numbers"; mode: "order" | "find"; target?: number })
  | (QBase & { type: "calendar-tap"; y: number; m: number; target: number; today?: number })
  | (QBase & { type: "calendar-fill"; y: number; m: number; missing: number[] })
  | (QBase & { type: "countdown"; y: number; m: number; today: number; eventDay: number; card: string })
  | (QBase & { type: "day-explorer"; card: string; from: number; to: number })
  | (QBase & { type: "timer"; mode: "estimate" | "pop" | "tidy"; seconds: number });

export type QuestionType = Question["type"];

export interface GenCtx {
  rng: Rng;
  level: Level;
  /** 0-based index of this question in the session */
  index: number;
  /** today's real date, so calendar games can use it (injectable for tests) */
  now: Date;
}

export interface TutorialStep {
  say: Msg;
  pose: PoseId;
  /** optional little demo the UI plays while Mo speaks */
  demo?: { v: "clock"; from: number; to: number } | Visual;
}

export interface ActivityDef {
  id: string;
  world: WorldId;
  title: string;
  goal: string;
  pose: PoseId;
  tutorial: TutorialStep[];
  rounds: number;
  skills: Skill[];
  startLevel?: Level;
  gen: (ctx: GenCtx) => Question;
}

export interface WorldDef {
  id: WorldId;
  title: string;
  tagline: string;
  pose: PoseId;
  friend?: PoseId;
  color: string;
  scene: "town" | "calendar" | "home" | "park";
}
