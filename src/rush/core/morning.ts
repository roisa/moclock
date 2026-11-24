import { buildMorningTown, buildTunnel, libraryZ } from "./world-morning";
import { MORNING } from "./clock";
import type { WorldDef } from "./sim";
export function morningWorld(): WorldDef {
  const main = buildMorningTown();
  return { main, tunnel: buildTunnel(), span: MORNING, end: libraryZ(main), packagesNeeded: 3 };
}
