export type Lang = "en" | "id";

/** A translatable message: a dictionary key + parameters. Content never stores raw strings. */
export interface Msg {
  k: string;
  p?: Record<string, Param>;
}
export type Param =
  | string
  | number
  | Msg
  | { time: number; style?: "words" | "digital" }
  | { day: number }
  | { month: number }
  | { date: { y: number; m: number; d: number } }
  | { num: number }
  | { ord: number }
  | { dur: number };

export const msg = (k: string, p?: Record<string, Param>): Msg => (p ? { k, p } : { k });
