
/**
 * Returns if the given (sx, sy) point is inside line formed by the points (x,y) (x1,y1)
 * In order selection to work we use +- 10 pixel estimate for selection.
 * @param {*} x 
 * @param {*} y 
 * @param {*} x1 
 * @param {*} y1 
 * @param {*} sx 
 * @param {*} sy 
 */
const isInsideLine = (x, y, x1, y1, sx, sy) => {
  const m = (y - y1) / (x - x1);
  const b = y - m * x;
  const sortedXCoord = [x, x1].sort();
  const sortedYCoord = [y, y1].sort();
  // if point (sx, sy) is out of range
  if (sortedXCoord[0] > sx || sortedXCoord[1] < sx || sortedYCoord[0] > sy || sortedYCoord[1] < sy) {
    return false;
  }
  return m * sx + b <= sy + 10 && m * sx + b >= sy - 10;
}