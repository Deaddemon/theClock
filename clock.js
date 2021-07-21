 
 


var canvas = document.getElementById("canvas");

var ctx = canvas.getContext("2d");
var r =  canvas.height/2 ;
// ctx.translate(x, y);
ctx.translate(r,r); 
 r= r*0.9 // kind of gives padding from the canvas

setInterval(drawClock,1000);
 
function drawClock(){
    drawFace(ctx, r);
    drawNumbers(ctx,r);
    drawTime(ctx , r)
   
    
}

function drawFace(ctx, r){
    var g;
    ctx.beginPath(); //used to reset the current path
    ctx.arc(0, 0 , r , 0 , 2* Math.PI);
      //   ctx.arc(x, y, radius, startAngle, endAngle [, counterclockwise]);
    ctx.fillStyle="white";
    ctx.fill(); //fill the current drawing
    g = ctx.createRadialGradient(0,0,r*0.95 , 0 ,0, r*1.05);
     // context.createRadialGradient(x0,y0,r0,x1,y1,r1);
     g.addColorStop(0,'#232323');
     g.addColorStop(0.5,'#CDCDCD');
     g.addColorStop(1,'#3C3C3C');
     // addColorStop is used  so that we can actually see the gradient
     ctx.strokeStyle = g;
     ctx.lineWidth  =r*0.1;
     ctx.stroke();

     //its for inner circle
     ctx.beginPath();
     ctx.arc(0,0, r*0.1 , 0 , 2*Math.PI);
     ctx.fillStyle = '#3C3C3C';
     ctx.fill();

}
 
function drawNumbers(ctx,r){
    var ang;
    var n;
    ctx.font = r*0.15 + "px Caveat Brush";
    ctx.textBaseline= 'middle';
    ctx.textAlign ='center';

    for(n=1 ; n<13 ; n++){

        ang = n* Math.PI /6 ;
        ctx.rotate(ang); 
        // The CanvasRenderingContext2D.rotate() method of the Canvas 2D API adds a rotation to the transformation matrix. clockwise


        ctx.translate(0, -r*0.85); //negative value means up
          ctx.rotate(-ang);  
        ctx.fillText(n.toString() , 0 ,0);
        // to set back to original transformation axis that is with r and r as center
    ctx.rotate(ang);
       ctx.translate(0, r*0.85);
       ctx.rotate(-ang);
  
    }}


function drawTime(ctx , r){
    var date =  new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    hour = hour%12;
    hour = (hour*Math.PI/6) +(min*Math.PI/(6*60))+(sec*Math.PI/(360*60)) ;
    drawhand( ctx , hour ,r*0.5 , r*0.07);

    min = (min*Math.PI/30)+ (sec*Math.PI/(30*60));
    drawhand( ctx ,min ,r*0.8 , r*0.07);

    sec= sec*Math.PI/30;
    drawhand( ctx , sec ,r*0.9 , r*0.02);


}

function drawhand( ctx, pos , length , width ){
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

