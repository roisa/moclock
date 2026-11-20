import type { Scene } from "@babylonjs/core/scene";
import { ParticleSystem } from "@babylonjs/core/Particles/particleSystem";
import "@babylonjs/core/Particles/particleSystemComponent";
import { Color4 } from "@babylonjs/core/Maths/math.color";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import type { TransformNode } from "@babylonjs/core/Meshes/transformNode";
import type { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh";
import { glowDot } from "./look";

/** Rainbow turbo flames from the exhaust (emit rate follows the boost). */
export function boostFlames(scene: Scene, emitter: TransformNode, capacity: number) {
  const ps = new ParticleSystem("boost", capacity, scene);
  ps.particleTexture = glowDot(scene);
  ps.emitter = emitter as unknown as AbstractMesh;
  ps.minEmitBox = new Vector3(-0.35, 0, 0);
  ps.maxEmitBox = new Vector3(0.35, 0, 0);
  ps.color1 = new Color4(1, 0.82, 0.25, 1);
  ps.color2 = new Color4(1, 0.4, 0.75, 1);
  ps.colorDead = new Color4(0.45, 0.6, 1, 0);
  ps.minSize = 0.25;
  ps.maxSize = 0.7;
  ps.minLifeTime = 0.12;
  ps.maxLifeTime = 0.35;
  ps.direction1 = new Vector3(-0.4, 0.3, -4);
  ps.direction2 = new Vector3(0.4, 0.8, -6);
  ps.minEmitPower = 1;
  ps.maxEmitPower = 2.4;
  ps.blendMode = ParticleSystem.BLENDMODE_ADD;
  ps.isLocal = false;
  ps.emitRate = 0;
  ps.start();
  return ps;
}

/** A pooled burst of sparkles (stars collected, correct answers). */
export function sparkles(scene: Scene, capacity: number) {
  const ps = new ParticleSystem("sparkle", capacity, scene);
  ps.particleTexture = glowDot(scene);
  ps.emitter = new Vector3(0, -100, 0);
  ps.minEmitBox = new Vector3(-0.3, -0.3, -0.3);
  ps.maxEmitBox = new Vector3(0.3, 0.3, 0.3);
  ps.color1 = new Color4(1, 0.9, 0.3, 1);
  ps.color2 = new Color4(1, 1, 1, 1);
  ps.colorDead = new Color4(1, 0.6, 0.2, 0);
  ps.minSize = 0.15;
  ps.maxSize = 0.45;
  ps.minLifeTime = 0.3;
  ps.maxLifeTime = 0.7;
  ps.direction1 = new Vector3(-3, 3, -3);
  ps.direction2 = new Vector3(3, 6, 3);
  ps.gravity = new Vector3(0, -9, 0);
  ps.blendMode = ParticleSystem.BLENDMODE_ADD;
  ps.emitRate = 0;
  ps.manualEmitCount = 0;
  ps.start();
  return (at: Vector3, n = 24) => {
    ps.emitter = at.clone();
    ps.manualEmitCount = n;
  };
}
