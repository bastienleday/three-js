import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/Orbitcontrols.js'

// console.log(OrbitControls);

/**
 * Cursor: ici nous avons défini le curseur ainsi que le ratio, our qu'il s'dapte à tous les écrans
 */

const cursor = {
    x: 0,
    y: 0
};
window.addEventListener('mousemove', (event) => {

    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.width - 0.5;

});
    


// Canvas: ici on récupere la zone de travail, le DOM du html
const canvas = document.querySelector('canvas.webgl')

// Scene: il faut mettre en place la scene
const scene = new THREE.Scene()

/**
 * Objects: creer un objet, il se compose d'une geometrie, d'un materiel et tout cela se place dans le mesh
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// mesh.position.y = 1;
// x, y, z

//le mesh est ensuite ajouté à la scene
scene.add(mesh)

//groupe: il est possible de travailler par groupe afin de déplacer plusieur mesh à la foi, pour cela
//le groupe sera instancié et les mesh y seront ajoutés, comme pour la scene, chaque mesh peut avoir sa position au sein du groupe
//le groupe aura sa propre porsition

const group = new THREE.Group()
group.position.y = 2;
scene.add(group);

// creation de mesh
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'green'})
   
)
cube1.position.x = -2;
group.add(cube1);




//position
// mesh.position.set(1, -0.8, 0.4)

//scale: on peux biensur ajuster le scale, la position et la rotation des meshs
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
// const axesHelper = new THREE.AxesHelper(30)
// scene.add(axesHelper);


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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000);
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
camera.position.z = 2;
// camera.position.y= 2;
// camera.position.x = 2;
camera.lookAt(mesh.position);
scene.add(camera)

/**
 * Renderer
 */

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y = 2;
// controls.update()

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)



const clock = new THREE.Clock();
// gsap.to(mesh.position, {duration: 1, delay: 1, x: 2});
// gsap.to(mesh.position, {duration: 1, delay: 2, x: 0});







//animation
const tick = () =>{
    const getElapsedTime = clock.getElapsedTime();
    controls.update();

    renderer.render(scene, camera)
   

    window.requestAnimationFrame(tick);



}

tick();

   

    
