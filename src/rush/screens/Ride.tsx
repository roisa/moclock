/**
 * The ride: canvas scene + HUD + controls. Owns the game loop (fixed 60 Hz
 * simulation, render every animation frame) and turns sim events into sound,
 * voice, particles and HUD updates.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { GameSim, type SimEvent, type Stats } from "../core/sim";
import { morningWorld } from "../core/morning";
import { Scene } from "../render/scene";
import { preload, ALL_SPRITES, image } from "../render/sprites";
import { BIKES } from "../render/rider";
import { Clock, Digital } from "../../ui/Clock";
import { useRush, UNLOCKS, type WorldId } from "../state";
import { audio } from "../audio";
import { kit, Pill } from "../ui/Kit";
import type { Msg } from "../../i18n/types";

const STEP = 1 / 60;
/** test hook: ?simspeed=4 runs the simulation faster (automated playthroughs) */
const SIM_SPEED = Math.min(8, Math.max(1, Number(new URLSearchParams(location.search).get("simspeed")) || 1));

export function RideScreen({ world, onDone, onQuit, onRestart }: { world: WorldId; onDone: (s: Stats) => void; onQuit: () => void; onRestart: () => void }) {
  const { p, t, lang } = useRush();
  const sim = useMemo(() => new GameSim(morningWorld()), []);
  const cv = useRef<HTMLCanvasElement>(null);
  const scene = useRef<Scene | null>(null);
  const [hud, setHud] = useState({ stars: 0, pk: 0, time: sim.time, acorns: 0 });
  const [phase, setPhase] = useState<"ready" | "ride" | "arrive">("ready");
  const [paused, setPaused] = useState(false);
  const [line, setLine] = useState<string | null>(null);
  const [pulse, setPulse] = useState(0);
  const pausedRef = useRef(false);
  pausedRef.current = paused;
  const lefty = p.settings.lefty;
  void world;

  const say = (m: Msg | string, opts: { gap?: number; force?: boolean } = {}) => {
    audio.say(m, lang, opts);
    setLine(t(m));
    window.clearTimeout((say as unknown as { h: number }).h);
    (say as unknown as { h: number }).h = window.setTimeout(() => setLine(null), 2600);
  };

  // scene + loop
  useEffect(() => {
    const c = cv.current!;
    const sc = new Scene(c);
    scene.current = sc;
    const bike = UNLOCKS.find((u) => u.kind === "bike" && u.id === p.equip.bike) ? p.equip.bike : "green";
    const bag = UNLOCKS.find((u) => u.kind === "bag" && u.id === p.equip.bag)?.color ?? "#ffd23f";
    sc.look = { ...BIKES[bike], bag };
    sc.reduced = p.settings.reduced;
    const fit = () => sc.resize(c.clientWidth, c.clientHeight);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(c);
    image("kit/mo-back-r1.webp").then((i) => (sc.body = i)).catch(() => {});
    preload(ALL_SPRITES).catch(() => {});
    let raf = 0, last = performance.now(), acc = 0, clock = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      if (pausedRef.current) { sc.render(sim, clock, 0); return; }
      clock += dt;
      acc += dt * SIM_SPEED;
      while (acc >= STEP) { sim.step(STEP); acc -= STEP; }
      handle(sim.drain());
      sc.render(sim, clock, dt);
      const time = sim.time;
      setHud((h) => (h.stars !== sim.stats.stars || h.pk !== sim.stats.packages || h.time !== time || h.acorns !== sim.stats.acorns ? { stars: sim.stats.stars, pk: sim.stats.packages, time, acorns: sim.stats.acorns } : h));
    };
    raf = requestAnimationFrame(loop);
    const go = window.setTimeout(() => { sim.start(); setPhase("ride"); }, 1400);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); clearTimeout(go); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handle(evs: SimEvent[]) {
    const sc = scene.current!;
    const at = (id: number) => sc.itemXY(id) ?? sc.riderXY(sim);
    const rp = () => { const r = sc.riderXY(sim); return { x: r.x, y: r.y - sc.riderH * 0.6 }; };
    for (const e of evs) {
      switch (e.type) {
        case "go": say("ru.say.go", { force: true }); audio.sfx("go"); break;
        case "star": case "coin": { const q = at(e.item.id); sc.fx.emit("star", q.x, q.y, 6, { color: "#ffd23f", size: 7, speed: 180 }); audio.sfx("star"); setPulse((n) => n + 1); break; }
        case "gift": { const q = at(e.item.id); sc.fx.emit("confetti", q.x, q.y, 24, { up: 300, life: 1.2 }); sc.fx.emit("star", q.x, q.y, 10, { color: "#ffd23f", size: 9 }); audio.sfx("correct"); setPulse((n) => n + 1); break; }
        case "ring": { const q = at(e.item.id); sc.fx.emit("spark", q.x, q.y, 20, { size: 6, speed: 300 }); audio.sfx("whoosh"); break; }
        case "pocketclock": { const q = at(e.item.id); sc.fx.emit("star", q.x, q.y, 16, { color: "#ffd23f", size: 10 }); audio.sfx("fanfare"); say({ k: "ru.say.balloon", p: { t: { time: sim.time } } }, { force: true }); break; }
        case "balloon": { const q = at(e.item.id); sc.fx.emit("confetti", q.x, q.y, 22, { up: 200, life: 1 }); audio.sfx("pop"); say({ k: "ru.say.balloon", p: { t: { time: e.time } } }, { gap: 3 }); break; }
        case "acorn": { const q = at(e.item.id); sc.fx.emit("heart", q.x, q.y, 2, { size: 10, speed: 40 }); audio.sfx("pop"); break; }
        case "pickup": { const q = rp(); sc.fx.emit("star", q.x, q.y, 16, { color: "#ffd23f", size: 9, speed: 260 }); audio.sfx("correct"); audio.haptic("success"); say(("ru.say.pickup" + Math.min(3, e.carrying)), { force: true }); break; }
        case "bump": { const r = sc.riderXY(sim); sc.fx.emit("dust", r.x, r.y - 10, 8, { speed: 120, size: 12 }); sc.bump(); audio.sfx("gentle"); audio.haptic("soft"); say("ru.say.bump", { gap: 10 }); break; }
        case "splash": { const r = sc.riderXY(sim); sc.fx.emit("drop", r.x, r.y - 10, 18, { speed: 260, up: 320, size: 9 }); audio.sfx("whoosh"); break; }
        case "boost": audio.sfx("whoosh"); say("ru.say.boost", { gap: 12 }); break;
        case "ramp": audio.sfx("whoosh"); break;
        case "jump": audio.sfx("snap"); break;
        case "land-big": case "land": { const r = sc.riderXY(sim); sc.fx.emit("dust", r.x, r.y - 6, e.type === "land-big" ? 10 : 5, { speed: 140, size: 10 }); break; }
        case "friend-meet": say("ru.say.friend", { force: true }); break;
        case "friend-help": { const q = rp(); sc.fx.emit("heart", q.x, q.y - 40, 8, { size: 14, speed: 80 }); audio.sfx(e.token ? "fanfare" : "correct"); say(e.token ? "ru.say.friendThanks" : "ru.say.friendThanksSmall", { force: true }); break; }
        case "tunnel-in": audio.sfx("whoosh"); say("ru.say.tunnel", { force: true }); break;
        case "arrive": {
          const sc2 = scene.current!;
          sc2.fx.emit("confetti", sc2.W / 2, sc2.H * 0.3, 70, { up: 500, speed: 400, life: 2 });
          audio.sfx("fanfare");
          audio.haptic("success");
          say("ru.say.arrive", { force: true });
          setPhase("arrive");
          window.setTimeout(() => onDone(sim.stats), 3200);
          break;
        }
      }
    }
  }

  // keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.key === "ArrowLeft" || e.key === "a") sim.input.steer.push(-1);
      else if (e.key === "ArrowRight" || e.key === "d") sim.input.steer.push(1);
      else if (e.key === " " || e.key === "ArrowUp" || e.key === "w") { sim.input.jump = true; e.preventDefault(); }
      else if (e.key === "Escape" || e.key === "p") setPaused((v) => !v);
    };
    addEventListener("keydown", down);
    return () => removeEventListener("keydown", down);
  }, [sim]);
  // pause when the app goes to the background
  useEffect(() => {
    const v = () => { if (document.hidden && phase === "ride") setPaused(true); };
    document.addEventListener("visibilitychange", v);
    return () => document.removeEventListener("visibilitychange", v);
  }, [phase]);

  // touch on the road: tap left/right half to steer, swipe up to jump
  const touch = useRef<{ x: number; y: number; t: number } | null>(null);
  const onDown = (e: React.PointerEvent) => { touch.current = { x: e.clientX, y: e.clientY, t: performance.now() }; };
  const onUp = (e: React.PointerEvent) => {
    const s = touch.current;
    touch.current = null;
    if (!s || paused) return;
    const dx = e.clientX - s.x, dy = e.clientY - s.y;
    if (dy < -40 && Math.abs(dy) > Math.abs(dx)) { sim.input.jump = true; return; }
    if (Math.abs(dx) > 40) { sim.input.steer.push(Math.sign(dx)); return; }
    const w = (e.currentTarget as HTMLElement).clientWidth;
    sim.input.steer.push(e.clientX < w / 2 ? -1 : 1);
  };
  const steer = (d: number) => (e: React.PointerEvent) => { e.stopPropagation(); if (!paused) sim.input.steer.push(d); };
  const jump = (e: React.PointerEvent) => { e.stopPropagation(); if (!paused) sim.input.jump = true; };

  const portrait = typeof innerWidth !== "undefined" && innerHeight > innerWidth * 1.15;
  return (
    <div className={"ru-ride" + (lefty ? " lefty" : "")}>
      <canvas ref={cv} className="ru-canvas" onPointerDown={onDown} onPointerUp={onUp} aria-label="Morning Town road" />
      <div className="ru-hud">
        <div className={"ru-hud-stars bump" + (pulse % 2)} id="hud-stars"><img src={kit("star.webp")} alt="" /><b>{hud.stars}</b></div>
        <div className="ru-hud-clock" aria-live="polite">
          <Clock t={hud.time} size={68} />
          <Digital t={hud.time} size="s" />
        </div>
        <div className="ru-hud-pk" aria-label={t({ k: "ru.packages", p: { a: hud.pk, b: 3 } })}>
          {[0, 1, 2].map((i) => <span key={i} className={"book" + (i < hud.pk ? " on" : "")} />)}
          {sim.friendMet && !sim.stats.token && <span className="acorns">🌰 {hud.acorns}/3</span>}
        </div>
        <button className="ru-round ru-hud-pause" aria-label={t("ru.pause")} onClick={() => { audio.sfx("tap"); setPaused(true); }}><i /><i /></button>
      </div>
      {line && <div className="ru-say" role="status"><img src={"characters/mo-wave.webp"} alt="" />{line}</div>}
      {phase === "ready" && <div className="ru-ready">{t("ru.howTo")}{portrait && <small>{t("ru.rotate")}</small>}</div>}
      {phase === "ride" && (
        <div className="ru-controls">
          <div className="ru-steer">
            <button className="ru-ctl" aria-label={t("ru.left")} onPointerDown={steer(-1)}><svg viewBox="0 0 40 40"><path d="M25 8 12 20l13 12" /></svg></button>
            <button className="ru-ctl" aria-label={t("ru.right")} onPointerDown={steer(1)}><svg viewBox="0 0 40 40"><path d="M15 8l13 12-13 12" /></svg></button>
          </div>
          <button className="ru-ctl jump" aria-label={t("ru.jump")} onPointerDown={jump}><svg viewBox="0 0 40 40"><path d="M10 26 20 14l10 12" /></svg><span>{t("ru.jump")}</span></button>
        </div>
      )}
      {paused && (
        <div className="ru-scrim">
          <div className="ru-panel pause" role="dialog" aria-modal="true">
            <h2>{t("ru.paused")}</h2>
            <Pill big onClick={() => setPaused(false)}>{t("ru.resume")}</Pill>
            <Pill color="yellow" onClick={onRestart}>{t("ru.restart")}</Pill>
            <Pill color="blue" onClick={onQuit}>{t("ru.quit")}</Pill>
          </div>
        </div>
      )}
    </div>
  );
}
