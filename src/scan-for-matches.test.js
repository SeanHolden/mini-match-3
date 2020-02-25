import { threeInRow } from "./scan-for-matches";

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

const hasThreeInRow = array => {
  let result = false;

  groupDuplicates(array).forEach(dupe => {
    if (dupe.length >= 3) {
      result = true;
    }
  });

  return result;
};

export const groupDuplicates = array => {
  const sortedArray = array.sort();
  const result = [];
  let dupes = [];
  let previousValue = sortedArray[0];

  sortedArray.forEach(value => {
    if (previousValue === value) {
      dupes.push(value);
    } else {
      result.push(dupes);
      dupes = [value];
    }
    previousValue = value;
  });
  result.push(dupes);

  return result;
};
