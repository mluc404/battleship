import { makeShip } from "./ship";

test("test ship functionality", () => {
  let ship1 = makeShip(3);
  ship1.hit();
  ship1.hit();
  expect(ship1.getHits()).toEqual(2);
  expect(ship1.length).toEqual(3);
  ship1.hit();
  expect(ship1.isSunk()).toEqual(true);
});
