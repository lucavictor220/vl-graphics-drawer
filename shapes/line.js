class Line {
  constructor(ctx) {
    this.ctx = ctx;
    this.scaleFactor = 1;
    this.selected = false;
    this.thickness = 2;
  }

  updateDimentions(x1, y1) {
    this.x1 = x1;
    this.y1 = y1;
  }

  select() {
    this.ctx.lineWidth = this.thickness;
    this.ctx.strokeStyle = "blue";
    this.ctx.stroke();
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.lineWidth = this.thickness;
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x1, this.y1);
    this.ctx.strokeStyle = "green";
    this.ctx.stroke();
    this.ctx.closePath();
    if (this.selected) {
      this.select();
    }
  }
}