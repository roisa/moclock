# Baby Mo Time Rush — ChatGPT Image Prompt Library

> Generated from `src/rush/assets/catalog.ts`. 111 prompts in 10 batches. **Generate in order**: each batch uses approved outputs of earlier batches as references.

## How to use
0. **Every prompt asks for a PNG with a transparent background** (first and last line of each prompt). If ChatGPT returns a white or grey backdrop, reply: "Same image, PNG with a fully transparent background." (`rush-slice.py` can also key out a plain white backdrop.)
1. Start a fresh ChatGPT image chat per batch. Attach the listed reference images **before** pasting the prompt.
2. Approve one output before moving on; regenerate rather than "fix" if Mo's face/outfit drifts.
3. Save each approved image as `art-src/rush/<id>.png` and run `scripts/rush-slice.py` (see the Asset Bible §6).
4. Key gates: **mo-master** (batch 1), **bike-master** (batch 2) and **mo-ride-34** (batch 3) must be approved before batch 4. Every gameplay sheet is matched to `mo-ride-34`.
5. If a sheet comes back with uneven cells, ask: "Same image, but strictly `C×R` equal cells, every frame the same scale with the wheels on the same baseline."


---

## Batch 1 — Baby Mo master references

### mo-master — Baby Mo master turnaround (with helmet)

**Attach:** babymo-app/www/baby-mo-poses/baby-mo-pose-01.png (render 1, front, waving); babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind); babymo-app/www/baby-mo-poses/baby-mo-pose-42.png (render 1, walking, 3/4 side)  
**Save as:** `art-src/rush/mo-master.png` → game file `public/rush/art/mo-master.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Baby Mo master turnaround (with helmet) (id mo-master).
2. PURPOSE IN GAME: Reference only — attach to every later Baby Mo prompt.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Character model sheet of Baby Mo standing in a relaxed neutral pose, arms slightly away from the body, feet together, wearing the riding helmet.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Orthographic-feeling character turnaround at eye level, four views in one row: front, three-quarter front (facing left), side profile (facing left), back.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: gentle closed-mouth smile, eyes open..
10. LIGHTING: even studio lighting with soft key from the upper left; all four views on the same (invisible) floor line and the same height.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; different heights between the views; any background props; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-stand-front — Baby Mo standing — front

**Attach:** mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-01.png (render 1, front, waving)  
**Save as:** `art-src/rush/mo-stand-front.png` → game file `public/rush/art/mo-stand-front.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Baby Mo standing — front (id mo-stand-front).
2. PURPOSE IN GAME: Main menu, mission intro.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo standing, facing the viewer, helmet on, both feet planted, one hand giving a small wave.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Front view at Baby Mo's eye level, full body.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: big happy smile with open mouth, sparkling eyes..
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-stand-back — Baby Mo standing — back

**Attach:** mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)  
**Save as:** `art-src/rush/mo-stand-back.png` → game file `public/rush/art/mo-stand-back.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Baby Mo standing — back (id mo-stand-back).
2. PURPOSE IN GAME: Mission intro (looking at the road ahead).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo seen from behind, standing, helmet on, arms relaxed, looking slightly up and to the right at something exciting (the side of his cheek just visible).
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Directly behind at Baby Mo's eye level, full body.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: happy, curious, gentle smile.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```


---

## Batch 2 — Push balance bike

### bike-master — Push balance bike master turnaround

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/bike-master.png` → game file `public/rush/art/bike-master.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Push balance bike master turnaround (id bike-master).
2. PURPOSE IN GAME: Reference only — attach to every later bike or riding prompt.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Product-style model sheet of the toddler push balance bike, no rider.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: Four orthographic-feeling views in one row: side (facing left), three-quarter front, front, rear; all at the same scale on the same floor line.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: even studio light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### bike-side — Bike — side view

**Attach:** bike-master.png — your approved "Push balance bike master turnaround" output  
**Save as:** `art-src/rush/bike-side.png` → game file `public/rush/art/bike-side.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Bike — side view (id bike-side).
2. PURPOSE IN GAME: Garage, bike unlock screen.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: The push balance bike alone.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: Pure side view (facing left), wheel hubs level.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### bike-front — Bike — front view

**Attach:** bike-master.png — your approved "Push balance bike master turnaround" output  
**Save as:** `art-src/rush/bike-front.png` → game file `public/rush/art/bike-front.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Bike — front view (id bike-front).
2. PURPOSE IN GAME: Garage turntable frame.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: The push balance bike alone.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: Straight-on front view at handlebar height.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### bike-rear — Bike — rear view

**Attach:** bike-master.png — your approved "Push balance bike master turnaround" output  
**Save as:** `art-src/rush/bike-rear.png` → game file `public/rush/art/bike-rear.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Bike — rear view (id bike-rear).
2. PURPOSE IN GAME: Garage turntable frame; bike-only layer tests.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: The push balance bike alone, seen from behind as in gameplay.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: Gameplay chase camera (from behind and slightly above).
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### bike-34 — Bike — three-quarter view

**Attach:** bike-master.png — your approved "Push balance bike master turnaround" output  
**Save as:** `art-src/rush/bike-34.png` → game file `public/rush/art/bike-34.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Bike — three-quarter view (id bike-34).
2. PURPOSE IN GAME: Garage hero image, bike cards.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: The push balance bike alone.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: Three-quarter front view from slightly above (hero product angle).
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### bike-wheel — Wheel close-up

**Attach:** bike-master.png — your approved "Push balance bike master turnaround" output  
**Save as:** `art-src/rush/bike-wheel.png` → game file `public/rush/art/bike-wheel.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Wheel close-up (id bike-wheel).
2. PURPOSE IN GAME: Garage detail; source for the wheel-spin sheet.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: One push-balance-bike wheel: chunky soft-grey tyre, cream rim, five rounded spokes, yellow star hub cap.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: Straight-on side view of one wheel, filling 80% of the frame.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### bike-handlebar — Handlebar close-up

**Attach:** bike-master.png — your approved "Push balance bike master turnaround" output  
**Save as:** `art-src/rush/bike-handlebar.png` → game file `public/rush/art/bike-handlebar.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Handlebar close-up (id bike-handlebar).
2. PURPOSE IN GAME: Garage detail card.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: The handlebar with orange grips and the little yellow bell.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: Three-quarter close-up from the rider's position.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### bike-seat — Seat & frame detail

**Attach:** bike-master.png — your approved "Push balance bike master turnaround" output  
**Save as:** `art-src/rush/bike-seat.png` → game file `public/rush/art/bike-seat.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Seat & frame detail (id bike-seat).
2. PURPOSE IN GAME: Garage detail card.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: The padded orange-peach saddle and the green frame with the cream stripe and grey footrests.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: Three-quarter close-up from above-left.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### bike-wheel-spin — Wheel rotation

**Attach:** bike-wheel.png — your approved "Wheel close-up" output  
**Save as:** `art-src/rush/bike-wheel-spin.png` → game file `public/rush/art/bike-wheel-spin.webp`

```text
PNG, transparent background. Create an 8-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Wheel rotation (id bike-wheel-spin).
2. PURPOSE IN GAME: Garage side view, bike unlock screen.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: The same wheel rotating clockwise.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: Straight-on side view of one wheel.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 4 columns × 2 rows of equal cells (384×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (8, 16 fps, looping):
   - Frame 1: spokes rotated 0° clockwise from frame 1 (five spokes repeat every 72°, so 8 frames × 9° loops seamlessly); tyre and rim unchanged.
   - Frame 2: spokes rotated 9° clockwise from frame 1 (five spokes repeat every 72°, so 8 frames × 9° loops seamlessly); tyre and rim unchanged.
   - Frame 3: spokes rotated 18° clockwise from frame 1 (five spokes repeat every 72°, so 8 frames × 9° loops seamlessly); tyre and rim unchanged.
   - Frame 4: spokes rotated 27° clockwise from frame 1 (five spokes repeat every 72°, so 8 frames × 9° loops seamlessly); tyre and rim unchanged.
   - Frame 5: spokes rotated 36° clockwise from frame 1 (five spokes repeat every 72°, so 8 frames × 9° loops seamlessly); tyre and rim unchanged.
   - Frame 6: spokes rotated 45° clockwise from frame 1 (five spokes repeat every 72°, so 8 frames × 9° loops seamlessly); tyre and rim unchanged.
   - Frame 7: spokes rotated 54° clockwise from frame 1 (five spokes repeat every 72°, so 8 frames × 9° loops seamlessly); tyre and rim unchanged.
   - Frame 8: spokes rotated 63° clockwise from frame 1 (five spokes repeat every 72°, so 8 frames × 9° loops seamlessly); tyre and rim unchanged.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### bike-colors — Bike colour line-up

**Attach:** bike-side.png — your approved "Bike — side view" output  
**Save as:** `art-src/rush/bike-colors.png` → game file `public/rush/art/bike-colors.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Bike colour line-up (id bike-colors).
2. PURPOSE IN GAME: Garage colour swatches; slice into six bike-color-<n> images.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Six identical push balance bikes that differ ONLY in frame colour: fresh green, sky blue, sunny yellow, soft pink, lavender, orange. Everything else identical.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: Same pure side view (facing left) for every bike, evenly spaced in a 3×2 grid.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### bike-unlockables — Unlockable bike designs

**Attach:** bike-side.png — your approved "Bike — side view" output  
**Save as:** `art-src/rush/bike-unlockables.png` → game file `public/rush/art/bike-unlockables.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Unlockable bike designs (id bike-unlockables).
2. PURPOSE IN GAME: Garage unlocks (earned with stars).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Four special versions of the SAME bike geometry: (1) Rainbow Glider — pastel rainbow frame; (2) Star Racer — navy frame with yellow stars; (3) Flower Cruiser — mint frame with small painted flowers and a wicker front basket; (4) Moon Dreamer — lavender frame with a crescent-moon decal and glow-in-the-dark star spokes.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: Same pure side view (facing left), 2×2 grid.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### bike-accessories — Bike accessories

**Attach:** bike-master.png — your approved "Push balance bike master turnaround" output  
**Save as:** `art-src/rush/bike-accessories.png` → game file `public/rush/art/bike-accessories.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Bike accessories (id bike-accessories).
2. PURPOSE IN GAME: Accessory collection; layered onto the bike in the garage.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Six separate add-ons for the push balance bike: yellow bell, wicker front basket, rainbow handlebar streamers, small triangle flag on a pole, round front light, star-shaped spoke beads.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: Each item in three-quarter view, 3×2 grid, same scale as the bike.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```


---

## Batch 3 — Approved riding poses

### mo-ride-side — Riding — side (key pose)

**Attach:** mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; bike-master.png — your approved "Push balance bike master turnaround" output; babymo-app/www/baby-mo-poses/baby-mo-pose-42.png (render 1, walking, 3/4 side)  
**Save as:** `art-src/rush/mo-ride-side.png` → game file `public/rush/art/mo-ride-side.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Riding — side (key pose) (id mo-ride-side).
2. PURPOSE IN GAME: Menus, mission intro, adventure cards.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo sitting on the push balance bike, both hands on the grips, feet resting on the footrests while gliding, back slightly forward, helmet on.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: Pure side view, facing left, at Baby Mo's hip height.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: excited open smile..
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
    ANCHOR: wheel contact points.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-ride-34 — Riding — three-quarter rear (APPROVED KEY POSE)

**Attach:** mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; bike-master.png — your approved "Push balance bike master turnaround" output; babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)  
**Save as:** `art-src/rush/mo-ride-34.png` → game file `public/rush/art/mo-ride-34.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Riding — three-quarter rear (APPROVED KEY POSE) (id mo-ride-34).
2. PURPOSE IN GAME: THE key frame every gameplay sheet must match (scale, angle, baseline).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo riding the push balance bike away from the viewer, gliding, hands on grips, feet on the footrests, helmet on, small backpack on his back.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: Gameplay chase camera, rotated 10° so a little of his right cheek shows.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: happy, curious, gentle smile.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
    ANCHOR: rear wheel contact at 92% height, horizontal centre.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```


---

## Batch 4 — Gameplay animation sheets

### mo-idle-bike — Idle on bike

**Attach:** mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output; bike-master.png — your approved "Push balance bike master turnaround" output; mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)  
**Save as:** `art-src/rush/mo-idle-bike.png` → game file `public/rush/art/mo-idle-bike.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Idle on bike (id mo-idle-bike).
2. PURPOSE IN GAME: Start line, pause, mission intro.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo sitting on the stopped bike, both feet flat on the ground either side, helmet on, small backpack.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: gameplay chase view — seen from directly behind and slightly above, camera about 1.5 m behind and 1.2 m up, looking down about 15°; Baby Mo and the bike face AWAY from the viewer, riding into the image; centred horizontally; a slight three-quarter hint is allowed only when the frame describes turning.
8. POSE / ACTION: see frame list.
9. EXPRESSION: happy, curious, gentle smile.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 6 fps, looping):
   - F1: neutral, hands on grips.
   - F2: shoulders rise 2% (breathing in).
   - F3: head turns 5° right, looking around.
   - F4: head back to centre, shoulders down.
   - F5: small bounce on the seat (2% down).
   - F6: back to F1 pose.
    ANCHOR: rear wheel contact.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-ride-loop — Riding loop (glide)

**Attach:** mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output; bike-master.png — your approved "Push balance bike master turnaround" output; mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)  
**Save as:** `art-src/rush/mo-ride-loop.png` → game file `public/rush/art/mo-ride-loop.webp`

```text
PNG, transparent background. Create an 8-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Riding loop (glide) (id mo-ride-loop).
2. PURPOSE IN GAME: Default cruising animation (speed scales fps 8–16).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo gliding forward on the push balance bike, feet on footrests, hands on grips.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: gameplay chase view — seen from directly behind and slightly above, camera about 1.5 m behind and 1.2 m up, looking down about 15°; Baby Mo and the bike face AWAY from the viewer, riding into the image; centred horizontally; a slight three-quarter hint is allowed only when the frame describes turning.
8. POSE / ACTION: see frame list.
9. EXPRESSION: happy, curious, gentle smile.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 4 columns × 2 rows of equal cells (384×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (8, 12 fps, looping):
   - F1: neutral glide, body centred.
   - F2: body bobs down 1.5%.
   - F3: lowest point, helmet tilts 2° left.
   - F4: rising, centred.
   - F5: highest point (1.5% up).
   - F6: body bobs down, helmet tilts 2° right.
   - F7: lowest point.
   - F8: rising back to F1.
    ANCHOR: rear wheel contact.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-push — Scoot / push-off loop (the push-balance-bike 'pedal')

**Attach:** mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output; bike-master.png — your approved "Push balance bike master turnaround" output; mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)  
**Save as:** `art-src/rush/mo-push.png` → game file `public/rush/art/mo-push.webp`

```text
PNG, transparent background. Create an 8-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Scoot / push-off loop (the push-balance-bike 'pedal') (id mo-push).
2. PURPOSE IN GAME: Accelerating / below cruise speed.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo pushing the ground with alternating feet to gain speed (running strides while seated), hands on grips.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: gameplay chase view — seen from directly behind and slightly above, camera about 1.5 m behind and 1.2 m up, looking down about 15°; Baby Mo and the bike face AWAY from the viewer, riding into the image; centred horizontally; a slight three-quarter hint is allowed only when the frame describes turning.
8. POSE / ACTION: see frame list.
9. EXPRESSION: happy, curious, gentle smile.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 4 columns × 2 rows of equal cells (384×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (8, 12 fps, looping):
   - F1: left foot reaches down to the ground, right foot lifted back.
   - F2: left foot pushes back, body leans forward 3°.
   - F3: left foot behind, lifting.
   - F4: both feet tucked, glide.
   - F5: right foot reaches down to the ground.
   - F6: right foot pushes back, body leans forward 3°.
   - F7: right foot behind, lifting.
   - F8: both feet tucked, back to F1.
    ANCHOR: rear wheel contact.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-lean-left — Turning left

**Attach:** mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output; bike-master.png — your approved "Push balance bike master turnaround" output; mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)  
**Save as:** `art-src/rush/mo-lean-left.png` → game file `public/rush/art/mo-lean-left.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Turning left (id mo-lean-left).
2. PURPOSE IN GAME: Steering left; F4–F6 hold while the stick is held.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo steering the bike to his left.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: gameplay chase view — seen from directly behind and slightly above, camera about 1.5 m behind and 1.2 m up, looking down about 15°; Baby Mo and the bike face AWAY from the viewer, riding into the image; centred horizontally; a slight three-quarter hint is allowed only when the frame describes turning.
8. POSE / ACTION: see frame list.
9. EXPRESSION: happy, curious, gentle smile.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 12 fps, plays once):
   - F1: neutral glide.
   - F2: handlebar turns 8° left, head turns 5° left.
   - F3: bike and body lean 6° left.
   - F4: lean 10° left, left knee out slightly.
   - F5: hold lean 12° left (loop F4–F5 while turning).
   - F6: hold lean 12°, small smile visible on the left cheek.
    ANCHOR: rear wheel contact.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-lean-right — Turning right

**Attach:** mo-lean-left.png — your approved "Turning left" output; mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output; bike-master.png — your approved "Push balance bike master turnaround" output; mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)  
**Save as:** `art-src/rush/mo-lean-right.png` → game file `public/rush/art/mo-lean-right.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Turning right (id mo-lean-right).
2. PURPOSE IN GAME: Steering right.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo steering the bike to his right (mirror of turning left, but drawn — do not mirror the star or the bell).
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: gameplay chase view — seen from directly behind and slightly above, camera about 1.5 m behind and 1.2 m up, looking down about 15°; Baby Mo and the bike face AWAY from the viewer, riding into the image; centred horizontally; a slight three-quarter hint is allowed only when the frame describes turning.
8. POSE / ACTION: see frame list.
9. EXPRESSION: happy, curious, gentle smile.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 12 fps, plays once):
   - F1: neutral glide.
   - F2: handlebar turns 8° right, head turns 5° right.
   - F3: lean 6° right.
   - F4: lean 10° right.
   - F5: hold 12° right.
   - F6: hold 12° right, smile on the right cheek.
    ANCHOR: rear wheel contact.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-jump-prep — Jump anticipation

**Attach:** mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output; bike-master.png — your approved "Push balance bike master turnaround" output; mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)  
**Save as:** `art-src/rush/mo-jump-prep.png` → game file `public/rush/art/mo-jump-prep.webp`

```text
PNG, transparent background. Create a 4-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Jump anticipation (id mo-jump-prep).
2. PURPOSE IN GAME: 0.12 s before take-off.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo crouching on the bike to jump.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: gameplay chase view — seen from directly behind and slightly above, camera about 1.5 m behind and 1.2 m up, looking down about 15°; Baby Mo and the bike face AWAY from the viewer, riding into the image; centred horizontally; a slight three-quarter hint is allowed only when the frame describes turning.
8. POSE / ACTION: see frame list.
9. EXPRESSION: happy, curious, gentle smile.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px, 2 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (4, 14 fps, plays once):
   - F1: neutral.
   - F2: body squashes down 4%, elbows bend.
   - F3: deepest crouch (6% lower), tyres slightly compressed.
   - F4: springing up, arms straighten, front wheel just lifting.
    ANCHOR: rear wheel contact.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-jump-air — Airborne

**Attach:** mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output; bike-master.png — your approved "Push balance bike master turnaround" output; mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)  
**Save as:** `art-src/rush/mo-jump-air.png` → game file `public/rush/art/mo-jump-air.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Airborne (id mo-jump-air).
2. PURPOSE IN GAME: While airborne (sprite rides the jump arc; the game adds the shadow).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo and the bike in the air, joyful.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: gameplay chase view — seen from directly behind and slightly above, camera about 1.5 m behind and 1.2 m up, looking down about 15°; Baby Mo and the bike face AWAY from the viewer, riding into the image; centred horizontally; a slight three-quarter hint is allowed only when the frame describes turning.
8. POSE / ACTION: see frame list.
9. EXPRESSION: (visible from the side of the face) open-mouth laugh..
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 10 fps, looping):
   - F1: bike level, legs tucked, arms straight.
   - F2: front wheel tilts up 5°.
   - F3: legs kick out slightly sideways with joy.
   - F4: legs back in.
   - F5: front wheel tilts down 3°.
   - F6: level again (loops to F1).
    ANCHOR: bike centre.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-land — Landing

**Attach:** mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output; bike-master.png — your approved "Push balance bike master turnaround" output; mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)  
**Save as:** `art-src/rush/mo-land.png` → game file `public/rush/art/mo-land.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Landing (id mo-land).
2. PURPOSE IN GAME: On touchdown (game adds a dust puff).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo landing the jump.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: gameplay chase view — seen from directly behind and slightly above, camera about 1.5 m behind and 1.2 m up, looking down about 15°; Baby Mo and the bike face AWAY from the viewer, riding into the image; centred horizontally; a slight three-quarter hint is allowed only when the frame describes turning.
8. POSE / ACTION: see frame list.
9. EXPRESSION: happy, curious, gentle smile.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 16 fps, plays once):
   - F1: rear wheel touches down.
   - F2: both wheels down, tyres squash 8%, body squashes 6%.
   - F3: deepest compression, elbows bent.
   - F4: rebound 2% above neutral.
   - F5: settle, small giggle.
   - F6: neutral glide.
    ANCHOR: rear wheel contact.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-boost — Speed boost

**Attach:** mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output; bike-master.png — your approved "Push balance bike master turnaround" output; mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)  
**Save as:** `art-src/rush/mo-boost.png` → game file `public/rush/art/mo-boost.webp`

```text
PNG, transparent background. Create an 8-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Speed boost (id mo-boost).
2. PURPOSE IN GAME: Boost pads and rainbow rings (the game adds speed lines and trails).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo zooming fast on a rainbow boost, leaning forward, helmet strap fluttering, backpack straps fluttering.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: gameplay chase view — seen from directly behind and slightly above, camera about 1.5 m behind and 1.2 m up, looking down about 15°; Baby Mo and the bike face AWAY from the viewer, riding into the image; centred horizontally; a slight three-quarter hint is allowed only when the frame describes turning.
8. POSE / ACTION: see frame list.
9. EXPRESSION: happy, curious, gentle smile.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 4 columns × 2 rows of equal cells (384×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (8, 14 fps, looping):
   - F1: lean forward 10°, tucked.
   - F2: hair tufts under helmet flutter back.
   - F3: slight body vibration left 1%.
   - F4: vibration right 1%.
   - F5: one hand lifts a little in excitement.
   - F6: hand back on grip.
   - F7: vibration left.
   - F8: back to F1.
    ANCHOR: rear wheel contact.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; fire, flames or smoke from the bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-pickup — Package collection

**Attach:** mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output; bike-master.png — your approved "Push balance bike master turnaround" output; mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)  
**Save as:** `art-src/rush/mo-pickup.png` → game file `public/rush/art/mo-pickup.webp`

```text
PNG, transparent background. Create an 8-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Package collection (id mo-pickup).
2. PURPOSE IN GAME: Pickup stations (package art is swapped per mission).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo reaching up with his right hand to catch a package floating down beside him, then swinging it into his backpack.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: gameplay chase view — seen from directly behind and slightly above, camera about 1.5 m behind and 1.2 m up, looking down about 15°; Baby Mo and the bike face AWAY from the viewer, riding into the image; centred horizontally; a slight three-quarter hint is allowed only when the frame describes turning.
8. POSE / ACTION: see frame list.
9. EXPRESSION: happy, curious, gentle smile.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 4 columns × 2 rows of equal cells (384×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (8, 12 fps, plays once):
   - F1: riding, right hand starts to lift.
   - F2: right arm stretches up and out to the right.
   - F3: hand closes around the package (package = generic cream box with a green ribbon, about the size of his head).
   - F4: brings the package over his right shoulder.
   - F5: package drops into the open backpack.
   - F6: hand back on the grip, backpack bulges.
   - F7: happy shoulder wiggle.
   - F8: neutral glide with the full backpack.
    ANCHOR: rear wheel contact.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-ride-carry — Riding with the package

**Attach:** mo-ride-loop.png — your approved "Riding loop (glide)" output; mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output; bike-master.png — your approved "Push balance bike master turnaround" output; mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)  
**Save as:** `art-src/rush/mo-ride-carry.png` → game file `public/rush/art/mo-ride-carry.webp`

```text
PNG, transparent background. Create an 8-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Riding with the package (id mo-ride-carry).
2. PURPOSE IN GAME: Default animation after pickup; the mission package icon is layered on the backpack.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Same as the riding loop, but the backpack is full and closed (package layer anchor visible).
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: gameplay chase view — seen from directly behind and slightly above, camera about 1.5 m behind and 1.2 m up, looking down about 15°; Baby Mo and the bike face AWAY from the viewer, riding into the image; centred horizontally; a slight three-quarter hint is allowed only when the frame describes turning.
8. POSE / ACTION: see frame list.
9. EXPRESSION: happy, curious, gentle smile.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 4 columns × 2 rows of equal cells (384×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (8, 12 fps, looping):
   - Identical to mo-ride-loop F1–F8, with the backpack bouncing 1% more than the body (a small delayed bounce).
    ANCHOR: rear wheel contact + backpack top centre.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-wobble — Safe bump & recovery

**Attach:** mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output; bike-master.png — your approved "Push balance bike master turnaround" output; mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)  
**Save as:** `art-src/rush/mo-wobble.png` → game file `public/rush/art/mo-wobble.webp`

```text
PNG, transparent background. Create an 8-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Safe bump & recovery (id mo-wobble).
2. PURPOSE IN GAME: Gentle obstacle collisions (slow down 30%, no failure).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo bumping softly into a toy block: wobble, feet down, giggle, ride on (never falling off, never hurt).
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: gameplay chase view — seen from directly behind and slightly above, camera about 1.5 m behind and 1.2 m up, looking down about 15°; Baby Mo and the bike face AWAY from the viewer, riding into the image; centred horizontally; a slight three-quarter hint is allowed only when the frame describes turning.
8. POSE / ACTION: see frame list.
9. EXPRESSION: surprised 'oops!' then giggle..
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 4 columns × 2 rows of equal cells (384×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (8, 12 fps, plays once):
   - F1: front wheel bumps, bike tilts 8° right.
   - F2: tilt 12° right, arms out for balance.
   - F3: right foot down on the ground.
   - F4: tilt back to 4°, both feet down.
   - F5: upright, shoulders up (giggling).
   - F6: giggle shake.
   - F7: feet back on footrests.
   - F8: neutral glide.
    ANCHOR: rear wheel contact.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; falling to the ground; crying, pain or injury; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-look-around — Looking around

**Attach:** mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output; bike-master.png — your approved "Push balance bike master turnaround" output; mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)  
**Save as:** `art-src/rush/mo-look-around.png` → game file `public/rush/art/mo-look-around.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Looking around (id mo-look-around).
2. PURPOSE IN GAME: Near hidden objects and friends.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo turning his head to look at something to his right while gliding.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: gameplay chase view — seen from directly behind and slightly above, camera about 1.5 m behind and 1.2 m up, looking down about 15°; Baby Mo and the bike face AWAY from the viewer, riding into the image; centred horizontally; a slight three-quarter hint is allowed only when the frame describes turning.
8. POSE / ACTION: see frame list.
9. EXPRESSION: happy, curious, gentle smile.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 8 fps, plays once):
   - F1: neutral.
   - F2: head turns 20° right.
   - F3: head 45° right, cheek and eye visible, curious.
   - F4: hold, small smile.
   - F5: head back to 20°.
   - F6: neutral.
    ANCHOR: rear wheel contact.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-wave-ride — Waving to friends while riding

**Attach:** mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output; bike-master.png — your approved "Push balance bike master turnaround" output; mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)  
**Save as:** `art-src/rush/mo-wave-ride.png` → game file `public/rush/art/mo-wave-ride.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Waving to friends while riding (id mo-wave-ride).
2. PURPOSE IN GAME: Passing NPCs.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo waving with his right hand to a friend at the roadside while gliding.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: gameplay chase view — seen from directly behind and slightly above, camera about 1.5 m behind and 1.2 m up, looking down about 15°; Baby Mo and the bike face AWAY from the viewer, riding into the image; centred horizontally; a slight three-quarter hint is allowed only when the frame describes turning.
8. POSE / ACTION: see frame list.
9. EXPRESSION: happy, curious, gentle smile.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 10 fps, plays once):
   - F1: neutral.
   - F2: right hand lifts.
   - F3: hand up, palm open, head turned 30° right.
   - F4: hand waves left.
   - F5: hand waves right.
   - F6: hand back on grip.
    ANCHOR: rear wheel contact.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```


---

## Batch 5 — Reactions & cut-scenes

### mo-face-happy — Portrait — happy (blink loop)

**Attach:** mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-01.png (render 1, front, waving)  
**Save as:** `art-src/rush/mo-face-happy.png` → game file `public/rush/art/mo-face-happy.webp`

```text
PNG, transparent background. Create a 4-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Portrait — happy (blink loop) (id mo-face-happy).
2. PURPOSE IN GAME: HUD avatar, dialogue bubbles.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo with helmet, head and shoulders.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Head-and-shoulders portrait, front, eye level.
8. POSE / ACTION: see frame list.
9. EXPRESSION: warm happy smile..
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px, 2 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (4, 6 fps, looping):
   - F1: eyes open.
   - F2: eyes half closed.
   - F3: eyes closed (blink).
   - F4: eyes open.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-face-surprised — Portrait — surprised

**Attach:** mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-01.png (render 1, front, waving)  
**Save as:** `art-src/rush/mo-face-surprised.png` → game file `public/rush/art/mo-face-surprised.webp`

```text
PNG, transparent background. Create a 4-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Portrait — surprised (id mo-face-surprised).
2. PURPOSE IN GAME: Discoveries (hidden objects, clock balloons).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo with helmet.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Head-and-shoulders portrait, front.
8. POSE / ACTION: see frame list.
9. EXPRESSION: surprised round mouth 'oh!', eyebrows up..
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px, 2 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (4, 8 fps, plays once):
   - F1: neutral.
   - F2: eyes widen.
   - F3: mouth round 'oh!', eyebrows high.
   - F4: turning into a smile.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-face-excited — Portrait — excited

**Attach:** mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-yeyy.png (render 1, celebrating)  
**Save as:** `art-src/rush/mo-face-excited.png` → game file `public/rush/art/mo-face-excited.webp`

```text
PNG, transparent background. Create a 4-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Portrait — excited (id mo-face-excited).
2. PURPOSE IN GAME: Rewards, combos.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo with helmet, both fists up near his cheeks.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Head-and-shoulders portrait, front.
8. POSE / ACTION: see frame list.
9. EXPRESSION: eyes squeezed happily, big open laugh..
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px, 2 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (4, 8 fps, looping):
   - F1: fists up.
   - F2: bounce up 2%.
   - F3: fists shake.
   - F4: bounce down.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-celebrate — Delivery celebration

**Attach:** mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; bike-master.png — your approved "Push balance bike master turnaround" output; babymo-app/www/baby-mo-poses/baby-mo-yeyy.png (render 1, celebrating)  
**Save as:** `art-src/rush/mo-celebrate.png` → game file `public/rush/art/mo-celebrate.webp`

```text
PNG, transparent background. Create an 8-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Delivery celebration (id mo-celebrate).
2. PURPOSE IN GAME: Delivery success screen.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo jumping and cheering after a delivery.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: Front three-quarter, full body, at his eye level; the bike stands behind him on its kickstand.
8. POSE / ACTION: see frame list.
9. EXPRESSION: biggest joy, eyes closed laughing..
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 4 columns × 2 rows of equal cells (384×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (8, 10 fps, plays once):
   - F1: standing, fists at chest.
   - F2: crouch.
   - F3: jump up, both arms up.
   - F4: top of the jump, legs tucked.
   - F5: landing.
   - F6: one fist pump.
   - F7: spin half-turn (cheek visible).
   - F8: final pose: arms wide, big smile.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### mo-help — Helping an animal

**Attach:** mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; babymo-app/www/baby-mo-poses/baby-mo-pose-42.png (render 1, walking, 3/4 side)  
**Save as:** `art-src/rush/mo-help.png` → game file `public/rush/art/mo-help.webp`

```text
PNG, transparent background. Create an 8-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Helping an animal (id mo-help).
2. PURPOSE IN GAME: Friend interaction cut-in.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo crouching to give an acorn to a small squirrel (squirrel not drawn — empty space on the right for the game to place it).
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Side view facing right, full body, bike parked behind him.
8. POSE / ACTION: see frame list.
9. EXPRESSION: kind, gentle smile..
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 4 columns × 2 rows of equal cells (384×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (8, 8 fps, plays once):
   - F1: standing, holding an acorn.
   - F2: crouching down.
   - F3: arm extends to the right.
   - F4: hold out the acorn, palm up.
   - F5: acorn lifted off his palm (by the squirrel — off-frame).
   - F6: hands to cheeks, delighted.
   - F7: stands up.
   - F8: little wave to the right.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```


---

## Batch 6 — Bags, packages & helmets

### acc-bag-standard — Delivery bag — standard

**Attach:** mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output  
**Save as:** `art-src/rush/acc-bag-standard.png` → game file `public/rush/art/acc-bag-standard.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Delivery bag — standard (id acc-bag-standard).
2. PURPOSE IN GAME: Layered on the backpack anchor while riding.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A child-sized delivery bag: a rounded small backpack in sunny yellow with a green star patch and orange straps. Sized for Baby Mo's back (about 70% of his torso width).
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Rear view, same angle as the gameplay chase camera.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### acc-bag-books — Delivery bag — books

**Attach:** mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output  
**Save as:** `art-src/rush/acc-bag-books.png` → game file `public/rush/art/acc-bag-books.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Delivery bag — books (id acc-bag-books).
2. PURPOSE IN GAME: Layered on the backpack anchor while riding.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A child-sized delivery bag: the same backpack with three colourful storybooks peeking out of the top. Sized for Baby Mo's back (about 70% of his torso width).
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Rear view, same angle as the gameplay chase camera.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### acc-bag-picnic — Delivery bag — picnic

**Attach:** mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output  
**Save as:** `art-src/rush/acc-bag-picnic.png` → game file `public/rush/art/acc-bag-picnic.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Delivery bag — picnic (id acc-bag-picnic).
2. PURPOSE IN GAME: Layered on the backpack anchor while riding.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A child-sized delivery bag: a small wicker picnic basket with a red-and-white checked cloth, carried on the back with straps. Sized for Baby Mo's back (about 70% of his torso width).
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Rear view, same angle as the gameplay chase camera.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### acc-bag-toy — Delivery bag — toy

**Attach:** mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output  
**Save as:** `art-src/rush/acc-bag-toy.png` → game file `public/rush/art/acc-bag-toy.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Delivery bag — toy (id acc-bag-toy).
2. PURPOSE IN GAME: Layered on the backpack anchor while riding.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A child-sized delivery bag: a soft blue toy-delivery bag with a teddy ear and a toy car poking out. Sized for Baby Mo's back (about 70% of his torso width).
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Rear view, same angle as the gameplay chase camera.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### acc-bag-dinner — Delivery bag — dinner

**Attach:** mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output  
**Save as:** `art-src/rush/acc-bag-dinner.png` → game file `public/rush/art/acc-bag-dinner.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Delivery bag — dinner (id acc-bag-dinner).
2. PURPOSE IN GAME: Layered on the backpack anchor while riding.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A child-sized delivery bag: an insulated round food bag in orange with a little steam-cloud logo. Sized for Baby Mo's back (about 70% of his torso width).
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Rear view, same angle as the gameplay chase camera.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### acc-bag-moon — Delivery bag — moon

**Attach:** mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output; mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output  
**Save as:** `art-src/rush/acc-bag-moon.png` → game file `public/rush/art/acc-bag-moon.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Delivery bag — moon (id acc-bag-moon).
2. PURPOSE IN GAME: Layered on the backpack anchor while riding.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A child-sized delivery bag: a navy sleepy-time bag shaped like a crescent moon with tiny stars. Sized for Baby Mo's back (about 70% of his torso width).
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Rear view, same angle as the gameplay chase camera.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### pkg-gift — Package — gift

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/pkg-gift.png` → game file `public/rush/art/pkg-gift.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Package — gift (id pkg-gift).
2. PURPOSE IN GAME: Pickup station item, HUD package icon, recipient reveal.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A delivery package: a gift box wrapped in pink paper with a big yellow bow. Simple readable silhouette, chunky and soft.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Three-quarter front view from slightly above.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### pkg-storybooks — Package — storybooks

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/pkg-storybooks.png` → game file `public/rush/art/pkg-storybooks.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Package — storybooks (id pkg-storybooks).
2. PURPOSE IN GAME: Pickup station item, HUD package icon, recipient reveal.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A delivery package: a stack of three storybooks tied with a green ribbon, top book showing a tiny clock on its cover. Simple readable silhouette, chunky and soft.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Three-quarter front view from slightly above.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### pkg-picnic — Package — picnic

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/pkg-picnic.png` → game file `public/rush/art/pkg-picnic.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Package — picnic (id pkg-picnic).
2. PURPOSE IN GAME: Pickup station item, HUD package icon, recipient reveal.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A delivery package: a picnic bundle: wicker basket with an apple and sandwiches. Simple readable silhouette, chunky and soft.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Three-quarter front view from slightly above.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### pkg-toy — Package — toy

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/pkg-toy.png` → game file `public/rush/art/pkg-toy.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Package — toy (id pkg-toy).
2. PURPOSE IN GAME: Pickup station item, HUD package icon, recipient reveal.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A delivery package: a wooden toy train in a clear box with a bow. Simple readable silhouette, chunky and soft.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Three-quarter front view from slightly above.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### pkg-food — Package — food

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/pkg-food.png` → game file `public/rush/art/pkg-food.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Package — food (id pkg-food).
2. PURPOSE IN GAME: Pickup station item, HUD package icon, recipient reveal.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A delivery package: a stack of two lunch boxes wrapped in an orange cloth. Simple readable silhouette, chunky and soft.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Three-quarter front view from slightly above.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### pkg-teddy — Package — teddy

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/pkg-teddy.png` → game file `public/rush/art/pkg-teddy.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Package — teddy (id pkg-teddy).
2. PURPOSE IN GAME: Pickup station item, HUD package icon, recipient reveal.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A delivery package: a soft cream teddy bear holding a small bedtime book. Simple readable silhouette, chunky and soft.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Three-quarter front view from slightly above.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### acc-attach-ref — Accessory attachment reference

**Attach:** mo-ride-34.png — your approved "Riding — three-quarter rear (APPROVED KEY POSE)" output; acc-bag-standard.png — your approved "Delivery bag — standard" output; mo-ride-side.png — your approved "Riding — side (key pose)" output  
**Save as:** `art-src/rush/acc-attach-ref.png` → game file `public/rush/art/acc-attach-ref.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Accessory attachment reference (id acc-attach-ref).
2. PURPOSE IN GAME: Reference for the backpack anchor used by the game.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo on the push balance bike wearing the standard backpack, showing exactly where the bag sits (between the shoulder blades, top edge level with the base of the helmet).
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: Two views side by side: gameplay rear view (left) and pure side view (right).
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: happy, curious, gentle smile.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### acc-helmets — Helmet colours

**Attach:** mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output  
**Save as:** `art-src/rush/acc-helmets.png` → game file `public/rush/art/acc-helmets.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Helmet colours (id acc-helmets).
2. PURPOSE IN GAME: Accessory collection (cosmetic only).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Six versions of the same toddler helmet: white with blue star (default), sky blue with yellow star, sunny yellow with green star, mint with a flower, lavender with a moon, orange with a lightning stripe.
5. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Three-quarter front view, 3×2 grid.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```


---

## Batch 7 — Morning Town environment

### env-key-art — Morning Town key art (full scene)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/env-key-art.png` → game file `public/rush/art/env-key-art.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Morning Town key art (full scene) (id env-key-art).
2. PURPOSE IN GAME: Adventure card, mission intro, loading screen.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Morning Town at 8 o'clock as a round floating diorama island (soft grassy top, rounded earth edge underneath), isolated on its own with nothing around it: pastel houses with rounded roofs, a cream clock tower showing eight o'clock, the town library with a big open-book sign, a bakery and a fruit shop with striped awnings, round trees, flower beds, a little stone bridge over a stream, a winding light-grey road with a soft yellow centre line.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Elevated three-quarter view of a floating storybook diorama.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: early morning: soft golden sunlight from the left, long gentle shadows, light dew sparkle; no sky or backdrop behind the island (transparent).
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### env-far — Far background (sky + hills)

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/env-far.png` → game file `public/rush/art/env-far.webp`

```text
PNG, transparent background. Create a seamless horizontal parallax layer for the children's game "Baby Mo Time Rush".
1. ASSET: Far background (sky + hills) (id env-far).
2. PURPOSE IN GAME: Parallax layer 1 (scroll 0.1× with curves).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Far layer: rolling pastel-green hills, a few tiny distant houses, soft morning haze; the TOP 55% is fully transparent (the game paints the sky gradient), the hills sit in the lower 45%. Left and right edges must tile seamlessly.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Wide panorama at horizon height.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### env-mid-houses — Midground houses strip

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/env-mid-houses.png` → game file `public/rush/art/env-mid-houses.webp`

```text
PNG, transparent background. Create a seamless horizontal parallax layer for the children's game "Baby Mo Time Rush".
1. ASSET: Midground houses strip (id env-mid-houses).
2. PURPOSE IN GAME: Parallax layer 2 (scroll 0.25×).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A row of 6 different pastel storybook houses with rounded roofs and round windows, trees between them; transparent sky above; bottom edge is a flat grass line. Left and right edges tile seamlessly.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Straight-on, horizon height.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### env-trees — Roadside trees

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/env-trees.png` → game file `public/rush/art/env-trees.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Roadside trees (id env-trees).
2. PURPOSE IN GAME: Roadside sprites (sliced into env-tree-1…6).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Six separate round, puffy, friendly trees (apple tree, round green tree, tall cypress, blossom tree, small bush tree, twin tree), each with a short trunk.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Three-quarter front view from a child's eye height, 3×2 grid of separate trees.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### env-flowers — Flowers & bushes

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/env-flowers.png` → game file `public/rush/art/env-flowers.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Flowers & bushes (id env-flowers).
2. PURPOSE IN GAME: Roadside decoration sprites.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Eight small roadside items: pink flower clump, yellow tulip clump, white daisy patch, round hedge, berry bush, tall grass tuft, flower pot, mushroom cluster.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Three-quarter front, 4×2 grid.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### env-library — The Library (destination)

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/env-library.png` → game file `public/rush/art/env-library.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: The Library (destination) (id env-library).
2. PURPOSE IN GAME: Delivery destination at the end of the road.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A cosy two-storey town library: cream walls, teal rounded roof, big wooden double door, a large sign shaped like an open book above the door (no letters), round windows, flower boxes, two little lamps, a book-return mailbox by the door.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Front three-quarter, slightly low angle (seen from the road).
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### env-clock-tower — Clock tower (blank face)

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/env-clock-tower.png` → game file `public/rush/art/env-clock-tower.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Clock tower (blank face) (id env-clock-tower).
2. PURPOSE IN GAME: Landmark; shows the live mission time.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A tall cream clock tower with an orange roof and a golden weather-vane; the clock face is a clean BLANK white circle with only the 12 hour marks — NO hands (the game draws the hands so the time is always correct).
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Front view, slightly low angle.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1536 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### env-shops — Shops

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/env-shops.png` → game file `public/rush/art/env-shops.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Shops (id env-shops).
2. PURPOSE IN GAME: Roadside buildings.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Three small shops, each separate: a bakery with a striped orange awning and bread in the window, a fruit stall with a red-white awning, a toy shop with a blue awning and a teddy in the window (no text on signs).
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Front three-quarter, 3×1 row.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### env-bridge — Stone bridge (road piece)

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/env-bridge.png` → game file `public/rush/art/env-bridge.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Stone bridge (road piece) (id env-bridge).
2. PURPOSE IN GAME: Road event: the road turns into a bridge for a short stretch.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A short arched stone bridge carrying the road over a sparkling stream, low rounded railings with flower pots.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Gameplay chase camera looking along the road.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### env-deco — Roadside decorations

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/env-deco.png` → game file `public/rush/art/env-deco.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Roadside decorations (id env-deco).
2. PURPOSE IN GAME: Roadside sprites; lamps switch on in the evening worlds.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Eight items: street lamp (lit and unlit versions), wooden bench, white picket fence section, wooden direction sign (blank boards), red mailbox, bunting garland post, bicycle rack, bird bath.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Three-quarter front, 4×2 grid.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### env-clouds — Clouds

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/env-clouds.png` → game file `public/rush/art/env-clouds.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Clouds (id env-clouds).
2. PURPOSE IN GAME: Drifting sky layer.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Six separate soft puffy white clouds of different sizes, with gentle warm morning tint on top.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Straight-on.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### env-sun — Sun (shimmer)

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/env-sun.png` → game file `public/rush/art/env-sun.webp`

```text
PNG, transparent background. Create a 4-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Sun (shimmer) (id env-sun).
2. PURPOSE IN GAME: Sky layer; position follows the time of day.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A friendly soft-yellow sun disc with a warm glow halo (no face).
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Straight-on.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px, 2 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (4, 4 fps, looping):
   - F1: halo at base size.
   - F2: halo 4% larger.
   - F3: halo 8% larger, slightly brighter.
   - F4: halo 4% larger.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### env-birds — Flying birds

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/env-birds.png` → game file `public/rush/art/env-birds.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Flying birds (id env-birds).
2. PURPOSE IN GAME: Ambient birds crossing the sky.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A small round robin-like bird flying (cute, chunky).
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Side view, bird flying right.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 10 fps, looping):
   - F1: wings up.
   - F2: wings mid-down.
   - F3: wings down.
   - F4: wings mid-up.
   - F5: wings up, body rises 3%.
   - F6: glide, wings out.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### env-moving — Moving town elements

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/env-moving.png` → game file `public/rush/art/env-moving.webp`

```text
PNG, transparent background. Create an 8-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Moving town elements (id env-moving).
2. PURPOSE IN GAME: Roadside animated landmark.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A small wooden windmill with four pastel sails turning.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Front three-quarter.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 4 columns × 2 rows of equal cells (384×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (8, 8 fps, looping):
   - F1: sails rotated 0° clockwise (four sails repeat every 90°, loops).
   - F2: sails rotated 11.25° clockwise (four sails repeat every 90°, loops).
   - F3: sails rotated 22.5° clockwise (four sails repeat every 90°, loops).
   - F4: sails rotated 33.75° clockwise (four sails repeat every 90°, loops).
   - F5: sails rotated 45° clockwise (four sails repeat every 90°, loops).
   - F6: sails rotated 56.25° clockwise (four sails repeat every 90°, loops).
   - F7: sails rotated 67.5° clockwise (four sails repeat every 90°, loops).
   - F8: sails rotated 78.75° clockwise (four sails repeat every 90°, loops).
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```


---

## Batch 8 — Collectibles

### col-star — Golden star (spin)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/col-star.png` → game file `public/rush/art/col-star.webp`

```text
PNG, transparent background. Create an 8-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Golden star (spin) (id col-star).
2. PURPOSE IN GAME: Main collectible (trails along the road).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A chunky glossy golden five-point star with soft rounded points and a tiny sparkle highlight.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Straight-on.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 4 columns × 2 rows of equal cells (384×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (8, 12 fps, looping):
   - F1: rotated 0° around its vertical axis (Y), so it appears to spin; F5 is edge-on-thin.
   - F2: rotated 22.5° around its vertical axis (Y), so it appears to spin; F5 is edge-on-thin.
   - F3: rotated 45° around its vertical axis (Y), so it appears to spin; F5 is edge-on-thin.
   - F4: rotated 67.5° around its vertical axis (Y), so it appears to spin; F5 is edge-on-thin.
   - F5: rotated 90° around its vertical axis (Y), so it appears to spin; F5 is edge-on-thin.
   - F6: rotated 112.5° around its vertical axis (Y), so it appears to spin; F5 is edge-on-thin.
   - F7: rotated 135° around its vertical axis (Y), so it appears to spin; F5 is edge-on-thin.
   - F8: rotated 157.5° around its vertical axis (Y), so it appears to spin; F5 is edge-on-thin.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### col-balloon — Clock balloon (blank face)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/col-balloon.png` → game file `public/rush/art/col-balloon.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Clock balloon (blank face) (id col-balloon).
2. PURPOSE IN GAME: Signature collectible; the game draws accurate hands for each balloon's time.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Six round helium balloons shaped like alarm clocks: two little bells on top, a glossy rubber body, a clean BLANK white clock face with only 12 hour marks and NO hands (the game draws the time), a curly string. Colours: pink, sky blue, yellow, mint, lavender, orange.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Front view, 3×2 grid of six colour versions.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### col-balloon-pop — Balloon pop

**Attach:** col-balloon.png — your approved "Clock balloon (blank face)" output  
**Save as:** `art-src/rush/col-balloon-pop.png` → game file `public/rush/art/col-balloon-pop.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Balloon pop (id col-balloon-pop).
2. PURPOSE IN GAME: Collection effect (tinted per balloon colour).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A pink clock balloon popping into confetti and stars.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Front.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 18 fps, plays once):
   - F1: balloon squashes slightly.
   - F2: balloon stretches, shiny.
   - F3: burst: rubber shreds and a ring of confetti.
   - F4: confetti and little stars expand.
   - F5: confetti falling, stars twinkling.
   - F6: last few sparkles fading.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### col-gift — Gift box (bounce + open)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/col-gift.png` → game file `public/rush/art/col-gift.webp`

```text
PNG, transparent background. Create an 8-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Gift box (bounce + open) (id col-gift).
2. PURPOSE IN GAME: Bonus collectible (gives 5 stars).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A purple gift box with a yellow bow.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Three-quarter front.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 4 columns × 2 rows of equal cells (384×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (8, 10 fps, plays once):
   - F1: resting.
   - F2: squash 5%.
   - F3: bounce up 8%.
   - F4: back down (frames 1–4 = idle loop).
   - F5: lid pops up.
   - F6: lid flies off, golden glow.
   - F7: sparkles burst out.
   - F8: open box glowing.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### col-coin — Coin (spin)

**Attach:** col-star.png — your approved "Golden star (spin)" output  
**Save as:** `art-src/rush/col-coin.png` → game file `public/rush/art/col-coin.webp`

```text
PNG, transparent background. Create an 8-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Coin (spin) (id col-coin).
2. PURPOSE IN GAME: Common pickup in trails.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A thick golden coin with a raised star.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Straight-on.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 4 columns × 2 rows of equal cells (384×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (8, 14 fps, looping):
   - F1: rotated 0° around the vertical axis.
   - F2: rotated 22.5° around the vertical axis.
   - F3: rotated 45° around the vertical axis.
   - F4: rotated 67.5° around the vertical axis.
   - F5: rotated 90° around the vertical axis.
   - F6: rotated 112.5° around the vertical axis.
   - F7: rotated 135° around the vertical axis.
   - F8: rotated 157.5° around the vertical axis.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### col-token — Adventure token

**Attach:** col-coin.png — your approved "Coin (spin)" output  
**Save as:** `art-src/rush/col-token.png` → game file `public/rush/art/col-token.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Adventure token (id col-token).
2. PURPOSE IN GAME: One per world, for helping a friend.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A special round badge-token: golden rim, sky-blue enamel centre with a tiny clock and a delivery box icon embossed, a small ribbon at the bottom.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Front, slightly tilted.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### col-clock-float — Floating pocket clock

**Attach:** col-balloon.png — your approved "Clock balloon (blank face)" output  
**Save as:** `art-src/rush/col-clock-float.png` → game file `public/rush/art/col-clock-float.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Floating pocket clock (id col-clock-float).
2. PURPOSE IN GAME: Hidden surprise object (shortcut reward).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A small golden pocket-watch-style clock with tiny wings, BLANK face (no hands).
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Three-quarter front.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### col-ring — Magic ring

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/col-ring.png` → game file `public/rush/art/col-ring.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Magic ring (id col-ring).
2. PURPOSE IN GAME: Ride-through ring (small boost + stars).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A big glowing rainbow ring of light floating upright over the road, soft sparkles.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Seen from the gameplay chase camera (an upright ring Baby Mo rides through).
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### col-rainbow — Rainbow boost object

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/col-rainbow.png` → game file `public/rush/art/col-rainbow.webp`

```text
PNG, transparent background. Create a 4-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Rainbow boost object (id col-rainbow).
2. PURPOSE IN GAME: Boost pickup.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A soft rainbow arc with a star at its peak.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Gameplay chase camera.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px, 2 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (4, 8 fps, looping):
   - F1: base.
   - F2: shimmer moves left to right.
   - F3: star sparkles.
   - F4: shimmer fades.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```


---

## Batch 9 — Obstacles, destinations & friends

### obs-ramp — Wooden ramp

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/obs-ramp.png` → game file `public/rush/art/obs-ramp.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Wooden ramp (id obs-ramp).
2. PURPOSE IN GAME: Launches a big jump.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A small wooden kicker ramp with three white chevron arrows painted on it, as wide as about 1.5× Baby Mo on his bike.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Gameplay chase camera (from behind).
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### obs-log — Rolling log

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/obs-log.png` → game file `public/rush/art/obs-log.webp`

```text
PNG, transparent background. Create an 8-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Rolling log (id obs-log).
2. PURPOSE IN GAME: Jump over (or gentle wobble).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A short round friendly log with a smiling knot (no scary face) rolling slowly across the road.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Gameplay chase camera.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 4 columns × 2 rows of equal cells (384×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (8, 10 fps, looping):
   - F1: rotated 0° (bark pattern advances).
   - F2: rotated 45° (bark pattern advances).
   - F3: rotated 90° (bark pattern advances).
   - F4: rotated 135° (bark pattern advances).
   - F5: rotated 180° (bark pattern advances).
   - F6: rotated 225° (bark pattern advances).
   - F7: rotated 270° (bark pattern advances).
   - F8: rotated 315° (bark pattern advances).
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### obs-boxes — Cardboard boxes

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/obs-boxes.png` → game file `public/rush/art/obs-boxes.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Cardboard boxes (id obs-boxes).
2. PURPOSE IN GAME: Obstacle (soft bump).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A small stack of three cardboard boxes with star stickers.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Gameplay chase camera.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### obs-blocks — Toy blocks

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/obs-blocks.png` → game file `public/rush/art/obs-blocks.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Toy blocks (id obs-blocks).
2. PURPOSE IN GAME: Obstacle (soft bump).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Three chunky wooden toy blocks (red, yellow, blue) with rounded edges.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Gameplay chase camera.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### obs-puddle — Water puddle (ripple + splash)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/obs-puddle.png` → game file `public/rush/art/obs-puddle.webp`

```text
PNG, transparent background. Create an 8-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Water puddle (ripple + splash) (id obs-puddle).
2. PURPOSE IN GAME: Slows a little, splash effect.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A shallow rounded puddle with sky reflections.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Gameplay chase camera (flat on the road).
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 4 columns × 2 rows of equal cells (384×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (8, 12 fps, plays once):
   - F1–F4: idle ripple loop (rings expand outward).
   - F5: splash crown when a wheel enters.
   - F6: droplets up.
   - F7: droplets falling.
   - F8: calm puddle.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### obs-tunnel — Paper tunnel (entrance)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/obs-tunnel.png` → game file `public/rush/art/obs-tunnel.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Paper tunnel (entrance) (id obs-tunnel).
2. PURPOSE IN GAME: Shortcut entrance (rides through).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A playful tunnel made of colourful paper strips and paper flowers, arched over the road, glowing inside.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Gameplay chase camera, facing the entrance.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### obs-balloons — Balloon cluster

**Attach:** col-balloon.png — your approved "Clock balloon (blank face)" output  
**Save as:** `art-src/rush/obs-balloons.png` → game file `public/rush/art/obs-balloons.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Balloon cluster (id obs-balloons).
2. PURPOSE IN GAME: Roadside decoration / pop for stars.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A bunch of seven plain pastel balloons tied to a little weight.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Front.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1536 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### obs-platform — Moving platform

**Attach:** env-bridge.png — your approved "Stone bridge (road piece)" output  
**Save as:** `art-src/rush/obs-platform.png` → game file `public/rush/art/obs-platform.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Moving platform (id obs-platform).
2. PURPOSE IN GAME: Later worlds (Sunny Park).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A flat wooden raft-platform on a calm stream, with rounded rope railings.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Gameplay chase camera.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### obs-boost-pad — Speed boost pad

**Attach:** col-rainbow.png — your approved "Rainbow boost object" output  
**Save as:** `art-src/rush/obs-boost-pad.png` → game file `public/rush/art/obs-boost-pad.webp`

```text
PNG, transparent background. Create a 4-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Speed boost pad (id obs-boost-pad).
2. PURPOSE IN GAME: Boost pads.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A glowing rainbow strip on the road with three bright chevron arrows pointing forward.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Gameplay chase camera (flat on the road).
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px, 2 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (4, 10 fps, looping):
   - F1: arrow 1 bright.
   - F2: arrow 2 bright.
   - F3: arrow 3 bright.
   - F4: all dim.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### obs-mailbox — Mailbox (opens)

**Attach:** env-deco.png — your approved "Roadside decorations" output  
**Save as:** `art-src/rush/obs-mailbox.png` → game file `public/rush/art/obs-mailbox.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Mailbox (opens) (id obs-mailbox).
2. PURPOSE IN GAME: Small deliveries to friends.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A round red mailbox on a post with a little flag.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Three-quarter front.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 10 fps, plays once):
   - F1: closed.
   - F2: flag rises.
   - F3: door opens.
   - F4: open, glow inside.
   - F5: a package slides in.
   - F6: door closes, flag up, sparkle.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### obs-library-door — Library door (opens)

**Attach:** env-library.png — your approved "The Library (destination)" output  
**Save as:** `art-src/rush/obs-library-door.png` → game file `public/rush/art/obs-library-door.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Library door (opens) (id obs-library-door).
2. PURPOSE IN GAME: Delivery moment.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: The library's wooden double door.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Front, matching env-library.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 10 fps, plays once):
   - F1: closed.
   - F2: doors open 15°.
   - F3: 45°, warm light spills out.
   - F4: fully open, bookshelves inside.
   - F5: light glow peaks.
   - F6: hold open.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### dest-houses — Delivery destinations (5 worlds)

**Attach:** env-library.png — your approved "The Library (destination)" output  
**Save as:** `art-src/rush/dest-houses.png` → game file `public/rush/art/dest-houses.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Delivery destinations (5 worlds) (id dest-houses).
2. PURPOSE IN GAME: Later worlds.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Five destinations in the same style: picnic blanket spot under a tree (Sunny Park), toy shop door (Playtime Village), a cosy house with a lit window (Sunset Town), a dreamy cloud cottage with a moon lamp (Dreamland), and a post office; sixth cell empty.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Front three-quarter, 3×2 grid.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### npc-squirrel — NPC — squirrel (idle / happy / interact)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board); mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output  
**Save as:** `art-src/rush/npc-squirrel.png` → game file `public/rush/art/npc-squirrel.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: NPC — squirrel (idle / happy / interact) (id npc-squirrel).
2. PURPOSE IN GAME: Friend quest in Morning Town.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: a small round orange-brown squirrel with a huge fluffy tail and big glossy eyes, friendly and cute, same 3D style as Baby Mo.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Front three-quarter at the character's eye level.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 8 fps, plays once):
   - F1: idle (neutral, blinking eyes open).
   - F2: idle (eyes closed — blink).
   - F3: happy (big smile, small hop).
   - F4: happy (arms or paws up).
   - F5: interact (reaching out to receive something).
   - F6: interact (holding it, hearts above).
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### npc-rabbit — NPC — rabbit (idle / happy / interact)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board); mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output  
**Save as:** `art-src/rush/npc-rabbit.png` → game file `public/rush/art/npc-rabbit.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: NPC — rabbit (idle / happy / interact) (id npc-rabbit).
2. PURPOSE IN GAME: Roadside friend.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: a small round white rabbit with pink inner ears and a cotton tail, friendly and cute, same 3D style as Baby Mo.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Front three-quarter at the character's eye level.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 8 fps, plays once):
   - F1: idle (neutral, blinking eyes open).
   - F2: idle (eyes closed — blink).
   - F3: happy (big smile, small hop).
   - F4: happy (arms or paws up).
   - F5: interact (reaching out to receive something).
   - F6: interact (holding it, hearts above).
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### npc-bird — NPC — bird (idle / happy / interact)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board); mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output  
**Save as:** `art-src/rush/npc-bird.png` → game file `public/rush/art/npc-bird.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: NPC — bird (idle / happy / interact) (id npc-bird).
2. PURPOSE IN GAME: Roadside friend.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: a small round robin with an orange chest, friendly and cute, same 3D style as Baby Mo.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Front three-quarter at the character's eye level.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 8 fps, plays once):
   - F1: idle (neutral, blinking eyes open).
   - F2: idle (eyes closed — blink).
   - F3: happy (big smile, small hop).
   - F4: happy (arms or paws up).
   - F5: interact (reaching out to receive something).
   - F6: interact (holding it, hearts above).
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### npc-librarian — NPC — librarian (idle / happy / interact)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board); mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output  
**Save as:** `art-src/rush/npc-librarian.png` → game file `public/rush/art/npc-librarian.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: NPC — librarian (idle / happy / interact) (id npc-librarian).
2. PURPOSE IN GAME: Receives the books at the library.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: a kind young librarian woman wearing a soft blue hijab, a cream cardigan over a long lavender dress, round glasses, holding a storybook (adult proportions, about 1.9× Baby Mo's height, same art style), friendly and cute, same 3D style as Baby Mo.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Front three-quarter at the character's eye level.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 8 fps, plays once):
   - F1: idle (neutral, blinking eyes open).
   - F2: idle (eyes closed — blink).
   - F3: happy (big smile, small hop).
   - F4: happy (arms or paws up).
   - F5: interact (reaching out to receive something).
   - F6: interact (holding it, hearts above).
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### npc-baker — NPC — baker (idle / happy / interact)

**Attach:** docs/rush/concept-board.png (the Time Rush concept board); mo-master.png — your approved "Baby Mo master turnaround (with helmet)" output  
**Save as:** `art-src/rush/npc-baker.png` → game file `public/rush/art/npc-baker.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: NPC — baker (idle / happy / interact) (id npc-baker).
2. PURPOSE IN GAME: Roadside friend.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: a friendly round baker uncle with a white apron and a small white cap, holding a bread basket (adult proportions, 1.9× Baby Mo's height), friendly and cute, same 3D style as Baby Mo.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Front three-quarter at the character's eye level.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 8 fps, plays once):
   - F1: idle (neutral, blinking eyes open).
   - F2: idle (eyes closed — blink).
   - F3: happy (big smile, small hop).
   - F4: happy (arms or paws up).
   - F5: interact (reaching out to receive something).
   - F6: interact (holding it, hearts above).
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```


---

## Batch 10 — UI, screens & effects

### ui-logo — Game logo

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/ui-logo.png` → game file `public/rush/art/ui-logo.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Game logo (id ui-logo).
2. PURPOSE IN GAME: Splash, main menu.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: The game logo lettering 'Baby Mo' (bubbly rounded 3D letters in sky blue and yellow) above 'Time Rush' (chunky orange-to-yellow 3D letters with a white outline) with a small star, and a red ribbon banner underneath reading 'Time Adventure Delivery Race'. Text must be spelled exactly.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Straight-on.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; misspelled text; extra words; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### ui-splash — Splash screen

**Attach:** mo-ride-side.png — your approved "Riding — side (key pose)" output; env-key-art.png — your approved "Morning Town key art (full scene)" output; ui-logo.png — your approved "Game logo" output  
**Save as:** `art-src/rush/ui-splash.png` → game file `public/rush/art/ui-splash.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Splash screen (id ui-splash).
2. PURPOSE IN GAME: First screen (portrait).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo on his push balance bike riding toward the viewer, gliding with his feet on the footrests, package in his backpack, on a short curved piece of road with a few houses, round trees and the clock tower clustered behind him — a cut-out vignette isolated on a transparent background; empty transparent space in the top 30% for the logo.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.
7. CAMERA: Portrait key art, low angle.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: happy, curious, gentle smile.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1536 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### ui-menu-bg — Main menu background

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/ui-menu-bg.png` → game file `public/rush/art/ui-menu-bg.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Main menu background (id ui-menu-bg).
2. PURPOSE IN GAME: Main menu (landscape).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A Morning Town street vignette cut-out: a row of pastel houses, round trees, flower beds and the clock tower on the right, standing on a strip of grass along the bottom; the sky area is fully transparent (the game paints its own sky) and the left half is left empty and transparent for Baby Mo and buttons.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Wide, gentle depth of field.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### ui-world-1 — World card — Morning Rush

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/ui-world-1.png` → game file `public/rush/art/ui-world-1.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: World card — Morning Rush (id ui-world-1).
2. PURPOSE IN GAME: Adventure selection cards.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Adventure card illustration as a small round floating diorama island: Morning Town at 8:00 with the library. Isolated on a transparent background. No text.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Square postcard, slightly elevated.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### ui-world-2 — World card — Lunch Time

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/ui-world-2.png` → game file `public/rush/art/ui-world-2.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: World card — Lunch Time (id ui-world-2).
2. PURPOSE IN GAME: Adventure selection cards.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Adventure card illustration as a small round floating diorama island: Sunny Park at 12:00 with a picnic. Isolated on a transparent background. No text.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Square postcard, slightly elevated.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### ui-world-3 — World card — Play Time

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/ui-world-3.png` → game file `public/rush/art/ui-world-3.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: World card — Play Time (id ui-world-3).
2. PURPOSE IN GAME: Adventure selection cards.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Adventure card illustration as a small round floating diorama island: Playtime Village at 3:00 with slides. Isolated on a transparent background. No text.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Square postcard, slightly elevated.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### ui-world-4 — World card — Dinner Time

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/ui-world-4.png` → game file `public/rush/art/ui-world-4.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: World card — Dinner Time (id ui-world-4).
2. PURPOSE IN GAME: Adventure selection cards.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Adventure card illustration as a small round floating diorama island: Sunset Town at 6:00 with lit windows. Isolated on a transparent background. No text.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Square postcard, slightly elevated.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### ui-world-5 — World card — Bedtime

**Attach:** env-key-art.png — your approved "Morning Town key art (full scene)" output  
**Save as:** `art-src/rush/ui-world-5.png` → game file `public/rush/art/ui-world-5.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: World card — Bedtime (id ui-world-5).
2. PURPOSE IN GAME: Adventure selection cards.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Adventure card illustration as a small round floating diorama island: Dreamland at night with a moon and stars. Isolated on a transparent background. No text.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Square postcard, slightly elevated.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### ui-mission-card — Mission card frame

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/ui-mission-card.png` → game file `public/rush/art/ui-mission-card.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Mission card frame (id ui-mission-card).
2. PURPOSE IN GAME: Mission introduction.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A clipboard-style mission card: warm cream paper on a wooden clipboard with a blue clip, empty for text and a picture.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Straight-on.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1536 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### ui-icons — HUD icons

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/ui-icons.png` → game file `public/rush/art/ui-icons.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: HUD icons (id ui-icons).
2. PURPOSE IN GAME: HUD and menus (many already exist in the app-ayah kit).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Eight glossy rounded game icons matching the Baby Mo app style: star counter star, stopwatch-clock, package box, map pin, bike, trophy, coin, adventure token.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Straight-on, 4×2 grid of icons.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### ui-delivery-success — Delivery success illustration

**Attach:** mo-celebrate.png — your approved "Delivery celebration" output; npc-librarian.png — your approved "NPC — librarian (idle / happy / interact)" output; env-library.png — your approved "The Library (destination)" output  
**Save as:** `art-src/rush/ui-delivery-success.png` → game file `public/rush/art/ui-delivery-success.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Delivery success illustration (id ui-delivery-success).
2. PURPOSE IN GAME: Delivery completion screen.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Baby Mo handing the storybooks to the smiling librarian in front of the open library door (door frame and steps only), a few confetti pieces — a cut-out group isolated on a transparent background.
5. CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them. HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Front, eye level.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: happy, curious, gentle smile.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### ui-reward — Reward chest

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/ui-reward.png` → game file `public/rush/art/ui-reward.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Reward chest (id ui-reward).
2. PURPOSE IN GAME: Reward screen.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: An open golden treasure chest bursting with stars and coins.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Three-quarter front.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1024×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### ui-garage-bg — Bike garage background

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/ui-garage-bg.png` → game file `public/rush/art/ui-garage-bg.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Bike garage background (id ui-garage-bg).
2. PURPOSE IN GAME: Bike garage.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: Cut-out garage props for the bike garage screen: a round wooden turntable platform in the centre, a pegboard with tools on the left, a small shelf with a helmet and a pump on the right (no text) — each piece separate and isolated on a transparent background.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Straight-on, slightly elevated.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### ui-closet-bg — Accessory collection background

**Attach:** docs/rush/concept-board.png (the Time Rush concept board)  
**Save as:** `art-src/rush/ui-closet-bg.png` → game file `public/rush/art/ui-closet-bg.webp`

```text
PNG, transparent background. Create an image for the children's game "Baby Mo Time Rush".
1. ASSET: Accessory collection background (id ui-closet-bg).
2. PURPOSE IN GAME: Collection screen.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A cut-out cheerful open wardrobe with shelves of helmets, bags and stickers, isolated on a transparent background.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Straight-on.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### ui-complete-banner — Level complete banner

**Attach:** ui-logo.png — your approved "Game logo" output  
**Save as:** `art-src/rush/ui-complete-banner.png` → game file `public/rush/art/ui-complete-banner.webp`

```text
PNG, transparent background. Create a single game asset for the children's game "Baby Mo Time Rush".
1. ASSET: Level complete banner (id ui-complete-banner).
2. PURPOSE IN GAME: Level complete.
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: A big ribbon banner (red with gold edges) with three empty star slots above it; NO text on the ribbon (the game writes it).
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Straight-on.
8. POSE / ACTION: as described in SUBJECT.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px.
13. IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
14. FRAMES: single image.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### fx-sparkle — Effect — sparkle

**Attach:** nothing  
**Save as:** `art-src/rush/fx-sparkle.png` → game file `public/rush/art/fx-sparkle.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Effect — sparkle (id fx-sparkle).
2. PURPOSE IN GAME: Particles (the game also has procedural particles).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: a four-point white-gold sparkle twinkling.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Straight-on.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 16 fps, plays once):
   - Frames 1–6: smooth progression from start to finish; every frame centred on the same point.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### fx-dust — Effect — dust

**Attach:** nothing  
**Save as:** `art-src/rush/fx-dust.png` → game file `public/rush/art/fx-dust.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Effect — dust (id fx-dust).
2. PURPOSE IN GAME: Particles (the game also has procedural particles).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: a soft cartoon dust puff expanding and fading.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Straight-on.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 16 fps, plays once):
   - Frames 1–6: smooth progression from start to finish; every frame centred on the same point.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### fx-rainbow-trail — Effect — rainbow-trail

**Attach:** nothing  
**Save as:** `art-src/rush/fx-rainbow-trail.png` → game file `public/rush/art/fx-rainbow-trail.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Effect — rainbow-trail (id fx-rainbow-trail).
2. PURPOSE IN GAME: Particles (the game also has procedural particles).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: a rainbow ribbon trail segment flowing.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Straight-on.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 16 fps, plays once):
   - Frames 1–6: smooth progression from start to finish; every frame centred on the same point.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### fx-jump-puff — Effect — jump-puff

**Attach:** nothing  
**Save as:** `art-src/rush/fx-jump-puff.png` → game file `public/rush/art/fx-jump-puff.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Effect — jump-puff (id fx-jump-puff).
2. PURPOSE IN GAME: Particles (the game also has procedural particles).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: a ring of little cloud puffs bursting outward on landing.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Straight-on.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 16 fps, plays once):
   - Frames 1–6: smooth progression from start to finish; every frame centred on the same point.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### fx-confetti — Effect — confetti

**Attach:** nothing  
**Save as:** `art-src/rush/fx-confetti.png` → game file `public/rush/art/fx-confetti.webp`

```text
PNG, transparent background. Create an 8-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Effect — confetti (id fx-confetti).
2. PURPOSE IN GAME: Particles (the game also has procedural particles).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: colourful confetti pieces and tiny stars falling.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Straight-on.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 4 columns × 2 rows of equal cells (384×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (8, 16 fps, plays once):
   - Frames 1–8: smooth progression from start to finish; every frame centred on the same point.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

### fx-hearts — Effect — hearts

**Attach:** nothing  
**Save as:** `art-src/rush/fx-hearts.png` → game file `public/rush/art/fx-hearts.webp`

```text
PNG, transparent background. Create a 6-frame sprite sheet for the children's game "Baby Mo Time Rush".
1. ASSET: Effect — hearts (id fx-hearts).
2. PURPOSE IN GAME: Particles (the game also has procedural particles).
3. RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.
4. SUBJECT: three small hearts rising and fading.
5. CONSISTENCY: same world, palette and materials as the attached references.
6. PROPORTIONS: scale relative to Baby Mo (3.2 heads tall chibi toddler) as described.
7. CAMERA: Straight-on.
8. POSE / ACTION: see frame list.
9. EXPRESSION: friendly.
10. LIGHTING: warm morning key light from the upper left, soft cool fill from the right, subtle rim light.
11. BACKGROUND: PNG with a fully transparent background (alpha channel) — no white, grey or coloured backdrop, no floor, no sky fill; nothing in the image except the subject.
12. CANVAS: 1536×1024 px, 3 columns × 2 rows of equal cells (512×512 px each), read left-to-right, top-to-bottom.
13. SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
14. FRAMES (6, 16 fps, plays once):
   - Frames 1–6: smooth progression from start to finish; every frame centred on the same point.
15. AVOID: extra or missing limbs, extra fingers, duplicated characters; changes to Baby Mo's face, hair, skin tone or outfit colours; text, letters, numbers or watermarks (unless asked); realistic photographic humans, scary or sharp elements, violence; busy backgrounds, floor shadows or scenery in transparent sprites; pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike; any background colour or backdrop.
OUTPUT: PNG, transparent background.
```

