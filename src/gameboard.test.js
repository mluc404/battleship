import { makeShip } from "./ship";
import { gameboard } from "./gameboard";

describe("gameboard", () => {
  let ship1, ship2, ship3;
  let board;

  const ship1Coords = [
    [1, 2],
    [1, 1],
    [1, 3],
  ];
  const ship2Coords = [
    [2, 2],
    [2, 3],
  ];

  const ship3Coords = [
    [1, 1],
    [3, 0],
    [4, 0],
  ];

  const hitCoords1 = [1, 2];
  const hitCoords2 = [1, 1];
  const hitCoords3 = [1, 3];
  const hitCoords4 = [2, 2];
  const hitCoords5 = [2, 3];

  beforeEach(() => {
    ship1 = makeShip(3, "sub");
    ship2 = makeShip(2, "destroyer");
    ship3 = makeShip(3, "cruiser");
    board = gameboard();

    board.placeShip(ship1, ship1Coords);
    board.placeShip(ship2, ship2Coords);

    expect(() => board.placeShip(ship3, ship3Coords)).toThrow();
  });

  test("assign ship coordinate", () => {
    expect(ship1.getCoordinates()).toEqual(ship1Coords);
    expect(ship2.getCoordinates()).toEqual(ship2Coords);
    expect(board.getShips().length).toEqual(2);
  });

  test("receive attack", () => {
    board.receiveAttack(hitCoords1);
    expect(ship1.getHits()).toEqual(1);
    expect(board.getGrid()[hitCoords1[0]][hitCoords1[1]]).toEqual("hit");

    board.receiveAttack(hitCoords2);
    expect(ship1.getHits()).toEqual(2);
    expect(ship1.isSunk()).toEqual(false);

    board.receiveAttack(hitCoords3);
    expect(ship1.getHits()).toEqual(3);
    expect(ship1.isSunk()).toEqual(true);

    expect(ship2.getHits()).toEqual(0);

    expect(() => board.receiveAttack([1, 1])).toThrow();

    expect(() => board.receiveAttack([10, -1])).toThrow();
  });

  test("missed attack", () => {
    board.receiveAttack([8, 9]);
    expect(board.getGrid()[8][9]).toEqual("miss");
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
