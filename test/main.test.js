import { main, Grid, Gem } from '../src/main'

describe('main', () => {
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

    test('can get Gem type from grid', () => {
        expect(main(schema)[0][0].type).toEqual(0);
        expect(main(schema)[1][4].type).toEqual(3);
        expect(main(schema)[3][2].type).toEqual(6);
    })
})

describe('find gem in grid', () => {
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

    test('can find Gem from Grid via x, y coords', () => {
        const grid = new Grid(schema)
        const position = { x: 0, y: 3 }
        expect(grid.at(position) instanceof Gem).toEqual(true)
        expect(grid.at(position).type).toEqual(4)
    })
})

describe('swap', () => {
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

    test('it alters the current Grid state', () => {
        const grid = new Grid(schema)
        const position1 = { x: 2, y: 4 } // 5
        const position2 = { x: 3, y: 4 } // 6
        grid.swap(position1).with(position2)
        expect(grid.at(position1).type).toEqual(6)
        expect(grid.at(position2).type).toEqual(5)
    })

    test('returns true on successful swap', () => {
      const grid = new Grid(schema)
      const position1 = { x: 2, y: 4 } // 5
      const position2 = { x: 3, y: 4 } // 6
      expect(grid.swap(position1).with(position2)).toEqual(true)
    })
    // test('returns false on unsuccessful swap')
});

