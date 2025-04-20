import { gameboard } from "./gameboard";
import { renderBoard } from "./ui";

export function player(type) {
  const board = gameboard(type);
  const ROW = 9;
  const COL = 9;
  renderBoard(board);
  let coords = [0, 0];
  let lastHit;
  let checkLeft, checkRight, checkUp, checkDown;
  let possibleMoves = [];

  let attack;
  if (type === "human") {
    attack = (opponentBoard, inputCoords) => {
      opponentBoard.receiveAttack(inputCoords);
      // renderBoard(opponentBoard, "computer");
    };
  } else {
    attack = (opponentBoard) => {
      const grid = opponentBoard.getGrid();

      let rows = [...Array(10).keys()];

      // while (typeof grid[coords[0]][coords[1]] !== "object") {
      //   if (grid[coords[0]][coords[1]] === "hit") {
      //     lastHit = [coords[0], coords[1]];
      //     checkLeft = [lastHit[0], lastHit[1] - 1];
      //     checkRight = [lastHit[0], lastHit[1] + 1];
      //     checkUp = [lastHit[0] - 1, lastHit[1]];
      //     checkDown = [lastHit[0] + 1, lastHit[1]];

      //     // check top left
      //     if (coords[1] === 0 && coords[0] === 0) {
      //       coords = checkRight; // move right
      //       possibleMoves.push(checkDown); // then possible moves: down
      //     } else if (coords[1] === 0 && coords[0] === 9) {
      //       coords = checkRight; // move right
      //       possibleMoves.push(checkUp); // then possible moves: up
      //     } else if (coords[1] === 9 && coords[0] === 0) {
      //       // move left
      //       coords = checkLeft;
      //       // then possible moves: down
      //       possibleMoves.push(checkDown);
      //     } else if (coords[1] === 9 && coords[0] === 9) {
      //       // move left
      //       coords = checkLeft;
      //       // then possible moves: up
      //       possibleMoves.push(checkUp);
      //     } else if (coords[1] === 0) {
      //       // move right
      //       coords = checkRight;
      //       // then possible move: up, down
      //       possibleMoves.push(checkUp, checkDown);
      //     } else if (coords[1] === 9) {
      //       // move left
      //       coords = checkLeft;
      //       // then possible moves: up, down
      //       possibleMoves.push(checkUp, checkDown);
      //     } else if (coords[0] === 0) {
      //       // move down
      //       coords = checkDown;
      //       // possible moves: left, right
      //       possibleMoves.push(checkLeft, checkRight);
      //     } else if (coords[0] === 9) {
      //       // move up
      //       coords = checkUp;
      //       // possible moves: left, right
      //       possibleMoves.push(checkLeft, checkRight);
      //     } else {
      //       // this is the case where the cell is not on the edge
      //       coords = checkUp;
      //       possibleMoves.push(checkDown, checkLeft, checkRight);
      //     }
      //   } else if (possibleMoves.length > 0) {
      //     coords = possibleMoves[0];
      //     possibleMoves.splice(0, 1);
      //   } else {
      //     coords[0] = Math.floor(Math.random() * ROW);
      //     coords[1] = Math.floor(Math.random() * COL);
      //   }
      // }

      while (typeof grid[coords[0]][coords[1]] !== "object") {
        if (grid[coords[0]][coords[1]] === "hit") {
          lastHit = [coords[0], coords[1]];
          coords[0]++;
          checkLeft = [lastHit[0], lastHit[1] - 1];
          checkRight = [lastHit[0], lastHit[1] + 1];
          checkUp = [lastHit[0] - 1, lastHit[1]];
          checkDown = [lastHit[0] + 1, lastHit[1]];
        } else {
          coords[0] = Math.floor(Math.random() * ROW);
          coords[1] = Math.floor(Math.random() * COL);
        }
      }
      console.log("pc attacks at ", coords);
      opponentBoard.receiveAttack(coords);
      renderBoard(opponentBoard);
    };
  }
  const getBoard = () => {
    return board;
  };

  return { type, getBoard, attack };
}
