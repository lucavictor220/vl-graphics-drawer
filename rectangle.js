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
    this.width = x - this.x;
    this.height = y - this.y;
  }

  select() {
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = "blue";
    this.ctx.stroke();
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
    this.ctx.closePath();
  }
}