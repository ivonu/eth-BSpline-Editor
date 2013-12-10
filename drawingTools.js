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

    var p1 = evaluateBSpline (v1, curve);

    for (var i = 0; i < samples; i++) {
        var t = v1 + (v2 - v1) / samples * i;
        var p2 = evaluateBSpline (t, curve).p43;
        drawLine (ctx, p1, p2);
        p1 = p2;
    }
}

function drawConstruction (ctx, p) {
    setColors(ctx,'red', 'red');
    drawCircle (ctx, p.p10, 4);
    drawCircle (ctx, p.p20, 4);
    drawCircle (ctx, p.p30, 4);
    drawCircle (ctx, p.p40, 4);
    drawLine (ctx, p.p10, p.p20);
    drawLine (ctx, p.p20, p.p30);
    drawLine (ctx, p.p30, p.p40);

    setColors(ctx,'orange', 'orange');
    drawCircle (ctx, p.p21, 2);
    drawCircle (ctx, p.p31, 2);
    drawCircle (ctx, p.p41, 2);
    drawLine (ctx, p.p21, p.p31);
    drawLine (ctx, p.p31, p.p41);

    setColors(ctx,'yellow', 'yellow');
    drawCircle (ctx, p.p32, 2);
    drawCircle (ctx, p.p42, 2);
    drawLine (ctx, p.p32, p.p42);

    setColors(ctx,'green', 'green');
    drawCircle (ctx, p.p43, 2);
}