export const scanForMatches = (pos, grid, matches = [pos]) => {
  [
    { x: pos.x + 1, y: pos.y }, // right
    { x: pos.x, y: pos.y + 1 }, // down
    { x: pos.x - 1, y: pos.y }, // left
    { x: pos.x, y: pos.y - 1 } // up
  ].forEach(neighbor => {
    if (
      valid(neighbor, matches) &&
      grid.at(pos).type === grid.at(neighbor).type
    ) {
      matches.push(neighbor);
      scanForMatches({ x: neighbor.x, y: neighbor.y }, grid, matches);
    }
  });
  return matches;
};

export const alreadyFound = ({ x, y }, arr) =>
  arr.filter(p => p.x === x && p.y === y).length > 0;

export const threeInRow = combo => {
  const a = combo.map(pos => pos.x).sort();
  const b = combo.map(pos => pos.y).sort();
  const threeOrMore = /(\d)\1{2,}/;
  return threeOrMore.test(a.join("")) || threeOrMore.test(b.join(""));
};

const valid = (pos, arr) => inBounds(pos) && !alreadyFound(pos, arr);

const inBounds = ({ x, y }) => x >= 0 && y >= 0 && x <= 5 && y <= 5;
