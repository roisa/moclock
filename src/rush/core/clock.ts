/** Story time: the day moves with the ride, never against the child. */
import { make } from "../../engine/time";

export interface TimeSpan { from: number; to: number } // minutes of a 12-h day
/** time shown at a given route progress (0…1) */
export const storyTime = (span: TimeSpan, progress: number) => Math.round(span.from + (span.to - span.from) * Math.min(1, Math.max(0, progress)));
/** progress at which the story clock reads `t` */
export const progressAt = (span: TimeSpan, t: number) => (t - span.from) / (span.to - span.from);
export const MORNING: TimeSpan = { from: make(8, 0), to: make(9, 0) };
/** 0 = early (golden), 1 = full morning (blue) — drives the sky */
export const daylight = (span: TimeSpan, t: number) => Math.min(1, Math.max(0, (t - span.from) / (span.to - span.from)));
