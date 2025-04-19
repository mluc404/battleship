import { player } from "./player";
import { makeShip } from "./ship";

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

  console.log(humanBoard.getGrid());

  pcPlayer.attack(humanBoard, [1, 1]);
  pcPlayer.attack(humanBoard, [1, 5]);

  console.table(humanBoard.getShips());
}
