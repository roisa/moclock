/** Renders any engine `Visual` (clock, card, day, month, …) in a given size. */
import { CARDS } from "../content/cards";
import { useStore } from "../state";
import { Character } from "./Character";
import { Clock, Digital } from "./Clock";
import { DAYS, DAYS_SHORT, MONTHS, MONTHS_SHORT, durationWords, timeWords } from "../i18n/words";
import type { Visual as V } from "../engine/types";
import { Icon } from "./Icon";
import { forward } from "../engine/time";

export const DAY_COLORS = ["#ff8f7a", "#ffb547", "#ffd23f", "#7fd36d", "#6cc4ff", "#b8a5ff", "#ff9fbd"];
export const MONTH_COLORS = ["#6cc4ff", "#8fb8ff", "#7fd36d", "#9fdc6a", "#ffd23f", "#ffb547", "#ff9a3d", "#ff8f7a", "#e6a35c", "#c99a6a", "#b8a5ff", "#8fd0ff"];
const PART_ICON = { morning: "sun", afternoon: "sun", evening: "sun", night: "moon" } as const;

export type VSize = "s" | "m" | "l";

export function Visual({ v, size = "m" }: { v: V; size?: VSize }) {
  const { lang, t } = useStore();
  switch (v.v) {
    case "clock": {
      const px = size === "s" ? 120 : size === "m" ? 170 : 260;
      return <Clock t={v.t} size={px} digital={v.digital} label={t({ k: "a11y.clock", p: { t: { time: v.t } } })} />;
    }
    case "digital":
      return <Digital t={v.t} size={size === "l" ? "l" : size === "s" ? "s" : "m"} />;
    case "time-words":
      return <div className={`v-words ${size}`}>{timeWords(v.t, lang, true)}</div>;
    case "day":
      return (
        <div className={`v-day ${size} ${v.d >= 5 ? "weekend" : ""}`} style={{ ["--c" as string]: DAY_COLORS[v.d] }}>
          <b>{DAYS_SHORT[lang][v.d]}</b>
          <span>{DAYS[lang][v.d]}</span>
        </div>
      );
    case "month":
      return (
        <div className={`v-month ${size}`} style={{ ["--c" as string]: MONTH_COLORS[v.m] }}>
          <i>{v.m + 1}</i>
          <b>{size === "s" ? MONTHS_SHORT[lang][v.m] : MONTHS[lang][v.m]}</b>
        </div>
      );
    case "number":
      return <div className={`v-number ${size}`}>{v.n}</div>;
    case "duration":
      return <div className={`v-duration ${size}`}><Icon name="clock" size={28} />{durationWords(v.min, lang)}</div>;
    case "card":
      return <PictureCard id={v.id} size={size} />;
    case "part":
      return (
        <div className={`v-part ${v.part}`}>
          <Icon name={PART_ICON[v.part]} size={30} />
          <b>{t("part." + v.part)}</b>
        </div>
      );
    case "week":
      return <WeekStrip today={v.today} ask={v.ask} />;
    case "months-row":
      return <MonthsRow missing={v.missing} />;
    case "two-clocks":
      return <TwoClocks a={v.a} b={v.b} bCard={v.bCard} arc={v.arc} />;
    case "story":
      return (
        <div className="v-story">
          <PictureCard id={v.card} size="m" />
          {v.t != null && <Clock t={v.t} size={size === "l" ? 170 : 130} />}
        </div>
      );
  }
}

export function PictureCard({ id, size = "m", label = true }: { id: string; size?: VSize; label?: boolean }) {
  const { t, device } = useStore();
  const c = CARDS[id];
  if (!c) return null;
  const big = device.w >= 760 && device.h >= 600, narrow = device.w <= 560;
  const art: [number, number] =
    size === "s" ? (big ? [128, 112] : narrow ? [76, 68] : [92, 80]) : size === "m" ? (big ? [170, 150] : [132, 116]) : [180, 164];
  return (
    <div className={`pcard ${size} part-${c.part || "none"}`}>
      <div className="pcard-art">
        <Character id={c.pose} h={art[1]} crop={c.crop} box={[art[0] * 0.92, art[1] * 0.9]} />
      </div>
      {label && <div className="pcard-label">{t("card." + id)}</div>}
    </div>
  );
}

const ASK_SHIFT: Record<string, number> = { tomorrow: 1, yesterday: -1, "after-tomorrow": 2, "before-yesterday": -2 };
/**
 * Seven days centred on today, so "tomorrow" is always one step to the right and
 * "yesterday" one step to the left, even when the week wraps (Sunday → Monday).
 * The day being asked about is a "?" card; the steps to it are marked with dots.
 */
export function WeekStrip({ today, ask }: { today: number; ask?: string }) {
  const { lang } = useStore();
  const shift = ask ? ASK_SHIFT[ask] ?? 0 : 0;
  return (
    <div className="week" role="list">
      {[-3, -2, -1, 0, 1, 2, 3].map((rel) => {
        const i = (today + rel + 7) % 7;
        const asked = ask && rel === shift;
        const onPath = ask && rel !== 0 && Math.sign(rel) === Math.sign(shift) && Math.abs(rel) < Math.abs(shift);
        return (
          <div key={rel} role="listitem" className={`week-day ${rel === 0 ? "today" : ""} ${i >= 5 ? "weekend" : ""} ${asked ? "asked" : ""}`} style={{ ["--c" as string]: DAY_COLORS[i] }}>
            <b>{asked ? "?" : DAYS_SHORT[lang][i]}</b>
            {rel === 0 && <span className="tag">{lang === "en" ? "Today" : "Hari ini"}</span>}
            {onPath && <span className="hop-dot" />}
            {!asked && <span className="sr">{DAYS[lang][i]}</span>}
          </div>
        );
      })}
    </div>
  );
}

export function MonthsRow({ missing, onPick }: { missing: number[]; onPick?: (m: number) => void }) {
  const { lang } = useStore();
  return (
    <div className="months">
      {MONTHS_SHORT[lang].map((m, i) =>
        missing.includes(i) ? (
          <div key={i} className="month-gap">?</div>
        ) : (
          <button key={i} className="month-chip" style={{ ["--c" as string]: MONTH_COLORS[i] }} onClick={() => onPick?.(i)} tabIndex={onPick ? 0 : -1}>
            <i>{i + 1}</i>
            {m}
          </button>
        ),
      )}
    </div>
  );
}

export function TwoClocks({ a, b, bCard, arc }: { a: number; b: number; bCard?: string; arc?: boolean }) {
  const { t, lang } = useStore();
  const hours = forward(a, b) / 60;
  return (
    <div className="two-clocks">
      <div className="tc">
        <span className="chip">{lang === "en" ? "Now" : "Sekarang"}</span>
        <Clock t={a} size={140} />
      </div>
      <div className="tc-arrow">
        {arc && hours >= 1 && Number.isInteger(hours)
          ? Array.from({ length: hours }, (_, i) => <span key={i} className="hop">{i + 1}</span>)
          : <Icon name="next" size={34} />}
      </div>
      <div className="tc">
        {bCard ? <span className="chip orange-chip">{t("card." + bCard)}</span> : null}
        <Clock t={b} size={140} />
      </div>
    </div>
  );
}
