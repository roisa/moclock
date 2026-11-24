# Baby Mo Time Rush — ChatGPT Image Prompts (6 per image)

> Generated from `src/rush/assets/packs.ts` by `npm run docs:rush`.

**37 images in total. Every image holds 6 poses, 6 items or the 6 frames of one animation** in a 3 × 2 grid, on a PNG with a transparent background.
**Start with the 28 images marked ⭐ NOW** — that is everything the Morning Town level needs. The 9 marked *later* are for other worlds and polish.

## How to use
1. Go in order. Images 1–3 (Baby Mo, the push balance bike, the riding key poses) are the references for everything after them — approve them before moving on.
2. For each image: attach the images listed under **Attach**, then paste the prompt.
3. If Baby Mo's face or outfit drifts, regenerate instead of editing.
4. If the background is not transparent, reply: **"Same image, PNG with a fully transparent background."**
5. If the six things are uneven, reply: **"Same image, exactly 3 columns × 2 rows, every item the same size, centred in its cell, not touching."**
6. Save the image as `art-src/rush/<file name>.png` and run `python3 scripts/rush-slice.py art-src/rush/<file name>.png` — it cuts the six cells into the game files.

## Checklist
| # | Image | Priority | File name |
|---|---|---|---|
| 1 | Baby Mo reference poses (with helmet) | ⭐ NOW | `p01-mo-ref.png` |
| 2 | Push balance bike reference views | ⭐ NOW | `p02-bike-ref.png` |
| 3 | Riding key poses (approve before any animation) | ⭐ NOW | `p03-ride-key.png` |
| 4 | Gliding loop | ⭐ NOW | `p04-ride.png` |
| 5 | Push-off strides loop (feet push the ground — no pedals) | ⭐ NOW | `p05-push.png` |
| 6 | Turning left and right | ⭐ NOW | `p06-lean.png` |
| 7 | Jump: crouch, fly, land | ⭐ NOW | `p07-jump.png` |
| 8 | Speed boost loop | ⭐ NOW | `p08-boost.png` |
| 9 | Catching a package | ⭐ NOW | `p09-pickup.png` |
| 10 | Gliding with a full backpack | ⭐ NOW | `p10-carry.png` |
| 11 | Gentle bump and recovery (never falls) | ⭐ NOW | `p11-wobble.png` |
| 12 | Waiting on the bike (idle loop) | ⭐ NOW | `p12-idle.png` |
| 13 | Looking around and waving to friends | later | `p13-look-wave.png` |
| 14 | Face portraits for the HUD and speech bubbles | ⭐ NOW | `p14-faces.png` |
| 15 | Delivery celebration | ⭐ NOW | `p15-celebrate.png` |
| 16 | Helping the squirrel | later | `p16-help.png` |
| 17 | Bike colours | ⭐ NOW | `p17-bike-colors.png` |
| 18 | Delivery backpacks | ⭐ NOW | `p18-bags.png` |
| 19 | Packages to deliver | ⭐ NOW | `p19-packages.png` |
| 20 | Helmet colours | later | `p20-helmets.png` |
| 21 | Bike accessories | later | `p21-bike-extras.png` |
| 22 | Town buildings | ⭐ NOW | `p22-buildings.png` |
| 23 | Trees | ⭐ NOW | `p23-trees.png` |
| 24 | Roadside things | ⭐ NOW | `p24-roadside.png` |
| 25 | Sky things | later | `p25-sky.png` |
| 26 | World cards (floating dioramas) | ⭐ NOW | `p26-worlds.png` |
| 27 | Things to collect | ⭐ NOW | `p27-collect.png` |
| 28 | Clock balloons (blank faces) | ⭐ NOW | `p28-balloons.png` |
| 29 | Soft obstacles and road pieces | ⭐ NOW | `p29-obstacles.png` |
| 30 | Arches, tunnel and rings | ⭐ NOW | `p30-arches.png` |
| 31 | Squirrel friend | ⭐ NOW | `p31-squirrel.png` |
| 32 | The librarian | ⭐ NOW | `p32-librarian.png` |
| 33 | More town friends | later | `p33-friends.png` |
| 34 | Game logo | ⭐ NOW | `p34-logo.png` |
| 35 | Menu and HUD icons | later | `p35-icons.png` |
| 36 | Screen props | later | `p36-screens.png` |
| 37 | Effects | later | `p37-effects.png` |

---

## References

### 1. Baby Mo reference poses (with helmet) ⭐ NOW

**Attach:** babymo-app/www/baby-mo-poses/baby-mo-pose-01.png (render 1, front, waving); babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind); babymo-app/www/baby-mo-poses/baby-mo-pose-42.png (render 1, walking, 3/4 side)  
**Save as:** `art-src/rush/p01-mo-ref.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate poses for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Baby Mo reference poses (with helmet). Character reference sheet of Baby Mo wearing his riding helmet.
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
5. CAMERA: Eye level, full body, every view at the same height on the same ground line.
6. THE 6 CELLS:
   1. standing, front view, arms relaxed, gentle smile
   2. standing, three-quarter front view facing left
   3. standing, pure side view facing left
   4. standing, back view
   5. front view, waving with his right hand, big happy smile
   6. back view, looking up and to the right at something exciting (cheek just visible)
7. GRID RULES: exactly one pose per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 2. Push balance bike reference views ⭐ NOW

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/p02-bike-ref.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Push balance bike reference views. The push balance bike alone (no rider).
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
5. CAMERA: Product views, every bike at the same scale on the same ground line.
6. THE 6 CELLS:
   1. pure side view facing left
   2. three-quarter front view from slightly above
   3. straight-on front view
   4. rear view from behind and slightly above (the gameplay angle)
   5. close-up of one wheel, side view
   6. close-up of the handlebar with grips and bell, and the saddle with the footrests
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 3. Riding key poses (approve before any animation) ⭐ NOW

**Attach:** your approved image 1 (p01-mo-ref.png — Baby Mo reference poses (with helmet)); your approved image 2 (p02-bike-ref.png — Push balance bike reference views); babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)  
**Save as:** `art-src/rush/p03-ride-key.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate poses for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Riding key poses (approve before any animation). Baby Mo on the push balance bike with helmet and small yellow backpack.
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
5. CAMERA: Each cell states its own angle; same scale everywhere, wheels on the same ground line.
6. THE 6 CELLS:
   1. KEY POSE — gameplay chase view from behind and slightly above, gliding, hands on grips, feet on the footrests (every animation must match this)
   2. pure side view facing left, gliding, feet on the footrests
   3. front three-quarter view riding toward the viewer, excited smile
   4. gameplay chase view, stopped, both feet flat on the ground either side
   5. side view, pushing the ground with his left foot (a running stride while seated)
   6. side view, standing next to the bike, showing where the backpack sits between his shoulder blades
7. GRID RULES: exactly one pose per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

---

## Riding animations

### 4. Gliding loop ⭐ NOW

**Attach:** your approved image 3 (p03-ride-key.png — Riding key poses (approve before any animation)); your approved image 2 (p02-bike-ref.png — Push balance bike reference views); your approved image 1 (p01-mo-ref.png — Baby Mo reference poses (with helmet))  
**Save as:** `art-src/rush/p04-ride.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate animation frames for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Gliding loop. Baby Mo gliding forward on the push balance bike, feet on the footrests, hands on the grips — a smooth looping bob.
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
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Mo and the bike face AWAY from the viewer, riding into the picture, centred in each cell.
6. THE 6 CELLS (animation frames in order; change ONLY what each frame describes):
   1. neutral, centred
   2. body 1.5% lower, helmet tilts 2° left
   3. lowest point
   4. rising, centred
   5. highest point, helmet tilts 2° right
   6. coming back down (flows into frame 1)
7. GRID RULES: exactly one frame per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 5. Push-off strides loop (feet push the ground — no pedals) ⭐ NOW

**Attach:** your approved image 3 (p03-ride-key.png — Riding key poses (approve before any animation)); your approved image 2 (p02-bike-ref.png — Push balance bike reference views)  
**Save as:** `art-src/rush/p05-push.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate animation frames for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Push-off strides loop (feet push the ground — no pedals). Baby Mo seated on the push balance bike, pushing the ground with alternating feet like running to speed up.
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
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Mo and the bike face AWAY from the viewer, riding into the picture, centred in each cell.
6. THE 6 CELLS (animation frames in order; change ONLY what each frame describes):
   1. left foot reaches down to the ground, right foot lifted back
   2. left foot pushes backwards, body leans forward 3°
   3. both feet tucked, short glide
   4. right foot reaches down to the ground
   5. right foot pushes backwards, body leans forward 3°
   6. both feet tucked (flows into frame 1)
7. GRID RULES: exactly one frame per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 6. Turning left and right ⭐ NOW

**Attach:** your approved image 3 (p03-ride-key.png — Riding key poses (approve before any animation)); your approved image 2 (p02-bike-ref.png — Push balance bike reference views)  
**Save as:** `art-src/rush/p06-lean.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate animation frames for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Turning left and right. Baby Mo steering the push balance bike; top row turns LEFT, bottom row turns RIGHT (draw both — do not mirror the bell).
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
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Mo and the bike face AWAY from the viewer, riding into the picture, centred in each cell.
6. THE 6 CELLS (animation frames in order; change ONLY what each frame describes):
   1. starting to turn left: handlebar 8° left, head 5° left
   2. leaning 8° left
   3. full lean 12° left, small smile on his left cheek
   4. starting to turn right: handlebar 8° right, head 5° right
   5. leaning 8° right
   6. full lean 12° right, smile on his right cheek
7. GRID RULES: exactly one frame per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 7. Jump: crouch, fly, land ⭐ NOW

**Attach:** your approved image 3 (p03-ride-key.png — Riding key poses (approve before any animation)); your approved image 2 (p02-bike-ref.png — Push balance bike reference views)  
**Save as:** `art-src/rush/p07-jump.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate animation frames for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Jump: crouch, fly, land. Baby Mo jumping with the push balance bike. Keep the wheels' ground line in the same place in every cell; the game moves the sprite up and down.
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
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Mo and the bike face AWAY from the viewer, riding into the picture, centred in each cell.
6. THE 6 CELLS (animation frames in order; change ONLY what each frame describes):
   1. crouch: body squashed down 5%, elbows bent
   2. springing up, front wheel lifting
   3. in the air, bike level, legs tucked, open-mouth laugh
   4. in the air, legs kicked out happily to the sides
   5. landing: tyres and body squashed 8%
   6. rebound to neutral, giggling
7. GRID RULES: exactly one frame per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 8. Speed boost loop ⭐ NOW

**Attach:** your approved image 3 (p03-ride-key.png — Riding key poses (approve before any animation)); your approved image 2 (p02-bike-ref.png — Push balance bike reference views)  
**Save as:** `art-src/rush/p08-boost.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate animation frames for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Speed boost loop. Baby Mo zooming fast, leaning forward, helmet strap and backpack straps fluttering (no fire, no smoke — the game adds rainbow trails).
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
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Mo and the bike face AWAY from the viewer, riding into the picture, centred in each cell.
6. THE 6 CELLS (animation frames in order; change ONLY what each frame describes):
   1. tucked forward 10°
   2. hair under the helmet flutters back
   3. tiny shake left
   4. tiny shake right
   5. one hand lifts a little with excitement
   6. hand back on the grip (flows into frame 1)
7. GRID RULES: exactly one frame per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; fire, flames or smoke; any background colour.
OUTPUT: PNG, transparent background.
```

### 9. Catching a package ⭐ NOW

**Attach:** your approved image 3 (p03-ride-key.png — Riding key poses (approve before any animation)); your approved image 2 (p02-bike-ref.png — Push balance bike reference views)  
**Save as:** `art-src/rush/p09-pickup.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate animation frames for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Catching a package. Baby Mo reaching up with his right hand to catch a cream package with a green ribbon floating down beside him, then putting it into his backpack.
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
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Mo and the bike face AWAY from the viewer, riding into the picture, centred in each cell.
6. THE 6 CELLS (animation frames in order; change ONLY what each frame describes):
   1. right hand starts to lift
   2. right arm stretched up and out, package just above
   3. hand holds the package
   4. package over his right shoulder
   5. package drops into the open backpack
   6. hand back on the grip, backpack full, happy shoulder wiggle
7. GRID RULES: exactly one frame per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 10. Gliding with a full backpack ⭐ NOW

**Attach:** your approved image 4 (p04-ride.png — Gliding loop); your approved image 3 (p03-ride-key.png — Riding key poses (approve before any animation))  
**Save as:** `art-src/rush/p10-carry.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate animation frames for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Gliding with a full backpack. Same gliding loop as pack 4, but the backpack is full and closed and bounces a little after the body.
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
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Mo and the bike face AWAY from the viewer, riding into the picture, centred in each cell.
6. THE 6 CELLS (animation frames in order; change ONLY what each frame describes):
   1. neutral
   2. body lower, backpack still up
   3. lowest, backpack catching up
   4. rising
   5. highest point
   6. coming down (flows into frame 1)
7. GRID RULES: exactly one frame per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 11. Gentle bump and recovery (never falls) ⭐ NOW

**Attach:** your approved image 3 (p03-ride-key.png — Riding key poses (approve before any animation)); your approved image 2 (p02-bike-ref.png — Push balance bike reference views)  
**Save as:** `art-src/rush/p11-wobble.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate animation frames for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Gentle bump and recovery (never falls). Baby Mo bumping softly into a toy block: a wobble, one foot down, a giggle, then riding on.
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
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Mo and the bike face AWAY from the viewer, riding into the picture, centred in each cell.
6. THE 6 CELLS (animation frames in order; change ONLY what each frame describes):
   1. front wheel bumps, bike tilts 8° right, surprised 'oops'
   2. tilts 12° right, arms out for balance
   3. right foot down on the ground
   4. upright again, shoulders up, giggling
   5. giggle shake
   6. feet back on the footrests, gliding
7. GRID RULES: exactly one frame per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; falling to the ground; crying, pain or injury; any background colour.
OUTPUT: PNG, transparent background.
```

### 12. Waiting on the bike (idle loop) ⭐ NOW

**Attach:** your approved image 3 (p03-ride-key.png — Riding key poses (approve before any animation)); your approved image 2 (p02-bike-ref.png — Push balance bike reference views)  
**Save as:** `art-src/rush/p12-idle.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate animation frames for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Waiting on the bike (idle loop). Baby Mo sitting on the stopped push balance bike, both feet flat on the ground, breathing and looking around.
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
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Mo and the bike face AWAY from the viewer, riding into the picture, centred in each cell.
6. THE 6 CELLS (animation frames in order; change ONLY what each frame describes):
   1. neutral, hands on grips
   2. shoulders rise (breathing in)
   3. head turns a little right
   4. head back to centre
   5. small bounce on the saddle
   6. neutral (flows into frame 1)
7. GRID RULES: exactly one frame per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 13. Looking around and waving to friends (later)

**Attach:** your approved image 3 (p03-ride-key.png — Riding key poses (approve before any animation))  
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
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Mo and the bike face AWAY from the viewer, riding into the picture, centred in each cell.
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

---

## Baby Mo cut-scenes

### 14. Face portraits for the HUD and speech bubbles ⭐ NOW

**Attach:** your approved image 1 (p01-mo-ref.png — Baby Mo reference poses (with helmet)); babymo-app/www/baby-mo-poses/baby-mo-pose-01.png (render 1, front, waving); babymo-app/www/baby-mo-poses/baby-mo-yeyy.png (render 1, celebrating)  
**Save as:** `art-src/rush/p14-faces.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate poses for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Face portraits for the HUD and speech bubbles. Baby Mo's face with his helmet on.
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
5. CAMERA: Head-and-shoulders portrait, front, eye level, same size in every cell.
6. THE 6 CELLS:
   1. warm happy smile, eyes open
   2. same as cell 1 with eyes closed (blink)
   3. surprised round mouth 'oh!', eyebrows up
   4. eyes squeezed happily, big open laugh, fists by his cheeks
   5. looking up, finger on chin
   6. proud grin, thumbs up
7. GRID RULES: exactly one pose per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 15. Delivery celebration ⭐ NOW

**Attach:** your approved image 1 (p01-mo-ref.png — Baby Mo reference poses (with helmet)); babymo-app/www/baby-mo-poses/baby-mo-yeyy.png (render 1, celebrating)  
**Save as:** `art-src/rush/p15-celebrate.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate animation frames for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Delivery celebration. Baby Mo (helmet on, standing next to nothing — no bike) cheering after a delivery.
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
5. CAMERA: Front three-quarter, full body, eye level.
6. THE 6 CELLS (animation frames in order; change ONLY what each frame describes):
   1. fists at chest, excited
   2. crouching to jump
   3. jumping up, both arms up
   4. top of the jump, legs tucked, laughing
   5. landing, one fist pump
   6. final pose: arms wide, biggest smile
7. GRID RULES: exactly one frame per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 16. Helping the squirrel (later)

**Attach:** your approved image 1 (p01-mo-ref.png — Baby Mo reference poses (with helmet)); babymo-app/www/baby-mo-poses/baby-mo-pose-42.png (render 1, walking, 3/4 side)  
**Save as:** `art-src/rush/p16-help.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate animation frames for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Helping the squirrel. Baby Mo (helmet on) giving an acorn to a small squirrel; leave empty space on the right of each cell (the game places the squirrel).
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
   1. standing, holding an acorn
   2. crouching down
   3. holding the acorn out, palm up
   4. the acorn is gone from his palm, delighted
   5. hands on cheeks, so happy
   6. standing, small wave to the right
7. GRID RULES: exactly one frame per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

---

## Bikes & gear

### 17. Bike colours ⭐ NOW

**Attach:** your approved image 2 (p02-bike-ref.png — Push balance bike reference views)  
**Save as:** `art-src/rush/p17-bike-colors.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Bike colours. Six push balance bikes that differ ONLY in frame colour.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
5. CAMERA: Pure side view facing left, every bike identical in shape and size.
6. THE 6 CELLS:
   1. fresh green
   2. sky blue
   3. sunny yellow
   4. soft pink
   5. lavender
   6. pastel rainbow stripes
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 18. Delivery backpacks ⭐ NOW

**Attach:** your approved image 3 (p03-ride-key.png — Riding key poses (approve before any animation))  
**Save as:** `art-src/rush/p18-bags.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Delivery backpacks. Child-sized delivery backpacks.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Rear view, the same angle as the gameplay camera; each bag sized for Baby Mo's back.
6. THE 6 CELLS:
   1. sunny yellow with a green star patch and orange straps (the default)
   2. sky blue with a yellow star patch
   3. soft pink with a white heart patch
   4. the yellow bag with three colourful storybooks peeking out
   5. a small wicker picnic basket worn with straps
   6. a navy bedtime bag shaped like a crescent moon
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 19. Packages to deliver ⭐ NOW

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/p19-packages.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Packages to deliver. Chunky, soft delivery packages with simple readable shapes.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Three-quarter front view from slightly above.
6. THE 6 CELLS:
   1. a stack of three storybooks tied with a green ribbon
   2. a pink gift box with a big yellow bow
   3. a picnic bundle: apple, sandwiches, cloth
   4. a wooden toy train in a box with a bow
   5. two lunch boxes wrapped in an orange cloth
   6. a cream teddy bear holding a small bedtime book
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 20. Helmet colours (later)

**Attach:** your approved image 1 (p01-mo-ref.png — Baby Mo reference poses (with helmet))  
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

### 21. Bike accessories (later)

**Attach:** your approved image 2 (p02-bike-ref.png — Push balance bike reference views)  
**Save as:** `art-src/rush/p21-bike-extras.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Bike accessories. Separate add-ons for the push balance bike.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Three-quarter view, same scale as the bike.
6. THE 6 CELLS:
   1. yellow bell
   2. wicker front basket
   3. rainbow handlebar streamers
   4. small triangle flag on a pole
   5. round front light
   6. star-shaped spoke beads
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

---

## Morning Town

### 22. Town buildings ⭐ NOW

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

### 23. Trees ⭐ NOW

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/p23-trees.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Trees. Round, puffy, friendly trees, each with a short trunk.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Three-quarter front at a child's eye height.
6. THE 6 CELLS:
   1. an apple tree with red apples
   2. a tall cypress
   3. a round green tree
   4. a pink blossom tree
   5. a small bush tree
   6. a twin-crown tree
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 24. Roadside things ⭐ NOW

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/p24-roadside.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Roadside things. Small roadside decorations.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Three-quarter front.
6. THE 6 CELLS:
   1. a round hedge with tiny flowers
   2. a wooden planter full of pink and yellow flowers
   3. a street lamp with a warm glowing globe
   4. a white picket fence section
   5. a wooden park bench
   6. a round red mailbox on a post with a little flag
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 25. Sky things (later)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/p25-sky.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Sky things. Things that float in the sky (the game paints the sky colour itself).
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Straight-on.
6. THE 6 CELLS:
   1. a big puffy cloud with a warm morning tint on top
   2. a small round cloud
   3. a long flat cloud
   4. a small round robin flying, wings up
   5. the same robin, wings down
   6. a friendly soft-yellow sun disc with a glow halo (no face)
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 26. World cards (floating dioramas) ⭐ NOW

**Attach:** docs/rush/concept-board.png (the Time Rush concept board); your approved image 22 (p22-buildings.png — Town buildings)  
**Save as:** `art-src/rush/p26-worlds.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: World cards (floating dioramas). Six tiny storybook worlds, each a floating island with no text.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Elevated three-quarter view of small round floating diorama islands (grassy top, rounded earth edge underneath).
6. THE 6 CELLS:
   1. Morning Town at 8 o'clock: houses, the library and the clock tower, golden morning light
   2. Sunny Park at noon: trees, a picnic blanket, bright sun
   3. Playtime Village at 3 o'clock: slides and swings
   4. Sunset Town at 6 o'clock: houses with warm lit windows, orange light
   5. Dreamland at night: a cloud cottage, moon and stars
   6. a bigger Morning Town island with a winding road, a little stone bridge and a stream (key art)
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

---

## On the road

### 27. Things to collect ⭐ NOW

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/p27-collect.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Things to collect. Chunky glossy collectibles.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Straight-on, slightly tilted.
6. THE 6 CELLS:
   1. a golden five-point star with soft rounded points
   2. a thick golden coin with a raised star
   3. a purple gift box with a yellow bow
   4. an adventure token badge: golden rim, sky-blue centre with a tiny clock and a delivery box
   5. a small golden clock with tiny wings; BLANK face (no hands)
   6. a shiny brown acorn
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 28. Clock balloons (blank faces) ⭐ NOW

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/p28-balloons.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Clock balloons (blank faces). Round helium balloons shaped like alarm clocks: two little bells on top, glossy body, a clean BLANK white clock face with only 12 hour marks and NO hands (the game draws the time), a curly string.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Front view.
6. THE 6 CELLS:
   1. pink
   2. sky blue
   3. yellow
   4. mint
   5. lavender
   6. orange
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; clock hands or numbers on the faces; any background colour.
OUTPUT: PNG, transparent background.
```

### 29. Soft obstacles and road pieces ⭐ NOW

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/p29-obstacles.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Soft obstacles and road pieces. Friendly, soft-looking things on the road (nothing sharp or scary).
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); centred in each cell.
6. THE 6 CELLS:
   1. a short round log lying across the road, with a small leaf
   2. a small stack of three cardboard boxes with star stickers
   3. three chunky wooden toy blocks: red, yellow, blue
   4. a shallow rounded puddle with sky reflections, flat on the road
   5. a small wooden ramp with three white arrows
   6. a glowing rainbow strip on the road with three bright arrows
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 30. Arches, tunnel and rings ⭐ NOW

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

---

## Friends

### 31. Squirrel friend ⭐ NOW

**Attach:** docs/rush/concept-board.png (the Time Rush concept board); your approved image 1 (p01-mo-ref.png — Baby Mo reference poses (with helmet))  
**Save as:** `art-src/rush/p31-squirrel.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate poses for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Squirrel friend. A small round orange-brown squirrel with a huge fluffy tail and big glossy eyes, cute, same 3D style as Baby Mo; and her tree home.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Front three-quarter at the squirrel's eye level.
6. THE 6 CELLS:
   1. idle, standing, smiling
   2. a little worried, looking at the ground (lost her acorns)
   3. hopping with joy
   4. holding an acorn to her chest, hearts above
   5. waving goodbye
   6. her tree home: a round green tree with a hole in the trunk
7. GRID RULES: exactly one pose per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 32. The librarian ⭐ NOW

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

### 33. More town friends (later)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/p33-friends.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate poses for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: More town friends. Cute roadside friends in the same 3D style.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Front three-quarter, full body.
6. THE 6 CELLS:
   1. a small round white rabbit, idle
   2. the rabbit hopping happily
   3. a small round robin standing on a branch
   4. a friendly round baker uncle with a white apron and cap, holding a bread basket (adult, 1.9 × Baby Mo)
   5. the baker waving
   6. a cheerful postman with a blue cap and a mail bag (adult, 1.9 × Baby Mo)
7. GRID RULES: exactly one pose per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; feet / wheels / bases all on the same ground line, about 92% down each cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

---

## Screens & effects

### 34. Game logo ⭐ NOW

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

### 35. Menu and HUD icons (later)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/p35-icons.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Menu and HUD icons. Glossy rounded game icons in the same style as the app's yellow-ringed buttons.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Straight-on.
6. THE 6 CELLS:
   1. a stopwatch-clock (blank face)
   2. a package box
   3. a map pin
   4. a push balance bike (no pedals)
   5. a trophy
   6. a little garage
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 36. Screen props (later)

**Attach:** your approved image 22 (p22-buildings.png — Town buildings)  
**Save as:** `art-src/rush/p36-screens.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Screen props. Large props for the menus, each a separate cut-out.
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Front, slightly elevated.
6. THE 6 CELLS:
   1. a mission clipboard: cream paper on a wooden clipboard with a blue clip, empty
   2. an open golden treasure chest bursting with stars
   3. a red ribbon banner with three empty star slots above it, no text
   4. a round wooden turntable platform
   5. an open wardrobe with shelves of helmets and bags
   6. the library's wooden double door, wide open with warm light and bookshelves inside
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```

### 37. Effects (later)

**Attach:** nothing  
**Save as:** `art-src/rush/p37-effects.png`

```text
PNG, transparent background. Create ONE image (1536 × 1024) with 6 separate items for the children's game "Baby Mo Time Rush", arranged in a 3 × 2 grid: 3 columns, 2 rows, six equal 512 × 512 cells, read left to right, top row first.
1. WHAT: Effects. Single-frame effect sprites (the game animates them by scaling and fading).
2. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
5. CAMERA: Straight-on.
6. THE 6 CELLS:
   1. a four-point white-gold sparkle
   2. a soft cartoon dust puff
   3. a burst of colourful confetti and tiny stars
   4. three small pink hearts
   5. a water splash crown
   6. a balloon pop burst with confetti
7. GRID RULES: exactly one item per cell, centred, complete (never cut off by the cell edge), with a small empty margin around it; nothing touches or overlaps a neighbour; the same size and scale in every cell; no grid lines, borders, numbers, labels or captions.
8. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light — identical in every cell.
9. BACKGROUND: fully transparent (PNG with alpha) — no white, grey or coloured backdrop, no floor, no sky, no drop shadow.
10. AVOID: extra or missing limbs, extra fingers, two characters inside one cell; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour.
OUTPUT: PNG, transparent background.
```
