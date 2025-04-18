export function makeShip(length, type) {
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
    type,
    hit,
    getHits,
    isSunk,
    setCoordinates,
    getCoordinates,
  };
}
