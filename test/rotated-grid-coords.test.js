const ary = [
  [1, 2, 3, 4, 5],
  [2, 3, 5, 2, 4],
  [3, 5, 4, 1, 2],
]

const monkey = coords => ary[coords.x][(ary[0].length - 1) - coords.y]

describe('rotatedGridCoords', () => {
  test('entering 0,0 returns actual value of 0,4', () => {
    const coords = { x: 0, y: 0 }
    expect(monkey(coords)).toEqual(5)
  })

  test('entering 0,1 returns actual value of 0,3', () => {
    const coords = { x: 0, y: 1 }
    expect(monkey(coords)).toEqual(4)
  })

  test('entering 0,2 returns actual value of 0,2', () => {
    const coords = { x: 0, y: 2 }
    expect(monkey(coords)).toEqual(3)
  })

  test('entering 0,3 returns actual value of 0,1', () => {
    const coords = { x: 0, y: 3 }
    expect(monkey(coords)).toEqual(2)
  })

  test('entering 0,4 returns actual value of 0,0', () => {
    const coords = { x: 0, y: 4 }
    expect(monkey(coords)).toEqual(1)
  })

  test('entering 1,0 returns actual value of 1,4', () => {
    const coords = { x: 1, y: 0 }
    expect(monkey(coords)).toEqual(4)
  })

  test('entering 1,1 returns actual value of 1,3', () => {
    const coords = { x: 1, y: 1 }
    expect(monkey(coords)).toEqual(2)
  })

  test('entering 1,2 returns actual value of 1,2', () => {
    const coords = { x: 1, y: 2 }
    expect(monkey(coords)).toEqual(5)
  })

  test('entering 1,3 returns actual value of 1,1', () => {
    const coords = { x: 1, y: 3 }
    expect(monkey(coords)).toEqual(3)
  })

  test('entering 1,4 returns actual value of 1,0', () => {
    const coords = { x: 1, y: 4 }
    expect(monkey(coords)).toEqual(2)
  })

  test('entering 2,0 returns actual value of 2,4', () => {
    const coords = { x: 2, y: 0 }
    expect(monkey(coords)).toEqual(2)
  })

  test('entering 2,1 returns actual value of 2,3', () => {
    const coords = { x: 2, y: 1 }
    expect(monkey(coords)).toEqual(1)
  })

  test('entering 2,2 returns actual value of 2,2', () => {
    const coords = { x: 2, y: 2 }
    expect(monkey(coords)).toEqual(4)
  })

  test('entering 2,3 returns actual value of 2,1', () => {
    const coords = { x: 2, y: 3 }
    expect(monkey(coords)).toEqual(5)
  })

  test('entering 2,4 returns actual value of 2,0', () => {
    const coords = { x: 2, y: 4 }
    expect(monkey(coords)).toEqual(3)
  })
})
