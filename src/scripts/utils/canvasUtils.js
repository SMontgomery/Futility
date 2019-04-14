/**
 * Draw a stroked circle on the canvas.
 *
 * @param context - the canvas context
 * @param x - the x point in the center of the circle
 * @param y - the y point in the center of the circle
 * @param radius - the radius of the circle
 * @param thickness - the thickness of the stroke
 * @param color - the color of the stroke
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
 * @param context - the canvas context
 * @param x - the x point in the center of the circle
 * @param y - the y point in the center of the circle
 * @param radius - the radius of the circle
 * @param color - the color of the circle
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
 * @param context - the canvas context
 * @param startX - the starting x point
 * @param startY - the starting y point
 * @param width - the width of the rectangle
 * @param height - the height of the rectangle
 * @param thickness - the thickness of the stroke
 * @param color - the color of the stroke
 */
export function strokeRectangle(context, startX, startY, width, height, thickness, color) {
    context.lineWidth = thickness;
    context.strokeStyle = color;
    context.strokeRect(startX, startY, width, height);
}

/**
 * Draw a filled rectangle on the canvas.
 *
 * @param context - the canvas context
 * @param startX - the starting x point
 * @param startY - the starting y point
 * @param width - the width of the rectangle
 * @param height - the height of the rectangle
 * @param color - the color of the rectangle
 */
export function fillRectangle(context, startX, startY, width, height, color) {
    context.fillStyle = color;
    context.fillRect(startX, startY, width, height);
}

/**
 * Draw a line on the canvas.
 *
 * @param context - the canvas context
 * @param startX - the starting x point
 * @param startY - the starting y point
 * @param endX - the ending x point
 * @param endY - the ending y point
 * @param thickness - the thickness of the line
 * @param color - the color of the line
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
 * @param context - the canvas context
 * @param x1 - the x point of the first corner
 * @param y1 - the y point of the first corner
 * @param x2 - the x point of the opposite corner
 * @param y2 - the y point of the opposite corner
 * @param thickness - the thickness of the lines
 * @param color - the color of the lines
 */
export function drawX(context, x1, y1, x2, y2, thickness, color) {
    drawLine(context, x1, y1, x2, y2, thickness, color);
    drawLine(context, x1, y2, x2, y1, thickness, color);
}

