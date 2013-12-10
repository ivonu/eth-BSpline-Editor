"use strict";

function evaluateBSpline (t, curve) {
    var k = 0;
    for (var l = 3; l < (curve.knots.length - 2); l++) {
        if (curve.knots[l].value >= t) break;
        k++;
    }

    var u1 = curve.knots[k + 0].value;
    var u2 = curve.knots[k + 1].value;
    var u3 = curve.knots[k + 2].value;
    var u4 = curve.knots[k + 3].value;
    var u5 = curve.knots[k + 4].value;
    var u6 = curve.knots[k + 5].value;

    var p10 = curve.nodes[k + 0].getPoint();
    var p20 = curve.nodes[k + 1].getPoint();
    var p30 = curve.nodes[k + 2].getPoint();
    var p40 = curve.nodes[k + 3].getPoint();

    var a21 = (t - u1) / (u4 - u1);
    var a31 = (t - u2) / (u5 - u2);
    var a41 = (t - u3) / (u6 - u3);
    var p21 = p10.multiply(1 - a21).add(p20.multiply(a21));
    var p31 = p20.multiply(1 - a31).add(p30.multiply(a31));
    var p41 = p30.multiply(1 - a41).add(p40.multiply(a41));

    var a32 = (t - u2) / (u4 - u2);
    var a42 = (t - u3) / (u5 - u3);
    var p32 = p21.multiply(1 - a32).add(p31.multiply(a32));
    var p42 = p31.multiply(1 - a42).add(p41.multiply(a42));

    var a43 = (t - u3) / (u4 - u3);
    var p = p32.multiply(1 - a43).add(p42.multiply(a43));

    return {p10: p10, p20: p20, p30: p30, p40: p40, p21: p21, p31: p31, p41: p41, p32: p32, p42: p42, p: p};
}

function evaluateBezier (t1, t2, t3, curve) {
    var k = 0;
    for (var l = 3; l < (curve.knots.length - 2); l++) {
        if (curve.knots[l].value >= t1) break;
        k++;
    }

    var u1 = curve.knots[k + 0].value;
    var u2 = curve.knots[k + 1].value;
    var u3 = curve.knots[k + 2].value;
    var u4 = curve.knots[k + 3].value;
    var u5 = curve.knots[k + 4].value;
    var u6 = curve.knots[k + 5].value;

    var p10 = curve.nodes[k + 0].getPoint();
    var p20 = curve.nodes[k + 1].getPoint();
    var p30 = curve.nodes[k + 2].getPoint();
    var p40 = curve.nodes[k + 3].getPoint();

    var a21 = (t1 - u1) / (u4 - u1);
    var a31 = (t1 - u2) / (u5 - u2);
    var a41 = (t1 - u3) / (u6 - u3);
    var p21 = p10.multiply(1 - a21).add(p20.multiply(a21));
    var p31 = p20.multiply(1 - a31).add(p30.multiply(a31));
    var p41 = p30.multiply(1 - a41).add(p40.multiply(a41));

    var a32 = (t2 - u2) / (u4 - u2);
    var a42 = (t2 - u3) / (u5 - u3);
    var p32 = p21.multiply(1 - a32).add(p31.multiply(a32));
    var p42 = p31.multiply(1 - a42).add(p41.multiply(a42));

    var a43 = (t3 - u3) / (u4 - u3);
    var p = p32.multiply(1 - a43).add(p42.multiply(a43));

    return p;
}