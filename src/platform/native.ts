/**
 * Native bridge detection. Today the game is a web app / PWA; later it can be
 * wrapped with Capacitor (iOS / iPadOS / Android). Everything native goes
 * through this file + the other platform/* modules, with web fallbacks, so the
 * game code never touches window.Capacitor directly.
 */
interface CapLike {
  isNativePlatform?: () => boolean;
  getPlatform?: () => string;
  Plugins?: Record<string, any>;
}
export function cap(): CapLike | null {
  return ((window as unknown as { Capacitor?: CapLike }).Capacitor) || null;
}
export function isNative(): boolean {
  try {
    const c = cap();
    if (c) return typeof c.isNativePlatform === "function" ? !!c.isNativePlatform() : true;
    return location.protocol === "capacitor:";
  } catch {
    return false;
  }
}
export function platform(): "ios" | "android" | "web" {
  const p = cap()?.getPlatform?.();
  return p === "ios" || p === "android" ? p : "web";
}
export function plugin<T = any>(name: string): T | null {
  return (cap()?.Plugins?.[name] as T) || null;
}
/** Running inside the play.babymo.id hub (built with `npm run build:hub`). */
export const IN_HUB: boolean = typeof __HUB__ !== "undefined" && __HUB__;
