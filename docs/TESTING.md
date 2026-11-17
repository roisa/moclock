# Testing

## Automated

| Command | What it covers | Last result (17 Nov 2026) |
|---|---|---|
| `npm test` | 59 unit tests. Clock maths: hand angles, minute-drag wrap-around changes the hour, hour drag, snapping. EN/ID time words (half past 3 = *setengah empat*). Every activity × 3 levels × 40 seeds produces valid questions: the answer is among unique options, set-clock targets are reachable with the snap step, sequences really are shuffled, every sort bin is used. Every i18n key exists in both languages and every placeholder is filled. Sessions, stars, adaptive difficulty, the daily-mission bonus pays once, save migration. | ✅ 59/59 |
| `npm run e2e` | Playwright against the production build. **Plays all 29 activities in English and in Indonesian.** Choice games are tapped (including a deliberate wrong answer, to test the hint path), clocks are set with the keyboard sliders, and sequences are put in order by tapping. Each run must reach the celebration screen. Stars and stickers must persist after a reload. Screenshots of 4 screens at 6 sizes (phone, phone-landscape, tablet, tablet-landscape, desktop, fold 673×841) plus dark mode, each checked for horizontal overflow. | ✅ EN 29/29, ID 29/29, 87 ⭐ and 11 stickers saved, no overflow |
| `npm run test:offline` | The first visit installs the service worker. Then, offline: reload Home, open an activity, check all images load, and check the offline banner shows. | ✅ |
| Pointer drags (ad-hoc script) | Dragging the long hand a full turn moves 6:00 → 7:00. Dragging a card onto a sequence slot fills it. | ✅ |
| Hub export | `npm run build:hub`, then serve `babymo-app/www`. `/time-adventure/` loads with the hub language, the hub card appears in the game grid, and `sw.js` SHELL is updated with a bumped version. | ✅ |

A note on flakiness: one run against the **dev server** timed out on a single tap
(it was under heavy HMR load). The same activity then passed 18 times in a row
against the production build. Run e2e against `npm run build` output.

## Manual checklist (run on real devices before a release)

Not yet done on physical devices. This container has headless Chromium only.

| Area | Check |
|---|---|
| iPhone (Safari and home-screen app) | Safe areas around the notch and Dynamic Island. Audio and speech start after the first tap. Speech in id-ID and en-US. Rotation mid-game keeps the session. Clock drag doesn't scroll the page. |
| iPad | Portrait and landscape layouts. Split View and Stage Manager window sizes. Pencil and pointer drag. Keyboard (arrow keys move the hands). |
| Android phone and tablet | Chrome install prompt (Parent Corner → Install). Back gesture. Haptics. Different DPIs (characters stay sharp: the 800 px art is served by `srcset`). |
| Foldable | Unfold and fold during play: the layout switches between one and two panes without losing progress. On dual-screen devices the hinge stays clear. |
| Desktop | Mouse drag, keyboard Tab order, focus rings, side rail. |
| Accessibility | VoiceOver / TalkBack announce clock times. Large-text setting. Reduced motion. Contrast in dark mode. |
| Audio | Voice on and off, SFX on and off, music on and off. Music ducks while Mo speaks. Everything pauses when the app is backgrounded. |
| Persistence | Stars survive closing the app and a device restart. Reset (behind the gate) clears everything. |
| Offline | Airplane mode after the first visit: everything playable. |
| Update | Deploy a new build. The "Update" banner appears and nothing reloads mid-game. |

## Audit round 2 (17 Nov 2026): bugs found and fixed

Found by my own review plus an independent review. Each fix was then checked in
the browser.

| # | Bug | Fix | Verified |
|---|---|---|---|
| 1 | Countdown: taps after the event day still counted during the 600 ms praise delay, and could drop 3 ⭐ to 1 ⭐ | Input locks as soon as the last step is done (also in sequence, sort, calendar fill and numbers) | Counter stops at the right number |
| 2 | "How much time is left?" on landscape phones: answer buttons were squeezed to 16–32 px wide | Two-clock stimulus stacks above the answers on short screens | Buttons are 90 px wide at 667×375 |
| 3 | Sort, calendar fill, clock parts, clock numbers, bubbles and tidy-up couldn't be finished with a keyboard. The clock's `role="img"` hid its sliders from screen readers. | Enter/Space on tiles, numbers and clock parts. The clock SVG is `role="group"`. | All four games solved with the keyboard only |
| 4 | Week strip pointed the wrong way when the week wraps (Sunday → Monday) | The strip is centred on today; the asked day is a "?" card with step dots | Sunday shows: Thu Fri Sat **Sun** ? Tue Wed |
| 5 | Progress could be lost: IndexedDB was preferred even when the localStorage copy was newer, and a timed-out IndexedDB open was cached for the whole session | Both copies are time-stamped and the newer one wins; a failed open is retried. Old saves still load. | Unit tests and e2e reload checks |
| 6 | The service worker could cache an error or captive-portal page as the offline shell. The "Update" banner could reload the page mid-game. | Only OK HTML navigations are cached. The banner is hidden while playing, with separate dismiss flags. | Offline test |
| 7 | The daily mission didn't roll over at midnight while the app stayed open | The date is re-checked every minute and on app resume | — |
| 8 | Set-the-clock hint said "short hand near 3" for 3:45 | "Between 3 and 4" (or "points at 3" for o'clock) | Unit test |
| 9 | Delayed praise timers fired after leaving the game, and the hint button could throw away a solved answer | Timers are cancelled on unmount; the hint button is hidden once solved | — |
| 10 | "You earned 1 stars" | Singular form in EN and ID | — |
| — | Bubbles jumped back to the bottom before bursting; the 10-second "Again" button could race an auto-advance; Mo's Day could lose the time on fast drags; the hint hand could demonstrate a wrong card order, or drag the long hand when only the short hand needed to move | JS-driven bubble motion; no auto-advance; functional state updates; hints always show a correct move | Real-tap tests, hint-hand screenshots |
