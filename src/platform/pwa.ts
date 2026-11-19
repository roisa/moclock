/**
 * Service worker registration + update flow + install prompt.
 * The worker (public/sw.js template, filled in by scripts/gen-sw.mjs at build)
 * precaches the app shell and character art, so the whole game works offline.
 * Updates: a new worker installs in the background; we show "Update" and only
 * reload when the child/parent taps it (never mid-game).
 */
import { IN_HUB, isNative } from "./native";

type Listener = (s: { updateReady: boolean; offlineReady: boolean; canInstall: boolean; online: boolean }) => void;
const state = { updateReady: false, offlineReady: false, canInstall: false, online: typeof navigator !== "undefined" ? navigator.onLine : true };
const listeners = new Set<Listener>();
let waiting: ServiceWorker | null = null;
let installEvt: (Event & { prompt: () => Promise<void> }) | null = null;
const emit = () => listeners.forEach((l) => l({ ...state }));

export function onPwa(l: Listener) {
  listeners.add(l);
  l({ ...state });
  return () => listeners.delete(l);
}

export function initPwa() {
  window.addEventListener("online", () => ((state.online = true), emit()));
  window.addEventListener("offline", () => ((state.online = false), emit()));
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    installEvt = e as typeof installEvt;
    state.canInstall = true;
    emit();
  });
  // In the hub, play.babymo.id's own service worker caches us. In a native
  // wrapper the files are already on the device.
  if (isNative() || !("serviceWorker" in navigator) || import.meta.env.DEV) return;
  if (IN_HUB) {
    // play.babymo.id's own worker (scope "/") caches this game with the rest of the hub
    navigator.serviceWorker.register("../sw.js").then(() => ((state.offlineReady = true), emit())).catch(() => {});
    return;
  }
  navigator.serviceWorker
    .register("./sw.js")
    .then((reg) => {
      const track = (w: ServiceWorker | null) => {
        if (!w) return;
        w.addEventListener("statechange", () => {
          if (w.state === "installed") {
            if (navigator.serviceWorker.controller) {
              waiting = w;
              state.updateReady = true;
            } else state.offlineReady = true;
            emit();
          }
        });
      };
      if (reg.waiting && navigator.serviceWorker.controller) {
        waiting = reg.waiting;
        state.updateReady = true;
        emit();
      }
      if (reg.active) {
        state.offlineReady = true;
        emit();
      }
      reg.addEventListener("updatefound", () => track(reg.installing));
      // look for updates when the app comes back to the foreground
      document.addEventListener("visibilitychange", () => {
        if (!document.hidden) reg.update().catch(() => {});
      });
    })
    .catch(() => {});
  let reloaded = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (reloaded || !waiting) return;
    reloaded = true;
    location.reload();
  });
}

export function applyUpdate() {
  if (waiting) waiting.postMessage({ type: "SKIP_WAITING" });
  else location.reload();
}
export async function promptInstall(): Promise<boolean> {
  if (!installEvt) return false;
  await installEvt.prompt();
  installEvt = null;
  state.canInstall = false;
  emit();
  return true;
}
export const isStandalone = () =>
  matchMedia("(display-mode: standalone)").matches || (navigator as unknown as { standalone?: boolean }).standalone === true;
