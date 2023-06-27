import Experience from '../Experience.js';

export default class ControlsMovement {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera
    this.controls = this.camera.controls;
    this.resources = this.experience.resources;

    this.isJumping = false;
    this.jumpHeight = 30;
    this.movementSpeed = 0.5;
    this.peak = false;

    this.controls.pressedKeys = [];
    window.addEventListener('keydown', (e) => this.controls.pressedKeys[e.code] = true);
    window.addEventListener('keyup', (e) => this.controls.pressedKeys[e.code] = false);
  }

  move() {
    if (this.controls.pressedKeys['KeyW']) {
      this.controls.moveForward(this.movementSpeed);
      this.playSoundOnWalk();
    }
    if (this.controls.pressedKeys['KeyA']) {
      this.controls.moveRight(-this.movementSpeed);
      this.playSoundOnWalk();
    }
    if (this.controls.pressedKeys['KeyS']) {
      this.controls.moveForward(-this.movementSpeed);
      this.playSoundOnWalk();
    }
    if (this.controls.pressedKeys['KeyD']) {
      this.controls.moveRight(this.movementSpeed);
      this.playSoundOnWalk();
    }
  }

  playSoundOnWalk() {
    this.camera.instance.position.y < 8 ? this.resources.items['waterWalkSound'].play() : this.resources.items['grassWalkSound'].play();
  }

  jump() {
    let newPositionY = this.camera.instance.position.y;
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

    this.camera.instance.position.y = newPositionY;
  }
}
