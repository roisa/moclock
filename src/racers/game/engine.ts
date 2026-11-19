/**
 * Creates the Babylon engine with sensible quality defaults.
 * WebGL2 (with WebGL1 fallback inside Babylon). WebGPU is deliberately not used
 * yet: Babylon's WebGPU path downloads a shader compiler from a CDN, which a
 * kids' app must not do (no third-party requests, must work offline).
 */
import { Engine } from "@babylonjs/core/Engines/engine";
import type { Quality } from "./world";

export type QualityPref = "auto" | "low" | "medium" | "high";

export function pickQuality(pref: QualityPref): Quality {
  let level: Quality["level"];
  if (pref !== "auto") level = pref;
  else {
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 4;
    const cores = navigator.hardwareConcurrency ?? 4;
    const coarse = matchMedia("(pointer: coarse)").matches;
    level = mem <= 2 || cores <= 2 ? "low" : coarse && (mem <= 4 || cores <= 4) ? "medium" : coarse ? "medium" : "high";
  }
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  return {
    level,
    scenery: level === "low" ? 0.45 : level === "medium" ? 0.75 : 1,
    shadows: level !== "low",
    particles: level === "low" ? 120 : level === "medium" ? 260 : 500,
    scale: level === "low" ? 1.6 : level === "medium" ? Math.max(1, 1.6 / dpr) : 1 / dpr, // hardware scaling (bigger = fewer pixels)
  };
}

export function webglAvailable(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function createEngine(canvas: HTMLCanvasElement, q: Quality): Engine {
  const engine = new Engine(canvas, q.level !== "low", { preserveDrawingBuffer: false, stencil: true, powerPreference: "high-performance", disableWebGL2Support: false }, false);
  engine.setHardwareScalingLevel(q.scale);
  engine.enableOfflineSupport = false;
  return engine;
}
