import './style.css'
import * as THREE from 'three'
import { Color } from 'three'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// // mesh.position.y = 1;
// // x, y, z
// scene.add(mesh)

//groupe
const group = new THREE.Group()
group.position.y = 2;
scene.add(group);

//creation de mesh
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'green'})
   
)
cube1.position.x = -2;
group.add(cube1);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'red'})
)
cube2.position.x = 2;
group.add(cube2);

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({Color: 'blue'})
)
group.add(cube3);


//position
// mesh.position.set(1, -0.8, 0.4)
//scale
// mesh.scale.x = 2;
// mesh.scale.y = 0.2;
// mesh.scale.y = 1;
// mesh.scale.set (2, 0.2, 1);

//rotation
// mesh.rotation.reorder('YXZ');
// mesh.rotation.x =Math.PI * 0.4;
// mesh.rotation.y = Math.PI * 0.5;
// mesh.rotation.z = 0;
// mesh.rotation.set(Math.PI * 0.7, Math.PI * 0.8, Math.PI);

//axe helper
const axesHelper = new THREE.AxesHelper(30)
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// camera.lookAt(mesh.position)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)