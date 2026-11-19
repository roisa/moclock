import { useEffect, useState } from "react";
/** hash routes: "" | map | racer | garage | levels/<world> | tutorial/<level> | race/<level> | results | progress | rewards | parents | settings */
export function useHashRoute(): string[] {
  const get = () => location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const [r, setR] = useState(get);
  useEffect(() => {
    const on = () => setR(get());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return r;
}
export function go(path: string, replace = false) {
  const h = "#/" + path;
  if (replace) {
    history.replaceState(null, "", h);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  } else location.hash = h;
}
