import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
//Scene
const scene = new THREE.Scene();
//Camera, to set proper dimensions, second argument and 0.1 and 1000 is for viewing the entire screen from the user perspective
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//Render, obviously to render
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});
const normalTExture = new THREE.TextureLoader().load('images.jpeg.jpg')
//Proper pixel ratio accorrding to the device
renderer.setPixelRatio(window.devicePixelRatio);
//Proper size according to the device size
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.setZ(30);


//Object creation:
//Thre x, y, z coordinates that make up the shape
const geometry = new THREE.TorusGeometry(10, 3, 16, 100) //Torus is basically a ring moving in space
//Material is the wrapping paper for the object
const material = new THREE.MeshStandardMaterial( {color: 0x00FFFF, map: normalTExture} );
//Geometry + material
const torus = new THREE.Mesh(geometry, material);

//Adding to scene

scene.add(torus);
// Light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//Permanent render
const controls = new OrbitControls(camera, renderer.domElement)

//adding stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({color: 0x000000})
  const star = new THREE.Mesh(geometry, material)
  //This is done to randomly palce stars between +100 and -100
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)

}
//Avatar
const myTexture = new THREE.TextureLoader().load('pic.png')
const tilak = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial({map: myTexture})
)
//scene.add(tilak)
//Adding background
const spaceTexture = new THREE.TextureLoader().load('background.jpg')
scene.background = spaceTexture
//Moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg')


const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 64, 64),
  new THREE.MeshStandardMaterial({map: moonTexture, normalMap: normalTExture})
)

moon.position.z = 30
moon.position.setX(-10)
scene.add(moon)
//Scrolling animation

//Adding stars actually
Array(200).fill().forEach(addStar)

function moveCamera() {
  const t = document.body.getBoundingClientRect().top
  moon.rotation.x += 0.05
  moon.rotation.y += 0.075
  moon.rotation.z += 0.05

  tilak.rotation.y += 0.01
  tilak.rotation.z += 0.01

  camera.position.z = t*-0.01
  camera.position.x = t*-0.0002
  camera.position.y = t*-0.0002
}
document.body.onscroll = moveCamera
moveCamera()
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update()
  renderer.render(scene, camera);
}
animate();