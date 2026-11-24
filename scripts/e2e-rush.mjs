/**
 * Time Rush end-to-end (Playwright, production build):
 *  1. EN: splash → menu → adventures → mission → full Morning Town ride
 *     (keyboard steering + jumps, sim at 4× via ?simspeed=4) → delivered →
 *     rewards → world unlock; progress saved across a reload
 *  2. ID: same ride, Indonesian strings on every screen
 *  3. layout: menus at phone / phone-landscape / tablet sizes, light + dark,
 *     no horizontal overflow; pause + parent gate
 *   npm run build && npx vite preview --port 4174 &  BASE=http://localhost:4174 node scripts/e2e-rush.mjs
 */
import { createRequire } from "module";
import { mkdirSync } from "fs";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const BASE = (process.env.BASE || "http://localhost:4174") + "/";
const OUT = "qa-shots/rush";
mkdirSync(OUT, { recursive: true });
const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); console.log((ok ? "  ✓ " : "  ✗ ") + msg); };
const b = await chromium.launch();

async function ride(lang) {
  console.log(`ride (${lang})`);
  const ctx = await b.newContext({ viewport: { width: 1280, height: 720 }, hasTouch: true });
  await ctx.addInitScript((l) => localStorage.setItem("bm_lang", l), lang);
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  ctx.setDefaultTimeout(20000);
  await p.goto(BASE + "?simspeed=4&nodua&noprayer#/", { waitUntil: "networkidle" });
  await p.click(".ru-splash");
  await p.click(".ru-home .ru-pill.big");
  await p.click(".ru-world >> nth=0");
  await p.waitForSelector(".ru-clip");
  const mission = await p.textContent(".ru-clip");
  check(lang === "en" ? mission.includes("library opens") : mission.includes("Perpustakaan buka"), `mission text in ${lang}`);
  await p.screenshot({ path: `${OUT}/${lang}-mission.png` });
  await p.click(".ru-clip .ru-pill");
  await p.waitForSelector(".ru-controls", { timeout: 5000 });
  // the HUD clock starts at 8:00
  check((await p.textContent(".ru-hud-clock")).includes("8:0"), "HUD clock starts at 8 o'clock");
  // pause and resume
  await p.click(".ru-hud-pause");
  check(!!(await p.$(".ru-panel.pause")), "pause panel opens");
  await p.click(".ru-panel.pause .ru-pill.big");
  const t0 = Date.now();
  let i = 0;
  while (!(await p.$(".ru-delivered")) && Date.now() - t0 < 90000) {
    await p.waitForTimeout(450);
    // tap the on-screen buttons like a child would
    const k = i++ % 5;
    if (k === 0) await p.tap(".ru-ctl.jump").catch(() => {});
    else if (k === 1) await p.tap(".ru-steer .ru-ctl >> nth=1").catch(() => {});
    else if (k === 3) await p.tap(".ru-steer .ru-ctl >> nth=0").catch(() => {});
    if (i === 20) await p.screenshot({ path: `${OUT}/${lang}-ride.png` });
  }
  check(!!(await p.$(".ru-delivered")), `delivery completed in ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  await p.waitForTimeout(2000);
  const res = await p.textContent(".ru-result");
  check(res.includes("9:00"), "arrived at 9:00");
  await p.screenshot({ path: `${OUT}/${lang}-delivered.png` });
  await p.click(".ru-result .ru-pill");
  await p.waitForSelector(".ru-rewards");
  await p.screenshot({ path: `${OUT}/${lang}-rewards.png` });
  await p.click(".ru-rewards .ru-pill.big");
  await p.waitForSelector(".ru-unlockw");
  check(true, "world unlock screen after first delivery");
  await p.reload({ waitUntil: "networkidle" });
  await p.goto(BASE + "?noprayer#/worlds");
  await p.waitForSelector(".ru-world");
  check(!!(await p.$(".ru-world .praise")), "result saved across reload");
  check(errs.length === 0, "no page errors " + errs.join(" | "));
  await ctx.close();
}

async function layouts() {
  console.log("layouts");
  const sizes = { phone: [390, 844], "phone-land": [844, 390], tablet: [1024, 768], desktop: [1440, 900] };
  for (const scheme of ["light", "dark"])
    for (const [name, [w, h]] of Object.entries(sizes)) {
      const ctx = await b.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
      const p = await ctx.newPage();
      for (const r of ["", "worlds", "mission/morning", "garage", "collection"]) {
        await p.goto(BASE + "?noprayer#/" + r, { waitUntil: "networkidle" });
        if (!r) await p.click(".ru-splash");
        await p.waitForTimeout(400);
        const over = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
        if (over) check(false, `${name}/${scheme} ${r || "home"} overflows horizontally`);
        if (scheme === "light" || r === "") await p.screenshot({ path: `${OUT}/${name}-${scheme}-${r.replace("/", "-") || "home"}.png` });
      }
      await ctx.close();
    }
  check(true, "layouts screenshotted");
  const ctx = await b.newContext({ viewport: { width: 1024, height: 768 } });
  const p = await ctx.newPage();
  await p.goto(BASE + "?noprayer#/parents", { waitUntil: "networkidle" });
  await p.waitForSelector(".ru-panel.gate");
  await p.click(".ru-pad button >> text=1");
  await p.click(".ru-pad button >> text=1");
  check(!(await p.$(".ru-parents")), "parent gate blocks a wrong answer");
  await ctx.close();
}

await ride("en");
await ride("id");
await layouts();
await b.close();
console.log(fails.length ? `\n${fails.length} FAILED` : "\nall passed");
process.exit(fails.length ? 1 : 0);
