import { useEffect, useMemo, useState } from "react";
import { useR, accuracy, defaults } from "../state";
import { BackBtn, Banner, BigBtn, CoinIcon, Pill, StarIcon, StarRow } from "../ui/Kit";
import { Character } from "../../ui/Character";
import { Icon } from "../../ui/Icon";
import { RACERS, racerById } from "../content/racers";
import { LEVELS, levelById, levelsOf, WORLDS } from "../content/levels";
import { go } from "../router";
import { sfx, speak } from "../../platform/audio";
import { Confetti } from "../../ui/Common";
import type { RaceSummary } from "../game/RaceGame";
import { int, randomRng } from "../../engine/rng";
import type { QualityPref } from "../game/engine";

export function Results({ levelId, s, stars, sticker }: { levelId: string; s: RaceSummary; stars: number; sticker: string | null }) {
  const { p, t, lang } = useR();
  const lv = levelById(levelId)!;
  const me = racerById(p.racer);
  const others = RACERS.filter((r) => r.id !== me.id);
  // podium order: the child in their place, friends fill the others
  const order = useMemo(() => {
    const slots: (typeof RACERS)[number][] = [];
    let k = 0;
    for (let place = 1; place <= 3; place++) slots.push(place === s.position ? me : others[k++]);
    return slots;
  }, [s.position, me, others]);
  const idx = LEVELS.indexOf(lv);
  const next = LEVELS[idx + 1]?.world === lv.world ? LEVELS[idx + 1] : null;
  useEffect(() => {
    speak(t("r.place" + s.position, "say") + (s.learned.length ? " " + t("r.youLearned", "say") + " " + s.learned.join(", ") : ""), lang);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const podium = [order[1], order[0], order[2]]; // 2nd, 1st, 3rd
  return (
    <div className="r-screen r-results">
      <Confetti n={40} />
      <div className="r-results-left">
        <div className="r-place">{t("r.place" + s.position)}</div>
        <div className="r-podium">
          {podium.map((r, i) => {
            const place = [2, 1, 3][i];
            return (
              <div key={r.id} className={"r-pod p" + place}>
                <Character id={place === 1 ? r.poses.win : r.poses.cheer} h={place === 1 ? 210 : 170} anim="cheer" />
                <div className="r-step"><b>{place}</b></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="r-results-card">
        <Banner small>{t("r.raceComplete")}</Banner>
        <div className="r-res-stars"><StarRow n={stars} size={58} /></div>
        <ul className="r-res-list">
          <li><Icon name="check" size={22} /> {t("r.answers")} <b>{s.correctFirstTry}/{s.questions}</b></li>
          <li><CoinIcon size={22} /> {t("r.coins")} <b>+{s.coins}</b></li>
          {sticker && <li><StarIcon size={22} /> {t("r.newSticker")} <b>★</b></li>}
        </ul>
        {s.learned.length > 0 && (
          <div className="r-learned">
            <small>{t(lv.family === "numbers" || lv.family === "hour-hand" ? "r.youFound" : "r.youLearned")}</small>
            <b>{s.learned.slice(0, 6).join(", ")}</b>
          </div>
        )}
        <div className="r-res-btns">
          <BigBtn color="white" onClick={() => go("")}><Icon name="home" /></BigBtn>
          <BigBtn color="orange" onClick={() => go("race/" + levelId, true)}><Icon name="replay" /></BigBtn>
          {next ? <BigBtn color="green" onClick={() => go("race/" + next.id, true)}>{t("r.nextRace")} <Icon name="next" /></BigBtn>
            : <BigBtn color="green" onClick={() => go("map")}>{t("r.next")} <Icon name="next" /></BigBtn>}
        </div>
      </div>
    </div>
  );
}

export function ProgressScreen() {
  const { p, t } = useR();
  return (
    <div className="r-screen r-progress r-garage-bg">
      <div className="r-top"><BackBtn onClick={() => go("")} /><Banner>{t("r.progress")}</Banner><span /></div>
      <div className="r-prog-grid">
        {WORLDS.filter((w) => w.playable).map((w) => (
          <section key={w.id} className="r-panel">
            <h2>{t(w.title)}</h2>
            {levelsOf(w.id).map((l) => (
              <div key={l.id} className="r-prog-row">
                <span>{t({ k: "r.level", p: { n: LEVELS.indexOf(l) + 1 } })} · {t(l.title)}</span>
                <StarRow n={p.levels[l.id]?.stars || 0} size={20} />
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

export function RewardsScreen() {
  const { p, t, lang } = useR();
  const stars = Object.values(p.levels).reduce((a, l) => a + l.stars, 0);
  return (
    <div className="r-screen r-rewards r-garage-bg">
      <div className="r-top"><BackBtn onClick={() => go("")} /><Banner>{t("r.rewards")}</Banner><span /></div>
      <div className="r-rew-totals">
        <div className="r-panel"><StarIcon size={56} /><b>{stars}</b><small>{t("r.stars")}</small></div>
        <div className="r-panel"><CoinIcon size={56} /><b>{p.coins}</b><small>{t("r.coins")}</small></div>
        <div className="r-panel"><span className="r-trophy">🏆</span><b>{p.trophies}</b><small>{t("r.trophies")}</small></div>
      </div>
      <h2 className="r-h2">{t("r.newSticker")}</h2>
      <div className="r-stickers">
        {LEVELS.map((l, i) => {
          const has = p.stickers.includes(l.id);
          const r = RACERS[i % 3];
          return (
            <div key={l.id} className={"r-sticker " + (has ? "has" : "")} title={t(l.title)}>
              <Character id={has ? r.poses.cheer : r.poses.idle} h={70} />
              <small>{t(l.title)}</small>
            </div>
          );
        })}
      </div>
      <p className="r-note">{lang === "en" ? "Get 3 stars in a race to earn its sticker." : "Dapatkan 3 bintang di sebuah balapan untuk mendapat stikernya."}</p>
    </div>
  );
}

export function ParentGate({ onPass, onCancel }: { onPass: () => void; onCancel: () => void }) {
  const { t } = useR();
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
    <div className="r-modal-scrim">
      <div className="r-modal gate" role="dialog" aria-modal="true">
        <p>{t({ k: "r.parentGate", p: { a: q.a, b: q.b } })}</p>
        <div className={"r-gate-val " + (err ? "shake" : "")}>{v || "—"}</div>
        {err && <small className="r-err">{t("r.wrongSum")}</small>}
        <div className="r-pad">{"1234567890".split("").map((d) => <button key={d} onClick={() => press(d)}>{d}</button>)}</div>
        <BigBtn color="white" onClick={onCancel}>{t("r.cancel")}</BigBtn>
      </div>
    </div>
  );
}

export function ParentScreen() {
  const { p, t, update } = useR();
  const [confirm, setConfirm] = useState(false);
  const set = <K extends keyof typeof p.settings>(k: K, v: (typeof p.settings)[K]) => update((x) => ({ ...x, settings: { ...x.settings, [k]: v } }));
  const races = Object.values(p.levels).reduce((a, l) => a + l.plays, 0);
  const Toggle = ({ k, label }: { k: "sound" | "music" | "voice"; label: string }) => (
    <label className="r-row"><span>{t(label)}</span><input type="checkbox" checked={p.settings[k]} onChange={(e) => set(k, e.target.checked)} /></label>
  );
  return (
    <div className="r-screen r-parents r-garage-bg">
      <div className="r-top"><BackBtn onClick={() => go("")} /><Banner>{t("r.parentTitle")}</Banner><span /></div>
      <div className="r-parent-grid">
        <section className="r-panel">
          <p className="r-note">{t("r.parentIntro")}</p>
          <div className="r-stats4">
            <div><b>{races}</b><small>{t("r.races")}</small></div>
            <div><b>{Math.round(accuracy(p) * 100)}%</b><small>{t("r.accuracy")}</small></div>
            <div><b>{p.trophies}</b><small>{t("r.trophies")}</small></div>
            <div><b>{p.coins}</b><small>{t("r.coins")}</small></div>
          </div>
          {Object.entries(p.skills).map(([k, v]) => (
            <div key={k} className="r-prog-row"><span>{k}</span><b>{v.c}/{v.a}</b></div>
          ))}
          <p className="r-note small">{t("r.placeholderNote")}</p>
        </section>
        <section className="r-panel">
          <div className="r-row"><span>{t("r.language")}</span>
            <span className="r-seg">{(["id", "en"] as const).map((l) => <button key={l} className={p.settings.lang === l ? "on" : ""} onClick={() => set("lang", l)}>{l === "id" ? "Bahasa Indonesia" : "English"}</button>)}</span></div>
          <div className="r-row"><span>{t("r.mode")}</span>
            <span className="r-seg">{[true, false].map((j) => <button key={String(j)} className={p.settings.junior === j ? "on" : ""} onClick={() => set("junior", j)}>{t(j ? "r.junior" : "r.explorer")}</button>)}</span></div>
          <div className="r-row"><span>{t("r.quality")}</span>
            <span className="r-seg">{(["auto", "low", "medium", "high"] as QualityPref[]).map((q) => <button key={q} className={p.settings.quality === q ? "on" : ""} onClick={() => set("quality", q)}>{t("r.q." + q)}</button>)}</span></div>
          <Toggle k="voice" label="r.voice" />
          <Toggle k="sound" label="r.sound" />
          <Toggle k="music" label="r.music" />
          {!confirm ? <button className="r-link danger" onClick={() => setConfirm(true)}>{t("r.reset")}</button>
            : <div className="r-row"><span>{t("r.resetConfirm")}</span><button className="r-link danger" onClick={() => { update((x) => ({ ...defaults(x.settings.lang), settings: x.settings })); setConfirm(false); sfx("tap"); }}>OK</button></div>}
        </section>
      </div>
    </div>
  );
}
void Pill;
