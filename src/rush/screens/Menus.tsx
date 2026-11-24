import { useEffect, useMemo, useState } from "react";
import { useRush, WORLDS, isWorldOpen, UNLOCKS, owned, type WorldId, type Unlock } from "../state";
import { Logo, Pill, RoundBtn, Top, StarCount, kit, Ribbon } from "../ui/Kit";
import { Clock, Digital } from "../../ui/Clock";
import { make } from "../../engine/time";
import { audio } from "../audio";
import { go } from "../router";
import { randomRng, int } from "../../engine/rng";
import { LANGS } from "../../i18n";
import { BUILD } from "../core/morning";
import { look } from "../worlds";
import { wkey } from "../i18n";
import { NextPrayerChip, usePrayer, CITIES, PRAYERS, PRAYER_NAMES, defaultCity } from "../prayer/prayer";

export function Splash({ onStart }: { onStart: () => void }) {
  const { t } = useRush();
  return (
    <button className="ru-screen ru-splash" onClick={onStart} aria-label={t("ru.tapToStart")} style={{ backgroundImage: "url(rush/bg-splash.webp)" }}>
      <Logo />
      <div className="ru-splash-hero"><PairRide /></div>
      <span className="ru-tap">{t("ru.tapToStart")}</span>
    </button>
  );
}

export function Home({ onGate }: { onGate: () => void }) {
  const { p, t, update } = useRush();
  return (
    <div className="ru-screen ru-home" style={{ backgroundImage: "url(rush/bg-home2.webp)" }}>
      <div className="ru-home-top">
        <StarCount n={p.stars} />
        <NextPrayerChip />
        <span className="grow" />
        <RoundBtn icon={p.settings.sound ? "sound" : "sound-off"} label={t("ru.sound")} size={56} onClick={() => update((x) => ({ ...x, settings: { ...x.settings, sound: !x.settings.sound } }))} />
        <RoundBtn icon="settings" label={t("ru.parents")} size={56} onClick={onGate} />
      </div>
      <div className="ru-home-main">
        {/* the family stands on the pavement of the painted street: one ground line, contact shadows, no floating */}
        <div className="ru-stage" aria-hidden="true">
          <span className="ru-stand bike"><BikeSide bike={p.equip.bike} width={300} /></span>
          <span className="ru-stand ais"><img src="rush/mo/ais-wave.webp" alt="" draggable={false} /></span>
          <span className="ru-stand mo"><img src="rush/mo/wave.webp" alt="" draggable={false} /></span>
          <span className="ru-stand adam"><img src="rush/mo/adam-cool.webp" alt="" draggable={false} /></span>
        </div>
        <div className="ru-home-menu">
          <Logo />
          <button className="ru-playbtn" onClick={() => { audio.sfx("tap"); go("worlds"); }} aria-label={t("ru.play")}><img src="rush/ui/btn-play.webp" alt="" draggable={false} /><span>{t("ru.play")}</span></button>
          <div className="row">
            <Pill color="blue" onClick={() => go("garage")}><img className="pill-ic" src="rush/ui/ic-shop.webp" alt="" />{t("ru.garage")}</Pill>
            <Pill color="pink" onClick={() => go("collection")}><img className="pill-ic" src="rush/ui/ic-bag.webp" alt="" />{t("ru.collection")}</Pill>
          </div>
          <nav className="ru-more" aria-label={t("ru.moreGames")}>
            <a href="./learn/">{t("ru.toLearn")}</a>
            <a href="./racers/">{t("ru.toRacers")}</a>
          </nav>
        </div>
      </div>
    </div>
  );
}

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
    <div className="ru-screen ru-worlds" style={{ backgroundImage: "url(rush/bg-park.webp)" }}>
      <Top title={t("ru.adventures")} onBack={() => go("")} right={<StarCount n={p.stars} />} />
      <div className="ru-world-list">
        {WORLDS.map((w, i) => {
          const open = isWorldOpen(p, w);
          const L = WORLD_LOOK[w];
          const res = p.worlds[w];
          return (
            <button key={w} className={"ru-world" + (open ? "" : " locked")} disabled={!open} onClick={() => go("mission/" + w)} aria-label={t("ru.w." + w) + (open ? "" : " — " + t("ru.comingSoon"))}>
              <div className="art" style={{ background: L.sky }}>
                <img className="scene" src={kit("scene-" + w + ".webp")} alt="" />
                <div className="clk"><Clock t={L.time} size={54} /></div>
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
  const { p, t, lang } = useRush();
  useEffect(() => {
    const h = setTimeout(() => audio.say(`ru.m.${world}Say`, lang, { force: true }), 400);
    return () => clearTimeout(h);
  }, [lang, world]);
  const span = BUILD[world]?.().span ?? { from: make(8, 0), to: make(9, 0) };
  const L = look(world);
  return (
    <div className="ru-screen ru-mission" style={{ backgroundImage: "url(rush/bg-mission.webp)" }}>
      <Top title={t("ru.w." + world)} onBack={() => go("worlds")} />
      <div className="ru-mission-body">
        <div className="ru-stage mission" aria-hidden="true">
          <span className="ru-stand bike"><BikeSide bike={p.equip.bike} width={260} /></span>
          <span className="ru-stand mo"><img src="rush/mo/front.webp" alt="" draggable={false} /></span>
        </div>
        <div className="ru-clip">
          <div className="clip" />
          <h2>{t("ru.mission")}</h2>
          <p>{t({ k: `ru.m.${world}`, p: { t: { time: span.to } } })}</p>
          <div className="ru-mission-clocks">
            <figure><Clock t={span.from} size={54} /><figcaption>{t("ru.m.from")}<Digital t={span.from} size="s" /></figcaption></figure>
            <svg viewBox="0 0 60 20" width="56" aria-hidden="true"><path d="M2 10h50m-10-8 10 8-10 8" stroke="#4cbf5a" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <figure><Clock t={span.to % 720} size={54} /><figcaption>{t(wkey("ru.m.to", world))}<Digital t={span.to % 720} size="s" /></figcaption></figure>
          </div>
          <div className="ru-dua" lang="ar">
            <small>{t("ru.dua.title")}</small>
            <p className="ar" dir="rtl">بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ</p>
            <p className="latin" lang={lang}>{t("ru.dua.latin")}</p>
            <p className="mean" lang={lang}>{t("ru.dua.meaning")}</p>
            <button className="ru-dua-play" onClick={() => audio.clips(["d-leave_home"], lang, { force: true })}>🔊 {t("ru.dua.listen")}</button>
          </div>
          <div className="ru-mission-row">
            <div className="ru-mission-books">{L.bundles.map((b, i) => <img key={i} className="bk" src={b} alt="" />)}{L.hosts ? L.hosts.map((h) => <img key={h} className="host" src={h} alt="" />) : <img src={kit("v-school.webp")} alt="" />}</div>
            <div className="ru-friends" title={t("ru.friends")}><img src="rush/mo/ais-front.webp" alt="Baby Ais" /><img src="rush/mo/adam-front.webp" alt="Kak Adam" /></div>
          </div>
          <Pill big onClick={() => go("ride/" + world)}>{t("ru.letsGo")}</Pill>
        </div>
      </div>
    </div>
  );
}

/** the approved push balance bike art (side view), recoloured per unlock by scripts/rush-import-art.py */
export const bikeSrc = (bike: string) => `rush/bike/side-${["green", "blue", "yellow", "pink", "lavender", "rainbow"].includes(bike) ? bike : "green"}.webp`;
export function BikeSide({ bike, width = 260, className = "" }: { bike: string; bag?: string; width?: number; className?: string }) {
  return <img className={"ru-bikeside " + className} src={bikeSrc(bike)} width={width} alt="" draggable={false} />;
}

/** garage turntable: the green bike turns through its four approved views; other colours show their recoloured side view */
function Turntable({ bike }: { bike: string }) {
  const [i, setI] = useState(0);
  useEffect(() => { const h = setInterval(() => setI((x) => (x + 1) % 4), 1200); return () => clearInterval(h); }, []);
  const src = bike === "green" && i > 0 ? `rush/bike/view-${i}.webp` : bikeSrc(bike);
  return (
    <div className="ru-turntable">
      <img key={src} className="ru-turn-img" src={src} alt="" draggable={false} />
    </div>
  );
}

function UnlockCard({ u, active, onPick }: { u: Unlock; active: boolean; onPick: () => void }) {
  const { p, t } = useRush();
  const have = owned(p, u);
  const swatch = u.color === "rainbow" ? "linear-gradient(90deg,#ff7a7a,#ffe06a,#7ee08a,#7fcaff,#b8a5ff)" : u.color;
  return (
    <button className={"ru-unlock" + (active ? " on" : "") + (have ? "" : " locked")} onClick={() => have && onPick()} disabled={!have} aria-pressed={active}>
      {u.kind === "bike" ? <img className="sw-img" src={bikeSrc(u.id)} alt="" /> : <span className={"sw " + u.kind} style={{ background: swatch }} />}
      <b>{t(`ru.${u.kind}.${u.id}`)}</b>
      {have ? <small>{active ? t("ru.equipped") : t("ru.equip")}</small> : <small className="cost"><img src={kit("star.webp")} alt="" />{t({ k: "ru.needStars", p: { n: u.cost } })}</small>}
    </button>
  );
}

export function Garage() {
  const { p, t, update } = useRush();
  const bikes = UNLOCKS.filter((u) => u.kind === "bike");
  return (
    <div className="ru-screen ru-garage" style={{ backgroundImage: "url(rush/bg-garage.webp)" }}>
      <Top title={t("ru.garage")} onBack={() => go("")} right={<StarCount n={p.stars} />} />
      <div className="ru-garage-body">
        <Turntable bike={p.equip.bike} />
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
    <div className="ru-screen ru-collection" style={{ backgroundImage: "url(rush/bg-collection.webp)" }}>
      <Top title={t("ru.collection")} onBack={() => go("")} right={<StarCount n={p.stars} />} />
      <div className="ru-tabs" role="tablist">
        {(["bag", "helmet", "tokens"] as const).map((k) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "on" : ""} onClick={() => { audio.sfx("tap"); setTab(k); }}>{t(k === "tokens" ? "ru.tokens" : k === "bag" ? "ru.bags" : "ru.helmets")}</button>)}
      </div>
      {tab === "tokens" ? (
        <div className="ru-tokens">
          <div className={"ru-token" + (p.tokens.includes("duck") ? " on" : "")}><img src={kit("pet-duckling.webp")} alt="" /><b>{t("ru.token.duck")}</b></div>
          <div className={"ru-token" + (p.tokens.includes("bunny") ? " on" : "")}><img src={kit("badge-pets.webp")} alt="" /><b>{t("ru.token.bunny")}</b></div>
          <h3>{t("ru.timesSeen")}</h3>
          <div className="ru-seen">{p.seen.length ? p.seen.map((s) => <figure key={s}><Clock t={s} size={60} /><Digital t={s} size="s" /></figure>) : <small>—</small>}</div>
        </div>
      ) : (
        <div className="ru-collection-body">
          {tab === "bag" && <img className="ru-mo" src="rush/mo/back.webp" alt="Baby Mo" style={{ height: "40vh" }} />}
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
    <div className="ru-screen ru-parents" style={{ backgroundImage: "url(rush/bg-parents.webp)" }}>
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
          <PrayerSettings />
        </section>
        <section className="ru-panel">
          <p>{t("ru.parentInfo")}</p>
          <h3>{t("ru.values")}</h3>
          <p>{t("ru.valuesText")}</p>
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

/** parent settings for the prayer-time pause (same times and cities as the Baby Mo app) */
function PrayerSettings() {
  const { p, t, update, lang } = useRush();
  const pr = usePrayer();
  const set = (patch: Partial<typeof p.settings>) => update((x) => ({ ...x, settings: { ...x.settings, ...patch } }));
  const useLoc = () => navigator.geolocation?.getCurrentPosition(
    (pos) => set({ loc: { lat: +pos.coords.latitude.toFixed(4), lng: +pos.coords.longitude.toFixed(4) }, city: null }),
    () => {}, { timeout: 10000, maximumAge: 3600e3 });
  return (
    <>
      <label className="ru-row"><span>{t("ru.pray.setting")}</span><input type="checkbox" checked={p.settings.prayer} onChange={(e) => set({ prayer: e.target.checked })} /></label>
      <label className="ru-row"><span>{t("ru.pray.city")}</span>
        <select value={p.settings.loc ? "__loc" : p.settings.city ?? ""} onChange={(e) => e.target.value === "__loc" ? useLoc() : set({ city: e.target.value || null, loc: null })}>
          <option value="">{t("ru.pray.auto")}{defaultCity() ? ` (${defaultCity()})` : ""}</option>
          {CITIES.map((c) => <option key={c.n} value={c.n}>{c.n}</option>)}
          <option value="__loc">📍 {p.settings.loc ? t("ru.pray.myLocation") : t("ru.pray.useLoc")}</option>
        </select>
      </label>
      {pr.today && (
        <div className="ru-praytimes" aria-label={t("ru.pray.today")}>
          {pr.today.map((x) => <span key={x.key} className={pr.next?.key === x.key ? "next" : ""}><b>{PRAYER_NAMES[lang][PRAYERS.indexOf(x.key)]}</b>{x.time}</span>)}
        </div>
      )}
      <small className="ru-note">{t("ru.pray.note")}</small>
    </>
  );
}

/** Baby Mo and Baby Ais riding toward the viewer (approved sheet, 6 frames) */
function PairRide() {
  const [f, setF] = useState(0);
  useEffect(() => { const h = setInterval(() => setF((x) => (x + 1) % 6), 260); return () => clearInterval(h); }, []);
  return <div className="ru-pairride" role="img" aria-label="Baby Mo and Baby Ais" style={{ backgroundImage: "url(rush/mo/pair-ride.webp)", backgroundPosition: `${f * 20}% 0` }} />;
}
