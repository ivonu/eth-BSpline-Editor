"use strict";

var showConstruction = false;
var showNodeConnections = true;
var showBezierNodes = false;

var Curve = function() {
	this.timeKnot = new Knot(0,0,true);
	this.knots = new Array();
	this.nodes = new Array();
};

Curve.prototype.draw = function(ctx)
{
    if (showNodeConnections) {
		// Connect nodes with a line
        setColors(ctx,'rgb(10,70,160)');
        for (var i = 1; i < this.nodes.length; i++) {
            drawLine (ctx, this.nodes[i-1], this.nodes[i]);
        }
		// Draw nodes
		setColors(ctx,'rgb(10,70,160)','white');
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].draw(ctx);
		}
    }
    
	// Draw the curve
    ctx.lineWidth = 2;
    setColors(ctx,'black');
    drawCurve(ctx, this);

	ctx.lineWidth = 1;

    if (this.nodes.length >= 4) {

        // De Boor construction
        if (showConstruction) {
            if (this.timeKnot.value >= this.knots[2].value &&
                this.timeKnot.value <  this.knots[this.knots.length - 3].value) {

                drawConstruction (ctx, evaluateBSpline (this.timeKnot.value, this));
            }
        }

        // Bézier node construction
        if (showBezierNodes) {

            if (this.timeKnot.value >= this.knots[2].value &&
                this.timeKnot.value <  this.knots[this.knots.length - 3].value) {

                var i;
                for (i = 2; i < this.knots.length - 3; i++) {
                    if (this.timeKnot.value >= this.knots[i].value &&
                        this.timeKnot.value < this.knots[i+1].value) break;
                }

                var t1 = this.knots[i].value;
                var t2 = this.knots[i+1].value;

                var p1 = evaluateBezier (t1, t1, t1, this);
                var p2 = evaluateBezier (t1, t1, t2, this);
                var p3 = evaluateBezier (t1, t2, t2, this);
                var p4 = evaluateBezier (t2, t2, t2, this);

                drawBezier (ctx, p1, p2, p3, p4);
            }
        }
    }
}

Curve.prototype.addNode = function(x,y)
{
    this.nodes.push(new Node(x,y));
	if (this.knots.length == 0) {
        this.knots.push(new Knot(0,0,false));
        this.knots.push(new Knot(1,1,false));
        this.knots.push(new Knot(2,2,false));
        // ev. add 2 more knots
    } else {
        this.knots.push(new Knot(this.knots.length,this.knots.length,false));
    }
}


