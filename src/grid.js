import Gem from "./gem";
import Swap from "./swap";
import { alreadyFound, scanForMatches, threeInRow } from "./scan-for-matches";
import { sortByY } from "./sort";
import { drop } from "./drop";

class Grid {
  constructor(schema) {
    this.current = schema.map(column => column.map(type => new Gem(type)));
  }

  at(position) {
    return this.current[position.y][position.x];
  }

  swap(position) {
    return new Swap(this, position);
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

  pop(matches) {
    matches.forEach(combo => {
      combo.forEach(pos => {
        const gem = this.at(pos);
        gem.pop();
      });
    });
  }

  hasGaps() {
    return this.current.find(line => line.find(gem => gem.isBlank()));
  }

  column(num) {
    return this.current.map(line => line[num]);
  }

  drop() {
    if (!this.hasGaps()) return;

    let droppables = [];
    this.current.forEach((line, y) => {
      line.forEach((gem, x) => getDroppables(this, gem, x, y, droppables));
    });

    droppables // sort by y (large to small) so that we loop from bottom upwards
      .sort(sortByY)
      .forEach(item => drop(item, this));
  }
}

const getDroppables = (grid, gem, x, y, droppables) => {
  if (gem.isBlank()) {
    // drop everything above this gem. Ignore blanks.
    for (y - 1; y >= 0; y--) {
      if (grid.at({ x, y }).isBlank()) {
        continue;
      }
      const alreadyDroppable = droppables.find(a => a.x === x && a.y === y);
      alreadyDroppable
        ? alreadyDroppable.toDrop++
        : droppables.push({ x, y, toDrop: 1 });
    }

  }
};

export default Grid;
