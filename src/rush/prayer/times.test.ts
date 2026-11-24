// @ts-nocheck — Node-only test (reads the original babymo-app engine with fs + vm)
import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "fs";
import REF from "./reference.json";
import { runInNewContext } from "vm";
import { timings } from "./times";

// the original babymo-app engine, loaded as-is, must agree with the port to the minute
const ORIG = "../babymo-app/www/bm-prayertimes.js";
const has = existsSync(ORIG);
const src = has ? readFileSync(ORIG, "utf8") : "";
const ctx: { window?: { BMPrayerTimes: { timings: (d: Date, la: number, ln: number, tz?: number) => Record<string, string> } } } = { window: undefined };
if (has) { (ctx as Record<string, unknown>).window = {}; runInNewContext(src, ctx); }

const CITIES: [string, number, number, number][] = [["Jakarta", -6.2088, 106.8456, 7], ["Makassar", -5.1477, 119.4327, 8], ["Jayapura", -2.5337, 140.718, 9], ["Medan", 3.5952, 98.6722, 7], ["London", 51.5072, -0.1276, 0]];
describe("prayer times (port of babymo-app bm-prayertimes.js)", () => {
  it("matches the recorded babymo-app reference times", () => {
    const C: Record<string, [number, number, number]> = { Jakarta: [-6.2088, 106.8456, 7], Makassar: [-5.1477, 119.4327, 8], London: [51.5072, -0.1276, 0] };
    for (const [k, v] of Object.entries(REF as Record<string, Record<string, string>>)) {
      const [city, mon] = k.split("-");
      const [la, ln, tz] = C[city];
      expect(timings(new Date(2026, +mon - 1, 15), la, ln, tz)).toEqual(v);
    }
  });
  it.skipIf(!has).each(CITIES)("%s matches the original engine all year (when babymo-app is checked out next to moclock)", (_n, lat, lng, tz) => {
    for (let m = 0; m < 12; m++) for (const d of [1, 15]) {
      const date = new Date(2026, m, d);
      expect(timings(date, lat, lng, tz)).toEqual(ctx.window!.BMPrayerTimes.timings(date, lat, lng, tz));
    }
  });
  it("gives sensible Jakarta times", () => {
    const t = timings(new Date(2026, 10, 24), -6.2088, 106.8456, 7);
    const m = (s: string) => +s.slice(0, 2) * 60 + +s.slice(3);
    expect(m(t.Fajr)).toBeGreaterThan(m("03:30")); expect(m(t.Fajr)).toBeLessThan(m("04:30"));
    expect(m(t.Dhuhr)).toBeGreaterThan(m("11:20")); expect(m(t.Dhuhr)).toBeLessThan(m("12:10"));
    expect(m(t.Maghrib)).toBeGreaterThan(m("17:40")); expect(m(t.Maghrib)).toBeLessThan(m("18:30"));
  });
});
