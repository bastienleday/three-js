# Three js basic scene

Il faut tout d'abord importer threejs
````js
import * as THREE from 'three';
````

## Canvas

Notre scene three js sera mise en place dans une balise canvas placée dans le html
```` html
<canvas class='canvas'> notre scene </canvas>
````

cette balise sear récupérer dans notre script js
````js
const canvas = document.querySelector('canvas')
````

## Scene

La première chose à faire est de créer une scene
````js
const scene = new THREE.Scene()
````

## Caméra
Ensuite on va créer une caméra

````js
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
//la camera.position nous permet de reculer la caméra, sans cela elle se trouve au centre de la scene est donc à l'interieur du mesh que l'on va créer, on ne le verra donc pas.
camera.position.z = 5;
````
* il existe plsusieur type de caméra, à utiliser selon le résultat souhaitais (voir doc three.js)

il faut ensuite ajouter cette caméra à la scène
````js
scene.add(camera)
````

## Mesh
Le mesh se compose de plusieurs choses
* une geometrie
* un materiaux
````js
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
//ici on passe une texture à notre material
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
//la geometrie et le materaial sont passés en parametres au mesh
const mesh = new THREE.Mesh(geometry, material);
````

On ajoute le mesh à notre scène
````js
scene.add(mesh);
````


## Renderer
Il faut ensuite créer un renderer, c'est lui  qui va rendre notre scène

L'objet sizes contient les dimenssion de notre fenetre DOM, mais on peut y indiquer les dimension d'une div ou autre, selon ou va se trouver notre scene on va utiliser ces propriétés
````js
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
````
````js
//on donne le canvas au renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
//ici on passe les dimension de notre fenetre, avec les propriétés de l'objet sizes
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
````

## Control
on va importer OrbitControl dans notre scene
````js
import { OrbitControls } from 'three/examples/jsm/controls/Orbitcontrols.js'
````
et le paramétrer
````js
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.zoomSpeed = 0.2;
````

## Animation
Il faut mettre en place une fonction qui va s'occuper, de l'animation, cette fonction va relancer le renderer et mettre à jours la position  de notre caméra à chaqua frame
````js
//on instanci un objet clock qui mesure le temps écoulé
const clock = new THREE.Clock();
const tick = () =>{
    const getElapsedTime = clock.getElapsedTime();
    //les controls sont mis à jour
    controls.update();
    //on y place le renderer, en lui passant la scène et la caméra
    //le renderer est mis à jour, la scene est redéssinée avec les nouvelles info de la camera
    renderer.render(scene, camera)
    
    // Cette méthode garantit que l'animation est synchronisée avec la fréquence d'affichage de l'écran pour une animation fluide.
    window.requestAnimationFrame(tick);

}
//on appelle la fonction pour démarrer la boucle de rendu
tick();

````


# Tips

## Pleine écran

Une fonction permet de gérer le passage en plein écran, avec une particularité pour Safari
````js
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
````

## Resize
La gestion du gestion permet à notre scene de suivre les changement de taille de l'écran
````js
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
````

## Axe helper
Il nous aide à visualiser les axes de direction dans notre scène
````js
const axesHelper = new THREE.AxesHelper(30)
scene.add(axesHelper);
````

## lil-gui
Il nous permet de gérer l'ui de manièere simple et fluide avec l'ajout de curseurs

On l'importe
````js
import GUI from 'lil-gui';
````

On le configure
````js
const gui = new GUI();
const parameters = {
    color: 0xffff00
}
//ici on ajoute à notre scene un color picker
gui.addColor(parameters, 'color');
gui.onChange(()=>{
    material.color.set(parameters.color)

})
//ici on va gérer la position du mesh sur l'axe y, avec un min à -3 un max à 3
//et une incrémentation de 0.01
gui.add(mesh.position, 'y', -3, 3, 0.01);

````

    





    


   

    





