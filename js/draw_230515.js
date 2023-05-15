var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
var camera = new THREE.PerspectiveCamera(75, 1.0, 0.1, 1000);
var controls = new THREE.OrbitControls(camera, renderer.domElement);//마우스 컨트롤 도구
//var index = 0;

controls.enableDamping = true; // 부드러운 감속 효과 활성화
//controls.rotateSpeed=5;//회전 속도
controls.autoRotate = true;//카메라가 자동회전

function loadOBJ(url) {//obj 파일 포맷 읽는다
  var loader = new THREE.OBJLoader();
  // instantiate a loader 로더 인스턴스화
  // load a resource 리소스 불러오기
  loader.load(
    // resource URL
    url,
    // called when resource is loaded 리소스가 불러와지면 호출된다.
    function (object) {//로딩 다 되면 scene에 추가

      scene.add(object);//scene[2]

    },
    // called when loading is in progresses 로딩 진행중일때 호출된다.
    function (xhr) {//비동기 처리되기 때문에 로딩 메시지표시

      console.log((xhr.loaded / xhr.total * 100) + '% loaded');

    },
    // called when loading has errors
    function (error) {//실패시

      console.log('An error happened');

    }
  );
}

function initLight() {
  var pointLight0 = new THREE.PointLight(0xffffff);
  pointLight0.position.set(10, 0, 10);
  scene.add(pointLight0);
}

function initGeometry() {
  const axesHelper = new THREE.AxesHelper(); //x:red y:green z:blue 
  scene.add(axesHelper);//scene[1]
  loadOBJ("../models/kitten.obj");
  //loadOBJ("../models/bunny_stanford.obj");//모델 불러오기
  //loadOBJ("../models/gargoyle.obj");//모델 불러오기.
}

function initRenderer() {
  camera.position.z = 1;
  controls.update();
  renderer.setClearColor("#ffffff");
  renderer.setSize(500, 500);
  // Append Renderer to DOM
  document.body.appendChild(renderer.domElement);
}

function init() {
  initLight();//scene[0]
  initGeometry();
  initRenderer();
}


let a=0;
// Render Loop
var render = function () {//여기서 객체 회전과 광원 회전
  requestAnimationFrame(render);
  scene.children[2].rotation.y +=0.01;//y축 기준 회전
  scene.children[0].position.set(Math.cos(a)*10,0,Math.sin(a)*10);//광원이 원을 그림
  a+=0.01;
  //index++;
  //scene.children[0].position.set(Math.cos(Math.PI*index/100.0)*10,0,Math.sin(Math.PI*index/100.0)*10);//교수님코드
  controls.update();
  renderer.render(scene, camera);
};

init();
render();