import { useEffect, useState } from "react";
import { useStore } from "../state";
import { ENVIRONMENTS, STICKERS, badges } from "../content/rewards";
import { learnerLevel, totalStars } from "../engine/progress";
import { worldById } from "../content/worlds";
import { Character } from "../ui/Character";
import { Icon, Star } from "../ui/Icon";
import { Modal } from "../ui/Common";
import { Sky } from "../ui/Scene";
import { sfx } from "../platform/audio";

export function Rewards() {
  const { p, update, t, say } = useStore();
  const stars = totalStars(p);
  const lv = learnerLevel(stars);
  const [open, setOpen] = useState<string | null>(null);
  const fresh = p.newStickers;
  useEffect(() => {
    if (fresh.length) {
      const id = setTimeout(() => update((x) => ({ ...x, newStickers: [] })), 2500);
      return () => clearTimeout(id);
    }
  }, [fresh.length, update]);
  const st = STICKERS.find((s) => s.id === open);
  return (
    <div className="page rewards">
      <header className="topbar"><div className="grow"><h1>{t("rw.title")}</h1></div></header>

      <section className="rw-hero card">
        <div className="rw-total">
          <Star size={84} />
          <b>{stars}</b>
          <span>{t("rw.stars")}</span>
        </div>
        <div className="rw-level">
          <span className="chip">{t({ k: "home.level", p: { n: lv.level } })}</span>
          <h2>{t("rw.levelName." + Math.min(lv.level, 9))}</h2>
          <div className="bar"><i style={{ width: (lv.to > lv.from ? ((stars - lv.from) / (lv.to - lv.from)) * 100 : 100) + "%" }} /></div>
          {lv.to > stars && <small>{t({ k: "home.toNext", p: { n: lv.to - stars } })}</small>}
        </div>
        <Character id="mo-thanks" h={150} anim="bob" className="rw-mo" />
      </section>

      <h2 className="section-title">{t("rw.stickers")} <small>{p.stickers.length}/{STICKERS.length}</small></h2>
      <section className="stickers">
        {STICKERS.map((s) => {
          const has = p.stickers.includes(s.id);
          return (
            <button key={s.id} className={`sticker-slot card ${has ? "has" : "locked"} ${fresh.includes(s.id) ? "fresh" : ""}`}
              onClick={() => { sfx("tap"); setOpen(s.id); say(has ? s.title : s.how); }}>
              <span className={`sticker bg-${s.bg}`}>
                <Character id={s.pose} h={78} />
                {!has && <span className="lock"><Icon name="lock" size={26} /></span>}
              </span>
              <b>{t(s.title)}</b>
            </button>
          );
        })}
      </section>

      <h2 className="section-title">{t("rw.badges")}</h2>
      <section className="badges">
        {badges(p).map((b) => {
          const w = worldById(b.world)!;
          const done = b.done === b.total;
          return (
            <div key={b.world} className={`badge card c-${w.color} ${done ? "done" : ""}`}>
              <div className="medal"><Character id={w.pose} h={64} /></div>
              <b>{t(w.title)}</b>
              <div className="bar"><i style={{ width: (b.done / b.total) * 100 + "%" }} /></div>
              <small>{done ? t("rw.badgeDone") : `${b.done}/${b.total}`}</small>
            </div>
          );
        })}
      </section>

      <h2 className="section-title">{t("rw.places")}</h2>
      <section className="envs">
        {ENVIRONMENTS.map((e) => {
          const unlocked = stars >= e.stars;
          const using = p.env === e.id;
          return (
            <button key={e.id} className={`env card ${unlocked ? "" : "locked"} ${using ? "using" : ""}`} disabled={!unlocked}
              onClick={() => { sfx("snap"); update((x) => ({ ...x, env: e.id })); }}>
              <Sky env={e.id} />
              <span className="env-label">
                <b>{t(e.title)}</b>
                <small>{!unlocked ? t({ k: "rw.needStars", p: { n: e.stars } }) : using ? "✓ " + t("rw.using") : t("rw.use")}</small>
              </span>
              {!unlocked && <span className="lock"><Icon name="lock" size={30} /></span>}
            </button>
          );
        })}
      </section>

      {st && (
        <Modal label={t(st.title)} onClose={() => setOpen(null)}>
          <div className="sticker-modal">
            <span className={`sticker big bg-${st.bg} ${p.stickers.includes(st.id) ? "" : "locked"}`}><Character id={st.pose} h={150} anim="pop" /></span>
            <h2>{t(st.title)}</h2>
            <p><small>{t("rw.howTo")}</small><br />{t(st.how)}</p>
            <button className="btn" onClick={() => setOpen(null)}>{t("nav.close")}</button>
          </div>
        </Modal>
      )}
    </div>
  );
}
