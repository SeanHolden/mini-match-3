import { main, Grid } from '../src/main'

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
        const x = 0
        const y = 3
        expect(grid.at(x, y).type).toEqual(3)
    });
});

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
        const grid = new Grid(schema);
        grid.swap(gem1).with(gem2)
    })

    // test('returns true on successful swap')
    // test('returns false on unsuccessful swap')
});

