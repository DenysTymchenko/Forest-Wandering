import Experience from '../Experience.js';

export default class Ground {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setInstance();
  }

  setInstance() {
    this.instance = this.resources.items['ground'].scene;
    this.instance.scale.setScalar(20)
    this.scene.add(this.instance);
  }
}
