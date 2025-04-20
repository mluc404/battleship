export function gameboard(belongTo) {
  const ships = [];
  const missedAttacks = [];
  const hitAttacks = [];
  const ROW = 10;
  const COL = 10;
  const grid = Array(ROW)
    .fill()
    .map(() => Array(COL).fill(null));

  // Helper function to check if a coordinate is within the grid
  const isWithinGrid = (coord) => {
    return (
      coord[0] >= 0 &&
      coord[0] <= ROW - 1 &&
      coord[1] >= 0 &&
      coord[1] <= COL - 1
    );
  };

  // Helper function to check if a coordinate is an array of 2 integers
  const isArrOfTwoInt = (coord) => {
    return (
      Array.isArray(coord) &&
      coord.length === 2 &&
      Number.isInteger(coord[0]) &&
      Number.isInteger(coord[1])
    );
  };

  // Helper function to check if coords are consecutively horizontal/vertical
  const horizontalOrVertical = (coords) => {
    // Check for duplicates inside coords
    const coordSet = new Set();
    coords.forEach((coord) => {
      if (coordSet.has(coord.join("")))
        throw new Error("Duplicates inside coordinates");
      else {
        coordSet.add(coord.join(""));
      }
    });

    const coordsCopy = [...coords];
    if (coords.every((coord) => coord[0] === coords[0][0])) {
      coordsCopy.sort((a, b) => a[1] - b[1]);
      for (let i = 1; i < coordsCopy.length; i++) {
        if (coordsCopy[i][1] !== coordsCopy[i - 1][1] + 1)
          throw new Error(
            `${JSON.stringify(coordsCopy)} have gaps in vertical alignment`
          );
      }
    } else if (coords.every((coord) => coord[1] === coords[0][1])) {
      coordsCopy.sort((a, b) => a[0] - b[0]);
      for (let i = 1; i < coordsCopy.length; i++) {
        if (coordsCopy[i][0] !== coordsCopy[i - 1][0] + 1)
          throw new Error(
            `${JSON.stringify(coordsCopy)} have gaps in horizontal alignment`
          );
      }
    } else {
      throw new Error(
        `${JSON.stringify(coords)} are not horizontal nor vertical`
      );
    }
  };

  // Function to place ships
  const placeShip = (ship, coords) => {
    // Check if coords match ship length
    if (coords.length !== ship.length)
      throw new Error("Coordinates must match the ship length");

    // Check if the arrays inside coords are length 2 and contain only integers
    if (!coords.every((coord) => isArrOfTwoInt(coord)))
      throw new Error("Coordinates must be pairs of integers");

    // Check if coords are within the grid
    const withinGrid = coords.every((coord) => isWithinGrid(coord));
    if (!withinGrid) throw new Error("Coordinates must be within the grid");

    // Check if coords are consecutively horizontal or vertical
    horizontalOrVertical(coords);

    // Check if coords overlap with existing ships in the grid
    if (coords.some((coord) => grid[coord[0]][coord[1]] !== null))
      throw new Error(
        `Coordinates ${JSON.stringify(coords)}overlap with existing ship`
      );

    // Now we can place the ship in the grird with valid coordinates
    ship.setCoordinates(coords);
    ships.push(ship);
    coords.forEach((coord) => {
      grid[coord[0]][coord[1]] = ship;
    });
  };

  // FUNCTION TO HANDLE ATTACK
  const receiveAttack = (attackCoords) => {
    // Validate the attack coords
    if (!isArrOfTwoInt(attackCoords) || !isWithinGrid(attackCoords))
      throw new Error("Invalid attack coordinates");

    if (
      grid[attackCoords[0]][attackCoords[1]] === "hit" ||
      grid[attackCoords[0]][attackCoords[1]] === "miss"
    ) {
      throw new Error("Hit me baby one more time? No!");
    } else if (grid[attackCoords[0]][attackCoords[1]] !== null) {
      grid[attackCoords[0]][attackCoords[1]].hit();
      grid[attackCoords[0]][attackCoords[1]] = "hit";
      hitAttacks.push(attackCoords);
    } else {
      grid[attackCoords[0]][attackCoords[1]] = "miss";
      missedAttacks.push(attackCoords);
    }

    // check if game over
    if (checkGameOver()) {
      alert("Game Over");
    }
  };

  // function to let UI access grid
  const getGrid = () => {
    return grid.map((row) => row);
  };

  const getMissedAttacks = () => {
    return missedAttacks;
  };

  const getHitAttacks = () => {
    return hitAttacks;
  };

  const checkGameOver = () => {
    return ships.every((ship) => ship.isSunk());
  };

  const getShips = () => {
    return ships;
  };

  return {
    belongTo,
    placeShip,
    getShips,
    receiveAttack,
    getGrid,
    getMissedAttacks,
    getHitAttacks,
    checkGameOver,
  };
}
