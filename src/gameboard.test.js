import { makeShip } from "./ship";
import { gameboard } from "./gameboard";

describe("gameboard", () => {
  let ship1, ship2;
  let board;

  const ship1Coords = [
    [1, 1],
    [1, 2],
    [1, 3],
  ];
  const ship2Coords = [
    [2, 2],
    [2, 3],
  ];

  const hitCoords1 = [1, 2];
  const hitCoords2 = [1, 1];
  const hitCoords3 = [1, 3];
  const hitCoords4 = [2, 2];
  const hitCoords5 = [2, 3];

  beforeEach(() => {
    ship1 = makeShip(3, "sub");
    ship2 = makeShip(2, "destroyer");
    board = gameboard();

    board.placeShip(ship1, ship1Coords);
    board.placeShip(ship2, ship2Coords);
  });

  test("assign ship coordinate", () => {
    expect(ship1.getCoordinates()).toEqual(ship1Coords);
    expect(ship2.getCoordinates()).toEqual(ship2Coords);
    expect(board.getShips().length).toEqual(2);
  });

  test("receive attack", () => {
    board.receiveAttack(hitCoords1);
    expect(ship1.getHits()).toEqual(1);
    board.receiveAttack(hitCoords2);
    expect(ship1.getHits()).toEqual(2);
    expect(ship1.isSunk()).toEqual(false);
    board.receiveAttack(hitCoords3);
    expect(ship1.getHits()).toEqual(3);
    expect(ship1.isSunk()).toEqual(true);

    expect(ship2.getHits()).toEqual(0);
    expect(board.getMissedAttacks().length).toEqual(0);

    const hitCoordsX = [1, 1];
    expect(() => board.receiveAttack(hitCoordsX)).toThrow();
  });

  test("missed attack", () => {
    const hitCoords = [7, 7];

    board.receiveAttack(hitCoords);
    expect(board.getMissedAttacks()).toEqual([[7, 7]]);
  });

  test("game over", () => {
    board.receiveAttack(hitCoords1);
    board.receiveAttack(hitCoords2);
    board.receiveAttack(hitCoords3);
    board.receiveAttack(hitCoords4);
    board.receiveAttack(hitCoords5);

    expect(board.checkGameOver()).toBe(true);
  });
});
