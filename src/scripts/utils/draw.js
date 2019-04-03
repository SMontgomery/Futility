export const strokeCircle = (context, x, y, radius, thickness, color) => {
    context.lineWidth = thickness;
    context.strokeStyle = color;
    context.beginPath();
    context.arc(x, y, radius - (thickness / 2), 0, 2 * Math.PI);
    context.stroke();
};

export const fillCircle = (context, x, y, radius, color) => {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fill();
};

export const drawLine = (context, startX, startY, endX, endY) => {
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
};

export const fillSquare = (context, startX, startY, width, height, color) => {
    context.fillStyle = color;
    context.fillRect(startX, startY, width, height);
};
