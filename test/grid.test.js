import Grid from "../src/grid";
import Gem from "../src/gem";

describe("grid", () => {
  const schemaNoMatches = [
    [0, 1, 2, 3, 4, 5],
    [6, 0, 1, 2, 3, 4],
    [5, 6, 0, 1, 2, 3],
    [4, 5, 6, 0, 1, 2],
    [3, 4, 5, 6, 0, 1],
    [2, 3, 4, 5, 6, 0]
  ];

  it("can find Gem from grid", () => {
    const grid = new Grid(schemaNoMatches);
    const position = { x: 0, y: 3 };
    expect(grid.at(position) instanceof Gem).toBe(true);
    expect(grid.at(position).type).toBe(4);
  });

  it("grid schema is correct", () => {
    const grid = new Grid(schemaNoMatches);
    const gridCurrent = grid.current.map(line => line.map(gem => gem.type));
    expect(gridCurrent).toEqual(schemaNoMatches);
  });

  describe("swap", () => {
    it("is successful when swapping a gem with another gem that is directly above it", () => {
      const grid = new Grid(schemaNoMatches);
      const position1 = { x: 2, y: 1 }; // 1
      const position2 = { x: 2, y: 0 }; // 2
      expect(grid.swap(position1).with(position2)).toBe(true);
      expect(grid.at(position1).type).toBe(2);
      expect(grid.at(position2).type).toBe(1);
    });

    it("is successful when swapping a gem with another gem that is directly right of it", () => {
      const grid = new Grid(schemaNoMatches);
      const position1 = { x: 2, y: 4 }; // 5
      const position2 = { x: 3, y: 4 }; // 6
      expect(grid.swap(position1).with(position2)).toBe(true);
      expect(grid.at(position1).type).toBe(6);
      expect(grid.at(position2).type).toBe(5);
    });

    it("is successful when swapping a gem with another gem that is directly below it", () => {
      const grid = new Grid(schemaNoMatches);
      const position1 = { x: 4, y: 3 }; // 1
      const position2 = { x: 4, y: 4 }; // 0
      expect(grid.swap(position1).with(position2)).toBe(true);
      expect(grid.at(position1).type).toBe(0);
      expect(grid.at(position2).type).toBe(1);
    });

    it("is successful when swapping a gem with another gem that is directly left of it", () => {
      const grid = new Grid(schemaNoMatches);
      const position1 = { x: 5, y: 5 }; // 0
      const position2 = { x: 4, y: 5 }; // 6
      expect(grid.swap(position1).with(position2)).toBe(true);
      expect(grid.at(position1).type).toBe(6);
      expect(grid.at(position2).type).toBe(0);
    });

    it("is unsuccessful when swapping two gems that are not next to each other", () => {
      const grid = new Grid(schemaNoMatches);
      const position1 = { x: 1, y: 3 }; // 5
      const position2 = { x: 3, y: 3 }; // 0
      expect(grid.swap(position1).with(position2)).toBe(false);
      expect(grid.current.map(columns => columns.map(gem => gem.type))).toEqual(
        schemaNoMatches
      );
    });

    it("is unsuccessful when swapping two gems that are top-right diagonal from each other", () => {
      const grid = new Grid(schemaNoMatches);
      const position1 = { x: 1, y: 3 };
      const position2 = { x: 2, y: 2 };
      expect(grid.swap(position1).with(position2)).toBe(false);
    });

    it("is unsuccessful when swapping two gems that are bottom-right diagonal from each other", () => {
      const grid = new Grid(schemaNoMatches);
      const position1 = { x: 0, y: 0 };
      const position2 = { x: 1, y: 1 };
      expect(grid.swap(position1).with(position2)).toBe(false);
    });

    it("is unsuccessful when swapping two gems that are bottom-left diagonal from each other", () => {
      const grid = new Grid(schemaNoMatches);
      const position1 = { x: 2, y: 3 };
      const position2 = { x: 1, y: 4 };
      expect(grid.swap(position1).with(position2)).toBe(false);
    });

    it("is unsuccessful when swapping two gems that are top-left diagonal from each other", () => {
      const grid = new Grid(schemaNoMatches);
      const position1 = { x: 4, y: 3 };
      const position2 = { x: 3, y: 2 };
      expect(grid.swap(position1).with(position2)).toBe(false);
    });
  });
  describe("findMatches", () => {
    it("finds the three 5's in the top right", () => {
      const schema = [
        [0, 1, 2, 3, 4, 5],
        [6, 0, 1, 2, 3, 5],
        [5, 6, 0, 1, 2, 5],
        [4, 5, 6, 0, 1, 2],
        [3, 4, 5, 6, 0, 1],
        [2, 3, 4, 5, 6, 0]
      ];
      const grid = new Grid(schema);
      expect(grid.findMatches()).toEqual([
        [
          { x: 5, y: 0 },
          { x: 5, y: 1 },
          { x: 5, y: 2 }
        ]
      ]);
    });
    it("finds the five 2's (4 in the center, 1 above)", () => {
      const schema = [
        [0, 1, 2, 3, 4, 5],
        [6, 0, 1, 2, 3, 4],
        [5, 2, 2, 2, 2, 3],
        [4, 5, 6, 0, 1, 2],
        [3, 4, 5, 6, 0, 1],
        [2, 3, 4, 5, 6, 0]
      ];
      const grid = new Grid(schema);
      expect(grid.findMatches()).toEqual([
        [
          { x: 3, y: 1 },
          { x: 3, y: 2 },
          { x: 4, y: 2 },
          { x: 2, y: 2 },
          { x: 1, y: 2 }
        ]
      ]);
    });
    it("finds the five 2's from the center and the four 3's in bottom left", () => {
      const schema = [
        [0, 1, 2, 3, 4, 5],
        [6, 0, 1, 2, 3, 4],
        [5, 2, 2, 2, 2, 3],
        [4, 5, 6, 0, 1, 2],
        [3, 4, 5, 6, 0, 1],
        [3, 3, 3, 5, 6, 0]
      ];
      const grid = new Grid(schema);
      expect(grid.findMatches()).toEqual([
        [
          { x: 3, y: 1 },
          { x: 3, y: 2 },
          { x: 4, y: 2 },
          { x: 2, y: 2 },
          { x: 1, y: 2 }
        ],
        [
          { x: 0, y: 4 },
          { x: 0, y: 5 },
          { x: 1, y: 5 },
          { x: 2, y: 5 }
        ]
      ]);
    });
    it("finds the thirteen 2's combo", () => {
      const schema = [
        [0, 2, 2, 2, 4, 5],
        [6, 0, 1, 2, 3, 4],
        [5, 6, 2, 2, 2, 3],
        [4, 5, 6, 2, 1, 2],
        [3, 2, 2, 2, 2, 1],
        [2, 3, 2, 5, 6, 0]
      ];
      const grid = new Grid(schema);
      expect(grid.findMatches()).toEqual([
        [
          { x: 1, y: 0 },
          { x: 2, y: 0 },
          { x: 3, y: 0 },
          { x: 3, y: 1 },
          { x: 3, y: 2 },
          { x: 4, y: 2 },
          { x: 3, y: 3 },
          { x: 3, y: 4 },
          { x: 4, y: 4 },
          { x: 2, y: 4 },
          { x: 2, y: 5 },
          { x: 1, y: 4 },
          { x: 2, y: 2 },
        ]
      ]);
    });
    it("finds the five 2's from the center and the four 3's in bottom left and the four 6's bottom right", () => {
      const schema = [
        [0, 1, 2, 3, 4, 5],
        [6, 0, 1, 2, 3, 4],
        [5, 2, 2, 2, 2, 3],
        [4, 5, 6, 0, 1, 2],
        [3, 4, 5, 6, 6, 6],
        [3, 3, 3, 5, 6, 0]
      ];
      const grid = new Grid(schema);
      expect(grid.findMatches()).toEqual([
        [
          { x: 3, y: 1 },
          { x: 3, y: 2 },
          { x: 4, y: 2 },
          { x: 2, y: 2 },
          { x: 1, y: 2 }
        ],
        [
          { x: 0, y: 4 },
          { x: 0, y: 5 },
          { x: 1, y: 5 },
          { x: 2, y: 5 }
        ],
        [
          { x: 3, y: 4 },
          { x: 4, y: 4 },
          { x: 5, y: 4 },
          { x: 4, y: 5 }
        ]
      ]);
    });
  });
});
