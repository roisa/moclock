/** Language-specific words for numbers, times, days and months. Add a language here
 *  (and a dictionary in ./dict-<lang>.ts) to localise the whole game. */
import type { Lang } from "./types";
import { hourOf, minuteOf } from "../engine/time";

const NUM: Record<Lang, string[]> = {
  en: ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve",
    "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"],
  id: ["nol", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas", "dua belas",
    "tiga belas", "empat belas", "lima belas", "enam belas", "tujuh belas", "delapan belas", "sembilan belas", "dua puluh"],
};
const TENS: Record<Lang, string[]> = {
  en: ["", "", "twenty", "thirty", "forty", "fifty", "sixty"],
  id: ["", "", "dua puluh", "tiga puluh", "empat puluh", "lima puluh", "enam puluh"],
};
export function numberWord(n: number, lang: Lang): string {
  if (n <= 20) return NUM[lang][n];
  const t = Math.floor(n / 10), u = n % 10;
  if (n < 70) return TENS[lang][t] + (u ? (lang === "en" ? "-" : " ") + NUM[lang][u] : "");
  return String(n);
}

export const DAYS: Record<Lang, string[]> = {
  // Monday first (ISO / Indonesian school week)
  en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  id: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
};
export const DAYS_SHORT: Record<Lang, string[]> = {
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  id: ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"],
};
export const MONTHS: Record<Lang, string[]> = {
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  id: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
};
export const MONTHS_SHORT: Record<Lang, string[]> = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  id: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"],
};

/** JS Date.getDay() (0=Sun) → our index (0=Mon) */
export const dayIndex = (jsDay: number) => (jsDay + 6) % 7;

export function ordinal(n: number, lang: Lang): string {
  if (lang === "id") return "tanggal " + n;
  const s = n % 100 >= 11 && n % 100 <= 13 ? "th" : ["th", "st", "nd", "rd"][n % 10] || "th";
  return n + (["st", "nd", "rd"].includes(s) ? s : "th");
}
export function dateText(y: number, m: number, d: number, lang: Lang): string {
  void y;
  return lang === "en" ? `${MONTHS.en[m]} ${d}` : `${d} ${MONTHS.id[m]}`;
}

/**
 * How a child says a time.
 *   EN: "three o'clock", "half past three", "quarter past three", "quarter to four",
 *       "five past three", "twenty-five to four"
 *   ID: "jam tiga", "jam setengah empat" (half past 3 = "half (to) four"!),
 *       "jam tiga lewat seperempat", "jam empat kurang seperempat",
 *       "jam tiga lewat lima menit", "jam empat kurang dua puluh lima menit"
 * numerals=true writes the numbers as digits for on-screen text ("half past 3").
 */
export function timeWords(t: number, lang: Lang, numerals = false): string {
  const h = hourOf(t), m = minuteOf(t);
  const next = h === 12 ? 1 : h + 1;
  const N = (n: number) => (numerals ? String(n) : numberWord(n, lang));
  if (lang === "en") {
    if (m === 0) return `${N(h)} o'clock`;
    if (m === 30) return `half past ${N(h)}`;
    if (m === 15) return `quarter past ${N(h)}`;
    if (m === 45) return `quarter to ${N(next)}`;
    if (m < 30) return `${N(m)} ${m === 1 ? "minute" : m % 5 ? "minutes" : ""} past ${N(h)}`.replace(/\s+/g, " ");
    const r = 60 - m;
    return `${N(r)} ${r === 1 ? "minute" : r % 5 ? "minutes" : ""} to ${N(next)}`.replace(/\s+/g, " ");
  }
  if (m === 0) return `jam ${N(h)}`;
  if (m === 30) return `jam setengah ${N(next)}`;
  if (m === 15) return `jam ${N(h)} lewat seperempat`;
  if (m === 45) return `jam ${N(next)} kurang seperempat`;
  if (m < 30) return `jam ${N(h)} lewat ${N(m)} menit`;
  return `jam ${N(next)} kurang ${N(60 - m)} menit`;
}
/** "3:05" read aloud: "three oh five" / "tiga lewat lima" — used next to the digital clock. */
export function digitalWords(t: number, lang: Lang): string {
  const h = hourOf(t), m = minuteOf(t);
  if (lang === "en") {
    if (m === 0) return `${numberWord(h, "en")} o'clock`;
    return `${numberWord(h, "en")} ${m < 10 ? "oh " + numberWord(m, "en") : numberWord(m, "en")}`;
  }
  if (m === 0) return `jam ${numberWord(h, "id")} tepat`;
  return `jam ${numberWord(h, "id")} lewat ${numberWord(m, "id")} menit`;
}
/** A duration in minutes, said simply. */
export function durationWords(min: number, lang: Lang, numerals = true): string {
  const N = (n: number) => (numerals ? String(n) : numberWord(n, lang));
  const h = Math.floor(min / 60), m = min % 60;
  const parts: string[] = [];
  if (lang === "en") {
    if (h) parts.push(`${N(h)} ${h === 1 ? "hour" : "hours"}`);
    if (m === 30 && h) parts.push("and a half");
    else if (m) parts.push(`${h ? "and " : ""}${N(m)} ${m === 1 ? "minute" : "minutes"}`);
    if (m === 30 && h) return `${N(h)} and a half hours`;
    return parts.join(" ") || "0 minutes";
  }
  if (h && m === 30) return `${N(h)} setengah jam`.replace(/^1 setengah|^satu setengah/, "satu setengah");
  if (h) parts.push(`${N(h)} jam`);
  if (m) parts.push(`${N(m)} menit`);
  return parts.join(" ") || "0 menit";
}
