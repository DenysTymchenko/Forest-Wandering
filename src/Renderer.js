import * as THREE from 'three'
import Experience from './Experience.js'
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

export default class Renderer {
  constructor() {
    this.experience = new Experience()
    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;

    this.setInstance(); // Scene renderer
    this.setCSS2DRenderer(); // Quotes renderer
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  setCSS2DRenderer() {
    this.CSS2DRenderer = new CSS2DRenderer();
    this.CSS2DRenderer.setSize(this.sizes.width, this.sizes.height);

    this.CSS2DRenderer.domElement.style.position = 'absolute';
    this.CSS2DRenderer.domElement.style.zIndex = '0';
    document.body.appendChild(this.CSS2DRenderer.domElement);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));

    this.CSS2DRenderer.setSize(this.sizes.width, this.sizes.height);
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
    this.CSS2DRenderer.render(this.scene, this.camera.instance);
  }
}

