import * as THREE from 'three';
import EventEmitter from './EventEmmiter.js';
import sources from '../sources.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default class Resources extends EventEmitter {
  constructor() {
    super();
    this.sources = sources; // All textures and models (their names, types, and paths) are stored here
    this.items = {}; // All loaded textures/models will be stored here
    this.toLoad = this.sources.length;
    this.loaded = 0;
    this.loadingBar = document.querySelector('.loading-bar');

    this.SetLoaders();
    this.startLoading();
  }

  SetLoaders() {
    this.loaders = {}

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/')

    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);
    this.loaders.gltfLoader = gltfLoader;

    this.loaders.textureLoader = new THREE.TextureLoader();
  }

  startLoading() {
    this.sources.forEach(source => {
      switch (source.type) {
        case 'gltfModel':
          this.loaders.gltfLoader.load(
            source.path,
            (file) => this.sourceLoaded(source, file),
          );
          break;

        case 'texture':
          this.loaders.textureLoader.load(
            source.path,
            (file) => this.sourceLoaded(source, file),
          );
          break;

        case 'audio':
          const file = new Audio(source.path);
          this.sourceLoaded(source, file)
      }
    })
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;

    this.updateLoadingBar();
  }

  updateLoadingBar() {
    const progress = this.loaded / this.toLoad;
    this.loadingBar.style.transform = `scaleX(${progress})`;

    if (progress === 1) {
      setTimeout(() => {
        this.loadingBar.style.height = 0;
        this.trigger('loaded');
      }, 500);
    }
  }
}
