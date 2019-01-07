class Shape extends ShapeObserver {
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

  set highlighted(value) {
    this.shape.highlighted = value;
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

  isSelected() {
    return this.shape.selected;
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
  
  select(model) {
    this.shape.selected = this.id === model.selectedShape.id;
  }

  highlight(model) {
    this.shape.highlighted = this.id === model.highlightedShape.id;
  }

  coordinatesInShapeBoundaries(x, y) {
    return this.shape.coordinatesIsInShapeBounderies(x, y);
  }

  updateDimentions(x, y) {
    this.shape.updateDimentions(x, y);
  }

  updateLocation(x, y) {
    this.shape.updateLocation(x, y);
  }

  draw(x, y, width, height) {
    this.shape.draw(x, y, width, height);
  }
}