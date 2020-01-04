import isNeighbour from "./is-neighbour";

class Swap {
  constructor(grid, position) {
    this.grid = grid;
    this.position = position;
  }

  with(position2) {
    if (isNeighbour(this.position, position2)) {
      return this.performSwap(position2);
    } else {
      return false;
    }
  }

  performSwap(position2) {
    const newGrid = this.grid.current.slice();
    const pos1 = newGrid[this.position.y][this.position.x];
    newGrid[this.position.y][this.position.x] = newGrid[position2.y][position2.x];
    newGrid[position2.y][position2.x] = pos1;
    this.grid.update(newGrid);
    return true;
  }
}

export default Swap;
