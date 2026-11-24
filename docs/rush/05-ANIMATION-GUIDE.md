# Baby Mo Time Rush — Animation Implementation Guide

## 1. State machine (rider)
```
            ┌────────── boost pad ─────────┐
 idle ─go─► push ─cruise─► ride ──────────► boost ─2 s─► ride
             ▲              │  ├─ steer ─► lean-L / lean-R (hold F4–F6) ─► ride
             │              │  ├─ jump ──► jump-prep(4) ─► air(loop) ─► land(6) ─► ride
             │              │  ├─ bump ──► wobble(8) ─► push
             │              │  ├─ pickup ► pickup(8) ─► ride-carry
             │              │  └─ friend ► look-around / wave
             └── slow <70% ─┘
 arrive ─► (cut-scene) celebrate(8) ; help(8) for the friend cut-in
```
Priority (highest first): land, wobble, pickup, air/prep, boost, lean, push, ride/ride-carry, idle. One-shot clips lock until done (land/wobble/pickup can be interrupted only by a higher priority).

## 2. Timing table
| Clip | Frames | fps | Loop | Speed-scaled |
|---|---|---|---|---|
| idle-bike | 6 | 6 | ✔ | – |
| ride-loop / ride-carry | 8 | 8–16 | ✔ | fps = 8 + 8·speed/cruise |
| push | 8 | 12 | ✔ | – |
| lean-L/R | 6 | 12 | hold 4–6 | – |
| jump-prep | 4 | 14 | – | – |
| jump-air | 6 | 10 | ✔ | – |
| land | 6 | 16 | – | – |
| boost | 8 | 14 | ✔ | – |
| pickup | 8 | 12 | – | – |
| wobble | 8 | 12 | – | – |

## 3. Procedural layer (always on, also on generated sheets)
- **Jump arc:** y = v₀t − ½gt², v₀ = 5.2 (hop) / 8 (ramp), g = 18; squash 0.9/1.1 on take-off, 1.12/0.88 on land, spring back in 0.15 s.
- **Lean:** sprite rotation = lateral velocity × 0.22 rad (max 0.2), eased.
- **Bounce:** 1.5% bob at wheel frequency when no ride sheet is loaded.
- **Shadow:** soft ellipse under the bike, shrinks with jump height.
- **Wobble:** ±0.18 rad damped sine over 0.6 s.
- **Boost:** speed lines + rainbow trail particles, FOV +8%.

## 4. In-game rider (approved art) and the fallback rig

**Approved riding sheet** (\`art-src/rush/p04-ride-user.png\` → \`public/rush/mo/ride.webp\` via \`scripts/rush-import-art.py\`): six rear frames — 2 / 5 straight, 1 / 4 turning left, 3 / 6 turning right. The game alternates the pair for the current direction with every **push stride** (2.6 strides/s while speeding up or boosting, 1.4/s while gliding at cruise), and adds:
- stride bob (1.6 % of height) and side-to-side sway, a light squash on each push, a dust puff from the pushing foot;
- lean: steering × 0.14 rad plus a lean into road curves;
- jump: crouch squash → stretch in the air with a small tilt → landing squash, shadow shrinks with height;
- bump: damped wobble; arrival: happy hops.

**Camera:** follows Mo sideways with a short lag, banks up to ±3° into curves and steering, zooms in 7 % during a boost, bobs 1–2 px with each stride; speed lines at full speed and on boosts. All of it switches off with the calm-motion setting.

**Pickups:** the library book stack flies from the arch into the backpack, then stars burst.

### Fallback rig (before the art existed)
Render-1 `baby-mo-pose-38.png` (from behind) is cropped at the waist (owner rule) and placed on a procedurally drawn rear-view balance bike with drawn legs (scooting cycle) and arms to the grips; helmet drawn on top; backpack drawn, fills when carrying. The rig obeys the same state machine so swapping in sheets changes no logic.

## 5. Sheet integration
`AnimationController.frame(clip, t)` → `{img, sx, sy, sw, sh}` from `atlas.json`. Draw anchored at rear-wheel contact (50% x, baseline y). Sheets are scaled so the rider fills the same on-screen height as the rig (rider height = 0.62 road widths).

## 6. Environment & UI motion
Clock balloons bob (sin 1.2 Hz, 4%) and sway; stars spin (sheet or scaleX = cos); gifts bounce; tunnel strips flutter; clouds drift; birds cross every ~12 s. UI: buttons press-scale 0.94, cards pop in with back-ease, reward stars fly to the counter (shared `flyStar`). Reduced motion: no camera shake, no speed lines, no bobbing UI; gameplay remains identical.
