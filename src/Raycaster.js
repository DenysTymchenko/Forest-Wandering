import * as THREE from 'three';
import Experience from './Experience.js';

export default class Raycaster {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.controls = this.camera.controls;
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
    if (this.camera.controls.isLocked && this.world.ground) {
      const intersect = this.instance.intersectObject(this.world.ground.instance)[0];
      this.controls.pressedKeys.Space ? intersect.point.y += 14 : intersect.point.y += 7;

      this.camera.updatePosition(intersect.point);
    }
  }
}
