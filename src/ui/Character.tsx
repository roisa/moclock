/**
 * Draws one Baby Mo family pose at a consistent scale.
 * `h` = on-screen height of a STANDING Baby Mo; every other pose and character
 * is scaled from its measured standing height (asset-meta.json), so the twins
 * Mo & Ais are always the same height, Kak Adam a little taller, Abi & Umi
 * adult height. Sitting/lying poses keep that scale (they are just shorter).
 * crop="upper" shows head-to-waist only (required for render-2 art).
 */
import meta from "../characters/asset-meta.json";
import type { CSSProperties } from "react";

interface Meta {
  src: string; src2x?: string; w: number; h: number; w2x?: number;
  box: [number, number, number, number]; ref: number; rel: number; series: string;
}
const M = meta as unknown as Record<string, Meta>;
export const POSES = Object.keys(M);
const BASE = "./characters/";

export function poseUrl(id: string): string {
  const m = M[id];
  return m ? BASE + (m.src2x || m.src) : "";
}

export interface CharacterProps {
  id: string;
  h: number;
  crop?: "upper";
  anim?: "bob" | "pop" | "cheer" | "shake" | "";
  flip?: boolean;
  className?: string;
  style?: CSSProperties;
  alt?: string;
  /** reserve the full standing height (so poses swap without layout jumps) */
  stage?: boolean;
  /** ignore relative height (fit an adult into a card the size of Mo) */
  fit?: boolean;
  /** scale so the visible pose fills this box [w, h] (card art) */
  box?: [number, number];
}

export function Character({ id, h, crop, anim = "", flip, className = "", style, alt = "", stage, fit, box }: CharacterProps) {
  const m = M[id];
  if (!m) {
    if (import.meta.env.DEV) console.warn("missing pose", id);
    return null;
  }
  const upper = crop === "upper" || m.series === "r2";
  const standingPx = m.ref * m.h; // source px of a standing character in this frame
  const [x0, y0, x1, y1] = m.box;
  let scale = (h * (fit ? Math.min(1, m.rel) : m.rel)) / standingPx;
  if (box) {
    const vh = upper ? Math.min(y1 - y0, standingPx * 0.6) : y1 - y0;
    scale = Math.min(box[0] / (x1 - x0), box[1] / vh);
  }
  const bw = (x1 - x0) * scale;
  let bh = (y1 - y0) * scale;
  if (upper) bh = Math.min(bh, standingPx * 0.6 * scale);
  const iw = m.w * scale, ih = m.h * scale;
  const srcSet = m.src2x ? `${BASE + m.src} ${m.w}w, ${BASE + m.src2x} ${m.w2x}w` : undefined;
  const boxH = stage && !upper ? Math.max(bh, h * m.rel) : bh;
  return (
    <span
      className={`char ${upper ? "upper" : ""} ${anim} ${flip ? "flip" : ""} ${className}`}
      style={{ width: Math.round(bw), height: Math.round(boxH), ...style }}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
    >
      <img
        key={id}
        src={BASE + m.src}
        srcSet={srcSet}
        sizes={Math.round(iw) + "px"}
        alt=""
        draggable={false}
        decoding="async"
        style={{ width: iw, height: ih, left: -x0 * scale, top: -y0 * scale + (boxH - bh) }}
      />
    </span>
  );
}

/** Warm the cache for poses a screen is about to use (avoids a blank flash on swap). */
export function preloadPoses(ids: string[]) {
  for (const id of ids) {
    const m = M[id];
    if (!m) continue;
    const i = new Image();
    i.decoding = "async";
    i.src = BASE + m.src;
  }
}
