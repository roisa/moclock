/**
 * AnimationController + placeholder rider rig.
 *
 * Until the generated riding sheets exist (docs/rush/04, images 4–12), Baby Mo is
 * the render-1 "from behind" pose (baby-mo-pose-38), cropped at the waist as
 * the art rules ask, sitting on a procedurally drawn rear-view balance bike
 * with drawn legs (scooting / gliding) and arms to the grips. When a sheet for
 * the current clip is in public/rush/art, it is drawn instead with the same
 * anchor (rear-wheel contact).
 */
import type { Rider, Anim } from "../core/player";
import { animOf, CRUISE } from "../core/player";
import { rr, lin, star5 } from "./sprites";

export interface Look { frame: string; trim: string; bag: string; helmet: string }
export const BIKES: Record<string, Look> = {
  green: { frame: "#4cbf5a", trim: "#fff6e3", bag: "#ffd23f", helmet: "#ffffff" },
  blue: { frame: "#4aa8f0", trim: "#fff6e3", bag: "#ffd23f", helmet: "#ffffff" },
  yellow: { frame: "#ffc928", trim: "#fff6e3", bag: "#7fcaff", helmet: "#ffffff" },
  pink: { frame: "#ff8fbf", trim: "#fff6e3", bag: "#ffd23f", helmet: "#ffffff" },
  lavender: { frame: "#a98ef0", trim: "#fff6e3", bag: "#ffd23f", helmet: "#ffffff" },
  rainbow: { frame: "rainbow", trim: "#fff6e3", bag: "#ffd23f", helmet: "#ffffff" },
};

export interface Sheets { [clip: string]: { img: HTMLImageElement; w: number; h: number; frames: number; fps: number } }
const FPS: Partial<Record<Anim, number>> = { idle: 6, ride: 12, push: 12, "lean-l": 12, "lean-r": 12, prep: 14, air: 10, land: 16, boost: 14, pickup: 12, wobble: 12, celebrate: 10 };
const SHEET_OF: Record<Anim, string> = { idle: "mo-idle-bike", push: "mo-push", ride: "mo-ride-loop", "lean-l": "mo-lean-left", "lean-r": "mo-lean-right", prep: "mo-jump-prep", air: "mo-jump-air", land: "mo-land", boost: "mo-boost", pickup: "mo-pickup", wobble: "mo-wobble", celebrate: "mo-idle-bike" };

/**
 * Draw the rider with the rear-wheel ground contact at (x, y). H = rider height in px.
 * `clock` is a running time in seconds (for cycles).
 */
export function drawRider(g: CanvasRenderingContext2D, x: number, y: number, H: number, r: Rider, clock: number, body: HTMLImageElement | null, look: Look, sheets: Sheets = {}) {
  const anim = animOf(r);
  const lift = r.h * H * 1.6;
  // shadow on the road
  g.fillStyle = "rgba(40,50,40,.22)";
  g.beginPath();
  g.ellipse(x, y, H * (0.24 - Math.min(0.1, r.h * 0.15)), H * 0.05, 0, 0, 7);
  g.fill();

  g.save();
  g.translate(x, y - lift);
  let rot = r.lean * 0.16;
  if (r.wobble > 0) rot += Math.sin(r.wobble * 22) * 0.16 * (r.wobble / 0.6) * r.wobbleDir;
  g.rotate(rot);
  let sx = 1, sy = 1;
  if (r.prep > 0) { sx = 1.06; sy = 0.92; }
  if (r.land > 0) { const k = r.land / 0.2; sx = 1 + 0.12 * k; sy = 1 - 0.12 * k; }
  if (r.air) { sx = 0.96; sy = 1.05; }
  g.scale(sx, sy);

  const sheetId = SHEET_OF[anim];
  const sh = sheets[sheetId] || (anim === "ride" && r.carrying ? sheets["mo-ride-carry"] : undefined);
  if (sh) {
    const fps = anim === "ride" ? 8 + 8 * Math.min(1, r.speed / CRUISE) : sh.fps || FPS[anim] || 12;
    const f = Math.floor(clock * fps) % sh.frames;
    const dh = H * 1.25, dw = (dh * sh.w) / sh.h;
    g.drawImage(sh.img, f * sh.w, 0, sh.w, sh.h, -dw / 2, -dh * 0.92, dw, dh);
    g.restore();
    return;
  }
  rig(g, H, r, anim, clock, body, look);
  g.restore();
}

function frameFill(g: CanvasRenderingContext2D, look: Look, y0: number, y1: number) {
  if (look.frame !== "rainbow") return look.frame;
  const l = g.createLinearGradient(0, y0, 0, y1);
  ["#ff7a7a", "#ffb36b", "#ffe06a", "#7ee08a", "#7fcaff", "#b8a5ff"].forEach((c, i) => l.addColorStop(i / 5, c));
  return l;
}

function rig(g: CanvasRenderingContext2D, H: number, r: Rider, anim: Anim, clock: number, body: HTMLImageElement | null, look: Look) {
  const u = H;
  const moving = !r.stopped && r.speed > 50;
  const bob = moving && !r.air ? Math.sin(clock * 14) * u * 0.008 : 0;
  // --- front wheel peeking above/behind (smaller, further away)
  g.fillStyle = "#4a5260";
  rr(g, -u * 0.03, -u * 0.36, u * 0.06, u * 0.2, u * 0.03);
  g.fill();
  // --- rear wheel (edge-on from behind)
  g.fillStyle = lin(g, -u * 0.34, 0, "#5a6372", "#2f3540");
  rr(g, -u * 0.05, -u * 0.34, u * 0.1, u * 0.34, u * 0.05);
  g.fill();
  g.fillStyle = "#fff6e3";
  rr(g, -u * 0.018, -u * 0.3, u * 0.036, u * 0.26, u * 0.018);
  g.fill();
  g.fillStyle = "#ffd23f";
  g.beginPath(); g.arc(0, -u * 0.17, u * 0.026, 0, 7); g.fill();
  // tread marks rolling
  if (moving) {
    g.fillStyle = "rgba(255,255,255,.35)";
    const off = ((clock * r.speed * 0.02) % 1) * u * 0.08;
    for (let k = 0; k < 4; k++) { const yy = -u * 0.33 + ((off + k * u * 0.08) % (u * 0.32)); g.fillRect(-u * 0.045, yy, u * 0.012, u * 0.02); g.fillRect(u * 0.033, yy, u * 0.012, u * 0.02); }
  }
  // --- frame + fork, footrests
  g.fillStyle = frameFill(g, look, -u * 0.5, 0);
  rr(g, -u * 0.05, -u * 0.44, u * 0.1, u * 0.16, u * 0.04); g.fill(); // seat stays
  g.fillStyle = "#8a93a3";
  for (const s of [-1, 1]) { rr(g, s * u * 0.06 - (s < 0 ? u * 0.1 : 0), -u * 0.15, u * 0.1, u * 0.03, u * 0.015); g.fill(); }
  // --- handlebar (in front of Mo → drawn before his body)
  g.strokeStyle = frameFill(g, look, -u * 0.7, -u * 0.6) as string;
  g.lineWidth = u * 0.035; g.lineCap = "round";
  g.beginPath(); g.moveTo(-u * 0.3, -u * 0.6); g.quadraticCurveTo(0, -u * 0.66, u * 0.3, -u * 0.6); g.stroke();
  g.fillStyle = "#ff9e6b";
  for (const s of [-1, 1]) { rr(g, s * u * 0.3 - u * 0.045, -u * 0.63, u * 0.09, u * 0.05, u * 0.025); g.fill(); }
  g.fillStyle = "#ffd23f"; g.beginPath(); g.arc(u * 0.22, -u * 0.645, u * 0.022, 0, 7); g.fill();
  // --- legs (behind backpack, in front of the bike)
  const pushing = anim === "push" || anim === "idle" && !r.stopped;
  for (const s of [-1, 1]) {
    let fx = s * u * 0.16, fy = -u * 0.14; // on the footrests (glide)
    if (anim === "idle" || anim === "celebrate") { fx = s * u * 0.2; fy = 0; }
    else if (pushing) {
      const ph = clock * 9 + (s > 0 ? Math.PI : 0);
      const down = Math.max(0, Math.sin(ph));
      fx = s * u * (0.18 + 0.03 * down); fy = -u * 0.14 * (1 - down) + bob;
    } else if (anim === "wobble") { if (s === -r.wobbleDir) { fx = s * u * 0.24; fy = 0; } }
    else if (anim === "air") { fx = s * u * 0.2; fy = -u * 0.2; }
    g.strokeStyle = "#45ad52"; g.lineWidth = u * 0.075;
    g.beginPath(); g.moveTo(s * u * 0.08, -u * 0.36 + bob); g.quadraticCurveTo(s * u * 0.2, -u * 0.3, fx, fy - u * 0.04); g.stroke();
    g.fillStyle = "#3d9a48"; g.beginPath(); g.ellipse(fx, fy - u * 0.02, u * 0.05, u * 0.032, 0, 0, 7); g.fill();
  }
  // --- seat
  g.fillStyle = "#ff9e6b"; g.beginPath(); g.ellipse(0, -u * 0.42 + bob, u * 0.1, u * 0.035, 0, 0, 7); g.fill();
  // --- Baby Mo (render 1 from behind), upper body only (cut at the waist)
  const bh = u * 0.7;
  if (body && body.naturalWidth) {
    const cropH = body.naturalHeight * 0.8; // waist-up
    const bw = (bh * body.naturalWidth) / cropH;
    g.drawImage(body, 0, 0, body.naturalWidth, cropH, -bw / 2 - u * 0.02, -u * 1.02 + bob, bw, bh);
  } else {
    g.fillStyle = "#4cbf5a"; rr(g, -u * 0.17, -u * 0.66 + bob, u * 0.34, u * 0.32, u * 0.12); g.fill();
    g.fillStyle = "#222"; g.beginPath(); g.arc(0, -u * 0.8 + bob, u * 0.2, 0, 7); g.fill();
  }
  // --- arms reaching forward to the grips (sleeves orange-peach)
  const reach = anim === "pickup" ? Math.sin(Math.min(1, (0.6 - r.pickup) / 0.6) * Math.PI) : 0;
  for (const s of [-1, 1]) {
    const gx = s * u * 0.29, gy = -u * 0.61;
    g.strokeStyle = "#ff9e6b"; g.lineWidth = u * 0.06; g.lineCap = "round";
    g.beginPath();
    g.moveTo(s * u * 0.15, -u * 0.62 + bob);
    if (s > 0 && reach > 0) g.lineTo(u * (0.3 + 0.1 * reach), -u * (0.7 + 0.35 * reach));
    else if (anim === "celebrate") g.lineTo(s * u * 0.3, -u * 1.05);
    else g.lineTo(gx, gy);
    g.stroke();
  }
  // --- backpack (covers the folded legs of the sitting pose); books peek out when carrying
  const by = -u * 0.6 + bob + (r.carrying ? Math.sin(clock * 14 - 0.6) * u * 0.006 : 0);
  if (r.carrying) {
    const cols = ["#7fcaff", "#ff9e6b", "#9be585"];
    for (let k = 0; k < Math.min(3, r.carrying); k++) { g.fillStyle = cols[k]; rr(g, -u * 0.12 + k * u * 0.08, by - u * 0.07 - (k % 2) * u * 0.02, u * 0.07, u * 0.12, u * 0.015); g.fill(); }
  }
  g.fillStyle = lin(g, by, by + u * 0.26, look.bag, shade(look.bag));
  rr(g, -u * 0.15, by, u * 0.3, u * 0.25, u * 0.07); g.fill();
  g.fillStyle = "rgba(255,255,255,.35)"; rr(g, -u * 0.12, by + u * 0.02, u * 0.24, u * 0.04, u * 0.02); g.fill();
  g.fillStyle = "#4cbf5a"; star5(g, 0, by + u * 0.14, u * 0.05); g.fill();
  g.strokeStyle = "#ff9e6b"; g.lineWidth = u * 0.025;
  for (const s of [-1, 1]) { g.beginPath(); g.moveTo(s * u * 0.11, by); g.lineTo(s * u * 0.13, by - u * 0.06); g.stroke(); }
}

function shade(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v: number) => Math.max(0, Math.round(v * 0.78));
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`;
}

/**
 * Baby Mo from the approved riding sheet (6 rear frames, art-src/rush/p04-ride-user.png):
 * frames 2 / 5 straight, 1 / 4 turning left, 3 / 6 turning right — alternated with each
 * push stride, plus procedural lean (steering + curves), stride bob and sway, jump
 * squash / stretch and a gentle wobble on bumps.
 */
export function drawRiderStrip(g: CanvasRenderingContext2D, x: number, y: number, H: number, r: Rider, clock: number, strip: HTMLImageElement, stride: number, curve: number) {
  const n = 6, fw = strip.naturalWidth / n, fh = strip.naturalHeight;
  const anim = animOf(r);
  const foot = Math.sin(stride) > 0 ? 0 : 1;
  let idx = foot ? 4 : 1;
  if (r.lean < -0.3) idx = foot ? 3 : 0;
  else if (r.lean > 0.3) idx = foot ? 5 : 2;
  if (r.stopped || r.air) idx = 4;
  const lift = r.h * H * 1.5;
  // soft shadow (shrinks while airborne)
  g.fillStyle = "rgba(40,50,40,.22)";
  g.beginPath();
  g.ellipse(x, y, H * (0.2 - Math.min(0.08, r.h * 0.12)), H * 0.045, 0, 0, 7);
  g.fill();
  g.save();
  const moving = !r.stopped && !r.air;
  const bob = moving ? Math.abs(Math.sin(stride)) * H * 0.016 : 0;
  const sway = moving ? Math.sin(stride) * H * 0.008 : 0;
  let hop = 0;
  if (anim === "celebrate") hop = Math.abs(Math.sin(clock * 6)) * H * 0.08;
  g.translate(x + sway, y - lift - bob - hop);
  let rot = r.lean * 0.14 + Math.max(-0.08, Math.min(0.08, curve * 0.025 * Math.min(1, r.speed / 2300)));
  if (r.wobble > 0) rot += Math.sin(r.wobble * 22) * 0.16 * (r.wobble / 0.6) * r.wobbleDir;
  if (r.air) rot += Math.sin(clock * 5) * 0.04;
  g.rotate(rot);
  let sx = 1, sy = 1;
  if (r.prep > 0) { sx = 1.06; sy = 0.92; }
  if (r.land > 0) { const k = r.land / 0.2; sx = 1 + 0.1 * k; sy = 1 - 0.1 * k; }
  if (r.air) { sx = 0.97; sy = 1.04; }
  if (moving) sy *= 1 - Math.abs(Math.sin(stride)) * 0.012;
  g.scale(sx, sy);
  const dh = H, dw = (dh * fw) / fh;
  g.drawImage(strip, idx * fw, 0, fw, fh, -dw / 2, -dh, dw, dh);
  g.restore();
}
