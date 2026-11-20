import { describe, expect, it } from "vitest";
import { applyRace, defaults, isUnlocked, starsFor } from "../state";
import type { RaceSummary } from "../game/RaceGame";
import { KARTS } from "../content/racers";

const sum = (o: Partial<RaceSummary>): RaceSummary => ({ position: 2, time: 80, coins: 20, correctFirstTry: 4, questions: 6, learned: ["3:00"], levelEnd: 2, concepts: { "full-hour": { a: 6, c: 4 } }, ...o });

describe("time racers progression", () => {
  it("stars come from learning, not from winning", () => {
    expect(starsFor(sum({ correctFirstTry: 0, questions: 6, position: 1 }))).toBe(1);
    expect(starsFor(sum({ correctFirstTry: 4, questions: 6, position: 3 }))).toBe(2);
    expect(starsFor(sum({ correctFirstTry: 6, questions: 6, position: 3 }))).toBe(3);
  });
  it("finishing a level unlocks the next one; Day Week Valley opens after Clock Town level 2", () => {
    let p = defaults("en");
    expect(isUnlocked(p, "ct-1")).toBe(true);
    expect(isUnlocked(p, "ct-2")).toBe(false);
    expect(isUnlocked(p, "dv-1")).toBe(false);
    p = applyRace(p, "ct-1", "numbers", sum({})).next;
    expect(isUnlocked(p, "ct-2")).toBe(true);
    p = applyRace(p, "ct-2", "hour-hand", sum({})).next;
    expect(isUnlocked(p, "dv-1")).toBe(true);
  });
  it("coins, trophies, best results and stickers", () => {
    let p = defaults("en");
    const a = applyRace(p, "ct-1", "numbers", sum({ position: 1, correctFirstTry: 6, questions: 6, coins: 30 }));
    p = a.next;
    expect(p.coins).toBe(30);
    expect(p.trophies).toBe(1);
    expect(a.newSticker).toBe("ct-1");
    const b = applyRace(p, "ct-1", "numbers", sum({ position: 3, correctFirstTry: 1, questions: 6, coins: 10 }));
    expect(b.next.levels["ct-1"]).toEqual({ stars: 3, best: 1, plays: 2 }); // best result kept
    expect(b.newSticker).toBeNull();
    expect(b.next.skills["full-hour"]).toEqual({ a: 12, c: 8 });
  });
  it("karts are fair: unlocking changes the feel, never the total power", () => {
    for (const k of KARTS) expect(k.stats.top + k.stats.accel + k.stats.handling).toBeCloseTo(1.5);
  });
});
