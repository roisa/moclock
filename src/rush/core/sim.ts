/**
 * GameSim — fixed-step simulation of one delivery ride. Wires together the
 * ObstacleManager / CollectibleManager / ClockBalloonManager (item sweep),
 * DeliveryMissionManager (pickups, friend quest, shortcut, arrival) and the
 * rider controllers. Emits events for audio, particles and the HUD.
 */
import { LANE_HALF, SEG, isCollect, isHazard, type Item, type Track } from "./track";
import { newRider, applyInput, stepRider, launch, emptyInput, RAMP_V, BOOST_TIME, WOBBLE_TIME, type Rider, type Input } from "./player";
import { storyTime, type TimeSpan } from "./clock";

export type SimEvent =
  | { type: "star" | "coin" | "gift" | "ring" | "pocketclock"; item: Item }
  | { type: "balloon"; item: Item; time: number }
  | { type: "carrot"; item: Item; carrots: number }
  | { type: "pickup"; n: number; carrying: number }
  | { type: "bump"; item: Item }
  | { type: "splash"; item: Item }
  | { type: "boost" }
  | { type: "friend-meet" }
  | { type: "friend-help"; carrots: number; token: boolean }
  | { type: "tunnel-in" }
  | { type: "tunnel-near" }
  | { type: "balloon-miss"; time: number }
  | { type: "tunnel-out" }
  | { type: "arrive" }
  | { type: "jump" | "ramp" | "land" | "land-big" | "steer" | "prep" | "go" };

export interface Stats {
  stars: number;
  starsTotal: number;
  balloons: number[];
  carrots: number;
  token: boolean;
  packages: number;
  bumps: number;
  shortcut: boolean;
  pocketclock: boolean;
  time: number; // story time at arrival
  seconds: number;
}

export interface WorldDef {
  main: Track;
  tunnel?: Track;
  span: TimeSpan;
  end: number; // z of the destination on the main track
  packagesNeeded: number;
}

export class GameSim {
  r: Rider = newRider();
  input: Input = emptyInput();
  events: SimEvent[] = [];
  stats: Stats;
  /** which road is being ridden */
  route: "main" | "tunnel" = "main";
  private cursor = { main: 0, tunnel: 0 };
  t = 0;
  done = false;
  friendMet = false;
  constructor(public w: WorldDef) {
    const count = (t?: Track) => (t ? t.items.filter((i) => i.kind === "star" || i.kind === "coin").length : 0);
    this.stats = { stars: 0, starsTotal: count(w.main) - countBetween(w.main, w.main.shortcut) + Math.max(count(w.tunnel), countBetween(w.main, w.main.shortcut)), balloons: [], carrots: 0, token: false, packages: 0, bumps: 0, shortcut: false, pocketclock: false, time: w.span.from, seconds: 0 };
  }
  get track(): Track {
    return this.route === "tunnel" && this.w.tunnel ? this.w.tunnel : this.w.main;
  }
  /** route progress 0..1 (the tunnel maps onto the stretch it replaces) */
  get progress(): number {
    const sc = this.w.main.shortcut;
    if (this.route === "tunnel" && sc && this.w.tunnel) return (sc.from + (this.r.z / this.w.tunnel.length) * (sc.to - sc.from)) / this.w.end;
    return Math.min(1, this.r.z / this.w.end);
  }
  get time(): number {
    return storyTime(this.w.span, this.progress);
  }
  start() {
    this.r.stopped = false;
    this.events.push({ type: "go" });
  }
  private ev = (type: string) => this.events.push({ type } as SimEvent);

  step(dt: number) {
    if (this.done) return;
    const r = this.r;
    applyInput(r, this.input, this.ev);
    const z0 = r.z;
    stepRider(r, dt, this.ev);
    if (!r.stopped) {
      this.t += dt;
      this.helpers(dt);
      this.sweep(z0, r.z);
    }
    // shortcut entrance / tunnel exit
    const sc = this.w.main.shortcut;
    if (this.route === "tunnel" && this.w.tunnel && r.z >= this.w.tunnel.length && sc) {
      this.route = "main";
      r.z = sc.to + (r.z - this.w.tunnel.length);
      this.cursor.main = firstAfter(this.w.main.items, r.z);
      this.events.push({ type: "tunnel-out" });
    }
    // arrival
    if (this.route === "main" && !r.stopped && r.z >= this.w.end - SEG * 2) {
      r.stopped = true;
      this.done = true;
      this.stats.time = this.w.span.to;
      this.stats.seconds = this.t;
      this.events.push({ type: "arrive" });
    }
  }

  private hinted = false;
  /**
   * Kid-friendly helpers, run before the collision sweep:
   *  - balloons, carrots and gifts drift toward Mo when he is one lane away (so 4-year-olds still catch them)
   *  - beach balls roll slowly across the road
   *  - a missed clock balloon still gets its time said; a hint comes before the secret tunnel
   */
  private helpers(dt: number) {
    const r = this.r, items = this.track.items;
    for (let k = this.cursor[this.route]; k < items.length && items[k].z < r.z + SEG * 40; k++) {
      const it = items[k];
      if (it.hit) continue;
      const d = it.z - r.z;
      if (it.move) it.x = Math.sin(this.t * 1.3 + (it.n ?? 0)) * 0.62;
      if (d > 0 && d < SEG * 4 && (it.kind === "balloon" || it.kind === "carrot" || it.kind === "gift") && Math.abs(it.x - r.x) < 0.75)
        it.x += (r.x - it.x) * Math.min(1, dt * 3.5);
      if (it.kind === "balloon" && d < -SEG * 0.5) { it.hit = true; this.events.push({ type: "balloon-miss", time: it.n! }); }
      if (it.kind === "tunnel" && !this.hinted && d > 0 && d < SEG * 16) { this.hinted = true; this.events.push({ type: "tunnel-near" }); }
    }
  }

  /** item sweep over [z0, z1] on the active road */
  private sweep(z0: number, z1: number) {
    const tr = this.track;
    const items = tr.items;
    const key = this.route;
    let i = this.cursor[key];
    while (i < items.length && items[i].z < z0 - SEG) i++;
    this.cursor[key] = i;
    for (let k = i; k < items.length && items[k].z <= z1; k++) {
      const it = items[k];
      if (it.hit || it.z < z0) continue;
      this.touch(it);
      if (this.route !== key) return; // switched road (tunnel)
    }
  }

  private touch(it: Item) {
    const r = this.r;
    const inLane = Math.abs(it.x - r.x) < LANE_HALF + (it.kind === "carrot" || it.kind === "balloon" ? 0.08 : 0);
    const k = it.kind;
    if (isCollect(k)) {
      if (!inLane) return;
      // star arcs high above the road are reached by jumping (any jump)
      const reach = it.y > 0.5 ? r.air : true;
      if (!reach) return;
      it.hit = true;
      if (k === "star" || k === "coin") { this.stats.stars++; this.events.push({ type: k, item: it }); }
      else if (k === "gift") { this.stats.stars += 5; this.events.push({ type: "gift", item: it }); }
      else if (k === "ring") { r.boost = Math.max(r.boost, BOOST_TIME * 0.6); this.stats.stars += 2; this.events.push({ type: "ring", item: it }); }
      else if (k === "pocketclock") { this.stats.pocketclock = true; this.stats.stars += 3; this.events.push({ type: "pocketclock", item: it }); }
      else if (k === "balloon") { this.stats.balloons.push(it.n!); this.stats.stars += 2; this.events.push({ type: "balloon", item: it, time: it.n! }); }
      else if (k === "carrot") { this.stats.carrots++; this.events.push({ type: "carrot", item: it, carrots: this.stats.carrots }); }
      return;
    }
    if (isHazard(k)) {
      if (!inLane) return;
      it.hit = true;
      if (k === "puddle") {
        if (r.air) return;
        r.splash = 0.5;
        this.events.push({ type: "splash", item: it });
        return;
      }
      if (r.air && r.h > (k === "log" ? 0.05 : 0.12)) return; // jumped over
      r.wobble = WOBBLE_TIME;
      r.wobbleDir = it.x <= r.x ? 1 : -1;
      this.stats.bumps++;
      this.events.push({ type: "bump", item: it });
      return;
    }
    switch (k) {
      case "ramp":
        if (!inLane) return;
        it.hit = true;
        launch(r, RAMP_V, true, this.ev);
        return;
      case "boost":
        if (!inLane || r.air) return;
        it.hit = true;
        r.boost = BOOST_TIME;
        this.events.push({ type: "boost" });
        return;
      case "pickup":
        it.hit = true;
        r.carrying++;
        r.pickup = 0.6;
        this.stats.packages = r.carrying;
        this.events.push({ type: "pickup", n: it.n ?? r.carrying, carrying: r.carrying });
        return;
      case "bunny":
        it.hit = true;
        this.friendMet = true;
        this.events.push({ type: "friend-meet" });
        return;
      case "bunny-home": {
        it.hit = true;
        const token = this.stats.carrots >= 3;
        this.stats.token = token;
        this.events.push({ type: "friend-help", carrots: this.stats.carrots, token });
        return;
      }
      case "tunnel":
        if (!inLane || !this.w.tunnel) return;
        it.hit = true;
        this.route = "tunnel";
        this.stats.shortcut = true;
        this.r.z = 0;
        this.cursor.tunnel = 0;
        this.events.push({ type: "tunnel-in" });
        return;
      default:
        it.hit = true; // scenery, arches
    }
  }

  drain(): SimEvent[] {
    return this.events.splice(0);
  }
}

function firstAfter(items: Item[], z: number) {
  let i = 0;
  while (i < items.length && items[i].z < z) i++;
  return i;
}
function countBetween(t: Track, sc?: { from: number; to: number }) {
  if (!sc) return 0;
  return t.items.filter((i) => (i.kind === "star" || i.kind === "coin") && i.z > sc.from && i.z < sc.to).length;
}

/** stars-of-praise for the results screen: always at least one (you delivered!) */
export function praiseStars(s: Stats): number {
  const frac = s.starsTotal ? s.stars / s.starsTotal : 1;
  return 1 + (frac >= 0.5 ? 1 : 0) + (frac >= 0.8 || s.token ? 1 : 0);
}
