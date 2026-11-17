import { useCallback, useEffect, useRef } from "react";

/** setTimeout that is cancelled automatically when the player unmounts
 *  (closing the game, the hint button, next question…). */
export function useLater() {
  const ids = useRef<number[]>([]);
  useEffect(() => () => ids.current.forEach(clearTimeout), []);
  return useCallback((fn: () => void, ms: number) => {
    ids.current.push(window.setTimeout(fn, ms));
  }, []);
}
