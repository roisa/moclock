/** Time Racers offline check: first visit caches the racer (3D engine + shaders), then offline reload + start a race. */
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:4174";
const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist", "--enable-unsafe-swiftshader"] });
const ctx = await b.newContext({ viewport: { width: 1024, height: 700 } });
const p = await ctx.newPage();
await p.goto(BASE + "/racers/", { waitUntil: "networkidle" });
await p.evaluate(() => navigator.serviceWorker.ready);
await p.reload({ waitUntil: "networkidle" });
// wait until the on-demand racer files are in the cache
await p.waitForFunction(async () => {
  const keys = await caches.keys();
  for (const k of keys) {
    const c = await caches.open(k);
    const all = await c.keys();
    if (all.some((r) => /racers-.*\.js$/.test(r.url)) && all.some((r) => /shadowMap/.test(r.url))) return true;
  }
  return false;
}, null, { timeout: 20000 });
await ctx.setOffline(true);
await p.goto(BASE + "/racers/#/race/ct-1", { waitUntil: "load" });
await p.waitForSelector(".r-hud", { timeout: 30000 });
const ok = await p.evaluate(() => !document.querySelector(".r-fail"));
console.log(JSON.stringify({ offlineRace: ok }));
await b.close();
if (!ok) process.exit(1);
