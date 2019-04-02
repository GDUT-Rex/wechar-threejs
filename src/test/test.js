import THREE from "../libs/three/index"

import { Zlib } from "../libs/three/js/libs/inflate.min"
window.Zlib = Zlib
require("../libs/three/js/loaders/FBXLoader")

require("../libs/three/js/controls/OrbitControls")

export class test {
  constructor() {
    this.init();
    this.animation();
  }
  init(){
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    this.camera.position.set(100, 200, 300);
    console.log(this.camera.rotation)
    this.camera.rotation.x = -0.1;
    const controls = new THREE.OrbitControls(this.camera);
    controls.target.set(100, 200, -150);
    controls.update();
    // 场景
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xa0a0a0);
    // this.scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);
    //light
    // 环境光
    // var light = new THREE.AmbientLight(0x404040,50); // soft white light
    // this.scene.add(light);

    // 半球光源
    var light = new THREE.HemisphereLight(0x0000ff, 0xffffff, 1);
    console.log(light)
    // light.parent.castShadow =true;
    this.scene.add(light);
    // 方向灯
    // light = new THREE.DirectionalLight(0xffffff);
    // light.position.set(0, 200, 100);
    // light.castShadow = true;
    // light.shadow.camera.top = 500;
    // light.shadow.camera.bottom = -10;
    // light.shadow.camera.left = 0;
    // light.shadow.camera.right = 360;
    // this.scene.add(light);
    // 点光源
    // var light = new THREE.PointLight(0xffffff, 1, 1000);
    // light.position.set(100, 200, -150);
    // light.castShadow =true;
    // this.scene.add(light);
    // 聚光
    // var spotLight = new THREE.SpotLight(0xffffff,50 ,400);
    // spotLight.position.set(100, 300, -100);
    // spotLight.castShadow = true;
    // spotLight.shadow.mapSize.width = 500;
    // spotLight.shadow.mapSize.height = 500;
    // spotLight.shadow.camera.near = 500;
    // spotLight.shadow.camera.far = 4000;
    // spotLight.shadow.camera.fov = 30;
    //this.scene.add(spotLight);

    //ground
    const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    this.scene.add(mesh);
    //物体
    var geometry = new THREE.BoxGeometry(50, 50, 50);
    var material = new THREE.MeshPhongMaterial({ color: 0x00ff00, depthWrite: false });
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.position.set(100,100,-150);
    this.cube.castShadow = true;
    this.scene.add(this.cube);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.render(this.scene, this.camera);
    // window.requestAnimationFrame(this.animation.bind(this), canvas);
  }
  animation(){
    // console.log(this.animation)
    window.requestAnimationFrame(this.animation.bind(this), canvas);
    this.cube.rotation.x +=0.1;
    this.cube.rotation.y += 0.1;
    this.renderer.render(this.scene, this.camera);
   
  }
}