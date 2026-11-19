/**
 * Screen & device adaptation: size classes, orientation, foldables / dual
 * screens, safe areas. Exposed as data-* attributes on <html> (CSS uses them)
 * and as a React hook (ui/useDevice.ts).
 *
 * Foldables: we never assume a specific device API. We progressively use
 *   - CSS viewport segments  (@media (horizontal-viewport-segments: 2))
 *   - window.visualViewport.segments / window.getWindowSegments (legacy)
 *   - navigator.devicePosture ("folded" | "continuous")
 * and fall back to plain width/height. When two segments are reported, the
 * hinge position is published as --hinge-x / --hinge-w so two-pane layouts can
 * put Mo on one screen and the game board on the other.
 */
export type SizeClass = "phone" | "phone-land" | "tablet" | "tablet-land" | "desktop";
export interface DeviceInfo {
  w: number;
  h: number;
  size: SizeClass;
  landscape: boolean;
  twoPane: boolean;
  segments: number;
  hinge: { x: number; w: number } | null;
  posture: string;
  coarse: boolean;
}

function segments(): DOMRect[] | null {
  const vv = window.visualViewport as unknown as { segments?: DOMRect[] } | null;
  if (vv && Array.isArray(vv.segments) && vv.segments.length > 1) return vv.segments;
  const legacy = (window as unknown as { getWindowSegments?: () => DOMRect[] }).getWindowSegments;
  if (typeof legacy === "function") {
    try {
      const s = legacy();
      if (s && s.length > 1) return s;
    } catch {
      /* ignore */
    }
  }
  return null;
}

export function readDevice(): DeviceInfo {
  const w = window.innerWidth, h = window.innerHeight;
  const landscape = w > h;
  const coarse = matchMedia("(pointer: coarse)").matches;
  const short = Math.min(w, h);
  let size: SizeClass;
  if (short < 600) size = landscape ? "phone-land" : "phone";
  else if (!coarse && w >= 1100) size = "desktop";
  else size = landscape ? "tablet-land" : "tablet";
  const segs = segments();
  let hinge: DeviceInfo["hinge"] = null;
  if (segs && segs.length === 2 && segs[0].top === segs[1].top) {
    const x = segs[0].right;
    hinge = { x, w: Math.max(0, segs[1].left - segs[0].right) };
  }
  const posture = (navigator as unknown as { devicePosture?: { type?: string } }).devicePosture?.type || "continuous";
  const twoPane = !!hinge || (landscape && w >= 640) || w >= 1100;
  return { w, h, size, landscape, twoPane, segments: segs ? segs.length : 1, hinge, posture, coarse };
}

export function applyDeviceAttrs(d: DeviceInfo) {
  const r = document.documentElement;
  r.dataset.size = d.size;
  r.dataset.twopane = d.twoPane ? "1" : "0";
  r.dataset.posture = d.posture;
  if (d.hinge) {
    r.style.setProperty("--hinge-x", d.hinge.x + "px");
    r.style.setProperty("--hinge-w", d.hinge.w + "px");
    r.dataset.hinge = "1";
  } else {
    r.style.removeProperty("--hinge-x");
    r.style.removeProperty("--hinge-w");
    delete r.dataset.hinge;
  }
}

export function watchDevice(cb: (d: DeviceInfo) => void): () => void {
  let raf = 0;
  const run = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const d = readDevice();
      applyDeviceAttrs(d);
      cb(d);
    });
  };
  window.addEventListener("resize", run);
  window.addEventListener("orientationchange", run);
  screen.orientation?.addEventListener?.("change", run);
  const posture = (navigator as unknown as { devicePosture?: EventTarget }).devicePosture;
  posture?.addEventListener?.("change", run);
  run();
  return () => {
    window.removeEventListener("resize", run);
    window.removeEventListener("orientationchange", run);
    screen.orientation?.removeEventListener?.("change", run);
    posture?.removeEventListener?.("change", run);
  };
}

/** Keep the screen awake during timed games where supported (best effort). */
let wakeLock: { release: () => Promise<void> } | null = null;
export async function keepAwake(on: boolean) {
  try {
    const wl = (navigator as unknown as { wakeLock?: { request: (t: string) => Promise<{ release: () => Promise<void> }> } }).wakeLock;
    if (on && wl && !wakeLock) wakeLock = await wl.request("screen");
    if (!on && wakeLock) {
      await wakeLock.release();
      wakeLock = null;
    }
  } catch {
    wakeLock = null;
  }
}
