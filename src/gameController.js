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
  const pcPlayer = player("computer");

  const ship1 = makeShip(3, "sub");
  const ship2 = makeShip(4, "cruiser");
  const humanBoard = humanPlayer.getBoard();

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

  renderBoard(humanBoard);

  console.log(humanBoard.getGrid());
  console.log(typeof humanBoard.getGrid()[1][1]);

  // while (!humanBoard.checkGameOver()) {
  //   pcPlayer.attack(humanBoard);
  // }
  let timeOut = 1000;
  for (let i = 0; i < 10; i++) {
    setTimeout(() => pcPlayer.attack(humanBoard), timeOut);
    timeOut += 1000;
  }

  let arr = [[1, 2]];
  arr.splice(0, 1);
  console.log(arr.length);
}
