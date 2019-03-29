class Scene {
  constructor(width, height) {
    this.bindedHtml = {
      sceneCanvas: null,
    }
    this.scale = 1;
    this.selectedShape = "";
    this.dropdownOpened = false;
    this.shapes = [];
    this.width = width;
    this.height = height;
    this.highlightedShape = null;
    this.selectionManager = new SelectionManager();
    this.hoverManager = new HoverManager();
    this.flags = {
      drag: false,
      resize: false,
      draw: false,
    }
  }

  init() {
    this.bindedHtml.sceneCanvas = document.querySelector("#myCanvas");
    this.ctx = this.bindedHtml.sceneCanvas.getContext("2d");

    this.bindedHtml.sceneCanvas.addEventListener('mousedown', (e) => this._onMouseDown(e));
    this.bindedHtml.sceneCanvas.addEventListener('mousemove', (e) => this._onMouseMove(e))
    this.bindedHtml.sceneCanvas.addEventListener('mouseup', (e) => this._onMouseUp(e));
    this.bindedHtml.sceneCanvas.addEventListener('click', (e) => this._onClick(e));
  }

  _onMouseDown(e) {
    const { x, y } = this._getMousePosition(e);
    const selectedShape = this._getShapeOnCoordinates(x, y);
    if (selectedShape) {
      this._drag(selectedShape, x, y)
    } else {
      this.flags.draw = true;
      this._startDrawing(e);
    }
  }

  _getMousePosition(event) {
    const rect = this.bindedHtml.sceneCanvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  _getShapeOnCoordinates(x, y) {
    for (let i = 0; i < this.shapes.length; i++) {
      if (this.shapes[i].coordinatesInShapeBoundaries(x, y)) {
        return this.shapes[i];
      }
    };
  }

  _drag(selectedShape, x, y) {
    this.flags.drag = true;
    this.flags.draw = false;
    this._deltaDragX = x - selectedShape.cx;
    this._deltaDragY = y - selectedShape.cy;
    this._currentShape = selectedShape;
  }

  _startDrawing(e) {
    let { x, y } = this._getMousePosition(e);
    this._startX = x;
    this._startY = y;
    this._currentShape = new Shape(this.ctx, this.selectedShape);
    this._currentShape.x = x;
    this._currentShape.y = y;
  }

  _onMouseMove(e) {
    const { x, y } = this._getMousePosition(e);
    const selectedShape = this._getShapeOnCoordinates(x, y);
    if (this.flags.drag) {
      this._changeLocation(e);
    } else if (this.flags.draw && this._currentShape) {
      this._changeSize(e);
      this.flags.resize = true;
    } else if (selectedShape) {
      this._highlightShape(selectedShape);
      this.highlightedShape = selectedShape;
    } else if (!selectedShape) {
      this._removeHighlight();
      this.highlightedShape = null;
    }
    this.updateCanvas();
  }

  _changeLocation(e) {
    if (!this.flags.drag) return;
    const { x, y } = this._getMousePosition(e);
    this.shapes.find(shape => shape.id === this._currentShape.id)
      .updateLocation(Math.abs(x - this._deltaDragX), Math.abs(y - this._deltaDragY));
  }

  _changeSize(e) {
    const { x, y } = this._getMousePosition(e);
    this._currentShape.updateDimentions(x, y);
  }

  _highlightShape(shape) {
    if (this.highlightedShape && this.highlightedShape.id === shape.id) return;
    this.hoverManager.highlight(shape);
  }

  _removeHighlight() {
    if (!this.highlightedShape) return;
    this.hoverManager.unhighlightAll();
  }

  _onMouseUp() {
    if (this.flags.draw && this.flags.resize) {
      this.shapes.push(this._currentShape);
      this.selectionManager.addObserver(this._currentShape);
      this.hoverManager.addObserver(this._currentShape);
    }
    this._temporalDataReset()
    this._flagReset()
    this.updateCanvas();
  }

  _flagReset() {
    this.flags.drag = false;
    this.flags.resize = false;
    this.flags.draw = false;
  }

  _temporalDataReset() {
    this._currentShape = null;
    this._deltaDragX = null;
    this._deltaDragY = null;
  }

  _onClick(e) {
    const { x, y } = this._getMousePosition(e);
    const shape = this._getShapeOnCoordinates(x, y);
    if (shape) {
      this._selectShape(shape);
    } else {
      this._unselectAll();
    }
    this.updateCanvas();
  }

  _selectShape(shape) {
    if (!shape) return;
    this.selectionManager.select(shape);
  }

  _unselectAll() {
    this.shapes.forEach(shape => {
      shape.unselect();
    });
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
    if (this.flags.draw && this._currentShape) this._currentShape.draw();
  }

  _clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  }
}