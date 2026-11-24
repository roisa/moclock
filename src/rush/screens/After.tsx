import { digital } from "../../engine/time";
import { useEffect, useState } from "react";
import { useRush, WORLDS, type Unlock, type WorldId } from "../state";
import { Pill, Mo, kit, Ribbon, StarCount } from "../ui/Kit";
import { Clock, Digital } from "../../ui/Clock";
import type { Stats } from "../core/sim";
import { go } from "../router";
import { audio } from "../audio";
import { Confetti } from "../../ui/Common";

export interface Finished { world: WorldId; s: Stats; praise: number; fresh: Unlock[]; firstClear: boolean }

export function Delivered({ f, onNext }: { f: Finished; onNext: () => void }) {
  const { t } = useRush();
  const [shown, setShown] = useState(0);
  useEffect(() => {
    audio.sfx("fanfare");
    const ids = [0, 1, 2].map((i) => setTimeout(() => { setShown(i + 1); if (i < f.praise) audio.sfx("star"); }, 700 + i * 450));
    return () => ids.forEach(clearTimeout);
  }, [f.praise]);
  const s = f.s;
  return (
    <div className="ru-screen ru-delivered">
      <Confetti />
      <Ribbon>{t("ru.delivered")}</Ribbon>
      <div className="ru-delivered-body">
        <div className="ru-door">
          <img className="lib" src={kit("v-school.webp")} alt="" />
          <Mo pose="mo-yeyy" h="38vh" className="ru-delivered-mo" />
          <img className="books" src={kit("books.webp")} alt="" />
        </div>
        <div className="ru-panel ru-result">
          <div className="praise">{[0, 1, 2].map((k) => <img key={k} className={k < shown ? "pop" : ""} src={kit(k < f.praise && k < shown ? "star.webp" : "star-off.webp")} alt="" />)}</div>
          <p className="msg">{t("ru.deliveredMsg")}</p>
          <div className="ru-arrived"><Clock t={s.time} size={70} /><span>{t({ k: "ru.arrivedAt", p: { t: { time: s.time } } })}<Digital t={s.time} size="s" /></span></div>
          {s.balloons.length > 0 && <div className="ru-seen-today"><small>{t("ru.timesSeen2")}</small><div>{[...s.balloons].sort((a, b) => a - b).map((b) => <figure key={b}><Clock t={b} size={40} /><figcaption>{digital(b)}</figcaption></figure>)}</div></div>}
          <ul>
            <li><img src={kit("star.webp")} alt="" />{t("ru.stars")}<b>{s.stars}</b></li>
            <li><span className="mini-balloon" />{t("ru.balloons")}<b>{s.balloons.length}</b></li>
            <li><img src={kit("pet-rabbit.webp")} alt="" />{t("ru.friend")}<b>{s.token ? t("ru.yes") : t("ru.notYet")}</b></li>
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
    <div className="ru-screen ru-rewards">
      <Ribbon color="purple">{t("ru.rewards")}</Ribbon>
      <div className="ru-rewards-body">
        <div className="ru-reward-art"><img className="chest" src={kit("chest-open.webp")} alt="" /><img className="trophy" src={kit("trophy-gold.webp")} alt="" /></div>
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
    <div className="ru-screen ru-unlockw">
      <Confetti />
      <Ribbon>{t("ru.worldUnlocked")}</Ribbon>
      <div className="ru-panel ru-unlockw-card">
        <img src={kit("v-garden.webp")} alt="" />
        <h2>{t("ru.w." + world)}</h2>
        <p>{t("ru.wd." + world)}</p>
        <span className="soon">{t("ru.comingSoon")}</span>
        <Pill big onClick={() => go("worlds", true)}>{t("ru.continue")}</Pill>
      </div>
    </div>
  );
}
