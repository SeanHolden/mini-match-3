import Grid from "../src/grid";
import Gem from "../src/gem";

describe("grid", () => {
  let schema;
  let grid;

  beforeEach(() => {
    schema = [
      [0, 1, 2, 3, 4, 5],
      [6, 0, 1, 2, 3, 4],
      [5, 6, 0, 1, 2, 3],
      [4, 5, 6, 0, 1, 2],
      [3, 4, 5, 6, 0, 1],
      [2, 3, 4, 5, 6, 0]
    ];

    grid = new Grid(schema);
  });

  test("can find Gem from grid", () => {
    const position = { x: 0, y: 3 };
    expect(grid.at(position) instanceof Gem).toBe(true);
    expect(grid.at(position).type).toBe(4);
  });

  describe("swap", () => {
    test("successful when swapping a gem with another gem that is directly above it", () => {
      const position1 = { x: 2, y: 1 }; // 1
      const position2 = { x: 2, y: 0 }; // 2
      expect(grid.swap(position1).with(position2)).toBe(true);
      expect(grid.at(position1).type).toBe(2);
      expect(grid.at(position2).type).toBe(1);
    });

    test("successful when swapping a gem with another gem that is directly right of it", () => {
      const position1 = { x: 2, y: 4 }; // 5
      const position2 = { x: 3, y: 4 }; // 6
      expect(grid.swap(position1).with(position2)).toBe(true);
      expect(grid.at(position1).type).toBe(6);
      expect(grid.at(position2).type).toBe(5);
    });

    test("successful when swapping a gem with another gem that is directly below it", () => {
      const position1 = { x: 4, y: 3 }; // 1
      const position2 = { x: 4, y: 4 }; // 0
      expect(grid.swap(position1).with(position2)).toBe(true);
      expect(grid.at(position1).type).toBe(0);
      expect(grid.at(position2).type).toBe(1);
    });

    test("successful when swapping a gem with another gem that is directly left of it", () => {
      const position1 = { x: 5, y: 5 }; // 0
      const position2 = { x: 4, y: 5 }; // 6
      expect(grid.swap(position1).with(position2)).toBe(true);
      expect(grid.at(position1).type).toBe(6);
      expect(grid.at(position2).type).toBe(0);
    });

    test("unsuccessful when swapping two gems that are not next to each other", () => {
      const position1 = { x: 1, y: 3 }; // 5
      const position2 = { x: 3, y: 3 }; // 0
      expect(grid.swap(position1).with(position2)).toBe(false);
      expect(grid.current.map(columns => columns.map(gem => gem.type))).toEqual(
        schema
      );
    });

    test("unsuccessful when swapping two gems that are top-right diagonal from each other", () => {
      const position1 = { x: 1, y: 3 };
      const position2 = { x: 2, y: 2 };
      expect(grid.swap(position1).with(position2)).toBe(false);
    });

    test("unsuccessful when swapping two gems that are bottom-right diagonal from each other", () => {
      const position1 = { x: 0, y: 0 };
      const position2 = { x: 1, y: 1 };
      expect(grid.swap(position1).with(position2)).toBe(false);
    });

    test("unsuccessful when swapping two gems that are bottom-left diagonal from each other", () => {
      const position1 = { x: 2, y: 3 };
      const position2 = { x: 1, y: 4 };
      expect(grid.swap(position1).with(position2)).toBe(false);
    });

    test("unsuccessful when swapping two gems that are top-left diagonal from each other", () => {
      const position1 = { x: 4, y: 3 };
      const position2 = { x: 3, y: 2 };
      expect(grid.swap(position1).with(position2)).toBe(false);
    });
  });
});
