/**
 * Question generators. Pure functions: (ctx) → Question. No UI, no strings —
 * every text is a Msg (dictionary key + params), so content stays language-free
 * and testable. Difficulty comes in as ctx.level (1 easy … 3 hard).
 */
import { msg } from "../i18n/types";
import { CARDS, DAY_ORDER, DURATION_CARDS, EVENTS, MORNING_ORDER, SORTABLE, STORIES } from "../content/cards";
import { int, pick, sample, shuffle, shuffleNotSorted, type Rng } from "./rng";
import { dayPart, hourOf, make, minuteOf, norm, type DayPart } from "./time";
import type { ClockPart, GenCtx, Level, Option, Question, Skill, Visual } from "./types";

/* ------------------------------------------------------------------ helpers */

const MINUTE_SKILL: Record<number, Skill> = { 0: "read-oclock", 30: "read-half", 15: "read-quarter", 45: "read-quarter" };
export const skillForTime = (t: number): Skill => MINUTE_SKILL[minuteOf(t)] ?? "read-five";

export function randomTime(rng: Rng, minutes: readonly number[]): number {
  return make(int(rng, 1, 12), pick(rng, minutes));
}

/**
 * Wrong answers that teach: the classic confusions first
 *  - hands swapped (3:00 read as 12:15)
 *  - the hour one off (half past 3 read as half past 4 — the hour hand is between 3 and 4)
 *  - same hour, other minute mark
 * then random fill from the same pool.
 */
export function timeDistractors(rng: Rng, t: number, n: number, minutes: readonly number[]): number[] {
  const h = hourOf(t), m = minuteOf(t);
  const first: number[] = [];
  const swapH = m === 0 ? 12 : m / 5;
  if (Number.isInteger(swapH) && (h * 5) % 60 !== m) first.push(make(swapH, (h * 5) % 60));
  if (m !== 0) first.push(make(h + 1, m));
  const rest: number[] = [make(h === 1 ? 12 : h - 1, m)];
  for (const mm of minutes) if (mm !== m) rest.push(make(h, mm));
  const out: number[] = [];
  for (const c of [...first, ...shuffle(rng, rest)]) {
    if (out.length >= n) break;
    if (c !== t && !out.includes(c) && minutes.includes(minuteOf(c))) out.push(c);
  }
  let guard = 0;
  while (out.length < n && guard++ < 200) {
    const c = randomTime(rng, minutes);
    if (c !== t && !out.includes(c)) out.push(c);
  }
  return out;
}

function options<T>(rng: Rng, correct: T, wrong: T[], toOpt: (x: T) => Visual): { options: Option[]; answer: string } {
  const all = shuffle(rng, [correct, ...wrong]);
  const options = all.map((x, i) => ({ id: "o" + i, visual: toOpt(x) }));
  return { options, answer: "o" + all.indexOf(correct) };
}

const nOpts = (level: Level) => (level === 1 ? 3 : 4);

/** "Short hand on 3, long hand on 12" or "Short hand between 3 and 4…" (never "near 3" for 3:45). */
export function makeTimeHint(t: number) {
  const h = hourOf(t);
  if (minuteOf(t) === 0) return msg("hint.makeTimeOn", { h: { num: h }, t: { time: t } });
  return msg("hint.makeTime", { h: { num: h }, h2: { num: h === 12 ? 1 : h + 1 }, t: { time: t } });
}

/* ------------------------------------------------------------- Clock Town */

const PARTS: ClockPart[] = ["numbers", "hour", "minute", "center"];
export const meetClock = (ctx: GenCtx): Question => {
  const part = PARTS[ctx.index % PARTS.length];
  return {
    type: "clock-tap", part, t: make(3, 0), skill: "clock-parts",
    prompt: msg("q.tapPart." + part), explain: msg("explain.part." + part), hint: msg("hint.part." + part),
    pose: "mo-point",
  };
};

export const clockNumbers = (ctx: GenCtx): Question => {
  if (ctx.index === 0) {
    return { type: "clock-numbers", mode: "order", skill: "clock-numbers", prompt: msg("q.numbersOrder"), hint: msg("hint.numbersOrder") };
  }
  const max = ctx.level === 1 ? 6 : 12;
  const target = int(ctx.rng, 1, max);
  return {
    type: "clock-numbers", mode: "find", target, skill: "clock-numbers",
    prompt: msg("q.findNumber", { n: { num: target } }), hint: msg("hint.findNumber", { n: { num: target } }),
  };
};

/** Short hand: minute stays on 12, the child moves the hour hand. */
export const hourHand = (ctx: GenCtx): Question => {
  const target = make(int(ctx.rng, 1, 12), 0);
  if (ctx.level >= 2 && ctx.index % 2 === 1) {
    const wrong = timeDistractors(ctx.rng, target, nOpts(ctx.level) - 1, [0]);
    return {
      type: "choice", skill: "hour-hand", stimulus: { v: "clock", t: target },
      prompt: msg("q.shortHandPoints"), hint: msg("hint.shortHand", { n: { num: hourOf(target) } }),
      ...options(ctx.rng, target, wrong, (t) => ({ v: "number", n: hourOf(t) })),
    };
  }
  let start = make(int(ctx.rng, 1, 12), 0);
  if (start === target) start = make(hourOf(target) + 3, 0);
  return {
    type: "set-clock", skill: "hour-hand", start, target, check: "hour", step: 60, lock: "minute", showDigital: ctx.level >= 2,
    prompt: msg("q.moveShort", { n: { num: hourOf(target) } }), hint: msg("hint.shortHand", { n: { num: hourOf(target) } }),
    pose: "mo-point",
  };
};

/** Long hand: the child moves the minute hand; the hour hand creeps along, as on a real clock. */
export const minuteHand = (ctx: GenCtx): Question => {
  const pool = ctx.level === 1 ? [0, 30] : ctx.level === 2 ? [0, 15, 30, 45] : [5, 10, 20, 25, 35, 40, 50, 55];
  const m = pick(ctx.rng, pool);
  const h = int(ctx.rng, 1, 11);
  const target = make(h, m);
  const start = make(h, m === 0 ? 30 : 0);
  const pos = m === 0 ? 12 : m / 5;
  return {
    type: "set-clock", skill: "minute-hand", start, target, check: "minute", step: ctx.level === 3 ? 5 : 15, lock: "hour", showDigital: true,
    prompt: msg("q.moveLong", { n: { num: pos }, m: { num: m } }), hint: msg("hint.longHand", { n: { num: pos }, m: { num: m } }),
    pose: "mo-point",
  };
};

export const moveHands = (ctx: GenCtx): Question => {
  const pool = ctx.level === 1 ? [0] : ctx.level === 2 ? [0, 30] : [0, 15, 30, 45];
  const target = randomTime(ctx.rng, pool);
  let start = randomTime(ctx.rng, pool);
  if (start === target) start = norm(target + 180);
  return {
    type: "set-clock", skill: "set-time", start, target, check: "full", step: ctx.level === 3 ? 15 : 30, showDigital: true,
    stimulus: { v: "digital", t: target },
    prompt: msg("q.makeTime", { t: { time: target } }), hint: makeTimeHint(target),
    pose: "mo-point",
  };
};

export const matchDigital = (ctx: GenCtx): Question => {
  const pool = ctx.level === 1 ? [0] : ctx.level === 2 ? [0, 30] : [0, 15, 30, 45];
  const t = randomTime(ctx.rng, pool);
  const wrong = timeDistractors(ctx.rng, t, nOpts(ctx.level) - 1, pool);
  if (ctx.index % 2 === 0) {
    return {
      type: "choice", skill: "analog-digital", stimulus: { v: "clock", t },
      prompt: msg("q.whichDigital"), hint: msg("hint.readClock", { t: { time: t } }),
      ...options(ctx.rng, t, wrong, (x) => ({ v: "digital", t: x })),
    };
  }
  return {
    type: "choice", skill: "analog-digital", stimulus: { v: "digital", t },
    prompt: msg("q.whichAnalog", { t: { time: t, style: "digital" } }), hint: msg("hint.readDigital", { t: { time: t } }),
    ...options(ctx.rng, t, wrong, (x) => ({ v: "clock", t: x })),
  };
};

/**
 * Reading & setting quiz for one family of times (o'clock / half / quarter / 5-min).
 * L1: read the clock, 3 picture-word answers. L2: + set the clock, 4 digital answers.
 * L3: mostly setting, finer snapping, analog answers.
 */
export const timeQuiz = (minutes: readonly number[], skill?: Skill) => (ctx: GenCtx): Question => {
  const t = randomTime(ctx.rng, minutes);
  const sk = skill ?? skillForTime(t);
  const kinds = ctx.level === 1 ? ["read", "read", "set"] : ctx.level === 2 ? ["read", "set", "match"] : ["set", "set", "match", "read"];
  const kind = kinds[ctx.index % kinds.length];
  if (kind === "set") {
    const step = ctx.level === 3 ? 5 : minutes.every((m) => m % 30 === 0) ? 30 : minutes.every((m) => m % 15 === 0) ? 15 : 5;
    let start = make(int(ctx.rng, 1, 12), 0);
    if (start === t) start = norm(t + 120);
    return {
      type: "set-clock", skill: sk, start, target: t, check: "full", step, showDigital: ctx.level < 3,
      prompt: msg("q.makeTime", { t: { time: t } }), hint: makeTimeHint(t),
      stimulus: { v: "time-words", t }, pose: "mo-point",
    };
  }
  const wrong = timeDistractors(ctx.rng, t, nOpts(ctx.level) - 1, minutes);
  if (kind === "match") {
    return {
      type: "choice", skill: sk, stimulus: { v: "time-words", t },
      prompt: msg("q.whichClockShows", { t: { time: t } }), hint: makeTimeHint(t),
      ...options(ctx.rng, t, wrong, (x) => ({ v: "clock", t: x })),
    };
  }
  return {
    type: "choice", skill: sk, stimulus: { v: "clock", t },
    prompt: msg("q.whatTime"), hint: msg("hint.readClock", { t: { time: t } }),
    ...options(ctx.rng, t, wrong, (x) => (ctx.level === 1 ? { v: "time-words", t: x } : { v: "digital", t: x })),
  };
};

export const clockChallenge = (ctx: GenCtx): Question => {
  const pools: number[][] = [[0], [30], [15, 45], [5, 10, 20, 25, 35, 40, 50, 55]];
  const pool = pools[Math.min(pools.length - 1, Math.floor(ctx.index / 2))];
  const all = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  const g = timeQuiz(ctx.level === 3 ? all : pool);
  return g({ ...ctx, level: ctx.index % 3 === 2 ? 3 : 2 });
};

/* ------------------------------------------------------- Days & Calendar */

export const arrangeDays = (ctx: GenCtx): Question => {
  const round = ctx.index % 3;
  if (round === 1) {
    const weekend = pick(ctx.rng, [5, 6]);
    const weekdays = sample(ctx.rng, [0, 1, 2, 3, 4], nOpts(ctx.level) - 1);
    return {
      type: "choice", skill: "weekend", prompt: msg("q.weekendDay"), hint: msg("hint.weekend"),
      reveal: msg("reveal.weekend"), pose: "mo-idea",
      ...options(ctx.rng, weekend, weekdays, (d) => ({ v: "day", d })),
    };
  }
  const len = round === 0 ? (ctx.level === 1 ? 3 : ctx.level === 2 ? 4 : 5) : 7;
  const start = len === 7 ? 0 : int(ctx.rng, 0, 7 - len);
  const days = Array.from({ length: len }, (_, i) => start + i);
  const items = days.map((d) => ({ id: "d" + d, visual: { v: "day", d } as Visual }));
  return {
    type: "sequence", skill: "days-order", items, shuffled: shuffleNotSorted(ctx.rng, items.map((i) => i.id)),
    prompt: msg(len === 7 ? "q.orderWeek" : "q.orderDays"), hint: msg("hint.orderDays", { d: { day: start } }),
  };
};

export const tomorrowGame = (ctx: GenCtx): Question => {
  const asks = ctx.level === 1 ? ["tomorrow"] : ctx.level === 2 ? ["tomorrow", "yesterday"] : ["tomorrow", "yesterday", "after-tomorrow", "before-yesterday"];
  const ask = asks[ctx.index % asks.length] as "tomorrow" | "yesterday" | "after-tomorrow" | "before-yesterday";
  const today = int(ctx.rng, 0, 6);
  const shift = { tomorrow: 1, yesterday: -1, "after-tomorrow": 2, "before-yesterday": -2 }[ask];
  const ans = (today + shift + 7) % 7;
  const wrongPool = [0, 1, 2, 3, 4, 5, 6].filter((d) => d !== ans);
  // most useful wrong answer: the opposite direction, and today itself
  const wrong = [(today - shift + 14) % 7, today].filter((d) => d !== ans);
  const extra = shuffle(ctx.rng, wrongPool).filter((d) => !wrong.includes(d));
  const w = [...new Set([...wrong, ...extra])].slice(0, nOpts(ctx.level) - 1);
  return {
    type: "choice", skill: "yesterday-tomorrow", stimulus: { v: "week", today, ask },
    prompt: msg("q.day." + ask, { d: { day: today } }), hint: msg("hint.day." + ask, { d: { day: today }, a: { day: ans } }),
    reveal: msg("reveal.day." + ask, { d: { day: today }, a: { day: ans } }),
    ...options(ctx.rng, ans, w, (d) => ({ v: "day", d })),
  };
};

export const findDate = (ctx: GenCtx): Question => {
  const y = ctx.now.getFullYear(), m = ctx.now.getMonth(), today = ctx.now.getDate();
  if (ctx.index === 0) {
    return {
      type: "calendar-tap", skill: "dates", y, m, target: today, today,
      prompt: msg("q.tapToday", { wd: { day: (ctx.now.getDay() + 6) % 7 }, date: { date: { y, m, d: today } } }), hint: msg("hint.today", { date: { date: { y, m, d: today } } }), pose: "mo-point",
    };
  }
  const days = new Date(y, m + 1, 0).getDate();
  const max = ctx.level === 1 ? 10 : ctx.level === 2 ? 20 : days;
  let target = int(ctx.rng, 1, max);
  if (target === today) target = target === 1 ? 2 : target - 1;
  return {
    type: "calendar-tap", skill: "dates", y, m, target, today,
    prompt: msg("q.tapDate", { n: { num: target } }), hint: msg("hint.tapDate", { n: { num: target } }), pose: "mo-point",
  };
};

export const calendarPuzzle = (ctx: GenCtx): Question => {
  const y = ctx.now.getFullYear();
  const m = (ctx.now.getMonth() + ctx.index) % 12;
  const days = new Date(y, m + 1, 0).getDate();
  const count = ctx.level === 1 ? 3 : ctx.level === 2 ? 4 : 6;
  const lo = ctx.level === 1 ? 1 : 1, hi = ctx.level === 1 ? 14 : days;
  const missing = sample(ctx.rng, Array.from({ length: hi - lo + 1 }, (_, i) => lo + i), count).sort((a, b) => a - b);
  return {
    type: "calendar-fill", skill: "dates", y, m, missing,
    prompt: msg("q.fillCalendar", { mo: { month: m } }), hint: msg("hint.fillCalendar"),
  };
};

export const countdown = (ctx: GenCtx): Question => {
  const y = ctx.now.getFullYear(), m = ctx.now.getMonth();
  const days = new Date(y, m + 1, 0).getDate();
  const span = ctx.level === 1 ? int(ctx.rng, 2, 4) : ctx.level === 2 ? int(ctx.rng, 4, 8) : int(ctx.rng, 7, 14);
  const today = int(ctx.rng, 1, Math.max(1, days - span));
  const eventDay = today + span;
  const card = EVENTS[ctx.index % EVENTS.length];
  return {
    type: "countdown", skill: "countdown", y, m, today, eventDay, card,
    prompt: msg("q.countdown." + card, { d: { ord: eventDay }, t: { ord: today } }), hint: msg("hint.countdown"),
  };
};

export const missingMonth = (ctx: GenCtx): Question => {
  const gap = ctx.level === 1 ? int(ctx.rng, 1, 4) : int(ctx.rng, 0, 11);
  if (ctx.level === 3 && ctx.index % 2 === 1) {
    const before = (gap + 11) % 12;
    const wrong = [(gap + 10) % 12, (gap + 1) % 12, int(ctx.rng, 0, 11)].filter((x, i, a) => x !== gap && a.indexOf(x) === i).slice(0, 3);
    return {
      type: "choice", skill: "months", prompt: msg("q.monthAfter", { mo: { month: before } }), hint: msg("hint.monthAfter", { mo: { month: before }, a: { month: gap } }),
      stimulus: { v: "month", m: before },
      ...options(ctx.rng, gap, wrong, (x) => ({ v: "month", m: x })),
    };
  }
  const near = [(gap + 1) % 12, (gap + 11) % 12, (gap + 2) % 12, (gap + 6) % 12];
  const wrong = (ctx.level === 1 ? shuffle(ctx.rng, [(gap + 5) % 12, (gap + 7) % 12, (gap + 9) % 12]) : shuffle(ctx.rng, near)).slice(0, nOpts(ctx.level) - 1);
  return {
    type: "choice", skill: "months", stimulus: { v: "months-row", missing: [gap] },
    prompt: msg("q.missingMonth"), hint: msg("hint.missingMonth", { b: { month: (gap + 11) % 12 }, a: { month: (gap + 1) % 12 } }),
    reveal: msg("reveal.month", { mo: { month: gap } }),
    ...options(ctx.rng, gap, wrong, (x) => ({ v: "month", m: x })),
  };
};

/* --------------------------------------------------------- Daily Routine */

const cardOpt = (id: string): Option => ({ id, visual: { v: "card", id } });

/** pick n cards from an ordered list, keeping their order */
function orderedSample(rng: Rng, list: readonly string[], n: number): string[] {
  const idx = sample(rng, list.map((_, i) => i), n).sort((a, b) => a - b);
  return idx.map((i) => list[i]);
}

export const dayExplorer = (ctx: GenCtx): Question => {
  const cards = ["breakfast", "school", "play", "dinner", "sleep", "brush", "lunch", "snack", "pyjamas", "wake"];
  const card = cards[(ctx.index + int(ctx.rng, 0, 1) * 5) % cards.length];
  const c = CARDS[card];
  const [from, to] = c.window!;
  return {
    type: "day-explorer", skill: "routine-time", card, from, to,
    prompt: msg("q.explore", { c: msg("card." + card) }), hint: msg("hint.explore." + c.part, { c: msg("card." + card) }),
  };
};

export const morningRoutine = (ctx: GenCtx): Question => {
  const n = ctx.level === 1 ? 3 : ctx.level === 2 ? 4 : 5;
  const ids = n === 5 ? MORNING_ORDER.slice() : orderedSample(ctx.rng, MORNING_ORDER.filter((x) => x !== "shoes"), n);
  return {
    type: "sequence", skill: "routine-order", items: ids.map(cardOpt), shuffled: shuffleNotSorted(ctx.rng, ids),
    prompt: msg("q.orderMorning"), hint: msg("hint.orderRoutine", { c: msg("card." + ids[0]) }),
  };
};

export const wholeDay = (ctx: GenCtx): Question => {
  const n = ctx.level === 1 ? 4 : ctx.level === 2 ? 5 : 6;
  const ids = orderedSample(ctx.rng, DAY_ORDER, n);
  return {
    type: "sequence", skill: "routine-order", items: ids.map(cardOpt), shuffled: shuffleNotSorted(ctx.rng, ids),
    prompt: msg("q.orderDay"), hint: msg("hint.orderRoutine", { c: msg("card." + ids[0]) }),
  };
};

export const routineTime = (ctx: GenCtx): Question => {
  const card = pick(ctx.rng, ["wake", "breakfast", "school", "lunch", "play", "dinner", "sleep", "snack", "pyjamas"]);
  const c = CARDS[card];
  const t = norm(c.time!);
  const pool = minuteOf(t) === 0 ? [0, 30] : [0, 15, 30, 45];
  if (ctx.level === 3 && ctx.index % 2 === 1) {
    return {
      type: "set-clock", skill: "routine-time", start: make(hourOf(t) + 4, 0), target: t, check: "full", step: 15, showDigital: true,
      stimulus: { v: "card", id: card }, prompt: msg("q.routineSet", { c: msg("card." + card), t: { time: t } }),
      hint: makeTimeHint(t), pose: "mo-point",
    };
  }
  const wrong = timeDistractors(ctx.rng, t, nOpts(ctx.level) - 1, pool);
  return {
    type: "choice", skill: "routine-time", stimulus: { v: "card", id: card },
    prompt: msg("q.routineWhich", { c: msg("card." + card), t: { time: t } }), hint: makeTimeHint(t),
    ...options(ctx.rng, t, wrong, (x) => ({ v: "clock", t: x })),
  };
};

export const sortDayParts = (ctx: GenCtx): Question => {
  const parts: DayPart[] = ctx.level === 1 ? ["morning", "night"] : ctx.level === 2 ? ["morning", "afternoon", "night"] : ["morning", "afternoon", "evening", "night"];
  const eligible = SORTABLE.filter((id) => parts.includes(CARDS[id].part!));
  // at least one card per bin
  const chosen: string[] = [];
  for (const p of parts) chosen.push(pick(ctx.rng, eligible.filter((id) => CARDS[id].part === p && !chosen.includes(id))));
  const want = ctx.level === 1 ? 4 : ctx.level === 2 ? 5 : 6;
  for (const id of shuffle(ctx.rng, eligible)) if (chosen.length < want && !chosen.includes(id)) chosen.push(id);
  return {
    type: "sort", skill: "day-parts", bins: parts.map((p) => ({ id: p, visual: { v: "part", part: p } })),
    items: shuffle(ctx.rng, chosen).map((id) => ({ ...cardOpt(id), bin: CARDS[id].part! })),
    prompt: msg("q.sortParts"), hint: msg("hint.sortParts"),
  };
};

/* --------------------------------------------------------- Time Challenge */

export const timerGame = (mode: "estimate" | "pop" | "tidy", seconds: number) => (ctx: GenCtx): Question => ({
  type: "timer", mode, seconds, skill: "duration-feel",
  prompt: msg("q.timer." + mode + (mode === "estimate" && ctx.index > 0 ? ".blind" : ""), { s: { num: seconds } }),
  hint: msg("hint.timer." + mode, { s: { num: seconds } }),
});

export const whichLonger = (ctx: GenCtx): Question => {
  const ratio = ctx.level === 1 ? 20 : ctx.level === 2 ? 5 : 2;
  let a = "", b = "", guard = 0;
  do {
    [a, b] = sample(ctx.rng, DURATION_CARDS, 2);
    const x = CARDS[a].sec!, y = CARDS[b].sec!;
    if (Math.max(x, y) / Math.min(x, y) >= ratio) break;
  } while (guard++ < 100);
  const longer = CARDS[a].sec! >= CARDS[b].sec! ? a : b;
  const shorter = longer === a ? b : a;
  const askShort = ctx.level >= 2 && ctx.index % 3 === 2;
  const ans = askShort ? shorter : longer;
  const opts = shuffle(ctx.rng, [a, b]);
  return {
    type: "choice", skill: "duration-compare",
    prompt: msg(askShort ? "q.shorter" : "q.longer"),
    hint: msg("hint.longer", { a: msg("card." + longer), b: msg("card." + shorter) }),
    reveal: msg("reveal.longer", { a: msg("card." + longer), b: msg("card." + shorter) }),
    options: opts.map((id) => cardOpt(id)), answer: ans,
  };
};

export const whatFirst = (ctx: GenCtx): Question => {
  const story = STORIES[(ctx.index + int(ctx.rng, 0, STORIES.length - 1)) % STORIES.length];
  if (ctx.level === 1) {
    const [x, y] = orderedSample(ctx.rng, story, 2);
    const opts = shuffle(ctx.rng, [x, y]);
    return {
      type: "choice", skill: "first-next", prompt: msg("q.whatFirst"), hint: msg("hint.whatFirst", { a: msg("card." + x), b: msg("card." + y) }),
      options: opts.map(cardOpt), answer: x,
    };
  }
  const ids = ctx.level === 2 ? orderedSample(ctx.rng, story, Math.min(3, story.length)) : story.slice();
  return {
    type: "sequence", skill: "first-next", items: ids.map(cardOpt), shuffled: shuffleNotSorted(ctx.rng, ids),
    prompt: msg("q.orderStory"), hint: msg("hint.whatFirst", { a: msg("card." + ids[0]), b: msg("card." + ids[1]) }),
  };
};

const UNTIL = ["snack", "play", "tennis", "garden"];
export const timeLeft = (ctx: GenCtx): Question => {
  const card = pick(ctx.rng, UNTIL);
  const evt = make(int(ctx.rng, 3, 5), ctx.level === 1 ? 0 : pick(ctx.rng, [0, 30]));
  const gapPool = ctx.level === 1 ? [60, 120, 180] : ctx.level === 2 ? [30, 60, 90, 120] : [15, 30, 45, 60, 90];
  const gap = pick(ctx.rng, gapPool);
  const now = norm(evt - gap);
  const wrongs = shuffle(ctx.rng, gapPool.concat([gap + 60, gap * 2]).filter((g, i, a) => g !== gap && a.indexOf(g) === i)).slice(0, nOpts(ctx.level) - 1);
  return {
    type: "choice", skill: "elapsed",
    stimulus: { v: "two-clocks", a: now, b: evt, bCard: card, arc: ctx.level === 1 },
    prompt: msg("q.timeLeft", { c: msg("card." + card), a: { time: now }, b: { time: evt } }),
    hint: msg("hint.timeLeft"), reveal: msg("reveal.timeLeft", { d: { dur: gap } }),
    ...options(ctx.rng, gap, wrongs, (g) => ({ v: "duration", min: g })),
  };
};

export const elapsedSet = (ctx: GenCtx): Question => {
  const durs = ctx.level === 1 ? [60, 120] : ctx.level === 2 ? [30, 60, 90] : [15, 30, 45, 75];
  const dur = pick(ctx.rng, durs);
  const start = make(int(ctx.rng, 1, 10), ctx.level === 1 ? 0 : pick(ctx.rng, [0, 30]));
  const card = pick(ctx.rng, ["learn", "play", "tennis", "garden", "nap"]);
  return {
    type: "set-clock", skill: "elapsed", start, target: norm(start + dur), check: "full", step: ctx.level === 3 ? 15 : 30, showDigital: true,
    stimulus: { v: "story", card, t: start },
    prompt: msg("q.elapsed", { c: msg("card." + card), a: { time: start }, d: { dur } }),
    hint: msg("hint.elapsed", { d: { dur } }), pose: "mo-point",
  };
};

/** used by tests and by the parent report: every card's part of day is consistent with its time */
export const cardPartOk = (id: string) => !CARDS[id].time || dayPart(CARDS[id].time!) === CARDS[id].part || id === "pray";
