class Rectangle extends CoordinatesInBounderies {
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
    this.width = Math.abs(x - this.x);
    this.height = Math.abs(y - this.y);
    this.cx = (x - this.x) < 0 ? this.x - this.width/2 : this.x + this.width/2;
    this.cy = (y - this.y) < 0 ? this.y - this.height/2 : this.y + this.height/2;
  }

  coordinatesIsInShapeBounderies(x, y) {
    return (this.cx - this.width/2 <= x && this.cx + this.width/2 >= x && 
      this.cy - this.height/2 <= y && this.cy + this.height/2 >= y);
  }

  select() {
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "blue";
    this.ctx.stroke();
  }

  draw() {
    this.ctx.beginPath();
    let x = this.cx - this.width/2;
    let y = this.cy - this.height/2;
    this.ctx.rect(x, y, this.width, this.height);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
    this.ctx.closePath();
    if (this.selected) {
      this.select();
    }
  }
}