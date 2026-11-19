/**
 * One play-through of an activity: question flow, adaptive difficulty, scoring.
 * Never punishing: a wrong answer gives a hint and another try; the round still
 * completes; the child always earns at least one star for finishing.
 */
import type { ActivityDef, Level, Question, Skill } from "./types";
import { randomRng, type Rng } from "./rng";

export interface Attempt {
  skill: Skill;
  correctFirstTry: boolean;
  tries: number;
  ms: number;
}

export interface SessionResult {
  activityId: string;
  stars: 1 | 2 | 3;
  correctFirstTry: number;
  total: number;
  attempts: Attempt[];
  levelEnd: Level;
  ms: number;
}

export class Adaptive {
  level: Level;
  private streak = 0;
  private misses = 0;
  constructor(start: Level) {
    this.level = start;
  }
  /** 3 first-try answers in a row → harder; 2 questions needing help in a row → easier */
  record(firstTry: boolean): Level {
    if (firstTry) {
      this.streak++;
      this.misses = 0;
      if (this.streak >= 3 && this.level < 3) {
        this.level = (this.level + 1) as Level;
        this.streak = 0;
      }
    } else {
      this.misses++;
      this.streak = 0;
      if (this.misses >= 2 && this.level > 1) {
        this.level = (this.level - 1) as Level;
        this.misses = 0;
      }
    }
    return this.level;
  }
}

export function starsFor(firstTry: number, total: number): 1 | 2 | 3 {
  if (total <= 0) return 1;
  const r = firstTry / total;
  return r >= 0.8 ? 3 : r >= 0.5 ? 2 : 1;
}

export class GameSession {
  readonly def: ActivityDef;
  readonly adaptive: Adaptive;
  index = 0;
  question: Question;
  tries = 0;
  attempts: Attempt[] = [];
  private qStart = Date.now();
  private started = Date.now();
  private rng: Rng;
  private now: Date;

  constructor(def: ActivityDef, startLevel: Level, opts: { rng?: Rng; now?: Date } = {}) {
    this.def = def;
    this.adaptive = new Adaptive(startLevel);
    this.rng = opts.rng ?? randomRng();
    this.now = opts.now ?? new Date();
    this.question = this.make();
  }
  private make(): Question {
    return this.def.gen({ rng: this.rng, level: this.adaptive.level, index: this.index, now: this.now });
  }
  get done(): boolean {
    return this.index >= this.def.rounds;
  }
  get progress(): number {
    return this.index / this.def.rounds;
  }
  /** A wrong try: counted, nothing else happens (the UI shows the hint). */
  miss(): void {
    this.tries++;
  }
  /** The question is solved (eventually). Moves on. Returns true when the session is over. */
  solve(): boolean {
    const firstTry = this.tries === 0;
    this.attempts.push({ skill: this.question.skill, correctFirstTry: firstTry, tries: this.tries + 1, ms: Date.now() - this.qStart });
    this.adaptive.record(firstTry);
    this.index++;
    this.tries = 0;
    this.qStart = Date.now();
    if (!this.done) this.question = this.make();
    return this.done;
  }
  result(): SessionResult {
    const firstTry = this.attempts.filter((a) => a.correctFirstTry).length;
    return {
      activityId: this.def.id,
      stars: starsFor(firstTry, this.attempts.length),
      correctFirstTry: firstTry,
      total: this.attempts.length,
      attempts: this.attempts,
      levelEnd: this.adaptive.level,
      ms: Date.now() - this.started,
    };
  }
}
