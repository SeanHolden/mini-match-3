import Gem from "./gem";
import Swap from "./swap";
import { alreadyFound, scanForMatches, threeInRow } from "./scan-for-matches";

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

  pop(matches) {
    matches.forEach(combo => {
      combo.forEach(pos => {
        const gem = this.at(pos);
        gem.pop();
      });
    });
  }

  findMatches() {
    const allMatches = [];
    this.current.forEach((line, y) => {
      line.forEach((_, x) => {
        if (allMatches.filter(arr => alreadyFound({ x, y }, arr)).length > 0) {
          return;
        }
        const matches = scanForMatches({ x, y }, this);
        threeInRow(matches) && allMatches.push(matches);
      });
    });
    return allMatches;
  }
}

export default Grid;
