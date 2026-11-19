/**
 * RaceGame: owns the Babylon engine + scene for one race and connects it to the
 * pure race simulation (core/race.ts) and the question deck. React talks to it
 * through a tiny API (input, answer, turbo, pause) and receives events.
 */
import type { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator";
import "@babylonjs/core/Lights/Shadows/shadowGeneratorSceneComponent";
import type { ParticleSystem } from "@babylonjs/core/Particles/particleSystem";
import { Track } from "../core/track";
import { CLOCK_TOWN, DAY_VALLEY } from "../core/tracks";
import { Race, type RaceEvent } from "../core/race";
import type { KartInput } from "../core/physics";
import { makeQuestion, optionCount, type RaceQuestion } from "../core/questions";
import { buildWorld, DAY_COLORS, type Quality, type World } from "./world";
import { animateKart, buildKart, type KartModel } from "./kart";
import { boostFlames, sparkles } from "./fx";
import { createEngine } from "./engine";
import { EngineSound } from "./sound";
import { RACERS, kartById, type KartDef, type RacerDef } from "../content/racers";
import type { LevelDef } from "../content/levels";
import { randomRng, type Rng } from "../../engine/rng";
import { Adaptive } from "../../engine/session";
import type { Level } from "../../engine/types";
import type { Lang } from "../../i18n/types";
import { DAYS_SHORT, MONTHS_SHORT } from "../../i18n/words";

export interface RaceConfig {
  level: LevelDef;
  racer: RacerDef;
  kart: KartDef;
  paint?: string;
  junior: boolean;
  quality: Quality;
  lang: Lang;
  startDifficulty: Level;
  aiBoost: number; // adapts AI to the child's learning level (≈0.97–1.03)
  sound: boolean;
}
export interface HudState { position: number; racers: number; lap: number; laps: number; progress: number; time: number; speed: number; boost: number; charges: number; combo: number; coins: number; phase: Race["phase"] }
export interface RaceSummary {
  position: number; time: number; coins: number; correctFirstTry: number; questions: number; learned: string[]; levelEnd: Level; concepts: Record<string, { a: number; c: number }>;
}
export interface GameEvents {
  onReady: () => void;
  onCountdown: (n: number | "go") => void;
  onQuestion: (q: RaceQuestion | null, mode: "panel" | "gates") => void;
  onFeedback: (kind: "correct" | "wrong", q: RaceQuestion, combo: number) => void;
  onHud: (h: HudState) => void;
  onToast: (kind: "lap" | "overtake" | "turbo" | "pickup", n: number) => void;
  onFinish: (s: RaceSummary) => void;
  onError: (e: unknown) => void;
}

export class RaceGame {
  private engine: Engine;
  private scene: Scene;
  private camera: UniversalCamera;
  private race: Race;
  private track: Track;
  private world: World;
  private models: KartModel[] = [];
  private flames: ParticleSystem;
  private burst: (at: Vector3, n?: number) => void;
  private sun: DirectionalLight;
  private shadows: ShadowGenerator | null = null;
  private input: KartInput = { steer: 0, throttle: 0, brake: 0 };
  private keys = new Set<string>();
  private touchSteer = 0;
  private brakeHeld = false;
  private paused = false;
  private question: RaceQuestion | null = null;
  private qTries = 0;
  private rng: Rng = randomRng();
  private adaptive: Adaptive;
  private qIndex = 0;
  private asked = 0;
  private firstTry = 0;
  private learned: string[] = [];
  private concepts: Record<string, { a: number; c: number }> = {};
  private gateAnnounced = new Set<number>();
  private cheer = 0;
  private sound = new EngineSound();
  private hudT = 0;
  private fps: number[] = [];
  private camPos = new Vector3();
  private disposed = false;
  readonly cfg: RaceConfig;
  private ev: GameEvents;

  constructor(canvas: HTMLCanvasElement, cfg: RaceConfig, ev: GameEvents) {
    this.cfg = cfg;
    this.ev = ev;
    this.adaptive = new Adaptive(cfg.startDifficulty);
    const q = cfg.quality;
    this.engine = createEngine(canvas, q);
    const scene = (this.scene = new Scene(this.engine));
    scene.clearColor = new Color4(0.75, 0.88, 1, 1);
    scene.ambientColor = new Color3(0.3, 0.3, 0.3);
    scene.skipPointerMovePicking = true;
    scene.autoClearDepthAndStencil = true;

    const hemi = new HemisphericLight("hemi", new Vector3(0.2, 1, 0.1), scene);
    hemi.intensity = 0.95;
    hemi.diffuse = new Color3(1, 0.98, 0.94);
    hemi.groundColor = new Color3(0.55, 0.62, 0.5);
    this.sun = new DirectionalLight("sun", new Vector3(-0.5, -1, 0.35), scene);
    this.sun.intensity = 0.75;
    this.sun.diffuse = new Color3(1, 0.95, 0.85);

    this.track = new Track(cfg.level.world === "day-valley" ? DAY_VALLEY : CLOCK_TOWN);
    const others = RACERS.filter((r) => r.id !== cfg.racer.id);
    const field = [cfg.racer, ...others];
    this.race = new Race({
      track: this.track, laps: cfg.level.laps, junior: cfg.junior, gatesPerLap: cfg.level.gates, gateKind: cfg.level.gateKind,
      aiSkill: cfg.level.ai * cfg.aiBoost,
      racers: field.map((r, i) => ({ id: r.id, stats: i === 0 ? cfg.kart.stats : kartById(r.kart).stats })),
    });
    this.world = buildWorld(scene, this.track, cfg.level.world === "day-valley" ? "day-valley" : "clock-town", q, this.race.gates, this.race.pickups);
    field.forEach((r, i) => {
      const k = i === 0 ? cfg.kart : kartById(r.kart);
      this.models.push(buildKart(scene, k, r, i === 0 ? cfg.paint : undefined));
    });
    if (q.shadows) {
      const sg = new ShadowGenerator(1024, this.sun);
      sg.useBlurExponentialShadowMap = true;
      sg.blurKernel = 16;
      sg.darkness = 0.35;
      this.models.forEach((m) => m.meshes.forEach((mesh) => sg.addShadowCaster(mesh, false)));
      this.sun.autoUpdateExtends = false;
      this.sun.orthoLeft = this.sun.orthoBottom = -24;
      this.sun.orthoRight = this.sun.orthoTop = 24;
      this.sun.shadowMinZ = 1;
      this.sun.shadowMaxZ = 120;
      this.shadows = sg;
    }
    this.flames = boostFlames(scene, this.models[0].exhaust, q.particles);
    this.burst = sparkles(scene, Math.round(q.particles / 2));

    this.camera = new UniversalCamera("cam", new Vector3(0, 6, -12), scene);
    this.camera.fov = 0.95;
    this.camera.minZ = 0.3;
    this.camera.maxZ = 1600;
    this.camera.inputs.clear();
    this.placeKarts();
    this.snapCamera();

    this.sound.enabled = cfg.sound;
    this.bindKeys();
    scene.onBeforeRenderObservable.add(() => this.tick());
    scene.executeWhenReady(() => {
      if (!this.disposed) ev.onReady();
    });
    this.engine.runRenderLoop(() => {
      if (!this.disposed) scene.render();
    });
    window.addEventListener("resize", this.resize);
  }

  /* ------------------------------------------------------------ public API */
  setTouch(steer: number) {
    this.touchSteer = steer;
  }
  setBrake(b: boolean) {
    this.brakeHeld = b;
  }
  turbo() {
    if (this.race.useTurbo()) {
      this.cheer = 1;
      this.ev.onToast("turbo", this.race.turboCharges);
    }
  }
  setPaused(p: boolean) {
    this.paused = p;
  }
  /** answer a panel question (index into q.options) */
  answer(index: number): boolean {
    const q = this.question;
    if (!q) return false;
    const ok = index === q.answer;
    this.score(q, ok);
    if (ok) this.closeQuestion();
    return ok;
  }
  /** junior mode on gate questions: tapping an answer steers the kart into that lane */
  steerToLane(i: number) {
    const lat = (1 - i) * this.track.half * 0.62;
    this.race.player.lane = lat; // junior lane assist steers there; explorer drivers steer themselves
  }
  startAudio() {
    this.sound.start();
  }
  dispose() {
    this.disposed = true;
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("keydown", this.onKey);
    window.removeEventListener("keyup", this.onKey);
    this.sound.stop();
    this.engine.stopRenderLoop();
    this.scene.dispose();
    this.engine.dispose();
  }

  /* -------------------------------------------------------------- internals */
  private resize = () => this.engine.resize();
  private onKey = (e: KeyboardEvent) => {
    const k = e.key.toLowerCase();
    if (["arrowleft", "arrowright", "arrowup", "arrowdown", "a", "d", "w", "s", " "].includes(k)) {
      if (e.target instanceof HTMLElement && e.target.tagName === "BUTTON" && k === " ") return;
      if (e.type === "keydown") {
        if (k === " " && !this.keys.has(k)) this.turbo();
        this.keys.add(k);
      } else this.keys.delete(k);
      if (k.startsWith("arrow")) e.preventDefault();
    }
  };
  private bindKeys() {
    window.addEventListener("keydown", this.onKey);
    window.addEventListener("keyup", this.onKey);
  }

  private nextQuestion(): RaceQuestion {
    const n = optionCount(this.cfg.level.gateKind);
    return makeQuestion(this.cfg.level.family, this.rng, this.adaptive.level, n, this.qIndex++);
  }
  private openQuestion(mode: "panel" | "gates", gateIndex: number) {
    if (!this.question) {
      this.question = this.nextQuestion();
      this.qTries = 0;
    }
    const q = this.question;
    if (q.visual.kind === "clock") this.world.towerClock?.set(q.visual.t);
    if (mode === "panel") this.race.timeScale = this.cfg.junior ? 0.18 : 0.3;
    else {
      // label the three lane gates
      const labels = q.options.map((o) => this.optionLabel(o));
      const colors = q.options.map((o, i) => (o.kind === "day" ? DAY_COLORS[o.d] : ["#ff8a5c", "#3cb55e", "#6c8cff"][i]));
      this.world.setGateLabels?.(gateIndex % this.cfg.level.gates, labels, colors);
    }
    this.ev.onQuestion(q, mode);
  }
  private optionLabel(o: RaceQuestion["options"][number]): string {
    const L = this.cfg.lang;
    switch (o.kind) {
      case "day": return DAYS_SHORT[L][o.d];
      case "month": return MONTHS_SHORT[L][o.m];
      case "number": return String(o.n);
      default: return "";
    }
  }
  private score(q: RaceQuestion, ok: boolean) {
    const c = (this.concepts[q.concept] ??= { a: 0, c: 0 });
    if (this.qTries === 0) {
      c.a++;
      this.asked++;
      if (ok) {
        c.c++;
        this.firstTry++;
      }
      this.adaptive.record(ok);
    }
    if (ok) {
      const secs = this.race.reward();
      void secs;
      this.cheer = 1;
      const p = this.models[0].root.position;
      this.burst(new Vector3(p.x, 2.2, p.z), 40);
      if (q.learned && !this.learned.includes(q.learned)) this.learned.push(q.learned);
      this.ev.onFeedback("correct", q, this.race.combo);
    } else {
      this.race.miss();
      this.qTries++;
      this.ev.onFeedback("wrong", q, 0);
    }
  }
  private closeQuestion() {
    this.question = null;
    this.race.timeScale = 1;
    this.ev.onQuestion(null, "panel");
  }

  private tick() {
    if (this.disposed) return;
    const dt = Math.min(0.05, this.engine.getDeltaTime() / 1000);
    this.adaptQuality(dt);
    // input: keyboard + touch
    const left = this.keys.has("arrowleft") || this.keys.has("a") ? 1 : 0;
    const right = this.keys.has("arrowright") || this.keys.has("d") ? 1 : 0;
    const steer = Math.max(-1, Math.min(1, left - right + this.touchSteer));
    const up = this.keys.has("arrowup") || this.keys.has("w");
    const down = this.keys.has("arrowdown") || this.keys.has("s");
    this.input = this.cfg.junior
      ? { steer, throttle: 1, brake: 0 }
      : { steer, throttle: down || this.brakeHeld ? 0 : 1, brake: down || this.brakeHeld ? 1 : 0 }; // explorer: always rolls; brake to slow down
    void up;
    if (!this.paused) this.race.update(dt, this.input);
    this.handleEvents(this.race.drain());
    this.gateApproach();
    this.placeKarts(dt);
    this.followCamera(dt);
    this.world.update(this.race.t);
    this.world.pickups.forEach(({ mesh, p }) => {
      // pickups exist only for lap 1 meshes; reuse them on later laps by position
      const lap = Math.floor(this.race.player.s / this.track.length);
      const pLap = this.race.pickups.find((x) => !x.taken && Math.abs(x.s - (p.s + lap * this.track.length)) < 0.5);
      mesh.setEnabled(!!pLap);
    });
    const pl = this.race.player;
    this.flames.emitRate = pl.boost > 0 && !this.paused ? 260 : 0;
    this.cheer = Math.max(0, this.cheer - dt * 0.8);
    this.sound.update(pl.speed, pl.boost > 0, this.paused || this.race.phase !== "racing");
    if (this.shadows) {
      const p = this.models[0].root.position;
      this.sun.position.set(p.x + 20, 40, p.z - 14);
    }
    this.hudT += dt;
    if (this.hudT > 0.1) {
      this.hudT = 0;
      this.ev.onHud({
        position: this.race.position(), racers: this.race.karts.length, lap: this.race.lap, laps: this.cfg.level.laps,
        progress: this.race.progress(), time: Math.max(0, this.race.t), speed: pl.speed, boost: pl.boost, charges: this.race.turboCharges,
        combo: this.race.combo, coins: this.race.coins, phase: this.race.phase,
      });
    }
  }

  /** choice gates: show the question ~45 m before the gate, judge the lane when crossing */
  private gateApproach() {
    if (this.cfg.level.gateKind !== "choice-gates") return;
    const p = this.race.player;
    for (const g of this.race.gates) {
      if (!this.gateAnnounced.has(g.index) && p.s >= g.s - 50 && p.s < g.s) {
        this.gateAnnounced.add(g.index);
        this.openQuestion("gates", g.index);
      }
    }
  }

  private handleEvents(evs: RaceEvent[]) {
    for (const e of evs) {
      switch (e.type) {
        case "countdown": this.ev.onCountdown(e.n); break;
        case "go": this.ev.onCountdown("go"); break;
        case "gate":
          if (e.gate.kind === "question") this.openQuestion("panel", e.gate.index);
          else if (this.question) {
            // which lane did we drive through? lanes: 0 = left, 1 = middle, 2 = right
            const lat = this.race.player.lat;
            const w = this.track.half * 0.62;
            const lane = lat > w / 2 ? 0 : lat < -w / 2 ? 2 : 1;
            const q = this.question;
            const ok = lane === q.answer;
            this.score(q, ok);
            if (ok) this.closeQuestion();
            // wrong: the same question comes back at the next gate (another try)
          }
          break;
        case "lap": this.ev.onToast("lap", e.lap); break;
        case "pickup": {
          const p = this.models[0].root.position;
          this.burst(new Vector3(p.x, 1.4, p.z), 14);
          this.ev.onToast("pickup", e.total);
          break;
        }
        case "overtake": this.ev.onToast("overtake", e.position); break;
        case "boost": break;
        case "bump": break;
        case "finish":
          this.cheer = 1;
          this.ev.onFinish({
            position: e.position, time: e.time, coins: this.race.coins, correctFirstTry: this.firstTry, questions: this.asked,
            learned: this.learned, levelEnd: this.adaptive.level, concepts: this.concepts,
          });
          break;
      }
    }
  }

  private placeKarts(dt = 0) {
    const t = this.race.t;
    this.race.karts.forEach((k, i) => {
      const m = this.models[i];
      const w = this.track.world(k.s, k.lat);
      m.root.position.set(w.x, 0, w.z);
      m.root.rotation.y = w.yaw - k.head;
      animateKart(m, k.speed, k.steerVis, t + i, k.boost > 0, i === 0 ? this.cheer : k.finished != null ? 1 : 0);
    });
    void dt;
  }

  private snapCamera() {
    const m = this.models[0].root;
    const yaw = m.rotation.y;
    this.camPos.set(m.position.x - Math.sin(yaw) * 9, 4.2, m.position.z - Math.cos(yaw) * 9);
    this.camera.position.copyFrom(this.camPos);
    this.camera.setTarget(new Vector3(m.position.x, 1.4, m.position.z));
  }
  private followCamera(dt: number) {
    const m = this.models[0].root;
    const k = this.race.player;
    const boosting = k.boost > 0;
    // follow the road direction more than the kart's wiggle (calmer for kids)
    const roadYaw = this.track.world(k.s, 0).yaw;
    const yaw = roadYaw * 0.7 + m.rotation.y * 0.3;
    const dist = boosting ? 7.6 : 8.8;
    const h = boosting ? 3.6 : 4.2;
    const desired = new Vector3(m.position.x - Math.sin(yaw) * dist, h, m.position.z - Math.cos(yaw) * dist);
    const a = 1 - Math.exp(-dt * 5);
    this.camPos.x += (desired.x - this.camPos.x) * a;
    this.camPos.y += (desired.y - this.camPos.y) * a;
    this.camPos.z += (desired.z - this.camPos.z) * a;
    this.camera.position.copyFrom(this.camPos);
    const ahead = this.track.world(k.s + 6, k.lat * 0.6);
    this.camera.setTarget(new Vector3(ahead.x, 1.3, ahead.z));
    const fov = boosting ? 1.12 : 0.95;
    this.camera.fov += (fov - this.camera.fov) * Math.min(1, dt * 4);
  }

  /** if the device struggles (<30 fps for a while), render fewer pixels and drop shadows */
  private adaptQuality(dt: number) {
    if (dt <= 0) return;
    this.fps.push(1 / dt);
    if (this.fps.length < 180) return;
    const avg = this.fps.reduce((a, b) => a + b, 0) / this.fps.length;
    this.fps = [];
    if (avg < 30) {
      const lvl = this.engine.getHardwareScalingLevel();
      if (lvl < 2) this.engine.setHardwareScalingLevel(Math.min(2, lvl + 0.25));
      if (this.shadows) {
        this.shadows.dispose();
        this.shadows = null;
      }
    }
  }
}
