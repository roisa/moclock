/**
 * Lists every line the game can speak (both languages) → voice-lines.json,
 * ready for babymo-app/tools/voice/gen.py (recorded Baby Mo voice).
 * Runs the real generators via Vite's SSR loader, so the list matches the game.
 */
import { createServer } from "vite";
import { writeFileSync } from "fs";

const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
const { ACTIVITIES } = await vite.ssrLoadModule("/src/content/activities.ts");
const { t } = await vite.ssrLoadModule("/src/i18n/index.ts");
const { seeded } = await vite.ssrLoadModule("/src/engine/rng.ts");
const { en } = await vite.ssrLoadModule("/src/i18n/dict-en.ts");
const out = { id: new Set(), en: new Set() };
for (const lang of ["id", "en"]) {
  for (const k of Object.keys(en)) if (!/\{/.test(en[k]) && /^(fb|tut|world\.intro|home|play|q|hint|explain|reveal|card|countdown|timer)\./.test(k)) out[lang].add(t(k, lang, "say"));
  for (const a of ACTIVITIES)
    for (const level of [1, 2, 3])
      for (let s = 0; s < 60; s++)
        for (let index = 0; index < a.rounds; index++) {
          const q = a.gen({ rng: seeded(a.id + s), level, index, now: new Date() });
          for (const m of [q.prompt, q.hint, q.reveal, q.explain].filter(Boolean)) out[lang].add(t(m, lang, "say"));
        }
}
const res = { id: [...out.id].sort(), en: [...out.en].sort() };
writeFileSync("voice-lines.json", JSON.stringify(res, null, 1));
console.log(`voice-lines.json: ${res.id.length} ID + ${res.en.length} EN lines`);
await vite.close();
