/**
 * AssetLoader + procedural sprite painters.
 *
 * Fallback chain for every sprite id: generated art (public/rush/art/<id>.webp,
 * from the prompt library) → app-ayah kit image (public/rush/kit) → a painter
 * here. Painters draw once into an offscreen canvas that is reused every frame.
 */
type Img = HTMLCanvasElement | HTMLImageElement;
export interface Sprite { img: Img; w: number; h: number; /** world width in road half-widths */ ww: number; /** ground anchor (0..1 of height) */ base: number }

// relative to the page (the site root): rush/kit/… and rush/art/…
const BASE = "rush/";
const cache = new Map<string, Sprite>();
const loading = new Map<string, Promise<void>>();

/** world sizes (road half-width = 1) */
export const WORLD_W: Record<string, number> = {
  star: 0.2, coin: 0.18, gift: 0.26, balloon: 0.26, carrot: 0.2, pocketclock: 0.22, ring: 0.5, token: 0.2,
  log: 0.5, boxes: 0.36, blocks: 0.4, ball: 0.36, puddle: 0.5, ramp: 0.5, boost: 0.46,
  pickup: 2.4, tunnel: 0.72, "paper-arch": 2.6, bunny: 0.36, "bunny-home": 0.75, library: 2.2, "arch-start": 2.4,
  tree: 0.8, tree2: 0.6, house: 0.85, bush: 0.45, flowers: 0.45, lamp: 0.2, shop: 0.75, bakery: 0.85, tower: 0.75, fence: 0.55, sign: 0.35, windmill: 0.85, pond: 0.8, school: 1.2, signpost: 0.4, tent: 0.75, books: 0.4,
  "pet-puppy": 0.32, "pet-kitten": 0.3, "pet-duckling": 0.26, "pet-chick": 0.24, "pet-lamb": 0.32, "pet-hamster": 0.26, "pet-cow": 0.36, "pet-turtle-green": 0.3,
};
/** kit images used as the sprite until bespoke art exists */
const KIT: Record<string, string> = {
  star: "kit/star.webp", coin: "kit/coin.webp", gift: "kit/gift-red.webp", carrot: "kit/carrot.webp", ball: "kit/ball-beach-rainbow.webp",
  bunny: "kit/pet-rabbit.webp", "bunny-home": "kit/v-garden.webp", signpost: "kit/signpost.webp", tent: "kit/tent.webp", books: "kit/books.webp",
  "pet-puppy": "kit/pet-puppy.webp", "pet-kitten": "kit/pet-kitten.webp", "pet-duckling": "kit/pet-duckling.webp", "pet-chick": "kit/pet-chick.webp",
  "pet-lamb": "kit/pet-lamb.webp", "pet-hamster": "kit/pet-hamster.webp", "pet-cow": "kit/pet-cow.webp", "pet-turtle-green": "kit/pet-turtle-green.webp", house: "kit/v-house.webp", shop: "kit/v-market.webp",
  flowers: "kit/v-garden.webp", sign: "kit/v-sign.webp", library: "kit/v-school.webp", pond: "kit/v-pond.webp", token: "kit/p-badge.webp",
};

function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return [c, c.getContext("2d")!];
}
const rr = (g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
  g.beginPath();
  g.roundRect(x, y, w, h, r);
};
const lin = (g: CanvasRenderingContext2D, y0: number, y1: number, a: string, b: string) => {
  const l = g.createLinearGradient(0, y0, 0, y1);
  l.addColorStop(0, a);
  l.addColorStop(1, b);
  return l;
};
const rad = (g: CanvasRenderingContext2D, x: number, y: number, r: number, a: string, b: string) => {
  const l = g.createRadialGradient(x - r * 0.35, y - r * 0.4, r * 0.1, x, y, r);
  l.addColorStop(0, a);
  l.addColorStop(1, b);
  return l;
};
function blob(g: CanvasRenderingContext2D, x: number, y: number, r: number, a: string, b: string) {
  g.fillStyle = rad(g, x, y, r, a, b);
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fill();
}
function star5(g: CanvasRenderingContext2D, x: number, y: number, r: number, inner = 0.48) {
  g.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const rr2 = i % 2 ? r * inner : r;
    g.lineTo(x + Math.cos(a) * rr2, y + Math.sin(a) * rr2);
  }
  g.closePath();
}

/* ---------------- painters: (g, w, h) on a canvas of that size */
type Painter = { w: number; h: number; base?: number; draw: (g: CanvasRenderingContext2D, w: number, h: number) => void };
const P: Record<string, Painter> = {
  tree: { w: 220, h: 300, draw(g) {
    g.fillStyle = lin(g, 180, 300, "#a0673a", "#7a4a26"); rr(g, 96, 170, 28, 126, 10); g.fill();
    blob(g, 110, 120, 92, "#8fe07a", "#3f9a43"); blob(g, 60, 150, 52, "#9be585", "#45a249"); blob(g, 160, 150, 52, "#86d872", "#3a9140");
    for (const [x, y] of [[80, 100], [140, 90], [120, 150], [70, 170]]) blob(g, x, y, 9, "#ff8a8a", "#e04848");
  } },
  tree2: { w: 160, h: 320, draw(g) {
    g.fillStyle = "#875432"; rr(g, 70, 240, 20, 76, 8); g.fill();
    g.fillStyle = rad(g, 80, 140, 120, "#9fe58c", "#2f8a43");
    g.beginPath(); g.ellipse(80, 145, 62, 120, 0, 0, Math.PI * 2); g.fill();
    g.fillStyle = "rgba(255,255,255,.18)"; g.beginPath(); g.ellipse(60, 100, 16, 50, -0.2, 0, Math.PI * 2); g.fill();
  } },
  bush: { w: 200, h: 120, draw(g) {
    blob(g, 60, 80, 48, "#9be585", "#3f9a43"); blob(g, 140, 80, 50, "#8fe07a", "#3a9140"); blob(g, 100, 60, 52, "#a6eb90", "#45a249");
    for (const [x, y, c] of [[70, 50, "#ff9ec4"], [120, 40, "#ffd23f"], [150, 70, "#fff"], [90, 80, "#ff9ec4"]] as const) { g.fillStyle = c; g.beginPath(); g.arc(x, y, 7, 0, 7); g.fill(); }
  } },
  lamp: { w: 80, h: 340, draw(g) {
    g.fillStyle = lin(g, 0, 340, "#5b6b8a", "#3a4560"); rr(g, 34, 60, 12, 270, 6); g.fill(); rr(g, 22, 320, 36, 20, 8); g.fill();
    g.fillStyle = "#3a4560"; rr(g, 16, 30, 48, 14, 7); g.fill();
    g.fillStyle = rad(g, 40, 60, 26, "#fffbe0", "#ffd23f"); g.beginPath(); g.arc(40, 62, 20, 0, 7); g.fill();
  } },
  fence: { w: 260, h: 120, draw(g) {
    g.fillStyle = "#fffaf0"; g.strokeStyle = "#d8cbb2"; g.lineWidth = 3;
    rr(g, 0, 50, 260, 14, 6); g.fill(); g.stroke(); rr(g, 0, 86, 260, 14, 6); g.fill(); g.stroke();
    for (let x = 8; x < 260; x += 36) { g.beginPath(); g.moveTo(x, 118); g.lineTo(x, 26); g.lineTo(x + 11, 12); g.lineTo(x + 22, 26); g.lineTo(x + 22, 118); g.closePath(); g.fill(); g.stroke(); }
  } },
  bakery: { w: 300, h: 280, draw(g) {
    g.fillStyle = lin(g, 60, 280, "#fff3dc", "#f3dcb8"); rr(g, 20, 70, 260, 206, 14); g.fill();
    g.fillStyle = "#c86a3c"; g.beginPath(); g.moveTo(6, 84); g.quadraticCurveTo(150, -10, 294, 84); g.closePath(); g.fill();
    for (let i = 0; i < 7; i++) { g.fillStyle = i % 2 ? "#fff" : "#ff9e6b"; g.beginPath(); g.moveTo(20 + i * 37, 120); g.lineTo(57 + i * 37, 120); g.lineTo(57 + i * 37, 150); g.arc(38.5 + i * 37, 150, 18.5, 0, Math.PI); g.fill(); }
    g.fillStyle = "#8fd3ff"; rr(g, 40, 176, 110, 70, 10); g.fill(); g.fillStyle = "#b7744a"; rr(g, 180, 170, 76, 106, 30); g.fill();
    for (const [x, c] of [[64, "#e0a050"], [96, "#d08840"], [126, "#f0c070"]] as const) { g.fillStyle = c; g.beginPath(); g.ellipse(x, 232, 14, 9, 0, 0, 7); g.fill(); }
  } },
  tower: { w: 220, h: 520, draw(g) {
    g.fillStyle = lin(g, 100, 520, "#fff6e3", "#ecd9b6"); rr(g, 40, 130, 140, 390, 12); g.fill();
    g.fillStyle = "#ff9e6b"; g.beginPath(); g.moveTo(26, 140); g.lineTo(110, 18); g.lineTo(194, 140); g.closePath(); g.fill();
    g.fillStyle = "#ffd23f"; g.beginPath(); g.arc(110, 16, 10, 0, 7); g.fill();
    g.fillStyle = "#b7744a"; rr(g, 86, 440, 48, 80, 24); g.fill();
    for (const y of [330, 390]) { g.fillStyle = "#8fd3ff"; rr(g, 96, y, 28, 36, 14); g.fill(); }
    g.fillStyle = "#fff"; g.strokeStyle = "#ffcf5c"; g.lineWidth = 10; g.beginPath(); g.arc(110, 220, 58, 0, 7); g.fill(); g.stroke();
    g.fillStyle = "#3b4a5c"; for (let i = 0; i < 12; i++) { const a = (i * Math.PI) / 6; g.beginPath(); g.arc(110 + Math.cos(a) * 46, 220 + Math.sin(a) * 46, i % 3 ? 3 : 5, 0, 7); g.fill(); }
  } },
  windmill: { w: 260, h: 340, draw(g) {
    g.fillStyle = lin(g, 120, 340, "#fff6e3", "#e5cfa6"); g.beginPath(); g.moveTo(90, 340); g.lineTo(104, 130); g.lineTo(156, 130); g.lineTo(170, 340); g.fill();
    g.fillStyle = "#ff9e6b"; g.beginPath(); g.moveTo(92, 136); g.quadraticCurveTo(130, 70, 168, 136); g.fill();
    g.fillStyle = "#b7744a"; rr(g, 116, 290, 28, 50, 14); g.fill();
  } },
  log: { w: 300, h: 130, draw(g) {
    g.fillStyle = lin(g, 20, 120, "#c08552", "#7c4c28"); rr(g, 30, 22, 250, 96, 48); g.fill();
    g.fillStyle = "#e9c595"; g.beginPath(); g.ellipse(48, 70, 30, 48, 0, 0, 7); g.fill();
    g.strokeStyle = "#c79a68"; g.lineWidth = 4; for (const r of [10, 22, 34]) { g.beginPath(); g.ellipse(48, 70, r * 0.62, r, 0, 0, 7); g.stroke(); }
    g.fillStyle = "#6a8f3a"; g.beginPath(); g.ellipse(180, 26, 22, 10, -0.3, 0, 7); g.fill();
  } },
  boxes: { w: 220, h: 220, draw(g) {
    const box = (x: number, y: number, s: number) => { g.fillStyle = lin(g, y, y + s, "#e7b878", "#c98d4d"); rr(g, x, y, s, s, 10); g.fill(); g.fillStyle = "#f6dcaa"; g.fillRect(x + s / 2 - 8, y, 16, s); g.fillStyle = "#ffd23f"; star5(g, x + s * 0.27, y + s * 0.6, s * 0.12); g.fill(); };
    box(16, 110, 104); box(110, 116, 96); box(62, 14, 100);
  } },
  blocks: { w: 260, h: 200, draw(g) {
    const blk = (x: number, y: number, s: number, c: string, d: string) => { g.fillStyle = lin(g, y, y + s, c, d); rr(g, x, y, s, s, 16); g.fill(); g.fillStyle = "rgba(255,255,255,.35)"; rr(g, x + 10, y + 8, s - 20, 12, 6); g.fill(); };
    blk(10, 96, 100, "#ff7a7a", "#d94848"); blk(140, 100, 96, "#7fcaff", "#3f8fd0"); blk(76, 6, 96, "#ffe06a", "#e2b21f");
  } },
  puddle: { w: 320, h: 110, base: 0.6, draw(g) {
    g.fillStyle = "rgba(90,160,230,.55)"; g.beginPath(); g.ellipse(160, 56, 150, 46, 0, 0, 7); g.fill();
    g.fillStyle = "rgba(200,235,255,.8)"; g.beginPath(); g.ellipse(120, 44, 60, 12, 0, 0, 7); g.fill();
    g.strokeStyle = "rgba(255,255,255,.7)"; g.lineWidth = 4; g.beginPath(); g.ellipse(200, 64, 40, 10, 0, 0, 7); g.stroke();
  } },
  ramp: { w: 300, h: 200, draw(g) {
    g.fillStyle = lin(g, 20, 200, "#e9b06c", "#a8703c"); g.beginPath(); g.moveTo(10, 200); g.lineTo(60, 30); g.lineTo(240, 30); g.lineTo(290, 200); g.closePath(); g.fill();
    g.strokeStyle = "rgba(120,70,30,.4)"; g.lineWidth = 3; for (let y = 64; y < 200; y += 34) { g.beginPath(); g.moveTo(60 - (y - 30) * 0.29, y); g.lineTo(240 + (y - 30) * 0.29, y); g.stroke(); }
    g.fillStyle = "#fff"; for (const y of [60, 105, 150]) { g.beginPath(); g.moveTo(120, y + 26); g.lineTo(150, y); g.lineTo(180, y + 26); g.lineTo(166, y + 26); g.lineTo(150, y + 12); g.lineTo(134, y + 26); g.fill(); }
  } },
  boost: { w: 300, h: 140, base: 0.7, draw(g) {
    const cols = ["#ff7a7a", "#ffb36b", "#ffe06a", "#7ee08a", "#7fcaff", "#b8a5ff"];
    cols.forEach((c, i) => { g.fillStyle = c; g.beginPath(); g.moveTo(30 + i * 40, 130); g.lineTo(70 + i * 40, 130); g.lineTo(60 + i * 32, 10); g.lineTo(32 + i * 32, 10); g.fill(); });
    g.fillStyle = "rgba(255,255,255,.9)"; for (const y of [24, 62, 100]) { g.beginPath(); g.moveTo(110, y + 26); g.lineTo(150, y); g.lineTo(190, y + 26); g.lineTo(172, y + 26); g.lineTo(150, y + 12); g.lineTo(128, y + 26); g.fill(); }
  } },
  carrot: { w: 120, h: 140, draw(g) {
    g.fillStyle = rad(g, 60, 86, 48, "#e2a066", "#a8642e"); g.beginPath(); g.ellipse(60, 88, 40, 46, 0, 0, 7); g.fill();
    g.fillStyle = rad(g, 60, 44, 50, "#a8794a", "#6e4a28"); g.beginPath(); g.ellipse(60, 48, 50, 26, 0, 0, 7); g.fill();
    g.fillStyle = "#6e4a28"; rr(g, 54, 6, 12, 22, 6); g.fill();
    g.fillStyle = "rgba(255,255,255,.4)"; g.beginPath(); g.ellipse(44, 84, 8, 16, 0.3, 0, 7); g.fill();
  } },
  pocketclock: { w: 220, h: 200, draw(g) {
    g.fillStyle = "#fff"; for (const s of [-1, 1]) { g.beginPath(); g.ellipse(110 + s * 80, 90, 44, 22, s * -0.4, 0, 7); g.fill(); }
    blob(g, 110, 110, 66, "#ffe98a", "#d9a21a"); g.fillStyle = "#fffaf0"; g.beginPath(); g.arc(110, 110, 50, 0, 7); g.fill();
    g.fillStyle = "#d9a21a"; rr(g, 100, 30, 20, 18, 6); g.fill();
  } },
  ring: { w: 260, h: 260, draw(g) {
    const cols = ["#ff7a7a", "#ffb36b", "#ffe06a", "#7ee08a", "#7fcaff", "#b8a5ff"];
    cols.forEach((c, i) => { g.strokeStyle = c; g.lineWidth = 9; g.beginPath(); g.arc(130, 130, 118 - i * 9, 0, 7); g.stroke(); });
    g.fillStyle = "rgba(255,255,255,.25)"; g.beginPath(); g.arc(130, 130, 64, 0, 7); g.fill();
  } },
  bunny: { w: 200, h: 220, draw(g) {
    g.fillStyle = rad(g, 140, 90, 80, "#f0a860", "#c06a2a"); g.beginPath(); g.ellipse(144, 96, 46, 84, 0.25, 0, 7); g.fill();
    g.fillStyle = "rgba(255,240,220,.5)"; g.beginPath(); g.ellipse(150, 70, 14, 50, 0.25, 0, 7); g.fill();
    g.fillStyle = rad(g, 80, 150, 60, "#f2b070", "#c87a36"); g.beginPath(); g.ellipse(84, 160, 44, 52, 0, 0, 7); g.fill();
    g.fillStyle = "#fff2dc"; g.beginPath(); g.ellipse(80, 170, 24, 32, 0, 0, 7); g.fill();
    blob(g, 80, 88, 40, "#f6b878", "#c87a36");
    for (const s of [-1, 1]) { g.fillStyle = "#c87a36"; g.beginPath(); g.ellipse(80 + s * 24, 52, 10, 16, s * 0.3, 0, 7); g.fill(); }
    g.fillStyle = "#2a1a10"; for (const s of [-1, 1]) { g.beginPath(); g.arc(80 + s * 14, 86, 7, 0, 7); g.fill(); }
    g.fillStyle = "#fff"; for (const s of [-1, 1]) { g.beginPath(); g.arc(82 + s * 14, 83, 2.5, 0, 7); g.fill(); }
    g.fillStyle = "#5a3018"; g.beginPath(); g.arc(80, 100, 5, 0, 7); g.fill();
    g.fillStyle = "rgba(255,120,120,.45)"; for (const s of [-1, 1]) { g.beginPath(); g.arc(80 + s * 26, 100, 7, 0, 7); g.fill(); }
  } },
  "bunny-home": { w: 300, h: 420, draw(g) {
    g.fillStyle = lin(g, 200, 420, "#a0673a", "#6e4422"); rr(g, 110, 170, 80, 250, 20); g.fill();
    g.fillStyle = "#3a2210"; g.beginPath(); g.ellipse(150, 300, 22, 28, 0, 0, 7); g.fill();
    blob(g, 150, 120, 120, "#a6eb90", "#3a9140"); blob(g, 70, 170, 60, "#8fe07a", "#3f9a43"); blob(g, 230, 170, 60, "#8fe07a", "#3f9a43");
  } },
  "arch-start": { w: 600, h: 400, draw(g) {
    g.fillStyle = "#fff"; g.strokeStyle = "#d8cbb2"; g.lineWidth = 4;
    for (const x of [20, 548]) { rr(g, x, 60, 32, 340, 14); g.fill(); g.stroke(); }
    const cols = ["#ff7a7a", "#ffe06a", "#7ee08a", "#7fcaff", "#b8a5ff"];
    for (let i = 0; i < 16; i++) { g.fillStyle = cols[i % 5]; g.beginPath(); g.moveTo(40 + i * 33, 80); g.lineTo(73 + i * 33, 80); g.lineTo(56 + i * 33, 120); g.fill(); }
    g.strokeStyle = "#9a7a5a"; g.lineWidth = 4; g.beginPath(); g.moveTo(36, 80); g.lineTo(564, 80); g.stroke();
  } },
  "paper-arch": { w: 600, h: 420, draw(g) {
    const cols = ["#ff9ec4", "#ffe06a", "#7ee08a", "#7fcaff", "#b8a5ff", "#ffb36b"];
    for (let i = 0; i < 6; i++) { g.strokeStyle = cols[i]; g.lineWidth = 22; g.beginPath(); g.ellipse(300, 420, 280 - i * 18, 400 - i * 18, 0, Math.PI, 0); g.stroke(); }
    for (let i = 0; i < 9; i++) { const a = Math.PI + (i + 0.5) * (Math.PI / 9); blob(g, 300 + Math.cos(a) * 290, 420 + Math.sin(a) * 405, 20, "#fff", cols[i % 6]); }
  } },
  tunnel: { w: 300, h: 300, draw(g) {
    const cols = ["#ff9ec4", "#ffe06a", "#7ee08a", "#7fcaff", "#b8a5ff"];
    for (let i = 0; i < 5; i++) { g.fillStyle = cols[i]; g.beginPath(); g.ellipse(150, 300, 145 - i * 16, 290 - i * 16, 0, Math.PI, 0); g.fill(); }
    g.fillStyle = rad(g, 150, 250, 90, "#fffbe0", "#ffd23f"); g.beginPath(); g.ellipse(150, 300, 64, 200, 0, Math.PI, 0); g.fill();
    for (let i = 0; i < 7; i++) { const a = Math.PI + (i + 0.5) * (Math.PI / 7); blob(g, 150 + Math.cos(a) * 142, 300 + Math.sin(a) * 286, 13, "#fff", cols[i % 5]); }
  } },
  pickup: { w: 640, h: 440, draw(g) {
    g.fillStyle = lin(g, 0, 440, "#6fc77a", "#3f9a4a");
    for (const x of [24, 580]) { rr(g, x, 100, 36, 340, 16); g.fill(); }
    g.fillStyle = lin(g, 40, 140, "#7fd389", "#4caf5a"); rr(g, 10, 60, 620, 70, 34); g.fill();
    g.fillStyle = "#fff6e3"; rr(g, 230, 40, 180, 110, 26); g.fill(); g.strokeStyle = "#ffd23f"; g.lineWidth = 6; g.stroke();
    // little book icon on the sign
    g.fillStyle = "#ff9e6b"; rr(g, 268, 66, 50, 62, 6); g.fill(); g.fillStyle = "#7fcaff"; rr(g, 322, 66, 50, 62, 6); g.fill(); g.fillStyle = "#fff"; g.fillRect(316, 66, 8, 62);
  } },
  books: { w: 200, h: 180, draw(g) {
    const bk = (y: number, w: number, c: string, d: string) => { g.fillStyle = lin(g, y, y + 44, c, d); rr(g, 100 - w / 2, y, w, 44, 8); g.fill(); g.fillStyle = "#fffaf0"; rr(g, 100 - w / 2 + 8, y + 8, w - 16, 10, 4); g.fill(); };
    bk(124, 170, "#7fcaff", "#3f8fd0"); bk(80, 156, "#ffb36b", "#e07a3a"); bk(36, 164, "#9be585", "#45a249");
    g.strokeStyle = "#e04848"; g.lineWidth = 8; g.beginPath(); g.moveTo(100, 30); g.lineTo(100, 172); g.stroke();
    g.fillStyle = "#e04848"; g.beginPath(); g.ellipse(84, 26, 18, 12, 0.5, 0, 7); g.ellipse(116, 26, 18, 12, -0.5, 0, 7); g.fill();
  } },
  hill: { w: 1024, h: 260, base: 1, draw(g, w, h) {
    for (const [amp, y, a, b, ph] of [[50, 120, "#bfe8a8", "#94d07e", 0], [40, 170, "#9fdc88", "#6cbf5c", 2]] as const) {
      g.fillStyle = lin(g, y - amp, h, a, b); g.beginPath(); g.moveTo(0, h);
      for (let x = 0; x <= w; x += 8) g.lineTo(x, y - amp * (0.5 + 0.5 * Math.sin((x / w) * Math.PI * 4 + ph)) * (0.7 + 0.3 * Math.sin((x / w) * Math.PI * 2 * 3 + ph)));
      g.lineTo(w, h); g.fill();
    }
  } },
  town: { w: 1024, h: 220, base: 1, draw(g, w, h) {
    const cols = ["#ffd9c2", "#d9ecff", "#fff1b8", "#e6dcff", "#d4f5d0", "#ffe0ec"];
    const roofs = ["#ff9e6b", "#7fb0e0", "#f2a33a", "#a98ee0", "#5cb86a", "#ff8fb0"];
    let x = 10;
    for (let i = 0; x < w - 60; i++) {
      const bw = 70 + ((i * 37) % 40), bh = 60 + ((i * 53) % 60);
      if (i % 3 === 2) { blob(g, x + 30, h - 50, 38, "#9be585", "#45a249"); x += 70; continue; }
      g.fillStyle = cols[i % 6]; rr(g, x, h - bh, bw, bh, 8); g.fill();
      g.fillStyle = roofs[i % 6]; g.beginPath(); g.moveTo(x - 8, h - bh + 4); g.quadraticCurveTo(x + bw / 2, h - bh - 50, x + bw + 8, h - bh + 4); g.fill();
      g.fillStyle = "#8fd3ff"; g.beginPath(); g.arc(x + bw / 2, h - bh + 26, 9, 0, 7); g.fill();
      x += bw + 14;
    }
  } },
};

const BALLOONS: [string, string][] = [["#ffb3cc", "#e05a8a"], ["#a8dcff", "#3f8fd0"], ["#fff0a0", "#e0b020"], ["#b4f0c8", "#3faa6a"], ["#d6c8ff", "#8a6ae0"], ["#ffd0a8", "#f07a3a"]];
BALLOONS.forEach(([a, b], i) => {
  P["balloon-" + i] = { w: 200, h: 300, draw(g) {
    g.strokeStyle = "#8a8a8a"; g.lineWidth = 3; g.beginPath(); g.moveTo(100, 210); g.bezierCurveTo(80, 240, 120, 260, 100, 298); g.stroke();
    for (const s of [-1, 1]) blob(g, 100 + s * 46, 34, 18, "#fff0a0", "#e0b020");
    blob(g, 100, 112, 90, a, b);
    g.fillStyle = b; g.beginPath(); g.moveTo(90, 200); g.lineTo(110, 200); g.lineTo(100, 214); g.fill();
    g.fillStyle = "rgba(255,255,255,.55)"; g.beginPath(); g.ellipse(58, 70, 12, 24, 0.5, 0, 7); g.fill();
  } };
  WORLD_W["balloon-" + i] = WORLD_W.balloon;
});

const NOOP: Sprite = (() => { const [c] = typeof document !== "undefined" ? canvas(1, 1) : [null as unknown as HTMLCanvasElement]; return { img: c, w: 1, h: 1, ww: 0, base: 1 }; })();

function paint(id: string): Sprite | null {
  const p = P[id];
  if (!p) return null;
  const [c, g] = canvas(p.w, p.h);
  p.draw(g, p.w, p.h);
  return { img: c, w: p.w, h: p.h, ww: WORLD_W[id] ?? 1, base: p.base ?? 1 };
}

function loadImg(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const i = new Image();
    i.decoding = "async";
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = src;
  });
}

/** get a sprite now (painted fallback if the image is still loading) */
export function sprite(id: string): Sprite {
  const s = cache.get(id);
  if (s) return s;
  const painted = paint(id);
  if (painted) cache.set(id, painted);
  return painted ?? NOOP;
}

let atlas: Promise<Record<string, { w: number; h: number; frames: number }>> | null = null;
/** generated art present on the server (written by scripts/rush-slice.py) */
export function artAtlas() {
  if (!atlas) atlas = fetch(BASE + "art/atlas.json").then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  return atlas;
}

/** preload images for a list of ids: generated art first, then the kit */
export async function preload(ids: string[]): Promise<void> {
  const have = await artAtlas();
  await Promise.all(
    ids.map((id) => {
      if (loading.has(id)) return loading.get(id)!;
      const tryKit = () => (KIT[id] ? loadImg(BASE + KIT[id]) : Promise.reject());
      const p = (have[id]?.frames === 1 ? loadImg(BASE + "art/" + id + ".webp") : Promise.reject())
        .catch(tryKit)
        .then((img) => {
          const ww = WORLD_W[id] ?? 1;
          cache.set(id, { img, w: img.naturalWidth, h: img.naturalHeight, ww, base: 1 });
        })
        .catch(() => void sprite(id));
      loading.set(id, p);
      return p;
    }),
  );
}

export const ALL_SPRITES = Object.keys(WORLD_W);
export function image(src: string): Promise<HTMLImageElement> {
  return loadImg(BASE + src);
}
export { star5, blob, rr, lin, rad };
