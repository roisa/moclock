/** Tiny hash router (works on any host path, file:// and inside Capacitor). */
import { useEffect, useState } from "react";

export type Route =
  | { name: "home" }
  | { name: "games" }
  | { name: "world"; world: string }
  | { name: "play"; activity: string }
  | { name: "rewards" }
  | { name: "parent" };

export function parse(hash: string): Route {
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  switch (parts[0]) {
    case "games": return { name: "games" };
    case "world": return parts[1] ? { name: "world", world: parts[1] } : { name: "games" };
    case "play": return parts[1] ? { name: "play", activity: parts[1] } : { name: "games" };
    case "rewards": return { name: "rewards" };
    case "parent": return { name: "parent" };
    default: return { name: "home" };
  }
}
export function href(r: Route): string {
  switch (r.name) {
    case "home": return "#/";
    case "games": return "#/games";
    case "world": return "#/world/" + r.world;
    case "play": return "#/play/" + r.activity;
    case "rewards": return "#/rewards";
    case "parent": return "#/parent";
  }
}
export function go(r: Route, replace = false) {
  const h = href(r);
  if (replace) history.replaceState(null, "", h);
  else location.hash = h;
  if (replace) window.dispatchEvent(new HashChangeEvent("hashchange"));
}
export function useRoute(): Route {
  const [r, setR] = useState(() => parse(location.hash));
  useEffect(() => {
    const on = () => {
      setR(parse(location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return r;
}
