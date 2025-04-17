export function gameboard() {
  const ships = [];
  const missedAttacks = [];
  const hitAttacks = [];

  const placeShip = (ship, coords) => {
    ship.setCoordinates(coords);
    ships.push(ship);
  };

  // Helper function to check if an attack coords already existed
  const containsCoordinate = (arr, target) => {
    return arr.some(
      (coord) => coord[0] === target[0] && coord[1] === target[1]
    );
  };

  const receiveAttack = (attackCoords) => {
    // first check if the attack coords is already used
    const coordExist =
      containsCoordinate(getHitAttacks(), attackCoords) ||
      containsCoordinate(getMissedAttacks(), attackCoords);
    if (coordExist) {
      throw new Error("Hit me baby one more time? No!");
    } else {
      let isHit = false;
      getShips().forEach((ship) => {
        if (containsCoordinate(ship.getCoordinates(), attackCoords)) {
          ship.hit();
          getHitAttacks().push(attackCoords);
          isHit = true;
          return;
        }
      });
      if (!isHit) getMissedAttacks().push(attackCoords);
    }
  };

  const getShips = () => {
    return ships;
  };

  const getHitAttacks = () => {
    return hitAttacks;
  };

  const getMissedAttacks = () => {
    return missedAttacks;
  };
  return {
    placeShip,
    getShips,
    receiveAttack,
    getMissedAttacks,
    getHitAttacks,
  };
}
