import Gem from './gem'
import Swap from './swap'

class Grid  {
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



export default Grid
