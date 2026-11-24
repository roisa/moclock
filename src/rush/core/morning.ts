import { buildMorningTown, buildTunnel, libraryZ } from "./world-morning";
import { buildSunnyPark, NOON } from "./world-park";
import { MORNING } from "./clock";
import type { WorldDef } from "./sim";
export function morningWorld(): WorldDef {
  const main = buildMorningTown();
  return { main, tunnel: buildTunnel(), span: MORNING, end: libraryZ(main), packagesNeeded: 3 };
}
export function parkWorld(): WorldDef {
  const main = buildSunnyPark();
  return { main, tunnel: buildTunnel(), span: NOON, end: libraryZ(main), packagesNeeded: 3 };
}
/** playable worlds → their road */
export const BUILD: Record<string, () => WorldDef> = { morning: morningWorld, park: parkWorld };
