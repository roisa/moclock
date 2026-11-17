/** Put cards in order. Drag a card onto a numbered box, or just tap the cards in order. */
import { useState } from "react";
import type { Of, PlayerProps } from "./types";
import { Visual } from "../ui/Visual";
import { useDrag } from "./drag";
import { sfx, haptic } from "../platform/audio";
import { useStore } from "../state";
import { msg } from "../i18n/types";

export function SequencePlayer({ q, hints, onMiss, onSolve, solved }: PlayerProps<Of<"sequence">>) {
  const { t, lang } = useStore();
  const [placed, setPlaced] = useState<(string | null)[]>(() => q.items.map(() => null));
  const [bounce, setBounce] = useState<string | null>(null);
  const byId = Object.fromEntries(q.items.map((i) => [i.id, i]));
  const tray = q.shuffled.filter((id) => !placed.includes(id));
  const nextSlot = placed.indexOf(null);

  const place = (id: string, slot: number) => {
    if (solved || slot < 0 || placed[slot]) return;
    if (q.items[slot].id === id) {
      const np = placed.slice();
      np[slot] = id;
      setPlaced(np);
      sfx("snap");
      haptic("light");
      if (np.every(Boolean)) setTimeout(() => onSolve(), 250);
    } else {
      sfx("gentle");
      setBounce(id);
      setTimeout(() => setBounce(null), 500);
      onMiss(msg("fb.sequence.wrong"));
    }
  };
  const { drag, bind } = useDrag({
    onTap: (id) => place(id, nextSlot),
    onDrop: (id, target) => (target != null ? place(id, +target) : undefined),
  });
  const labels = (i: number) =>
    i === 0 ? (lang === "en" ? "First" : "Pertama") : i === q.items.length - 1 ? (lang === "en" ? "Last" : "Terakhir") : lang === "en" ? "Next" : "Lalu";
  const hintId = hints >= 2 && nextSlot >= 0 ? q.items[nextSlot].id : null;
  const kind = q.items[0].visual.v;
  return (
    <div className={`board sequence kind-${kind} n${q.items.length}`}>
      <ol className="slots">
        {placed.map((id, i) => (
          <li key={i} data-drop={i} className={`slot ${id ? "filled" : ""} ${i === nextSlot ? "next" : ""}`}>
            <span className="slot-n">{i + 1}</span>
            {kind === "card" && <span className="slot-label">{labels(i)}</span>}
            {id && <div className="slot-item pop-in"><Visual v={byId[id].visual} size="s" /></div>}
          </li>
        ))}
      </ol>
      <div className="tray" aria-label={t("play.dragHint")}>
        {tray.map((id) => (
          <button
            key={id}
            className={`tile card ${bounce === id ? "shake" : ""} ${drag?.id === id ? "lifted" : ""} ${hintId === id ? "glow" : ""}`}
            {...bind(id)}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), place(id, nextSlot))}
          >
            <Visual v={byId[id].visual} size="s" />
          </button>
        ))}
      </div>
      {drag && (
        <div className="drag-ghost card" style={{ left: drag.x - drag.dx, top: drag.y - drag.dy, width: drag.w, height: drag.h }}>
          <Visual v={byId[drag.id].visual} size="s" />
        </div>
      )}
    </div>
  );
}
