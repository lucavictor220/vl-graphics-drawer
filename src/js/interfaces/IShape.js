class IShape {
  constructor() { }

  updateLocation() {
    throw new Error('Not implimented updateLocation method');
  }

  updateDimentions() {
    throw new Error('Not implimented updateDimentions method');
  }

  select() {
    throw new Error('Not implimented select method');
  }

  highlight() {
    throw new Error('Not implimented highlight method');
  }

  drawResizeBorder() {
    throw new Error('Not implimented drawResizeBorder method');
  }

  coordinatesIsInShapeBounderies() {
    throw new Error('Not implimented coordinatesIsInShapeBounderies method');
  }

  draw() {
    throw new Error('Not implimented draw method');
  }
}

export default IShape;