import { describe, expect, it } from "vitest";
import { makeQuestion } from "./questions";
import { LEVELS } from "../content/levels";
import { seeded } from "../../engine/rng";
import { handAngles, minuteOf, hourOf } from "../../engine/time";
import { t as tr } from "../../i18n";
import { registerRacerDicts } from "../i18n";

registerRacerDicts();

describe("race questions", () => {
  for (const lv of LEVELS) {
    it(lv.id + " always has exactly one right, unique answer", () => {
      const n = lv.gateKind === "choice-gates" ? 3 : 4;
      for (let s = 0; s < 200; s++)
        for (const d of [1, 2, 3]) {
          const q = makeQuestion(lv.family, seeded(lv.id + s), d, n, s % 8);
          expect(q.options.length).toBe(n);
          expect(q.answer).toBeGreaterThanOrEqual(0);
          const keys = q.options.map((o) => JSON.stringify(o));
          expect(new Set(keys).size).toBe(n);
          for (const lang of ["en", "id"] as const) {
            expect(tr(q.prompt, lang)).not.toMatch(/\{|\}|^r[qx]\./);
            expect(tr(q.explain, lang)).not.toMatch(/\{|\}|^r[qx]\./);
          }
        }
    });
  }
  it("the clock and the right answer always agree (hour hand creeps with the minutes)", () => {
    for (let s = 0; s < 300; s++) {
      const q = makeQuestion("five", seeded(s), 2, 4, s);
      if (q.visual.kind !== "clock") continue;
      const o = q.options[q.answer];
      expect(o.kind).toBe("time");
      if (o.kind === "time") expect(o.t).toBe(q.visual.t);
      const a = handAngles(q.visual.t);
      expect(a.minute).toBe(minuteOf(q.visual.t) * 6);
      expect(a.hour).toBeCloseTo((hourOf(q.visual.t) % 12) * 30 + minuteOf(q.visual.t) * 0.5);
    }
  });
});
