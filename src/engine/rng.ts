/** Small seeded RNG (FNV-1a → mulberry32), same family as BabyMo.daily.seed in the hub. */
export type Rng = () => number;

export function hash(s: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}
export function seeded(seed: string | number): Rng {
  let a = typeof seed === "number" ? seed >>> 0 : hash(seed);
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function randomRng(): Rng {
  return seeded((Math.random() * 2 ** 32) >>> 0);
}
export function int(rng: Rng, lo: number, hi: number): number {
  return lo + Math.floor(rng() * (hi - lo + 1));
}
export function pick<T>(rng: Rng, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}
export function shuffle<T>(rng: Rng, arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
/** Shuffle, but never return the original order (for "put these in order" puzzles). */
export function shuffleNotSorted<T>(rng: Rng, arr: readonly T[]): T[] {
  if (arr.length < 2) return arr.slice();
  for (let i = 0; i < 12; i++) {
    const s = shuffle(rng, arr);
    if (s.some((v, k) => v !== arr[k])) return s;
  }
  const s = arr.slice();
  [s[0], s[1]] = [s[1], s[0]];
  return s;
}
/** n distinct picks */
export function sample<T>(rng: Rng, arr: readonly T[], n: number): T[] {
  return shuffle(rng, arr).slice(0, n);
}
