class Circle extends CoordinatesInBounderies {
  constructor(ctx) {
    super();
    this.ctx = ctx;
    this.scaleFactor = 1;
    this.selected = false;
  }

  updateLocation(x, y) {
    this.cx = x;
    this.cy = y;
  }

  updateDimentions(x, y) {
    this.radiusX = Math.abs(x - this.x) / 2;
    this.radiusY = Math.abs(y - this.y) / 2;
    this.cx = (x - this.x) < 0 ? this.x - this.radiusX : this.x + this.radiusX;
    this.cy = (y - this.y) < 0 ? this.y - this.radiusY : this.y + this.radiusY;
  }

  select() {
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "blue";
    this.ctx.stroke();
  }

  coordinatesIsInShapeBounderies(x, y) {
    return (Math.pow((x - this.cx), 2) / Math.pow(this.radiusX, 2) +
        Math.pow((y - this.cy), 2) / Math.pow(this.radiusY, 2) <= 1);
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.ellipse(this.cx, this.cy, this.radiusX, this.radiusY, 0, 0, 2 * Math.PI);
    this.ctx.fillStyle = "green";
    this.ctx.fill();
    this.ctx.closePath();
    if (this.selected) {
      this.select();
    }
  }
}