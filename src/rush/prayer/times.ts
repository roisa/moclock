/**
 * On-device prayer times — a TypeScript port of babymo-app/www/bm-prayertimes.js
 * (Kementerian Agama RI parameters, the same numbers aladhan gives for method 20).
 * No network: computed from the standard low-precision solar position formulas.
 *   Fajr 20° · Sunrise/Sunset 0.833° · Dhuhr transit · Asr shadow factor 1 (Shafi'i)
 *   Maghrib = sunset · Isha 18° · Imsak = Fajr − 10 min · angle-based high-latitude rule
 */
const D2R = Math.PI / 180, R2D = 180 / Math.PI;
const sin = (d: number) => Math.sin(d * D2R), cos = (d: number) => Math.cos(d * D2R), tan = (d: number) => Math.tan(d * D2R);
const asin = (x: number) => Math.asin(x) * R2D, acos = (x: number) => Math.acos(x) * R2D;
const atan2 = (y: number, x: number) => Math.atan2(y, x) * R2D, acot = (x: number) => Math.atan(1 / x) * R2D;
const fix = (a: number, b: number) => { a = a - b * Math.floor(a / b); return a < 0 ? a + b : a; };
const fixAngle = (a: number) => fix(a, 360), fixHour = (h: number) => fix(h, 24);

export const PARAMS = { fajr: 20, isha: 18, asrFactor: 1, maghribMin: 0, dhuhrMin: 0, imsakMin: 10 };
const RISE_SET = 0.833;

function julian(y: number, m: number, d: number) {
  if (m <= 2) { y -= 1; m += 12; }
  const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5;
}
function sunPos(jd: number) {
  const D = jd - 2451545.0;
  const g = fixAngle(357.529 + 0.98560028 * D);
  const q = fixAngle(280.459 + 0.98564736 * D);
  const L = fixAngle(q + 1.915 * sin(g) + 0.020 * sin(2 * g));
  const e = 23.439 - 0.00000036 * D;
  const RA = atan2(cos(e) * sin(L), cos(L)) / 15;
  return { decl: asin(sin(e) * sin(L)), eqt: q / 15 - fixHour(RA) };
}

type Raw = Record<"fajr" | "sunrise" | "dhuhr" | "asr" | "sunset" | "isha" | "maghrib" | "imsak" | "midnight", number>;
function compute(y: number, mo: number, d: number, lat: number, lng: number, tz: number): Raw {
  const jDate = julian(y, mo, d) - lng / (15 * 24);
  const midDay = (t: number) => fixHour(12 - sunPos(jDate + t).eqt);
  const angleTime = (angle: number, t: number, ccw = false) => {
    const decl = sunPos(jDate + t).decl, noon = midDay(t);
    const h = acos((-sin(angle) - sin(decl) * sin(lat)) / (cos(decl) * cos(lat))) / 15;
    return noon + (ccw ? -h : h);
  };
  const asrTime = (factor: number, t: number) => {
    const decl = sunPos(jDate + t).decl;
    return angleTime(-acot(factor + tan(Math.abs(lat - decl))), t);
  };
  const g = { fajr: 5 / 24, sunrise: 6 / 24, dhuhr: 12 / 24, asr: 13 / 24, sunset: 18 / 24, isha: 18 / 24 };
  const t = {
    fajr: angleTime(PARAMS.fajr, g.fajr, true),
    sunrise: angleTime(RISE_SET, g.sunrise, true),
    dhuhr: midDay(g.dhuhr),
    asr: asrTime(PARAMS.asrFactor, g.asr),
    sunset: angleTime(RISE_SET, g.sunset),
    isha: angleTime(PARAMS.isha, g.isha),
  } as Raw;
  for (const k of Object.keys(t) as (keyof Raw)[]) t[k] += tz - lng / 15;
  const night = fixHour(t.sunrise - t.sunset);
  const fajrMax = (PARAMS.fajr / 60) * night, ishaMax = (PARAMS.isha / 60) * night;
  if (isNaN(t.fajr) || fixHour(t.sunrise - t.fajr) > fajrMax) t.fajr = t.sunrise - fajrMax;
  if (isNaN(t.isha) || fixHour(t.isha - t.sunset) > ishaMax) t.isha = t.sunset + ishaMax;
  t.dhuhr += PARAMS.dhuhrMin / 60;
  t.maghrib = t.sunset + PARAMS.maghribMin / 60;
  t.imsak = t.fajr - PARAMS.imsakMin / 60;
  t.midnight = t.sunset + fixHour(t.sunrise - t.sunset) / 2;
  return t;
}
function fmt(h: number) {
  if (isNaN(h)) return "--:--";
  h = fixHour(h + 0.5 / 60);
  const hh = Math.floor(h), mm = Math.floor((h - hh) * 60);
  return (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm;
}
export type Timings = Record<"Imsak" | "Fajr" | "Sunrise" | "Dhuhr" | "Asr" | "Sunset" | "Maghrib" | "Isha" | "Midnight", string>;
export function timings(date: Date, lat: number, lng: number, tz?: number): Timings {
  const y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate();
  if (tz == null) tz = -new Date(y, m - 1, d, 12).getTimezoneOffset() / 60;
  const t = compute(y, m, d, +lat, +lng, tz);
  return { Imsak: fmt(t.imsak), Fajr: fmt(t.fajr), Sunrise: fmt(t.sunrise), Dhuhr: fmt(t.dhuhr), Asr: fmt(t.asr), Sunset: fmt(t.sunset), Maghrib: fmt(t.maghrib), Isha: fmt(t.isha), Midnight: fmt(t.midnight) };
}
const ZONES: Record<string, string> = { "Asia/Jakarta": "WIB", "Asia/Pontianak": "WIB", "Asia/Makassar": "WITA", "Asia/Ujung_Pandang": "WITA", "Asia/Jayapura": "WIT" };
/** the device time zone: "WIB" / "WITA" / "WIT" / IANA name */
export function deviceZone(): { tz: string; label: string | null } {
  let tz = "";
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch { /* ignore */ }
  return { tz, label: ZONES[tz] ?? null };
}
