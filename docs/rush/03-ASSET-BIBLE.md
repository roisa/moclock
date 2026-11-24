# Baby Mo Time Rush — Visual Asset Bible

> Generated from `src/rush/assets/catalog.ts` by `node scripts/rush-docs.mjs`. Edit the catalog, not this file.

![concept](concept-board.png)

## 1. Style
RENDER STYLE: premium 3D animated children's-movie render (original character design, not imitating any studio), soft clay-like matte materials with gentle subsurface glow, rounded friendly shapes, chibi proportions, soft ambient occlusion, warm morning key light from the upper left (about 45°), soft cool fill light from the right, subtle rim light, gentle bloom on bright highlights. Colour palette: fresh green #4CBF5A, orange-peach #FF9E6B, sunny yellow #FFD23F, sky blue #7FCAFF, soft lavender #B8A5FF, warm cream #FFF6E3. Crisp, clean edges, high detail but uncluttered, no outlines, no painterly brush strokes, no film grain.

## 2. Baby Mo
CHARACTER — BABY MO (must match the attached reference exactly):
- Cute toddler boy, about 3 years old, chibi proportions: about 3.2 heads tall, the head is large (about 40% of total height), round face, round soft cheeks with a light rosy blush.
- Hair: short, slightly messy, glossy black hair with a few soft tufts on top and a soft fringe sweeping to his left; never long, never spiky, never brown.
- Eyes: big, round, glossy dark-brown eyes with two white catch-lights each, short dark lashes, soft brown eyebrows.
- Skin: light warm skin tone (peach-beige), small button nose, small smiling mouth.
- Outfit: one-piece bright fresh-green jumpsuit (#4CBF5A) with a small light-grey five-point star on the centre of the chest, a thin orange-peach band across the belly, long orange-peach sleeves (#FF9E6B) with thin yellow cuffs at the wrists, green rounded shoes matching the jumpsuit.
- Body: short chubby arms and legs, small hands with four fingers and a thumb, no visible neck.
NEVER change his face shape, eye size, hair style, skin tone, clothing colours, star position or shoe design. No extra accessories unless this prompt asks for them.

**Helmet.** HELMET (worn in all riding assets): a smooth rounded white bicycle helmet sized for a toddler, with a soft-blue five-point star on the forehead and two thin light-blue vent stripes running front to back, a white chin strap with a small orange buckle. The helmet sits snugly on top of his black hair; the fringe and side hair stay visible under the front and sides.

**Render 1 first** (owner rule): the existing real-render series `babymo-app/www/baby-mo-poses/` (800×800 PNG) is the identity reference for every Baby Mo prompt. Until the new riding sheets exist, the game uses render-1 `baby-mo-pose-38.png` (from behind), cropped to head and torso, on a procedurally drawn push balance bike. Render 2 is not used. The old "Kata Baik" poses are not used.

## 3. Push balance bike
PUSH BALANCE BIKE (a pedal-less push bike / run bike for toddlers — must match the attached bike reference exactly):
- It is a PUSH BIKE: there are NO pedals, NO crank arms, NO chain, NO chainring, NO gears and NO training wheels. The child sits on the saddle and pushes along the ground with his own feet (walking / running strides), then lifts his feet and glides. Small flat grey footrests on each side of the lower frame are only for resting the feet while gliding — they are NOT pedals and do not turn.
- Frame: a smooth rounded tube frame in fresh green (#4CBF5A) with a cream-white accent stripe, a low slung shape like a gentle "V".
- Wheels: two equal 12-inch wheels with chunky soft-grey rubber tyres, cream-white rims and five rounded spokes, a small yellow star cap on each wheel hub.
- Handlebar: rounded swept-back handlebar with soft orange grips and a small yellow bell on the right side.
- Seat: a small padded saddle in orange-peach (#FF9E6B), low enough that the toddler's feet touch the ground flat.
- Proportions: the bike is about as tall as Baby Mo's hip; wheelbase about 1.3 times Baby Mo's height.

It is a **push balance bike** (push bike / run bike) with **no pedals, no cranks and no chain**, so the brief's "pedalling" is shown as **push-off strides** with the feet on the ground (`mo-push`) and **gliding** with the feet on the footrests (`mo-ride-loop`).

## 4. Camera & sprite rules
- **Gameplay:** CAMERA: gameplay chase view — seen from directly behind and slightly above, camera about 1.5 m behind and 1.2 m up, looking down about 15°; Baby Mo and the bike face AWAY from the viewer, riding into the image; centred horizontally; a slight three-quarter hint is allowed only when the frame describes turning.
- SPRITE SHEET RULES: equal-sized cells in a strict grid; fully transparent background (PNG with alpha) — no floor, no ground plane, no drop shadow, no scenery; no cell borders, no captions, no frame numbers, no watermark; exactly ONE complete character per cell, never cropped by the cell edge, centred the same way in every cell with the wheels' ground contact on the same baseline (about 92% down each cell); identical scale, lighting, colours and outfit in every cell; poses change ONLY as described per frame; the last frame flows smoothly into the first for looping animations.
- IMAGE RULES: PNG with a fully transparent background (alpha channel) — no white, grey, coloured or gradient backdrop, no floor, no sky fill; no text, no logos, no watermark, no border; the subject is complete and centred with a small even margin; no ground shadow (the game draws its own soft shadow).
- **Every asset is a PNG with a transparent background** — including key art, cards and menu art, which are drawn as isolated vignettes / floating dioramas. Sky and road are painted by the game, so they have no prompts.
- **Never paint the time.** Clock faces (balloons, tower, pocket clock) are generated BLANK; the game draws the hands so every clock is correct.
- **Scale:** Baby Mo on the bike fills ~70% of the cell height in every gameplay sheet; match `mo-ride-34`.
- **Anchors:** the rear-wheel contact point sits at 50% x / 92% y of each cell; the backpack anchor is the top centre of the bag.

## 5. Kit reuse (app-ayah visual library)
Buttons, panels, coins, gifts, chests, stars, ribbons, effects and village pieces are copied from the app-ayah gh-pages art library into `public/rush/kit/` (assets with a `kit:` placeholder below). They match Baby Mo's glossy kids style and are used as-is until bespoke art lands.

## 6. Production pipeline
1. Generate in ChatGPT with the prompt from `04-PROMPT-LIBRARY.md`, attaching the listed references.
2. Save as `art-src/rush/<id>.png`.
3. Sheets: `python3 scripts/rush-slice.py art-src/rush/<id>.png <id> --grid CxR` → `public/rush/art/<id>.webp` (normalised strip) + `public/rush/art/atlas.json`.
4. Stills: `python3 scripts/rush-slice.py art-src/rush/<id>.png <id> --still` (trim + WebP).
5. The game picks the file up automatically (it falls back to the placeholder when missing).

## 7. Asset list (111 assets)

### Batch 1 — Baby Mo master references

| id | asset | type | canvas | frames | fps / loop | placeholder now | used for |
|---|---|---|---|---|---|---|---|
| `mo-master` | Baby Mo master turnaround (with helmet) | scene | 1536×1024 | — | — | `render1:mo-wave` | Reference only — attach to every later Baby Mo prompt. |
| `mo-stand-front` | Baby Mo standing — front | still | 1024×1024 | — | — | `render1:mo-wave` | Main menu, mission intro. |
| `mo-stand-back` | Baby Mo standing — back | still | 1024×1024 | — | — | `render1:mo-back` | Mission intro (looking at the road ahead). |

### Batch 2 — Push balance bike

| id | asset | type | canvas | frames | fps / loop | placeholder now | used for |
|---|---|---|---|---|---|---|---|
| `bike-master` | Push balance bike master turnaround | scene | 1536×1024 | — | — | `procedural:bike` | Reference only — attach to every later bike or riding prompt. |
| `bike-side` | Bike — side view | still | 1536×1024 | — | — | `procedural:bike` | Garage, bike unlock screen. |
| `bike-front` | Bike — front view | still | 1024×1024 | — | — | `procedural:bike` | Garage turntable frame. |
| `bike-rear` | Bike — rear view | still | 1024×1024 | — | — | `procedural:bike` | Garage turntable frame; bike-only layer tests. |
| `bike-34` | Bike — three-quarter view | still | 1536×1024 | — | — | `procedural:bike` | Garage hero image, bike cards. |
| `bike-wheel` | Wheel close-up | still | 1024×1024 | — | — | `procedural:wheel` | Garage detail; source for the wheel-spin sheet. |
| `bike-handlebar` | Handlebar close-up | still | 1024×1024 | — | — | `procedural:bike` | Garage detail card. |
| `bike-seat` | Seat & frame detail | still | 1024×1024 | — | — | `procedural:bike` | Garage detail card. |
| `bike-wheel-spin` | Wheel rotation | sheet | 1536×1024 | 8 (4×2) | 16 loop | `procedural:wheel` | Garage side view, bike unlock screen. |
| `bike-colors` | Bike colour line-up | scene | 1536×1024 | — | — | `procedural:bike` | Garage colour swatches; slice into six bike-color-<n> images. |
| `bike-unlockables` | Unlockable bike designs | scene | 1536×1024 | — | — | `procedural:bike` | Garage unlocks (earned with stars). |
| `bike-accessories` | Bike accessories | scene | 1536×1024 | — | — | `kit:gift-green` | Accessory collection; layered onto the bike in the garage. |

### Batch 3 — Approved riding poses

| id | asset | type | canvas | frames | fps / loop | placeholder now | used for |
|---|---|---|---|---|---|---|---|
| `mo-ride-side` | Riding — side (key pose) | still | 1536×1024 | — | — | `render1:mo-run` | Menus, mission intro, adventure cards. |
| `mo-ride-34` | Riding — three-quarter rear (APPROVED KEY POSE) | still | 1024×1024 | — | — | `rig:rider` | THE key frame every gameplay sheet must match (scale, angle, baseline). |

### Batch 4 — Gameplay animation sheets

| id | asset | type | canvas | frames | fps / loop | placeholder now | used for |
|---|---|---|---|---|---|---|---|
| `mo-idle-bike` | Idle on bike | sheet | 1536×1024 | 6 (3×2) | 6 loop | `rig:rider` | Start line, pause, mission intro. |
| `mo-ride-loop` | Riding loop (glide) | sheet | 1536×1024 | 8 (4×2) | 12 loop | `rig:rider` | Default cruising animation (speed scales fps 8–16). |
| `mo-push` | Scoot / push-off loop (the push-balance-bike 'pedal') | sheet | 1536×1024 | 8 (4×2) | 12 loop | `rig:rider` | Accelerating / below cruise speed. |
| `mo-lean-left` | Turning left | sheet | 1536×1024 | 6 (3×2) | 12 once | `rig:rider` | Steering left; F4–F6 hold while the stick is held. |
| `mo-lean-right` | Turning right | sheet | 1536×1024 | 6 (3×2) | 12 once | `rig:rider` | Steering right. |
| `mo-jump-prep` | Jump anticipation | sheet | 1024×1024 | 4 (2×2) | 14 once | `rig:rider` | 0.12 s before take-off. |
| `mo-jump-air` | Airborne | sheet | 1536×1024 | 6 (3×2) | 10 loop | `rig:rider` | While airborne (sprite rides the jump arc; the game adds the shadow). |
| `mo-land` | Landing | sheet | 1536×1024 | 6 (3×2) | 16 once | `rig:rider` | On touchdown (game adds a dust puff). |
| `mo-boost` | Speed boost | sheet | 1536×1024 | 8 (4×2) | 14 loop | `rig:rider` | Boost pads and rainbow rings (the game adds speed lines and trails). |
| `mo-pickup` | Package collection | sheet | 1536×1024 | 8 (4×2) | 12 once | `rig:rider` | Pickup stations (package art is swapped per mission). |
| `mo-ride-carry` | Riding with the package | sheet | 1536×1024 | 8 (4×2) | 12 loop | `rig:rider` | Default animation after pickup; the mission package icon is layered on the backpack. |
| `mo-wobble` | Safe bump & recovery | sheet | 1536×1024 | 8 (4×2) | 12 once | `rig:rider` | Gentle obstacle collisions (slow down 30%, no failure). |
| `mo-look-around` | Looking around | sheet | 1536×1024 | 6 (3×2) | 8 once | `rig:rider` | Near hidden objects and friends. |
| `mo-wave-ride` | Waving to friends while riding | sheet | 1536×1024 | 6 (3×2) | 10 once | `rig:rider` | Passing NPCs. |

### Batch 5 — Reactions & cut-scenes

| id | asset | type | canvas | frames | fps / loop | placeholder now | used for |
|---|---|---|---|---|---|---|---|
| `mo-face-happy` | Portrait — happy (blink loop) | sheet | 1024×1024 | 4 (2×2) | 6 loop | `render1:mo-wave` | HUD avatar, dialogue bubbles. |
| `mo-face-surprised` | Portrait — surprised | sheet | 1024×1024 | 4 (2×2) | 8 once | `render1:mo-surprised` | Discoveries (hidden objects, clock balloons). |
| `mo-face-excited` | Portrait — excited | sheet | 1024×1024 | 4 (2×2) | 8 loop | `render1:mo-yeyy` | Rewards, combos. |
| `mo-celebrate` | Delivery celebration | sheet | 1536×1024 | 8 (4×2) | 10 once | `render1:mo-yeyy` | Delivery success screen. |
| `mo-help` | Helping an animal | sheet | 1536×1024 | 8 (4×2) | 8 once | `render1:mo-sit-wave` | Friend interaction cut-in. |

### Batch 6 — Bags, packages & helmets

| id | asset | type | canvas | frames | fps / loop | placeholder now | used for |
|---|---|---|---|---|---|---|---|
| `acc-bag-standard` | Delivery bag — standard | still | 1024×1024 | — | — | `procedural:backpack` | Layered on the backpack anchor while riding. |
| `acc-bag-books` | Delivery bag — books | still | 1024×1024 | — | — | `kit:gift-blue` | Layered on the backpack anchor while riding. |
| `acc-bag-picnic` | Delivery bag — picnic | still | 1024×1024 | — | — | `kit:gift-blue` | Layered on the backpack anchor while riding. |
| `acc-bag-toy` | Delivery bag — toy | still | 1024×1024 | — | — | `kit:gift-blue` | Layered on the backpack anchor while riding. |
| `acc-bag-dinner` | Delivery bag — dinner | still | 1024×1024 | — | — | `kit:gift-blue` | Layered on the backpack anchor while riding. |
| `acc-bag-moon` | Delivery bag — moon | still | 1024×1024 | — | — | `kit:gift-blue` | Layered on the backpack anchor while riding. |
| `pkg-gift` | Package — gift | still | 1024×1024 | — | — | `kit:gift-pink` | Pickup station item, HUD package icon, recipient reveal. |
| `pkg-storybooks` | Package — storybooks | still | 1024×1024 | — | — | `procedural:books` | Pickup station item, HUD package icon, recipient reveal. |
| `pkg-picnic` | Package — picnic | still | 1024×1024 | — | — | `kit:gift-pink` | Pickup station item, HUD package icon, recipient reveal. |
| `pkg-toy` | Package — toy | still | 1024×1024 | — | — | `kit:gift-pink` | Pickup station item, HUD package icon, recipient reveal. |
| `pkg-food` | Package — food | still | 1024×1024 | — | — | `kit:gift-pink` | Pickup station item, HUD package icon, recipient reveal. |
| `pkg-teddy` | Package — teddy | still | 1024×1024 | — | — | `kit:gift-pink` | Pickup station item, HUD package icon, recipient reveal. |
| `acc-attach-ref` | Accessory attachment reference | scene | 1536×1024 | — | — | `rig:rider` | Reference for the backpack anchor used by the game. |
| `acc-helmets` | Helmet colours | scene | 1536×1024 | — | — | `procedural:helmet` | Accessory collection (cosmetic only). |

### Batch 7 — Morning Town environment

| id | asset | type | canvas | frames | fps / loop | placeholder now | used for |
|---|---|---|---|---|---|---|---|
| `env-key-art` | Morning Town key art (full scene) | scene | 1536×1024 | — | — | `kit:bg-home` | Adventure card, mission intro, loading screen. |
| `env-far` | Far background (sky + hills) | strip | 1536×1024 | — | — | `kit:bg-garden` | Parallax layer 1 (scroll 0.1× with curves). |
| `env-mid-houses` | Midground houses strip | strip | 1536×1024 | — | — | `procedural:houses` | Parallax layer 2 (scroll 0.25×). |
| `env-trees` | Roadside trees | scene | 1536×1024 | — | — | `procedural:tree` | Roadside sprites (sliced into env-tree-1…6). |
| `env-flowers` | Flowers & bushes | scene | 1536×1024 | — | — | `kit:v-garden` | Roadside decoration sprites. |
| `env-library` | The Library (destination) | still | 1024×1024 | — | — | `kit:v-school` | Delivery destination at the end of the road. |
| `env-clock-tower` | Clock tower (blank face) | still | 1024×1536 | — | — | `procedural:tower` | Landmark; shows the live mission time. |
| `env-shops` | Shops | scene | 1536×1024 | — | — | `kit:v-market` | Roadside buildings. |
| `env-bridge` | Stone bridge (road piece) | still | 1536×1024 | — | — | `procedural:bridge` | Road event: the road turns into a bridge for a short stretch. |
| `env-deco` | Roadside decorations | scene | 1536×1024 | — | — | `kit:v-sign` | Roadside sprites; lamps switch on in the evening worlds. |
| `env-clouds` | Clouds | scene | 1536×1024 | — | — | `procedural:cloud` | Drifting sky layer. |
| `env-sun` | Sun (shimmer) | sheet | 1024×1024 | 4 (2×2) | 4 loop | `procedural:sun` | Sky layer; position follows the time of day. |
| `env-birds` | Flying birds | sheet | 1536×1024 | 6 (3×2) | 10 loop | `kit:fly-robin` | Ambient birds crossing the sky. |
| `env-moving` | Moving town elements | sheet | 1536×1024 | 8 (4×2) | 8 loop | `procedural:windmill` | Roadside animated landmark. |

### Batch 8 — Collectibles

| id | asset | type | canvas | frames | fps / loop | placeholder now | used for |
|---|---|---|---|---|---|---|---|
| `col-star` | Golden star (spin) | sheet | 1536×1024 | 8 (4×2) | 12 loop | `kit:star` | Main collectible (trails along the road). |
| `col-balloon` | Clock balloon (blank face) | scene | 1536×1024 | — | — | `procedural:balloon` | Signature collectible; the game draws accurate hands for each balloon's time. |
| `col-balloon-pop` | Balloon pop | sheet | 1536×1024 | 6 (3×2) | 18 once | `procedural:pop` | Collection effect (tinted per balloon colour). |
| `col-gift` | Gift box (bounce + open) | sheet | 1536×1024 | 8 (4×2) | 10 once | `kit:gift-purple` | Bonus collectible (gives 5 stars). |
| `col-coin` | Coin (spin) | sheet | 1536×1024 | 8 (4×2) | 14 loop | `kit:coin` | Common pickup in trails. |
| `col-token` | Adventure token | still | 1024×1024 | — | — | `kit:p-badge` | One per world, for helping a friend. |
| `col-clock-float` | Floating pocket clock | still | 1024×1024 | — | — | `procedural:balloon` | Hidden surprise object (shortcut reward). |
| `col-ring` | Magic ring | still | 1024×1024 | — | — | `procedural:ring` | Ride-through ring (small boost + stars). |
| `col-rainbow` | Rainbow boost object | sheet | 1024×1024 | 4 (2×2) | 8 loop | `kit:rainbow` | Boost pickup. |

### Batch 9 — Obstacles, destinations & friends

| id | asset | type | canvas | frames | fps / loop | placeholder now | used for |
|---|---|---|---|---|---|---|---|
| `obs-ramp` | Wooden ramp | still | 1024×1024 | — | — | `procedural:ramp` | Launches a big jump. |
| `obs-log` | Rolling log | sheet | 1536×1024 | 8 (4×2) | 10 loop | `procedural:log` | Jump over (or gentle wobble). |
| `obs-boxes` | Cardboard boxes | still | 1024×1024 | — | — | `procedural:boxes` | Obstacle (soft bump). |
| `obs-blocks` | Toy blocks | still | 1024×1024 | — | — | `procedural:blocks` | Obstacle (soft bump). |
| `obs-puddle` | Water puddle (ripple + splash) | sheet | 1536×1024 | 8 (4×2) | 12 once | `procedural:puddle` | Slows a little, splash effect. |
| `obs-tunnel` | Paper tunnel (entrance) | still | 1024×1024 | — | — | `procedural:tunnel` | Shortcut entrance (rides through). |
| `obs-balloons` | Balloon cluster | still | 1024×1536 | — | — | `procedural:balloons` | Roadside decoration / pop for stars. |
| `obs-platform` | Moving platform | still | 1536×1024 | — | — | `procedural:platform` | Later worlds (Sunny Park). |
| `obs-boost-pad` | Speed boost pad | sheet | 1024×1024 | 4 (2×2) | 10 loop | `procedural:boostpad` | Boost pads. |
| `obs-mailbox` | Mailbox (opens) | sheet | 1536×1024 | 6 (3×2) | 10 once | `procedural:mailbox` | Small deliveries to friends. |
| `obs-library-door` | Library door (opens) | sheet | 1536×1024 | 6 (3×2) | 10 once | `procedural:door` | Delivery moment. |
| `dest-houses` | Delivery destinations (5 worlds) | scene | 1536×1024 | — | — | `kit:v-house` | Later worlds. |
| `npc-squirrel` | NPC — squirrel (idle / happy / interact) | sheet | 1536×1024 | 6 (3×2) | 8 once | `procedural:squirrel` | Friend quest in Morning Town. |
| `npc-rabbit` | NPC — rabbit (idle / happy / interact) | sheet | 1536×1024 | 6 (3×2) | 8 once | `procedural:rabbit` | Roadside friend. |
| `npc-bird` | NPC — bird (idle / happy / interact) | sheet | 1536×1024 | 6 (3×2) | 8 once | `kit:bird-robin` | Roadside friend. |
| `npc-librarian` | NPC — librarian (idle / happy / interact) | sheet | 1536×1024 | 6 (3×2) | 8 once | `procedural:librarian` | Receives the books at the library. |
| `npc-baker` | NPC — baker (idle / happy / interact) | sheet | 1536×1024 | 6 (3×2) | 8 once | `procedural:baker` | Roadside friend. |

### Batch 10 — UI, screens & effects

| id | asset | type | canvas | frames | fps / loop | placeholder now | used for |
|---|---|---|---|---|---|---|---|
| `ui-logo` | Game logo | still | 1536×1024 | — | — | `css:logo` | Splash, main menu. |
| `ui-splash` | Splash screen | scene | 1024×1536 | — | — | `css:splash` | First screen (portrait). |
| `ui-menu-bg` | Main menu background | scene | 1536×1024 | — | — | `kit:bg-home` | Main menu (landscape). |
| `ui-world-1` | World card — Morning Rush | scene | 1024×1024 | — | — | `procedural:worldcard` | Adventure selection cards. |
| `ui-world-2` | World card — Lunch Time | scene | 1024×1024 | — | — | `procedural:worldcard` | Adventure selection cards. |
| `ui-world-3` | World card — Play Time | scene | 1024×1024 | — | — | `procedural:worldcard` | Adventure selection cards. |
| `ui-world-4` | World card — Dinner Time | scene | 1024×1024 | — | — | `procedural:worldcard` | Adventure selection cards. |
| `ui-world-5` | World card — Bedtime | scene | 1024×1024 | — | — | `procedural:worldcard` | Adventure selection cards. |
| `ui-mission-card` | Mission card frame | still | 1024×1536 | — | — | `kit:p-card` | Mission introduction. |
| `ui-icons` | HUD icons | scene | 1536×1024 | — | — | `kit:ui` | HUD and menus (many already exist in the app-ayah kit). |
| `ui-delivery-success` | Delivery success illustration | scene | 1536×1024 | — | — | `composite:delivery` | Delivery completion screen. |
| `ui-reward` | Reward chest | still | 1024×1024 | — | — | `kit:chest-open` | Reward screen. |
| `ui-garage-bg` | Bike garage background | scene | 1536×1024 | — | — | `css:garage` | Bike garage. |
| `ui-closet-bg` | Accessory collection background | scene | 1536×1024 | — | — | `css:closet` | Collection screen. |
| `ui-complete-banner` | Level complete banner | still | 1536×1024 | — | — | `kit:ribbon` | Level complete. |
| `fx-sparkle` | Effect — sparkle | sheet | 1536×1024 | 6 (3×2) | 16 once | `procedural:particles` | Particles (the game also has procedural particles). |
| `fx-dust` | Effect — dust | sheet | 1536×1024 | 6 (3×2) | 16 once | `procedural:particles` | Particles (the game also has procedural particles). |
| `fx-rainbow-trail` | Effect — rainbow-trail | sheet | 1536×1024 | 6 (3×2) | 16 once | `procedural:particles` | Particles (the game also has procedural particles). |
| `fx-jump-puff` | Effect — jump-puff | sheet | 1536×1024 | 6 (3×2) | 16 once | `procedural:particles` | Particles (the game also has procedural particles). |
| `fx-confetti` | Effect — confetti | sheet | 1536×1024 | 8 (4×2) | 16 once | `procedural:particles` | Particles (the game also has procedural particles). |
| `fx-hearts` | Effect — hearts | sheet | 1536×1024 | 6 (3×2) | 16 once | `procedural:particles` | Particles (the game also has procedural particles). |
