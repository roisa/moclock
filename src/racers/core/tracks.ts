import type { TrackDef } from "./track";

/** Clock Town: a friendly loop with two sweeping curves, one S-bend and a long straight past the clock tower. */
export const CLOCK_TOWN: TrackDef = {
  id: "clock-town",
  width: 13,
  points: [[0, 0], [55, -4], [98, 14], [116, 52], [100, 92], [62, 104], [34, 128], [-6, 146], [-52, 132], [-80, 98], [-74, 58], [-48, 34], [-46, 6]],
};
/** Day Week Valley: a wider, rounder loop through the hills (seven day gates). */
export const DAY_VALLEY: TrackDef = {
  id: "day-valley",
  width: 15,
  points: [[0, 0], [70, 0], [120, 30], [130, 85], [92, 128], [30, 138], [-30, 120], [-70, 80], [-74, 30], [-44, 4]],
};
