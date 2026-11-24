/**
 * Shared text blocks for every image-generation prompt (Baby Mo Time Rush).
 * The prompt library (docs/rush/04-PROMPT-LIBRARY.md) is generated from these +
 * catalog.ts, so the prompts and the game's asset manifest never drift apart.
 */

/** Visual style shared by every asset. */
export const STYLE = `RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.`;

/** Baby Mo character bible (render-1 look). */
export const MO_BIBLE = `CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them.`;

/** Safety helmet worn while riding (new design element for Time Rush). */
export const HELMET = `HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.`;

/** The push balance bike (no pedals: toddlers push and glide with their feet). */
export const BIKE_BIBLE = `PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.`;

/** Camera used for all gameplay (rear) sprites. */
export const GAME_CAMERA = `CAMERA: gameplay chase view — seen from directly behind and slightly above, camera about 1.5 m behind and 1.2 m up, looking down about 15°; Baby Mo and the bike face AWAY from the viewer, riding into the image; centred horizontally; a slight three-quarter hint is allowed only when the frame describes turning.`;

export const SPRITE_RULES = `SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.`;

export const STILL_RULES = `IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).`;

export const NEGATIVE_BASE = [
  "extra or missing limbs, extra fingers, duplicated characters",
  "changes to Baby Mo's face, hair, skin tone or outfit colours",
  "text, letters, numbers or watermarks (unless asked)",
  "realistic photographic humans, scary or sharp elements, violence",
  "busy backgrounds, floor shadows or scenery in transparent sprites",
  "pedals, crank arms, a chain, chainring, gears or training wheels on the push balance bike",
];

/** References to attach, by id (generated in the order of the batches). */
export const EXISTING_REFS: Record<string, string> = {
  "render1-front": "babymo-app/www/baby-mo-poses/baby-mo-pose-01.png (render 1, front, waving)",
  "render1-back": "babymo-app/www/baby-mo-poses/baby-mo-pose-38.png (render 1, from behind)",
  "render1-side": "babymo-app/www/baby-mo-poses/baby-mo-pose-42.png (render 1, walking, 3/4 side)",
  "render1-happy": "babymo-app/www/baby-mo-poses/baby-mo-yeyy.png (render 1, celebrating)",
  "concept": "docs/rush/concept-board.png (the Time Rush concept board)",
};
