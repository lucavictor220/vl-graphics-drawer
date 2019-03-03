class Circle extends CoordinatesInBounderies {
  constructor(ctx) {
    super();
    this.ctx = ctx;
    this.scaleFactor = 1;
    this.selected = false;
    this.highlighted = false;
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
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "#3681f9";
    this.ctx.rect(this.cx-this.radiusX, this.cy-this.radiusY, 2*this.radiusX, 2*this.radiusY);
    this.ctx.stroke();
  }

  highlight() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "#3681f9";
    this.ctx.rect(this.cx-this.radiusX, this.cy-this.radiusY, 2*this.radiusX, 2*this.radiusY);
    this.ctx.stroke();
  }

  drawResizeBorder() {
    this.drawResizeRect(this.cx-this.radiusX, this.cy-this.radiusY);
    this.drawResizeRect(this.cx-this.radiusX+2*this.radiusX, this.cy-this.radiusY);
    this.drawResizeRect(this.cx-this.radiusX+2*this.radiusX, this.cy-this.radiusY+2*this.radiusY);
    this.drawResizeRect(this.cx-this.radiusX, this.cy-this.radiusY+2*this.radiusY);
  }

  drawResizeRect(x, y) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.rect(x-3, y-3, 6, 6);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.strokeStyle = "#639fff";
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
      this.drawResizeBorder();
    }
    if (!this.selected && this.highlighted) {
      this.highlight();
    }
  }
}