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

function Ring({ k, label, hidden }: { k: number; label: string; hidden?: boolean }) {
  const r = 54, c = 2 * Math.PI * r;
  return (
    <div className={"ring " + (hidden ? "hidden" : "")}>
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
        setTimeout(() => onSolve(), 900);
      }
    }
  }, [sec, phase, blind, q.seconds, lang, onSolve]);

  const start = () => {
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
      onMiss(m);
      // still a finished round: let the child go on after hearing the feedback
      setTimeout(() => onSolve(m), 2600);
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
        {phase === "done" && !solved && blind && <button className="btn ghost" onClick={start}>{t("timer.again")}</button>}
      </div>
    </div>
  );
}

interface Thing { id: number; x: number; y: number; kind: number; born: number; gone?: boolean }
const TOYS = ["ball", "block", "car", "duck", "star"];

function Tapper({ q, onSolve, solved }: PlayerProps<Of<"timer">>) {
  const { t } = useStore();
  const [phase, setPhase] = useState<"ready" | "run" | "done">("ready");
  const [ms] = useTicker(phase === "run");
  const [things, setThings] = useState<Thing[]>([]);
  const [score, setScore] = useState(0);
  const nextId = useRef(1);
  const rng = useRef(randomRng());
  const left = Math.max(0, q.seconds - ms / 1000);
  const pop = q.mode === "pop";

  // spawn
  useEffect(() => {
    if (phase !== "run") return;
    const id = setInterval(() => {
      setThings((th) => {
        const alive = th.filter((x) => !x.gone && performance.now() - x.born < (pop ? 6000 : 60000));
        if (alive.length >= (pop ? 7 : 6)) return alive;
        const r = rng.current;
        return [...alive, { id: nextId.current++, x: 8 + r() * 76, y: pop ? 100 : 20 + r() * 52, kind: Math.floor(r() * 5), born: performance.now() }];
      });
    }, pop ? 520 : 700);
    return () => clearInterval(id);
  }, [phase, pop]);
  // end
  useEffect(() => {
    if (phase === "run" && left <= 0) {
      setPhase("done");
      sfx("fanfare");
      setTimeout(() => onSolve(msg(pop ? "timer.popped" : "timer.tidied", { n: { num: score } })), 400);
    }
    if (phase === "run" && left <= 5 && Math.ceil(left) !== Math.ceil(left + 0.05)) sfx("tick");
  }, [left, phase, pop, score, onSolve]);

  const hit = (id: number) => {
    if (phase !== "run") return;
    setThings((th) => th.map((x) => (x.id === id ? { ...x, gone: true } : x)));
    setScore((s) => s + 1);
    sfx(pop ? "pop" : "whoosh");
    haptic("light");
  };
  return (
    <div className={"board timer tapper " + q.mode}>
      <div className="tapper-top">
        <Ring k={left / q.seconds} label={String(Math.ceil(left))} />
        <div className="score pill"><Icon name="star" size={22} /> {score}</div>
      </div>
      <div className="play-field card">
        {!pop && (
          <div className="toybox" aria-hidden="true">
            <svg viewBox="0 0 90 60"><rect x="4" y="14" width="82" height="42" rx="10" fill="#ff9a3d" /><rect x="0" y="6" width="90" height="16" rx="8" fill="#ffb366" /><path d="M30 34 h30" stroke="#fff" strokeWidth="6" strokeLinecap="round" /></svg>
          </div>
        )}
        {things.map((th) => (
          <button
            key={th.id}
            className={`thing ${pop ? "bubble-b" : "toy t-" + TOYS[th.kind]} ${th.gone ? "gone" : ""}`}
            style={{ left: th.x + "%", top: pop ? undefined : th.y + "%", animationDuration: pop ? 5 + (th.id % 3) + "s" : undefined, ["--hue" as string]: (th.id * 47) % 360 }}
            onPointerDown={() => hit(th.id)}
            aria-label={pop ? "bubble" : TOYS[th.kind]}
          >
            {!pop && <ToyArt kind={TOYS[th.kind]} />}
          </button>
        ))}
        {phase === "ready" && (
          <div className="field-cta">
            <button className="btn big" onClick={() => (setPhase("run"), sfx("go"))}><Icon name="play" /> {t("timer.start")}</button>
          </div>
        )}
        {phase === "done" && <div className="field-cta pop-in"><b className="big-score">{score}</b></div>}
      </div>
      {solved && null}
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
