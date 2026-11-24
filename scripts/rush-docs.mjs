/**
 * Generates, from src/rush/assets/packs.ts (the single source of truth):
 *   docs/rush/03-ASSET-BIBLE.md     style, characters, bike, rules, pack list
 *   docs/rush/04-PROMPT-LIBRARY.md  one copy-ready ChatGPT prompt per pack (6 things per image)
 *   scripts/rush-packs.json         cell / clip names for scripts/rush-slice.py
 *   node scripts/rush-docs.mjs
 */
import { createServer } from "vite";
import { writeFileSync } from "fs";

const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
const { PACKS, GROUPS, packById, BACKGROUNDS, BG_DONE } = await vite.ssrLoadModule("/src/rush/assets/packs.ts");
const B = await vite.ssrLoadModule("/src/rush/assets/bible.ts");
await vite.close();

const APPROVED = { "p01-mo-ref": "art-src/rush/p01-mo-turnaround.png (approved Baby Mo)", "p02-bike-ref": "art-src/rush/bike-side.png (approved bike)", "p03-ride-key": "art-src/rush/p04-ride-user.png (approved riding frames)", "p04-ride": "art-src/rush/p04-ride-user.png (approved riding frames)" };
const refName = (r) => (APPROVED[r] ?? (B.EXISTING_REFS[r] ? B.EXISTING_REFS[r] : packById(r) ? `your approved image ${packById(r).n} (${r}.png — ${packById(r).title})` : r));
const todo = PACKS.filter((p) => !p.status);
const now = todo.filter((p) => p.priority === "now");
const mark = (p) => (p.status === "done" ? "✅ done" : p.status === "covered" ? "📚 already covered" : p.priority === "now" ? "⭐ NOW" : "later");
const what = (p) => (p.kind === "anim" ? "animation frames" : p.kind === "poses" ? "poses" : "items");

/* ---------------- prompt for one pack */
function promptFor(p) {
  const L = [];
  if (p.single) {
    L.push(`PNG, transparent background. Create ONE image (1536 × 1024) for the children's game "Baby Mo Time Rush".`);
  } else {
    L.push(`PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate ${what(p)} for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.`);
  }
  L.push(`1. WHAT: ${p.title}. ${p.subject}`);
  L.push(`2. ${B.STYLE}`);
  const who = [p.mo && `${B.MO_BIBLE}${p.helmet ? "\n" + B.HELMET : ""}`, p.ais && B.AIS_BIBLE, p.adam && B.ADAM_BIBLE].filter(Boolean);
  if (who.length) L.push(`3. ${who.join("\n")}`);
  else if (p.helmet) L.push(`3. ${B.HELMET}`);
  if (p.bike) L.push(`4. ${B.BIKE_BIBLE}${p.ais || p.adam ? "\n" + B.OPP_BIKES : ""}`);
  L.push(`5. CAMERA: ${p.camera}${p.kind === "anim" && p.camera.startsWith("Gameplay chase") ? " Match the attached Baby Mo riding frames exactly: same size, same position in the cell, same helmet, backpack and bike, rear wheel at the bottom centre of the cell." : ""}`);
  if (p.single) L.push(`6. CONTENT: ${p.cells[0][1]}.`);
  else {
    L.push(`6. THE 6 CELLS${p.kind === "anim" ? " (animation frames in order; change ONLY what each frame describes)" : ""}:\n${p.cells.map(([, d], i) => `   ${i + 1}. ${d}`).join("\n")}`);
    L.push(`7. GRID RULES: exactly one ${p.kind === "anim" ? "frame" : p.kind === "poses" ? "pose" : "item"} per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell${p.baseline ? "; feet / wheels / bases all on the same ground line, about 92% down each cell" : ""}; no grid lines, borders, numbers, labels or captions.`);
  }
  L.push(`8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.`);
  L.push(`9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.`);
  L.push(`10. AVOID: ${[...B.NEGATIVE_BASE, ...(p.mustNot ?? [])].join("; ")}; any background colour.`);
  L.push(`OUTPUT: PNG, transparent background.`);
  return L.join("\n");
}

/* ---------------- 04 prompt library */
let lib = `# Baby Mo Time Rush — ChatGPT Image Prompts (6 per image)

> Generated from \`src/rush/assets/packs.ts\` by \`npm run docs:rush\`.

**Only ${todo.length} images are left to make — ${now.length} marked ⭐ NOW.** Your approved Baby Mo + bike art and the app-ayah library already cover the other ${PACKS.length - todo.length} (✅ / 📚 in the checklist).
Every image holds 6 poses, 6 items or the 6 frames of one animation in a 3 × 2 grid, on a PNG with a transparent background.

## How to use
1. Attach your approved art as the reference: \`art-src/rush/p01-mo-turnaround.png\` (Baby Mo), \`art-src/rush/bike-side.png\` (bike) and \`art-src/rush/p04-ride-user.png\` (riding from behind).
2. For each image: attach the images listed under **Attach**, then paste the prompt.
3. If Baby Mo's face or outfit drifts, regenerate instead of editing.
4. If the background is not transparent, reply: **"Same image, PNG with a fully transparent background."**
5. If the six things are uneven, reply: **"Same image, exactly 3 columns × 2 rows, every item the same size, centred in its cell, not touching."**
6. Save the image as \`art-src/rush/<file name>.png\` and run \`python3 scripts/rush-slice.py art-src/rush/<file name>.png\` — it cuts the six cells into the game files.

## Checklist
| # | Image | Status | File name / note |
|---|---|---|---|
${PACKS.map((p) => `| ${p.n} | ${p.title} | ${mark(p)} | ${p.status ? p.note : "\`" + p.id + ".png\`"} |`).join("\n")}
`;
for (const [label, list] of [["⭐ Make now", now], ["Later", todo.filter((p) => p.priority !== "now")]]) {
  lib += `\n---\n\n## ${label}\n`;
  for (const p of list) {
    lib += `\n### ${p.n}. ${p.title} ${p.priority === "now" ? "⭐ NOW" : "(later)"}\n\n**Attach:** ${p.refs.length ? p.refs.map(refName).join("; ") : "nothing"}  \n**Save as:** \`art-src/rush/${p.id}.png\`\n\n\`\`\`text\n${promptFor(p)}\n\`\`\`\n`;
  }
}
/* ---------------- backgrounds: one prompt per image */
const bgPrompt = (b) => [
  b.transparentSky
    ? `PNG with a transparent sky. Create ONE single wide background layer (${b.size[0]} × ${b.size[1]}) for the children's game "Baby Mo Time Rush". One picture only — not a grid, not a sheet.`
    : `Create ONE single full-bleed background picture (${b.size[0]} × ${b.size[1]}, ${b.size[0] > b.size[1] ? "landscape" : "portrait"}) for the children's game "Baby Mo Time Rush". One picture only — not a grid, not a sheet, no border, no frame.`,
  `1. WHAT: ${b.title} — used for: ${b.where}.`,
  `2. ${B.STYLE}`,
  `3. SCENE: ${b.subject}.`,
  `4. KEEP CLEAR: ${b.keepClear}.`,
  `5. LIGHT: ${b.light}.`,
  `6. DEPTH: soft depth of field toward the back, gentle atmospheric haze, rounded friendly shapes, uncluttered so characters and buttons stay readable on top.`,
  `7. NO PEOPLE OR CHARACTERS (the game adds Baby Mo and friends), no animals in the foreground, no text, no letters, no numbers, no logos, no watermark. Never depict Allah, prophets or angels; no faces on buildings.`,
  b.transparentSky ? `8. TRANSPARENCY: ${b.keepClear}.\nOUTPUT: PNG, transparent sky.` : `8. FILL the whole canvas edge to edge (this is a background, so it is NOT transparent).\nOUTPUT: PNG, full background.`,
].join("\n");
lib += `\n---\n\n## Backgrounds — one prompt per image\n\nThe backgrounds are generated one per image (never 6 in a grid) so each keeps full quality. Screen backgrounds fill the whole picture (a background cannot be transparent); the ride horizon layers keep a transparent sky because the game paints the sky and time of day. Attach **docs/rush/concept-board.png** and **art-src/rush/p26-road-scenes.png** (your road scenes) as style references.\n\n| # | Background | Size | File name |\n|---|---|---|---|\n${BACKGROUNDS.map((b) => `| B${b.n} | ${b.title} | ${b.size.join("×")} | ${BG_DONE[b.id] ? "✅ " + BG_DONE[b.id] : "\`art-src/rush/" + b.id + ".png\`"} |`).join("\n")}\n`;
for (const b of BACKGROUNDS) lib += `\n### B${b.n}. ${b.title}\n\n**Attach:** docs/rush/concept-board.png; art-src/rush/p26-road-scenes.png (style)  \n**Save as:** \`art-src/rush/${b.id}.png\`\n\n\`\`\`text\n${bgPrompt(b)}\n\`\`\`\n`;
writeFileSync("docs/rush/04-PROMPT-LIBRARY.md", lib);

/* ---------------- 03 asset bible */
let bible = `# Baby Mo Time Rush — Visual Asset Bible

> Generated from \`src/rush/assets/packs.ts\` by \`npm run docs:rush\`. Edit the packs, not this file.

![concept](concept-board.png)

## 1. Style
${B.STYLE}

## 2. Baby Mo
${B.MO_BIBLE}

**Helmet.** ${B.HELMET}

**Render 1 first** (owner rule): the real-render series \`babymo-app/www/baby-mo-poses/\` (800×800 PNG) is the identity reference for every Baby Mo prompt. Until the new art exists, the game uses render-1 \`baby-mo-pose-38.png\` (from behind), cut at the waist, on a procedurally drawn push balance bike. Render 2 and the old "Kata Baik" poses are not used.

## 3. Push balance bike
${B.BIKE_BIBLE}

The brief's "pedalling" is shown as **push-off strides** with the feet on the ground (\`mo-push\`) and **gliding** with the feet on the footrests (\`mo-ride-loop\`).

## 4. Image rules
- **Six per image:** every image is 1536 × 1024 with a 3 × 2 grid of 512 × 512 cells — six poses, six items, or the six frames of one animation (the logo is the only single image).
- **PNG with a transparent background** for every image. Sky and road are painted by the game.
- **Gameplay camera:** ${B.GAME_CAMERA}
- **Never paint the time.** Clock faces (balloons, tower, pocket clock, icons) are BLANK; the game draws hands that always show the right time.
- **Same scale in every cell**, characters and props on a ground line ~92% down the cell; the slicer aligns them on that line.

## 5. Kit reuse (app-ayah visual library)
Buttons, panels, coins, gifts, chests, stars, ribbons and village pieces from the app-ayah art library are in \`public/rush/kit/\` and are used until the matching pack is generated.

## 6. Pipeline
1. Generate with the prompt in \`04-PROMPT-LIBRARY.md\` → save \`art-src/rush/<pack>.png\`.
2. \`python3 scripts/rush-slice.py art-src/rush/<pack>.png\` cuts the grid, removes a white backdrop if there is one, trims, aligns the ground line and writes \`public/rush/art/<id>.webp\` per item (or one strip per animation clip) plus \`public/rush/art/atlas.json\`.
3. The game uses the new art automatically; anything missing keeps its placeholder.

## 7. Packs (${PACKS.length} images: ${PACKS.length - todo.length} done or covered, ${todo.length} to make, ${now.length} of them now)
`;
for (const g of GROUPS) {
  bible += `\n### ${g}\n\n| # | image | status | kind | game files |\n|---|---|---|---|---|\n`;
  for (const p of PACKS.filter((x) => x.group === g))
    bible += `| ${p.n} | ${p.title} | ${mark(p)} | ${p.kind} | ${p.clips ? p.clips.map((c) => `\`${c.id}\` (frames ${c.from + 1}–${c.to + 1}, ${c.fps} fps${c.loop ? ", loop" : ""})`).join(", ") : p.cells.map(([id]) => `\`${id}\``).join(", ")} |\n`;
}
writeFileSync("docs/rush/03-ASSET-BIBLE.md", bible);

/* ---------------- slicer manifest */
writeFileSync("scripts/rush-packs.json", JSON.stringify(Object.fromEntries(PACKS.map((p) => [p.id, { grid: p.single ? [1, 1] : [3, 2], kind: p.kind, cells: p.cells.map(([id]) => id), clips: p.clips ?? null, baseline: !!p.baseline }])), null, 1));
console.log(`docs/rush: ${PACKS.length} images, ${todo.length} to make (${now.length} now), ${PACKS.reduce((a, p) => a + p.cells.length, 0)} cells`);
