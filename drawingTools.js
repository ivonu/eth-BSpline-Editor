"use strict";

function setColors(ctx,stroke,fill) {
	if(typeof(stroke)==='undefined') stroke = 'black';
	if(typeof(fill)==='undefined') fill = 'blue';
	ctx.fillStyle = fill;
	ctx.strokeStyle = stroke;
}

function drawLine(ctx, p1, p2) {
	ctx.beginPath();
	ctx.moveTo(p1.x, p1.y);
	ctx.lineTo(p2.x, p2.y);
	ctx.stroke();
}

function drawCircle(ctx, p, r) {
	ctx.beginPath();
	ctx.arc(p.x, p.y, r, 0, 2*Math.PI, false);
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.stroke();
}

function drawText(ctx,x,y,str) {
	var oldFill = ctx.fillStyle;
	ctx.font = '12pt Calibri';
	ctx.fillStyle = 'rgb(10,70,160)';
	ctx.fillText(str, x, y);
	ctx.fillStyle = oldFill;
}

function getMousePos(evt) {
	var rect = evt.target.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}


function drawCurve (ctx, curve) {
    if (curve.nodes.length < 4) return

    var samples = 500;

    var v1 = curve.knots[2].value;
    var v2 = curve.knots[curve.knots.length - 3].value;

    var p1 = evaluateBSpline (v1, curve).p;

    for (var i = 0; i < samples; i++) {
        var t = v1 + (v2 - v1) / samples * i;
        var p2 = evaluateBSpline (t, curve).p;
        drawLine (ctx, p1, p2);
        p1 = p2;
    }
}

function drawConstruction (ctx, construction) {
    setColors  (ctx,'red', 'red');
    drawCircle (ctx, construction.p10, 4);
    drawCircle (ctx, construction.p20, 4);
    drawCircle (ctx, construction.p30, 4);
    drawCircle (ctx, construction.p40, 4);
    drawLine   (ctx, construction.p10, construction.p20);
    drawLine   (ctx, construction.p20, construction.p30);
    drawLine   (ctx, construction.p30, construction.p40);

    setColors  (ctx,'orange', 'orange');
    drawCircle (ctx, construction.p21, 2);
    drawCircle (ctx, construction.p31, 2);
    drawCircle (ctx, construction.p41, 2);
    drawLine   (ctx, construction.p21, construction.p31);
    drawLine   (ctx, construction.p31, construction.p41);

    setColors  (ctx,'yellow', 'yellow');
    drawCircle (ctx, construction.p32, 2);
    drawCircle (ctx, construction.p42, 2);
    drawLine   (ctx, construction.p32, construction.p42);

    setColors  (ctx,'green', 'green');
    drawCircle (ctx, construction.p, 2);
}

function drawBezier (ctx, p1, p2, p3, p4) {

    setColors(ctx,'gray', 'gray');

    drawCircle (ctx, p1, 4);
    drawCircle (ctx, p2, 4);
    drawCircle (ctx, p3, 4);
    drawCircle (ctx, p4, 4);

    drawLine   (ctx, p1, p2);
    drawLine   (ctx, p2, p3);
    drawLine   (ctx, p3, p4);
}