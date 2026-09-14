import fc from "fast-check";
import {describe, expect, it} from "vitest";

import {buildWallRows} from "#/lib/review-wall.ts";

const rowCounts = fc.array(fc.integer({min: 1, max: 9}), {maxLength: 6});

const wallWithPeople = rowCounts.chain((counts) => {
  const total = counts.reduce((sum, count) => sum + count, 0);

  return fc.record({
    cells: total === 0 ? fc.constant<number[]>([]) : fc.uniqueArray(fc.integer({min: 0, max: total - 1}), {maxLength: total}),
    counts: fc.constant(counts),
  });
});

describe("buildWallRows", () => {
  it("leaves cells without a person empty", () => {
    expect(buildWallRows([2], [{cell: 1}])[0]?.[0]?.person).toBeNull();
  });

  it("places a person on their cell", () => {
    expect(buildWallRows([2, 3], [{cell: 3}])[1]?.[1]?.person).toEqual({cell: 3});
  });

  it("gives every row as many cells as its count", () => {
    fc.assert(
      fc.property(rowCounts, (counts) => {
        expect(buildWallRows(counts, []).map((row) => row.length)).toEqual(counts);
      })
    );
  });

  it("numbers the cells contiguously from zero", () => {
    fc.assert(
      fc.property(rowCounts, (counts) => {
        const indexes = buildWallRows(counts, []).flatMap((row) => row.map((cell) => cell.index));

        expect(indexes).toEqual(indexes.map((_, position) => position));
      })
    );
  });

  it("puts every person on the cell they asked for", () => {
    fc.assert(
      fc.property(wallWithPeople, ({cells, counts}) => {
        const people = cells.map((cell) => ({cell}));
        const placed = buildWallRows(counts, people)
          .flat()
          .filter((cell) => cell.person !== null);

        expect(placed.every((cell) => cell.person?.cell === cell.index)).toBe(true);
        expect(placed).toHaveLength(people.length);
      })
    );
  });
});
