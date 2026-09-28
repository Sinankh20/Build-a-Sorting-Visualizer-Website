function generateElement() {
  return Math.floor(Math.random() * 100) + 1;
}

function generateArray() {
  const arr = [];
  while (arr.length <= 4) {
    arr.push(generateElement());
  }
  return arr;
}

function generateContainer() {
  return document.createElement("div");
}

function fillArrContainer(element, arr) {
  let inner = "";
  arr.forEach(num => {
    inner += `<span>${num}</span>`;
  });
  element.innerHTML = inner;
}

function isOrdered(first, second) {
  return first <= second;
}

function swapElements(arr, index) {
  if (index >= arr.length - 1) {
    return arr;
  }
  if (!isOrdered(arr[index], arr[index + 1])) {
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
  }
  return arr;
}

function highlightCurrentEls(element, index) {
  const descendants = element.querySelectorAll('span');
  if (descendants[index] && descendants[index + 1]) {
    descendants[index].style.border = '2px dashed red';
    descendants[index + 1].style.border = '2px dashed red';
  }
}

const generateBtn = document.getElementById("generate-btn");
const arrContainer = document.getElementById("array-container");
const sortBtn = document.getElementById("sort-btn");

let currentArray = [];

generateBtn.addEventListener("click", () => {
  arrContainer.innerHTML = "";
  const startingArray = generateContainer();
  startingArray.id = "starting-array";
  
  currentArray = generateArray();
  fillArrContainer(startingArray, currentArray);
  arrContainer.appendChild(startingArray);
});

sortBtn.addEventListener("click", () => {
  const startingArray = document.getElementById("starting-array");
  if (!startingArray) return;
  sortBtn.disabled = true;

  const arr = [...currentArray];
  let isFirstStep = true;

  for (let i = 0; i < arr.length - 1; i++) {
    let swapped = false;

    for (let j = 0; j < arr.length - 1; j++) {
      // the first comparison is shown in the starting box itself
      let stepDiv = startingArray;
      if (!isFirstStep) {
        stepDiv = generateContainer();
        fillArrContainer(stepDiv, arr);
        arrContainer.appendChild(stepDiv);
      }
      isFirstStep = false;

      highlightCurrentEls(stepDiv, j);

      if (!isOrdered(arr[j], arr[j + 1])) {
        swapped = true;
      }
      swapElements(arr, j);
    }

    if (!swapped) break; // a full pass with no swaps means it's sorted
  }

  const finalDiv = generateContainer();
  finalDiv.id = "final-array";
  fillArrContainer(finalDiv, arr);
  arrContainer.appendChild(finalDiv);
  document.getElementById("final-array").style.border=("4px solid green")
});