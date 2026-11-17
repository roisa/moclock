/**
 * The interactive analog clock.
 *  - One source of truth: `t` (minutes on a 12-hour face). Both hands and the
 *    digital read-out are derived from it, so they can never disagree.
 *  - The hour hand creeps as the minute hand turns (correct maths).
 *  - Drag the long hand (crossing 12 moves the hour on or back), or drag the
 *    short hand (the minutes follow). Optional snapping (1/5/15/30/60 min).
 *  - Keyboard: each hand is a slider (←/→ or ↑/↓). Screen readers hear the time.
 *  - Colour code shared with the digital clock: hours ORANGE, minutes BLUE.
 */
import { useCallback, useEffect, useId, useRef, useState, type PointerEvent as RPE, type KeyboardEvent } from "react";
import { angleOf, digital, fromHourAngle, fromMinuteAngle, handAngles, hourOf, minuteOf, norm, snap, pad2 } from "../engine/time";
import type { ClockPart } from "../engine/types";
import { sfx, haptic } from "../platform/audio";

export interface ClockProps {
  t: number;
  size?: number | string;
  onChange?: (t: number) => void;
  onRelease?: (t: number) => void;
  drag?: "both" | "hour" | "minute" | "none";
  step?: number;
  fiveRing?: boolean;
  highlight?: ClockPart | null;
  ghost?: number | null;
  lit?: number[];
  onNumber?: (n: number) => void;
  onPart?: (p: ClockPart) => void;
  label?: string;
  digital?: boolean;
  smooth?: boolean;
  face?: "cream" | "sky";
  className?: string;
}

const R_NUM = 70;
function handPath(len: number, w: number) {
  // a rounded "clay" hand with a fat tip
  return `M ${-w / 2} 8 L ${-w / 2} ${-len + w} Q 0 ${-len - w * 0.6} ${w / 2} ${-len + w} L ${w / 2} 8 Q 0 ${8 + w / 2} ${-w / 2} 8 Z`;
}

export function Clock({
  t, size = 300, onChange, onRelease, drag = "none", step = 1, fiveRing, highlight, ghost, lit, onNumber, onPart,
  label, digital: showDigital, smooth, face = "cream", className = "",
}: ClockProps) {
  const svg = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");
  const grab = useRef<null | "hour" | "minute">(null);
  const raw = useRef(t);
  const last = useRef(t);
  const [dragging, setDragging] = useState<null | "hour" | "minute">(null);
  const { hour, minute } = handAngles(t);

  useEffect(() => {
    if (!grab.current) raw.current = t;
    last.current = t;
  }, [t]);

  const pointAngle = (e: { clientX: number; clientY: number }) => {
    const r = svg.current!.getBoundingClientRect();
    return angleOf(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
  };
  const emit = useCallback((nt: number) => {
    if (nt !== last.current) {
      last.current = nt;
      sfx("tick");
      onChange?.(nt);
    }
  }, [onChange]);

  const move = (e: { clientX: number; clientY: number }) => {
    if (!grab.current) return;
    const a = pointAngle(e);
    if (grab.current === "minute") {
      raw.current = fromMinuteAngle(raw.current, a, 1);
      emit(snap(raw.current, step));
    } else {
      raw.current = fromHourAngle(a, 1);
      emit(snap(raw.current, step));
    }
  };

  const down = (e: RPE<SVGSVGElement>) => {
    const el = e.target as Element;
    const part = el.closest("[data-part]")?.getAttribute("data-part") as ClockPart | null;
    const num = el.closest("[data-num]")?.getAttribute("data-num");
    if (onPart && part) {
      onPart(part);
      return;
    }
    if (onNumber && num) {
      onNumber(+num);
      return;
    }
    if (drag === "none") return;
    let which: "hour" | "minute";
    const handEl = el.closest("[data-hand]")?.getAttribute("data-hand") as "hour" | "minute" | null;
    if (drag !== "both") which = drag;
    else if (handEl) which = handEl;
    else {
      const a = pointAngle(e);
      const d = (x: number) => Math.min(Math.abs(a - x), 360 - Math.abs(a - x));
      which = d(hour) + 8 < d(minute) ? "hour" : "minute";
    }
    grab.current = which;
    setDragging(which);
    raw.current = t;
    svg.current?.setPointerCapture(e.pointerId);
    haptic("soft");
    move(e);
  };
  const up = () => {
    if (!grab.current) return;
    grab.current = null;
    setDragging(null);
    const fin = snap(raw.current, step);
    raw.current = fin;
    emit(fin);
    onRelease?.(fin);
  };

  const key = (which: "hour" | "minute") => (e: KeyboardEvent) => {
    if (drag === "none" || (drag !== "both" && drag !== which)) return;
    const d = which === "minute" ? Math.max(step, 1) : 60;
    let nt = t;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") nt = norm(t + d);
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") nt = norm(t - d);
    else if (e.key === "Enter" || e.key === " ") {
      onRelease?.(t);
      e.preventDefault();
      return;
    } else return;
    e.preventDefault();
    emit(snap(nt, which === "hour" ? Math.min(step, 60) : step));
  };

  const can = (w: "hour" | "minute") => drag === "both" || drag === w;
  const hl = (p: ClockPart) => (highlight === p ? " hl" : "");
  const gA = ghost != null ? handAngles(ghost) : null;
  const sizeCss = typeof size === "number" ? size + "px" : size;

  return (
    <div className={`clock-wrap ${className}`} style={{ width: sizeCss }}>
      <svg
        ref={svg}
        className={`clock face-${face} ${dragging ? "dragging" : ""} ${smooth ? "smooth" : ""} ${drag !== "none" ? "can-drag" : ""}`}
        viewBox="-110 -110 220 220"
        onPointerDown={down}
        onPointerMove={(e) => grab.current && move(e)}
        onPointerUp={up}
        onPointerCancel={up}
        role="img"
        aria-label={label}
      >
        <defs>
          <radialGradient id={"cf-face" + uid} cx="40%" cy="35%" r="75%">
            <stop offset="0" stopColor="var(--clock-face-1)" />
            <stop offset="1" stopColor="var(--clock-face-2)" />
          </radialGradient>
          <linearGradient id={"cf-rim" + uid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--clock-rim-1)" />
            <stop offset="1" stopColor="var(--clock-rim-2)" />
          </linearGradient>
          <filter id={"cf-soft" + uid} x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodOpacity=".28" />
          </filter>
        </defs>
        {/* rim + face */}
        <circle r="106" fill={`url(#cf-rim${uid})`} />
        <circle r="104" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="2" strokeDasharray="120 600" transform="rotate(200)" />
        <circle r="91" fill={`url(#cf-face${uid})`} />
        <circle r="91" fill="none" stroke="rgba(0,0,0,.08)" strokeWidth="3" />
        {fiveRing &&
          Array.from({ length: 12 }, (_, i) => {
            const a = ((i * 30 - 90) * Math.PI) / 180;
            return (
              <text key={i} className="five" x={Math.cos(a) * 98.5} y={Math.sin(a) * 98.5 + 3}>
                {pad2(i * 5)}
              </text>
            );
          })}
        {/* minute ticks */}
        {Array.from({ length: 60 }, (_, i) => (
          <line key={i} className={i % 5 ? "tick" : "tick big"} x1="0" y1={i % 5 ? -86 : -88} x2="0" y2={i % 5 ? -82 : -79} transform={`rotate(${i * 6})`} />
        ))}
        {/* numbers */}
        <g className={"nums" + hl("numbers")} data-part="numbers">
          {Array.from({ length: 12 }, (_, i) => {
            const n = i + 1;
            const a = ((n * 30 - 90) * Math.PI) / 180;
            const x = Math.cos(a) * R_NUM, y = Math.sin(a) * R_NUM;
            const on = lit?.includes(n);
            return (
              <g key={n} data-num={n} className={"num" + (on ? " lit" : "") + (onNumber ? " tappable" : "")} transform={`translate(${x} ${y})`}>
                <circle r="15" className="num-bg" />
                <text y="6.5">{n}</text>
              </g>
            );
          })}
        </g>
        {/* target ghost hands (hint) */}
        {gA && (
          <g className="ghost">
            <path d={handPath(46, 10)} transform={`rotate(${gA.hour})`} />
            <path d={handPath(74, 7)} transform={`rotate(${gA.minute})`} />
          </g>
        )}
        {/* hour hand (short, orange) */}
        <g
          className={"hand hour" + hl("hour") + (can("hour") ? " grab" : "") + (dragging === "hour" ? " active" : "")}
          transform={`rotate(${hour})`}
          data-hand="hour" data-part="hour"
          tabIndex={can("hour") ? 0 : -1}
          role={can("hour") ? "slider" : undefined}
          aria-label={can("hour") ? "hour" : undefined}
          aria-valuemin={1} aria-valuemax={12} aria-valuenow={hourOf(t)} aria-valuetext={digital(t)}
          onKeyDown={key("hour")}
        >
          <line className="hit" x1="0" y1="10" x2="0" y2="-52" />
          <path d={handPath(46, 10)} filter={`url(#cf-soft${uid})`} />
        </g>
        {/* minute hand (long, blue) */}
        <g
          className={"hand minute" + hl("minute") + (can("minute") ? " grab" : "") + (dragging === "minute" ? " active" : "")}
          transform={`rotate(${minute})`}
          data-hand="minute" data-part="minute"
          tabIndex={can("minute") ? 0 : -1}
          role={can("minute") ? "slider" : undefined}
          aria-label={can("minute") ? "minute" : undefined}
          aria-valuemin={0} aria-valuemax={59} aria-valuenow={minuteOf(t)} aria-valuetext={digital(t)}
          onKeyDown={key("minute")}
        >
          <line className="hit" x1="0" y1="10" x2="0" y2="-82" />
          <path d={handPath(74, 7)} filter={`url(#cf-soft${uid})`} />
          {can("minute") && <circle className="knob" cy="-64" r="7.5" />}
        </g>
        <g data-part="center" className={"center" + hl("center")}>
          <circle r="16" className="center-hit" />
          <circle r="8" className="cap" />
          <circle r="3" cx="-2" cy="-2" fill="rgba(255,255,255,.7)" />
        </g>
      </svg>
      {showDigital && <Digital t={t} />}
    </div>
  );
}

/** Digital clock: hour digits orange, minute digits blue, to match the hands. */
export function Digital({ t, size = "m", className = "" }: { t: number; size?: "s" | "m" | "l"; className?: string }) {
  return (
    <div className={`digital ${size} ${className}`} aria-label={digital(t)}>
      <span className="dh">{hourOf(t)}</span>
      <span className="dc">:</span>
      <span className="dm">{pad2(minuteOf(t))}</span>
    </div>
  );
}

/** Tween a clock from one time to another (minute hand sweeps, hour hand creeps). */
export function useTweenTime(from: number, to: number, ms: number, play: boolean, delay = 400): number {
  const [t, setT] = useState(from);
  useEffect(() => {
    if (!play) {
      setT(from);
      return;
    }
    let raf = 0, start = 0;
    const dist = ((to - from) % 720 + 720) % 720 || 0;
    const run = (now: number) => {
      if (!start) start = now;
      const k = Math.min(1, Math.max(0, (now - start - delay) / ms));
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      setT(norm(Math.round(from + dist * e)));
      if (k < 1) raf = requestAnimationFrame(run);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [from, to, ms, play, delay]);
  return t;
}
