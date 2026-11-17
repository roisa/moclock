/**
 * Clock maths. A time on the 12-hour face is a whole number of minutes
 * t ∈ [0, 720): 0 = 12:00, 75 = 1:15, 719 = 11:59.
 * Both hands are always DERIVED from t, so the hour hand and the minute hand
 * can never disagree with each other or with the digital read-out.
 */
export const DAY12 = 720;

export function norm(t: number): number {
  return ((Math.round(t) % DAY12) + DAY12) % DAY12;
}
/** 1..12 */
export function hourOf(t: number): number {
  const h = Math.floor(norm(t) / 60);
  return h === 0 ? 12 : h;
}
export function minuteOf(t: number): number {
  return norm(t) % 60;
}
export function make(h: number, m: number): number {
  return norm((h % 12) * 60 + m);
}
/** Hand angles in degrees, clockwise from 12. The hour hand creeps as minutes pass. */
export function handAngles(t: number): { hour: number; minute: number } {
  const n = norm(t);
  return { hour: (n / DAY12) * 360, minute: (n % 60) * 6 };
}
/** Snap to the nearest multiple of step minutes (1, 5, 15, 30, 60). */
export function snap(t: number, step: number): number {
  if (step <= 1) return norm(t);
  return norm(Math.round(t / step) * step);
}
/** Angle (deg, clockwise from 12) from a point relative to the centre (screen coords, y down). */
export function angleOf(dx: number, dy: number): number {
  const a = (Math.atan2(dx, -dy) * 180) / Math.PI;
  return (a + 360) % 360;
}
/**
 * Dragging the minute hand: the new minute comes from the angle, and the hour
 * advances / rewinds when the hand crosses 12 (we pick the candidate time
 * closest to the previous time, so a full turn forward adds one hour).
 */
export function fromMinuteAngle(prev: number, angle: number, step = 1): number {
  const m = (angle / 6) % 60;
  const base = Math.floor(norm(prev) / 60) * 60;
  let best = prev;
  let bestD = Infinity;
  for (const off of [-60, 0, 60]) {
    const cand = base + off + m;
    const d = Math.abs(cand - prev);
    if (d < bestD) {
      bestD = d;
      best = cand;
    }
  }
  return snap(best, step);
}
/** Dragging the hour hand moves the whole time (minutes follow the hour hand's position). */
export function fromHourAngle(angle: number, step = 1): number {
  return snap((angle / 360) * DAY12, step);
}
export function pad2(n: number): string {
  return (n < 10 ? "0" : "") + n;
}
/** "3:05" (12-hour, no leading zero on the hour, like a kids' digital clock). */
export function digital(t: number): string {
  return hourOf(t) + ":" + pad2(minuteOf(t));
}
/** Minutes from a to b going forward (0..719). */
export function forward(a: number, b: number): number {
  return norm(b - a);
}
/** Kind of minute mark: used to pick a learning skill. */
export function minuteKind(t: number): "oclock" | "half" | "quarter" | "five" | "minute" {
  const m = minuteOf(t);
  if (m === 0) return "oclock";
  if (m === 30) return "half";
  if (m === 15 || m === 45) return "quarter";
  if (m % 5 === 0) return "five";
  return "minute";
}

/* ---------- 24-hour day helpers (routine & time-of-day) ---------- */
export type DayPart = "morning" | "afternoon" | "evening" | "night";
/** minutes since midnight → part of the day */
export function dayPart(min24: number): DayPart {
  const h = Math.floor((((min24 % 1440) + 1440) % 1440) / 60);
  if (h >= 5 && h < 12) return "morning";
  if (h >= 12 && h < 17) return "afternoon";
  if (h >= 17 && h < 19) return "evening";
  return "night";
}
export function to12(min24: number): number {
  return norm(min24);
}
