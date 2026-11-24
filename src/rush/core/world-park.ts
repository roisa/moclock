/**
 * Sunny Park — "Bring the picnic to Abi and Umi for lunch at twelve".
 * The story clock runs 11:00 → 12:00. Friend quest: a duckling who lost her apples
 * (the sim calls the friend "bunny" and her items "carrot" in every world).
 */
import { TrackBuilder, LANES, SEG, PETS, type Track, type Deco } from "./track";
import { progressAt, type TimeSpan } from "./clock";
import { make } from "../../engine/time";
import { libraryZ } from "./world-morning";

export const NOON: TimeSpan = { from: make(11, 0), to: make(11, 0) + 60 }; // 12:00 (make(12, 0) wraps to 0 on a 12-hour clock)
export const PARK_BALLOONS = [make(11, 10), make(11, 15), make(11, 20), make(11, 30), make(11, 40), make(11, 45), make(11, 50)];

const MEADOW: Deco[] = ["tree", "tree2", "bush", "flowers", "tree", "flowerarch", "bench", "lamp", "tree", "bush"];
const POND: Deco[] = ["pond", "tree", "bush", "flowers", "fountain", "tree2", "bench", "flowerarch"];
const PLAY: Deco[] = ["tent", "tree", "flowers", "windmill", "bench", "fruitcart", "tree2", "bush"];
const K = 3.4;

export function buildSunnyPark(seed = "sunny-park"): Track {
  const b = new TrackBuilder(seed);
  // park gate
  b.road(K * 16).scenery(K * 16, MEADOW, 0.7);
  b.add("arch-start", 0, 4 * SEG, { wide: true });
  b.add("masjid", -2.2, K * 8 * SEG);
  b.trail("star", 1, K * -7, 5);
  // gentle curves through the meadow, rolling balls from the playground
  b.road(K * 28, -2, 300).scenery(K * 28, MEADOW);
  b.add("ball", 0, b.z - K * 22 * SEG, { move: true, n: 1 });
  b.trail("star", 2, K * -24, 6);
  b.trail("coin", 0, K * -12, 5);
  // pickup 1: fruit basket
  b.road(K * 16, 1.5).scenery(K * 16, MEADOW);
  b.add("pickup", 0, b.z - K * 8 * SEG, { wide: true, n: 1 });
  // pond stretch: puddles, a ramp over the stream, magnet
  b.road(K * 32, 2.5, -300).scenery(K * 32, POND);
  b.add("puddle", LANES[1], b.z - K * 28 * SEG);
  b.add("magnet", LANES[0], b.z - K * 24 * SEG, { y: 0.2 });
  b.add("ramp", LANES[1], b.z - K * 16 * SEG);
  b.arc(K * -16, 1, 6, 1.3);
  b.add("puddle", LANES[2], b.z - K * 6 * SEG);
  // the duckling who lost her apples
  b.add("bunny", -1.3, b.z - K * 3 * SEG);
  b.road(K * 30, -1.5).scenery(K * 30, POND);
  for (const [k, lane] of [[-26, 1], [-21, 2], [-16, 1], [-11, 0], [-6, 1]] as const) b.add("carrot", LANES[lane], b.z + K * k * SEG);
  b.trail("coin", 2, K * -22, 4);
  b.add("bunny-home", 1.5, b.z + K * 2 * SEG);
  // shortcut: the paper tunnel skips the long playground loop
  b.road(K * 6).scenery(K * 6, PLAY);
  const from = b.z - K * 2 * SEG;
  b.add("tunnel", LANES[0], from);
  b.add("signpost", -1.3, from - 9 * SEG);
  b.trail("star", 0, K * -5, 2, 1);
  b.road(K * 44, -3, 400).scenery(K * 44, PLAY, 0.55); // the long way round the playground
  b.trail("star", 2, K * -38, 6, 2);
  b.add("blocks", LANES[1], b.z - K * 28 * SEG);
  b.add("ring", LANES[1], b.z - K * 12 * SEG);
  b.trail("coin", 0, K * -20, 6);
  b.shortcut = { from, to: b.z };
  // pickup 2: lunch box, slow-motion clock
  b.road(K * 24, 2, -400).scenery(K * 24, MEADOW);
  b.add("pickup", 0, b.z - K * 20 * SEG, { wide: true, n: 2 });
  b.add("timeclock", LANES[2], b.z - K * 14 * SEG, { y: 0.2 });
  b.trail("star", 2, K * -12, 5, 1);
  // obstacle slalom with a shield first
  b.road(K * 30, -1).scenery(K * 30, PLAY);
  b.add("shield", LANES[1], b.z - K * 29 * SEG, { y: 0.2 });
  b.add("log", LANES[0], b.z - K * 24 * SEG);
  b.add("ball", 0, b.z - K * 18 * SEG, { move: true, n: 3 });
  b.add("boxes", LANES[2], b.z - K * 12 * SEG);
  b.add("blocks", LANES[0], b.z - K * 6 * SEG);
  b.trail("star", 1, K * -24, 3);
  b.trail("star", 2, K * -18, 3);
  b.add("gift", LANES[1], b.z - K * 3 * SEG);
  // pickup 3: picnic bundle, boost, final ramp
  b.road(K * 28, 1, 300).scenery(K * 28, POND);
  b.add("pickup", 0, b.z - K * 24 * SEG, { wide: true, n: 3 });
  b.add("boost", LANES[1], b.z - K * 16 * SEG);
  b.add("ramp", LANES[0], b.z - K * 10 * SEG);
  b.arc(K * -10, 0, 7, 1.4);
  // the picnic spot under the big tree
  b.road(K * 30, 0, -300).scenery(K * 30, MEADOW, 0.6);
  b.add("library", 0, b.z - K * 6 * SEG, { wide: true });
  b.add("arch-start", 0, b.z - K * 6 * SEG - 3 * SEG, { wide: true, n: 1 });
  b.fill(7);
  for (let z = 10 * SEG, i = 0; z < b.z - 12 * SEG; z += (15 + b.rng() * 10) * SEG, i++)
    b.add(PETS[(i + 3) % PETS.length], (i % 2 ? 1 : -1) * (1.3 + b.rng() * 0.25), z);
  const t = b.build();
  const end = libraryZ(t);
  PARK_BALLOONS.forEach((time, i) => {
    t.items.push({ id: 10000 + i, kind: "balloon", x: LANES[(i * 2 + 1) % 3], z: progressAt(NOON, time) * end, y: 0.35, hit: false, n: time });
  });
  t.items.sort((a, b) => a.z - b.z || a.id - b.id);
  return t;
}
