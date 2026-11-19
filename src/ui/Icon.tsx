/** Rounded, chunky line icons (inline SVG, inherit currentColor). */
const P: Record<string, string> = {
  home: "M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4.5v-5.5h-5V21H5a1 1 0 0 1-1-1z",
  games: "M7 8h10a5 5 0 0 1 0 10c-1.6 0-2.6-.8-3.3-2h-3.4c-.7 1.2-1.7 2-3.3 2A5 5 0 0 1 7 8zm0 3v4m-2-2h4m6.5-.5h.01m2 2h.01",
  rewards: "M8 4h8v4a4 4 0 0 1-8 0zm0 1H5a3 3 0 0 0 3 4m8-4h3a3 3 0 0 1-3 4m-4 3v4m-4 4h8l-1-4H9z",
  back: "M15 5 8 12l7 7",
  close: "M6 6l12 12M18 6 6 18",
  speaker: "M4 9.5h3.5L12 5.5v13l-4.5-4H4zm12 0a3.5 3.5 0 0 1 0 5m2.5-8a7 7 0 0 1 0 11",
  mute: "M4 9.5h3.5L12 5.5v13l-4.5-4H4zm12 0 5 5m0-5-5 5",
  star: "M12 3.2l2.6 5.5 6 .7-4.4 4.1 1.2 5.9L12 16.5l-5.4 2.9 1.2-5.9-4.4-4.1 6-.7z",
  lock: "M7 11V8a5 5 0 0 1 10 0v3M5.5 11h13v9h-13z",
  check: "M5 12.5 10 17 19 7",
  play: "M8 5.5v13l11-6.5z",
  parent: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7 1.5a2.5 2.5 0 1 0 0-5M3.5 20c0-3 2.5-5.5 5.5-5.5s5.5 2.5 5.5 5.5m2-5.2c2.3.3 4 2.4 4 5.2",
  replay: "M5 12a7 7 0 1 0 2.1-5M5 4v4h4",
  music: "M9 18V6l10-2v12M9 18a2.5 2.5 0 1 1-2.5-2.5A2.5 2.5 0 0 1 9 18zm10-2a2.5 2.5 0 1 1-2.5-2.5A2.5 2.5 0 0 1 19 16z",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm-9-9h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z",
  hint: "M9 18h6m-5 3h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z",
  next: "M9 5l7 7-7 7",
  sun: "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0-5v2m0 14v2M3 12h2m14 0h2M5.6 5.6l1.4 1.4m10 10 1.4 1.4m0-12.8L17 7m-10 10-1.4 1.4",
  moon: "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z",
  download: "M12 4v11m-5-5 5 5 5-5M5 20h14",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm0-14v5l3.5 2",
};
export function Icon({ name, size, className, strokeWidth = 2.4 }: { name: keyof typeof P | string; size?: number; className?: string; strokeWidth?: number }) {
  const filled = name === "star" || name === "play";
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true" fill={filled ? "currentColor" : "none"}
      stroke="currentColor" strokeWidth={filled ? 1.2 : strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d={P[name] || ""} />
    </svg>
  );
}
export function Star({ on = true, size = 24, className = "" }: { on?: boolean; size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={"star " + className} aria-hidden="true">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE680" />
          <stop offset="1" stopColor="#FFB81F" />
        </linearGradient>
      </defs>
      <path d={P.star} fill={on ? "url(#sg)" : "color-mix(in srgb, currentColor 14%, transparent)"} stroke={on ? "#E89B00" : "none"} strokeWidth="1.1" strokeLinejoin="round" />
      {on && <path d="M9.6 8.6c.6-1 1.2-2 1.7-3" stroke="#fff" strokeOpacity=".8" strokeWidth="1.4" strokeLinecap="round" fill="none" />}
    </svg>
  );
}
