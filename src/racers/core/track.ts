/**
 * Track geometry (pure maths, no Babylon): a closed Catmull-Rom spline in the
 * XZ plane, resampled at equal arc length. Everything in the race is expressed in
 * TRACK SPACE: s = distance along the centre line, lat = sideways offset
 * (+ = left of the driving direction). That keeps kart physics, AI, laps and
 * collisions simple and robust, which is what a children's arcade racer needs.
 */
export interface V2 { x: number; z: number }
export interface TrackSample { x: number; z: number; tx: number; tz: number; nx: number; nz: number; s: number; curv: number }

export interface TrackDef {
  id: string;
  points: [number, number][]; // control points (x, z), driving order
  width: number; // road width
}

function catmull(p0: V2, p1: V2, p2: V2, p3: V2, t: number): V2 {
  const t2 = t * t, t3 = t2 * t;
  const f = (a: number, b: number, c: number, d: number) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
  return { x: f(p0.x, p1.x, p2.x, p3.x), z: f(p0.z, p1.z, p2.z, p3.z) };
}

export class Track {
  readonly def: TrackDef;
  readonly samples: TrackSample[];
  readonly length: number;
  readonly half: number;
  private step: number;

  constructor(def: TrackDef, resolution = 2) {
    this.def = def;
    this.half = def.width / 2;
    const P = def.points.map(([x, z]) => ({ x, z }));
    const n = P.length;
    // dense polyline
    const dense: V2[] = [];
    for (let i = 0; i < n; i++) {
      const p0 = P[(i - 1 + n) % n], p1 = P[i], p2 = P[(i + 1) % n], p3 = P[(i + 2) % n];
      for (let k = 0; k < 40; k++) dense.push(catmull(p0, p1, p2, p3, k / 40));
    }
    const cum = [0];
    for (let i = 1; i <= dense.length; i++) {
      const a = dense[i - 1], b = dense[i % dense.length];
      cum.push(cum[i - 1] + Math.hypot(b.x - a.x, b.z - a.z));
    }
    this.length = cum[cum.length - 1];
    const count = Math.max(64, Math.round(this.length / resolution));
    this.step = this.length / count;
    const out: TrackSample[] = [];
    let j = 0;
    for (let i = 0; i < count; i++) {
      const s = i * this.step;
      while (cum[j + 1] < s) j++;
      const a = dense[j], b = dense[(j + 1) % dense.length];
      const k = (s - cum[j]) / (cum[j + 1] - cum[j] || 1);
      out.push({ x: a.x + (b.x - a.x) * k, z: a.z + (b.z - a.z) * k, tx: 0, tz: 0, nx: 0, nz: 0, s, curv: 0 });
    }
    for (let i = 0; i < count; i++) {
      const a = out[(i - 1 + count) % count], b = out[(i + 1) % count];
      const dx = b.x - a.x, dz = b.z - a.z, l = Math.hypot(dx, dz) || 1;
      out[i].tx = dx / l;
      out[i].tz = dz / l;
      // left normal (driving direction rotated +90° around Y, looking from above)
      out[i].nx = -out[i].tz;
      out[i].nz = out[i].tx;
    }
    for (let i = 0; i < count; i++) {
      const a = out[(i - 1 + count) % count], b = out[(i + 1) % count];
      const angA = Math.atan2(a.tz, a.tx), angB = Math.atan2(b.tz, b.tx);
      let d = angB - angA;
      while (d > Math.PI) d -= 2 * Math.PI;
      while (d < -Math.PI) d += 2 * Math.PI;
      out[i].curv = d / (2 * this.step); // + = turning left
    }
    this.samples = out;
  }

  /** wrap a distance into [0, length) */
  wrap(s: number): number {
    return ((s % this.length) + this.length) % this.length;
  }
  /** interpolated sample at distance s (any value; wraps) */
  at(s: number): TrackSample {
    const w = this.wrap(s);
    const f = w / this.step;
    const i = Math.floor(f) % this.samples.length;
    const a = this.samples[i], b = this.samples[(i + 1) % this.samples.length];
    const k = f - Math.floor(f);
    const tx = a.tx + (b.tx - a.tx) * k, tz = a.tz + (b.tz - a.tz) * k;
    const l = Math.hypot(tx, tz) || 1;
    return { x: a.x + (b.x - a.x) * k, z: a.z + (b.z - a.z) * k, tx: tx / l, tz: tz / l, nx: -tz / l, nz: tx / l, s: w, curv: a.curv + (b.curv - a.curv) * k };
  }
  /** world position of a track-space point */
  world(s: number, lat: number): { x: number; z: number; yaw: number } {
    const p = this.at(s);
    return { x: p.x + p.nx * lat, z: p.z + p.nz * lat, yaw: Math.atan2(p.tx, p.tz) };
  }
  /** nearest track distance to a world point (used for scenery placement) */
  nearest(x: number, z: number): { s: number; d: number } {
    let best = 0, bd = Infinity;
    for (const p of this.samples) {
      const d = (p.x - x) ** 2 + (p.z - z) ** 2;
      if (d < bd) {
        bd = d;
        best = p.s;
      }
    }
    return { s: best, d: Math.sqrt(bd) };
  }
}
