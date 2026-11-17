/**
 * Feedback effects that live outside React's tree (fire-and-forget DOM):
 *   burst(x, y)          – star rays + ring where the child tapped the right answer
 *   flyStar(x, y, el)    – a little star flies from there into the progress dot
 * and <HintHand>: an animated finger that shows how to tap or drag.
 */
import { useEffect, useRef, useState } from "react";

const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const COLORS = ["#ffd23f", "#ff9a3d", "#3cb55e", "#6cc4ff", "#b8a5ff", "#ff9fbd"];

export function burst(x: number, y: number, n = 12) {
  if (reduced()) return;
  const el = document.createElement("div");
  el.className = "burst";
  el.style.left = x + "px";
  el.style.top = y + "px";
  el.innerHTML = "<b></b>" + Array.from({ length: n }, (_, i) =>
    `<i style="--a:${(360 / n) * i + Math.random() * 12}deg;--d:${50 + Math.random() * 50}px;--c:${COLORS[i % COLORS.length]};animation-delay:${Math.random() * 0.06}s"></i>`).join("");
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

export function flyStar(x: number, y: number, target: Element | null) {
  if (reduced() || !target) return;
  const r = target.getBoundingClientRect();
  const el = document.createElement("div");
  el.className = "fly-star";
  el.style.left = x - 16 + "px";
  el.style.top = y - 16 + "px";
  el.style.setProperty("--dx", r.left + r.width / 2 - x + "px");
  el.style.setProperty("--dy", r.top + r.height / 2 - y + "px");
  el.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24"><path d="M12 3.2l2.6 5.5 6 .7-4.4 4.1 1.2 5.9L12 16.5l-5.4 2.9 1.2-5.9-4.4-4.1 6-.7z" fill="#FFD23F" stroke="#E89B00" stroke-width="1.2"/></svg>';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 950);
}

/** Last place the child touched (for bursts at the answer they picked). */
export const lastTouch = { x: innerWidth / 2, y: innerHeight / 2 };
if (typeof window !== "undefined")
  window.addEventListener("pointerdown", (e) => ((lastTouch.x = e.clientX), (lastTouch.y = e.clientY)), { capture: true, passive: true });

export type HandPlan = { kind: "tap"; at: [number, number] } | { kind: "drag"; path: [number, number][] };

/** A friendly finger. Tap: bobs on a point. Drag: glides along a path, again and again. */
export function HintHand({ plan }: { plan: HandPlan }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<[number, number]>(plan.kind === "tap" ? plan.at : plan.path[0]);
  useEffect(() => {
    if (plan.kind !== "drag" || reduced()) return;
    let raf = 0, t0 = 0;
    const pts = plan.path;
    const seg = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
    const total = seg.reduce((a, b) => a + b, 0) || 1;
    const loop = (now: number) => {
      if (!t0) t0 = now;
      const k = ((now - t0) % 2400) / 2400;
      const d = Math.min(1, Math.max(0, (k - 0.15) / 0.65)) * total;
      let acc = 0, i = 0;
      while (i < seg.length - 1 && acc + seg[i] < d) acc += seg[i++];
      const f = seg[i] ? (d - acc) / seg[i] : 0;
      const a = pts[i], b = pts[Math.min(i + 1, pts.length - 1)];
      setPos([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]);
      if (ref.current) ref.current.style.opacity = k < 0.08 || k > 0.92 ? "0" : "1";
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [plan]);
  return (
    <div ref={ref} className={"hint-hand " + plan.kind} style={{ left: pos[0] - 14, top: pos[1] - 4, transition: "opacity .2s" }} aria-hidden="true">
      <span className="ripple" />
      <svg viewBox="0 0 64 64" width="64" height="64">
        <path d="M22 30V12a5 5 0 0 1 10 0v14l2-1a5 5 0 0 1 6 2l1 1a5 5 0 0 1 7 2v1a5 5 0 0 1 7 3v12c0 9-7 16-16 16h-4c-6 0-10-3-13-8l-8-12a5 5 0 0 1 8-6z"
          fill="#fff" stroke="#2b3a2e" strokeWidth="3" strokeLinejoin="round" />
        <path d="M32 27v8M41 30v6M50 34v5" stroke="#2b3a2e" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/** Centre of the first element matching a selector, in viewport coords. */
export function centerOf(sel: string, root: ParentNode = document): [number, number] | null {
  const el = root.querySelector(sel);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  if (!r.width) return null;
  return [r.left + r.width / 2, r.top + r.height / 2];
}
