# Baby Mo: Time Rush + Time Adventure + Time Racers

This repo holds three games that share one engine, the same character art and the
same EN/ID language layer:

| Game | Live | What it is |
|---|---|---|
| **Time Rush** (2.5D, home page) | https://roisa.github.io/moclock/ | Balance-bike delivery adventure: ride Morning Town 8:00 → 9:00 delivering storybooks while every clock tells the time. See **[docs/rush/](docs/rush/01-GDD.md)** |
| **Time Adventure** | https://roisa.github.io/moclock/learn/ | Calm learning worlds: clock, calendar, routine, durations (below) |
| **Time Racers** (3D) | https://roisa.github.io/moclock/racers/ | Babylon.js kart racing: answer time questions for turbo. See **[docs/RACERS.md](docs/RACERS.md)** |

An educational game that teaches children aged 3–8 how time works: reading
analog and digital clocks, days and months, daily routines, and how long things
take. It is part of the Baby Mo ecosystem by Ibra Creative Studio, uses the real
Baby Mo, Baby Ais, Kak Adam, Abi and Umi character art, and is available in
**Bahasa Indonesia** and **English**.

The web version came first: a responsive PWA that runs offline. One codebase
serves phones, tablets, desktops and foldables, and can later be packaged for
iOS, iPadOS and Android with Capacitor (see [docs/NATIVE.md](docs/NATIVE.md)).

| | |
|---|---|
| 4 worlds, 29 activities | Clock Town (11), Days & Calendar (6), My Daily Routine (5), Time Challenge (7) |
| Interactive clock | The hands are draggable and always derived from one time value, so they can never disagree. The hour hand creeps as the minutes pass. Optional snapping, keyboard support and screen-reader labels. |
| Never punishing | A mistake gets a gentle spoken hint, stronger visual help on the next miss, and another try. Finishing an activity always earns at least ⭐. |
| Adaptive | Difficulty goes up after 3 first-try answers in a row and down after 2 misses in a row. The level is remembered per activity. |
| Rewards | Stars, a 12-sticker book, world badges, unlockable home scenery and a daily mission. |
| Parents | A parent gate opens progress, strengths and areas to practise, a session log, settings and reset. |
| Privacy | No accounts, ads, analytics or network calls. Everything is stored on the device (Kids Category friendly). |

## Install & run

```bash
npm install
npm run dev            # http://localhost:5173/learn/  (the site home page is Time Rush)
```

Requirements: Node 18+ (developed on Node 22). Python 3 + Pillow is only needed
to re-sync character art or regenerate icons.

## Build & deploy

```bash
npm run build          # → dist/ : static site + generated service worker (sw.js)
npm run preview        # serve dist/ locally
```

`dist/` is a static folder. Every URL in it is relative, so you can upload it to
any static host (a domain root or a sub-folder, over HTTPS for the PWA). Make
sure the host serves `sw.js` and `index.html` with `Cache-Control: no-cache`.

**GitHub Pages (standalone).** `.github/workflows/deploy-pages.yml` runs the
tests, builds the game and publishes `dist/` every time `main` changes. It can
also be run by hand from the Actions tab. The address is
**https://roisa.github.io/moclock/** (it follows the repo name). One-time
setup: Settings → Pages → Source: **GitHub Actions**.

**Inside play.babymo.id (the Baby Mo app)**

```bash
npm run build:hub      # builds with --mode hub and exports to ../babymo-app/www/time-adventure/
```

The export script:

- copies the game into `babymo-app/www/time-adventure/`
- adds the hub icon at `icons/games/time-adventure.svg`
- lists every file in the hub's `sw.js` SHELL and bumps `babymo-games-vNNN`, as the
  hub's CLAUDE.md requires

In hub mode the game:

- does not register its own service worker; the hub worker caches it
- shares the hub's language (`bm_lang`) and child name
- adds the stars it earns to the hub star jar
- loads the hub's recorded Baby Mo voice clips (`bm-voice.js`)

Because the iOS app (Capacitor, `webDir: www`) ships `www/`, the game is
included in the next iOS build automatically.

## Time Racers quick start

```bash
npm run dev        # http://localhost:5173/racers/
npm run build && npx vite preview --port 4174 &
npm run e2e:racers            # real menu flow + a full race + explorer steering (software WebGL)
npm run test:offline:racers   # racer works offline after the first visit
```

## Time Rush quick start

```bash
npm run dev                   # http://localhost:5173/  (Time Adventure: /learn/, Time Racers: /racers/)
npm run docs:rush             # regenerate the asset bible + image prompt library from src/rush/assets/catalog.ts
python3 scripts/rush-slice.py art-src/rush/<id>.png <id> --grid 4x2   # drop a generated sprite sheet into the game
npm run build && npx vite preview --port 4174 &
npm run e2e:rush              # full delivery in EN + ID, rewards, saves, layouts light/dark
```
Docs: [GDD](docs/rush/01-GDD.md) · [architecture](docs/rush/02-ARCHITECTURE.md) · [asset bible](docs/rush/03-ASSET-BIBLE.md) · [image prompt library](docs/rush/04-PROMPT-LIBRARY.md) · [animation guide](docs/rush/05-ANIMATION-GUIDE.md) · [testing](docs/rush/06-TESTING.md)

## Test

```bash
npm test               # unit tests (vitest): clock maths, time words, every generator at every level, i18n completeness, progress
npm run build && npm run e2e   # Playwright: plays all 29 activities in EN and ID, checks rewards persist, screenshots 6 device sizes + dark mode → qa-shots/
npm run test:offline   # with `npm run preview` running: service worker + offline reload + offline play
```

Manual test checklist and the results so far: [docs/TESTING.md](docs/TESTING.md).

## Project layout

```
src/
  engine/       pure TS: time maths, RNG, question generators, session, adaptive difficulty, progress
  content/      data: worlds, activities, picture cards, rewards
  i18n/         dictionaries (dict-en.ts, dict-id.ts), number/time/day/month words
  platform/     storage (IndexedDB), audio (speech, SFX, music), haptics, device/foldables, PWA, native bridge
  characters/   asset-meta.json: measured bounding box and scale of every pose
  ui/           design-system components: Character, Clock, Scene, Visual, Guide, Calendar, Common
  games/        one "player" per question type (choice, set-clock, sequence, sort, calendar, timers…)
  screens/      Home, Games, World, Play (tutorial → questions → celebration), Rewards, Parent
  styles/       tokens.css (design tokens, dark mode), app/screens/games/clock CSS
public/characters/   Baby Mo family poses (synced from babymo-app)
scripts/             asset sync, icons, service-worker generator, hub export, e2e
docs/                architecture, UX, native guide, assets wishlist, testing
```

## Add a new game

1. **Generator.** In `src/engine/generators.ts`, write `(ctx) => Question`, or reuse an
   existing one (for example `timeQuiz([10, 20])`). Use `ctx.level` (1–3) for
   difficulty and `ctx.rng` for randomness. Return `Msg` keys, not strings.
2. **Content entry.** In `src/content/activities.ts`, add `{ id, world, title, goal, pose,
   rounds, skills, tutorial, gen }`. The world screen, Games screen, progress,
   parent report and daily mission pick it up automatically.
3. **Strings.** Add the keys to `src/i18n/dict-en.ts` and `dict-id.ts`. TypeScript
   fails the build if a key is missing in either file, and `npm test` fails if a
   generator uses a key that doesn't exist.
4. **New interaction (optional).** Add a variant to `Question` in
   `engine/types.ts`, a player in `src/games/`, and a case in `screens/Play.tsx`.

Run `npm test`. It generates 40 sessions per level for every activity and checks
that each question is valid: the answer is among the options, options are unique,
targets are reachable with the snapping step, and so on.

## Add a language

1. Add the code to `Lang` in `src/i18n/types.ts`.
2. Copy `dict-en.ts` to `dict-xx.ts`, translate it, and register it in `DICTS` and
   `LANGS` in `src/i18n/index.ts`.
3. Add the number, day, month and time words in `src/i18n/words.ts`. `timeWords()`
   is where each language's way of telling time lives. In Indonesian, half past 3
   is *setengah empat* ("half to four"), so this is not a simple translation.
4. Add the speech locale to `BCP` in `src/platform/audio.ts`.
5. Run `npm test`. The i18n tests check that every key exists and every
   placeholder is filled.

## Character art rules

These follow `babymo-app/CLAUDE.md`:

- Render 1 comes first. Large displays get the 800 px version.
- Render 2 is always shown upper body only. `Character` crops it automatically.
- The old Kata Baik cut-outs are never used.
- Mo and Ais are the same height, Kak Adam is a little taller, and Abi and Umi are
  adult height. `Character` scales every pose from its measured standing height
  (see `scripts/sync-assets.py`).

Poses this game still needs are listed in [docs/ASSETS.md](docs/ASSETS.md).

## Native apps later

See [docs/NATIVE.md](docs/NATIVE.md).
