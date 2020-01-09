import { threeInRow } from "../src/scan-for-matches";

describe("scan-for-matches", () => {
  describe("threeInRow", () => {
    it("returns true when combo has three in row", () => {
      const combo = [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 2, y: 1 }
      ];
      expect(threeInRow(combo)).toBe(true);
    });
    it("returns false when combo does not have three in row", () => {
      const combo = [
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 2, y: 2 },
        { x: 2, y: 3 }
      ];
      expect(threeInRow(combo)).toBe(false);
    });
  });
});
