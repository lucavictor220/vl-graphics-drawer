class Circle {
  constructor(ctx, r) {
    this.ctx = ctx;
    this.scaleFactor = 1;
    this.radius = r || 10;
  }

  scale(factor) {
    this.ctx.beginPath();
    this.ctx.arc(newX, newY, radius * factor, 0, 2 * Math.PI);
    this.ctx.fillStyle = "green";
    this.ctx.fill();
  }

  updateDimentions(r) {
    this.radius = r;
  }

  draw(x, y, radius) {
    this.x = x || this.x;
    this.y = y || this.y;
    this.radius = radius || this.radius;
    if (this.radius < 1) return;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = "green";
    this.ctx.fill();
  }
}