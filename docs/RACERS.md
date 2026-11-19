# Baby Mo: Time Racers (3D)

A 3D kart racing game where answering time questions gives you turbo.
It lives in this repo as a second app:

- Source: `src/racers/`
- Entry: `racers/index.html`
- Live: **https://roisa.github.io/moclock/racers/**

It reuses Time Adventure's tested clock maths, teaching distractors, EN/ID
number, time, day and month words, the 2D clock, and the real Baby Mo
character art.

## 1. Audit (19 Nov 2026)

| Area | Found | Used for Time Racers |
|---|---|---|
| Framework | `babymo-app`: vanilla JS pages plus Capacitor iOS. `moclock`: React 18 + TS + Vite (Time Adventure). | Built inside `moclock` as a second Vite entry, so tooling, tests and deploy are shared and nothing in the hub changes. |
| 3D | No 3D models of the characters exist anywhere. The hub's Hijaiyah island uses three.js primitives. | Babylon.js 7.54 as asked. Procedural clay karts, temporary shape-built drivers, GLB swap plan (`RACERS-ASSETS.md`). |
| Character art | Render-1 Mo (49 poses), render-2 Mo (upper body), Ais (66), Adam tennis set (43), Abi, Umi | Menus, racer select, guide, tutorial and podium use the real art. Menu karts are SVG fronts with the real characters "seated" behind them. |
| Audio | Recorded clip manifest (hub), synthesised SFX | Speech + SFX via `platform/audio`; a new synthesised engine hum (`game/sound.ts`). |
| Localisation | EN/ID dictionaries with typed keys | `src/racers/i18n.ts` is merged into the same `t()`. |
| Progress | `platform/storage` (IndexedDB + localStorage, newest copy wins) | Separate `racers` save (karts, coins, stars, trophies, stickers, skills). |
| Missing | 3D characters, seated or driving poses, Adam with hoodie and peci | See `RACERS-ASSETS.md` (Blender spec and animation clip list). |

## 2. Architecture

```
src/racers/
  core/            pure TypeScript, unit-tested, no Babylon/React
    track.ts       closed Catmull-Rom spline, equal arc-length samples, track space (s, lat)
    tracks.ts      Clock Town, Day Week Valley
    physics.ts     arcade kart physics (junior lane assist, explorer steering, soft walls, turbo)
    ai.ts          lane-weaving AI with overtakes + rubber banding (always beatable)
    race.ts        race state: countdown, laps, positions, gates, pickups, turbo charges, combos, events
    questions.ts   question generator per level family (never a fixed list)
  game/            Babylon.js (rendering only)
    RaceGame.ts    engine + scene for one race; bridges core ⇄ React (events + small API)
    world.ts       environment builder: road, curbs, barriers, arches/gates, scenery, pickups
    kart.ts        procedural clay karts + placeholder drivers, per-frame animation
    look.ts        clay materials, canvas textures (road, curbs, clock faces, emblems, signs)
    fx.ts          turbo flames, sparkles   sound.ts  engine hum   engine.ts  quality presets
    showcase.ts    home-screen flyover, garage turntable
  content/         racers & karts, worlds & levels (data)
  screens/         React screens: Menus (home, map, racer, garage, levels, tutorial), Race, After
  ui/Kit.tsx       banners, round buttons, big buttons, logo, SVG kart fronts, stars, coins
  state.tsx        progress + settings, race rewards, unlocks
  i18n.ts          EN + ID strings
```

**Data flow in a race:**

1. React creates a `RaceGame` with a config: level, racer, kart, junior/explorer mode, quality, language, start difficulty, and an AI factor taken from the child's accuracy.
2. Each frame, `RaceGame.tick()` reads input (keys, touch) and steps `Race`. It then moves the meshes from the race state, follows with the camera, and emits HUD, question and feedback events.
3. React renders the HUD and question panel and calls `answer(i)`, `turbo()`, `steerToLane(i)`, `setTouch()` and `setPaused()`.

**Why track space?** Every kart is described by its distance along the road
and a sideways offset. That makes lap counting, positions, AI lanes,
collisions, pickups and gates trivial and robust, and keeps young drivers on
the road. The road curves under them, and the walls are soft.

## 3. Gameplay

**Race loop:**

1. Countdown 3-2-1-Go.
2. Laps of Clock Town.
3. Quiz gates appear twice per lap. A question opens just after the arch, and the race goes into slow motion so there's time to think.
4. A correct answer gives turbo: flames, a wider camera FOV, speed lines, the character cheers, and combos make it longer. You also get a turbo charge for the ⚡ button.
5. A wrong answer gives a gentle explanation and another try. Nothing is taken away; the combo just resets.
6. Finish → podium → stars, coins, trophy, and the times you learned.

**Day Week Valley:**

- Three lane gates carry the answers.
- The child steers through one. In Junior mode, tapping an answer steers there.
- A wrong gate brings the same question back at the next gate.

**Modes (Parent corner):**

- **Junior:** auto-drive with lane assist (default).
- **Explorer:** steer yourself; brake with ↓. Curves push you outward a little.

**Balance (unit-tested):**

- Answering every question wins.
- About half right still usually wins.
- No correct answers finishes close behind.
- AI difficulty follows the level and the child's first-try accuracy.

**Rewards:**

- Stars come from first-try answers: 1 for finishing, 2 at ≥ 60 %, 3 at ≥ 85 %.
- Coins: stars collected on the track plus 5 per correct answer.
- A trophy for every 1st place.
- A sticker for every 3-star level.
- Karts unlock with coins earned in races (no real money anywhere). Every kart's stats add up to the same total, so unlocking changes the feel, not the chance to win.

**Levels:**

| Clock Town | Day Week Valley |
|---|---|
| 1 Meet the Clock (numbers 1–12) | 8 Day after |
| 2 Find the Numbers (short hand) | 9 Day before |
| 3 Full Hour | 10 Weekend |
| 4 Half Past | 11 Months |
| 5 Quarter Hour | |
| 6 Five-Minute | |
| 7 Time Master Grand Prix (mixed; every 3rd question is digital → pick the clock face) | |

- Routine City, Calendar Island and Time Challenge are shown on the map as **"Coming soon"**. They are not playable yet.
- Day Week Valley opens after Clock Town level 2.

## 4. Devices and performance

- **Quality presets** (Parent corner, or Auto from device memory and cores): Low, Medium, High. They control pixel ratio, shadows, scenery density and particle counts.
- **Adaptive quality:** if the frame rate stays under 30 fps, the game renders fewer pixels and drops shadows.
- **Draw calls kept low:** static meshes are frozen, trees, flowers, barriers and clouds are thin instances (one draw each), and materials are shared.
- **Phones:**
  - Portrait shows a friendly "turn your phone" card with "Play like this" (never blocking).
  - Landscape uses compact HUD and question layouts.
  - Safe areas are respected.
- **Tablets and desktop:** larger HUD and question panel. The keyboard works: ← → steer, ↑ ↓ (Explorer: ↓ brakes), Space = turbo.
- **WebGPU is not used.** Babylon's WebGPU path downloads a shader compiler from a CDN, and a kids' app must make no third-party requests and work offline. WebGL2 (with WebGL1 fallback) is used everywhere. If WebGL is missing, a friendly message replaces the race.
- **Offline (PWA):**
  - The site service worker precaches Time Adventure.
  - The racer's files (Babylon.js and shaders, about 1.5 MB) are cached the first time the racer page opens, so Time Adventure players never download the 3D engine.
  - `npm run test:offline:racers` checks that a race starts with the network off.

## 5. Native (later)

The same build runs in Capacitor (relative URLs, hash routing). Add
`@capacitor/haptics` (already used when present) and
`@capacitor/screen-orientation` if you want to lock landscape during races.
Full steps: `NATIVE.md`. Native builds of Time Racers have **not** been made or
tested.

## 6. Adding things

- **A level:** add an entry to `content/levels.ts` with a question family, laps, gates and AI factor, then add the `rl.*` title in both languages in `i18n.ts`.
- **A question family:** add a case to `core/questions.ts`. `core/questions.test.ts` checks every level automatically for exactly one correct and unique answer, and for filled EN/ID text.
- **A track:** add control points to `core/tracks.ts`. The track test checks length, closure and self-crossing. Then add a theme in `game/world.ts`.
- **A kart:** add an entry to `content/racers.ts`. Keep `top + accel + handling = 1.5`.
