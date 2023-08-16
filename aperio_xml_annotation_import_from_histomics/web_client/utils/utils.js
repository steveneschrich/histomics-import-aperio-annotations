/**
 *
 * Function to calculate the distance between two points
 * @export
 * @param {*} x1
 * @param {*} y1
 * @param {*} x2
 * @param {*} y2
 * @return {*}
 */
export function getDistanceBetween2Points(x1, y1, x2, y2) {
  let y = x2 - x1;
  let x = y2 - y1;

  return Math.sqrt(x * x + y * y);
}

/**
 *
 * Function to calculate the center coordinates of two points
 * @export
 * @param {*} x1
 * @param {*} y1
 * @param {*} x2
 * @param {*} y2
 * @return {*}
 */
export function getCenterCoordinates(x1, y1, x2, y2) {
  return {
    x: (x1 + x2) / 2,
    y: (y1 + y2) / 2,
  };
}
/**
 *
 * Function to calculate the y minor axios of an ellipse
 * @export
 * @param {*} area
 * @param {*} minorXAxis
 * @return {*}
 */
export function getYMinorAxis(area, minorXAxis) {
  return area / (Math.PI * minorXAxis);
}

/**
 *
 * Function to determinate if a conic shape is a circle or not
 * @export
 * @param {*} minorXAxis
 * @param {*} height
 * @return {*}
 */
export function isCircle(minorXAxis, minorYAxis) {
  // const difference = minorXAxis - height;
  const difference = Math.abs(minorXAxis - minorYAxis);
  return difference >= 0 && difference <= 10;
}

/**
 *
 * Function to get the RGB value of a color in decimal format.
 * @export
 * @param {*} number
 * @return {*} string containing the RGB value
 */
export function getRGBFromDecimal(number) {
  var b = Math.floor(number / (256 * 256));
  var g = Math.floor(number / 256) % 256;
  var r = number % 256;

  return `rgb(${r},${g},${b})`;
}
