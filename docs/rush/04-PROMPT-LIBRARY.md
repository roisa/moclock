# Baby Mo Time Rush — ChatGPT Image Prompts (6 per image)

> Generated from `src/rush/assets/packs.ts` by `npm run docs:rush`.

**Only 8 images are left to make — 0 marked ⭐ NOW.** Your approved Baby Mo + bike art and the app-ayah library already cover the other 35 (✅ / 📚 in the checklist).
Every image holds 6 poses, 6 items or the 6 frames of one animation in a 3 × 2 grid, on a PNG with a transparent background.

## How to use
1. Attach your approved art as the reference: `art-src/rush/p01-mo-turnaround.png` (Baby Mo), `art-src/rush/bike-side.png` (bike) and `art-src/rush/p04-ride-user.png` (riding from behind).
2. For each image: attach the images listed under **Attach**, then paste the prompt.
3. If Baby Mo's face or outfit drifts, regenerate instead of editing.
4. If the background is not transparent, reply: **"Same image, PNG with a fully transparent background."**
5. If the six things are uneven, reply: **"Same image, exactly 3 columns × 2 rows, every item the same size, centred in its cell, not touching."**
6. Save the image as `art-src/rush/<file name>.png` and run `python3 scripts/rush-slice.py art-src/rush/<file name>.png` — it cuts the six cells into the game files.

## Checklist
| # | Image | Status | File name / note |
|---|---|---|---|
| 1 | Baby Mo reference poses (with helmet) | ✅ done | your turnaround, waving and back poses (art-src/rush/) |
| 2 | Push balance bike reference views | ✅ done | your bike side view and 4 views; colours are recoloured from it |
| 3 | Riding key poses (approve before any animation) | 📚 already covered | your 6 rear riding frames + the side bike art cover the key poses |
| 4 | Gliding loop | ✅ done | your 6 rear riding frames — the in-game rider |
| 5 | Push-off strides loop (feet push the ground — no pedals) | 📚 already covered | the 6 rear frames alternate as push strides |
| 6 | Turning left and right | 📚 already covered | frames 1/4 (left) and 3/6 (right) of your sheet + game lean |
| 7 | Jump: crouch, fly, land | ✅ done | your jump sheet (frame 4, legs splayed, left out) |
| 8 | Speed boost loop | ✅ done | your boost sheet |
| 9 | Catching a package | ✅ done | your package-catch sheet |
| 10 | Gliding with a full backpack | 📚 already covered | same frames; the game flies the books into the backpack |
| 11 | Gentle bump and recovery (never falls) | ✅ done | your bump sheet (frame 3, over-stretched leg, left out; the toy block removed) |
| 12 | Waiting on the bike (idle loop) | 📚 already covered | frame 5 of your sheet + breathing |
| 13 | Looking around and waving to friends | later | `p13-look-wave.png` |
| 14 | Face portraits for the HUD and speech bubbles | 📚 already covered | face cut from your turnaround |
| 15 | Delivery celebration | ✅ done | your celebration sheet (Delivered screen) |
| 16 | Helping the bunny | later | `p16-help.png` |
| 17 | Bike colours | ✅ done | recoloured from your bike art |
| 18 | Delivery backpacks | 📚 already covered | the backpack is part of your riding frames |
| 19 | Packages to deliver | ✅ done | your packages: storybook bundle, gift, box, letter, picnic basket, carrot bag |
| 20 | Helmet colours | later | `p20-helmets.png` |
| 21 | Bike accessories | 📚 already covered | later polish |
| 22 | Town buildings | later | `p22-buildings.png` |
| 23 | Trees | 📚 already covered | drawn by the game |
| 24 | Roadside things | ✅ done | your bench + lamp, bus stop, fruit cart, signpost, flower arch, fountain |
| 25 | Sky things | 📚 already covered | the game paints sky, sun and clouds |
| 26 | World cards (floating dioramas) | ✅ done | your six road scenes are the adventure cards |
| 27 | Things to collect | 📚 already covered | app-ayah star, coin, gift, carrot, badge |
| 28 | Clock balloons (blank faces) | ✅ done | your clock balloons (blue, pink, star) — the game paints the right time on the face |
| 29 | Soft obstacles and road pieces | ✅ done | your log, boxes, blocks, puddle, ramp and boost pad |
| 30 | Arches, tunnel and rings | later | `p30-arches.png` |
| 31 | Squirrel friend | 📚 already covered | replaced by the app-ayah bunny (carrot quest) |
| 32 | The librarian | later | `p32-librarian.png` |
| 33 | More town friends | 📚 already covered | app-ayah pets cheer along the road |
| 34 | Game logo | later | `p34-logo.png` |
| 35 | Menu and HUD icons | ✅ done | your power-ups: coin, winged shoe (rainbow ring), magnet, gift (clock and shield kept for later) |
| 36 | Screen props | 📚 already covered | your treasure chest (rewards) + app-ayah props |
| 37 | Effects | 📚 already covered | game particles + app-ayah effects |
| 38 | Baby Ais reference poses (with helmet over her hijab) | ✅ done | your Baby Ais poses (home, mission card) |
| 39 | Baby Ais riding (6 rear frames) | ✅ done | your Baby Ais riding frames — she races on the road |
| 40 | Kak Adam reference poses (with helmet) | ✅ done | your Kak Adam poses (home, mission card) |
| 41 | Kak Adam riding (6 rear frames) | ✅ done | your Kak Adam riding frames — he races on the road |
| 42 | Friendly race moments | ✅ done | your Mo + Ais moments and riding-toward-you frames (splash, rewards, world unlock) |
| 43 | Race props | later | `p43-race-props.png` |

---

## ⭐ Make now

---

## Later

### 13. Looking around and waving to friends (later)

**Attach:** art-src/rush/p04-ride-user.png (approved riding frames)  
**Save as:** `art-src/rush/p13-look-wave.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate animation frames for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Looking around and waving to friends. Baby Mo gliding; top row looks to the right side of the road, bottom row waves to a friend on the right.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
3. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them.
HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
4. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Mo and the bike face AWAY from the viewer, riding into the picture, centred in each cell. Match the attached Baby Mo riding frames exactly: same size, same position in the cell, same helmet, backpack and bike, rear wheel at the bottom centre of the cell.
6. THE 6 CELLS (animation frames in order; change ONLY what each frame describes):
   1. head turns 20° right
   2. head 45° right, cheek and eye visible, curious
   3. head back to centre
   4. right hand lifts
   5. hand up, palm open, waving
   6. hand back on the grip
7. GRID RULES: exactly one frame per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 16. Helping the bunny (later)

**Attach:** art-src/rush/p01-mo-turnaround.png (approved Baby Mo); babymo-app/www/baby-mo-poses/baby-mo-pose-42.png (render 1, walking, 3/4 side)  
**Save as:** `art-src/rush/p16-help.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate animation frames for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Helping the bunny. Baby Mo (helmet on) giving carrots to a small white bunny; leave empty space on the right of each cell (the game places the bunny from the app-ayah library).
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
3. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them.
HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
5. CAMERA: Side view facing right, full body.
6. THE 6 CELLS (animation frames in order; change ONLY what each frame describes):
   1. standing, holding a carrot
   2. crouching down
   3. holding the carrot out, palm up
   4. the carrot is gone from his palm, delighted
   5. hands on cheeks, so happy
   6. standing, small wave to the right
7. GRID RULES: exactly one frame per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 20. Helmet colours (later)

**Attach:** art-src/rush/p01-mo-turnaround.png (approved Baby Mo)  
**Save as:** `art-src/rush/p20-helmets.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Helmet colours. Six versions of Baby Mo's toddler riding helmet.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
3. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
5. CAMERA: Three-quarter front view, every helmet identical in shape.
6. THE 6 CELLS:
   1. white with a soft-blue star (the default)
   2. sky blue with a yellow star
   3. sunny yellow with a green star
   4. mint with a little flower
   5. lavender with a moon
   6. orange with a lightning stripe
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 22. Town buildings (later)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/p22-buildings.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Town buildings. Pastel storybook buildings with rounded roofs (no letters on any sign).
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Front three-quarter, slightly low angle (seen from the road), all at a consistent storybook scale.
6. THE 6 CELLS:
   1. the town library: cream walls, teal roof, big wooden double door, a sign shaped like an open book
   2. a tall cream clock tower with an orange roof; the clock face is a BLANK white circle with only 12 hour marks and NO hands
   3. a bakery with a striped orange awning and bread in the window
   4. a fruit stall with a red-and-white awning
   5. a small pastel house with a round window
   6. a different pastel house with a chimney and flower boxes
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 30. Arches, tunnel and rings (later)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/p30-arches.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Arches, tunnel and rings. Big things the bike rides through.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); centred in each cell.
6. THE 6 CELLS:
   1. a green pickup arch over the road with a cream sign showing two books
   2. the entrance of a playful paper tunnel made of colourful paper strips and paper flowers, glowing inside
   3. one colourful paper-strip arch (used repeatedly inside the tunnel)
   4. a start arch: two white posts with a garland of colourful triangle flags
   5. a big glowing rainbow ring standing upright
   6. a soft rainbow arc with a star at the top
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 32. The librarian (later)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/p32-librarian.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate poses for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: The librarian. A kind young librarian woman in a soft blue hijab, a cream cardigan over a long lavender dress, round glasses; adult proportions about 1.9 × Baby Mo's height; same 3D style.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Front three-quarter, full body, eye level.
6. THE 6 CELLS:
   1. standing, smiling
   2. waving hello
   3. reaching out with both hands to receive books
   4. hugging a stack of storybooks, delighted
   5. standing in the open library doorway, door frame only
   6. reading a storybook aloud
7. GRID RULES: exactly one pose per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 34. Game logo (later)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/p34-logo.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) for the children's game "Baby Mo Time Rush".
1. WHAT: Game logo. The game logo: 'Baby Mo' in bubbly rounded 3D letters (sky blue and yellow) above 'Time Rush' in chunky orange-to-yellow 3D letters with a white outline and a small star, and a red ribbon banner underneath reading 'Adventure Delivery'. Text spelled exactly.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Straight-on.
6. CONTENT: the whole logo, centred, filling the canvas.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; misspelled text; extra words; any background colour.
OUTPUT: PNG, transparent background.
```

### 43. Race props (later)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/p43-race-props.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Race props. Friendly race-day props in the same style (no text).
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Three-quarter front.
6. THE 6 CELLS:
   1. a finish arch with a checkered banner and colourful flags
   2. a cute start light on a post with three round lights (red, yellow, green)
   3. a small checkered flag on a stick
   4. a three-step podium with stars instead of numbers
   5. a golden medal with a star on a ribbon
   6. two soft orange traffic cones with smiley stripes
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

---

## Backgrounds — one prompt per image

The backgrounds are generated one per image (never 6 in a grid) so each keeps full quality. Screen backgrounds fill the whole picture (a background cannot be transparent); the ride horizon layers keep a transparent sky because the game paints the sky and time of day. Attach **docs/rush/concept-board.png** and **art-src/rush/p26-road-scenes.png** (your road scenes) as style references.

| # | Background | Size | File name |
|---|---|---|---|
| B1 | Home screen | 1536×1024 | `art-src/rush/bg-home.png` |
| B2 | Splash screen (portrait) | 1024×1536 | `art-src/rush/bg-splash.png` |
| B3 | Mission screen | 1536×1024 | `art-src/rush/bg-mission.png` |
| B4 | Delivered screen | 1536×1024 | `art-src/rush/bg-delivered.png` |
| B5 | Rewards screen | 1536×1024 | `art-src/rush/bg-rewards.png` |
| B6 | Bike garage | 1536×1024 | `art-src/rush/bg-garage.png` |
| B7 | My collection | 1536×1024 | `art-src/rush/bg-collection.png` |
| B8 | Parent settings | 1536×1024 | `art-src/rush/bg-parents.png` |
| B9 | Ride horizon — Morning Town | 1536×1024 | `art-src/rush/far-morning.png` |
| B10 | Ride horizon — Sunny Park | 1536×1024 | `art-src/rush/far-park.png` |
| B11 | Ride horizon — Playtime Village (seaside) | 1536×1024 | `art-src/rush/far-seaside.png` |
| B12 | Ride horizon — Sunset Town | 1536×1024 | `art-src/rush/far-sunset.png` |
| B13 | Ride horizon — Dreamland (night) | 1536×1024 | `art-src/rush/far-dream.png` |

### B1. Home screen

**Attach:** docs/rush/concept-board.png; art-src/rush/p26-road-scenes.png (style)  
**Save as:** `art-src/rush/bg-home.png`

```text
Create ONE single full-bleed background picture (1536 × 1024, landscape) for the children's game "Baby Mo Time Rush". One picture only — not a grid, not a sheet, no border, no frame.
1. WHAT: Home screen — used for: Main menu (landscape).
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
3. SCENE: a sunny Morning Town street seen from a grassy meadow: pastel storybook houses with rounded roofs, a cream clock tower and a small white masjid with a green dome in the distance, round puffy trees, flower beds, a winding light-grey road disappearing into the town, soft rolling hills, a few puffy clouds.
4. KEEP CLEAR: the left 45% is open grass and road (Baby Mo, Ais and Kak Adam stand there); the right 45% is calm sky and soft hills (logo and buttons go there).
5. LIGHT: early morning, warm golden sun from the upper left, pale-blue sky.
6. DEPTH: soft depth of field toward the back, gentle atmospheric haze, rounded friendly shapes, uncluttered so characters and buttons stay readable on top.
7. NO PEOPLE OR CHARACTERS (the game adds Baby Mo and friends), no animals in the foreground, no text, no letters, no numbers, no logos, no watermark. Never depict Allah, prophets or angels; no faces on buildings.
8. FILL the whole canvas edge to edge (this is a background, so it is NOT transparent).
OUTPUT: PNG, full background.
```

### B2. Splash screen (portrait)

**Attach:** docs/rush/concept-board.png; art-src/rush/p26-road-scenes.png (style)  
**Save as:** `art-src/rush/bg-splash.png`

```text
Create ONE single full-bleed background picture (1024 × 1536, portrait) for the children's game "Baby Mo Time Rush". One picture only — not a grid, not a sheet, no border, no frame.
1. WHAT: Splash screen (portrait) — used for: First screen on phones.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
3. SCENE: a road seen from the middle of the lane running straight toward the viewer and up into a storybook town on a hill, houses and trees on both sides, the clock tower at the top of the road, a sunrise behind it.
4. KEEP CLEAR: the top 30% is open sky (logo); the centre of the road in the lower half is clear (Baby Mo and Ais ride there).
5. LIGHT: sunrise, warm pink-gold sky fading to light blue.
6. DEPTH: soft depth of field toward the back, gentle atmospheric haze, rounded friendly shapes, uncluttered so characters and buttons stay readable on top.
7. NO PEOPLE OR CHARACTERS (the game adds Baby Mo and friends), no animals in the foreground, no text, no letters, no numbers, no logos, no watermark. Never depict Allah, prophets or angels; no faces on buildings.
8. FILL the whole canvas edge to edge (this is a background, so it is NOT transparent).
OUTPUT: PNG, full background.
```

### B3. Mission screen

**Attach:** docs/rush/concept-board.png; art-src/rush/p26-road-scenes.png (style)  
**Save as:** `art-src/rush/bg-mission.png`

```text
Create ONE single full-bleed background picture (1536 × 1024, landscape) for the children's game "Baby Mo Time Rush". One picture only — not a grid, not a sheet, no border, no frame.
1. WHAT: Mission screen — used for: Mission card with the du'a.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
3. SCENE: the front of Baby Mo's cosy home in the morning: a pastel house with a round door, a small garden with flowers, a wooden fence, a stepping-stone path to the street, the push balance bike parking spot by the door (no bike drawn).
4. KEEP CLEAR: the left third is open garden (Baby Mo stands there); the right 55% is soft and simple (the mission card covers it).
5. LIGHT: fresh morning light, dew sparkle.
6. DEPTH: soft depth of field toward the back, gentle atmospheric haze, rounded friendly shapes, uncluttered so characters and buttons stay readable on top.
7. NO PEOPLE OR CHARACTERS (the game adds Baby Mo and friends), no animals in the foreground, no text, no letters, no numbers, no logos, no watermark. Never depict Allah, prophets or angels; no faces on buildings.
8. FILL the whole canvas edge to edge (this is a background, so it is NOT transparent).
OUTPUT: PNG, full background.
```

### B4. Delivered screen

**Attach:** docs/rush/concept-board.png; art-src/rush/p26-road-scenes.png (style)  
**Save as:** `art-src/rush/bg-delivered.png`

```text
Create ONE single full-bleed background picture (1536 × 1024, landscape) for the children's game "Baby Mo Time Rush". One picture only — not a grid, not a sheet, no border, no frame.
1. WHAT: Delivered screen — used for: After the delivery.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
3. SCENE: inside the cheerful town library: low wooden shelves full of colourful books, a reading rug with cushions, round windows with sunlight, paper bunting, potted plants; a few children's backpacks on the rug (no people drawn).
4. KEEP CLEAR: the left half is open floor (Mo and the books stand there); the right half is calm wall and shelves (the result card covers it).
5. LIGHT: warm indoor sunlight.
6. DEPTH: soft depth of field toward the back, gentle atmospheric haze, rounded friendly shapes, uncluttered so characters and buttons stay readable on top.
7. NO PEOPLE OR CHARACTERS (the game adds Baby Mo and friends), no animals in the foreground, no text, no letters, no numbers, no logos, no watermark. Never depict Allah, prophets or angels; no faces on buildings.
8. FILL the whole canvas edge to edge (this is a background, so it is NOT transparent).
OUTPUT: PNG, full background.
```

### B5. Rewards screen

**Attach:** docs/rush/concept-board.png; art-src/rush/p26-road-scenes.png (style)  
**Save as:** `art-src/rush/bg-rewards.png`

```text
Create ONE single full-bleed background picture (1536 × 1024, landscape) for the children's game "Baby Mo Time Rush". One picture only — not a grid, not a sheet, no border, no frame.
1. WHAT: Rewards screen — used for: Stars and unlocks.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
3. SCENE: a soft celebration sky: pastel clouds, gentle rainbow, sparkles and a few floating stars, a grassy hill line along the bottom edge.
4. KEEP CLEAR: everything except the bottom 15% is calm and uncluttered (chest, characters and panel go on top).
5. LIGHT: bright, happy, pastel.
6. DEPTH: soft depth of field toward the back, gentle atmospheric haze, rounded friendly shapes, uncluttered so characters and buttons stay readable on top.
7. NO PEOPLE OR CHARACTERS (the game adds Baby Mo and friends), no animals in the foreground, no text, no letters, no numbers, no logos, no watermark. Never depict Allah, prophets or angels; no faces on buildings.
8. FILL the whole canvas edge to edge (this is a background, so it is NOT transparent).
OUTPUT: PNG, full background.
```

### B6. Bike garage

**Attach:** docs/rush/concept-board.png; art-src/rush/p26-road-scenes.png (style)  
**Save as:** `art-src/rush/bg-garage.png`

```text
Create ONE single full-bleed background picture (1536 × 1024, landscape) for the children's game "Baby Mo Time Rush". One picture only — not a grid, not a sheet, no border, no frame.
1. WHAT: Bike garage — used for: Bike colours.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
3. SCENE: a cosy wooden bike garage: pegboard with toy tools, a small shelf with a pump and a helmet, a round wooden turntable platform in the centre with a soft spotlight, bunting and a window with morning light (no bikes drawn, no text).
4. KEEP CLEAR: the centre is the turntable (the bike is placed on it); the right 45% wall is plain (colour cards go there).
5. LIGHT: warm indoor light, soft spotlight on the turntable.
6. DEPTH: soft depth of field toward the back, gentle atmospheric haze, rounded friendly shapes, uncluttered so characters and buttons stay readable on top.
7. NO PEOPLE OR CHARACTERS (the game adds Baby Mo and friends), no animals in the foreground, no text, no letters, no numbers, no logos, no watermark. Never depict Allah, prophets or angels; no faces on buildings.
8. FILL the whole canvas edge to edge (this is a background, so it is NOT transparent).
OUTPUT: PNG, full background.
```

### B7. My collection

**Attach:** docs/rush/concept-board.png; art-src/rush/p26-road-scenes.png (style)  
**Save as:** `art-src/rush/bg-collection.png`

```text
Create ONE single full-bleed background picture (1536 × 1024, landscape) for the children's game "Baby Mo Time Rush". One picture only — not a grid, not a sheet, no border, no frame.
1. WHAT: My collection — used for: Bags, helmets, tokens.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
3. SCENE: a bright kids' bedroom corner: an open wooden wardrobe with shelves of colourful helmets and backpacks, a star rug, a window with curtains, a small plant.
4. KEEP CLEAR: the centre and right are calm (item cards go there).
5. LIGHT: soft daylight.
6. DEPTH: soft depth of field toward the back, gentle atmospheric haze, rounded friendly shapes, uncluttered so characters and buttons stay readable on top.
7. NO PEOPLE OR CHARACTERS (the game adds Baby Mo and friends), no animals in the foreground, no text, no letters, no numbers, no logos, no watermark. Never depict Allah, prophets or angels; no faces on buildings.
8. FILL the whole canvas edge to edge (this is a background, so it is NOT transparent).
OUTPUT: PNG, full background.
```

### B8. Parent settings

**Attach:** docs/rush/concept-board.png; art-src/rush/p26-road-scenes.png (style)  
**Save as:** `art-src/rush/bg-parents.png`

```text
Create ONE single full-bleed background picture (1536 × 1024, landscape) for the children's game "Baby Mo Time Rush". One picture only — not a grid, not a sheet, no border, no frame.
1. WHAT: Parent settings — used for: Parent area.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
3. SCENE: a very calm, simple background: soft cream and mint gradient with a faint pattern of tiny stars, crescent moons and clocks.
4. KEEP CLEAR: everything — the settings panels cover most of it.
5. LIGHT: flat, soft.
6. DEPTH: soft depth of field toward the back, gentle atmospheric haze, rounded friendly shapes, uncluttered so characters and buttons stay readable on top.
7. NO PEOPLE OR CHARACTERS (the game adds Baby Mo and friends), no animals in the foreground, no text, no letters, no numbers, no logos, no watermark. Never depict Allah, prophets or angels; no faces on buildings.
8. FILL the whole canvas edge to edge (this is a background, so it is NOT transparent).
OUTPUT: PNG, full background.
```

### B9. Ride horizon — Morning Town

**Attach:** docs/rush/concept-board.png; art-src/rush/p26-road-scenes.png (style)  
**Save as:** `art-src/rush/far-morning.png`

```text
PNG with a transparent sky. Create ONE single wide background layer (1536 × 1024) for the children's game "Baby Mo Time Rush". One picture only — not a grid, not a sheet.
1. WHAT: Ride horizon — Morning Town — used for: Far scenery layer behind the road (scrolls sideways).
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
3. SCENE: a long row of tiny distant pastel houses, round trees, the clock tower, a small masjid dome and soft green hills along the horizon.
4. KEEP CLEAR: the TOP 60% must be fully transparent (no sky); the scenery sits in the bottom 40%; the left and right edges must tile seamlessly.
5. LIGHT: morning, matching the game's soft shading.
6. DEPTH: soft depth of field toward the back, gentle atmospheric haze, rounded friendly shapes, uncluttered so characters and buttons stay readable on top.
7. NO PEOPLE OR CHARACTERS (the game adds Baby Mo and friends), no animals in the foreground, no text, no letters, no numbers, no logos, no watermark. Never depict Allah, prophets or angels; no faces on buildings.
8. TRANSPARENCY: the TOP 60% must be fully transparent (no sky); the scenery sits in the bottom 40%; the left and right edges must tile seamlessly.
OUTPUT: PNG, transparent sky.
```

### B10. Ride horizon — Sunny Park

**Attach:** docs/rush/concept-board.png; art-src/rush/p26-road-scenes.png (style)  
**Save as:** `art-src/rush/far-park.png`

```text
PNG with a transparent sky. Create ONE single wide background layer (1536 × 1024) for the children's game "Baby Mo Time Rush". One picture only — not a grid, not a sheet.
1. WHAT: Ride horizon — Sunny Park — used for: Later world.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
3. SCENE: rolling park hills with picnic trees, a pond, a flower arch and a tiny playground far away.
4. KEEP CLEAR: the TOP 60% fully transparent; scenery in the bottom 40%; edges tile seamlessly.
5. LIGHT: noon.
6. DEPTH: soft depth of field toward the back, gentle atmospheric haze, rounded friendly shapes, uncluttered so characters and buttons stay readable on top.
7. NO PEOPLE OR CHARACTERS (the game adds Baby Mo and friends), no animals in the foreground, no text, no letters, no numbers, no logos, no watermark. Never depict Allah, prophets or angels; no faces on buildings.
8. TRANSPARENCY: the TOP 60% fully transparent; scenery in the bottom 40%; edges tile seamlessly.
OUTPUT: PNG, transparent sky.
```

### B11. Ride horizon — Playtime Village (seaside)

**Attach:** docs/rush/concept-board.png; art-src/rush/p26-road-scenes.png (style)  
**Save as:** `art-src/rush/far-seaside.png`

```text
PNG with a transparent sky. Create ONE single wide background layer (1536 × 1024) for the children's game "Baby Mo Time Rush". One picture only — not a grid, not a sheet.
1. WHAT: Ride horizon — Playtime Village (seaside) — used for: Later world.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
3. SCENE: a calm blue sea, a red-and-white lighthouse on a little island, a sailboat, palm trees and beach huts along the shore.
4. KEEP CLEAR: the TOP 60% fully transparent; scenery in the bottom 40%; edges tile seamlessly.
5. LIGHT: afternoon.
6. DEPTH: soft depth of field toward the back, gentle atmospheric haze, rounded friendly shapes, uncluttered so characters and buttons stay readable on top.
7. NO PEOPLE OR CHARACTERS (the game adds Baby Mo and friends), no animals in the foreground, no text, no letters, no numbers, no logos, no watermark. Never depict Allah, prophets or angels; no faces on buildings.
8. TRANSPARENCY: the TOP 60% fully transparent; scenery in the bottom 40%; edges tile seamlessly.
OUTPUT: PNG, transparent sky.
```

### B12. Ride horizon — Sunset Town

**Attach:** docs/rush/concept-board.png; art-src/rush/p26-road-scenes.png (style)  
**Save as:** `art-src/rush/far-sunset.png`

```text
PNG with a transparent sky. Create ONE single wide background layer (1536 × 1024) for the children's game "Baby Mo Time Rush". One picture only — not a grid, not a sheet.
1. WHAT: Ride horizon — Sunset Town — used for: Later world.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
3. SCENE: orange and golden autumn trees, houses with warm lit windows, a masjid with a glowing dome far away.
4. KEEP CLEAR: the TOP 60% fully transparent; scenery in the bottom 40%; edges tile seamlessly.
5. LIGHT: sunset, warm orange glow.
6. DEPTH: soft depth of field toward the back, gentle atmospheric haze, rounded friendly shapes, uncluttered so characters and buttons stay readable on top.
7. NO PEOPLE OR CHARACTERS (the game adds Baby Mo and friends), no animals in the foreground, no text, no letters, no numbers, no logos, no watermark. Never depict Allah, prophets or angels; no faces on buildings.
8. TRANSPARENCY: the TOP 60% fully transparent; scenery in the bottom 40%; edges tile seamlessly.
OUTPUT: PNG, transparent sky.
```

### B13. Ride horizon — Dreamland (night)

**Attach:** docs/rush/concept-board.png; art-src/rush/p26-road-scenes.png (style)  
**Save as:** `art-src/rush/far-dream.png`

```text
PNG with a transparent sky. Create ONE single wide background layer (1536 × 1024) for the children's game "Baby Mo Time Rush". One picture only — not a grid, not a sheet.
1. WHAT: Ride horizon — Dreamland (night) — used for: Later world.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
3. SCENE: soft night hills with glowing lanterns, a masjid with blue domes lit gently, cloud cottages and fireflies.
4. KEEP CLEAR: the TOP 60% fully transparent (the game paints the night sky, moon and stars); scenery in the bottom 40%; edges tile seamlessly.
5. LIGHT: night, gentle warm lantern glow.
6. DEPTH: soft depth of field toward the back, gentle atmospheric haze, rounded friendly shapes, uncluttered so characters and buttons stay readable on top.
7. NO PEOPLE OR CHARACTERS (the game adds Baby Mo and friends), no animals in the foreground, no text, no letters, no numbers, no logos, no watermark. Never depict Allah, prophets or angels; no faces on buildings.
8. TRANSPARENCY: the TOP 60% fully transparent (the game paints the night sky, moon and stars); scenery in the bottom 40%; edges tile seamlessly.
OUTPUT: PNG, transparent sky.
```
