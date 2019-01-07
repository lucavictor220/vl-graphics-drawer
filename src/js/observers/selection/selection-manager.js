class SelectionManager {
  constructor() {
    this.observers = [];
    this.selectedShape = {};
  }

  select(shape) {
    this.selectedShape = shape;
    console.log('Select shape with id: ' + shape.id);

    this.notifyObservers();
  }

  unselectAll() {
    console.log('UnselectAll shapes')
    this.observers.forEach(observer => observer.shape.selected = false);
  }

  addObserver(object) {
    this.observers.push(object);
    console.log('Added new observer with id: ' + object.id);
  }

  notifyObservers() {
    console.log('Notify Selection');
    for (let observer of this.observers) {
      observer.select(this);
    }
  }
}