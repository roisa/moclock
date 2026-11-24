/**
 * Prayer-time pause for Time Rush, following babymo-app's Sholat tools (bm-prayer.js):
 * the same Kemenag RI times (computed on the device), the same city list, and the same
 * per-prayer streak storage (mo_prayer_streaks_v1). When a prayer time arrives during
 * play the ride pauses and Baby Mo invites the child to pray first.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { timings, deviceZone } from "./times";
import { useRush } from "../state";
import { audio, type Clip } from "../audio";
import { Pill } from "../ui/Kit";

export const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
export type PrayerKey = (typeof PRAYERS)[number];
export const PRAYER_NAMES: Record<"id" | "en", string[]> = { id: ["Subuh", "Dzuhur", "Ashar", "Maghrib", "Isya"], en: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"] };
/** babymo-app's city list (+ Jayapura for WIT) */
export const CITIES = [
  { n: "Jakarta", lat: -6.2088, lng: 106.8456 }, { n: "Bandung", lat: -6.9175, lng: 107.6191 },
  { n: "Surabaya", lat: -7.2575, lng: 112.7521 }, { n: "Malang", lat: -7.9778, lng: 112.5347 },
  { n: "Yogyakarta", lat: -7.7956, lng: 110.3695 }, { n: "Semarang", lat: -6.9667, lng: 110.4167 },
  { n: "Medan", lat: 3.5952, lng: 98.6722 }, { n: "Makassar", lat: -5.1477, lng: 119.4327 },
  { n: "Denpasar", lat: -8.65, lng: 115.2167 }, { n: "Palembang", lat: -2.9909, lng: 104.7566 },
  { n: "Banjarmasin", lat: -3.3186, lng: 114.5944 }, { n: "Jayapura", lat: -2.5337, lng: 140.718 },
];
/** the city used when the parent has not chosen one: from the device time zone (Indonesia only) */
export function defaultCity(): string | null {
  const z = deviceZone().label;
  return z === "WIB" ? "Jakarta" : z === "WITA" ? "Makassar" : z === "WIT" ? "Jayapura" : null;
}
const WINDOW_MIN = 30; // the pause offers itself during the first 30 minutes of each prayer time
const SNOOZE_MIN = 10;
const store = {
  get<T>(k: string, d: T): T { try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : d; } catch { return d; } },
  put(k: string, v: unknown) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* private mode */ } },
};
const dkey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const mins = (s: string) => +s.slice(0, 2) * 60 + +s.slice(3, 5);

/** babymo-app's streak record (shared key), so a child's prayers count in both apps on the same device */
function checkIn(k: PrayerKey) {
  const s = store.get<Record<string, { count: number; lastDate: string | null; best: number; total: number }>>("mo_prayer_streaks_v1", {});
  const t = dkey(new Date()), y = dkey(new Date(Date.now() - 864e5));
  const c = s[k] || { count: 0, lastDate: null, best: 0, total: 0 };
  if (c.lastDate === t) return;
  c.count = c.lastDate === y ? c.count + 1 : 1;
  c.lastDate = t; c.total = (c.total || 0) + 1; c.best = Math.max(c.best || 0, c.count);
  s[k] = c; store.put("mo_prayer_streaks_v1", s);
}

export interface PrayerState {
  enabled: boolean;
  city: string | null;
  today: { key: PrayerKey; time: string }[] | null;
  next: { key: PrayerKey; time: string } | null;
  due: PrayerKey | null;
}
const Ctx = createContext<PrayerState>({ enabled: false, city: null, today: null, next: null, due: null });
export const usePrayer = () => useContext(Ctx);

export function PrayerProvider({ children }: { children: ReactNode }) {
  const { p, t, lang } = useRush();
  // automated playthroughs pass ?noprayer so a real prayer time never interrupts a test
  const enabled = p.settings.prayer && !/[?&]noprayer\b/.test(location.search);
  const city = p.settings.city ?? defaultCity();
  const loc = p.settings.loc ?? CITIES.find((c) => c.n === city) ?? null;
  const [tick, setTick] = useState(0);
  useEffect(() => { const h = setInterval(() => setTick((x) => x + 1), 20000); return () => clearInterval(h); }, []);
  const today = useMemo(() => {
    if (!loc) return null;
    const tm = timings(new Date(), loc.lat, loc.lng);
    return PRAYERS.map((key) => ({ key, time: tm[key] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loc?.lat, loc?.lng, tick]);
  const [acks, setAcks] = useState(() => store.get<{ d: string; k: string[]; snooze: number }>("rush_prayer_v1", { d: "", k: [], snooze: 0 }));
  const now = new Date(), nm = now.getHours() * 60 + now.getMinutes(), dk = dkey(now);
  const done = acks.d === dk ? acks.k : [];
  let due: PrayerKey | null = null;
  if (enabled && today && Date.now() > acks.snooze)
    for (const x of today) { const m = mins(x.time); if (nm >= m && nm < m + WINDOW_MIN && !done.includes(x.key)) due = x.key; }
  const next = today?.find((x) => mins(x.time) > nm) ?? today?.[0] ?? null;
  const save = (v: typeof acks) => { setAcks(v); store.put("rush_prayer_v1", v); };
  const prayed = useCallback(() => {
    if (!due) return;
    checkIn(due);
    save({ d: dk, k: [...done, due], snooze: 0 });
    audio.clips(["taqabbal"], lang, { force: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [due, dk, done, lang]);
  const later = () => save({ ...acks, snooze: Date.now() + SNOOZE_MIN * 60000 });
  // say it once when the pause opens
  useEffect(() => { if (due) audio.clips([("pray-" + due.toLowerCase()) as Clip], lang, { force: true }); }, [due, lang]);
  const v = useMemo(() => ({ enabled, city, today, next, due }), [enabled, city, today, next, due]);
  return (
    <Ctx.Provider value={v}>
      {children}
      {due && (
        <div className="ru-scrim ru-pray-scrim">
          <div className="ru-panel ru-pray" role="dialog" aria-modal="true" aria-labelledby="pray-title">
            <img className="ru-pray-mo" src="characters/mo-pray.webp" alt="" />
            <div>
              <h2 id="pray-title">{t({ k: "ru.pray.title", p: { name: PRAYER_NAMES[lang][PRAYERS.indexOf(due)] } })}</h2>
              <p>{t("ru.pray.text")}</p>
              <p className="ru-pray-time">{today?.find((x) => x.key === due)?.time} · {city ?? t("ru.pray.myLocation")}</p>
              <div className="row">
                <Pill big onClick={prayed}>✓ {t("ru.pray.done")}</Pill>
                <Pill color="blue" onClick={later}>{t("ru.pray.later")}</Pill>
              </div>
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

/** small "next prayer" chip for the home screen */
export function NextPrayerChip() {
  const { next, enabled } = usePrayer();
  const { t, lang } = useRush();
  if (!enabled || !next) return null;
  return <span className="ru-praychip" title={t("ru.pray.next")}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c2 3 5 4 5 8v1H7v-1c0-4 3-5 5-8z" fill="#ffd25a" /><rect x="5" y="12" width="14" height="9" rx="2" fill="#fff8e8" /><path d="M10.5 21v-4a1.5 1.5 0 0 1 3 0v4z" fill="#5dbb8a" /></svg>{PRAYER_NAMES[lang][PRAYERS.indexOf(next.key)]} {next.time}</span>;
}
