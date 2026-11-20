/**
 * Builds a race environment around a Track: road ribbon, chevron curbs,
 * barriers, start/finish arch, question gates, scenery (trees, houses with
 * clocks, the clock tower, hills, flowers, clouds) and collectible stars.
 * Static meshes are merged / thin-instanced and frozen to keep draw calls low.
 */
import type { Scene } from "@babylonjs/core/scene";
import { Vector3, Matrix, Quaternion } from "@babylonjs/core/Maths/math.vector";
import { Color3 } from "@babylonjs/core/Maths/math.color";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import { VertexData } from "@babylonjs/core/Meshes/mesh.vertexData";
import type { InstancedMesh } from "@babylonjs/core/Meshes/instancedMesh";
import type { DynamicTexture } from "@babylonjs/core/Materials/Textures/dynamicTexture";
import "@babylonjs/core/Meshes/thinInstanceMesh";
import "@babylonjs/core/Meshes/instancedMesh";
import { Track } from "../core/track";
import type { Gate, Pickup } from "../core/race";
import { canvasTex, checkerTexture, clay, curbTexture, drawClockFace, grassTexture, roadTexture, signTexture, skyTexture, texturedMat } from "./look";
import { seeded } from "../../engine/rng";

export type Theme = "clock-town" | "day-valley";
export interface Quality { level: "low" | "medium" | "high"; scenery: number; shadows: boolean; particles: number; scale: number }

export interface World {
  root: TransformNode;
  pickups: { mesh: InstancedMesh; p: Pickup }[];
  gateMeshes: Map<number, TransformNode>;
  towerClock: { tex: DynamicTexture; set: (t: number) => void } | null;
  shadowCasters: Mesh[];
  setGateLabels?: (gate: number, labels: string[], colors: string[]) => void;
  update: (time: number) => void;
}

const THEMES: Record<Theme, { grass: string; sky: [string, string]; fog: string; hills: string[]; houses: string[]; roofs: string[]; barrier: string[] }> = {
  "clock-town": { grass: "#86d66f", sky: ["#7fcaff", "#e9f7ff"], fog: "#dff2ff", hills: ["#8fd884", "#76c66a", "#a6e08e"], houses: ["#fff1d6", "#ffe3ec", "#e6f6ff", "#fff8ec", "#efe6ff"], roofs: ["#ff8a5c", "#6cc4ff", "#b8a5ff", "#ffd23f", "#3cb55e"], barrier: ["#6cc4ff", "#ffd23f", "#ff8f7a", "#b8a5ff"] },
  "day-valley": { grass: "#9be07c", sky: ["#a7d8ff", "#fff3dc"], fog: "#fff0de", hills: ["#b6e48c", "#8fd06e", "#d4ec9a"], houses: ["#fff8ec", "#ffe9cf"], roofs: ["#ff9fbd", "#ffb547", "#7fd36d"], barrier: ["#ff8f7a", "#ffb547", "#ffd23f", "#7fd36d", "#6cc4ff", "#b8a5ff", "#ff9fbd"] },
};
export const DAY_COLORS = ["#ff8f7a", "#ffb547", "#ffd23f", "#7fd36d", "#6cc4ff", "#b8a5ff", "#ff9fbd"];

function star5(scene: Scene, name: string, R = 0.7, r = 0.32, depth = 0.25): Mesh {
  // a chunky 5-point star prism built by hand (no earcut dependency)
  const pos: number[] = [], idx: number[] = [], nrm: number[] = [];
  const outline: [number, number][] = [];
  for (let i = 0; i < 10; i++) {
    const a = Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r : R;
    outline.push([Math.cos(a) * rr, Math.sin(a) * rr]);
  }
  const d = depth / 2;
  // front & back fans around the centre
  for (const z of [d, -d]) {
    const c = pos.length / 3;
    pos.push(0, 0, z);
    for (const [x, y] of outline) pos.push(x, y, z * 0.55);
    for (let i = 0; i < 10; i++) {
      const a = c + 1 + i, b = c + 1 + ((i + 1) % 10);
      if (z > 0) idx.push(c, a, b);
      else idx.push(c, b, a);
    }
  }
  // sides
  for (let i = 0; i < 10; i++) {
    const [x1, y1] = outline[i], [x2, y2] = outline[(i + 1) % 10];
    const c = pos.length / 3;
    pos.push(x1, y1, d * 0.55, x2, y2, d * 0.55, x2, y2, -d * 0.55, x1, y1, -d * 0.55);
    idx.push(c, c + 2, c + 1, c, c + 3, c + 2);
  }
  VertexData.ComputeNormals(pos, idx, nrm);
  const vd = new VertexData();
  vd.positions = pos;
  vd.indices = idx;
  vd.normals = nrm;
  const m = new Mesh(name, scene);
  vd.applyToMesh(m);
  return m;
}

export function buildWorld(scene: Scene, track: Track, theme: Theme, q: Quality, gates: Gate[], pickups: Pickup[]): World {
  const T = THEMES[theme];
  const root = new TransformNode("world", scene);
  const rng = seeded("world-" + theme);
  const statics: Mesh[] = [];
  const casters: Mesh[] = [];

  // ---- sky dome + fog
  const sky = MeshBuilder.CreateSphere("sky", { diameter: 1400, segments: 16, sideOrientation: Mesh.BACKSIDE }, scene);
  sky.material = texturedMat(scene, "skyMat", skyTexture(scene, T.sky[0], T.sky[1]), { unlit: true });
  sky.infiniteDistance = true;
  sky.isPickable = false;
  scene.fogMode = 2; // EXP2
  scene.fogDensity = 0.0032;
  scene.fogColor = Color3.FromHexString(T.fog);

  // ---- ground
  const cx = track.samples.reduce((a, p) => a + p.x, 0) / track.samples.length;
  const cz = track.samples.reduce((a, p) => a + p.z, 0) / track.samples.length;
  const ground = MeshBuilder.CreateGround("ground", { width: 900, height: 900, subdivisions: 2 }, scene);
  ground.position.set(cx, 0, cz);
  ground.material = texturedMat(scene, "grassMat", grassTexture(scene, T.grass), { glow: 0.18 });
  ground.receiveShadows = true;
  statics.push(ground);

  // ---- road ribbon (+ y lift to avoid z-fighting)
  const N = track.samples.length;
  const edge = (lat: number, y: number) => {
    const pts: Vector3[] = [];
    for (let i = 0; i <= N; i++) {
      const p = track.samples[i % N];
      pts.push(new Vector3(p.x + p.nx * lat, y, p.z + p.nz * lat));
    }
    return pts;
  };
  const road = MeshBuilder.CreateRibbon("road", { pathArray: [edge(-track.half, 0.03), edge(track.half, 0.03)], sideOrientation: Mesh.DOUBLESIDE }, scene);
  const rt = roadTexture(scene);
  rt.uScale = 1;
  rt.vScale = track.length / 9; // a dash every 9 m (ribbon v runs along the path)
  const roadMat = texturedMat(scene, "roadMat", rt, { glow: 0.16 });
  road.material = roadMat;
  road.receiveShadows = true;
  statics.push(road);
  // curbs
  for (const side of [-1, 1]) {
    const inner = side * track.half, outer = side * (track.half + 1.3);
    const curb = MeshBuilder.CreateRibbon("curb" + side, { pathArray: side > 0 ? [edge(inner, 0.06), edge(outer, 0.1)] : [edge(outer, 0.1), edge(inner, 0.06)], sideOrientation: Mesh.DOUBLESIDE }, scene);
    const ct = curbTexture(scene);
    ct.vScale = track.length / 3;
    curb.material = texturedMat(scene, "curbMat" + side, ct, { glow: 0.2 });
    statics.push(curb);
  }
  // barriers: little rounded blocks along both sides (thin instances, 1 draw call)
  const block = MeshBuilder.CreateCapsule("barrier", { height: 1.9, radius: 0.42, tessellation: 8, capSubdivisions: 2, orientation: new Vector3(1, 0, 0) }, scene);
  block.material = clay(scene, "#ffffff", { glow: 0.2 });
  const colors: number[] = [];
  const mats: number[] = [];
  const every = 2.4;
  for (let s = 0; s < track.length; s += every) {
    for (const side of [-1, 1]) {
      // skip barriers near the start arch
      if (s < 6 || s > track.length - 6) continue;
      const w = track.world(s, side * (track.half + 1.9));
      const m = Matrix.Compose(new Vector3(1, 1, 1), Quaternion.FromEulerAngles(0, w.yaw + Math.PI / 2, 0), new Vector3(w.x, 0.42, w.z));
      m.copyToArray(mats, mats.length);
      const c = Color3.FromHexString(T.barrier[Math.floor(s / every) % T.barrier.length]);
      colors.push(c.r, c.g, c.b, 1);
    }
  }
  block.thinInstanceSetBuffer("matrix", new Float32Array(mats), 16);
  block.thinInstanceSetBuffer("color", new Float32Array(colors), 4);
  statics.push(block);

  // ---- start / finish: checkered strip + arch with banner
  const line = MeshBuilder.CreateGround("startline", { width: track.def.width, height: 2.2 }, scene);
  const sp = track.world(0, 0);
  line.position.set(sp.x, 0.05, sp.z);
  line.rotation.y = sp.yaw;
  line.material = texturedMat(scene, "checkerMat", checkerTexture(scene), { glow: 0.2 });
  statics.push(line);
  const arch = arch3(scene, "startArch", track, 0, 4.6, "#ff8a5c", signTexture(scene, theme === "clock-town" ? "CLOCK TOWN" : "DAY WEEK VALLEY", "#3cb55e", "#fff", 1024, 160));
  arch.parent = root;

  // ---- question gates
  const gateMeshes = new Map<number, TransformNode>();
  const firstLapGates = gates.filter((g) => g.s < track.length);
  const gateLabelers: ((labels: string[], colors: string[]) => void)[] = [];
  firstLapGates.forEach((g, i) => {
    if (g.kind === "question") {
      const qTex = canvasTex(scene, "qsign" + i, 256, 256, (c, w) => {
        c.fillStyle = "#ffd23f"; c.beginPath(); c.arc(w / 2, w / 2, w / 2 - 6, 0, Math.PI * 2); c.fill();
        c.lineWidth = 10; c.strokeStyle = "#fff"; c.stroke();
        c.fillStyle = "#4a3500"; c.font = "700 170px Fredoka, sans-serif"; c.textAlign = "center"; c.textBaseline = "middle";
        c.fillText("?", w / 2, w / 2 + 8);
      }, { alpha: true });
      const a = arch3(scene, "gate" + i, track, g.s, 4.4, "#ffd23f", qTex, true);
      a.parent = root;
      gateMeshes.set(i, a);
    } else {
      // three lane gates across the road (answer by driving through one)
      const node = new TransformNode("lanegates" + i, scene);
      node.parent = root;
      const labelMats: { tex: DynamicTexture }[] = [];
      for (let l = 0; l < 3; l++) {
        const lat = (1 - l) * (track.half * 0.62);
        const w = track.world(g.s, lat);
        const post = (dl: number) => {
          const pw = track.world(g.s, lat + dl);
          const pole = MeshBuilder.CreateCylinder("lp", { height: 4.2, diameter: 0.4 }, scene);
          pole.position.set(pw.x, 2.1, pw.z);
          pole.material = clay(scene, "#ffffff");
          pole.parent = node;
        };
        post(1.7);
        post(-1.7);
        const tex = canvasTex(scene, "lane" + i + "-" + l, 512, 160, () => {}, { alpha: true });
        const sign = MeshBuilder.CreatePlane("lanesign", { width: 4.0, height: 1.25, sideOrientation: Mesh.DOUBLESIDE }, scene);
        sign.position.set(w.x, 4.0, w.z);
        sign.rotation.y = w.yaw;
        sign.material = texturedMat(scene, "lanesignMat" + i + l, tex, { unlit: true, alpha: true });
        sign.parent = node;
        labelMats.push({ tex });
      }
      gateLabelers[i] = (labels, colors) => {
        labelMats.forEach((m, l) => {
          const c = m.tex.getContext() as unknown as CanvasRenderingContext2D;
          const src = signTexture(scene, labels[l] ?? "", colors[l] ?? "#3cb55e");
          c.clearRect(0, 0, 512, 160);
          c.drawImage((src.getContext() as unknown as CanvasRenderingContext2D).canvas, 0, 0);
          m.tex.update();
          src.dispose();
        });
      };
      gateMeshes.set(i, node);
    }
  });

  // ---- clock tower beside the main straight
  let towerClock: World["towerClock"] = null;
  {
    const s = track.length * 0.93;
    const w = track.world(s, track.half + 9);
    const tower = new TransformNode("tower", scene);
    tower.position.set(w.x, 0, w.z);
    tower.rotation.y = w.yaw - Math.PI / 2;
    tower.parent = root;
    const body = MeshBuilder.CreateBox("towerBody", { width: 5, depth: 5, height: 14 }, scene);
    body.position.y = 7;
    body.material = clay(scene, "#ffe3b8");
    body.parent = tower;
    const band = MeshBuilder.CreateBox("towerBand", { width: 5.6, depth: 5.6, height: 1 }, scene);
    band.position.y = 14;
    band.material = clay(scene, "#ffb547");
    band.parent = tower;
    const roof = MeshBuilder.CreateCylinder("towerRoof", { diameterTop: 0, diameterBottom: 7.4, height: 5, tessellation: 4 }, scene);
    roof.position.y = 17;
    roof.rotation.y = Math.PI / 4;
    roof.material = clay(scene, "#3cb55e");
    roof.parent = tower;
    const ball = MeshBuilder.CreateSphere("towerBall", { diameter: 1, segments: 8 }, scene);
    ball.position.y = 19.8;
    ball.material = clay(scene, "#ffd23f", { glow: 0.4 });
    ball.parent = tower;
    const tex = canvasTex(scene, "towerClock", 256, 256, (c) => drawClockFace(c, 256, 120));
    const face = MeshBuilder.CreateDisc("towerFace", { radius: 2.1, tessellation: 40, sideOrientation: Mesh.DOUBLESIDE }, scene);
    face.position.set(0, 10, -2.56);
    face.material = texturedMat(scene, "towerFaceMat", tex, { glow: 0.5 });
    face.parent = tower;
    const face2 = face.clone("towerFace2");
    face2.position.set(-2.56, 10, 0);
    face2.rotation.y = Math.PI / 2;
    face2.parent = tower;
    const door = MeshBuilder.CreateBox("towerDoor", { width: 1.6, height: 2.6, depth: 0.2 }, scene);
    door.position.set(0, 1.3, -2.55);
    door.material = clay(scene, "#a86b3c");
    door.parent = tower;
    casters.push(body);
    towerClock = {
      tex,
      set: (t) => {
        drawClockFace(tex.getContext() as unknown as CanvasRenderingContext2D, 256, t);
        tex.update();
      },
    };
  }

  // ---- scenery: trees, houses, hills, flowers, clouds
  const placeFree = (minD: number, maxD: number, tries = 40): { x: number; z: number } | null => {
    for (let k = 0; k < tries; k++) {
      const s = rng() * track.length;
      const side = rng() > 0.5 ? 1 : -1;
      const dist = track.half + minD + rng() * (maxD - minD);
      const w = track.world(s, side * dist);
      if (track.nearest(w.x, w.z).d > track.half + minD - 0.5) return w;
    }
    return null;
  };
  const density = q.scenery;
  // trees (trunk + 3 canopy balls), two thin-instanced meshes
  const trunk = MeshBuilder.CreateCylinder("trunk", { height: 2.2, diameterTop: 0.5, diameterBottom: 0.75, tessellation: 7 }, scene);
  trunk.material = clay(scene, "#a86b3c");
  const canopy = MeshBuilder.CreateSphere("canopy", { diameter: 3, segments: 8 }, scene);
  canopy.material = clay(scene, "#ffffff", { glow: 0.18 });
  const tm: number[] = [], cm: number[] = [], cc: number[] = [];
  const leaf = ["#5cc06a", "#47a958", "#7fd36d", "#3fa660", "#9be07c"];
  const trees = Math.round(140 * density);
  for (let i = 0; i < trees; i++) {
    const w = i < trees * 0.7 ? placeFree(5, 26) : placeFree(26, 120);
    if (!w) continue;
    const sc = 0.8 + rng() * 0.9;
    Matrix.Compose(new Vector3(sc, sc, sc), Quaternion.Identity(), new Vector3(w.x, 1.1 * sc, w.z)).copyToArray(tm, tm.length);
    const col = Color3.FromHexString(leaf[i % leaf.length]);
    for (const [dx, dy, dz, s2] of [[0, 2.9, 0, 1.15], [-0.9, 2.2, 0.3, 0.85], [0.85, 2.3, -0.3, 0.8]]) {
      Matrix.Compose(new Vector3(sc * s2, sc * s2 * 0.92, sc * s2), Quaternion.Identity(), new Vector3(w.x + dx * sc, dy * sc, w.z + dz * sc)).copyToArray(cm, cm.length);
      cc.push(col.r, col.g, col.b, 1);
    }
  }
  trunk.thinInstanceSetBuffer("matrix", new Float32Array(tm), 16);
  canopy.thinInstanceSetBuffer("matrix", new Float32Array(cm), 16);
  canopy.thinInstanceSetBuffer("color", new Float32Array(cc), 4);
  statics.push(trunk, canopy);
  casters.push(canopy);

  // houses: merged per house, some with clock faces
  const houses = Math.round(16 * density) + 4;
  const clockTexes: DynamicTexture[] = [];
  for (let i = 0; i < houses; i++) {
    const w = placeFree(9, 40);
    if (!w) continue;
    const hw = 4 + rng() * 3, hh = 3 + rng() * 3;
    const near = track.nearest(w.x, w.z);
    const tp = track.at(near.s);
    const yaw = Math.atan2(tp.x - w.x, tp.z - w.z); // face the road
    const node = new TransformNode("house" + i, scene);
    node.position.set(w.x, 0, w.z);
    node.rotation.y = yaw;
    node.parent = root;
    const walls = MeshBuilder.CreateBox("walls", { width: hw, height: hh, depth: hw * 0.8 }, scene);
    walls.position.y = hh / 2;
    walls.material = clay(scene, T.houses[i % T.houses.length], { glow: 0.2 });
    const roof = MeshBuilder.CreateCylinder("roof", { diameter: hw * 1.25, height: hw * 0.86, tessellation: 3 }, scene);
    roof.rotation.z = Math.PI / 2;
    roof.rotation.y = Math.PI / 2;
    roof.position.y = hh + hw * 0.3;
    roof.scaling.y = 1;
    roof.material = clay(scene, T.roofs[i % T.roofs.length]);
    const door = MeshBuilder.CreateBox("door", { width: 1, height: 1.7, depth: 0.15 }, scene);
    door.position.set(0, 0.85, hw * 0.4 + 0.02);
    door.material = clay(scene, "#a86b3c");
    const win = MeshBuilder.CreateBox("win", { width: 1.1, height: 0.9, depth: 0.12 }, scene);
    win.position.set(hw * 0.27, hh * 0.62, hw * 0.4 + 0.02);
    win.material = clay(scene, "#bfe6ff", { glow: 0.35 });
    const parts = [walls, roof, door, win];
    const merged = Mesh.MergeMeshes(parts, true, true, undefined, false, true)!;
    merged.parent = node;
    statics.push(merged);
    casters.push(merged);
    if (i % 2 === 0) {
      const tex = canvasTex(scene, "hclock" + i, 128, 128, (c) => drawClockFace(c, 128, (i * 97) % 720, T.roofs[i % T.roofs.length]));
      clockTexes.push(tex);
      const face = MeshBuilder.CreateDisc("hface", { radius: 0.75, tessellation: 24 }, scene);
      face.position.set(-hw * 0.18, hh * 0.68, hw * 0.4 + 0.09);
      face.rotation.y = Math.PI;
      face.material = texturedMat(scene, "hfaceMat" + i, tex, { glow: 0.45 });
      face.parent = node;
      statics.push(face);
    }
  }

  // hills (big soft domes far away)
  for (let i = 0; i < 18; i++) {
    const a = (i / 18) * Math.PI * 2 + rng() * 0.2;
    const R = 230 + rng() * 120;
    const hill = MeshBuilder.CreateSphere("hill" + i, { diameter: 1, segments: 10 }, scene);
    hill.scaling.set(120 + rng() * 120, 30 + rng() * 50, 100 + rng() * 100);
    hill.position.set(cx + Math.cos(a) * R, -6, cz + Math.sin(a) * R);
    hill.material = clay(scene, T.hills[i % T.hills.length], { glow: 0.25 });
    statics.push(hill);
  }
  // flowers (tiny balls in clusters)
  const flower = MeshBuilder.CreateSphere("flower", { diameter: 0.45, segments: 4 }, scene);
  flower.material = clay(scene, "#ffffff", { glow: 0.35 });
  const fm: number[] = [], fc: number[] = [];
  const petals = ["#ff9fbd", "#ffd23f", "#b8a5ff", "#ff9a3d", "#ffffff"];
  for (let i = 0; i < Math.round(70 * density); i++) {
    const w = placeFree(3, 14);
    if (!w) continue;
    const col = Color3.FromHexString(petals[i % petals.length]);
    for (let k = 0; k < 5; k++) {
      Matrix.Compose(new Vector3(1, 1, 1), Quaternion.Identity(), new Vector3(w.x + (rng() - 0.5) * 2.4, 0.25, w.z + (rng() - 0.5) * 2.4)).copyToArray(fm, fm.length);
      fc.push(col.r, col.g, col.b, 1);
    }
  }
  flower.thinInstanceSetBuffer("matrix", new Float32Array(fm), 16);
  flower.thinInstanceSetBuffer("color", new Float32Array(fc), 4);
  statics.push(flower);
  // clouds
  const cloud = MeshBuilder.CreateSphere("cloud", { diameter: 1, segments: 8 }, scene);
  cloud.material = clay(scene, "#ffffff", { glow: 0.75 });
  const clm: number[] = [];
  for (let i = 0; i < 14; i++) {
    const a = rng() * Math.PI * 2, R = 120 + rng() * 200, y = 55 + rng() * 40;
    const x = cx + Math.cos(a) * R, z = cz + Math.sin(a) * R;
    for (let k = 0; k < 4; k++)
      Matrix.Compose(new Vector3(14 + rng() * 8, 7 + rng() * 3, 10 + rng() * 6), Quaternion.Identity(), new Vector3(x + (k - 1.5) * 8, y + rng() * 3, z + rng() * 4)).copyToArray(clm, clm.length);
  }
  cloud.thinInstanceSetBuffer("matrix", new Float32Array(clm), 16);
  statics.push(cloud);

  // Day Week Valley extras: seven big day pennants around the valley
  if (theme === "day-valley") {
    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
    days.forEach((d, i) => {
      const s = (i / 7) * track.length + 20;
      const w = track.world(s, -(track.half + 7));
      const pole = MeshBuilder.CreateCylinder("dpole" + i, { height: 7, diameter: 0.35 }, scene);
      pole.position.set(w.x, 3.5, w.z);
      pole.material = clay(scene, "#ffffff");
      statics.push(pole);
      const flag = MeshBuilder.CreatePlane("dflag" + i, { width: 3.6, height: 1.4, sideOrientation: Mesh.DOUBLESIDE }, scene);
      flag.position.set(w.x, 6.1, w.z);
      flag.rotation.y = w.yaw + Math.PI / 2;
      flag.material = texturedMat(scene, "dflagMat" + i, signTexture(scene, d, DAY_COLORS[i]), { unlit: true, alpha: true });
      flag.parent = root;
    });
  }

  // ---- collectible stars (instances so each can disappear)
  const starBase = star5(scene, "starPickup");
  starBase.material = clay(scene, "#ffd23f", { glow: 0.55, shine: 0.5 });
  starBase.isVisible = false;
  const pickupMeshes = pickups.filter((p) => p.s < track.length).map((p, i) => {
    const inst = starBase.createInstance("star" + i);
    const w = track.world(p.s, p.lat);
    inst.position.set(w.x, 1.1, w.z);
    inst.parent = root;
    return { mesh: inst, p };
  });

  for (const m of statics) {
    if (!m.parent) m.parent = root;
    m.isPickable = false;
    m.freezeWorldMatrix();
    m.doNotSyncBoundingInfo = true;
  }

  return {
    root,
    pickups: pickupMeshes,
    gateMeshes,
    towerClock,
    shadowCasters: casters,
    setGateLabels: (gi, labels, cols) => gateLabelers[gi]?.(labels, cols),
    update: (time) => {
      for (const { mesh } of pickupMeshes) {
        mesh.rotation.y = time * 2.2;
        mesh.position.y = 1.1 + Math.sin(time * 3 + mesh.position.x) * 0.15;
      }
    },
  };
}

/** an arch spanning the road at distance s, with a banner or sign texture */
function arch3(scene: Scene, name: string, track: Track, s: number, h: number, color: string, tex: DynamicTexture, round = false): TransformNode {
  const node = new TransformNode(name, scene);
  const w = track.world(s, 0);
  node.position.set(w.x, 0, w.z);
  node.rotation.y = w.yaw;
  const span = track.half + 1.4;
  for (const side of [-1, 1]) {
    const pole = MeshBuilder.CreateCylinder(name + "pole", { height: h, diameter: 0.7, tessellation: 12 }, scene);
    pole.position.set(side * span, h / 2, 0);
    pole.material = clay(scene, color, { glow: 0.2 });
    pole.parent = node;
    const cap = MeshBuilder.CreateSphere(name + "cap", { diameter: 1.1, segments: 8 }, scene);
    cap.position.set(side * span, h + 0.1, 0);
    cap.material = clay(scene, "#ffffff", { glow: 0.3 });
    cap.parent = node;
  }
  const beam = MeshBuilder.CreateBox(name + "beam", { width: span * 2 + 0.6, height: 0.7, depth: 0.7 }, scene);
  beam.position.y = h;
  beam.material = clay(scene, color, { glow: 0.2 });
  beam.parent = node;
  if (round) {
    const sign = MeshBuilder.CreatePlane(name + "sign", { width: 3.2, height: 3.2, sideOrientation: Mesh.DOUBLESIDE }, scene);
    sign.position.set(0, h + 1.9, 0); // a plane faces -Z: readable for drivers coming towards it
    sign.material = texturedMat(scene, name + "signMat", tex, { unlit: true, alpha: true });
    sign.parent = node;
  } else {
    const banner = MeshBuilder.CreatePlane(name + "banner", { width: span * 2 - 1, height: 1.6, sideOrientation: Mesh.DOUBLESIDE }, scene);
    banner.position.set(0, h - 1.2, 0);
    banner.material = texturedMat(scene, name + "bannerMat", tex, { unlit: true, alpha: true });
    banner.parent = node;
  }
  return node;
}
