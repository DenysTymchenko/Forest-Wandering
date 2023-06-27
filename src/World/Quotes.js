import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import Experience from '../Experience';

export default class Quotes {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;

    this.instances = [
      {
        position: new THREE.Vector3(-8, 16, 74),
        quote: '“I found far more answers in the woods than I ever did in the city.”',
        object: null,
      },
      {
        position: new THREE.Vector3(-29, 19, -60),
        quote: '“And into the forest I go to lose my mind and find my soul.”',
        object: null,
      },
      {
        position: new THREE.Vector3(92, 30, -90),
        quote: '“The forest is not a resource for us, it is life itself. It is the only place for us to live.”',
        object: null,
      },
    ];

    this.createQuoteObjects();
  }

  createQuoteObjects() {
    this.instances.forEach(instance => {
      const quoteDOM = document.createElement('div');
      quoteDOM.classList.add('quote');
      quoteDOM.classList.add('hidden');
      quoteDOM.innerText = '?'

      const quoteObject = new CSS2DObject(quoteDOM);
      quoteObject.position.copy(instance.position);
      this.scene.add(quoteObject);

      instance.object = quoteObject;
    })
  }

  update() {
    this.instances.forEach(instance => {
      const distance = this.camera.instance.position.distanceTo(instance.position);
      
      if(distance <= 5) {
        instance.object.element.classList.remove('hidden');
        instance.object.element.classList.add('visible');
        instance.object.element.innerText = instance.quote;
      } else {
        instance.object.element.classList.add('hidden');
        instance.object.element.classList.remove('visible');
        instance.object.element.innerText = '?'
      }
    })
  }
}
