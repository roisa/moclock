import { useState } from "react";
import { useHashRoute, go } from "./router";
import { useR, applyRace } from "./state";
import { Home, MapScreen, RacerScreen, GarageScreen, LevelsScreen, TutorialScreen } from "./screens/Menus";
import { RaceScreen, type FinishedRace } from "./screens/Race";
import { Results, ProgressScreen, RewardsScreen, ParentGate, ParentScreen } from "./screens/After";
import { levelById } from "./content/levels";
import { unlockAudio } from "../platform/audio";

export function App() {
  const route = useHashRoute();
  const { update, p } = useR();
  const [gate, setGate] = useState<null | "parents" | "settings">(null);
  const [passed, setPassed] = useState(false);
  const [last, setLast] = useState<{ levelId: string; s: FinishedRace["summary"]; stars: number; sticker: string | null } | null>(null);

  const finish = (r: FinishedRace) => {
    const lv = levelById(r.levelId)!;
    const { next, stars, newSticker } = applyRace(p, r.levelId, lv.family, r.summary);
    update(() => next);
    setLast({ levelId: r.levelId, s: r.summary, stars, sticker: newSticker });
    go("results", true);
  };
  const [head, arg] = route;
  let screen;
  switch (head) {
    case "map": screen = <MapScreen />; break;
    case "racer": screen = <RacerScreen />; break;
    case "garage": screen = <GarageScreen />; break;
    case "levels": screen = <LevelsScreen world={arg || "clock-town"} />; break;
    case "tutorial": screen = <TutorialScreen levelId={arg} />; break;
    case "race": screen = <RaceScreen levelId={arg} onFinish={finish} key={arg + (last?.s.time ?? "")} />; break;
    case "results": screen = last ? <Results levelId={last.levelId} s={last.s} stars={last.stars} sticker={last.sticker} /> : <MapScreen />; break;
    case "progress": screen = <ProgressScreen />; break;
    case "rewards": screen = <RewardsScreen />; break;
    case "parents": case "settings": screen = passed ? <ParentScreen /> : <Home onGate={setGate} />; break;
    default: screen = <Home onGate={setGate} />;
  }
  if ((head === "parents" || head === "settings") && !passed && !gate) setTimeout(() => setGate("parents"), 0);
  return (
    <div className="r-app" onPointerDown={() => unlockAudio()}>
      {screen}
      {gate && (
        <ParentGate
          onPass={() => { setPassed(true); setGate(null); go("parents"); }}
          onCancel={() => { setGate(null); if (head === "parents" || head === "settings") go("", true); }}
        />
      )}
    </div>
  );
}
