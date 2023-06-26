import * as THREE from 'three';
import EventEmitter from './Utils/EventEmmiter.js';
import Experience from './Experience.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

export default class Camera extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.setInstance();
    this.setPointerLockControls();

    this.controls.addEventListener('lock', () => this.trigger('lock')); // If controls are locked - hint div is hidden.
    this.controls.addEventListener('unlock', () => this.trigger('unlock')); // If controls are unlocked - hint div is shown.
    window.addEventListener('keydown', (e) => this.pressKey(e.code));
    window.addEventListener('keyup', (e) => this.unpressKey(e.code));
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(0, 7, 0);

    this.scene.add(this.instance);
  }

  setPointerLockControls() {
    this.controls = new PointerLockControls(this.instance, this.canvas);
    this.controls.pressedKeys = {
      W: false,
      A: false,
      S: false,
      D: false,
    }
  }

  pressKey(key) {
    if (this.controls.isLocked) {
      switch (key) {
        case 'KeyW':
        case 'ArrowUp':
          this.controls.pressedKeys.W = true;
          break;

        case 'KeyA':
        case 'ArrowLeft':
          this.controls.pressedKeys.A = true;
          break;

        case 'KeyS':
        case 'ArrowDown':
          this.controls.pressedKeys.S = true;
          break;

        case 'KeyD':
        case 'ArrowRight':
          this.controls.pressedKeys.D = true;
          break;

        case 'Space':
          this.controls.pressedKeys.Space = true;
          break;
      }
    }
  }

  unpressKey(key) {
    if (this.controls.isLocked) {
      switch (key) {
        case 'KeyW':
        case 'ArrowUp':
          this.controls.pressedKeys.W = false;
          break;

        case 'KeyA':
        case 'ArrowLeft':
          this.controls.pressedKeys.A = false;
          break;

        case 'KeyS':
        case 'ArrowDown':
          this.controls.pressedKeys.S = false;
          break;

        case 'KeyD':
        case 'ArrowRight':
          this.controls.pressedKeys.D = false;
          break;
      }
    }
  }

  move() {
    if (this.controls.pressedKeys.W) this.controls.moveForward(0.5);
    if (this.controls.pressedKeys.A) this.controls.moveRight(-0.5);
    if (this.controls.pressedKeys.S) this.controls.moveForward(-0.5);
    if (this.controls.pressedKeys.D) this.controls.moveRight(0.5);
    if (this.controls.pressedKeys.Space) {
      setTimeout(() => {
        this.controls.pressedKeys.Space = false;
      }, 150)
    }
  }


  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  updatePosition(vec3) {
    this.instance.position.set(vec3.x, vec3.y, vec3.z);
  }
}
