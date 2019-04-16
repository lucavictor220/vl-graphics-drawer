import IShape from '../interfaces/IShape.js';

class Rectangle extends IShape {
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
    this.width = Math.abs(x - this.x);
    this.height = Math.abs(y - this.y);
    this.cx = (x - this.x) < 0 ? this.x - this.width / 2 : this.x + this.width / 2;
    this.cy = (y - this.y) < 0 ? this.y - this.height / 2 : this.y + this.height / 2;
  }

  coordinatesIsInShapeBounderies(x, y) {
    return (this.cx - this.width / 2 <= x && this.cx + this.width / 2 >= x &&
      this.cy - this.height / 2 <= y && this.cy + this.height / 2 >= y);
  }

  select() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "#3681f9";
    this.ctx.rect(this.cx - this.width / 2, this.cy - this.height / 2, this.width, this.height);
    this.ctx.stroke();
  }

  highlight() {
    this.ctx.beginPath();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "#3681f9";
    this.ctx.rect(this.cx - this.width / 2, this.cy - this.height / 2, this.width, this.height);
    this.ctx.stroke();
  }

  drawResizeBorder() {
    this.drawResizeRect(this.cx - this.width / 2, this.cy - this.height / 2);
    this.drawResizeRect(this.cx + this.width / 2, this.cy - this.height / 2);
    this.drawResizeRect(this.cx + this.width / 2, this.cy + this.height / 2);
    this.drawResizeRect(this.cx - this.width / 2, this.cy + this.height / 2);
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
    this.ctx.beginPath();
    let x = this.cx - this.width / 2;
    let y = this.cy - this.height / 2;
    this.ctx.rect(x, y, this.width, this.height);
    this.ctx.fillStyle = 'red';
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

export default Rectangle;