import * as THREE from 'three';
import { Water } from 'three/addons/objects/Water.js';
import Experience from '../Experience.js';

export default class Water_ {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setNormal();
    this.setInstance();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(201, 50);
  }

  setNormal() {
    this.normal = this.resources.items['water-normal'];
    this.normal.wrapS = THREE.RepeatWrapping;
    this.normal.wrapT = THREE.RepeatWrapping;
  }

  setInstance() {
    this.instance = new Water(
      this.geometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: this.normal,
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
      });

    this.instance.position.y = 1;
    this.instance.rotation.x = Math.PI * -0.5;

    this.scene.add(this.instance);
  }

  update() {
    this.instance.material.uniforms['time'].value += 0.5 / 60; // Makes water move
  }
}
