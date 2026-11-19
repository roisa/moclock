import { describe, expect, it } from "vitest";
import { Track } from "./track";
import { CLOCK_TOWN, DAY_VALLEY } from "./tracks";
import { Race } from "./race";
import { newKart, stepKart } from "./physics";

const stats = { top: 0.5, accel: 0.5, handling: 0.5 };

describe("track", () => {
  for (const def of [CLOCK_TOWN, DAY_VALLEY]) {
    const tr = new Track(def);
    it(def.id + " is a sensible loop", () => {
      expect(tr.length).toBeGreaterThan(350);
      expect(tr.length).toBeLessThan(800);
      for (const p of tr.samples) {
        expect(Math.hypot(p.tx, p.tz)).toBeCloseTo(1, 3);
        expect(p.nx * p.tx + p.nz * p.tz).toBeCloseTo(0, 5);
      }
      // closed: the end meets the start
      const a = tr.at(0), b = tr.at(tr.length - 0.01);
      expect(Math.hypot(a.x - b.x, a.z - b.z)).toBeLessThan(0.5);
    });
    it(def.id + " never crosses itself (road edges keep clear of other parts)", () => {
      for (let i = 0; i < tr.samples.length; i += 3)
        for (let j = 0; j < tr.samples.length; j += 3) {
          const a = tr.samples[i], b = tr.samples[j];
          let ds = Math.abs(a.s - b.s);
          ds = Math.min(ds, tr.length - ds);
          if (ds < 40) continue;
          expect(Math.hypot(a.x - b.x, a.z - b.z), `${a.s}~${b.s}`).toBeGreaterThan(def.width + 4);
        }
    });
  }
  it("world() places left offsets on the left", () => {
    const tr = new Track(CLOCK_TOWN);
    const c = tr.world(10, 0), l = tr.world(10, 3);
    const p = tr.at(10);
    // cross product of direction and offset > 0 means left (viewed from +Y, x right, z forward)
    expect(p.tx * (l.z - c.z) - p.tz * (l.x - c.x)).toBeGreaterThan(0);
  });
});

describe("physics", () => {
  it("junior mode drives itself around the whole track without a wall stop", () => {
    const tr = new Track(CLOCK_TOWN);
    const k = newKart("p", 0, 0);
    let bumps = 0;
    for (let t = 0; t < 60; t += 1 / 60) {
      stepKart(k, { steer: 0, throttle: 1, brake: 0 }, 1 / 60, tr, stats, { junior: true });
      if (k.bump === 0) bumps++;
    }
    expect(k.s).toBeGreaterThan(tr.length * 1.5);
    expect(bumps).toBe(0);
  });
  it("explorer mode: no steering eventually touches the wall, but the kart never stops or escapes", () => {
    const tr = new Track(CLOCK_TOWN);
    const k = newKart("p", 0, 0);
    for (let t = 0; t < 40; t += 1 / 60) {
      stepKart(k, { steer: 0, throttle: 1, brake: 0 }, 1 / 60, tr, stats, { junior: false });
      expect(Math.abs(k.lat)).toBeLessThanOrEqual(tr.half);
    }
    expect(k.s).toBeGreaterThan(300);
  });
  it("boost is faster", () => {
    const tr = new Track(CLOCK_TOWN);
    const a = newKart("a", 0, 0), b = newKart("b", 0, 0);
    b.boost = 3;
    for (let t = 0; t < 3; t += 1 / 60) {
      stepKart(a, { steer: 0, throttle: 1, brake: 0 }, 1 / 60, tr, stats, { junior: true });
      stepKart(b, { steer: 0, throttle: 1, brake: 0 }, 1 / 60, tr, stats, { junior: true });
    }
    expect(b.s).toBeGreaterThan(a.s + 10);
  });
});

function sim(opts: { answerAll: boolean; laps: number; skill: number }) {
  const tr = new Track(CLOCK_TOWN);
  const race = new Race({ track: tr, laps: opts.laps, junior: true, gatesPerLap: 2, gateKind: "question", aiSkill: opts.skill,
    racers: [{ id: "mo", stats }, { id: "ais", stats }, { id: "adam", stats }, { id: "abi", stats }] });
  let finish: { position: number; time: number } | null = null;
  const seen: string[] = [];
  for (let i = 0; i < 60 * 300 && !finish; i++) {
    race.update(1 / 60, { steer: 0, throttle: 1, brake: 0 });
    for (const e of race.drain()) {
      seen.push(e.type);
      if (e.type === "gate" && opts.answerAll) race.reward();
      if (e.type === "finish") finish = e;
    }
  }
  return { finish, seen, race };
}

describe("race", () => {
  it("counts down, races, raises gates and finishes", () => {
    const { finish, seen, race } = sim({ answerAll: true, laps: 2, skill: 0.92 });
    expect(seen[0]).toBe("countdown");
    expect(seen).toContain("go");
    expect(seen.filter((s) => s === "gate").length).toBe(4);
    expect(seen).toContain("lap");
    expect(finish).not.toBeNull();
    expect(race.karts.every((k) => k.s > 0)).toBe(true);
  });
  it("a child who answers every question wins (AI is beatable)", () => {
    for (let n = 0; n < 5; n++) expect(sim({ answerAll: true, laps: 3, skill: 1.05 }).finish!.position).toBe(1);
  });
  it("answers matter: with no correct answers the child doesn't simply win, but still finishes close", () => {
    const { finish, race } = sim({ answerAll: false, laps: 3, skill: 1.05 });
    expect(finish).not.toBeNull();
    expect(finish!.position).toBeGreaterThan(1);
    const lead = Math.max(...race.karts.map((k) => k.s));
    expect(lead - race.player.s).toBeLessThan(60);
  });
  it("turbo charges are capped and spent", () => {
    const { race } = sim({ answerAll: true, laps: 2, skill: 0.9 });
    expect(race.turboCharges).toBeLessThanOrEqual(3);
  });
});
