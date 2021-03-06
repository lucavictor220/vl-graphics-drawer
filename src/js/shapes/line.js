import IShape from '../interfaces/IShape.js';
import { isInsideLine } from '../utils.js'

class Line extends IShape {
  constructor(ctx) {
    super();
    this.ctx = ctx;
    this.scaleFactor = 1;
    this.selected = false;
    this.highlighted = false;
    this.thickness = 1;
  }

  updateLocation(x, y) {
    this.cx = x;
    this.cy = y;
    let deltaX = (this.x1 - this.x) / 2;
    let deltaY = (this.y1 - this.y) / 2;
    this.x = this.cx - deltaX;
    this.y = this.cy - deltaY;
    this.x1 = this.cx + deltaX;
    this.y1 = this.cy + deltaY;
  }

  updateDimentions(x1, y1) {
    this.x1 = x1;
    this.y1 = y1;
    this.cx = this.x + (this.x1 - this.x) / 2;
    this.cy = this.y + (this.y1 - this.y) / 2;
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

  drawResizeBorder() {
    this.drawResizeRect(this.x, this.y);
    this.drawResizeRect(this.x1, this.y1);
  }

  drawResizeRect(x, y) {
    this.ctx.beginPath();
    this.ctx.lineWidth = 1;
    this.ctx.rect(x - 3, y - 3, 6, 6);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
    this.ctx.strokeStyle = "#639fff";
    this.ctx.stroke();
  }

  draw() {
    this.ctx.beginPath()
    this.ctx.lineWidth = this.thickness;
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x1, this.y1);
    this.ctx.strokeStyle = "green";
    this.ctx.stroke();
    if (this.selected) {
      this.select();
      this.drawResizeBorder();
    }
    if (!this.selected && this.highlighted) {
      this.highlight();
    }
  }
}

export default Line;