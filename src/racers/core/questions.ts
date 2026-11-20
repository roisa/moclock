/**
 * Race questions, generated (never a fixed list) from a question family and a
 * difficulty. Pure data: text is Msg keys, times are minutes, so the same
 * engine is testable and works in any language.
 *
 * The distractors reuse Time Adventure's teaching distractors (hands swapped,
 * hour off by one, same hour other mark) from src/engine/generators.ts.
 */
import { msg, type Msg } from "../../i18n/types";
import { int, pick, sample, shuffle, type Rng } from "../../engine/rng";
import { digital, hourOf, make, minuteOf } from "../../engine/time";
import { timeDistractors } from "../../engine/generators";
import type { QuestionFamily } from "../content/levels";

export type QVisual =
  | { kind: "clock"; t: number; lit?: number[]; hands?: boolean }
  | { kind: "digital"; t: number }
  | { kind: "days"; days: (number | null)[] } // null = the "?" slot
  | { kind: "months"; months: (number | null)[] };

export type QOption =
  | { kind: "time"; t: number } // shown as a digital time "3:00"
  | { kind: "face"; t: number } // shown as a small analog clock
  | { kind: "number"; n: number }
  | { kind: "day"; d: number }
  | { kind: "month"; m: number };

export interface RaceQuestion {
  id: string;
  family: QuestionFamily;
  concept: string;
  difficulty: number; // 1..3
  prompt: Msg;
  visual: QVisual;
  options: QOption[];
  answer: number; // index into options
  explain: Msg; // gentle explanation after a wrong answer
  learned?: string; // short label for the results "You learned…" list (e.g. "3:00")
}

let counter = 0;
function finish(rng: Rng, q: Omit<RaceQuestion, "options" | "answer" | "id">, correct: QOption, wrong: QOption[]): RaceQuestion {
  const all = shuffle(rng, [correct, ...wrong]);
  return { ...q, id: q.family + "-" + ++counter, options: all, answer: all.indexOf(correct) };
}
const POOLS: Record<string, number[]> = {
  oclock: [0], half: [30], quarter: [15, 45], five: [5, 10, 20, 25, 35, 40, 50, 55],
};

export function makeQuestion(family: QuestionFamily, rng: Rng, difficulty: number, n: number, index: number): RaceQuestion {
  const d = Math.max(1, Math.min(3, difficulty));
  switch (family) {
    case "numbers": {
      const max = d === 1 ? 6 : 12;
      const target = int(rng, 1, max);
      const wrong = sample(rng, Array.from({ length: 12 }, (_, i) => i + 1).filter((x) => x !== target), n - 1);
      return finish(rng, { family, concept: "clock-numbers", difficulty: d, prompt: msg("rq.glow"), visual: { kind: "clock", t: 0, lit: [target], hands: false },
        explain: msg("rx.glow", { n: { num: target } }), learned: String(target) }, { kind: "number", n: target }, wrong.map((x) => ({ kind: "number", n: x })));
    }
    case "hour-hand": {
      const t = make(int(rng, 1, 12), 0);
      const h = hourOf(t);
      const wrong = shuffle(rng, [h === 12 ? 1 : h + 1, h === 1 ? 12 : h - 1, ((h + 5) % 12) + 1, ((h + 8) % 12) + 1]).filter((x, i, a) => x !== h && a.indexOf(x) === i).slice(0, n - 1);
      return finish(rng, { family, concept: "hour-hand", difficulty: d, prompt: msg("rq.shortHand"), visual: { kind: "clock", t },
        explain: msg("rx.shortHand", { n: { num: h } }), learned: digital(t) }, { kind: "number", n: h }, wrong.map((x) => ({ kind: "number", n: x })));
    }
    case "oclock": case "half": case "quarter": case "five": case "grand-prix": {
      let pool: number[];
      if (family === "grand-prix") pool = [[0], [30], [15, 45], POOLS.five][Math.min(3, Math.floor(index / 2))];
      else pool = d === 1 && family !== "oclock" ? [...POOLS[family], 0] : POOLS[family];
      const t = make(int(rng, 1, 12), pick(rng, pool));
      const distractPool = family === "grand-prix" || d >= 3 ? [0, 15, 30, 45, ...POOLS.five] : pool.length > 1 ? pool : [0, 30];
      const wrong = timeDistractors(rng, t, n - 1, distractPool);
      const reverse = family === "grand-prix" && index % 3 === 2;
      return finish(rng, {
        family, concept: minuteOf(t) === 0 ? "full-hour" : minuteOf(t) === 30 ? "half-past" : minuteOf(t) % 15 === 0 ? "quarter" : "five-minutes",
        difficulty: d,
        prompt: reverse ? msg("rq.whichClock", { t: { time: t, style: "digital" } }) : msg("rq.whatTime"),
        visual: reverse ? { kind: "digital", t } : { kind: "clock", t },
        explain: msg("rx.time", { t: { time: t } }), learned: digital(t),
      }, reverse ? { kind: "face", t } : { kind: "time", t }, wrong.map((x) => (reverse ? { kind: "face", t: x } : { kind: "time", t: x })));
    }
    case "day-next": case "day-before": {
      const x = int(rng, 0, 6);
      const next = family === "day-next";
      const ans = (x + (next ? 1 : -1) + 7) % 7;
      const wrong = shuffle(rng, [(x + (next ? -1 : 1) + 7) % 7, x, (x + 3) % 7, (ans + 2) % 7]).filter((v, i, a) => v !== ans && a.indexOf(v) === i).slice(0, n - 1);
      const days = next ? [(x + 5) % 7, (x + 6) % 7, x, null] : [null, x, (x + 1) % 7, (x + 2) % 7];
      return finish(rng, { family, concept: next ? "day-after" : "day-before", difficulty: d,
        prompt: msg(next ? "rq.dayAfter" : "rq.dayBefore", { d: { day: x } }), visual: { kind: "days", days },
        explain: msg(next ? "rx.dayAfter" : "rx.dayBefore", { d: { day: x }, a: { day: ans } }) }, { kind: "day", d: ans }, wrong.map((v) => ({ kind: "day", d: v })));
    }
    case "weekend": {
      const ans = pick(rng, [5, 6]);
      const wrong = sample(rng, [0, 1, 2, 3, 4], n - 1);
      return finish(rng, { family, concept: "weekend", difficulty: d, prompt: msg("rq.weekend"), visual: { kind: "days", days: [0, 1, 2, 3, 4, null, null] },
        explain: msg("rx.weekend") }, { kind: "day", d: ans }, wrong.map((v) => ({ kind: "day", d: v })));
    }
    case "month-next": {
      const m = int(rng, 0, 11), ans = (m + 1) % 12;
      const wrong = shuffle(rng, [(m + 11) % 12, (m + 2) % 12, m, (m + 6) % 12]).filter((v, i, a) => v !== ans && a.indexOf(v) === i).slice(0, n - 1);
      return finish(rng, { family, concept: "months", difficulty: d, prompt: msg("rq.monthAfter", { m: { month: m } }), visual: { kind: "months", months: [(m + 10) % 12, (m + 11) % 12, m, null] },
        explain: msg("rx.monthAfter", { m: { month: m }, a: { month: ans } }) }, { kind: "month", m: ans }, wrong.map((v) => ({ kind: "month", m: v })));
    }
  }
}

/** 4 answers for quiz panels, 3 for lane gates (one per lane). */
export const optionCount = (gateKind: "question" | "choice-gates") => (gateKind === "choice-gates" ? 3 : 4);
