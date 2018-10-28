class Circle {
  constructor(ctx) {
    this.ctx = ctx;
    this.scaleFactor = 1;
  }

  scale(factor) {
    this.scaleFactor = factor;
  }

  draw(x, y) {
    let newX = x || this.x;
    let newY = y || this.y;
    this.x = newX;
    this.y = newY;
    this.ctx.beginPath();
    this.ctx.arc(newX, newY, 50 * this.scaleFactor, 0, 2 * Math.PI);
    this.ctx.fillStyle = "green";
    this.ctx.fill();
  }
  

}