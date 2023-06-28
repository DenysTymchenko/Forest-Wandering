import * as THREE from 'three';
import Experience from './Experience.js';

export default class Raycaster {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.world = this.experience.world;
  }

  castRay() {
    //Casting a ray from camera position to the ground
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
      this.intersect = this.instance.intersectObject(this.world.ground.instance)[0];

      if (this.intersect) { // if there surface under camera
        // setting camera 7 points higher then ground
        this.intersect.point.y += 7;
        if (!this.camera.controlsMovement.isJumping) this.camera.updatePosition(this.intersect.point);
      } else { // if there is no surface under camera (user went out of ground bounds)
        this.camera.updatePosition(new THREE.Vector3(0, 7, 0)); // teleporting back to the start
      }
  }
}
