/**
 * Clay look: soft matte materials with a hint of sheen, cached by colour,
 * plus procedural textures drawn on canvases (no image downloads):
 * road, chevron curbs, checkers, emblems, clock faces, signs.
 */
import type { Scene } from "@babylonjs/core/scene";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial";
import { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";
import { Texture } from "@babylonjs/core/Materials/Textures/texture";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { hourOf, minuteOf, handAngles } from "../../engine/time";

export const hex = (h: string) => Color3.FromHexString(h);

const cache = new WeakMap<Scene, Map<string, StandardMaterial>>();
/** matte clay material; `glow` adds a little self-light so colours stay bright in shade */
export function clay(scene: Scene, color: string, opts: { glow?: number; shine?: number; alpha?: number } = {}): StandardMaterial {
  let m = cache.get(scene);
  if (!m) cache.set(scene, (m = new Map()));
  const key = color + "|" + (opts.glow ?? 0.12) + "|" + (opts.shine ?? 0.12) + "|" + (opts.alpha ?? 1);
  const hit = m.get(key);
  if (hit) return hit;
  const mat = new StandardMaterial("clay-" + key, scene);
  const c = hex(color);
  mat.diffuseColor = c;
  mat.specularColor = new Color3(1, 1, 1).scale(opts.shine ?? 0.12);
  mat.specularPower = 24;
  mat.emissiveColor = c.scale(opts.glow ?? 0.12);
  if (opts.alpha != null && opts.alpha < 1) mat.alpha = opts.alpha;
  m.set(key, mat);
  return mat;
}

export function canvasTex(scene: Scene, name: string, w: number, h: number, draw: (c: CanvasRenderingContext2D, w: number, h: number) => void, opts: { alpha?: boolean; mip?: boolean } = {}) {
  const t = new DynamicTexture(name, { width: w, height: h }, scene, opts.mip ?? true);
  const c = t.getContext() as unknown as CanvasRenderingContext2D;
  draw(c, w, h);
  t.hasAlpha = !!opts.alpha;
  t.update();
  return t;
}

export function texturedMat(scene: Scene, name: string, tex: DynamicTexture, opts: { glow?: number; unlit?: boolean; alpha?: boolean } = {}) {
  const m = new StandardMaterial(name, scene);
  m.diffuseTexture = tex;
  m.specularColor = new Color3(0.06, 0.06, 0.06);
  if (opts.unlit) {
    m.disableLighting = true;
    m.emissiveTexture = tex;
  } else m.emissiveColor = new Color3(1, 1, 1).scale(opts.glow ?? 0.12);
  if (opts.alpha) {
    m.useAlphaFromDiffuseTexture = true;
    tex.hasAlpha = true;
  }
  return m;
}

/** lavender-grey road with soft speckle and a dashed centre line (v repeats along the track) */
export function roadTexture(scene: Scene) {
  const t = canvasTex(scene, "road", 256, 256, (c, w, h) => {
    c.fillStyle = "#8f88ad";
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 900; i++) {
      c.fillStyle = Math.random() > 0.5 ? "rgba(255,255,255,0.05)" : "rgba(40,30,80,0.06)";
      c.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }
    // the ribbon's v runs ALONG the road, u across it: dashes along y, darker edges left/right
    c.fillStyle = "rgba(255,255,255,0.85)";
    c.fillRect(w / 2 - 4, 0, 8, h * 0.55);
    const g = c.createLinearGradient(0, 0, w, 0);
    g.addColorStop(0, "rgba(40,30,80,0.25)");
    g.addColorStop(0.08, "rgba(0,0,0,0)");
    g.addColorStop(0.92, "rgba(0,0,0,0)");
    g.addColorStop(1, "rgba(40,30,80,0.25)");
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
  });
  t.wrapU = Texture.CLAMP_ADDRESSMODE;
  return t;
}
/** orange/yellow chevron curb stripes */
export function curbTexture(scene: Scene, a = "#ff9a3d", b = "#ffd84a") {
  return canvasTex(scene, "curb", 64, 64, (c, w, h) => {
    c.fillStyle = a;
    c.fillRect(0, 0, w, h);
    c.fillStyle = b;
    // chevron pointing along the road (v)
    c.beginPath();
    c.moveTo(0, h); c.lineTo(w / 2, 0); c.lineTo(w, h); c.lineTo(w * 0.62, h); c.lineTo(w / 2, h * 0.55); c.lineTo(w * 0.38, h);
    c.fill();
  });
}
export function checkerTexture(scene: Scene, n = 8) {
  return canvasTex(scene, "checker", 256, 64, (c, w, h) => {
    const sz = h / 2;
    for (let x = 0; x < w / sz; x++) for (let y = 0; y < 2; y++) {
      c.fillStyle = (x + y) % 2 ? "#26313a" : "#ffffff";
      c.fillRect(x * sz, y * sz, sz, sz);
    }
    void n;
  });
}
/** grass with soft lighter blotches */
export function grassTexture(scene: Scene, base = "#7fd36d") {
  const t = canvasTex(scene, "grass", 512, 512, (c, w, h) => {
    c.fillStyle = base;
    c.fillRect(0, 0, w, h);
    for (let i = 0; i < 60; i++) {
      const g = c.createRadialGradient(0, 0, 0, 0, 0, 30 + Math.random() * 60);
      g.addColorStop(0, Math.random() > 0.5 ? "rgba(255,255,200,0.16)" : "rgba(30,110,40,0.12)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      c.save();
      c.translate(Math.random() * w, Math.random() * h);
      c.fillStyle = g;
      c.fillRect(-100, -100, 200, 200);
      c.restore();
    }
  });
  t.uScale = t.vScale = 30;
  return t;
}
export function skyTexture(scene: Scene, top: string, bottom: string) {
  return canvasTex(scene, "sky", 4, 256, (c, w, h) => {
    const g = c.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, top);
    g.addColorStop(0.55, bottom);
    g.addColorStop(1, bottom);
    c.fillStyle = g;
    c.fillRect(0, 0, w, h);
  }, { mip: false });
}

/** emblem decal: star, moon or shield-star on a round badge */
export function emblemTexture(scene: Scene, kind: "star" | "moon" | "shield" | "heart" | "bolt", color: string) {
  return canvasTex(scene, "emblem-" + kind + color, 128, 128, (c, w) => {
    c.clearRect(0, 0, w, w);
    c.fillStyle = "#ffffff";
    c.strokeStyle = color;
    c.lineWidth = 6;
    const cx = w / 2, cy = w / 2;
    c.beginPath();
    if (kind === "star" || kind === "shield") {
      if (kind === "shield") {
        c.moveTo(cx, 10); c.lineTo(w - 16, 26); c.lineTo(w - 22, 80); c.quadraticCurveTo(cx, 124, 22, 80); c.lineTo(16, 26); c.closePath();
        c.fill(); c.stroke();
        c.beginPath();
        c.fillStyle = color;
      }
      const R = kind === "shield" ? 30 : 56, r = R * 0.45, oy = kind === "shield" ? 4 : 0;
      for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r : R;
        c.lineTo(cx + Math.cos(a) * rr, cy + oy + Math.sin(a) * rr);
      }
      c.closePath();
      c.fill();
    } else if (kind === "moon") {
      c.arc(cx, cy, 52, 0, Math.PI * 2);
      c.fill();
      c.globalCompositeOperation = "destination-out";
      c.beginPath();
      c.arc(cx + 24, cy - 10, 46, 0, Math.PI * 2);
      c.fill();
      c.globalCompositeOperation = "source-over";
    } else if (kind === "heart") {
      c.moveTo(cx, 108); c.bezierCurveTo(-10, 50, 30, 0, cx, 36); c.bezierCurveTo(98, 0, 138, 50, cx, 108);
      c.fill();
    } else {
      c.moveTo(74, 8); c.lineTo(30, 70); c.lineTo(60, 70); c.lineTo(48, 120); c.lineTo(98, 52); c.lineTo(66, 52); c.closePath();
      c.fill();
    }
  }, { alpha: true });
}

/** an analog clock face (hour hand orange, minute hand blue — same as the 2D clock) */
export function drawClockFace(c: CanvasRenderingContext2D, size: number, t: number, rim = "#ff9a3d") {
  const r = size / 2;
  c.clearRect(0, 0, size, size);
  c.save();
  c.translate(r, r);
  c.fillStyle = rim;
  c.beginPath(); c.arc(0, 0, r - 2, 0, Math.PI * 2); c.fill();
  c.fillStyle = "#fff8ec";
  c.beginPath(); c.arc(0, 0, r * 0.86, 0, Math.PI * 2); c.fill();
  c.fillStyle = "#2b3a2e";
  c.font = `700 ${Math.round(r * 0.22)}px Fredoka, Nunito, sans-serif`;
  c.textAlign = "center";
  c.textBaseline = "middle";
  for (let n = 1; n <= 12; n++) {
    const a = (n * Math.PI) / 6;
    c.fillText(String(n), Math.sin(a) * r * 0.66, -Math.cos(a) * r * 0.66);
  }
  const { hour, minute } = handAngles(t);
  const hand = (deg: number, len: number, w: number, col: string) => {
    const a = (deg * Math.PI) / 180;
    c.strokeStyle = col; c.lineWidth = w; c.lineCap = "round";
    c.beginPath(); c.moveTo(0, 0); c.lineTo(Math.sin(a) * len, -Math.cos(a) * len); c.stroke();
  };
  hand(hour, r * 0.42, r * 0.11, "#ff8a2a");
  hand(minute, r * 0.66, r * 0.07, "#3a8ef0");
  c.fillStyle = "#ffd23f";
  c.beginPath(); c.arc(0, 0, r * 0.07, 0, Math.PI * 2); c.fill();
  c.restore();
  void hourOf; void minuteOf;
}

/** a rounded sign with big text (gate labels, day names) */
export function signTexture(scene: Scene, text: string, bg: string, fg = "#ffffff", w = 512, h = 160) {
  return canvasTex(scene, "sign-" + text, w, h, (c) => {
    c.clearRect(0, 0, w, h);
    c.fillStyle = bg;
    const r = 40;
    c.beginPath();
    c.moveTo(r, 4); c.arcTo(w - 4, 4, w - 4, h - 4, r); c.arcTo(w - 4, h - 4, 4, h - 4, r); c.arcTo(4, h - 4, 4, 4, r); c.arcTo(4, 4, w - 4, 4, r);
    c.fill();
    c.lineWidth = 8;
    c.strokeStyle = "rgba(255,255,255,0.7)";
    c.stroke();
    c.fillStyle = fg;
    c.font = `700 ${Math.round(h * 0.52)}px Fredoka, Nunito, sans-serif`;
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText(text, w / 2, h / 2 + 4);
  }, { alpha: true });
}

export function glowDot(scene: Scene) {
  return canvasTex(scene, "glow-dot", 64, 64, (c, w) => {
    const g = c.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.35, "rgba(255,255,255,0.7)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    c.fillStyle = g;
    c.fillRect(0, 0, w, w);
  }, { alpha: true });
}
