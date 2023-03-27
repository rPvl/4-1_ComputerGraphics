let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");
let xValue = 50;
let yValue = 200;

let boxPts = [];

boxPts.push(new THREE.Vector2(150, 150));
boxPts.push(new THREE.Vector2(350, 350));

boxPts.push(new THREE.Vector2(xValue, yValue));
boxPts.push(new THREE.Vector2(xValue + 50, yValue + 50));

boxPts.push(new THREE.Vector2(70, 70));
boxPts.push(new THREE.Vector2(100, 400));

function draw_box(minPt, maxPt, isFill) {
  ctx.beginPath();
  ctx.rect(minPt.x, minPt.y, maxPt.x - minPt.x, maxPt.y - minPt.y);
  if (isFill)
    ctx.fill();
  else
    ctx.stroke();
}

function draw_image() {
  let isFill1 = false; let isFill2 = false;
  if (box_box_collision(boxPts[0], boxPts[1], boxPts[2], boxPts[3]))
    isFill1 = true;
  ctx.strokeStyle = "green";
  ctx.fillStyle = "green"
  draw_box(boxPts[0], boxPts[1], isFill1)
  ctx.strokeStyle = "red"
  ctx.fillStyle = "red"
  draw_box(boxPts[2], boxPts[3], isFill1)
  if (box_box_collision(boxPts[2], boxPts[3], boxPts[4], boxPts[5]))
    isFill2 = true;
  ctx.strokeStyle = "red"
  ctx.fillStyle = "red"
  draw_box(boxPts[2], boxPts[3], isFill2)
  ctx.strokeStyle = "blue"
  ctx.fillStyle = "blue"
  draw_box(boxPts[4], boxPts[5], isFill2)
}

function box_box_collision(pMin, pMax, qMin, qMax) {//q가 빨강
  let pw = pMax.x - pMin.x;
  let qw = qMax.x - qMin.x;
  let ph = pMax.y - pMin.y;
  let qh = qMax.y - qMin.y;
  //Need to write...
  if(pMin.x<=qMax.x && pMin.y<=qMax.y && pMax.x>=qMin.x && pMax.y>=qMin.y)
    return true;
  return false;

  //if (false)
  //  return true;
  //return false
}

//Keyboard Input
function keyDown(e) {
  if (e.key === 'ArrowRight' || e.key === 'Right') {
    xValue += 5;
  } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
    xValue -= 5;
  } else if (e.key === 'ArrowUp' || e.key === 'Up') {
    yValue -= 5;
  } else if (e.key === 'ArrowDown' || e.key === 'Down') {
    yValue += 5;
  }

  boxPts[2].x = xValue;
  boxPts[3].x = xValue + 50;
  boxPts[2].y = yValue;
  boxPts[3].y = yValue + 50;
}

//Animation Callback
function clear() {
  ctx.clearRect(0, 0, c.width, c.height);
}
function update() {
  clear();
  draw_image();
  requestAnimationFrame(update);
}
update();
document.addEventListener('keydown', keyDown);
