/**
 * AI racers: follow the road on a gently weaving lane, overtake by switching
 * lanes, and use "rubber banding" so a young child can always catch up and win
 * by answering questions (turbo). Never unbeatable, never embarrassingly slow.
 */
import type { Track } from "./track";
import { clamp, type KartInput, type KartState } from "./physics";

export interface AiBrain { skill: number; phase: number; laneBias: number; nextLaneChange: number }

export function newBrain(i: number, skill: number): AiBrain {
  return { skill, phase: i * 1.7, laneBias: (i % 2 ? 1 : -1) * 1.5, nextLaneChange: 2 + i };
}

export function aiInput(k: KartState, b: AiBrain, all: KartState[], player: KartState, track: Track, t: number, dt: number): { input: KartInput; speedScale: number } {
  // weave a little around a preferred lane
  b.nextLaneChange -= dt;
  if (b.nextLaneChange <= 0) {
    b.laneBias = clamp(b.laneBias + (Math.random() - 0.5) * 3, -track.half + 1.5, track.half - 1.5);
    b.nextLaneChange = 3 + Math.random() * 3;
  }
  let target = b.laneBias + Math.sin(t * 0.5 + b.phase) * 0.8;
  // someone close ahead in my lane? move over
  for (const o of all) {
    if (o === k) continue;
    let ds = track.wrap(o.s - k.s);
    if (ds > track.length / 2) ds -= track.length;
    if (ds > 0 && ds < 9 && Math.abs(o.lat - k.lat) < 1.8) target = o.lat > 0 ? o.lat - 2.6 : o.lat + 2.6;
  }
  target = clamp(target, -track.half + 1.1, track.half - 1.1);
  // look ahead along the curve: aim at the target lane a few metres ahead
  const want = clamp((target - k.lat) * 0.25, -0.5, 0.5);
  const steer = clamp((want - k.head) * 3, -1, 1);
  // rubber band: ease off when far ahead of the child, push a bit when far behind
  const gap = k.s - player.s;
  let scale = b.skill;
  if (gap > 25) scale *= 0.86;
  else if (gap > 10) scale *= 0.94;
  else if (gap < -40) scale *= 1.07;
  // slow a touch on sharp curves (looks natural)
  const c = Math.abs(track.at(k.s + 8).curv);
  const brake = c * k.speed > 0.55 ? 0.3 : 0;
  return { input: { steer, throttle: 1, brake }, speedScale: scale };
}
