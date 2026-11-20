import type { ReactNode } from "react";
import { Icon } from "../../ui/Icon";
import { sfx } from "../../platform/audio";
import { useR } from "../state";

export function Banner({ children, small }: { children: ReactNode; small?: boolean }) {
  return <h1 className={"r-banner" + (small ? " small" : "")}><span>{children}</span></h1>;
}

export function RoundBtn({ icon, label, onClick, color = "white" }: { icon: ReactNode; label?: string; onClick: () => void; color?: string }) {
  return (
    <button className={"r-round " + color} onClick={() => { sfx("tap"); onClick(); }} aria-label={label}>
      <span className="r-round-i">{icon}</span>
      {label && <span className="r-round-l">{label}</span>}
    </button>
  );
}

export function BigBtn({ children, onClick, color = "yellow", disabled, className = "" }: { children: ReactNode; onClick: () => void; color?: "yellow" | "green" | "orange" | "white"; disabled?: boolean; className?: string }) {
  return (
    <button className={`r-big ${color} ${className}`} disabled={disabled} onClick={() => { sfx("tap"); onClick(); }}>
      {children}
    </button>
  );
}

export function BackBtn({ onClick }: { onClick: () => void }) {
  const { t } = useR();
  return (
    <button className="r-back" onClick={() => { sfx("tap"); onClick(); }} aria-label={t("r.back")}>
      <Icon name="back" />
    </button>
  );
}

export function StarRow({ n, max = 3, size = 22 }: { n: number; max?: number; size?: number }) {
  return (
    <span className="r-stars" aria-label={`${n}/${max}`}>
      {Array.from({ length: max }, (_, i) => <StarIcon key={i} on={i < n} size={size} />)}
    </span>
  );
}
export function StarIcon({ on = true, size = 22 }: { on?: boolean; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M12 2.6l2.8 5.8 6.3.8-4.6 4.4 1.2 6.3L12 16.9l-5.7 3 1.2-6.3L2.9 9.2l6.3-.8z" fill={on ? "#ffcc2e" : "rgba(60,50,30,.18)"} stroke={on ? "#e39a00" : "none"} strokeWidth="1.3" strokeLinejoin="round" />
      {on && <path d="M9.5 8.6c.5-.9 1-1.8 1.5-2.6" stroke="#fff" strokeOpacity=".8" strokeWidth="1.3" strokeLinecap="round" fill="none" />}
    </svg>
  );
}
export function CoinIcon({ size = 22 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#ffcc2e" stroke="#e39a00" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6.5" fill="none" stroke="#fff3b0" strokeWidth="1.5" />
      <path d="M12 7.5v9" stroke="#e39a00" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
export function StopwatchIcon({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="13.5" r="8.5" fill="#ffcc2e" stroke="#e39a00" strokeWidth="1.5" />
      <circle cx="12" cy="13.5" r="6" fill="#fff8ec" />
      <rect x="10" y="2" width="4" height="3" rx="1" fill="#ff8a2a" />
      <path d="M12 13.5V9.5M12 13.5l3 1.5" stroke="#2b3a2e" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
export function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={"r-pill " + className}>{children}</span>;
}

/** "Baby Mo / Time Racers" logo with checkered flags and a clock */
export function Logo({ small }: { small?: boolean }) {
  const { t } = useR();
  return (
    <div className={"r-logo" + (small ? " small" : "")} role="img" aria-label={t("r.title1") + " " + t("r.title2")}>
      <svg className="flag l" viewBox="0 0 60 50" aria-hidden="true"><path d="M4 48 L10 4" stroke="#6b4a2a" strokeWidth="4" strokeLinecap="round" /><path d="M10 4 Q30 0 52 8 L46 30 Q26 22 7 26Z" fill="#fff" /><g fill="#26313a"><path d="M10 4 L20 3 L18 14 L8.5 15Z" /><path d="M29 4 L39 5 L37 17 L28 14Z" /><path d="M18 14 L28 14 L26 25 L16 24Z" /><path d="M37 17 L48 20 L46 30 L35 27Z" /></g></svg>
      <div className="r-logo-t">
        <span className="t1">{t("r.title1")}</span>
        <span className="t2">{t("r.title2")}</span>
      </div>
      <svg className="flag r" viewBox="0 0 60 50" aria-hidden="true"><path d="M56 48 L50 4" stroke="#6b4a2a" strokeWidth="4" strokeLinecap="round" /><path d="M50 4 Q30 0 8 8 L14 30 Q34 22 53 26Z" fill="#fff" /><g fill="#26313a"><path d="M50 4 L40 3 L42 14 L51.5 15Z" /><path d="M31 4 L21 5 L23 17 L32 14Z" /><path d="M42 14 L32 14 L34 25 L44 24Z" /><path d="M23 17 L12 20 L14 30 L25 27Z" /></g></svg>
      {!small && <div className="r-tagline">{t("r.tagline")}</div>}
    </div>
  );
}

/** Front view of a kart (SVG) — characters' art sits behind it so they look seated. */
export function KartFront({ color, trim, emblem, width = 220 }: { color: string; trim: string; emblem: string; width?: number }) {
  const em = emblem === "moon"
    ? <path d="M108 70 a16 16 0 1 0 14 24 a13 13 0 1 1 -14 -24z" fill="#fff" />
    : emblem === "shield"
      ? <g><path d="M110 64 l16 5 -2 17 q-14 12 -28 0 l-2 -17z" fill="#fff" /><path d="M110 70 l3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1z" fill={color} /></g>
      : emblem === "heart"
        ? <path d="M110 92 c-18 -12 -14 -26 -4 -26 c4 0 4 3 4 3 s0 -3 4 -3 c10 0 14 14 -4 26z" fill="#fff" />
        : emblem === "bolt"
          ? <path d="M114 62 l-12 18 h8 l-4 16 14 -20 h-8z" fill="#fff" />
          : <path d="M110 62 l4.5 9.2 10 1.4 -7.2 7 1.7 10 -9 -4.7 -9 4.7 1.7 -10 -7.2 -7 10 -1.4z" fill="#fff" />;
  return (
    <svg className="r-kartfront" viewBox="0 0 220 130" width={width} aria-hidden="true">
      <defs>
        <linearGradient id={"kb" + color} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".45" /><stop offset=".35" stopColor="#fff" stopOpacity="0" /></linearGradient>
      </defs>
      <ellipse cx="110" cy="122" rx="100" ry="8" fill="rgba(30,40,30,.22)" />
      {/* wheels */}
      <rect x="6" y="66" width="38" height="56" rx="16" fill="#2c3340" />
      <rect x="176" y="66" width="38" height="56" rx="16" fill="#2c3340" />
      <rect x="14" y="80" width="22" height="28" rx="9" fill={trim} />
      <rect x="184" y="80" width="22" height="28" rx="9" fill={trim} />
      {/* body */}
      <path d="M36 70 Q40 40 110 38 Q180 40 184 70 L188 104 Q110 122 32 104 Z" fill={color} />
      <path d="M36 70 Q40 40 110 38 Q180 40 184 70 L188 104 Q110 122 32 104 Z" fill={`url(#kb${color})`} />
      <path d="M44 100 Q110 114 176 100" stroke={trim} strokeWidth="7" fill="none" strokeLinecap="round" />
      {/* steering wheel peeking */}
      <ellipse cx="110" cy="42" rx="26" ry="8" fill="#2c3340" />
      {/* headlights */}
      <circle cx="62" cy="82" r="8" fill="#fff8d0" stroke={trim} strokeWidth="3" />
      <circle cx="158" cy="82" r="8" fill="#fff8d0" stroke={trim} strokeWidth="3" />
      {/* emblem badge */}
      <circle cx="110" cy="80" r="21" fill={trim === "#ffffff" ? "#1f56c4" : trim} />
      {em}
    </svg>
  );
}

export function StatBar({ label, v, color }: { label: string; v: number; color: string }) {
  return (
    <div className="r-stat">
      <span>{label}</span>
      <i><b style={{ width: Math.round(v * 100) + "%", background: color }} /></i>
    </div>
  );
}
