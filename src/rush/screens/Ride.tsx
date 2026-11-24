/**
 * The ride: canvas scene + HUD + controls. Owns the game loop (fixed 60 Hz
 * simulation, render every animation frame) and turns sim events into sound,
 * voice, particles and HUD updates.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { GameSim, type SimEvent, type Stats } from "../core/sim";
import { morningWorld, BUILD } from "../core/morning";
import { look } from "../worlds";
import { wkey } from "../i18n";
import { Scene } from "../render/scene";
import { preload, ALL_SPRITES, image, artAtlas, sprite } from "../render/sprites";
import { BIKES, CLIP_FRAMES, type ClipName } from "../render/rider";
import { Clock, Digital } from "../../ui/Clock";
import { useRush, UNLOCKS, type WorldId } from "../state";
import { audio, CLIP_TEXT, type Clip } from "../audio";
import { usePrayer } from "../prayer/prayer";
import { listenTilt } from "../tiltSensor";
import { laneFromTilt } from "../core/tilt";

const STREAK_CLIPS: Record<number, Clip> = { 8: "masya1", 16: "masya2", 24: "subhan", 32: "barak", 40: "akbar" };
import { kit, Pill } from "../ui/Kit";
import type { Msg } from "../../i18n/types";

const STEP = 1 / 60;
let duaDone = false;
/** test hook: ?simspeed=4 runs the simulation faster (automated playthroughs) */
const SIM_SPEED = Math.min(8, Math.max(1, Number(new URLSearchParams(location.search).get("simspeed")) || 1));

export function RideScreen({ world, onDone, onQuit, onRestart }: { world: WorldId; onDone: (s: Stats) => void; onQuit: () => void; onRestart: () => void }) {
  const { p, t, lang } = useRush();
  const L = look(world);
  const sim = useMemo(() => new GameSim((BUILD[world] ?? morningWorld)()), [world]);
  // automated QA only (?qa): lets the playthrough script jump along the road
  if (/[?&]qa\b/.test(location.search)) (window as unknown as { __rush: GameSim }).__rush = sim;
  const cv = useRef<HTMLCanvasElement>(null);
  const scene = useRef<Scene | null>(null);
  const [hud, setHud] = useState({ stars: 0, pk: 0, time: sim.time, carrots: 0 });
  const [phase, setPhase] = useState<"ready" | "ride" | "arrive">("ready");
  const [count, setCount] = useState<number | null>(null);
  const [dua, setDua] = useState(true);
  const startRef = useRef<() => void>(() => {});
  const [paused, setPaused] = useState(false);
  const [line, setLine] = useState<string | null>(null);
  const [pulse, setPulse] = useState(0);
  const pausedRef = useRef(false);
  const lastStar = useRef(0);
  const streak = useRef(0);
  const lastPraise = useRef(-1e9);
  /** recorded Baby Mo clips with a speech bubble showing the words */
  /**
   * Voice director: one line at a time. A line that matters (force) waits for the current one to
   * finish instead of cutting it off; small remarks are dropped while Mo is talking.
   */
  const busyUntil = useRef(0);
  const queue = useRef<(() => void)[]>([]);
  const talk = (text: string, play: () => boolean, force?: boolean) => {
    const now = performance.now();
    if (now < busyUntil.current) {
      if (force && queue.current.length < 2) {
        queue.current.push(() => talk(text, play, force));
        window.setTimeout(() => queue.current.shift()?.(), busyUntil.current - now + 120);
      }
      return;
    }
    if (!play()) return;
    const dur = Math.max(1500, 700 + text.length * 62); // about how long Mo needs to say it
    busyUntil.current = now + dur;
    setLine(text);
    window.clearTimeout((say as unknown as { h: number }).h);
    (say as unknown as { h: number }).h = window.setTimeout(() => setLine(null), dur + 700);
  };
  const sayClips = (names: Clip[], opts: { gap?: number; force?: boolean } = {}) =>
    talk(names.map((n) => CLIP_TEXT[n][lang]).join(" "), () => audio.clips(names, lang, { ...opts, force: true }), opts.force);
  /** the last time (minutes) Mo said out loud, so the same time is not repeated right away */
  const lastTimeSaid = useRef({ t: -1, at: 0 });
  const sayTime = (key: string, time: number) => {
    const now = performance.now();
    if (lastTimeSaid.current.t === time && now - lastTimeSaid.current.at < 15000) return;
    lastTimeSaid.current = { t: time, at: now };
    say({ k: key, p: { t: { time } } }, { gap: 4 });
  };
  const lastQuarter = useRef(-1);
  const prayer = usePrayer();
  pausedRef.current = paused || !!prayer.due; // the prayer-time pause holds the ride
  const lefty = p.settings.lefty;
  void world;

  const say = (m0: Msg | string, opts: { gap?: number; force?: boolean } = {}) => {
    const m = typeof m0 === "string" ? wkey(m0, world) : m0; // the world's own line when it has one
    talk(t(m), () => audio.say(m, lang, { ...opts, force: true }), opts.force);
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
    image("mo/ride.webp").then((i) => (sc.riderStrip = i)).catch(() => {}); // the approved riding sheet
    image(L.far).then((i) => (sc.far = i)).catch(() => {});
    sc.alias = L.alias;
    sc.sky = L.sky;
    (L.hosts ?? []).forEach((src, k) => { const im = new Image(); im.src = src; sc.hosts[k] = im; });
    for (const c of Object.keys(CLIP_FRAMES) as ClipName[]) image(`mo/${c}.webp`).then((i) => (sc.clips[c] = i)).catch(() => {});
    for (const id of ["ais", "adam"] as const) image(`mo/${id}-ride.webp`).then((i) => (sc.rivalStrips[id] = i)).catch(() => {});
    preload(ALL_SPRITES).catch(() => {});
    // generated animation strips (rush-slice.py) replace the placeholder rider clip by clip
    artAtlas().then((at) => {
      for (const [id, a] of Object.entries(at)) {
        if (a.frames > 1) image("art/" + id + ".webp").then((img) => (sc.sheets[id] = { img, w: a.w, h: a.h, frames: a.frames, fps: (a as { fps?: number }).fps ?? 12 })).catch(() => {});
      }
    });
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
      if (time % 15 === 0 && time !== lastQuarter.current && !sim.r.stopped && sim.t > 3) {
        lastQuarter.current = time;
        if (time % 60 !== 0) sayTime("ru.say.quarter", time);
      }
      setHud((h) => (h.stars !== sim.stats.stars || h.pk !== sim.stats.packages || h.time !== time || h.carrots !== sim.stats.carrots ? { stars: sim.stats.stars, pk: sim.stats.packages, time, carrots: sim.stats.carrots } : h));
    };
    raf = requestAnimationFrame(loop);
    // on the bike: Baby Mo reads the du'a for riding (recorded), then 3, 2, 1, Go! (Bismillah)
    let ts: number[] = [];
    let started = false;
    const countdown = () => {
      if (started) return;
      started = true;
      setDua(false);
      ts = [400, 1050, 1700, 2350].map((ms, i) => window.setTimeout(() => {
        if (i < 3) { setCount(3 - i); audio.sfx("beep"); }
        else { setCount(0); sim.start(); setPhase("ride"); window.setTimeout(() => setCount(null), 700); }
      }, ms));
    };
    startRef.current = countdown;
    // the du'a for riding is read on the first ride of a visit; later rides go straight to 3-2-1
    const skipDua = /[?&]nodua\b/.test(location.search) || duaDone;
    duaDone = true;
    if (skipDua) setDua(false);
    // the card stays at least 6.5 s so it can be read even with the voice off
    const shownAt = performance.now();
    const t0 = window.setTimeout(() => (skipDua ? countdown() : audio.clips(["d-vehicle"], lang, { force: true, done: () => window.setTimeout(countdown, Math.max(500, 6500 - (performance.now() - shownAt))) })), 700);
    const fallback = window.setTimeout(countdown, skipDua ? 800 : 11000); // never wait forever (no audio, blocked autoplay)
    return () => { cancelAnimationFrame(raf); ro.disconnect(); ts.forEach(clearTimeout); clearTimeout(t0); clearTimeout(fallback); audio.stop(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handle(evs: SimEvent[]) {
    const sc = scene.current!;
    const at = (id: number) => sc.itemXY(id) ?? sc.riderXY(sim);
    const rp = () => { const r = sc.riderXY(sim); return { x: r.x, y: r.y - sc.riderH * 0.6 }; };
    for (const e of evs) {
      switch (e.type) {
        case "go": sayClips(["bismillah"], { force: true }); audio.sfx("go"); break;
        case "star": case "coin": { const q = at(e.item.id); sc.fx.emit("star", q.x, q.y, 6, { color: "#ffd23f", size: 7, speed: 180 }); const now = performance.now();
          // star streaks earn a little praise in Baby Mo's recorded voice: Masya Allah → Subhanallah → Barakallah → Allahu Akbar
          streak.current = now - lastStar.current < 2500 ? streak.current + 1 : 1;
          const praise = STREAK_CLIPS[streak.current];
          if (praise && now - lastPraise.current > 20000) { lastPraise.current = now; sayClips([praise]); }
          if (now - lastStar.current > 90) audio.sfx("star");
          lastStar.current = now; setPulse((n) => n + 1); break; }
        case "gift": { const q = at(e.item.id); sc.fx.emit("confetti", q.x, q.y, 24, { up: 300, life: 1.2 }); sc.fx.emit("star", q.x, q.y, 10, { color: "#ffd23f", size: 9 }); audio.sfx("correct"); setPulse((n) => n + 1); break; }
        case "ring": { const q = at(e.item.id); sc.fx.emit("spark", q.x, q.y, 20, { size: 6, speed: 300 }); audio.sfx("whoosh"); break; }
        case "pocketclock": { const q = at(e.item.id); sc.fx.emit("star", q.x, q.y, 16, { color: "#ffd23f", size: 10 }); audio.sfx("fanfare"); say({ k: "ru.say.balloon", p: { t: { time: sim.time } } }, { force: true }); break; }
        case "balloon": { const q = at(e.item.id); sc.fx.emit("confetti", q.x, q.y, 22, { up: 200, life: 1 }); audio.sfx("pop"); sayTime("ru.say.balloon", e.time); break; }
        case "carrot": { const q = at(e.item.id); sc.fx.emit("heart", q.x, q.y, 2, { size: 10, speed: 40 }); audio.sfx("pop"); break; }
        case "pickup": {
          const q = rp();
          // the approved pickup frames show Mo catching the package; without them the books fly in
          if (!sc.clips.pickup) { const bk = sprite("books"); sc.fly(bk.img, bk.w, bk.h, sc.W / 2, sc.H * 0.3, sc.riderH * 0.6); }
          sc.fx.emit("star", q.x, q.y, 16, { color: "#ffd23f", size: 9, speed: 260 }); audio.sfx("correct"); audio.haptic("success"); say(("ru.say.pickup" + Math.min(3, e.carrying)), { force: true }); break; }
        case "bump": { const r = sc.riderXY(sim); sc.fx.emit("dust", r.x, r.y - 10, 8, { speed: 120, size: 12 }); sc.bump(); audio.sfx("gentle"); audio.haptic("soft"); say("ru.say.bump", { gap: 10 }); break; }
        case "splash": { const r = sc.riderXY(sim); sc.fx.emit("drop", r.x, r.y - 10, 18, { speed: 260, up: 320, size: 9 }); audio.sfx("whoosh"); break; }
        case "boost": audio.sfx("whoosh"); say("ru.say.boost", { gap: 12 }); break;
        case "ramp": audio.sfx("whoosh"); break;
        case "jump": audio.sfx("snap"); break;
        case "land-big": case "land": { const r = sc.riderXY(sim); sc.fx.emit("dust", r.x, r.y - 6, e.type === "land-big" ? 10 : 5, { speed: 140, size: 10 }); break; }
        case "friend-meet": say("ru.say.friend", { force: true }); break;
        case "friend-help": { const q = rp(); sc.fx.emit("heart", q.x, q.y - 40, 8, { size: 14, speed: 80 }); audio.sfx(e.token ? "fanfare" : "correct"); say(e.token ? "ru.say.friendThanks" : "ru.say.friendThanksSmall", { force: true });
          window.setTimeout(() => say("ru.say.kind", { force: true }), 3200); break; }
        case "tunnel-in": audio.sfx("whoosh"); say("ru.say.tunnel", { force: true }); break;
        case "magnet": { const q = at(e.item.id); sc.fx.emit("spark", q.x, q.y, 18, { color: "#ff6b6b", size: 6, speed: 260 }); audio.sfx("correct"); say("ru.say.magnet", { force: true }); break; }
        case "shield": { const q = at(e.item.id); sc.fx.emit("spark", q.x, q.y, 18, { color: "#7fcaff", size: 6, speed: 260 }); audio.sfx("correct"); say("ru.say.shield", { force: true }); break; }
        case "shield-block": { const r = sc.riderXY(sim); sc.fx.emit("star", r.x, r.y - sc.riderH * 0.5, 10, { color: "#bfe6ff", size: 8, speed: 240 }); audio.sfx("pop"); say("ru.say.shieldBlock", { gap: 4 }); break; }
        case "timeclock": { const q = at(e.item.id); sc.fx.emit("spark", q.x, q.y, 18, { color: "#ffd23f", size: 6, speed: 260 }); audio.sfx("tick"); say({ k: "ru.say.timeclock", p: { t: { time: sim.time } } }, { force: true }); break; }
        case "tunnel-near": say("ru.say.tunnelHint", { force: true }); break;
        // friends overtaking cheer Mo on; when Mo passes them they cheer too (sparingly)
        case "rival-pass": say(`ru.rival.${e.who}.${e.ahead ? "pass" : "passed"}`, { gap: 9 }); break;
        case "balloon-miss": sayTime("ru.say.balloonMiss", e.time); break;
        case "arrive": {
          const sc2 = scene.current!;
          sc2.fx.emit("confetti", sc2.W / 2, sc2.H * 0.3, 70, { up: 500, speed: 400, life: 2 });
          audio.sfx("fanfare");
          audio.haptic("success");
          sayClips(["win"], { force: true }); // "Alhamdulillah! Well done!"
          window.setTimeout(() => say("ru.say.arrive", { force: true }), 1900);
          setPhase("arrive");
          window.setTimeout(() => onDone(sim.stats), 3200);
          break;
        }
      }
    }
  }

  // tilt steering (when switched on): roll → lane, with a calibrated "straight"
  const [tiltLive, setTiltLive] = useState<null | boolean>(null);
  const [tiltShow, setTiltShow] = useState(1);
  useEffect(() => {
    if (!p.settings.tilt) return;
    // tilt only acts when the tilted lane changes, so the arrow buttons keep working in between
    let tl = 1;
    const L = listenTilt((deg) => { const n = laneFromTilt(deg, tl); if (n !== tl) { tl = n; sim.input.tiltLane = n; setTiltShow(n); } });
    const chk = window.setTimeout(() => setTiltLive(L.alive()), 2500);
    return () => { L.stop(); clearTimeout(chk); sim.input.tiltLane = null; };
  }, [p.settings.tilt, sim]);

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
          <Clock t={hud.time} size={typeof innerWidth !== "undefined" && innerWidth < 520 ? 48 : 68} />
          <Digital t={hud.time} size="s" />
        </div>
        <div className="ru-hud-pk" aria-label={t({ k: "ru.packages", p: { a: hud.pk, b: 3 } })}>
          {[0, 1, 2].map((i) => <img key={i} className={"bk" + (i < hud.pk ? " on" : "")} src={L.bundles[i]} alt="" />)}
          {sim.friendMet && !sim.stats.token && <span className="carrots"><img src={L.friend.item} alt="" />{hud.carrots}/3</span>}
        </div>
        <button className="ru-round ru-hud-pause" aria-label={t("ru.pause")} onClick={() => { audio.sfx("tap"); setPaused(true); }}><img src="rush/ui/ctl-pause.webp" alt="" draggable={false} /></button>
      </div>
      {line && <div className="ru-say" role="status"><img src="rush/mo/face.webp" alt="" />{line}</div>}
      {phase === "ready" && count === null && dua && (
        <div className="ru-dua ru-dua-ride" role="status">
          <small>{t("ru.dua.vehicle")}</small>
          <p className="ar" dir="rtl" lang="ar">سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ</p>
          <p className="latin">Subḥānal-ladhī sakhkhara lanā hādhā wa mā kunnā lahu muqrinīn, wa innā ilā rabbinā lamunqalibūn</p>
          <p className="mean">{t("ru.dua.vehicleMeaning")}</p>
          <button className="ru-dua-skip" onClick={() => { audio.stop(); startRef.current(); }}>{t("ru.skip")} ›</button>
        </div>
      )}
      {p.settings.tilt && tiltLive !== false && phase !== "arrive" && <div className="ru-tilthud" aria-hidden="true"><span className="phone" style={{ transform: `rotate(${tiltShow * 18 - 18}deg)` }} />{t("ru.tilt")}</div>}
      {phase === "ready" && count === null && !dua && <div className="ru-ready">{p.settings.tilt ? t("ru.tiltHow") : t("ru.howTo")}{portrait && <small>{t("ru.rotate")}</small>}</div>}
      {count !== null && <div className={"ru-count-big" + (count === 0 ? " go" : "")} key={count} aria-live="assertive">{count === 0 ? t("ru.go") : count}</div>}
      {phase === "ride" && (
        <div className="ru-controls">
          <div className="ru-steer">
            <button className="ru-ctl" aria-label={t("ru.left")} onPointerDown={steer(-1)}><img src="rush/ui/ctl-left.webp" alt="" draggable={false} /></button>
            <button className="ru-ctl" aria-label={t("ru.right")} onPointerDown={steer(1)}><img src="rush/ui/ctl-right.webp" alt="" draggable={false} /></button>
          </div>
          <button className="ru-ctl jump" aria-label={t("ru.jump")} onPointerDown={jump}><img src="rush/ui/ctl-jump.webp" alt="" draggable={false} /><span>{t("ru.jump")}</span></button>
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
