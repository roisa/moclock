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
const { PACKS, GROUPS, packById } = await vite.ssrLoadModule("/src/rush/assets/packs.ts");
const B = await vite.ssrLoadModule("/src/rush/assets/bible.ts");
await vite.close();

const refName = (r) => (B.EXISTING_REFS[r] ? B.EXISTING_REFS[r] : packById(r) ? `your approved image ${packById(r).n} (${r}.png — ${packById(r).title})` : r);
const now = PACKS.filter((p) => p.priority === "now");
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
  if (p.mo) L.push(`3. ${B.MO_BIBLE}${p.helmet ? "\n" + B.HELMET : ""}`);
  else if (p.helmet) L.push(`3. ${B.HELMET}`);
  if (p.bike) L.push(`4. ${B.BIKE_BIBLE}`);
  L.push(`5. CAMERA: ${p.camera}`);
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

**${PACKS.length} images in total. Every image holds 6 poses, 6 items or the 6 frames of one animation** in a 3 × 2 grid, on a PNG with a transparent background.
**Start with the ${now.length} images marked ⭐ NOW** — that is everything the Morning Town level needs. The ${PACKS.length - now.length} marked *later* are for other worlds and polish.

## How to use
1. Go in order. Images 1–3 (Baby Mo, the push balance bike, the riding key poses) are the references for everything after them — approve them before moving on.
2. For each image: attach the images listed under **Attach**, then paste the prompt.
3. If Baby Mo's face or outfit drifts, regenerate instead of editing.
4. If the background is not transparent, reply: **"Same image, PNG with a fully transparent background."**
5. If the six things are uneven, reply: **"Same image, exactly 3 columns × 2 rows, every item the same size, centred in its cell, not touching."**
6. Save the image as \`art-src/rush/<file name>.png\` and run \`python3 scripts/rush-slice.py art-src/rush/<file name>.png\` — it cuts the six cells into the game files.

## Checklist
| # | Image | Priority | File name |
|---|---|---|---|
${PACKS.map((p) => `| ${p.n} | ${p.title} | ${p.priority === "now" ? "⭐ NOW" : "later"} | \`${p.id}.png\` |`).join("\n")}
`;
for (const g of GROUPS) {
  lib += `\n---\n\n## ${g}\n`;
  for (const p of PACKS.filter((x) => x.group === g)) {
    lib += `\n### ${p.n}. ${p.title} ${p.priority === "now" ? "⭐ NOW" : "(later)"}\n\n**Attach:** ${p.refs.length ? p.refs.map(refName).join("; ") : "nothing"}  \n**Save as:** \`art-src/rush/${p.id}.png\`\n\n\`\`\`text\n${promptFor(p)}\n\`\`\`\n`;
  }
}
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

## 7. Packs (${PACKS.length} images, ${now.length} needed now)
`;
for (const g of GROUPS) {
  bible += `\n### ${g}\n\n| # | image | priority | kind | game files |\n|---|---|---|---|---|\n`;
  for (const p of PACKS.filter((x) => x.group === g))
    bible += `| ${p.n} | ${p.title} | ${p.priority} | ${p.kind} | ${p.clips ? p.clips.map((c) => `\`${c.id}\` (frames ${c.from + 1}–${c.to + 1}, ${c.fps} fps${c.loop ? ", loop" : ""})`).join(", ") : p.cells.map(([id]) => `\`${id}\``).join(", ")} |\n`;
}
writeFileSync("docs/rush/03-ASSET-BIBLE.md", bible);

/* ---------------- slicer manifest */
writeFileSync("scripts/rush-packs.json", JSON.stringify(Object.fromEntries(PACKS.map((p) => [p.id, { grid: p.single ? [1, 1] : [3, 2], kind: p.kind, cells: p.cells.map(([id]) => id), clips: p.clips ?? null, baseline: !!p.baseline }])), null, 1));
console.log(`docs/rush: ${PACKS.length} images (${now.length} now), ${PACKS.reduce((a, p) => a + p.cells.length, 0)} cells`);
