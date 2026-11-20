import { createRoot } from "react-dom/client";
import { App } from "./App";
import { RacersProvider, loadRacers } from "./state";
import { registerRacerDicts } from "./i18n";
import { setCharacterBase } from "../ui/Character";
import "../styles/tokens.css";
import "../styles/app.css";
import "../styles/clock.css";
import "../styles/motion.css";
import "./styles/racers.css";

registerRacerDicts();
setCharacterBase("../characters/");
// play.babymo.id-style offline: the site-wide service worker (one level up) caches the racer too
if ("serviceWorker" in navigator && !import.meta.env.DEV)
  navigator.serviceWorker.register("../sw.js").then(() => navigator.serviceWorker.ready).then((reg) => reg.active?.postMessage({ type: "CACHE_RACERS" })).catch(() => {});

loadRacers().then((p) => {
  createRoot(document.getElementById("root")!).render(
    <RacersProvider initial={p}>
      <App />
    </RacersProvider>,
  );
  document.getElementById("boot")?.remove();
});
