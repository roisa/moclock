/**
 * BABY MO TIME RUSH — visual asset catalog (single source of truth).
 *
 *  - The game's AssetLoader reads `file`, `frames`, `grid`, `fps`, `loop` and
 *    `anchor` from here; when a file is missing it draws `placeholder`.
 *  - scripts/rush-docs.mjs turns this catalog into the Asset Bible and the
 *    copy-ready ChatGPT image prompts (docs/rush/03 + 04).
 *
 * Canvas sizes follow what the image generator can output (1024×1024,
 * 1536×1024, 1024×1536). Longer animations are split into A/B sheets.
 * After generation, `python3 scripts/rush-slice.py <png> <id>` slices a sheet
 * into frames, trims, aligns the baseline and writes public/rush/art/<id>.webp
 * plus an atlas entry.
 */
export type Cat = "mo" | "bike" | "acc" | "env" | "collect" | "obstacle" | "npc" | "ui" | "fx";
export interface AssetSpec {
  id: string;
  batch: number;
  cat: Cat;
  title: string;
  kind: "still" | "sheet" | "scene" | "strip";
  size: [number, number]; // generation canvas
  frames?: number;
  grid?: [number, number]; // cols, rows
  fps?: number;
  loop?: boolean;
  camera: string;
  subject: string;
  pose?: string;
  expression?: string;
  frameNotes?: string[];
  lighting?: string;
  refs: string[]; // ids of catalog assets or EXISTING_REFS to attach
  mo?: boolean; // include Baby Mo bible
  helmet?: boolean;
  bike?: boolean;
  mustNot?: string[];
  placeholder: string; // what the game shows until the file exists
  game: string; // how the game uses it
  anchor?: string; // alignment point for layering
  transparent?: boolean; // default true for sprites, false for scenes
}

const sheet = (n: number): { size: [number, number]; grid: [number, number] } =>
  n <= 4 ? { size: [1024, 1024], grid: [2, 2] } : n <= 6 ? { size: [1536, 1024], grid: [3, 2] } : { size: [1536, 1024], grid: [4, 2] };

const R = "render1-back";
const RIDE = ["mo-ride-34", "bike-master", "mo-master", R];

export const CATALOG: AssetSpec[] = [
  /* ============================== BATCH 1 — Baby Mo master references */
  { id: "mo-master", batch: 1, cat: "mo", title: "Baby Mo master turnaround (with helmet)", kind: "scene", size: [1536, 1024], camera: "Orthographic-feeling character turnaround at eye level, four views in one row: front, three-quarter front (facing left), side profile (facing left), back.",
    subject: "Character model sheet of Baby Mo standing in a relaxed neutral pose, arms slightly away from the body, feet together, wearing the riding helmet.", expression: "gentle closed-mouth smile, eyes open.",
    refs: ["render1-front", R, "render1-side"], mo: true, helmet: true, transparent: false,
    lighting: "even studio lighting with soft key from the upper left, plain very light warm-grey background (#F2EFEA), all four views on the same floor line and the same height.",
    placeholder: "render1:mo-wave", game: "Reference only — attach to every later Baby Mo prompt.", mustNot: ["different heights between the views", "any background props"] },
  { id: "mo-stand-front", batch: 1, cat: "mo", title: "Baby Mo standing — front", kind: "still", size: [1024, 1024], camera: "Front view at Baby Mo's eye level, full body.",
    subject: "Baby Mo standing, facing the viewer, helmet on, both feet planted, one hand giving a small wave.", expression: "big happy smile with open mouth, sparkling eyes.", refs: ["mo-master", "render1-front"], mo: true, helmet: true,
    placeholder: "render1:mo-wave", game: "Main menu, mission intro." },
  { id: "mo-stand-back", batch: 1, cat: "mo", title: "Baby Mo standing — back", kind: "still", size: [1024, 1024], camera: "Directly behind at Baby Mo's eye level, full body.",
    subject: "Baby Mo seen from behind, standing, helmet on, arms relaxed, looking slightly up and to the right at something exciting (the side of his cheek just visible).", refs: ["mo-master", R], mo: true, helmet: true,
    placeholder: "render1:mo-back", game: "Mission intro (looking at the road ahead)." },

  /* ============================== BATCH 2 — Balance bike master */
  { id: "bike-master", batch: 2, cat: "bike", title: "Balance bike master turnaround", kind: "scene", size: [1536, 1024], camera: "Four orthographic-feeling views in one row: side (facing left), three-quarter front, front, rear; all at the same scale on the same floor line.",
    subject: "Product-style model sheet of the toddler balance bike, no rider.", refs: ["concept"], bike: true, transparent: false,
    lighting: "even studio light, plain very light warm-grey background (#F2EFEA).", placeholder: "procedural:bike", game: "Reference only — attach to every later bike or riding prompt." },
  { id: "bike-side", batch: 2, cat: "bike", title: "Bike — side view", kind: "still", size: [1536, 1024], camera: "Pure side view (facing left), wheel hubs level.", subject: "The balance bike alone.", refs: ["bike-master"], bike: true, placeholder: "procedural:bike", game: "Garage, bike unlock screen." },
  { id: "bike-front", batch: 2, cat: "bike", title: "Bike — front view", kind: "still", size: [1024, 1024], camera: "Straight-on front view at handlebar height.", subject: "The balance bike alone.", refs: ["bike-master"], bike: true, placeholder: "procedural:bike", game: "Garage turntable frame." },
  { id: "bike-rear", batch: 2, cat: "bike", title: "Bike — rear view", kind: "still", size: [1024, 1024], camera: "Gameplay chase camera (from behind and slightly above).", subject: "The balance bike alone, seen from behind as in gameplay.", refs: ["bike-master"], bike: true, placeholder: "procedural:bike", game: "Garage turntable frame; bike-only layer tests." },
  { id: "bike-34", batch: 2, cat: "bike", title: "Bike — three-quarter view", kind: "still", size: [1536, 1024], camera: "Three-quarter front view from slightly above (hero product angle).", subject: "The balance bike alone.", refs: ["bike-master"], bike: true, placeholder: "procedural:bike", game: "Garage hero image, bike cards." },
  { id: "bike-wheel", batch: 2, cat: "bike", title: "Wheel close-up", kind: "still", size: [1024, 1024], camera: "Straight-on side view of one wheel, filling 80% of the frame.", subject: "One balance-bike wheel: chunky soft-grey tyre, cream rim, five rounded spokes, yellow star hub cap.", refs: ["bike-master"], bike: true, placeholder: "procedural:wheel", game: "Garage detail; source for the wheel-spin sheet." },
  { id: "bike-handlebar", batch: 2, cat: "bike", title: "Handlebar close-up", kind: "still", size: [1024, 1024], camera: "Three-quarter close-up from the rider's position.", subject: "The handlebar with orange grips and the little yellow bell.", refs: ["bike-master"], bike: true, placeholder: "procedural:bike", game: "Garage detail card." },
  { id: "bike-seat", batch: 2, cat: "bike", title: "Seat & frame detail", kind: "still", size: [1024, 1024], camera: "Three-quarter close-up from above-left.", subject: "The padded orange-peach saddle and the green frame with the cream stripe and grey footrests.", refs: ["bike-master"], bike: true, placeholder: "procedural:bike", game: "Garage detail card." },
  { id: "bike-wheel-spin", batch: 2, cat: "bike", title: "Wheel rotation", kind: "sheet", ...sheet(8), frames: 8, fps: 16, loop: true, camera: "Straight-on side view of one wheel.", subject: "The same wheel rotating clockwise.", refs: ["bike-wheel"], bike: true,
    frameNotes: Array.from({ length: 8 }, (_, i) => `Frame ${i + 1}: spokes rotated ${i * 9}° clockwise from frame 1 (five spokes repeat every 72°, so 8 frames × 9° loops seamlessly); tyre and rim unchanged.`), placeholder: "procedural:wheel", game: "Garage side view, bike unlock screen." },
  { id: "bike-colors", batch: 2, cat: "bike", title: "Bike colour line-up", kind: "scene", size: [1536, 1024], camera: "Same pure side view (facing left) for every bike, evenly spaced in a 3×2 grid.", subject: "Six identical balance bikes that differ ONLY in frame colour: fresh green, sky blue, sunny yellow, soft pink, lavender, orange. Everything else identical.", refs: ["bike-side"], bike: true, transparent: true,
    placeholder: "procedural:bike", game: "Garage colour swatches; slice into six bike-color-<n> images." },
  { id: "bike-unlockables", batch: 2, cat: "bike", title: "Unlockable bike designs", kind: "scene", size: [1536, 1024], camera: "Same pure side view (facing left), 2×2 grid.", subject: "Four special versions of the SAME bike geometry: (1) Rainbow Glider — pastel rainbow frame; (2) Star Racer — navy frame with yellow stars; (3) Flower Cruiser — mint frame with small painted flowers and a wicker front basket; (4) Moon Dreamer — lavender frame with a crescent-moon decal and glow-in-the-dark star spokes.", refs: ["bike-side"], bike: true,
    placeholder: "procedural:bike", game: "Garage unlocks (earned with stars)." },
  { id: "bike-accessories", batch: 2, cat: "bike", title: "Bike accessories", kind: "scene", size: [1536, 1024], camera: "Each item in three-quarter view, 3×2 grid, same scale as the bike.", subject: "Six separate add-ons for the balance bike: yellow bell, wicker front basket, rainbow handlebar streamers, small triangle flag on a pole, round front light, star-shaped spoke beads.", refs: ["bike-master"], bike: true,
    placeholder: "kit:gift-green", game: "Accessory collection; layered onto the bike in the garage." },

  /* ============================== BATCH 3 — approved riding pose */
  { id: "mo-ride-side", batch: 3, cat: "mo", title: "Riding — side (key pose)", kind: "still", size: [1536, 1024], camera: "Pure side view, facing left, at Baby Mo's hip height.",
    subject: "Baby Mo sitting on the balance bike, both hands on the grips, feet resting on the footrests while gliding, back slightly forward, helmet on.", expression: "excited open smile.", refs: ["mo-master", "bike-master", "render1-side"], mo: true, helmet: true, bike: true,
    placeholder: "render1:mo-run", game: "Menus, mission intro, adventure cards.", anchor: "wheel contact points" },
  { id: "mo-ride-34", batch: 3, cat: "mo", title: "Riding — three-quarter rear (APPROVED KEY POSE)", kind: "still", size: [1024, 1024], camera: "Gameplay chase camera, rotated 10° so a little of his right cheek shows.",
    subject: "Baby Mo riding the balance bike away from the viewer, gliding, hands on grips, feet on the footrests, helmet on, small backpack on his back.", refs: ["mo-master", "bike-master", R], mo: true, helmet: true, bike: true,
    placeholder: "rig:rider", game: "THE key frame every gameplay sheet must match (scale, angle, baseline).", anchor: "rear wheel contact at 92% height, horizontal centre" },

  /* ============================== BATCH 4 — gameplay animation sheets (rear chase view) */
  { id: "mo-idle-bike", batch: 4, cat: "mo", title: "Idle on bike", kind: "sheet", ...sheet(6), frames: 6, fps: 6, loop: true, camera: "Gameplay chase camera.",
    subject: "Baby Mo sitting on the stopped bike, both feet flat on the ground either side, helmet on, small backpack.", refs: RIDE, mo: true, helmet: true, bike: true,
    frameNotes: ["F1: neutral, hands on grips.", "F2: shoulders rise 2% (breathing in).", "F3: head turns 5° right, looking around.", "F4: head back to centre, shoulders down.", "F5: small bounce on the seat (2% down).", "F6: back to F1 pose."],
    placeholder: "rig:rider", game: "Start line, pause, mission intro.", anchor: "rear wheel contact" },
  { id: "mo-ride-loop", batch: 4, cat: "mo", title: "Riding loop (glide)", kind: "sheet", ...sheet(8), frames: 8, fps: 12, loop: true, camera: "Gameplay chase camera.",
    subject: "Baby Mo gliding forward on the balance bike, feet on footrests, hands on grips.", refs: RIDE, mo: true, helmet: true, bike: true,
    frameNotes: ["F1: neutral glide, body centred.", "F2: body bobs down 1.5%.", "F3: lowest point, helmet tilts 2° left.", "F4: rising, centred.", "F5: highest point (1.5% up).", "F6: body bobs down, helmet tilts 2° right.", "F7: lowest point.", "F8: rising back to F1."],
    placeholder: "rig:rider", game: "Default cruising animation (speed scales fps 8–16).", anchor: "rear wheel contact" },
  { id: "mo-push", batch: 4, cat: "mo", title: "Scoot / push-off loop (the balance-bike 'pedal')", kind: "sheet", ...sheet(8), frames: 8, fps: 12, loop: true, camera: "Gameplay chase camera.",
    subject: "Baby Mo pushing the ground with alternating feet to gain speed (running strides while seated), hands on grips.", refs: RIDE, mo: true, helmet: true, bike: true,
    frameNotes: ["F1: left foot reaches down to the ground, right foot lifted back.", "F2: left foot pushes back, body leans forward 3°.", "F3: left foot behind, lifting.", "F4: both feet tucked, glide.", "F5: right foot reaches down to the ground.", "F6: right foot pushes back, body leans forward 3°.", "F7: right foot behind, lifting.", "F8: both feet tucked, back to F1."],
    placeholder: "rig:rider", game: "Accelerating / below cruise speed.", anchor: "rear wheel contact" },
  { id: "mo-lean-left", batch: 4, cat: "mo", title: "Turning left", kind: "sheet", ...sheet(6), frames: 6, fps: 12, loop: false, camera: "Gameplay chase camera.",
    subject: "Baby Mo steering the bike to his left.", refs: RIDE, mo: true, helmet: true, bike: true,
    frameNotes: ["F1: neutral glide.", "F2: handlebar turns 8° left, head turns 5° left.", "F3: bike and body lean 6° left.", "F4: lean 10° left, left knee out slightly.", "F5: hold lean 12° left (loop F4–F5 while turning).", "F6: hold lean 12°, small smile visible on the left cheek."],
    placeholder: "rig:rider", game: "Steering left; F4–F6 hold while the stick is held.", anchor: "rear wheel contact" },
  { id: "mo-lean-right", batch: 4, cat: "mo", title: "Turning right", kind: "sheet", ...sheet(6), frames: 6, fps: 12, loop: false, camera: "Gameplay chase camera.",
    subject: "Baby Mo steering the bike to his right (mirror of turning left, but drawn — do not mirror the star or the bell).", refs: ["mo-lean-left", ...RIDE], mo: true, helmet: true, bike: true,
    frameNotes: ["F1: neutral glide.", "F2: handlebar turns 8° right, head turns 5° right.", "F3: lean 6° right.", "F4: lean 10° right.", "F5: hold 12° right.", "F6: hold 12° right, smile on the right cheek."],
    placeholder: "rig:rider", game: "Steering right.", anchor: "rear wheel contact" },
  { id: "mo-jump-prep", batch: 4, cat: "mo", title: "Jump anticipation", kind: "sheet", ...sheet(4), frames: 4, fps: 14, loop: false, camera: "Gameplay chase camera.",
    subject: "Baby Mo crouching on the bike to jump.", refs: RIDE, mo: true, helmet: true, bike: true,
    frameNotes: ["F1: neutral.", "F2: body squashes down 4%, elbows bend.", "F3: deepest crouch (6% lower), tyres slightly compressed.", "F4: springing up, arms straighten, front wheel just lifting."],
    placeholder: "rig:rider", game: "0.12 s before take-off.", anchor: "rear wheel contact" },
  { id: "mo-jump-air", batch: 4, cat: "mo", title: "Airborne", kind: "sheet", ...sheet(6), frames: 6, fps: 10, loop: true, camera: "Gameplay chase camera.",
    subject: "Baby Mo and the bike in the air, joyful.", expression: "(visible from the side of the face) open-mouth laugh.", refs: RIDE, mo: true, helmet: true, bike: true,
    frameNotes: ["F1: bike level, legs tucked, arms straight.", "F2: front wheel tilts up 5°.", "F3: legs kick out slightly sideways with joy.", "F4: legs back in.", "F5: front wheel tilts down 3°.", "F6: level again (loops to F1)."],
    placeholder: "rig:rider", game: "While airborne (sprite rides the jump arc; the game adds the shadow).", anchor: "bike centre" },
  { id: "mo-land", batch: 4, cat: "mo", title: "Landing", kind: "sheet", ...sheet(6), frames: 6, fps: 16, loop: false, camera: "Gameplay chase camera.",
    subject: "Baby Mo landing the jump.", refs: RIDE, mo: true, helmet: true, bike: true,
    frameNotes: ["F1: rear wheel touches down.", "F2: both wheels down, tyres squash 8%, body squashes 6%.", "F3: deepest compression, elbows bent.", "F4: rebound 2% above neutral.", "F5: settle, small giggle.", "F6: neutral glide."],
    placeholder: "rig:rider", game: "On touchdown (game adds a dust puff).", anchor: "rear wheel contact" },
  { id: "mo-boost", batch: 4, cat: "mo", title: "Speed boost", kind: "sheet", ...sheet(8), frames: 8, fps: 14, loop: true, camera: "Gameplay chase camera.",
    subject: "Baby Mo zooming fast on a rainbow boost, leaning forward, helmet strap fluttering, backpack straps fluttering.", refs: RIDE, mo: true, helmet: true, bike: true,
    frameNotes: ["F1: lean forward 10°, tucked.", "F2: hair tufts under helmet flutter back.", "F3: slight body vibration left 1%.", "F4: vibration right 1%.", "F5: one hand lifts a little in excitement.", "F6: hand back on grip.", "F7: vibration left.", "F8: back to F1."],
    placeholder: "rig:rider", game: "Boost pads and rainbow rings (the game adds speed lines and trails).", anchor: "rear wheel contact", mustNot: ["fire, flames or smoke from the bike"] },
  { id: "mo-pickup", batch: 4, cat: "mo", title: "Package collection", kind: "sheet", ...sheet(8), frames: 8, fps: 12, loop: false, camera: "Gameplay chase camera.",
    subject: "Baby Mo reaching up with his right hand to catch a package floating down beside him, then swinging it into his backpack.", refs: RIDE, mo: true, helmet: true, bike: true,
    frameNotes: ["F1: riding, right hand starts to lift.", "F2: right arm stretches up and out to the right.", "F3: hand closes around the package (package = generic cream box with a green ribbon, about the size of his head).", "F4: brings the package over his right shoulder.", "F5: package drops into the open backpack.", "F6: hand back on the grip, backpack bulges.", "F7: happy shoulder wiggle.", "F8: neutral glide with the full backpack."],
    placeholder: "rig:rider", game: "Pickup stations (package art is swapped per mission).", anchor: "rear wheel contact" },
  { id: "mo-ride-carry", batch: 4, cat: "mo", title: "Riding with the package", kind: "sheet", ...sheet(8), frames: 8, fps: 12, loop: true, camera: "Gameplay chase camera.",
    subject: "Same as the riding loop, but the backpack is full and closed (package layer anchor visible).", refs: ["mo-ride-loop", ...RIDE], mo: true, helmet: true, bike: true,
    frameNotes: ["Identical to mo-ride-loop F1–F8, with the backpack bouncing 1% more than the body (a small delayed bounce)."],
    placeholder: "rig:rider", game: "Default animation after pickup; the mission package icon is layered on the backpack.", anchor: "rear wheel contact + backpack top centre" },
  { id: "mo-wobble", batch: 4, cat: "mo", title: "Safe bump & recovery", kind: "sheet", ...sheet(8), frames: 8, fps: 12, loop: false, camera: "Gameplay chase camera.",
    subject: "Baby Mo bumping softly into a toy block: wobble, feet down, giggle, ride on (never falling off, never hurt).", expression: "surprised 'oops!' then giggle.", refs: RIDE, mo: true, helmet: true, bike: true,
    frameNotes: ["F1: front wheel bumps, bike tilts 8° right.", "F2: tilt 12° right, arms out for balance.", "F3: right foot down on the ground.", "F4: tilt back to 4°, both feet down.", "F5: upright, shoulders up (giggling).", "F6: giggle shake.", "F7: feet back on footrests.", "F8: neutral glide."],
    placeholder: "rig:rider", game: "Gentle obstacle collisions (slow down 30%, no failure).", anchor: "rear wheel contact", mustNot: ["falling to the ground", "crying, pain or injury"] },
  { id: "mo-look-around", batch: 4, cat: "mo", title: "Looking around", kind: "sheet", ...sheet(6), frames: 6, fps: 8, loop: false, camera: "Gameplay chase camera.",
    subject: "Baby Mo turning his head to look at something to his right while gliding.", refs: RIDE, mo: true, helmet: true, bike: true,
    frameNotes: ["F1: neutral.", "F2: head turns 20° right.", "F3: head 45° right, cheek and eye visible, curious.", "F4: hold, small smile.", "F5: head back to 20°.", "F6: neutral."],
    placeholder: "rig:rider", game: "Near hidden objects and friends.", anchor: "rear wheel contact" },
  { id: "mo-wave-ride", batch: 4, cat: "mo", title: "Waving to friends while riding", kind: "sheet", ...sheet(6), frames: 6, fps: 10, loop: false, camera: "Gameplay chase camera.",
    subject: "Baby Mo waving with his right hand to a friend at the roadside while gliding.", refs: RIDE, mo: true, helmet: true, bike: true,
    frameNotes: ["F1: neutral.", "F2: right hand lifts.", "F3: hand up, palm open, head turned 30° right.", "F4: hand waves left.", "F5: hand waves right.", "F6: hand back on grip."],
    placeholder: "rig:rider", game: "Passing NPCs.", anchor: "rear wheel contact" },

  /* ============================== BATCH 5 — reactions & cut-scene poses (front-facing) */
  { id: "mo-face-happy", batch: 5, cat: "mo", title: "Portrait — happy (blink loop)", kind: "sheet", ...sheet(4), frames: 4, fps: 6, loop: true, camera: "Head-and-shoulders portrait, front, eye level.", subject: "Baby Mo with helmet, head and shoulders.", expression: "warm happy smile.",
    frameNotes: ["F1: eyes open.", "F2: eyes half closed.", "F3: eyes closed (blink).", "F4: eyes open."], refs: ["mo-master", "render1-front"], mo: true, helmet: true, placeholder: "render1:mo-wave", game: "HUD avatar, dialogue bubbles." },
  { id: "mo-face-surprised", batch: 5, cat: "mo", title: "Portrait — surprised", kind: "sheet", ...sheet(4), frames: 4, fps: 8, loop: false, camera: "Head-and-shoulders portrait, front.", subject: "Baby Mo with helmet.", expression: "surprised round mouth 'oh!', eyebrows up.",
    frameNotes: ["F1: neutral.", "F2: eyes widen.", "F3: mouth round 'oh!', eyebrows high.", "F4: turning into a smile."], refs: ["mo-master", "render1-front"], mo: true, helmet: true, placeholder: "render1:mo-surprised", game: "Discoveries (hidden objects, clock balloons)." },
  { id: "mo-face-excited", batch: 5, cat: "mo", title: "Portrait — excited", kind: "sheet", ...sheet(4), frames: 4, fps: 8, loop: true, camera: "Head-and-shoulders portrait, front.", subject: "Baby Mo with helmet, both fists up near his cheeks.", expression: "eyes squeezed happily, big open laugh.",
    frameNotes: ["F1: fists up.", "F2: bounce up 2%.", "F3: fists shake.", "F4: bounce down."], refs: ["mo-master", "render1-happy"], mo: true, helmet: true, placeholder: "render1:mo-yeyy", game: "Rewards, combos." },
  { id: "mo-celebrate", batch: 5, cat: "mo", title: "Delivery celebration", kind: "sheet", ...sheet(8), frames: 8, fps: 10, loop: false, camera: "Front three-quarter, full body, at his eye level; the bike stands behind him on its kickstand.",
    subject: "Baby Mo jumping and cheering after a delivery.", expression: "biggest joy, eyes closed laughing.", refs: ["mo-master", "bike-master", "render1-happy"], mo: true, helmet: true, bike: true,
    frameNotes: ["F1: standing, fists at chest.", "F2: crouch.", "F3: jump up, both arms up.", "F4: top of the jump, legs tucked.", "F5: landing.", "F6: one fist pump.", "F7: spin half-turn (cheek visible).", "F8: final pose: arms wide, big smile."],
    placeholder: "render1:mo-yeyy", game: "Delivery success screen." },
  { id: "mo-help", batch: 5, cat: "mo", title: "Helping an animal", kind: "sheet", ...sheet(8), frames: 8, fps: 8, loop: false, camera: "Side view facing right, full body, bike parked behind him.",
    subject: "Baby Mo crouching to give an acorn to a small squirrel (squirrel not drawn — empty space on the right for the game to place it).", expression: "kind, gentle smile.", refs: ["mo-master", "render1-side"], mo: true, helmet: true,
    frameNotes: ["F1: standing, holding an acorn.", "F2: crouching down.", "F3: arm extends to the right.", "F4: hold out the acorn, palm up.", "F5: acorn lifted off his palm (by the squirrel — off-frame).", "F6: hands to cheeks, delighted.", "F7: stands up.", "F8: little wave to the right."],
    placeholder: "render1:mo-sit-wave", game: "Friend interaction cut-in." },

  /* ============================== BATCH 6 — accessories & packages */
  ...(["standard|a rounded small backpack in sunny yellow with a green star patch and orange straps",
    "books|the same backpack with three colourful storybooks peeking out of the top",
    "picnic|a small wicker picnic basket with a red-and-white checked cloth, carried on the back with straps",
    "toy|a soft blue toy-delivery bag with a teddy ear and a toy car poking out",
    "dinner|an insulated round food bag in orange with a little steam-cloud logo",
    "moon|a navy sleepy-time bag shaped like a crescent moon with tiny stars"] as const).map((s, i) => {
    const [k, d] = s.split("|");
    return { id: "acc-bag-" + k, batch: 6, cat: "acc" as Cat, title: "Delivery bag — " + k, kind: "still" as const, size: [1024, 1024] as [number, number], camera: "Rear view, same angle as the gameplay chase camera.",
      subject: `A child-sized delivery bag: ${d}. Sized for Baby Mo's back (about 70% of his torso width).`, refs: ["mo-master", "mo-ride-34"], placeholder: i === 0 ? "procedural:backpack" : "kit:gift-blue", game: "Layered on the backpack anchor while riding." };
  }),
  ...(["gift|a gift box wrapped in pink paper with a big yellow bow",
    "storybooks|a stack of three storybooks tied with a green ribbon, top book showing a tiny clock on its cover",
    "picnic|a picnic bundle: wicker basket with an apple and sandwiches",
    "toy|a wooden toy train in a clear box with a bow",
    "food|a stack of two lunch boxes wrapped in an orange cloth",
    "teddy|a soft cream teddy bear holding a small bedtime book"] as const).map((s) => {
    const [k, d] = s.split("|");
    return { id: "pkg-" + k, batch: 6, cat: "acc" as Cat, title: "Package — " + k, kind: "still" as const, size: [1024, 1024] as [number, number], camera: "Three-quarter front view from slightly above.",
      subject: `A delivery package: ${d}. Simple readable silhouette, chunky and soft.`, refs: ["concept"], placeholder: k === "storybooks" ? "procedural:books" : "kit:gift-pink", game: "Pickup station item, HUD package icon, recipient reveal." };
  }),
  { id: "acc-attach-ref", batch: 6, cat: "acc", title: "Accessory attachment reference", kind: "scene", size: [1536, 1024], camera: "Two views side by side: gameplay rear view (left) and pure side view (right).",
    subject: "Baby Mo on the balance bike wearing the standard backpack, showing exactly where the bag sits (between the shoulder blades, top edge level with the base of the helmet).", refs: ["mo-ride-34", "acc-bag-standard", "mo-ride-side"], mo: true, helmet: true, bike: true, transparent: false,
    lighting: "plain light warm-grey background.", placeholder: "rig:rider", game: "Reference for the backpack anchor used by the game." },
  { id: "acc-helmets", batch: 6, cat: "acc", title: "Helmet colours", kind: "scene", size: [1536, 1024], camera: "Three-quarter front view, 3×2 grid.", subject: "Six versions of the same toddler helmet: white with blue star (default), sky blue with yellow star, sunny yellow with green star, mint with a flower, lavender with a moon, orange with a lightning stripe.", refs: ["mo-master"], helmet: true, placeholder: "procedural:helmet", game: "Accessory collection (cosmetic only)." },

  /* ============================== BATCH 7 — Morning Town environment */
  { id: "env-key-art", batch: 7, cat: "env", title: "Morning Town key art (full scene)", kind: "scene", size: [1536, 1024], camera: "Wide establishing shot from a gentle hill, looking down a winding road into a small storybook town.",
    subject: "Morning Town at 8 o'clock: pastel houses with rounded roofs, a cream clock tower showing eight o'clock, the town library with a big open-book sign, a bakery and a fruit shop with striped awnings, round trees, flower beds, a little stone bridge over a stream, a winding light-grey road with a soft yellow centre line.", refs: ["concept"], transparent: false,
    lighting: "early morning: soft golden sunlight from the left, long gentle shadows, light dew sparkle, pale-blue sky with puffy clouds.", placeholder: "kit:bg-home", game: "Adventure card, mission intro, loading screen." },
  { id: "env-road", batch: 7, cat: "env", title: "Road surface tile", kind: "still", size: [1024, 1024], camera: "Top-down orthographic, seamless tile.", subject: "A seamless tileable road texture: smooth light-grey asphalt with fine speckle, soft yellow dashed centre line running vertically, cream curbs with tiny flowers on both edges.", refs: ["env-key-art"], transparent: false,
    lighting: "flat even lighting (no shadows).", placeholder: "procedural:road", game: "Optional texture for the road strips (the default road is drawn procedurally)." },
  { id: "env-far", batch: 7, cat: "env", title: "Far background (sky + hills)", kind: "strip", size: [1536, 1024], camera: "Wide panorama at horizon height.", subject: "Far layer: rolling pastel-green hills, a few tiny distant houses, soft morning haze; the TOP 55% is empty transparent sky (the game paints the sky gradient), the hills sit in the lower 45%. Left and right edges must tile seamlessly.", refs: ["env-key-art"],
    placeholder: "kit:bg-garden", game: "Parallax layer 1 (scroll 0.1× with curves)." },
  { id: "env-mid-houses", batch: 7, cat: "env", title: "Midground houses strip", kind: "strip", size: [1536, 1024], camera: "Straight-on, horizon height.", subject: "A row of 6 different pastel storybook houses with rounded roofs and round windows, trees between them; transparent sky above; bottom edge is a flat grass line. Left and right edges tile seamlessly.", refs: ["env-key-art"],
    placeholder: "procedural:houses", game: "Parallax layer 2 (scroll 0.25×)." },
  { id: "env-trees", batch: 7, cat: "env", title: "Roadside trees", kind: "scene", size: [1536, 1024], camera: "Three-quarter front view from a child's eye height, 3×2 grid of separate trees.", subject: "Six separate round, puffy, friendly trees (apple tree, round green tree, tall cypress, blossom tree, small bush tree, twin tree), each with a short trunk.", refs: ["env-key-art"],
    placeholder: "procedural:tree", game: "Roadside sprites (sliced into env-tree-1…6)." },
  { id: "env-flowers", batch: 7, cat: "env", title: "Flowers & bushes", kind: "scene", size: [1536, 1024], camera: "Three-quarter front, 4×2 grid.", subject: "Eight small roadside items: pink flower clump, yellow tulip clump, white daisy patch, round hedge, berry bush, tall grass tuft, flower pot, mushroom cluster.", refs: ["env-key-art"],
    placeholder: "kit:v-garden", game: "Roadside decoration sprites." },
  { id: "env-library", batch: 7, cat: "env", title: "The Library (destination)", kind: "still", size: [1024, 1024], camera: "Front three-quarter, slightly low angle (seen from the road).", subject: "A cosy two-storey town library: cream walls, teal rounded roof, big wooden double door, a large sign shaped like an open book above the door (no letters), round windows, flower boxes, two little lamps, a book-return mailbox by the door.", refs: ["env-key-art"],
    placeholder: "kit:v-school", game: "Delivery destination at the end of the road." },
  { id: "env-clock-tower", batch: 7, cat: "env", title: "Clock tower (blank face)", kind: "still", size: [1024, 1536], camera: "Front view, slightly low angle.", subject: "A tall cream clock tower with an orange roof and a golden weather-vane; the clock face is a clean BLANK white circle with only the 12 hour marks — NO hands (the game draws the hands so the time is always correct).", refs: ["env-key-art"],
    placeholder: "procedural:tower", game: "Landmark; shows the live mission time." },
  { id: "env-shops", batch: 7, cat: "env", title: "Shops", kind: "scene", size: [1536, 1024], camera: "Front three-quarter, 3×1 row.", subject: "Three small shops, each separate: a bakery with a striped orange awning and bread in the window, a fruit stall with a red-white awning, a toy shop with a blue awning and a teddy in the window (no text on signs).", refs: ["env-key-art"],
    placeholder: "kit:v-market", game: "Roadside buildings." },
  { id: "env-bridge", batch: 7, cat: "env", title: "Stone bridge (road piece)", kind: "still", size: [1536, 1024], camera: "Gameplay chase camera looking along the road.", subject: "A short arched stone bridge carrying the road over a sparkling stream, low rounded railings with flower pots.", refs: ["env-key-art"],
    placeholder: "procedural:bridge", game: "Road event: the road turns into a bridge for a short stretch." },
  { id: "env-deco", batch: 7, cat: "env", title: "Roadside decorations", kind: "scene", size: [1536, 1024], camera: "Three-quarter front, 4×2 grid.", subject: "Eight items: street lamp (lit and unlit versions), wooden bench, white picket fence section, wooden direction sign (blank boards), red mailbox, bunting garland post, bicycle rack, bird bath.", refs: ["env-key-art"],
    placeholder: "kit:v-sign", game: "Roadside sprites; lamps switch on in the evening worlds." },
  { id: "env-clouds", batch: 7, cat: "env", title: "Clouds", kind: "scene", size: [1536, 1024], camera: "Straight-on.", subject: "Six separate soft puffy white clouds of different sizes, with gentle warm morning tint on top.", refs: ["env-key-art"],
    placeholder: "procedural:cloud", game: "Drifting sky layer." },
  { id: "env-sky", batch: 7, cat: "env", title: "Sky gradients (4 times of day)", kind: "scene", size: [1536, 1024], camera: "Straight-on, four vertical panels side by side.", subject: "Four seamless vertical sky gradients: morning (pale gold to light blue), afternoon (bright blue), evening (orange to pink to lavender), night (deep navy to indigo with tiny stars).", refs: [], transparent: false,
    lighting: "no objects, only gradients.", placeholder: "procedural:sky", game: "Reference palette for the procedural sky (and optional texture)." },
  { id: "env-sun", batch: 7, cat: "env", title: "Sun (shimmer)", kind: "sheet", ...sheet(4), frames: 4, fps: 4, loop: true, camera: "Straight-on.", subject: "A friendly soft-yellow sun disc with a warm glow halo (no face).", frameNotes: ["F1: halo at base size.", "F2: halo 4% larger.", "F3: halo 8% larger, slightly brighter.", "F4: halo 4% larger."], refs: ["env-key-art"],
    placeholder: "procedural:sun", game: "Sky layer; position follows the time of day." },
  { id: "env-birds", batch: 7, cat: "env", title: "Flying birds", kind: "sheet", ...sheet(6), frames: 6, fps: 10, loop: true, camera: "Side view, bird flying right.", subject: "A small round robin-like bird flying (cute, chunky).", frameNotes: ["F1: wings up.", "F2: wings mid-down.", "F3: wings down.", "F4: wings mid-up.", "F5: wings up, body rises 3%.", "F6: glide, wings out."], refs: ["env-key-art"],
    placeholder: "kit:fly-robin", game: "Ambient birds crossing the sky." },
  { id: "env-moving", batch: 7, cat: "env", title: "Moving town elements", kind: "sheet", ...sheet(8), frames: 8, fps: 8, loop: true, camera: "Front three-quarter.", subject: "A small wooden windmill with four pastel sails turning.", frameNotes: Array.from({ length: 8 }, (_, i) => `F${i + 1}: sails rotated ${i * 11.25}° clockwise (four sails repeat every 90°, loops).`), refs: ["env-key-art"],
    placeholder: "procedural:windmill", game: "Roadside animated landmark." },

  /* ============================== BATCH 8 — collectibles */
  { id: "col-star", batch: 8, cat: "collect", title: "Golden star (spin)", kind: "sheet", ...sheet(8), frames: 8, fps: 12, loop: true, camera: "Straight-on.", subject: "A chunky glossy golden five-point star with soft rounded points and a tiny sparkle highlight.", frameNotes: Array.from({ length: 8 }, (_, i) => `F${i + 1}: rotated ${i * 22.5}° around its vertical axis (Y), so it appears to spin; F5 is edge-on-thin.`), refs: ["concept"],
    placeholder: "kit:star", game: "Main collectible (trails along the road)." },
  { id: "col-balloon", batch: 8, cat: "collect", title: "Clock balloon (blank face)", kind: "scene", size: [1536, 1024], camera: "Front view, 3×2 grid of six colour versions.", subject: "Six round helium balloons shaped like alarm clocks: two little bells on top, a glossy rubber body, a clean BLANK white clock face with only 12 hour marks and NO hands (the game draws the time), a curly string. Colours: pink, sky blue, yellow, mint, lavender, orange.", refs: ["concept"],
    placeholder: "procedural:balloon", game: "Signature collectible; the game draws accurate hands for each balloon's time." },
  { id: "col-balloon-pop", batch: 8, cat: "collect", title: "Balloon pop", kind: "sheet", ...sheet(6), frames: 6, fps: 18, loop: false, camera: "Front.", subject: "A pink clock balloon popping into confetti and stars.", frameNotes: ["F1: balloon squashes slightly.", "F2: balloon stretches, shiny.", "F3: burst: rubber shreds and a ring of confetti.", "F4: confetti and little stars expand.", "F5: confetti falling, stars twinkling.", "F6: last few sparkles fading."], refs: ["col-balloon"],
    placeholder: "procedural:pop", game: "Collection effect (tinted per balloon colour)." },
  { id: "col-gift", batch: 8, cat: "collect", title: "Gift box (bounce + open)", kind: "sheet", ...sheet(8), frames: 8, fps: 10, loop: false, camera: "Three-quarter front.", subject: "A purple gift box with a yellow bow.", frameNotes: ["F1: resting.", "F2: squash 5%.", "F3: bounce up 8%.", "F4: back down (frames 1–4 = idle loop).", "F5: lid pops up.", "F6: lid flies off, golden glow.", "F7: sparkles burst out.", "F8: open box glowing."], refs: ["concept"],
    placeholder: "kit:gift-purple", game: "Bonus collectible (gives 5 stars)." },
  { id: "col-coin", batch: 8, cat: "collect", title: "Coin (spin)", kind: "sheet", ...sheet(8), frames: 8, fps: 14, loop: true, camera: "Straight-on.", subject: "A thick golden coin with a raised star.", frameNotes: Array.from({ length: 8 }, (_, i) => `F${i + 1}: rotated ${i * 22.5}° around the vertical axis.`), refs: ["col-star"],
    placeholder: "kit:coin", game: "Common pickup in trails." },
  { id: "col-token", batch: 8, cat: "collect", title: "Adventure token", kind: "still", size: [1024, 1024], camera: "Front, slightly tilted.", subject: "A special round badge-token: golden rim, sky-blue enamel centre with a tiny clock and a delivery box icon embossed, a small ribbon at the bottom.", refs: ["col-coin"],
    placeholder: "kit:p-badge", game: "One per world, for helping a friend." },
  { id: "col-clock-float", batch: 8, cat: "collect", title: "Floating pocket clock", kind: "still", size: [1024, 1024], camera: "Three-quarter front.", subject: "A small golden pocket-watch-style clock with tiny wings, BLANK face (no hands).", refs: ["col-balloon"], placeholder: "procedural:balloon", game: "Hidden surprise object (shortcut reward)." },
  { id: "col-ring", batch: 8, cat: "collect", title: "Magic ring", kind: "still", size: [1024, 1024], camera: "Seen from the gameplay chase camera (an upright ring Baby Mo rides through).", subject: "A big glowing rainbow ring of light floating upright over the road, soft sparkles.", refs: ["concept"], placeholder: "procedural:ring", game: "Ride-through ring (small boost + stars)." },
  { id: "col-rainbow", batch: 8, cat: "collect", title: "Rainbow boost object", kind: "sheet", ...sheet(4), frames: 4, fps: 8, loop: true, camera: "Gameplay chase camera.", subject: "A soft rainbow arc with a star at its peak.", frameNotes: ["F1: base.", "F2: shimmer moves left to right.", "F3: star sparkles.", "F4: shimmer fades."], refs: ["concept"], placeholder: "kit:rainbow", game: "Boost pickup." },

  /* ============================== BATCH 9 — obstacles, interactive objects, NPCs */
  { id: "obs-ramp", batch: 9, cat: "obstacle", title: "Wooden ramp", kind: "still", size: [1024, 1024], camera: "Gameplay chase camera (from behind).", subject: "A small wooden kicker ramp with three white chevron arrows painted on it, as wide as about 1.5× Baby Mo on his bike.", refs: ["concept"], placeholder: "procedural:ramp", game: "Launches a big jump." },
  { id: "obs-log", batch: 9, cat: "obstacle", title: "Rolling log", kind: "sheet", ...sheet(8), frames: 8, fps: 10, loop: true, camera: "Gameplay chase camera.", subject: "A short round friendly log with a smiling knot (no scary face) rolling slowly across the road.", frameNotes: Array.from({ length: 8 }, (_, i) => `F${i + 1}: rotated ${i * 45}° (bark pattern advances).`), refs: ["concept"], placeholder: "procedural:log", game: "Jump over (or gentle wobble)." },
  { id: "obs-boxes", batch: 9, cat: "obstacle", title: "Cardboard boxes", kind: "still", size: [1024, 1024], camera: "Gameplay chase camera.", subject: "A small stack of three cardboard boxes with star stickers.", refs: ["concept"], placeholder: "procedural:boxes", game: "Obstacle (soft bump)." },
  { id: "obs-blocks", batch: 9, cat: "obstacle", title: "Toy blocks", kind: "still", size: [1024, 1024], camera: "Gameplay chase camera.", subject: "Three chunky wooden toy blocks (red, yellow, blue) with rounded edges.", refs: ["concept"], placeholder: "procedural:blocks", game: "Obstacle (soft bump)." },
  { id: "obs-puddle", batch: 9, cat: "obstacle", title: "Water puddle (ripple + splash)", kind: "sheet", ...sheet(8), frames: 8, fps: 12, loop: false, camera: "Gameplay chase camera (flat on the road).", subject: "A shallow rounded puddle with sky reflections.", frameNotes: ["F1–F4: idle ripple loop (rings expand outward).", "F5: splash crown when a wheel enters.", "F6: droplets up.", "F7: droplets falling.", "F8: calm puddle."], refs: ["concept"], placeholder: "procedural:puddle", game: "Slows a little, splash effect." },
  { id: "obs-tunnel", batch: 9, cat: "obstacle", title: "Paper tunnel (entrance)", kind: "still", size: [1024, 1024], camera: "Gameplay chase camera, facing the entrance.", subject: "A playful tunnel made of colourful paper strips and paper flowers, arched over the road, glowing inside.", refs: ["concept"], placeholder: "procedural:tunnel", game: "Shortcut entrance (rides through)." },
  { id: "obs-balloons", batch: 9, cat: "obstacle", title: "Balloon cluster", kind: "still", size: [1024, 1536], camera: "Front.", subject: "A bunch of seven plain pastel balloons tied to a little weight.", refs: ["col-balloon"], placeholder: "procedural:balloons", game: "Roadside decoration / pop for stars." },
  { id: "obs-platform", batch: 9, cat: "obstacle", title: "Moving platform", kind: "still", size: [1536, 1024], camera: "Gameplay chase camera.", subject: "A flat wooden raft-platform on a calm stream, with rounded rope railings.", refs: ["env-bridge"], placeholder: "procedural:platform", game: "Later worlds (Sunny Park)." },
  { id: "obs-boost-pad", batch: 9, cat: "obstacle", title: "Speed boost pad", kind: "sheet", ...sheet(4), frames: 4, fps: 10, loop: true, camera: "Gameplay chase camera (flat on the road).", subject: "A glowing rainbow strip on the road with three bright chevron arrows pointing forward.", frameNotes: ["F1: arrow 1 bright.", "F2: arrow 2 bright.", "F3: arrow 3 bright.", "F4: all dim."], refs: ["col-rainbow"], placeholder: "procedural:boostpad", game: "Boost pads." },
  { id: "obs-mailbox", batch: 9, cat: "obstacle", title: "Mailbox (opens)", kind: "sheet", ...sheet(6), frames: 6, fps: 10, loop: false, camera: "Three-quarter front.", subject: "A round red mailbox on a post with a little flag.", frameNotes: ["F1: closed.", "F2: flag rises.", "F3: door opens.", "F4: open, glow inside.", "F5: a package slides in.", "F6: door closes, flag up, sparkle."], refs: ["env-deco"], placeholder: "procedural:mailbox", game: "Small deliveries to friends." },
  { id: "obs-library-door", batch: 9, cat: "obstacle", title: "Library door (opens)", kind: "sheet", ...sheet(6), frames: 6, fps: 10, loop: false, camera: "Front, matching env-library.", subject: "The library's wooden double door.", frameNotes: ["F1: closed.", "F2: doors open 15°.", "F3: 45°, warm light spills out.", "F4: fully open, bookshelves inside.", "F5: light glow peaks.", "F6: hold open."], refs: ["env-library"], placeholder: "procedural:door", game: "Delivery moment." },
  { id: "dest-houses", batch: 9, cat: "obstacle", title: "Delivery destinations (5 worlds)", kind: "scene", size: [1536, 1024], camera: "Front three-quarter, 3×2 grid.", subject: "Five destinations in the same style: picnic blanket spot under a tree (Sunny Park), toy shop door (Playtime Village), a cosy house with a lit window (Sunset Town), a dreamy cloud cottage with a moon lamp (Dreamland), and a post office; sixth cell empty.", refs: ["env-library"], placeholder: "kit:v-house", game: "Later worlds." },
  ...([["squirrel", "a small round orange-brown squirrel with a huge fluffy tail and big glossy eyes"],
    ["rabbit", "a small round white rabbit with pink inner ears and a cotton tail"],
    ["bird", "a small round robin with an orange chest"],
    ["librarian", "a kind young librarian woman wearing a soft blue hijab, a cream cardigan over a long lavender dress, round glasses, holding a storybook (adult proportions, about 1.9× Baby Mo's height, same art style)"],
    ["baker", "a friendly round baker uncle with a white apron and a small white cap, holding a bread basket (adult proportions, 1.9× Baby Mo's height)"]] as const).map(([k, d]) => ({
    id: "npc-" + k, batch: 9, cat: "npc" as Cat, title: "NPC — " + k + " (idle / happy / interact)", kind: "sheet" as const, size: [1536, 1024] as [number, number], frames: 6, grid: [3, 2] as [number, number], fps: 8, loop: false,
    camera: "Front three-quarter at the character's eye level.", subject: `${d}, friendly and cute, same 3D style as Baby Mo.`,
    frameNotes: ["F1: idle (neutral, blinking eyes open).", "F2: idle (eyes closed — blink).", "F3: happy (big smile, small hop).", "F4: happy (arms or paws up).", "F5: interact (reaching out to receive something).", "F6: interact (holding it, hearts above)."],
    refs: ["concept", "mo-master"], placeholder: k === "bird" ? "kit:bird-robin" : "procedural:" + k, game: k === "squirrel" ? "Friend quest in Morning Town." : k === "librarian" ? "Receives the books at the library." : "Roadside friend." })),

  /* ============================== BATCH 10 — UI, screens & FX */
  { id: "ui-logo", batch: 10, cat: "ui", title: "Game logo", kind: "still", size: [1536, 1024], camera: "Straight-on.", subject: "The game logo lettering 'Baby Mo' (bubbly rounded 3D letters in sky blue and yellow) above 'Time Rush' (chunky orange-to-yellow 3D letters with a white outline) with a small star, and a red ribbon banner underneath reading 'Time Adventure Delivery Race'. Text must be spelled exactly.", refs: ["concept"], placeholder: "css:logo", game: "Splash, main menu.", mustNot: ["misspelled text", "extra words"] },
  { id: "ui-splash", batch: 10, cat: "ui", title: "Splash screen", kind: "scene", size: [1024, 1536], camera: "Portrait key art, low angle.", subject: "Baby Mo on his balance bike riding toward the viewer down a sunny town road, package in his backpack, clock tower behind; empty space in the top 30% for the logo.", refs: ["mo-ride-side", "env-key-art", "ui-logo"], mo: true, helmet: true, bike: true, transparent: false, placeholder: "css:splash", game: "First screen (portrait)." },
  { id: "ui-menu-bg", batch: 10, cat: "ui", title: "Main menu background", kind: "scene", size: [1536, 1024], camera: "Wide, gentle depth of field.", subject: "Morning Town street with the clock tower on the right and soft bokeh; a clear area on the left half for Baby Mo and buttons.", refs: ["env-key-art"], transparent: false, placeholder: "kit:bg-home", game: "Main menu (landscape)." },
  ...(["Morning Rush|Morning Town at 8:00 with the library", "Lunch Time|Sunny Park at 12:00 with a picnic", "Play Time|Playtime Village at 3:00 with slides", "Dinner Time|Sunset Town at 6:00 with lit windows", "Bedtime|Dreamland at night with a moon and stars"] as const).map((s, i) => {
    const [n, d] = s.split("|");
    return { id: "ui-world-" + (i + 1), batch: 10, cat: "ui" as Cat, title: "World card — " + n, kind: "scene" as const, size: [1024, 1024] as [number, number], camera: "Square postcard, slightly elevated.", subject: `Adventure card illustration: ${d}. No text.`, refs: ["env-key-art"], transparent: false, placeholder: "procedural:worldcard", game: "Adventure selection cards." };
  }),
  { id: "ui-mission-card", batch: 10, cat: "ui", title: "Mission card frame", kind: "still", size: [1024, 1536], camera: "Straight-on.", subject: "A clipboard-style mission card: warm cream paper on a wooden clipboard with a blue clip, empty for text and a picture.", refs: ["concept"], placeholder: "kit:p-card", game: "Mission introduction." },
  { id: "ui-icons", batch: 10, cat: "ui", title: "HUD icons", kind: "scene", size: [1536, 1024], camera: "Straight-on, 4×2 grid of icons.", subject: "Eight glossy rounded game icons matching the Baby Mo app style: star counter star, stopwatch-clock, package box, map pin, bike, trophy, coin, adventure token.", refs: ["concept"], placeholder: "kit:ui", game: "HUD and menus (many already exist in the app-ayah kit)." },
  { id: "ui-delivery-success", batch: 10, cat: "ui", title: "Delivery success illustration", kind: "scene", size: [1536, 1024], camera: "Front, eye level.", subject: "Baby Mo handing the storybooks to the smiling librarian at the library door, children waiting inside, warm light, confetti.", refs: ["mo-celebrate", "npc-librarian", "env-library"], mo: true, helmet: true, transparent: false, placeholder: "composite:delivery", game: "Delivery completion screen." },
  { id: "ui-reward", batch: 10, cat: "ui", title: "Reward chest", kind: "still", size: [1024, 1024], camera: "Three-quarter front.", subject: "An open golden treasure chest bursting with stars and coins.", refs: ["concept"], placeholder: "kit:chest-open", game: "Reward screen." },
  { id: "ui-garage-bg", batch: 10, cat: "ui", title: "Bike garage background", kind: "scene", size: [1536, 1024], camera: "Inside a cosy wooden garage, centred turntable.", subject: "A friendly garage with pegboard tools, a round turntable platform in the centre with soft spotlight, bike posters (no text).", refs: ["concept"], transparent: false, placeholder: "css:garage", game: "Bike garage." },
  { id: "ui-closet-bg", batch: 10, cat: "ui", title: "Accessory collection background", kind: "scene", size: [1536, 1024], camera: "Inside a bright bedroom corner.", subject: "A cheerful wardrobe corner with shelves of helmets, bags and stickers, soft daylight.", refs: ["concept"], transparent: false, placeholder: "css:closet", game: "Collection screen." },
  { id: "ui-complete-banner", batch: 10, cat: "ui", title: "Level complete banner", kind: "still", size: [1536, 1024], camera: "Straight-on.", subject: "A big ribbon banner (red with gold edges) with three empty star slots above it; NO text on the ribbon (the game writes it).", refs: ["ui-logo"], placeholder: "kit:ribbon", game: "Level complete." },
  ...([["fx-sparkle", "a four-point white-gold sparkle twinkling", 6], ["fx-dust", "a soft cartoon dust puff expanding and fading", 6], ["fx-rainbow-trail", "a rainbow ribbon trail segment flowing", 6], ["fx-jump-puff", "a ring of little cloud puffs bursting outward on landing", 6], ["fx-confetti", "colourful confetti pieces and tiny stars falling", 8], ["fx-hearts", "three small hearts rising and fading", 6]] as const).map(([id, d, n]) => ({
    id, batch: 10, cat: "fx" as Cat, title: "Effect — " + id.slice(3), kind: "sheet" as const, ...sheet(n), frames: n, fps: 16, loop: false, camera: "Straight-on.", subject: `${d}.`,
    frameNotes: [`Frames 1–${n}: smooth progression from start to finish; every frame centred on the same point.`], refs: [], placeholder: "procedural:particles", game: "Particles (the game also has procedural particles)." })),
];

export const byId = (id: string) => CATALOG.find((a) => a.id === id);
export const BATCHES: Record<number, string> = {
  1: "Baby Mo master references", 2: "Balance bike", 3: "Approved riding poses", 4: "Gameplay animation sheets", 5: "Reactions & cut-scenes",
  6: "Bags, packages & helmets", 7: "Morning Town environment", 8: "Collectibles", 9: "Obstacles, destinations & friends", 10: "UI, screens & effects",
};
