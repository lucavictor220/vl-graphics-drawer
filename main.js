class Scene {
  constructor(width, height) {
    this.currentObject = "";
    this.objectScale = {};
    this.dropdownOpened = false;
    this.shapes = [];
    this.width = width;
    this.height = height;
  }

  init() {
    const scaleInput = document.querySelector("#scale");
    this.objectScale.htmlElement = document.querySelector("#scale-v");
    this.dropdownHeader = document.querySelector("#header");
    this.dropdownObjects = document.querySelector("#vl-objects");
    this.selectedLabel = document.querySelector("#vl-selected");
    this.clearButton = document.querySelector("#clear");
    this.canvas = document.querySelector("#myCanvas");
    this.ctx = this.canvas.getContext("2d");
    const objects = document.getElementsByClassName("object");


    for (let i = 0; i < objects.length; i++) {
      objects[i].addEventListener('click', (e) => {
        this.currentObject = e.target.textContent;
        this.selectedLabel.innerHTML = this.currentObject;
        this._toggleDropdown();
      });
    }
    this.dropdownHeader.addEventListener('click', (e) => {
      this._toggleDropdown();
    });

    this.canvas.addEventListener('click', e => {
      let { x, y } = this._getMousePosition(e);
      let shapeName = this.currentObject;
      let shape = new Shape(this.ctx, shapeName);
      this.shapes.push(shape);
      shape.draw(x, y);
    });

    this.objectScale.htmlElement.innerHTML = scaleInput.value;
    scaleInput.addEventListener("input", (e) => {
      this.objectScale.htmlElement.innerHTML = e.target.value;
      this.objectScale.value = e.target.value;
      this._clearCanvas();
      for (let i = 0; i < this.shapes.length-1; i++) {
        this.shapes[i].draw();
      };
      let factor = 1 + Number(this.objectScale.value) / 20;
      this.shapes[this.shapes.length-1].scale(factor);
      this.shapes[this.shapes.length-1].draw();
      debugger
    });

    this.clearButton.addEventListener('click', e => {
      this._clearCanvas();
    });
  }

  _getMousePosition(event) {
    let rect = this.canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }

  _toggleDropdown() {
    if (this.dropdownOpened) {
      this.dropdownObjects.style.display = "none";
      this.dropdownOpened = false;
    } else {
      this.dropdownObjects.style.display = "block";
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

