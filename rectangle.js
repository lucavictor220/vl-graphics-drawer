class Rectangle {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width || 150;
    this.heigth = height || 100;
    this.scaleFactor = 1;
  }

  scale(factor) {
    this.scaleFactor = factor
  }

  draw(x, y) {
    let newX = x || this.x;
    let newY = y || this.y;
    this.x = newX;
    this.y = newY;
    this.ctx.beginPath();
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(newX, newY, this.width * this.scaleFactor, this.heigth * this.scaleFactor);
  }
}