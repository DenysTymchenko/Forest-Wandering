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
      }
    })
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;

    if (this.toLoad === this.loaded) this.trigger('loaded');
  }
}
