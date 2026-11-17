/**
 * Runs one activity: tutorial → questions → celebration.
 * Mo leads every step: he asks (spoken + written), reacts to answers,
 * explains gently after a mistake, and celebrates at the end.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { activityById } from "../content/activities";
import { GameSession, type SessionResult } from "../engine/session";
import { applyResult, totalStars } from "../engine/progress";
import { newlyEarned, STICKERS } from "../content/rewards";
import { useStore } from "../state";
import { go, href } from "../router";
import { Guide } from "../ui/Guide";
import { Icon } from "../ui/Icon";
import { Confetti, Modal, Stars } from "../ui/Common";
import { Character, preloadPoses } from "../ui/Character";
import { Clock, useTweenTime } from "../ui/Clock";
import { Visual } from "../ui/Visual";
import { sfx, stopSpeech, haptic } from "../platform/audio";
import { msg, type Msg } from "../i18n/types";
import { int, randomRng } from "../engine/rng";
import { burst, centerOf, flyStar, HintHand, lastTouch, type HandPlan } from "../ui/Fx";
import { handAngles } from "../engine/time";
import type { ActivityDef, Question, TutorialStep } from "../engine/types";
import type { PlayerProps } from "../games/types";
import { ChoicePlayer } from "../games/ChoicePlayer";
import { SetClockPlayer } from "../games/SetClockPlayer";
import { SequencePlayer } from "../games/SequencePlayer";
import { SortPlayer } from "../games/SortPlayer";
import { ClockNumbersPlayer, ClockTapPlayer } from "../games/ClockPlayers";
import { CalendarFillPlayer, CalendarTapPlayer, CountdownPlayer } from "../games/CalendarPlayers";
import { DayExplorerPlayer } from "../games/DayExplorerPlayer";
import { TimerPlayer } from "../games/TimerPlayer";

const CHEER_POSES = ["mo-yes", "mo-yeyy", "mo-thumbs", "mo-ok", "mo-giggle", "mo-alright", "mo-jump"];
const HELP_POSES = ["mo-think", "mo-idea", "mo-wonder", "mo-shrug"];
const ASK_POSE: Partial<Record<Question["type"], string>> = {
  "set-clock": "mo-point", "clock-tap": "mo-point", "clock-numbers": "mo-hand-up", "calendar-tap": "mo-present", "calendar-fill": "mo-idea",
  countdown: "ais-gift", sequence: "mo-present", sort: "mo-lean", timer: "mo-hand-up", "day-explorer": "mo-point",
};

function Player(props: PlayerProps & { k: number }) {
  const { q } = props;
  switch (q.type) {
    case "choice": return <ChoicePlayer {...(props as PlayerProps<typeof q>)} />;
    case "set-clock": return <SetClockPlayer {...(props as PlayerProps<typeof q>)} />;
    case "sequence": return <SequencePlayer {...(props as PlayerProps<typeof q>)} />;
    case "sort": return <SortPlayer {...(props as PlayerProps<typeof q>)} />;
    case "clock-tap": return <ClockTapPlayer {...(props as PlayerProps<typeof q>)} />;
    case "clock-numbers": return <ClockNumbersPlayer {...(props as PlayerProps<typeof q>)} />;
    case "calendar-tap": return <CalendarTapPlayer {...(props as PlayerProps<typeof q>)} />;
    case "calendar-fill": return <CalendarFillPlayer {...(props as PlayerProps<typeof q>)} />;
    case "countdown": return <CountdownPlayer {...(props as PlayerProps<typeof q>)} />;
    case "day-explorer": return <DayExplorerPlayer {...(props as PlayerProps<typeof q>)} />;
    case "timer": return <TimerPlayer {...(props as PlayerProps<typeof q>)} />;
  }
}

export function Play({ id }: { id: string }) {
  const def = activityById(id);
  useEffect(() => {
    if (!def) go({ name: "games" }, true);
  }, [def]);
  if (!def) return null;
  return <PlayInner def={def} key={id} />;
}

type Phase = "intro" | "play" | "done";

function PlayInner({ def }: { def: ActivityDef }) {
  const { p, update, t, say, device } = useStore();
  const ap = p.activities[def.id];
  const seen = p.tutorialsSeen.includes(def.id);
  const [phase, setPhase] = useState<Phase>(seen ? "play" : "intro");
  const [round, setRound] = useState(0); // bump to restart a whole session
  const session = useMemo(() => new GameSession(def, ap?.level || def.startLevel || 1), [def, round]); // eslint-disable-line react-hooks/exhaustive-deps
  const [qi, setQi] = useState(0);
  const [hints, setHints] = useState(0);
  const [solved, setSolved] = useState(false);
  const [line, setLine] = useState<Msg | null>(null);
  const [pose, setPose] = useState<string>(def.pose);
  const [anim, setAnim] = useState<"bob" | "pop" | "cheer" | "shake">("pop");
  const [result, setResult] = useState<SessionResult | null>(null);
  const [newSt, setNewSt] = useState<string[]>([]);
  const [leaving, setLeaving] = useState(false);
  const rng = useRef(randomRng());
  const q = session.question;
  const twoPane = device.twoPane;

  useEffect(() => {
    preloadPoses([...CHEER_POSES, ...HELP_POSES, ...def.tutorial.map((s) => s.pose)]);
    return () => stopSpeech();
  }, [def]);

  // ask each new question
  useEffect(() => {
    if (phase !== "play") return;
    setHints(0);
    setSolved(false);
    setLine(q.prompt);
    setPose(q.pose || ASK_POSE[q.type] || def.pose);
    setAnim("pop");
    const id = setTimeout(() => say(q.prompt), 250);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, qi, round]);

  const onMiss = useCallback(
    (custom?: Msg) => {
      session.miss();
      setHints((h) => h + 1);
      const fb = msg("fb.wrong." + int(rng.current, 1, 3));
      const help = custom || q.hint;
      setLine(help);
      setPose(HELP_POSES[int(rng.current, 0, HELP_POSES.length - 1)]);
      setAnim("shake");
      say(t(fb, "say") + " " + t(help, "say"));
    },
    [session, q, say, t],
  );

  const onSolve = useCallback(
    (custom?: Msg) => {
      setSolved(true);
      burst(lastTouch.x, lastTouch.y);
      flyStar(lastTouch.x, lastTouch.y, document.querySelector(".play-top .dots i.now"));
      setPose(CHEER_POSES[int(rng.current, 0, CHEER_POSES.length - 1)]);
      setAnim("cheer");
      const fb = msg("fb.correct." + int(rng.current, 1, 6));
      setLine(custom || fb);
      haptic("success");
      say(custom ? t(fb, "say") + " " + t(custom, "say") : fb);
    },
    [say, t],
  );

  const next = () => {
    stopSpeech();
    sfx("tap");
    const over = session.solve();
    if (!over) {
      setQi((x) => x + 1);
      return;
    }
    const r = session.result();
    setResult(r);
    const earned = newlyEarned(applyResult(p, r));
    update((prev) => {
      let nx = applyResult(prev, r);
      if (!nx.tutorialsSeen.includes(def.id)) nx = { ...nx, tutorialsSeen: [...nx.tutorialsSeen, def.id] };
      const add = earned.filter((e) => !nx.stickers.includes(e));
      if (add.length) nx = { ...nx, stickers: [...nx.stickers, ...add], newStickers: [...nx.newStickers, ...add] };
      return nx;
    });
    setNewSt(earned);
    setPhase("done");
    sfx("fanfare");
    setPose("mo-yeyy");
    say("play.doneTitle");
  };

  const again = () => {
    setResult(null);
    setNewSt([]);
    setQi(0);
    setRound((r) => r + 1);
    setPhase("play");
  };

  // Hint hand: after two misses it points at the answer; on the very first
  // question, if the child does nothing for a while, it shows how to drag.
  const [hand, setHand] = useState<HandPlan | null>(null);
  useEffect(() => {
    setHand(null);
    if (phase !== "play" || solved) return;
    let idle = 0;
    const show = (strong: boolean) => {
      const plan = handPlan(q, strong);
      if (plan) setHand(plan);
    };
    if (hints >= 2) {
      const id = setTimeout(() => show(true), 700);
      return () => clearTimeout(id);
    }
    if (qi === 0 && hints === 0) {
      const arm = () => {
        clearTimeout(idle);
        setHand(null);
        idle = window.setTimeout(() => show(false), 7000);
      };
      arm();
      window.addEventListener("pointerdown", arm);
      return () => {
        clearTimeout(idle);
        window.removeEventListener("pointerdown", arm);
      };
    }
  }, [phase, solved, hints, qi, q]);

  // QA hook for automated play-through tests (only with ?qa in the URL)
  useEffect(() => {
    if (!/[?&]qa\b/.test(location.search)) return;
    (window as unknown as { __qa: unknown }).__qa = { q, phase, solved, solve: () => onSolve(), next };
  });

  const progressDots = (
    <div className="dots" aria-label={t({ k: "play.of", p: { a: Math.min(qi + 1, def.rounds), b: def.rounds } })}>
      {Array.from({ length: def.rounds }, (_, i) => <i key={i} className={i < qi || (i === qi && solved) ? "on" : i === qi ? "now" : ""} />)}
    </div>
  );

  const header = (
    <header className="play-top">
      <button className="icon-btn" onClick={() => (phase === "play" && qi > 0 ? setLeaving(true) : go({ name: "world", world: def.world }))} aria-label={t("nav.close")}>
        <Icon name="close" />
      </button>
      <div className="grow">
        <h1 className="play-title">{t(def.title)}</h1>
        {phase === "play" && progressDots}
      </div>
      {phase === "play" && (
        <button className="icon-btn" onClick={() => setPhase("intro")} aria-label={t("fb.hint")} title={t("fb.hint")}>
          <Icon name="hint" />
        </button>
      )}
    </header>
  );

  if (phase === "intro")
    return (
      <div className="page play no-nav">
        {header}
        <Tutorial def={def} twoPane={twoPane} onDone={() => setPhase("play")} />
      </div>
    );

  if (phase === "done" && result)
    return (
      <div className="page play no-nav">
        {header}
        <Celebrate def={def} result={result} stickers={newSt} onAgain={again} total={totalStars(p)} />
      </div>
    );

  const guideH = twoPane ? Math.min(240, device.h * 0.32) : device.size === "phone-land" ? 90 : Math.min(120, device.h * 0.14);
  return (
    <div className={`page play no-nav ${twoPane ? "two-pane" : ""}`}>
      {header}
      <div className="play-body">
        <aside className="play-guide">
          <Guide pose={pose} text={line || q.prompt} h={guideH} anim={anim} layout={twoPane ? "stack" : "side"}
            onReplay={() => say(line || q.prompt)} />
        </aside>
        <main className="play-board" key={qi + "-" + round}>
          <Player q={q} hints={hints} onMiss={onMiss} onSolve={onSolve} solved={solved} k={qi} />
        </main>
      </div>
      {solved && (
        <div className="next-bar rise">
          <button className="btn big" onClick={next} autoFocus>
            {t("play.next")} <Icon name="next" />
          </button>
        </div>
      )}
      {solved && <Confetti n={14} />}
      {hand && !solved && <HintHand plan={hand} key={JSON.stringify(hand)} />}
      {leaving && (
        <Modal label={t("play.leave")} onClose={() => setLeaving(false)}>
          <div className="leave">
            <Character id="mo-oh" h={120} />
            <h2>{t("play.leave")}</h2>
            <div className="row-btns">
              <button className="btn" onClick={() => setLeaving(false)}>{t("play.keepGoing")}</button>
              <a className="btn ghost" href={href({ name: "world", world: def.world })}>{t("nav.back")}</a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

function Tutorial({ def, twoPane, onDone }: { def: ActivityDef; twoPane: boolean; onDone: () => void }) {
  const { t, say, device } = useStore();
  const guideH = twoPane ? Math.min(220, Math.max(100, device.h * 0.3)) : Math.min(150, device.h * 0.18);
  const [i, setI] = useState(0);
  const step = def.tutorial[i];
  useEffect(() => {
    const id = setTimeout(() => say(step.say), 200);
    return () => clearTimeout(id);
  }, [i, step, say]);
  const last = i === def.tutorial.length - 1;
  return (
    <div className={`tutorial ${twoPane ? "two-pane" : ""}`}>
      <div className="tut-guide">
        <Guide pose={step.pose} text={step.say} h={guideH} anim="pop" layout={twoPane ? "stack" : "side"} key={i} />
      </div>
      <div className="tut-demo">{step.demo && <Demo demo={step.demo} key={i} />}</div>
      <div className="tut-actions">
        <button className="btn ghost small" onClick={() => (stopSpeech(), onDone())}>{t("play.skipIntro")}</button>
        <div className="dots">{def.tutorial.map((_, k) => <i key={k} className={k === i ? "now" : k < i ? "on" : ""} />)}</div>
        <button className="btn big" onClick={() => (sfx("tap"), last ? (stopSpeech(), onDone()) : setI(i + 1))}>
          {last ? t("play.start") : t("play.next")} <Icon name={last ? "play" : "next"} />
        </button>
      </div>
    </div>
  );
}

function Demo({ demo }: { demo: NonNullable<TutorialStep["demo"]> }) {
  if (demo.v === "clock" && "from" in demo) return <DemoClock from={demo.from} to={demo.to} />;
  return <div className="demo-visual"><Visual v={demo as never} size="l" /></div>;
}
function DemoClock({ from, to }: { from: number; to: number }) {
  const [play, setPlay] = useState(true);
  const [n, setN] = useState(0);
  const t = useTweenTime(from, to, 3200, play, 700);
  useEffect(() => {
    // loop the demo gently
    const id = setTimeout(() => {
      setPlay(false);
      setTimeout(() => (setPlay(true), setN((x) => x + 1)), 400);
    }, 5200);
    return () => clearTimeout(id);
  }, [n]);
  return <Clock t={t} size="min(70vw, 40vh, 340px)" digital fiveRing={to % 60 !== 0} />;
}

function Celebrate({ def, result, stickers, onAgain, total }: { def: ActivityDef; result: SessionResult; stickers: string[]; onAgain: () => void; total: number }) {
  const { t } = useStore();
  const st = STICKERS.filter((s) => stickers.includes(s.id));
  const friend = def.world === "calendar" ? "ais-jump" : def.world === "challenge" ? "adam-cheer" : def.world === "routine" ? "ais-arms-wide" : "ais-cheer";
  return (
    <div className="celebrate">
      <Confetti n={34} />
      <div className="cele-stage card">
        <div className="sunburst" aria-hidden="true" />
        <div className="cele-chars">
          <Character id="mo-yeyy" h={190} anim="cheer" />
          <Character id={friend} h={190} anim="cheer" className="cele-friend" />
        </div>
        <h2>{t("play.doneTitle")}</h2>
        <div className="cele-stars"><Stars n={result.stars} size={64} /></div>
        <p>{t({ k: "play.doneStars", p: { n: result.stars } })} · ⭐ {total}</p>
        {st.map((s) => (
          <div key={s.id} className="new-sticker pop-in">
            <span className={`sticker bg-${s.bg}`}><Character id={s.pose} h={70} /></span>
            <div><small>{t("play.newSticker")}</small><b>{t(s.title)}</b></div>
          </div>
        ))}
      </div>
      <div className="row-btns">
        <button className="btn orange big" onClick={onAgain}><Icon name="replay" /> {t("play.again")}</button>
        <a className="btn big" href={href({ name: "world", world: def.world })}>{t("play.more")} <Icon name="next" /></a>
      </div>
    </div>
  );
}

/** Where the hint hand should go for this question (null = no hand). */
function handPlan(q: Question, strong: boolean): HandPlan | null {
  const board = document.querySelector(".play-board");
  if (!board) return null;
  if (q.type === "set-clock") {
    const svg = board.querySelector(".clock-stage svg");
    if (!svg) return null;
    const r = svg.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const angleOf = (sel: string) => Number(board.querySelector(sel)?.getAttribute("transform")?.match(/rotate\(([-\d.]+)/)?.[1] || 0);
    // drag the hand that still needs to move: if the minutes are already right, it's the short hand
    const minuteRight = Math.abs(angleOf(".clock-stage .hand.minute") - handAngles(q.target).minute) < 1;
    const useHour = q.lock === "minute" || q.check === "hour" || (strong && q.check === "full" && minuteRight);
    const rad = (r.width / 2) * (useHour ? 40 / 110 : 62 / 110);
    const cur = angleOf(useHour ? ".clock-stage .hand.hour" : ".clock-stage .hand.minute");
    const target = strong ? (useHour ? handAngles(q.target).hour : handAngles(q.target).minute) : cur + 90;
    let to = target;
    while (to <= cur + 1) to += 360;
    if (to - cur > 360) to -= 360;
    const pts: [number, number][] = [];
    for (let k = 0; k <= 12; k++) {
      const a = ((cur + ((to - cur) * k) / 12) * Math.PI) / 180;
      pts.push([cx + Math.sin(a) * rad, cy - Math.cos(a) * rad]);
    }
    return { kind: "drag", path: pts };
  }
  if (q.type === "day-explorer") {
    const inp = board.querySelector(".dayline input");
    if (!inp) return null;
    const r = inp.getBoundingClientRect();
    return { kind: "drag", path: [[r.left + r.width * 0.25, r.top + r.height / 2], [r.left + r.width * 0.7, r.top + r.height / 2]] };
  }
  if (q.type === "sequence" || q.type === "sort" || q.type === "calendar-fill") {
    // always demonstrate a CORRECT move, so the hint never teaches a wrong order
    let id = "", to: [number, number] | null = null;
    if (q.type === "sequence") {
      const next = Array.from(board.querySelectorAll(".slot")).findIndex((el) => !el.classList.contains("filled"));
      if (next < 0) return null;
      id = q.items[next].id;
      to = centerOf(".slot.next", board);
    } else if (q.type === "sort") {
      const it = q.items.find((x) => board.querySelector(`.tray .tile[data-id="${x.id}"]`));
      if (!it) return null;
      id = it.id;
      to = centerOf(`.bin[data-drop="${it.bin}"]`, board);
    } else {
      const n = q.missing.find((x) => board.querySelector(`.tray .tile[data-id="${x}"]`));
      if (n == null) return null;
      id = String(n);
      to = centerOf(`.cal-cell[data-drop="${n}"]`, board);
    }
    const from = centerOf(`.tray .tile[data-id="${id}"]`, board);
    return from && to ? { kind: "drag", path: [from, to] } : null;
  }
  if (!strong) return null;
  const at = centerOf(".glow", board);
  return at ? { kind: "tap", at } : null;
}
