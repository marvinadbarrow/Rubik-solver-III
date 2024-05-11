
    import * as THREE from 'three';
		import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
		import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
		import * as TWEEN from "https://unpkg.com/@tweenjs/tween.js@20.0.3/dist/tween.esm.js";


const container = document.querySelector( '.canvas' );
let rotationsSelector = []
let renderer, scene, camera, stats, controls, axesHelp, cube;
			let mesh;
			let raycaster;
			let line;

let orangeCenter, yellowCenter, redCenter, whiteCenter, greenCenter, blueCenter, whiteBkgnd, blackBkgnd;



// black and white background colours
whiteBkgnd = 0xFFFFFF
blackBkgnd = 0x000000

// ====================== SETUP AND VARIABLES ======================

				// NEW SCENE and scene background
        scene = new THREE.Scene()
				scene.background  = new THREE.Color( blackBkgnd);  

				// NEW CAMERA and camera position
				camera = new THREE.PerspectiveCamera( 95, window.innerWidth / window.innerHeight, 0.4, 1000 );
				camera.position.set(2.7, 3, 5)


				// NEW RENDERE
				renderer = new THREE.WebGLRenderer( {antialias: true} );
				renderer.setSize( window.innerWidth/2, window.innerHeight/2);

        renderer.setAnimationLoop( animationLoop );
        container.appendChild( renderer.domElement);

        // CONTROL CAMERA MOVEMENTS
        controls = new OrbitControls(camera, renderer.domElement);
				// THE BELOW CONTROLS DICTATE THE AUTO MOVEMENT OF THE CAMERA
				controls.enableDamping = true;
				controls.autoRotate = false;
				controls.autoRotateSpeed = 3;

      // textures for the stickers
      const redTexture = new THREE.TextureLoader().load('my_cube_textures/red.png')
      const orangeTexture = new THREE.TextureLoader().load('my_cube_textures/orange.png')
      const greenTexture = new THREE.TextureLoader().load('my_cube_textures/green.png')
      const blueTexture = new THREE.TextureLoader().load('my_cube_textures/blue.png')
      const yellowTexture = new THREE.TextureLoader().load('my_cube_textures/yellow.png')
      const whiteTexture = new THREE.TextureLoader().load('my_cube_textures/white.png')
      const blackTexture = new THREE.TextureLoader().load('my_cube_textures/black.png')

      var ambientLight = new THREE.AmbientLight( 0xffffff, 0.5 );
      scene.add( ambientLight );

    // direct light 
    const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
    // add direct light to scene
    scene.add( dirLight );

    axesHelp = new THREE.AxesHelper(2)
    scene.add(axesHelp)

    // renderer.setClearColor(blackBkgnd)



    var cubes = [];
    let manualCubes = []

             // ===================== MATERIALS ===================================

// 0xd12313
const boxMaterialRed = new THREE.MeshBasicMaterial({map: redTexture})
const boxMaterialOrange = new THREE.MeshBasicMaterial({map: orangeTexture})
const boxMaterialGreen = new THREE.MeshBasicMaterial({map: greenTexture})
const boxMaterialBlue = new THREE.MeshBasicMaterial({map: blueTexture})
const boxMaterialYellow = new THREE.MeshBasicMaterial({map: yellowTexture})
const boxMaterialWhite = new THREE.MeshBasicMaterial({map: whiteTexture})
const boxMaterialBlack = new THREE.MeshBasicMaterial({map: blackTexture})

// below is a key for the indexes in the array showing how they correspond to facets on positive or iegative x, y and z axes. 

/*
KEY: 
[X, -X, Y, -Y, Z, -Z]
*/
// ==================================== MATERIALS ==================================================

// ===================CREATE CUBE =============================

function renderNewCube(request){
  if(request){
    console.log('request')
  console.log(request)
  }
  

  cubes = []

let nameOfCubie

  // INITIAL CUBE SETUP for blank cubies and facet colours
  let testArray = []
let allCubeMaterials = []
let temp
for(let x= -1; x < 2; x++){
	for(let y= -1; y < 2; y++){
		for(let z= -1; z < 2; z++){
			const geometry =  new THREE.BoxGeometry( 1, 1, 1 )
		// cube = new THREE.Mesh( new RoundedBoxGeometry( ), material );

        let materialsArray = [boxMaterialBlack, boxMaterialBlack, boxMaterialBlack, boxMaterialBlack, boxMaterialBlack, boxMaterialBlack]





        // conditions for positive and negative z
if(z === 1){ // all positive z faces will be orange 
    materialsArray[4] = boxMaterialOrange
    if(y === 1){ // y = 1
        materialsArray[2] = boxMaterialYellow
        if(x === 1){ // x = 1
            materialsArray[0] = boxMaterialBlue
        }else if(x === 0){ // x = 0
            // edge piece so no third colour
        }else if(x === -1){
            materialsArray[1] = boxMaterialGreen 
        }
    }else if(y === 0){ // an edge or center because at least one axis value is zero
        // no Y color
        if(x === 1){ // x = 1
            materialsArray[0] = boxMaterialBlue
        }else if(x === 0){ 
                        // center piece already has its color
        }else if(x === -1){
            materialsArray[1] = boxMaterialGreen // orange green edge
        }

    }else if(y === -1){
        materialsArray[3] = boxMaterialWhite
        if(x === 1){ // x = 1
            materialsArray[0] = boxMaterialBlue
        }else if(x === 0){
            // center piece already has its z/ color
        }else if(x === -1){
            materialsArray[1] = boxMaterialGreen 
        }

    }
    

}else if(z === 0){ // no color for z at zero axis, and each cubie has is an edge or center piece - no more than two facets
    if(y === 1){ // y = 1
        materialsArray[2] = boxMaterialYellow
        if(x === 1){ // x = 1
            materialsArray[0] = boxMaterialBlue
        }else if(x === 0){ // x = 0
            // edge piece so no third colour
        }else if(x === -1){
            materialsArray[1] = boxMaterialGreen 
        }
    }else if(y === 0){ // an edge or center because at least one axis value is zero
        // no Y color
        if(x === 1){ // x = 1
            materialsArray[0] = boxMaterialBlue
        }else if(x === 0){ 
              // cube core - center
        }else if(x === -1){
            materialsArray[1] = boxMaterialGreen // orange green edge
        }

    }else if(y === -1){
        materialsArray[3] = boxMaterialWhite
        if(x === 1){ // x = 1
            materialsArray[0] = boxMaterialBlue
        }else if(x === 0){
            // face center
        }else if(x === -1){
            materialsArray[1] = boxMaterialGreen 
        }

    }



}else if(z === -1){
    materialsArray[5] = boxMaterialRed
    if(y === 1){ // y = 1
        materialsArray[2] = boxMaterialYellow
        if(x === 1){ // x = 1
            materialsArray[0] = boxMaterialBlue
        }else if(x === 0){ // x = 0
            // edge piece so no third colour
        }else if(x === -1){
            materialsArray[1] = boxMaterialGreen 
        }
    }else if(y === 0){ // an edge or center because at least one axis value is zero
        // no Y color
        if(x === 1){ // x = 1
            materialsArray[0] = boxMaterialBlue
        }else if(x === 0){ 
              // face center
        }else if(x === -1){
            materialsArray[1] = boxMaterialGreen // orange green edge
        }

    }else if(y === -1){
        materialsArray[3] = boxMaterialWhite
        if(x === 1){ // x = 1
            materialsArray[0] = boxMaterialBlue
        }else if(x === 0){
            // edge already has two facets
        }else if(x === -1){
            materialsArray[1] = boxMaterialGreen 
        }

    }

}

allCubeMaterials.push(materialsArray)
		cube = new THREE.Mesh( new RoundedBoxGeometry( ),materialsArray );
		cube.center = new THREE.Vector3( x, y, z );
		cube.geometry.translate( x, y, z );
    cubes.push( cube );
		testArray.push(
      {
        'coordinates':[x, y, z], 
      }
    )
	}
	}
}

console.log(testArray)
console.log(allCubeMaterials)
// this pushes the mesh with material and shape to the cubes array
// console.log(cubes)
// add the cubes to the scene
scene.add( ...cubes );

// console.log(scene)
// console.log(testArray)
// NOTE: unlike with myCube, the rotation of faces don't involve parenting to a specific center and then rotating that center.  Instead all cubies facing a specific direction are rotated around an axis.  

}

renderNewCube('first render')

function renderManualCube(array){
  console.log(array)
  let testArray = []
let allCubeMaterials = []
cubes = []
let x;
let y;
let z;
// create an array of objects where colour abbreviations are associated with boxMaterial'color'
let boxArray = [
 { 'abbrv': 'y', 'material': boxMaterialYellow},
 { 'abbrv': 'w', 'material': boxMaterialWhite},
 { 'abbrv': 'b', 'material': boxMaterialBlue},
 { 'abbrv': 'g', 'material': boxMaterialGreen},
 { 'abbrv': 'r', 'material': boxMaterialRed},
 { 'abbrv': 'o', 'material': boxMaterialOrange}
]

array.forEach(cubie =>{
// create geometry
const geometry =  new THREE.BoxGeometry( 1, 1, 1 )
// use all black materials array
let materialsArray = [boxMaterialBlack, boxMaterialBlack, boxMaterialBlack, boxMaterialBlack, boxMaterialBlack, boxMaterialBlack]
// assign each coordinate point the variable holding its name. 
x = cubie['coords'][0]
y = cubie['coords'][1]
z = cubie['coords'][2]



cubie['facets'].forEach((color, colorIndex) =>{
  boxArray.forEach(matt =>{
    if(matt['abbrv'] == color){
      // console.log(color)
      // console.log(matt['material'])
      let materialIndexPosition = cubie['materials'][colorIndex]
      materialsArray[materialIndexPosition] = matt['material']
    }
  })
})


cube = new THREE.Mesh( new RoundedBoxGeometry( ),materialsArray );


cube.center = new THREE.Vector3( x, y, z );
cube.geometry.translate( x, y, z );

cubes.push( cube );

})


scene.add( ...cubes );

}


function clearForManualConfig(){
  while(scene.children.length > 0){ 
    scene.remove(scene.children[0]); 
}
}

// when reset is pressed a new cube is created.
function clearCube(){
  while(scene.children.length > 0){ 
    scene.remove(scene.children[0]); 
}
setTimeout(() => {
  // wait for previous cubies removal to complete and then render a new cube
  renderNewCube('reset')
}, 20);
}

// ==========================================================================

// function for rendering manual scramble



			// list of rotations for each side (clockwise and counterclockwise)

      var rotations = [
        function rotateRightCW( )  { rotate( 'XYZ', 'x',  1, -1 ) },
        function rotateRightCCW( ) { rotate( 'XYZ', 'x',  1,  1 ) },
  
        function rotateLeftCW( )   { rotate( 'XYZ', 'x', -1,  1 ) },
        function rotateLeftCCW( )  { rotate( 'XYZ', 'x', -1, -1 ) },
  
        function rotateTopCW( )    { rotate( 'YZX', 'y',  1, -1 ) },
        function rotateTopCCW( )   { rotate( 'YZX', 'y',  1,  1 ) },
  
        function rotateBottomCW( ) { rotate( 'YZX', 'y', -1,  1 ) },
        function rotateBottomCCW( ){ rotate( 'YZX', 'y', -1, -1 ) },
  
        function rotateFrontCW( )  { rotate( 'ZXY', 'z',  1, -1 ) },
        function rotateFrontCCW( ) { rotate( 'ZXY', 'z',  1,  1 ) },
  
        function rotateBackCW( )   { rotate( 'ZXY', 'z', -1,  1 ) },
        function rotateBackCCW( )  { rotate( 'ZXY', 'z', -1, -1 ) },
  ];



// ==========================================================================

var rot = {k:0, oldK:0},
e = new THREE.Euler( );


// array for collecting cubies affected by rotation: 
let updatedCubies = []
function rotate( order, axis, sign, dir ){

// THIS CODE ROTATES THE FACES SO SOMETHING 'ELSE' ROTATES THE WHOLE CUBE
for( var cube of cubes ) if( sign*cube.center[axis] > 0.5 )
{


    cube.rotation.reorder( order );
    cube.rotation[axis] += dir * Math.PI/2 * (rot.k-rot.oldK);

    e.set( 0, 0, 0, order );
    e[axis] += dir * Math.PI/2 * (rot.k-rot.oldK);

    cube.center.applyEuler( e );

    
}
rot.oldK = rot.k;
}


// ==========================================================================
function restartSlow(kVal){
  // clear values from updated cubies array
  updatedCubies = []
	// variable for the number of turns parameter
	let param;
	let speed;

	switch(kVal){
		case 1: // SINGLE ROTATION
		 param = {k:1}

		break;
		case 2: // DOUBLE ROTATION
			 param = {k:2}

		break;
	}

	rot.k = 0;
		rot.oldK = 0;
		new TWEEN.Tween( rot )
		.to( param, 1800 )
		.easing( TWEEN.Easing.Quartic.InOut )
		.onUpdate(rotationsSelector[0])
		.start()
    
    setTimeout(() => {
      for(let i = 3; i<scene.children.length; i++){
        // only get the cubies lying on the rotated axis
        if(scene.children[i].center.y === 1){
          updatedCubies.push(scene.children[i])
    }
  
      }
  

    }, 10);
  
  }

// picks a random rotation, defines a tween for it and starts it

function restartRegular(kVal){
  // clear values from updated cubies array
  updatedCubies = []
	// variable for the number of turns parameter
	let param;


	switch(kVal){
		case 1: // SINGLE ROTATION
		 param = {k:1}

		break;
		case 2: // DOUBLE ROTATION
			 param = {k:2}

		break;
	}

	rot.k = 0;
		rot.oldK = 0;
		new TWEEN.Tween( rot )
		.to( param, 1200 )
		.easing( TWEEN.Easing.Quartic.InOut )
		.onUpdate(rotationsSelector[0])
		.start()
    
    setTimeout(() => {
      for(let i = 3; i<scene.children.length; i++){
        // only get the cubies lying on the rotated axis
        if(scene.children[i].center.y === 1){
          updatedCubies.push(scene.children[i])
    }
  
      }
  
    
    }, 10);
  
  }

function restart(kVal){
  // clear values from updated cubies array
  updatedCubies = []
	// variable for the number of turns parameter
	let param;
	let speed;

	switch(kVal){
		case 1: // SINGLE ROTATION
		 param = {k:1}

		break;
		case 2: // DOUBLE ROTATION
			 param = {k:2}

		break;
	}

	rot.k = 0;
		rot.oldK = 0;
		new TWEEN.Tween( rot )
		.to( param, 150 )
		.easing( TWEEN.Easing.Quartic.InOut )
		.onUpdate(rotationsSelector[0])
		.start()
    
    setTimeout(() => {
      for(let i = 3; i<scene.children.length; i++){
        // only get the cubies lying on the rotated axis
        if(scene.children[i].center.y === 1){
          updatedCubies.push(scene.children[i])
    }
  
      }

    }, 10);
 
  }

    function faceRotate3D(button, speed){
      // variables for array element to be used in TWEEN
      let algoArray = [];
      let  rotationParams, doubleRotationParams, kValue = 0
          if(manualConfigArray.length > 0){
          alert('turn off \' Real Scrambles \'')
        }else{
      
        let btnRotationsObj = {
          'U':[rotations[4], [U]],
          'U`': [rotations[5], [UP]],
           'D':[rotations[6],[D]],
           'D`':[rotations[7],[DP]],
           'L':[rotations[2],[L]],
           'L`':[rotations[3],[LP]],
           'R':[rotations[0],[R]],
           'R`':[rotations[1],[RP]],
           'F':[rotations[8],[F]],
           'F`':[rotations[9],[FP]],
           'B':[rotations[10],[B]],
           'B`':[rotations[11],[BP]],
            'U2':[rotations[4],[U2]],
            'D2':[rotations[6],[D2]],
            'L2':[rotations[2],[L2]],
            'R2':[rotations[0],[R2]],
            'F2':[rotations[8],[F2]],
            'B2':[rotations[10],[B2]],
            'N/A': ()=>{console.log('no move')},
            'rest': ()=>{console.log('no move')}
        }
if(button !== 'rest' && button !== 'N/A'){ // if buttonless command is not rest or N/A, which are null moves get the 3D and 2D rotations

  algoArray = btnRotationsObj[button][1]
  if(button.includes('2')){
    doubleRotationParams = btnRotationsObj[button][0] 
  }else{
   rotationParams = btnRotationsObj[button][0] 
  }
  
        if(rotationParams){
          kValue = 1
          rotationsSelector = []
        rotationsSelector.unshift(rotationParams)
        }else if(doubleRotationParams){
          kValue = 2
          rotationsSelector = []
        rotationsSelector.unshift(doubleRotationParams)
        }
        
        // if no solve is in progress, or a solve is in progress but not yet rendering, execute the algorithm so that the 2D cube matrix and facet elements can be updated
        if(solveInProgress.length < 1 || (solveInProgress > 0 && solveInProgress[0] !== 'rendering')){
          setTimeout(() => {
            algorithmExecution(algoArray)
  
          }, 10);
        }else{
          // console.log('solved cube is rendering - no need for matrix or facet updates')
        }
        
        if(!speed){
          restartRegular(kValue)
        }else{
          switch(speed){
            case 1500: restartRegular(kValue)
              break;
              case 2000: restartSlow(kValue)
                break;
                case 300: restart(kValue)
                  break;
          }
        }
  
}
        }
      }      

      

      function animationLoop( t )
      {
          TWEEN.update( t );
          // this updates the controls so the main cube rotation can be stopped from here also rather than changing each parameter of the controls
          // controls.update( );
          dirLight.position.copy( camera.position );
          renderer.render( scene, camera );
      }
      
// array for holding entire solution, each subarray contains a separate algorithm
let solutionArray = []

// modal output for recording moves

let paraOutput = document.getElementById('modal-para')

// output for number of moves
let movesPara = document.getElementById('moves-para')
// input for generated scrambles
// face rotation buttons default rotation
let faceRotateBtns = document.querySelectorAll('.face-rotate-btn')
// face rotation buttons prime rotation
let faceRotatePrimeBtns = document.querySelectorAll('.face-rotate-prime-btn')
// cube rotation buttons default rotation
let cubeRotationBtns = document.querySelectorAll('.cube-rotate-btn')
// cube rotation buttons prime rotation
let cubeRotatePrimeBtns = document.querySelectorAll('.cube-rotate-prime-btn')
// buttons for double rotations
let doubleFaceRotationBtns = document.querySelectorAll('.face-double-rotate-btn')
// button for inverting F2L scramble to render reflection of original
let inversionBtn = document.getElementById('inv-btn')
// buttons for test scrambles
let scrambleBtns = document.querySelectorAll('.test-scrambles') 

let manualConfigBtn = document.getElementById('manual-config')
// for solving speed buttons
let solveSpeedBtns = document.querySelectorAll('.solve-speed-btn')

// element with buttons for choosing how to configure a scrambled cube; by color picker select or by video scan - default display is 'none', will appear when config button is pressed. 
let configSelector = document.getElementById('config-type')
configSelector.style.display = 'none'
// button for choosing picker onece config type element is visible
let usePickerBtn = document.getElementById('use-picker')
// usePickerBtn.style.display = 'none'
let scanFaceBtn = document.getElementById('scan-face')
scanFaceBtn.style.display = 'none'

// color picker for manually configuring facet colors - hide until 'use picker' button is pressed
let colorModal = document.querySelector('.color-modal')
colorModal.style.display = 'none'
// button appears when in manual config mode; it replaces the button used to activate manual config
let cancelConfigBtn = document.getElementById('cancel-config')
cancelConfigBtn.style.display = 'none'
 
let scrambleConfigBtn = document.getElementById('scramble')

let cubeOrientationBtn = document.getElementById('orient-face')
cubeOrientationBtn.style.display = 'none'
let crossPiecePosition; 
let facetIndexes


solveSpeedBtns.forEach(button =>{
  button.addEventListener('click', event =>{
    chooseSolveSpeed(event.target.id)
  })
})
  //  DEFAULT FACE ROTATIONS (SINGLE)
  faceRotateBtns.forEach(button =>{
button.addEventListener('click', event =>{
  faceRotate(event.target.id)
})
})
  //  PRIME FACE ROTATIONS (SINGLE)
  faceRotatePrimeBtns.forEach(button =>{
  button.addEventListener('click', event =>{
    faceRotate(event.target.id)
  })
  })

  //  DEFAULT CUBE ROTATIONS
  cubeRotationBtns.forEach(button =>{
  button.addEventListener('click', event =>{
    faceRotate(event.target.id)
  })
  })
  //  PRIME CUBE ROTATIONS
  cubeRotatePrimeBtns.forEach(button =>{
    button.addEventListener('click', event =>{
      faceRotate(event.target.id)
    })
    })
// DOUBLE ROTATE BUTTON
    doubleFaceRotationBtns.forEach(button =>{
      button.addEventListener('click', event =>{
        faceRotate(event.target.id, 'double')
      })
      })

  // buttons for pre-solve configuration, manual, reset, solve
  let preSolveEl = document.getElementById('pre-solve')

  // buttons for post-solve; when user gets to choose speed of 3D cube solve
  let postSolveEl = document.getElementById('post-solve')
 // FACE ELEMENT
 postSolveEl.style.cssText = 'display:none;'
let faceElements = document.querySelectorAll('.face-element')


// IMPORT THE FACES ARRAYS FROM video capture JS
import { faceYellow, faceGreen, faceOrange, faceBlue, faceRed, faceWhite } from './video_capture.js';

// CHANGING CUBE STATE - RESET, SOLVE OR SCRAMBLE CUBE
  let cubeStateBtns = document.querySelectorAll('.cube-state-btn')

  // array to only alloqw characters that are  related to cube rotations, 
  let moveCharacters = [ 'U', 'D', 'L', 'R', 'B', 'F', '\'']
// preventing double appostrophes  - you could change the characters into a string and if two appostrophes are adjacent to each other then alert user of mistake.


// Rotation variables: these are sent in an array to the algorithm execution function which translates each element and uses it to execute the rotation function associated with the 'string' value of the element. 
let R = 'R'
let L = 'L'
let F = 'F'
let B = 'B'
let U = 'U'
let D = 'D'
let RP = 'R`'
let LP = 'L`'
let FP = 'F`'
let BP = 'B`'
let UP = 'U`'
let DP = 'D`'
let R2 = 'R2'
let L2 = 'L2'
let F2 = 'F2'
let B2 = 'B2'
let U2 = 'U2'
let D2 = 'D2'


// scrambles - the number part refer to the number of moves in the scramble
let scramble6a = [R,F2,U,FP,B2,LP]; // solves to F2L
let scramble6b = [D2,FP,D,U2,L,RP];  // solves to F2L
let scramble6c = [B2,L,BP,LP,B2,LP];  // solves to F2L
let scramble10a = [R2, U, F2, R, U2, LP, BP, L2, D, BP];  // STUCK AT CROSS (TWO ORIENTED PIECES) - solved, was missing algoExecution funcion and missed parenthesis on end of checkMidLayer function which executes after permuting the two. Scramble now solves to FL2
let scramble10b = [B2, RP, F, U, DP, BP, DP, U2, LP, U];  // solves to F2L
let scramble10c = [UP, FP, R, F2, B, L2, R, U, F, R];   // solves to F2L
let scramble15a = [RP, F2, U2, FP, RP, F2, UP, R2, BP, L2, UP, LP, R, D, LP];  // solves to F2L
let scramble15b = [L, R2, U, FP, B, LP, BP, U2, B, R, FP, R, L2, F, R2];   // solves to F2L
let scramble15c = [R2, U, B2, FP, R2, BP, D, BP, DP, FP];  // solves to F2L


let autoScrambles = [{'id': 'six_a', 'scramble': scramble6a}, {'id': 'six_b', 'scramble': scramble6b}, {'id': 'six_c', 'scramble': scramble6c}, {'id': 'ten_a', 'scramble': scramble10a}, {'id': 'ten_b', 'scramble': scramble10b}, {'id': 'ten_c', 'scramble': scramble10c}, {'id': 'fftn_a', 'scramble': scramble15a}, {'id': 'fftn_b', 'scramble': scramble15b}, {'id': 'fftn_c', 'scramble': scramble15c}]


 // SEVEN ALGORITHMS FOR 'ORIENT LAST  LAYER CORNERS'
 let antiSune = [R, U2, RP, UP, R, UP, RP]
 let sune = [R, U, RP, U, R, U2, RP]
 let buggy = [R, U2, RP, UP, R, U, RP, UP, R, UP, RP]
 let dragster = [R, U2, R2, UP, R2, UP, R2, U2, R]
 let spider = [FP, L, F, RP, FP, LP, F, R]
 let beetle = [L, F, RP, FP, LP, F, R, FP]
 let superman = [R, U2, RP, UP, RP, F, R, F2, LP, U, L, F]


 // PLL edges algorithms
 // two algorithms are needed for the case where one side face is solved and 3 are unsolved
let clockwiseSolvingEdge = [L2, R2, DP, RP, L, B2, R, LP, DP, L2, R2]
let anticlockSolvingEdge = [L2, R2, D, RP, L, B2, R, LP, D, L2, R2]
// arrays for when no side face is solved
// algorithm for where edges of opposite sides are swapped
let checkeredAlgoArray = [L2, R2, D2, L2, R2, UP, L2, R2, D2, L2, R2, U]
// algorithm for where the edges of two adjacent sides are swapped
let antiChecheredAlgoArray = [L2, R2, D, LP, R, F2, L2, R2, B2, LP, R, DP, L2, R2]

  // THE SINGLE ALGORITHM USED
  let backCornerSwapAlgoPLL = [R, U2, R2, F, R, FP, R, UP, RP, FP, U, F, R, UP, RP]
  // SPECIAL ALGORITHM FOR ANTI IDENTITY CASE
  let doubleCornerSwapAlgoPLL = [LP, U, RP, U2, L, UP, R, LP, U, RP, U2, L, UP, R] 
  let frontCornerSwapAlgoPLL = [L, U2, L2, B, L, BP, L, UP, LP, BP, U, B, L, UP, LP]
// algos for OLL edges; 2 already oriented edges
  let vEdgesOLLAlgo = [L, F, RP, F, R, F2, LP]
  let iEdgesOLLAlgo = [F, R, U, RP, UP, FP]
// no edges oriented algo
 let noEdgesOLLAlgo = [F, R, U, RP, UP, FP, U2, L, F, RP, F, R, F2, LP]

// the following array, which represents the entire cube.  Each subarray, which represents one face of the cube,  contains three subarrays, each of which represents the  layer of the cube, on which the row sits, as seen when looking directly at that face.  subarray[0]/[1]/[2] represent top, middle, bottom rows respectively (last, second and first layer respectively), and columns 1/2/3 represent L, M and R in cube notation (i.e. left, middle and right)
let cubeMatrixAlt = [
  [
    // UP
    ['y', 'y', 'y'],
    ['y', 'y', 'y'],
    ['y', 'y', 'y'],
  ], 
  // LEFT
  [
    ['g', 'g', 'g'],
    ['g', 'g', 'g'],
    ['g', 'g', 'g'],
  ],
  // FRONT
  [
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
    ['o', 'o', 'o'],
  ], 
  // RIGHT
  [
    ['b', 'b', 'b'],
    ['b', 'b', 'b'],
    ['b', 'b', 'b'],
  ],
  // DOWN
  [

    ['w', 'w', 'w'],
    ['w', 'w', 'w'],
    ['w', 'w', 'w'],
  ], 
  // BACK
  [

    ['r', 'r', 'r'],
    ['r', 'r', 'r'],
    ['r', 'r', 'r'],

  ], 
]

// cube in solved state for reset
const resetCube = [...cubeMatrixAlt]
// the below array will contain the configuration for the cube after face or cube rotation;
const newCube = []

console.log(localStorage)
// object holding conditions of different stages after they are tested. 
let stageConditionObj = {
  'cross': [], // just the cross pieces
  'F2L': [], // contains objects holding corner and edge F2L pieces
  'OLL_edges': [], // just the last layer edges
  'OLL_corners': [],
  'PLL_corners': [],
  'PLL_edges': [], 
  'completed_stage':'', 
  'incomplete_stage':'none', 
}
// records last layer edges
let upLayerEdges = []
// records mid layer edges
let midLayerEdges = []
// records first layer edges
let downLayerEdges = []
// records last layer corners
let upLayerCorners = []
// records first layer corners
let downLayerCorners = []
// holds all cubies but the center pieces 
let allCubiesArray = []

let cubieConstructorArray = []

let facetObjectArray = []

let F2LCornersFirstLayerArray = []
let F2LCornersLastLayerArray = []

// array for holding solve in progress value
let solveInProgress = []
let rotationDelay = 1500;


// arrays to hold facets for each face
let leftFacetArr = []
let rightFacetArr = []
let frontFacetArr = []
let backFacetArr = []
let upFacetArr = []
let downFacetArr = []
// subarrays for holding facet elements for each face
let facetMainArr  = [leftFacetArr, rightFacetArr, frontFacetArr, backFacetArr, upFacetArr, downFacetArr]

// array for facet class names, each facet has a classname, a string, that includes a spelled out word representing its integer position on the face
const facetsNames = [
  ['zero', 'one', 'two'],
  ['three', 'four', 'five'],
  ['six', 'seven', 'eight']
]

  //temporary arrays to hold correctly (and incorrectly) oriented cross pieces on the first layer
  let orientedCrossEdgeArray = []
let notOrientedCrossEdgeArray = []
 // array for index of incorrectly permuted cross piece when all cross pieces are on the down layer, but one of them is incorrectly permuted; 
let incorrectlyOrientedPieceArray = []

// array for cross edges on middle layer
let midLayerCrossEdgesArray = []

// arra containing solved F2L pair
let solvedF2LPairsArray = []
// this holds just the indexes of the solved F2L edges. 
let solvedF2LIndexesArray = []

// array for cross edges on middle layer
let lastLayerCrossEdgesArray = []
// to hold coordinates for all cubies
let cubieCoordinates = []

// when all stages are complete, each face of the cube will be checked, and the value in the zero position of this array will be incremented if for each face examined, all the facets of that face are the same colour.  If the value of the solved faces array reaches 6, then the cube is solved. 
let solvedFacesArray = [0]
   // variable for edge name
   let verticalEdgeName = []


// holds all cubies
let layerCubies = []

// variables for determining the colour of the facet
let faceColour;
let colourName;

// the below array records the number of faces recorded by the camera, and if the number if greater than 5 when the 'solve' button is pressed, if there are not black facets on the 2D cube, then the current configuration of the cube matrix can be processed for solving; Given that the matrix is already changed when the solve button is clicked (unlike for color pick use to change facet colours, where the matrix is only changed after the the last black facet has been coloured ), then the solve can be executed using the current matrix configuration. 
let facesVisualized = [0]

// =============================== START OF FUNCTION ==========================================//

import { resetFacets } from './video_capture.js';


function prepareNewFace(matrixCopy, array, index){
  console.log('array and index for changing cube')
matrixCopy[index] = [...array]
facesVisualized[0]++; // increment the value in facesVisualized
renderCube(matrixCopy, 'update')
}

export let acquireOrientation = '';

export function cameraColours(array){

  if(array){
    console.log('incoming face data from P5 js')
    console.log(array)
    // create a copy of cube matrix
    let newMatrix = clone(cubeMatrixAlt)
    let newFacetObject = {
      'y': () =>{prepareNewFace(newMatrix, array, 0)},
      'g': () =>{prepareNewFace(newMatrix, array, 1)},
      'o': () =>{prepareNewFace(newMatrix, array, 2)},
      'b': () =>{prepareNewFace(newMatrix, array, 3)},
      'r': () =>{prepareNewFace(newMatrix, array, 5)},
      'w': () =>{prepareNewFace(newMatrix, array, 4)},
       }

// execute prepare face array with the clone matrix and the face details
if(array[1][1]){
  newFacetObject[array[1][1]]()
}else{
  alert('no color information available; web cam may not be active')
  return
}

  }
}


const renderCube = (cube, update, double, doubleFace) =>{
  // clear cubie coordinates
// console.log(cube)
// facetMainArr
// console.log(cube)

// before starting, update the cube matrix and the arrays holding cubie elements; but only when there's an update
if(update){
// replace original cube with new configuration
cubeMatrixAlt = [...cube]

// arrays recording edge pice positions
upLayerEdges = [
  [cubeMatrixAlt[0][0][1], cubeMatrixAlt[5][0][1]],// UP-BACK
  [cubeMatrixAlt[0][1][0], cubeMatrixAlt[1][0][1]], // UP-LEFT
  [cubeMatrixAlt[0][2][1], cubeMatrixAlt[2][0][1]], // UP-FRONT
  [cubeMatrixAlt[0][1][2], cubeMatrixAlt[3][0][1]] // UP-RIGHT
]


upLayerCorners = [
[cubeMatrixAlt[0][0][0], cubeMatrixAlt[5][0][2], cubeMatrixAlt[1][0][0]],// UP-BACK-LEFT
[cubeMatrixAlt[0][2][0], cubeMatrixAlt[2][0][0], cubeMatrixAlt[1][0][2]], // UP-FRONT-LEFT
[cubeMatrixAlt[0][2][2], cubeMatrixAlt[2][0][2], cubeMatrixAlt[3][0][0]], // UP-FRONT-RIGHT
[cubeMatrixAlt[0][0][2], cubeMatrixAlt[5][0][0], cubeMatrixAlt[3][0][2]] // UP-BACK-RIGHT
]


midLayerEdges = [

  [cubeMatrixAlt[5][1][2], cubeMatrixAlt[1][1][0]], // BACK-LEFT
  [cubeMatrixAlt[2][1][0], cubeMatrixAlt[1][1][2]], // FRONT-LEFT
  [cubeMatrixAlt[2][1][2], cubeMatrixAlt[3][1][0]], // FRONT-RIGHT
  [cubeMatrixAlt[5][1][0], cubeMatrixAlt[3][1][2]] // BACK-RIGHT
]




downLayerEdges = [
  [cubeMatrixAlt[4][2][1], cubeMatrixAlt[5][2][1]], // DOWN-BACK
  [cubeMatrixAlt[4][1][0], cubeMatrixAlt[1][2][1]], // DOWN-LEFT
  [cubeMatrixAlt[4][0][1], cubeMatrixAlt[2][2][1]], // DOWN-FRONT
  [cubeMatrixAlt[4][1][2], cubeMatrixAlt[3][2][1]] // DOWN-RIGHT
]


downLayerCorners = [
[cubeMatrixAlt[4][2][0], cubeMatrixAlt[5][2][2], cubeMatrixAlt[1][2][0]],// DOWN-BACK-LEFT
[cubeMatrixAlt[4][0][0], cubeMatrixAlt[2][2][0], cubeMatrixAlt[1][2][2]], // DOWN-FRONT-LEFT
[cubeMatrixAlt[4][0][2], cubeMatrixAlt[2][2][2], cubeMatrixAlt[3][2][0]], // DOWN-FRONT-RIGHT
[cubeMatrixAlt[4][2][2], cubeMatrixAlt[5][2][0], cubeMatrixAlt[3][2][2]] // DOWN-BACK-RIGHT

]



// create coordinates for postion on the cube - the positions are stationary, but cubies move in and out of the positions by rotation
if(downLayerCorners.length > 0){
  downLayerCorners.forEach((corner, i) =>{
    let coords;
    let corners;
    let materialsPosition; // variable for assigning colour to material array holding six colours for the gemeometry
    // [x, -x, y, -y, z, -z]
    switch(i){
  case 0:
  coords = [-1, -1, -1]
  corners = [corner[2], corner[0], corner[1]]
  materialsPosition = [1, 3, 5]
  break;
  case 1:
  coords = [-1, -1, 1] 
  materialsPosition = [1, 3, 4]
    corners = [corner[2], corner[0], corner[1]]
  break;
  case 2:
    coords = [1, -1, 1]
    materialsPosition = [0, 3, 4]
    corners = [corner[2], corner[0], corner[1]]
  break;
  case 3:
    coords = [1, -1, -1] 
    materialsPosition = [0, 3, 5]
    corners = [corner[2], corner[0], corner[1]]
  break;
    }
    let newObj = { 'coords': coords, 'facets':corners, 'type': 'corners down', 'materials': materialsPosition}
  cubieCoordinates.push(newObj)
    
  })

}
if(downLayerEdges.length > 0){
  downLayerEdges.forEach((edge, i) =>{
    let coords;
    let facets;
    let materialsPosition
    i%2 === 0? facets = ['bl', edge[0], edge[1]]: facets = [edge[1], edge[0], 'bl']
    // let facets = []
    switch(i){
  case 0:
  coords = [0, -1, -1]
  materialsPosition = ['x', 3, 5]
  break;
  case 1:
    coords = [-1, -1, 0] 
    materialsPosition = [1, 3, 'x']
  break;
  case 2:
    coords = [0, -1, 1] 
    materialsPosition = ['x', 3, 4]
  break;
  case 3:
    coords = [1, -1, 0]
    materialsPosition = [0, 3, 'x']
  break;
    }
  
    let newObj = { 'coords': coords, 'facets':facets, 'type': 'edges down', 'materials': materialsPosition}
  cubieCoordinates.push(newObj)
  })
}
if(midLayerEdges.length > 0){
  midLayerEdges.forEach((edge, i) =>{
    let coords;
    let facets = [edge[1] ,'bl', edge[0]]
   let materialsPosition;
    // let facets = []
    switch(i){
  case 0:
  coords = [-1, 0, -1]
  materialsPosition = [1, 'x', 5]
  break;
  case 1:
    coords = [-1, 0, 1] 
    materialsPosition = [1, 'x', 4]
  break;
  case 2:
    coords = [1, 0, 1] 
    materialsPosition = [0, 'x', 4]
  break;
  case 3:
    coords = [1, 0, -1] 
    materialsPosition = [0, 'x', 5]
  break;
    }
  
    let newObj = { 'coords': coords, 'facets':facets, 'type': 'edges mid', 'materials': materialsPosition}
  cubieCoordinates.push(newObj)
  })
}
if(upLayerCorners.length > 0){
  upLayerCorners.forEach((corner, i) =>{
    let coords;
    let corners;
    let materialsPosition;
    // let facets = []
    switch(i){
  case 0:
  coords = [-1, 1, -1]
  materialsPosition = [1, 2, 5]
  corners = [corner[2], corner[0], corner[1]]
  break;
  case 1:
    coords = [-1, 1, 1] 
    materialsPosition = [1, 2, 4]
    corners = [corner[2], corner[0], corner[1]]
  break;
  case 2:
    coords = [1, 1, 1] 
    materialsPosition = [0, 2, 4]
    corners = [corner[2], corner[0], corner[1]]
  break;
  case 3:
    coords = [1, 1, -1] 
    materialsPosition = [0, 2, 5]
    corners = [corner[2], corner[0], corner[1]]
  break;
    }
    let newObj = { 'coords': coords, 'facets':corners, 'type': 'corners up', 'materials': materialsPosition}
  cubieCoordinates.push(newObj)
    
  })

}
if(upLayerEdges.length > 0){
  upLayerEdges.forEach((edge, i) =>{
    let coords;
    let facets;
    let materialsPosition;
    i%2 === 0? facets = ['bl', edge[0], edge[1]]: facets = [edge[1], edge[0], 'bl']
    // let facets = []
    switch(i){
  case 0:
  coords = [0, 1, -1]
  materialsPosition = ['x', 2, 5]
  break;
  case 1:
    coords = [-1, 1, 0] 
    materialsPosition = [1, 2, 'x']
  break;
  case 2:
    coords = [0, 1, 1]
    materialsPosition = ['x', 2, 4] 
  break;
  case 3:
    coords = [1, 1, 0] 
    materialsPosition = [0, 2, 'x']
  break;
    }
  
    let newObj = { 'coords': coords, 'facets':facets, 'type': 'edges up', 'materials': materialsPosition}
  cubieCoordinates.push(newObj)
  })
}
// now just push the center facets and center piece: but only activate once any of the other cubie corner or edge layers are populated
if(downLayerCorners.length > 0){
  for (let i = 0; i<7; i ++){
    let coords;
    let facets;
    let materialsPosition;
    switch(i){
  case 0:
    coords = [0, 0, -1]
    facets = ['bl', 'bl', 'r']
    materialsPosition = ['x', 'x', 5]
  break;
  case 1:
    coords = [-1, 0, 0]
    materialsPosition = [1, 'x', 'x']
    facets = ['g', 'bl', 'bl']
  break;
  case 2:
    coords = [0, 0, 1]
    materialsPosition = ['x', 'x', 4]
    facets = ['g', 'bl', 'o']
  break;
  case 3:
    coords = [1, 0, 0]
    materialsPosition = [0,'x', 'x']
    facets = ['b', 'bl', 'o']
  break;
  case 4:
    coords = [0, -1, 0]
    materialsPosition = ['x',3, 'x']
    facets = ['bl', 'w', 'bl']
  break;
  case 5:
    coords = [0, 1, 0]
    materialsPosition = ['x',2, 'x']
    facets = ['bl', 'y', 'bl']
  break;
  case 6:
    coords = [0, 0, 0]
    materialsPosition = ['x','x', 'x']
    facets = ['bl', 'bl', 'bl']
  break;
    }
    let newObj = { 'coords': coords, 'facets':facets, 'type': 'center', 'materials': materialsPosition}
    cubieCoordinates.push(newObj)
  
  }
}


}


  const runRender = (newConfig) =>{

    // on the cube matrix array for each subarray (representing one layer of the cube)
cube.forEach((face, faceIndex) =>{
  // loop through the layer elements


  face.forEach((layer, indexOfLayer) =>{



    layer.forEach((facet, indexOfFacet) =>{
      
// get facet color
      // get colour character from cube matrix array which corresponds to face array
      faceColour = facet
  
      let colorNameObj = {
         'g':'rgb(48, 233, 48)',
         'o':'orange',
         'b':'rgb(27, 109, 233)',
         'r':'red',
         'y':'yellow',
         'w':'white',
         'bl':'black',
      }
  
     // push facet to face array, unless a new configuration exists then push to the empty array
if(newConfig){

  function recolor(){
    let identifyer = 'ID_' + faceIndex + indexOfLayer + indexOfFacet
    faceElements[faceIndex].childNodes.forEach(child =>{
      if(child.id == identifyer){
        child.style.backgroundColor = colorNameObj[faceColour]
      }
    })
  }

if(faceIndex === 5){
recolor()
}else if(faceIndex === 4){
  recolor()
  }else if(faceIndex === 3){
    recolor()
    }else if(faceIndex === 2){
      recolor()
      }else if(faceIndex === 1){
        recolor()
        }else if(faceIndex === 0){
          recolor()
          }

}else{

  // create a div for each element (which represents a facet on the layer)
  let facetElement = document.createElement('div')
  // create an appropriate classname for the facet, the string on the current position
  let facetClass = 'facet-' + facetsNames[indexOfLayer][indexOfFacet]
  let centerFacetClass = 'facet-' + facetsNames[indexOfLayer][indexOfFacet] + ' center_facet'
  let elementId = 'ID_' + faceIndex + indexOfLayer + indexOfFacet
  
if(indexOfLayer === 1 && indexOfFacet === 1){
  // add center facet's classname to the div
  facetElement.setAttribute('class', centerFacetClass)

}else{
  // add facet's classname to the div
  facetElement.setAttribute('class', facetClass)
}

  
facetElement.setAttribute('id', elementId)

     // style the facet and add face colour
     facetElement.style.cssText = `width:50px; height:50px;  border:1px solid black; border-radius:5px; background-color:${ colorNameObj[faceColour]}`


  facetMainArr[faceIndex].push(facetElement)


// use facetMainArray elements to pupulate cube faces
  // on each face element
  faceElements.forEach((face, indexOfFace) =>{

    // find the corresponding group of facets
    facetMainArr[indexOfFace].forEach((facetMember, indexOfMember) =>{

      // append each facet to the face
      face.append(facetMember)
    })
    
  })


}

  // holds all cubies

    })
  
    })
  
  })

allCubiesArray = [
  {'first_layer_corners': downLayerCorners}, 
  {'last_layer_corners': upLayerCorners}, 
  {'first_layer_edges': downLayerEdges}, 
  {'mid_layer_edges': midLayerEdges}, 
  {'last_layer_edges': upLayerEdges}, 
]




  if(double == 'double'){
    let doubleRotateObject = {
      'up': ()=>{upRotate('u2-btnless')},
      'down': ()=>{downRotate('d2-btnless')},
      'left': ()=>{leftRotate('l2-btnless')},
      'right': ()=>{rightRotate('r2-btnless')},
      'front': ()=>{frontRotate('f2-btnless')},
      'back': ()=>{backRotate('b2-btnless')} 
   }
doubleRotateObject[doubleFace]()
      }
  }
// to render number of moves, get the text content from the moves output paragraph and convert to a number
  let lastMove = Number(movesPara.textContent)
if(double == 'double'){
  // when a double rotation is made, increase number by 0.5, so on the second move the number will increment by 1. 
lastMove + 0.5
}else{
// increment the value each time a non-double rotation is made
  lastMove ++
movesPara.textContent = lastMove
}


  // if this is not the first render then the update argument will have the string value 'update'
  if(update){
setTimeout(() => {
 let newArray = [[], [], [], [], [], []]
  runRender(newArray)
}, 20);


  }else{
runRender()
  }
  
}
// when page opens up the cube is rendered in the solved configuration
renderCube(cubeMatrixAlt)

// manual config array, will bring up a color palette modal for choosing colours on each face. 
let manualConfigArray = []
let tempConfigArray = []


//===== MANUAL CONFIGURATION OF CUBE =================================================
  // event lister for color modal
  colorModal.addEventListener('click', event =>{
  // if manual configuration is 'on'
  console.log(event.target.id)
    if(manualConfigArray.includes('configuring')){
      // place id of color element in the zero position of the config array
    switch(event.target.id){
      case 'green-col': manualConfigArray.unshift('rgb(48, 233, 48)')
      break;
      case 'blue-col': manualConfigArray.unshift('rgb(27, 109, 233)')
        break;
        default:
          // remove the '-col' part of the id from color-col
          let pureColor = event.target.id.replace('-col', '') 
          manualConfigArray.unshift(pureColor)
    }

   
    }else{
      alert('activate configuration to use color buttons') // alert if config if 'off' when color element is clicked
    }

  })

// CLONING CUBE ARRAY
const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);

// add event listener to the manual config button
manualConfigBtn.addEventListener('click', event =>{
  // console.log(event.target)
manualConfigOnOff()
  })



function manualConfigOnOff(){
  if(!manualConfigArray.includes('configuring')){
    // change color of manual config and solve config buttons
        manualConfigBtn.style.backgroundColor = 'rgb(188, 84, 230)'
        document.getElementById('use-camera').style.display = 'block';
        // if this value is in the manual config array then manual configuration is 'on'
        manualConfigArray.push('configuring')
    let manualConfigCube = clone(cubeMatrixAlt)
        // color ALL FACETS OF ALL FACES WHITE SO THAT THE MANUAL CONFIGURATION CAN START
      
      // make all facets on all faces black (aside from center pieces)
      manualConfigCube.forEach((face, index) =>{
    // variable for center piece - this will help user to see that they are inputting the colors on the correct face
        let centerPiece;
    
        switch(index){
    case 0: centerPiece = 'y'
    break;
    case 1: centerPiece = 'g'
    break;
    case 2: centerPiece = 'o'
    break;
    case 3: centerPiece = 'b'
    break;
    case 4: centerPiece = 'w'
    break;
    case 5: centerPiece = 'r'
    break;
    
        }
          face.forEach((row, rowIndex) =>{ // on each face clear all three elements on earch row
          row.shift()
          row.shift()
          row.shift()
          // if the row is a middle row
         if(rowIndex === 1){ // add the center piece color either side of the black facets
          row.push('bl', centerPiece, 'bl')
         }else{
          row.push('bl', 'bl', 'bl') // on other rows all facets are black
         }
          })
      
        })
      // hide manual scrambles
        document.getElementById('manual-scrambles').style.display = 'none'
        // show configuration type selector
        configSelector.style.display = 'block'
        // hide manual config button
        manualConfigBtn.style.display = 'none'
        // hide reset button
        document.getElementById('reset').style.display = 'none'
        // show cancel config button
        cancelConfigBtn.style.display = 'block'
      // render the all-black cube
      renderCube(manualConfigCube, 'update')
      }else{
        colorModal.style.display = 'none'
        usePickerBtn.style.display = 'block'
// show manual scrambles
document.getElementById('manual-scrambles').style.display = 'block'
// hide configuration type selector
configSelector.style.display = 'none'
    cancelConfigBtn.style.display = 'none'
    document.getElementById('reset').style.display = 'block'
        // configSelector.style.display = 'none'
       // pressing the button a second time will return the cube to normal config
       manualConfigArray = []
       renderCube(resetCube, 'update')
       manualConfigBtn.style.display = 'block'
       // give config buttons black background
       manualConfigBtn.style.backgroundColor = 'rgb(136, 134, 134)'

    //if manualConfigArray contains elements, this is also activated when the cube is solved, and so the manual configuration will be turned off and the cube state reset to pre-scramble and auto configurations, allowing auto scrambles. 
      }
}


  // click on facet to change its color
  faceElements.forEach(button =>{
    button.addEventListener('click', event =>{
   
    // below operations occur only if manual configuring is 'on'
    if(manualConfigArray.includes('configuring')){

if(manualConfigArray.length > 1){ // a color has to be selected
  // get the facet classList 
  let facetClass = event.target.getAttribute('class')

  // reject clicks on center facets because they should not be changed to another colour
  if(facetClass.includes('center_facet')){
    alert('center facets cannot have their colours changed')
  }else{


   // change background color of the clicked facet to the color at position zero in config array
    event.target.style.backgroundColor = manualConfigArray[0]

  }

}else{
  alert('pick a color to configure facet')
}
    }else{
      alert('activate configuration and pick color to change facet color')
    }
  
    })
    })

// object containing button activated functions for rotations
    let buttonFunctionObj = {
      'u-btn': () =>{faceRotate3D('U')},
      'u-prime-btn':() =>{faceRotate3D('U`')},
        'u2-btn': () =>{faceRotate3D('U2')},
      'd-btn': () =>{faceRotate3D('D')},
      'd-prime-btn': () =>{faceRotate3D('D`')},
        'd2-btn': () =>{faceRotate3D('D2')},
      'l-btn': () =>{faceRotate3D('L')},
      'l-prime-btn': () =>{faceRotate3D('L`')},
        'l2-btn': () =>{faceRotate3D('L2')},
      'r-btn': () =>{faceRotate3D('R')},
      'r-prime-btn': () =>{faceRotate3D('R`')},
        'r2-btn': () =>{faceRotate3D('R2')},
      'f-btn': () =>{faceRotate3D('F')},
      'f-prime-btn': () =>{faceRotate3D('F`')},
        'f2-btn': () =>{faceRotate3D('F2')},
      'b-btn': () =>{faceRotate3D('B')},
      'b-prime-btn': () =>{faceRotate3D('B`')},
        'b2-btn': () =>{faceRotate3D('B2')}
   }
// this function is for button activated rotations
function faceRotate(button, double){
  if(manualConfigArray.length > 0){
    alert('turn off manual configuration')
  }else{ buttonFunctionObj[button]()
  }

}
 
let rowArr = [0, 1, 2]
let indexSwap = [2, 1, 0]
let aboutYFaces = [1, 2, 3, 5]
let aboutXFaces = [0, 2, 4, 5]
let lCW = [[0, 0, 5, 2, 2], [2, 0, 0, 0, 0], [4, 0, 2, 0, 0], [5, 2, 4, 0, 2]]
let lCCW = [[0, 0, 2, 0, 0], [2, 0, 4, 0, 0], [5, 2, 0, 0, 2], [4, 0, 5, 2, 2 ]]
let rCW = [[0, 2, 2, 2, 0], [2, 2, 4, 2, 0], [4, 2, 5, 0, 2], [5, 0, 0, 2, 2 ]]
let rCCW = [[0, 2, 5, 0, 2], [2, 2, 0, 2, 0], [4, 2, 2, 2, 0], [5, 0, 4, 2, 2]]
let fCWa = [[0, 2, 1, 2], [4, 0, 3, 0]]
let fCWb = [[3, 0, 0, 2], [1, 2, 4, 0]]
let fCCWa = [[1, 2, 0, 2], [3, 0, 4, 0]]
let fCCWb = [[0, 2, 3, 0], [4, 0, 1, 2]]
let bCWa = [[0, 0, 3, 2], [4, 2, 1, 0]]
let bCWb = [[1, 0, 0, 0], [3, 2, 4, 2]]
let bCCWa = [[3, 2, 0, 0], [1, 0, 4, 2]]
let bCCWb = [[0, 0, 1, 0], [4, 2, 3, 2]]
// U or U' move
function upRotate(button, double){
  let preRotateCube = clone(cubeMatrixAlt)
button == 'u-prime-btn'? rotCCW(): rotCW()// if button id is 'prime' rotate CCW otherwise CW

  function rotCCW(){
    aboutYFaces.forEach((x, i) =>{preRotateCube[x][0] = cubeMatrixAlt[aboutYFaces[(i+3)%4]][0]})
    indexSwap.forEach(y =>{ rowArr.forEach((x) =>{preRotateCube[0][x][y] = cubeMatrixAlt[0][y][2-x]})})
    renderCube(preRotateCube, 'update')
  }
  function rotCW(){
    aboutYFaces.forEach((x, i) =>{preRotateCube[x][0] = cubeMatrixAlt[aboutYFaces[(i+1)%4]][0]})
  indexSwap.forEach(y =>{rowArr.forEach((x)=>{preRotateCube[0][y][x] = cubeMatrixAlt[0][2-x][y]})})
double == 'double'? renderCube(preRotateCube, 'update', double, 'up'): renderCube(preRotateCube, 'update')
  }
}

// D or D' move
function downRotate(button, double){
  let preRotateCube = clone(cubeMatrixAlt)
  button == 'd-prime-btn'?rotCCW(): rotCW()// if button id is 'prime' rotate CCW otherwise CW

  function rotCCW(){
    aboutYFaces.forEach((x, i) =>{preRotateCube[x][2] = cubeMatrixAlt[aboutYFaces[(i+1)%4]][2]})
    indexSwap.forEach(y =>{ rowArr.forEach((x)=>{preRotateCube[4][x][y] = cubeMatrixAlt[4][y][2-x]})}) 
    renderCube(preRotateCube, 'update')
  }
  function rotCW(){
    aboutYFaces.forEach((x, i) =>{preRotateCube[x][2] = cubeMatrixAlt[aboutYFaces[(i+3)%4]][2]})
    indexSwap.forEach(y =>{ rowArr.forEach((x)=>{preRotateCube[4][y][x] = cubeMatrixAlt[4][2-x][y]})})
  double == 'double'? renderCube(preRotateCube, 'update', double, 'down'): renderCube(preRotateCube, 'update')
  }
}

// L or L' move
function leftRotate(button, double){
  let preRotateCube = clone(cubeMatrixAlt)  
  button == 'l-prime-btn'?rotCCW(): rotCW()// if button id is 'prime' rotate CCW otherwise CW

  function rotCCW(){
rowArr.forEach((x) =>{lCCW.forEach(sub =>{
  preRotateCube[sub[0]][x][sub[1]] = cubeMatrixAlt[sub[2]][Math.abs(sub[4]-x)][sub[3]]})//B3
  indexSwap.forEach(y =>{preRotateCube[1][x][y] = cubeMatrixAlt[1][y][2-x]})})
  renderCube(preRotateCube, 'update')
  }
  function rotCW(){
    rowArr.forEach((x) =>{lCW.forEach(sub =>{
      preRotateCube[sub[0]][x][sub[1]] = cubeMatrixAlt[sub[2]][Math.abs(sub[4] - x)][sub[3]]})/
      indexSwap.forEach((y) =>{preRotateCube[1][y][x] = cubeMatrixAlt[1][2-x][y]})
      })
      double == 'double'? renderCube(preRotateCube, 'update', double, 'left'): renderCube(preRotateCube, 'update')
  }
}

// R or R' move
function rightRotate(button, double){
  let preRotateCube = clone(cubeMatrixAlt)
  button == 'r-prime-btn'?rotCCW(): rotCW()// if button id is 'prime' rotate CCW otherwise CW
  function rotCCW(){
    rowArr.forEach((x) =>{rCCW.forEach(sub =>{
      preRotateCube[sub[0]][x][sub[1]] = cubeMatrixAlt[sub[2]][Math.abs(sub[4]-x)][sub[3]]})//B3
      indexSwap.forEach(y =>{preRotateCube[3][x][y] = cubeMatrixAlt[3][y][2-x]})
      })
    renderCube(preRotateCube, 'update')
  }
  function rotCW(){
    rowArr.forEach((x) =>{rCW.forEach(sub =>{
      preRotateCube[sub[0]][x][sub[1]] = cubeMatrixAlt[sub[2]][Math.abs(sub[4] - x)][sub[3]]})//B3
      indexSwap.forEach((y) =>{preRotateCube[3][y][x] = cubeMatrixAlt[3][2-x][y] })
          })
  double == 'double'? renderCube(preRotateCube, 'update', double, 'right'): renderCube(preRotateCube, 'update')
  }
}

// F or F' move
function frontRotate(button, double){
  let preRotateCube = clone(cubeMatrixAlt)
  button == 'f-prime-btn'?rotCCW(): rotCW()// if button id is 'prime' rotate CCW otherwise CW
  function rotCCW(){
    rowArr.forEach((x) =>{
      fCCWa.forEach(sub =>{preRotateCube[sub[0]][x][sub[1]] = cubeMatrixAlt[sub[2]][sub[3]][2-x]})//B2
      fCCWb.forEach(sub =>{preRotateCube[sub[0]][sub[1]][x] = cubeMatrixAlt[sub[2]][x][sub[3]]}) //A
      indexSwap.forEach(y =>{preRotateCube[2][x][y] = cubeMatrixAlt[2][y][2-x]})// face
          })
      renderCube(preRotateCube, 'update')
  }
  function rotCW(){
    rowArr.forEach((x) =>{
      fCWa.forEach(sub =>{preRotateCube[sub[0]][sub[1]][x] = cubeMatrixAlt[sub[2]][2-x][sub[3]]})//A
      fCWb.forEach(sub =>{preRotateCube[sub[0]][x][sub[1]] = cubeMatrixAlt[sub[2]][sub[3]][x]}) //B1
      indexSwap.forEach((y) =>{preRotateCube[2][y][x] = cubeMatrixAlt[2][2-x][y]}) // face
          })
    double == 'double'? renderCube(preRotateCube, 'update', double, 'front'): renderCube(preRotateCube, 'update')
  }
}

// B or B' move
function backRotate(button, double){
  let preRotateCube = clone(cubeMatrixAlt) 
  button == 'b-prime-btn'?rotCCW(): rotCW()// if button id is 'prime' rotate CCW otherwise CW
  function rotCCW(){
    rowArr.forEach(x =>{
      bCCWa.forEach(sub =>{preRotateCube[sub[0]][x][sub[1]] = cubeMatrixAlt[sub[2]][sub[3]][x]})//B1
      bCCWb.forEach(sub =>{preRotateCube[sub[0]][sub[1]][x] = cubeMatrixAlt[sub[2]][2-x][sub[3]]}) //A
      indexSwap.forEach(y =>{preRotateCube[5][x][y] = cubeMatrixAlt[5][y][2-x]})
            })
    renderCube(preRotateCube, 'update')
  }
  function rotCW(){
    rowArr.forEach(x =>{
      bCWa.forEach(sub =>{preRotateCube[sub[0]][sub[1]][x] = cubeMatrixAlt[sub[2]][x][sub[3]]}) //A
      bCWb.forEach(sub =>{preRotateCube[sub[0]][x][sub[1]] = cubeMatrixAlt[sub[2]][sub[3]][2-x]})//B2
      // faceRotationMain(5, 'CW')
      indexSwap.forEach(y =>{preRotateCube[5][y][x] = cubeMatrixAlt[5][2-x][y]})
          })
    double == 'double'? renderCube(preRotateCube, 'update', double, 'back'): renderCube(preRotateCube, 'update')
  }
}

  let buttonInactive = []
let unsolvedArray;
let speedControl = 300

scrambleBtns.forEach(btn =>{ 
 // speed control for rotational delay change
  rotationDelay = speedControl
  btn.addEventListener('click', (e) =>{

  autoScrambles.forEach(obj =>{
    // only allow one button press during auto
      if(obj['id'] == e.target.id){
        if(buttonInactive.length < 1){ 
          buttonInactive.push('active')
        preAutoScramble(obj['scramble'], rotationDelay)
  }
    }

  })
  })
 })



function preAutoScramble(array, speed){
  console.log('speed')
  console.log(speed)
  let speedOffset, algoTime, velocity
  if(speed){
    speedOffset = speed + 5
    algoTime = array.length*speedOffset
    velocity = speed
  }else{
    algoTime = array.length*1510
    velocity = 1500
  }


array.forEach((rotation, i) =>{
 setTimeout(() => {
   faceRotate3D(array[i], speed)
 }, i*speed);
})

setTimeout(() => {
  rotationDelay = speedControl
  buttonInactive = []  
// hide solve speed buttons
if(solveInProgress.length > 0){
// clear all arrays containing cross pieces and F2L solved indexes
  solvedF2LIndexesArray = []
  downLayerEdges = []
  lastLayerCrossEdgesArray = []
  midLayerCrossEdgesArray = []
  orientedCrossEdgeArray = []
  notOrientedCrossEdgeArray = []

  stageConditionObj = {
    'cross': [], // just the cross pieces
    'F2L': [], // contains objects holding corner and edge F2L pieces
    'OLL_edges': [], // just the last layer edges
    'OLL_corners': [],
    'PLL_corners': [],
    'PLL_edges': [], 
    'completed_stage':'', 
    'incomplete_stage':'none', 
  }

  alert(`cube solved in: ${solutionArray.length} moves
  page will reset
  `)


location.reload()
  console.log('3D CUBE SOLVE COMPLETED...')
  // solveInProgress = []
  // solutionArray = []
  
  resetAllCubes()
postSolveEl.style.cssText = 'display:none;'
preSolveEl.style.cssText = 'display:block'
}

}, algoTime);
}


function scrambleConfiguration(){
  // clear cubie coordinates
cubieCoordinates = []

  // if a cube is already configered, it will be stored in local storage, and, for testing purposes, for now, that configuration can be used, rather than having to create a configuration each time the script is saved, because it takes a few minutes to select all colors; it's better to use a copy because it's needless repetition if the configuration has already been created; especially when testing. 
  let configuredCube

      // to prevent the black cube (or any faces with black facets) being saved, check the cube's facets, and if any black facet exists,
      let blackFacets = 0;

  if(facesVisualized.length > 5){
    // 
    configuredCube = cubeMatrixAlt
    solveManualConfiguration('solve')
    // console.log(configuredCube)
  }else{ // if test scramble doesn't exist, then the cube needs manual configuration again

    // console.log(cubeMatrixAlt)
    // create a clone array from the current cube array - this will be the black cube that is created to replace the solved cube to make it ready for the array which holds the facets configurations which represents a scrambled cube - in other words all facets have been manually coloured to represent a real scramble. 
     configuredCube = clone(cubeMatrixAlt)





    // At this stage, each face is looped through, then each facet of the face have its color pushed to the subarray corresponding to the facet's row; that subarray will be in the one of the main six subarrays that has the index corresponding to the face element index on the dom element refering to face indexes. 
    
    
      // for determining which row the color will be set to
      let faceRow;
     // for renaming the facet color with the abbreviation used in the cube array
     let colorAbbrv;
    
    
    faceElements.forEach((face, indexOfFace) =>{
       face.childNodes.forEach((child, indexOfChild) =>{
        // get face index, child index and child color
          let faceIndex = indexOfFace
          let childColor = child.style.backgroundColor;
          let childIndex = indexOfChild
            // condition for examing the child index to determine which row the child color should be applied to 
       if(childIndex < 3){
        faceRow = 0
           }else if(childIndex < 6){
            faceRow = 1
           }else{
            faceRow = 2
           }
           
          // switch child colour to get abbreviation
           switch(childColor){ 
            case 'rgb(48, 233, 48)': colorAbbrv = 'g'
            break;
            case 'orange': colorAbbrv = 'o'
            break;
            case 'rgb(27, 109, 233)': colorAbbrv = 'b'
            break;
            case 'red': colorAbbrv = 'r'
            break;
            case 'yellow': colorAbbrv = 'y'
            break;
            case 'white': colorAbbrv = 'w'
            break;
            case 'black': colorAbbrv = 'bl' 
              }
    
    // object to store facet details
          let facetObject = {
            'index_of_face': faceIndex,
            'facet_index': childIndex,
            'face_row': faceRow,
            'color_abbrv': colorAbbrv
          }
          facetObjectArray.push(facetObject)
    
       })
    
    })
    
    // plot colors in clone cube array
    configuredCube.forEach((face, index) =>{
      facetObjectArray.forEach((object) =>{
    if(object['index_of_face'] === index){
      face.forEach((row, rowIndex) =>{
        if(object['face_row'] === rowIndex){
          row.shift()
          row.push(object['color_abbrv'])
        }
      })
    }
    
      })
    
    })


    configuredCube.forEach((face) =>{
      face.forEach((row) =>{
        row.forEach(facet =>{
          if(facet == 'bl'){
            blackFacets ++
          }
        })
      })
    })

  }
 

  // update initial cube with stored or manually configered cube

renderCube(configuredCube, 'update')

// the solve should only run if there are no black facets
if(blackFacets > 0){
  // let testScramble = JSON.stringify(configuredCube)
  // localStorage.setItem('test_scramble_1', testScramble)
  alert('cube is not configered; a solve will not be executed')
}else{
  setTimeout(() => {
    solveManualConfiguration('solve')
 }, 1000);

}

}


function solveManualConfiguration(){
  if(downLayerEdges.length > 0){

    // clear current 3D cube
    clearForManualConfig()
    // render manual scramble
    setTimeout(() => {
      renderManualCube(cubieCoordinates)
    }, 20);
  
    setTimeout(() => {
      // MANUAL config array needs to be set in order for solve to run
      manualConfigArray = []
      changeCubeState('solve')
    }, 100);
    // clear solution array so scramble algorithm is removed and only solve algorithms are recorded
    // solutionArray = []
    // confirmCross()
  }else{
    alert('cube not scrambled: no moves executed yet; scramble cube before solving')
  }
}

function resetAllCubes(){
  renderCube(resetCube, 'update')
  clearCube()
}

const changeCubeState = (clickedButton) =>{
  console.log('clicked state button')
  console.log(clickedButton)
  let stateButton = clickedButton
  
  switch(stateButton){

    // only allow scramble button (this is the manual config scramble) if manual configuration is turned on 
    case 'scramble': 
    if(manualConfigArray.length > 0){
   
    }else{
      alert('turn on manual configuration')
    }
    break;

    // === below are only activated if manual configuration is turned off =======
    case 'solve': console.log('solving cube...')
rotationDelay = 35
    if(manualConfigArray.length > 0){
      scrambleConfiguration()
    }else{
      // reset the number of moves in the output so you can see the number of moves it takes to solve 
      if(downLayerEdges.length > 0){
        // clear solution array so scramble algorithm is removed and purely solve algorithms are recorded
        solutionArray = []
        solveInProgress.push('solve in progress')
  //// start with confirm cross to see if it is already complete  
        confirmCross()
      }else{
        alert('cube not scrambled: no moves executed yet; scramble cube before solving')
      }
    }
    
    break;
    case 'reset': // reset button was clicked
    if(manualConfigArray.length > 0){
      alert('turn off manual configuration')
    }else{
      // then only if a at least one rotation has been made
      if(downLayerEdges.length > 0 ){
        paraOutput.textContent = 0
resetAllCubes()
      }else{
        alert(' cube is already in solved state: no need for a reset')
      }
    }
    break;
    case 'cancel-config':
      if(downLayerEdges.length > 0 ){

resetAllCubes()
        // hide cancel config button and buttons for selecting configuration type
        manualConfigOnOff()
        // show reset button, manual config button and scramble buttons
      }else{
        alert(' cube is already in solved state: no need for a reset')
      }
      break;
      case 'use-picker': colorModal.style.display = 'grid';
      usePickerBtn.style.display = 'none'
      document.getElementById('use-camera').style.display = 'none';
      break;
      case 'use-camera': 
      usePickerBtn.style.display = 'none'
      document.getElementById('use-camera').style.display = 'none';
      cubeOrientationBtn.style.display = 'block';
      break;
      case 'orient-face':
       
        // scanFaceBtn.style.display = 'block'
        alert('initiating copy process of faces 1 and 2')
        acquireOrientation = 'aquiring orientation'
        setTimeout(() => {
          resetFacets()
        }, 1000);
        break;
      case 'scan-face':
        console.log('resetting facets')
        resetFacets()
        break;
  }
}

// CUBE STATE BUTTONS EVENT LISTENER
cubeStateBtns.forEach(button =>{
  button.addEventListener('click', e =>{
    changeCubeState(e.target.id)
})
  })


  class CrossObject{
    constructor(index, edge, position, orientation){
      this['index_in_layer'] = index;
      this['cross_piece'] = edge;
      this['piece_position'] = position;
      this['oriented'] = orientation;
    }
  }


// get rotations for up or down layer - usually for setup moves pre algorithm execution
  function layerRotationGetter(index, layer){
    let uprotationsObj = {
      'uLayer':{
        0:'N/A',
        1:UP,
        2:U2,
        3:U
      }, 
      'dLayer':{
        0:'N/A',
        1:D,
        2:D2,
        3:DP
      }
    }
    return uprotationsObj[layer][index]
    
      }
// for inserting oriented or unoriented last layer cross pieces
function lastLayerCrossEdgeInsertion(position, unoriented){
  let algoObjectDefault = { // object cross pieces where color facet is not side face
    'back': [B, D, LP],
    'left': [L, D, FP],
    'front': [F, D, RP],
    'right': [R, D, BP,]
  }

  let unorientedObj = { // object cross pieces where color facet IS side face
    'back': [B, L],
    'left': [L, F],
    'front': [F, R],
    'right': [R, B,]
  }

  if(unoriented){return unorientedObj[position]
  }else{return(algoObjectDefault[position])}

}

// gets setup move for F2L levels 1/2 and 1/3 cases
function setupMoveAlgo(rotator){
  let setupObj = { 
    0:'N/A',
    1:UP,
    2:U2,
    3:U
   }
  return setupObj[rotator]
}

// for joining a separated F2L pair
 function pairJoinAlgorithm(edgeIndx, layer){
  console.log('CHECKING PARAMS FOR ALGO FINDER')
  console.log(edgeIndx, layer)
let uRot;
layer == '23'?uRot = 'N/A':layer == '12'? uRot = U: uRot = UP
let algoObject = {
  0:[L, uRot, LP],
  1:[F, uRot, FP],
  2:[R, uRot, RP],
 3:[B, uRot, BP],
}
return algoObject[edgeIndx]
 }

// finds position name of a down layer cross piece
  function positionFinder(index){
    let positionObj = {
      0:'down-back',
      1:'down-left',
      2:'down-front',
      3:'down-right'
    }
return positionObj[index]
  }

// uses position name of edge to determine required double rotation
  function doubleRotateFinder(position){
let positionObj = {
  'back': B2,
  'left': L2,
  'front': F2,
  'right': R2,
}
return positionObj[position]
  }
//determines how far apart two oriented cross pieces should be when solved; 
  function crossPieceDistanceFinder(master, child){
    const masterColorObj = {
      'o':{
        'g':3,
        'r':2,
        'b':1,
      }, 
      'b':{
        'o':3,
        'g':2,
        'r':1,
      }, 
      'r':{
        'b':3,
        'o':2,
        'g':1,
      }, 
      'g':{
        'r':3,
        'b':2,
        'o':1,
      }, 
      }
      return masterColorObj[master][child]
  }

// moves single cross piece (oriented or unoriented) to its permuted position; 
function unorientedCrossPiecePlacer(indx, status){
  let dRot; 
  status? dRot = D: dRot = 'N/A'
  let piecePlacementAlg = {
    0:[B, DP, R, dRot],
    1:[L, DP, B, dRot],
    2:[F, DP, L, dRot],
    3:[R, DP, F, dRot]
  }
  return piecePlacementAlg[indx]
}

// finds natual index of an F2L edge or corner
function naturalIndexFinder(colorAbbr){
  let finderObject = {
    'r':0,
    'gr':0,
    'g':1,
    'go':1,
    'o':2,
    'bo':2,
    'b':3,
    'br':3,
  }
  return finderObject[colorAbbr]
  }
  
  // finds F2L pair after positioning for solve
  function newCornerEdgeFinder(array, oldEdge, type){
    let resultsArr = [], testPiece;
    array.forEach((newPiece, pieceIndex) =>{
  type = 'corners'? testPiece = newPiece.filter(x => x !== 'w').sort().join('').toString(): testPiece = [...newPiece].sort().join('').toString();
  let copyOfOldEdge = [...oldEdge].sort().join('').toString()
  if(testPiece == copyOfOldEdge){
  resultsArr.push(newPiece, pieceIndex)
  }
    })
  return resultsArr
  }
  // object containing information about corner and edge of F2L pair
  class PairObject{
    constructor(cIndx, newEdge, eIndx, newCorner, parallel, whiteAxis, solved){
      this['index_of_corner'] = cIndx
      this['edge'] = newEdge
      this['index_of_edge'] = eIndx
      this['corner'] = newCorner
      this['is_parallel'] = parallel
      this['axis_of_white'] = whiteAxis
      this['solved_edge'] = solved
    }
  }
  
  // for angle of F2L pair; parallel or perpendicular
  const f2lOrientationOjb = {
    0:[true, false],
    1:[true, false],
    2:[true, false],
    3:[true, false],
  }
  // get angle status of f2l pair
  function getF2Lorientation(cornIndx, edgeIndx){
    if(edgeIndx === cornIndx){
      return f2lOrientationOjb[cornIndx][0]
    }else{ return f2lOrientationOjb[cornIndx][1]}
  }
  
  // get axis of white facet on F2L corner, when pair is sitting on last layer
  function findWhiteAxis(array){ let axis;
    array[0] == 'w'? axis = 'z': array[1] == 'w'? axis = 'y': axis = 'x';
    return axis;
    }
  
  // gets pair solved status where white facet aligns with x or y axis (one edge solved or not)
  function getF2LSolvedStatusXY(facetEquality){
  let statusObject = {
    'true':true,
    'false':false
  }
  return statusObject[facetEquality]
  }
  
  // gets pair solved status where white facet aligns with z axis (one edge solved or not)
  function getF2LSolvedStatusZ(arrayString){
    let statusObj = {
       'true,false,true,true': false,
       'true,false,true,false': true,
       'true,false,false,true': true,
       'true,false,false,false': false,
       'false,true,true,true': true,
       'false,true,true,false': false,
       'false,true,false,true': false,
       'false,true,false,false': true
      }
      return statusObj[arrayString]
    }
  
// checks how F2L pair is separated across the layers; executes joining algorithm function
    function F2LSeparation(val, rot, indx, pair){
      const pairOrientationFinder = {
        3:()=>{pairF2LLayers12(rot, indx, pair)},
        4:()=>{pairF2LLayers13(rot, indx, pair)},
        5:()=>{;pairF2LLayers23(rot, indx, pair)},
        6:()=>{pairF2LLayers33(rot, indx, pair)},
      }
      pairOrientationFinder[val]()
      }

//finds permutation of four oriented down layer cross pieces; and sends to solving function
function handleFullCross(){
  let permutationsArray = edgeCornerPermutationGetter(downLayerEdges, 'edge')
     permuteFourCrossEdges(permutationsArray)
 }

 // rearranges elements of a permutation array to reflect rotations on a layer, for 4 oriented edges; cross or LL edges
function permutationAdjustFn(array, rotations, emptyArr){
  array.forEach((element, i) =>{
    emptyArr[(i+rotations)%4] = element
      })
    return emptyArr
}

// DOWN LAYER CHECK FOR CROSS PIECES
  function checkCrossDownLayer(){
    console.log('checking down layer for cross pieces...')
    // clear the arrays containing oriented cross edges
    orientedCrossEdgeArray = []
    // clear the array containing incorrectly permuted cross edges
    notOrientedCrossEdgeArray = []
   // for non-cross piece edges in the down layer
   let absentCrossPiecesArray = []
 // for cross pieces that are on the down layer but not correctly oriented
    let notOrientedCrossPieceArray = []
// variable for the string name of the position of the cross piece edge
let crossPiecePosition; 
    // check if there are any correctly oriented white cross pieces on the bottom layer
    downLayerEdges.forEach((edge, index) =>{
      // check the index position of the edge and assign the corresponding 'string name' of the position to the crossPiecePosition variable. 
  crossPiecePosition = positionFinder(index)
  //checking for edge pieces with a white facet; and orientation if one exists. 
      if(edge[0] == 'w'){//correctly oriented cross piece; create and push object
orientedCrossEdgeArray.push(new CrossObject(index, edge, crossPiecePosition, true))

  }else if(edge[1] =='w'){ // incorrecly oriented cross piece; create and push object
        notOrientedCrossPieceArray.push(new CrossObject(index, edge, crossPiecePosition, false))

  }else if(edge[0] !== 'w' && edge[1] !== 'w'){//edge is not a cross piece; create and push object
absentCrossPiecesArray.push(new CrossObject(index, edge, crossPiecePosition, null))
      }
    })

// variable for the number of edges that are not cross pieces
let fullyUnsolvedCrossPieces = absentCrossPiecesArray.length
    if(fullyUnsolvedCrossPieces < 4){//at least one cross piece exists; either oriented or not
      if(orientedCrossEdgeArray.length > 0){
        switch(orientedCrossEdgeArray.length ){
          case 1: // only one piece is oriented correctly, leave it as it is; the next piece will be permuted relative to this piece. look for next piece
          console.log('only one correctly oriented piece in the first layer, so does not need to be permuted.')
          checkCrossPieceMidLayer()
          break;
          case 2: //two cross pieces are correctly oriented
    let masterColor = orientedCrossEdgeArray[0]['cross_piece'][1]
    let color2 = orientedCrossEdgeArray[1]['cross_piece'][1]
    let masterIndex = orientedCrossEdgeArray[0]['index_in_layer'];
    let color2Index = orientedCrossEdgeArray[1]['index_in_layer'];
    let edgeName = orientedCrossEdgeArray[1]['piece_position']
    let downRotations = -1 // using minus one just as a dummy number to be updated in the below condition
// calculate number of rotations to move piece 2 to master
downRotations = crossPieceDistanceFinder(masterColor, color2)
 // permute the pieces relative to each other
  permuteTwoCrossEdges(masterIndex, color2Index, downRotations, edgeName)
  break;
  case 3:  console.log('three oriented cross pieces on the down layer')
  let algoArray = []
// two scenarios exist; piece 4 incorrectly oriented, or, piece 4 missing from the layer. 
    if(notOrientedCrossPieceArray.length > 0){
      // piece 4 in the layer, but incorrectly oriented
      let  pieceIndex = notOrientedCrossPieceArray[0]['index_in_layer']
// use piece index to find required algorithm for orienting piece; 2nd param indicates other pieces exist on the down layer
    algoArray = unorientedCrossPiecePlacer(pieceIndex, 'elements')
      executionAndChecks(algoArray, 'FL_check') // send algorithm for execution
    }else{ // piece 4 is missing from layer; check elsewhere
checkCrossPieceMidLayer()
    }
    break;
    case 4: //four cross pieces are correctly oriented, but not necessarily correctly permuted; generate a permutation for the 4 pieces 
   let getPermutation =  edgeCornerPermutationGetter(downLayerEdges, 'edge')
    permuteFourCrossEdges(getPermutation) // solve the edges
      break;
      }
      }else{
        // there must still be at least one cross piece on the down layer, incorrectly oriented.
        checkNonOrientedCrossPieces()
      }
}else{
  // absentCrossPiecesArray contains 4 elements; no cross pieces on down layer: continue search
    checkCrossPieceMidLayer()
}
}


// PERMUTE FOUR ORIENTED CROSS EDGES
function permuteFourCrossEdges(array){
let calibrationPieceIndex = array.indexOf(0)
let rotationsTocalibration = (0 - calibrationPieceIndex + 4)%4
//get rotation needed to move red/white piece to zero index
  let rotationMove = [layerRotationGetter(rotationsTocalibration, 'dLayer')]
// shift all the array elements ro reflect the rotation
let permutationAdjust = permutationAdjustFn(array, rotationsTocalibration, [, , , ])
 let stringPermutation = permutationAdjust.join('').toString() // stringify the returned array
algorithmExecution(rotationMove) // execute rotation
setTimeout(() => {
  fullCrossPermutations(stringPermutation) // solve adjusted permutation
}, algoTime(rotationMove));
}

// PERMUTE TWO ORIENTED CROSS PIECES
function permuteTwoCrossEdges(A, B, permuteDistance, edge_name){
  let middleMove, algoArray = [], rawRotation, edgeName;
  // 'permuted' variable gives index position where correctly permuted 'B' sits relative to 'A'
  let permuted = (A + permuteDistance)%4; // this will give a number between 0 and 3
  // variable for forward rotations to correct permuted position of B
  let rotationsToPermuted;
  // variable for absolute rotations to correct permuted position of B; this value is used to turn the D-layer to the correct position for insertion of the cross piece from the U-layer
  if(B === permuted){
console.log('permuted')
   //so both are permuted, relatively to each other, search for next cross piece
    checkNonOrientedCrossPieces()
  }else{ // piece B is not permuted correctly relative to piece A: find the distance between the correct permutation position of B and current position of 'B' so that 'B' can moved by that distance.
rawRotation = permuted - B
console.log(' not permuted') // adjust for negative rotations 
rotationsToPermuted = (rawRotation + 4)%4 
middleMove = layerRotationGetter(rotationsToPermuted, 'dLayer')
let edgePrecisePosition = edge_name.replace('down-', '')
let setUnset = doubleRotateFinder(edgePrecisePosition)
algoArray = [setUnset, middleMove, setUnset]
// send resulting array for checks and execution
    executionAndChecks(algoArray, 'FL')
  }
}

// check's orientation of mid layer cross piece to determine algorithm for insertion
function midLayerPieceOrientation(edgeIndx, childIndx){
  let orientationObj = {
    0:{ 1:[LP], 0:[B]}, // color facet is on left face or back face
    1:{ 1:[L], 2:[FP]}, // color facet is on left face or front face
    2:{ 3:[RP], 2:[F]}, // color facet is on right face or front face
    3:{ 3:[R], 0:[BP]}, // color facet is on right face or back face
  }
  return orientationObj[edgeIndx][childIndx]
}

//returns algorithm duration (plus a small amount); used by functions for post algorithm operations
function algoTime(array){
  return (array.length + 1)*rotationDelay
}

function findNextCrossPiece(stage){
  let executionCheckObj = {
    'LL':() =>{checkNonOrientedCrossPieces()},
    'ML':() =>{checkCrossPiecesLastLayer()},
    'FL':() =>{checkCrossPieceMidLayer()},
  } // current layer determines next layer to check
  executionCheckObj[stage]()
}
// refresh down layer cross status
function updateLayer1CrossEdges(){
  orientedCrossEdgeArray = []
    downLayerEdges.forEach((edge, index) =>{
      if(edge[0] == 'w'){
crossPiecePosition = positionFinder(index) // find position name
orientedCrossEdgeArray.push(new CrossObject(index, edge, crossPiecePosition, true))
      }
    })
}

function checkNonOrientedCrossPieces(){
  console.log('checking non oriented cross pieces')
  // clear the array for a new representation of unoriented cross edges
let orientedCrossEdgeArray = [], notOrientedCrossEdgeArray = [], algoArray = []
 // force an update of the oriented cross edges
  downLayerEdges.forEach(edge =>{
    if(edge[0] == 'w'){
      orientedCrossEdgeArray.push(edge)
    }
  })
  let notOrientedCrossPieces = 0;

    // check for incorrectly oriented cross pieces on the first layer
    downLayerEdges.forEach((edge, index) =>{
      if(edge[1] == 'w'){
        // if the outer edge of any of the facets is white incriment the non oriented cross pieces variable
  notOrientedCrossPieces ++;
  let incorrectObj = {
    'index_in_layer': index,
    'cross_piece': edge,
    }
  notOrientedCrossEdgeArray.push(incorrectObj)
      }
    });

    // if the pieces do exist
    if(notOrientedCrossPieces > 0){
      let childIndex = notOrientedCrossEdgeArray[0]['index_in_layer']

// if there are oriented cross pieces on the first layer
if(orientedCrossEdgeArray.length > 0){
  console.log('down layer already contains oriented cross pieces so this piece will have to be inserted in a way that does not disturb other already inserted pieces')
algoArray = []

// when there are cross pieces already on the down layer, there needs to be an extra step to  undo the d-prime move that enabled the insertion of the cross piece from the mid layer.  This will ensure that if the cross was already permuted, but just  one cross piece was incorrectly oriented, when that piece is oriented, D-rotation to undo the D-prime move will set the down layer to the calibration position, which will put the cross into the solved position. 

algoArray = unorientedCrossPiecePlacer(childIndex, 'elements')

  executionAndChecks(algoArray, 'FL')
}else{ // the piece can be inserted without consideration for disturbing other pieces
  // use the index to determine the face the white facet sits on, and then rotate relevant faces to get the piece into the first layer oriented correctly - permutation can be checked afterward (if the array containing cross piece objects has entries), if necessary. 
  algoArray = unorientedCrossPiecePlacer(childIndex)
  executionAndChecks(algoArray, 'FL') 
}
    }else{ // all cross pieces must be oriented; update the layer- check the cross condition and handle full cross or check mid layer for cross pieces, whichever is required. 
console.log('no non-oriented cross pieces found on the down layer - run cross condition check')
      checkCrosscondition('FL')

    }
}


// PLACING CROSS PIECES FROM THE MID LAYER TO THE DOWN LAYER (PERMUTED)
function checkCrossPieceMidLayer(){
  console.log('... checking mid layer for cross pieces...')
  // first make sure the array containing cross edge pieces details is updated - not sure if this is necessary. 
  updateLayer1CrossEdges()
  // ARRAY FOR CROSS PIECES FOUND ON THE MID LAYER
midLayerCrossEdgesArray = []
// variable for the number of cross pieces ON THE MID LAYER
let crossPieces = 0;
      // check if there are any white cross pieces on the mid layer
      midLayerEdges.forEach((edge, index) =>{
        if( edge[0] == 'w'|| edge[1] == 'w'){
          // if either of the edge's facets is white increment the cross pieces variable
          crossPieces ++;
// object with index as property; if a cross piece is at the index position the first and second array elements of the property are assigned as, piece position and facet indexes in an object created for the cross piece
let crossPieceDetailsObj = {
  0:[['back', 'left'], [0, 1]],
  1:[['front', 'left'], [2, 1]], 
  2:[['front', 'right'], [2, 3]],
  3:[['back', 'right'], [0, 3]]
}
// store all cross edge details in an object and push to array holding recorded mid layer cross pieces
  midLayerCrossEdgesArray.push({
    'index': index,
    'facet_indexes': crossPieceDetailsObj[index][1],
    'cross_piece': edge, 
    'piece_position': crossPieceDetailsObj[index][0]
  });
        }
      });
// if there is at least one cross edge piece on the middle layer
      if(crossPieces > 0){
        // console.log(`cross pieces on middle layer: ${crossPieces}`)
// get the first recorded cross piece object
        let childCrossEdge = midLayerCrossEdgesArray[0]
// variable for colour of non-white facet
let childColor, childIndex, whiteFacetFace;
// get the vertical edge index that the cross piece sits on. 
let vertical_edge_index = childCrossEdge['index']
// determine colour and index of non-white facet of the cross piece
if(childCrossEdge['cross_piece'][0] == 'w'){ // cross_piece is the pair of cross edge facets

  whiteFacetFace = childCrossEdge['piece_position'][0] // piece_position is a 2 element array, which holds the names of the faces that make up the vertical edge; first gives front or back, last element gives left or right

  // since childCrossEdge['cross_piece'][0] = 'w', then the color must be at index '1' of cross_piece
  childColor = childCrossEdge['cross_piece'][1]
  // child index gives you the face to be rotated
  childIndex = childCrossEdge['facet_indexes'][1] // the facet index array holds the actual index of the face to be turned. we  have to know the index to calculate the distance between the cross piece and the correct insert point

}else{
   whiteFacetFace = childCrossEdge['piece_position'][1] // white is at L/R face
  childColor = childCrossEdge['cross_piece'][0] // child color facet must be at index zero
  childIndex = childCrossEdge['facet_indexes'][0] // child facet 'face-index' must be at position 0 in the facet_indexes array
}

// updated information about cross pieces on the down layer for the next step. 
updateLayer1CrossEdges()
let algorithmDuration;
setTimeout(() => {
  // now, if there are cross pieces on the down layer
  if(orientedCrossEdgeArray.length > 0){
    console.log('at least one cross piece exists on the mid layer')
      // then use the first instance as a master  and calculate where the second piece must go, relative to the master

// get the object of the master cross edge
let masterEdgePiece = orientedCrossEdgeArray[0]
// variable for the colour of master non-white facet
let masterColor  = masterEdgePiece['cross_piece'][1]
// variable for the index master non-white facet
let masterIndex = masterEdgePiece['index_in_layer']
// variable for the natural distance child cross piece and master
let naturalDistance;

naturalDistance = crossPieceDistanceFinder(masterColor, childColor)
console.log('running placement of mid layer cross piece')
placeMidLayerCrossPiece(masterIndex, childIndex, naturalDistance, vertical_edge_index, whiteFacetFace)

    }else{ // there are no correctly oriented edge pieces in the down layer; INSERT THE CROSS PIECE - so the place mid cross piece function is not used for the directly placement of the cross piece from the middle layer if there are no down layer oriented cross pieces
let algoArray = midLayerPieceOrientation(vertical_edge_index, childIndex);

 algorithmDuration = (algoArray.length + 1)*rotationDelay
executionAndChecks(algoArray, 'ML')

    }
}, algorithmDuration);
      }else{
        checkCrosscondition('ML')
  // there are no cross pieces on the mid layer so go  to the last layer to check for cross pieces. 
      }
}

// PLACING MID LAYER CROSS PIECES INTO DOWN LAYER
function placeMidLayerCrossPiece(masterIndex, childIndex, permuteDistance, verticalEdgeIndex, faceWhiteFacet){
  console.log('placement of cross pieces found on mid layer')
let algoArray = [], rotationsToPermuted, firstMove, lastMove;

  // 'permuted' variable gives index position where correctly permuted 'B' sits relative to 'A'
  let permuted = (masterIndex + permuteDistance)%4; // this will give a number between 0 and 3
  // variable for forward rotations to correct permuted position of B
  if(childIndex === permuted){//color facet of the cross piece is at the same index of the down layer edge it should be inserted to
    console.log('piece is permuted')
// get correct face to be turned
algoArray = midLayerPieceOrientation(verticalEdgeIndex, childIndex)
     executionAndChecks(algoArray, 'ML')
  }else{ // piece B is incorrecly permuted relative to piece A: find the distance between the correct permutation position and position of 'B'
    console.log('down layer needs rotation')
rotationsToPermuted = (permuted - childIndex + 4)%4;
// object with number of rotations to correct permutation position of piece B
let firstMoveObj = {
  0:'N/A',
  1:DP,
  2:D2,
  3:D
};
firstMove = firstMoveObj[rotationsToPermuted]; // get permutation move
// lastMove = insertMoveObj[verticalEdgeIndex][childIndex];// get insertion move
lastMove = midLayerPieceOrientation(verticalEdgeIndex, childIndex)
algoArray = [firstMove, ...lastMove]; // 
executionAndChecks(algoArray, 'ML');
  }
}

 let childObj, childCrossEdge, childColor, childIndex, childPosition, oriented;
function checkCrossPiecesLastLayer(){
  console.log('checking last layer for cross piece')
  // clear previous array values for new cross pieces if found
  lastLayerCrossEdgesArray = []
let algoArray = []

// console.log('checking last layer from white cross edge pieces... ')

upLayerEdges.forEach((edge,index) =>{
  if( edge[0] == 'w'|| edge[1] == 'w'){
    // if either of the edge's facets is white incriment the cross pieces
    let positionObj = {
      0:[['up','back'], [0, 0]],
      1:[['up','left'], [0, 1]],
      2:[['up','front'], [0, 2]],
      3:[['up','right'], [0, 3]]
    }
    crossPiecePosition = positionObj[index][0]
    facetIndexes = positionObj[index][1] 
              // name the edge piece according to the position  where it lies in the layer

// push cross piece to LL array
let llCrossPiece = {
  'index': index,
  'facet_indexes': facetIndexes,
  'cross_piece': edge, 
  'piece_position':crossPiecePosition
  }
  
  console.log('cross piece found on last layer')
  console.log(llCrossPiece)
  // push cross piece to LL array
  lastLayerCrossEdgesArray.push(llCrossPiece)

}
})

// if there is at least one cross piece on the last layer
if(lastLayerCrossEdgesArray.length > 0){


// get the first available element in the array which is the cross piece nearest the zero index face
childObj = lastLayerCrossEdgesArray[0]
// get child cross piece
 childCrossEdge = childObj['cross_piece']
// get child cross piece index; this index references the side-face that the cross piece is part of
childIndex = childObj['index']
// get side-face name associated with child. NOTE: irrespective of the orientation of the cross piece on the last layer, that is, whether the white facet is on the up-face or a side-face, the side face that the cross piece sits on is the face that needs to be turned initially in order to move the cross piece. the path of the cross piece will change depending on the orientation of the piece, which can be determined using the IF/ELSE condition below
childPosition = childObj['piece_position'][1]

 // CHCK PIECE ORIENTATION TO SEE WHETHER IT CAN BE INSERTED DIRECTLY OR NOT
 if(childCrossEdge[0] == 'w'){ // the white face is facing upward, because the first colour in the edge array refers to the up direction
  childColor = childCrossEdge[1] // so the side-face holds the color facet; the piece is oriented for direct placement
  oriented = true;
  }else if(childCrossEdge[1] == 'w'){
    childColor = childCrossEdge[0] //  the up-face holds the color facet; the piece is not oriented for direct placement
    oriented = false;
  }


// if cross pieces exist on the down layer, one of them can be used to calculate where the cross piece in the last layer should go. 
if(orientedCrossEdgeArray.length > 0){
  // get master cross piece
let masterEdgePiece = orientedCrossEdgeArray[0]
// get master facet non-white color
 let masterColor = masterEdgePiece['cross_piece'][1]
 // get index of master 
 let masterIndex = masterEdgePiece['index_in_layer']

// variable for parameter which details the number of moves from the master color index to the natural index of the secondary color
let distanceToPermuted;
  distanceToPermuted = crossPieceDistanceFinder(masterColor, childColor)
  placeLastLayerCrossPiece(masterIndex, childIndex, distanceToPermuted, oriented, childPosition)
}else{   console.log('there are no cross pieces on the down layer; insert piece without consideration to its entry position')
  if(oriented === true){ // the white facet is on the up-face
  algoArray = [doubleRotateFinder(childPosition)]
// execute algorithm and post algo checks
executionAndChecks(algoArray, 'LL')
  }else if(oriented === false){ // white facet is side facing so more than on move is required
    algoArray = lastLayerCrossEdgeInsertion(childPosition, 'unoriented')
  // execute algorithm and post algo checks
    executionAndChecks(algoArray, 'LL')
  }else{
    // something is wrong; there is no orientation information on the last layer cross piece
    console.log('there is no orientation information on the child cross piece')
alert('there is no orientation information on the cross piece, check the console')
    updateLayer1CrossEdges()
  }
}
}else{
checkCrosscondition('LL')
}
}
// placing a lasts layer cross piece into down layer oriented and permuted. 
function placeLastLayerCrossPiece(masterIndex, childIndex, permuteDistance, orientation, side_face){
  let firstMove, algoArray = []
  console.log('running placement of last layer cross piece... line 1922')
  // 'permuted' variable gives index position where correctly permuted 'B' sits relative to 'A'
  let permutedIndex = (masterIndex + permuteDistance)%4; // this will give a number between 0 and 3
  // variable for forward rotations to correct permuted position of child
  let rotationsToPermuted;
 // if the piece is already at the correct index for permutation
 if(childIndex === permutedIndex){
// the cross piece sits at the index of correct permutation: check the orientation of the cross piece. 
 
  switch(orientation){
    case true: // cross piece is oriented such that it can be placed directly to the correctly permuted position, in one move  
    // let objProp = algoObject[side_face]
    let objProp = [doubleRotateFinder(side_face)]
    // EXECUTE double rotation
    executionAndChecks(objProp, 'LL')
break;
default://cross piece is oriented such that more than one move is required to enable placement to the correctly permuted position. 
let algo = lastLayerCrossEdgeInsertion(side_face)
algoArray = [...algo]

executionAndChecks(algoArray, 'LL')
   }
}else{ // the cross piece is not at the correctly permuted index. So before it can be placed the down layer needs to be rotated the appropriate distance
  rotationsToPermuted = (permutedIndex - childIndex + 4)%4;
  // DETERMINE DOWN LAYER ROTATION WHICH WILL CORRECT ITS POSITION READY TO HAVE CROSS PIECE INSERTED

    console.log('changed settimout to 50 milliseconds (from 1000)')
    let firstMoveObj = {
      1: D, 
      2: D2, 
      3:'D'
    }

    firstMove = firstMoveObj[rotationsToPermuted]
  // now down rotation is figured out,  so that  childIndex === rotationsToPermuted will be achieved, the orientation of the cross piece needs checking 
  console.log('checking side-face last layer placement')
  console.log(side_face)

  switch(orientation){
    case true: // cross piece is oriented facing upward, so it can be placed directly to the correctly permuted position with a double rotation of the side face, one the down layer is rotated to accommodate it. 
    
let doubleMove = doubleRotateFinder(side_face)
algoArray = [firstMove, doubleMove]

  // update cross check - two moves take 3 seconds so wait four seconds before check
  executionAndChecks(algoArray, 'LL')

break;
default://cross piece is oriented such that more than one move is required to enable placement to the correctly permuted position.   Combine the first move, the down rotation that results in childIndex === rotationsToPermuted, with the move required to insert the cross piece from the last layer, into the temporary algorithm array 
let algo = lastLayerCrossEdgeInsertion(side_face)
algoArray = [firstMove, ...algo]
executionAndChecks(algoArray, 'LL')

   } // END OF SWITCH

}

}


// ALGORITHM PRE-EXECUTION
function executionAndChecks(algo, stage){
  // execute algorithm
  algorithmExecution(algo)
  // check cross condition after duration of algorithm
  setTimeout(() => {
  checkCrosscondition(stage)
  }, algoTime(algo));
}

// CROSS CHECK TO OCCUR AFTER ALGORITHM EXECUTION
function checkCrosscondition(stage){
  // updated oriented cross pieces info
  updateLayer1CrossEdges()
  // after short delay check status of cross
  setTimeout(() => {
  if(orientedCrossEdgeArray.length < 4){
findNextCrossPiece(stage) // cross not complete; find next piece
  }else{
    console.log('all oriented cross pieces on down layer')
    // all cross pieces are on down layer and are oriented so handle the permutation
    handleFullCross()
  }
  }, 20);
}


 // function switches permutation of cross pieces to determine which set of moves are needed to solve the permutation. 
  function fullCrossPermutations(permutation){
let algoArray = []
let permutationsObj = {
  '0132': [R2, D, R2, DP, R2],
  '0213': [L2, DP, L2, D, L2],
  '0231': [R2, DP, R2, D, R2, D],
  '0312': [L2, D, L2, DP, L2, DP],
  '0321': [L2, D2, L2, D2, L2],
  '0123':()=>{confirmCross()},
}
permutation !== '0123'? nonIdentity(): permutationsObj[permutation]();

function nonIdentity(){
  algoArray = [...permutationsObj[permutation]]
  algorithmExecution(algoArray)
  setTimeout(() => { confirmCross()
  }, algoTime(algoArray));
}
  }

// object for F2L corners
class CornerObject{
  constructor(corner, index, layer){
this['vertical_index'] = index;
this['corner_piece'] = corner;
this['layer'] = layer;
  }
}

  function getF2LCornerObj(corner, index, layer){
    console.log('creating corner obj')
    assessF2LCornerPiece(new CornerObject(corner, index, layer))
  }

  function findF2LcornersLastLayer(){  // clear F2L array for new check
   let f2lArray = []
console.log(' no F2L corner found on  mid layer; check last layer for F2L corner pieces')
upLayerCorners.forEach((upCorner, upIndex) =>{
  let filtered = upCorner.filter(x => x !== 'w')
    if(filtered.length === 2 && f2lArray.length < 1){
      f2lArray.push(upCorner)
      getF2LCornerObj(upCorner, upIndex, 3)
    }     
    })
  }

  // search for F2L corners where at least one F2L is already solved
function firstLayerSomeF2Ls(array){
  console.log('searching F2L pairs, some pairs solved')
  let f2lArray = [], filtered, solvedTrue = 0, toSolve = [];
// search down layer corners for F2L corners
downLayerCorners.forEach((corner, cIndx) =>{
  filtered = corner.filter(x => x !== 'w') // corners with white facets will return a 2 element array
  if(filtered.length === 2){f2lArray.push([corner, cIndx])} // push F2L corner
})
// after corner search, check if any found corner index exists in the solved indexes array
 f2lArray.forEach(crnArr =>{ // array that contains all downlayer F2L corners
  solvedTrue = 0
  array.forEach(val =>{ // check each solved index
    if(crnArr[1] === val){ // if the solved index is the same as the F2L corner index
      solvedTrue ++ // increment solved true value
    }
  })// if solved true = 0, none of the solved indexes matched the index of the F2L corner
if(solvedTrue === 0){toSolve.push(crnArr)} // push the corner to the 'toSolve' array
 })
// if filter array has no elements then nothing was found on the first layer; search elsewhere
if(toSolve.length < 1){findF2LcornersLastLayer()}else{
  // send the details, corner and index details, of the first unsolved corner, for object creation
  getF2LCornerObj(toSolve[0][0], toSolve[0][1], 1)
}
}

// search for F2L corners where no F2L's are yet solved
function firstLayerNoF2Ls(){
  console.log('searching F2L pairs, no pairs solved yet')
  let f2lArray = []
downLayerCorners.forEach((corner, index) =>{
  let filtered = corner.filter(x => x !== 'w')
  if(filtered.length === 2 && f2lArray.length < 1){
f2lArray.push(corner)
getF2LCornerObj(corner, index, 1)
  }
})
if(f2lArray.length < 1){findF2LcornersLastLayer()}
}


function findF2LcornersFirstLayer(solvedEdges){
  console.log('check for number of solved edges - if zero then execute firstLayerNoF2L function, otherwise at least one edge is solved, execute firstLayerSomeF2L function')
        if(solvedEdges.length > 0){
          firstLayerSomeF2Ls(solvedEdges)
        }else{
          firstLayerNoF2Ls()
        }
}

// assess the corner object
function assessF2LCornerPiece(cornerObject){
// convert the three color indicators (out of b, r, o and g) for the corner piece into a single string
let cornerFacets = cornerObject['corner_piece']
// filter white for just edge facet colours: use for edge_requirements property in corner object
let edgeRequiements = cornerFacets.filter(char => char !== 'w')
let fullCornerOjbect = {
  'main_details': cornerObject,
  'edge_requirements':edgeRequiements
}
    // function for searching edges on mid layer and last layer
    console.log('execute search on mid layer for matching edge')
    midLayerF21EdgeCheck(fullCornerOjbect)

}

// search edges find an edge that matches the corner piece
function f2lEdgeSearch(cornerObject, edges, cornerEdge, edgeType, layer){
  console.log(`searching layer ${layer} for edges`)
  let matchingEdge, edgeIndex; // variables for matching edge and its index
  edges.forEach((edge, idx) =>{ 
    let trueEdge = edge.join('').toString()
    // create a deep copy of the edge before sorting so the original is not mutated
    let tempEdgeArr = [...edge]
    if(tempEdgeArr.sort().join('').toString() == cornerEdge){
    matchingEdge = edge
    edgeIndex = idx
    console.log('checking if matching edge and original strigified edge is different')
    console.log(matchingEdge)
    }
      })

      if(matchingEdge){  // if matchingEdge is not null - create the object for the pair;
        let  pairObj = {
            'corner_details': cornerObject,
            'edge_details': {
              'layer':layer,
              'matching_edge': matchingEdge, 
              'edge_index':edgeIndex, 
              'edge_type': edgeType,
            }
          }
          console.log('pair matched - view pair object being sent to be joined')
          console.log(pairObj)
          joinMatchingPair(pairObj)
      }else{
        if(layer === 2){
          // if current layer is  2(mid edge) no piece was found on the layer, so send already prepared corner object and edge requirements for last layer preparation
          lastLayerF21EdgeCheck(cornerObject, cornerEdge)
        }else{alert('no F2L no matching edges were found on cube')}
      }
}


// search for the matching F2L edge piece
function midLayerF21EdgeCheck(cornerObject){
  console.log('preparing parameters for mid search for matching edge')
  // create a deep copy of the corner's edge requirements, prior to sort to avoid mutation
let edgeRequirementsCopy = [...cornerObject['edge_requirements']]
let sortEdge = edgeRequirementsCopy.sort().join('').toString()
f2lEdgeSearch(cornerObject, midLayerEdges, sortEdge, 'vertical', 2)
}


function lastLayerF21EdgeCheck(cornerObject, cornerEdge){
  // corner and corner edge string were already prepared for mid layer so no need to repeat
  f2lEdgeSearch(cornerObject, upLayerEdges, cornerEdge, 'horizontal', 3)
  }

  function pairF2LLayers12(rotator, edgeIndex, pairObj){

    let algoArray
let rotatorObj = { // rotator is distance of corner piece from edge piece
 0:['N/A', 'N/A'],
 1:[D, DP],
 2:[D2, D2],
 3:[DP, D]
}
// get algorithm
let algo = pairJoinAlgorithm(edgeIndex, '12')
algoArray = [rotatorObj[rotator][0], ...algo, rotatorObj[rotator][1]]
        algorithmExecution(algoArray, 'F2L')
setTimeout(() => {
  let newCornerIndex = ( pairObj['edge_details']['edge_index'] + 3)%4
  let F2LEdge =  pairObj['edge_details']['matching_edge'] 
solveF2LPair(F2LEdge, newCornerIndex)
}, algoTime(algoArray));
  }


function pairF2LLayers23(rotator, edgeIndex, pairObj){
let F2LEdge = pairObj['edge_details']['matching_edge'], firstMove, middleMoves;
//  first move sits  corner piece above the edge piece on the mid layer
firstMove = setupMoveAlgo(rotator)
middleMoves = pairJoinAlgorithm(edgeIndex, '23')

let algoArray = [firstMove, middleMoves[0], UP, middleMoves[2], U2]
algorithmExecution(algoArray)
setTimeout(() => {
solveF2LPair(F2LEdge, edgeIndex)
}, algoTime(algoArray));
}


function pairF2LLayers13(cornerIndex, edgeIndex, pairObj){
  let setupMoveObj, cornerMovesObj, rotationsToEdge;
  let F2LEdge = pairObj['edge_details']['matching_edge'] 
let rotationVal = (cornerIndex + 1)%4 - edgeIndex // distance edge needs to move
// adjust negative values for forward moves
rotationVal < 0? rotationsToEdge = rotationVal + 4: rotationsToEdge = rotationVal
let  firstMove = setupMoveAlgo(rotationsToEdge) // get setup move
 let algo = pairJoinAlgorithm(cornerIndex, '13') // get main algorithm
let algoArray = [firstMove, ...algo]
algorithmExecution(algoArray)
setTimeout(() => {
solveF2LPair(F2LEdge, cornerIndex)
}, algoTime(algoArray));
}



function pairF2LLayers33(cornerIndex, edgeIndex, pairObj){

  let upLayerEdgeIndex = pairObj['edge_details']['edge_index']
  let naturalCornerIndex, rotationsToNaturalIndex, rotationCalc, algoArray, algorithmDuration;
  let F2LEdge = pairObj['edge_details']['matching_edge']
// check if the pair is already joined. 
if(upLayerEdgeIndex === cornerIndex || upLayerEdgeIndex === (cornerIndex + 1)%4){
console.log('pair already joined')
solveF2LPair(F2LEdge, cornerIndex)
}else{
//   pair not joined;  two other possibilities exist; corner piece is adjacent to two faces, the edge is not adjacent to those faces, but to one of the other two remaining faces. 
// find the natural corner index by examining the two colors of the edge piece
let tempEdge = [...F2LEdge]
let sortedEdge = tempEdge.sort().join('').toString()
naturalCornerIndex = naturalIndexFinder(sortedEdge)
// variable for setup rotation and main algorithm
let setupMove, middleMoves; 
rotationCalc = naturalCornerIndex - cornerIndex;
// adjust for negative values calculate rotations in terms of clockwise movement
rotationsToNaturalIndex = (rotationCalc + 4)%4
// get setup move
setupMove = layerRotationGetter(rotationsToNaturalIndex, 'uLayer')

// ------------------------------- NOW CHECK WHICH ALGORITHM WILL JOIN THE PAIR
let edgeDistance = Math.abs(upLayerEdgeIndex - cornerIndex)
if(edgeDistance === 2){
console.log('edge is two in front of corner')
// get algorithm
 middleMoves = pairJoinAlgorithm(naturalCornerIndex, '33')
}else{
console.log('edge is three in front of corner')
let threeCornersAwayObj = {
  0:[BP, U, B],
  1:[LP, U, L],
  2:[FP, U, F],
 3:[RP, U, R],
}
middleMoves = threeCornersAwayObj[naturalCornerIndex]
}
algoArray = [setupMove, ...middleMoves, U2]
algorithmExecution(algoArray)
setTimeout(() => {
    solveF2LPair(F2LEdge, naturalCornerIndex)
}, algoTime(algoArray));
}
}


function joinMatchingPair(F2LPair){
  console.log('joining matching pair...')
// variable for rotational value for down face
let rotateValue
// first step is to check the difference between the edge piece index and the corner piece index
let pairIndexDifference = F2LPair['edge_details']['edge_index'] - F2LPair['corner_details']['main_details']['vertical_index']
// correction for negative numbers
rotateValue = (pairIndexDifference + 4)%4;
  // get corner layer
  let cornerLayer = F2LPair['corner_details']['main_details']['layer']
  // get edge layer
  let edgeLayer = F2LPair['edge_details']['layer'];
// the sum of (corner,edge) layer configurations, (1,2), (1,3), (3,2) and (3,3), gives different values for each combination. The sum reveals how the pair is positioned across the layers 
let F2LPairOrientation = cornerLayer + edgeLayer
// index of edge
let edgeIndex = F2LPair['edge_details']['edge_index']
let cornerIndex = F2LPair['corner_details']['main_details']['vertical_index']
// use separation index to find function which joins the pair
if(F2LPairOrientation === 3 || F2LPairOrientation === 5){F2LSeparation(F2LPairOrientation, rotateValue, edgeIndex, F2LPair)}else{F2LSeparation(F2LPairOrientation, cornerIndex, edgeIndex, F2LPair)}
}

  
function solveF2LPair(edge, cornerIndex){
let rotationCalc = 0, naturalVerticalIndex, rotationsToNaturalIndex, algoArray,  rotationParam; 
let tempSortedEdge = [...edge]  

let sortedEdge = tempSortedEdge.sort().join('').toString() // sort edge copy of edge
naturalVerticalIndex = naturalIndexFinder(sortedEdge) // get natural index of edge
 rotationCalc = naturalVerticalIndex - cornerIndex
 rotationsToNaturalIndex = (rotationCalc + 4)%4
// GET rotations to solving corner position
rotationParam = layerRotationGetter(rotationsToNaturalIndex, 'uLayer')
// send move for execution
algoArray = [rotationParam]
algorithmExecution(algoArray)

// now examine the pair for solving
setTimeout(() => {
console.log('post placement; ready for algorithm')
  let whiteAxis, solvedEdge, isParallelToFace, indexOfCorner, newEdgeIndex, renewedEdge,
newCornerDetails; 
// GET coner facets at new position
let updatedCorner = newCornerEdgeFinder(upLayerCorners, edge, 'corners')
newCornerDetails = updatedCorner[0]
indexOfCorner = updatedCorner[1]
// GET edge facets at new position
let updatedEdge = newCornerEdgeFinder(upLayerEdges, edge, 'edges')
renewedEdge = updatedEdge[0]
newEdgeIndex = updatedEdge[1]

isParallelToFace = getF2Lorientation(naturalVerticalIndex, newEdgeIndex)
whiteAxis = findWhiteAxis(newCornerDetails)
whiteAxis !== 'z'? solvedEdge = getF2LSolvedStatusXY(newCornerDetails[0] == renewedEdge[0]):solvedEdge = equalityParams()

function equalityParams(){
  let equality1 = renewedEdge[0] == newCornerDetails[1] && renewedEdge[1] == newCornerDetails[2]
  let equality2 = renewedEdge[0] == newCornerDetails[2] && renewedEdge[1] == newCornerDetails[1]
  let indexTest = naturalVerticalIndex%2 === 0;
  let equalityTest =  [equality1, equality2, indexTest, isParallelToFace].join().toString()
  return getF2LSolvedStatusZ(equalityTest)
}

let pairObject = new PairObject(naturalVerticalIndex, renewedEdge, newEdgeIndex, newCornerDetails, isParallelToFace, whiteAxis, solvedEdge)
solvedF2LIndexesArray.length < 4? generateF2LPairAlgorithm(pairObject): confirmF2L();
}, algoTime(algoArray));
}


// FUNCTION FOR GENERATING ALGORITHMS TO SOLVE THE CURRENT JOINED PAIR
function generateF2LPairAlgorithm(object){
  console.log('check object which generates algorithm for F2L pair')
 
  let axisOfWhite = object['axis_of_white']; 
  let solvedEdge = object['solved_edge'];
  let naturalPosition = object['index_of_corner'];
  let  isParallelBoolean =  object['is_parallel']


  console.log(`
  Object Readable details:
  axis of white: ${axisOfWhite}
  natural index: ${naturalPosition}
  one edge solved: ${solvedEdge}
  parallel to corner index face: ${isParallelBoolean}
  `)
  // algorithm array to send solve algorithm for current piece
  let algorithmArray = []

if(axisOfWhite == 'x'){ // ====================================== axis of white is 'x'
let xObj;
  if(isParallelBoolean === true){ // PARALLEL 
    if(solvedEdge === true){
    // SWITCH CORNER INDEXES
    xObj = {
      0: ['B', 'L`', 'B`', 'L'],
      1: ['L`', 'U', 'L', 'U2', 'F', 'U', 'F`'],
      2: ['F', 'R`', 'F`', 'R'],
      3:['R`', 'U', 'R', 'U2', 'B', 'U', 'B`']
      }
      algorithmArray = xObj[naturalPosition]
    }else{ // solved edge is false
    xObj = {
      0: ['L', 'U2', 'L`', 'U2', 'L', 'U2','L`', 'U`','L', 'U2', 'L`'],
      1: ['L`', 'U', 'L', 'U`', 'L`', 'U2', 'L', 'U2', 'L`', 'U', 'L'],
      2: ['R', 'U2', 'R`', 'U2', 'R', 'U2', 'R`', 'U`','R', 'U2', 'R`'],
      3:['R`', 'U', 'R', 'U`', 'R`', 'U2', 'R', 'U2', 'R`', 'U', 'R']
      }
      algorithmArray = xObj[naturalPosition]
    }
    }else{ // the piece is PERPENDICULAR in orientation
    if(solvedEdge === true){
      xObj = {
        0: ['L', 'U`', 'L`', 'U2', 'B`', 'U`', 'B'],
        1: ['F`', 'L', 'F', 'L`'],
        2: ['R', 'U`', 'R`', 'U2', 'F`', 'U`', 'F'],
        3:['B`', 'R', 'B', 'R`']
        }
        algorithmArray = xObj[naturalPosition]
      }else{ // solved edge is FALSE
      xObj = {
        0: ['L', 'U`', 'L`', 'U', 'L', 'U2', 'L`', 'U2', 'L', 'U`', 'L`'],
        1: ['L`', 'U2', 'L', 'U2', 'L`', 'U2', 'L', 'U2', 'L`', 'U', 'L'],
        2: ['R', 'U`', 'R`', 'U', 'R', 'U2', 'R`', 'U2', 'R', 'U`', 'R`'],
        3:['R`', 'U2', 'R', 'U2', 'R`', 'U2', 'R', 'U2', 'R`', 'U', 'R']
        }
        algorithmArray = xObj[naturalPosition]
      }
    }
}else if(axisOfWhite == 'y'){ // =============================== axis of white is 'y'

let yObj;
  if(isParallelBoolean === true){
    if(solvedEdge === true){
      yObj = {
        0: ['B`', 'U', 'B', 'U2', 'L', 'U', 'L`'],
        1: ['L', 'F`', 'L`', 'F'],
        2: ['F`', 'U', 'F', 'U2', 'R', 'U', 'R`'],
        3:['R', 'B`', 'R`', 'B']
        }
        algorithmArray = yObj[naturalPosition]
      }else{ // solved edge is FALSE
        yObj = {
          0: ['L', 'U`', 'L`', 'U2', 'B`', 'U', 'B', 'L', 'U2', 'L`'],
          1: [F, U2, FP, U2, F, U2, FP, UP, F, U2, FP],
          2: ['R', 'U`', 'R`', 'U2', 'F`', 'U', 'F', 'R', 'U2', 'R`'],
          3:[B, UP, BP, U, B, UP, BP, U2, B, UP, BP]
          }
          algorithmArray = yObj[naturalPosition]
      }
      }else{ // the piece is PERPENDICULAR in orientation
      if(solvedEdge === true){
        yObj = {
          0: ['L`', 'B', 'L', 'B`'],
          1: [F, UP, FP, U2, LP, UP, L],
          2: ['R`', 'F', 'R', 'F`'],
          3:['R`', 'U`', 'R', 'U2', 'R`', 'U', 'R2', 'B`', 'R`', 'B']
          }
          algorithmArray = yObj[naturalPosition]
        }else{ // solved edge is FALSE
          yObj = {
            0: ['U`', 'L', 'U2', 'L`', 'U', 'B`', 'U`', 'B'],
            1: ['U`', 'F', 'U`', 'F`', 'U', 'F', 'U', 'F`'],
            2: ['U`', 'R', 'U2', 'R`', 'U', 'F`', 'U`', 'F'],
            3:['U`', 'B', 'U`', 'B`', 'U', 'B', 'U', 'B`']
            }
            algorithmArray = yObj[naturalPosition]
        }
      }
  
}else{ //  // ===============================axis of white is 'z'
  let zObj;

  if(isParallelBoolean === true){
    if(solvedEdge === true){
      zObj = {
        0: ['L`', 'U`', 'L', 'U`', 'L`', 'U2', 'L2', 'U2', 'L`'],
        1: ['F`', 'U`', 'F', 'U`', 'F`', 'U2', 'F2', 'U2', 'F`'],
        2: ['R`', 'U`', 'R', 'U`', 'R`', 'U2', 'R2', 'U2', 'R`'],
        3:['B`', 'U`', 'B', 'U`', 'B`', 'U2', 'B2', 'U2', 'B`']
        }
        algorithmArray = zObj[naturalPosition]
      }else{ // solved edge is false
      zObj = {
        0: ['B`', 'U2', 'B', 'U', 'B`', 'U`', 'B'],
        1: ['L`', 'U2', 'L', 'U', 'L`', 'U`', 'L'],
        2: ['F`', 'U2', 'F', 'U', 'F`', 'U`', 'F'],
        3:['R`', 'U2', 'R', 'U', 'R`', 'U`', 'R']
        }
        algorithmArray = zObj[naturalPosition]
      }
    }else{ // the piece is PERPENDICULAR in orientation
      if(solvedEdge === true){
        zObj = {
          0: ['B', 'U', 'L', 'U`', 'L`', 'B`', 'L', 'U`', 'L`'],
          1: [F, U, FP, U, LP, U, L2, FP, LP, F],
          2: ['F', 'U', 'R', 'U`', 'R`', 'F`', 'R', 'U`', 'R`'],
          3:['R', 'U', 'B', 'U`', 'B`', 'R`', 'B', 'U`', 'B`']
          }
          algorithmArray = zObj[naturalPosition]
        }else{ // solved edge is false
        zObj = {
          0: ['L', 'U2', 'L`', 'U`', 'L', 'U', 'L`'],
          1: ['F', 'U2', 'F`', 'U`', 'F', 'U', 'F`'],
          2: ['R', 'U2', 'R`', 'U`', 'R', 'U', 'R`'],
          3:['B', 'U2', 'B`', 'U`', 'B', 'U', 'B`']
          }
          algorithmArray = zObj[naturalPosition]
        }
    }
}


// push the object to solve array for debugging purposes
solvedF2LPairsArray.push(object)
// push the index of the solved vertical edge
solvedF2LIndexesArray.push(naturalPosition)
console.log('shows number of solved pairs index positions, including the current pair about to be solved...')
console.log(solvedF2LIndexesArray)
let algorithmDuration = (algorithmArray.length + 1)*rotationDelay
setTimeout(() => {
  algorithmExecution(algorithmArray)   
}, 20);


setTimeout(() => {
// here we decide what to do once the algorithm is complete. If solved edges are less than 4 execute the function again
let solvedPieces = solvedF2LIndexesArray.length
if(solvedPieces < 4){
  console.log(` number of solved edges is less than 4
  solved edges: ${solvedPieces}
  search for further F2L pairs, which will sit at the indexes missing from the below array (constaining solved F2L corner/pair indexes)`)
console.log(solvedF2LIndexesArray)
  findF2LcornersFirstLayer(solvedF2LIndexesArray)

}else{
  console.log('four F2L pieces in place... checking that F2L pieces are correctly placed at their natural indexes')
    confirmF2L()
// nextStage(currentStage)
}
}, algorithmDuration);
// I think the agorithm execution function should be reserved for exclusively executing the rotations on the cube, and the decisions about what to do next should come from here within the solve algorithms
  }
  

// OLL edges algorithms
  const OLLEdgeObject = {
    0:[...noEdgesOLLAlgo],
    1:vEdgesOLLAlgo, 
    2:[U, ...iEdgesOLLAlgo],
    3:[[U, ...vEdgesOLLAlgo], [UP, ...vEdgesOLLAlgo]], 
    4:iEdgesOLLAlgo, 
    5:[U2, ...vEdgesOLLAlgo], 
    }
    
    // algorithms for 4 unoriented OLL corner cases
    const orient4CornersObj = {
      '02112132': [U, ...dragster], 
      '01122231': [UP, ...dragster], 
      '02122131': [...dragster], 
      '01112232': [U2, ...dragster], 
      '01112131':buggy, 
      '02122232':[U, ...buggy]
    }
 
        // algorithms for 3 unoriented OLL corner cases
        const orient3CornersObj = {
          '122132': [UP, ...sune],
          '011221':[U2, ...sune],
          '012132':[...sune],
          '011232':[U, ...sune],
          '122132':[...antiSune],
          '112231':[U, ...antiSune], 
          '021131':[UP, ...antiSune],
          '022231':[U2, ...antiSune],
        }
    
// algorithms for 2 unoriented OLL corner cases
const orient2CornersObj = {
  '1121':[...superman],
  '0131':[U2, ...superman],
  '0212':[UP, ...superman],
  '2232':[U, ...superman],
  '1222':[U, ...beetle],
  '0232':[UP, ...beetle],
  '0111':[...beetle],
  '2131':[U2, ...beetle],
  '1231': [UP, ...spider], 
  '0221': [...spider], 
  '1132': [U, ...spider], 
  '0122': [U2, ...spider]
}


// object with algorithms for solving PLL corner permutations 
const permutationOjb = {
  '0132':[ UP, ...backCornerSwapAlgoPLL, U],
  '0213':[ ...frontCornerSwapAlgoPLL],
  '0231':[ ...backCornerSwapAlgoPLL, UP], 
  '0312':[ U, ...backCornerSwapAlgoPLL],
  '0321':[...doubleCornerSwapAlgoPLL, U2], 
  '0123':['N/A']
}
// contains setup move before executing corners permute
const cornerPLLSetupObj = {
  0: 'N/A', 
  1: UP, 
  2: U2,
  3: U
}

    function assessOLLEdges(){
      let tempAlgo, orientedIndexes = [], sumOfIndexes, tempString;
    upLayerEdges.forEach((edge, i) =>{edge[0] == 'y'? orientedIndexes.push(i):console.log('')});
     //an odd number of oriented PLL edges is unsolvable
     orientedIndexes.length%2 !== 0?alert(`INCORRECLY CONFIGURED CUBE: there cannot be 1 out of 4, or 3 out of 4 solved edges at the OLL stage - this scramble cannot be solved`): solvableCase()

    function solvableCase(){
      tempString = orientedIndexes.join('').toString();
      orientedIndexes.length > 0?sumOfIndexes = orientedIndexes.reduce((a,b) => a + b):sumOfIndexes = 0
      sumOfIndexes === 6?confirmOLLEdges():
      sumOfIndexes !==3?tempAlgo = OLLEdgeObject[sumOfIndexes]:tempString == '12'?
      tempAlgo = OLLEdgeObject[sumOfIndexes][0]:tempAlgo = OLLEdgeObject[sumOfIndexes][1]
      algorithmExecution(tempAlgo)
      setTimeout(() => {
      confirmOLLEdges()
      }, algoTime(tempAlgo));
    }
    }

  

// gather oriented / non-oriented corner information 
function assessOLLCorners(){
  console.log('orienting LAST LAYER CORNERS')
  let orientedArray = [], orientedStringArray = [], finalString, algoArray = [];
  upLayerCorners.forEach((corner, i) =>{
    if(corner[0] !== 'y'){orientedArray.push({'corner':i, 'y-facet':corner.indexOf('y')})}
  })
    orientedArray.forEach(element =>{ 
      orientedStringArray.push(element['corner'], element['y-facet'])
       })
 finalString = orientedStringArray.join('').toString()
finalString.length%3 === 0?algoArray = orient3CornersObj[finalString]:finalString.length%3 === 2?algoArray = orient4CornersObj[finalString]: algoArray = orient2CornersObj[finalString]

algoArray?algorithmExecution(algoArray):console.log('no algo array')
setTimeout(() => {
  confirmOLLCorners()
}, algoTime(algoArray));
}


// PLL CORNERS ASSESSMENT FUNCTION
function assessPLLCorners(){
  console.log('assessing PLL corners')
  // variables
let permutationArray = [], adjustedPermutationArray = [], stringPermutation, permutationGetArray = [],
 masterCornerIndex, masterDisplacement, algoArray = [], adjustmentMove;

  upLayerCorners.forEach((corner) =>{// create a two-letter string representing each corner
          let sortedCorner = corner.filter(x => x !== 'y').sort().join('').toString()
          permutationGetArray.push(sortedCorner) // push string to permutation array
  })// call for permutations using array of two-letter strings
 permutationArray = edgeCornerPermutationGetter(permutationGetArray) 
  masterCornerIndex = permutationArray.indexOf(0)//find position of corner with natural index 'zero' 
masterDisplacement = (0 - masterCornerIndex + 4)%4//difference between current index and 0. 
// get setup move. 
adjustmentMove = cornerPLLSetupObj[masterDisplacement]
// ADJUST PERMUTATION ARRAY TO REFLECT THE POSITIONS OF CORNERS AFTER ADJUSTMENT ROTATION
permutationArray.forEach((permutation, i) =>{
adjustedPermutationArray[(i + masterDisplacement)%4] = permutation
})
stringPermutation = adjustedPermutationArray.join('').toString()// stringify the new permutation
algoArray = [adjustmentMove, ...permutationOjb[stringPermutation]]//get solving algorithm
algorithmExecution(algoArray)// solve permutation then confirm PLL corners are permuted
  setTimeout(() => {
    confirmPLLCorners()
  }, algoTime(algoArray));
  }

//  used to get permutation of edge or corner pieces on up or down layer
  function edgeCornerPermutationGetter(array, type){
    let permutationArray = []
    let ecPermObj = {
      'r':()=>{permutationArray.push(0)},
      'gr':()=>{permutationArray.push(0)},
      'g':()=>{permutationArray.push(1)},
      'go':()=>{permutationArray.push(1)},
      'o':()=>{permutationArray.push(2)},
      'bo':()=>{permutationArray.push(2)},
      'b':()=>{permutationArray.push(3)},
      'br':()=>{permutationArray.push(3)},
    } 
type == 'edge'?
array.forEach(edge =>{ ecPermObj[edge[1]]()}):array.forEach(corner =>{ ecPermObj[corner]()})
    return permutationArray
  }

  const checkeredCaseObj = { // object holding solutions for checkered cases
    '0123':['N/A'],
    '2301':[...checkeredAlgoArray],
    '1032':[U, ...antiChecheredAlgoArray, UP],
    '3210':[...antiChecheredAlgoArray], 
  }

// PLL EDGES ASSESSMENT
function assessPLLEdges(){
console.log('assessing PLL edges')
let permutationArray  = edgeCornerPermutationGetter(upLayerEdges, 'edge') //get edge positions as a permutation
let  algoArray = [], mainAlgo, edgePermutation, solvedIndex;
//four permutations are special cases, which give a checkered pattern; none of the edges are solved
let initialPermutation = permutationArray.join('').toString()
//if permutation is for checkered case get solving algorithm. otherwise get permutation array
checkeredCaseObj[initialPermutation]? algoArray = checkeredCaseObj[initialPermutation]:noncheckeredFn();
//The solved edge position is given by permutation[i] = i. The natural indexes of the consecutive  unsolved edges will be either 2, 3, and 1,  or, 3, 1 and 2 greater than the solved edge index
function noncheckeredFn(){ // check which of the above conditions exist and set solving algorithm
  edgePermutation = permutationArray
  for(let i=0; i<edgePermutation.length;i++){
    if(edgePermutation[i] === i){solvedIndex = i;
    if(edgePermutation[(solvedIndex + 1)%4] === (solvedIndex + 2)%4 && edgePermutation[(solvedIndex + 2)%4] === (solvedIndex + 3)%4 && edgePermutation[(solvedIndex + 3)%4] === (solvedIndex + 1)%4){
  mainAlgo = anticlockSolvingEdge
    }else{mainAlgo = clockwiseSolvingEdge}
    }
  }
  // now the main algorithm is determined, add  setup and unset moves which position the top row, ready for the algorithm execution, and then return it to its original place, post algorithm; the combined algorithm will complete the cube. 
let solvedRowObj = {
  1:[UP, ...mainAlgo, U], // solved face is:green
  2:['N/A', ...mainAlgo, 'N/A'],  // solved face is: orange
  3:[U, ...mainAlgo, UP], // solved face is: blue
  0:[U2, ...mainAlgo, U2] // solved face is: red
  }
  algoArray = [...solvedRowObj[solvedIndex]]
}
algorithmExecution(algoArray)   
  setTimeout(() => {confirmPLLEdges()
  }, algoTime(algoArray));
}

// object containing stage information used by the preSolveCheck function to determine which stage is complete and which stage to move on to
let stageCheckObj = {
  'F2L':['cross',  'F2L', 'cross complete; check F2L', 'cross INCOMPLETE'], 
  'OLL_edges': ['F2L', 'OLL_edges', 'F2L complete, check OLL edges', 'F2L INCOMPLETE' ], 
  'OLL_corners':['OLL_edges', 'OLL_corners', 'OLL edges complete, check OLL corners', 'OLL edges INCOMPLETE'],
  'PLL_corners':['OLL_corners', 'PLL_corners', 'OLL corners complete, check PLL corners', 'OLL corners INCOMPLETE'],
  'PLL_edges':['PLL_corners', 'PLL_edges', 'PLL corners complete, check PLL edges', 'OLL corners INCOMPLETE'],
  'SOLVED':['PLL_edges', 'SOLVED', 'PLL edges complete, check PLL corners', 'OLL corners INCOMPLETE'],
}

function preSolveCheck(stageToCheck, array){
let message;
  if(array.length > 3){ // post cross check array
    message =  stageCheckObj[stageToCheck][1]
    stageConditionObj['completed_stage'] = stageCheckObj[stageToCheck][0]
    stageConditionObj['incomplete_stage'] = stageCheckObj[stageToCheck][1]
  }else{message =  stageCheckObj[stageToCheck][2]
  stageConditionObj['incomplete_stage'] = stageCheckObj[stageToCheck][0]
  }
  return[stageConditionObj['completed_stage'], stageConditionObj['incomplete_stage'], message]
}


let nextStageObject = {
   'cross': [()=>{checkCrossDownLayer()}, ()=>{findF2LcornersFirstLayer([])}],
   'F2L': [()=>{findF2LcornersFirstLayer(solvedF2LIndexesArray)},()=>{confirmOLLEdges()}],
   'OLL_edges': [()=>{assessOLLEdges()}, ()=>{confirmOLLCorners()}],
   'OLL_corners': [()=>{assessOLLCorners()}, ()=>{confirmPLLCorners()}],
   'PLL_corners': [()=>{assessPLLCorners()}, ()=>{confirmPLLEdges()}],
   'PLL_edges': [()=>{assessPLLEdges()}, ()=>{finalFacesCheck(5)}]
}

function nextStage(next, current, array){// decide how to deal with current stage; 
  // run pre-solve check to see which step is incomplete; the current or the next step. 
let stageCheck = preSolveCheck(next, array)
// stageCheck is the returned function 
let completedStage = stageCheck[0], nextIncompleteStage = stageCheck[1],  message = stageCheck[2]
console.log(message)  
if(current == nextIncompleteStage){ // check state of current stage
nextStageObject[current][0]() //execute the first function of property with current name
}else{
 nextStageObject[completedStage][1]()//execute first function of property with completedstage name
}
}


// CHECK PERMUTATION OF PLL OR OLL EDGES AND CROSS permutation
function stagePermutationCheck(cubieArray, next, current, configArray){
  let completeArray = [], permutationArray = [], checkArr = [cubieArray, configArray]
checkArr[0].forEach((char, i) =>{checkArr[1][i] == char? permutationArray.push(i): ()=>{}})
  // If all cubies are position correctly the permutation will be [0, 1, 2, 3]
for(let i = 0; i < permutationArray.length; i++){permutationArray[i] === i? completeArray.push(i): console.log('fail') }
if(next == 'F2L_corners'){return completeArray}else{nextStage(next, current, completeArray)}
}

// checking OLL or PLL permutation is solve permutation
function confirmOLLFinal(cubieArray, next, current){
  let completeArray = []
  cubieArray.forEach(cubie =>{
    completeArray.push(cubie[0])
  })
  stagePermutationCheck(completeArray, next, current, ['y', 'y', 'y', 'y'])
}

// check OLL EDGES
function confirmOLLEdges(){
  console.log('checking OLL edges..')
    confirmOLLFinal(upLayerEdges, 'OLL_corners', 'OLL_edges')
  }

// check OLL CORNERS
function confirmOLLCorners(){
  console.log('checking OLL corners..')
    confirmOLLFinal(upLayerCorners, 'PLL_corners', 'OLL_corners')
}


// check CROSS
function confirmCross(){
  console.log('confirming cross...')
  let crossArray = []
downLayerEdges.forEach((edge) =>{
let orderString = edge.join('').toString() //stringified joined elements for confirming orientation
crossArray.push(orderString)
})
stagePermutationCheck(crossArray, 'F2L', 'cross', ['wr', 'wg', 'wo', 'wb'])
}

// check F2L PAIRS
function confirmF2L(){
  console.log('checking F2L...')
let cornerCheckArray = [], edgeCheckArray = [], cornerResult, cornerStr, edgeStr
  downLayerCorners.forEach((corner) =>{ // remove white facet and stringify corner piece edges
    cornerStr = corner.filter(x => x !== 'w').join('').toString()
    cornerCheckArray.push(cornerStr) // push strings to corner check array
  })
  // send to check corner permutation
cornerResult = stagePermutationCheck(cornerCheckArray, 'F2L_corners', 'F2L', ['rg', 'og', 'ob', 'rb'])
// if corner check length  === 4 corners are permuted, so check edges
if(cornerResult.length > 3){ // stringify edges 
  midLayerEdges.forEach((edge) =>{ edgeStr = edge.join('').toString()
    edgeCheckArray.push(edgeStr) // push strings to edge check array
  }) 
  stagePermutationCheck(edgeCheckArray, 'OLL_edges', 'F2L', ['rg', 'og', 'ob', 'rb'])
}else{
console.log('corners not permuted')
}

}

// CHECK PLL CORNERS
function confirmPLLCorners(){
  console.log('checking PLL corners...')
  let cornerArray = [], tempCorner; // variables for corner edges, and filtered corner
  upLayerCorners.forEach((corner) =>{ // filter out y, sort, join and stringify
tempCorner = corner.filter(x => x !== 'y').sort().join('').toString()
cornerArray.push(tempCorner) // push to temp array for analysis in final confirm function
  })
    stagePermutationCheck(cornerArray, 'PLL_edges', 'PLL_corners', ['gr', 'go', 'bo', 'br'])
}

// CHECK PLL EDGES
function confirmPLLEdges(){
  console.log('checking PLL edges...')
  let edgeArray = [];
  upLayerEdges.forEach((edge) =>{
    edgeArray.push(edge[1])
}) 
stagePermutationCheck(edgeArray, 'SOLVED', 'PLL_edges',  ['r', 'g', 'o', 'b'])
}


//for each face, check all facets are the same color
function finalFacesCheck(indx){
  let facets = 8 // this number is decremented if not all facets of the current face is the same color
  if(indx > -1){ 
    let currentFacets = faceElements[indx].children // get face facets
    let compareFacet = currentFacets[0].style.backgroundColor // color of first facet
    for(let i=1; i<currentFacets.length; i++){ // check other facets to see if they match the first
compareFacet == currentFacets[i].style.backgroundColor? facets = facets: facets --
    } // if facets identical, run function with index--, otherwise with index = -1 to abort
    facets > 7? indx--: indx = -1
      finalFacesCheck(indx) 
  }else{ // if all faces have met the conditions execute finalizeSolve, otherwise alert user
facets>7? finalizeSolve():alert(`cube not solved, at least ${9-facets} unsolved cube facets`);
  }
}


function finalizeSolve(){
  preSolveEl.style.cssText = 'display:none;' // hide config buttons
  postSolveEl.style.cssText = 'display:block;' // show speed buttons
  solveInProgress.unshift('rendering') // stops console from logging moves
  alert('cube is SOLVED choose solve speed')
if(manualConfigArray.length > 0){
  manualConfigOnOff() // turn manual configuration off
}
}

// for selecting rotation speed of 3D cube when showing solve
let solveSpeedOjb = {
'fast':() =>{preAutoScramble(solutionArray, 300)},
'medium':() =>{preAutoScramble(solutionArray, 1500)},
'slow':() =>{preAutoScramble(solutionArray, 2000)},
'activity': () =>{buttonInactive.push('active')}
}

function chooseSolveSpeed(id){ //only accept click if one hasn't already been selected
if(buttonInactive.length < 1){solveSpeedOjb['activity'](); solveSpeedOjb[id]()}
}

let algorithmOjbect = {
 'L': ['left rotate', () =>{leftRotate('l-btn')}] , 
 'R': ['right rotate', () =>{ rightRotate('r-btn')}],
 'U': ['up rotate', () =>{ upRotate('u-btn')}],
 'D': ['down rotate', () =>{downRotate('d-btn')}],
 'F': ['front rotate', () =>{frontRotate('f-btn')}], 
 'B': ['back rotate', () =>{backRotate('b-btn')}],
 'L`': ['left prime rotate', () =>{leftRotate('l-prime-btn')}],
 'R`': ['right prime rotate', () =>{rightRotate('r-prime-btn')}],
 'U`': ['up prime rotate', () =>{upRotate('u-prime-btn')}],
 'D`': ['down prime rotate', () =>{downRotate('d-prime-btn')}],
 'F`': ['front prime rotate', () =>{frontRotate('f-prime-btn')}],
 'B`': ['back prime rotate', () =>{backRotate('b-prime-btn')}],
 'L2': ['left double rotate', () =>{leftRotate('l2-btnless', 'double')}],
 'R2': ['right double rotate', () =>{rightRotate('r2-btnless', 'double')}], 
 'U2': ['up double rotate', () =>{upRotate('u2-btnless', 'double')}],
 'D2': ['down double rotate', () =>{downRotate('d2-btnless', 'double')}],
 'F2': ['front double rotate', () =>{frontRotate('f2-btnless', 'double')}], 
 'B2': ['back double rotate', () =>{backRotate('b2-btnless', 'double')}], 
 'N/A': ['NULL MOVE', () =>{}],
 'time':'',
 'complete': () =>{setTimeout(() =>{console.log('algorithm complete'); console.log(solutionArray)}, algorithmOjbect['time']);}
}

function algorithmExecution(array){
  array.length > 0? console.log(array): console.log('array is empty');
  solveInProgress.length > 0? solutionArray.push(...array):solutionArray.push(array);
  let totalAlgorithmTime = (array.length)*rotationDelay
  algorithmOjbect['time'] =  totalAlgorithmTime

  array.forEach((move, i) =>{
    console.log(move)
    setTimeout(() => {
algorithmOjbect[move][1](); console.log(algorithmOjbect[move][0])
    }, i*rotationDelay);
  })
  algorithmOjbect['complete']()
}
// 5598

// import {p5} from './sketch.js'
// console.log(p5)

