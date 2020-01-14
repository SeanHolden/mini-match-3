import isNeighbour from "./is-neighbour";

class Swap {
  constructor(grid, position) {
    this.grid = grid;
    this.position = position;
  }

  with(position2) {
    if (isNeighbour(this.position, position2)) {
      return this._performSwap(position2);
    } else {
      return false;
    }
  }

  _performSwap(position2) {
    const pos1 = this.grid.at({ x: this.position.x, y: this.position.y });
    this.grid.current[this.position.y][this.position.x] = this.grid.at({
      x: position2.x,
      y: position2.y
    });
    this.grid.current[position2.y][position2.x] = pos1;
    return true;
  }
}

export default Swap;
