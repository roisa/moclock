/**
 * Non-race 3D scenes: the home-screen backdrop (a slow fly-around of Clock Town
 * with the three karts parked at the start) and the kart garage turntable.
 */
import type { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder";
import { Track } from "../core/track";
import { CLOCK_TOWN } from "../core/tracks";
import { buildWorld, type Quality } from "./world";
import { animateKart, buildKart, type KartModel } from "./kart";
import { createEngine } from "./engine";
import { clay, canvasTex, texturedMat } from "./look";
import type { KartDef } from "../content/racers";

function lights(scene: Scene) {
  const h = new HemisphericLight("hemi", new Vector3(0.2, 1, 0.1), scene);
  h.intensity = 0.95;
  h.groundColor = new Color3(0.55, 0.62, 0.5);
  const d = new DirectionalLight("sun", new Vector3(-0.5, -1, 0.35), scene);
  d.intensity = 0.7;
}

export class HomeBackdrop {
  private engine: Engine;
  private scene: Scene;
  private disposed = false;
  constructor(canvas: HTMLCanvasElement, q: Quality) {
    this.engine = createEngine(canvas, { ...q, scale: Math.max(q.scale, 1.25), scenery: q.scenery * 0.8 });
    const scene = (this.scene = new Scene(this.engine));
    scene.clearColor = new Color4(0.75, 0.88, 1, 1);
    scene.skipPointerMovePicking = true;
    lights(scene);
    const track = new Track(CLOCK_TOWN);
    buildWorld(scene, track, "clock-town", q, [], []);
    // a slow, high fly-around over the clock tower and the main straight
    const cam = new UniversalCamera("cam", new Vector3(0, 12, 0), scene);
    cam.inputs.clear();
    cam.fov = 0.85;
    const focus = track.world(track.length * 0.9, track.half + 4);
    let t = 0;
    scene.onBeforeRenderObservable.add(() => {
      t += this.engine.getDeltaTime() / 1000;
      const a = t * 0.05 + 2.2;
      cam.position.set(focus.x + Math.sin(a) * 46, 15 + Math.sin(t * 0.2) * 2, focus.z + Math.cos(a) * 46);
      cam.setTarget(new Vector3(focus.x, 6, focus.z));
    });
    this.engine.runRenderLoop(() => !this.disposed && scene.render());
    window.addEventListener("resize", this.resize);
  }
  private resize = () => this.engine.resize();
  dispose() {
    this.disposed = true;
    window.removeEventListener("resize", this.resize);
    this.engine.stopRenderLoop();
    this.scene.dispose();
    this.engine.dispose();
  }
}

export class Garage {
  private engine: Engine;
  private scene: Scene;
  private kart: KartModel | null = null;
  private disposed = false;
  private spin = 0;
  constructor(canvas: HTMLCanvasElement, q: Quality) {
    this.engine = createEngine(canvas, { ...q, scale: Math.min(q.scale, 1) });
    const scene = (this.scene = new Scene(this.engine));
    scene.clearColor = new Color4(0, 0, 0, 0);
    lights(scene);
    // turntable + soft floor
    const floor = MeshBuilder.CreateCylinder("floor", { height: 0.3, diameter: 7, tessellation: 48 }, scene);
    floor.position.y = -0.15;
    floor.material = texturedMat(scene, "floorMat", canvasTex(scene, "floorTex", 256, 256, (c, w) => {
      const g = c.createRadialGradient(w / 2, w / 2, 10, w / 2, w / 2, w / 2);
      g.addColorStop(0, "#fff8ec"); g.addColorStop(0.8, "#e9dcc6"); g.addColorStop(1, "#d8c7aa");
      c.fillStyle = g; c.fillRect(0, 0, w, w);
      c.strokeStyle = "rgba(255,154,61,0.6)"; c.lineWidth = 8; c.beginPath(); c.arc(w / 2, w / 2, w / 2 - 14, 0, Math.PI * 2); c.stroke();
    }), { glow: 0.25 });
    const ring = MeshBuilder.CreateTorus("ring", { diameter: 7, thickness: 0.18, tessellation: 64 }, scene);
    ring.material = clay(scene, "#ffd23f", { glow: 0.4 });
    const cam = new ArcRotateCamera("garageCam", -Math.PI / 2 - 0.6, 1.12, 8.6, new Vector3(0, 0.7, 0), scene);
    cam.lowerRadiusLimit = 5;
    cam.upperRadiusLimit = 12;
    cam.lowerBetaLimit = 0.5;
    cam.upperBetaLimit = 1.45;
    cam.wheelPrecision = 40;
    cam.panningSensibility = 0;
    cam.attachControl(canvas, true);
    cam.fov = 0.7;
    scene.onBeforeRenderObservable.add(() => {
      const dt = this.engine.getDeltaTime() / 1000;
      if (this.kart) {
        this.spin += dt * 0.35;
        this.kart.root.rotation.y = this.spin;
        animateKart(this.kart, 4, Math.sin(this.spin * 3) * 0.4, this.spin * 4, false, 0);
      }
    });
    this.engine.runRenderLoop(() => !this.disposed && scene.render());
    window.addEventListener("resize", this.resize);
  }
  show(kart: KartDef, paint?: string) {
    this.kart?.dispose();
    this.kart = buildKart(this.scene, kart, null, paint);
  }
  paint(color: string) {
    this.kart?.setPaint(color);
  }
  private resize = () => this.engine.resize();
  dispose() {
    this.disposed = true;
    window.removeEventListener("resize", this.resize);
    this.engine.stopRenderLoop();
    this.scene.dispose();
    this.engine.dispose();
  }
}
