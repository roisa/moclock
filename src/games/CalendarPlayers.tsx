import { useState } from "react";
import type { Of, PlayerProps } from "./types";
import { MonthGrid } from "../ui/Calendar";
import { sfx, haptic, speak } from "../platform/audio";
import { useDrag } from "./drag";
import { useStore } from "../state";
import { numberWord } from "../i18n/words";
import { shuffle, randomRng } from "../engine/rng";
import { Character } from "../ui/Character";
import { CARDS } from "../content/cards";
import { msg } from "../i18n/types";
import { Icon } from "../ui/Icon";

export function CalendarTapPlayer({ q, hints, onMiss, onSolve, solved }: PlayerProps<Of<"calendar-tap">>) {
  const [wrong, setWrong] = useState<number[]>([]);
  const tap = (d: number) => {
    if (solved) return;
    if (d === q.target) {
      sfx("correct");
      haptic("success");
      onSolve();
    } else {
      sfx("gentle");
      setWrong((w) => [...w, d]);
      onMiss();
    }
  };
  return (
    <div className="board calendar">
      <MonthGrid
        y={q.y} m={q.m} onTap={tap}
        cell={(d) => ({
          cls: [d === q.today ? "today" : "", wrong.includes(d) ? "miss" : "", solved && d === q.target ? "right" : "", hints >= 2 && d === q.target && !solved ? "glow" : ""].join(" "),
        })}
      />
    </div>
  );
}

export function CalendarFillPlayer({ q, hints, onMiss, onSolve, solved }: PlayerProps<Of<"calendar-fill">>) {
  const { lang } = useStore();
  const [filled, setFilled] = useState<number[]>([]);
  const [sel, setSel] = useState<number | null>(null);
  const [tiles] = useState(() => shuffle(randomRng(), q.missing));
  const [bounce, setBounce] = useState<number | null>(null);
  const put = (n: number, slot: number) => {
    if (solved || filled.includes(slot)) return;
    if (n === slot) {
      const nf = [...filled, n];
      setFilled(nf);
      setSel(null);
      sfx("snap");
      speak(numberWord(n, lang), lang);
      if (nf.length === q.missing.length) setTimeout(() => onSolve(), 300);
    } else {
      sfx("gentle");
      setBounce(n);
      setTimeout(() => setBounce(null), 500);
      onMiss();
    }
  };
  const { drag, bind } = useDrag({
    onTap: (id) => {
      setSel(+id === sel ? null : +id);
      sfx("tap");
    },
    onDrop: (id, target) => target && put(+id, +target),
  });
  const open = q.missing.filter((m) => !filled.includes(m));
  return (
    <div className="board calendar fill">
      <MonthGrid
        y={q.y} m={q.m}
        onTap={(d) => sel != null && open.includes(d) && put(sel, d)}
        cell={(d) =>
          open.includes(d)
            ? { cls: "hole " + (sel != null ? "armed " : "") + (hints >= 2 && sel === d ? "glow" : ""), drop: true, content: <span className="cal-n">?</span> }
            : filled.includes(d) ? { cls: "placed" } : undefined
        }
      />
      <div className="tray numbers">
        {tiles.filter((n) => !filled.includes(n)).map((n) => (
          <button key={n} className={`tile num-tile card ${sel === n ? "selected" : ""} ${bounce === n ? "shake" : ""} ${drag?.id === String(n) ? "lifted" : ""}`} {...bind(String(n))}>
            {n}
          </button>
        ))}
      </div>
      {drag && <div className="drag-ghost card num-tile" style={{ left: drag.x - drag.dx, top: drag.y - drag.dy, width: drag.w, height: drag.h }}>{drag.id}</div>}
    </div>
  );
}

export function CountdownPlayer({ q, hints, onMiss, onSolve, solved }: PlayerProps<Of<"countdown">>) {
  const { lang, t } = useStore();
  const [count, setCount] = useState(0);
  const next = q.today + count + 1;
  const card = CARDS[q.card];
  const tap = (d: number) => {
    if (solved || d <= q.today + count) return;
    if (d === next) {
      const c = count + 1;
      setCount(c);
      sfx("pop");
      speak(numberWord(c, lang), lang);
      if (d === q.eventDay) {
        sfx("fanfare");
        setTimeout(() => onSolve(msg("countdown.result", { n: { num: c } })), 600);
      }
    } else {
      sfx("gentle");
      onMiss();
    }
  };
  return (
    <div className="board calendar countdown">
      <MonthGrid
        y={q.y} m={q.m} onTap={tap}
        cell={(d) => {
          if (d === q.today) return { cls: "today", content: <><span className="cal-n">{d}</span><span className="cal-tag">{lang === "en" ? "Today" : "Hari ini"}</span></> };
          if (d === q.eventDay) return { cls: "event " + (d <= q.today + count ? "counted" : "") + (hints >= 2 && d === next ? " glow" : ""), content: <><span className="cal-n">{d}</span><span className="cal-evt"><Character id={card.pose} h={34} crop={card.crop} /></span></> };
          if (d > q.today && d <= q.today + count) return { cls: "counted", content: <><span className="cal-n">{d}</span><span className="cal-moon"><Icon name="moon" size={16} /><b>{d - q.today}</b></span></> };
          if (hints >= 2 && d === next) return { cls: "glow" };
          return undefined;
        }}
      />
      <div className="count-big" aria-live="polite">
        <Icon name="moon" size={30} /> <b>{count}</b>
        <span>{t({ k: "unit.days", p: { n: count } })}</span>
      </div>
    </div>
  );
}
