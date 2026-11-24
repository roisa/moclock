import { digital } from "../../engine/time";
import { useEffect, useState } from "react";
import { useRush, WORLDS, PLAYABLE, type Unlock, type WorldId } from "../state";
import { Pill, kit, Ribbon, StarCount } from "../ui/Kit";
import { Clock, Digital } from "../../ui/Clock";
import type { Stats } from "../core/sim";
import { go } from "../router";
import { audio } from "../audio";
import { Confetti } from "../../ui/Common";
import { look } from "../worlds";
import { wkey } from "../i18n";

export interface Finished { world: WorldId; s: Stats; praise: number; fresh: Unlock[]; firstClear: boolean }

/** the approved celebration frames: play once, then keep cheering on the last two */
function Celebrate() {
  const [f, setF] = useState(0);
  useEffect(() => {
    let i = 0;
    const h = setInterval(() => { i++; setF(i < 6 ? i : 4 + (i % 2)); }, 140);
    return () => clearInterval(h);
  }, []);
  return <div className="ru-celebrate" role="img" aria-label="Baby Mo" style={{ backgroundImage: "url(rush/mo/celebrate.webp)", backgroundPosition: `${f * 20}% 0` }} />;
}

export function Delivered({ f, onNext }: { f: Finished; onNext: () => void }) {
  const { t, lang } = useRush();
  const [shown, setShown] = useState(0);
  const L = look(f.world);
  const tw = (k: string) => t(wkey(k, f.world));
  useEffect(() => { if (L.doa) { const h = setTimeout(() => audio.clips([L.doa!.clip], lang, { force: true }), 1800); return () => clearTimeout(h); } }, [L, lang]);
  useEffect(() => {
    audio.sfx("fanfare");
    const ids = [0, 1, 2].map((i) => setTimeout(() => { setShown(i + 1); if (i < f.praise) audio.sfx("star"); }, 700 + i * 450));
    return () => ids.forEach(clearTimeout);
  }, [f.praise]);
  const s = f.s;
  return (
    <div className={"ru-screen ru-delivered w-" + f.world} style={{ backgroundImage: `url(rush/${f.world === "park" ? "bg-home2" : "bg-delivered"}.webp)` }}>
      <Confetti />
      <Ribbon>{t("ru.delivered")}</Ribbon>
      <div className="ru-delivered-body">
        <div className="ru-door">
          <div className="lib" />
          <Celebrate />
          <img className="books" src={L.bundles[2]} alt="" />
          {L.hosts && <div className="ru-hosts">{L.hosts.map((h) => <img key={h} src={h} alt="" />)}</div>}
          <span className="ru-bubble mo">{t("ru.salam")}</span>
          <span className="ru-bubble reply">{tw("ru.salamReply")}</span>
        </div>
        <div className="ru-panel ru-result">
          <div className="praise">{[0, 1, 2].map((k) => <img key={k} className={k < shown ? "pop" : ""} src={kit(k < f.praise && k < shown ? "star.webp" : "star-off.webp")} alt="" />)}</div>
          <p className="msg">{tw("ru.deliveredMsg")}</p>
          {L.doa && (
            <div className="ru-dua ru-dua-eat">
              <small>{t("ru.doa.eat")}</small>
              <p className="ar" dir="rtl" lang="ar">{L.doa.arabic}</p>
              <p className="latin">{L.doa.latin} — {t("ru.doa.eatMeaning")}</p>
              <button className="ru-dua-play" onClick={() => audio.clips([L.doa!.clip], lang, { force: true })}>🔊 {t("ru.dua.listen")}</button>
            </div>
          )}
          <p className="ru-friends-done"><img src="rush/mo/ais-front.webp" alt="" /><img src="rush/mo/adam-front.webp" alt="" />{t("ru.friendsDone")}</p>
          <div className="ru-arrived"><Clock t={s.time} size={70} /><span>{t({ k: "ru.arrivedAt", p: { t: { time: s.time } } })}<Digital t={s.time} size="s" /></span></div>
          {s.balloons.length > 0 && <div className="ru-seen-today"><small>{t("ru.timesSeen2")}</small><div>{[...s.balloons].sort((a, b) => a - b).map((b) => <figure key={b}><Clock t={b} size={40} /><figcaption>{digital(b)}</figcaption></figure>)}</div></div>}
          <ul>
            <li><img src={kit("star.webp")} alt="" />{t("ru.stars")}<b>{s.stars}</b></li>
            <li><span className="mini-balloon" />{t("ru.balloons")}<b>{s.balloons.length}</b></li>
            <li><img src={L.friend.img} alt="" />{t("ru.friend")}<b>{s.token ? t("ru.yes") : t("ru.notYet")}</b></li>
            <li><span className="mini-tunnel" />{t("ru.shortcut")}<b>{s.shortcut ? t("ru.yes") : t("ru.notYet")}</b></li>
          </ul>
          <Pill big onClick={onNext}>{t("ru.continue")}</Pill>
        </div>
      </div>
    </div>
  );
}

export function Rewards({ f }: { f: Finished }) {
  const { p, t } = useRush();
  useEffect(() => { audio.sfx("correct"); }, []);
  const next = WORLDS[WORLDS.indexOf(f.world) + 1];
  return (
    <div className="ru-screen ru-rewards" style={{ backgroundImage: "url(rush/bg-rewards.webp)" }}>
      <Ribbon color="purple">{t("ru.rewards")}</Ribbon>
      <div className="ru-rewards-body">
        <div className="ru-reward-art"><img className="chest" src="rush/art/chest.webp" alt="" /><img className="pair" src="rush/mo/pair-highfive.webp" alt="Baby Mo and Baby Ais" /></div>
        <div className="ru-panel">
          <p className="gain">+{f.s.stars} <img src={kit("star.webp")} alt="" /></p>
          <StarCount n={p.stars} />
          {f.fresh.length > 0 && <>
            <h3>{t("ru.newUnlock")}</h3>
            <div className="ru-fresh">{f.fresh.map((u) => <span key={u.kind + u.id} className="ru-unlock on"><span className={"sw " + u.kind} style={{ background: u.color === "rainbow" ? "linear-gradient(90deg,#ff7a7a,#ffe06a,#7ee08a,#7fcaff,#b8a5ff)" : u.color }} /><b>{t(`ru.${u.kind}.${u.id}`)}</b></span>)}</div>
          </>}
          <div className="row">
            <Pill color="yellow" onClick={() => go("ride/" + f.world, true)}>{t("ru.replay")}</Pill>
            <Pill big onClick={() => go(f.firstClear && next ? "unlock/" + next : "worlds", true)}>{t("ru.continue")}</Pill>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorldUnlock({ world }: { world: WorldId }) {
  const { t } = useRush();
  useEffect(() => { audio.sfx("fanfare"); }, []);
  return (
    <div className="ru-screen ru-unlockw" style={{ backgroundImage: "url(rush/bg-rewards.webp)" }}>
      <Confetti />
      <Ribbon>{t("ru.worldUnlocked")}</Ribbon>
      <div className="ru-panel ru-unlockw-card">
        <img src="rush/mo/pair-jump.webp" alt="Baby Mo and Baby Ais" />
        <h2>{t("ru.w." + world)}</h2>
        <p>{t("ru.wd." + world)}</p>
        {PLAYABLE.includes(world) ? <Pill big onClick={() => go("mission/" + world, true)}>{t("ru.play")} ▶</Pill> : <><span className="soon">{t("ru.comingSoon")}</span><Pill big onClick={() => go("worlds", true)}>{t("ru.continue")}</Pill></>}
      </div>
    </div>
  );
}
