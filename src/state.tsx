/** App-wide state: progress (persisted), language, device info, PWA status. */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { defaultProgress, migrate, todayStr, totalStars, type Progress } from "./engine/progress";
import { load, save, persist, hub } from "./platform/storage";
import { setAudioPrefs, speak } from "./platform/audio";
import { readDevice, watchDevice, type DeviceInfo } from "./platform/device";
import { onPwa } from "./platform/pwa";
import { t as tr, type Mode } from "./i18n";
import type { Lang, Msg } from "./i18n/types";
import { dailyMission } from "./content/rewards";
import { IN_HUB } from "./platform/native";

const KEY = "progress";

interface Store {
  p: Progress;
  update: (fn: (p: Progress) => Progress) => void;
  lang: Lang;
  t: (m: Msg | string, mode?: Mode) => string;
  say: (m: Msg | string) => Promise<void>;
  device: DeviceInfo;
  pwa: { updateReady: boolean; offlineReady: boolean; canInstall: boolean; online: boolean };
  toast: (text: string) => void;
  toastText: string | null;
}
const Ctx = createContext<Store | null>(null);
export const useStore = () => useContext(Ctx)!;

function detectLang(): Lang {
  const h = hub.lang();
  if (h) return h;
  return /^id|^ms/i.test(navigator.language || "") ? "id" : "en";
}

export function StoreProvider({ children, initial }: { children: ReactNode; initial: Progress }) {
  const [p, setP] = useState<Progress>(initial);
  const [device, setDevice] = useState<DeviceInfo>(() => readDevice());
  const [pwa, setPwa] = useState<Store["pwa"]>({ updateReady: false, offlineReady: false, canInstall: false, online: true });
  const [toastText, setToast] = useState<string | null>(null);
  const saveT = useRef<number>();
  const lang = p.settings.lang;

  const update = useCallback((fn: (p: Progress) => Progress) => {
    setP(fn);
  }, []);
  // stars earned here also go into the hub's shared star jar (once, when the total grows)
  const lastTotal = useRef(totalStars(initial));
  useEffect(() => {
    const now = totalStars(p);
    if (IN_HUB && now > lastTotal.current) hub.addHubStars(now - lastTotal.current);
    lastTotal.current = now;
  }, [p]);

  useEffect(() => {
    clearTimeout(saveT.current);
    saveT.current = window.setTimeout(() => save(KEY, p), 250);
  }, [p]);
  useEffect(() => {
    const flush = () => save(KEY, p);
    window.addEventListener("pagehide", flush);
    return () => window.removeEventListener("pagehide", flush);
  }, [p]);

  // settings → audio, theme, language attributes
  useEffect(() => {
    setAudioPrefs({ voice: p.settings.voice, sfx: p.settings.sfx, music: p.settings.music, lang });
  }, [p.settings.voice, p.settings.sfx, p.settings.music, lang]);
  useEffect(() => {
    const r = document.documentElement;
    r.lang = lang;
    hub.setLang(lang);
    document.title = tr("app.name", lang);
  }, [lang]);
  useEffect(() => {
    const r = document.documentElement;
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const dark = p.settings.theme === "dark" || (p.settings.theme === "auto" && mq.matches);
      r.dataset.theme = dark ? "dark" : "light";
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#13201a" : "#fff8ec");
    };
    apply();
    mq.addEventListener?.("change", apply);
    r.dataset.bigtext = p.settings.bigText ? "1" : "0";
    return () => mq.removeEventListener?.("change", apply);
  }, [p.settings.theme, p.settings.bigText]);

  useEffect(() => watchDevice(setDevice), []);
  useEffect(() => {
    const off = onPwa(setPwa);
    return () => {
      off();
    };
  }, []);

  // daily mission (same all day)
  useEffect(() => {
    const d = todayStr();
    if (p.daily.date !== d) update((x) => ({ ...x, daily: { date: d, id: dailyMission(x, d), done: false } }));
  }, [p.daily.date, update]);

  const t = useCallback((m: Msg | string, mode?: Mode) => tr(m, lang, mode), [lang]);
  const say = useCallback((m: Msg | string) => speak(tr(m, lang, "say"), lang), [lang]);
  const tRef = useRef<number>();
  const toast = useCallback((text: string) => {
    setToast(text);
    clearTimeout(tRef.current);
    tRef.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const value = useMemo(() => ({ p, update, lang, t, say, device, pwa, toast, toastText }), [p, update, lang, t, say, device, pwa, toast, toastText]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export async function loadInitial(): Promise<Progress> {
  persist();
  const raw = await load<Progress>(KEY);
  const p = migrate(raw, detectLang());
  if (!raw) p.settings.lang = detectLang();
  return p;
}
export const resetProgress = (p: Progress): Progress => ({ ...defaultProgress(p.settings.lang), settings: p.settings });
