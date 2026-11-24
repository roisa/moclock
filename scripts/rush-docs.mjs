/**
 * Generates docs/rush/03-ASSET-BIBLE.md and docs/rush/04-PROMPT-LIBRARY.md
 * from src/rush/assets/catalog.ts (the single source of truth).
 *   node scripts/rush-docs.mjs
 */
import { createServer } from "vite";
import { writeFileSync } from "fs";

const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
const { CATALOG, BATCHES, byId } = await vite.ssrLoadModule("/src/rush/assets/catalog.ts");
const B = await vite.ssrLoadModule("/src/rush/assets/bible.ts");
await vite.close();

const refName = (r) => (B.EXISTING_REFS[r] ? B.EXISTING_REFS[r] : byId(r) ? `${r}.png — your approved "${byId(r).title}" output` : r);
const transparent = (a) => a.transparent ?? (a.kind !== "scene" || a.cat !== "ui");

/* ---------------- 03 Asset Bible */
let bible = `# Baby Mo Time Rush — Visual Asset Bible

> Generated from \`src/rush/assets/catalog.ts\` by \`node scripts/rush-docs.mjs\`. Edit the catalog, not this file.

![concept](concept-board.png)

## 1. Style
${B.STYLE}

## 2. Baby Mo
${B.MO_BIBLE}

**Helmet.** ${B.HELMET}

**Render 1 first** (owner rule): the existing real-render series \`babymo-app/www/baby-mo-poses/\` (800×800 PNG) is the identity reference for every Baby Mo prompt. Until the new riding sheets exist, the game uses render-1 \`baby-mo-pose-38.png\` (from behind), cropped to head and torso, on a procedurally drawn balance bike. Render 2 is not used. The old "Kata Baik" poses are not used.

## 3. Balance bike
${B.BIKE_BIBLE}

It is a balance bike, so the brief's "pedalling" is shown as **scooting strides** (\`mo-push\`) and **gliding** (\`mo-ride-loop\`).

## 4. Camera & sprite rules
- **Gameplay:** ${B.GAME_CAMERA}
- ${B.SPRITE_RULES}
- ${B.STILL_RULES}
- **Never paint the time.** Clock faces (balloons, tower, pocket clock) are generated BLANK; the game draws the hands so every clock is correct.
- **Scale:** Baby Mo on the bike fills ~70% of the cell height in every gameplay sheet; match \`mo-ride-34\`.
- **Anchors:** the rear-wheel contact point sits at 50% x / 92% y of each cell; the backpack anchor is the top centre of the bag.

## 5. Kit reuse (app-ayah visual library)
Buttons, panels, coins, gifts, chests, stars, ribbons, effects and village pieces are copied from the app-ayah gh-pages art library into \`public/rush/kit/\` (assets with a \`kit:\` placeholder below). They match Baby Mo's glossy kids style and are used as-is until bespoke art lands.

## 6. Production pipeline
1. Generate in ChatGPT with the prompt from \`04-PROMPT-LIBRARY.md\`, attaching the listed references.
2. Save as \`art-src/rush/<id>.png\`.
3. Sheets: \`python3 scripts/rush-slice.py art-src/rush/<id>.png <id> --grid CxR\` → \`public/rush/art/<id>.webp\` (normalised strip) + \`public/rush/art/atlas.json\`.
4. Stills: \`python3 scripts/rush-slice.py art-src/rush/<id>.png <id> --still\` (trim + WebP).
5. The game picks the file up automatically (it falls back to the placeholder when missing).

## 7. Asset list (${CATALOG.length} assets)
`;
for (const [n, name] of Object.entries(BATCHES)) {
  bible += `\n### Batch ${n} — ${name}\n\n| id | asset | type | canvas | frames | fps / loop | placeholder now | used for |\n|---|---|---|---|---|---|---|---|\n`;
  for (const a of CATALOG.filter((x) => x.batch === +n))
    bible += `| \`${a.id}\` | ${a.title} | ${a.kind} | ${a.size.join("×")} | ${a.frames ? `${a.frames} (${a.grid.join("×")})` : "—"} | ${a.fps ? `${a.fps}${a.loop ? " loop" : " once"}` : "—"} | \`${a.placeholder}\` | ${a.game} |\n`;
}
writeFileSync("docs/rush/03-ASSET-BIBLE.md", bible);

/* ---------------- 04 Prompt library */
const promptFor = (a) => {
  const L = [];
  const tr = transparent(a) && a.kind !== "scene" ? true : a.transparent ?? false;
  L.push(`Create ${a.kind === "sheet" ? `${a.frames === 8 ? "an" : "a"} ${a.frames}-frame sprite sheet` : a.kind === "strip" ? "a seamless horizontal parallax layer" : a.kind === "scene" && !tr ? "a full illustration" : "a single game asset"} for the children's game "Baby Mo Time Rush".`);
  L.push(`1. ASSET: ${a.title} (id ${a.id}).`);
  L.push(`2. PURPOSE IN GAME: ${a.game}`);
  L.push(`3. ${B.STYLE}`);
  L.push(`4. SUBJECT: ${a.subject}`);
  L.push(a.mo ? `5. ${B.MO_BIBLE}${a.helmet ? " " + B.HELMET : ""}` : a.helmet ? `5. ${B.HELMET}` : `5. CONSISTENCY: same world, palette and materials as the attached references.`);
  L.push(a.bike ? `6. ${B.BIKE_BIBLE}` : `6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.`);
  L.push(a.id.startsWith("mo-") && a.batch === 4 ? `7. ${B.GAME_CAMERA}` : `7. CAMERA: ${a.camera}`);
  L.push(`8. POSE / ACTION: ${a.pose ?? (a.kind === "sheet" ? "see frame list" : "as described in SUBJECT")}.`);
  L.push(`9. EXPRESSION: ${a.expression ?? (a.mo ? "happy, curious, gentle smile" : "friendly")}.`);
  L.push(`10. LIGHTING: ${a.lighting ?? "warm morning key light from the upper left, soft cool fill from the right, subtle rim light."}`);
  L.push(`11. BACKGROUND: ${a.transparent === false ? "full background as described (not transparent)." : "fully transparent background (PNG with alpha), nothing else in the image."}`);
  L.push(`12. CANVAS: ${a.size[0]}×${a.size[1]} px${a.grid ? `, ${a.grid[0]} columns × ${a.grid[1]} rows of equal cells (${Math.round(a.size[0] / a.grid[0])}×${Math.round(a.size[1] / a.grid[1])} px each), read left-to-right, top-to-bottom` : ""}.`);
  if (a.kind === "sheet") {
    L.push(`13. ${B.SPRITE_RULES}`);
    L.push(`14. FRAMES (${a.frames}, ${a.fps} fps, ${a.loop ? "looping" : "plays once"}):\n${a.frameNotes.map((f) => "   - " + f).join("\n")}`);
  } else {
    L.push(`13. ${B.STILL_RULES}`);
    L.push(`14. FRAMES: single image${a.kind === "scene" && a.subject.includes("grid") ? " (items arranged in the stated grid, evenly spaced, not touching, so they can be cut apart)" : ""}.`);
  }
  if (a.anchor) L.push(`    ANCHOR: ${a.anchor}.`);
  L.push(`15. AVOID: ${[...B.NEGATIVE_BASE, ...(a.mustNot ?? [])].join("; ")}.`);
  return L.join("\n");
};

let lib = `# Baby Mo Time Rush — ChatGPT Image Prompt Library

> Generated from \`src/rush/assets/catalog.ts\`. ${CATALOG.length} prompts in ${Object.keys(BATCHES).length} batches. **Generate in order**: each batch uses approved outputs of earlier batches as references.

## How to use
1. Start a fresh ChatGPT image chat per batch. Attach the listed reference images **before** pasting the prompt.
2. Approve one output before moving on; regenerate rather than "fix" if Mo's face/outfit drifts.
3. Save each approved image as \`art-src/rush/<id>.png\` and run \`scripts/rush-slice.py\` (see the Asset Bible §6).
4. Key gates: **mo-master** (batch 1), **bike-master** (batch 2) and **mo-ride-34** (batch 3) must be approved before batch 4. Every gameplay sheet is matched to \`mo-ride-34\`.
5. If a sheet comes back with uneven cells, ask: "Same image, but strictly ${"`"}C×R${"`"} equal cells, every frame the same scale with the wheels on the same baseline."

`;
for (const [n, name] of Object.entries(BATCHES)) {
  const list = CATALOG.filter((x) => x.batch === +n);
  lib += `\n---\n\n## Batch ${n} — ${name}\n\n`;
  for (const a of list) {
    lib += `### ${a.id} — ${a.title}\n\n**Attach:** ${a.refs.length ? a.refs.map(refName).join("; ") : "nothing"}  \n**Save as:** \`art-src/rush/${a.id}.png\` → game file \`public/rush/art/${a.id}.webp\`\n\n\`\`\`text\n${promptFor(a)}\n\`\`\`\n\n`;
  }
}
writeFileSync("docs/rush/04-PROMPT-LIBRARY.md", lib);
console.log(`docs/rush: bible + ${CATALOG.length} prompts`);
