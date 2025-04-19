import { gameboard } from "./gameboard";

export function player(type) {
  const playerType = type;
  const board = gameboard();

  const attack = (opponentBoard, coords) => {
    opponentBoard.receiveAttack(coords);
  };

  const getBoard = () => {
    return board;
  };

  return { playerType, getBoard, attack };
}
