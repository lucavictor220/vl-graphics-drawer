class Line extends CoordinatesInBounderies {
  constructor(ctx) {
    super();
    this.ctx = ctx;
    this.scaleFactor = 1;
    this.selected = false;
    this.thickness = 1;
    this.highlighted = false;
  }

  updateLocation(x, y) {
    this.cx = x;
    this.cy = y;
    let deltaX = (this.x1 - this.x)/2;
    let deltaY = (this.y1 - this.y)/2;
    this.x = this.cx - deltaX;
    this.y = this.cy - deltaY;
    this.x1 = this.cx + deltaX;
    this.y1 = this.cy + deltaY;
  }

  updateDimentions(x1, y1) {
    this.x1 = x1;
    this.y1 = y1;
    this.cx = this.x + (this.x1 - this.x)/2;
    this.cy = this.y + (this.y1 - this.y)/2;
  }

  select() {
    this.ctx.lineWidth = this.thickness;
    this.ctx.strokeStyle = "blue";
    this.ctx.stroke();
  }

  highlight() {
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "#3681f9";
    this.ctx.stroke();
  }

  coordinatesIsInShapeBounderies(x, y) {
    return isInsideLine(this.x, this.y, this.x1, this.y1, x, y);
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
    if (!this.selected && this.highlighted) {
      this.highlight();
    }
  }
}