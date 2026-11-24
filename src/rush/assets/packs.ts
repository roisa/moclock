/**
 * BABY MO TIME RUSH — image packs (single source of truth for the art).
 *
 * Every ChatGPT image holds SIX things in a 3 × 2 grid on a 1536 × 1024 PNG
 * with a transparent background: six poses, six items, or the six frames of
 * one animation. scripts/rush-docs.mjs turns this list into the prompt library
 * (docs/rush/04) and the asset bible (03); scripts/rush-slice.py cuts a pack
 * into the game files named by `cells` / `clips`.
 *
 * priority "now" = needed for the Morning Town slice; "later" = other worlds / polish.
 */
export type PackKind = "poses" | "anim" | "items";
export interface Clip { id: string; from: number; to: number; fps: number; loop: boolean }
export interface Pack {
  id: string;
  n: number; // production order
  group: string;
  title: string;
  priority: "now" | "later";
  kind: PackKind;
  camera: string;
  subject: string; // what the six cells have in common
  cells: [string, string][]; // [game id, what is in the cell] × 6
  clips?: Clip[]; // anim packs: frame ranges → game sheets
  refs: string[]; // earlier pack ids or EXISTING_REFS keys to attach
  mo?: boolean;
  ais?: boolean;
  adam?: boolean;
  helmet?: boolean;
  bike?: boolean;
  mustNot?: string[];
  baseline?: boolean; // characters / props standing on a common ground line
  single?: boolean; // one item on the whole canvas (logo only)
  status?: "done" | "covered"; // done = approved art is in the game; covered = the app-ayah library / game drawing already does it
  note?: string;
}

const R = "render1-back";
const CHASE = "Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Mo and the bike face AWAY from the viewer, riding into the picture, centred in each cell.";
const anim = (id: string, fps: number, loop: boolean): Clip[] => [{ id, from: 0, to: 5, fps, loop }];

export const PACKS: Pack[] = [
  /* ---------------- 1–3 · reference packs (make these first, then attach them to everything else) */
  { id: "p01-mo-ref", n: 1, group: "References", title: "Baby Mo reference poses (with helmet)", priority: "now", kind: "poses", baseline: true,
    camera: "Eye level, full body, every view at the same height on the same ground line.",
    subject: "Character reference sheet of Baby Mo wearing his riding helmet.",
    cells: [["mo-ref-front", "standing, front view, arms relaxed, gentle smile"], ["mo-ref-34", "standing, three-quarter front view facing left"], ["mo-ref-side", "standing, pure side view facing left"],
      ["mo-ref-back", "standing, back view"], ["mo-stand-front", "front view, waving with his right hand, big happy smile"], ["mo-stand-back", "back view, looking up and to the right at something exciting (cheek just visible)"]],
    refs: ["render1-front", R, "render1-side"], mo: true, helmet: true },
  { id: "p02-bike-ref", n: 2, group: "References", title: "Push balance bike reference views", priority: "now", kind: "items", baseline: true,
    camera: "Product views, every bike at the same scale on the same ground line.",
    subject: "The push balance bike alone (no rider).",
    cells: [["bike-side", "pure side view facing left"], ["bike-34", "three-quarter front view from slightly above"], ["bike-front", "straight-on front view"],
      ["bike-rear", "rear view from behind and slightly above (the gameplay angle)"], ["bike-wheel", "close-up of one wheel, side view"], ["bike-detail", "close-up of the handlebar with grips and bell, and the saddle with the footrests"]],
    refs: ["concept"], bike: true },
  { id: "p03-ride-key", n: 3, group: "References", title: "Riding key poses (approve before any animation)", priority: "now", kind: "poses", baseline: true,
    camera: "Each cell states its own angle; same scale everywhere, wheels on the same ground line.",
    subject: "Baby Mo on the push balance bike with helmet and small yellow backpack.",
    cells: [["mo-ride-34", "KEY POSE — gameplay chase view from behind and slightly above, gliding, hands on grips, feet on the footrests (every animation must match this)"], ["mo-ride-side", "pure side view facing left, gliding, feet on the footrests"], ["mo-ride-front", "front three-quarter view riding toward the viewer, excited smile"],
      ["mo-idle-rear", "gameplay chase view, stopped, both feet flat on the ground either side"], ["mo-push-side", "side view, pushing the ground with his left foot (a running stride while seated)"], ["mo-bag-side", "side view, standing next to the bike, showing where the backpack sits between his shoulder blades"]],
    refs: ["p01-mo-ref", "p02-bike-ref", R], mo: true, helmet: true, bike: true },

  /* ---------------- 4–13 · gameplay animations (chase view, 6 frames each) */
  { id: "p04-ride", n: 4, group: "Riding animations", title: "Gliding loop", priority: "now", kind: "anim", baseline: true, camera: CHASE,
    subject: "Baby Mo gliding forward on the push balance bike, feet on the footrests, hands on the grips — a smooth looping bob.",
    cells: [["f1", "neutral, centred"], ["f2", "body 1.5% lower, helmet tilts 2° left"], ["f3", "lowest point"], ["f4", "rising, centred"], ["f5", "highest point, helmet tilts 2° right"], ["f6", "coming back down (flows into frame 1)"]],
    clips: anim("mo-ride-loop", 10, true), refs: ["p03-ride-key", "p02-bike-ref", "p01-mo-ref"], mo: true, helmet: true, bike: true },
  { id: "p05-push", n: 5, group: "Riding animations", title: "Push-off strides loop (feet push the ground — no pedals)", priority: "now", kind: "anim", baseline: true, camera: CHASE,
    subject: "Baby Mo seated on the push balance bike, pushing the ground with alternating feet like running to speed up.",
    cells: [["f1", "left foot reaches down to the ground, right foot lifted back"], ["f2", "left foot pushes backwards, body leans forward 3°"], ["f3", "both feet tucked, short glide"], ["f4", "right foot reaches down to the ground"], ["f5", "right foot pushes backwards, body leans forward 3°"], ["f6", "both feet tucked (flows into frame 1)"]],
    clips: anim("mo-push", 12, true), refs: ["p03-ride-key", "p02-bike-ref"], mo: true, helmet: true, bike: true },
  { id: "p06-lean", n: 6, group: "Riding animations", title: "Turning left and right", priority: "now", kind: "anim", baseline: true, camera: CHASE,
    subject: "Baby Mo steering the push balance bike; top row turns LEFT, bottom row turns RIGHT (draw both — do not mirror the bell).",
    cells: [["f1", "starting to turn left: handlebar 8° left, head 5° left"], ["f2", "leaning 8° left"], ["f3", "full lean 12° left, small smile on his left cheek"], ["f4", "starting to turn right: handlebar 8° right, head 5° right"], ["f5", "leaning 8° right"], ["f6", "full lean 12° right, smile on his right cheek"]],
    clips: [{ id: "mo-lean-left", from: 0, to: 2, fps: 12, loop: false }, { id: "mo-lean-right", from: 3, to: 5, fps: 12, loop: false }], refs: ["p03-ride-key", "p02-bike-ref"], mo: true, helmet: true, bike: true },
  { id: "p07-jump", n: 7, group: "Riding animations", title: "Jump: crouch, fly, land", priority: "now", kind: "anim", baseline: true, camera: CHASE,
    subject: "Baby Mo jumping with the push balance bike. Keep the wheels' ground line in the same place in every cell; the game moves the sprite up and down.",
    cells: [["f1", "crouch: body squashed down 5%, elbows bent"], ["f2", "springing up, front wheel lifting"], ["f3", "in the air, bike level, legs tucked, open-mouth laugh"], ["f4", "in the air, legs kicked out happily to the sides"], ["f5", "landing: tyres and body squashed 8%"], ["f6", "rebound to neutral, giggling"]],
    clips: [{ id: "mo-jump-prep", from: 0, to: 1, fps: 12, loop: false }, { id: "mo-jump-air", from: 2, to: 3, fps: 6, loop: true }, { id: "mo-land", from: 4, to: 5, fps: 12, loop: false }], refs: ["p03-ride-key", "p02-bike-ref"], mo: true, helmet: true, bike: true },
  { id: "p08-boost", n: 8, group: "Riding animations", title: "Speed boost loop", priority: "now", kind: "anim", baseline: true, camera: CHASE,
    subject: "Baby Mo zooming fast, leaning forward, helmet strap and backpack straps fluttering (no fire, no smoke — the game adds rainbow trails).",
    cells: [["f1", "tucked forward 10°"], ["f2", "hair under the helmet flutters back"], ["f3", "tiny shake left"], ["f4", "tiny shake right"], ["f5", "one hand lifts a little with excitement"], ["f6", "hand back on the grip (flows into frame 1)"]],
    clips: anim("mo-boost", 12, true), refs: ["p03-ride-key", "p02-bike-ref"], mo: true, helmet: true, bike: true, mustNot: ["fire, flames or smoke"] },
  { id: "p09-pickup", n: 9, group: "Riding animations", title: "Catching a package", priority: "now", kind: "anim", baseline: true, camera: CHASE,
    subject: "Baby Mo reaching up with his right hand to catch a cream package with a green ribbon floating down beside him, then putting it into his backpack.",
    cells: [["f1", "right hand starts to lift"], ["f2", "right arm stretched up and out, package just above"], ["f3", "hand holds the package"], ["f4", "package over his right shoulder"], ["f5", "package drops into the open backpack"], ["f6", "hand back on the grip, backpack full, happy shoulder wiggle"]],
    clips: anim("mo-pickup", 10, false), refs: ["p03-ride-key", "p02-bike-ref"], mo: true, helmet: true, bike: true },
  { id: "p10-carry", n: 10, group: "Riding animations", title: "Gliding with a full backpack", priority: "now", kind: "anim", baseline: true, camera: CHASE,
    subject: "Same gliding loop as pack 4, but the backpack is full and closed and bounces a little after the body.",
    cells: [["f1", "neutral"], ["f2", "body lower, backpack still up"], ["f3", "lowest, backpack catching up"], ["f4", "rising"], ["f5", "highest point"], ["f6", "coming down (flows into frame 1)"]],
    clips: anim("mo-ride-carry", 10, true), refs: ["p04-ride", "p03-ride-key"], mo: true, helmet: true, bike: true },
  { id: "p11-wobble", n: 11, group: "Riding animations", title: "Gentle bump and recovery (never falls)", priority: "now", kind: "anim", baseline: true, camera: CHASE,
    subject: "Baby Mo bumping softly into a toy block: a wobble, one foot down, a giggle, then riding on.",
    cells: [["f1", "front wheel bumps, bike tilts 8° right, surprised 'oops'"], ["f2", "tilts 12° right, arms out for balance"], ["f3", "right foot down on the ground"], ["f4", "upright again, shoulders up, giggling"], ["f5", "giggle shake"], ["f6", "feet back on the footrests, gliding"]],
    clips: anim("mo-wobble", 10, false), refs: ["p03-ride-key", "p02-bike-ref"], mo: true, helmet: true, bike: true, mustNot: ["falling to the ground", "crying, pain or injury"] },
  { id: "p12-idle", n: 12, group: "Riding animations", title: "Waiting on the bike (idle loop)", priority: "now", kind: "anim", baseline: true, camera: CHASE,
    subject: "Baby Mo sitting on the stopped push balance bike, both feet flat on the ground, breathing and looking around.",
    cells: [["f1", "neutral, hands on grips"], ["f2", "shoulders rise (breathing in)"], ["f3", "head turns a little right"], ["f4", "head back to centre"], ["f5", "small bounce on the saddle"], ["f6", "neutral (flows into frame 1)"]],
    clips: anim("mo-idle-bike", 6, true), refs: ["p03-ride-key", "p02-bike-ref"], mo: true, helmet: true, bike: true },
  { id: "p13-look-wave", n: 13, group: "Riding animations", title: "Looking around and waving to friends", priority: "later", kind: "anim", baseline: true, camera: CHASE,
    subject: "Baby Mo gliding; top row looks to the right side of the road, bottom row waves to a friend on the right.",
    cells: [["f1", "head turns 20° right"], ["f2", "head 45° right, cheek and eye visible, curious"], ["f3", "head back to centre"], ["f4", "right hand lifts"], ["f5", "hand up, palm open, waving"], ["f6", "hand back on the grip"]],
    clips: [{ id: "mo-look", from: 0, to: 2, fps: 8, loop: false }, { id: "mo-wave-ride", from: 3, to: 5, fps: 8, loop: false }], refs: ["p03-ride-key"], mo: true, helmet: true, bike: true },

  /* ---------------- 14–16 · cut-scene poses (front facing) */
  { id: "p14-faces", n: 14, group: "Baby Mo cut-scenes", title: "Face portraits for the HUD and speech bubbles", priority: "now", kind: "poses",
    camera: "Head-and-shoulders portrait, front, eye level, same size in every cell.",
    subject: "Baby Mo's face with his helmet on.",
    cells: [["mo-face-happy", "warm happy smile, eyes open"], ["mo-face-blink", "same as cell 1 with eyes closed (blink)"], ["mo-face-surprised", "surprised round mouth 'oh!', eyebrows up"],
      ["mo-face-excited", "eyes squeezed happily, big open laugh, fists by his cheeks"], ["mo-face-thinking", "looking up, finger on chin"], ["mo-face-proud", "proud grin, thumbs up"]],
    refs: ["p01-mo-ref", "render1-front", "render1-happy"], mo: true, helmet: true },
  { id: "p15-celebrate", n: 15, group: "Baby Mo cut-scenes", title: "Delivery celebration", priority: "now", kind: "anim", baseline: true,
    camera: "Front three-quarter, full body, eye level.",
    subject: "Baby Mo (helmet on, standing next to nothing — no bike) cheering after a delivery.",
    cells: [["f1", "fists at chest, excited"], ["f2", "crouching to jump"], ["f3", "jumping up, both arms up"], ["f4", "top of the jump, legs tucked, laughing"], ["f5", "landing, one fist pump"], ["f6", "final pose: arms wide, biggest smile"]],
    clips: anim("mo-celebrate", 8, false), refs: ["p01-mo-ref", "render1-happy"], mo: true, helmet: true },
  { id: "p16-help", n: 16, group: "Baby Mo cut-scenes", title: "Helping the squirrel", priority: "later", kind: "anim", baseline: true,
    camera: "Side view facing right, full body.",
    subject: "Baby Mo (helmet on) giving an acorn to a small squirrel; leave empty space on the right of each cell (the game places the squirrel).",
    cells: [["f1", "standing, holding an acorn"], ["f2", "crouching down"], ["f3", "holding the acorn out, palm up"], ["f4", "the acorn is gone from his palm, delighted"], ["f5", "hands on cheeks, so happy"], ["f6", "standing, small wave to the right"]],
    clips: anim("mo-help", 6, false), refs: ["p01-mo-ref", "render1-side"], mo: true, helmet: true },

  /* ---------------- 17–21 · bikes, bags, packages, helmets */
  { id: "p17-bike-colors", n: 17, group: "Bikes & gear", title: "Bike colours", priority: "now", kind: "items", baseline: true,
    camera: "Pure side view facing left, every bike identical in shape and size.",
    subject: "Six push balance bikes that differ ONLY in frame colour.",
    cells: [["bike-green", "fresh green"], ["bike-blue", "sky blue"], ["bike-yellow", "sunny yellow"], ["bike-pink", "soft pink"], ["bike-lavender", "lavender"], ["bike-rainbow", "pastel rainbow stripes"]],
    refs: ["p02-bike-ref"], bike: true },
  { id: "p18-bags", n: 18, group: "Bikes & gear", title: "Delivery backpacks", priority: "now", kind: "items",
    camera: "Rear view, the same angle as the gameplay camera; each bag sized for Baby Mo's back.",
    subject: "Child-sized delivery backpacks.",
    cells: [["bag-yellow", "sunny yellow with a green star patch and orange straps (the default)"], ["bag-blue", "sky blue with a yellow star patch"], ["bag-pink", "soft pink with a white heart patch"],
      ["bag-books", "the yellow bag with three colourful storybooks peeking out"], ["bag-picnic", "a small wicker picnic basket worn with straps"], ["bag-moon", "a navy bedtime bag shaped like a crescent moon"]],
    refs: ["p03-ride-key"] },
  { id: "p19-packages", n: 19, group: "Bikes & gear", title: "Packages to deliver", priority: "now", kind: "items",
    camera: "Three-quarter front view from slightly above.",
    subject: "Chunky, soft delivery packages with simple readable shapes.",
    cells: [["pkg-storybooks", "a stack of three storybooks tied with a green ribbon"], ["pkg-gift", "a pink gift box with a big yellow bow"], ["pkg-picnic", "a picnic bundle: apple, sandwiches, cloth"],
      ["pkg-toy", "a wooden toy train in a box with a bow"], ["pkg-food", "two lunch boxes wrapped in an orange cloth"], ["pkg-teddy", "a cream teddy bear holding a small bedtime book"]],
    refs: ["concept"] },
  { id: "p20-helmets", n: 20, group: "Bikes & gear", title: "Helmet colours", priority: "later", kind: "items",
    camera: "Three-quarter front view, every helmet identical in shape.",
    subject: "Six versions of Baby Mo's toddler riding helmet.",
    cells: [["helmet-white", "white with a soft-blue star (the default)"], ["helmet-blue", "sky blue with a yellow star"], ["helmet-yellow", "sunny yellow with a green star"], ["helmet-mint", "mint with a little flower"], ["helmet-lavender", "lavender with a moon"], ["helmet-orange", "orange with a lightning stripe"]],
    refs: ["p01-mo-ref"], helmet: true },
  { id: "p21-bike-extras", n: 21, group: "Bikes & gear", title: "Bike accessories", priority: "later", kind: "items",
    camera: "Three-quarter view, same scale as the bike.",
    subject: "Separate add-ons for the push balance bike.",
    cells: [["acc-bell", "yellow bell"], ["acc-basket", "wicker front basket"], ["acc-streamers", "rainbow handlebar streamers"], ["acc-flag", "small triangle flag on a pole"], ["acc-light", "round front light"], ["acc-beads", "star-shaped spoke beads"]],
    refs: ["p02-bike-ref"] },

  /* ---------------- 22–28 · Morning Town */
  { id: "p22-buildings", n: 22, group: "Morning Town", title: "Town buildings", priority: "now", kind: "items", baseline: true,
    camera: "Front three-quarter, slightly low angle (seen from the road), all at a consistent storybook scale.",
    subject: "Pastel storybook buildings with rounded roofs (no letters on any sign).",
    cells: [["library", "the town library: cream walls, teal roof, big wooden double door, a sign shaped like an open book"], ["tower", "a tall cream clock tower with an orange roof; the clock face is a BLANK white circle with only 12 hour marks and NO hands"], ["bakery", "a bakery with a striped orange awning and bread in the window"],
      ["shop", "a fruit stall with a red-and-white awning"], ["house", "a small pastel house with a round window"], ["house2", "a different pastel house with a chimney and flower boxes"]],
    refs: ["concept"] },
  { id: "p23-trees", n: 23, group: "Morning Town", title: "Trees", priority: "now", kind: "items", baseline: true,
    camera: "Three-quarter front at a child's eye height.",
    subject: "Round, puffy, friendly trees, each with a short trunk.",
    cells: [["tree", "an apple tree with red apples"], ["tree2", "a tall cypress"], ["tree3", "a round green tree"], ["tree4", "a pink blossom tree"], ["tree5", "a small bush tree"], ["tree6", "a twin-crown tree"]],
    refs: ["concept"] },
  { id: "p24-roadside", n: 24, group: "Morning Town", title: "Roadside things", priority: "now", kind: "items", baseline: true,
    camera: "Three-quarter front.",
    subject: "Small roadside decorations.",
    cells: [["bush", "a round hedge with tiny flowers"], ["flowers", "a wooden planter full of pink and yellow flowers"], ["lamp", "a street lamp with a warm glowing globe"], ["fence", "a white picket fence section"], ["bench", "a wooden park bench"], ["mailbox", "a round red mailbox on a post with a little flag"]],
    refs: ["concept"] },
  { id: "p25-sky", n: 25, group: "Morning Town", title: "Sky things", priority: "later", kind: "items",
    camera: "Straight-on.",
    subject: "Things that float in the sky (the game paints the sky colour itself).",
    cells: [["cloud1", "a big puffy cloud with a warm morning tint on top"], ["cloud2", "a small round cloud"], ["cloud3", "a long flat cloud"], ["bird-1", "a small round robin flying, wings up"], ["bird-2", "the same robin, wings down"], ["sun", "a friendly soft-yellow sun disc with a glow halo (no face)"]],
    refs: ["concept"] },
  { id: "p26-worlds", n: 26, group: "Morning Town", title: "World cards (floating dioramas)", priority: "now", kind: "items",
    camera: "Elevated three-quarter view of small round floating diorama islands (grassy top, rounded earth edge underneath).",
    subject: "Six tiny storybook worlds, each a floating island with no text.",
    cells: [["world-morning", "Morning Town at 8 o'clock: houses, the library and the clock tower, golden morning light"], ["world-park", "Sunny Park at noon: trees, a picnic blanket, bright sun"], ["world-play", "Playtime Village at 3 o'clock: slides and swings"],
      ["world-sunset", "Sunset Town at 6 o'clock: houses with warm lit windows, orange light"], ["world-dream", "Dreamland at night: a cloud cottage, moon and stars"], ["world-key", "a bigger Morning Town island with a winding road, a little stone bridge and a stream (key art)"]],
    refs: ["concept", "p22-buildings"] },

  /* ---------------- 27–30 · things on the road */
  { id: "p27-collect", n: 27, group: "On the road", title: "Things to collect", priority: "now", kind: "items",
    camera: "Straight-on, slightly tilted.",
    subject: "Chunky glossy collectibles.",
    cells: [["star", "a golden five-point star with soft rounded points"], ["coin", "a thick golden coin with a raised star"], ["gift", "a purple gift box with a yellow bow"],
      ["token", "an adventure token badge: golden rim, sky-blue centre with a tiny clock and a delivery box"], ["pocketclock", "a small golden clock with tiny wings; BLANK face (no hands)"], ["acorn", "a shiny brown acorn"]],
    refs: ["concept"] },
  { id: "p28-balloons", n: 28, group: "On the road", title: "Clock balloons (blank faces)", priority: "now", kind: "items",
    camera: "Front view.",
    subject: "Round helium balloons shaped like alarm clocks: two little bells on top, glossy body, a clean BLANK white clock face with only 12 hour marks and NO hands (the game draws the time), a curly string.",
    cells: [["balloon-0", "pink"], ["balloon-1", "sky blue"], ["balloon-2", "yellow"], ["balloon-3", "mint"], ["balloon-4", "lavender"], ["balloon-5", "orange"]],
    refs: ["concept"], mustNot: ["clock hands or numbers on the faces"] },
  { id: "p29-obstacles", n: 29, group: "On the road", title: "Soft obstacles and road pieces", priority: "now", kind: "items",
    camera: CHASE.replace("Baby Mo and the bike face AWAY from the viewer, riding into the picture, ", ""),
    subject: "Friendly, soft-looking things on the road (nothing sharp or scary).",
    cells: [["log", "a short round log lying across the road, with a small leaf"], ["boxes", "a small stack of three cardboard boxes with star stickers"], ["blocks", "three chunky wooden toy blocks: red, yellow, blue"],
      ["puddle", "a shallow rounded puddle with sky reflections, flat on the road"], ["ramp", "a small wooden ramp with three white arrows"], ["boost", "a glowing rainbow strip on the road with three bright arrows"]],
    refs: ["concept"] },
  { id: "p30-arches", n: 30, group: "On the road", title: "Arches, tunnel and rings", priority: "now", kind: "items",
    camera: CHASE.replace("Baby Mo and the bike face AWAY from the viewer, riding into the picture, ", ""),
    subject: "Big things the bike rides through.",
    cells: [["pickup", "a green pickup arch over the road with a cream sign showing two books"], ["tunnel", "the entrance of a playful paper tunnel made of colourful paper strips and paper flowers, glowing inside"], ["paper-arch", "one colourful paper-strip arch (used repeatedly inside the tunnel)"],
      ["arch-start", "a start arch: two white posts with a garland of colourful triangle flags"], ["ring", "a big glowing rainbow ring standing upright"], ["rainbow", "a soft rainbow arc with a star at the top"]],
    refs: ["concept"] },

  /* ---------------- 31–33 · friends */
  { id: "p31-squirrel", n: 31, group: "Friends", title: "Squirrel friend", priority: "now", kind: "poses", baseline: true,
    camera: "Front three-quarter at the squirrel's eye level.",
    subject: "A small round orange-brown squirrel with a huge fluffy tail and big glossy eyes, cute, same 3D style as Baby Mo; and her tree home.",
    cells: [["squirrel", "idle, standing, smiling"], ["squirrel-sad", "a little worried, looking at the ground (lost her acorns)"], ["squirrel-happy", "hopping with joy"], ["squirrel-hug", "holding an acorn to her chest, hearts above"], ["squirrel-wave", "waving goodbye"], ["squirrel-home", "her tree home: a round green tree with a hole in the trunk"]],
    refs: ["concept", "p01-mo-ref"] },
  { id: "p32-librarian", n: 32, group: "Friends", title: "The librarian", priority: "now", kind: "poses", baseline: true,
    camera: "Front three-quarter, full body, eye level.",
    subject: "A kind young librarian woman in a soft blue hijab, a cream cardigan over a long lavender dress, round glasses; adult proportions about 1.9 × Baby Mo's height; same 3D style.",
    cells: [["librarian", "standing, smiling"], ["librarian-wave", "waving hello"], ["librarian-receive", "reaching out with both hands to receive books"], ["librarian-books", "hugging a stack of storybooks, delighted"], ["librarian-door", "standing in the open library doorway, door frame only"], ["librarian-read", "reading a storybook aloud"]],
    refs: ["concept"] },
  { id: "p33-friends", n: 33, group: "Friends", title: "More town friends", priority: "later", kind: "poses", baseline: true,
    camera: "Front three-quarter, full body.",
    subject: "Cute roadside friends in the same 3D style.",
    cells: [["rabbit", "a small round white rabbit, idle"], ["rabbit-happy", "the rabbit hopping happily"], ["bird", "a small round robin standing on a branch"],
      ["baker", "a friendly round baker uncle with a white apron and cap, holding a bread basket (adult, 1.9 × Baby Mo)"], ["baker-wave", "the baker waving"], ["postman", "a cheerful postman with a blue cap and a mail bag (adult, 1.9 × Baby Mo)"]],
    refs: ["concept"] },

  /* ---------------- 34–37 · screens and effects */
  { id: "p34-logo", n: 34, group: "Screens & effects", title: "Game logo", priority: "now", kind: "items", single: true,
    camera: "Straight-on.",
    subject: "The game logo: 'Baby Mo' in bubbly rounded 3D letters (sky blue and yellow) above 'Time Rush' in chunky orange-to-yellow 3D letters with a white outline and a small star, and a red ribbon banner underneath reading 'Adventure Delivery'. Text spelled exactly.",
    cells: [["logo", "the whole logo, centred, filling the canvas"]],
    refs: ["concept"], mustNot: ["misspelled text", "extra words"] },
  { id: "p35-icons", n: 35, group: "Screens & effects", title: "Menu and HUD icons", priority: "later", kind: "items",
    camera: "Straight-on.",
    subject: "Glossy rounded game icons in the same style as the app's yellow-ringed buttons.",
    cells: [["icon-clock", "a stopwatch-clock (blank face)"], ["icon-package", "a package box"], ["icon-map", "a map pin"], ["icon-bike", "a push balance bike (no pedals)"], ["icon-trophy", "a trophy"], ["icon-garage", "a little garage"]],
    refs: ["concept"] },
  { id: "p36-screens", n: 36, group: "Screens & effects", title: "Screen props", priority: "later", kind: "items",
    camera: "Front, slightly elevated.",
    subject: "Large props for the menus, each a separate cut-out.",
    cells: [["ui-clipboard", "a mission clipboard: cream paper on a wooden clipboard with a blue clip, empty"], ["ui-chest", "an open golden treasure chest bursting with stars"], ["ui-banner", "a red ribbon banner with three empty star slots above it, no text"],
      ["ui-turntable", "a round wooden turntable platform"], ["ui-wardrobe", "an open wardrobe with shelves of helmets and bags"], ["ui-library-door", "the library's wooden double door, wide open with warm light and bookshelves inside"]],
    refs: ["p22-buildings"] },
  { id: "p37-effects", n: 37, group: "Screens & effects", title: "Effects", priority: "later", kind: "items",
    camera: "Straight-on.",
    subject: "Single-frame effect sprites (the game animates them by scaling and fading).",
    cells: [["fx-sparkle", "a four-point white-gold sparkle"], ["fx-dust", "a soft cartoon dust puff"], ["fx-confetti", "a burst of colourful confetti and tiny stars"], ["fx-hearts", "three small pink hearts"], ["fx-splash", "a water splash crown"], ["fx-pop", "a balloon pop burst with confetti"]],
    refs: [] },

  /* ---------------- 38–43 · opponents: Baby Ais and Kak Adam race too (friendly, nobody loses) */
  { id: "p38-ais-ref", n: 38, group: "Opponents", title: "Baby Ais reference poses (with helmet over her hijab)", priority: "now", kind: "poses", baseline: true,
    camera: "Eye level, full body, every view at the same height on the same ground line.",
    subject: "Character reference sheet of Baby Ais wearing her riding helmet over her hijab, with her small lavender backpack.",
    cells: [["ais-ref-front", "standing, front view, arms relaxed, gentle smile"], ["ais-ref-34", "standing, three-quarter front view facing left"], ["ais-ref-side", "standing, pure side view facing left"],
      ["ais-ref-back", "standing, back view (hijab and backpack visible, no hair)"], ["ais-wave", "front view, waving with her right hand, big happy smile"], ["ais-bike", "standing next to her pink push balance bike, one hand on the handlebar"]],
    refs: ["ais-wave", "ais-run", "p01-mo-ref", "bike-approved"], ais: true, bike: true },
  { id: "p39-ais-ride", n: 39, group: "Opponents", title: "Baby Ais riding (6 rear frames)", priority: "now", kind: "anim", baseline: true,
    camera: "Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Baby Ais and the bike face AWAY from the viewer, riding into the picture, centred in each cell.",
    subject: "Baby Ais riding her pink push balance bike, pushing the ground with her feet like running and gliding — the same six-frame layout as the attached Baby Mo riding frames.",
    cells: [["f1", "turning a little left, left foot pushing the ground"], ["f2", "straight, both feet pushing wide"], ["f3", "turning a little right, head turned right (cheek visible)"], ["f4", "turning a little left, right foot pushing"], ["f5", "straight, feet close together, gliding"], ["f6", "turning a little right, feet pushing"]],
    clips: anim("ais-ride", 10, true), refs: ["mo-ride-approved", "p38-ais-ref", "bike-approved"], ais: true, bike: true },
  { id: "p40-adam-ref", n: 40, group: "Opponents", title: "Kak Adam reference poses (with helmet)", priority: "now", kind: "poses", baseline: true,
    camera: "Eye level, full body, every view at the same height on the same ground line.",
    subject: "Character reference sheet of Kak Adam wearing his sky-blue riding helmet and small navy backpack.",
    cells: [["adam-ref-front", "standing, front view, arms relaxed, confident smile"], ["adam-ref-34", "standing, three-quarter front view facing left"], ["adam-ref-side", "standing, pure side view facing left"],
      ["adam-ref-back", "standing, back view"], ["adam-wave", "front view, waving, big grin"], ["adam-bike", "standing next to his sky-blue push balance bike, thumbs up"]],
    refs: ["adam-wave", "p01-mo-ref", "bike-approved"], adam: true, bike: true },
  { id: "p41-adam-ride", n: 41, group: "Opponents", title: "Kak Adam riding (6 rear frames)", priority: "now", kind: "anim", baseline: true,
    camera: "Gameplay chase camera: seen from directly behind and slightly above (about 15° down); Kak Adam and the bike face AWAY from the viewer, riding into the picture, centred in each cell.",
    subject: "Kak Adam riding his sky-blue push balance bike, pushing the ground with his feet like running and gliding — the same six-frame layout as the attached Baby Mo riding frames, but he is a little taller.",
    cells: [["f1", "turning a little left, left foot pushing the ground"], ["f2", "straight, both feet pushing wide"], ["f3", "turning a little right, head turned right (cheek visible)"], ["f4", "turning a little left, right foot pushing"], ["f5", "straight, feet close together, gliding"], ["f6", "turning a little right, feet pushing"]],
    clips: anim("adam-ride", 10, true), refs: ["mo-ride-approved", "p40-adam-ref", "bike-approved"], adam: true, bike: true },
  { id: "p42-race-moments", n: 42, group: "Opponents", title: "Friendly race moments", priority: "later", kind: "poses", baseline: true,
    camera: "Each cell states its own angle; same scale everywhere.",
    subject: "Baby Ais and Kak Adam on their push balance bikes, friendly and encouraging (nobody is sad about losing).",
    cells: [["ais-pass", "Baby Ais from behind-left, overtaking, looking back with a playful smile"], ["ais-cheer-ride", "Baby Ais from behind, one hand up cheering while gliding"], ["ais-finish", "Baby Ais standing next to her bike, clapping happily (front view)"],
      ["adam-pass", "Kak Adam from behind-right, overtaking, giving a thumbs up"], ["adam-cheer-ride", "Kak Adam from behind, one fist up while gliding"], ["adam-finish", "Kak Adam standing next to his bike, high-five pose (front view)"]],
    refs: ["p38-ais-ref", "p40-adam-ref", "mo-ride-approved"], ais: true, adam: true, bike: true },
  { id: "p43-race-props", n: 43, group: "Opponents", title: "Race props", priority: "later", kind: "items",
    camera: "Three-quarter front.",
    subject: "Friendly race-day props in the same style (no text).",
    cells: [["race-finish", "a finish arch with a checkered banner and colourful flags"], ["race-start-light", "a cute start light on a post with three round lights (red, yellow, green)"], ["race-flag", "a small checkered flag on a stick"],
      ["race-podium", "a three-step podium with stars instead of numbers"], ["race-medal", "a golden medal with a star on a ribbon"], ["race-cones", "two soft orange traffic cones with smiley stripes"]],
    refs: ["concept"] },
];

/** what is already in the game (owner-approved art, app-ayah library, or drawn by the game) */
const STATUS: Record<string, [Pack["status"], string, Pack["priority"]?]> = {
  "p01-mo-ref": ["done", "your turnaround, waving and back poses (art-src/rush/)"],
  "p02-bike-ref": ["done", "your bike side view and 4 views; colours are recoloured from it"],
  "p03-ride-key": ["covered", "your 6 rear riding frames + the side bike art cover the key poses", "later"],
  "p04-ride": ["done", "your 6 rear riding frames — the in-game rider"],
  "p05-push": ["covered", "the 6 rear frames alternate as push strides", "later"],
  "p06-lean": ["covered", "frames 1/4 (left) and 3/6 (right) of your sheet + game lean", "later"],
  "p10-carry": ["covered", "same frames; the game flies the books into the backpack", "later"],
  "p12-idle": ["covered", "frame 5 of your sheet + breathing", "later"],
  "p14-faces": ["covered", "face cut from your turnaround", "later"],
  "p17-bike-colors": ["done", "recoloured from your bike art"],
  "p07-jump": ["done", "your jump sheet (frame 4, legs splayed, left out)"],
  "p08-boost": ["done", "your boost sheet"],
  "p09-pickup": ["done", "your package-catch sheet"],
  "p11-wobble": ["done", "your bump sheet (frame 3, over-stretched leg, left out; the toy block removed)"],
  "p15-celebrate": ["done", "your celebration sheet (Delivered screen)"],
  "p29-obstacles": ["done", "your log, boxes, blocks, puddle, ramp and boost pad"],
  "p18-bags": ["covered", "the backpack is part of your riding frames", "later"],
  "p19-packages": ["covered", "app-ayah MoColorAndDraw book stack (storybooks)", "later"],
  "p21-bike-extras": ["covered", "later polish", "later"],
  "p23-trees": ["covered", "drawn by the game", "later"],
  "p24-roadside": ["covered", "app-ayah village pieces + game drawings", "later"],
  "p25-sky": ["covered", "the game paints sky, sun and clouds", "later"],
  "p26-worlds": ["covered", "app-ayah NurConnect scene backgrounds", "later"],
  "p27-collect": ["covered", "app-ayah star, coin, gift, carrot, badge", "later"],
  "p31-squirrel": ["covered", "replaced by the app-ayah bunny (carrot quest)", "later"],
  "p33-friends": ["covered", "app-ayah pets cheer along the road", "later"],
  "p35-icons": ["covered", "app-ayah UI icons", "later"],
  "p36-screens": ["covered", "app-ayah chest, trophy, ribbons, cards", "later"],
  "p37-effects": ["covered", "game particles + app-ayah effects", "later"],
};
/** the few images still worth making for Morning Town; everything else waits */
const NOW = new Set(["p07-jump", "p08-boost", "p09-pickup", "p11-wobble", "p15-celebrate", "p29-obstacles", "p38-ais-ref", "p39-ais-ride", "p40-adam-ref", "p41-adam-ride"]);
for (const p of PACKS) if (!STATUS[p.id]) p.priority = NOW.has(p.id) ? "now" : "later";
for (const p of PACKS) { const s = STATUS[p.id]; if (s) { p.status = s[0]; p.note = s[1]; if (s[2]) p.priority = s[2]; } }

export const GROUPS = [...new Set(PACKS.map((p) => p.group))];
export const packById = (id: string) => PACKS.find((p) => p.id === id);
