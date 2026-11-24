/** AudioManager: SFX + sparing voice lines (one line at a time, cooldown). */
import { sfx, speak, haptic, type Sfx } from "../platform/audio";
import { t } from "../i18n";
import type { Lang, Msg } from "../i18n/types";

let lastVoice = -1e9;
export const audio = {
  sfx(n: Sfx) { sfx(n); },
  haptic(k: "light" | "success" | "soft" = "light") { haptic(k); },
  /** speak unless another line was said less than `gap` seconds ago (important lines pass `force`) */
  say(m: Msg | string, lang: Lang, opts: { gap?: number; force?: boolean } = {}) {
    const now = performance.now() / 1000;
    if (!opts.force && now - lastVoice < (opts.gap ?? 8)) return;
    lastVoice = now;
    speak(t(m, lang, "say"), lang).catch(() => {});
  },
  reset() { lastVoice = -1e9; },
};
