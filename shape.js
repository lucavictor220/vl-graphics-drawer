class Shape {
  constructor(ctx, shape) {
    this.name = shape;
    this.ctx = ctx;
    this.shape = this._createShape();
  }

  _createShape() {
    switch(this.name) {
      case "Rectangle":
        return new Rectangle(this.ctx);
      case "Circle":
        return new Circle(this.ctx);
      default:
        return new Rectangle(this.ctx);
    }
  }

  scale(factor) {
    this.shape.scale(factor);
  }

  draw(x, y) {
    this.shape.draw(x, y);
  }
}