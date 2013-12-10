var Point = function(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.multiply = function (skalar) {
    return new Point (this.x * skalar,
                      this.y * skalar);
}

Point.prototype.add = function (p) {
    return new Point (this.x + p.x,
                      this.y + p.y);
}