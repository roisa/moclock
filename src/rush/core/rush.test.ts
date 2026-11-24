import { describe, it, expect } from "vitest";
import { buildMorningTown, buildTunnel, libraryZ, MORNING_BALLOONS } from "./world-morning";
import { morningWorld } from "./morning";
import { GameSim, praiseStars, type SimEvent } from "./sim";
import { storyTime, MORNING, progressAt } from "./clock";
import { CRUISE } from "./player";
import { LANES, SEG } from "./track";
import { make } from "../../engine/time";

const DT = 1 / 60;
/** ride the whole route with a simple bot; returns events */
function ride(sim: GameSim, bot?: (s: GameSim) => void, maxS = 400) {
  const evs: SimEvent[] = [];
  sim.start();
  for (let i = 0; i < maxS * 60 && !sim.done; i++) {
    bot?.(sim);
    sim.step(DT);
    evs.push(...sim.drain());
  }
  return evs;
}
/** steers toward the nearest collectible ahead, jumps over hazards, avoids the tunnel unless asked */
function smartBot(takeShortcut: boolean) {
  return (s: GameSim) => {
    const r = s.r;
    if (r.x !== LANES[r.lane]) return;
    const ahead = s.track.items.filter((i) => !i.hit && i.z > r.z && i.z < r.z + SEG * 6);
    const haz = ahead.find((i) => ["log", "boxes", "blocks"].includes(i.kind) && Math.abs(i.x - r.x) < 0.3 && i.z < r.z + SEG * 2.2);
    if (haz && !r.air) s.input.jump = true;
    const tun = ahead.find((i) => i.kind === "tunnel");
    const want = tun ? (takeShortcut ? 2 : 0) : (() => {
      const c = ahead.find((i) => ["star", "coin", "balloon", "carrot", "gift", "ramp", "ring", "pocketclock"].includes(i.kind));
      return c ? LANES.indexOf(c.x as (typeof LANES)[number]) : -1;
    })();
    if (want >= 0 && want !== r.lane) s.input.steer.push(Math.sign(want - r.lane));
  };
}

describe("Morning Town track", () => {
  it("is deterministic and well-formed", () => {
    const a = buildMorningTown(), b = buildMorningTown();
    expect(a.items.length).toBe(b.items.length);
    expect(a.items.map((i) => i.kind + i.z).join()).toBe(b.items.map((i) => i.kind + i.z).join());
    for (let i = 1; i < a.items.length; i++) expect(a.items[i].z).toBeGreaterThanOrEqual(a.items[i - 1].z);
    expect(a.items.filter((i) => i.kind === "pickup")).toHaveLength(3);
    expect(a.shortcut!.to).toBeGreaterThan(a.shortcut!.from);
    expect(libraryZ(a)).toBeLessThan(a.length);
  });
  it("takes about two minutes at cruise", () => {
    const s = libraryZ(buildMorningTown()) / CRUISE;
    expect(s).toBeGreaterThan(80);
    expect(s).toBeLessThan(150);
  });
  it("places each clock balloon where the story clock shows its time", () => {
    const t = buildMorningTown(), end = libraryZ(t);
    const bs = t.items.filter((i) => i.kind === "balloon");
    expect(bs.map((b) => b.n)).toEqual(MORNING_BALLOONS);
    for (const b of bs) expect(storyTime(MORNING, b.z / end)).toBe(b.n);
  });
  it("story clock runs 8:00 → 9:00", () => {
    expect(storyTime(MORNING, 0)).toBe(make(8, 0));
    expect(storyTime(MORNING, 0.5)).toBe(make(8, 30));
    expect(storyTime(MORNING, 2)).toBe(make(9, 0));
    expect(progressAt(MORNING, make(8, 15))).toBeCloseTo(0.25);
  });
  it("tunnel holds treasure", () => {
    const t = buildTunnel();
    expect(t.items.some((i) => i.kind === "pocketclock")).toBe(true);
    expect(t.items.filter((i) => i.kind === "star").length).toBeGreaterThanOrEqual(8);
  });
});

describe("GameSim", () => {
  it("an idle child still completes the delivery — no fail state", () => {
    const sim = new GameSim(morningWorld());
    const ev = ride(sim);
    expect(sim.done).toBe(true);
    expect(ev.some((e) => e.type === "arrive")).toBe(true);
    expect(sim.stats.packages).toBe(3); // pickup arches span the road
    expect(sim.stats.time).toBe(make(9, 0));
    expect(praiseStars(sim.stats)).toBeGreaterThanOrEqual(1);
  });
  it("a player who rides well collects most stars, balloons and helps the bunny", () => {
    const sim = new GameSim(morningWorld());
    const ev = ride(sim, smartBot(false));
    expect(sim.done).toBe(true);
    expect(sim.stats.stars / sim.stats.starsTotal).toBeGreaterThan(0.5);
    expect(sim.stats.balloons.length).toBeGreaterThanOrEqual(5);
    expect(sim.stats.carrots).toBeGreaterThanOrEqual(3);
    expect(sim.stats.token).toBe(true);
    expect(ev.some((e) => e.type === "ramp")).toBe(true);
    expect(ev.some((e) => e.type === "boost")).toBe(true);
    expect(praiseStars(sim.stats)).toBe(3);
  });
  it("the shortcut skips the bridge loop and returns to the main road", () => {
    const sim = new GameSim(morningWorld());
    const ev = ride(sim, smartBot(true));
    expect(ev.some((e) => e.type === "tunnel-in")).toBe(true);
    expect(ev.some((e) => e.type === "tunnel-out")).toBe(true);
    expect(sim.stats.shortcut).toBe(true);
    expect(sim.stats.pocketclock).toBe(true);
    expect(sim.done).toBe(true);
    const plain = new GameSim(morningWorld());
    ride(plain, smartBot(false));
    expect(sim.stats.seconds).toBeLessThan(plain.stats.seconds);
  });
  it("bumping a hazard wobbles and slows, never stops the ride", () => {
    const w = morningWorld();
    const sim = new GameSim(w);
    const box = w.main.items.find((i) => i.kind === "boxes")!;
    sim.start();
    sim.r.z = box.z - 300;
    sim.r.speed = 2300;
    sim.r.lane = LANES.indexOf(box.x as (typeof LANES)[number]);
    sim.r.x = box.x;
    const evs: SimEvent[] = [];
    for (let i = 0; i < 60; i++) { sim.step(DT); evs.push(...sim.drain()); }
    expect(evs.some((e) => e.type === "bump")).toBe(true);
    expect(sim.r.speed).toBeGreaterThan(0);
    for (let i = 0; i < 120; i++) sim.step(DT);
    expect(sim.r.wobble).toBe(0);
    expect(sim.r.speed).toBeGreaterThan(2000);
  });
  it("jumping clears a log", () => {
    const w = morningWorld();
    const sim = new GameSim(w);
    const log = w.main.items.find((i) => i.kind === "log")!;
    sim.start();
    sim.r.z = log.z - 380;
    sim.r.speed = 2300;
    sim.r.x = log.x;
    sim.r.lane = 1;
    sim.input.jump = true;
    const evs: SimEvent[] = [];
    for (let i = 0; i < 60; i++) { sim.step(DT); evs.push(...sim.drain()); }
    expect(evs.some((e) => e.type === "jump")).toBe(true);
    expect(evs.some((e) => e.type === "bump")).toBe(false);
  });
  it("steering is clamped to three lanes", () => {
    const sim = new GameSim(morningWorld());
    sim.start();
    sim.input.steer.push(-1, -1, -1);
    sim.step(DT);
    expect(sim.r.lane).toBe(0);
    sim.input.steer.push(1, 1, 1, 1);
    sim.step(DT);
    expect(sim.r.lane).toBe(2);
  });
});
