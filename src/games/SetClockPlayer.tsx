import { useState } from "react";
import type { Of, PlayerProps } from "./types";
import { Clock } from "../ui/Clock";
import { Visual } from "../ui/Visual";
import { useStore } from "../state";
import { hourOf, minuteOf } from "../engine/time";
import { sfx, haptic, speak } from "../platform/audio";
import { timeWords } from "../i18n/words";
import { Icon } from "../ui/Icon";

export function SetClockPlayer({ q, hints, onMiss, onSolve, solved }: PlayerProps<Of<"set-clock">>) {
  const { t, lang } = useStore();
  const [time, setTime] = useState(q.start);
  const drag = solved ? "none" : q.lock === "minute" ? "hour" : q.lock === "hour" ? "minute" : "both";
  const ok = (x: number) =>
    q.check === "hour" ? hourOf(x) === hourOf(q.target) && minuteOf(x) === 0
    : q.check === "minute" ? minuteOf(x) === minuteOf(q.target)
    : x === q.target;
  const check = () => {
    if (solved) return;
    if (ok(time)) {
      sfx("correct");
      haptic("success");
      onSolve();
    } else {
      sfx("gentle");
      onMiss();
    }
  };
  const fiveRing = q.skill === "minute-hand" || q.skill === "read-five" || q.step === 5 || q.skill === "elapsed";
  return (
    <div className="board set-clock">
      {q.stimulus && <div className="stimulus small rise"><Visual v={q.stimulus} size="m" /></div>}
      <div className="clock-stage">
        <Clock
          t={time}
          size="min(78vw, 46vh, 380px)"
          drag={drag}
          step={q.step}
          onChange={setTime}
          onRelease={(x) => speak(timeWords(x, lang), lang)}
          ghost={hints >= 2 ? q.target : null}
          highlight={hints >= 1 && !solved ? (q.lock === "hour" || q.check === "minute" ? "minute" : q.lock === "minute" || q.check === "hour" ? "hour" : null) : null}
          fiveRing={fiveRing}
          digital={q.showDigital}
          label={t({ k: "a11y.clock", p: { t: { time } } })}
          className={solved ? "solved" : ""}
        />
      </div>
      <button className="btn big check-btn" onClick={check} disabled={solved}>
        <Icon name="check" size={30} /> {t("play.check")}
      </button>
    </div>
  );
}
