/** Sort picture cards into morning / afternoon / evening / night skies. */
import { useState } from "react";
import type { Of, PlayerProps } from "./types";
import { PictureCard, Visual } from "../ui/Visual";
import { useDrag } from "./drag";
import { sfx, haptic } from "../platform/audio";
import { msg } from "../i18n/types";
import { Sky } from "../ui/Scene";
import { CARDS } from "../content/cards";
import { useLater } from "./useLater";
import { useRef } from "react";

const SKY_MIN = { morning: 450, afternoon: 840, evening: 1110, night: 1290 } as const;

export function SortPlayer({ q, hints, onMiss, onSolve, solved }: PlayerProps<Of<"sort">>) {
  const [done, setDone] = useState<Record<string, string>>({});
  const [sel, setSel] = useState<string | null>(null);
  const [bounce, setBounce] = useState<string | null>(null);
  const later = useLater();
  const finished = useRef(false);
  const left = q.items.filter((i) => !done[i.id]);

  const put = (id: string, bin: string) => {
    if (solved || finished.current) return;
    const it = q.items.find((i) => i.id === id)!;
    if (it.bin === bin) {
      const nd = { ...done, [id]: bin };
      setDone(nd);
      setSel(null);
      sfx("snap");
      haptic("light");
      if (Object.keys(nd).length === q.items.length) {
        finished.current = true;
        later(() => onSolve(), 300);
      }
    } else {
      sfx("gentle");
      setBounce(id);
      later(() => setBounce(null), 500);
      onMiss(msg("hint.explore." + it.bin, { c: msg("card." + id) }));
    }
  };
  const { drag, bind } = useDrag({
    onTap: (id) => {
      setSel(sel === id ? null : id);
      sfx("tap");
    },
    onDrop: (id, target) => target && put(id, target),
  });
  const hintBin = hints >= 2 && sel ? q.items.find((i) => i.id === sel)?.bin : null;
  return (
    <div className={`board sort bins${q.bins.length}`}>
      <div className="bins">
        {q.bins.map((b) => {
          const part = (b.visual as { part: keyof typeof SKY_MIN }).part;
          return (
            <button
              key={b.id}
              data-drop={b.id}
              className={`bin card ${sel ? "armed" : ""} ${hintBin === b.id ? "glow" : ""}`}
              onClick={() => sel && put(sel, b.id)}
            >
              <Sky min={SKY_MIN[part]} />
              <div className="bin-head"><Visual v={b.visual} /></div>
              <div className="bin-items">
                {Object.entries(done).filter(([, bin]) => bin === b.id).map(([id]) => (
                  <span key={id} className="bin-item pop-in"><PictureCard id={id} size="s" label={false} /></span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
      <div className="tray">
        {left.map((it) => (
          <button key={it.id} data-id={it.id} className={`tile card ${sel === it.id ? "selected" : ""} ${bounce === it.id ? "shake" : ""} ${drag?.id === it.id ? "lifted" : ""}`} {...bind(it.id)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), setSel(sel === it.id ? null : it.id))} aria-pressed={sel === it.id}>
            <Visual v={it.visual} size="s" />
          </button>
        ))}
      </div>
      {drag && CARDS[drag.id] && (
        <div className="drag-ghost card" style={{ left: drag.x - drag.dx, top: drag.y - drag.dy, width: drag.w, height: drag.h }}>
          <PictureCard id={drag.id} size="s" />
        </div>
      )}
    </div>
  );
}
