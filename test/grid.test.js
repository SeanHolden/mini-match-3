import Grid from '../src/grid'
import Gem from '../src/gem'

describe('grid', () => {
  let schema

  beforeEach(() => {
    schema = [
      [0, 1, 2, 3, 4, 5],
      [6, 0, 1, 2, 3, 4],
      [5, 6, 0, 1, 2, 3],
      [4, 5, 6, 0, 1, 2],
      [3, 4, 5, 6, 0, 1],
      [2, 3, 4, 5, 6, 0]
    ]
  })

  test('can find Gem from grid', () => {
    const grid = new Grid(schema)
    const position = { x: 0, y: 3 }
    expect(grid.at(position) instanceof Gem).toBe(true)
    expect(grid.at(position).type).toBe(4)
  })

  describe('swap', () => {
    // test('successful when swapping a gem with another gem that is directly above it')
    test('successful when swapping a gem with another gem that is directly right of it', () => {
      const grid = new Grid(schema)
      const position1 = { x: 2, y: 4 } // 5
      const position2 = { x: 3, y: 4 } // 6
      expect(grid.swap(position1).with(position2)).toBe(true)
      expect(grid.at(position1).type).toBe(6)
      expect(grid.at(position2).type).toBe(5)
    })
    // test('successful when swapping a gem with another gem that is directly below it')
    // test('successful when swapping a gem with another gem that is directly left of it')
    // test('unsuccessful when swapping two gems that are not next to each other')
    // test('unsuccessful when swapping two gems that are diagonal from each other')
  })
})
