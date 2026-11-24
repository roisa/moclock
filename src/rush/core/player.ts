/**
 * PlayerController (input → intent) + BikeController (speed, lanes, jumps,
 * wobble, boost). No failure states: bumps only slow Mo down for a moment.
 */
import { LANES } from "./track";

export const CRUISE = 2300; // units / s  (≈ 11.5 segments per second)
export const ACCEL = 1300;
export const BOOST_MUL = 1.45;
export const BOOST_TIME = 2;
export const WOBBLE_TIME = 0.6;
export const G = 18;
export const HOP_V = 5.2;
export const RAMP_V = 8;
export const LANE_TIME = 0.22;
/** jump height units: road widths per (vertical speed · s) */
export const H_SCALE = 0.25;

export type Anim = "idle" | "push" | "ride" | "lean-l" | "lean-r" | "prep" | "air" | "land" | "boost" | "pickup" | "wobble" | "celebrate";

export interface Rider {
  z: number;
  x: number;
  lane: number; // 0..2 target
  speed: number;
  /** jump height (road widths) and vertical speed */
  h: number;
  vy: number;
  air: boolean;
  bigJump: boolean;
  prep: number; // jump anticipation timer
  land: number; // landing squash timer
  wobble: number;
  wobbleDir: number;
  boost: number;
  splash: number;
  pickup: number;
  lean: number; // −1..1 visual lean
  carrying: number; // packages in the bag
  stopped: boolean; // before go / after arrival
}

export function newRider(): Rider {
  return { z: 0, x: LANES[1], lane: 1, speed: 0, h: 0, vy: 0, air: false, bigJump: false, prep: 0, land: 0, wobble: 0, wobbleDir: 1, boost: 0, splash: 0, pickup: 0, lean: 0, carrying: 0, stopped: true };
}

export interface Input {
  /** −1 / +1 lane change requests queued since last step */
  steer: number[];
  jump: boolean;
  /** held direction (keyboard / touch hold) for smooth lean */
  hold: number;
}
export const emptyInput = (): Input => ({ steer: [], jump: false, hold: 0 });

/** PlayerController: consumes the input queue */
export function applyInput(r: Rider, inp: Input, ev: (e: string) => void) {
  if (r.stopped) {
    inp.steer.length = 0;
    inp.jump = false;
    return;
  }
  for (const d of inp.steer.splice(0)) {
    const nl = Math.max(0, Math.min(2, r.lane + d));
    if (nl !== r.lane) {
      r.lane = nl;
      ev("steer");
    }
  }
  if (inp.jump) {
    inp.jump = false;
    if (!r.air && r.prep <= 0) {
      r.prep = 0.1;
      ev("prep");
    }
  }
}

/** BikeController: one fixed step */
export function stepRider(r: Rider, dt: number, ev: (e: string) => void) {
  // speed
  const target = r.stopped ? 0 : CRUISE * (r.boost > 0 ? BOOST_MUL : 1) * (r.wobble > 0 ? 0.7 : 1) * (r.splash > 0 ? 0.85 : 1);
  if (r.speed < target) r.speed = Math.min(target, r.speed + ACCEL * (r.boost > 0 ? 2.5 : 1) * dt);
  else r.speed = Math.max(target, r.speed - ACCEL * 1.6 * dt);
  r.z += r.speed * dt;
  // lanes (smooth)
  const tx = LANES[r.lane];
  const dx = tx - r.x;
  const step = (LANES[2] - LANES[1]) / LANE_TIME * dt;
  r.x = Math.abs(dx) <= step ? tx : r.x + Math.sign(dx) * step;
  const want = Math.abs(dx) > 0.01 ? Math.sign(dx) : 0;
  r.lean += (want - r.lean) * Math.min(1, dt * 10);
  // jump
  if (r.prep > 0) {
    r.prep -= dt;
    if (r.prep <= 0) launch(r, HOP_V, false, ev);
  }
  if (r.air) {
    r.vy -= G * dt;
    r.h += r.vy * dt * H_SCALE;
    if (r.h <= 0) {
      r.h = 0;
      r.vy = 0;
      r.air = false;
      r.land = 0.2;
      ev(r.bigJump ? "land-big" : "land");
    }
  }
  for (const k of ["land", "wobble", "boost", "splash", "pickup"] as const) if (r[k] > 0) r[k] = Math.max(0, r[k] - dt);
}

export function launch(r: Rider, v: number, big: boolean, ev: (e: string) => void) {
  if (r.air) return;
  r.prep = 0;
  r.air = true;
  r.bigJump = big;
  r.vy = v;
  r.h = 0.0001;
  ev(big ? "ramp" : "jump");
}

/** AnimationController's choice of clip from the rider state (priority order) */
export function animOf(r: Rider): Anim {
  if (r.stopped) return r.carrying >= 3 && r.z > 0 ? "celebrate" : "idle";
  if (r.land > 0) return "land";
  if (r.wobble > 0) return "wobble";
  if (r.pickup > 0) return "pickup";
  if (r.prep > 0) return "prep";
  if (r.air) return "air";
  if (r.boost > 0) return "boost";
  if (r.lean < -0.3) return "lean-l";
  if (r.lean > 0.3) return "lean-r";
  if (r.speed < CRUISE * 0.7) return "push";
  return "ride";
}
