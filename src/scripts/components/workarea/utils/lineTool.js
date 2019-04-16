/**
 * Implementation of Bresenham's line algorithm.
 * http://www.javascriptteacher.com/bresenham-line-drawing-algorithm.html
 *
 * @param {!number} x1 is the first x point
 * @param {!number} y1 is the first y point
 * @param {!number} x2 is the second x point
 * @param {!number} y2 is the second y point
 * @return {!Array} of points that form the line between the 2 sets of coordinates.
 */
export function determineLineCoordinates(x1, y1, x2, y2) {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);

  const sx = (x1 < x2) ? 1 : -1;
  const sy = (y1 < y2) ? 1 : -1;
  let error = dx - dy;

  const coordinates = [];
  coordinates.push({x: x1, y: y1});

  while (!((x1 === x2) && (y1 === y2))) {
    const e2 = error << 1;

    if (e2 > -dy) {
      error -= dy;
      x1 += sx;
    }

    if (e2 < dx) {
      error += dx;
      y1 += sy;
    }

    coordinates.push({x: x1, y: y1});
  }

  return coordinates;
}
