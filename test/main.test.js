import main from '../src/main'

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
