/**
 * Baby Mo (or a friend) as the guide: a pose + a speech bubble.
 * Tapping Mo or the speaker repeats the line (no reading required).
 */
import { Character } from "./Character";
import { Icon } from "./Icon";
import type { Msg } from "../i18n/types";
import { useStore } from "../state";

export function Guide({
  pose, text, h = 150, anim = "bob", layout = "side", onReplay, children, className = "",
}: {
  pose: string; text?: Msg | string; h?: number; anim?: "bob" | "pop" | "cheer" | "shake" | "";
  layout?: "side" | "stack"; onReplay?: () => void; children?: React.ReactNode; className?: string;
}) {
  const { t, say } = useStore();
  const replay = () => (onReplay ? onReplay() : text && say(text));
  return (
    <div className={`guide ${layout} ${className}`}>
      <button className="guide-char" onClick={replay} aria-label={t("a11y.speak")}>
        <Character id={pose} h={h} anim={anim} key={pose + anim} stage />
      </button>
      {(text || children) && (
        <div className={`bubble ${layout === "side" ? "tail-left" : "tail-top"}`} aria-live="polite">
          {text && <span className="bubble-text">{t(text)}</span>}
          {children}
          {text && (
            <button className="say-btn" onClick={replay} aria-label={t("a11y.speak")}>
              <Icon name="speaker" size={24} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
