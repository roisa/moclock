import { useStore } from "../state";
import { WORLDS } from "../content/worlds";
import { activitiesOf } from "../content/activities";
import { worldStars } from "../engine/progress";
import { Character } from "../ui/Character";
import { WorldArt } from "../ui/Scene";
import { StarPill, Stars } from "../ui/Common";
import { href } from "../router";
import { totalStars } from "../engine/progress";
import { sfx } from "../platform/audio";

export function Games() {
  const { p, t } = useStore();
  return (
    <div className="page games">
      <header className="topbar">
        <div className="grow"><h1>{t("nav.games")}</h1></div>
        <StarPill n={totalStars(p)} />
      </header>
      <div className="games-list">
        {WORLDS.map((w) => {
          const acts = activitiesOf(w.id);
          const ws = worldStars(p, acts.map((a) => a.id));
          return (
            <section key={w.id} className={`games-world card c-${w.color}`}>
              <a className="gw-head" href={href({ name: "world", world: w.id })} onClick={() => sfx("tap")}>
                <div className="gw-art"><WorldArt scene={w.scene} /><Character id={w.pose} h={92} className="gw-mo" /></div>
                <div className="gw-title">
                  <small>{t(w.tagline)}</small>
                  <h2>{t(w.title)}</h2>
                  <div className="world-meta"><Stars n={Math.round((ws.got / ws.max) * 3)} size={18} /><span>{t({ k: "world.games", p: { n: acts.length } })}</span></div>
                </div>
              </a>
              <div className="gw-acts">
                {acts.map((a) => (
                  <a key={a.id} className="mini-act" href={href({ name: "play", activity: a.id })} onClick={() => sfx("tap")}>
                    <Character id={a.pose} h={54} />
                    <span>{t(a.title)}</span>
                    <Stars n={p.activities[a.id]?.stars || 0} size={14} />
                  </a>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
