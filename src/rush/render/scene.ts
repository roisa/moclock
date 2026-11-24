/**
 * CameraController + road projection + WorldEnvironmentManager (sky, sun,
 * parallax hills/town, clouds, time-of-day) + sprite billboards + rider.
 * Classic pseudo-3D segment renderer drawn on a 2D canvas.
 */
import { SEG, type Item, type Track } from "../core/track";
import type { GameSim } from "../core/sim";
import { handAngles } from "../../engine/time";
import { sprite, star5, type Sprite } from "./sprites";
import { drawRider, drawRiderStrip, type Look, type Sheets } from "./rider";
import { Particles } from "./particles";
import { daylight } from "../core/clock";

const CAM_H = 1000;
const ROAD_W = 1000;
const FOV = 100;
const CAM_D = 1 / Math.tan(((FOV / 2) * Math.PI) / 180);
export const PLAYER_Z = CAM_H * CAM_D;
const DRAW = 120;

interface Proj { x: number; y: number; w: number; scale: number; clip: number }
const mix = (a: number[], b: number[], t: number) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(",")})`;
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));

export class Scene {
  g: CanvasRenderingContext2D;
  W = 0;
  H = 0;
  dpr = 1;
  fx = new Particles();
  body: HTMLImageElement | null = null;
  look!: Look;
  sheets: Sheets = {};
  reduced = false;
  private bySeg = new WeakMap<Track, Item[][]>();
  private pos = new Map<number, { x: number; y: number; s: number }>();
  private proj: Proj[] = Array.from({ length: DRAW + 2 }, () => ({ x: 0, y: 0, w: 0, scale: 0, clip: 0 }));
  private skyX = 0;
  private townX = 0;
  private clouds = Array.from({ length: 6 }, (_, i) => ({ x: Math.random(), y: 0.06 + (i % 3) * 0.08, s: 0.6 + Math.random() * 0.7, v: 0.004 + Math.random() * 0.006 }));
  private shake = 0;
  /** smoothed camera: lateral follow, bank (roll) into curves and steering, boost zoom */
  private camX = 0;
  private roll = 0;
  private zoom = 1;
  /** push-stride phase of the rider (radians) — drives frames, bob and dust */
  private stride = 0;
  private foot = 0;
  /** things flying across the screen (a book bundle into the backpack) */
  private flyers: { img: CanvasImageSource; w: number; h: number; x0: number; y0: number; t: number; dur: number; size: number }[] = [];
  /** Baby Mo riding sheet (6 rear frames) */
  riderStrip: HTMLImageElement | null = null;
  private vis: { i: number; a: Proj; b: Proj; fog: number }[] = [];
  constructor(public canvas: HTMLCanvasElement) {
    this.g = canvas.getContext("2d")!;
  }
  resize(w: number, h: number) {
    this.dpr = Math.min(2, window.devicePixelRatio || 1) * (w * h > 2.2e6 ? 0.75 : 1);
    this.W = w;
    this.H = h;
    this.canvas.width = Math.round(w * this.dpr);
    this.canvas.height = Math.round(h * this.dpr);
  }
  /** layout constants for the current size */
  get HOR() { return this.H * (this.H > this.W * 1.2 ? 0.34 : 0.42); }
  get KY() { return this.H * 0.5; }
  get KX() { return Math.min(this.W, this.H * 1.7) * 0.56; }
  get riderH() { return Math.max(this.KX * 0.4, this.H * 0.17); }
  /** screen position of the rider's ground contact */
  riderXY(sim: GameSim) {
    return { x: this.W / 2 + ((sim.r.x * ROAD_W - this.camX) / CAM_H) * this.KX, y: this.HOR + this.KY };
  }
  /** fly a picture from a screen point into Baby Mo's backpack */
  fly(img: CanvasImageSource, w: number, h: number, x0: number, y0: number, size: number) {
    this.flyers.push({ img, w, h, x0, y0, t: 0, dur: 0.6, size });
  }
  /** last screen position of an item (for particles on collect) */
  itemXY(id: number) {
    return this.pos.get(id);
  }
  bump() { if (!this.reduced) this.shake = 0.25; }

  private segItems(t: Track): Item[][] {
    let m = this.bySeg.get(t);
    if (!m) {
      m = Array.from({ length: t.segs.length }, () => []);
      for (const it of t.items) { const i = Math.floor(it.z / SEG); if (m[i]) m[i].push(it); }
      for (const a of m) a.sort((p, q) => Math.abs(q.x) - Math.abs(p.x)); // far-from-centre first
      this.bySeg.set(t, m);
    }
    return m;
  }

  render(sim: GameSim, clock: number, dt: number) {
    const { g, W, H } = this;
    g.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    const track = sim.track;
    const r = sim.r;
    const time = sim.time;
    const day = daylight(sim.w.span, time);
    const tunnel = sim.route === "tunnel";
    // camera
    const camZ = r.z - PLAYER_Z;
    const base = Math.floor(camZ / SEG);
    const seg = (i: number) => (i < 0 ? { curve: 0, y: 0 } : track.segs[Math.min(i, track.segs.length - 1)]);
    const yAt = (z: number) => { const i = Math.floor(z / SEG); const s = seg(i), p = seg(i - 1); const f = (z - i * SEG) / SEG; return (i <= 0 ? 0 : p.y) + (s.y - (i <= 0 ? 0 : p.y)) * f; };
    const camY = yAt(r.z) + CAM_H;
    // --- camera: follows Mo sideways with a little lag, banks into curves and steering, zooms on boost
    const ease = (k: number) => Math.min(1, dt * k);
    this.camX += (r.x * ROAD_W * 0.55 - this.camX) * ease(5);
    const camX = this.camX;
    const spd = Math.min(1.5, r.speed / 2300);
    const curveNow = seg(Math.floor(r.z / SEG)).curve;
    const rollTarget = this.reduced ? 0 : Math.max(-0.05, Math.min(0.05, -curveNow * 0.012 * spd - r.lean * 0.018));
    this.roll += (rollTarget - this.roll) * ease(3);
    this.zoom += ((r.boost > 0 && !this.reduced ? 1.07 : 1) - this.zoom) * ease(4);
    // push strides: quick running steps while speeding up, slower dabs while gliding at speed
    if (!r.stopped && !r.air) {
      const cadence = r.speed < 2300 * 0.9 || r.boost > 0 ? 2.6 : 1.4;
      this.stride += dt * cadence * Math.PI * 2 * Math.min(1, 0.35 + spd);
    }
    const foot = Math.sin(this.stride) > 0 ? 1 : 0;
    let shx = 0, shy = 0;
    if (this.shake > 0) { this.shake -= dt; shx = (Math.random() - 0.5) * 8; shy = (Math.random() - 0.5) * 6; }
    if (!this.reduced && !r.stopped && !r.air) shy += Math.abs(Math.sin(this.stride)) * 1.6; // tiny camera bob with each stride
    g.save();
    g.translate(shx, shy);
    const pivotY = H * 0.78;
    g.translate(W / 2, pivotY);
    g.rotate(this.roll);
    g.scale(this.zoom, this.zoom);
    g.translate(-W / 2, -pivotY);

    // --- sky & environment
    const s0 = seg(base);
    if (!r.stopped) { this.skyX += s0.curve * r.speed * dt * 0.00004; this.townX += s0.curve * r.speed * dt * 0.0001; }
    this.drawSky(day, tunnel, dt);

    // --- road segments (front to back), remembering projections for sprites
    const pct = (camZ - base * SEG) / SEG;
    let x = 0;
    let dx = -(s0.curve * pct);
    let maxy = H;
    let nv = 0;
    const HOR = this.HOR, KX = this.KX, KY = this.KY;
    const project = (wx: number, wy: number, wz: number, o: Proj) => {
      const cz = Math.max(1, wz - camZ);
      o.scale = CAM_D / cz;
      o.x = W / 2 + o.scale * (wx - camX) * KX;
      o.y = HOR - o.scale * (wy - camY) * KY;
      o.w = o.scale * ROAD_W * KX;
    };
    const p1: Proj = { x: 0, y: 0, w: 0, scale: 0, clip: 0 }, p2: Proj = { ...p1 };
    for (let n = 0; n < DRAW; n++) {
      const i = base + n;
      const sg = seg(i);
      const prevY = i <= 0 ? 0 : seg(i - 1).y;
      project(-x, prevY, i * SEG, p1);
      project(-x - dx, sg.y, (i + 1) * SEG, p2);
      x += dx;
      dx += sg.curve;
      const pr = this.proj[n];
      pr.x = p1.x; pr.y = p1.y; pr.w = p1.w; pr.scale = p1.scale; pr.clip = maxy;
      if (i * SEG - camZ <= CAM_D || p2.y >= p1.y || p2.y >= maxy) continue;
      const v = this.vis[nv++] ?? (this.vis[nv - 1] = { i: 0, a: { ...p1 }, b: { ...p2 }, fog: 0 });
      v.i = i; v.fog = n / DRAW;
      Object.assign(v.a, p1); Object.assign(v.b, p2);
      maxy = p1.y;
    }
    // draw far → near so each nearer strip covers the 1–2 px overlap of the one behind it (no seams)
    for (let k = nv - 1; k >= 0; k--) this.drawSegment(this.vis[k].i, this.vis[k].a, this.vis[k].b, this.vis[k].fog, tunnel, day);
    // --- sprites back to front
    const items = this.segItems(track);
    this.pos.clear();
    for (let n = DRAW - 1; n >= 0; n--) {
      const i = base + n;
      const list = items[i];
      if (!list || !list.length) continue;
      const pa = this.proj[n], pb = this.proj[n + 1];
      for (const it of list) {
        if (it.hit && !it.wide && !["bunny", "bunny-home", "tunnel", "ramp", "boost"].includes(it.kind)) continue;
        const f = (it.z - i * SEG) / SEG;
        const sc = pa.scale + (pb.scale - pa.scale) * f;
        const cx = pa.x + (pb.x - pa.x) * f;
        const cy = pa.y + (pb.y - pa.y) * f;
        if (sc <= 0) continue;
        this.drawItem(it, cx + sc * it.x * ROAD_W * KX, cy, sc * ROAD_W * KX, pa.clip, clock, time);
      }
    }
    // --- rider
    const rp = this.riderXY(sim);
    if (this.riderStrip) {
      drawRiderStrip(g, rp.x, rp.y, this.riderH * 1.12, r, clock, this.riderStrip, this.stride, curveNow);
      // a little dust puff from the foot that pushes off
      if (foot !== this.foot && !r.stopped && !r.air && r.speed > 300 && !this.reduced)
        this.fx.emit("dust", rp.x + (foot ? 1 : -1) * this.riderH * 0.2, rp.y - 6, 2, { speed: 60, size: 6, life: 0.45 });
    } else drawRider(g, rp.x, rp.y, this.riderH, r, clock, this.body, this.look, this.sheets);
    this.foot = foot;
    // flying book bundles → backpack
    for (let k = this.flyers.length - 1; k >= 0; k--) {
      const f = this.flyers[k];
      f.t += dt;
      const u = Math.min(1, f.t / f.dur), e = u * u * (3 - 2 * u);
      const tx = rp.x, ty = rp.y - this.riderH * 0.62;
      const x = f.x0 + (tx - f.x0) * e, y = f.y0 + (ty - f.y0) * e - Math.sin(u * Math.PI) * this.riderH * 0.5;
      const s = f.size * (1 - 0.55 * e);
      g.drawImage(f.img, x - s / 2, y - (s * f.h) / f.w / 2, s, (s * f.h) / f.w);
      if (u >= 1) { this.flyers.splice(k, 1); this.fx.emit("star", tx, ty, 8, { color: "#ffd23f", size: 7, speed: 160 }); }
    }
    // speed lines + particles
    if (!this.reduced && ((r.boost > 0 && Math.random() < 0.7) || (spd > 0.95 && Math.random() < 0.12))) this.fx.lines(W, H, r.boost > 0 ? 2 : 1);
    this.fx.update(dt);
    this.fx.draw(g);
    if (tunnel) {
      const v = g.createRadialGradient(W / 2, H * 0.5, H * 0.2, W / 2, H * 0.5, W * 0.7);
      v.addColorStop(0, "rgba(255,240,200,0)");
      v.addColorStop(1, "rgba(180,120,220,.35)");
      g.fillStyle = v;
      g.fillRect(0, 0, W, H);
    }
    g.restore();
  }

  private drawSky(day: number, tunnel: boolean, dt: number) {
    const { g, W, H } = this;
    const HOR = this.HOR;
    const top = tunnel ? [255, 214, 236] : hex("#ffcf8a").map((v, i) => v + (hex("#6cbcff")[i] - v) * day);
    const bot = tunnel ? [255, 246, 214] : hex("#fff1d6").map((v, i) => v + (hex("#d8f0ff")[i] - v) * day);
    const sky = g.createLinearGradient(0, 0, 0, HOR + 40);
    sky.addColorStop(0, mix(top, top, 0));
    sky.addColorStop(1, mix(bot, bot, 0));
    g.fillStyle = sky;
    g.fillRect(-W * 0.3, -H * 0.3, W * 1.6, HOR + 60 + H * 0.3);
    // ground under everything (the camera banks, so cover the corners)
    g.fillStyle = tunnel ? "#fff0c8" : mix([116, 196, 96], [104, 190, 88], day);
    g.fillRect(-W * 0.3, HOR + 40, W * 1.6, H);
    if (tunnel) return;
    // sun climbs as the morning goes on
    const sx = W * 0.78, sy = HOR - (HOR * 0.75) * (0.25 + 0.75 * day);
    const halo = g.createRadialGradient(sx, sy, 4, sx, sy, H * 0.2);
    halo.addColorStop(0, "rgba(255,250,210,.95)");
    halo.addColorStop(0.25, "rgba(255,230,140,.5)");
    halo.addColorStop(1, "rgba(255,230,140,0)");
    g.fillStyle = halo;
    g.fillRect(sx - H * 0.2, sy - H * 0.2, H * 0.4, H * 0.4);
    g.fillStyle = "#fff6c8";
    g.beginPath(); g.arc(sx, sy, H * 0.045, 0, 7); g.fill();
    // clouds
    for (const c of this.clouds) {
      c.x = (c.x + c.v * dt + 1) % 1.2;
      const cx = (c.x - 0.1) * W * 1.2 - this.skyX * W * 0.5 % (W * 1.2), cy = c.y * H, s = c.s * H * 0.05;
      g.fillStyle = "rgba(255,255,255,.9)";
      g.beginPath(); g.arc(cx, cy, s, 0, 7); g.arc(cx + s * 1.1, cy - s * 0.4, s * 1.2, 0, 7); g.arc(cx + s * 2.2, cy, s * 0.9, 0, 7); g.fill();
    }
    // far hills + town strip (parallax, tiled)
    this.tile(sprite("hill"), this.skyX * 0.6, HOR + 6, H * 0.2);
    this.tile(sprite("town"), this.townX, HOR + 4, H * 0.11);
  }
  private tile(s: Sprite, off: number, bottom: number, h: number) {
    const w = (h * s.w) / s.h;
    let x0 = -(((off * this.W) % w) + w) % w - w * Math.ceil((this.W * 0.3) / w);
    for (; x0 < this.W * 1.3; x0 += w) this.g.drawImage(s.img, x0, bottom - h, w + 1, h);
  }

  private drawSegment(i: number, p1: Proj, p2: Proj, fog: number, tunnel: boolean, day: number) {
    const { g, W } = this;
    const alt = Math.floor(i / 3) % 2 === 0;
    // grass
    g.fillStyle = tunnel ? (alt ? "#ffe3f0" : "#fff0c8") : alt ? mix([126, 206, 104], [116, 200, 96], day) : mix([116, 196, 96], [104, 190, 88], day);
    g.fillRect(-W * 0.3, p2.y, W * 1.6, p1.y - p2.y + 2);
    // curb (cream / peach)
    const r1 = p1.w * 1.12, r2 = p2.w * 1.12;
    quad(g, p1.x - r1, p1.y, p1.x + r1, p2.x + r2, p2.y, p2.x - r2, tunnel ? (alt ? "#ff9ec4" : "#7fcaff") : alt ? "#fff6e3" : "#ffb38a");
    // road
    quad(g, p1.x - p1.w, p1.y, p1.x + p1.w, p2.x + p2.w, p2.y, p2.x - p2.w, alt ? "#c9cdd6" : "#c2c6cf");
    // lane dashes
    if (alt) {
      for (const l of [-1 / 3, 1 / 3]) {
        const lw1 = p1.w * 0.025, lw2 = p2.w * 0.025;
        quad(g, p1.x + l * p1.w * 1.86 - lw1, p1.y, p1.x + l * p1.w * 1.86 + lw1, p2.x + l * p2.w * 1.86 + lw2, p2.y, p2.x + l * p2.w * 1.86 - lw2, "#fffaf0");
      }
    }
    if (fog > 0.55) {
      g.fillStyle = `rgba(235,245,255,${(fog - 0.55) * 1.4})`;
      g.fillRect(-W * 0.3, p2.y, W * 1.6, p1.y - p2.y + 1);
    }
  }

  private drawItem(it: Item, x: number, y: number, unit: number, clip: number, clock: number, time: number) {
    const g = this.g;
    const s = sprite(it.kind === "balloon" ? "balloon-" + (it.id % 6) : it.kind);
    const w = s.ww * unit;
    const h = (w * s.h) / s.w;
    let bob = 0;
    let sx = 1;
    // stars and coins turn gently (never edge-on) and bob, with a soft glow behind
    if (it.kind === "star" || it.kind === "coin") { sx = 0.78 + 0.22 * Math.cos(clock * 3 + it.id); bob = Math.sin(clock * 4 + it.id) * h * 0.08; }
    if (it.kind === "balloon" || it.kind === "pocketclock") bob = Math.sin(clock * 2.4 + it.id) * h * 0.05;
    if (it.kind === "carrot" || it.kind === "gift") bob = Math.abs(Math.sin(clock * 5 + it.id)) * h * 0.15;
    if (it.kind === "bunny") bob = Math.abs(Math.sin(clock * 6)) * h * 0.06;
    const lift = it.y * unit;
    const bx = x - (w * sx) / 2, by = y - h - lift - bob;
    if (y - lift < 0 || bx > this.W || bx + w < 0) return;
    this.pos.set(it.id, { x, y: by + h / 2, s: w });
    if ((it.kind === "star" || it.kind === "coin" || it.kind === "gift" || it.kind === "carrot") && w > 6) {
      const gl = g.createRadialGradient(x, by + h / 2, 0, x, by + h / 2, w * 0.75);
      gl.addColorStop(0, "rgba(255,240,160,.55)");
      gl.addColorStop(1, "rgba(255,240,160,0)");
      g.fillStyle = gl;
      g.fillRect(x - w * 0.75, by + h / 2 - w * 0.75, w * 1.5, w * 1.5);
    }
    // clip below the hill crest that hides it
    const visH = Math.min(h, clip - by);
    if (visH <= 0) return;
    if (it.kind === "ball") {
      // beach balls roll: spin with their sideways movement
      g.save(); g.translate(x, by + h / 2); g.rotate(it.x * 5); g.drawImage(s.img, -w / 2, -h / 2, w, h); g.restore();
    } else g.drawImage(s.img, 0, 0, s.w, (s.h * visH) / h, bx, by, w * sx, visH);
    if (it.kind === "bunny" && !it.hit && w > 10) {
      // thought bubble: she is thinking about her lost carrots
      const bw = w * 0.6, cx2 = x + w * 0.35, cy2 = by - bw * 0.45 + Math.sin(clock * 3) * 3;
      g.fillStyle = "rgba(255,255,255,.95)";
      g.beginPath(); g.arc(cx2, cy2, bw / 2, 0, 7); g.arc(x + w * 0.12, by + h * 0.02, bw * 0.1, 0, 7); g.fill();
      const cr = sprite("carrot");
      g.drawImage(cr.img, cx2 - bw * 0.32, cy2 - bw * 0.32, bw * 0.64, bw * 0.64);
    }
    if (it.kind === "signpost" && w > 8) {
      // a twinkle that says "look here!" next to the secret-path sign
      const tw = (Math.sin(clock * 6) + 1) / 2;
      g.fillStyle = `rgba(255,230,120,${0.4 + tw * 0.5})`;
      star5(g, x + w * 0.45, by + h * 0.1, w * (0.12 + tw * 0.06)); g.fill();
    }
    // live overlays
    if (it.kind === "balloon") this.face(x, by + h * 0.373, w * 0.3, it.n ?? time, 1);
    else if (it.kind === "tower") this.face(x, by + h * (220 / 520), w * (46 / 220), time, 0);
    else if (it.kind === "pocketclock") this.face(x, by + h * 0.55, w * 0.2, time, 1);
    else if (it.kind === "windmill") this.sails(x, by + h * 0.4, w * 0.48, clock);
    else if (it.kind === "pickup" && !it.hit) {
      const bs = sprite("books");
      const bw = w * 0.16, bh = (bw * bs.h) / bs.w;
      g.drawImage(bs.img, x - bw / 2, by + h * 0.36 + Math.sin(clock * 3) * bh * 0.08, bw, bh);
    } else if (it.kind === "bunny-home" && it.hit) {
      const sq = sprite("bunny");
      const sw = w * 0.32;
      g.drawImage(sq.img, x - sw * 0.2, by + h * 0.55 - Math.abs(Math.sin(clock * 7)) * sw * 0.2, sw, (sw * sq.h) / sq.w);
    }
  }
  /** clock face with hands for a time (minutes of 12-h day) */
  private face(x: number, y: number, r: number, t: number, ring: number) {
    if (r < 3) return;
    const g = this.g;
    if (ring) {
      g.fillStyle = "#fffaf0"; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill();
      g.fillStyle = "#3b4a5c";
      for (let i = 0; i < 12; i++) { const a = (i * Math.PI) / 6; g.beginPath(); g.arc(x + Math.cos(a) * r * 0.8, y + Math.sin(a) * r * 0.8, r * (i % 3 ? 0.05 : 0.09), 0, 7); g.fill(); }
    }
    const { hour, minute } = handAngles(t);
    g.lineCap = "round";
    g.strokeStyle = "#ff7a2a"; g.lineWidth = Math.max(1.5, r * 0.13);
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.sin((hour * Math.PI) / 180) * r * 0.5, y - Math.cos((hour * Math.PI) / 180) * r * 0.5); g.stroke();
    g.strokeStyle = "#2f7de0"; g.lineWidth = Math.max(1.2, r * 0.09);
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.sin((minute * Math.PI) / 180) * r * 0.75, y - Math.cos((minute * Math.PI) / 180) * r * 0.75); g.stroke();
    g.fillStyle = "#3b4a5c"; g.beginPath(); g.arc(x, y, r * 0.08, 0, 7); g.fill();
  }
  private sails(x: number, y: number, r: number, clock: number) {
    const g = this.g;
    g.save(); g.translate(x, y); g.rotate(clock * 1.2);
    const cols = ["#ff9ec4", "#7fcaff", "#ffe06a", "#7ee08a"];
    for (let k = 0; k < 4; k++) { g.rotate(Math.PI / 2); g.fillStyle = cols[k]; g.beginPath(); g.moveTo(0, 0); g.lineTo(r * 0.18, -r); g.lineTo(-r * 0.12, -r); g.closePath(); g.fill(); }
    g.fillStyle = "#b7744a"; g.beginPath(); g.arc(0, 0, r * 0.08, 0, 7); g.fill();
    g.restore();
  }
}

function quad(g: CanvasRenderingContext2D, x1: number, y1: number, x2: number, x3: number, y3: number, x4: number, c: string) {
  g.fillStyle = c;
  y1 += 1; // overlap the nearer segment by a pixel: no anti-aliasing seams
  g.beginPath();
  g.moveTo(x1, y1); g.lineTo(x2, y1); g.lineTo(x3, y3); g.lineTo(x4, y3);
  g.closePath();
  g.fill();
}
export { star5 };
