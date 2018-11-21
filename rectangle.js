class Rectangle {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width || 10;
    this.height = height || 10;
    this.scaleFactor = 1;
    this.selected = false;
  }

  scale(factor) {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(newX, newY, this.width * factor, this.height * factor);
  }

  updateDimentions(width, height) {
    this.width = width;
    this.height = height;
  }

  select() {
    this.ctx.lineWidth=2;
    this.ctx.strokeStyle="blue";
    this.ctx.stroke();
  }

  draw(x, y, width, height) {
    this.x = x || this.x;
    this.y = y || this.y;
    this.width = width || this.width;
    this.height = height || this.height;
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
    this.ctx.closePath();
    if (this.selected) {
      this.select();
    }
  }
}