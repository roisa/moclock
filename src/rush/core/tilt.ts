/**
 * Tilt steering: turns the phone's roll angle into a lane (0 left, 1 middle, 2 right).
 * Pure functions (unit-tested); the browser plumbing lives in screens/Ride.tsx.
 *
 * Roll comes from DeviceOrientationEvent: in portrait it is `gamma` (tilting the side edges
 * up / down); in landscape it is `beta`, with the sign depending on which way the phone is
 * turned (screen angle 90 vs 270). The child's own holding position at the start is "straight".
 */
export const TILT_ZONE = 11; // degrees from straight to reach the side lane
export const TILT_HYST = 3; // hysteresis so a wobbly hand doesn't flicker between lanes
export const TILT_MAX = 35; // clamp: very large tilts count as full

/** roll in degrees from a deviceorientation reading and the screen angle */
export function rollOf(beta: number, gamma: number, screenAngle: number): number {
  const a = ((screenAngle % 360) + 360) % 360;
  if (a === 90) return beta; // landscape, turned left
  if (a === 270) return -beta; // landscape, turned right
  if (a === 180) return -gamma; // upside-down portrait
  return gamma; // portrait
}

/** next lane from the tilt (relative to the calibrated centre), keeping the current lane inside the hysteresis band */
export function laneFromTilt(tilt: number, current: number): number {
  const t = Math.max(-TILT_MAX, Math.min(TILT_MAX, tilt));
  const enter = TILT_ZONE, leave = TILT_ZONE - TILT_HYST;
  if (current === 0) return t < -leave ? 0 : t > enter ? 2 : 1;
  if (current === 2) return t > leave ? 2 : t < -enter ? 0 : 1;
  return t < -enter ? 0 : t > enter ? 2 : 1;
}

/** smooth noisy sensor readings (exponential moving average) */
export const smooth = (prev: number, next: number, k = 0.25) => prev + (next - prev) * k;
