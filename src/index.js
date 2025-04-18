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

//check if coords are horizontal
if (coords.every((coord) => coord[0] === coords[0][0])) {
  coords.sort((a, b) => a[1] - b[1]);
  for (let i = 1; i < coords.length; i++) {
    if (coords[i][1] !== coords[i - 1][1] + 1)
      throw new Error(
        `${JSON.stringify(coords)} are not consecutively horizontal`
      );
  }
} else if (coords.every((coord) => coord[1] === coords[0][1])) {
  coords.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < coords.length; i++) {
    if (coords[i][0] !== coords[i - 1][0] + 1)
      throw new Error(
        `${JSON.stringify(coords)} are not consecutively vertical`
      );
  }
} else {
  throw new Error(`${JSON.stringify(coords)} are not horizontal nor vertical`);
}

let x = [
  ["hit", "miss", null],
  [null, null, "miss"],
];

let n = x.map((row) => row.map((cell) => cell));
console.log(n);

let arr = [[{ hit: true }]];
let deepCopy = JSON.parse(JSON.stringify(arr));
console.log(deepCopy);
