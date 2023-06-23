import Experience from '../Experience.js';
import Environment from './Environment.js';
import Ground from './Ground.js';
import Water_ from './Water.js';

export default class World {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;

    // Starting to create meshes only after textures loading, because they will be used by them.
    this.resources.on('loaded', () => {
      this.environment = new Environment();
      this.ground = new Ground();
      this.water = new Water_();
    })
  }
}
