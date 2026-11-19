# Product & UX architecture

## Sitemap

```
Home ─┬─ Today's mission ─────────────► Play
      ├─ World cards (4) ─► World ─────► Play (tutorial → questions → celebration)
      ├─ Live clock (tap: Mo says the real time)
      └─ Grown-ups ─► Parent gate ─► Parent Corner
Games ─► all worlds with their activities ─► Play
Rewards ─► stars & level · sticker book · world badges · places (home scenery)
```

The bottom navigation has three items: **Home · Games · Rewards**. On wide or
landscape screens it becomes a side rail. The Play screen hides the navigation
(one activity per screen). The Parent Corner sits outside the child navigation,
behind the gate.

## User journey (child, 4 years old, first visit)

1. **Home.** Mo waves: "Hi! Ready for a Time Adventure?" (spoken). The sky matches the real time of day, and the clock shows the real time. Tapping the clock makes Mo say the time.
2. **Mission.** The pulsing ▶ on *Today's mission* opens **Meet the Clock**.
3. **Tutorial.** Mo explains, a demo clock moves, and the child taps **Next**, then **Let's play!**.
4. **Questions.** Mo asks (voice and bubble). After a wrong tap, Mo thinks: "Good try! Let me help you", followed by a hint. After a second miss, a visual hint appears (glow or ghost hands).
5. **Correct.** Mo cheers, a little confetti falls, and the child taps **Next**.
6. **Celebration.** Mo and Ais celebrate, stars appear, and any new sticker is shown. The child can tap **Play again** or **More games**.
7. **Back on Home.** The level bar and stars have grown.

## Screen inventory

| Screen | Purpose | Key elements |
|---|---|---|
| Home | Orientation and motivation | Greeting Mo, live clock and sky, level and progress, daily mission, 4 world cards, star count, grown-ups button |
| Games | Overview of everything | 4 world sections, each with a horizontally scrolling list of activities and their stars |
| World | Learning path for one world | Illustrated header with Mo and a friend (spoken intro), numbered activity cards with goal and stars, "Play next" highlight |
| Play – tutorial | Learning objective and demo | Guide, animated demo (clock, week, months, two clocks), Skip / Next / Let's play |
| Play – question | One interaction | Guide (prompt, replay audio), board (player), progress dots, help button (replays the tutorial), Next |
| Play – celebration | Reward | Mo and a friend, 1–3 stars, new sticker, Play again / More games |
| Rewards | Collection | Total stars, level name, 12 stickers (tap for how to earn), 4 world badges, 5 sceneries |
| Parent gate | Keep children out | Multiplication with a number pad |
| Parent Corner | Grown-up view | Overview, strengths / needs practice, per-activity table with objectives, recent sessions, settings (language, voice, SFX, music, appearance, large text), install, reset |

## Game progression map

| World | Activities (difficulty 1 → 3 inside each) |
|---|---|
| A · Clock Town | Meet the Clock → Numbers 1–12 → Hour Hand → Minute Hand → Move the Hands → Analog & Digital → O'clock → Half Past → Quarter Past & To → Five-Minute Jumps → **Clock Challenge** |
| B · Days & Calendar | Arrange the Days (incl. weekend) → What Day Is Tomorrow? (→ yesterday → day after tomorrow) → Find Today's Date (the real date) → Calendar Puzzle → Countdown → Find the Missing Month |
| C · My Daily Routine | Mo's Day (explore 24 h with the clock) → Morning Routine → Mo's Whole Day → When Does Mo…? → Morning or Night? (2 → 3 → 4 parts of the day) |
| D · Time Challenge | 10-Second Challenge → 30-Second Bubbles → One-Minute Tidy Up → Which Takes Longer? → What Happens First? → How Much Time Is Left? → When Will It Finish? |

All activities are open. Nothing is locked, so a child is never blocked. The
recommended path is shown with **Play next**, and the daily mission follows it.
Difficulty adapts inside every activity.

**Rewards**

- Stars: up to 3 per activity, plus a +1 daily mission bonus.
- Learner level: 9 named levels.
- Stickers: 12, tied to milestones.
- World badges: 4.
- Places: 5 home sceneries, unlocked at 0, 12, 25, 40 and 60 stars.

## Component architecture

```
App ─ BottomNav · ParentGate · Toast · PwaBanner
  Home ─ Sky(min) · Character · Clock · Stars · WorldArt
  World ─ WorldArt · Guide · Character
  Play ─ Guide · Tutorial(Demo: Clock+useTweenTime | Visual) · Player · Confetti · Celebrate
     Player = ChoicePlayer | SetClockPlayer | SequencePlayer | SortPlayer | ClockTapPlayer |
              ClockNumbersPlayer | CalendarTapPlayer | CalendarFillPlayer | CountdownPlayer |
              DayExplorerPlayer | TimerPlayer(estimate | pop | tidy)
     Visual = clock | digital | time-words | day | month | number | duration | card(PictureCard) |
              part | week(WeekStrip) | months-row | two-clocks | story
  Rewards · Parent
Design system: tokens.css · Character · Clock/Digital · Sky/WorldArt · Guide (bubble) · MonthGrid · Icon/Star · btn/card/pill/chip
```

## Design principles applied

- **One activity per screen.** No menus inside the game. The only controls are Close, Help, Replay voice and Next.
- **No reading needed.** Every prompt is spoken, Mo is tappable to repeat it, and colours and pictures carry meaning.
- **Large touch targets.** At least 56–60 px. The clock hands have 26-unit invisible hit areas, and dragging anywhere on the face grabs the nearest hand.
- **Feedback.** Every tap gets sound, motion and haptics. Mistakes get a soft sound and a wobble, never red crosses or buzzers.
- **Character-led.** Mo asks, points, thinks and celebrates, and family members join in each world.
