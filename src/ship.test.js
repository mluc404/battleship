import { makeShip } from "./ship";

describe("makeShip", () => {
  test("track hits and determine if ship is sunk", () => {
    const ship = makeShip(3);
    ship.hit();
    ship.hit();
    expect(ship.getHits()).toEqual(2);
    expect(ship.length).toEqual(3);
    ship.hit();
    expect(ship.isSunk()).toEqual(true);
  });

  test("set and get coordinates", () => {
    const ship = makeShip(3);
    const coords = [
      [1, 1],
      [1, 2],
      [1, 3],
    ];
    ship.setCoordinates(coords);
    expect(ship.getCoordinates()).toEqual(coords);
    expect(ship.getCoordinates()).not.toBe(coords);
  });
});
