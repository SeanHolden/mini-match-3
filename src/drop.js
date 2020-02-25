// swaps the gem to be dropped with the BLANK gem(s) below it.
export const drop = ({ x, y, toDrop }, grid) => {
  const gem = grid.at({ x, y });
  grid.current[y][x] = grid.at({ x, y: y + toDrop });
  grid.current[y + toDrop][x] = gem;
};
