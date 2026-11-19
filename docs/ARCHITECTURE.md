# Architecture

## 1. Repository audit (17 Nov 2026)

| Repo | What it is | Relevance |
|---|---|---|
| `babymo-app` | play.babymo.id: about 20 games as standalone vanilla-JS HTML pages in `www/`, with shared `bm-kit.js` (stars, daily missions, parent gate, share), `bm-i18n.js` (ID source, EN dictionary per game), `bm-voice.js` (recorded Google-TTS clips replace the device's speech), `bm-theme.js`, `bm-fit.js` (scales phone layouts on iPad), `sw.js` (hand-listed SHELL, versioned cache). Capacitor 8 iOS wrapper (`webDir: www`). No build step and no framework. | Hosts the game in production and in the iOS app. Its art, voice clips and shared storage keys are reused. |
| `babymo-web` | Next.js marketing site (babymo.id), stories, game shots. | Not needed for the game itself; it can link to the game later. |
| `moclock` | Empty repo (README only). | Home of this project. |

**Character assets found**

- Render 1 Mo (`baby-mo-poses`): 49 poses, 480 WebP plus an 800 PNG each. This set covers pointing, thinking, celebrating, sitting, sleeping, walking, surprise and pyjamas.
- Render 2 Mo (`baby-mo-render2`): 30 poses. It includes breakfast with du'a, a school backpack, reading and a checklist. Upper body only.
- Ais (`ais-garden`): 66 poses, including wake, sleep, snack, garden sequence, gift, cheer and think.
- Adam (`adam-tennis-v2`): 43 tennis poses.
- Abi and Umi (`family/`).
- Busts (`word-art/`, `mo-brush/`) and prayer poses (`mo-pray-assets/`).

**Audio found**

- `voice/manifest.js` with about 900 recorded clips keyed by text. They are played via `bm-voice.js`.
- `tools/voice/gen.py` generates new clips. It needs Google Cloud TTS credentials.
- There are no music files. The hub synthesises its SFX.

**Existing systems reused** (none were replaced):

- Shared keys: `bm_lang`, `mo_child_name`, `bm_star_jar`.
- The parent-gate pattern: a sum for grown-ups.
- The Fredoka and Nunito fonts.
- The pose library.
- The voice-clip system (hub mode).
- The hub's service worker (hub mode).
- The Capacitor iOS project, which picks up `www/time-adventure/` automatically.

**Why a separate TypeScript project rather than one more vanilla page.**
The brief asks for:

- a reusable engine
- structured content
- typed localisation
- tests
- about 30 activities sharing 11 interaction types

A typed, tested codebase is the sensible way to build that. `babymo-app` has no
bundler, and adding one there would change how every existing game ships. So the
game lives in `moclock`, builds to a static folder with relative URLs, and is
exported into the hub. This adds nothing to how the hub is built or deployed.

**Integration risks noted**

- Two service workers on one origin: solved by not registering ours in hub mode.
- `bm-fit.js` scales phone pages on iPad: deliberately not used, because this game has real tablet layouts.
- Hub i18n swaps DOM text through a MutationObserver: not loaded here, because we have our own dictionaries.
- Recorded clips only exist for lines that were generated. Any other line falls back to the device's TTS (see ASSETS.md for the list to record).

## 2. Layers

```
content/ (data) ──► engine/ (pure logic) ──► games/ + screens/ (React UI)
     │                    │                          │
  i18n keys          Question / Msg             ui/ design system
                                                     │
                                       platform/ (storage, audio, device, pwa, native)
```

| Layer | Knows about | Never touches |
|---|---|---|
| `content/` | engine types, i18n keys | DOM, React, strings |
| `engine/` | time maths, RNG, types | DOM, React, storage, language |
| `i18n/` | dictionaries, words | UI |
| `platform/` | browser / Capacitor APIs, with fallbacks | game rules |
| `ui/`, `games/`, `screens/` | all of the above | `window.Capacitor` directly |

### Educational engine

- **Question generation.** `ActivityDef.gen(ctx)` is called with `{ rng, level, index, now }` and returns a `Question`. There are 11 question types: choice, set-clock, sequence, sort, clock-tap, clock-numbers, calendar-tap, calendar-fill, countdown, day-explorer and timer.
- **Text.** Every text is a `Msg` (`{k, p}`). Params can be times, days, months, dates, ordinals and durations. They are formatted per language and per mode: `show` writes digits (*half past 3*), `say` writes words for speech (*half past three*).
- **Distractors teach.** For a time, the generator first offers the classic confusions: hands swapped (3:00 vs 12:15) and the hour off by one for half past. Random times from the same family fill the remaining options.
- **Session.** `GameSession` handles the question flow, the try count, and first-try scoring (≥80 % gives ⭐⭐⭐, ≥50 % gives ⭐⭐, finishing always gives ⭐).
- **Adaptive.** `Adaptive` moves the level up after a streak of 3 first-try answers and down after 2 misses in a row. The final level is saved per activity.
- **Progress** (`engine/progress.ts`). Pure reducers: `applyResult` and the skills table, which records first-try accuracy per skill. It also derives the learner level, the strengths and practice list, and the world stars.
- **Rewards** (`content/rewards.ts`). Stickers have conditions tied to learning milestones. Environments are unlocked by stars. The daily mission is seeded by the date and prefers the next unplayed activity.
- **Analytics.** Local only: a session log and skill accuracy, shown in the Parent Corner. Nothing leaves the device.

### Interactive clock (`ui/Clock.tsx`)

- **Single source of truth.** The state is `t` = minutes on a 12-hour face. `handAngles(t)` gives `hour = t/720·360` and `minute = (t mod 60)·6`.
- **Minute drag.** `fromMinuteAngle(prev, angle)` picks the candidate time nearest the previous one. Turning past 12 moves the hour on, and turning back moves it back.
- **Hour drag.** `fromHourAngle` sets the whole time, so the minutes follow the short hand.
- **Snapping.** `snap(t, step)` with a step of 1, 5, 15, 30 or 60.
- **Colour code.** Hours are orange and minutes are blue, on both the hands and the digital read-out.
- **Accessibility.** Each hand is a `role="slider"` with arrow keys and `aria-valuetext`.
- **Hints.** Ghost target hands and highlighted parts.

### State & persistence

- `state.tsx` holds `Progress` in React state.
- It saves 250 ms after each change and again on `pagehide`, through `platform/storage.ts`. Storage tries IndexedDB first, with a synchronous localStorage mirror and an in-memory fallback.
- `navigator.storage.persist()` is requested.
- `migrate()` repairs old or corrupt saves.

### Audio

- **Speech.** `speak(text, lang)` picks the best installed voice for id-ID or en-US and resolves when it finishes. In hub mode, `bm-voice.js` swaps in recorded clips. A local clip table (`window.BMT_VOICE`) is supported too.
- **SFX and music.** Synthesised with Web Audio, so there are no files to download. The music is a soft music-box loop that ducks while Mo speaks.
- **Unlocking and backgrounding.** Audio is unlocked on the first gesture, which iOS requires. Everything pauses when the app is hidden.

### Responsive & device strategy

`platform/device.ts` classifies the viewport and sets `data-size`, `data-twopane` and `data-hinge` on `<html>`. CSS uses those, and React reads them from `useStore().device`.

| Size class | Layout |
|---|---|
| `phone` | Bottom nav. Mo and the bubble sit above the board. |
| `phone-land` | Side rail. Compact guide. |
| `tablet` (portrait) | Bottom nav. Larger cards, calendars and clocks. |
| `tablet-land`, `desktop` | Side rail. Two-pane play: Mo and the instructions on the left, the board on the right. |
| Foldable / dual screen | If `visualViewport.segments` or the legacy `getWindowSegments`, or the CSS `horizontal-viewport-segments: 2`, reports two segments, each pane is placed on its own segment, with the hinge gap taken from `--hinge-x` / `--hinge-w`. `navigator.devicePosture` is tracked. Nothing assumes a specific device. |

Layouts respond to `resize`, `orientationchange` and posture changes, so
folding or unfolding mid-game keeps the session (state is not tied to layout).
Safe areas use `env(safe-area-inset-*)`, and `viewport-fit=cover` is set.

### PWA

- **Manifest.** Maskable icon, `display: standalone`, any orientation.
- **Service worker.** `scripts/gen-sw.mjs` generates `sw.js` after each build. It precaches all files, including the character art, so the whole game is offline after the first visit. Its cache name is a content hash, so each release gets a new cache and old ones are deleted.
- **Fetch strategy.** Navigations are network-first. Assets are cache-first.
- **Updates.** A new worker waits until the user taps **Update** (it never reloads mid-game). The app checks for updates when it returns to the foreground.
- **Network status.** Offline and online changes show a banner. The game makes no network calls, so nothing breaks offline.
