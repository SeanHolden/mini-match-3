import Gem from "./gem";
import Swap from "./swap";
import { alreadyFound, scanForMatches, threeInRow } from "./scan-for-matches";
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
    return this.current.reduce((allMatches, line, y) => {
      line.forEach((_, x) => {
        if (allMatches.filter(arr => alreadyFound({ x, y }, arr)).length) {
          return;
        }
        const matches = scanForMatches({ x, y }, this);
        threeInRow(matches) && allMatches.push(matches);
      });
      return allMatches;
    }, []);
  }

  pop(matches) {
    matches.forEach(combo => {
      combo.forEach(pos => {
        const gem = this.at(pos);
        gem.pop();
      });
    });
  }

  column(num) {
    return this.current.map(line => line[num]);
  }

  drop() {
    const rows = this.current[0];
    rows.forEach((_, x) => {
      let toDrop = 0;
      for (let y = this.current.length - 1; y >= 0; y--) {
        if (this.at({ x, y }).isBlank()) {
          toDrop++;
          continue;
        }
        toDrop > 0 && drop({ x, y, toDrop }, this);
      }
    });
  }
}

export default Grid;
