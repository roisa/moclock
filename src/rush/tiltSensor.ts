/** Browser side of tilt steering: permission (iOS needs a tap) + reading the roll angle. */
import { rollOf, smooth } from "./core/tilt";

type Perm = "granted" | "denied" | "none";
type DOE = typeof DeviceOrientationEvent & { requestPermission?: () => Promise<"granted" | "denied"> };

/** ask for motion access — call from a tap (iOS 13+ only allows it inside a user gesture) */
export async function askTilt(): Promise<Perm> {
  if (typeof window === "undefined" || !("DeviceOrientationEvent" in window)) return "none";
  const D = DeviceOrientationEvent as DOE;
  if (typeof D.requestPermission === "function") {
    try { return (await D.requestPermission()) === "granted" ? "granted" : "denied"; } catch { return "denied"; }
  }
  return "granted";
}

const screenAngle = () => (screen.orientation?.angle ?? (window as unknown as { orientation?: number }).orientation ?? 0) as number;

/**
 * Listen to the phone's roll. The first ~0.4 s of readings become "straight" (however the
 * child is holding it). `onRoll` receives the smoothed roll relative to straight, in degrees.
 * Returns { stop, recenter, alive } — alive() is false if no reading ever arrived (no sensor).
 */
export function listenTilt(onRoll: (deg: number) => void) {
  let centre: number | null = null, samples: number[] = [], val = 0, got = false, lastAngle = screenAngle();
  const h = (e: DeviceOrientationEvent) => {
    if (e.beta == null || e.gamma == null) return;
    got = true;
    const a = screenAngle();
    if (a !== lastAngle) { lastAngle = a; centre = null; samples = []; } // phone turned: recalibrate
    const r = rollOf(e.beta, e.gamma, a);
    if (centre === null) { samples.push(r); if (samples.length >= 8) { centre = samples.reduce((x, y) => x + y, 0) / samples.length; val = 0; } return; }
    val = smooth(val, r - centre);
    onRoll(val);
  };
  window.addEventListener("deviceorientation", h);
  return {
    stop: () => window.removeEventListener("deviceorientation", h),
    recenter: () => { centre = null; samples = []; },
    alive: () => got,
  };
}
