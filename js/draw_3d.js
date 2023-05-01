//create an empty scene
var scene = new THREE.Scene();
//create a basic perspective camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1, 1000);//PerspectiveCamera : 원근투영가능한 카메라
camera.position.z = 4;
//create a renderer with Antialiasing
var renderer = new THREE.WebGL1Renderer({antialias:true});
//configure renderer clear color
renderer.setClearColor("#000000");//배경색
//Configure renderer size
renderer.serSize(window.innerWidth, window.innerHeight);
//Append Renderer to DOM
document.body.appendChild(renderer.domElement);

//실제 그리는 객체 정의
var material = new THREE.MeshBasicMaterial({color:"#fed136"}); //객체 재질

//객체 형생 와이어프레임 표현
material.wireframe = true;

//객체1
var geometryCube = new THREE.BoxGeometry(1,1,1); //기하학 정보, BoxGeometry: 박스 객체 _길이
var cube = new THREE.Mesh(geometryCube,material);
//객체2
var geometryTorus = new THREE.TorusGeometry(1.0, 0.5, 16, 100);//큰반지름,작은반지름,몇 등분
var torus = new THREE.Mesh(geometryTorus, material);

//add cube to secne
scene.add(cube);
//scene.add(torus);

//Render Loop
var render=function(){
    requestAnimationFrame(render);//애니메이션 반복
    //Render the scene
    cube.rotation.x += 0.01; //회전
    cube.rotation.y += 0.01;
    //torus.rotation.x += 0.01;
    //torus.rotation.y += 0.01;
    //torus.ratation.x += 0.01;
    renderer.render(scene, camera);
};

render();