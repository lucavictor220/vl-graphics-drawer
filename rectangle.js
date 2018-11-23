class Rectangle {
  constructor(ctx) {
    this.ctx = ctx;
    this.scaleFactor = 1;
    this.selected = false;
  }

  scale(factor) {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(newX, newY, this.width * factor, this.height * factor);
  }

  updateDimentions(x, y) {
    this.width = Math.abs(x - this.x);
    this.height = Math.abs(y - this.y);
    this.cx = (x - this.x) < 0 ? this.x - this.width/2 : this.x + this.width/2;
    this.cy = (y - this.y) < 0 ? this.y - this.height/2 : this.y + this.height/2;
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
  }
}