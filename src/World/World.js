import * as THREE from 'three';
import Experience from '../Experience.js';
import Environment from './Environment.js';
import Ground from './Ground.js';
import Water_ from './Water.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    // Starting to create meshes only after textures loading, because they will be used by them.
    this.resources.on('loaded', () => {
      this.setBackground();
      this.environment = new Environment();
      this.ground = new Ground();
      this.water = new Water_();
    })
  }

  setBackground() {
    const envMap = this.resources.items['background'];
    envMap.mapping = THREE.EquirectangularReflectionMapping;

    this.scene.background = envMap;
    this.scene.environment = envMap;
  }
}
