// Create an empty scene
var scene = new THREE.Scene();
// Create a basic perspective camera
//var camera = new THREE.PerspectiveCamera(20, 0.10, 0.1, 10);//원근투영. 시야각,aspect(가로세로비율):window.innerWidth / window.innerHeight, 가까운거 먼거
var camera = new THREE.OrthographicCamera(0,3,10,-5,1,4)//평행투영. 왼오위아래.가까운거 먼거.

camera.position.z = 4;//실제 카메라위치(0,0,4) (0,0,0)방향으로 바라봄. up(0,1,0)
// Create a renderer with Antialiasing
var renderer = new THREE.WebGLRenderer({ antialias: true });
// Configure renderer clear color
renderer.setClearColor("#000000");
// Configure renderer size
renderer.setSize(500,500);//window.innerWidth, window.innerHeight);
// Append Renderer to DOM
document.body.appendChild(renderer.domElement);
//---------------------------------------------------------
//const axesHelper = new THREE.AxesHelper();//축 표현
//scene.add(axesHelper);

var material = new THREE.MeshBasicMaterial({ color: "#fed136" });
var material1 = new THREE.MeshBasicMaterial({ color: "green" });
material.wireframe = true;
material1.wireframe = true;

var geometryCube = new THREE.BoxGeometry(1, 1, 1);
var cube = new THREE.Mesh(geometryCube, material);

var cube1 = new THREE.Mesh(geometryCube, material1);

//Translation
cube.translateX(1);
//cube1.translateZ(-4.0);//뒤로감.

//var geometryTorus = new THREE.TorusGeometry(1.0, 0.5, 16, 100);
//var torus = new THREE.Mesh(geometryTorus, material);

// Add cube to Scene
scene.add(cube);
scene.add(cube1);
//scene.add(torus);
// Render Loop
var render = function () {
  // requestAnimationFrame(render);
  // // Render the scene
  // // cube.rotation.x += 0.01;
  // // cube.rotation.y += 0.01;
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.01;
  // torus.rotation.z += 0.01;
  renderer.render(scene, camera);
};

render();