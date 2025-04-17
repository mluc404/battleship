export function makeShip(length, name) {
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
    name,
    hit,
    getHits,
    isSunk,
    setCoordinates,
    getCoordinates,
  };
}
