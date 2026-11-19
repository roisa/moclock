/**
 * Every activity in the game, as data. To add a new one: pick (or write) a
 * generator in engine/generators.ts, add an entry here, add its strings to
 * i18n/dict-en.ts + dict-id.ts ("act.<id>", "act.<id>.goal", tutorial lines).
 * The world screen, progress, rewards and parent report pick it up automatically.
 */
import * as G from "../engine/generators";
import type { ActivityDef } from "../engine/types";
import { msg } from "../i18n/types";
import { make } from "../engine/time";

const step = (say: string, pose: string, demo?: ActivityDef["tutorial"][number]["demo"]) => ({ say: msg(say), pose, demo });

export const ACTIVITIES: ActivityDef[] = [
  /* ---------------- WORLD A: CLOCK TOWN ---------------- */
  { id: "meet-clock", world: "clock", title: "act.meet-clock", goal: "act.meet-clock.goal", pose: "mo-point", rounds: 4, skills: ["clock-parts"],
    tutorial: [step("tut.meet.1", "mo-wave", { v: "clock", t: make(3, 0) }), step("tut.meet.2", "mo-point", { v: "clock", from: make(3, 0), to: make(4, 0) })],
    gen: G.meetClock },
  { id: "numbers", world: "clock", title: "act.numbers", goal: "act.numbers.goal", pose: "mo-hand-up", rounds: 5, skills: ["clock-numbers"],
    tutorial: [step("tut.numbers.1", "mo-point", { v: "clock", t: make(12, 0) })], gen: G.clockNumbers },
  { id: "hour-hand", world: "clock", title: "act.hour-hand", goal: "act.hour-hand.goal", pose: "mo-point", rounds: 5, skills: ["hour-hand"],
    tutorial: [step("tut.hour.1", "mo-point", { v: "clock", from: make(1, 0), to: make(5, 0) }), step("tut.hour.2", "mo-idea")], gen: G.hourHand },
  { id: "minute-hand", world: "clock", title: "act.minute-hand", goal: "act.minute-hand.goal", pose: "mo-present", rounds: 5, skills: ["minute-hand"],
    tutorial: [step("tut.minute.1", "mo-point", { v: "clock", from: make(2, 0), to: make(3, 0) }), step("tut.minute.2", "mo-wow")], gen: G.minuteHand },
  { id: "move-hands", world: "clock", title: "act.move-hands", goal: "act.move-hands.goal", pose: "mo-thumbs", rounds: 5, skills: ["set-time"],
    tutorial: [step("tut.move.1", "mo-point", { v: "clock", from: make(9, 0), to: make(10, 30) })], gen: G.moveHands },
  { id: "match", world: "clock", title: "act.match", goal: "act.match.goal", pose: "mo-idea", rounds: 6, skills: ["analog-digital"],
    tutorial: [step("tut.match.1", "mo-present", { v: "clock", t: make(4, 0), digital: true })], gen: G.matchDigital },
  { id: "full-hours", world: "clock", title: "act.full-hours", goal: "act.full-hours.goal", pose: "mo-ok", rounds: 6, skills: ["read-oclock"],
    tutorial: [step("tut.oclock.1", "mo-point", { v: "clock", from: make(7, 0), to: make(8, 0) })], gen: G.timeQuiz([0], "read-oclock") },
  { id: "half-past", world: "clock", title: "act.half-past", goal: "act.half-past.goal", pose: "mo-giggle", rounds: 6, skills: ["read-half"],
    tutorial: [step("tut.half.1", "mo-point", { v: "clock", from: make(3, 0), to: make(3, 30) }), step("tut.half.2", "mo-idea", { v: "clock", t: make(3, 30), digital: true })],
    gen: G.timeQuiz([30], "read-half") },
  { id: "quarter", world: "clock", title: "act.quarter", goal: "act.quarter.goal", pose: "mo-alright", rounds: 6, skills: ["read-quarter"], startLevel: 1,
    tutorial: [step("tut.quarter.1", "mo-point", { v: "clock", from: make(5, 0), to: make(5, 15) }), step("tut.quarter.2", "mo-present", { v: "clock", from: make(5, 15), to: make(5, 45) })],
    gen: G.timeQuiz([15, 45], "read-quarter") },
  { id: "five-minutes", world: "clock", title: "act.five-minutes", goal: "act.five-minutes.goal", pose: "mo-hand-up", rounds: 6, skills: ["read-five"],
    tutorial: [step("tut.five.1", "mo-point", { v: "clock", from: make(2, 0), to: make(2, 25) })],
    gen: G.timeQuiz([5, 10, 20, 25, 35, 40, 50, 55], "read-five") },
  { id: "clock-challenge", world: "clock", title: "act.clock-challenge", goal: "act.clock-challenge.goal", pose: "mo-yeyy", rounds: 8, skills: ["read-oclock", "read-half", "read-quarter", "read-five"], startLevel: 2,
    tutorial: [step("tut.challenge.1", "mo-run")], gen: G.clockChallenge },

  /* ---------------- WORLD B: DAYS & CALENDAR ---------------- */
  { id: "arrange-days", world: "calendar", title: "act.arrange-days", goal: "act.arrange-days.goal", pose: "mo-idea", rounds: 3, skills: ["days-order", "weekend"],
    tutorial: [step("tut.days.1", "mo-wave"), step("tut.days.2", "ais-cheer")], gen: G.arrangeDays },
  { id: "tomorrow", world: "calendar", title: "act.tomorrow", goal: "act.tomorrow.goal", pose: "mo-think", rounds: 5, skills: ["yesterday-tomorrow"],
    tutorial: [step("tut.tomorrow.1", "mo-sleepy", { v: "week", today: 2, ask: "tomorrow" })], gen: G.tomorrowGame },
  { id: "find-date", world: "calendar", title: "act.find-date", goal: "act.find-date.goal", pose: "mo-point", rounds: 4, skills: ["dates"],
    tutorial: [step("tut.date.1", "mo-present")], gen: G.findDate },
  { id: "calendar-puzzle", world: "calendar", title: "act.calendar-puzzle", goal: "act.calendar-puzzle.goal", pose: "mo-wonder", rounds: 2, skills: ["dates"],
    tutorial: [step("tut.puzzle.1", "mo-idea")], gen: G.calendarPuzzle },
  { id: "countdown", world: "calendar", title: "act.countdown", goal: "act.countdown.goal", pose: "ais-gift", rounds: 3, skills: ["countdown"],
    tutorial: [step("tut.countdown.1", "ais-gift"), step("tut.countdown.2", "mo-sleep")], gen: G.countdown },
  { id: "missing-month", world: "calendar", title: "act.missing-month", goal: "act.missing-month.goal", pose: "mo-surprised", rounds: 5, skills: ["months"],
    tutorial: [step("tut.months.1", "mo-present", { v: "months-row", missing: [] })], gen: G.missingMonth },

  /* ---------------- WORLD C: MY DAILY ROUTINE ---------------- */
  { id: "mo-day", world: "routine", title: "act.mo-day", goal: "act.mo-day.goal", pose: "mo-pj", rounds: 4, skills: ["routine-time"],
    tutorial: [step("tut.moday.1", "mo-pj"), step("tut.moday.2", "mo-point")], gen: G.dayExplorer },
  { id: "morning", world: "routine", title: "act.morning", goal: "act.morning.goal", pose: "mo2-school", rounds: 3, skills: ["routine-order"],
    tutorial: [step("tut.morning.1", "mo-pj")], gen: G.morningRoutine },
  { id: "whole-day", world: "routine", title: "act.whole-day", goal: "act.whole-day.goal", pose: "mo2-checklist", rounds: 3, skills: ["routine-order"],
    tutorial: [step("tut.wholeday.1", "mo-thumbs")], gen: G.wholeDay },
  { id: "routine-time", world: "routine", title: "act.routine-time", goal: "act.routine-time.goal", pose: "mo2-meal", rounds: 5, skills: ["routine-time"],
    tutorial: [step("tut.rtime.1", "mo-point", { v: "story", card: "breakfast", t: make(6, 30) })], gen: G.routineTime },
  { id: "day-parts", world: "routine", title: "act.day-parts", goal: "act.day-parts.goal", pose: "mo-sleepy", rounds: 3, skills: ["day-parts"],
    tutorial: [step("tut.parts.1", "mo-wave"), step("tut.parts.2", "mo-sleepy")], gen: G.sortDayParts },

  /* ---------------- WORLD D: TIME CHALLENGE ---------------- */
  { id: "ten-seconds", world: "challenge", title: "act.ten-seconds", goal: "act.ten-seconds.goal", pose: "mo-hand-up", rounds: 3, skills: ["duration-feel"],
    tutorial: [step("tut.ten.1", "mo-hand-up")], gen: G.timerGame("estimate", 10) },
  { id: "thirty-seconds", world: "challenge", title: "act.thirty-seconds", goal: "act.thirty-seconds.goal", pose: "mo-jump", rounds: 1, skills: ["duration-feel"],
    tutorial: [step("tut.thirty.1", "mo-jump")], gen: G.timerGame("pop", 30) },
  { id: "one-minute", world: "challenge", title: "act.one-minute", goal: "act.one-minute.goal", pose: "mo-run", rounds: 1, skills: ["duration-feel"],
    tutorial: [step("tut.minute60.1", "mo-run")], gen: G.timerGame("tidy", 60) },
  { id: "longer", world: "challenge", title: "act.longer", goal: "act.longer.goal", pose: "mo-think", rounds: 5, skills: ["duration-compare"],
    tutorial: [step("tut.longer.1", "mo-wonder")], gen: G.whichLonger },
  { id: "first", world: "challenge", title: "act.first", goal: "act.first.goal", pose: "ais-seed", rounds: 4, skills: ["first-next"],
    tutorial: [step("tut.first.1", "ais-seed")], gen: G.whatFirst },
  { id: "time-left", world: "challenge", title: "act.time-left", goal: "act.time-left.goal", pose: "ais-snack", rounds: 5, skills: ["elapsed"],
    tutorial: [step("tut.left.1", "mo-point", { v: "two-clocks", a: make(2, 0), b: make(4, 0), bCard: "snack", arc: true })], gen: G.timeLeft },
  { id: "elapsed", world: "challenge", title: "act.elapsed", goal: "act.elapsed.goal", pose: "mo2-read", rounds: 4, skills: ["elapsed"],
    tutorial: [step("tut.elapsed.1", "mo-point", { v: "clock", from: make(2, 0), to: make(3, 0) })], gen: G.elapsedSet },
];

export const activityById = (id: string) => ACTIVITIES.find((a) => a.id === id);
export const activitiesOf = (world: string) => ACTIVITIES.filter((a) => a.world === world);
