import "./styles.css";

import { makeShip } from "./ship";

const coords = [
  [3, 1],
  [2, 1],
  [1, 1],
];

const coordSet = new Set();

coords.forEach((coord) => {
  if (coordSet.has(coord.join("")))
    throw new Error("Duplicates inside coordinates");
  else {
    coordSet.add(coord.join(""));
  }
});

let isHorizontal = null;
let isVertical = null;
coords.sort((a, b) => a[1] - b[1]);
isHorizontal = coords.every((coord) => coord[0] === coords[0][0]);
if (!isHorizontal) {
  coords.sort((a, b) => a[0] - b[0]);
  isVertical = coords.every((coord) => coord[1] === coords[0][1]);
}
for (let i = 1; i < coords.length; i++) {
  if (isHorizontal && coords[i][1] !== coords[i - 1][1] + 1) {
    isHorizontal = false;
    break;
  }
  if (isVertical && coords[i][0] !== coords[i - 1][0] + 1) {
    isVertical = false;
    break;
  }
}

// for (let i = 1; i < coords.length; i++) {
//   if (coords[i][0] !== coords[0][0] || coords[i][1] !== coords[i - 1][1] + 1) {
//     console.log("here");
//     isHorizontal = false;
//     break;
//   }
//   isHorizontal = true;
// }
// if (!isHorizontal) {
//   coords.sort((a, b) => a[0] - b[0]);
//   for (let i = 1; i < coords.length; i++) {
//     if (
//       coords[i][1] !== coords[0][1] ||
//       coords[i][0] !== coords[i - 1][0] + 1
//     ) {
//       isVertical = false;
//       break;
//     }
//     isVertical = true;
//   }
// }
console.log("isHorizontal", isHorizontal);
console.log("isVertical", isVertical);
if (!isVertical && !isHorizontal) console.log("huh");
// console.log(isHorizontal || isVertical);
