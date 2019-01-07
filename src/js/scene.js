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
    this.highlightedShape = null;
    this.selectionManager = new SelectionManager();
    this.hoverManager = new HoverManager();
  }

  init() {
    this.bindedHtml.sceneCanvas = document.querySelector("#myCanvas");
    this.ctx = this.bindedHtml.sceneCanvas.getContext("2d");
    
    this.bindedHtml.sceneCanvas.addEventListener('mousedown', (e) => this._onMouseDown(e));
    this.bindedHtml.sceneCanvas.addEventListener('mousemove', (e) => this._onMouseMove(e))
    this.bindedHtml.sceneCanvas.addEventListener('mouseup', (e) => this._onMouseUp(e));
    this.bindedHtml.sceneCanvas.addEventListener('click', (e) => this._onClick(e));
  }

  _onClick(e) {
    let { x, y } = this._getMousePosition(e);
    let shape = this._getShapeOnCoordinates(x, y);
    if (shape) {
      this._selectShape(shape);
    } else {
      this._unselectAll();
    }
  }

  _selectShape(shape) {
    if (!shape) return;
    this.selectionManager.select(shape);
    this.updateCanvas();
  }

  _unselectAll() {
    
  }

  _highlightShape(shape) {
    if (this.highlightedShape && this.highlightedShape.id === shape.id) return;
    this.hoverManager.highlight(shape);
    this.updateCanvas();
  }

  _removeHighlight() {
    if (!this.highlightedShape) return;
    this.hoverManager.unhighlightAll();
    this.updateCanvas();
  }

  _onMouseDown(e) {
    let { x, y } = this._getMousePosition(e);
    let selectedShape = this._getShapeOnCoordinates(x, y);
    if (selectedShape) {
      this.isDragging = true;
      this.drawing = false;
      this._deltaDragX = x - selectedShape.cx;
      this._deltaDragY = y - selectedShape.cy;
      this._currentShape = selectedShape;
    } else {
      this.drawing = true;
      this._startDrawing(e);
    }
  }

  _onMouseMove(e) {
    let { x, y } = this._getMousePosition(e);
    let selectedShape = this._getShapeOnCoordinates(x, y);
    if (this.isDragging) {
      this._changeLocation(e);
    } else if (this.drawing && this._currentShape) {
      this._changeSize(e);
      this.resize = true;
    } else if (selectedShape) {
      this._highlightShape(selectedShape);
      this.highlightedShape = selectedShape;
    } else if (!selectedShape) {
      this._removeHighlight();
      this.highlightedShape = null;
    }
  }

  _onMouseUp(e) {
    if (this.drawing && this.resize) {
      this.shapes.push(this._currentShape);
      this.selectionManager.addObserver(this._currentShape);
      this.hoverManager.addObserver(this._currentShape);
    }
    this._currentShape = null;
    this.isDragging = false;
    this._deltaDragX = null;
    this._deltaDragY = null;
    this.resize = false;
    this.drawing = false;
    this.updateCanvas();
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
    this._currentShape = new Shape(this.ctx, this.selectedShape);
    this._currentShape.x = x;
    this._currentShape.y = y;
  }

  _changeLocation(e) {
    if (!this.isDragging) return;
    let { x, y } = this._getMousePosition(e);
    this.shapes.find(shape => shape.id === this._currentShape.id)
      .updateLocation(Math.abs(x - this._deltaDragX), Math.abs(y - this._deltaDragY));
    this.updateCanvas();
  }

  _changeSize(e) {
    let { x, y } = this._getMousePosition(e);
    this._currentShape.updateDimentions(x, y);
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
    if (this.drawing && this._currentShape) this._currentShape.draw();
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