/**
 * Race controller: the whole race as pure state + an update step.
 * Rendering (Babylon) and UI (React) only read this state and send inputs,
 * so the race can be simulated headless in unit tests.
 */
import { Track } from "./track";
import { newKart, separate, stepKart, type KartInput, type KartState, type KartStats } from "./physics";
import { aiInput, newBrain, type AiBrain } from "./ai";

export interface Racer { id: string; stats: KartStats; ai?: AiBrain }
export interface Gate { s: number; kind: "question" | "choice-gates"; index: number; done: boolean }
export interface Pickup { s: number; lat: number; taken: boolean }

export type RaceEvent =
  | { type: "countdown"; n: number }
  | { type: "go" }
  | { type: "gate"; gate: Gate }
  | { type: "lap"; lap: number }
  | { type: "pickup"; total: number }
  | { type: "boost"; seconds: number }
  | { type: "bump" }
  | { type: "overtake"; position: number }
  | { type: "finish"; position: number; time: number };

export interface RaceOptions {
  track: Track;
  laps: number;
  junior: boolean;
  racers: Racer[]; // [0] = the child
  gatesPerLap: number;
  gateKind: Gate["kind"];
  aiSkill: number;
  pickupsPerLap?: number;
}

export class Race {
  readonly o: RaceOptions;
  readonly karts: KartState[];
  readonly gates: Gate[];
  readonly pickups: Pickup[];
  t = -3.5; // countdown runs from -3.5 to 0
  timeScale = 1; // slow motion while a question is open
  phase: "countdown" | "racing" | "finished" = "countdown";
  coins = 0;
  combo = 0;
  turboCharges = 0;
  private lastCount = 4;
  private lastPos = 0;
  private lastLap = 0;
  private events: RaceEvent[] = [];
  private brains: AiBrain[] = [];
  private finishAfter = 0;

  constructor(o: RaceOptions) {
    this.o = o;
    const L = o.track.length;
    // grid: player starts at the back so overtaking feels great
    const n = o.racers.length;
    this.karts = o.racers.map((r, i) => {
      const row = n - 1 - i;
      return newKart(r.id, -6 - row * 4.2, (row % 2 ? -1 : 1) * 2.2);
    });
    this.brains = o.racers.map((r, i) => r.ai ?? newBrain(i, o.aiSkill));
    this.gates = [];
    for (let lap = 0; lap < o.laps; lap++)
      for (let g = 0; g < o.gatesPerLap; g++)
        this.gates.push({ s: lap * L + L * ((g + 0.55) / o.gatesPerLap), kind: o.gateKind, index: this.gates.length, done: false });
    this.pickups = [];
    const per = o.pickupsPerLap ?? 10;
    for (let lap = 0; lap < o.laps; lap++)
      for (let i = 0; i < per; i++) {
        const s = lap * L + L * ((i + 0.3) / per);
        if (this.gates.some((g) => Math.abs(g.s - s) < 18)) continue;
        this.pickups.push({ s, lat: Math.sin(i * 1.9 + lap) * (o.track.half - 2), taken: false });
      }
  }

  get player() {
    return this.karts[0];
  }
  get lap() {
    return Math.min(this.o.laps, Math.max(1, Math.floor(this.player.s / this.o.track.length) + 1));
  }
  /** 1-based race position of a kart */
  position(k = this.player): number {
    const score = (x: KartState) => (x.finished != null ? 1e9 - x.finished : x.s);
    return 1 + this.karts.filter((o) => o !== k && score(o) > score(k)).length;
  }
  progress(): number {
    return Math.min(1, Math.max(0, this.player.s / (this.o.laps * this.o.track.length)));
  }

  /** Correct answer: turbo now, longer with a combo. */
  reward(): number {
    this.combo++;
    const secs = Math.min(4.2, 2.4 + (this.combo - 1) * 0.6);
    this.player.boost = Math.max(this.player.boost, secs);
    this.turboCharges = Math.min(3, this.turboCharges + 1);
    this.coins += 5;
    this.events.push({ type: "boost", seconds: secs });
    return secs;
  }
  /** A gentle miss: the combo resets; nothing else is taken away. */
  miss() {
    this.combo = 0;
  }
  /** Turbo button: spend a stored charge. */
  useTurbo(): boolean {
    if (this.turboCharges <= 0 || this.phase !== "racing") return false;
    this.turboCharges--;
    this.player.boost = Math.max(this.player.boost, 2.2);
    this.events.push({ type: "boost", seconds: 2.2 });
    return true;
  }

  drain(): RaceEvent[] {
    const e = this.events;
    this.events = [];
    return e;
  }

  update(realDt: number, input: KartInput) {
    const dt = Math.min(0.05, realDt) * this.timeScale;
    const L = this.o.track.length;
    this.t += dt;
    if (this.phase === "countdown") {
      const n = Math.ceil(-this.t);
      if (n < this.lastCount && n >= 1) {
        this.lastCount = n;
        this.events.push({ type: "countdown", n });
      }
      if (this.t >= 0) {
        this.phase = "racing";
        this.events.push({ type: "go" });
      }
      return;
    }
    const tr = this.o.track;
    this.karts.forEach((k, i) => {
      const r = this.o.racers[i];
      if (i === 0) {
        const wasBump = k.bump;
        stepKart(k, k.finished != null ? { steer: 0, throttle: 0.6, brake: 0 } : input, dt, tr, r.stats, { junior: this.o.junior });
        if (k.bump === 0 && wasBump > 0.4) this.events.push({ type: "bump" });
      } else {
        const ai = aiInput(k, this.brains[i], this.karts, this.player, tr, this.t, dt);
        stepKart(k, ai.input, dt, tr, r.stats, { junior: false, scale: ai.speedScale });
      }
      if (k.finished == null && k.s >= this.o.laps * L) k.finished = this.t;
    });
    separate(this.karts, tr);

    const p = this.player;
    // gates (questions)
    // quiz gates open a little AFTER the arch, so the slow-motion camera isn't stuck under it
    for (const g of this.gates) if (!g.done && p.s >= g.s + (g.kind === "question" ? 14 : 0)) {
      g.done = true;
      this.events.push({ type: "gate", gate: g });
    }
    // pickups
    for (const c of this.pickups) if (!c.taken && Math.abs(p.s - c.s) < 1.6 && Math.abs(p.lat - c.lat) < 1.5) {
      c.taken = true;
      this.coins++;
      this.events.push({ type: "pickup", total: this.coins });
    }
    // laps
    const lap = Math.floor(p.s / L);
    if (lap > this.lastLap && lap < this.o.laps) {
      this.lastLap = lap;
      this.events.push({ type: "lap", lap: lap + 1 });
    }
    // overtakes
    const pos = this.position();
    if (this.lastPos && pos < this.lastPos) this.events.push({ type: "overtake", position: pos });
    this.lastPos = pos;
    // finish (wait a moment so the child sees the line)
    if (p.finished != null && this.phase === "racing") {
      this.finishAfter += dt;
      if (this.finishAfter > 1.2) {
        this.phase = "finished";
        this.events.push({ type: "finish", position: this.position(), time: p.finished });
      }
    }
  }
}
