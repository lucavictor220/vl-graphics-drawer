class HoverManager {
  constructor() {
    this.observers = [];
    this.highlightedShape = {};
  }

  highlight(shape) {
    this.highlightedShape = shape;
    console.log('Highlight shape with id: ' + shape.id);

    this.notifyObservers();
  }

  unhighlightAll() {
    console.log('Unhighlight All');
    this.observers.forEach(observer => observer.shape.highlighted = false);
  }

  addObserver(object) {
    this.observers.push(object);
    console.log('Added new observer with id: ' + object.id);
  }

  notifyObservers() {
    console.log('Notify Highlight');
    for (let observer of this.observers) {
      observer.highlight(this);
    }
  }
}

export default HoverManager;