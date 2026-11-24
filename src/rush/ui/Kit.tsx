/**
 * Kid-friendly buttons and panels from the app-ayah visual library
 * (public/rush/kit): glossy round icon buttons and jelly pill buttons.
 */
import type { CSSProperties, ReactNode } from "react";
import { sfx } from "../../platform/audio";
import { useRush } from "../state";

// the page is the site root; its kit art lives in public/rush/kit
export const KIT = "rush/kit/";
export const kit = (f: string) => KIT + f;

type RoundIcon = "play" | "back" | "home" | "settings" | "restart" | "lock" | "sound" | "sound-off" | "close";
export function RoundBtn({ icon, label, onClick, size = 64, className = "" }: { icon: RoundIcon; label: string; onClick: () => void; size?: number; className?: string }) {
  return (
    <button className={"ru-round " + className} style={{ width: size, height: size }} onClick={() => { sfx("tap"); onClick(); }} aria-label={label} title={label}>
      <img src={kit("b-" + icon + ".webp")} alt="" draggable={false} />
    </button>
  );
}

export function Pill({ children, color = "green", onClick, disabled, className = "", big }: { children: ReactNode; color?: "green" | "yellow" | "blue" | "pink"; onClick: () => void; disabled?: boolean; className?: string; big?: boolean }) {
  return (
    <button className={`ru-pill ${color} ${big ? "big" : ""} ${className}`} disabled={disabled} onClick={() => { sfx("tap"); onClick(); }} style={{ backgroundImage: `url(${kit("btn-" + color + ".webp")})` } as CSSProperties}>
      <span>{children}</span>
    </button>
  );
}

export function Ribbon({ children, color = "green" }: { children: ReactNode; color?: "green" | "purple" }) {
  return <h1 className={"ru-ribbon " + color} style={{ backgroundImage: `url(${kit(color === "green" ? "p-ribbon.webp" : "ribbon.webp")})` }}><span>{children}</span></h1>;
}

export function StarCount({ n, id }: { n: number; id?: string }) {
  return <span className="ru-count" id={id}><img src={kit("star.webp")} alt="" />{n}</span>;
}

export function Logo({ small }: { small?: boolean }) {
  const { t } = useRush();
  return (
    <div className={"ru-logo" + (small ? " small" : "")} role="img" aria-label={t("ru.title1") + " " + t("ru.title2")}>
      <span className="l1">{t("ru.title1")}</span>
      <span className="l2">{t("ru.title2")}<img src={kit("star.webp")} alt="" /></span>
      {!small && <span className="l3">{t("ru.tagline")}</span>}
    </div>
  );
}

export function Top({ title, onBack, right }: { title: ReactNode; onBack: () => void; right?: ReactNode }) {
  const { t } = useRush();
  return (
    <div className="ru-top">
      <RoundBtn icon="back" label={t("ru.back")} onClick={onBack} size={56} />
      <Ribbon>{title}</Ribbon>
      <div className="ru-top-r">{right}</div>
    </div>
  );
}

/** render-1 Baby Mo pose from the shared character set */
export function Mo({ pose, h, className = "" }: { pose: string; h: number | string; className?: string }) {
  return <img className={"ru-mo " + className} src={"characters/" + pose + "-800.webp"} alt="Baby Mo" style={{ height: h }} draggable={false} />;
}
