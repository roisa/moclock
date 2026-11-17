import { en, type DictKey } from "./dict-en";
import { id } from "./dict-id";
import type { Lang, Msg, Param } from "./types";
import { DAYS, MONTHS, dateText, durationWords, numberWord, ordinal, timeWords } from "./words";
import { digital } from "../engine/time";

export const DICTS: Record<Lang, Record<DictKey, string>> = { en, id };
export const LANGS: { id: Lang; label: string; flag: string; bcp47: string }[] = [
  { id: "id", label: "Bahasa Indonesia", flag: "ID", bcp47: "id-ID" },
  { id: "en", label: "English", flag: "EN", bcp47: "en-US" },
];

/** show = on-screen text (digits), say = text for speech (number words) */
export type Mode = "show" | "say";

function param(v: Param, lang: Lang, mode: Mode): string {
  if (typeof v === "string") return v;
  if (typeof v === "number") return String(v);
  if ("k" in v) return t(v, lang, mode);
  if ("time" in v) {
    if (v.style === "digital" && mode === "show") return digital(v.time);
    return timeWords(v.time, lang, mode === "show");
  }
  if ("day" in v) return DAYS[lang][v.day];
  if ("month" in v) return MONTHS[lang][v.month];
  if ("date" in v) return dateText(v.date.y, v.date.m, v.date.d, lang);
  if ("num" in v) return mode === "say" ? numberWord(v.num, lang) : String(v.num);
  if ("ord" in v) return ordinal(v.ord, lang);
  if ("dur" in v) return durationWords(v.dur, lang, mode === "show");
  return "";
}

export function t(m: Msg | string, lang: Lang, mode: Mode = "show"): string {
  const msg = typeof m === "string" ? { k: m } : m;
  const tpl = (DICTS[lang] as Record<string, string>)[msg.k] ?? (DICTS.en as Record<string, string>)[msg.k];
  if (tpl == null) {
    if (import.meta.env?.DEV) console.warn("missing i18n key", msg.k);
    return msg.k;
  }
  if (!msg.p) return tpl;
  return tpl.replace(/\{(\w+)\}/g, (all, name) => (msg.p && name in msg.p ? param(msg.p[name], lang, mode) : all));
}

export function hasKey(k: string): boolean {
  return k in DICTS.en && k in DICTS.id;
}
export type { Lang, Msg };
