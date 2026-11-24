import { useEffect, useMemo, useState } from "react";
import { useRush, WORLDS, isWorldOpen, UNLOCKS, owned, type WorldId, type Unlock } from "../state";
import { Logo, Pill, RoundBtn, Top, Mo, StarCount, kit, Ribbon } from "../ui/Kit";
import { Clock, Digital } from "../../ui/Clock";
import { make } from "../../engine/time";
import { audio } from "../audio";
import { go } from "../router";
import { randomRng, int } from "../../engine/rng";
import { LANGS } from "../../i18n";

export function Splash({ onStart }: { onStart: () => void }) {
  const { t } = useRush();
  return (
    <button className="ru-screen ru-splash" onClick={onStart} aria-label={t("ru.tapToStart")}>
      <div className="ru-sun" />
      <div className="ru-road-art" />
      <img className="ru-splash-l" src={kit("v-house.webp")} alt="" />
      <img className="ru-splash-r" src={kit("v-school.webp")} alt="" />
      <Logo />
      <Mo pose="mo-run" h="46vh" className="ru-splash-mo" />
      <span className="ru-tap">{t("ru.tapToStart")}</span>
    </button>
  );
}

export function Home({ onGate }: { onGate: () => void }) {
  const { p, t, update } = useRush();
  return (
    <div className="ru-screen ru-home" style={{ backgroundImage: `url(${kit("bg-home.webp")})` }}>
      <div className="ru-home-top">
        <StarCount n={p.stars} />
        <span className="grow" />
        <RoundBtn icon={p.settings.sound ? "sound" : "sound-off"} label={t("ru.sound")} size={56} onClick={() => update((x) => ({ ...x, settings: { ...x.settings, sound: !x.settings.sound } }))} />
        <RoundBtn icon="settings" label={t("ru.parents")} size={56} onClick={onGate} />
      </div>
      <div className="ru-home-main">
        <div className="ru-home-hero">
          <Mo pose="mo-wave" h="46vh" className="ru-home-mo" />
          <BikeSide bike={p.equip.bike} bag={p.equip.bag} width={240} />
        </div>
        <div className="ru-home-menu">
          <Logo />
          <Pill big onClick={() => go("worlds")}><PlayTri /> {t("ru.play")}</Pill>
          <div className="row">
            <Pill color="blue" onClick={() => go("garage")}>{t("ru.garage")}</Pill>
            <Pill color="pink" onClick={() => go("collection")}>{t("ru.collection")}</Pill>
          </div>
        </div>
      </div>
    </div>
  );
}
const PlayTri = () => <svg viewBox="0 0 20 20" width="22" height="22" aria-hidden="true"><path d="M5 3l12 7-12 7z" fill="currentColor" /></svg>;

const WORLD_LOOK: Record<WorldId, { sky: string; ground: string; time: number; icon: string }> = {
  morning: { sky: "linear-gradient(#ffd79a,#9ed8ff)", ground: "#7ece68", time: make(8, 0), icon: "v-school.webp" },
  park: { sky: "linear-gradient(#7fcaff,#c8ecff)", ground: "#6cc35c", time: make(12, 0), icon: "v-garden.webp" },
  play: { sky: "linear-gradient(#9fd8ff,#e8f7ff)", ground: "#86d072", time: make(3, 0), icon: "v-swing.webp" },
  sunset: { sky: "linear-gradient(#ff9e6b,#ffc6a8 50%,#c9a8ff)", ground: "#5fa257", time: make(6, 0), icon: "v-house.webp" },
  dream: { sky: "linear-gradient(#2a2f6e,#5a4aa0)", ground: "#3d5a8a", time: make(8, 0), icon: "v-lights.webp" },
};

export function Worlds() {
  const { p, t } = useRush();
  return (
    <div className="ru-screen ru-worlds">
      <Top title={t("ru.adventures")} onBack={() => go("")} right={<StarCount n={p.stars} />} />
      <div className="ru-world-list">
        {WORLDS.map((w, i) => {
          const open = isWorldOpen(p, w);
          const L = WORLD_LOOK[w];
          const res = p.worlds[w];
          return (
            <button key={w} className={"ru-world" + (open ? "" : " locked")} disabled={!open} onClick={() => go("mission/" + w)} aria-label={t("ru.w." + w) + (open ? "" : " — " + t("ru.comingSoon"))}>
              <div className="art" style={{ background: L.sky }}>
                <div className="ground" style={{ background: L.ground }} />
                <img src={kit(L.icon)} alt="" />
                <div className="clk"><Clock t={L.time} size={54} /></div>
                {w === "dream" && <div className="moon" />}
              </div>
              <div className="meta">
                <b>{i + 1}. {t("ru.w." + w)}</b>
                <small>{t("ru.wd." + w)}</small>
                {open ? (res ? <span className="praise">{[0, 1, 2].map((k) => <img key={k} src={kit(k < res.praise ? "star.webp" : "star-off.webp")} alt="" />)}</span> : <span className="new">{t("ru.play")} ▶</span>) : <span className="soon"><img src={kit("b-lock.webp")} alt="" />{t("ru.comingSoon")}</span>}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Mission({ world }: { world: WorldId }) {
  const { t, lang } = useRush();
  useEffect(() => {
    const h = setTimeout(() => audio.say("ru.m.morningSay", lang, { force: true }), 400);
    return () => clearTimeout(h);
  }, [lang]);
  return (
    <div className="ru-screen ru-mission" style={{ backgroundImage: `url(${kit("bg-home.webp")})` }}>
      <Top title={t("ru.w." + world)} onBack={() => go("worlds")} />
      <div className="ru-mission-body">
        <Mo pose="mo-present" h="52vh" className="ru-mission-mo" />
        <div className="ru-clip">
          <div className="clip" />
          <h2>{t("ru.mission")}</h2>
          <p>{t({ k: "ru.m.morning", p: { t: { time: make(9, 0) } } })}</p>
          <div className="ru-mission-clocks">
            <figure><Clock t={make(8, 0)} size={84} /><figcaption>{t("ru.m.from")}<Digital t={make(8, 0)} size="s" /></figcaption></figure>
            <svg viewBox="0 0 60 20" width="56" aria-hidden="true"><path d="M2 10h50m-10-8 10 8-10 8" stroke="#4cbf5a" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <figure><Clock t={make(9, 0)} size={84} /><figcaption>{t("ru.m.to")}<Digital t={make(9, 0)} size="s" /></figcaption></figure>
          </div>
          <div className="ru-mission-books">{[0, 1, 2].map((i) => <span key={i} className="book on" />)}<img src={kit("v-school.webp")} alt="" /></div>
          <Pill big onClick={() => go("ride/" + world)}>{t("ru.letsGo")}</Pill>
        </div>
      </div>
    </div>
  );
}

/** side view of the balance bike (no pedals!) in the chosen colours, with the delivery bag on the rack */
export function BikeSide({ bike, bag, width = 260 }: { bike: string; bag: string; width?: number }) {
  const u = UNLOCKS.find((x) => x.kind === "bike" && x.id === bike) ?? UNLOCKS[0];
  const bagC = UNLOCKS.find((x) => x.kind === "bag" && x.id === bag)?.color ?? "#ffd23f";
  const id = "bs" + bike;
  const frame = u.color === "rainbow" ? `url(#${id})` : u.color;
  const wheel = (cx: number) => (
    <g>
      <circle cx={cx} cy="112" r="38" fill="#4a5260" />
      <circle cx={cx} cy="112" r="27" fill="#fff6e3" />
      {[0, 72, 144, 216, 288].map((a) => <line key={a} x1={cx} y1="112" x2={cx + 25 * Math.sin((a * Math.PI) / 180)} y2={112 - 25 * Math.cos((a * Math.PI) / 180)} stroke="#d8cbb2" strokeWidth="4" strokeLinecap="round" />)}
      <circle cx={cx} cy="112" r="8" fill="#ffd23f" />
    </g>
  );
  return (
    <svg className="ru-bikeside" viewBox="0 0 300 160" width={width} role="img" aria-label="balance bike">
      <defs><linearGradient id={id} x1="0" x2="1"><stop offset="0" stopColor="#ff7a7a" /><stop offset=".25" stopColor="#ffe06a" /><stop offset=".5" stopColor="#7ee08a" /><stop offset=".75" stopColor="#7fcaff" /><stop offset="1" stopColor="#b8a5ff" /></linearGradient></defs>
      <ellipse cx="150" cy="152" rx="130" ry="7" fill="rgba(40,50,40,.15)" />
      {wheel(66)}{wheel(234)}
      <path d="M66 112 L118 62 L208 62 L234 112" fill="none" stroke={frame} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M100 104 L140 104" stroke="#8a93a3" strokeWidth="7" strokeLinecap="round" />
      <path d="M126 70 L192 70" stroke="#fff6e3" strokeWidth="4" strokeLinecap="round" />
      <path d="M208 62 L200 24" stroke={frame} strokeWidth="11" strokeLinecap="round" />
      <path d="M200 24 Q190 14 176 18" stroke="#8a93a3" strokeWidth="7" fill="none" strokeLinecap="round" />
      <rect x="164" y="10" width="20" height="14" rx="7" fill="#ff9e6b" />
      <circle cx="196" cy="16" r="5" fill="#ffd23f" />
      <path d="M118 62 L112 44" stroke="#8a93a3" strokeWidth="8" strokeLinecap="round" />
      <path d="M86 42 Q112 32 138 42 Q112 50 86 42Z" fill="#ff9e6b" />
      <rect x="40" y="40" width="40" height="34" rx="9" fill={bagC} stroke="rgba(0,0,0,.12)" strokeWidth="2" />
      <path d="M60 48 l3 6 6 1-4.5 4 1 6-5.5-3-5.5 3 1-6-4.5-4 6-1z" fill="#4cbf5a" />
      <path d="M80 60 L104 60" stroke="#8a93a3" strokeWidth="5" />
    </svg>
  );
}

function UnlockCard({ u, active, onPick }: { u: Unlock; active: boolean; onPick: () => void }) {
  const { p, t } = useRush();
  const have = owned(p, u);
  const swatch = u.color === "rainbow" ? "linear-gradient(90deg,#ff7a7a,#ffe06a,#7ee08a,#7fcaff,#b8a5ff)" : u.color;
  return (
    <button className={"ru-unlock" + (active ? " on" : "") + (have ? "" : " locked")} onClick={() => have && onPick()} disabled={!have} aria-pressed={active}>
      <span className={"sw " + u.kind} style={{ background: swatch }} />
      <b>{t(`ru.${u.kind}.${u.id}`)}</b>
      {have ? <small>{active ? t("ru.equipped") : t("ru.equip")}</small> : <small className="cost"><img src={kit("star.webp")} alt="" />{t({ k: "ru.needStars", p: { n: u.cost } })}</small>}
    </button>
  );
}

export function Garage() {
  const { p, t, update } = useRush();
  const bikes = UNLOCKS.filter((u) => u.kind === "bike");
  return (
    <div className="ru-screen ru-garage">
      <Top title={t("ru.garage")} onBack={() => go("")} right={<StarCount n={p.stars} />} />
      <div className="ru-garage-body">
        <div className="ru-turntable"><BikeSide bike={p.equip.bike} bag={p.equip.bag} width={340} /></div>
        <div className="ru-unlock-grid">
          {bikes.map((u) => <UnlockCard key={u.id} u={u} active={p.equip.bike === u.id} onPick={() => update((x) => ({ ...x, equip: { ...x.equip, bike: u.id } }))} />)}
        </div>
      </div>
    </div>
  );
}

export function Collection() {
  const { p, t, update } = useRush();
  const [tab, setTab] = useState<"helmet" | "bag" | "tokens">("bag");
  const list = UNLOCKS.filter((u) => u.kind === tab);
  return (
    <div className="ru-screen ru-collection">
      <Top title={t("ru.collection")} onBack={() => go("")} right={<StarCount n={p.stars} />} />
      <div className="ru-tabs" role="tablist">
        {(["bag", "helmet", "tokens"] as const).map((k) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "on" : ""} onClick={() => { audio.sfx("tap"); setTab(k); }}>{t(k === "tokens" ? "ru.tokens" : k === "bag" ? "ru.bags" : "ru.helmets")}</button>)}
      </div>
      {tab === "tokens" ? (
        <div className="ru-tokens">
          <div className={"ru-token" + (p.tokens.includes("squirrel") ? " on" : "")}><img src={kit("p-badge.webp")} alt="" /><b>{t("ru.token.squirrel")}</b></div>
          <h3>{t("ru.timesSeen")}</h3>
          <div className="ru-seen">{p.seen.length ? p.seen.map((s) => <figure key={s}><Clock t={s} size={60} /><Digital t={s} size="s" /></figure>) : <small>—</small>}</div>
        </div>
      ) : (
        <div className="ru-collection-body">
          {tab === "bag" && <BikeSide bike={p.equip.bike} bag={p.equip.bag} width={300} />}
          <div className="ru-unlock-grid">
            {list.map((u) => <UnlockCard key={u.id} u={u} active={p.equip[u.kind as "helmet" | "bag"] === u.id} onPick={() => update((x) => ({ ...x, equip: { ...x.equip, [u.kind]: u.id } }))} />)}
          </div>
        </div>
      )}
    </div>
  );
}

export function ParentGate({ onPass, onCancel }: { onPass: () => void; onCancel: () => void }) {
  const { t } = useRush();
  const [seed, setSeed] = useState(0);
  const q = useMemo(() => { const r = randomRng(); return { a: int(r, 3, 9), b: int(r, 4, 9) }; }, [seed]);
  const [v, setV] = useState("");
  const [err, setErr] = useState(false);
  const press = (d: string) => {
    const nv = (v + d).slice(0, 3);
    setV(nv);
    setErr(false);
    if (nv.length >= String(q.a * q.b).length) {
      if (+nv === q.a * q.b) onPass();
      else { setErr(true); setTimeout(() => { setV(""); setSeed((x) => x + 1); }, 600); }
    }
  };
  return (
    <div className="ru-scrim">
      <div className="ru-panel gate" role="dialog" aria-modal="true">
        <p>{t({ k: "ru.parentGate", p: { a: q.a, b: q.b } })}</p>
        <div className={"ru-gate-val" + (err ? " shake" : "")}>{v || "—"}</div>
        {err && <small className="ru-err">{t("ru.wrong")}</small>}
        <div className="ru-pad">{"1234567890".split("").map((d) => <button key={d} onClick={() => press(d)}>{d}</button>)}</div>
        <Pill color="blue" onClick={onCancel}>{t("ru.cancel")}</Pill>
      </div>
    </div>
  );
}

export function Parents() {
  const { p, t, update } = useRush();
  const [confirm, setConfirm] = useState(false);
  const set = <K extends keyof typeof p.settings>(k: K, v: (typeof p.settings)[K]) => update((x) => ({ ...x, settings: { ...x.settings, [k]: v } }));
  const rides = Object.values(p.worlds).reduce((a, w) => a + (w?.plays || 0), 0);
  const Toggle = ({ k, label }: { k: "sound" | "voice" | "music" | "reduced" | "lefty" | "unlockAll"; label: string }) => (
    <label className="ru-row"><span>{t(label)}</span><input type="checkbox" checked={p.settings[k]} onChange={(e) => set(k, e.target.checked)} /></label>
  );
  return (
    <div className="ru-screen ru-parents">
      <Top title={t("ru.parentTitle")} onBack={() => go("")} />
      <div className="ru-parent-grid">
        <section className="ru-panel">
          <label className="ru-row"><span>{t("ru.language")}</span>
            <select value={p.settings.lang} onChange={(e) => set("lang", e.target.value as typeof p.settings.lang)}>{LANGS.map((l) => <option key={l.id} value={l.id}>{l.flag} {l.label}</option>)}</select>
          </label>
          <Toggle k="sound" label="ru.sound" />
          <Toggle k="voice" label="ru.voice" />
          <Toggle k="reduced" label="ru.reduced" />
          <Toggle k="lefty" label="ru.lefty" />
          <Toggle k="unlockAll" label="ru.unlockAll" />
        </section>
        <section className="ru-panel">
          <p>{t("ru.parentInfo")}</p>
          <h3>{t("ru.learn")}</h3>
          <p>{t("ru.learnText")}</p>
          <p><b>{t("ru.rides")}:</b> {rides} · <b>{t("ru.stars")}:</b> {p.stars} · <b>{t("ru.balloons")}:</b> {p.seen.length}</p>
          {confirm ? (
            <div className="row"><span>{t("ru.resetConfirm")}</span>
              <Pill color="pink" onClick={() => { update((x) => ({ ...x, stars: 0, worlds: {}, tokens: [], seen: [], seenUnlocks: [], equip: { bike: "green", helmet: "white", bag: "yellow" } })); setConfirm(false); }}>{t("ru.yes")}</Pill>
              <Pill color="blue" onClick={() => setConfirm(false)}>{t("ru.cancel")}</Pill></div>
          ) : <Pill color="pink" onClick={() => setConfirm(true)}>{t("ru.reset")}</Pill>}
        </section>
      </div>
    </div>
  );
}
export { Ribbon };
