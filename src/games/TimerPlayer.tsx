/**
 * Duration games. Nothing here is a race against failure: the timer only
 * frames the activity, and every result is celebrated.
 *  - estimate: count 10 s together (visible), then try with the timer hidden
 *  - pop:      pop bubbles for 30 s
 *  - tidy:     tidy toys into the box for 60 s
 */
import { useEffect, useRef, useState } from "react";
import type { Of, PlayerProps } from "./types";
import { useStore } from "../state";
import { sfx, haptic, speak } from "../platform/audio";
import { numberWord } from "../i18n/words";
import { msg } from "../i18n/types";
import { keepAwake } from "../platform/device";
import { Icon } from "../ui/Icon";
import { randomRng } from "../engine/rng";
import { useLater } from "./useLater";

function Ring({ k, label, hidden, warn }: { k: number; label: string; hidden?: boolean; warn?: boolean }) {
  const r = 54, c = 2 * Math.PI * r;
  return (
    <div className={"ring " + (hidden ? "hidden" : "") + (warn ? " warn" : "")}>
      <svg viewBox="0 0 128 128" aria-hidden="true">
        <circle cx="64" cy="64" r={r} className="ring-bg" />
        <circle cx="64" cy="64" r={r} className="ring-fg" strokeDasharray={c} strokeDashoffset={c * (1 - k)} transform="rotate(-90 64 64)" />
      </svg>
      <b aria-live="off">{hidden ? "…" : label}</b>
    </div>
  );
}

function useTicker(running: boolean) {
  const [ms, setMs] = useState(0);
  const t0 = useRef(0);
  useEffect(() => {
    if (!running) return;
    t0.current = performance.now() - ms;
    let raf = 0;
    const loop = (now: number) => {
      setMs(now - t0.current);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    keepAwake(true);
    return () => {
      cancelAnimationFrame(raf);
      keepAwake(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);
  return [ms, setMs] as const;
}

export function TimerPlayer(props: PlayerProps<Of<"timer">>) {
  return props.q.mode === "estimate" ? <Estimate {...props} /> : <Tapper {...props} />;
}

function Estimate({ q, onMiss, onSolve, solved }: PlayerProps<Of<"timer">>) {
  const { t, lang } = useStore();
  const blind = q.prompt.k.endsWith(".blind");
  const [phase, setPhase] = useState<"ready" | "run" | "done">("ready");
  const [ms, setMs] = useTicker(phase === "run");
  const said = useRef(0);
  const sec = ms / 1000;
  const [result, setResult] = useState<number | null>(null);
  const later = useLater();
  const [far, setFar] = useState<ReturnType<typeof msg> | null>(null);

  // count out loud together (not in the blind round)
  useEffect(() => {
    if (phase !== "run" || blind) return;
    const s = Math.floor(sec);
    if (s > said.current && s <= q.seconds) {
      said.current = s;
      sfx("beep");
      speak(numberWord(s, lang), lang);
      if (s === q.seconds) {
        setPhase("done");
        setResult(q.seconds);
        sfx("fanfare");
        later(() => onSolve(), 900);
      }
    }
  }, [sec, phase, blind, q.seconds, lang, onSolve]);

  const start = () => {
    setFar(null);
    said.current = 0;
    setMs(0);
    setResult(null);
    setPhase("run");
    sfx("go");
  };
  const stop = () => {
    const s = Math.round(sec * 10) / 10;
    setResult(s);
    setPhase("done");
    const err = Math.abs(s - q.seconds);
    const key = err <= 1.5 ? "timer.result.close" : s < q.seconds ? "timer.result.short" : "timer.result.long";
    const m = msg(key, { s: String(s).replace(".", lang === "id" ? "," : "."), target: { num: q.seconds } });
    if (err <= 2) {
      sfx("correct");
      onSolve(m);
    } else {
      // gentle: hear how far off, then try again or carry on (no timer racing the buttons)
      setFar(m);
      onMiss(m);
    }
  };
  const k = Math.min(1, sec / q.seconds);
  const hidden = blind && phase === "run" && sec > 2;
  return (
    <div className="board timer estimate">
      <Ring k={phase === "done" && result != null ? Math.min(1, result / q.seconds) : k} label={phase === "ready" ? String(q.seconds) : (blind && phase === "run" ? Math.floor(sec) : Math.min(q.seconds, Math.floor(sec))).toString()} hidden={hidden} />
      {hidden && <p className="timer-note">{t("timer.hidden")}</p>}
      {!blind && phase === "run" && <p className="timer-note">{t("timer.count")}</p>}
      {result != null && <p className="timer-result pop-in"><b>{String(result).replace(".", lang === "id" ? "," : ".")}</b> {lang === "en" ? "seconds" : "detik"}</p>}
      <div className="timer-actions">
        {phase === "ready" && <button className="btn big" onClick={start}><Icon name="play" /> {t("timer.start")}</button>}
        {phase === "run" && blind && <button className="btn big orange" onClick={stop}>{t("timer.stop")}</button>}
        {phase === "done" && !solved && blind && far && (
          <>
            <button className="btn orange" onClick={start}><Icon name="replay" /> {t("timer.again")}</button>
            <button className="btn ghost" onClick={() => onSolve(far)}>{t("timer.next")} <Icon name="next" /></button>
          </>
        )}
      </div>
    </div>
  );
}

interface Thing { id: number; x: number; y: number; kind: number; born: number; dur: number; gone?: number }
const TOYS = ["ball", "block", "car", "duck", "star"];

function Tapper({ q, onSolve }: PlayerProps<Of<"timer">>) {
  const { t } = useStore();
  const [phase, setPhase] = useState<"ready" | "run" | "done">("ready");
  const [ms] = useTicker(phase === "run");
  const [things, setThings] = useState<Thing[]>([]);
  const [score, setScore] = useState(0);
  const [pops, setPops] = useState<{ id: number; x: number; y: number }[]>([]);
  const nextId = useRef(1);
  const rng = useRef(randomRng());
  const left = Math.max(0, q.seconds - ms / 1000);
  const lastTick = useRef(99);
  const later = useLater();
  const pop = q.mode === "pop";
  const now = performance.now();

  // spawn
  useEffect(() => {
    if (phase !== "run") return;
    const id = setInterval(() => {
      const t0 = performance.now();
      setThings((th) => {
        const alive = th.filter((x) => (x.gone ? t0 - x.gone < 500 : t0 - x.born < x.dur));
        if (alive.filter((x) => !x.gone).length >= (pop ? 7 : 6)) return alive;
        const r = rng.current;
        return [...alive, { id: nextId.current++, x: 6 + r() * 78, y: 20 + r() * 50, kind: Math.floor(r() * 5), born: t0, dur: pop ? 5200 + r() * 2200 : 60000 }];
      });
    }, pop ? 480 : 700);
    return () => clearInterval(id);
  }, [phase, pop]);
  // last five seconds tick, then finish
  useEffect(() => {
    if (phase !== "run") return;
    const s = Math.ceil(left);
    if (s <= 5 && s !== lastTick.current && s > 0) sfx("tick");
    lastTick.current = s;
    if (left <= 0) {
      setPhase("done");
      sfx("fanfare");
      const n = score;
      later(() => onSolve(msg(pop ? "timer.popped" : "timer.tidied", { n: { num: n } })), 400);
    }
  }, [left, phase, pop, score, onSolve]);

  /** bubble height above the floor (0..1), with a gentle sideways sway */
  const bubblePos = (th: Thing, at: number) => {
    const k = Math.min(1, ((th.gone ?? at) - th.born) / th.dur);
    return { y: 1.08 - k * 1.3, x: th.x + Math.sin((th.id + k * 6) * 1.3) * 3 };
  };
  const hit = (th: Thing) => {
    if (phase !== "run" || th.gone) return;
    const at = performance.now();
    setThings((ts) => ts.map((x) => (x.id === th.id ? { ...x, gone: at } : x)));
    setScore((s) => s + 1);
    if (pop) {
      const p = bubblePos(th, at);
      setPops((ps) => [...ps.slice(-6), { id: th.id, x: p.x, y: p.y }]);
    }
    sfx(pop ? "pop" : "whoosh");
    haptic("light");
  };
  return (
    <div className={"board timer tapper " + q.mode}>
      <div className="tapper-top">
        <Ring k={left / q.seconds} label={String(Math.ceil(left))} warn={phase === "run" && left <= 5} />
        <div className={"score pill " + (score ? "bump" : "")} key={score}><Icon name="star" size={22} /> {score}</div>
      </div>
      <div className="play-field card">
        {!pop && (
          <div className={"toybox " + (score ? "gulp" : "")} key={"box" + score} aria-hidden="true">
            <svg viewBox="0 0 90 60"><rect x="4" y="14" width="82" height="42" rx="10" fill="#ff9a3d" /><rect x="0" y="6" width="90" height="16" rx="8" fill="#ffb366" /><path d="M30 34 h30" stroke="#fff" strokeWidth="6" strokeLinecap="round" /></svg>
          </div>
        )}
        {pop && <div className="field-floor" aria-hidden="true" />}
        {things.map((th) => {
          if (pop) {
            const p = bubblePos(th, now);
            return (
              <button key={th.id} className={"thing bubble-b " + (th.gone ? "gone" : "")}
                style={{ left: p.x + "%", top: p.y * 100 + "%", ["--hue" as string]: (th.id * 47) % 360 }}
                onPointerDown={() => hit(th)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && hit(th)} aria-label="bubble" />
            );
          }
          return (
            <button key={th.id} className={`thing toy t-${TOYS[th.kind]} ${th.gone ? "gone" : ""}`} style={{ left: th.x + "%", top: th.y + "%" }}
              onPointerDown={() => hit(th)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && hit(th)} aria-label={TOYS[th.kind]}>
              <ToyArt kind={TOYS[th.kind]} />
            </button>
          );
        })}
        {pops.map((p) => (
          <span key={p.id} className="pop-ring" style={{ left: p.x + "%", top: p.y * 100 + "%" }} aria-hidden="true">
            {Array.from({ length: 8 }, (_, i) => <i key={i} style={{ ["--a" as string]: i * 45 + "deg" }} />)}
          </span>
        ))}
        {phase === "ready" && (
          <div className="field-cta">
            <button className="btn big" onClick={() => (setPhase("run"), sfx("go"))}><Icon name="play" /> {t("timer.start")}</button>
          </div>
        )}
        {phase === "done" && <div className="field-cta pop-in"><b className="big-score">{score}</b></div>}
      </div>
    </div>
  );
}

/** Simple clay-style toys drawn in SVG (no external art needed). */
function ToyArt({ kind }: { kind: string }) {
  switch (kind) {
    case "ball":
      return <svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="#ff8f7a" /><path d="M5 18 Q20 8 35 18" stroke="#fff" strokeWidth="4" fill="none" /><path d="M6 25 Q20 34 34 25" stroke="#ffd23f" strokeWidth="4" fill="none" /></svg>;
    case "block":
      return <svg viewBox="0 0 40 40"><rect x="5" y="5" width="30" height="30" rx="6" fill="#6cc4ff" /><text x="20" y="28" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff" fontFamily="Fredoka, sans-serif">A</text></svg>;
    case "car":
      return <svg viewBox="0 0 40 40"><rect x="4" y="16" width="32" height="12" rx="5" fill="#3cb55e" /><path d="M10 16 L15 9 H26 L31 16Z" fill="#7fd36d" /><circle cx="12" cy="29" r="5" fill="#2b3a2e" /><circle cx="28" cy="29" r="5" fill="#2b3a2e" /></svg>;
    case "duck":
      return <svg viewBox="0 0 40 40"><ellipse cx="19" cy="26" rx="15" ry="9" fill="#ffd23f" /><circle cx="27" cy="14" r="8" fill="#ffd23f" /><path d="M34 14 L39 16 L34 18Z" fill="#ff9a3d" /><circle cx="29" cy="12" r="1.6" fill="#2b3a2e" /></svg>;
    default:
      return <svg viewBox="0 0 40 40"><path d="M20 3l5 10 11 1.5-8 7.5 2 11-10-5.5-10 5.5 2-11-8-7.5L15 13z" fill="#b8a5ff" /></svg>;
  }
}
