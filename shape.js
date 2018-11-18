class Shape {
  constructor(ctx, shape) {
    this.name = shape;
    this.ctx = ctx;
    this.shape = this._createShape();
  }

  set x(x) {
    this.shape.x = x;
  }

  set y(y) {
    this.shape.y = y;
  }

  get x() {
    return this.shape.x;
  }

  get y() {
    return this.shape.y;
  }

  _createShape() {
    switch(this.name) {
      case "rectangle":
        return new Rectangle(this.ctx);
      case "circle":
        return new Circle(this.ctx);
      default:
        return new Rectangle(this.ctx);
    }
  }

  scale(factor) {
    this.shape.scale(factor);
  }

  coordinatesInShapeBoundaries(x, y) {
    switch(this.name) {
      case "rectangle":
        if (this.shape.x < x && x < this.shape.x + this.shape.width && this.shape.y < y && y < this.shape.y + this.shape.height) {
          return true;
        }
        return false;
      case "circle":
        if (this.shape.x < x && x < this.shape.x + this.shape.radius && this.shape.y < y && y < this.shape.y + this.shape.radius) {
          return true;
        }
      return false;
      default:
        if (this.shape.x < x && x < this.shape.x + this.shape.width && this.shape.y < y && y < this.shape.y + this.shape.height) {
          return true;
        }
        return false;
        
    }
  }

  updateDimentions(x, y) {
    if (arguments.length === 1) {
      this.shape.updateDimentions(x);
    } else if (arguments.length === 2) {
      this.shape.updateDimentions(x, y)
    }
  }

  updateLocation(x, y) {
    this.shape.x = x;
    this.shape.y = y;
  }

  draw(x, y, width, height) {
    this.shape.draw(x, y, width, height);
  }
}