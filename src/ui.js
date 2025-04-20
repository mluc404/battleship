import { player } from "./player";

export function renderBoard(board, type) {
  let grid;
  if (type === "human") {
    grid = document.querySelector(".humanGrid");
  } else {
    grid = document.querySelector(".computerGrid");
  }
  grid.innerHTML = "";
  const allCells = board.getGrid().flat();

  allCells.forEach((square) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
    if (square === null) cell.style.backgroundColor = "#454d60";
    else if (typeof square === "object") {
      // cell.style.backgroundColor = "black";
      cell.classList.add("ship");
    } else if (square === "hit") cell.style.backgroundColor = "orange";
    else cell.style.backgroundColor = "blue";
  });
}
