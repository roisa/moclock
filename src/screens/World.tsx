import { useEffect } from "react";
import { useStore } from "../state";
import { worldById } from "../content/worlds";
import { activitiesOf } from "../content/activities";
import { worldStars } from "../engine/progress";
import { Character } from "../ui/Character";
import { WorldArt } from "../ui/Scene";
import { Icon } from "../ui/Icon";
import { Stars } from "../ui/Common";
import { go, href } from "../router";
import { sfx } from "../platform/audio";
import { Guide } from "../ui/Guide";

export function World({ id }: { id: string }) {
  const { p, t, say } = useStore();
  const w = worldById(id);
  const acts = activitiesOf(id);
  useEffect(() => {
    if (!w) go({ name: "games" }, true);
  }, [w]);
  if (!w) return null;
  const ws = worldStars(p, acts.map((a) => a.id));
  const next = acts.find((a) => !(p.activities[a.id]?.stars > 0)) || acts.find((a) => (p.activities[a.id]?.stars || 0) < 3) || acts[0];
  const intro = "world.intro." + id;
  return (
    <div className={`page world c-${w.color}`}>
      <header className="topbar">
        <a className="icon-btn" href={href({ name: "games" })} aria-label={t("nav.back")}><Icon name="back" /></a>
        <div className="grow">
          <small className="kicker">{t(w.tagline)}</small>
          <h1>{t(w.title)}</h1>
        </div>
        <span className="pill"><Stars n={1} max={1} size={22} /> {ws.got}/{ws.max}</span>
      </header>
      <section className="world-hero card">
        <WorldArt scene={w.scene} />
        <div className="world-hero-in">
          <Guide pose={w.pose} text={intro} h={150} onReplay={() => say(intro)} />
          {w.friend && <Character id={w.friend} h={130} anim="bob" className="world-friend" />}
        </div>
      </section>
      <ol className="path">
        {acts.map((a, i) => {
          const ap = p.activities[a.id];
          const isNext = a.id === next.id;
          return (
            <li key={a.id} className="rise" style={{ animationDelay: i * 0.04 + "s" }}>
              <a className={`act card ${isNext ? "next" : ""} ${ap?.stars ? "played" : ""}`} href={href({ name: "play", activity: a.id })} onClick={() => sfx("tap")}>
                <span className="act-num">{i + 1}</span>
                <div className="act-art"><Character id={a.pose} h={84} /></div>
                <div className="act-info">
                  <h3>{t(a.title)}</h3>
                  <small>{t(a.goal)}</small>
                  <Stars n={ap?.stars || 0} size={20} />
                </div>
                {isNext && <span className="chip next-chip">{t("world.next")}</span>}
                <span className="icon-btn green" aria-hidden="true"><Icon name="play" /></span>
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
