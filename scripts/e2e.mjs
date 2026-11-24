/**
 * End-to-end play-through: opens every activity, answers every question
 * (real taps / keyboard for choice, set-clock and sequence games; the QA hook
 * for the rest), checks the celebration screen and that progress was saved.
 * Also screenshots key screens at phone / tablet / desktop sizes.
 *
 *   npm run build && npm run e2e            (serves dist/ with vite preview)
 *   BASE=http://localhost:5173 npm run e2e  (against a running dev server)
 */
import { createRequire } from "module";
import { spawn } from "child_process";
import { mkdirSync } from "fs";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const OUT = "qa-shots";
mkdirSync(OUT, { recursive: true });
let server = null;
let BASE = process.env.BASE;
if (!BASE) {
  server = spawn("npx", ["vite", "preview", "--port", "4174", "--strictPort"], { stdio: "ignore" });
  BASE = "http://localhost:4174";
  await new Promise((r) => setTimeout(r, 2500));
}

const ALL = ["meet-clock", "numbers", "hour-hand", "minute-hand", "move-hands", "match", "full-hours", "half-past", "quarter", "five-minutes", "clock-challenge",
  "arrange-days", "tomorrow", "find-date", "calendar-puzzle", "countdown", "missing-month",
  "mo-day", "morning", "whole-day", "routine-time", "day-parts",
  "ten-seconds", "thirty-seconds", "one-minute", "longer", "first", "time-left", "elapsed"];
const ACTS = process.env.ONLY ? process.env.ONLY.split(",") : ALL;

const fwd = (a, b) => (((b - a) % 720) + 720) % 720;
const fails = [];
const b = await chromium.launch();

async function playAll(lang) {
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  ctx.setDefaultTimeout(6000);
  await ctx.addInitScript((l) => localStorage.setItem("bm_lang", l), lang);
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  let missesTested = 0;
  for (const id of ACTS) {
    try {
      await p.goto(`${BASE}/learn/?qa#/play/${id}`, { waitUntil: "networkidle" });
      // tutorial: step through with the buttons
      for (let i = 0; i < 4; i++) {
        const btn = p.locator(".tut-actions .btn.big");
        if (!(await btn.count())) break;
        await btn.click();
        await p.waitForTimeout(150);
      }
      for (let guard = 0; guard < 20; guard++) {
        if (await p.locator(".celebrate").count()) break;
        await p.waitForFunction(() => window.__qa && window.__qa.phase === "play", null, { timeout: 5000 });
        const q = await p.evaluate(() => window.__qa.q);
        if (q.type === "choice") {
          const ans = q.options.findIndex((o) => o.id === q.answer);
          if (missesTested < 3) {
            await p.locator(".option").nth(ans === 0 ? 1 : 0).click();
            await p.waitForSelector(".option.wrong");
            missesTested++;
          }
          await p.locator(".option").nth(ans).click();
        } else if (q.type === "set-clock") {
          const hand = q.lock === "minute" ? ".clock-stage .hand.hour" : ".clock-stage .hand.minute";
          await p.locator(hand).focus();
          const n = q.lock === "minute" ? fwd(q.start, q.target) / 60 : fwd(q.start, q.target) / q.step;
          for (let i = 0; i < Math.round(n); i++) await p.keyboard.press("ArrowRight");
          await p.locator(".check-btn").click();
        } else if (q.type === "sequence") {
          const placed = [];
          for (const it of q.items) {
            const tray = q.shuffled.filter((x) => !placed.includes(x));
            await p.locator(".tray .tile").nth(tray.indexOf(it.id)).click();
            placed.push(it.id);
            await p.waitForTimeout(60);
          }
        } else {
          await p.evaluate(() => window.__qa.solve());
        }
        await p.waitForSelector(".next-bar .btn", { timeout: 4000 });
        await p.locator(".next-bar .btn").click();
        await p.waitForTimeout(120);
      }
      await p.waitForSelector(".celebrate", { timeout: 3000 });
      if (process.env.VERBOSE) console.log("  ok", lang, id);
    } catch (e) {
      fails.push(`${lang}/${id}: ${String(e.message).split("\n").slice(0, process.env.VERBOSE ? 12 : 1).join("\n")}`);
      await p.screenshot({ path: `${OUT}/FAIL-${lang}-${id}.png` }).catch(() => {});
    }
  }
  // progress persisted?
  await p.waitForTimeout(600);
  await p.goto(`${BASE}/learn/#/rewards`, { waitUntil: "networkidle" });
  await p.waitForTimeout(400);
  const stars = await p.locator(".rw-total b").innerText();
  const stickers = await p.locator(".sticker-slot.has").count();
  console.log(`[${lang}] played ${ACTS.length} activities → ${stars} stars, ${stickers} stickers`);
  if (!process.env.ONLY && +stars < ACTS.length) fails.push(`${lang}: expected at least ${ACTS.length} stars, got ${stars}`);
  await p.reload({ waitUntil: "networkidle" });
  await p.waitForTimeout(400);
  if ((await p.locator(".rw-total b").innerText()) !== stars) fails.push(`${lang}: stars not persisted after reload`);
  if (errs.length) fails.push(`${lang}: page errors: ${errs.join(" | ")}`);
  await ctx.close();
}

async function shots() {
  const sizes = { "phone": [390, 844, true], "phone-land": [844, 390, true], "tablet": [820, 1180, true], "tablet-land": [1180, 820, true], "desktop": [1440, 900, false], "fold": [673, 841, true] };
  const routes = { home: "#/", world: "#/world/clock", play: "#/play/half-past", rewards: "#/rewards" };
  for (const [name, [w, h, touch]] of Object.entries(sizes)) {
    for (const theme of ["light", "dark"]) {
      if (theme === "dark" && name !== "phone" && name !== "tablet-land") continue;
      const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: touch, colorScheme: theme });
      await ctx.addInitScript(() => localStorage.setItem("bm_lang", "en"));
      const p = await ctx.newPage();
      for (const [rn, r] of Object.entries(routes)) {
        await p.goto(`${BASE}/learn/${r}`, { waitUntil: "networkidle" });
        await p.waitForTimeout(600);
        const overflow = await p.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
        if (overflow) fails.push(`horizontal overflow: ${name} ${rn}`);
        await p.screenshot({ path: `${OUT}/${name}-${theme}-${rn}.png` });
      }
      await ctx.close();
    }
  }
}

try {
  if (process.env.SHOTS_ONLY) {
    await shots();
  } else {
  await playAll("en");
  if (!process.env.QUICK) {
    await playAll("id");
    await shots();
  }
  }
} finally {
  await b.close();
  server?.kill();
}
if (fails.length) {
  console.log("FAILURES:\n" + fails.join("\n"));
  process.exit(1);
}
console.log("e2e OK — screenshots in " + OUT + "/");
