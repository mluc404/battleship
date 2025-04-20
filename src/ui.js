import { player } from "./player";

export function renderBoard(board) {
  let gridDiv;
  if (board.belongTo === "human") {
    gridDiv = document.querySelector(".humanGrid");
  } else {
    gridDiv = document.querySelector(".computerGrid");
  }
  gridDiv.innerHTML = "";
  // Make each cell div contain its coordinate and clicked-on status
  const grid = board.getGrid();
  for (let i = 0; i <= 9; i++) {
    for (let k = 0; k <= 9; k++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-coord", [i, k].join(","));
      cell.setAttribute("data-clicked", "no");

      // Set color for each type of cell: null, ship, hit, miss
      // if (grid[i][k] === null) cell.style.backgroundColor = "#454d60";
      if (typeof grid[i][k] === "object" && grid[i][k] !== null) {
        cell.classList.add("ship");
        cell.classList.add(grid[i][k].type);
      } else if (grid[i][k] === "hit") {
        cell.style.backgroundColor = "orange";
        cell.classList.add("hit");
      } else if (grid[i][k] === "miss") {
        // cell.style.backgroundColor = "blue";
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

export function renderCell(board, coords) {
  let gridDiv;
  if (board.belongTo === "human") {
    gridDiv = document.querySelector(".humanGrid");
  } else {
    gridDiv = document.querySelector(".computerGrid");
  }
  const grid = board.getGrid();
  const cell = gridDiv.querySelector(`[data-coord="${coords.join(",")}"]`);
  cell.setAttribute("data-clicked", "yes");
  console.log(cell);

  if (grid[coords[0]][coords[1]] === "hit") {
    cell.style.backgroundColor = "orange";
    cell.classList.add("hit");
  } else {
    cell.style.backgroundColor = "#0076b0";
    cell.classList.add("miss");
  }
}
