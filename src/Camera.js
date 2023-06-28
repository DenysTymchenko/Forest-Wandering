import * as THREE from 'three';
import EventEmitter from './Utils/EventEmmiter.js';
import Experience from './Experience.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import ControlsMovement from './Utils/ControlsMovement.js';

export default class Camera extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      250,
    );
    this.instance.position.set(0, 7, 0);

    this.scene.add(this.instance);
  }

  setPointerLockControls() {
    this.controls = new PointerLockControls(this.instance, this.canvas);
    this.controls.addEventListener('lock', () => this.trigger('lock')); // If controls are locked - hint div is hidden.
    this.controls.addEventListener('unlock', () => this.trigger('unlock')); // If controls are unlocked - hint div is shown.

    this.controlsMovement = new ControlsMovement(); // move/jump logic is stored here
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  updatePosition(vec3) {
    this.instance.position.set(vec3.x, vec3.y, vec3.z);
  }
}
