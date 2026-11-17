/**
 * Mo's Day: the clock drives a whole day. Turn the long hand (or slide the
 * day bar) and the sun crosses the sky, night falls, and Mo switches to
 * whatever he does at that time. Find the time for the activity Mo asks about.
 */
import { useRef, useState } from "react";
import type { Of, PlayerProps } from "./types";
import { Clock } from "../ui/Clock";
import { Sky } from "../ui/Scene";
import { Character } from "../ui/Character";
import { CARDS } from "../content/cards";
import { useStore } from "../state";
import { sfx, haptic } from "../platform/audio";
import { digital, norm } from "../engine/time";
import { Icon } from "../ui/Icon";

const ORDER = ["wake", "brush", "breakfast", "school", "lunch", "nap", "snack", "play", "dinner", "pyjamas", "sleep"];
export function inWindow(min: number, w: [number, number]) {
  const m = ((min % 1440) + 1440) % 1440;
  const [a, b] = w;
  return b > 1440 ? m >= a || m < b - 1440 : m >= a && m < b;
}
export function activityAt(min: number): string | null {
  for (const id of ORDER) if (inWindow(min, CARDS[id].window!)) return id;
  return null;
}

export function DayExplorerPlayer({ q, hints, onMiss, onSolve, solved }: PlayerProps<Of<"day-explorer">>) {
  const { t, lang } = useStore();
  const start = q.card === "wake" || q.card === "brush" ? 5 * 60 : 6 * 60;
  const [min, setMin] = useState(start);
  const tries = useRef(0);
  const act = activityAt(min);
  const card = act ? CARDS[act] : null;
  const pose = card ? card.pose : min >= 17 * 60 + 30 && min < 18 * 60 ? "mo-walk" : "mo-wave";

  const setFromClock = (t12: number) => {
    // shortest step from the current 12-hour position keeps the day running on
    const cur = norm(min);
    let d = t12 - cur;
    if (d > 360) d -= 720;
    if (d < -360) d += 720;
    setMin((x) => (((x + d) % 1440) + 1440) % 1440);
  };
  const release = (m = min) => {
    if (solved) return;
    if (inWindow(m, [q.from, q.to])) {
      sfx("correct");
      haptic("success");
      onSolve();
    } else if (++tries.current % 3 === 0) onMiss();
  };
  const pm = min >= 720;
  return (
    <div className="board explorer">
      <div className="explorer-scene card">
        <Sky min={min} />
        <div className="explorer-mo">
          {card?.crop ? <Character id={pose} h={170} crop="upper" key={pose} anim="pop" /> : <Character id={pose} h={/brush|dinner/.test(pose) ? 120 : 170} key={pose} anim="pop" />}
        </div>
        <div className={"explorer-label " + (act === q.card ? "match" : "")}>
          {act ? t("card." + act) : "…"}
        </div>
        <div className="explorer-time">
          <Icon name={pm ? (min >= 18 * 60 ? "moon" : "sun") : min < 5 * 60 + 30 ? "moon" : "sun"} size={22} />
          {digital(norm(min))} {lang === "en" ? (pm ? "PM" : "AM") : ""}
        </div>
      </div>
      <div className="explorer-controls">
        <Clock t={norm(min)} size="min(52vw, 32vh, 260px)" drag={solved ? "none" : "both"} step={15} onChange={setFromClock} onRelease={() => release()}
          ghost={hints >= 2 ? norm(CARDS[q.card].time!) : null} label={t({ k: "a11y.clock", p: { t: { time: norm(min) } } })} />
        <div className="dayline">
          <Icon name="sun" size={26} />
          <input
            type="range" min={0} max={1425} step={15} value={min} aria-label={t("explorer.drag")}
            onChange={(e) => {
              setMin(+e.target.value);
              sfx("tick");
            }}
            onPointerUp={(e) => release(+(e.target as HTMLInputElement).value)}
            onKeyUp={(e) => (e.key.startsWith("Arrow") ? release(+(e.target as HTMLInputElement).value) : undefined)}
            disabled={solved}
          />
          <Icon name="moon" size={26} />
        </div>
      </div>
    </div>
  );
}
