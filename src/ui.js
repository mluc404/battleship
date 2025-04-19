import { player } from "./player";

export function renderBoard(board) {
  const grid = document.querySelector(".grid");
  grid.innerHTML = "";
  const allCells = board.getGrid().flat();
  allCells.forEach((square) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.appendChild(cell);
    if (square === null) cell.style.backgroundColor = "#454d60";
    else if (typeof square === "object") cell.style.backgroundColor = "black";
    else if (square === "hit") cell.style.backgroundColor = "orange";
    else cell.style.backgroundColor = "blue";
  });
}
