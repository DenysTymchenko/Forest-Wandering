import * as THREE from 'three';
import Experience from './Experience.js';

export default class Raycaster {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.world = this.experience.world;
  }

  castRay() {
    this.instance = new THREE.Raycaster();

    const origin = new THREE.Vector3(
      this.camera.instance.position.x,
      this.camera.instance.position.y,
      this.camera.instance.position.z
    );
    const direction = new THREE.Vector3(0, -1, 0).normalize();

    this.instance.set(origin, direction);

    this.setNewCameraPosition();
  }

  setNewCameraPosition() {
    if (this.camera.controls?.isLocked && this.world.ground) {
      this.intersect = this.instance.intersectObject(this.world.ground.instance)[0];

      if (this.intersect) {
        this.intersect.point.y += 7;
        if (!this.camera.isJumping) this.camera.updatePosition(this.intersect.point);
      } else {
        this.camera.updatePosition(new THREE.Vector3(0, 7, 0));
      }

    }
  }
}
