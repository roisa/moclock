import { createRoot } from "react-dom/client";
import { App } from "./App";
import { StoreProvider, loadInitial } from "./state";
import { initPwa } from "./platform/pwa";
import { IN_HUB } from "./platform/native";
import { applyDeviceAttrs, readDevice } from "./platform/device";
import "./styles/tokens.css";
import "./styles/app.css";
import "./styles/clock.css";
import "./styles/screens.css";
import "./styles/games.css";
import "./styles/motion.css";

applyDeviceAttrs(readDevice());
// Inside play.babymo.id: reuse the hub's recorded Baby Mo voice clips
// (bm-voice.js plays a recording instead of text-to-speech when one exists).
if (IN_HUB) {
  for (const src of ["../voice/manifest.js", "../bm-voice.js"]) {
    const s = document.createElement("script");
    s.src = src;
    s.async = false;
    document.head.appendChild(s);
  }
}
initPwa();
loadInitial().then((initial) => {
  createRoot(document.getElementById("root")!).render(
    <StoreProvider initial={initial}>
      <App />
    </StoreProvider>,
  );
  document.getElementById("boot")?.remove();
});
