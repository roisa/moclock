import { useState } from "react";
import type { Of, PlayerProps } from "./types";
import { Clock } from "../ui/Clock";
import { sfx, haptic, speak } from "../platform/audio";
import { useStore } from "../state";
import { numberWord } from "../i18n/words";
import type { ClockPart } from "../engine/types";
import { useLater } from "./useLater";
import { useRef } from "react";

/** Meet the clock: tap the part Mo asks for. */
export function ClockTapPlayer({ q, hints, onMiss, onSolve, solved }: PlayerProps<Of<"clock-tap">>) {
  const { t } = useStore();
  const [tapped, setTapped] = useState<ClockPart | null>(null);
  const tap = (part: ClockPart) => {
    if (solved) return;
    setTapped(part);
    if (part === q.part) {
      sfx("correct");
      haptic("success");
      onSolve(q.explain);
    } else {
      sfx("gentle");
      onMiss();
    }
  };
  return (
    <div className="board clock-tap">
      <div className="clock-stage">
        <Clock t={q.t} size="min(80vw, 50vh, 400px)" onPart={tap} highlight={solved ? q.part : hints >= 2 ? q.part : null}
          label={t({ k: "a11y.clock", p: { t: { time: q.t } } })} className={tapped && !solved ? "tapped" : ""} />
      </div>
    </div>
  );
}

/** Numbers 1–12: tap them in order, or find one. */
export function ClockNumbersPlayer({ q, hints, onMiss, onSolve, solved }: PlayerProps<Of<"clock-numbers">>) {
  const { lang } = useStore();
  const [lit, setLit] = useState<number[]>([]);
  const later = useLater();
  const done = useRef(false);
  const next = lit.length + 1;
  const tap = (n: number) => {
    if (solved || done.current) return;
    if (q.mode === "order") {
      if (lit.includes(n)) return;
      if (n === next) {
        const nl = [...lit, n];
        setLit(nl);
        sfx("pop");
        speak(numberWord(n, lang), lang);
        if (n === 12) {
          done.current = true;
          later(() => onSolve(), 700);
        }
      } else {
        sfx("gentle");
        onMiss();
      }
    } else if (n === q.target) {
      setLit([n]);
      sfx("correct");
      haptic("success");
      onSolve();
    } else {
      sfx("gentle");
      onMiss();
    }
  };
  const hintNum = hints >= 2 ? (q.mode === "order" ? next : q.target) : undefined;
  return (
    <div className="board clock-numbers">
      <div className="clock-stage">
        <Clock t={0} size="min(80vw, 50vh, 400px)" onNumber={tap} lit={hintNum && !lit.includes(hintNum) ? [...lit, hintNum] : lit} className="no-hands" />
      </div>
      {q.mode === "order" && <div className="count-strip">{lit.map((n) => <span key={n} className="pop-in">{n}</span>)}</div>}
    </div>
  );
}
