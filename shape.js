class Shape extends Observer {
  constructor(ctx, shape) {
    super();
    this.name = shape;
    this.ctx = ctx;
    this.shape = this._createShape();
    this.id = +Date.now();
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

  isCircle() {
    return this.name === 'circle';
  }

  isRect() {
    return this.name === 'rectangle';
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
  
  update(model) {
    this.shape.selected = this.id === model.selectedShape.id;
  }

  scale(factor) {
    this.shape.scale(factor);
  }

  coordinatesInShapeBoundaries(x, y) {
    switch(this.name) {
      case "rectangle":
        if (this.shape.x <= x && x <= this.shape.x + this.shape.width && this.shape.y <= y && y <= this.shape.y + this.shape.height) {
          return true;
        }
        return false;
      case "circle":
        if (Math.pow((x - this.shape.cx), 2) / Math.pow(this.shape.radiusX, 2) + Math.pow((y - this.shape.cy), 2) / Math.pow(this.shape.radiusY, 2) <= 1) {
          return true;
        }
      return false;
      default:
        if (this.shape.x <= x && x <= this.shape.x + this.shape.width && this.shape.y <= y && y <= this.shape.y + this.shape.height) {
          return true;
        }
        return false;
        
    }
  }

  updateDimentions(x, y) {
    this.shape.updateDimentions(x, y);
  }

  updateLocation(x, y) {
    this.shape.x = x;
    this.shape.y = y;
  }

  draw(x, y, width, height) {
    this.shape.draw(x, y, width, height);
  }
}