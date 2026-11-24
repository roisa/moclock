/** UIManager: hash router + overlays for Time Rush. */
import { useState } from "react";
import { useHashRoute, go } from "./router";
import { useRush, applyRide, isWorldOpen, WORLDS, type WorldId } from "./state";
import { Splash, Home, Worlds, Mission, Garage, Collection, Parents, ParentGate } from "./screens/Menus";
import { RideScreen } from "./screens/Ride";
import { Delivered, Rewards, WorldUnlock, type Finished } from "./screens/After";
import { unlockAudio } from "../platform/audio";

export function App() {
  const route = useHashRoute();
  const { p, update } = useRush();
  const [started, setStarted] = useState(false);
  const [gate, setGate] = useState(false);
  const [passed, setPassed] = useState(false);
  const [last, setLast] = useState<Finished | null>(null);
  const [rideKey, setRideKey] = useState(0);
  const [head, arg] = route;
  const w = (WORLDS.includes(arg as WorldId) ? arg : "morning") as WorldId;

  if (!started && !head) return <div className="ru-app"><Splash onStart={() => { unlockAudio(); setStarted(true); }} /></div>;

  let screen;
  switch (head) {
    case "worlds": screen = <Worlds />; break;
    case "mission": screen = isWorldOpen(p, w) ? <Mission world={w} /> : <Worlds />; break;
    case "ride":
      screen = isWorldOpen(p, w) ? (
        <RideScreen key={rideKey + w} world={w}
          onQuit={() => go("worlds", true)}
          onRestart={() => setRideKey((k) => k + 1)}
          onDone={(s) => {
            const firstClear = !p.worlds[w];
            const { next, praise, fresh } = applyRide(p, w, s);
            update(() => next);
            setLast({ world: w, s, praise, fresh, firstClear });
            go("delivered", true);
          }} />
      ) : <Worlds />;
      break;
    case "delivered": screen = last ? <Delivered f={last} onNext={() => go("rewards", true)} /> : <Worlds />; break;
    case "rewards": screen = last ? <Rewards f={last} /> : <Worlds />; break;
    case "unlock": screen = <WorldUnlock world={w} />; break;
    case "garage": screen = <Garage />; break;
    case "collection": screen = <Collection />; break;
    case "parents": screen = passed ? <Parents /> : <Home onGate={() => setGate(true)} />; break;
    default: screen = <Home onGate={() => setGate(true)} />;
  }
  if (head === "parents" && !passed && !gate) setTimeout(() => setGate(true), 0);
  return (
    <div className="ru-app" onPointerDown={() => unlockAudio()}>
      {screen}
      {gate && <ParentGate onPass={() => { setPassed(true); setGate(false); go("parents"); }} onCancel={() => { setGate(false); if (head === "parents") go("", true); }} />}
    </div>
  );
}
