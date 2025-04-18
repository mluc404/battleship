export function gameboard() {
  const ships = [];
  const missedAttacks = [];
  const hitAttacks = [];
  const row = 5;
  const col = 5;
  const grid = Array(row)
    .fill()
    .map(() => Array(col).fill(null));

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
        coord[0] >= 0 &&
        coord[0] <= row - 1 &&
        coord[1] >= 0 &&
        coord[1] <= col - 1
    );
    if (!withinGrid) throw new Error("Coordinates must be within the grid");

    // Check for duplicates inside coords
    const coordSet = new Set();
    coords.forEach((coord) => {
      if (coordSet.has(coord.join("")))
        throw new Error("Duplicates inside coordinates");
      else {
        coordSet.add(coord.join(""));
      }
    });

    // Check if coords are consecutively horizontal or vertical
    let isHorizontal = null;
    let isVertical = null;
    coords.sort((a, b) => a[1] - b[1]);
    for (let i = 1; i < coords.length; i++) {
      if (
        coords[i][0] !== coords[0][0] ||
        coords[i][1] !== coords[i - 1][1] + 1
      ) {
        isHorizontal = false;
        break;
      }
      isHorizontal = true;
    }
    if (!isHorizontal) {
      coords.sort((a, b) => a[0] - b[0]);
      for (let i = 1; i < coords.length; i++) {
        if (
          coords[i][1] !== coords[0][1] ||
          coords[i][0] !== coords[i - 1][0] + 1
        ) {
          isVertical = false;
          break;
        }
        isVertical = true;
      }
    }
    if (!isVertical && !isHorizontal)
      throw new Error(
        "Coordinates must be consecutively horizontal or vertical"
      );

    // Check if coords overlap with existing ships in the grid
    if (coords.some((coord) => grid[coord[1]][coord[0]] !== null))
      throw new Error("Coordinates overlap with existing ship");

    // Now we can place the ship with valid coordinates
    ship.setCoordinates(coords);
    ships.push(ship);
    // place the ship in the grid
    coords.forEach((coord) => {
      grid[coord[0]][coord[1]] = ship.type;
    });

    console.log(grid);
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
