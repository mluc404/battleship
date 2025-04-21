const humanGridDiv = document.querySelector(".humanGrid");
const computerGridDiv = document.querySelector(".computerGrid");

export function renderBoard(board) {
  const gridDiv = board.belongTo === "human" ? humanGridDiv : computerGridDiv;
  let ROW = 9;
  let COL = 9;
  gridDiv.innerHTML = "";
  // Make each cell div contain its coordinate and clicked-on status
  const grid = board.getGrid();
  for (let i = 0; i <= ROW; i++) {
    for (let k = 0; k <= COL; k++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-coord", [i, k].join(","));
      cell.setAttribute("data-clicked", "no");

      // Set type of ship for cell div class
      if (typeof grid[i][k] === "object" && grid[i][k] !== null) {
        cell.classList.add("ship");
        cell.classList.add(grid[i][k].type);
      }
      gridDiv.appendChild(cell);
    }
  }
}
// Function to re-render each cell after an attack
export function renderCell(board, coords) {
  const gridDiv = board.belongTo === "human" ? humanGridDiv : computerGridDiv;
  const grid = board.getGrid();
  const cell = gridDiv.querySelector(`[data-coord="${coords.join(",")}"]`);
  cell.setAttribute("data-clicked", "yes");

  // Add class to identify cell type and update its color
  if (grid[coords[0]][coords[1]] === "hit") {
    cell.style.backgroundColor = "orange";
    cell.classList.add("hit");
  } else {
    cell.style.backgroundColor = "#0076b0";
    cell.classList.add("miss");
  }
}
