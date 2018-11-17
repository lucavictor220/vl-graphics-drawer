class Rectangle {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width || 10;
    this.height = height || 10;
    this.scaleFactor = 1;
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

  draw(x, y, width, height) {
    this.x = x || this.x;
    this.y = y || this.y;
    this.width = width || this.width;
    this.height = height || this.height;
    this.ctx.beginPath();
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}