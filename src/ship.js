export function makeShip(length) {
  let hits = 0;
  let coordinates = [];

  const hit = () => {
    if (hits < length) return hits++;
  };

  const getHits = () => hits;

  const isSunk = () => hits >= length;

  const setCoordinates = (coords) => {
    coordinates = coords;
  };

  const getCoordinates = () => [...coordinates];

  return {
    length,
    hit,
    getHits,
    isSunk,
    setCoordinates,
    getCoordinates,
  };
}

// const ship1 = makeShip(3);
// console.table(ship1);
// ship1.hit();
// ship1.hit();
// ship1.hit();
// console.log(ship1.hit());
// console.log(ship1.isSunk());
// console.table(ship1.hits);
// console.table(ship1.getHits());

const arr = [
  [1, 1],
  [1, 2],
];

const x = [1, 2];
arr.forEach((coord) => {
  const isHit = x.every((i) => coord.includes(i));
  console.log(isHit);
});
