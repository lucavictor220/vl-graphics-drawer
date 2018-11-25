class Circle {
  constructor(ctx) {
    this.ctx = ctx;
    this.scaleFactor = 1;
    this.selected = false;
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