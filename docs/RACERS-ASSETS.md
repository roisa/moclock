# Time Racers: 3D asset plan and missing assets

## What exists today

- **2D art only.** No 3D models of the Baby Mo family exist in any repo. `babymo-app`, `babymo-web` and `moclock` contain no `.glb`, `.gltf`, `.fbx`, `.blend` or `.usdz` files. The Hijaiyah island game builds its 3D from three.js primitives.
- **Real 2D art is used wherever faces matter:**
  - home screen (characters sitting in SVG kart fronts)
  - racer select
  - question guide
  - tutorial
  - results podium
  - rewards
- **In the 3D race, the drivers are temporary placeholders.** They are built from simple shapes in `src/racers/game/kart.ts → buildDriver()` and seen mostly from behind:
  - Mo: dark messy hair, green suit, orange sleeves
  - Ais: pink hijab, lavender band, light-blue clip
  - Adam: fluffy brown hair, blue hoodie; the optional white peci is supported but off by default
- **The karts are procedural clay models.** They follow the concept art: rounded tub, big wheels, nose emblem (star / moon / shield), spoiler. They count as finished art for v1, though a modeller can replace them.

## Replacing the placeholders

The game keeps all character geometry in `buildDriver()`, so final models can be dropped in without touching gameplay:

1. Export each character as `public/racers/models/<id>.glb` (Draco or Meshopt compressed, KTX2 textures if possible).
2. In `kart.ts`, load the GLB with `SceneLoader.ImportMeshAsync` (add `@babylonjs/loaders/glTF`). Parent it to `driver`, scale it to the seat, and map the animation groups by name (below). Keep the shape-built driver as the fallback while the file loads.
3. `animateKart()` already drives `head`, `arms` and `driver`. With a rigged model, switch to the named animation groups instead.

## Character modelling spec (Blender)

| | Baby Mo | Baby Ais | Kak Adam |
|---|---|---|---|
| Age / proportion | toddler, about 3.2 heads tall, head ≈ 31 % of height | identical to Mo (twins, same height) | 7 years, about 4.2 heads tall, 1.14 × Mo's height |
| Face | large glossy brown eyes, rosy cheeks, small smile | same family face, big brown eyes | round face, large glossy brown eyes |
| Hair / head | short messy dark hair (near-black #1f1b1a), tufts on top | pink hijab (#ff8fbf), lavender inner band (#c9b3ff), light-blue star clip (#8fd0ff); hijab shape kept under any helmet | thick fluffy dark-brown hair (#4a2c1e); white peci variant |
| Outfit | green jumpsuit (#4cbf5a), light-grey star on chest, orange-peach sleeves (#ff9e6b), green shoes | pink jumpsuit, white crescent moon on chest, lavender shoes | blue hoodie (#2f6fe0) |
| Racing helmet (optional variant) | green with orange/yellow stripe, open face, hair visible at the front | pink, worn over the hijab (helmet sized for it), open face | blue and white with a star-shield, hair visible |

**Technical spec**

- **Skeleton:** standard humanoid (Mixamo-compatible bone names), plus face bones or blend shapes for: `blink`, `smile`, `open_mouth`, `surprised`, `think`.
- **Seated rest pose:** hips at the kart seat (0, 0.85, −0.25 in kart space; the kart is 3.4 long and 2.1 wide), hands on the wheel at (±0.2, 1.27, 0.33).
- **Polygon budget:** ≤ 12 k triangles per character and ≤ 6 k per kart.
- **Materials:** one 1024² atlas (base colour + a little roughness); clay look with no metallic.
- **Animation clips (names matter):**
  - `idle_drive`
  - `steer_left`
  - `steer_right`
  - `accelerate`
  - `boost` (lean back, joyful face)
  - `bump` (small wobble)
  - `cheer_arms_up`
  - `win_dance`
  - `surprised`
  - `think`
  - `wave`
- **Export:** glTF 2.0 binary (`.glb`), +Y up, metres, animations baked, no cameras or lights.

## Other missing assets

| Priority | Asset | Notes |
|---|---|---|
| P1 | Adam in his blue hoodie (non-tennis) and with the white peci, 2D render-1 style | All current Adam art is the tennis set. The concept art shows the peci and hoodie look. |
| P1 | Seated / driving 2D poses for Mo, Ais and Adam (upper body, hands on a wheel) | Menus currently fake "seated" by tucking standing art behind an SVG kart front. |
| P2 | Celebration poses holding a trophy | For the results screen. |
| P2 | Recorded voice lines for race prompts (EN and ID) | `npm run voice:lines` lists Time Adventure lines; the race prompts are in `src/racers/i18n.ts`. |
| P3 | Real engine, turbo and crowd sound recordings | They are synthesised today (`game/sound.ts`, platform SFX). |
