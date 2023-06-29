import Experience from '../Experience.js';

export default class ControlsMovement {
  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera
    this.controls = this.camera.controls;
    this.resources = this.experience.resources;

    // Jumping
    this.isJumping = false;
    this.onPeakHeight = false;
    this.jumpSpeed = 1;
    this.fallSpeed = 0;

    // Movement
    this.controls.pressedKeys = [];
    this.movementSpeed = 0.5;
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
    if (!this.isJumping) {
      // if camera.position.y is on water level - playing waterWalkSound
      this.camera.instance.position.y < 8
        ? this.resources.items['waterWalkSound'].play()
        : this.resources.items['grassWalkSound'].play();
    }
  }

  jump() {
    let updatedPositionY = this.camera.instance.position.y;
    const groundPoint = this.experience.raycaster.intersect?.point.y;
    const jumpTopPoint = groundPoint + 20;

    if (updatedPositionY <= groundPoint) {
      this.isJumping = false;
      this.onPeakHeight = false;
      this.jumpSpeed = 1;
      this.fallSpeed = 0;
    }

    if (this.controls.pressedKeys['Space'] && !this.isJumping) {
      this.isJumping = true;
      this.resources.items['jumpSound'].currentTime = 0;
      this.resources.items['jumpSound'].play();
    }

    if (this.isJumping && !this.onPeakHeight) {
      updatedPositionY += this.jumpSpeed;
      this.jumpSpeed -= 0.05;
    }
    if (updatedPositionY >= jumpTopPoint) this.onPeakHeight = true;
    if (this.onPeakHeight) {
      updatedPositionY -= this.fallSpeed;
      if(this.fallSpeed < 1) this.fallSpeed += 0.1;
    }
    this.camera.instance.position.y = updatedPositionY;
  }
}
