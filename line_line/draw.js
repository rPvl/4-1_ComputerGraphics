let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

//Make data
let pts = [];
pts.push(new THREE.Vector2(0, 0)); //Vecotr2 is 2D. (x,y).
pts.push(new THREE.Vector2(50, 50));// 250, 250.   exception 50,50
pts.push(new THREE.Vector2(0, 100));
pts.push(new THREE.Vector2(300, 200));

//Draw Line. 선 그리기.
for (let i = 0; i < pts.length; i += 2) {
    draw_line(pts[i],pts[i+1]); //(start point, end point)
}

function draw_line(p0,p1)
{
    ctx.beginPath(); //reset path.
    ctx.moveTo(p0.x, p0.y); //move point (p0.x, p0.y).
    ctx.lineTo(p1.x, p1.y); //drawing point end.
    ctx.stroke(); //drawing (line). not plane.
}

function draw_point(p)
{
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI, true); // arc is 호. p.x, p.y is center. 5 is radius. 
                                                // 0 is start angle. 2*PI is end angle.
                                                // true is CCW. 반시계. 
    ctx.fill(); // 채운다.
}

function line_line_intersection(p0, p1, p2, p3) {
    console.log(p0);
    console.log(p1);
    console.log(p2);
    console.log(p3);

    //Need to write...
    //y=ax+b
    let a0; let b0; let a1; let b1;
    a0=(p0.y-p1.y)/(p0.x-p1.x); 
    a1=(p2.y-p3.y)/(p2.x-p3.x);
    b0=(p0.y-a0*p0.x); 
    b1=p2.y-a1*p2.x;

    let intersectionX=(b1-b0)/(a0-a1);
    let intersectionY=a0*((b1-b0)/(a0-a1))+b0;

    //exception
    //p1.x, p1.y = 50,50 ?
    if(p0.x>p1.x){
        if(intersectionX>=p1.x && intersectionX<=p0.x){
            let intersectionPt = new THREE.Vector2(intersectionX, intersectionY);
            draw_point(intersectionPt);
        }
    }
    else{
        if(intersectionX>=p0.x && intersectionX<=p1.x){
            let intersectionPt = new THREE.Vector2(intersectionX, intersectionY);
            draw_point(intersectionPt);
        }
    }

    //let intersectionX=400;
    //let intersectionY=400;

    //let intersectionPt = new THREE.Vector2(intersectionX, intersectionY);
    //draw_point(intersectionPt);
}

line_line_intersection(pts[0],pts[1],pts[2],pts[3]);
