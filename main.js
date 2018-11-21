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
      selectedLabel: null
    }
    this.scale = 1;
    this.selectedShape = "";
    this.dropdownOpened = false;
    this.shapes = [];
    this.width = width;
    this.height = height;
    this.isDragging = false;
    this.observer = new Subject();
    this.clicks = 0;
  }

  init() {
    this._initScale();
    this._initClearButton();
    this._initDropdown();
    this._initCanvas();
  }

  _initCanvas() {
    this.bindedHtml.canvas = document.querySelector("#myCanvas");
    this.ctx = this.bindedHtml.canvas.getContext("2d");
    
    this.bindedHtml.canvas.addEventListener('dblclick', (e) => this._onSceneClick(e));
    this.bindedHtml.canvas.addEventListener('mousedown', (e) => this._onMouseDown(e));
    this.bindedHtml.canvas.addEventListener('mousemove', (e) => this._onMouseMove(e))
    this.bindedHtml.canvas.addEventListener('mouseup', (e) => this._onMouseUp(e));
  }

  _onSceneClick(e) {
    let { x, y } = this._getMousePosition(e);
    let shape = this._getShapeOnCoordinates(x, y);
    if (shape) {
      this.observer.select(shape);
      this._updateCanvas();
    }

  }

  _onMouseDown(e) {
    let { x, y } = this._getMousePosition(e);
    let selectedShape = this._getShapeOnCoordinates(x, y);
    if (selectedShape) {
      this.isDragging = true;
      this._deltaDragX = x - selectedShape.x;
      this._deltaDragY = y - selectedShape.y;
      this._currentShape = selectedShape;
      if (this.clicks === 2) {}
    } else {
      this._startDrawing(e);
    }
  }

  _onMouseMove(e) {
    if (!this._currentShape) return;
    if (this.isDragging) {
      this._changeLocation(e);
    } else {
      this._changeSize(e);
    }
  }

  _onMouseUp(e) {
    this._currentShape = null;
    this.isDragging = false;
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
    this._currentShape = new Shape(this.ctx, this.selectedShape);
    this.shapes.push(this._currentShape);
    this.observer.addObserver(this._currentShape);
  }

  _changeLocation(e) {
    if (!this.isDragging) return;
    let { x, y } = this._getMousePosition(e);
    this._currentShape.updateLocation(Math.abs(x - this._deltaDragX), Math.abs(y - this._deltaDragY));
    this._updateCanvas();
  }

  _changeSize(e) {
    let { x, y } = this._getMousePosition(e);
    let newWidth = Math.abs(x - this._startX)
    let newHeight = Math.abs(y - this._startY)
    this._currentShape.x = x > this._startX ?  this._startX : x;
    this._currentShape.y = y > this._startY ? this._startY : y;
    this._currentShape.updateDimentions(newWidth, newHeight);
    this._updateCanvas();
  }

  _initDropdown() {
    this.bindedHtml.dropdownLabel = document.querySelector("#header");
    this.bindedHtml.dropdown = document.querySelector("#vl-shape-list");
    this.bindedHtml.selectedLabel = document.querySelector("#vl-selected");
    
    this.bindedHtml.dropdownLabel.addEventListener('click', this._toggleDropdown.bind(this));
    const shapes = document.getElementsByClassName("shape");
    for (let i = 0; i < shapes.length; i++) {
      shapes[i].addEventListener('click', this._onSelectedShape.bind(this));
    }
  }

  _initClearButton() {
    this.bindedHtml.clearButton = document.querySelector("#clear");
    this.bindedHtml.clearButton.addEventListener('click', () => {
      this.shapes = [];
      this._clearCanvas();
    });
  }

  _onSelectedShape(e) {
    this.selectedShape = e.target.textContent.toLowerCase();
    this.bindedHtml.selectedLabel.innerHTML = this.selectedShape;
    this._toggleDropdown();
  }

  _initScale() {
    this.bindedHtml.scaleInput = document.querySelector("#scale");
    this.bindedHtml.scaleValue = document.querySelector("#vl-scale-label");
    this.bindedHtml.scaleInput.addEventListener("input", this._onScaleChange.bind(this));
  }

  _onScaleChange(e) {
    let currentScaleValue = e.target.value;
    this.scale = Number(currentScaleValue);
    this._updateTextOfScale();
    this._updateCanvas();
  }

  _updateCanvas() {
    this._clearCanvas();
    for (let i = 0; i < this.shapes.length; i++) {
      this.shapes[i].draw();
    };
  }

  _updateTextOfScale() {
    this.bindedHtml.scaleValue.innerHTML = this.scale;
  }

  _getMousePosition(event) {
    let rect = this.bindedHtml.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  _toggleDropdown() {
    if (this.dropdownOpened) {
      this.bindedHtml.dropdown.style.display = "none";
      this.dropdownOpened = false;
    } else {
      this.bindedHtml.dropdown.style.display = "block";
      this.dropdownOpened = true;
    }
  }

  _clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  }
}

const myScene = new Scene(1400, 600);
myScene.init();

