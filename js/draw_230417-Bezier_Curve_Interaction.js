let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let ctrlPts = [];
let isClicked = false;
let clickIdx = -1;
let aboveIdx = -1;

//베이즈커브 결과화면2
// for(let i=0;i<10;i++){
//   for(let j=0;j<10;j++){
//     ctrlPts.push(new THREE.Vector2(50*i,50*j));
//   }
// }
ctrlPts.push(new THREE.Vector2(100, 400));
ctrlPts.push(new THREE.Vector2(200, 200));
ctrlPts.push(new THREE.Vector2(300, 200));
ctrlPts.push(new THREE.Vector2(400, 400));

function draw_point(p, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
  ctx.fill();
}

function draw_line(p0, p1, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  ctx.lineTo(p1.x, p1.y);
  ctx.stroke();
}

function draw_bezier(ctrlPts) {

  for (let i = 0; i < ctrlPts.length - 1; i++)
    draw_line(ctrlPts[i], ctrlPts[i + 1], "#000000");

  for (let i = 0; i < ctrlPts.length; i++)
    if(aboveIdx == i){ //isClicked==true && clickIdx==i 이 조건은 마우스 클릭시 동작하게됨.
      //let style = "rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")";
      //draw_point(ctrlPts[i], style);
      draw_point(ctrlPts[i], "red");
    }
    else draw_point(ctrlPts[i], "#000000");
    
  
  let bezierPts = [];
  let resolution = 500;//부드럽게 하려면 숫자 늘리면 됨.
  for (let i = 0; i <= resolution; i++) {
    let t = i / resolution;
    bezierPts.push(bezier_curve(ctrlPts, t));
  }
  for (let i = 0; i < bezierPts.length - 1; i++)
    draw_line(bezierPts[i], bezierPts[i + 1], "#cc00cc");

}

//bezier functions
function Berstein_polynomial(n, i, t) {
  let binomial_coefficient = factorial(n) / (factorial(i) * factorial(n - i));
  let mid = Math.pow(t, i);
  let back = Math.pow(1 - t, n - i);
  return binomial_coefficient * mid * back;
}
function factorial(n) {
  if (n == 1 || n == 0)
    return 1;
  return n * factorial(n - 1);
}
function bezier_curve(ctrlPts, t) {
  let result_point = new THREE.Vector2(0, 0);
  for (let i = 0; i < ctrlPts.length; i++) {
    result_point.x += ctrlPts[i].x * Berstein_polynomial(ctrlPts.length - 1, i, t);
    result_point.y += ctrlPts[i].y * Berstein_polynomial(ctrlPts.length - 1, i, t);
  }
  return result_point;
}

//animation functions
function getMousePos(c, e) {
  var rect = c.getBoundingClientRect();
  return new THREE.Vector2(Math.round(e.clientX - rect.left), Math.round(e.clientY - rect.top));

}
c.addEventListener("mousemove", function (e) {
  var mousePos = getMousePos(c, e);
  aboveIdx = -1;
  for(let i =0; i<ctrlPts.length; i++)
    {if(mousePos.distanceTo(ctrlPts[i]) < 10 ) aboveIdx = i;}//현재 마우스 위치가 점과 거리가 10이하라면 색칠
      
  if (isClicked) {
    ctrlPts[clickIdx].x = mousePos.x;
    ctrlPts[clickIdx].y = mousePos.y;
  }
}, false);

c.addEventListener("mousedown", function (e) {
  var mousePos = getMousePos(c, e);
  isClicked = false;
  clickIdx = -1;
  for (let i = 0; i < ctrlPts.length; i++) {
    if (mousePos.distanceTo(ctrlPts[i]) < 10) {
      isClicked = true;
      clickIdx = i;
    }
  }
  console.log(isClicked + " " + clickIdx);
}, false);

c.addEventListener("mouseup", function (e) {
  isClicked = false;
  clickIdx = -1;
})

function clear() {
  ctx.clearRect(0, 0, c.width, c.height);
}
function draw_image() {
  draw_bezier(ctrlPts);
}
function update() {
  clear();
  draw_image();
  requestAnimationFrame(update);
}
update();
