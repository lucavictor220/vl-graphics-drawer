class Scene {
  constructor(width, height) {
    this.bindedHtml = {
      scaleInput: null,
      scaleValue: null,
      dropdown: null,
      dropdownLabel: null,
      currentShapeText: null,
      clearButton: null,
      sceneCanvas: null,
    }
    this.scale = 1;
    this.selectedShape = "";
    this.dropdownOpened = false;
    this.shapes = [];
    this.width = width;
    this.height = height;
    this.isDragging = false;
    this.observer = new Subject();
  }

  init() {
    this.bindedHtml.sceneCanvas = document.querySelector("#myCanvas");
    this.ctx = this.bindedHtml.sceneCanvas.getContext("2d");
    
    this.bindedHtml.sceneCanvas.addEventListener('dblclick', (e) => this._onDoubleClick(e));
    this.bindedHtml.sceneCanvas.addEventListener('mousedown', (e) => this._onMouseDown(e));
    this.bindedHtml.sceneCanvas.addEventListener('mousemove', (e) => this._onMouseMove(e))
    this.bindedHtml.sceneCanvas.addEventListener('mouseup', (e) => this._onMouseUp(e));
  }

  _onDoubleClick(e) {
    let { x, y } = this._getMousePosition(e);
    let shape = this._getShapeOnCoordinates(x, y);
    this._selectShape(shape);
  }

  _selectShape(shape) {
    if (!shape) return;
    this.observer.select(shape);
    this.updateCanvas();
  }

  _onMouseDown(e) {
    let { x, y } = this._getMousePosition(e);
    let selectedShape = this._getShapeOnCoordinates(x, y);
    if (selectedShape) {
      this.isDragging = true;
      this._deltaDragX = x - selectedShape.cx;
      this._deltaDragY = y - selectedShape.cy;
      this._currentShape = selectedShape;
    } else {
      this._startDrawing(e);
    }
  }

  _onMouseMove(e) {
    if (this.isDragging) {
      this._changeLocation(e);
    } else if (this.resize) {
      this._changeSize(e);
    }
  }

  _onMouseUp(e) {
    let { x, y } = this._getMousePosition(e);
    if (Math.abs(this._startX - x) < 3 && Math.abs(this._startY - y) < 3) {
      this.shapes.pop();
      this.updateCanvas();
    }
    this._currentShape = null;
    this.isDragging = false;
    this.resize = false;
    this._deltaDragX = null;
    this._deltaDragY = null;
  }

  _getShapeOnCoordinates(x, y) {
    for (let i = 0; i < this.shapes.length; i++) {
      if (this.shapes[i].coordinatesInShapeBoundaries(x, y)) {
        return this.shapes[i];
      }
    };
  }

  _startDrawing(e) {
    let { x, y } = this._getMousePosition(e);
    this._startX = x;
    this._startY = y;
    let newShape = new Shape(this.ctx, this.selectedShape);
    newShape.x = x;
    newShape.y = y;
    this.shapes.push(newShape);
    this.observer.addObserver(newShape);
    this.resize = true;
  }

  _changeLocation(e) {
    if (!this.isDragging) return;
    let { x, y } = this._getMousePosition(e);
    this.shapes.find(shape => shape.id === this._currentShape.id).updateLocation(Math.abs(x - this._deltaDragX), Math.abs(y - this._deltaDragY));
    this.updateCanvas();
  }

  _changeSize(e) {
    let { x, y } = this._getMousePosition(e);
    this.shapes[this.shapes.length-1].updateDimentions(x, y);
    this.updateCanvas();
  }

  clear() {
    this.shapes = [];
    this._clearCanvas();
  }

  updateCanvas() {
    this._clearCanvas();
    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].draw();
    };
  }

  _getMousePosition(event) {
    let rect = this.bindedHtml.sceneCanvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  _clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  }
}