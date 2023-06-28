import * as THREE from 'three';
import Experience from '../Experience.js';
import Environment from './Environment.js';
import Ground from './Ground.js';
import Water_ from './Water.js';
import Quotes from './Quotes.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.resources.on('loaded', () => {
      this.setBackground();
      this.environment = new Environment();
      this.ground = new Ground();
      this.water = new Water_();
      this.quotes = new Quotes();
    })
  }

  setBackground() {
    const envMap = this.resources.items['background'];
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    envMap.colorSpace = THREE.SRGBColorSpace;

    this.scene.background = envMap;
    this.scene.environment = envMap;
  }
}
