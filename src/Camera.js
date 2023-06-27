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

    this.isJumping = false;
    this.jumpHeight = 30;
    this.movementSpeed = 0.5;
    this.peak = false;
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

    this.controls.pressedKeys = [];
    window.addEventListener('keydown', (e) => this.controls.pressedKeys[e.code] = true);
    window.addEventListener('keyup', (e) => this.controls.pressedKeys[e.code] = false);
  }

  move() {
    if (this.controls.pressedKeys['KeyW']) this.controls.moveForward(this.movementSpeed);
    if (this.controls.pressedKeys['KeyA']) this.controls.moveRight(-this.movementSpeed);
    if (this.controls.pressedKeys['KeyS']) this.controls.moveForward(-this.movementSpeed);
    if (this.controls.pressedKeys['KeyD']) this.controls.moveRight(this.movementSpeed);
  }

  jump() {
    let newPositionY = this.instance.position.y;
    const groundPosition = this.experience.raycaster.intersect?.point.y;

    if (newPositionY < groundPosition) {
      this.isJumping = false;
      this.peak = false;
      newPositionY = groundPosition;
    }

    if (this.controls.pressedKeys['Space'] && !this.isJumping) this.isJumping = true;
    if (this.isJumping && !this.peak && newPositionY <= this.jumpHeight) newPositionY++;
    if (newPositionY >= this.jumpHeight) this.peak = true;
    if (this.peak) newPositionY--;

    this.instance.position.y = newPositionY;
  }


  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  updatePosition(vec3) {
    this.instance.position.set(vec3.x, vec3.y, vec3.z);
  }
}
