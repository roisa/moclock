import { useEffect, useState } from "react";
import { useRoute, go } from "./router";
import { useStore } from "./state";
import { BottomNav, ParentGate, PwaBanner, Toast } from "./ui/Common";
import { Home } from "./screens/Home";
import { Games } from "./screens/Games";
import { World } from "./screens/World";
import { Play } from "./screens/Play";
import { Rewards } from "./screens/Rewards";
import { Parent } from "./screens/Parent";
import { unlockAudio } from "./platform/audio";

export function App() {
  const route = useRoute();
  const { t } = useStore();
  const [gate, setGate] = useState(false);
  const [parentOk, setParentOk] = useState(false);

  useEffect(() => {
    const u = () => unlockAudio();
    window.addEventListener("pointerdown", u, { once: true });
    window.addEventListener("keydown", u, { once: true });
    return () => {
      window.removeEventListener("pointerdown", u);
      window.removeEventListener("keydown", u);
    };
  }, []);
  // the parent corner always needs the gate (also when opened from a link)
  useEffect(() => {
    if (route.name === "parent" && !parentOk) setGate(true);
  }, [route, parentOk]);

  const showNav = route.name !== "play" && route.name !== "parent";
  let screen;
  switch (route.name) {
    case "home": screen = <Home onParent={() => setGate(true)} />; break;
    case "games": screen = <Games />; break;
    case "world": screen = <World id={route.world} />; break;
    case "play": screen = <Play id={route.activity} />; break;
    case "rewards": screen = <Rewards />; break;
    case "parent": screen = parentOk ? <Parent /> : <div className="page" />; break;
  }
  return (
    <div className={"app route-" + route.name}>
      <a className="sr" href="#main">{t("app.name")}</a>
      {showNav && <BottomNav route={route.name} />}
      <div className="app-main" id="main">{screen}</div>
      {gate && (
        <ParentGate
          onPass={() => { setParentOk(true); setGate(false); if (route.name !== "parent") go({ name: "parent" }); }}
          onCancel={() => { setGate(false); if (route.name === "parent") go({ name: "home" }, true); }}
        />
      )}
      <Toast />
      <PwaBanner />
    </div>
  );
}
