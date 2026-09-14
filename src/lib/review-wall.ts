export type WallCell<T> = {
  readonly index: number;
  readonly person: T | null;
};

/** Lays people onto the honeycomb wall: `rowCounts` is tiles per row, and each `cell` is a flat position across all rows. */
export function buildWallRows<T extends {readonly cell: number}>(rowCounts: readonly number[], people: readonly T[]): WallCell<T>[][] {
  const personByCell = new Map(people.map((person) => [person.cell, person]));
  let rowStart = 0;

  return rowCounts.map((count) => {
    const row = Array.from({length: count}, (_, offset) => {
      const index = rowStart + offset;

      return {index, person: personByCell.get(index) ?? null};
    });
    rowStart += count;

    return row;
  });
}
