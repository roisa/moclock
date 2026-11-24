import { createRoot } from "react-dom/client";
import { App } from "./App";
import { RushProvider, loadRush } from "./state";
import { registerRushDicts } from "./i18n";
import { setCharacterBase } from "../ui/Character";
import "../styles/tokens.css";
import "../styles/app.css";
import "../styles/clock.css";
import "../styles/motion.css";
import "./styles/rush.css";

registerRushDicts();
// menus follow the device's light / dark setting (the ride itself stays a sunny morning)
const dark = matchMedia("(prefers-color-scheme: dark)");
const theme = () => (document.documentElement.dataset.theme = dark.matches ? "dark" : "light");
theme();
dark.addEventListener?.("change", theme);
setCharacterBase("../characters/");
// the site-wide service worker (one level up) keeps Time Rush offline too
if ("serviceWorker" in navigator && !import.meta.env.DEV)
  navigator.serviceWorker.register("../sw.js").then(() => navigator.serviceWorker.ready).then((reg) => reg.active?.postMessage({ type: "CACHE_RUSH" })).catch(() => {});

loadRush().then((p) => {
  createRoot(document.getElementById("root")!).render(
    <RushProvider initial={p}>
      <App />
    </RushProvider>,
  );
  document.getElementById("boot")?.remove();
});
