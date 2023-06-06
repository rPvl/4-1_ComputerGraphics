var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.shadowMap.enabled = true;
var camera = new THREE.PerspectiveCamera(30, 1.0, 0.1, 1000);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
var torus;

//Lights
//const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
//조명 강도, 빛의 최대 범위(거리), 빛이 분산되는 최대 각도, 감쇠되는 원뿔의 백분율, 빛의 거리에 따라 빛이 어두워지는 양
const spotLight1 = new THREE.SpotLight(0xff0000, 0.9, 0, Math.PI * 0.5);//red
//const spotLightHelper = new THREE.SpotLightHelper(spotLight1);
const spotLight2 = new THREE.SpotLight(0x00ff00, 0.9, 0, Math.PI * 0.5);//green
//const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
const spotLight3 = new THREE.SpotLight(0x0000ff, 0.9, 0, Math.PI * 0.5);//blue
//const spotLightHelper3 = new THREE.SpotLightHelper(spotLight3);
const spotLight4 = new THREE.SpotLight(0xffffff, 0.9, 0, Math.PI * 0.5);//blue
//const spotLightHelper4 = new THREE.SpotLightHelper(spotLight3);


var gui = new dat.GUI();

function initLight() {
    //ambientLight.position.set(-2, -2, 2);
    //scene.add(ambientLight);
    spotLight1.position.set(-2,-2,2);
    scene.add(spotLight1);
    spotLight2.position.set(2,-2,2);
    scene.add(spotLight2);
    spotLight3.position.set(2,2,2);
    scene.add(spotLight3);
    spotLight4.position.set(-2,2,2);
    scene.add(spotLight4);

}

function initGeometry() {
    const axesHelper = new THREE.AxesHelper(); //x:red y:green z:blue 
    scene.add(axesHelper);

    var material0 = new THREE.MeshLambertMaterial({ color: "#ffffff", side: THREE.DoubleSide });
    var geometryPlane = new THREE.PlaneGeometry(10, 10);
    var plane = new THREE.Mesh(geometryPlane, material0);
    plane.receiveShadow = true;
    scene.add(plane);

    var plane = new THREE.Mesh(geometryPlane, material0);
    plane.receiveShadow = true;
    plane.translateY(5.0);
    plane.translateZ(5.0);
    plane.rotateX(Math.PI * 0.5);
    scene.add(plane);

    var plane = new THREE.Mesh(geometryPlane, material0);
    plane.receiveShadow = true;
    plane.translateX(-5.0);
    plane.translateZ(5.0);
    plane.rotateY(Math.PI * 0.5);
    scene.add(plane);


    //MeshStandardMaterial 해야함. MeshNormalMaterial하면 형광같은 재질임. 빛 꺼도 자체 발광 느낌.
    var material1 = new THREE.MeshStandardMaterial({ color: "#ffffff"});
    var geoTorus1 = new THREE.TorusGeometry(1.0, 0.6);//토러스
    torus1 = new THREE.Mesh(geoTorus1, material1);
    //torus1.castShadow = true;
    torus1.translateZ(0);
    scene.add(torus1);

    var material2 = new THREE.MeshStandardMaterial({ color: "#ffffff"});
    var geoTorus2 = new THREE.TorusGeometry(0.9, 0.5);//토러스
    torus2 = new THREE.Mesh(geoTorus2, material2);
    //torus2.castShadow = true;
    torus2.translateZ(0.5);
    scene.add(torus2);

    var material3 = new THREE.MeshStandardMaterial({ color: "#ffffff"});
    var geoTorus3 = new THREE.TorusGeometry(0.8, 0.4);//토러스
    torus3 = new THREE.Mesh(geoTorus3, material3);
    //torus3.castShadow = true;
    torus3.translateZ(1.0);
    scene.add(torus3);

    var material4 = new THREE.MeshStandardMaterial({ color: "#ffffff"});
    var geoTorus4 = new THREE.TorusGeometry(0.7, 0.3);//토러스
    torus4 = new THREE.Mesh(geoTorus4, material4);
    //torus4.castShadow = true;
    torus4.translateZ(1.5);
    scene.add(torus4);

    var material5 = new THREE.MeshStandardMaterial({ color: "#ffffff" });
    var geoCl1 = new THREE.CylinderGeometry(1.0);//실린더
    var cylin1 = new THREE.Mesh(geoCl1, material5);
    cylin1.translateX(3);
    cylin1.translateY(-3);
    cylin1.translateZ(0.5);
    cylin1.rotateX(Math.PI * 0.5);//x축으로 90도 회전 ////////////////////////////확인하기
    scene.add(cylin1);

    var material6 = new THREE.MeshStandardMaterial({ color: "#ffffff" });
    var geoCl2 = new THREE.CylinderGeometry(1.0);//실린더
    var cylin2 = new THREE.Mesh(geoCl2, material6);
    cylin2.translateX(-3);
    cylin2.translateY(3);
    cylin2.translateZ(0.5);
    cylin2.rotateX(Math.PI * 0.5);
    scene.add(cylin2);


    var material7 = new THREE.MeshStandardMaterial({ color: "#ffffff" });
    var geoCone1 = new THREE.ConeGeometry(1.0, 1.5);//콘
    var cone1 = new THREE.Mesh(geoCone1, material7);
    cone1.translateX(3);
    cone1.translateY(3);
    cone1.translateZ(0.5);
    cone1.rotateX(Math.PI * 0.5);
    scene.add(cone1);


    var material8 = new THREE.MeshStandardMaterial({ color: "#ffffff" });
    var geoCone2 = new THREE.ConeGeometry(1.0, 1.5);//콘
    var cone2 = new THREE.Mesh(geoCone2, material8);
    cone2.translateX(-3);
    cone2.translateY(-3);
    cone2.translateZ(0.5);
    cone2.rotateX(Math.PI * 0.5);
    scene.add(cone2);
}

function initRenderer() {
    camera.position.x = 15;
    camera.position.y = -15;
    camera.position.z = 15;
    camera.up.x = 0;
    camera.up.y = 0;
    camera.up.z = 1;
    controls.update();
    renderer.setClearColor("#000000");
    renderer.setSize(500, 500);
    // Append Renderer to DOM
    document.body.appendChild(renderer.domElement);
    console.log("[02-quiz]");
    console.log(scene.children);
}

function initGUI() {
    //gui.add(ambientLight, "visible").name("AMB Light");
    gui.add(spotLight1,"visible").name("RED Light");
    gui.add(spotLight2,"visible").name("GREEN Light");
    gui.add(spotLight3,"visible").name("BLUE Light");
    gui.add(spotLight4,"visible").name("WHITE Light");
}

function init() {
    initGeometry();
    initLight();
    initRenderer();
    initGUI();
}

// Render Loop
var render = function () {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
};

init();
render();