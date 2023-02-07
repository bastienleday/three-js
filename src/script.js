import './style.css';
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/Orbitcontrols.js'
import * as dat from 'dat.gui';

import GUI from 'lil-gui';

// console.log(OrbitControls);

/***
 * dat GUI
 */
const gui = new GUI();
const parameters = {
    color: 0xffff00
}
gui.addColor(parameters, 'color');
gui.onChange(()=>{
    material.color.set(parameters.color)

})



/**
 * Cursor
 */

const cursor = {
    x: 0,
    y: 0
};
window.addEventListener('mousemove', (event) => {

    cursor.x = event.clientX / sizes.width - 0.5;
    cursor.y = event.clientY / sizes.width - 0.5;

    
});


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: parameters })
const mesh = new THREE.Mesh(geometry, material)
// mesh.position.y = 1;
// x, y, z
scene.add(mesh)

//groupe
// const group = new THREE.Group()
// group.position.y = 2;
// scene.add(group);

//creation de mesh
// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({color: 'green'})
   
// )
// cube1.position.x = -2;
// group.add(cube1);




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
// const axesHelper = new THREE.AxesHelper(30)
// scene.add(axesHelper);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//ici on s'occupe du resize de la fenetre afin qu'lle suive les changements de taille d'écran
window.addEventListener('resize', () => {

    

        //update ratio
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight

        //update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    //update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * debug dat.GUI
 */


gui.add(mesh.position, 'y', -3, 3, 0.01);




/**
 * ici on gérer l'affichage en plein écran du canvas, avec une exeption pour Safari
 */
window.addEventListener('dblclick', () => {

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement){

        if(canvas.requestFullscreen){
        canvas.requestFullscreen();
        }else if(canvas.webkitFullscreenElement){
            canvas.webkitFullscreenElement()
        }

        console.log("go full screen");
    }else{
        if(document.exitFullscreen){
         document.exitFullscreen();
        }else if(document.webkitExitFullscreen){
         document.webkitExitFullscreen();
 
        };
       
     }




    
})






    
    


// const aspectRatio = sizes.width / sizes.height;

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

// camera.lookAt(mesh.position)


const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.zoomSpeed = 0.2;

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));





const clock = new THREE.Clock();
// gsap.to(mesh.position, {duration: 1, delay: 1, x: 2});
// gsap.to(mesh.position, {duration: 1, delay: 2, x: 0});




//animation
const tick = () =>{
    const getElapsedTime = clock.getElapsedTime();

    // mesh.rotation.y = getElapsedTime;
    // // mesh.position.y = Math.sin(getElapsedTime);

    //update camera
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2 ) * 3
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2 ) * 3
    // camera.position.y = cursor.y * 8
    // camera.lookAt(mesh.position)

    controls.update();
    


    renderer.render(scene, camera)

    window.requestAnimationFrame(tick);

   

    

}

tick();