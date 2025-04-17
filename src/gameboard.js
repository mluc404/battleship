import { makeShip } from "./ship";

export function gameboard() {
  const ships = [];
  const missedAttacks = [];
  const placeShip = (ship, coords) => {
    ship.setCoordinates(coords);
    ships.push(ship);
  };

  const receiveAttack = (hitCoords) => {
    const currShips = getShips();

    currShips.forEach((ship) => {
      ship.getCoordinates().forEach((coord) => {
        if (coord[0] === hitCoords[0] && coord[1] === hitCoords[1]) {
          ship.hit();
          return;
        }
      });
    });

    getMissedAttacks().push(hitCoords);
  };

  const getShips = () => {
    return ships;
  };

  const getMissedAttacks = () => {
    return missedAttacks;
  };
  return { placeShip, getShips, receiveAttack, getMissedAttacks };
}
