// @flow

import * as THREE from "three";
import autoBind from "auto-bind";

import CanvasView from "../CanvasView";

import type { Mesh, Scene } from "three";

import type { CanvasViewBag } from "../../interfaces/CanvasViewBag";

export default class Cube extends CanvasView {
  +scene: Scene;
  cube: ?Mesh;

  constructor(canvasViewBag: CanvasViewBag, scene: Scene) {
    super(canvasViewBag);
    autoBind(this);

    this.scene = scene;
  }

  async attach(): Promise<void> {
    await super.attach();

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
    });

    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  async dispose(): Promise<void> {
    await super.dispose();

    if (!this.cube) {
      return;
    }

    this.scene.remove(this.cube);
  }

  update(delta: number): void {
    super.update(delta);

    if (!this.cube) {
      return;
    }

    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    // this.cube.rotation.z += 0.1;
  }

  useBegin(): boolean {
    return super.useBegin() && false;
  }

  useEnd(): boolean {
    return super.useEnd() && false;
  }
}