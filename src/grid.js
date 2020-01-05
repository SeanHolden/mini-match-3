import Gem from "./gem";
import Swap from "./swap";

class Grid {
  constructor(schema) {
    this.schema = schema;
    this.current = this.create();
  }

  create() {
    return this.schema.map(column => column.map(type => new Gem(type)));
  }

  at(position) {
    return this.current[position.y][position.x];
  }

  swap(position) {
    return new Swap(this, position);
  }

  update(updatedGrid) {
    this.current = updatedGrid;
  }

  findMatches() {
    const inBounds = ({ x, y }) => x >= 0 && y >= 0 && x <= 5 && y <= 5;
    const alreadyFound = ({ x, y }, arr) =>
      arr.filter(p => p.x === x && p.y === y).length > 0;
    const valid = (pos, arr) => inBounds(pos) && !alreadyFound(pos, arr);
    const findNeighborMatches = (x, y, matchesSoFar = [{ x, y }]) => {
      [
        { x: x + 1, y },
        { x, y: y + 1 },
        { x: x - 1, y },
        { x, y: y - 1 }
      ].forEach(neighbor => {
        if (
          valid(neighbor, matchesSoFar) &&
          this.at({ x, y }).type === this.at(neighbor).type
        ) {
          matchesSoFar.push(neighbor);
          findNeighborMatches(neighbor.x, neighbor.y, matchesSoFar);
        }
      });
      return matchesSoFar;
    };
    const allMatches = [];
    this.current.forEach((line, y) => {
      line.forEach((_, x) => {
        if (allMatches.filter(arr => alreadyFound({ x, y }, arr)).length > 0) {
          return;
        }
        const matches = findNeighborMatches(x, y);
        matches.length >= 3 && allMatches.push(matches);
      });
    });
    return allMatches;
  }
}

export default Grid;
