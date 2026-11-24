/** PWA check: first visit installs the service worker; then offline reload + navigation must still work. */
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const BASE = process.env.BASE || "http://localhost:4174";
const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 } });
const p = await ctx.newPage();
await p.goto(BASE + "/learn/", { waitUntil: "networkidle" });
await p.waitForFunction(() => navigator.serviceWorker && navigator.serviceWorker.controller || navigator.serviceWorker.ready.then(() => true), null, { timeout: 15000 });
await p.evaluate(() => navigator.serviceWorker.ready);
await p.reload({ waitUntil: "networkidle" }); // now controlled
const controlled = await p.evaluate(() => !!navigator.serviceWorker.controller);
await ctx.setOffline(true);
await p.reload({ waitUntil: "load" });
await p.waitForSelector(".hero", { timeout: 8000 });
const banner = await p.locator(".toast.offline").count(); // shown on Home (hidden during play on purpose)
await p.goto(BASE + "/learn/#/play/half-past");
await p.waitForSelector(".tut-actions, .play-board", { timeout: 8000 });
const imgsOk = await p.evaluate(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0));
console.log(JSON.stringify({ controlled, offlineHome: true, offlinePlay: true, imagesLoaded: imgsOk, offlineBanner: banner > 0 }));
await b.close();
if (!controlled || !imgsOk || !banner) process.exit(1);
