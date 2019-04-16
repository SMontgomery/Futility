/**
 * Draw a stroked circle on the canvas.
 *
 * @param {!CanvasRenderingContext2D} context - the canvas context
 * @param {!number} x - the x point in the center of the circle
 * @param {!number} y - the y point in the center of the circle
 * @param {!number} radius - the radius of the circle
 * @param {!number} thickness - the thickness of the stroke
 * @param {!string} color - the color of the stroke
 */
export function strokeCircle(context, x, y, radius, thickness, color) {
  context.lineWidth = thickness;
  context.strokeStyle = color;
  context.beginPath();
  context.arc(x, y, radius - (thickness / 2), 0, 2 * Math.PI);
  context.stroke();
}

/**
 * Draw a filled circle on the canvas.
 *
 * @param {!CanvasRenderingContext2D} context - the canvas context
 * @param {!number} x - the x point in the center of the circle
 * @param {!number} y - the y point in the center of the circle
 * @param {!number} radius - the radius of the circle
 * @param {!string} color - the color of the circle
 */
export function fillCircle(context, x, y, radius, color) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fill();
}

/**
 * Draw a stroked rectangle on the canvas.
 *
 * @param {!CanvasRenderingContext2D} context - the canvas context
 * @param {!number} startX - the starting x point
 * @param {!number} startY - the starting y point
 * @param {!number} width - the width of the rectangle
 * @param {!number} height - the height of the rectangle
 * @param {!number} thickness - the thickness of the stroke
 * @param {!string} color - the color of the stroke
 */
export function strokeRectangle(context, startX, startY, width, height, thickness, color) {
  context.lineWidth = thickness;
  context.strokeStyle = color;
  context.strokeRect(startX, startY, width, height);
}

/**
 * Draw a filled rectangle on the canvas.
 *
 * @param {!CanvasRenderingContext2D} context - the canvas context
 * @param {!number} startX - the starting x point
 * @param {!number} startY - the starting y point
 * @param {!number} width - the width of the rectangle
 * @param {!number} height - the height of the rectangle
 * @param {!string} color - the color of the rectangle
 */
export function fillRectangle(context, startX, startY, width, height, color) {
  context.fillStyle = color;
  context.fillRect(startX, startY, width, height);
}

/**
 * Draw a line on the canvas.
 *
 * @param {!CanvasRenderingContext2D} context - the canvas context
 * @param {!number} startX - the starting x point
 * @param {!number} startY - the starting y point
 * @param {!number} endX - the ending x point
 * @param {!number} endY - the ending y point
 * @param {!number} thickness - the thickness of the line
 * @param {!string} color - the color of the line
 */
export function drawLine(context, startX, startY, endX, endY, thickness, color) {
  context.lineWidth = thickness;
  context.strokeStyle = color;
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
}

/**
 * Draw 2 lines on the canvas forming an x.
 *
 * @param {!CanvasRenderingContext2D} context - the canvas context
 * @param {!number} x1 - the x point of the first corner
 * @param {!number} y1 - the y point of the first corner
 * @param {!number} x2 - the x point of the opposite corner
 * @param {!number} y2 - the y point of the opposite corner
 * @param {!number} thickness - the thickness of the lines
 * @param {!string} color - the color of the lines
 */
export function drawX(context, x1, y1, x2, y2, thickness, color) {
  drawLine(context, x1, y1, x2, y2, thickness, color);
  drawLine(context, x1, y2, x2, y1, thickness, color);
}

