/**
 * Which item of a scrolling list is closest to the viewport's focus line.
 *
 * @param centers vertical centre of each item, in viewport coordinates.
 * @param focus the viewport position items become active at.
 */
export function nearestIndexToFocus(centers: readonly number[], focus: number): number {
  let nearest = 0;
  let shortest = Number.POSITIVE_INFINITY;

  for (const [index, center] of centers.entries()) {
    const distance = Math.abs(center - focus);

    if (distance < shortest) {
      nearest = index;
      shortest = distance;
    }
  }

  return nearest;
}
