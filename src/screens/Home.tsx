import { useEffect, useState } from "react";
import { useStore } from "../state";
import { Character } from "../ui/Character";
import { Clock } from "../ui/Clock";
import { Sky, WorldArt } from "../ui/Scene";
import { Icon } from "../ui/Icon";
import { StarPill, Stars } from "../ui/Common";
import { WORLDS } from "../content/worlds";
import { activitiesOf, activityById } from "../content/activities";
import { learnerLevel, totalStars, worldStars } from "../engine/progress";
import { dayPart } from "../engine/time";
import { go, href } from "../router";
import { hub } from "../platform/storage";
import { sfx } from "../platform/audio";

function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 20_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function Home({ onParent }: { onParent: () => void }) {
  const { p, t, say, device } = useStore();
  const heroH = device.size === "phone" ? 200 : device.size === "phone-land" ? 170 : 290;
  const now = useNow();
  const min = now.getHours() * 60 + now.getMinutes();
  const part = dayPart(min);
  const stars = totalStars(p);
  const lv = learnerLevel(stars);
  const name = hub.childName();
  const mission = activityById(p.daily.id);
  const played = Object.keys(p.activities).length;
  const [pose, setPose] = useState(part === "night" ? "mo-sleepy" : "mo-wave");
  const greet = { k: "home.hi", p: { name: name ? ", " + name : "" } };

  const tapClock = () => {
    sfx("tap");
    setPose("mo-point");
    say({ k: "home.now", p: { t: { time: min % 720 } } }).then(() => say("home.nowPart." + part));
  };
  const tapMo = () => {
    setPose(pose === "mo-yeyy" ? "mo-wave" : "mo-yeyy");
    say(t(greet, "say") + " " + t("home.ready", "say"));
  };

  return (
    <div className="page home">
      <header className="home-top">
        <div className="brand">
          <img src="./icons/icon-192.png" alt="" width={44} height={44} />
          <div>
            <b className="head">{t("app.short")}</b>
            <small>Baby Mo</small>
          </div>
        </div>
        <StarPill n={stars} />
        <button className="icon-btn" onClick={onParent} aria-label={t("nav.parents")} title={t("nav.parents")}>
          <Icon name="parent" />
        </button>
      </header>

      <section className="hero card">
        <Sky min={min} env={p.env !== "meadow" ? p.env : undefined} className="hero-sky" />
        <div className="hero-mo">
          <button className="hero-char" onClick={tapMo} aria-label={t("a11y.speak")}>
            <Character id={pose} h={heroH} anim="bob" key={pose} stage />
          </button>
          <div className="bubble tail-left hero-bubble rise">
            <h1>{t(greet)}</h1>
            <p>{t("home.ready")}</p>
          </div>
        </div>
        <button className="hero-clock" onClick={tapClock} aria-label={t({ k: "home.now", p: { t: { time: min % 720 } } })}>
          <Clock t={min % 720} size="100%" face={part === "night" ? "sky" : "cream"} />
          <span className="chip">{t("home.tapClock")}</span>
        </button>
      </section>

      <div className="home-row">
        <section className="level card">
          <div className="level-badge"><b>{lv.level}</b><small>{t({ k: "home.level", p: { n: "" } }).trim()}</small></div>
          <div className="grow">
            <h2>{t("rw.levelName." + Math.min(lv.level, 9))}</h2>
            <div className="bar"><i style={{ width: (lv.to > lv.from ? ((stars - lv.from) / (lv.to - lv.from)) * 100 : 100) + "%" }} /></div>
            <small>{lv.to > stars ? t({ k: "home.toNext", p: { n: lv.to - stars } }) : t({ k: "home.progress", p: { a: played, b: 28 } })}</small>
          </div>
        </section>

        {mission && (
          <a className={"mission card " + (p.daily.done ? "done" : "")} href={href({ name: "play", activity: mission.id })} onClick={() => sfx("tap")}>
            <div className="mission-art"><Character id={mission.pose} h={92} /></div>
            <div className="grow">
              <span className="chip">{p.daily.done ? "✓ " + t("home.missionDone") : t("home.mission")}</span>
              <h2>{t(mission.title)}</h2>
              <small>{t(mission.goal)}</small>
            </div>
            <span className="icon-btn green pulse" aria-hidden="true"><Icon name="play" /></span>
          </a>
        )}
      </div>

      <h2 className="section-title">{t("home.worlds")}</h2>
      <section className="worlds">
        {WORLDS.map((w, i) => {
          const ids = activitiesOf(w.id).map((a) => a.id);
          const ws = worldStars(p, ids);
          return (
            <a key={w.id} className={`world-card card c-${w.color} rise`} style={{ animationDelay: i * 0.06 + "s" }} href={href({ name: "world", world: w.id })} onClick={() => sfx("tap")}>
              <div className="world-art"><WorldArt scene={w.scene} /></div>
              <div className="world-chars">
                {w.friend && <Character id={w.friend} h={78} className="friend" />}
                <Character id={w.pose} h={96} />
              </div>
              <div className="world-info">
                <small>{t(w.tagline)}</small>
                <h3>{t(w.title)}</h3>
                <div className="world-meta">
                  <Stars n={Math.round((ws.got / ws.max) * 3)} size={18} />
                  <span>{ws.done}/{ids.length}</span>
                </div>
              </div>
            </a>
          );
        })}
      </section>
      <button className="sr" onClick={() => go({ name: "games" })}>{t("nav.games")}</button>
    </div>
  );
}
