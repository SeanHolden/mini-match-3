import Grid from "./grid";
import Gem from "./gem";

describe("grid", () => {
  const schemaNoMatches = [
    [1, 2, 3, 4, 5, 6],
    [7, 1, 2, 3, 4, 5],
    [6, 7, 1, 2, 3, 4],
    [5, 6, 7, 1, 2, 3],
    [4, 5, 6, 7, 1, 2],
    [3, 4, 5, 6, 7, 1]
  ];

  it("can find Gem from grid", () => {
    const grid = new Grid(schemaNoMatches);
    const position = { x: 0, y: 3 };
    expect(grid.at(position) instanceof Gem).toBe(true);
    expect(grid.at(position).type).toBe(5);
  });

  it("grid schema is correct", () => {
    const grid = new Grid(schemaNoMatches);
    const gridCurrent = grid.current.map(line => line.map(gem => gem.type));
    expect(gridCurrent).toEqual(schemaNoMatches);
  });

  describe("swap", () => {
    it("is successful when swapping a gem with another gem that is directly above it", () => {
      const grid = new Grid(schemaNoMatches);
      const position1 = { x: 2, y: 1 }; // 2
      const position2 = { x: 2, y: 0 }; // 3
      expect(grid.swap(position1).with(position2)).toBe(true);
      expect(grid.at(position1).type).toBe(3);
      expect(grid.at(position2).type).toBe(2);
    });

    it("is successful when swapping a gem with another gem that is directly right of it", () => {
      const grid = new Grid(schemaNoMatches);
      const position1 = { x: 2, y: 4 }; // 6
      const position2 = { x: 3, y: 4 }; // 7
      expect(grid.swap(position1).with(position2)).toBe(true);
      expect(grid.at(position1).type).toBe(7);
      expect(grid.at(position2).type).toBe(6);
    });

    it("is successful when swapping a gem with another gem that is directly below it", () => {
      const grid = new Grid(schemaNoMatches);
      const position1 = { x: 4, y: 3 }; // 2
      const position2 = { x: 4, y: 4 }; // 1
      expect(grid.swap(position1).with(position2)).toBe(true);
      expect(grid.at(position1).type).toBe(1);
      expect(grid.at(position2).type).toBe(2);
    });

    it("is successful when swapping a gem with another gem that is directly left of it", () => {
      const grid = new Grid(schemaNoMatches);
      const position1 = { x: 5, y: 5 }; // 1
      const position2 = { x: 4, y: 5 }; // 7
      expect(grid.swap(position1).with(position2)).toBe(true);
      expect(grid.at(position1).type).toBe(7);
      expect(grid.at(position2).type).toBe(1);
    });

    it("is unsuccessful when swapping two gems that are not next to each other", () => {
      const grid = new Grid(schemaNoMatches);
      const position1 = { x: 1, y: 3 }; // 6
      const position2 = { x: 3, y: 3 }; // 1
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
    it("finds the three 6's in the top right", () => {
      const schema = [
        [1, 2, 3, 4, 5, 6],
        [7, 1, 2, 3, 4, 6],
        [6, 7, 1, 2, 3, 6],
        [7, 1, 2, 3, 4, 5],
        [6, 7, 1, 2, 3, 4],
        [5, 6, 7, 1, 2, 3]
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
        [1, 2, 3, 4, 5, 6],
        [7, 1, 2, 3, 4, 5],
        [6, 2, 2, 2, 2, 4],
        [5, 6, 1, 3, 1, 2],
        [3, 4, 5, 6, 1, 1],
        [2, 3, 4, 5, 6, 1]
      ];
      const grid = new Grid(schema);
      expect(grid.findMatches()).toEqual([
        [
          { x: 2, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 2 },
          { x: 4, y: 2 },
          { x: 1, y: 2 }
        ]
      ]);
    });
    it("finds the five 2's from the center and the four 3's in bottom left", () => {
      const schema = [
        [1, 1, 2, 3, 4, 5],
        [6, 1, 1, 2, 3, 4],
        [5, 2, 2, 2, 2, 3],
        [4, 5, 6, 1, 1, 2],
        [3, 4, 5, 6, 1, 1],
        [3, 3, 3, 5, 6, 1]
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
        [1, 2, 2, 2, 4, 5],
        [6, 1, 1, 2, 3, 4],
        [5, 6, 2, 2, 2, 3],
        [4, 5, 6, 2, 1, 2],
        [3, 2, 2, 2, 2, 1],
        [2, 3, 2, 5, 6, 1]
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
          { x: 2, y: 2 }
        ]
      ]);
    });
    it("finds the five 2's from the center and the four 3's in bottom left and the four 6's bottom right", () => {
      const schema = [
        [1, 1, 2, 3, 4, 5],
        [6, 1, 1, 2, 3, 4],
        [5, 2, 2, 2, 2, 3],
        [4, 5, 6, 1, 1, 2],
        [3, 4, 5, 6, 6, 6],
        [3, 3, 3, 5, 6, 1]
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
  describe("pop", () => {
    it("pops the matches passed in", () => {
      const schema = [
        [3, 1, 2, 3, 4, 5],
        [6, 1, 1, 2, 3, 4],
        [5, 2, 2, 2, 2, 3],
        [4, 5, 6, 1, 1, 2],
        [3, 4, 5, 6, 6, 6],
        [3, 3, 3, 5, 6, 1]
      ];
      const schemaAfterPop = [
        [3, 1, 2, 3, 4, 5],
        [6, 1, 1, 0, 3, 4],
        [5, 0, 0, 0, 0, 3],
        [4, 5, 6, 1, 1, 2],
        [0, 4, 5, 0, 0, 0],
        [0, 0, 0, 5, 0, 1]
      ];
      const grid = new Grid(schema);
      const matches = grid.findMatches();
      grid.pop(matches);
      const gridCurrent = grid.current.map(line => line.map(gem => gem.type));
      expect(gridCurrent).toEqual(schemaAfterPop);
    });
  });
  describe("column", () => {
    it("returns array of a given column in grid (0)", () => {
      const grid = new Grid(schemaNoMatches);
      expect(grid.column(0).map(gem => gem.type)).toEqual([1, 7, 6, 5, 4, 3]);
    });
    it("returns array of a given column in grid (1)", () => {
      const grid = new Grid(schemaNoMatches);
      expect(grid.column(1).map(gem => gem.type)).toEqual([2, 1, 7, 6, 5, 4]);
    });
  });
  describe("drop", () => {
    describe("when no gaps", function() {
      it("does not change anything", function() {
        const grid = new Grid(schemaNoMatches);
        grid.drop();
        const gridCurrent = grid.current.map(line => line.map(gem => gem.type));
        expect(gridCurrent).toEqual(schemaNoMatches);
      });
    });
    describe("when gaps", function() {
      it("drops the correct gems into the correct places", () => {
        // rule: each gem needs to drop down by the number of 0's below it in that column
        const schemaWithGaps = [
            [3, 1, 2, 3, 4, 5],
            [6, 1, 1, 0, 3, 4],
            [5, 0, 0, 0, 0, 3],
            [4, 5, 6, 1, 1, 2],
            [0, 4, 5, 0, 0, 0],
            [0, 0, 0, 5, 0, 1]
          ],
          schemaAfterDrop = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 5],
            [3, 1, 2, 0, 0, 4],
            [6, 1, 1, 3, 4, 3],
            [5, 5, 6, 1, 3, 2],
            [4, 4, 5, 5, 1, 1]
          ];
        const grid = new Grid(schemaWithGaps);
        grid.drop();

        const gridCurrent = grid.current.map(line => line.map(gem => gem.type));
        expect(gridCurrent).toEqual(schemaAfterDrop);
      });
      it("drops the correct gems into the correct places - 2", () => {
        const schemaWithGaps = [
            [1, 0, 0, 0, 4, 5],
            [6, 1, 1, 0, 3, 4],
            [5, 6, 0, 0, 0, 3],
            [4, 5, 6, 0, 1, 2],
            [3, 0, 0, 0, 0, 1],
            [2, 3, 0, 5, 6, 1]
          ],
          schemaAfterDrop = [
            [1, 0, 0, 0, 0, 5],
            [6, 0, 0, 0, 0, 4],
            [5, 1, 0, 0, 4, 3],
            [4, 6, 0, 0, 3, 2],
            [3, 5, 1, 0, 1, 1],
            [2, 3, 6, 5, 6, 1]
          ];
        const grid = new Grid(schemaWithGaps);
        grid.drop();

        const gridCurrent = grid.current.map(line => line.map(gem => gem.type));
        expect(gridCurrent).toEqual(schemaAfterDrop);
      });
    });
  });
  describe("replenish", () => {
    describe("when no gaps", function() {
      it("does not change anything", function() {
        const grid = new Grid(schemaNoMatches);
        grid.replenish();
        const gridCurrent = grid.current.map(line => line.map(gem => gem.type));
        expect(gridCurrent).toEqual(schemaNoMatches);
      });
    });
    describe("when gaps", function() {
      it("fills in gaps with random gems", function() {
        const schema = [
          [1, 0, 0, 0, 0, 5],
          [6, 0, 0, 0, 0, 4],
          [5, 1, 0, 0, 4, 3],
          [4, 6, 0, 0, 3, 2],
          [3, 5, 1, 0, 1, 1],
          [2, 3, 6, 5, 6, 1]
        ];
        const schemaAfterReplenish = [
          [1, 2, 6, 4, 6, 5],
          [6, 1, 5, 3, 5, 4],
          [5, 1, 4, 2, 4, 3],
          [4, 6, 3, 1, 3, 2],
          [3, 5, 1, 7, 1, 1],
          [2, 3, 6, 5, 6, 1]
        ];
        const grid = new Grid(schema);
        const mockRandom = () => {
          const numbers = [1,2,3,4,5,6,7,1,2,3,4,5,6];
          return () => numbers.pop();
        };
        grid.replenish(mockRandom());
        const gridCurrent = grid.current.map(line => line.map(gem => gem.type));
        expect(gridCurrent).toEqual(schemaAfterReplenish);
      });
    });
  });
});
