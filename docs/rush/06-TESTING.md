# Baby Mo Time Rush — Testing Plan

## Automated (run before every push)

| Command | Covers | Result (24 Nov 2026) |
|---|---|---|
| `npm test` | **Rush core (11 tests):** the Morning Town track is deterministic and well formed (sorted items, 3 pickups, a valid shortcut); route length ≈ 100 s at cruise; every clock balloon sits exactly where the story clock shows its time; the story clock runs 8:00 → 9:00; the tunnel holds treasure. Sim: a child who never touches anything still delivers all 3 bundles and arrives at 9:00 (no fail state); a skilled bot collects > 50% of stars, ≥ 5 balloons, helps the bunny and earns 3 praise stars; the shortcut enters the tunnel, exits onto the main road and saves time; a bump wobbles and slows but never stops the ride; a jump clears a log; lanes clamp at 0…2. Plus the 88 shared tests of the other games. | ✅ 99/99 |
| `npm run e2e:rush` | Production build in Playwright. **EN and ID:** splash → menu → adventures → mission (language checked) → full ride by tapping the on-screen Left/Right/Jump buttons (sim at 4× with `?simspeed=4`) → pause/resume → delivered (arrival 9:00) → rewards → world-unlock → progress survives a reload; no page errors. **Layouts:** home, adventures, mission, garage, collection at phone, phone-landscape, tablet and desktop, light and dark, no horizontal overflow (screenshots in `qa-shots/rush/`). **Parent gate** refuses a wrong answer. | ✅ all passed (EN ride 40 s, ID 39 s at 4×) |
| `npm run build` | Type check + Vite multi-page build + service worker (`CACHE_RUSH` list: rush page, chunk, kit art) | ✅ rush chunk 73 kB (25 kB gzip) |

## Manual checklist (real devices)

| Area | Check |
|---|---|
| Feel | Lane change feels instant (0.22 s); jump button responds on the first tap; no input is lost while a voice line plays. |
| Children 4–5 | Can finish a ride with only the arrow buttons; never sees a "fail"; understands the HUD clock moving with the ride. Watch whether they reach for the Jump button. |
| Children 6–8 | Find the shortcut and the bunny quest without help; read times on balloons aloud. |
| Performance | 60 fps on a 3-year-old Android tablet (Chrome) and on iPhone SE; DPR cap holds; no GC hitches (pools). |
| Audio | Voice lines never overlap; cooldowns stop chatter; mute and voice toggles work; speech in id-ID and en-US. |
| Orientation | Portrait shows the "turn sideways" hint; landscape fills the screen; safe areas on notched phones. |
| Offline | After the first visit, airplane mode → reload `/rush/` → full ride works. |
| Accessibility | Calm-motion setting removes shake and speed lines; left-handed layout swaps the Jump side; every button has a label in both languages. |
| Art swap | Drop a generated sheet through `rush-slice.py`; the rider/item switches from placeholder to art with the same anchor and scale. |

## Known limits of the vertical slice
- Baby Mo riding uses the six approved rear frames; jump, boost, pickup, bump and celebration poses are made from them with motion until their packs (docs/rush/04 ⭐ NOW) are generated.
- Helmet colours are stored but the approved art has the white star helmet; colour variants need recoloured riding frames.
- Worlds 2–5 are "Coming soon".
