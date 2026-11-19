import { useEffect, useRef, useState } from "react";
import { useR, accuracy } from "../state";
import { RaceGame, type HudState, type RaceSummary } from "../game/RaceGame";
import { pickQuality, webglAvailable } from "../game/engine";
import { levelById } from "../content/levels";
import { kartById, racerById } from "../content/racers";
import type { RaceQuestion } from "../core/questions";
import { Clock, Digital } from "../../ui/Clock";
import { Character, preloadPoses } from "../../ui/Character";
import { Icon } from "../../ui/Icon";
import { BigBtn, CoinIcon, StopwatchIcon } from "../ui/Kit";
import { DAYS, MONTHS } from "../../i18n/words";
import { digital } from "../../engine/time";
import { sfx, speak, stopSpeech, haptic, unlockAudio } from "../../platform/audio";
import { go } from "../router";
import { DAY_COLORS } from "../game/world";
import { burst } from "../../ui/Fx";

export interface FinishedRace { levelId: string; summary: RaceSummary }

export function RaceScreen({ levelId, onFinish }: { levelId: string; onFinish: (r: FinishedRace) => void }) {
  const { p, t, lang } = useR();
  const lv = levelById(levelId);
  const canvas = useRef<HTMLCanvasElement>(null);
  const game = useRef<RaceGame | null>(null);
  const [ready, setReady] = useState(false);
  const [fail, setFail] = useState(false);
  const [count, setCount] = useState<number | "go" | null>(null);
  const [hud, setHud] = useState<HudState | null>(null);
  const [q, setQ] = useState<RaceQuestion | null>(null);
  const [mode, setMode] = useState<"panel" | "gates">("panel");
  const [wrong, setWrong] = useState<number[]>([]);
  const [right, setRight] = useState<number | null>(null);
  const [toast, setToast] = useState<{ text: string; k: number } | null>(null);
  const [pose, setPose] = useState<"idle" | "cheer" | "think">("idle");
  const [paused, setPaused] = useState(false);
  const [portrait, setPortrait] = useState(false);
  const racer = racerById(p.racer);
  const toastT = useRef<number>();

  const say = (text: string) => p.settings.voice && speak(text, lang);
  const showToast = (text: string) => {
    setToast({ text, k: Date.now() });
    clearTimeout(toastT.current);
    toastT.current = window.setTimeout(() => setToast(null), 1300);
  };

  useEffect(() => {
    if (!lv) return go("map", true);
    if (!canvas.current) return;
    if (!webglAvailable()) {
      setFail(true);
      return;
    }
    preloadPoses([racer.poses.cheer, racer.poses.think, racer.poses.idle]);
    let g: RaceGame | null = null;
    let cancelled = false;
    // make sure the rounded font is ready before track signs are painted
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    (fonts ? fonts.load("700 40px Fredoka").catch(() => null) : Promise.resolve(null)).then(() => {
      if (cancelled || !canvas.current) return;
      try {
        g = new RaceGame(canvas.current, {
          level: lv, racer, kart: kartById(p.kart), paint: p.paints[p.kart], junior: p.settings.junior,
          quality: pickQuality(p.settings.quality), lang, startDifficulty: p.difficulty[lv.family] ?? 1,
          aiBoost: 0.97 + accuracy(p) * 0.06, sound: p.settings.sound,
        }, {
          onReady: () => setReady(true),
          onCountdown: (n) => {
            setCount(n);
            sfx(n === "go" ? "go" : "beep");
            if (n === "go") window.setTimeout(() => setCount(null), 700);
          },
          onQuestion: (qq, m) => {
            setQ(qq);
            setMode(m);
            setWrong([]);
            setRight(null);
            if (qq) {
              setPose("think");
              sfx("whoosh");
              say(t(qq.prompt, "say"));
            } else setPose("idle");
          },
          onFeedback: (kind, qq, combo) => {
            if (kind === "correct") {
              setRight(qq.answer);
              setPose("cheer");
              sfx("correct");
              haptic("success");
              showToast(combo > 1 ? t({ k: "r.combo", p: { n: combo } }) : t("r.turboGo"));
              say(t("r.great", "say"));
              window.setTimeout(() => setPose("idle"), 1800);
            } else {
              sfx("gentle");
              setPose("think");
              say(t("r.tryAgain", "say") + " " + t(qq.explain, "say"));
            }
          },
          onHud: setHud,
          onToast: (kind, n) => {
            if (kind === "lap") { sfx("star"); showToast(t({ k: "r.lap", p: { a: n, b: lv.laps } })); }
            if (kind === "overtake") { showToast(t("r.overtake")); sfx("snap"); }
            if (kind === "pickup") sfx("pop");
            if (kind === "turbo") sfx("whoosh");
          },
          onFinish: (s) => {
            sfx("fanfare");
            window.setTimeout(() => onFinish({ levelId, summary: s }), 1400);
          },
          onError: () => setFail(true),
        });
        game.current = g;
      } catch {
        setFail(true);
      }
    });
    return () => {
      cancelled = true;
      stopSpeech();
      g?.dispose();
      game.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelId]);

  // phones: suggest landscape (never block)
  useEffect(() => {
    const check = () => setPortrait(innerHeight > innerWidth && innerWidth < 600 && !p.settings.rotateOk);
    check();
    addEventListener("resize", check);
    return () => removeEventListener("resize", check);
  }, [p.settings.rotateOk]);
  const [rotateOk, setRotateOk] = useState(false);
  useEffect(() => game.current?.setPaused(paused || (portrait && !rotateOk)), [paused, portrait, rotateOk]);

  // QA hook for automated tests (?qa in the URL)
  useEffect(() => {
    if (/[?&]qa/.test(location.search)) (window as unknown as { __rqa: unknown }).__rqa = { q, mode, hud, ready };
  });
  const pick = (i: number, e?: React.MouseEvent) => {
    unlockAudio();
    game.current?.startAudio();
    if (!q || right != null) return;
    if (mode === "gates") {
      // tapping steers into that lane (the gate decides)
      game.current?.steerToLane(i);
      sfx("tap");
      return;
    }
    const ok = game.current?.answer(i);
    if (ok && e) burst(e.clientX, e.clientY);
    if (!ok) setWrong((w) => [...w, i]);
  };
  const hold = (dir: number) => ({
    onPointerDown: (e: React.PointerEvent) => { (e.target as Element).setPointerCapture?.(e.pointerId); unlockAudio(); game.current?.startAudio(); game.current?.setTouch(dir); },
    onPointerUp: () => game.current?.setTouch(0),
    onPointerCancel: () => game.current?.setTouch(0),
    onPointerLeave: () => game.current?.setTouch(0),
  });

  if (fail)
    return (
      <div className="r-screen r-fail">
        <Character id="mo-shrug" h={200} />
        <p>{t("r.webglMissing")}</p>
        <BigBtn onClick={() => go("map")}>{t("r.back")}</BigBtn>
      </div>
    );

  const poseId = pose === "cheer" ? racer.poses.cheer : pose === "think" ? racer.poses.think : racer.poses.idle;
  return (
    <div className={"r-screen r-race " + (q ? "has-q " + mode : "")} onPointerDown={() => { unlockAudio(); game.current?.startAudio(); }}>
      <canvas ref={canvas} className="r-canvas" touch-action="none" />
      {!ready && <div className="r-loading"><Character id="mo-run" h={140} anim="bob" /><p>{t("r.loading")}</p></div>}

      {hud && (
        <div className="r-hud">
          <div className="r-hud-pos">
            <b>{hud.position}<small>/{hud.racers}</small></b>
            <span>{t({ k: "r.lap", p: { a: hud.lap, b: hud.laps } })}</span>
            <i className="r-prog"><em style={{ width: hud.progress * 100 + "%" }} /></i>
          </div>
          <div className="r-hud-right">
            <span className="r-pill"><CoinIcon size={22} /> {hud.coins}</span>
            <span className="r-pill time"><StopwatchIcon size={26} /> {fmt(hud.time)}</span>
            <button className="r-pause" onClick={() => setPaused(true)} aria-label={t("r.pause")}>❚❚</button>
          </div>
        </div>
      )}

      {count != null && <div className={"r-count " + (count === "go" ? "go" : "")} key={String(count)}>{count === "go" ? t("r.go") : count}</div>}
      {toast && <div className="r-toast" key={toast.k}>{toast.text}</div>}
      {hud && hud.boost > 0 && <div className="r-speedlines" aria-hidden="true" />}

      {/* question */}
      {q && (
        <div className={"r-q " + mode} role="dialog" aria-live="polite">
          <div className="r-q-guide"><Character id={poseId} h={175} crop="upper" anim={pose === "cheer" ? "cheer" : "pop"} key={poseId} /></div>
          <div className="r-q-card">
            <div className="r-q-title">{mode === "gates" ? <>{t(q.prompt)} <small>{t(p.settings.junior ? "r.tapGate" : "r.driveGate")}</small></> : t(q.prompt)}</div>
            <div className="r-q-body">
              <QVisualView q={q} />
              <div className={"r-q-opts n" + q.options.length}>
                {q.options.map((o, i) => (
                  <button key={i} className={"r-opt " + (right === i ? "right " : "") + (wrong.includes(i) ? "wrong " : "") + (mode === "gates" ? "gate g" + i : "")}
                    style={mode === "gates" && o.kind === "day" ? { ["--gc" as string]: DAY_COLORS[o.d] } : undefined}
                    onClick={(e) => pick(i, e)} disabled={wrong.includes(i)}>
                    <OptionView o={o} lang={lang} />
                  </button>
                ))}
              </div>
            </div>
            {wrong.length > 0 && mode === "panel" && <p className="r-q-explain">{t(q.explain)}</p>}
          </div>
        </div>
      )}

      {/* controls */}
      <div className="r-controls">
        <div className="r-steer">
          <button className="r-arrow" {...hold(1)} aria-label="left">◀</button>
          <button className="r-arrow" {...hold(-1)} aria-label="right">▶</button>
        </div>
        <button className={"r-turbo " + ((hud?.charges ?? 0) > 0 ? "ready" : "")} onClick={() => game.current?.turbo()} aria-label={t("r.turbo")}>
          <svg viewBox="0 0 24 24" width="44" height="44" aria-hidden="true"><path d="M13.5 2 5 13.5h6L9.5 22 19 9.5h-6.2z" fill="#fff" stroke="#ffd23f" strokeWidth="1" strokeLinejoin="round" /></svg>
          {(hud?.charges ?? 0) > 0 && <b>{hud!.charges}</b>}
        </button>
      </div>

      {paused && (
        <div className="r-modal-scrim">
          <div className="r-modal">
            <Character id={racer.poses.wave} h={130} />
            <BigBtn color="green" onClick={() => setPaused(false)}><Icon name="play" /> {t("r.resume")}</BigBtn>
            <BigBtn color="white" onClick={() => go("levels/" + (lv?.world ?? "clock-town"))}>{t("r.quit")}</BigBtn>
          </div>
        </div>
      )}
      {portrait && !rotateOk && ready && (
        <div className="r-modal-scrim">
          <div className="r-modal rotate">
            <div className="r-rotate-phone" aria-hidden="true" />
            <p>{t("r.rotate")}</p>
            <BigBtn color="white" onClick={() => setRotateOk(true)}>{t("r.playAnyway")}</BigBtn>
          </div>
        </div>
      )}
    </div>
  );
}

const fmt = (s: number) => {
  const m = Math.floor(s / 60), r = Math.floor(s % 60);
  return String(m).padStart(2, "0") + ":" + String(r).padStart(2, "0");
};

function QVisualView({ q }: { q: RaceQuestion }) {
  const { lang } = useR();
  const v = q.visual;
  if (v.kind === "clock") return <div className="r-q-clock"><Clock t={v.t} size="100%" lit={v.lit} className={v.hands === false ? "no-hands" : ""} /></div>;
  if (v.kind === "digital") return <div className="r-q-digital"><Digital t={v.t} size="l" /></div>;
  if (v.kind === "days")
    return (
      <div className="r-q-seq">
        {v.days.map((d, i) => (
          <span key={i} className={"r-seq " + (d == null ? "q" : "")} style={d != null ? { ["--gc" as string]: DAY_COLORS[d] } : undefined}>
            {d == null ? "?" : DAYS[lang][d]}
          </span>
        ))}
      </div>
    );
  return (
    <div className="r-q-seq">
      {v.months.map((m, i) => <span key={i} className={"r-seq " + (m == null ? "q" : "")}>{m == null ? "?" : MONTHS[lang][m]}</span>)}
    </div>
  );
}
function OptionView({ o, lang }: { o: RaceQuestion["options"][number]; lang: "en" | "id" }) {
  switch (o.kind) {
    case "time": return <span className="r-opt-time">{digital(o.t)}</span>;
    case "face": return <span className="r-opt-face"><Clock t={o.t} size={74} /></span>;
    case "number": return <span className="r-opt-num">{o.n}</span>;
    case "day": return <span>{DAYS[lang][o.d]}</span>;
    case "month": return <span>{MONTHS[lang][o.m]}</span>;
  }
}
