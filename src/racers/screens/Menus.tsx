import { useEffect, useRef, useState } from "react";
import { useR, isUnlocked } from "../state";
import { BackBtn, Banner, BigBtn, CoinIcon, KartFront, Logo, Pill, RoundBtn, StarIcon, StarRow, StatBar } from "../ui/Kit";
import { Character } from "../../ui/Character";
import { Icon } from "../../ui/Icon";
import { Clock, useTweenTime } from "../../ui/Clock";
import { RACERS, KARTS, kartById, racerById } from "../content/racers";
import { LEVELS, WORLDS, levelsOf } from "../content/levels";
import { HomeBackdrop, Garage } from "../game/showcase";
import { pickQuality, webglAvailable } from "../game/engine";
import { go } from "../router";
import { sfx, speak, haptic } from "../../platform/audio";
import { make } from "../../engine/time";

/* ------------------------------------------------------------------ HOME */
export function Home({ onGate }: { onGate: (to: "parents" | "settings") => void }) {
  const { p, t } = useR();
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!canvas.current || !webglAvailable()) return;
    let bd: HomeBackdrop | null = null;
    try {
      bd = new HomeBackdrop(canvas.current, pickQuality(p.settings.quality));
    } catch {
      bd = null;
    }
    return () => bd?.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const stars = Object.values(p.levels).reduce((a, l) => a + l.stars, 0);
  const play = () => go(p.onboarded ? "map" : "racer");
  return (
    <div className="r-screen r-home">
      <canvas ref={canvas} className="r-bg3d" />
      <div className="r-home-top">
        <Pill><StarIcon size={24} /> {stars}</Pill>
        <Pill><CoinIcon size={24} /> {p.coins}</Pill>
      </div>
      <Logo />
      <div className="r-home-karts">
        {RACERS.map((r, i) => {
          const k = kartById(r.kart);
          return (
            <div key={r.id} className={"r-seated s" + i} style={{ animationDelay: i * 0.12 + "s" }}>
              <Character id={r.poses.wave} h={i === 1 ? 190 : 165} crop="upper" anim="bob" className="r-seated-char" />
              <KartFront color={k.body} trim={k.trim} emblem={k.emblem} width={i === 1 ? 250 : 210} />
            </div>
          );
        })}
      </div>
      <div className="r-home-bar">
        <RoundBtn icon={<Icon name="parent" />} label={t("r.parents")} onClick={() => onGate("parents")} />
        <RoundBtn icon={<GearIcon />} label={t("r.settings")} onClick={() => onGate("settings")} />
        <BigBtn onClick={play} className="r-play"><Icon name="play" size={40} /> {t("r.play")}</BigBtn>
        <RoundBtn icon={<BarsIcon />} label={t("r.progress")} onClick={() => go("progress")} />
        <RoundBtn icon={<Icon name="rewards" />} label={t("r.rewards")} onClick={() => go("rewards")} />
      </div>
    </div>
  );
}
const GearIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm8 3.5-2 .6a6 6 0 0 1-.6 1.5l1 1.8-1.8 1.8-1.8-1a6 6 0 0 1-1.5.6L12.7 20h-2.5l-.6-2a6 6 0 0 1-1.5-.6l-1.8 1-1.8-1.8 1-1.8a6 6 0 0 1-.6-1.5L3 12.6v-2.5l2-.6a6 6 0 0 1 .6-1.5l-1-1.8 1.8-1.8 1.8 1a6 6 0 0 1 1.5-.6L10.2 2h2.5l.6 2a6 6 0 0 1 1.5.6l1.8-1 1.8 1.8-1 1.8a6 6 0 0 1 .6 1.5l2 .6z" fill="#7b8794" /></svg>
);
const BarsIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><rect x="3" y="12" width="4.5" height="8" rx="1.5" fill="#3a8ef0" /><rect x="9.75" y="7" width="4.5" height="13" rx="1.5" fill="#3cb55e" /><rect x="16.5" y="3" width="4.5" height="17" rx="1.5" fill="#ff9a3d" /></svg>
);

/* ------------------------------------------------------------------ MAP */
const MAP_POS: Record<string, [number, number]> = { "clock-town": [17, 30], "day-valley": [52, 22], "routine-city": [84, 30], "calendar-island": [27, 72], "time-challenge": [70, 70] };
export function MapScreen() {
  const { p, t } = useR();
  const stars = Object.values(p.levels).reduce((a, l) => a + l.stars, 0);
  const r = racerById(p.racer), k = kartById(p.kart);
  return (
    <div className="r-screen r-map">
      <MapArt />
      <div className="r-top">
        <BackBtn onClick={() => go("")} />
        <Banner>{t("r.chooseAdventure")}</Banner>
        <Pill><StarIcon size={24} /> {stars}</Pill>
      </div>
      <button className="r-racerchip" onClick={() => go("racer")}>
        <Character id={r.poses.idle} h={70} crop="upper" />
        <span><b>{r.name[p.settings.lang]}</b><small>{k.name[p.settings.lang]}</small></span>
        <Icon name="next" size={20} />
      </button>
      {WORLDS.map((w) => {
        const lvls = levelsOf(w.id);
        const open = w.playable && (!w.unlockAfter || !!p.levels[w.unlockAfter]);
        const got = lvls.reduce((a, l) => a + (p.levels[l.id]?.stars || 0), 0);
        const [x, y] = MAP_POS[w.id];
        return (
          <button key={w.id} className={"r-island " + (open ? "" : "locked ") + (w.playable ? "" : "soon")} style={{ left: x + "%", top: y + "%" }}
            onClick={() => { sfx("tap"); if (open) go("levels/" + w.id); else speak(t(w.playable ? "r.unlockHint" : "r.comingSoon")); }}>
            <WorldBadge id={w.id} />
            <span className="r-island-card">
              <b>{t(w.title)}</b>
              <small>{t(w.levels)}</small>
              {w.playable ? (open ? <span className="r-island-stars"><StarIcon size={16} /> {got}/{lvls.length * 3}</span> : <span className="r-lock"><Icon name="lock" size={16} /> {t("r.locked")}</span>)
                : <span className="r-lock soon">{t("r.comingSoon")}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
/** illustrated world badges (SVG, matching the concept islands) */
function WorldBadge({ id }: { id: string }) {
  const island = (inner: JSX.Element) => (
    <svg viewBox="0 0 120 100" className="r-badge" aria-hidden="true">
      <ellipse cx="60" cy="84" rx="54" ry="14" fill="#8a6a3e" />
      <ellipse cx="60" cy="78" rx="54" ry="16" fill="#7fd36d" />
      <ellipse cx="44" cy="74" rx="20" ry="6" fill="#9be07c" />
      <circle cx="18" cy="70" r="9" fill="#47a958" /><circle cx="104" cy="72" r="8" fill="#5cc06a" />
      {inner}
    </svg>
  );
  switch (id) {
    case "clock-town": return island(<g><circle cx="60" cy="40" r="30" fill="#ff9a3d" /><circle cx="60" cy="40" r="24" fill="#fff8ec" /><path d="M60 40V22M60 40l12 6" stroke="#2b3a2e" strokeWidth="5" strokeLinecap="round" /><path d="M78 12 v-10 l14 5 -14 5" fill="#ff5f5f" /></g>);
    case "day-valley": return island(<g transform="rotate(-6 60 40)"><rect x="30" y="14" width="60" height="54" rx="8" fill="#fff" /><rect x="30" y="14" width="60" height="14" rx="7" fill="#ff8a5c" />{[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => <rect key={r + "" + c} x={36 + c * 13} y={33 + r * 11} width="9" height="8" rx="2" fill={r === 1 && c === 2 ? "#ffd23f" : "#cfe9ff"} />))}</g>);
    case "routine-city": return island(<g><rect x="36" y="34" width="48" height="36" rx="4" fill="#fff1d6" /><path d="M30 36 L60 12 L90 36Z" fill="#ff8a5c" /><rect x="54" y="50" width="12" height="20" rx="3" fill="#a86b3c" /><circle cx="92" cy="20" r="10" fill="#ffd23f" /></g>);
    case "calendar-island": return island(<g><rect x="38" y="16" width="44" height="50" rx="8" fill="#fff" stroke="#ff5f5f" strokeWidth="4" /><rect x="38" y="16" width="44" height="12" rx="6" fill="#ff5f5f" /><text x="60" y="58" textAnchor="middle" fontFamily="Fredoka, sans-serif" fontWeight="700" fontSize="26" fill="#2b3a2e">31</text></g>);
    default: return island(<g><path d="M44 12h32M44 70h32" stroke="#a86b3c" strokeWidth="6" strokeLinecap="round" /><path d="M48 14 C48 36 58 38 60 41 C62 44 72 46 72 68 H48 C48 46 58 44 60 41 C62 38 72 36 72 14Z" fill="#fff" fillOpacity=".8" stroke="#c9b7ff" strokeWidth="3" /><path d="M52 64 C56 54 64 54 68 64Z" fill="#ffd23f" /><rect x="82" y="16" width="20" height="14" fill="#fff" /><path d="M82 16h5v5h-5zm10 0h5v5h-5zm-5 5h5v5h-5zm10 0h5v5h-5z" fill="#26313a" /></g>);
  }
}
function MapArt() {
  return (
    <svg className="r-mapart" viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="msky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#bfe6ff" /><stop offset="1" stopColor="#e9f7ff" /></linearGradient></defs>
      <rect width="400" height="260" fill="url(#msky)" />
      <path d="M0 70 C80 40 160 60 220 50 S340 30 400 50 V260 H0Z" fill="#a6e08e" />
      <path d="M0 150 C 60 140 120 175 200 165 S 320 130 400 150 V260 H0Z" fill="#8fd884" />
      <path d="M40 210 C 90 180 150 230 210 205 S 300 170 360 200 L400 215 V260 H0 V230Z" fill="#7fcaff" opacity=".85" />
      <path d="M70 90 C120 70 170 60 210 70 S 300 60 330 90 M110 190 C150 150 210 160 270 185" stroke="#d8cbb2" strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M70 90 C120 70 170 60 210 70 S 300 60 330 90 M110 190 C150 150 210 160 270 185" stroke="#fff" strokeWidth="2" strokeDasharray="6 8" fill="none" />
      {[[30, 120], [370, 110], [200, 120], [140, 135], [300, 140], [60, 60], [350, 60]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`}><rect x="-2" y="0" width="4" height="10" fill="#a86b3c" /><circle r="9" cy="-4" fill={i % 2 ? "#47a958" : "#5cc06a"} /></g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ RACER */
export function RacerScreen() {
  const { p, t, update, lang } = useR();
  const [sel, setSel] = useState(p.racer);
  const choose = (id: typeof sel) => {
    setSel(id);
    sfx("pop");
    haptic("light");
    const r = racerById(id);
    speak(r.name[lang], lang);
    update((x) => ({ ...x, racer: id, kart: x.racer !== id && ["star", "moon", "shield"].includes(x.kart) ? r.kart : x.kart }));
  };
  return (
    <div className="r-screen r-racer r-garage-bg">
      <div className="r-top">
        <BackBtn onClick={() => go(p.onboarded ? "map" : "")} />
        <Banner>{t("r.chooseRacer")}</Banner>
        <span />
      </div>
      <div className="r-racer-cards">
        {RACERS.map((r) => {
          const k = kartById(r.kart);
          const on = sel === r.id;
          return (
            <button key={r.id} className={`r-racer-card c-${r.id} ${on ? "on" : ""}`} onClick={() => choose(r.id)} aria-pressed={on}>
              {on && <span className="r-check"><Icon name="check" size={22} /></span>}
              <span className="r-racer-art"><Character id={on ? r.poses.cheer : r.poses.idle} h={200} anim={on ? "cheer" : "bob"} key={r.id + on} crop="upper" /></span>
              <b>{r.name[lang]}</b>
              <KartFront color={k.body} trim={k.trim} emblem={k.emblem} width={130} />
            </button>
          );
        })}
      </div>
      <BigBtn color="green" onClick={() => go("garage")} className="r-next">{t("r.next")} <Icon name="next" /></BigBtn>
    </div>
  );
}

/* ------------------------------------------------------------------ GARAGE */
export function GarageScreen() {
  const { p, t, update, lang } = useR();
  const canvas = useRef<HTMLCanvasElement>(null);
  const garage = useRef<Garage | null>(null);
  const [kid, setKid] = useState(p.kart);
  const k = kartById(kid);
  const owned = p.owned.includes(kid);
  const paint = p.paints[kid] ?? k.body;
  useEffect(() => {
    if (!canvas.current || !webglAvailable()) return;
    try {
      garage.current = new Garage(canvas.current, pickQuality(p.settings.quality));
      garage.current.show(kartById(kid), paint);
    } catch {
      garage.current = null;
    }
    return () => garage.current?.dispose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    garage.current?.show(k, paint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kid]);
  const buy = () => {
    if (p.coins < k.cost) return;
    sfx("star");
    update((x) => ({ ...x, coins: x.coins - k.cost, owned: [...x.owned, k.id], kart: k.id }));
  };
  const select = () => {
    update((x) => ({ ...x, kart: kid, onboarded: true }));
    go("map");
  };
  return (
    <div className="r-screen r-garage r-garage-bg">
      <div className="r-top">
        <BackBtn onClick={() => go("racer")} />
        <Banner>{t("r.chooseKart")}</Banner>
        <Pill><CoinIcon size={24} /> {p.coins}</Pill>
      </div>
      <div className="r-garage-main">
        <div className="r-garage-stage">
          <canvas ref={canvas} className="r-garage-canvas" aria-label={t("r.dragToSpin")} />
          {owned && kid === p.kart && <span className="r-check big"><Icon name="check" size={30} /></span>}
          <small className="r-hint">{t("r.dragToSpin")}</small>
        </div>
        <div className="r-garage-panel">
          <h2>{k.name[lang]}</h2>
          <StatBar label={t("r.speed")} v={k.stats.top} color="#ffb21f" />
          <StatBar label={t("r.accel")} v={k.stats.accel} color="#3cb55e" />
          <StatBar label={t("r.control")} v={k.stats.handling} color="#3a8ef0" />
          {owned && (
            <div className="r-paints" role="group" aria-label={t("r.paint")}>
              {k.paints.map((c) => (
                <button key={c} className={"r-swatch " + (paint === c ? "on" : "")} style={{ background: c }} aria-label={c}
                  onClick={() => { sfx("snap"); garage.current?.paint(c); update((x) => ({ ...x, paints: { ...x.paints, [kid]: c } })); }} />
              ))}
            </div>
          )}
          {owned ? (
            <BigBtn color="green" onClick={select}>{kid === p.kart ? t("r.selected") : t("r.select")} <Icon name="next" /></BigBtn>
          ) : p.coins >= k.cost ? (
            <BigBtn color="yellow" onClick={buy}><CoinIcon /> {t({ k: "r.unlockFor", p: { n: k.cost } })}</BigBtn>
          ) : (
            <p className="r-need"><Icon name="lock" size={18} /> {t({ k: "r.needCoins", p: { n: k.cost - p.coins } })}</p>
          )}
        </div>
      </div>
      <div className="r-kart-row">
        {KARTS.map((kk) => (
          <button key={kk.id} className={"r-kart-thumb " + (kid === kk.id ? "on" : "") + (p.owned.includes(kk.id) ? "" : " locked")} onClick={() => { sfx("tap"); setKid(kk.id); }} aria-label={kk.name[lang]}>
            <KartFront color={p.paints[kk.id] ?? kk.body} trim={kk.trim} emblem={kk.emblem} width={86} />
            {!p.owned.includes(kk.id) && <span className="r-thumb-lock"><Icon name="lock" size={16} /> {kk.cost}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ LEVELS */
export function LevelsScreen({ world }: { world: string }) {
  const { p, t } = useR();
  const w = WORLDS.find((x) => x.id === world) ?? WORLDS[0];
  const lv = levelsOf(w.id);
  return (
    <div className="r-screen r-levels">
      <MapArt />
      <div className="r-top">
        <BackBtn onClick={() => go("map")} />
        <Banner>{t(w.title)}</Banner>
        <span />
      </div>
      <ol className="r-level-list">
        {lv.map((l) => {
          const open = isUnlocked(p, l.id);
          const res = p.levels[l.id];
          const n = LEVELS.indexOf(l) + 1;
          return (
            <li key={l.id}>
              <button className={"r-level " + (open ? "" : "locked")} disabled={!open}
                onClick={() => { sfx("tap"); go((p.tutorials.includes(w.id) ? "race/" : "tutorial/") + l.id); }}>
                <span className="r-level-badge">{open ? <StopwatchMini n={n} /> : <Icon name="lock" size={24} />}</span>
                <span className="r-level-n">{t({ k: "r.level", p: { n } })}</span>
                <span className="r-level-t">{t(l.title)}</span>
                <StarRow n={res?.stars || 0} size={24} />
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
const StopwatchMini = ({ n }: { n: number }) => <span className="r-sw">{n}</span>;

/* ------------------------------------------------------------------ TUTORIAL */
export function TutorialScreen({ levelId }: { levelId: string }) {
  const { p, t, update, lang } = useR();
  const lv = LEVELS.find((l) => l.id === levelId) ?? LEVELS[0];
  const days = lv.world === "day-valley";
  const steps = days ? ["r.tut.days"] : ["r.tut.1", "r.tut.2", "r.tut.3", "r.tut.4"];
  const [i, setI] = useState(0);
  const r = racerById(p.racer);
  const demo = useTweenTime(make(3, 0), make(4, 0), 3500, !days && i >= 2, 300);
  useEffect(() => {
    speak(t(steps[i], "say"), lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);
  const done = () => {
    update((x) => ({ ...x, tutorials: Array.from(new Set([...x.tutorials, lv.world])) }));
    go("race/" + lv.id, true);
  };
  return (
    <div className="r-screen r-tutorial">
      <MapArt />
      <div className="r-top">
        <BackBtn onClick={() => go("levels/" + lv.world)} />
        <Banner>{days ? t("rw.dayValley") : t("r.tutTitle")}</Banner>
        <span />
      </div>
      <div className="r-tut-body">
        <div className="r-tut-mo">
          <Character id={i % 2 ? "mo-point" : r.id === "mo" ? "mo-present" : r.poses.wave} h={300} anim="pop" key={i} />
          <div className="r-tut-bubble" aria-live="polite">
            {steps.slice(0, i + 1).map((s, k) => <p key={s} className={k === i ? "now" : ""}>{t(s)}</p>)}
          </div>
        </div>
        {!days ? (
          <div className="r-tut-clock">
            <Clock t={demo} size="min(42vh, 40vw, 380px)" highlight={i === 1 ? "hour" : i === 2 ? "minute" : null} />
          </div>
        ) : (
          <div className="r-tut-gates">{["Mon", "Tue", "?"].map((d, k) => <span key={k} className={"g" + k}>{d}</span>)}</div>
        )}
      </div>
      <div className="r-tut-actions">
        {i < steps.length - 1 ? (
          <BigBtn color="green" onClick={() => setI(i + 1)}>{t("r.next")} <Icon name="next" /></BigBtn>
        ) : (
          <BigBtn color="green" onClick={done}><Icon name="play" /> {t("r.letsRace")}</BigBtn>
        )}
      </div>
    </div>
  );
}
