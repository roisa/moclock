import type { WorldDef } from "../engine/types";

export const WORLDS: WorldDef[] = [
  { id: "clock", title: "world.clock", tagline: "world.clock.tag", pose: "mo-point", friend: "ais-wave", color: "green", scene: "town" },
  { id: "calendar", title: "world.calendar", tagline: "world.calendar.tag", pose: "mo-idea", friend: "ais-gift", color: "blue", scene: "calendar" },
  { id: "routine", title: "world.routine", tagline: "world.routine.tag", pose: "mo-pj", friend: "ais-wake", color: "orange", scene: "home" },
  { id: "challenge", title: "world.challenge", tagline: "world.challenge.tag", pose: "mo-run", friend: "adam-wave", color: "lavender", scene: "park" },
];
export const worldById = (id: string) => WORLDS.find((w) => w.id === id);
