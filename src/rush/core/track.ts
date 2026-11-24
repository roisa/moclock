/**
 * RoadGenerator — turns a world script into a segment road with placed items.
 * Pure data: no DOM, deterministic for a seed (unit-tested).
 *
 * Coordinates: z runs along the road (units), x is across the road where
 * −1…+1 is the asphalt (lanes at LANES), |x| > 1.2 is roadside scenery.
 */
import { seeded, type Rng } from "../../engine/rng";

export const SEG = 200; // segment length
export const LANES = [-0.62, 0, 0.62] as const;
export const LANE_HALF = 0.3; // collision half-width

export type Collect = "star" | "coin" | "gift" | "balloon" | "carrot" | "pocketclock" | "ring" | "token" | "magnet" | "shield" | "timeclock";
export type Hazard = "log" | "boxes" | "blocks" | "ball" | "puddle";
export type Feature = "ramp" | "boost" | "pickup" | "tunnel" | "bunny" | "bunny-home" | "library" | "arch-start" | "paper-arch";
export type Deco = "tree" | "tree2" | "house" | "bush" | "flowers" | "lamp" | "shop" | "tower" | "fence" | "sign" | "windmill" | "bakery" | "pond" | "school" | "signpost" | "tent" | "masjid" | "bench" | "busstop" | "fruitcart" | "flowerarch" | "fountain" | Pet;
/** cheering animal friends along the road (app-ayah library art) */
export type Pet = "pet-puppy" | "pet-kitten" | "pet-duckling" | "pet-chick" | "pet-lamb" | "pet-hamster" | "pet-cow" | "pet-turtle-green";
export const PETS: Pet[] = ["pet-puppy", "pet-kitten", "pet-duckling", "pet-chick", "pet-lamb", "pet-hamster", "pet-cow", "pet-turtle-green"];
export type Kind = Collect | Hazard | Feature | Deco;

export const isCollect = (k: Kind): k is Collect => ["star", "coin", "gift", "balloon", "carrot", "pocketclock", "ring", "token", "magnet", "shield", "timeclock"].includes(k);
export const isHazard = (k: Kind): k is Hazard => ["log", "boxes", "blocks", "ball", "puddle"].includes(k);
export const isDeco = (k: Kind) => !isCollect(k) && !isHazard(k) && !["ramp", "boost", "pickup", "tunnel", "bunny", "bunny-home", "library", "arch-start", "paper-arch"].includes(k);

export interface Item {
  id: number;
  kind: Kind;
  x: number;
  z: number;
  /** height above the road (for star arcs over ramps) */
  y: number;
  /** collected / triggered */
  hit: boolean;
  /** clock balloon time (minutes of a 12-h day) / colour index / pickup number */
  n?: number;
  /** spans the whole road (pickup arches, tunnel, library) */
  wide?: boolean;
  /** rolls across the road (beach balls): x follows a slow sine around the centre */
  move?: boolean;
}
export interface Segment { i: number; curve: number; hill: number; y: number }
export interface Track {
  segs: Segment[];
  items: Item[];
  /** total riding length */
  length: number;
  /** shortcut: tunnel entrance z, exit z on the main road */
  shortcut?: { from: number; to: number };
}

/* ---------- builder DSL used by world scripts */
export class TrackBuilder {
  segs: Segment[] = [];
  items: Item[] = [];
  rng: Rng;
  private nid = 0;
  shortcut?: { from: number; to: number };
  constructor(seed: string) {
    this.rng = seeded(seed);
  }
  get z() {
    return this.segs.length * SEG;
  }
  /** add `n` segments with a smooth curve (ease in/out) and a hill delta */
  road(n: number, curve = 0, hill = 0) {
    n = Math.round(n);
    const y0 = this.segs.length ? this.segs[this.segs.length - 1].y : 0;
    for (let k = 0; k < n; k++) {
      const e = Math.sin((Math.PI * (k + 0.5)) / n); // ease in/out
      const i = this.segs.length;
      const y = y0 + hill * (1 - Math.cos((Math.PI * (k + 1)) / n)) / 2;
      this.segs.push({ i, curve: curve * e, hill, y });
    }
    return this;
  }
  add(kind: Kind, x: number, z: number, extra: Partial<Item> = {}) {
    const it: Item = { id: this.nid++, kind, x, z, y: 0, hit: false, ...extra };
    this.items.push(it);
    return it;
  }
  /** a line of collectibles in a lane, `gap` segments apart, starting `at` segments from now */
  trail(kind: Collect, lane: number, at: number, count: number, gap = 1.5) {
    for (let k = 0; k < count; k++) this.add(kind, LANES[lane], this.z + (at + k * gap) * SEG);
  }
  /** an arc of stars above a jump that starts at `at` */
  arc(at: number, lane: number, count = 5, height = 1.2) {
    for (let k = 0; k < count; k++) {
      const u = (k + 1) / (count + 1);
      this.add("star", LANES[lane], this.z + (at + 1 + u * 5) * SEG, { y: height * Math.sin(Math.PI * u) });
    }
  }
  /** scenery on both sides for the last `n` segments, from a pool */
  scenery(n: number, pool: Deco[], density = 0.55) {
    const z0 = this.z - n * SEG;
    for (let s = 0; s < n; s++)
      for (const side of [-1, 1])
        if (this.rng() < density) {
          const k = pool[Math.floor(this.rng() * pool.length)];
          this.add(k, side * (1.55 + this.rng() * 1.8), z0 + (s + this.rng()) * SEG);
        }
  }
  /** fill quiet stretches with star / coin trails so there is always something to steer for */
  fill(every = 9, quiet = 6) {
    const zs = this.items.filter((i) => !isDeco(i.kind)).map((i) => i.z).sort((a, b) => a - b);
    const end = this.items.find((i) => i.kind === "library")?.z ?? this.z;
    let lane = 1;
    for (let z = 8 * SEG; z < end - 10 * SEG; z += every * SEG) {
      const near = zs.some((q) => Math.abs(q - z) < quiet * SEG);
      if (near) continue;
      lane = Math.max(0, Math.min(2, lane + (this.rng() < 0.5 ? -1 : 1)));
      const kind = this.rng() < 0.3 ? "coin" : "star";
      for (let k = 0; k < 4; k++) this.add(kind, LANES[lane], z + k * 1.5 * SEG);
    }
  }
  build(): Track {
    this.items.sort((a, b) => a.z - b.z || a.id - b.id);
    return { segs: this.segs, items: this.items, length: this.z, shortcut: this.shortcut };
  }
}

export function segAt(t: Track, z: number): Segment {
  const n = t.segs.length;
  return t.segs[((Math.floor(z / SEG) % n) + n) % n];
}
/** road height at z (interpolated) */
export function heightAt(t: Track, z: number): number {
  const s = segAt(t, z);
  const prev = s.i ? t.segs[s.i - 1].y : 0;
  const f = (z % SEG) / SEG;
  return prev + (s.y - prev) * f;
}
