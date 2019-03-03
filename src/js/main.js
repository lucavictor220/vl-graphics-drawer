let sceneContainer = document.querySelector('#scene');
const clearButton = document.querySelector('#clear');
const dropdownHeader = document.querySelector("#header");
const dropdownList = document.querySelector("#vl-shape-list");
const canvas = document.querySelector('#myCanvas');

canvas.width = sceneContainer.offsetWidth;
canvas.height = sceneContainer.offsetHeight;
const myScene = new Scene(sceneContainer.offsetWidth, sceneContainer.offsetHeight);

myScene.init();

let dropdownOpened = false;

const clear = () => {
  myScene.clear();
}

const resize = () => {
  canvas.width = sceneContainer.offsetWidth;
  canvas.height = sceneContainer.offsetHeight;;
  myScene.updateCanvas();
}

const addSelectionEventToDropdown = () => {
  const shapesList = document.getElementsByClassName("shape");
  for (let i = 0; i < shapesList.length; i++) {
    shapesList[i].addEventListener('click', selectShape);
  }
}

const selectShape = (e) => {
  myScene.selectedShape = e.target.innerText.toLowerCase();
  toggleDropdown();
}

const toggleDropdown = () => {
  if (dropdownOpened) openDropdown() 
  else closeDropdown()
}

const openDropdown = () => {
  dropdownList.style.display = "none";
  dropdownOpened = false;
}

const closeDropdown = () => {
  dropdownList.style.display = "block";
  dropdownOpened = true;
}

window.addEventListener('resize', resize);
clearButton.addEventListener('click', clear);
dropdownHeader.addEventListener('click', toggleDropdown);
addSelectionEventToDropdown();


