import { player } from "./player";

export function renderBoard(board) {
  let gridDiv;
  if (board.belongTo === "human") {
    gridDiv = document.querySelector(".humanGrid");
  } else {
    gridDiv = document.querySelector(".computerGrid");
  }
  gridDiv.innerHTML = "";
  // Need to make each cell div contain its coordinate and clicked-on status
  const grid = board.getGrid();
  for (let i = 0; i <= 9; i++) {
    for (let k = 0; k <= 9; k++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-cord", [i, k].join(","));
      cell.setAttribute("data-clicked", "no");

      // Set color for each type of cell: null, ship, hit, miss
      if (grid[i][k] === null) cell.style.backgroundColor = "#454d60";
      else if (typeof grid[i][k] === "object") {
        cell.classList.add("ship");
      } else if (grid[i][k] === "hit") {
        cell.style.backgroundColor = "orange";
        cell.classList.add("hit");
      } else {
        cell.style.backgroundColor = "blue";
        cell.classList.add("miss");
      }

      // Add event listener to cells

      cell.addEventListener("mousedown", (e) => {});

      gridDiv.appendChild(cell);
    }
  }

  // const allCells = board.getGrid().flat();

  // allCells.forEach((square) => {
  //   const cell = document.createElement("div");
  //   cell.classList.add("cell");
  //   gridDiv.appendChild(cell);
  //   if (square === null) cell.style.backgroundColor = "#454d60";
  //   else if (typeof square === "object") {
  //     cell.classList.add("ship");
  //   } else if (square === "hit") cell.style.backgroundColor = "orange";
  //   else cell.style.backgroundColor = "blue";
  // });
}

export function renderCell(board, coords) {}
