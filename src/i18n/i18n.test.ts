import { describe, expect, it } from "vitest";
import { ACTIVITIES } from "../content/activities";
import { WORLDS } from "../content/worlds";
import { STICKERS, ENVIRONMENTS } from "../content/rewards";
import { CARDS } from "../content/cards";
import { seeded } from "../engine/rng";
import { hasKey, t } from "./index";
import type { Msg } from "./types";
import type { Level, Question } from "../engine/types";
import { en } from "./dict-en";
import { id } from "./dict-id";

function keysOf(m: Msg, out: string[] = []): string[] {
  out.push(m.k);
  for (const v of Object.values(m.p || {})) if (v && typeof v === "object" && "k" in v) keysOf(v as Msg, out);
  return out;
}
function msgsOf(q: Question): Msg[] {
  const ms: Msg[] = [q.prompt, q.hint];
  if (q.type === "choice" && q.reveal) ms.push(q.reveal);
  if (q.type === "clock-tap") ms.push(q.explain);
  return ms;
}

describe("i18n", () => {
  it("both languages have the same keys and no empty strings", () => {
    expect(Object.keys(id).sort()).toEqual(Object.keys(en).sort());
    for (const [k, v] of Object.entries(id)) expect(v.trim(), k).not.toBe("");
  });
  it("every key used by content exists", () => {
    const keys = new Set<string>();
    for (const a of ACTIVITIES) {
      [a.title, a.goal].forEach((k) => keys.add(k));
      a.tutorial.forEach((s) => keysOf(s.say).forEach((k) => keys.add(k)));
      for (const level of [1, 2, 3] as Level[])
        for (let s = 0; s < 25; s++) {
          const rng = seeded(a.id + s);
          for (let index = 0; index < a.rounds; index++)
            msgsOf(a.gen({ rng, level, index, now: new Date(2026, 1, 3) })).forEach((m) => keysOf(m).forEach((k) => keys.add(k)));
        }
    }
    WORLDS.forEach((w) => [w.title, w.tagline, "world.intro." + w.id].forEach((k) => keys.add(k)));
    STICKERS.forEach((s) => [s.title, s.how].forEach((k) => keys.add(k)));
    ENVIRONMENTS.forEach((e) => keys.add(e.title));
    Object.keys(CARDS).forEach((c) => keys.add("card." + c));
    const missing = [...keys].filter((k) => !hasKey(k));
    expect(missing).toEqual([]);
  });
  it("every placeholder gets filled", () => {
    for (const a of ACTIVITIES)
      for (let s = 0; s < 10; s++) {
        const q = a.gen({ rng: seeded(s), level: 3, index: s % a.rounds, now: new Date(2026, 10, 17) });
        for (const m of msgsOf(q))
          for (const lang of ["en", "id"] as const)
            for (const mode of ["show", "say"] as const) expect(t(m, lang, mode), m.k).not.toMatch(/\{\w+\}/);
      }
  });
  it("formats params", () => {
    expect(t({ k: "q.makeTime", p: { t: { time: 210 } } }, "en")).toBe("Make the clock say half past 3!");
    expect(t({ k: "q.makeTime", p: { t: { time: 210 } } }, "id", "say")).toBe("Atur jamnya jadi jam setengah empat!");
    expect(t({ k: "q.day.tomorrow", p: { d: { day: 4 } } }, "id")).toBe("Hari ini Jumat. Besok hari apa?");
  });
});
