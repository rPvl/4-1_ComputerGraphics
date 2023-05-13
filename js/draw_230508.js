var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer({ antialias: true });
var camera = new THREE.PerspectiveCamera(75, 1.0, 0.1, 1000);//원근

function initLight() {
    var pointLight = new THREE.PointLight(0xffffff);//빛이 퍼짐. 점 광원 발산.
    pointLight.position.set(10,10,10);
    pointLight.castShadow = true;
    scene.add(pointLight);//씬에 추가해야 보임
}

function initRenderer() {
    camera.position.z = 15;//카메라 위치. 0,0,0 을 바라 봄.
    renderer.setClearColor("#FFFFFF");
    renderer.setSize(500, 500);
    // Append Renderer to DOM
    document.body.appendChild(renderer.domElement);
}
function initGeometry() {
    // const axesHelper = new THREE.AxesHelper(); //x:red y:green z:blue 
    // scene.add(axesHelper);

    //이거 설정 먼저해야 메시 설정가능
    
    var geometryCube = new THREE.BoxGeometry(1, 1, 1,2,2,2);//박스 가로길이, 세로길이, 깊이 정의
    //var geometryCube = new THREE.SphereGeometry(1);//와이어프레임으로 하면 돌아가는거 보임. 
    //var geometryCube = new THREE.ConeGeometry(1, 2, 4);//반지름, 높이, 밑면 모양 결정. 1만 넣어도 됨.

    //material0.wireframe=true;//면의 개수는 몇갠가? (1,1,1)의 경우 12개이다. 삼각형으로 구성되기때문임.

    for (var i = 0; i < 10; i++) {//원래 값 5였음. 총 25번 반복
        for (var j = 0; j < 10; j++) {
            var material0 = new THREE.MeshLambertMaterial({ color: "#ff00ff" });//물체 색
            material0.color.setHex(Math.random()*0xffffff);//색 서로 다르게 하려면 생성하는것도 for문 안에 있어야 한다.
            //if(i>=5) material0.wireframe=true;
            if(i%2==0) material0.wireframe=true;
            
            var cube = new THREE.Mesh(geometryCube, material0);
            //Translation 이동
            cube.translateX(-9.0 + 2.0 * i); //이거 없으면 원점에 25개가 만들어짐.
            cube.translateY(-9.0 + 2.0 * j);

            //큐브 색 각기 다르게
            

            // Add cube to Scene
            scene.add(cube);//반드시 씬에 추가
        }
    }
}

function init() {
    initLight();
    initRenderer();
    initGeometry();
}

// Render Loop
var render = function () {
    requestAnimationFrame(render);//돌아간다==애니메이션이 있다 == 바뀐다
    for (var i = 1; i < scene.children.length; i++) {//씬의 칠드런의 길이. point light 위치는 0, 위치는 1부터 25개의 큐브가 들어있다.
        scene.children[i].rotation.x += 0.1*Math.random();
        scene.children[i].rotation.y += 0.08*Math.random();
        scene.children[i].rotation.z += 0.1*Math.random();
    }
    renderer.render(scene, camera);

};

init();
render();