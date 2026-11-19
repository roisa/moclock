/**
 * Time Racers end-to-end (Playwright + software WebGL):
 *  1. the real menu flow: Play → choose Baby Ais → garage → map → Clock Town →
 *     level 1 → tutorial → race; every question answered (one wrong first);
 *     results podium; progress saved across a reload
 *  2. Explorer mode: arrow keys really steer the kart
 *   npm run build && npx vite preview --port 4174 &  BASE=http://localhost:4174 node scripts/e2e-racers.mjs
 */
import { createRequire } from "module";
import { mkdirSync } from "fs";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const BASE = (process.env.BASE || "http://localhost:4174") + "/racers/";
const OUT = "qa-shots/racers";
mkdirSync(OUT, { recursive: true });
const fails = [];
const b = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist", "--enable-unsafe-swiftshader"] });

async function flow() {
  const ctx = await b.newContext({ viewport: { width: 1180, height: 820 }, hasTouch: true });
  await ctx.addInitScript(() => localStorage.setItem("bm_lang", "en"));
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  ctx.setDefaultTimeout(30000);
  await p.goto(BASE + "?qa#/", { waitUntil: "networkidle" });
  await p.screenshot({ path: OUT + "/1-home.png" });
  await p.click(".r-play");
  await p.waitForSelector(".r-racer-cards");
  await p.click(".r-racer-card.c-ais");
  await p.screenshot({ path: OUT + "/2-racer.png" });
  await p.click(".r-next");
  await p.waitForSelector(".r-garage-panel");
  await p.waitForTimeout(1500);
  await p.screenshot({ path: OUT + "/3-garage.png" });
  await p.click(".r-garage-panel .r-big.green");
  await p.waitForSelector(".r-island");
  await p.screenshot({ path: OUT + "/4-map.png" });
  await p.click(".r-island >> nth=0");
  await p.waitForSelector(".r-level-list");
  await p.click(".r-level >> nth=0");
  await p.waitForSelector(".r-tut-body");
  for (let i = 0; i < 4; i++) {
    await p.screenshot({ path: OUT + `/5-tutorial-${i}.png` });
    await p.click(".r-tut-actions .r-big");
    await p.waitForTimeout(300);
    if (!(await p.locator(".r-tut-body").count())) break;
  }
  await p.waitForSelector(".r-canvas");
  const t0 = Date.now();
  let missed = false, n = 0, shot = false;
  while (Date.now() - t0 < 420000) {
    if (await p.locator(".r-results").count()) break;
    const st = await p.evaluate(() => window.__rqa && { q: window.__rqa.q, mode: window.__rqa.mode });
    if (st?.q && st.mode === "panel") {
      if (!missed) {
        await p.locator(".r-opt").nth(st.q.answer === 0 ? 1 : 0).click();
        missed = true;
        await p.waitForSelector(".r-q-explain");
      }
      await p.locator(".r-opt").nth(st.q.answer).click().catch(() => {});
      n++;
      if (!shot) { await p.waitForTimeout(700); await p.screenshot({ path: OUT + "/6-turbo.png" }); shot = true; }
    }
    await p.waitForTimeout(300);
  }
  await p.waitForSelector(".r-results", { timeout: 10000 });
  await p.waitForTimeout(2000);
  await p.screenshot({ path: OUT + "/7-results.png" });
  const place = await p.textContent(".r-place");
  // progress persisted?
  await p.waitForTimeout(800);
  await p.goto(BASE + "#/levels/clock-town", { waitUntil: "networkidle" });
  await p.reload({ waitUntil: "networkidle" });
  const level2Open = await p.locator(".r-level >> nth=1").isEnabled();
  const stars = await p.locator(".r-level >> nth=0").locator("svg path[fill='#ffcc2e']").count();
  console.log(JSON.stringify({ place, answered: n, level2Open, starsOnLevel1: stars, secs: Math.round((Date.now() - t0) / 1000) }));
  if (!level2Open) fails.push("level 2 not unlocked after finishing level 1");
  if (stars < 1) fails.push("stars not saved");
  if (errs.length) fails.push("page errors: " + errs.join(" | "));
  await ctx.close();
}

async function explorer() {
  const ctx = await b.newContext({ viewport: { width: 1024, height: 700 } });
  await ctx.addInitScript(() => {
    localStorage.setItem("bmt_racers", JSON.stringify({ __at: Date.now(), v: { v: 1, settings: { lang: "en", junior: false, quality: "low", sound: false, music: false, voice: false, rotateOk: true } } }));
  });
  const p = await ctx.newPage();
  await p.goto(BASE + "?qa#/race/ct-1", { waitUntil: "load" });
  await p.waitForFunction(() => window.__rqa?.kart?.()?.phase === "racing", null, { timeout: 60000 });
  const a = await p.evaluate(() => window.__rqa.kart());
  await p.keyboard.down("ArrowLeft");
  await p.waitForTimeout(1500);
  await p.keyboard.up("ArrowLeft");
  const b1 = await p.evaluate(() => window.__rqa.kart());
  await p.keyboard.down("ArrowRight");
  await p.waitForTimeout(2500);
  await p.keyboard.up("ArrowRight");
  const c = await p.evaluate(() => window.__rqa.kart());
  console.log(JSON.stringify({ explorer: { start: a.lat.toFixed(2), afterLeft: b1.lat.toFixed(2), afterRight: c.lat.toFixed(2), moving: c.s > a.s } }));
  if (!(b1.lat > a.lat + 0.5)) fails.push("ArrowLeft did not steer left");
  if (!(c.lat < b1.lat - 0.5)) fails.push("ArrowRight did not steer right");
  await ctx.close();
}

try {
  await explorer();
  await flow();
} finally {
  await b.close();
}
if (fails.length) {
  console.log("FAILURES:\n" + fails.join("\n"));
  process.exit(1);
}
console.log("racers e2e OK");
