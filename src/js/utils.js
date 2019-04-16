
const ERROR_TOLERANCE = 15;
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
  let isValidCoorinate = false;
  let m;
  let b;
  let sortedXCoord = [x, x1];
  let sortedYCoord = [y, y1];
  sortedXCoord.sort((a, b) => a - b);
  sortedYCoord.sort((a, b) => a - b);
  if (sortedXCoord[1] - sortedXCoord[0] >= -ERROR_TOLERANCE && sortedXCoord[1] - sortedXCoord[0] <= ERROR_TOLERANCE) {
    m = Infinity;
    b = y;
  } else if (sortedYCoord[1] - sortedYCoord[0] >= -ERROR_TOLERANCE && sortedYCoord[1] - sortedYCoord[0] <= ERROR_TOLERANCE) {
    m = 0;
    b = x;
  } else {
    m = (y1 - y) / (x1 - x);
    b = y - m * x;
  }

  if (m === Infinity) {
    return (x + ERROR_TOLERANCE > sx && x - ERROR_TOLERANCE < sx && sortedYCoord[0] <= sy && sy <= sortedYCoord[1]);
  } else if (m === 0) {
    return (y + ERROR_TOLERANCE > sy && y - ERROR_TOLERANCE < sy && sortedXCoord[0] <= sx && sx <= sortedXCoord[1]);
  } else {
    isValidCoorinate = (sortedXCoord[0] <= sx && sx <= sortedXCoord[1] && sortedYCoord[0] <= sy && sy <= sortedYCoord[1]);
    if (!isValidCoorinate) return false;
    return sy - ERROR_TOLERANCE <= m * sx + b && sy + ERROR_TOLERANCE >= m * sx + b;
  }
}

export { isInsideLine }