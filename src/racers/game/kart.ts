/**
 * Procedural clay karts + TEMPORARY driver figures.
 * The karts follow the concept art (rounded body, big wheels, emblem on the
 * nose, spoiler). The drivers are placeholders made from simple shapes in each
 * character's colours (Mo: dark messy hair, green suit with orange sleeves;
 * Ais: pink hijab; Adam: fluffy brown hair, blue hoodie, optional white peci).
 * Replace them with GLB models later via `driverFactory` (docs/RACERS-ASSETS.md).
 */
import type { Scene } from "@babylonjs/core/scene";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { clay, emblemTexture, texturedMat } from "./look";
import type { KartDef, RacerDef } from "../content/racers";

export interface KartModel {
  root: TransformNode; // positioned/rotated by the race
  body: TransformNode; // leans and bounces
  wheels: Mesh[];
  frontWheels: TransformNode[];
  driver: TransformNode;
  arms: TransformNode;
  head: TransformNode;
  exhaust: TransformNode;
  meshes: Mesh[];
  setPaint: (color: string) => void;
  dispose: () => void;
}

export function buildKart(scene: Scene, kart: KartDef, racer: RacerDef | null, paint?: string): KartModel {
  const root = new TransformNode("kart-" + kart.id, scene);
  const body = new TransformNode("kartBody", scene);
  body.parent = root;
  const meshes: Mesh[] = [];
  const own = (m: Mesh, parent: TransformNode = body) => {
    m.parent = parent;
    m.isPickable = false;
    meshes.push(m);
    return m;
  };
  const bodyMat = clay(scene, paint ?? kart.body, { glow: 0.16, shine: 0.35 });
  let paintMeshes: Mesh[] = [];
  const trim = clay(scene, kart.trim, { glow: 0.2, shine: 0.3 });
  const dark = clay(scene, "#2c3340", { glow: 0.05, shine: 0.25 });

  // chassis: a long rounded tub + nose + side pods
  const tub = own(MeshBuilder.CreateCapsule("tub", { radius: 0.62, height: 2.9, tessellation: 14, capSubdivisions: 4, orientation: new Vector3(0, 0, 1) }, scene));
  tub.scaling.set(1.25, 0.62, 1);
  tub.position.set(0, 0.55, 0.05);
  tub.material = bodyMat;
  const nose = own(MeshBuilder.CreateSphere("nose", { diameter: 1.25, segments: 12 }, scene));
  nose.scaling.set(1.2, 0.62, 0.9);
  nose.position.set(0, 0.5, 1.25);
  nose.material = bodyMat;
  for (const side of [-1, 1]) {
    const pod = own(MeshBuilder.CreateCapsule("pod", { radius: 0.3, height: 1.7, tessellation: 10, capSubdivisions: 3, orientation: new Vector3(0, 0, 1) }, scene));
    pod.position.set(side * 0.86, 0.42, 0);
    pod.material = trim;
  }
  paintMeshes = [tub, nose];
  // front bumper
  const bumper = own(MeshBuilder.CreateCapsule("bumper", { radius: 0.17, height: 2.0, tessellation: 10, orientation: new Vector3(1, 0, 0) }, scene));
  bumper.position.set(0, 0.32, 1.78);
  bumper.material = trim;
  // seat back + steering column
  const seat = own(MeshBuilder.CreateBox("seat", { width: 0.9, height: 0.8, depth: 0.22 }, scene));
  seat.position.set(0, 0.95, -0.55);
  seat.rotation.x = -0.18;
  seat.material = dark;
  const wheelCol = own(MeshBuilder.CreateCylinder("col", { height: 0.7, diameter: 0.1 }, scene));
  wheelCol.position.set(0, 0.95, 0.55);
  wheelCol.rotation.x = 0.9;
  wheelCol.material = dark;
  const steer = own(MeshBuilder.CreateTorus("steer", { diameter: 0.5, thickness: 0.09, tessellation: 18 }, scene));
  steer.position.set(0, 1.15, 0.33);
  steer.rotation.x = -0.9;
  steer.material = dark;
  // spoiler
  const wing = own(MeshBuilder.CreateBox("wing", { width: 1.9, height: 0.12, depth: 0.5 }, scene));
  wing.position.set(0, 1.25, -1.35);
  wing.material = trim;
  for (const side of [-0.6, 0.6]) {
    const strut = own(MeshBuilder.CreateBox("strut", { width: 0.1, height: 0.55, depth: 0.25 }, scene));
    strut.position.set(side, 0.98, -1.3);
    strut.material = dark;
  }
  // emblem on the nose (white star / moon / shield)
  const emb = own(MeshBuilder.CreatePlane("emblem", { size: 0.62 }, scene));
  emb.position.set(0, 0.86, 1.2);
  emb.rotation.x = Math.PI / 2 - 0.5;
  emb.material = texturedMat(scene, "emblemMat-" + kart.emblem + kart.trim, emblemTexture(scene, kart.emblem, kart.trim === "#ffffff" ? "#2f6fe0" : kart.trim), { unlit: true, alpha: true });
  // exhaust pipes
  const exhaust = new TransformNode("exhaust", scene);
  exhaust.parent = body;
  exhaust.position.set(0, 0.5, -1.62);
  for (const side of [-0.32, 0.32]) {
    const pipe = own(MeshBuilder.CreateCylinder("pipe", { height: 0.4, diameter: 0.2, tessellation: 10 }, scene), exhaust);
    pipe.rotation.x = Math.PI / 2;
    pipe.position.set(side, 0, 0);
    pipe.material = clay(scene, "#c9ced8", { shine: 0.6 });
  }
  // wheels: chunky tyres + coloured hubs
  const wheels: Mesh[] = [];
  const frontWheels: TransformNode[] = [];
  for (const [x, z, r] of [[-0.98, 1.05, 0.38], [0.98, 1.05, 0.38], [-1.02, -1.0, 0.46], [1.02, -1.0, 0.46]] as const) {
    const holder = new TransformNode("wheelHolder", scene);
    holder.parent = root;
    holder.position.set(x, r, z);
    const tyre = own(MeshBuilder.CreateCylinder("tyre", { height: 0.42, diameter: r * 2, tessellation: 18 }, scene), holder);
    tyre.rotation.z = Math.PI / 2;
    tyre.material = dark;
    const hub = own(MeshBuilder.CreateCylinder("hub", { height: 0.44, diameter: r * 1.0, tessellation: 12 }, scene), tyre);
    hub.material = trim;
    wheels.push(tyre);
    if (z > 0) frontWheels.push(holder);
  }

  // ---- driver (placeholder)
  const driver = new TransformNode("driver", scene);
  driver.parent = body;
  driver.position.set(0, 0.85, -0.25);
  const arms = new TransformNode("arms", scene);
  arms.parent = driver;
  const head = new TransformNode("head", scene);
  head.parent = driver;
  head.position.set(0, 1.0, 0.05);
  if (racer) buildDriver(scene, racer, driver, head, arms, own);

  return {
    root, body, wheels, frontWheels, driver, arms, head, exhaust, meshes,
    setPaint: (color) => {
      const m = clay(scene, color, { glow: 0.16, shine: 0.35 });
      paintMeshes.forEach((p) => (p.material = m));
    },
    dispose: () => root.dispose(false, false),
  };
}

function buildDriver(scene: Scene, r: RacerDef, driver: TransformNode, head: TransformNode, arms: TransformNode, own: (m: Mesh, p?: TransformNode) => Mesh) {
  const skin = clay(scene, r.skin, { glow: 0.22 });
  const outfit = clay(scene, r.outfit, { glow: 0.15 });
  const sleeves = clay(scene, r.sleeves, { glow: 0.15 });
  const hair = clay(scene, r.hair, { glow: 0.06, shine: 0.3 });
  // torso
  const torso = own(MeshBuilder.CreateCapsule("torso", { radius: 0.36, height: 0.95, tessellation: 12 }, scene), driver);
  torso.position.y = 0.38;
  torso.material = outfit;
  // chest emblem (star / moon / star) as a tiny disc
  const badge = own(MeshBuilder.CreateDisc("badge", { radius: 0.13, tessellation: 5 }, scene), driver);
  badge.position.set(0, 0.48, 0.36);
  badge.material = clay(scene, r.id === "ais" ? "#ffffff" : "#e8ece9", { glow: 0.4 });
  badge.rotation.y = Math.PI;
  // arms reaching for the wheel
  for (const side of [-1, 1]) {
    const arm = own(MeshBuilder.CreateCapsule("arm", { radius: 0.11, height: 0.62, tessellation: 8 }, scene), arms);
    arm.position.set(side * 0.3, 0.55, 0.32);
    arm.rotation.x = 1.1;
    arm.rotation.z = -side * 0.35;
    arm.material = sleeves;
    const hand = own(MeshBuilder.CreateSphere("hand", { diameter: 0.18, segments: 6 }, scene), arms);
    hand.position.set(side * 0.2, 0.42, 0.58);
    hand.material = skin;
  }
  // big toddler head
  const skull = own(MeshBuilder.CreateSphere("skull", { diameter: 0.98, segments: 16 }, scene), head);
  skull.material = skin;
  // face (seen in the garage / replays): eyes, highlights, cheeks
  for (const side of [-1, 1]) {
    const eye = own(MeshBuilder.CreateSphere("eye", { diameter: 0.17, segments: 8 }, scene), head);
    eye.position.set(side * 0.17, 0.03, 0.43);
    eye.scaling.y = 1.15;
    eye.material = clay(scene, "#3a2418", { glow: 0, shine: 0.9 });
    const hi = own(MeshBuilder.CreateSphere("eyehi", { diameter: 0.05, segments: 4 }, scene), head);
    hi.position.set(side * 0.17 + 0.03, 0.07, 0.5);
    hi.material = clay(scene, "#ffffff", { glow: 1 });
    const cheek = own(MeshBuilder.CreateDisc("cheek", { radius: 0.08, tessellation: 12 }, scene), head);
    cheek.position.set(side * 0.27, -0.12, 0.4);
    cheek.rotation.y = Math.PI + side * 0.5;
    cheek.material = clay(scene, "#ff9e9e", { glow: 0.4, alpha: 0.75 });
  }
  if (r.headwear === "hijab") {
    // pink hijab wrapping the head, lavender band, light-blue star clip
    const hj = own(MeshBuilder.CreateSphere("hijab", { diameter: 1.12, segments: 16, slice: 0.78 }, scene), head);
    hj.rotation.x = -Math.PI / 2 + 0.35;
    hj.position.set(0, 0.02, -0.04);
    hj.material = clay(scene, "#ff8fbf", { glow: 0.18 });
    const drape = own(MeshBuilder.CreateCylinder("drape", { height: 0.5, diameterTop: 0.8, diameterBottom: 1.05, tessellation: 16 }, scene), head);
    drape.position.set(0, -0.48, -0.02);
    drape.material = clay(scene, "#ff8fbf", { glow: 0.18 });
    const band = own(MeshBuilder.CreateTorus("band", { diameter: 0.98, thickness: 0.07, tessellation: 24 }, scene), head);
    band.rotation.x = Math.PI / 2 - 0.35;
    band.position.set(0, 0.18, 0.1);
    band.material = clay(scene, "#c9b3ff", { glow: 0.2 });
    const clip = own(MeshBuilder.CreateSphere("clip", { diameter: 0.15, segments: 6 }, scene), head);
    clip.position.set(0.32, 0.36, 0.3);
    clip.material = clay(scene, "#8fd0ff", { glow: 0.4 });
  } else {
    // hair: a cap plus tufts (Mo spiky & dark, Adam fluffy & brown)
    const cap = own(MeshBuilder.CreateSphere("hair", { diameter: 1.04, segments: 14, slice: 0.55 }, scene), head);
    cap.rotation.x = -0.35;
    cap.position.set(0, 0.06, -0.04);
    cap.material = hair;
    const tufts = r.id === "adam" ? 9 : 7;
    for (let i = 0; i < tufts; i++) {
      const a = (i / tufts) * Math.PI * 2;
      const tuft = own(MeshBuilder.CreateSphere("tuft", { diameter: r.id === "adam" ? 0.36 : 0.28, segments: 6 }, scene), head);
      tuft.position.set(Math.cos(a) * 0.36, 0.36 + Math.sin(a * 2) * 0.05, Math.sin(a) * 0.36 - 0.06);
      if (r.id === "mo") tuft.scaling.set(0.8, 1.3, 0.8);
      tuft.material = hair;
    }
    const fringe = own(MeshBuilder.CreateSphere("fringe", { diameter: 0.42, segments: 6 }, scene), head);
    fringe.position.set(0.12, 0.33, 0.3);
    fringe.scaling.set(1.4, 0.6, 0.7);
    fringe.material = hair;
    if (r.headwear === "peci") {
      const peci = own(MeshBuilder.CreateCylinder("peci", { height: 0.26, diameter: 0.8, tessellation: 20 }, scene), head);
      peci.position.y = 0.48;
      peci.material = clay(scene, "#ffffff", { glow: 0.3 });
    }
  }
}

/** Per-frame kart animation from race state: wheel spin, steering, lean, bounce, cheer. */
export function animateKart(m: KartModel, speed: number, steer: number, t: number, boosting: boolean, cheer: number) {
  const spin = speed * 0.045;
  m.wheels.forEach((w) => (w.rotation.x += spin));
  m.frontWheels.forEach((f) => (f.rotation.y = -steer * 0.45));
  m.body.rotation.z = steer * 0.06 * Math.min(1, speed / 15);
  m.body.position.y = Math.sin(t * 18) * 0.02 * Math.min(1, speed / 10) + (boosting ? 0.04 : 0);
  m.body.rotation.x = boosting ? -0.04 : 0;
  m.head.rotation.z = steer * 0.18;
  m.head.position.y = 1.0 + Math.sin(t * 9) * 0.015;
  // cheer: arms up and a little hop
  m.arms.rotation.x = -cheer * 2.2;
  m.driver.position.y = 0.85 + Math.abs(Math.sin(t * 8)) * 0.18 * cheer;
}
