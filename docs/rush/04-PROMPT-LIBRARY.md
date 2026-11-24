# Baby Mo Time Rush — ChatGPT Image Prompts (6 per image)

> Generated from `src/rush/assets/packs.ts` by `npm run docs:rush`.

**Only 14 images are left to make — 6 marked ⭐ NOW.** Your approved Baby Mo + bike art and the app-ayah library already cover the other 23 (✅ / 📚 in the checklist).
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
| 7 | Jump: crouch, fly, land | ⭐ NOW | `p07-jump.png` |
| 8 | Speed boost loop | ⭐ NOW | `p08-boost.png` |
| 9 | Catching a package | ⭐ NOW | `p09-pickup.png` |
| 10 | Gliding with a full backpack | 📚 already covered | same frames; the game flies the books into the backpack |
| 11 | Gentle bump and recovery (never falls) | ⭐ NOW | `p11-wobble.png` |
| 12 | Waiting on the bike (idle loop) | 📚 already covered | frame 5 of your sheet + breathing |
| 13 | Looking around and waving to friends | later | `p13-look-wave.png` |
| 14 | Face portraits for the HUD and speech bubbles | 📚 already covered | face cut from your turnaround |
| 15 | Delivery celebration | ⭐ NOW | `p15-celebrate.png` |
| 16 | Helping the squirrel | later | `p16-help.png` |
| 17 | Bike colours | ✅ done | recoloured from your bike art |
| 18 | Delivery backpacks | 📚 already covered | the backpack is part of your riding frames |
| 19 | Packages to deliver | 📚 already covered | app-ayah MoColorAndDraw book stack (storybooks) |
| 20 | Helmet colours | later | `p20-helmets.png` |
| 21 | Bike accessories | 📚 already covered | later polish |
| 22 | Town buildings | later | `p22-buildings.png` |
| 23 | Trees | 📚 already covered | drawn by the game |
| 24 | Roadside things | 📚 already covered | app-ayah village pieces + game drawings |
| 25 | Sky things | 📚 already covered | the game paints sky, sun and clouds |
| 26 | World cards (floating dioramas) | 📚 already covered | app-ayah NurConnect scene backgrounds |
| 27 | Things to collect | 📚 already covered | app-ayah star, coin, gift, carrot, badge |
| 28 | Clock balloons (blank faces) | later | `p28-balloons.png` |
| 29 | Soft obstacles and road pieces | ⭐ NOW | `p29-obstacles.png` |
| 30 | Arches, tunnel and rings | later | `p30-arches.png` |
| 31 | Squirrel friend | 📚 already covered | replaced by the app-ayah bunny (carrot quest) |
| 32 | The librarian | later | `p32-librarian.png` |
| 33 | More town friends | 📚 already covered | app-ayah pets cheer along the road |
| 34 | Game logo | later | `p34-logo.png` |
| 35 | Menu and HUD icons | 📚 already covered | app-ayah UI icons |
| 36 | Screen props | 📚 already covered | app-ayah chest, trophy, ribbons, cards |
| 37 | Effects | 📚 already covered | game particles + app-ayah effects |

---

## ⭐ Make now

### 7. Jump: crouch, fly, land ⭐ NOW

**Attach:** art-src/rush/p04-ride-user.png (approved riding frames); art-src/rush/bike-side.png (approved bike)  
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
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Mo and the bike face AWAY from the viewer, riding into the picture, centred in each cell. Match the attached riding frames exactly: same size, same position in the cell, same helmet, backpack and bike, rear wheel at the bottom centre of the cell.
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

**Attach:** art-src/rush/p04-ride-user.png (approved riding frames); art-src/rush/bike-side.png (approved bike)  
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
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Mo and the bike face AWAY from the viewer, riding into the picture, centred in each cell. Match the attached riding frames exactly: same size, same position in the cell, same helmet, backpack and bike, rear wheel at the bottom centre of the cell.
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

**Attach:** art-src/rush/p04-ride-user.png (approved riding frames); art-src/rush/bike-side.png (approved bike)  
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
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Mo and the bike face AWAY from the viewer, riding into the picture, centred in each cell. Match the attached riding frames exactly: same size, same position in the cell, same helmet, backpack and bike, rear wheel at the bottom centre of the cell.
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

### 11. Gentle bump and recovery (never falls) ⭐ NOW

**Attach:** art-src/rush/p04-ride-user.png (approved riding frames); art-src/rush/bike-side.png (approved bike)  
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
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Mo and the bike face AWAY from the viewer, riding into the picture, centred in each cell. Match the attached riding frames exactly: same size, same position in the cell, same helmet, backpack and bike, rear wheel at the bottom centre of the cell.
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

### 15. Delivery celebration ⭐ NOW

**Attach:** art-src/rush/p01-mo-turnaround.png (approved Baby Mo); babymo-app/www/baby-mo-poses/baby-mo-yeyy.png (render 1, celebrating)  
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
5. CAMERA: Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Mo and the bike face AWAY from the viewer, riding into the picture, centred in each cell. Match the attached riding frames exactly: same size, same position in the cell, same helmet, backpack and bike, rear wheel at the bottom centre of the cell.
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

### 16. Helping the squirrel (later)

**Attach:** art-src/rush/p01-mo-turnaround.png (approved Baby Mo); babymo-app/www/baby-mo-poses/baby-mo-pose-42.png (render 1, walking, 3/4 side)  
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

### 28. Clock balloons (blank faces) (later)

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
