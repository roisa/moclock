/** A month calendar (Monday first, like Indonesian school calendars). */
import type { ReactNode } from "react";
import { useStore } from "../state";
import { DAYS_SHORT, MONTHS, dayIndex } from "../i18n/words";

export function MonthGrid({
  y, m, cell, onTap, className = "",
}: {
  y: number; m: number; className?: string;
  cell?: (d: number) => { cls?: string; content?: ReactNode; drop?: boolean; label?: string } | undefined;
  onTap?: (d: number) => void;
}) {
  const { lang } = useStore();
  const first = dayIndex(new Date(y, m, 1).getDay());
  const days = new Date(y, m + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  while (cells.length % 7) cells.push(null);
  return (
    <div className={"cal card " + className}>
      <div className="cal-head">
        <span className="cal-ring" /><span className="cal-ring r2" />
        <b>{MONTHS[lang][m]}</b> <span>{y}</span>
      </div>
      <div className="cal-grid" role="grid">
        {DAYS_SHORT[lang].map((d, i) => (
          <div key={d} className={"cal-dow " + (i >= 5 ? "we" : "")} role="columnheader">{d}</div>
        ))}
        {cells.map((d, i) => {
          if (d == null) return <div key={"e" + i} className="cal-cell empty" />;
          const c = cell?.(d) || {};
          const we = i % 7 >= 5;
          return (
            <button
              key={d}
              className={`cal-cell ${we ? "we" : ""} ${c.cls || ""}`}
              data-drop={c.drop ? String(d) : undefined}
              onClick={() => onTap?.(d)}
              tabIndex={onTap ? 0 : -1}
              aria-label={c.label || String(d)}
              role="gridcell"
            >
              {c.content ?? <span className="cal-n">{d}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
