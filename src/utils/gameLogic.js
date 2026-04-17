export const getNeighbors = (index) => {
  const neighbors = [];
  const row = Math.floor(index / 4);
  const col = index % 4;

  if (row > 0) neighbors.push(index - 4);
  if (row < 3) neighbors.push(index + 4);
  if (col > 0) neighbors.push(index - 1);
  if (col < 3) neighbors.push(index + 1);

  return neighbors;
};
export const canMerge = (grid) => {
  for (let i = 0; i < 16; i++) {
    if (!grid[i]) return true;

    const neighbors = getNeighbors(i);

    for (let n of neighbors) {
      const a = grid[i];
      const b = grid[n];

      if (!b) return true;

      if (a === b) return true;

      if (a > b && a % b === 0) return true;
      if (b > a && b % a === 0) return true;
    }
  }
  return false;
};

export const handleMerge = (grid, index, value) => {
  let newGrid = [...grid];
  newGrid[index] = value;

  const neighbors = getNeighbors(index);

  neighbors.forEach((n) => {
    const neighborVal = newGrid[n];
    if (!neighborVal) return;

    // SAME NUMBER → remove both
    if (neighborVal === value) {
      newGrid[index] = null;
      newGrid[n] = null;
    }

    // DIVISIBLE
    else if (value > neighborVal && value % neighborVal === 0) {
      const result = value / neighborVal;
      newGrid[index] = result === 1 ? null : result;
      newGrid[n] = null;
    }

    else if (neighborVal > value && neighborVal % value === 0) {
      const result = neighborVal / value;
      newGrid[n] = result === 1 ? null : result;
      newGrid[index] = null;
    }
  });

  return newGrid;
};