import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useStore } from "../state";
import { Icon, Star } from "./Icon";
import { href, type Route } from "../router";
import { sfx } from "../platform/audio";
import { int, randomRng } from "../engine/rng";
import { applyUpdate } from "../platform/pwa";

export function BottomNav({ route }: { route: Route["name"] }) {
  const { t } = useStore();
  const items: [Route, string, string][] = [
    [{ name: "home" }, "home", "nav.home"],
    [{ name: "games" }, "games", "nav.games"],
    [{ name: "rewards" }, "rewards", "nav.rewards"],
  ];
  const active = (n: string) => n === route || (n === "games" && route === "world");
  return (
    <nav className="nav" aria-label="Main">
      {items.map(([r, icon, label]) => (
        <a key={r.name} href={href(r)} aria-current={active(r.name) ? "page" : undefined} onClick={() => sfx("tap")}>
          <Icon name={icon} />
          <span>{t(label)}</span>
        </a>
      ))}
    </nav>
  );
}

export function StarPill({ n, className = "" }: { n: number; className?: string }) {
  const { t } = useStore();
  return (
    <span className={"pill " + className} aria-label={t({ k: "a11y.stars", p: { n } })}>
      <Star size={24} /> {n}
    </span>
  );
}

export function Stars({ n, max = 3, size = 22 }: { n: number; max?: number; size?: number }) {
  return (
    <span className="stars" aria-hidden="true">
      {Array.from({ length: max }, (_, i) => <Star key={i} on={i < n} size={size} />)}
    </span>
  );
}

export function Modal({ children, onClose, label }: { children: ReactNode; onClose?: () => void; label: string }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="scrim" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className="modal card" role="dialog" aria-modal="true" aria-label={label}>
        {children}
      </div>
    </div>
  );
}

/**
 * Parent gate: a multiplication sum young children can't answer by guessing.
 * Big number pad; three wrong answers make a new sum.
 */
export function ParentGate({ onPass, onCancel }: { onPass: () => void; onCancel: () => void }) {
  const { t } = useStore();
  const [seed, setSeed] = useState(0);
  const q = useMemo(() => {
    const r = randomRng();
    return { a: int(r, 3, 9), b: int(r, 4, 9) };
  }, [seed]);
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  const press = (d: string) => {
    setErr(false);
    const v = (val + d).slice(0, 3);
    setVal(v);
    if (v.length >= String(q.a * q.b).length) {
      if (+v === q.a * q.b) onPass();
      else {
        setErr(true);
        setTimeout(() => {
          setVal("");
          setSeed((s) => s + 1);
        }, 700);
      }
    }
  };
  return (
    <Modal onClose={onCancel} label={t("pg.title")}>
      <h2>{t("pg.title")}</h2>
      <p className="pg-ask">{t({ k: "pg.ask", p: { a: q.a, b: q.b } })}</p>
      <div className={"pg-val " + (err ? "shake" : "")} aria-live="polite">{val || "—"}</div>
      {err && <p className="pg-err">{t("pg.wrong")}</p>}
      <div className="pg-pad">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((d) => (
          <button key={d} className="btn ghost" onClick={() => press(d)}>{d}</button>
        ))}
        <button className="btn ghost" onClick={() => setVal(val.slice(0, -1))} aria-label="delete">⌫</button>
      </div>
      <button className="btn small ghost pg-cancel" onClick={onCancel}>{t("pg.cancel")}</button>
    </Modal>
  );
}

/** A short, light confetti burst (CSS only, respects reduced motion). */
export function Confetti({ n = 26 }: { n?: number }) {
  const bits = useMemo(() => {
    const r = randomRng();
    const colors = ["#ffd23f", "#ff9a3d", "#3cb55e", "#6cc4ff", "#b8a5ff", "#ff9fbd"];
    return Array.from({ length: n }, (_, i) => ({
      left: r() * 100, delay: r() * 0.4, dur: 1.4 + r() * 1.1, rot: r() * 360, c: colors[i % colors.length], w: 8 + r() * 8, round: r() > 0.6,
    }));
  }, [n]);
  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <i key={i} style={{ left: b.left + "%", animationDelay: b.delay + "s", animationDuration: b.dur + "s", background: b.c, width: b.w, height: b.round ? b.w : b.w * 0.5, borderRadius: b.round ? "50%" : "2px", transform: `rotate(${b.rot}deg)` }} />
      ))}
    </div>
  );
}

export function Toast() {
  const { toastText } = useStore();
  if (!toastText) return null;
  return <div className="toast" role="status">{toastText}</div>;
}

export function PwaBanner() {
  const { pwa, t } = useStore();
  const [hide, setHide] = useState(false);
  if (pwa.updateReady && !hide)
    return (
      <div className="toast update" role="status">
        {t("update.ready")}
        <button className="btn small" onClick={() => applyUpdate()}>{t("update.reload")}</button>
        <button className="icon-btn" style={{ width: 40, height: 40 }} onClick={() => setHide(true)} aria-label={t("nav.close")}><Icon name="close" size={20} /></button>
      </div>
    );
  if (!pwa.online && !hide)
    return (
      <div className="toast offline" role="status" onClick={() => setHide(true)}>
        {t("offline.banner")}
      </div>
    );
  return null;
}
