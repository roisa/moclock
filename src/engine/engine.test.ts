import { describe, expect, it } from "vitest";
import * as T from "./time";
import { timeWords, durationWords } from "../i18n/words";
import { ACTIVITIES } from "../content/activities";
import { CARDS } from "../content/cards";
import { seeded } from "./rng";
import { GameSession, starsFor, Adaptive } from "./session";
import { applyResult, defaultProgress, migrate, totalStars, learnerLevel } from "./progress";
import { dailyMission, newlyEarned } from "../content/rewards";
import { cardPartOk, timeDistractors } from "./generators";
import type { Level, Question, Visual } from "./types";

describe("clock maths", () => {
  it("derives both hands from one time", () => {
    expect(T.handAngles(T.make(3, 0))).toEqual({ hour: 90, minute: 0 });
    expect(T.handAngles(T.make(3, 30))).toEqual({ hour: 105, minute: 180 }); // hour hand halfway 3→4
    expect(T.handAngles(T.make(12, 0))).toEqual({ hour: 0, minute: 0 });
    expect(T.handAngles(T.make(9, 45)).hour).toBeCloseTo(292.5);
  });
  it("formats digital and hours 1..12", () => {
    expect(T.digital(T.make(12, 5))).toBe("12:05");
    expect(T.digital(T.make(0, 0))).toBe("12:00");
    expect(T.hourOf(T.make(13, 0))).toBe(1);
  });
  it("dragging the minute hand past 12 advances the hour", () => {
    let t = T.make(3, 50);
    t = T.fromMinuteAngle(t, 10 * 6); // hand moved to the 2 → 4:10
    expect(T.digital(t)).toBe("4:10");
    t = T.fromMinuteAngle(t, 55 * 6); // back over 12 → 3:55
    expect(T.digital(t)).toBe("3:55");
    expect(T.digital(T.fromMinuteAngle(T.make(11, 58), 0))).toBe("12:00");
  });
  it("dragging the hour hand moves the minutes with it", () => {
    expect(T.digital(T.fromHourAngle(105, 5))).toBe("3:30");
    expect(T.digital(T.fromHourAngle(91, 60))).toBe("3:00");
  });
  it("snaps", () => {
    expect(T.snap(T.make(2, 13), 15)).toBe(T.make(2, 15));
    expect(T.snap(T.make(2, 52), 30)).toBe(T.make(3, 0));
  });
  it("angleOf is clockwise from 12", () => {
    expect(T.angleOf(0, -1)).toBe(0);
    expect(T.angleOf(1, 0)).toBe(90);
    expect(T.angleOf(0, 1)).toBe(180);
    expect(T.angleOf(-1, 0)).toBe(270);
  });
  it("parts of the day", () => {
    expect(T.dayPart(7 * 60)).toBe("morning");
    expect(T.dayPart(14 * 60)).toBe("afternoon");
    expect(T.dayPart(18 * 60)).toBe("evening");
    expect(T.dayPart(22 * 60)).toBe("night");
    expect(T.dayPart(2 * 60)).toBe("night");
  });
});

describe("time words", () => {
  const cases: [number, number, string, string][] = [
    [3, 0, "three o'clock", "jam tiga"],
    [3, 30, "half past three", "jam setengah empat"],
    [3, 15, "quarter past three", "jam tiga lewat seperempat"],
    [3, 45, "quarter to four", "jam empat kurang seperempat"],
    [3, 5, "five past three", "jam tiga lewat lima menit"],
    [3, 35, "twenty-five to four", "jam empat kurang dua puluh lima menit"],
    [12, 30, "half past twelve", "jam setengah satu"],
    [11, 45, "quarter to twelve", "jam dua belas kurang seperempat"],
  ];
  for (const [h, m, en, id] of cases) {
    it(`${h}:${m}`, () => {
      expect(timeWords(T.make(h, m), "en")).toBe(en);
      expect(timeWords(T.make(h, m), "id")).toBe(id);
    });
  }
  it("numerals", () => expect(timeWords(T.make(7, 30), "en", true)).toBe("half past 7"));
  it("durations", () => {
    expect(durationWords(60, "en")).toBe("1 hour");
    expect(durationWords(90, "en")).toBe("1 and a half hours");
    expect(durationWords(30, "id")).toBe("30 menit");
    expect(durationWords(120, "id")).toBe("2 jam");
  });
});

/** every Visual must be renderable / valid */
function checkVisual(v: Visual) {
  switch (v.v) {
    case "clock": case "digital": case "time-words": expect(v.t).toBeGreaterThanOrEqual(0); expect(v.t).toBeLessThan(720); break;
    case "card": expect(CARDS[v.id], v.id).toBeTruthy(); break;
    case "day": expect(v.d).toBeGreaterThanOrEqual(0); expect(v.d).toBeLessThan(7); break;
    case "month": expect(v.m).toBeGreaterThanOrEqual(0); expect(v.m).toBeLessThan(12); break;
    case "story": expect(CARDS[v.card]).toBeTruthy(); break;
    default: break;
  }
}
function checkQuestion(q: Question) {
  expect(q.prompt.k).toBeTruthy();
  expect(q.hint.k).toBeTruthy();
  if (q.type === "choice") {
    const ids = q.options.map((o) => o.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain(q.answer);
    q.options.forEach((o) => checkVisual(o.visual));
    // no two options look the same
    const keys = q.options.map((o) => JSON.stringify(o.visual));
    expect(new Set(keys).size).toBe(keys.length);
    if (q.stimulus) checkVisual(q.stimulus);
  }
  if (q.type === "set-clock") {
    expect(q.target).not.toBe(q.start);
    expect(q.target % q.step === 0 || q.check !== "full" || q.step >= 30 ? true : q.target % q.step === 0).toBe(true);
    // the target must be reachable with the snapping step
    if (q.check === "full") expect(q.target % q.step).toBe(0);
  }
  if (q.type === "sequence") {
    expect(q.shuffled.slice().sort()).toEqual(q.items.map((i) => i.id).sort());
    expect(q.shuffled).not.toEqual(q.items.map((i) => i.id));
  }
  if (q.type === "sort") {
    for (const it of q.items) expect(q.bins.map((b) => b.id)).toContain(it.bin);
    for (const b of q.bins) expect(q.items.some((i) => i.bin === b.id)).toBe(true);
  }
  if (q.type === "calendar-fill") expect(q.missing.length).toBeGreaterThan(0);
  if (q.type === "countdown") expect(q.eventDay).toBeGreaterThan(q.today);
  if (q.type === "day-explorer") expect(q.to).toBeGreaterThan(q.from);
}

describe("every activity generates valid questions at every level", () => {
  for (const a of ACTIVITIES) {
    it(a.id, () => {
      for (const level of [1, 2, 3] as Level[]) {
        for (let seed = 0; seed < 40; seed++) {
          const rng = seeded(a.id + seed);
          for (let index = 0; index < a.rounds; index++) {
            checkQuestion(a.gen({ rng, level, index, now: new Date(2026, 10, 17) }));
          }
        }
      }
    });
  }
  it("ids are unique", () => {
    const ids = ACTIVITIES.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("distractors include the hand-swap confusion", () => {
    const d = timeDistractors(seeded(1), T.make(3, 0), 3, [0, 15, 30, 45]);
    expect(d.map(T.digital)).toContain("12:15");
  });
  it("routine cards sit in the right part of the day", () => {
    for (const id of Object.keys(CARDS)) expect(cardPartOk(id), id).toBe(true);
  });
});

describe("session & progress", () => {
  it("stars never drop below 1", () => {
    expect(starsFor(0, 5)).toBe(1);
    expect(starsFor(3, 5)).toBe(2);
    expect(starsFor(5, 5)).toBe(3);
  });
  it("adapts difficulty", () => {
    const a = new Adaptive(1);
    a.record(true); a.record(true); expect(a.level).toBe(1);
    a.record(true); expect(a.level).toBe(2);
    a.record(false); a.record(false); expect(a.level).toBe(1);
  });
  it("plays a whole session and records progress", () => {
    const def = ACTIVITIES.find((x) => x.id === "half-past")!;
    const s = new GameSession(def, 1, { rng: seeded(7) });
    s.miss();
    while (!s.solve());
    const r = s.result();
    expect(r.total).toBe(def.rounds);
    expect(r.correctFirstTry).toBe(def.rounds - 1);
    let p = defaultProgress("en");
    p = applyResult(p, r, "2026-11-17");
    expect(p.activities["half-past"].stars).toBe(r.stars);
    expect(totalStars(p)).toBe(r.stars);
    expect(p.skills["read-half"]!.a).toBe(def.rounds);
    expect(newlyEarned(p)).toContain("first-tick");
  });
  it("daily mission is stable for a day and pays a bonus once", () => {
    let p = defaultProgress();
    const id = dailyMission(p, "2026-11-17");
    expect(dailyMission(p, "2026-11-17")).toBe(id);
    p = { ...p, daily: { date: "2026-11-17", id, done: false } };
    const res = { activityId: id, stars: 2 as const, correctFirstTry: 3, total: 4, attempts: [], levelEnd: 1 as Level, ms: 1 };
    p = applyResult(p, res, "2026-11-17");
    p = applyResult(p, res, "2026-11-17");
    expect(p.bonusStars).toBe(1);
  });
  it("migrates broken saves", () => {
    expect(migrate(null).v).toBe(1);
    expect(migrate({ settings: { lang: "en" } }).settings.voice).toBe(true);
  });
  it("learner level", () => {
    expect(learnerLevel(0).level).toBe(1);
    expect(learnerLevel(10).level).toBe(3);
  });
});

import { makeTimeHint } from "./generators";
import { t as tr } from "../i18n";
describe("review fixes", () => {
  it("set-time hint never says 'near 3' for 3:45", () => {
    expect(tr(makeTimeHint(T.make(3, 45)), "en")).toContain("between 3 and 4");
    expect(tr(makeTimeHint(T.make(12, 30)), "id")).toContain("antara angka 12 dan 1");
    expect(tr(makeTimeHint(T.make(5, 0)), "en")).toContain("points at 5");
  });
});
