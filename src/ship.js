export function makeShip(length) {
  let hits = 0;
  return {
    length,
    hit() {
      hits++;
    },
    getHits() {
      return hits;
    },
    isSunk() {
      return hits >= length;
    },
  };
}

const ship1 = makeShip(3);
console.table(ship1);
ship1.hit();
ship1.hit();
ship1.hit();
console.log(ship1.hit());
console.log(ship1.isSunk());
console.table(ship1.hits);
console.table(ship1.getHits());
