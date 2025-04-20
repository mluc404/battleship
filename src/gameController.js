import { player } from "./player";
import { makeShip } from "./ship";
import { renderBoard } from "./ui";
export function gameController() {
  // create 2 players (each player auto creates their own board)
  // Note: ships should also be generated inside player()
  // So now we have: 2 players, 2 boards, all ships placed
  // human makes the first move
  // then pc's turn. NOTE: find a way to generate random coordinates inside its attack method
  // repeat until 1 player has all their ships sunked
  const humanPlayer = player("human");
  const computerPlayer = player("computer");

  const ship1 = makeShip(3, "sub");
  const ship2 = makeShip(4, "cruiser");
  const ship3 = makeShip(3, "sub");
  const ship4 = makeShip(4, "cruiser");
  const humanBoard = humanPlayer.getBoard();
  const computerBoard = computerPlayer.getBoard();

  humanBoard.placeShip(ship1, [
    [1, 2],
    [1, 3],
    [1, 1],
  ]);
  humanBoard.placeShip(ship2, [
    [4, 6],
    [5, 6],
    [6, 6],
    [7, 6],
  ]);

  computerBoard.placeShip(ship3, [
    [1, 7],
    [2, 7],
    [3, 7],
  ]);
  computerBoard.placeShip(ship4, [
    [9, 5],
    [9, 6],
    [9, 7],
    [9, 8],
  ]);
  renderBoard(humanBoard, "human");
  renderBoard(computerBoard, "computer");

  // console.log(humanBoard.getGrid());
  // console.log(typeof humanBoard.getGrid()[1][1]);

  // while (!humanBoard.checkGameOver()) {
  //   computerPlayer.attack(humanBoard);
  // }
  let timeOut = 200;
  const testCompAttack = () => {
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        console.log("TURN # ", i);
        computerPlayer.attack(humanBoard);
      }, timeOut);
      if (humanBoard.checkGameOver()) break;
      timeOut += 200;
    }
  };

  // testCompAttack();

  const computerGrid = document.querySelector(".computerGrid");
  const allCompCells = computerGrid.querySelectorAll(".cell");
  allCompCells.forEach((cell) => {
    cell.addEventListener("mousedown", (e) => {
      // Computer counter attack
      computerPlayer.attack(humanBoard);
    });
  });
}
