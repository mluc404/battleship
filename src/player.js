import { gameboard } from "./gameboard";
import { renderBoard } from "./ui";

export function player(type) {
  const board = gameboard();
  renderBoard(board);

  let attack;
  if (type === "human") {
    attack = (opponentBoard, coords) => {
      opponentBoard.receiveAttack(coords);
      renderBoard(opponentBoard);
    };
  } else {
    attack = (opponentBoard, coords) => {
      opponentBoard.receiveAttack(coords);
      renderBoard(opponentBoard);
    };
  }
  const getBoard = () => {
    return board;
  };

  return { type, getBoard, attack };
}
