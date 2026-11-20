/** Worlds and levels. Each level picks a question family from learn/questions.ts. */
export type QuestionFamily =
  | "numbers" | "hour-hand" | "oclock" | "half" | "quarter" | "five" | "grand-prix"
  | "day-next" | "day-before" | "weekend" | "month-next";

export interface LevelDef {
  id: string;
  world: string;
  n: number;
  title: string; // dict key
  family: QuestionFamily;
  laps: number;
  gates: number; // question gates per lap
  ai: number; // base AI skill (adapted to the child's learning level at race start)
  gateKind: "question" | "choice-gates";
}
export interface WorldDef {
  id: string;
  title: string;
  levels: string; // dict key: "Level 1–7"
  theme: "clock-town" | "day-valley";
  playable: boolean;
  unlockAfter?: string; // level id
}

export const WORLDS: WorldDef[] = [
  { id: "clock-town", title: "rw.clockTown", levels: "rw.levels.1", theme: "clock-town", playable: true },
  { id: "day-valley", title: "rw.dayValley", levels: "rw.levels.2", theme: "day-valley", playable: true, unlockAfter: "ct-2" },
  { id: "routine-city", title: "rw.routineCity", levels: "rw.levels.3", theme: "clock-town", playable: false },
  { id: "calendar-island", title: "rw.calendarIsland", levels: "rw.levels.4", theme: "day-valley", playable: false },
  { id: "time-challenge", title: "rw.timeChallenge", levels: "rw.levels.5", theme: "clock-town", playable: false },
];

const ct = (n: number, family: QuestionFamily, laps: number, ai: number): LevelDef =>
  ({ id: "ct-" + n, world: "clock-town", n, title: "rl.ct." + n, family, laps, gates: 2, ai, gateKind: "question" });
const dv = (n: number, family: QuestionFamily, ai: number): LevelDef =>
  ({ id: "dv-" + n, world: "day-valley", n, title: "rl.dv." + n, family, laps: 2, gates: 2, ai, gateKind: "choice-gates" });

export const LEVELS: LevelDef[] = [
  ct(1, "numbers", 2, 1.0),
  ct(2, "hour-hand", 2, 1.02),
  ct(3, "oclock", 3, 1.04),
  ct(4, "half", 3, 1.05),
  ct(5, "quarter", 3, 1.05),
  ct(6, "five", 3, 1.06),
  ct(7, "grand-prix", 3, 1.07),
  dv(1, "day-next", 1.02),
  dv(2, "day-before", 1.04),
  dv(3, "weekend", 1.05),
  dv(4, "month-next", 1.06),
];
export const levelById = (id: string) => LEVELS.find((l) => l.id === id);
export const levelsOf = (world: string) => LEVELS.filter((l) => l.world === world);
