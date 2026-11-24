/**
 * On-screen thumb stick (outer ring + inner knob), like the move stick in island / craft
 * games. Drag the knob left / right to steer; how far you push sets how fast Mo moves
 * sideways. Let go and the knob springs back to the centre.
 */
import { useRef, useState } from "react";

export function Joystick({ onMove, label }: { onMove: (x: number | null) => void; label: string }) {
  const ring = useRef<HTMLDivElement>(null);
  const [k, setK] = useState({ x: 0, y: 0, on: false });
  const id = useRef<number | null>(null);
  const move = (e: React.PointerEvent) => {
    const r = ring.current!.getBoundingClientRect();
    const R = r.width / 2;
    let dx = e.clientX - (r.left + R), dy = e.clientY - (r.top + R);
    const d = Math.hypot(dx, dy), max = R * 0.62;
    if (d > max) { dx = (dx / d) * max; dy = (dy / d) * max; }
    setK({ x: dx, y: dy, on: true });
    const v = dx / max;
    onMove(Math.abs(v) < 0.14 ? 0 : Math.sign(v) * ((Math.abs(v) - 0.14) / 0.86)); // small dead zone in the middle
  };
  const end = () => { id.current = null; setK({ x: 0, y: 0, on: false }); onMove(null); };
  return (
    <div ref={ring} className={"ru-stick" + (k.on ? " on" : "")} role="slider" aria-label={label} aria-valuemin={-1} aria-valuemax={1} aria-valuenow={0}
      onPointerDown={(e) => { e.stopPropagation(); id.current = e.pointerId; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); move(e); }}
      onPointerMove={(e) => { if (id.current === e.pointerId) move(e); }}
      onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end}>
      <span className="arrow l" /><span className="arrow r" />
      <span className="knob" style={{ transform: `translate(calc(-50% + ${k.x}px), calc(-50% + ${k.y}px))` }} />
    </div>
  );
}
