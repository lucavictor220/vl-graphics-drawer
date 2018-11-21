class Subject {
  constructor() {
    this.observers = [];
    this.selectedShape = {};
  }

  select(shape) {
    this.selectedShape = shape;
    console.log('Select shape with id: ' + shape.id);

    this.notifyObservers();
  }

  addObserver(object) {
    this.observers.push(object);
    debugger
    console.log('Added new observer with id: ' + object.id);
  }

  notifyObservers() {
    console.log('Notify');
    for (let observer of this.observers) {
      observer.update(this);
    }
  }
}