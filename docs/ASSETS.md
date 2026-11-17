# Assets: what's used, what's missing

## Used (synced by `scripts/sync-assets.py` from babymo-app)

64 images in total. The full list, with each pose's source and measured box, is in
`src/characters/asset-meta.json`.

| Role in the game | Pose ids |
|---|---|
| Greeting / welcome | `mo-wave` (pose-01), `mo-welcome` (41), `mo-sit-wave` (13) |
| Pointing at the clock / board | `mo-point` (08), `mo-present` (15), `mo-lean` (34) |
| Thinking / gentle help after a mistake | `mo-think` (36), `mo-wonder` (03), `mo-idea`, `mo-shrug` (33) |
| Celebrating | `mo-yeyy`, `mo-yes`, `mo-jump` (02), `mo-giggle` (07), `mo-thumbs` (25), `mo-ok`, `mo-alright` |
| Surprised | `mo-surprised` (26), `mo-oh` (40), `mo-wow` |
| Sitting / sleeping / pyjamas | `mo-sit` (12), `mo-sit-relax` (18), `mo-sleep` (17), `mo-sleepy` (39), `mo-pj`, `mo-pj-top` |
| Walking / running | `mo-walk` (42), `mo-run` |
| Routine (render 2, upper body only) | `mo2-meal` (breakfast), `mo2-school`, `mo2-read`, `mo2-checklist`, `mo2-tie-shoe` |
| Routine (busts / other sets) | `mo-brush` (brush teeth), `mo-dinner` (word-art meal), `mo-pray` (qiyam) |
| Ais | wave, cheer, think, surprised, jump, sleep, wake, yawn, snack, gift, garden seed / water / sprout / pick, giggle, sit-wave, run, arms-wide |
| Kak Adam | wave, hold-ball, swing, win, celebrate (tennis kit) |
| Abi / Umi | `abi-wave`, `umi-welcome` |

## Missing poses: asset specification

Same spec as the existing render-1 set:

- 800×800 transparent PNG plus a 480 WebP.
- Feet at y≈730 (800) / 438 (480). Standing Mo ≈ 610 px / 366 px tall.
- ¾-front camera, the same lighting, and the usual outfit (green jumpsuit, grey star, orange-peach sleeves, green shoes).
- No text in the image.

Name the files `baby-mo-<name>.png` and add them to `POSES` in `scripts/sync-assets.py`.

| Priority | Name | Pose | Used for (currently substituted by) |
|---|---|---|---|
| P1 | `baby-mo-hold-clock` | Holding a round alarm clock in both hands at chest height, face of the clock towards the viewer, happy | Clock Town header, tutorials (now `mo-point` next to an SVG clock) |
| P1 | `baby-mo-point-up-left` | Mirror-safe version of pose-08 pointing up-left with the index finger (hand at shoulder height) | Two-pane layouts where the clock is on the left (pose-08 can't be flipped because of the star and text direction) |
| P1 | `baby-mo-hold-calendar` | Holding a big wall calendar page, pointing at a date with the other hand | Days & Calendar tutorials (now `mo-idea` / `mo-present`) |
| P1 | `baby-mo-wake-stretch` | Sitting up in bed in pyjamas, arms stretched up, yawning | "Wake up" card (now `mo-pj` standing) |
| P1 | `baby-mo-sleep-bed` | Lying on his back in bed under a blanket, eyes closed, front view (pose-17 is face-down and reads poorly) | "Sleep" card, Mo's Day at night (now `mo-sleepy`) |
| P1 | `baby-mo-brush-full` | Full-body brushing teeth with a blue toothbrush (render 1) | "Brush teeth" card (now the `mo-brush` bust) |
| P1 | `baby-mo-breakfast` | Render-1 Mo at a little table eating (spoon in hand) | "Eat breakfast" (now render-2 `mo2-dua-meal`, cropped to the upper body) |
| P2 | `baby-mo-backpack` | Render-1 Mo walking with the blue school backpack, waving | "Go to school" (now render-2, cropped) |
| P2 | `baby-mo-play-ball` | Kicking or throwing a ball outside | "Play outside" (now `mo-jump`) |
| P2 | `baby-mo-dinner-table` | Eating at the dinner table, evening light | "Eat dinner" (now the word-art bust) |
| P2 | `baby-mo-hourglass` | Holding a sand timer, watching it, curious | Time Challenge header and 10-second challenge |
| P2 | `baby-mo-stopwatch` | Holding a stopwatch up, excited | 30-second / 1-minute challenges |
| P2 | `baby-mo-tidy` | Carrying toys towards a toy box | One-Minute Tidy Up (now SVG toys + `mo-run`) |
| P3 | `baby-mo-count-fingers` | Showing fingers, counting | Numbers 1–12, counting seconds |
| P3 | Ais `count-calendar`, Adam `peci-wave` (traditional outfit with white peci) | — | Countdown and family celebrations (Adam currently appears only in his tennis kit) |

## Audio

- **No new audio files.** The SFX and music-box loop are synthesised.
- **Voice.** In hub mode, `bm-voice.js` plays recorded clips for any line that already exists in `voice/manifest.js` (praise such as "Masya Allah, hebat!"). Every other line uses the device's text-to-speech.
- **To record all lines** in the Baby Mo voice: run `npm run voice:lines`. It writes `voice-lines.json` with every spoken line in ID and EN. Feed that file to `babymo-app/tools/voice/gen.py`, which needs Google Cloud TTS credentials, then publish the manifest as `window.BMT_VOICE` or merge it into the hub manifest.
- **Gaps.** Time phrases are generated (for example "jam setengah empat"). Recording every clock time means about 300 short clips per language.
