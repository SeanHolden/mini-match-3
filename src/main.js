export class Gem {
  constructor(type) {
    this.type = type
  }
}

export class Grid  {
  constructor(schema) {
    this.schema = schema
    this.current = this.create()
  }

  create() {
    return this.schema.map(column => column.map(type => new Gem(type)))
  }

  at(position) {
    return this.current[position.y][position.x]
  }

  swap(position) {
    return new Swap(this, position)
  }

  update(updatedGrid) {
    this.current = updatedGrid
  }
}

class Swap  {
  constructor(grid, position) {
    this.grid = grid
    this.position = position
  }

  with(position2) {
    const grid = this.grid.current.slice()
    const pos1 = grid[this.position.y][this.position.x]
    const pos2 = grid[position2.y][position2.x]
    grid[this.position.y][this.position.x] = pos2
    grid[position2.y][position2.x] = pos1
    this.grid.update(grid)
    return true
  }
}

export const main = schema => {
  const game = new Grid(schema);
  return game.current;
}
