import * as THREE from 'three';
import Sizes from './Utils/Sizes.js';
import Time from './Utils/Time.js';
import Camera from './Camera.js';
import Renderer from './Renderer.js';
import Resources from './Utils/Resources.js';
import World from './World/World.js';
import Raycaster from './Raycaster.js';

let instance = null;

export default class Experience {
  constructor(hint, canvas) {
    if (instance) return instance;
    instance = this;

    this.hint = hint;
    this.canvas = canvas;
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources();
    this.world = new World();
    this.raycaster = new Raycaster();

    window.addEventListener('click', () => this.camera.controls.lock());

    this.sizes.on('resize', () => this.resize());
    this.time.on('tick', () => this.update());
    this.camera.on('lock', () => this.hideHint());
    this.camera.on('unlock', () => this.showHint());
  }

  hideHint() {
    this.hint.style.display = 'none';
    this.camera.controls.lock();
  }

  showHint() {
    this.hint.style.display = 'flex';
    this.camera.controls.unlock();
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    if (this.camera.controls.isLocked) {
      this.camera.move();
      this.camera.jump();
      this.world.water.update(); // For water move
    }

    this.raycaster.castRay();
    this.renderer.update();
  }
}
