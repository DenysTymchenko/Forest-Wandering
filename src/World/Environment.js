import * as THREE from 'three';
import Experience from '../Experience.js';

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setAmbientLight();
    this.setDirectionalLight();
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(this.ambientLight);
  }

  setDirectionalLight() {
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(-5, 5, 0);
    this.directionalLight.target.position.set(0, 0, 0);

    this.directionalLight.shadow.camera.top = 0;
    this.directionalLight.shadow.camera.bottom = 0;
    this.directionalLight.shadow.camera.right = 0;
    this.directionalLight.shadow.camera.left = 0;
    this.directionalLight.shadow.camera.far = 0;
    this.directionalLight.shadow.camera.near = 0;

    this.scene.add(this.directionalLight);
  }
}
