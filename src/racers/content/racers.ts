/** The three racers and their karts. Real 2D art (poses) is used in menus; the 3D
 *  drivers are temporary placeholders built from shapes until GLB models exist
 *  (see docs/RACERS-ASSETS.md). */
export type RacerId = "mo" | "ais" | "adam";
export interface RacerDef {
  id: RacerId;
  name: { en: string; id: string };
  poses: { idle: string; cheer: string; think: string; wave: string; win: string };
  kart: string; // default kart id
  skin: string; hair: string; outfit: string; sleeves: string; accent: string;
  headwear?: "hijab" | "peci";
}
export const RACERS: RacerDef[] = [
  { id: "mo", name: { en: "Baby Mo", id: "Baby Mo" }, poses: { idle: "mo-wave", cheer: "mo-yeyy", think: "mo-think", wave: "mo-wave", win: "mo-yeyy" },
    kart: "star", skin: "#f6c7a6", hair: "#1f1b1a", outfit: "#4cbf5a", sleeves: "#ff9e6b", accent: "#ffd23f" },
  { id: "ais", name: { en: "Baby Ais", id: "Baby Ais" }, poses: { idle: "ais-wave", cheer: "ais-cheer", think: "ais-think", wave: "ais-wave", win: "ais-jump" },
    kart: "moon", skin: "#f8cdb0", hair: "#2a1f1c", outfit: "#ff8fbf", sleeves: "#c9b3ff", accent: "#8fd0ff", headwear: "hijab" },
  { id: "adam", name: { en: "Kak Adam", id: "Kak Adam" }, poses: { idle: "adam-wave", cheer: "adam-cheer", think: "adam-ball", wave: "adam-wave", win: "adam-win" },
    kart: "shield", skin: "#f3c2a0", hair: "#4a2c1e", outfit: "#2f6fe0", sleeves: "#2f6fe0", accent: "#ffffff" },
];
export const racerById = (id: string) => RACERS.find((r) => r.id === id) ?? RACERS[0];

export interface KartDef {
  id: string;
  name: { en: string; id: string };
  body: string; trim: string; emblem: "star" | "moon" | "shield" | "heart" | "bolt";
  stats: { top: number; accel: number; handling: number };
  cost: number; // coins earned in races (never bought with money)
  paints: string[];
}
// Every kart has the same total (1.5): unlocking changes the feel, not the chance to win.
export const KARTS: KartDef[] = [
  { id: "star", name: { en: "Star Racer", id: "Kart Bintang" }, body: "#4cbf5a", trim: "#ffd23f", emblem: "star", stats: { top: 0.5, accel: 0.5, handling: 0.5 }, cost: 0, paints: ["#4cbf5a", "#2fae8a", "#7fd36d"] },
  { id: "moon", name: { en: "Moon Racer", id: "Kart Bulan" }, body: "#ff8fbf", trim: "#c9b3ff", emblem: "moon", stats: { top: 0.45, accel: 0.55, handling: 0.5 }, cost: 0, paints: ["#ff8fbf", "#ff6fa8", "#c9b3ff"] },
  { id: "shield", name: { en: "Shield Racer", id: "Kart Perisai" }, body: "#2f6fe0", trim: "#ffffff", emblem: "shield", stats: { top: 0.55, accel: 0.45, handling: 0.5 }, cost: 0, paints: ["#2f6fe0", "#3fa0f0", "#5466d8"] },
  { id: "sunny", name: { en: "Sunny Zoom", id: "Kart Mentari" }, body: "#ffc21a", trim: "#ff8a2a", emblem: "star", stats: { top: 0.6, accel: 0.45, handling: 0.45 }, cost: 40, paints: ["#ffc21a", "#ffb547"] },
  { id: "rocket", name: { en: "Rocket Red", id: "Kart Roket" }, body: "#ff5f5f", trim: "#ffffff", emblem: "bolt", stats: { top: 0.4, accel: 0.65, handling: 0.45 }, cost: 80, paints: ["#ff5f5f", "#ff8f7a"] },
  { id: "grape", name: { en: "Grape Glide", id: "Kart Anggur" }, body: "#9b6cf0", trim: "#ffd23f", emblem: "heart", stats: { top: 0.45, accel: 0.4, handling: 0.65 }, cost: 120, paints: ["#9b6cf0", "#b8a5ff"] },
];
export const kartById = (id: string) => KARTS.find((k) => k.id === id) ?? KARTS[0];
