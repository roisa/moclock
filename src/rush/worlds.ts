/**
 * What makes each playable world look and sound different, on top of its road
 * (core/world-*.ts). The sim uses the same item kinds everywhere; `alias` swaps
 * the art: e.g. in Sunny Park the "library" is the picnic spot, the friend
 * "bunny" is a duckling and her "carrots" are apples.
 */
import type { WorldId } from "./state";

export interface WorldLook {
  /** sky: morning warms from gold to blue as the clock runs; noon is bright blue all the way */
  sky: "morning" | "noon";
  far: string; // horizon layer (public/rush)
  alias: Record<string, string>;
  /** pictures of the three bundles (pickup arches, HUD, mission card) */
  bundles: [string, string, string];
  friend: { img: string; item: string; token: string };
  /** people waiting at the destination (drawn on the road and on the Delivered screen) */
  hosts?: string[];
  /** a du'a on the Delivered screen (babymo-app recording) */
  doa?: { clip: "d-eating"; arabic: string; latin: string };
}

export const LOOK: Partial<Record<WorldId, WorldLook>> = {
  morning: {
    sky: "morning", far: "far-morning.webp", alias: {},
    bundles: ["rush/art/books.webp", "rush/art/books.webp", "rush/art/books.webp"],
    friend: { img: "rush/kit/pet-rabbit.webp", item: "rush/kit/carrot.webp", token: "bunny" },
  },
  park: {
    sky: "noon", far: "far-park.webp",
    alias: { library: "picnic", bunny: "pet-duckling", carrot: "apple", "carrot-bag": "pkg-fruit", "bunny-home": "pond", masjid: "masjid", "pickup-1": "pkg-fruit", "pickup-2": "pkg-lunch", "pickup-3": "pkg-basket" },
    bundles: ["rush/art/pkg-fruit.webp", "rush/art/pkg-lunch.webp", "rush/art/pkg-basket.webp"],
    friend: { img: "rush/kit/pet-duckling.webp", item: "rush/kit/apple.webp", token: "duck" },
    hosts: ["characters/umi-welcome.webp", "characters/abi-wave.webp"],
    doa: { clip: "d-eating", arabic: "بِسْمِ اللَّهِ", latin: "Bismillāh" },
  },
};
export const look = (w: WorldId): WorldLook => LOOK[w] ?? LOOK.morning!;
