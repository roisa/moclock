import { createRoot } from "react-dom/client";
import { App } from "./App";
import { RushProvider, loadRush } from "./state";
import { registerRushDicts } from "./i18n";
import { PrayerProvider } from "./prayer/prayer";
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
setCharacterBase("./characters/");
// the site's service worker precaches Time Rush (it is the home page) for offline play
if ("serviceWorker" in navigator && !import.meta.env.DEV) navigator.serviceWorker.register("./sw.js").catch(() => {});

loadRush().then((p) => {
  createRoot(document.getElementById("root")!).render(
    <RushProvider initial={p}>
      <PrayerProvider>
        <App />
      </PrayerProvider>
    </RushProvider>,
  );
  document.getElementById("boot")?.remove();
});
