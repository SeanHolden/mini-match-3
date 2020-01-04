const isNeighbour = (pos1, pos2) => (
  (Math.abs(pos1.x - pos2.x) === 1 && Math.abs(pos1.y - pos2.y) !== 1) ||
  (Math.abs(pos1.y - pos2.y) === 1 && Math.abs(pos1.x - pos2.x) !== 1)
);

export default isNeighbour
