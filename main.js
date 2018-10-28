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
    
    this.bindedHtml.canvas.addEventListener('click', (e) => this._onSceneClick(e));
  }

  _onSceneClick(e) {
    let { x, y } = this._getMousePosition(e);
    if (!this.selectedShape) return;
    let shape = new Shape(this.ctx, this.selectedShape);
    this.shapes.push(shape);
    shape.draw(x, y);
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
    for (let i = 0; i < this.shapes.length-1; i++) {
      this.shapes[i].draw();
    };
    let factor = 1 + this.scale / 20;
    this.shapes[this.shapes.length-1].scale(factor);
    this.shapes[this.shapes.length-1].draw();
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

