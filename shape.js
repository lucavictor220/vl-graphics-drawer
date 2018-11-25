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

  set cx(cx) {
    this.shape.cx = cx;
  }

  set cy(cy) {
    this.shape.cy = cy;
  }

  get x() {
    return this.shape.x;
  }

  get y() {
    return this.shape.y;
  }

  get cx() {
    return this.shape.cx;
  }

  get cy() {
    return this.shape.cy;
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
      case "line":
        return new Line(this.ctx);
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
        return (this.shape.cx - this.shape.width/2 <= x && this.shape.cx + this.shape.width/2 >= x && 
            this.shape.cy - this.shape.height/2 <= y && this.shape.cy + this.shape.height/2 >= y)
      case "circle":
        return (Math.pow((x - this.shape.cx), 2) / Math.pow(this.shape.radiusX, 2) +
            Math.pow((y - this.shape.cy), 2) / Math.pow(this.shape.radiusY, 2) <= 1)
      case "line":
        return isInsideLine(this.shape.x, this.shape.y, this.shape.x1, this.shape.y1, x, y)
      default:
        return (this.shape.cx - this.shape.width/2 <= x && this.shape.cx + this.shape.width/2 >= x && 
          this.shape.cy - this.shape.height/2 <= y && this.shape.cy + this.shape.height/2 >= y)
        
    }
  }

  updateDimentions(x, y) {
    this.shape.updateDimentions(x, y);
  }

  updateLocation(x, y) {
    this.shape.cx = x;
    this.shape.cy = y;
  }

  draw(x, y, width, height) {
    this.shape.draw(x, y, width, height);
  }
}