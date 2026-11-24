/** ParticleManager — fixed pool, screen-space, no allocation per frame. */
import { star5 } from "./sprites";

type Kind = "spark" | "star" | "dust" | "drop" | "confetti" | "heart" | "line";
interface P { on: boolean; k: Kind; x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; color: string; rot: number; vr: number }
const COLORS = ["#ff7a7a", "#ffd23f", "#7ee08a", "#7fcaff", "#b8a5ff", "#ff9ec4"];

export class Particles {
  pool: P[] = Array.from({ length: 320 }, () => ({ on: false, k: "spark", x: 0, y: 0, vx: 0, vy: 0, life: 0, max: 1, size: 1, color: "#fff", rot: 0, vr: 0 }));
  private take(): P | null {
    for (const p of this.pool) if (!p.on) return p;
    return null;
  }
  emit(k: Kind, x: number, y: number, n: number, opt: { speed?: number; size?: number; color?: string; up?: number; life?: number } = {}) {
    for (let i = 0; i < n; i++) {
      const p = this.take();
      if (!p) return;
      const a = Math.random() * Math.PI * 2, s = (opt.speed ?? 220) * (0.4 + Math.random() * 0.8);
      Object.assign(p, {
        on: true, k, x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - (opt.up ?? 0), life: 0, max: (opt.life ?? 0.7) * (0.7 + Math.random() * 0.6),
        size: (opt.size ?? 8) * (0.6 + Math.random() * 0.8), color: opt.color ?? COLORS[(Math.random() * COLORS.length) | 0], rot: Math.random() * 6, vr: (Math.random() - 0.5) * 10,
      });
    }
  }
  /** speed lines from the screen edges toward the vanishing point */
  lines(w: number, h: number, n: number) {
    for (let i = 0; i < n; i++) {
      const p = this.take();
      if (!p) return;
      const side = Math.random() < 0.5 ? -1 : 1;
      Object.assign(p, { on: true, k: "line", x: w / 2 + side * w * (0.25 + Math.random() * 0.25), y: h * (0.35 + Math.random() * 0.5), vx: side * w * 1.6, vy: h * 0.6, life: 0, max: 0.25, size: 2 + Math.random() * 3, color: "rgba(255,255,255,.85)", rot: 0, vr: 0 });
    }
  }
  update(dt: number) {
    for (const p of this.pool) {
      if (!p.on) continue;
      p.life += dt;
      if (p.life >= p.max) { p.on = false; continue; }
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      if (p.k === "drop" || p.k === "confetti") p.vy += 900 * dt;
      if (p.k === "dust") { p.vx *= 0.92; p.vy *= 0.92; p.size += 30 * dt; }
      if (p.k === "heart") p.vy = -80;
    }
  }
  draw(g: CanvasRenderingContext2D) {
    for (const p of this.pool) {
      if (!p.on) continue;
      const f = p.life / p.max;
      g.globalAlpha = 1 - f * f;
      g.fillStyle = p.color;
      switch (p.k) {
        case "star": star5(g, p.x, p.y, p.size); g.fill(); break;
        case "spark": g.beginPath(); g.arc(p.x, p.y, p.size * (1 - f * 0.6), 0, 7); g.fill(); break;
        case "dust": g.fillStyle = "rgba(255,250,235,.8)"; g.beginPath(); g.arc(p.x, p.y, p.size, 0, 7); g.fill(); break;
        case "drop": g.fillStyle = "#9fd6ff"; g.beginPath(); g.arc(p.x, p.y, p.size * 0.6, 0, 7); g.fill(); break;
        case "confetti": g.save(); g.translate(p.x, p.y); g.rotate(p.rot); g.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2); g.restore(); break;
        case "heart": g.fillStyle = "#ff6b8f"; g.font = `${p.size * 2}px sans-serif`; g.fillText("♥", p.x, p.y); break;
        case "line": g.strokeStyle = p.color; g.lineWidth = p.size; g.beginPath(); g.moveTo(p.x, p.y); g.lineTo(p.x - p.vx * 0.04, p.y - p.vy * 0.04); g.stroke(); break;
      }
    }
    g.globalAlpha = 1;
  }
  clear() { for (const p of this.pool) p.on = false; }
}
