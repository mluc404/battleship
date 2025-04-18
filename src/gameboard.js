export function gameboard() {
  const ships = [];
  const missedAttacks = [];
  const hitAttacks = [];

  // Helper function to check if a target coords already existed
  const containsCoordinate = (arr, target) => {
    return arr.some(
      (coord) => coord[0] === target[0] && coord[1] === target[1]
    );
  };

  // Function to place ships
  const placeShip = (ship, coords) => {
    // Check if coords match ship length
    if (coords.length !== ship.length)
      throw new Error("Coordinates must match the ship length");

    // Check if the arrays inside coords are length 2 and contain only integers
    if (
      !coords.every(
        (coord) =>
          Array.isArray(coord) &&
          coord.length === 2 &&
          Number.isInteger(coord[0]) &&
          Number.isInteger(coord[1])
      )
    )
      throw new Error("Coordinates must be pairs of integers");

    // Check if coords are within the grid
    const withinGrid = coords.every(
      (coord) =>
        coord[0] >= 0 && coord[0] <= 9 && coord[1] >= 0 && coord[1] <= 9
    );
    if (!withinGrid) throw new Error("Coordinates must be within the grid");

    // Check if coords are consecutively vertical or horizontal
    let isVertical, isHorizontal;
    for (let i = 1; i < coords.length; i++) {
      if (
        coords[i][0] === coords[0][0] &&
        coords[i][1] === coords[i - 1][1] + 1
      ) {
        isVertical = true;
      } else {
        isVertical = false;
        break;
      }
    }
    if (!isVertical) {
      for (let i = 1; i < coords.length; i++) {
        if (
          coords[i][1] === coords[0][1] &&
          coords[i][0] === coords[i - 1][0] + 1
        ) {
          isHorizontal = true;
        } else {
          isHorizontal = false;
          break;
        }
      }
    }
    if (!isVertical && !isHorizontal)
      throw new Error(
        "Coordinates must be consecutively horizontal or vertical"
      );

    // Check if coords overlap with existing ships
    const isOverlap = getShips().some((ship) =>
      ship
        .getCoordinates()
        .some((placedCoord) => containsCoordinate(coords, placedCoord))
    );

    // Now we can place the ship with valid coordinates
    if (!isOverlap) {
      ship.setCoordinates(coords);
      ships.push(ship);
    } else {
      throw new Error(`${coords} is an invalid coordinate`);
    }
  };

  // Function to handle an attack
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

  const checkGameOver = () => {
    return getShips().every((ship) => ship.isSunk());
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
    checkGameOver,
  };
}
