/**
 * Arcade kart physics in track space. Deliberately forgiving:
 *  - Karts follow the road's curve on their own; steering moves them across it.
 *  - Walls are soft: touching one slows you a little and nudges you back.
 *  - Junior mode drives forward automatically and keeps the kart in its lane.
 */
import type { Track } from "./track";

export interface KartStats { top: number; accel: number; handling: number } // 0..1 each, shown in the garage
export interface KartState {
  id: string;
  s: number; // total distance driven along the track (keeps growing over laps)
  lat: number; // sideways offset from the centre line
  head: number; // heading relative to the road direction (rad, + = left)
  speed: number;
  boost: number; // seconds of turbo left
  bump: number; // seconds since the last wall touch (for effects)
  steerVis: number; // smoothed steering for animation
  finished: number | null; // race time when the finish line was crossed
  lane: number; // preferred lateral offset (lane assist / AI)
}
export interface KartInput { steer: number; throttle: number; brake: number } // steer -1 (right) … +1 (left)

export const BASE = { top: 21, accel: 11, boostTop: 31, boostAccel: 28, brake: 22, drag: 0.6, steerRate: 1.9 };

export function newKart(id: string, s: number, lat: number): KartState {
  return { id, s, lat, head: 0, speed: 0, boost: 0, bump: 9, steerVis: 0, finished: null, lane: lat };
}

export function stepKart(k: KartState, inp: KartInput, dt: number, track: Track, stats: KartStats, opts: { junior: boolean; scale?: number }) {
  const top = BASE.top * (0.9 + stats.top * 0.2) * (opts.scale ?? 1);
  const boosting = k.boost > 0;
  const vmax = boosting ? BASE.boostTop * (opts.scale ?? 1) : top;
  const acc = boosting ? BASE.boostAccel : BASE.accel * (0.85 + stats.accel * 0.3);
  // throttle / brake
  const push = Math.max(inp.throttle, boosting ? 1 : 0);
  if (k.speed < vmax) k.speed = Math.min(vmax, k.speed + acc * push * dt); // accelerate up to the limit only
  else k.speed = Math.max(vmax, k.speed - 14 * dt); // ease down after a boost ends
  if (inp.brake > 0) k.speed -= BASE.brake * inp.brake * dt;
  k.speed -= k.speed * BASE.drag * 0.08 * dt;
  if (inp.throttle <= 0 && !boosting) k.speed -= 4 * dt;
  k.speed = Math.max(0, k.speed);
  k.boost = Math.max(0, k.boost - dt);

  // steering
  const handling = 0.85 + stats.handling * 0.3;
  const p = track.at(k.s);
  if (opts.junior) {
    // lane assist: aim at the preferred lane, steering input moves the lane
    k.lane = clamp(k.lane + inp.steer * 9 * dt, -track.half + 1.2, track.half - 1.2);
    const want = clamp((k.lane - k.lat) * 0.35, -0.45, 0.45);
    k.head += (want - k.head) * Math.min(1, 6 * dt);
  } else {
    k.head += inp.steer * BASE.steerRate * handling * dt;
    // the road curving under you pushes you outward a little; self-centre slowly
    k.head -= p.curv * k.speed * dt * 0.55;
    k.head *= 1 - Math.min(1, 1.2 * dt) * (inp.steer === 0 ? 1 : 0.2);
  }
  k.head = clamp(k.head, -0.9, 0.9);
  k.steerVis += (inp.steer - k.steerVis) * Math.min(1, 8 * dt);

  // integrate in track space
  k.s += k.speed * Math.cos(k.head) * dt;
  k.lat += k.speed * Math.sin(k.head) * dt;
  // soft walls
  const lim = track.half - 0.7;
  if (Math.abs(k.lat) > lim) {
    k.lat = Math.sign(k.lat) * lim;
    k.head *= -0.25;
    k.speed *= 1 - Math.min(0.5, 1.6 * dt);
    k.bump = 0;
  } else k.bump += dt;
}

/** Karts gently push each other apart; the one behind loses a little speed. */
export function separate(karts: KartState[], track: Track) {
  for (let i = 0; i < karts.length; i++)
    for (let j = i + 1; j < karts.length; j++) {
      const a = karts[i], b = karts[j];
      let ds = track.wrap(b.s - a.s);
      if (ds > track.length / 2) ds -= track.length;
      const dl = b.lat - a.lat;
      if (Math.abs(ds) < 2.2 && Math.abs(dl) < 1.5) {
        const push = (1.5 - Math.abs(dl)) * 0.5 * (dl >= 0 ? 1 : -1);
        a.lat -= push;
        b.lat += push;
        const behind = ds > 0 ? a : b;
        behind.speed *= 0.985;
      }
    }
}

export const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
