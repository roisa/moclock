import { useState } from "react";
import type { Of, PlayerProps } from "./types";
import { Visual } from "../ui/Visual";
import { sfx, haptic } from "../platform/audio";

export function ChoicePlayer({ q, hints, onMiss, onSolve, solved }: PlayerProps<Of<"choice">>) {
  const [wrong, setWrong] = useState<string[]>([]);
  const [shake, setShake] = useState<string | null>(null);
  const many = q.options.length > 3;
  const bigOpts = q.options.every((o) => o.visual.v === "clock") ? "m" : "m";
  const pickOpt = (id: string) => {
    if (solved || wrong.includes(id)) return;
    if (id === q.answer) {
      sfx("correct");
      haptic("success");
      onSolve(q.reveal);
    } else {
      sfx("gentle");
      haptic("soft");
      setWrong((w) => [...w, id]);
      setShake(id);
      setTimeout(() => setShake(null), 500);
      onMiss();
    }
  };
  return (
    <div className="board choice">
      {q.stimulus && (
        <div className="stimulus rise">
          <Visual v={q.stimulus} size="l" />
        </div>
      )}
      <div className={`options n${q.options.length} ${many ? "many" : ""} kind-${q.options[0].visual.v}`} role="group">
        {q.options.map((o, i) => {
          const isAns = o.id === q.answer;
          const cls = [
            "option card",
            wrong.includes(o.id) ? "wrong" : "",
            solved && isAns ? "right" : "",
            hints >= 2 && isAns && !solved ? "glow" : "",
            shake === o.id ? "shake" : "",
          ].join(" ");
          return (
            <button key={o.id} className={cls + " rise"} style={{ animationDelay: 0.05 * i + "s" }} onClick={() => pickOpt(o.id)} disabled={wrong.includes(o.id)}>
              <Visual v={o.visual} size={(many && o.visual.v === "clock") || o.visual.v === "digital" ? "s" : (bigOpts as "m")} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
