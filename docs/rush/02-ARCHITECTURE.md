# Baby Mo Time Rush — Technical Architecture

## Stack
Same repo and build as Time Adventure / Time Racers: React 18 + TypeScript + Vite multi-page. Entry `index.html` (the site home page) → `src/rush/main.tsx`, deployed at `/moclock/`. Time Adventure moved to `learn/index.html` (`/moclock/learn/`), Time Racers stays at `/moclock/racers/`. **No 3D engine:** the 2.5D "pre-rendered" look is a custom Canvas2D pseudo-3D road (segment projection, as in classic arcade racers) with sprite billboards. This keeps the bundle small (≈ 60 kB JS) and runs at 60 fps on low-end Android tablets.

## Layers
```
src/rush/
  main.tsx              entry: dicts, SW registration, mounts <App>
  App.tsx               hash router (#/, #/worlds, #/mission, #/ride, #/garage, #/collection, #/parents)
  i18n.ts               EN/ID strings (merged into shared DICTS)
  state.ts              ProgressionManager: save/load, stars, unlocks, settings
  assets/
    bible.ts packs.ts   single source of truth for art + prompts (6 things per image)
    loader.ts           AssetLoader: preload, lazy world packs, fallback chain
  core/                 PURE logic, no DOM — unit-tested
    track.ts            RoadGenerator: segments (curve, hill), lanes, item placement from a world script
    world-morning.ts    Morning Town route script
    player.ts           PlayerController + BikeController: speed, lanes, jump arc, wobble, boost
    items.ts            ObstacleManager + CollectibleManager + ClockBalloonManager (pooled)
    mission.ts          DeliveryMissionManager: pickups, friend quest, shortcut, arrival
    clock.ts            story time from progress; balloon times
    sim.ts              GameSim: fixed-step update that wires the managers and emits events
  render/
    road.ts             CameraController + segment projection + road drawing
    sprites.ts          procedural painters for every placeholder (trees, houses, library…)
    rider.ts            AnimationController: picks sheet+frame from player state; render-1 rig fallback
    env.ts              WorldEnvironmentManager: sky, sun, parallax, clouds, time-of-day tint
    particles.ts        ParticleManager (pooled)
  screens/              React screens (UIManager = router + overlays)
  ui/Kit.tsx            app-ayah kit buttons/panels
  audio.ts              AudioManager: wraps shared sfx/speak with cooldowns
```

## Game loop
`requestAnimationFrame` → accumulate dt → `sim.step(1/60)` (fixed) → `render(sim, alpha)`. The sim emits events (`star`, `balloon`, `pickup`, `bump`, `jump`, `land`, `boost`, `friend`, `shortcut`, `arrive`) consumed by audio, particles and the React HUD (HUD state is pushed at ≤10 Hz to avoid re-render churn).

## Road model
Track = array of segments (length 200 units). Each segment: `curve`, `y` (hill), `items[]`. Camera sits 1000 units behind the player at height 900, FOV ≈ 100°; draw distance 120 segments, back-to-front, with clipping by max-y. Lanes at x = −0.62, 0, +0.62 (road half-width = 1). Items are billboards with world size; scale = projection scale.

## Collisions
Per step, items in the player's segment ±1 are tested: same lane (|dx| < 0.32) and z overlap. Airborne height lets the player pass logs/puddles/blocks. Each item has `hit` (consumed) so it fires once.

## Object pooling
Items are created once per track build; particles use a fixed pool of 256; no per-frame allocation in the sim or render hot paths.

## Assets
Fallback chain per sprite id: `public/rush/art/<id>.webp` (generated) → `kit:` (app-ayah library in `public/rush/kit/`) → `render1:` (Baby Mo poses copied to `public/rush/mo/`) → procedural painter. Preload: core UI + Morning Town pack before the ride; other world packs lazy-load when selected. `atlas.json` from `rush-slice.py` describes sheet frame layout.

## Persistence
`localStorage` key `babymo.rush.v1` via shared `platform/storage` (time-stamped). Contains stars, best per world, unlocks, equipped bike/helmet/bag, settings (sound, voice, reduced motion, left-handed, language), parent unlock-all.

## Offline
`scripts/gen-sw.mjs` precaches the home page (Time Rush: its chunks, kit art and character art) on install; Time Adventure (`CACHE_LEARN`) and Time Racers (`CACHE_RACERS`) files are cached when their pages ask.

## Performance budget
≤ 4 ms sim+render on mid phones; canvas DPR capped at 2 (1.5 on low-memory devices); sprites drawn from pre-scaled offscreen canvases (procedural painters render once to cache).

## Testing
Vitest for `core/*` (deterministic sim), Playwright playthrough script for the full loop. See `06-TESTING.md`.
