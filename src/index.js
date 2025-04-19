import "./styles.css";

import { player } from "./player";
import { makeShip } from "./ship";
import { renderGrid } from "./ui";

const humanPlayer = player("human");
const pcPlayer = player("computer");

const ship1 = makeShip(3, "sub");
humanPlayer.getBoard().placeShip(ship1, [
  [1, 2],
  [1, 3],
  [1, 1],
]);

console.log(humanPlayer.getBoard().getGrid());
pcPlayer.attack(humanPlayer.getBoard(), [1, 1]);
pcPlayer.attack(humanPlayer.getBoard(), [1, 5]);
console.log(humanPlayer.getBoard().getGrid());
// pcPlayer.attack(humanPlayer.getBoard(), [1, 1]);
renderGrid(humanPlayer.getBoard());

pcPlayer.attack(humanPlayer.getBoard(), [1, 3]);
renderGrid(humanPlayer.getBoard());
