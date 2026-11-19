/**
 * Illustrated SVG scenery. The sky follows the time of day (minutes since
 * midnight): the sun rises and sets, colours warm and cool, stars come out.
 * Used on the home screen (real time), in Mo's Day, and on world cards.
 */
import { useId, type ReactNode } from "react";
import { ENVIRONMENTS } from "../content/rewards";

type RGB = [number, number, number];
const hex = (h: string): RGB => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const mix = (a: RGB, b: RGB, k: number) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(",")})`;

// [minute of day, sky top, sky bottom, hill front, hill back]
const KEYS: [number, string, string, string, string][] = [
  [0, "#1b2552", "#3a3f82", "#25503d", "#2e4a63"],
  [300, "#2d3570", "#7b6aa8", "#2f5c44", "#3d5675"],
  [360, "#f7a98b", "#ffe2b8", "#5fae5c", "#7fb3a0"],
  [480, "#8fd6ff", "#fff4dc", "#7fd36d", "#9fd9b5"],
  [720, "#6cc8ff", "#e6f7ff", "#79cf63", "#9ad7ae"],
  [960, "#86cfff", "#fff0d2", "#77c95f", "#9cd2a6"],
  [1080, "#ff9a6b", "#ffd59a", "#6fb456", "#b39a7a"],
  [1170, "#5c4f9e", "#f2948a", "#4a8a50", "#6c6a90"],
  [1260, "#1f2a5c", "#3d4386", "#2a5640", "#33506a"],
  [1440, "#1b2552", "#3a3f82", "#25503d", "#2e4a63"],
];
export function skyColors(min: number) {
  const m = ((min % 1440) + 1440) % 1440;
  let i = 0;
  while (i < KEYS.length - 2 && KEYS[i + 1][0] <= m) i++;
  const a = KEYS[i], b = KEYS[i + 1];
  const k = (m - a[0]) / (b[0] - a[0]);
  return { top: mix(hex(a[1]), hex(b[1]), k), bottom: mix(hex(a[2]), hex(b[2]), k), hill: mix(hex(a[3]), hex(b[3]), k), back: mix(hex(a[4]), hex(b[4]), k) };
}
export const isDark = (min: number) => {
  const m = ((min % 1440) + 1440) % 1440;
  return m < 330 || m > 1200;
};

/** Sun/moon position along an arc across the sky (x 0..400, y 30..190) */
function arcPos(min: number, rise: number, set: number) {
  const span = (set - rise + 1440) % 1440;
  const k = (((min - rise) % 1440) + 1440) % 1440 / span;
  if (k < 0 || k > 1) return null;
  return { x: 30 + k * 340, y: 190 - Math.sin(k * Math.PI) * 150, k };
}

export function Sky({ min, env, town, decor, children, className = "" }: { min?: number; env?: string; town?: boolean; decor?: boolean; children?: ReactNode; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const e = env ? ENVIRONMENTS.find((x) => x.id === env) : undefined;
  const c = e ? { top: e.sky[0], bottom: e.sky[1], hill: e.hill[1], back: e.hill[0] } : skyColors(min ?? 720);
  const night = e ? e.id === "night" : isDark(min ?? 720);
  const sun = min != null && !e ? arcPos(min, 360, 1110) : e && !night ? { x: 320, y: 70, k: 0.8 } : null;
  const moon = min != null && !e ? arcPos(min, 1140, 330) : night ? { x: 300, y: 60, k: 0.5 } : null;
  return (
    <div className={"sky " + className}>
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <linearGradient id={"sky-g" + uid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={c.top} />
            <stop offset="1" stopColor={c.bottom} />
          </linearGradient>
          <radialGradient id={"sun-g" + uid}>
            <stop offset="0" stopColor="#fff7c2" />
            <stop offset=".55" stopColor="#ffd23f" />
            <stop offset="1" stopColor="#ffb21f" />
          </radialGradient>
        </defs>
        <rect width="400" height="240" fill={`url(#sky-g${uid})`} />
        {night &&
          [[40, 30], [90, 60], [150, 25], [210, 50], [260, 20], [340, 40], [370, 80], [120, 95], [20, 100], [300, 105]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 ? 1.4 : 2.2} fill="#fff" opacity={0.85} className="twinkle" style={{ animationDelay: i * 0.37 + "s" }} />
          ))}
        {night && decor && (
          <g className="shooting" opacity="0">
            <path d="M0 0 L-46 14" stroke={`url(#shoot${uid})`} strokeWidth="2.4" strokeLinecap="round" />
            <circle r="2.2" fill="#fff" />
          </g>
        )}
        <linearGradient id={"shoot" + uid} x1="1" y1="0" x2="0" y2="0"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        {sun && (
          <g transform={`translate(${sun.x} ${sun.y})`}>
            <g className="sun-rays" opacity=".55">
              {Array.from({ length: 12 }, (_, i) => <path key={i} d="M-3 -32 L0 -46 L3 -32Z" fill="#ffe680" transform={`rotate(${i * 30})`} />)}
            </g>
            <circle r="34" fill="#ffe680" opacity=".25" />
            <circle r="22" fill={`url(#sun-g${uid})`} />
            <circle r="6" cx="-7" cy="-7" fill="#fff" opacity=".5" />
          </g>
        )}
        {moon && (
          <g transform={`translate(${moon.x} ${moon.y})`}>
            <circle r="26" fill="#fff8d6" opacity=".18" />
            <path d="M8 -16 A 17 17 0 1 0 8 16 A 13 13 0 1 1 8 -16 Z" fill="#fff4c4" />
          </g>
        )}
        <g className="clouds" opacity={night ? 0.25 : 0.95}>
          <Cloud x={60} y={52} s={1} />
          <Cloud x={250} y={36} s={0.8} />
          <Cloud x={340} y={92} s={0.6} />
        </g>
        <path d="M0 170 C 70 130 140 140 200 160 S 330 120 400 150 V240 H0Z" fill={c.back} />
        {town && <Town night={night} />}
        {decor && !night && (
          <g className="birds" fill="none" stroke="#3b4a5a" strokeWidth="1.8" strokeLinecap="round">
            <g className="bird" style={{ animationDelay: "0s" }}><path d="M0 0 q5 -5 10 0 q5 -5 10 0" /></g>
            <g className="bird b2" style={{ animationDelay: "-6s" }}><path d="M0 0 q4 -4 8 0 q4 -4 8 0" /></g>
            <g className="bird b3" style={{ animationDelay: "-11s" }}><path d="M0 0 q3 -3 6 0 q3 -3 6 0" /></g>
          </g>
        )}
        {decor && <Trees night={night} />}
        <path d="M0 196 C 90 168 170 186 230 196 S 350 176 400 186 V240 H0Z" fill={c.hill} />
        <path d="M0 196 C 90 168 170 186 230 196 S 350 176 400 186" fill="none" stroke="rgba(255,255,255,.25)" strokeWidth="3" />
        {decor && <Flowers night={night} />}
      </svg>
      {children}
    </div>
  );
}
function Trees({ night }: { night: boolean }) {
  const leaf = night ? "#2f6a49" : "#5cc06a", leaf2 = night ? "#285c3f" : "#47a958", trunk = night ? "#5b4632" : "#a86b3c";
  const tree = (x: number, y: number, s: number, i: number) => (
    <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-3" y="-4" width="6" height="18" rx="3" fill={trunk} />
      <g className="sway" style={{ animationDelay: i * -0.7 + "s" }}>
        <circle cx="0" cy="-14" r="14" fill={leaf} />
        <circle cx="-9" cy="-6" r="9" fill={leaf2} />
        <circle cx="9" cy="-7" r="9" fill={leaf2} />
        <circle cx="-4" cy="-19" r="4" fill="rgba(255,255,255,.25)" />
      </g>
    </g>
  );
  return <g>{[[34, 168, 1, 0], [62, 172, 0.7, 1], [352, 160, 0.9, 2], [378, 166, 0.65, 3], [292, 170, 0.55, 4]].map(([x, y, s, i]) => tree(x, y, s, i))}</g>;
}
function Flowers({ night }: { night: boolean }) {
  const cols = night ? ["#9a8fd1", "#c7b8e8", "#8fa7d8"] : ["#ff9fbd", "#ffd23f", "#b8a5ff", "#ff9a3d"];
  const pts = [[120, 214], [150, 222], [205, 210], [250, 224], [300, 214], [330, 226], [92, 228], [180, 230]];
  return (
    <g>
      {pts.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} className="flower" style={{ animationDelay: i * -0.4 + "s" }}>
          <path d="M0 0 V8" stroke={night ? "#2c5a3f" : "#3c9a54"} strokeWidth="2" />
          {[0, 72, 144, 216, 288].map((a) => <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 3.4} cy={Math.sin((a * Math.PI) / 180) * 3.4} r="2.8" fill={cols[i % cols.length]} />)}
          <circle r="2" fill="#fff6c4" />
        </g>
      ))}
    </g>
  );
}

function Cloud({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="cloud">
        <ellipse cx="0" cy="8" rx="34" ry="12" fill="#fff" />
        <circle cx="-12" cy="2" r="13" fill="#fff" />
        <circle cx="8" cy="-3" r="16" fill="#fff" />
        <circle cx="24" cy="5" r="10" fill="#fff" />
      </g>
    </g>
  );
}
/** Clock Town skyline: little houses, each with a clock, and the clock tower. */
function Town({ night }: { night: boolean }) {
  const win = night ? "#ffe08a" : "#bfe6ff";
  const house = (x: number, w: number, h: number, roof: string, wall: string, clock?: boolean) => (
    <g transform={`translate(${x} ${178 - h})`}>
      <rect x="0" y="12" width={w} height={h} rx="5" fill={wall} />
      <path d={`M-4 14 L${w / 2} -8 L${w + 4} 14 Z`} fill={roof} />
      <rect x={w / 2 - 6} y={h - 6} width="12" height="18" rx="5" fill="#a86b3c" />
      {clock ? (
        <g transform={`translate(${w / 2} ${h / 2 + 4})`}>
          <circle r="8" fill="#fff" stroke="#e2761a" strokeWidth="2" />
          <path d="M0 0V-5M0 0H4" stroke="#2b3a2e" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      ) : (
        <rect x={w / 2 - 7} y={h / 2 - 2} width="14" height="11" rx="3" fill={win} />
      )}
    </g>
  );
  return (
    <g>
      {house(18, 46, 34, "#ff8a5c", "#fff1d6", true)}
      {house(82, 40, 28, "#6cc4ff", "#ffe9f0")}
      {/* clock tower */}
      <g transform="translate(176 76)">
        <rect x="0" y="20" width="48" height="96" rx="6" fill="#ffe3b8" />
        <rect x="0" y="20" width="48" height="10" fill="#f6c98a" />
        <path d="M-6 22 L24 -14 L54 22Z" fill="#3cb55e" />
        <circle cx="24" cy="-15" r="4" fill="#ffd23f" />
        <circle cx="24" cy="54" r="17" fill="#fff" stroke="#ff9a3d" strokeWidth="4" />
        <path d="M24 54V42M24 54L31 58" stroke="#2b3a2e" strokeWidth="2.6" strokeLinecap="round" />
        <rect x="16" y="86" width="16" height="30" rx="7" fill="#a86b3c" />
      </g>
      {house(250, 42, 32, "#b8a5ff", "#fff8ec", true)}
      {house(312, 50, 26, "#ffd23f", "#e6f6ff")}
    </g>
  );
}

/** Small decorative illustrations for the world cards. */
export function WorldArt({ scene }: { scene: "town" | "calendar" | "home" | "park" }) {
  if (scene === "town") return <Sky min={600} town className="world-sky" />;
  if (scene === "calendar")
    return (
      <div className="sky world-sky">
        <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <rect width="400" height="240" fill="#d9efff" />
          <Cloud x={70} y={40} s={0.9} />
          <Cloud x={320} y={60} s={0.7} />
          <path d="M0 190 C 100 160 200 175 400 165 V240 H0Z" fill="#9fdcae" />
          {[[90, 120, "#ff9fbd", 0], [300, 100, "#b8a5ff", -3], [340, 150, "#ffd23f", -6]].map(([x, y, c, d], i) => (
            <g key={"bf" + i} transform={`translate(${x} ${y})`}>
              <g className="butterfly" style={{ animationDelay: d + "s" }}>
                <g className="wings">
                  <ellipse cx="-5" cy="-2" rx="6" ry="8" fill={c as string} />
                  <ellipse cx="5" cy="-2" rx="6" ry="8" fill={c as string} />
                  <ellipse cx="-4" cy="6" rx="4" ry="5" fill={c as string} opacity=".8" />
                  <ellipse cx="4" cy="6" rx="4" ry="5" fill={c as string} opacity=".8" />
                </g>
                <rect x="-1.2" y="-7" width="2.4" height="15" rx="1.2" fill="#3b2f2a" />
              </g>
            </g>
          ))}
          <g transform="translate(150 54) rotate(-6)" className="cal-page">
            <rect width="120" height="128" rx="14" fill="#fff" stroke="#e6dccb" strokeWidth="2" />
            <rect width="120" height="32" rx="14" fill="#ff8a5c" />
            <rect y="18" width="120" height="14" fill="#ff8a5c" />
            {[0, 1, 2, 3, 4].map((r) => [0, 1, 2, 3, 4, 5, 6].map((c) => (
              <rect key={r + "-" + c} x={8 + c * 15.5} y={40 + r * 17} width="12" height="12" rx="3" fill={r === 2 && c === 3 ? "#ffd23f" : r * 7 + c > 30 ? "#f4efe6" : "#eaf6ee"} />
            )))}
            <circle cx="30" cy="0" r="6" fill="#6cc4ff" /><circle cx="90" cy="0" r="6" fill="#6cc4ff" />
          </g>
          {[[40, 200, "#ff9fbd"], [90, 212, "#ffd23f"], [330, 205, "#b8a5ff"], [370, 196, "#ff9a3d"]].map(([x, y, c], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <path d="M0 0 V18" stroke="#3c9a54" strokeWidth="3" />
              {[0, 72, 144, 216, 288].map((a) => <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 6} cy={Math.sin((a * Math.PI) / 180) * 6} r="5" fill={c as string} />)}
              <circle r="4" fill="#fff6c4" />
            </g>
          ))}
        </svg>
      </div>
    );
  if (scene === "home")
    return (
      <div className="sky world-sky">
        <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <rect width="400" height="240" fill="#ffe9cf" />
          <rect y="176" width="400" height="64" fill="#e9b884" />
          <path d="M0 176 H400" stroke="#d29a62" strokeWidth="4" />
          <g transform="translate(40 34)">
            <rect width="120" height="100" rx="12" fill="#8fd6ff" stroke="#fff" strokeWidth="8" />
            <circle cx="88" cy="30" r="14" fill="#ffd23f" />
            <path d="M60 4 V96 M4 50 H116" stroke="#fff" strokeWidth="6" />
            <path d="M-10 -6 h40 c-8 40 -8 80 0 116 h-40z" fill="#ff9fbd" opacity=".9" />
            <path d="M130 -6 h-40 c8 40 8 80 0 116 h40z" fill="#ff9fbd" opacity=".9" />
          </g>
          <g transform="translate(250 40)">
            <circle r="36" cx="50" cy="40" fill="#fff" stroke="#3cb55e" strokeWidth="7" />
            <path d="M50 40 V18 M50 40 L64 48" stroke="#2b3a2e" strokeWidth="5" strokeLinecap="round" />
            <g transform="translate(50 40)">
              <g className="tick-hand"><path d="M0 4 V-28" stroke="#ff6f91" strokeWidth="2.5" strokeLinecap="round" /></g>
            </g>
          </g>
          <rect x="230" y="140" width="150" height="40" rx="12" fill="#b8a5ff" />
          <rect x="240" y="126" width="56" height="22" rx="10" fill="#fff" />
          <g transform="translate(330 128)">
            <rect x="-12" y="-6" width="24" height="18" rx="5" fill="#ff9a3d" />
            <path d="M12 0 q8 2 0 8" stroke="#ff9a3d" strokeWidth="3" fill="none" />
            {[-5, 2, 8].map((x, i) => <path key={i} className="steam" style={{ animationDelay: i * 0.6 + "s" }} d={`M${x} -10 q-4 -6 0 -12 q4 -6 0 -12`} stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" />)}
          </g>
        </svg>
      </div>
    );
  return (
    <div className="sky world-sky">
      <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <rect width="400" height="240" fill="#e9e2ff" />
        <Cloud x={80} y={50} s={0.8} />
        <path d="M0 186 C 120 160 260 176 400 166 V240 H0Z" fill="#a9e3a0" />
        <g transform="translate(176 46)">
          <rect x="-6" y="0" width="60" height="10" rx="5" fill="#a86b3c" />
          <rect x="-6" y="118" width="60" height="10" rx="5" fill="#a86b3c" />
          <path d="M2 10 C 2 50 24 54 24 64 C 24 74 2 78 2 118 H46 C 46 78 24 74 24 64 C 24 54 46 50 46 10Z" fill="#fff" fillOpacity=".7" stroke="#c9b7ff" strokeWidth="3" />
          <path d="M10 30 C 14 48 22 54 24 62 C 26 54 34 48 38 30Z" fill="#ffd23f" />
          <path d="M8 116 C 14 98 34 98 40 116Z" fill="#ffd23f" />
          <path d="M24 64 V100" stroke="#ffd23f" strokeWidth="2.4" strokeDasharray="3 4" className="sand" />
        </g>
        <g transform="translate(300 120)">
          <circle r="34" fill="#fff" stroke="#ff9a3d" strokeWidth="7" />
          <rect x="-7" y="-50" width="14" height="12" rx="4" fill="#ff9a3d" />
          <g className="tick-hand fast"><path d="M0 0 L0 -24" stroke="#3a8ef0" strokeWidth="5" strokeLinecap="round" /></g>
          <path d="M0 0 A 24 24 0 0 1 20 -13 L0 0" fill="#3cb55e" opacity=".4" />
        </g>
      </svg>
    </div>
  );
}
