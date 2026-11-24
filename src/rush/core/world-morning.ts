/**
 * Morning Town — "Deliver the storybooks to the library before it opens at nine".
 * About two minutes at cruise speed; the story clock runs 8:00 → 9:00.
 */
import { TrackBuilder, LANES, SEG, PETS, type Track, type Deco } from "./track";
import { MORNING, progressAt } from "./clock";
import { make } from "../../engine/time";

const TOWN: Deco[] = ["tree", "tree2", "house", "bush", "flowers", "bench", "house", "tree", "busstop", "fountain"];
const PARK: Deco[] = ["tree", "tree2", "bush", "flowers", "tree", "pond", "windmill", "flowerarch", "tent", "bench"];
const SHOPS: Deco[] = ["shop", "bakery", "fruitcart", "house", "flowers", "tree", "lamp"];

export const MORNING_BALLOONS = [make(8, 10), make(8, 15), make(8, 20), make(8, 30), make(8, 40), make(8, 45), make(8, 50)];

/** layout scale: section lengths in the script are multiplied by K */
const K = 3.4;

export function buildMorningTown(seed = "morning-town"): Track {
  const b = new TrackBuilder(seed);
  // start: bakery street, clock tower
  b.road(K * 14).scenery(K * 14, SHOPS, 0.7);
  b.add("arch-start", 0, 4 * SEG, { wide: true });
  b.add("tower", -1.9, 10 * SEG);
  b.add("masjid", 2.1, K * 9 * SEG); // the neighbourhood masjid near home
  b.trail("star", 1, K * -8, 5);
  b.road(K * 30, 2).scenery(K * 30, TOWN);
  b.trail("star", 0, K * -26, 6);
  b.trail("coin", 2, K * -14, 5);
  // pickup 1
  b.road(K * 16, -1.5).scenery(K * 16, TOWN);
  b.add("pickup", 0, b.z - K * 8 * SEG, { wide: true, n: 1 });
  // log + first ramp with an arc
  b.road(K * 34, 0, 600).scenery(K * 34, PARK);
  b.add("log", LANES[1], b.z - K * 30 * SEG);
  b.trail("star", 0, K * -30, 4);
  b.add("ramp", LANES[2], b.z - K * 20 * SEG);
  b.arc(K * -20, 2);
  b.add("gift", LANES[0], b.z - K * 8 * SEG);
  b.add("magnet", LANES[1], b.z - K * 3 * SEG, { y: 0.2 }); // magnet power-up before the bunny stretch
  // puddles + the bunny
  b.road(K * 30, 2.5, -600).scenery(K * 30, PARK);
  b.add("puddle", LANES[0], b.z - K * 27 * SEG);
  b.add("puddle", LANES[2], b.z - K * 22 * SEG);
  b.trail("star", 1, K * -26, 5);
  b.add("bunny", 1.3, b.z - K * 12 * SEG);
  // carrots for the bunny (5 placed, 3 needed)
  b.road(K * 30, -2).scenery(K * 30, PARK);
  for (const [k, lane] of [[-26, 1], [-21, 0], [-16, 1], [-11, 2], [-6, 1]] as const) b.add("carrot", LANES[lane], b.z + K * k * SEG);
  b.trail("coin", 1, K * -24, 4);
  // shortcut: paper tunnel in the right lane skips the bridge loop
  b.road(K * 6).scenery(K * 6, TOWN);
  const from = b.z - K * 2 * SEG;
  b.add("tunnel", LANES[2], from);
  b.add("signpost", 1.3, from - 9 * SEG); // "secret path this way" sign before the tunnel
  b.trail("star", 2, K * -5, 2, 1);
  b.road(K * 46, 3, 300).scenery(K * 46, PARK, 0.5); // the long way round (bridge)
  b.trail("star", 0, K * -40, 6, 2);
  b.trail("coin", 1, K * -24, 6);
  b.add("ring", LANES[1], b.z - K * 10 * SEG);
  b.shortcut = { from, to: b.z };
  b.add("bunny-home", -1.5, b.z + K * 3 * SEG);
  // pickup 2, boost pad + ring
  b.road(K * 24, -2.5, -300).scenery(K * 24, TOWN);
  b.add("pickup", 0, b.z - K * 20 * SEG, { wide: true, n: 2 });
  b.add("boost", LANES[1], b.z - K * 10 * SEG);
  b.add("ring", LANES[1], b.z - K * 6 * SEG);
  b.trail("star", 1, K * -9, 5, 1);
  // box & block slalom
  b.road(K * 30, 1.5).scenery(K * 30, SHOPS);
  b.add("boxes", LANES[0], b.z - K * 26 * SEG);
  b.add("ball", LANES[2], b.z - K * 20 * SEG);
  b.add("boxes", LANES[1], b.z - K * 14 * SEG);
  b.add("blocks", LANES[0], b.z - K * 8 * SEG);
  b.trail("star", 2, K * -26, 3);
  b.trail("star", 1, K * -20, 3);
  b.trail("star", 2, K * -8, 3);
  b.add("gift", LANES[2], b.z - K * 4 * SEG);
  b.add("magnet", LANES[0], b.z - K * 12 * SEG, { y: 0.2 });
  // rolling beach balls: a moving thing to steer around (soft — only a wobble if it hits)
  b.add("ball", 0, b.z + K * 10 * SEG, { move: true, n: 0 });
  b.add("ball", 0, b.z + K * 24 * SEG, { move: true, n: 2 });
  // pickup 3 + final ramp
  b.road(K * 30, -1, 400).scenery(K * 30, TOWN);
  b.add("pickup", 0, b.z - K * 26 * SEG, { wide: true, n: 3 });
  b.add("ramp", LANES[1], b.z - K * 16 * SEG);
  b.arc(K * -16, 1, 7, 1.4);
  b.add("boost", LANES[0], b.z - K * 6 * SEG);
  // library
  b.road(K * 22, 0, -400).scenery(K * 22, SHOPS, 0.6);
  b.add("library", 0, b.z - K * 6 * SEG, { wide: true });
  b.add("masjid", -2.2, b.z - K * 14 * SEG); // and one in town, near the library
  b.add("arch-start", 0, b.z - K * 6 * SEG - 3 * SEG, { wide: true, n: 1 }); // finish arch
  b.add("ball", 0, b.z - K * 16 * SEG, { move: true, n: 4 });
  b.fill(7);
  // animal friends cheering at the roadside, close to the road so children see them
  for (let z = 10 * SEG, i = 0; z < b.z - 12 * SEG; z += (15 + b.rng() * 10) * SEG, i++)
    b.add(PETS[i % PETS.length], (i % 2 ? 1 : -1) * (1.3 + b.rng() * 0.25), z);
  const t = b.build();
  const end = libraryZ(t);
  // clock balloons sit where the story clock shows their time, so balloon and HUD always agree.
  // (8:30 is on the long bridge road — a little reward for taking the scenic way.)
  MORNING_BALLOONS.forEach((time, i) => {
    t.items.push({ id: 10000 + i, kind: "balloon", x: LANES[(i * 2) % 3], z: progressAt(MORNING, time) * end, y: 0.35, hit: false, n: time });
  });
  t.items.sort((a, b) => a.z - b.z || a.id - b.id);
  return t;
}
/** where the ride ends */
export const libraryZ = (t: Track) => t.items.find((i) => i.kind === "library")!.z;

export const TUNNEL_SEGS = 20;
/** the paper-tunnel shortcut: a short straight road full of treasure, ridden instead of the bridge loop */
export function buildTunnel(): Track {
  const b = new TrackBuilder("tunnel");
  b.road(TUNNEL_SEGS + 130);
  for (let s = 0; s < TUNNEL_SEGS + 2; s += 2) b.add("paper-arch", 0, s * SEG, { wide: true, n: s / 2 });
  [1, 0, 1, 2, 1, 0, 1, 2, 1, 1].forEach((lane, k) => b.add("star", LANES[lane], (2 + k * 1.3) * SEG));
  b.add("pocketclock", LANES[1], 16 * SEG, { y: 0.3 });
  const t = b.build();
  t.length = TUNNEL_SEGS * SEG;
  return t;
}
